"""
Webinar Email Reminder Scheduler
Schedules automated reminder emails for webinar participants
"""

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.date import DateTrigger
from datetime import datetime, timedelta, timezone
from utils.resend_email import send_email
from utils.email_templates import (
    get_reminder_email_1_day,
    get_reminder_email_2_hours,
    get_reminder_email_10_minutes
)
import pytz

# Initialize scheduler
scheduler = AsyncIOScheduler()

# Webinar details (July 16, 2026, 20:00 Sofia time = 17:00 UTC)
WEBINAR_DATETIME_UTC = datetime(2026, 7, 16, 17, 0, 0, tzinfo=timezone.utc)
SOFIA_TZ = pytz.timezone('Europe/Sofia')


async def send_reminder_1_day(name: str, email: str):
    """Send 1-day reminder email"""
    subject, html_content = get_reminder_email_1_day(name)
    success = await send_email(
        to_email=email,
        subject=subject,
        html_content=html_content
    )
    if success:
        print(f"✅ 1-day reminder sent to {email}")
    else:
        print(f"❌ Failed to send 1-day reminder to {email}")


async def send_reminder_2_hours(name: str, email: str):
    """Send 2-hour reminder email"""
    subject, html_content = get_reminder_email_2_hours(name)
    success = await send_email(
        to_email=email,
        subject=subject,
        html_content=html_content
    )
    if success:
        print(f"✅ 2-hour reminder sent to {email}")
    else:
        print(f"❌ Failed to send 2-hour reminder to {email}")


async def send_reminder_10_minutes(name: str, email: str):
    """Send 10-minute reminder email"""
    subject, html_content = get_reminder_email_10_minutes(name)
    success = await send_email(
        to_email=email,
        subject=subject,
        html_content=html_content
    )
    if success:
        print(f"✅ 10-minute reminder sent to {email}")
    else:
        print(f"❌ Failed to send 10-minute reminder to {email}")


def schedule_webinar_reminders(name: str, email: str):
    """
    Schedule all three reminder emails for a webinar participant
    
    Args:
        name: Participant name
        email: Participant email
    """
    
    # Calculate reminder times
    reminder_1_day = WEBINAR_DATETIME_UTC - timedelta(days=1)  # July 15, 2026 at 17:00 UTC (20:00 Sofia)
    reminder_2_hours = WEBINAR_DATETIME_UTC - timedelta(hours=2)  # July 16, 2026 at 15:00 UTC (18:00 Sofia)
    reminder_10_minutes = WEBINAR_DATETIME_UTC - timedelta(minutes=10)  # July 16, 2026 at 16:50 UTC (19:50 Sofia)
    
    # Get current time
    now = datetime.now(timezone.utc)
    
    # Schedule 1-day reminder if not past
    if reminder_1_day > now:
        scheduler.add_job(
            send_reminder_1_day,
            trigger=DateTrigger(run_date=reminder_1_day),
            args=[name, email],
            id=f"reminder_1day_{email}",
            replace_existing=True,
            misfire_grace_time=3600  # Allow 1 hour grace period
        )
        print(f"📅 Scheduled 1-day reminder for {email} at {reminder_1_day}")
    else:
        print(f"⏭️  Skipped 1-day reminder for {email} (already passed)")
    
    # Schedule 2-hour reminder if not past
    if reminder_2_hours > now:
        scheduler.add_job(
            send_reminder_2_hours,
            trigger=DateTrigger(run_date=reminder_2_hours),
            args=[name, email],
            id=f"reminder_2hours_{email}",
            replace_existing=True,
            misfire_grace_time=1800  # Allow 30 minutes grace period
        )
        print(f"📅 Scheduled 2-hour reminder for {email} at {reminder_2_hours}")
    else:
        print(f"⏭️  Skipped 2-hour reminder for {email} (already passed)")
    
    # Schedule 10-minute reminder if not past
    if reminder_10_minutes > now:
        scheduler.add_job(
            send_reminder_10_minutes,
            trigger=DateTrigger(run_date=reminder_10_minutes),
            args=[name, email],
            id=f"reminder_10min_{email}",
            replace_existing=True,
            misfire_grace_time=300  # Allow 5 minutes grace period
        )
        print(f"📅 Scheduled 10-minute reminder for {email} at {reminder_10_minutes}")
    else:
        print(f"⏭️  Skipped 10-minute reminder for {email} (already passed)")


def start_scheduler():
    """Start the APScheduler"""
    if not scheduler.running:
        scheduler.start()
        print("✅ Webinar reminder scheduler started")


def shutdown_scheduler():
    """Shutdown the APScheduler"""
    if scheduler.running:
        scheduler.shutdown()
        print("🛑 Webinar reminder scheduler stopped")
