import React, { useState } from 'react';
import CountdownTimer from './CountdownTimer';
import RegistrationForm from './RegistrationForm';
import { FaFire, FaUsers } from 'react-icons/fa';

const WebinarHero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#F5F1EB] to-white overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#8C7A6B] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-[#BFAE9F] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-2000" />
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Content */}
          <div className="space-y-5">
            {/* Label */}
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <FaFire className="text-[#8C7A6B] w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C7A6B]">Безплатен Уебинар</span>
            </div>
            
            {/* Main headline */}
            <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl sm:text-4xl lg:text-5xl text-[#2C3E50] leading-tight tracking-tight">
              Защо попадаме в отношения, които ни нараняват?
            </h1>
            
            {/* Target audience - Who is this for */}
            <div className="bg-white p-5 rounded-xl border-l-4 border-[#8C7A6B] shadow-sm">
              <p className="text-xs font-semibold text-[#8C7A6B] mb-2 uppercase tracking-wide">Този уебинар е за теб, ако:</p>
              <ul className="space-y-1.5 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#8C7A6B] font-bold mt-0.5">✓</span>
                  <span className="text-[#2C3E50]">Повтаряш едни и същи грешки във всяка връзка</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8C7A6B] font-bold mt-0.5">✓</span>
                  <span className="text-[#2C3E50]">Чувстваш се заседнала в болезнен модел</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8C7A6B] font-bold mt-0.5">✓</span>
                  <span className="text-[#2C3E50]">Готова си да направиш промяна</span>
                </li>
              </ul>
            </div>
            
            {/* Event details */}
            <div className="bg-white p-5 rounded-xl shadow-md border border-[#E5E7EB]">
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl">📅</span>
                  <div className="flex-1">
                    <p className="text-xs text-[#8C7A6B] font-medium">Дата и час</p>
                    <p className="text-[#2C3E50] font-semibold text-sm">Четвъртък, 16 Юли 2026 • 20:00ч</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl">💻</span>
                  <div className="flex-1">
                    <p className="text-xs text-[#8C7A6B] font-medium">Платформа</p>
                    <p className="text-[#2C3E50] font-semibold text-sm">Google Meet</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl">🎁</span>
                  <div className="flex-1">
                    <p className="text-xs text-[#8C7A6B] font-medium">Цена</p>
                    <p className="text-[#2C3E50] font-bold text-lg">БЕЗПЛАТНО</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Spots remaining */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-xl border-l-4 border-red-500">
              <div className="flex items-center gap-2 mb-2">
                <FaUsers className="text-red-600 w-4 h-4" />
                <p className="font-semibold text-[#2C3E50] text-sm">Остават само 11 от 50 места!</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-[#8C7A6B] to-[#BFAE9F] transition-all duration-500"
                  style={{ width: '78%' }}
                />
              </div>
              <p className="text-xs text-[#8C7A6B] mt-1.5">39 места вече са заети</p>
            </div>
            
            {/* Countdown */}
            <div>
              <p className="text-xs text-[#8C7A6B] font-medium mb-2">Уебинарът започва след:</p>
              <CountdownTimer targetDate="2026-07-16T20:00:00+03:00" />
            </div>
          </div>
          
          {/* Right: Registration Form */}
          <div className="lg:sticky lg:top-8">
            <RegistrationForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebinarHero;
