# 📧 Resend Email Integration - Setup Guide

## ✅ Какво е имплементирано

Автоматично изпращане на emails при:
1. **Нова резервация** → Confirmation email
2. **Отменена резервация** → Cancellation email

---

## 🔑 API Configuration

### Resend API Key
- API Key: `re_3Y4nnWiw_6HewWE8GgVQ4EzebCkDPzCEZ`
- Status: ✅ Активен (тестов mode)

### Environment Variables (`/app/backend/.env`)
```
RESEND_API_KEY=re_3Y4nnWiw_6HewWE8GgVQ4EzebCkDPzCEZ
SENDER_EMAIL=onboarding@resend.dev
```

---

## ⚠️ ВАЖНО: Testing vs Production Mode

### Testing Mode (СЕГА)
- **Sender email:** `onboarding@resend.dev`
- **Ограничение:** Emails се изпращат САМО на регистрирания email адрес в Resend акаунта (omba.mp@gmail.com)
- **Използване:** За тестване на email templates и functionality

### Production Mode (ЗА PRODUCTION)
За да изпращаш emails на реални клиенти, трябва да:

1. **Отвори Resend Dashboard:**
   - Login: https://resend.com/login

2. **Добави и верифицирай домейна milenapetrova.bg:**
   - Dashboard → Domains → Add Domain
   - Въведи: `milenapetrova.bg`
   - Следвай инструкциите за DNS verification:
     - Добави TXT record в DNS settings на домейна
     - Добави DKIM records за email authentication

3. **Промени SENDER_EMAIL в .env:**
   ```
   SENDER_EMAIL=kontakt@milenapetrova.bg
   ```

4. **Restart backend:**
   ```bash
   sudo supervisorctl restart backend
   ```

---

## 📧 Email Templates

### 1. Confirmation Email (при резервация)
**Trigger:** Calendly webhook `invitee.created`

**Subject:** `Потвърждение за резервация - {event_type_name}`

**Съдържание:**
- Приветствие с името на клиента
- Детайли на резервацията:
  - Тип сесия
  - Дата и час
  - Цена
- Важна информация за Google Meet линк
- Контактен email

**Design:**
- Gradient header (brand colors)
- Clean, minimal layout
- Mobile-responsive
- Bulgarian language

### 2. Cancellation Email (при отмяна)
**Trigger:** Calendly webhook `invitee.canceled`

**Subject:** `Отменена резервация - {event_type_name}`

**Съдържание:**
- Потвърждение за отмяната
- Детайли на отменената резервация
- Link за нова резервация
- Контактен email

**Design:**
- Similar styling to confirmation
- Red accent for cancellation notice
- Encouraging tone to rebook

---

## 🧪 Тестване

### Test Confirmation Email
```bash
API_URL="https://guided-sessions-2.preview.emergentagent.com"

curl -X POST "$API_URL/api/calendly/webhook" \
  -H "Content-Type: application/json" \
  -d '{
    "event": "invitee.created",
    "payload": {
      "invitee": {
        "uri": "https://api.calendly.com/test/test001",
        "email": "omba.mp@gmail.com",
        "name": "Тест Потребител"
      },
      "event": {
        "event_type": {
          "name": "Индивидуална Сесия - 51 EUR"
        },
        "start_time": "2024-02-20T15:30:00Z"
      },
      "payment": {
        "amount": "51.00",
        "currency": "EUR",
        "status": "paid"
      }
    }
  }'
```

### Test Cancellation Email
```bash
curl -X POST "$API_URL/api/calendly/webhook" \
  -H "Content-Type: application/json" \
  -d '{
    "event": "invitee.canceled",
    "payload": {
      "invitee": {
        "uri": "https://api.calendly.com/test/test001",
        "email": "omba.mp@gmail.com",
        "name": "Тест Потребител"
      },
      "cancellation": {
        "reason": "Тестова отмяна"
      }
    }
  }'
```

### Провери Backend Logs
```bash
tail -f /var/log/supervisor/backend.*.log | grep -E "Email|📧"
```

**Очакван output:**
```
✅ Email sent to omba.mp@gmail.com - ID: 81f3e74e-d074-4dc9-82ea-534cdf02b475
📧 Confirmation email sent to omba.mp@gmail.com
```

---

## 📊 Email Flow

```
┌─────────────────────────────────────────────────────────┐
│  Клиент завършва резервация в Calendly                  │
│                        ↓                                 │
│  Calendly → Изпраща webhook → /api/calendly/webhook     │
│                        ↓                                 │
│  Backend → Записва booking в MongoDB                    │
│                        ↓                                 │
│  Backend → Генерира HTML email template                 │
│                        ↓                                 │
│  Backend → Изпраща email чрез Resend API                │
│                        ↓                                 │
│  Клиент → Получава confirmation email                   │
└─────────────────────────────────────────────────────────┘
```

---

## 🔍 Troubleshooting

### Issue: Email не се изпраща
**Проверки:**
1. `RESEND_API_KEY` е правилно конфигуриран в `.env`
2. Backend е рестартиран след промени
3. Провери logs за грешки

### Issue: "Domain not verified" грешка
**Решение:**
- Верифицирай домейна в Resend Dashboard
- Или използвай `onboarding@resend.dev` за тестване

### Issue: Email отива в SPAM
**Решение:**
- Верифицирай DKIM records
- Използвай верифициран домейн
- Провери SPF records

---

## 📂 Файлове

### Backend
- `/app/backend/routes/calendly_webhook.py` - Webhook handler с email logic
- `/app/backend/utils/email_templates.py` - HTML email templates
- `/app/backend/.env` - Environment configuration
- `/app/backend/requirements.txt` - Dependencies (resend>=2.0.0)

---

## 🎯 Production Checklist

След верификация на домейна:
- [ ] Промени `SENDER_EMAIL` на `kontakt@milenapetrova.bg`
- [ ] Restart backend
- [ ] Направи тестова резервация с реален email
- [ ] Провери дали email пристига
- [ ] Провери дали email НЕ е в SPAM
- [ ] Тествай cancellation flow

---

**Статус:** ✅ РАБОТИ (testing mode)  
**За Production:** Изисква domain verification

**Last Updated:** 12 April 2026
