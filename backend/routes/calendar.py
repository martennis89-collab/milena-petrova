from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import RedirectResponse
from pydantic import BaseModel
from datetime import datetime, timedelta, timezone
from typing import List, Optional
import os
import logging
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
from google.auth.transport.requests import Request as GoogleRequest
import requests

from server import db
from config.calendar_config import (
    WORKING_HOURS, SESSION_DURATION, BUFFER_TIME, DAYS_AHEAD, TIMEZONE
)

router = APIRouter(prefix="/api/calendar", tags=["calendar"])
logger = logging.getLogger(__name__)

# Google OAuth credentials
GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID', '')
GOOGLE_CLIENT_SECRET = os.environ.get('GOOGLE_CLIENT_SECRET', '')
REDIRECT_URI = os.environ.get('GOOGLE_REDIRECT_URI', 'http://localhost:8001/api/calendar/oauth/callback')

SCOPES = ['https://www.googleapis.com/auth/calendar']


class TimeSlot(BaseModel):
    start: str
    end: str
    available: bool


class CreateEventRequest(BaseModel):
    start_time: str
    end_time: str
    customer_email: str
    customer_name: str
    package_type: str
    payment_session_id: str


@router.get("/oauth/login")
async def google_oauth_login():
    """
    Initiate Google OAuth flow for calendar access.
    This should be called by the admin/service provider to grant calendar access.
    """
    if not GOOGLE_CLIENT_ID or not GOOGLE_CLIENT_SECRET:
        raise HTTPException(
            status_code=500,
            detail="Google Calendar API credentials not configured. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env"
        )
    
    flow = Flow.from_client_config(
        {
            "web": {
                "client_id": GOOGLE_CLIENT_ID,
                "client_secret": GOOGLE_CLIENT_SECRET,
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token"
            }
        },
        scopes=SCOPES,
        redirect_uri=REDIRECT_URI
    )
    
    authorization_url, state = flow.authorization_url(
        access_type='offline',
        prompt='consent',
        include_granted_scopes='true'
    )
    
    return {"authorization_url": authorization_url, "state": state}


