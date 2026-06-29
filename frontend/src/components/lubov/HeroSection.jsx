import React from 'react';
import CheckoutCTA from './CheckoutCTA';
import LUBOV_BEZ_BOLKA_CONFIG from '../../config/lubovBezBolka';
import { Video, BookOpen, Heart, Monitor } from 'lucide-react';

const HeroSection = () => {
  const trustBadges = [
    { icon: Video, text: '16 видео урока' },
    { icon: BookOpen, text: 'Работна тетрадка' },
    { icon: Heart, text: 'Водени практики' },
    { icon: Monitor, text: 'Онлайн достъп' },
  ];
  
  return (
    <section className="relative bg-gradient-to-b from-[#F5F1EB] to-white py-16 md:py-24 overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-64 h-64 bg-[#8C7A6B] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-[#BFAE9F] rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          
          {/* Left: Copy and CTA */}
          <div className="order-2 lg:order-1">
            {/* Eyebrow */}
            <div className="inline-block mb-4 px-4 py-2 bg-white rounded-full shadow-sm">
              <p className="text-sm font-medium text-[#8C7A6B] tracking-wide">
                {LUBOV_BEZ_BOLKA_CONFIG.PROGRAM.SUBTITLE}
              </p>
            </div>
            
            {/* Product name */}
            <h1 className="text-5xl md:text-6xl font-serif text-[#2C3E50] mb-6 leading-tight">
              {LUBOV_BEZ_BOLKA_CONFIG.PROGRAM.NAME}
            </h1>
            
            {/* Headline */}
            <p className="text-xl md:text-2xl text-[#2C3E50] mb-6 leading-relaxed font-light">
              Когато любовта започне да боли, първата стъпка не е да се обвиняваш. Първата стъпка е да разбереш модела.
            </p>
            
            {/* Subheadline */}
            <p className="text-lg text-[#4A4A4A] mb-8 leading-relaxed">
              Програма за жени, които искат да разпознаят болезнените модели във връзките, да спрат да оправдават това, което ги наранява, и да започнат да се връщат към себе си.
            </p>
            
            {/* Trust line */}
            <div className="mb-8 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <p className="text-[#8C7A6B] font-medium">
                4 основни модула + бонус модул + брандирана работна тетрадка
              </p>
            </div>
            
            {/* Primary CTA */}
            <div className="mb-6">
              <CheckoutCTA 
                location="hero"
                className="text-lg px-10 py-5"
              />
            </div>
            
            {/* Small text under CTA */}
            <p className="text-sm text-[#8C7A6B] mb-10">
              Гледаш със собствено темпо. Достъпът се изпраща по имейл след покупка.
            </p>
            
            {/* Mini cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {trustBadges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <div 
                    key={index}
                    className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <Icon className="w-6 h-6 text-[#8C7A6B] mb-2" />
                    <p className="text-xs text-center text-[#4A4A4A] font-medium">
                      {badge.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Right: Milena photo */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8C7A6B] to-[#BFAE9F] rounded-3xl transform rotate-3 opacity-10"></div>
              <img 
                src={LUBOV_BEZ_BOLKA_CONFIG.MILENA_PHOTO}
                alt="Милена Петрова"
                className="relative z-10 w-full rounded-3xl shadow-2xl"
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
