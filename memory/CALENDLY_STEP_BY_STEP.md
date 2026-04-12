# 📋 Calendly Configuration - Step by Step Guide

## ЧАСТ 1: Configure Redirect URL (Thank You Page)

### Стъпка 1: Login в Calendly
1. Отвори: **https://calendly.com/login**
2. Login с твоя акаунт

---

### Стъпка 2: Отвори Event Type Settings
1. От dashboard-а, отиди на **"Event Types"** (ляво меню)
2. Виждаш списък с твоите event types
3. Намери event type-а който искаш да използваш (напр. "30 Minute Meeting" или създай нов)
4. Кликни на **три точки** (...) до event-а
5. Избери **"Edit"**

---

### Стъпка 3: Scroll до "Confirmations" Section
1. В Edit режим, scroll надолу
2. Търси секцията **"What happens after someone schedules"** или **"Notifications"**
3. Намери **"Confirmation page"** dropdown

---

### Стъпка 4: Настрой Custom Redirect
1. Кликни на **"Confirmation page"** dropdown
2. Избери **"Redirect to an external site"**
3. В полето **"Redirect URL"** въведи ТОЧНО това:
   ```
   https://guided-sessions-2.preview.emergentagent.com/thank-you
   ```

4. **ВАЖНО:** Включи опцията **"Include event details in redirect URL"**
   - Ако не виждаш тази опция, провери дали имаш checkbox за "Pass event details"
   - Може да е под dropdown-а или в Advanced settings

---

### Стъпка 5: Save Changes
1. Scroll до края на страницата
2. Кликни **"Save & Close"** или **"Update Event Type"**

✅ **Готово!** Сега след booking, клиентите ще бъдат redirect-вани към твоята Thank You страница.

---

## ЧАСТ 2: Configure Webhook

### Стъпка 1: Отвори Webhooks Settings
1. От Calendly dashboard
2. Кликни на **твоя профил** (горе вдясно)
3. Избери **"Account"** или **"Settings"**
4. От ляво меню → **"Integrations"**
5. След това → **"API & Webhooks"** или директно **"Webhooks"**

**Или директно отвори:**
👉 **https://calendly.com/integrations/webhooks**

---

### Стъпка 2: Create New Webhook
1. Виждаш заглавие **"Webhook Subscriptions"**
2. Кликни бутон **"Create Webhook"** или **"Add Webhook Subscription"**

---

### Стъпка 3: Enter Webhook URL
1. В полето **"Webhook URL"** или **"Callback URL"** въведи ТОЧНО:
   ```
   https://guided-sessions-2.preview.emergentagent.com/api/calendly/webhook
   ```

2. **ВАЖНО:** URL-ът ТРЯБВА да е HTTPS (не HTTP)

---

### Стъпка 4: Select Events to Subscribe
1. Виждаш списък от event types за subscription
2. **Избери тези 2 events:**

   ✅ **invitee.created**
   - Описание: "Occurs when an invitee schedules an event"
   - Това е когато някой запише час

   ✅ **invitee.canceled**
   - Описание: "Occurs when an invitee cancels an event"
   - Това е когато някой отмени час

3. **НЕ избирай** други events за сега (може да добавиш по-късно)

---

### Стъпка 5: Specify Scope (Organization vs User)
1. Ако виждаш **"Scope"** dropdown:
   - Избери **"User"** (за личен календар)
   - Или **"Organization"** (ако искаш за цял team - но вероятно не е твоя случай)

---

### Стъпка 6: Save Webhook
1. Кликни **"Create Webhook"** или **"Save"**
2. Calendly може да покаже **"Signing Key"** - копирай го и запази (за сигурност по-късно)
3. Виждаш webhook-а в списъка със status **"Active"**

---

### Стъпка 7: Test Webhook (Optional но препоръчително)
1. След като създадеш webhook, виждаш го в списъка
2. До webhook-а има бутон **"Test"** или три точки **(...)**
3. Кликни **"Send Test Event"**
4. Избери **"invitee.created"**
5. Кликни **"Send"**

