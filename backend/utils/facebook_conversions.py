"""
Facebook Conversions API Integration
Sends server-side events to Facebook for reliable tracking
"""

import os
import time
import hashlib
import requests
from typing import Dict, Optional, Any


class FacebookConversionsAPI:
    """Facebook Conversions API client for server-side event tracking"""
    
    def __init__(self):
        self.pixel_id = os.environ.get('META_PIXEL_ID')
        self.access_token = os.environ.get('META_ACCESS_TOKEN')
        self.api_version = 'v18.0'
        self.base_url = f'https://graph.facebook.com/{self.api_version}'
        
    def _hash_data(self, data: str) -> str:
        """Hash data using SHA256 for privacy compliance"""
        if not data:
            return None
        return hashlib.sha256(data.lower().strip().encode('utf-8')).hexdigest()
    
    def send_event(
        self,
        event_name: str,
        event_source_url: str,
        user_data: Dict[str, Any],
        custom_data: Optional[Dict[str, Any]] = None,
        event_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Send an event to Facebook Conversions API
        
        Args:
            event_name: Name of the event (e.g., 'PageView', 'ViewContent', 'Lead', 'Purchase')
            event_source_url: URL where the event occurred
            user_data: Dictionary with user information (email, ip, user_agent, etc.)
            custom_data: Optional custom event data
            event_id: Optional unique event ID for deduplication with Pixel
            
        Returns:
            Response from Facebook API
        """
        
        if not self.pixel_id or not self.access_token:
            print("Facebook Conversions API not configured")
            return {"error": "API not configured"}
        
        # Prepare user data with hashing for PII
        hashed_user_data = {}
        
        # Hash email if provided
        if user_data.get('email'):
            hashed_user_data['em'] = self._hash_data(user_data['email'])
        
        # Add client IP address
        if user_data.get('client_ip_address'):
            hashed_user_data['client_ip_address'] = user_data['client_ip_address']
        
        # Add user agent
        if user_data.get('client_user_agent'):
            hashed_user_data['client_user_agent'] = user_data['client_user_agent']
        
        # Add FBC (Facebook Click ID) if available
        if user_data.get('fbc'):
            hashed_user_data['fbc'] = user_data['fbc']
        
        # Add FBP (Facebook Browser ID) if available
        if user_data.get('fbp'):
            hashed_user_data['fbp'] = user_data['fbp']
        
        # Prepare event data
        event_time = int(time.time())
        
        event_data = {
            'event_name': event_name,
            'event_time': event_time,
            'event_source_url': event_source_url,
            'action_source': 'website',
            'user_data': hashed_user_data
        }
        
        # Add event_id for deduplication (if pixel fires same event)
        if event_id:
            event_data['event_id'] = event_id
        
        # Add custom data if provided
        if custom_data:
            event_data['custom_data'] = custom_data
        
        # Prepare API request
        url = f"{self.base_url}/{self.pixel_id}/events"
        
        payload = {
            'data': [event_data],
            'access_token': self.access_token
        }
        
        try:
            response = requests.post(url, json=payload, timeout=10)
            response.raise_for_status()
            
            result = response.json()
            print(f"✅ Facebook event sent: {event_name}")
            return result
            
        except requests.exceptions.RequestException as e:
            print(f"❌ Error sending Facebook event: {str(e)}")
            return {"error": str(e)}
    
    def track_page_view(
        self,
        page_url: str,
        user_ip: str,
        user_agent: str,
        fbp: Optional[str] = None,
        fbc: Optional[str] = None
    ):
        """Track a page view event"""
        return self.send_event(
            event_name='PageView',
            event_source_url=page_url,
            user_data={
                'client_ip_address': user_ip,
                'client_user_agent': user_agent,
                'fbp': fbp,
                'fbc': fbc
            }
        )
    
    def track_view_content(
        self,
        page_url: str,
        user_ip: str,
        user_agent: str,
        content_name: str,
        content_category: str,
        fbp: Optional[str] = None,
        fbc: Optional[str] = None
    ):
        """Track viewing specific content"""
        return self.send_event(
            event_name='ViewContent',
            event_source_url=page_url,
            user_data={
                'client_ip_address': user_ip,
                'client_user_agent': user_agent,
                'fbp': fbp,
                'fbc': fbc
            },
            custom_data={
                'content_name': content_name,
                'content_category': content_category
            }
        )
    
    def track_lead(
        self,
        page_url: str,
        user_ip: str,
        user_agent: str,
        email: Optional[str] = None,
        fbp: Optional[str] = None,
        fbc: Optional[str] = None,
        event_id: Optional[str] = None
    ):
        """Track a lead event (form submission, CTA click, etc.)"""
        return self.send_event(
            event_name='Lead',
            event_source_url=page_url,
            user_data={
                'email': email,
                'client_ip_address': user_ip,
                'client_user_agent': user_agent,
                'fbp': fbp,
                'fbc': fbc
            },
            event_id=event_id
        )


# Create singleton instance
fb_conversions = FacebookConversionsAPI()
