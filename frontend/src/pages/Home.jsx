import React from 'react';
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

const Home = () => {
  return (
    <div className="milena-website">
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

export default Home;
