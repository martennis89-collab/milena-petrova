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
      <div className="absolute -bottom-20 left-1/2 w-80 h-80 bg-[#8C7A6B] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-4000" />
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            {/* Label */}
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <FaFire className="text-[#8C7A6B] w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C7A6B]">Безплатен Уебинар</span>
            </div>
            
            {/* Main headline */}
            <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl sm:text-5xl lg:text-6xl text-[#2C3E50] leading-tight tracking-tight">
              Защо попадаме в отношения, които ни нараняват?
            </h1>
            
            {/* Target audience - Who is this for */}
            <div className="bg-white p-6 rounded-xl border-l-4 border-[#8C7A6B] shadow-sm">
              <p className="text-sm font-semibold text-[#8C7A6B] mb-3 uppercase tracking-wide">Този уебинар е за теб, ако:</p>
              <ul className="space-y-2 text-[#2C3E50]">
                <li className="flex items-start gap-3">
                  <span className="text-[#8C7A6B] font-bold mt-0.5">✓</span>
                  <span>Постоянно попадаш в отношения, които те нараняват, но не знаеш защо</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#8C7A6B] font-bold mt-0.5">✓</span>
                  <span>Чувстваш се заседнала в един и същ болезнен модел във връзките си</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#8C7A6B] font-bold mt-0.5">✓</span>
                  <span>Готова си да разбереш какво те задържа и как да направиш промяна</span>
                </li>
              </ul>
            </div>
            
            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-[#4A4A4A] leading-relaxed">
              Понякога най-важният въпрос не е:<br/>
              <span className="italic text-[#8C7A6B]">"Защо той се държи така?"</span><br/>
              А:<br/>
              <span className="font-semibold text-[#2C3E50]">"Какво ме задържа в отношения, които ме нараняват?"</span>
            </p>
            
            {/* Event details */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-[#E5E7EB]">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📅</span>
                  <div>
                    <p className="text-sm text-[#8C7A6B] font-medium">Дата и час</p>
                    <p className="text-[#2C3E50] font-semibold">Четвъртък, 16 Юли 2025 • 20:00 - 21:00ч</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💻</span>
                  <div>
                    <p className="text-sm text-[#8C7A6B] font-medium">Платформа</p>
                    <p className="text-[#2C3E50] font-semibold">Google Meet (онлайн)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎁</span>
                  <div>
                    <p className="text-sm text-[#8C7A6B] font-medium">Цена</p>
                    <p className="text-[#2C3E50] font-semibold text-xl">БЕЗПЛАТНО</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Countdown */}
            <div>
              <p className="text-sm text-[#8C7A6B] font-medium mb-3">Уебинарът започва след:</p>
              <CountdownTimer targetDate="2025-07-16T20:00:00+03:00" />
            </div>
            
            {/* Spots remaining */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 p-5 rounded-xl border-l-4 border-red-500">
              <div className="flex items-center gap-3 mb-3">
                <FaUsers className="text-red-600 w-5 h-5" />
                <p className="font-semibold text-[#2C3E50]">Остават само 11 от 50 места!</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-[#8C7A6B] to-[#BFAE9F] transition-all duration-500"
                  style={{ width: '78%' }}
                />
              </div>
              <p className="text-sm text-[#8C7A6B] mt-2">39 места вече са заети</p>
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
