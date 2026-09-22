# 🔔 Calendly Webhook Setup Instructions

## Какво прави webhook-ът?

След като клиент завърши плащане в Calendly:
1. Calendly изпраща webhook към нашия backend
2. Backend записва booking в database
3. (Скоро) Изпраща confirmation email чрез Resend

---

## Стъпка 1: Настрой Redirect URL в Calendly

1. **Login в Calendly:** https://calendly.com
2. **Отвори Event Type Settings:**
   - Dashboard → Event Types
   - Избери твоя event type (напр. "30 Minute Meeting")
   - Click "Edit"

3. **Notifications & Redirects:**
   - Scroll до "Confirmations" section
   - Избери "Redirect to an external site"
   - URL: `https://milenapetrova.bg/thank-you`
   
4. **Pass URL Parameters (важно!):**
   - Включи опцията "Include event details in URL"
   - Това ще праща параметри като:
     ```
     ?event={event_uuid}
     &invitee={invitee_uuid}
     &event_type_name={event_type_name}
     &invitee_name={invitee_full_name}
     &invitee_email={invitee_email}
     &event_start_time={event_start_time}
     ```

5. **Save**

---

## Стъпка 2: Настрой Webhook в Calendly

1. **Отвори Webhooks Settings:**
   - Account → Integrations → Webhooks
   - Или директно: https://calendly.com/integrations/webhooks

2. **Create Webhook:**
   - Click "Add Webhook"
   - Webhook URL: `https://milenapetrova-api.onrender.com/api/calendly/webhook`
   
3. **Subscribe to Events:**
   Избери следните events:
   - ✅ `invitee.created` - Когато има ново записване
   - ✅ `invitee.canceled` - Когато booking е отменен
   
4. **Save Webhook**

5. **Test Webhook (Optional):**
   - Calendly има "Test Webhook" бутон
   - Кликни го за да провериш дали endpoint работи

---

## Стъпка 3: Configure Calendly Payments (Pro Feature)

1. **Enable Payments:**
   - Event Type → Edit
   - Scroll to "Collect Payments"
   - Connect Stripe or PayPal

2. **Set Pricing:**
   - Single Session: €51
   - 3-Session Package: €138

---

## Как работи целият flow:

```
1. Клиент → Избира пакет на /book
2. Клиент → Записва час в Calendly widget
3. Клиент → Плаща в Calendly (€51 или €138)
4. Calendly → Redirects към /thank-you с параметри
5. Calendly → Изпраща webhook към /api/calendly/webhook
6. Backend → Записва booking в database
7. Backend → (Скоро) Изпраща confirmation email чрез Resend
8. Клиент → Вижда Thank You страница
```

---

## Backend Endpoints

### Webhook Endpoint
```
POST /api/calendly/webhook
```
Приема Calendly webhook events.

### Get All Bookings
```
GET /api/calendly/bookings?status=confirmed&limit=50
```
Връща всички bookings от database.

### Get Bookings by Email
```
GET /api/calendly/bookings/{email}
```
Връща bookings за конкретен email.

---

## Database Schema

Bookings се записват в `bookings` collection:

```javascript
{
  invitee_email: "customer@example.com",
  invitee_name: "Име Фамилия",
  invitee_uri: "https://api.calendly.com/scheduled_events/XXX/invitees/YYY",
  event_type_name: "30 Minute Meeting",
  event_start_time: "2026-04-15T10:00:00.000000Z",
  event_end_time: "2026-04-15T10:30:00.000000Z",
  event_uri: "https://api.calendly.com/scheduled_events/XXX",
  payment_amount: "50.00",
  payment_currency: "EUR",
  payment_status: "paid",
  status: "confirmed",
  created_at: ISODate("2026-04-12T..."),
  updated_at: ISODate("2026-04-12T...")
}
```

---

## Testing

### Test Thank You Page Locally:
```
https://milenapetrova.bg/thank-you?invitee_email=test@example.com&invitee_name=Test%20User&event_start_time=2026-04-15T10:00:00Z
```

### Check Backend Logs:
```bash
tail -f /var/log/supervisor/backend.out.log
```

Търси:
- `📅 Calendly webhook received`
- `✅ Booking created for`

### View Bookings in Database:
```
GET https://milenapetrova-api.onrender.com/api/calendly/bookings
```

---

## Next: Resend Email Integration

Когато си готова за email integration:
1. Sign up за Resend: https://resend.com
2. Get API key
3. Ще добавя email templates за:
   - Confirmation email
   - Reminder email (1 day before)
   - Welcome email

---

## ⚠️ Important Notes

- Redirect URL трябва да е HTTPS (не HTTP)
- Webhook URL също трябва да е HTTPS
- Calendly изпраща webhook СЛЕД redirect (async)
- Thank you page показва информация от URL params (immediate)
- Backend webhook записва в database и ще изпраща emails (delayed)
