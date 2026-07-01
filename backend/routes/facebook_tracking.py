"""
Facebook Conversions API endpoints
Server-side event tracking for Facebook
"""

from fastapi import APIRouter, Request
from pydantic import BaseModel
from typing import Optional, Dict, Any
from utils.facebook_conversions import fb_conversions

router = APIRouter(prefix="/api/facebook", tags=["facebook"])


class TrackEventRequest(BaseModel):
    """Request model for tracking events"""
    event_name: str
    event_source_url: str
    fbp: Optional[str] = None  # Facebook Browser ID (_fbp cookie)
    fbc: Optional[str] = None  # Facebook Click ID (_fbc cookie)
    email: Optional[str] = None
    custom_data: Optional[Dict[str, Any]] = None
    event_id: Optional[str] = None  # For deduplication with Pixel


@router.post("/track-event")
async def track_event(event_data: TrackEventRequest, request: Request):
    """
    Track an event via Facebook Conversions API
    
    This endpoint receives events from the frontend and sends them to Facebook
    server-side for more reliable tracking (not blocked by ad blockers).
    """
    
    # Get client IP and User Agent from request
    client_ip = request.client.host
    user_agent = request.headers.get('user-agent', '')
    
    # Prepare user data
    user_data = {
        'client_ip_address': client_ip,
        'client_user_agent': user_agent,
        'fbp': event_data.fbp,
        'fbc': event_data.fbc
    }
    
    # Add email if provided
    if event_data.email:
        user_data['email'] = event_data.email
    
    # Send event to Facebook
    result = fb_conversions.send_event(
        event_name=event_data.event_name,
        event_source_url=event_data.event_source_url,
        user_data=user_data,
        custom_data=event_data.custom_data,
        event_id=event_data.event_id
    )
    
    return {
        "success": True,
        "event_name": event_data.event_name,
        "facebook_response": result
    }


@router.post("/track-page-view")
async def track_page_view(request: Request):
    """Track a page view event"""
    
    body = await request.json()
    page_url = body.get('page_url', '')
    fbp = body.get('fbp')
    fbc = body.get('fbc')
    
    # Get client IP and User Agent
    client_ip = request.client.host
    user_agent = request.headers.get('user-agent', '')
    
    result = fb_conversions.track_page_view(
        page_url=page_url,
        user_ip=client_ip,
        user_agent=user_agent,
        fbp=fbp,
        fbc=fbc
    )
    
    return {
        "success": True,
        "event": "PageView",
        "facebook_response": result
    }


@router.post("/track-cta-click")
async def track_cta_click(request: Request):
    """Track CTA button clicks as Lead events"""
    
    body = await request.json()
    page_url = body.get('page_url', '')
    cta_location = body.get('cta_location', '')
    fbp = body.get('fbp')
    fbc = body.get('fbc')
    event_id = body.get('event_id')
    
    # Get client IP and User Agent
    client_ip = request.client.host
    user_agent = request.headers.get('user-agent', '')
    
    result = fb_conversions.track_lead(
        page_url=page_url,
        user_ip=client_ip,
        user_agent=user_agent,
        fbp=fbp,
        fbc=fbc,
        event_id=event_id
    )
    
    return {
        "success": True,
        "event": "Lead",
        "cta_location": cta_location,
        "facebook_response": result
    }
