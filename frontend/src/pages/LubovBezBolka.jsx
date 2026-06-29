import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import MinimalHeader from '../components/lubov/MinimalHeader';
import HeroSection from '../components/lubov/HeroSection';
import PainMirrorSection from '../components/lubov/PainMirrorSection';
import ReframeSection from '../components/lubov/ReframeSection';
import WhatIsSection from '../components/lubov/WhatIsSection';
import MethodSection from '../components/lubov/MethodSection';
import ProgramModulesSection from '../components/lubov/ProgramModulesSection';
import WorkbookSection from '../components/lubov/WorkbookSection';
import AboutMilenaSection from '../components/lubov/AboutMilenaSection';
import WhoThisIsForSection from '../components/lubov/WhoThisIsForSection';
import WhoThisIsNotForSection from '../components/lubov/WhoThisIsNotForSection';
import OfferStackSection from '../components/lubov/OfferStackSection';
import HowAccessWorksSection from '../components/lubov/HowAccessWorksSection';
import FAQSection from '../components/lubov/FAQSection';
import FinalCTASection from '../components/lubov/FinalCTASection';
import StickyMobileCTA from '../components/lubov/StickyMobileCTA';
import Footer from '../components/Footer';
import LUBOV_BEZ_BOLKA_CONFIG from '../config/lubovBezBolka';
import { storeUTMParams, setupScrollTracking } from '../utils/tracking';

const LubovBezBolka = () => {
  useEffect(() => {
    // Store UTM params on page load
    storeUTMParams();
    
    // Setup scroll depth tracking
    const cleanupScroll = setupScrollTracking();
    
    // Meta Pixel initialization (when pixel ID is provided)
    if (LUBOV_BEZ_BOLKA_CONFIG.META_PIXEL_ID && typeof window !== 'undefined') {
      // Meta Pixel code will go here when pixel ID is provided
      console.log('Meta Pixel ID:', LUBOV_BEZ_BOLKA_CONFIG.META_PIXEL_ID);
    }
    
    return () => {
      if (cleanupScroll) cleanupScroll();
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{LUBOV_BEZ_BOLKA_CONFIG.SEO.TITLE}</title>
        <meta name="description" content={LUBOV_BEZ_BOLKA_CONFIG.SEO.DESCRIPTION} />
        <meta name="keywords" content={LUBOV_BEZ_BOLKA_CONFIG.SEO.KEYWORDS} />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={LUBOV_BEZ_BOLKA_CONFIG.SEO.TITLE} />
        <meta property="og:description" content={LUBOV_BEZ_BOLKA_CONFIG.SEO.DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={LUBOV_BEZ_BOLKA_CONFIG.MILENA_PHOTO} />
        
        {/* Mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#2C3E50" />
      </Helmet>
      
      {/* Minimal Header */}
      <MinimalHeader />
      
      {/* Main Content */}
      <main>
        <HeroSection />
        <PainMirrorSection />
        <ReframeSection />
        <WhatIsSection />
        <MethodSection />
        <ProgramModulesSection />
        <WorkbookSection />
        <AboutMilenaSection />
        <WhoThisIsForSection />
        <WhoThisIsNotForSection />
        <OfferStackSection />
        <HowAccessWorksSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      
      {/* Sticky Mobile CTA */}
      <StickyMobileCTA />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LubovBezBolka;
