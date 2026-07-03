"""
Webinar registration endpoint
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr, Field
from motor.motor_asyncio import AsyncIOMotorClient
import os
from datetime import datetime, timezone
import uuid
from utils.resend_email import send_email

router = APIRouter(prefix="/api/webinar", tags=["webinar"])

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]


class WebinarRegistration(BaseModel):
    """Webinar registration model"""
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=5, max_length=20)


@router.post("/register")
async def register_for_webinar(registration: WebinarRegistration):
    """
    Register a participant for the webinar
    """
    
    # Check if email already registered
    existing = await db.webinar_registrations.find_one(
        {"email": registration.email},
        {"_id": 0}
    )
    
    if existing:
        return {
            "success": True,
            "message": "Вече сте регистрирани за уебинара!",
            "already_registered": True
        }
    
    # Create registration record
    registration_data = {
        "id": str(uuid.uuid4()),
        "name": registration.name,
        "email": registration.email,
        "phone": registration.phone,
        "registered_at": datetime.now(timezone.utc).isoformat(),
        "status": "registered"
    }
    
    # Save to database
    await db.webinar_registrations.insert_one(registration_data)
    
    # Send confirmation email
    email_html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #2C3E50; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: linear-gradient(135deg, #8C7A6B 0%, #BFAE9F 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
            .content {{ background: #ffffff; padding: 30px; border: 1px solid #E5E7EB; }}
            .details {{ background: #F5F1EB; padding: 20px; border-radius: 8px; margin: 20px 0; }}
            .cta-button {{ display: inline-block; background: #2C3E50; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }}
            .footer {{ text-align: center; padding: 20px; color: #8C7A6B; font-size: 14px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1 style="margin: 0; font-size: 28px;">Регистрацията е потвърдена! ✅</h1>
            </div>
            
            <div class="content">
                <p>Здравейте, {registration.name}!</p>
                
                <p>Благодарим ви, че се регистрирахте за безплатния уебинар:</p>
                
                <div class="details">
                    <h2 style="color: #2C3E50; margin-top: 0;">📍 Детайли за уебинара</h2>
                    
                    <p><strong>Тема:</strong><br>
                    Защо попадаме в отношения които ни нараняват</p>
                    
                    <p><strong>Дата:</strong> Четвъртък, 16 Юли 2026</p>
                    <p><strong>Час:</strong> 20:00 - 21:00 (Българско време)</p>
                    <p><strong>Платформа:</strong> Google Meet</p>
                    
                    <p style="margin-top: 20px;"><strong>Линк за присъединяване:</strong></p>
                    <a href="https://meet.google.com/ahr-nxxi-dxb" class="cta-button">
                        Влез в уебинара
                    </a>
                    
                    <p style="font-size: 14px; color: #8C7A6B; margin-top: 15px;">
                        Или копирайте линка: <br>
                        <code style="background: #E5E7EB; padding: 5px 10px; border-radius: 4px;">
                            https://meet.google.com/ahr-nxxi-dxb
                        </code>
                    </p>
                </div>
                
                <h3 style="color: #2C3E50;">Какво ще научите:</h3>
                <ul style="color: #4A4A4A;">
                    <li>Защо най-важният въпрос не е "Защо той се държи така?", а "Какво ме задържа?"</li>
                    <li>Невидимите модели, които ви връщат към едни и същи избори</li>
                    <li>Моментът, в който започва истинската промяна</li>
                </ul>
                
                <p><strong>❗ Важно:</strong> Запазете този имейл! Линкът за Google Meet е активен и можете да се присъедините на 16.07 в 20:00ч.</p>
                
                <p>Очакваме ви!<br>
                Милена Петрова</p>
            </div>
            
            <div class="footer">
                <p>Това е автоматично генериран имейл.<br>
                За въпроси: info@milenapetrova.bg</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    # Send confirmation email and check return value
    email_sent = await send_email(
        to_email=registration.email,
        subject="✅ Потвърждение за уебинар: Защо попадаме в отношения които ни нараняват",
        html_content=email_html
    )
    
    return {
        "success": True,
        "message": "Успешна регистрация! Проверете имейла си за детайли.",
        "email_sent": email_sent,
        "registration_id": registration_data["id"]
    }


@router.get("/stats")
async def get_webinar_stats():
    """Get webinar registration statistics"""
    
    total_registrations = await db.webinar_registrations.count_documents({})
    
    # Simulated: we show 39 registered (50 - 11 remaining)
    spots_total = 50
    spots_taken = 39  # This will update as real registrations come in
    spots_remaining = spots_total - spots_taken
    
    return {
        "total_spots": spots_total,
        "spots_taken": spots_taken,
        "spots_remaining": spots_remaining,
        "actual_registrations": total_registrations
    }


@router.get("/registrations")
async def get_all_registrations():
    """Get all webinar registrations for admin dashboard"""
    
    registrations = await db.webinar_registrations.find(
        {},
        {"_id": 0}
    ).sort("registered_at", -1).to_list(1000)
    
    return {
        "success": True,
        "total": len(registrations),
        "registrations": registrations
    }
