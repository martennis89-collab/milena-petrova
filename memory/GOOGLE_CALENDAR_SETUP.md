# 📅 Google Calendar API Setup Instructions

## Стъпка 1: Създай Google Cloud Project

1. **Отвори Google Cloud Console:**
   👉 https://console.cloud.google.com

2. **Създай нов проект:**
   - Кликни на "Select a project" (горе вляво)
   - Кликни "NEW PROJECT"
   - Име на проекта: `milena-petrova-sessions` (или каквото искаш)
   - Кликни "CREATE"
   - Изчакай проектът да се създаде (10-20 секунди)

---

## Стъпка 2: Activate Google Calendar API

1. **Отвори API Library:**
   - От менюто вляво → "APIs & Services" → "Library"
   - Или директно: https://console.cloud.google.com/apis/library

2. **Намери и активирай Calendar API:**
   - В search bar напиши: `Google Calendar API`
   - Кликни на "Google Calendar API"
   - Кликни бутона "ENABLE"
   - Изчакай да се активира

---

## Стъпка 3: Configure OAuth Consent Screen

1. **Отвори OAuth consent screen:**
   - От менюто вляво → "APIs & Services" → "OAuth consent screen"
   - Или директно: https://console.cloud.google.com/apis/credentials/consent

2. **Избери User Type:**
   - Избери: **External** (за да може клиенти да виждат booking page)
   - Кликни "CREATE"

3. **Попълни OAuth consent screen (Стъпка 1 - App information):**
   ```
   App name: Milena Petrova Sessions
   User support email: [твоят email]
   App logo: [optional - можеш да пропуснеш]
   
   Developer contact information:
   Email addresses: [твоят email]
   ```
   - Кликни "SAVE AND CONTINUE"

4. **Scopes (Стъпка 2):**
   - Кликни "ADD OR REMOVE SCOPES"
   - В search bar напиши: `calendar`
   - Избери тези 2 scopes:
     ✅ `.../auth/calendar` (See, edit, share, and permanently delete all calendars)
     ✅ `.../auth/calendar.events` (View and edit events)
   - Кликни "UPDATE"
   - Кликни "SAVE AND CONTINUE"

5. **Test users (Стъпка 3):**
   - Кликни "ADD USERS"
   - Добави твоя Gmail email (този с който ще използваш Google Calendar)
   - Кликни "ADD"
   - Кликни "SAVE AND CONTINUE"

6. **Summary (Стъпка 4):**
   - Прегледай информацията
   - Кликни "BACK TO DASHBOARD"

---

## Стъпка 4: Create OAuth Credentials

1. **Отвори Credentials page:**
   - От менюто вляво → "APIs & Services" → "Credentials"
   - Или директно: https://console.cloud.google.com/apis/credentials

2. **Създай OAuth Client ID:**
   - Кликни бутона "+ CREATE CREDENTIALS" (горе)
   - Избери "OAuth client ID"

3. **Избери Application type:**
   - Application type: **Web application**
   - Name: `Milena Petrova Web Client`

4. **Authorized JavaScript origins:**
   - Кликни "+ ADD URI"
   - Добави: `https://guided-sessions-2.preview.emergentagent.com`

5. **Authorized redirect URIs:**
   - Кликни "+ ADD URI"
   - Добави ТОЧНО това: `https://guided-sessions-2.preview.emergentagent.com/api/calendar/oauth/callback`
   
   ⚠️ **ВАЖНО:** URL-ът трябва да е ТОЧНО този! Без trailing slash!

6. **Създай credentials:**
   - Кликни "CREATE"
   - ✅ Ще видиш popup с твоите credentials!

7. **Копирай credentials:**
   ```
   Your Client ID: [започва с нещо като 123456789-xxxxx.apps.googleusercontent.com]
   Your Client Secret: [започва с GOCSPX-xxxxx]
   ```
   - Копирай И ДВЕТЕ стойности!
   - Кликни "OK"

---

## Стъпка 5: Добави Credentials в проекта

Изпрати ми двете стойности и аз ще ги добавя в `.env` файла:

```
GOOGLE_CLIENT_ID=твоят_client_id_тук
GOOGLE_CLIENT_SECRET=твоят_client_secret_тук
```

---

## 🎯 След като ми дадеш credentials:

1. Аз ще ги добавя в backend
2. Ще restart-на backend
3. Ще ти дам линк за да свържеш календара
4. След свързване ще можем да тестваме booking flow!

---

## ⚠️ Важни неща:

- Test mode: Докато app-ът е в "Testing", само test users могат да го използват
- Publishing: По-късно можеш да publish app-а за production
- Безопасност: Client Secret е SENSITIVE - не го споделяй публично!

---

## 🆘 Ако имаш проблеми:

- Screenshot-ни къде си затънала
- Провери дали си избрала правилния проект (горе вляво)
- Redirect URI трябва да е ТОЧНО: `https://guided-sessions-2.preview.emergentagent.com/api/calendar/oauth/callback`
