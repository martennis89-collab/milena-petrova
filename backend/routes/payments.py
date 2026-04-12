from fastapi import APIRouter, HTTPException, Request, Header
from pydantic import BaseModel, Field
from typing import Optional, Dict
from datetime import datetime
import os
import logging

from emergentintegrations.payments.stripe.checkout import (
    StripeCheckout,
    CheckoutSessionResponse,
    CheckoutStatusResponse,
    CheckoutSessionRequest
)
from config.payment_config import PAYMENT_PACKAGES

# Get database from main server
from server import db

router = APIRouter(prefix="/api/payments", tags=["payments"])
logger = logging.getLogger(__name__)

# Stripe API key from environment
STRIPE_API_KEY = os.environ.get('STRIPE_API_KEY', 'sk_test_emergent')


class CreateCheckoutRequest(BaseModel):
    package_id: str = Field(..., description="Package ID: 'single' or 'package'")
    origin_url: str = Field(..., description="Frontend origin URL")
    email: Optional[str] = Field(None, description="User email")
    calendly_event_uri: Optional[str] = Field(None, description="Calendly event URI after booking")


@router.post("/checkout/session", response_model=CheckoutSessionResponse)
async def create_checkout_session(
    request: CreateCheckoutRequest,
    http_request: Request
):
    """
    Create a Stripe checkout session for session booking payment.
    
    Security: Amount is determined server-side from PAYMENT_PACKAGES only.
    """
    try:
        # Validate package ID
        if request.package_id not in PAYMENT_PACKAGES:
            raise HTTPException(status_code=400, detail="Invalid package ID")
        
        # Get package details (server-side only - security critical)
        package = PAYMENT_PACKAGES[request.package_id]
        amount = package["price"]
        currency = package["currency"]
        
        # Initialize Stripe checkout
        host_url = str(http_request.base_url).rstrip('/')
        webhook_url = f"{host_url}/api/payments/webhook/stripe"
        stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
        
        # Create success and cancel URLs from frontend origin
        success_url = f"{request.origin_url}/payment/success?session_id={{CHECKOUT_SESSION_ID}}"
        cancel_url = f"{request.origin_url}/payment/cancel"
        
        # Prepare metadata
        metadata = {
            "package_id": request.package_id,
            "package_name": package["name"],
            "sessions_count": str(package["sessions"]),
            "timestamp": datetime.utcnow().isoformat()
        }
        
        if request.email:
            metadata["email"] = request.email
        
        if request.calendly_event_uri:
            metadata["calendly_event_uri"] = request.calendly_event_uri
        
        # Create checkout session request
        checkout_request = CheckoutSessionRequest(
            amount=amount,
            currency=currency,
            success_url=success_url,
            cancel_url=cancel_url,
            metadata=metadata
        )
        
        # Create checkout session via Stripe
        session = await stripe_checkout.create_checkout_session(checkout_request)
        
        # Store payment transaction in database (PENDING status)
        payment_record = {
            "session_id": session.session_id,
            "package_id": request.package_id,
            "amount": amount,
            "currency": currency,
            "payment_status": "pending",
            "status": "initiated",
            "metadata": metadata,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        
        if request.email:
            payment_record["email"] = request.email
        
        await db.payment_transactions.insert_one(payment_record)
        
        logger.info(f"Checkout session created: {session.session_id} for package {request.package_id}")
        
        return session
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating checkout session: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to create checkout session: {str(e)}")


@router.get("/checkout/status/{session_id}", response_model=CheckoutStatusResponse)
async def get_checkout_status(
    session_id: str,
    http_request: Request
):
    """
    Get the status of a checkout session and update database.
    """
    try:
        # Initialize Stripe checkout
        host_url = str(http_request.base_url).rstrip('/')
        webhook_url = f"{host_url}/api/payments/webhook/stripe"
        stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
        
        # Get checkout status from Stripe
        checkout_status = await stripe_checkout.get_checkout_status(session_id)
        
        # Find existing payment record
        existing_record = await db.payment_transactions.find_one({"session_id": session_id})
        
        if not existing_record:
            logger.warning(f"Payment record not found for session {session_id}")
            return checkout_status
        
        # Check if already processed (prevent double-processing)
        if existing_record.get("payment_status") == "paid":
            logger.info(f"Payment already processed for session {session_id}")
            return checkout_status
        
        # Update payment record based on Stripe status
        update_data = {
            "status": checkout_status.status,
            "payment_status": checkout_status.payment_status,
            "updated_at": datetime.utcnow()
        }
        
        # If payment is successful and not yet processed
        if checkout_status.payment_status == "paid" and existing_record.get("payment_status") != "paid":
            update_data["paid_at"] = datetime.utcnow()
            logger.info(f"Payment successful for session {session_id}")
            
            # Here you can add post-payment actions:
            # - Send confirmation email
            # - Update user credits/sessions
            # - Trigger notifications, etc.
        
        await db.payment_transactions.update_one(
            {"session_id": session_id},
            {"$set": update_data}
        )
        
        return checkout_status
        
    except Exception as e:
        logger.error(f"Error getting checkout status: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to get checkout status: {str(e)}")


@router.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    """
    Handle Stripe webhook events.
    """
    try:
        # Get raw body and signature
        body = await request.body()
        signature = request.headers.get("Stripe-Signature")
        
        if not signature:
            raise HTTPException(status_code=400, detail="Missing Stripe signature")
        
        # Initialize Stripe checkout
        host_url = str(request.base_url).rstrip('/')
        webhook_url = f"{host_url}/api/payments/webhook/stripe"
        stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
        
        # Handle webhook
        webhook_response = await stripe_checkout.handle_webhook(body, signature)
        
        logger.info(f"Webhook received: {webhook_response.event_type} for session {webhook_response.session_id}")
        
        # Update database based on webhook event
        if webhook_response.payment_status == "paid":
            await db.payment_transactions.update_one(
                {"session_id": webhook_response.session_id, "payment_status": {"$ne": "paid"}},
                {"$set": {
                    "payment_status": "paid",
                    "status": "complete",
                    "paid_at": datetime.utcnow(),
                    "updated_at": datetime.utcnow()
                }}
            )
            logger.info(f"Payment confirmed via webhook for session {webhook_response.session_id}")
        
        return {"status": "success"}
        
    except Exception as e:
        logger.error(f"Webhook error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/packages")
async def get_packages():
    """
    Get available payment packages.
    """
    return {
        "packages": [
            {
                "id": package_id,
                "name": package["name"],
                "price": package["price"],
                "currency": package["currency"],
                "description": package["description"],
                "sessions": package["sessions"]
            }
            for package_id, package in PAYMENT_PACKAGES.items()
        ]
    }
