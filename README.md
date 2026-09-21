# milenapetrova.bg

Conversion-focused website for Milena Petrova's paid online sessions, in
Bulgarian. Two entry paths lead to the same booking flow: a six-question quiz
funnel for visitors who are still deciding, and a direct booking page for those
who already are.

There is also a standalone sales page for the "Любов без болка" programme and a
webinar registration flow with reminder emails.

The full product specification lives in [`memory/PRD.md`](memory/PRD.md).

---

## Stack

| Layer     | Technology                                              |
| --------- | ------------------------------------------------------- |
| Frontend  | React 19, Create React App via craco, Tailwind, shadcn/ui, React Router |
| Backend   | FastAPI, Uvicorn, Motor (async MongoDB)                 |
| Database  | MongoDB                                                 |
| Payments  | Stripe Checkout                                         |
| Email     | Resend                                                  |
| Calendar  | Google Calendar API, Calendly webhooks                  |
| Tracking  | Meta Pixel (browser) + Conversions API (server)         |
| Scheduler | APScheduler, for webinar reminder emails                |

This project began on Emergent and no longer depends on it. See
[Migration off Emergent](#migration-off-emergent) for what changed and what is
still outstanding.

---

## Prerequisites

Either Docker, or a local toolchain:

- Python 3.11+
- Node.js 20+ and Yarn 1.x
- MongoDB 7 running locally, or a MongoDB Atlas connection string

---

## Quick start with Docker

```bash
make env                  # create backend/.env and frontend/.env from templates
$EDITOR backend/.env      # fill in real values
docker compose up --build
```

| Service  | URL                          |
| -------- | ---------------------------- |
| Frontend | http://localhost:3000        |
| Backend  | http://localhost:8001        |
| API docs | http://localhost:8001/docs   |
| MongoDB  | mongodb://localhost:27017    |

The site runs without Stripe, Resend or Google credentials — those features
return a clear error instead of breaking the rest of the page.

Note that `REACT_APP_*` variables are compiled into the JavaScript bundle, so
changing them requires `docker compose build frontend`, not just a restart.

---

## Quick start without Docker

```bash
make env                  # create both .env files
make install              # backend + frontend dependencies
```

Then run the two halves in separate terminals:

```bash
make dev-backend          # uvicorn on :8001, with reload
make dev-frontend         # CRA dev server on :3000
```

`make dev-backend` needs a reachable MongoDB. For a throwaway one:

```bash
docker run -d -p 27017:27017 --name milena-mongo mongo:7
```

---

## Configuration

Every variable is documented in
[`backend/.env.example`](backend/.env.example) and
[`frontend/.env.example`](frontend/.env.example). Both are placeholder-only and
safe to commit; the real `.env` files are gitignored.

Only two are strictly required — the backend refuses to start without them:

| Variable    | Purpose                              |
| ----------- | ------------------------------------ |
| `MONGO_URL` | MongoDB connection string            |
| `DB_NAME`   | Database name                        |

Everything else degrades gracefully:

| Feature           | Variables                                                         | Without them                          |
| ----------------- | ----------------------------------------------------------------- | ------------------------------------- |
| Admin dashboard   | `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`                           | Login returns 503                     |
| Payments          | `STRIPE_API_KEY`, `STRIPE_WEBHOOK_SECRET`                         | `/api/payments/*` returns 503         |
| Email             | `RESEND_API_KEY`, `SENDER_EMAIL`                                  | Emails are skipped and logged         |
| Google Calendar   | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI` | Calendar endpoints fail               |
| Server tracking   | `META_PIXEL_ID`, `META_ACCESS_TOKEN`                              | Conversions API calls become no-ops   |
| Email/OG links    | `SITE_URL`, `REACT_APP_SITE_URL`                                  | Default to `https://milenapetrova.bg` |

Set `CORS_ORIGINS` before going live. It defaults to `*`.

Integration-specific walkthroughs live in `memory/`:
[Calendly](memory/CALENDLY_STEP_BY_STEP.md),
[Calendly webhooks](memory/CALENDLY_WEBHOOK_SETUP.md),
[cancellation tracking](memory/CANCELLATION_TRACKING_GUIDE.md),
[Google Calendar](memory/GOOGLE_CALENDAR_SETUP.md),
[Resend](memory/RESEND_EMAIL_SETUP.md), and
[Meta tracking](FACEBOOK_TRACKING_INTEGRATION.md).

### Admin password

Admin login is disabled until `ADMIN_PASSWORD_HASH` is set. Generate one with:

```bash
python3 -c "import hashlib,getpass;print(hashlib.sha256(getpass.getpass().encode()).hexdigest())"
```

---

## Routes

### Pages

| Path                | Purpose                                     |
| ------------------- | ------------------------------------------- |
| `/`                 | Quiz funnel (primary entry point)           |
| `/quiz`, `/results` | Quiz steps and personalised result          |
| `/book`, `/session` | Direct booking page                         |
| `/lubov-bez-bolka`  | "Любов без болка" programme sales page      |
| `/webinar`          | Webinar registration                        |
| `/payment`          | Stripe checkout hand-off                    |
| `/payment/success`  | Polls payment status after returning        |
| `/payment/cancel`   | Abandoned checkout                          |
| `/thank-you`        | Post-booking confirmation                   |
| `/admin/login`      | Admin login                                 |
| `/admin/dashboard`  | Bookings, stats, cancellations              |
| `/admin/webinar`    | Webinar registrations                       |

### API

All endpoints are under `/api`. Interactive docs: `/docs`.

| Group     | Endpoints                                                                       |
| --------- | ------------------------------------------------------------------------------- |
| Health    | `GET /api/`, `GET|POST /api/status`                                             |
| Payments  | `POST /api/payments/checkout/session`, `GET /api/payments/checkout/status/{id}`, `POST /api/payments/webhook/stripe`, `GET /api/payments/packages` |
| Calendar  | `GET /api/calendar/available-slots`, `POST /api/calendar/create-event`, `GET /api/calendar/oauth/login`, `GET /api/calendar/oauth/callback`, `GET /api/calendar/connection-status` |
| Calendly  | `POST /api/calendly/webhook`, `GET /api/calendly/bookings`                      |
| Admin     | `POST /api/admin/login`, `POST /api/admin/logout`, `GET /api/admin/bookings`, `GET /api/admin/bookings/stats` |
| Webinar   | `POST /api/webinar/register`, `GET /api/webinar/registrations`, `GET /api/webinar/stats` |
| Tracking  | `POST /api/facebook/track-event`, `/track-page-view`, `/track-cta-click`         |

Session prices are defined server-side in
[`backend/config/payment_config.py`](backend/config/payment_config.py) and are
never taken from the client.

---

## Testing

```bash
make test               # unit tests, no server or database needed
make test-integration   # needs a running API; set REACT_APP_BACKEND_URL first
make lint               # flake8 over the backend
make format             # black + isort
```

The frontend is linted by the build rather than by a separate command:
react-scripts runs eslint during `make build` and `make dev-frontend`, using the
rules in `frontend/craco.config.js`.

Integration tests are marked `integration` and excluded from the default run
(see `backend/pytest.ini`), so `make test` stays meaningful in CI.

---

## Deployment

The repository is configured for MongoDB Atlas + Render (API) + Vercel
(frontend). `render.yaml` and `vercel.json` describe both services; no secret is
stored in either file.

Self-hosting works too — `docker compose up --build` runs the same stack, and
`frontend/nginx.conf` provides the SPA fallback that React Router needs.

### 0. Rescue the media first

Two portraits and the workbook PDF are still served from Emergent's CDN. **Do
this before the Emergent project is deleted**, or the files are gone:

```bash
./scripts/fetch-assets.sh          # downloads into frontend/public/assets/
git add frontend/public/assets && git commit -m "Add brand assets"
```

Then set `REACT_APP_ASSET_BASE_URL=/assets`. Social meta tags stay absolute
automatically (`SOCIAL_ASSETS` in `src/config/site.js`), because crawlers do not
resolve relative image paths.

### 1. MongoDB Atlas

Create a cluster and a database user, allow network access from Render, and copy
the `mongodb+srv://` connection string. `dnspython` is pinned precisely so that
form of URI resolves.

### 2. Render (API)

Render → New → Blueprint → select this repository. It reads `render.yaml` and
builds `backend/Dockerfile`. Then fill in the dashboard values that the
blueprint deliberately leaves empty — `MONGO_URL`, the Stripe keys, Resend,
Google and the admin hash.

Two ordering details:

- `CORS_ORIGINS` needs the Vercel domain, which does not exist until step 3.
  Set it afterwards.
- `GOOGLE_REDIRECT_URI` must match Google Cloud Console exactly:
  `https://<service>.onrender.com/api/calendar/oauth/callback`.

The service binds `$PORT`, which Render assigns. Avoid the free instance type:
it sleeps, and a cold start stalls the first booking of the day.

### 3. Vercel (frontend)

Import the repository. `vercel.json` sets the build to `frontend/` and rewrites
all unmatched paths to `index.html`, so deep links such as `/lubov-bez-bolka`
survive a hard refresh.

Set these in project settings — they are compiled into the bundle, so changing
one needs a **rebuild**, not a restart:

| Variable                  | Value                                  |
| ------------------------- | -------------------------------------- |
| `REACT_APP_BACKEND_URL`   | `https://<service>.onrender.com`       |
| `REACT_APP_SITE_URL`      | `https://milenapetrova.bg`             |
| `REACT_APP_ASSET_BASE_URL`| `/assets` (after step 0)               |

### 4. Close the loop

1. Set `CORS_ORIGINS` on Render to the Vercel origin — include the custom domain
   as well as `*.vercel.app` if both are in use.
2. Register the Stripe webhook at
   `https://<service>.onrender.com/api/payments/webhook/stripe` and paste its
   signing secret into `STRIPE_WEBHOOK_SECRET`. Until then, payments are never
   confirmed by webhook, because unverified payloads are rejected by design.
3. Verify a booking end to end with a Stripe test key before switching to live.

### Known constraints

- **One worker only.** Admin session tokens live in process memory
  (`backend/routes/admin.py`), so a second worker or instance would hold a
  different set and log admins out at random. Move them to Redis or switch to
  signed tokens before scaling out.
- **Do not expose MongoDB publicly.** The port mapping in `docker-compose.yml`
  is a local convenience only.

---

## Migration off Emergent

This repository was generated on Emergent and ran inside its
`fastapi_react_mongo_shadcn_base_image_cloud_arm` image. Two hard dependencies
made it impossible to build or run anywhere else, and both are gone:

| Was | Now |
| --- | --- |
| `emergentintegrations.payments.stripe.checkout`, a proprietary package served from a private pip index — the backend could not even import without it | [`backend/utils/stripe_checkout.py`](backend/utils/stripe_checkout.py), built on the official `stripe` SDK, same call surface, covered by unit tests |
| `@emergentbase/visual-edits` pinned to a tarball on `assets.emergent.sh`, so any `yarn install` failed if that host was unreachable | Removed, along with the now-dead craco hook and the badge-hiding CSS/JS |
| `backend/requirements.txt` was a `pip freeze` of the whole base image: ~140 packages including litellm, openai, google-genai, boto3, pandas and numpy | Direct dependencies only, still pinned; dev tooling split into `requirements-dev.txt` |
| `og:url` pointed at `guided-sessions-2.preview.emergentagent.com` | Derived from `SITE_URL` / `REACT_APP_SITE_URL` |
| A booking email linked to the preview subdomain while its link text read `milenapetrova.bg/book` | Uses `SITE_URL` |
| No README, env templates, lockfile or container definitions | All present; `yarn.lock` committed for reproducible installs |

### Still outstanding

**Rehost the media.** The two portrait images and the workbook PDF are still
served from `customer-assets.emergentagent.com` and will start returning 404 if
that Emergent project is deleted. Nothing in this repository can prevent that —
run [`scripts/fetch-assets.sh`](scripts/fetch-assets.sh) while the Emergent job
is still alive, then set `REACT_APP_ASSET_BASE_URL=/assets`. Everything resolves
through [`frontend/src/config/site.js`](frontend/src/config/site.js), so no other
file changes.

**Check the session prices.** `frontend/src/pages/Payment.jsx` displays €51 and
€138, while `backend/config/payment_config.py` charges €50 and €130. The backend
value is what Stripe bills. This mismatch predates the migration and was left
alone deliberately, because correcting it is a pricing decision rather than a
code cleanup.

**Admin auth is minimal.** Passwords are unsalted SHA-256 (despite a comment
claiming bcrypt) and tokens live in memory. It no longer accepts a default
password, but it is not strong enough to guard client contact details long term.

**Duplicate database client.** `backend/routes/webinar.py` opens its own
`AsyncIOMotorClient` instead of reusing the one in `server.py`, so the app holds
two connection pools.
