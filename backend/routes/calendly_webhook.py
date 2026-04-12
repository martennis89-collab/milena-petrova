from fastapi import APIRouter, HTTPException, Request, Header
from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime
import logging
import hmac
import hashlib

from server import db

router = APIRouter(prefix="/api/calendly", tags=["calendly"])
logger = logging.getLogger(__name__)


class CalendlyWebhookPayload(BaseModel):
    event: str
    payload: Dict[str, Any]
    created_at: Optional[str] = None


@router.post("/webhook")
async def calendly_webhook(
    request: Request,
    calendly_webhook_signature: Optional[str] = Header(None)
):
    """
    Receive Calendly webhook events.
    
    Events we handle:
    - invitee.created: When someone books
    - invitee.canceled: When booking is canceled
    """
    try:
        # Get raw body
        body = await request.body()
        
        # Parse JSON
        import json
        webhook_data = json.loads(body)
        
        event_type = webhook_data.get('event')
        payload = webhook_data.get('payload', {})
        
        logger.info(f"📅 Calendly webhook received: {event_type}")
        
        # Handle different event types
        if event_type == 'invitee.created':
            await handle_invitee_created(payload)
        elif event_type == 'invitee.canceled':
            await handle_invitee_canceled(payload)
        else:
            logger.info(f"Unhandled event type: {event_type}")
        
        # Store webhook in database for debugging
        await db.calendly_webhooks.insert_one({
            "event_type": event_type,
            "payload": payload,
            "received_at": datetime.utcnow(),
            "signature": calendly_webhook_signature
        })
        
        return {"status": "success", "event": event_type}
        
    except Exception as e:
        logger.error(f"Calendly webhook error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


async def handle_invitee_created(payload: Dict[str, Any]):
    """
    Handle new booking event.
    Extract invitee details and create booking record.
    """
    try:
        # Extract invitee information
        invitee = payload.get('invitee', {})
        event = payload.get('event', {})
        
        invitee_email = invitee.get('email')
        invitee_name = invitee.get('name')
        invitee_uri = invitee.get('uri')
        
        event_type_name = event.get('event_type', {}).get('name')
        event_start_time = event.get('start_time')
        event_end_time = event.get('end_time')
        event_uri = event.get('uri')
        
        # Extract payment information if available
        payment = payload.get('payment', {})
        payment_amount = payment.get('amount')
        payment_currency = payment.get('currency')
        payment_status = payment.get('status')
        
        # Extract questions/answers if any
        questions_and_answers = invitee.get('questions_and_answers', [])
        
        # Create booking record
        booking_data = {
            "invitee_email": invitee_email,
            "invitee_name": invitee_name,
            "invitee_uri": invitee_uri,
            "event_type_name": event_type_name,
            "event_start_time": event_start_time,
            "event_end_time": event_end_time,
            "event_uri": event_uri,
            "payment_amount": payment_amount,
            "payment_currency": payment_currency,
            "payment_status": payment_status,
            "questions_and_answers": questions_and_answers,
            "status": "confirmed",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        
        # Store in database
        result = await db.bookings.insert_one(booking_data)
        
        logger.info(f"✅ Booking created for {invitee_email} - Event: {event_type_name}")
        logger.info(f"   Start time: {event_start_time}")
        logger.info(f"   Payment: {payment_amount} {payment_currency} - Status: {payment_status}")
        
        # TODO: Send confirmation email here (when Resend is integrated)
        # await send_confirmation_email(invitee_email, invitee_name, event_start_time)
        
        return {"booking_id": str(result.inserted_id)}
        
    except Exception as e:
        logger.error(f"Error handling invitee.created: {str(e)}")
        raise


async def handle_invitee_canceled(payload: Dict[str, Any]):
    """
    Handle booking cancellation.
    """
    try:
        invitee = payload.get('invitee', {})
        event = payload.get('event', {})
        
        invitee_uri = invitee.get('uri')
        cancellation_reason = payload.get('cancellation', {}).get('reason')
        
        # Update booking status
        result = await db.bookings.update_one(
            {"invitee_uri": invitee_uri},
            {
                "$set": {
                    "status": "canceled",
                    "cancellation_reason": cancellation_reason,
                    "canceled_at": datetime.utcnow(),
                    "updated_at": datetime.utcnow()
                }
            }
        )
        
        logger.info(f"❌ Booking canceled: {invitee_uri}")
        logger.info(f"   Reason: {cancellation_reason}")
        
        # TODO: Send cancellation email here (when Resend is integrated)
        
        return {"status": "canceled"}
        
    except Exception as e:
        logger.error(f"Error handling invitee.canceled: {str(e)}")
        raise


@router.get("/bookings")
async def get_bookings(status: Optional[str] = None, limit: int = 50):
    """
    Get all bookings from database.
    """
    try:
        query = {}
        if status:
            query["status"] = status
        
        bookings = await db.bookings.find(query).sort("created_at", -1).limit(limit).to_list(limit)
        
        # Remove MongoDB _id field
        for booking in bookings:
            if '_id' in booking:
                booking['id'] = str(booking['_id'])
                del booking['_id']
        
        return {
            "bookings": bookings,
            "count": len(bookings)
        }
        
    except Exception as e:
        logger.error(f"Error fetching bookings: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/bookings/{invitee_email}")
async def get_booking_by_email(invitee_email: str):
    """
    Get bookings for specific email.
    """
    try:
        bookings = await db.bookings.find(
            {"invitee_email": invitee_email}
        ).sort("created_at", -1).to_list(100)
        
        # Remove MongoDB _id field
        for booking in bookings:
            if '_id' in booking:
                booking['id'] = str(booking['_id'])
                del booking['_id']
        
        return {
            "bookings": bookings,
            "count": len(bookings)
        }
        
    except Exception as e:
        logger.error(f"Error fetching bookings for {invitee_email}: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