@router.get("/oauth/callback")
async def google_oauth_callback(code: str, state: str):
    """
    Handle OAuth callback and store tokens.
    """
    try:
        # Exchange code for tokens
        token_response = requests.post('https://oauth2.googleapis.com/token', data={
            'code': code,
            'client_id': GOOGLE_CLIENT_ID,
            'client_secret': GOOGLE_CLIENT_SECRET,
            'redirect_uri': REDIRECT_URI,
            'grant_type': 'authorization_code'
        }).json()
        
        if 'error' in token_response:
            raise HTTPException(status_code=400, detail=token_response['error'])
        
        # Get user info
        user_info = requests.get(
            'https://www.googleapis.com/oauth2/v2/userinfo',
            headers={'Authorization': f'Bearer {token_response["access_token"]}'}
        ).json()
        
        # Store tokens in database
        await db.calendar_credentials.update_one(
            {"email": user_info['email']},
            {
                "$set": {
                    "email": user_info['email'],
                    "google_tokens": token_response,
                    "updated_at": datetime.utcnow()
                }
            },
            upsert=True
        )
        
        logger.info(f"Google Calendar access granted for {user_info['email']}")
        
        return RedirectResponse(url=f"/?calendar_connected=true&email={user_info['email']}")
        
    except Exception as e:
        logger.error(f"OAuth callback error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


async def get_calendar_credentials():
    """
    Get stored calendar credentials.
    For now, we assume there's one service provider email.
    """
    cred_doc = await db.calendar_credentials.find_one({})
    
    if not cred_doc or 'google_tokens' not in cred_doc:
        raise HTTPException(
            status_code=401,
            detail="Calendar not connected. Admin needs to authorize Google Calendar access first."
        )
    
    tokens = cred_doc['google_tokens']
    
    creds = Credentials(
        token=tokens.get('access_token'),
        refresh_token=tokens.get('refresh_token'),
        token_uri='https://oauth2.googleapis.com/token',
        client_id=GOOGLE_CLIENT_ID,
        client_secret=GOOGLE_CLIENT_SECRET,
        scopes=SCOPES
    )
    
    # Refresh if expired
    if creds.expired and creds.refresh_token:
        creds.refresh(GoogleRequest())
        
        # Update stored tokens
        await db.calendar_credentials.update_one(
            {"email": cred_doc['email']},
            {"$set": {
                "google_tokens.access_token": creds.token,
                "updated_at": datetime.utcnow()
            }}
        )
    
    return creds


@router.get("/available-slots")
async def get_available_slots(date: Optional[str] = None):
    """
    Get available time slots for booking.
    If date is provided, get slots for that specific date.
    Otherwise, get slots for the next DAYS_AHEAD days.
    """
    try:
        creds = await get_calendar_credentials()
        service = build('calendar', 'v3', credentials=creds)
        
        # Get busy times from calendar
        now = datetime.now(timezone.utc)
        time_min = now
        time_max = now + timedelta(days=DAYS_AHEAD)
        
        if date:
            # Get slots for specific date
            target_date = datetime.fromisoformat(date.replace('Z', '+00:00'))
            time_min = target_date.replace(hour=0, minute=0, second=0, microsecond=0)
            time_max = time_min + timedelta(days=1)
        
        # Query calendar for busy times
        freebusy_query = {
            "timeMin": time_min.isoformat(),
            "timeMax": time_max.isoformat(),
            "items": [{"id": "primary"}]
        }
        
        freebusy_result = service.freebusy().query(body=freebusy_query).execute()
        busy_times = freebusy_result['calendars']['primary']['busy']
        
        # Generate available slots
        available_slots = generate_available_slots(time_min, time_max, busy_times)
        
        return {"slots": available_slots}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching available slots: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


def generate_available_slots(start_date, end_date, busy_times):
    """
    Generate available time slots based on working hours and busy times.
    """
    slots = []
    current = start_date
    
    while current < end_date:
        day_name = current.strftime('%A').lower()
        
        # Check if working day
        if day_name in WORKING_HOURS and WORKING_HOURS[day_name] is not None:
            work_hours = WORKING_HOURS[day_name]
            
            # Parse working hours
            work_start_time = datetime.strptime(work_hours['start'], '%H:%M').time()
            work_end_time = datetime.strptime(work_hours['end'], '%H:%M').time()
            
            # Create datetime for start and end of work day
            work_start = current.replace(
                hour=work_start_time.hour,
                minute=work_start_time.minute,
                second=0,
                microsecond=0
            )
            work_end = current.replace(
                hour=work_end_time.hour,
                minute=work_end_time.minute,
                second=0,
                microsecond=0
            )
            
            # Generate slots for this day
            slot_start = work_start
            while slot_start + timedelta(minutes=SESSION_DURATION) <= work_end:
                slot_end = slot_start + timedelta(minutes=SESSION_DURATION)
                
                # Check if slot overlaps with busy times
                is_available = not is_slot_busy(slot_start, slot_end, busy_times)
                
                # Only include future slots
                if slot_start > datetime.now(timezone.utc):
                    slots.append({
                        "start": slot_start.isoformat(),
                        "end": slot_end.isoformat(),
                        "available": is_available
                    })
                
                # Move to next slot (with buffer)
                slot_start = slot_end + timedelta(minutes=BUFFER_TIME)
        
        # Move to next day
        current += timedelta(days=1)
        current = current.replace(hour=0, minute=0, second=0, microsecond=0)
    
    return slots


def is_slot_busy(slot_start, slot_end, busy_times):
    """
    Check if a time slot overlaps with any busy times.
    """
    for busy in busy_times:
        busy_start = datetime.fromisoformat(busy['start'].replace('Z', '+00:00'))
        busy_end = datetime.fromisoformat(busy['end'].replace('Z', '+00:00'))
        
        # Check for overlap
        if slot_start < busy_end and slot_end > busy_start:
            return True
    
    return False


@router.post("/create-event")
async def create_calendar_event(request: CreateEventRequest):
    """
    Create a calendar event after successful payment.
    This should be called after Stripe payment is confirmed.
    """
    try:
        creds = await get_calendar_credentials()
        service = build('calendar', 'v3', credentials=creds)
        
        # Parse times
        start_time = datetime.fromisoformat(request.start_time.replace('Z', '+00:00'))
        end_time = datetime.fromisoformat(request.end_time.replace('Z', '+00:00'))
        
        # Create event
        event = {
            'summary': f'Session with {request.customer_name}',
            'description': f'Package: {request.package_type}\nCustomer: {request.customer_name}\nEmail: {request.customer_email}\nPayment ID: {request.payment_session_id}',
            'start': {
                'dateTime': start_time.isoformat(),
                'timeZone': TIMEZONE,
            },
            'end': {
                'dateTime': end_time.isoformat(),
                'timeZone': TIMEZONE,
            },
            'attendees': [
                {'email': request.customer_email},
            ],
            'conferenceData': {
                'createRequest': {
                    'requestId': f"session-{request.payment_session_id}",
                    'conferenceSolutionKey': {'type': 'hangoutsMeet'}
                }
            },
            'reminders': {
                'useDefault': False,
                'overrides': [
                    {'method': 'email', 'minutes': 24 * 60},  # 1 day before
                    {'method': 'popup', 'minutes': 60},  # 1 hour before
                ],
            },
        }
        
        # Insert event with Google Meet
        created_event = service.events().insert(
            calendarId='primary',
            body=event,
            conferenceDataVersion=1,
            sendUpdates='all'  # Send email to attendees
        ).execute()
        
        # Extract Google Meet link
        meet_link = created_event.get('hangoutLink', '')
        
        logger.info(f"Calendar event created: {created_event['id']} for {request.customer_email}")
        
        return {
            "event_id": created_event['id'],
            "meet_link": meet_link,
            "status": "created"
        }
        
    except Exception as e:
        logger.error(f"Error creating calendar event: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/connection-status")
async def check_calendar_connection():
    """
    Check if Google Calendar is connected and working.
    """
    try:
        cred_doc = await db.calendar_credentials.find_one({})
        
        if not cred_doc:
            return {
                "connected": False,
                "message": "No calendar credentials found. Please connect Google Calendar."
            }
        
        # Try to get credentials (will refresh if needed)
        creds = await get_calendar_credentials()
        
        # Test API call
        service = build('calendar', 'v3', credentials=creds)
        calendar = service.calendars().get(calendarId='primary').execute()
        
        return {
            "connected": True,
            "email": cred_doc.get('email'),
            "calendar_name": calendar.get('summary', 'Primary Calendar')
        }
        
    except HTTPException as e:
        return {
            "connected": False,
            "message": str(e.detail)
        }
    except Exception as e:
        return {
            "connected": False,
            "message": str(e)
        }
