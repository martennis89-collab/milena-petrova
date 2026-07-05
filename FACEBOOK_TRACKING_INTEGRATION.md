# Facebook Pixel & Conversions API Integration - Webinar Registration

## Overview
Webinar registration form (`/webinar`) now sends **dual tracking events** to Facebook:
1. **Browser-side**: Facebook Pixel (client-side tracking)
2. **Server-side**: Facebook Conversions API (server-to-server tracking)

This ensures maximum tracking reliability and attribution accuracy for Meta Ads campaigns.

---

## 📊 Events Tracked

### Event: `Lead`
**Triggered when**: User successfully completes webinar registration form

**Event Data:**
```javascript
{
  content_name: 'Webinar Registration',
  content_category: 'Webinar',
  value: 0.00,
  currency: 'BGN',
  predicted_ltv: 150.00,
  status: 'completed'
}
```

**User Data (hashed server-side):**
- Email address (SHA-256 hashed)
- Client IP address
- User agent
- Facebook browser ID (_fbp cookie)
- Facebook click ID (_fbc cookie, if available)

---

## 🔧 Implementation Details

### Frontend (`RegistrationForm.jsx`)
```javascript
import { trackEvent } from '../../utils/tracking';

// After successful registration
trackEvent('Lead', {
  content_name: 'Webinar Registration',
  content_category: 'Webinar',
  value: 0.00,
  currency: 'BGN',
  predicted_ltv: 150.00,
  status: 'completed'
});
```

**What happens:**
1. Fires Facebook Pixel `track('Lead')` event in browser
2. Sends server-side event to backend `/api/facebook/track-event`
3. Includes event deduplication ID to prevent double-counting

### Backend (`routes/webinar.py`)
```python
from utils.facebook_conversions import fb_conversions

# After successful registration
fb_conversions.send_event(
    event_name='Lead',
    event_source_url=request.headers.get('referer', 'https://milenapetrova.bg/webinar'),
    user_data={
        'email': registration.email,
        'client_ip_address': client_ip,
        'client_user_agent': user_agent
    },
    custom_data={
        'content_name': 'Webinar Registration',
        'content_category': 'Webinar',
        'value': 0.00,
        'currency': 'BGN',
        'predicted_ltv': 150.00,
        'status': 'completed'
    }
)
```

**What happens:**
1. Captures user IP and user agent from request
2. Hashes email address (SHA-256) for privacy compliance
3. Sends server-side event to Facebook Conversions API
4. Includes `predicted_ltv` (150 BGN) to help Facebook optimize for high-value leads

---

## 📈 Benefits

### 1. **Accurate Conversion Tracking**
- Browser-side + server-side = double reliability
- Works even if user has ad blockers or disabled cookies
- Event deduplication prevents counting same conversion twice

### 2. **Better Ad Attribution**
- Facebook receives conversion data directly from your server
- More resistant to iOS 14+ tracking limitations
- Improves attribution window accuracy

### 3. **Enhanced Optimization**
- `predicted_ltv` helps Facebook optimize for quality leads
- Custom data helps Facebook find similar audiences (Lookalike Audiences)
- Better ROAS (Return on Ad Spend) optimization

### 4. **GDPR Compliant**
- Email addresses are SHA-256 hashed before sending
- No raw PII sent to Facebook
- Follows Meta's data privacy guidelines

---

## 🎯 Meta Ads Setup

### Recommended Campaign Optimization

1. **Campaign Objective**: Leads
2. **Optimization Event**: Lead (standard event)
3. **Conversion Location**: Website
4. **Pixel Events**: Make sure `Lead` event is configured in Events Manager

### Event Verification

1. Go to **Meta Events Manager**
2. Select your Pixel (ID: `1326425393018449`)
3. Click **Test Events**
4. Perform a test registration on `/webinar`
5. You should see:
   - Browser event from Pixel
   - Server event from Conversions API
   - Both events should have matching `event_id` for deduplication

---

## 🔍 Testing & Debugging

### Frontend Console Logs
```
[Track Event] Lead {content_name: Webinar Registration, ...}
✅ Facebook Lead event tracked for webinar registration
✅ Server-side event sent: Lead
```

### Backend Logs
```
✅ Facebook event sent: Lead
✅ Facebook Lead event sent for user@example.com
```

### Test Registration
```bash
curl -X POST "https://milenapetrova.bg/api/webinar/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+359888123456"
  }'
```

---

## 📊 Expected Results in Meta

### Events Manager
- Event: **Lead**
- Event Source: **Website** (Conversions API)
- Event Source URL: `https://milenapetrova.bg/webinar`
- Value: 0.00 BGN
- Custom Data: Webinar Registration

### Ads Manager
- Conversion tracking for campaigns targeting `/webinar`
- Lead count increases after successful registrations
- Can create Custom Audiences from Lead event
- Can create Lookalike Audiences based on webinar leads

---

## 🚨 Important Notes

1. **Event Deduplication**: Frontend and backend use same `event_id` to prevent double-counting
2. **Email Hashing**: All emails are SHA-256 hashed before sending to Facebook
3. **Predicted LTV**: Set to 150 BGN based on estimated customer lifetime value
4. **Testing**: Use Meta Test Events tool to verify events are received correctly

---

## 🔑 Environment Variables

Required in `/app/backend/.env`:
```
META_PIXEL_ID=1326425393018449
META_ACCESS_TOKEN=<your_access_token>
```

---

## 📝 Future Improvements

- [ ] Add `Purchase` event when user buys course after webinar
- [ ] Track `CompleteRegistration` for webinar attendance
- [ ] Add UTM parameter tracking to custom_data
- [ ] Create Custom Conversion for high-value webinar leads (attended + purchased)

---

Last Updated: July 5, 2026