✅ Ако всичко е ОК, виждаш **"Success"** ✅

❌ Ако има грешка, провери:
- URL-ът е правилен (копирай-paste отново)
- Backend-ът работи (провери: https://guided-sessions-2.preview.emergentagent.com/api/)

---

## Проверка дали работи:

### Test 1: Backend е достъпен
Отвори в браузър:
```
https://guided-sessions-2.preview.emergentagent.com/api/
```
Трябва да видиш: `{"message":"Hello World"}`

### Test 2: Webhook endpoint е достъпен
Използвай curl или Postman:
```bash
curl -X POST https://guided-sessions-2.preview.emergentagent.com/api/calendly/webhook \
  -H "Content-Type: application/json" \
  -d '{"event":"invitee.created","payload":{"test":"data"}}'
```
Трябва да видиш: `{"status":"success","event":"invitee.created"}`

### Test 3: View Bookings
Отвори в браузър:
```
https://guided-sessions-2.preview.emergentagent.com/api/calendly/bookings
```
Ще видиш списък с bookings (празен в началото)

---

## Какво се случва след конфигурация:

```
┌─────────────────────────────────────────────────────────────┐
│  1. Клиент → Избира пакет на /book (€51 или €138)          │
│  2. Клиент → Вижда Calendly widget                         │
│  3. Клиент → Избира дата/час                               │
│  4. Клиент → Въвежда име, email                            │
│  5. Клиент → Плаща в Calendly (€51 или €138)               │
│                                                              │
│  ┌───────────── След успешно плащане ─────────────┐        │
│  │                                                  │        │
│  │  Calendly прави 2 неща едновременно:            │        │
│  │                                                  │        │
│  │  A) REDIRECT (instant):                         │        │
│  │     https://...emergentagent.com/thank-you      │        │
│  │     ?invitee_email=...                          │        │
│  │     &invitee_name=...                           │        │
│  │     &event_start_time=...                       │        │
│  │                                                  │        │
│  │     → Клиентът вижда Thank You страница        │        │
│  │                                                  │        │
│  │  B) WEBHOOK (async, след няколко секунди):      │        │
│  │     POST /api/calendly/webhook                  │        │
│  │     {                                            │        │
│  │       "event": "invitee.created",               │        │
│  │       "payload": {                              │        │
│  │         "invitee": {...},                       │        │
│  │         "event": {...},                         │        │
│  │         "payment": {...}                        │        │
│  │       }                                          │        │
│  │     }                                            │        │
│  │                                                  │        │
│  │     → Backend записва в database                │        │
│  │     → (Скоро) Изпраща confirmation email       │        │
│  │                                                  │        │
│  └──────────────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

---

## Troubleshooting

### Проблем: Redirect не работи
**Решение:**
- Провери дали URL-ът е точен (copy-paste)
- Провери дали си включил "Include event details"
- Провери дали си Save-нал промените

### Проблем: Webhook не изпраща data
**Решение:**
- Провери дали webhook е "Active" в Calendly
- Test webhook от Calendly interface
- Провери backend logs: `tail -f /var/log/supervisor/backend.out.log`
- Търси за: `📅 Calendly webhook received`

### Проблем: Test webhook връща грешка
**Решение:**
- Провери дали backend-ът е started: `sudo supervisorctl status backend`
- Restart backend: `sudo supervisorctl restart backend`
- Провери firewall/network settings

---

## Готово! 🎉

След тези стъпки, пълният flow е готов:
- ✅ Клиент записва час в Calendly
- ✅ Плаща (€51 или €138)
- ✅ Redirect към Thank You page
- ✅ Webhook записва booking в database
- ⏳ (Скоро) Автоматичен confirmation email

Имаш въпроси или нещо не работи? Кажи ми! 😊
