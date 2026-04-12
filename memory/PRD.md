# Product Requirements Document (PRD)
## Milena Petrova Personal Brand Website

**Project:** milenapetrova.bg  
**Type:** One-page premium landing website  
**Language:** Bulgarian  
**Created:** April 12, 2026  

---

## 🎯 Purpose & Goal

Generate bookings for paid online sessions focused on:
- Relationship patterns
- Family dynamics  
- Generational patterns

**Primary CTA:** "Запази час" (Book a time)

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

### ✅ Frontend (Mock Data Phase)

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
   - Pricing cards (90 лв / 240 лв)
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
    - Calendly placeholder (ready for integration)
    - Calendar icon

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

2. **Real Content**
   - Replace portrait placeholder with actual photo
   - Confirm/update testimonials
   - Verify all Bulgarian text with client

3. **Domain & Hosting**
   - Connect to milenapetrova.bg domain
   - Configure DNS
   - Set up SSL certificate

### P1 - Important
4. **Payment Integration** (Optional for MVP)
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
