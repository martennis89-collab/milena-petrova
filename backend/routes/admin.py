from fastapi import APIRouter, HTTPException, Depends, Header
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timedelta
import hashlib
import hmac
import logging
import os
import secrets

from server import db

router = APIRouter(prefix="/api/admin", tags=["admin"])
logger = logging.getLogger(__name__)

# Simple admin credentials (stored in .env)
ADMIN_USERNAME = os.environ.get('ADMIN_USERNAME', 'admin')
# Unsalted SHA-256 hex digest of the password; see README for how to generate it.
# Stripped because a trailing newline pasted into .env would otherwise make every
# login fail with no visible reason.
ADMIN_PASSWORD_HASH = os.environ.get('ADMIN_PASSWORD_HASH', '').strip()

# In-memory token storage (for MVP - use Redis in production)
active_tokens = {}


class AdminLogin(BaseModel):
    username: str
    password: str


class AdminTokenResponse(BaseModel):
    token: str
    expires_at: str


def hash_password(password: str) -> str:
    """Simple password hashing for demo"""
    return hashlib.sha256(password.encode()).hexdigest()


def verify_admin_token(authorization: Optional[str] = Header(None)) -> bool:
    """Verify admin token from Authorization header"""
    if not authorization or not authorization.startswith('Bearer '):
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    token = authorization.replace('Bearer ', '')
    
    if token not in active_tokens:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
    # Check if token is expired
    if datetime.utcnow() > active_tokens[token]['expires_at']:
        del active_tokens[token]
        raise HTTPException(status_code=401, detail="Token expired")
    
    return True


@router.post("/login", response_model=AdminTokenResponse)
async def admin_login(credentials: AdminLogin):
    """
    Admin login endpoint.
    Returns a token for authenticated requests.
    """
    # Verify credentials
    if credentials.username != ADMIN_USERNAME:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    password_hash = hash_password(credentials.password)

    # Fail closed. An unset hash previously fell back to the well-known password
    # "admin123", which left the bookings dashboard — and the client contact
    # details in it — open to anyone who found the endpoint.
    if not ADMIN_PASSWORD_HASH:
        logger.error("Admin login attempted but ADMIN_PASSWORD_HASH is not set")
        raise HTTPException(
            status_code=503,
            detail="Admin login is not configured on this server"
        )

    # Constant-time comparison so response timing cannot leak the hash.
    if not hmac.compare_digest(password_hash, ADMIN_PASSWORD_HASH):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Generate token
    token = secrets.token_urlsafe(32)
    expires_at = datetime.utcnow() + timedelta(hours=24)
    
    # Store token
    active_tokens[token] = {
        'username': credentials.username,
        'expires_at': expires_at
    }
    
    return AdminTokenResponse(
        token=token,
        expires_at=expires_at.isoformat()
    )


@router.post("/logout")
async def admin_logout(authorization: Optional[str] = Header(None)):
    """Logout and invalidate token"""
    if authorization and authorization.startswith('Bearer '):
        token = authorization.replace('Bearer ', '')
        if token in active_tokens:
            del active_tokens[token]
    
    return {"message": "Logged out successfully"}


@router.get("/bookings/stats")
async def get_booking_stats(authenticated: bool = Depends(verify_admin_token)):
    """
    Get booking statistics for dashboard.
    """
    try:
        # Total bookings
        total_bookings = await db.bookings.count_documents({})
        
        # Confirmed bookings
        confirmed_bookings = await db.bookings.count_documents({"status": "confirmed"})
        
        # Canceled bookings
        canceled_bookings = await db.bookings.count_documents({"status": "canceled"})
        
        # Total revenue (sum of payment amounts)
        pipeline = [
            {"$match": {"status": "confirmed", "payment_amount": {"$exists": True}}},
            {"$group": {
                "_id": None,
                "total_revenue": {"$sum": {"$toDouble": "$payment_amount"}}
            }}
        ]
        revenue_result = await db.bookings.aggregate(pipeline).to_list(1)
        total_revenue = revenue_result[0]['total_revenue'] if revenue_result else 0
        
        # Bookings by package type
        pipeline = [
            {"$match": {"status": "confirmed"}},
            {"$group": {
                "_id": "$event_type_name",
                "count": {"$sum": 1}
            }}
        ]
        bookings_by_package = await db.bookings.aggregate(pipeline).to_list(100)
        
        return {
            "total_bookings": total_bookings,
            "confirmed_bookings": confirmed_bookings,
            "canceled_bookings": canceled_bookings,
            "total_revenue": total_revenue,
            "bookings_by_package": bookings_by_package
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/bookings")
async def get_all_bookings(
    authenticated: bool = Depends(verify_admin_token),
    status: Optional[str] = None,
    package_type: Optional[str] = None,
    search: Optional[str] = None,
    limit: int = 100,
    skip: int = 0
):
    """
    Get all bookings with filters.
    Admin only.
    """
    try:
        # Build query
        query = {}
        
        if status:
            query["status"] = status
        
        if package_type:
            query["event_type_name"] = package_type
        
        if search:
            # Search by email or name
            query["$or"] = [
                {"invitee_email": {"$regex": search, "$options": "i"}},
                {"invitee_name": {"$regex": search, "$options": "i"}}
            ]
        
        # Get total count
        total = await db.bookings.count_documents(query)
        
        # Get bookings
        bookings = await db.bookings.find(query).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
        
        # Remove MongoDB _id field
        for booking in bookings:
            if '_id' in booking:
                booking['id'] = str(booking['_id'])
                del booking['_id']
        
        return {
            "bookings": bookings,
            "total": total,
            "limit": limit,
            "skip": skip
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/bookings/{booking_id}")
async def get_booking_detail(
    booking_id: str,
    authenticated: bool = Depends(verify_admin_token)
):
    """
    Get detailed information for a specific booking.
    Admin only.
    """
    try:
        from bson import ObjectId
        
        booking = await db.bookings.find_one({"_id": ObjectId(booking_id)})
        
        if not booking:
            raise HTTPException(status_code=404, detail="Booking not found")
        
        # Remove MongoDB _id field
        booking['id'] = str(booking['_id'])
        del booking['_id']
        
        return booking
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
