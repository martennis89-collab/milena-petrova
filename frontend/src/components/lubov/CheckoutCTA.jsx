import React from 'react';
import { appendUTMParams, trackCTAClick } from '../../utils/tracking';
import LUBOV_BEZ_BOLKA_CONFIG from '../../config/lubovBezBolka';

const CheckoutCTA = ({ 
  text = 'Искам достъп до програмата',
  variant = 'primary', // primary, secondary, sticky
  location = 'unknown',
  className = '',
  fullWidth = false,
}) => {
  const handleClick = () => {
    trackCTAClick(location);
    
    const checkoutUrl = appendUTMParams(LUBOV_BEZ_BOLKA_CONFIG.CHECKOUT_URL);
    window.location.href = checkoutUrl;
  };
  
  const baseClasses = 'inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-[#2C3E50] text-white hover:bg-[#34495E] focus:ring-[#2C3E50] shadow-md hover:shadow-lg transform hover:-translate-y-0.5',
    secondary: 'bg-white text-[#2C3E50] border-2 border-[#2C3E50] hover:bg-[#F5F1EB] focus:ring-[#2C3E50]',
    sticky: 'bg-[#2C3E50] text-white hover:bg-[#34495E] focus:ring-[#2C3E50] shadow-lg w-full',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      onClick={handleClick}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`}
      data-cta-location={location}
    >
      {text}
    </button>
  );
};

export default CheckoutCTA;
