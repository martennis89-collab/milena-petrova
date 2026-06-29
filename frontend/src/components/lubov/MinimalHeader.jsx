import React from 'react';
import CheckoutCTA from './CheckoutCTA';

const MinimalHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-serif text-[#2C3E50]">
                milenapetrova.bg
              </span>
            </a>
          </div>
          
          {/* CTA Button - hidden on mobile, shown on desktop */}
          <div className="hidden md:block">
            <CheckoutCTA 
              text="Искам достъп"
              location="header"
              className="px-6 py-3"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default MinimalHeader;
