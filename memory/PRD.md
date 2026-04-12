# Product Requirements Document (PRD)
## Milena Petrova Personal Brand Website

**Project:** milenapetrova.bg  
**Type:** Conversion-optimized quiz funnel + direct booking page  
**Language:** Bulgarian  
**Created:** April 12, 2026  
**Updated:** April 12, 2026 - Admin Dashboard + Cancellation Tracking Added

---

## 🎯 Purpose & Goal

Generate bookings for paid online sessions focused on:
- Relationship patterns
- Family dynamics  
- Generational patterns

**Primary Conversion Flow:** Quiz Funnel (80% of users)  
**Secondary Flow:** Direct Booking (20% of users)

---

## 🔀 Two-Flow Architecture

### Flow 1: Quiz Funnel (Homepage - /)
**Purpose:** Emotional diagnostic → personalized result → booking conversion

**User Journey:**
1. **Hero Section** - Compelling headline + "Направи теста" CTA
2. **Quiz (6 questions)** - Step-by-step, 1 question per screen, progress bar
3. **Results Page** - Personalized result type + emotional copy + booking CTA
4. **Booking** - Redirects to /book#booking-section

**Conversion Points:**
- Primary CTA: "Направи теста"
- Secondary CTA: "Запази час директно"
- Results page: "Запази час сега"

### Flow 2: Direct Booking Page (/book, /session)
**Purpose:** Quick conversion for already-convinced users

**Sections:** Full original website preserved
- Hero, Identification, Reframe, Method, Offer, How It Works, About, Testimonials, FAQ, Final CTA, Booking

---

## 🎨 Brand & Design

**Brand Positioning:**  
Helps women understand and break repeating patterns in relationships

**Core Message:**  
"Не всичко, което носиш, е твое."

**Color Palette:**
- Primary Background: #F5F1EB (soft beige)
- White: #FFFFFF
- Warm Sand: #D8CFC4
- Soft Neutral: #BFAE9F
- Accent: #8C7A6B

**Typography:**
- Headings: Playfair Display (serif)
- Body: Inter (sans-serif)

**Design Principles:**
- Minimal, calm, premium feel
- Lots of whitespace
- Soft shadows and smooth scrolling
- NOT mystical or overly spiritual
- Mobile-first responsive design

---

## 📋 Implemented Features (Apr 12, 2026)

### ✅ Admin Dashboard & Booking Tracking (NEW)

**Backend Routes:**
- `/api/calendly/webhook` - Receives booking/cancellation events from Calendly
- `/api/admin/login` - Admin authentication (username: admin, password: admin123)
- `/api/admin/bookings/stats` - Dashboard statistics (total, confirmed, canceled, revenue)
- `/api/admin/bookings` - All bookings with filters (status, search)

**Frontend Pages:**
- `/admin/login` - Admin login page
- `/admin/dashboard` - Main dashboard with:
  - Stats cards (Total, Confirmed, Canceled, Revenue)
  - Bookings table with filters
  - Search by name/email
  - Status filtering (All/Confirmed/Canceled)

**Features:**
- ✅ Real-time webhook processing
- ✅ Automatic status updates for cancellations
- ✅ Revenue tracking (only confirmed bookings)
- ✅ Cancellation reason logging
- ✅ Beautiful UI with color-coded badges
- ✅ MongoDB storage for all booking data

**Database Schema:**
```javascript
bookings: {
  invitee_email: string,
  invitee_name: string,
  invitee_uri: string,
  event_type_name: string,
  event_start_time: datetime,
  event_end_time: datetime,
  event_uri: string,
  payment_amount: string,
  payment_currency: string,
  payment_status: string,
  status: "confirmed" | "canceled",
  cancellation_reason: string (optional),
  canceled_at: datetime (optional),
  created_at: datetime,
  updated_at: datetime
}
```

**Files:**
- `/app/backend/routes/calendly_webhook.py` - Webhook handler
- `/app/backend/routes/admin.py` - Admin API
- `/app/frontend/src/pages/AdminDashboard.jsx` - Dashboard UI
- `/app/frontend/src/pages/AdminLogin.jsx` - Login UI

---



**Components Created:**
- `/app/frontend/src/components/Header.jsx` - Fixed header with navigation
- `/app/frontend/src/components/quiz/QuizHero.jsx` - Landing hero with CTAs
- `/app/frontend/src/components/quiz/QuizFlow.jsx` - Step-by-step quiz (6 questions)
- `/app/frontend/src/components/quiz/QuizResults.jsx` - Dynamic results page
- `/app/frontend/src/data/quizData.js` - Quiz logic and scoring
- `/app/frontend/src/pages/QuizFunnel.jsx` - Main quiz funnel page

**Quiz Features:**
- 6 diagnostic questions about relationship patterns
- Progress bar showing completion (17%, 33%, 50%, etc.)
- Visual answer selection with hover states
- Back/Forward navigation
- Scoring algorithm (0-18 points)
- 3 result types: Активен родов модел, Емоционален модел, Смесен модел

**Results Page Features:**
- Personalized result type based on quiz score
- **UPGRADED to high-converting sales page:**
  - Emotional validation opening (acknowledges past attempts, doubt)
  - Sharper, more direct explanation
  - NEW "Как може да ти помогне Милена" section (positioning)
  - Benefits block (4 key benefits in 2x2 grid)
  - Urgency block (limited weekly spots)
  - Qualification block (3 criteria for ideal client)
  - Improved CTA text: "Запази час и получи яснота"
  - Trust microcopy: "Запазваш час → плащаш онлайн → получаваш линк"
  - Auto-scroll to Calendly on booking click

