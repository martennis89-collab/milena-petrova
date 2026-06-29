import React, { useState, useEffect } from 'react';
import CheckoutCTA from './CheckoutCTA';

const StickyMobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling past hero (approximately 600px)
      const scrolled = window.scrollY > 600;
      setIsVisible(scrolled);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="bg-white border-t border-gray-200 shadow-lg p-4">
        <CheckoutCTA 
          text="Искам достъп"
          variant="sticky"
          location="sticky_mobile"
          fullWidth
        />
      </div>
    </div>
  );
};

export default StickyMobileCTA;
