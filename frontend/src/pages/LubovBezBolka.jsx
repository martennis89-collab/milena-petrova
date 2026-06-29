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
    
    // Hide Emergent badge with JavaScript
    const hideEmergentBadge = () => {
      // Find and hide "Made with Emergent" badge
      const allLinks = document.querySelectorAll('a');
      allLinks.forEach(link => {
        if (link.href && (link.href.includes('emergent') || link.textContent.includes('Emergent') || link.textContent.includes('emergent'))) {
          link.style.display = 'none';
          if (link.parentElement) {
            link.parentElement.style.display = 'none';
          }
        }
      });
      
      // Hide any fixed bottom-right elements (common badge position)
      const allElements = document.querySelectorAll('*');
      allElements.forEach(el => {
        const style = window.getComputedStyle(el);
        if (style.position === 'fixed' && 
            (style.bottom === '0px' || style.bottom === '20px' || style.bottom === '16px') &&
            (style.right === '0px' || style.right === '20px' || style.right === '16px')) {
          const text = el.textContent.toLowerCase();
          if (text.includes('emergent') || text.includes('made with')) {
            el.style.display = 'none';
          }
        }
      });
    };
    
    // Run immediately and after a delay
    hideEmergentBadge();
    setTimeout(hideEmergentBadge, 1000);
    setTimeout(hideEmergentBadge, 3000);
    
    // Watch for DOM changes
    const observer = new MutationObserver(hideEmergentBadge);
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Meta Pixel initialization (when pixel ID is provided)
    if (LUBOV_BEZ_BOLKA_CONFIG.META_PIXEL_ID && typeof window !== 'undefined') {
      // Meta Pixel code will go here when pixel ID is provided
      console.log('Meta Pixel ID:', LUBOV_BEZ_BOLKA_CONFIG.META_PIXEL_ID);
    }
    
    return () => {
      if (cleanupScroll) cleanupScroll();
      observer.disconnect();
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{LUBOV_BEZ_BOLKA_CONFIG.SEO.TITLE}</title>
        <meta name="description" content={LUBOV_BEZ_BOLKA_CONFIG.SEO.DESCRIPTION} />
        <meta name="keywords" content={LUBOV_BEZ_BOLKA_CONFIG.SEO.KEYWORDS} />
        
        {/* Open Graph tags for Facebook/Social sharing */}
        <meta property="og:site_name" content="Милена Петрова" />
        <meta property="og:title" content="Любов без болка - Онлайн програма за жени в токсични връзки" />
        <meta property="og:description" content="14 видео урока + работна тетрадка + бонус частна сесия с Милена. Научи се да разпознаеш болезнените модели и да избираш любов без болка. Специална цена 49€ (вместо 199€) за първите 20." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={LUBOV_BEZ_BOLKA_CONFIG.SEO.OG_URL} />
        <meta property="og:image" content={LUBOV_BEZ_BOLKA_CONFIG.SEO.OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Любов без болка - Онлайн програма на Милена Петрова" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Любов без болка - Онлайн програма за жени в токсични връзки" />
        <meta name="twitter:description" content="14 видео урока + работна тетрадка + бонус частна сесия. Специална цена 49€ за първите 20." />
        <meta name="twitter:image" content={LUBOV_BEZ_BOLKA_CONFIG.SEO.OG_IMAGE} />
        
        {/* Mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#2C3E50" />
        
        {/* Hide Emergent badge */}
        <style>{`
          /* Hide Emergent badge - comprehensive selectors */
          [class*="emergent"], 
          [class*="Emergent"],
          [id*="emergent"],
          [id*="Emergent"],
          a[href*="emergentagent"],
          a[href*="emergent.com"],
          a:has(p:contains("Made with Emergent")),
          a > p:contains("Made with Emergent"),
          [style*="position: fixed"][style*="bottom"][style*="right"],
          div[style*="z-index: 999"],
          div[style*="z-index: 9999"] {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
          }
          
          /* Additional broad hiding */
          body > div:last-child:has(a[href*="emergent"]) {
            display: none !important;
          }
        `}</style>
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
