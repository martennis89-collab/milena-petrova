import React, { useState, useEffect } from 'react';
import { FaCheck, FaClock, FaFire } from 'react-icons/fa';
import CheckoutCTA from './CheckoutCTA';
import LUBOV_BEZ_BOLKA_CONFIG from '../../config/lubovBezBolka';

const OfferStackSection = () => {
  const spotsRemaining = LUBOV_BEZ_BOLKA_CONFIG.DISCOUNT_SPOTS_REMAINING;
  const spotsTotal = LUBOV_BEZ_BOLKA_CONFIG.DISCOUNT_SPOTS_TOTAL;
  const spotsTaken = spotsTotal - spotsRemaining;
  const percentageFilled = (spotsTaken / spotsTotal) * 100;
  const offerItems = [
    '14 видео урока',
    '4 основни модула',
    '1 бонус модул',
    'брандирана работна тетрадка',
    'водени практики',
    'достъп през онлайн платформа',
    'гледане със собствено темпо',
    'веднъж закупен, достъп завинаги',
  ];
  
  const bonusOffer = {
    title: 'ГОЛЯМ БОНУС',
    description: '1 безплатна частна сесия с Милена',
    condition: 'само след като завършиш курса на 100%',
    value: '120 euro',
  };
  
  return (
    <section className="py-20 bg-gradient-to-b from-[#F5F1EB] to-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-serif text-[#2C3E50] text-center mb-12">
          Какво получаваш?
        </h2>
        
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-[#8C7A6B]/20">
          
          {/* Discount Banner */}
          <div className="bg-gradient-to-r from-[#8C7A6B] to-[#BFAE9F] p-4 text-center">
            <div className="flex items-center justify-center gap-2 text-white">
              <FaFire className="w-5 h-5" />
              <p className="font-medium">
                Специална цена за първите {spotsTotal} закупили
              </p>
              <FaFire className="w-5 h-5" />
            </div>
          </div>
          
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
            
            {/* Big Bonus Box */}
            <div className="mb-8 p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-400 relative overflow-hidden">
              {/* Sparkle decoration */}
              <div className="absolute top-2 right-2 text-3xl">✨</div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                  <FaCheck className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="inline-block bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                    {bonusOffer.title}
                  </div>
                  
                  <h3 className="text-xl font-serif text-[#2C3E50] mb-2">
                    {bonusOffer.description}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    {bonusOffer.condition}
                  </p>
                  
                  <div className="inline-block bg-white px-4 py-2 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500 line-through mb-1">
                      Стойност: {bonusOffer.value}
                    </p>
                    <p className="text-lg font-bold text-amber-600">
                      БЕЗПЛАТНО за теб
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* COMBINED: Value Stack + Price + Scarcity - Single Unified Section */}
            <div className="bg-gradient-to-br from-[#F5F1EB] to-white rounded-3xl p-8 md:p-12 mb-8 relative overflow-hidden border-2 border-[#8C7A6B]/20">
              
              {/* Discount badge - top right */}
              <div className="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg">
                -38%
              </div>
              
              {/* Value breakdown */}
              <div className="mb-8">
                <h3 className="text-2xl font-serif text-[#2C3E50] mb-6 text-center">
                  Обща стойност на програмата:
                </h3>
                
                <div className="space-y-3 max-w-md mx-auto">
                  <div className="flex justify-between items-center text-gray-600">
                    <span>Онлайн програма (регулярна цена)</span>
                    <span className="font-medium text-lg">{LUBOV_BEZ_BOLKA_CONFIG.ORIGINAL_PRICE}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-gray-600">
                    <span>Бонус: Частна сесия с Милена</span>
                    <span className="font-medium text-lg">{bonusOffer.value}</span>
                  </div>
                  
                  <div className="border-t-2 border-gray-300 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#2C3E50] text-lg">Обща стойност:</span>
                      <span className="text-3xl font-bold text-gray-400 line-through">
                        {LUBOV_BEZ_BOLKA_CONFIG.ORIGINAL_PRICE_NUMERIC + 120}€
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Main price display */}
              <div className="text-center mb-8">
                <p className="text-sm text-[#8C7A6B] uppercase tracking-wide mb-2">
                  Плащаш днес само:
                </p>
                
                <div className="mb-4">
                  <span className="text-3xl text-gray-400 line-through mr-4">
                    {LUBOV_BEZ_BOLKA_CONFIG.ORIGINAL_PRICE}
                  </span>
                  <span className="text-6xl md:text-7xl font-serif text-[#2C3E50] font-bold">
                    49€
                  </span>
                </div>
                
                <p className="text-base text-[#4A4A4A] mb-6">
                  еднократно плащане
                </p>
                
                {/* Savings badge */}
                <div className="inline-block bg-green-500 text-white px-8 py-4 rounded-2xl shadow-lg">
                  <p className="text-sm font-medium mb-1">Спестяваш</p>
                  <p className="text-4xl font-bold">
                    {(LUBOV_BEZ_BOLKA_CONFIG.ORIGINAL_PRICE_NUMERIC + 120) - LUBOV_BEZ_BOLKA_CONFIG.PRICE_NUMERIC}€
                  </p>
                </div>
              </div>
              
              {/* Scarcity counter */}
              <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-[#8C7A6B]/30">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <FaClock className="w-5 h-5 text-[#8C7A6B]" />
                  <p className="text-lg font-bold text-[#2C3E50]">
                    Остават само {spotsRemaining} места на тази цена
                  </p>
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-3">
                  <div 
                    className="bg-gradient-to-r from-[#8C7A6B] to-[#BFAE9F] h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentageFilled}%` }}
                  ></div>
                </div>
                
                <p className="text-sm text-gray-500 text-center">
                  {spotsTaken} от {spotsTotal} места вече са заети
                </p>
              </div>
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
