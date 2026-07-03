"""
Resend email utility
Sends emails using Resend API
"""

import os
import requests


async def send_email(to_email: str, subject: str, html_content: str, from_email: str = None):
    """
    Send an email using Resend API
    
    Args:
        to_email: Recipient email address
        subject: Email subject
        html_content: HTML content of the email
        from_email: Sender email (defaults to SENDER_EMAIL from env)
    """
    
    resend_api_key = os.environ.get('RESEND_API_KEY')
    sender_email = from_email or os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
    
    if not resend_api_key:
        print("⚠️  Resend API key not configured")
        return False
    
    url = "https://api.resend.com/emails"
    
    headers = {
        "Authorization": f"Bearer {resend_api_key}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "from": sender_email,
        "to": [to_email],
        "subject": subject,
        "html": html_content
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=10)
        response.raise_for_status()
        
        result = response.json()
        print(f"✅ Email sent to {to_email}: {result.get('id')}")
        return True
        
    except requests.exceptions.RequestException as e:
        print(f"❌ Error sending email to {to_email}: {str(e)}")
        return False
