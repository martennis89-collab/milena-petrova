# 🎯 Ръководство за Cancellation Tracking

## ✅ Какво е имплементирано

Системата автоматично tracква отменени резервации чрез Calendly webhooks.

### Backend Функционалност

1. **Webhook Handler** (`/app/backend/routes/calendly_webhook.py`)
   - Обработва `invitee.canceled` events от Calendly
   - Автоматично обновява статус на резервацията в MongoDB
   - Съхранява:
     - `status: "canceled"`
     - `cancellation_reason` - причината за отмяна
     - `canceled_at` - timestamp на отмяната
     - `updated_at` - време на последната промяна

2. **Database Schema**
   ```javascript
   {
     invitee_email: "email@example.com",
     invitee_name: "Име Презиме",
     invitee_uri: "https://api.calendly.com/.../invitees/...",
     event_type_name: "Пакет/Сесия",
     event_start_time: "2024-01-15T10:00:00Z",
     payment_amount: "50.00",
     payment_currency: "EUR",
     payment_status: "paid",
     status: "confirmed" | "canceled",
     cancellation_reason: "...",  // само при canceled
     canceled_at: ISODate(...),    // само при canceled
     created_at: ISODate(...),
     updated_at: ISODate(...)
   }
   ```

### Frontend Функционалност

1. **Admin Dashboard** (`/app/frontend/src/pages/AdminDashboard.jsx`)
   
   **Stats Cards:**
   - Total Bookings - общ брой резервации
   - Confirmed - потвърдени (зелен)
   - Canceled - отменени (червен)
   - Total Revenue - приход само от confirmed резервации
   
   **Filters:**
   - "All Statuses" - всички резервации
   - "Confirmed" - само потвърдени
   - "Canceled" - само отменени
   - Search by name/email
   
   **Table Display:**
   - Confirmed bookings: зелен badge "confirmed"
   - Canceled bookings: червен badge "canceled"

## 🧪 Как да тествам на живо?

### Стъпка 1: Конфигурирай Calendly Webhook

1. Влез в твоя [Calendly Dashboard](https://calendly.com/app/organization/webhooks)
2. Отиди на Webhooks settings
3. Създай нов webhook с URL:
   ```
   https://milenapetrova-api.onrender.com/api/calendly/webhook
   ```
4. Избери следните events:
   - ✅ `invitee.created` - нова резервация
   - ✅ `invitee.canceled` - отменена резервация

### Стъпка 2: Тествай Flow-а

1. **Направи тестова резервация:**
   - Отвори твоя Calendly booking link
   - Резервирай 1 от двата пакета (51 EUR или 138 EUR)
   - Попълни данните и завърши плащането

2. **Провери в Dashboard:**
   - Отиди на: https://milenapetrova.bg/admin
   - Login: `admin` / `admin123`
   - Виж новата резервация в таблицата
   - Stats ще покажат: Total +1, Confirmed +1

3. **Отмени резервацията:**
   - Отвори confirmation email от Calendly
   - Кликни на "Cancel" линка
   - Потвърди отмяната

4. **Провери отмяната в Dashboard:**
   - Refresh dashboard страницата
   - Stats: Canceled ще стане 1
   - Резервацията ще има червен badge "canceled"
   - Total Revenue няма да включва отменената сума

5. **Тествай филтрите:**
   - Избери "Canceled" от dropdown - виж само отменени
   - Избери "Confirmed" - виж само потвърдени
   - Избери "All Statuses" - виж всички

## 🔍 Debugging

### Провери Webhook Activity

Backend логове:
```bash
tail -f /var/log/supervisor/backend.*.log | grep -i calendly
```

Expected output:
```
📅 Calendly webhook received: invitee.created
✅ Booking created for email@example.com - Event: ...
   Start time: ...
   Payment: 50.00 EUR - Status: paid

📅 Calendly webhook received: invitee.canceled
❌ Booking canceled: https://api.calendly.com/.../invitees/...
   Reason: Клиентът отмени срещата
```

### Провери Database

```bash
cd /app/backend && python3 -c "
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os

async def check():
    client = AsyncIOMotorClient(os.environ.get('MONGO_URL'))
    db = client[os.environ.get('DB_NAME')]
    
    total = await db.bookings.count_documents({})
    confirmed = await db.bookings.count_documents({'status': 'confirmed'})
    canceled = await db.bookings.count_documents({'status': 'canceled'})
    
    print(f'Total: {total}')
    print(f'Confirmed: {confirmed}')
    print(f'Canceled: {canceled}')

asyncio.run(check())
"
```

## 📊 Очаквано Поведение

### При Нова Резервация (invitee.created)
- ✅ Запазва се в MongoDB с status: "confirmed"
- ✅ Увеличава Total Bookings
- ✅ Увеличава Confirmed count
- ✅ Добавя payment_amount към Total Revenue
- ✅ Показва се в dashboard с зелен badge

### При Отмяна (invitee.canceled)
- ✅ Обновява status: "canceled"
- ✅ Добавя cancellation_reason
- ✅ Добавя canceled_at timestamp
- ✅ Намалява Confirmed count
- ✅ Увеличава Canceled count
- ✅ Премахва amount от Total Revenue
- ✅ Badge в dashboard става червен

## 🔐 Security Note

⚠️ **Production Recommendation:**
В production среда трябва да добавим webhook signature verification за сигурност.

Calendly изпраща `Calendly-Webhook-Signature` header, който трябва да валидираме срещу webhook signing key.

## 🎯 Следващи Стъпки

След като тестваш и потвърдиш, че всичко работи:

1. ✅ Cancellation tracking - ЗАВЪРШЕНО
2. 🔜 Resend email integration - за потвърждение/отмяна emails
3. 🔜 Enhanced analytics - графики, reports
4. 🔜 Export bookings функционалност

---

**Последно обновление:** 12 Април 2026  
**Статус:** ✅ ГОТОВО ЗА ТЕСТВАНЕ