### ✅ Navigation & Routing

**Routes:**
- `/` → Quiz Funnel (Hero + Quiz start)
- `/quiz` → Quiz flow (6 questions)
- `/results` → Results page (dynamic based on answers)
- `/book` → Direct booking (full original site)
- `/session` → Direct booking (alias)

**Header Navigation:**
- Logo: "milenapetrova.bg" (links to /)
- Button: "Директно записване" (links to /book)
- Fixed position, backdrop blur effect

### ✅ Frontend (Direct Booking - /book)

**11 Complete Sections:**

1. **Hero Section**
   - Headline and subheadline in Bulgarian
   - Trust indicators
   - Primary & secondary CTAs
   - Background image with overlay

2. **Identification Section**
   - "Разпознаваш ли се?" title
   - 6 bullet points with checkmarks
   - CTA button

3. **Reframe Section**
   - "Проблемът не е в теб." messaging
   - Clean text layout

4. **Method Section**
   - "Как работят сесиите?" explanation
   - Benefits list

5. **Offer Section**
   - Session details (4 items with checkmarks)
   - Pricing cards (51 € / 138 €)
   - CTA buttons on each card

6. **How It Works Section**
   - 5-step process with numbered circles
   - Important note in highlighted box

7. **About Section**
   - "За Милена" title
   - Portrait image (placeholder)
   - Bio text in Bulgarian

8. **Testimonials Section**
   - 5 testimonials
   - 3-column grid layout
   - Quote icons

9. **FAQ Section**
   - Accordion with 5 questions
   - Smooth animations
   - Using shadcn Accordion component

10. **Final CTA Section**
    - Large CTA with transform hover effect
    - Gradient background

11. **Booking Section**
    - ✅ Calendly inline widget integration
    - ✅ Dynamic package selection (51 EUR / 138 EUR)
    - ✅ Payment handled via Calendly Pro

12. **Footer**
    - Website name and email
    - Disclaimer text
    - Copyright

**Components Created:**
- `/app/frontend/src/data/mock.js` - All content data
- `/app/frontend/src/pages/Home.jsx` - Main page
- `/app/frontend/src/components/sections/` - 10 section components
- `/app/frontend/src/components/Footer.jsx`

**Styling:**
- Custom CSS animations (fadeIn, slideUp)
- Smooth scroll behavior
- Hover effects on all interactive elements
- Google Fonts integration (Playfair Display, Inter)

**Functionality:**
- Smooth scrolling to booking section on CTA click
- Accordion FAQ (collapsible)
- Responsive grid layouts
- Mobile-first design

---

## 🔄 Integration Points

1. **Calendly Integration** ✅ LIVE
   - URL: `https://calendly.com/omba-mp/30min`
   - Inline widget embedded in booking section
   - Shows "1 Hour Meeting" with Milena Petrova
   - Fully functional calendar booking

2. **Images**
   - Hero background: Unsplash image
   - About portrait: Unsplash image
   - All images from professional stock sources

3. **Contact Info**
   - Email placeholder: `kontakt@milenapetrova.bg`
   - Domain: `milenapetrova.bg`

4. **Payment**
   - Mentioned in text only
   - No payment gateway integrated yet

---

## 📊 User Flow

1. User lands on hero → sees compelling headline
2. Scrolls through identification → recognizes patterns
3. Reframe section → shifts perspective
4. Method section → understands approach
5. Offer section → sees pricing and value
6. How it works → understands process
7. About section → builds trust with Milena
8. Testimonials → social proof
9. FAQ → addresses concerns
10. Final CTA → motivated to act
11. Booking → selects time slot

**Conversion Points:** CTA buttons appear 5+ times throughout page

---

## 🎯 Next Tasks (Prioritized)

### P0 - Critical for Launch
1. ~~**Calendly Integration**~~ ✅ COMPLETED
   - ✅ Real Calendly account link integrated
   - ✅ Inline widget embedded in booking section
   - ✅ Booking flow tested and working
   - ✅ Calendly Webhooks configured
   - ✅ Admin Dashboard tracks bookings
   - ✅ Automatic cancellation tracking

2. **Real Content**
   - Replace portrait placeholder with actual photo
   - Confirm/update testimonials
   - Verify all Bulgarian text with client

3. **Domain & Hosting**
   - Connect to milenapetrova.bg domain
   - Configure DNS
   - Set up SSL certificate

### P1 - Important
4. ~~**Email Integration**~~ ✅ COMPLETED
   - ✅ Resend API integrated
   - ✅ Confirmation emails for new bookings
   - ✅ Cancellation emails
   - ⚠️ Testing mode (requires domain verification for production)

5. **Domain & Production**
   - Decide on payment method (Stripe, bank transfer, PayPal)
   - Add payment instructions or integration
   - Update confirmation flow

5. **Email Integration**
   - Set up kontakt@milenapetrova.bg email
   - Email confirmation for bookings
   - Email notifications

### P2 - Nice to Have
6. **Analytics**
   - Google Analytics integration
   - Track CTA clicks
   - Monitor conversion rate

7. **SEO Optimization**
   - Meta descriptions
   - Open Graph tags
   - Structured data

8. **Backend (If needed later)**
   - Contact form endpoint
   - Newsletter signup
   - Session tracking

---

## 📝 Notes

- Website is frontend-only with mock data
- All content in Bulgarian as specified
- Design follows premium, minimal aesthetic
- No backend needed for initial launch (Calendly handles booking)
- Ready for deployment once Calendly integration is complete

---

## 🚀 Success Metrics (To Define)

- Booking conversion rate
- Time on page
- Scroll depth
- CTA click-through rate
- Mobile vs desktop usage
