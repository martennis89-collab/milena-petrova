import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import HeroSection from '../components/sections/HeroSection';
import IdentificationSection from '../components/sections/IdentificationSection';
import ReframeSection from '../components/sections/ReframeSection';
import MethodSection from '../components/sections/MethodSection';
import OfferSection from '../components/sections/OfferSection';
import HowItWorksSection from '../components/sections/HowItWorksSection';
import AboutSection from '../components/sections/AboutSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import FaqSection from '../components/sections/FaqSection';
import FinalCtaSection from '../components/sections/FinalCtaSection';
import BookingSection from '../components/sections/BookingSection';
import Footer from '../components/Footer';

const DirectBooking = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to booking section if coming from quiz results
    if (location.state?.scrollToBooking) {
      setTimeout(() => {
        const bookingSection = document.getElementById('booking-section');
        if (bookingSection) {
          bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }, [location]);

  return (
    <div className="direct-booking-page">
      <Header />
      <HeroSection />
      <IdentificationSection />
      <ReframeSection />
      <MethodSection />
      <OfferSection />
      <HowItWorksSection />
      <AboutSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCtaSection />
      <BookingSection />
      <Footer />
    </div>
  );
};

export default DirectBooking;
