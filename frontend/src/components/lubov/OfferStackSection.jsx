import React from 'react';
import { FaCheck } from 'react-icons/fa';
import CheckoutCTA from './CheckoutCTA';
import LUBOV_BEZ_BOLKA_CONFIG from '../../config/lubovBezBolka';

const OfferStackSection = () => {
  const offerItems = [
    '16 видео урока',
    '4 основни модула',
    '1 бонус модул',
    'брандирана работна тетрадка',
    'водени практики',
    'достъп през онлайн платформа',
    'гледане със собствено темпо',
    `достъп: ${LUBOV_BEZ_BOLKA_CONFIG.ACCESS_DURATION}`,
  ];
  
  return (
    <section className="py-20 bg-gradient-to-b from-[#F5F1EB] to-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-serif text-[#2C3E50] text-center mb-12">
          Какво получаваш?
        </h2>
        
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-[#8C7A6B]/20">
          
          {/* Offer stack items */}
          <div className="p-8 md:p-12">
            <div className="space-y-4 mb-8">
              {offerItems.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center"
                >
                  <div className="w-6 h-6 rounded-full bg-[#8C7A6B] flex items-center justify-center flex-shrink-0">
                    <FaCheck className="w-4 h-4 text-white" />
                  </div>
                  <p className="ml-4 text-lg text-[#2C3E50]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Price */}
            <div className="bg-[#F5F1EB] rounded-2xl p-8 mb-8 text-center">
              <p className="text-sm text-[#8C7A6B] uppercase tracking-wide mb-2">
                Цена
              </p>
              <p className="text-5xl font-serif text-[#2C3E50] mb-2">
                {LUBOV_BEZ_BOLKA_CONFIG.PRICE}
              </p>
              <p className="text-sm text-[#4A4A4A]">
                еднократно плащане
              </p>
            </div>
            
            {/* Refund policy */}
            <div className="bg-white rounded-xl p-6 mb-8 border-2 border-[#8C7A6B]/20">
              <p className="text-sm font-medium text-[#8C7A6B] mb-2">
                Гаранция за възстановяване на средства
              </p>
              <p className="text-sm text-[#4A4A4A] leading-relaxed">
                {LUBOV_BEZ_BOLKA_CONFIG.REFUND_POLICY}
              </p>
            </div>
            
            {/* CTA */}
            <div className="text-center">
              <CheckoutCTA 
                location="offer_stack"
                className="text-lg px-12 py-5"
              />
              
              <p className="mt-4 text-sm text-[#8C7A6B]">
                След покупка ще получиш имейл с инструкции за достъп.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default OfferStackSection;
