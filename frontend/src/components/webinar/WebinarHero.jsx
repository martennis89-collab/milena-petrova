import React, { useState } from 'react';
import CountdownTimer from './CountdownTimer';
import RegistrationForm from './RegistrationForm';
import { FaFire, FaUsers, FaCheckCircle } from 'react-icons/fa';

const WebinarHero = () => {
  return (
    <>
      {/* Date Banner - Sticky top */}
      <div className="bg-gradient-to-r from-[#D4758C] to-[#B85C7A] text-white py-3 text-center sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4">
          <p className="text-sm sm:text-base font-bold">
            💝 Безплатен уебинар за жени в повтарящи се нездравословни връзки • <span className="text-yellow-200">16 ЮЛИ 2026, 20:00ч</span>
          </p>
        </div>
      </div>
      
      <section className="relative bg-gradient-to-br from-[#FFF5F7] via-[#FFE8ED] to-[#FFD4DC] overflow-hidden">
      {/* Decorative floral elements */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-300 to-rose-300 rounded-full blur-3xl"></div>
      </div>
      <div className="absolute bottom-0 right-0 w-96 h-96 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-tl from-rose-300 to-pink-200 rounded-full blur-3xl"></div>
      </div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4758C' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        {/* Centered content */}
        <div className="text-center space-y-6">
          {/* Label with gold accent */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full border-2 border-[#D4758C]/30 shadow-sm">
            <span className="text-2xl">💝</span>
            <span className="text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-[#D4758C] to-[#B85C7A] bg-clip-text text-transparent">Безплатен Уебинар</span>
          </div>
          
          {/* Main headline - elegant serif */}
          <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-[#B85C7A] via-[#D4758C] to-[#E89AAC] bg-clip-text text-transparent leading-tight tracking-tight max-w-4xl mx-auto font-bold">
            Защо попадаме в отношения, които ни нараняват?
          </h1>
          
          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 py-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4758C]"></div>
            <span className="text-2xl">💕</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4758C]"></div>
          </div>
          
          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-[#7A5662] max-w-3xl mx-auto leading-relaxed font-medium">
            Как да разпознаеш модела и да започнеш да излизаш от него
          </p>
          
          {/* Key Benefits - 3 columns with rose theme */}
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-8">
            <div className="bg-white/60 backdrop-blur-sm border-2 border-[#D4758C]/20 rounded-2xl p-5 text-left shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-[#D4758C] to-[#B85C7A] rounded-full flex items-center justify-center mb-3 shadow-md">
                <FaCheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[#7A5662] font-bold mb-2 text-base">Разпознай моделите</h3>
              <p className="text-[#9B7680] text-sm leading-relaxed">Научи да виждаш болезнените модели преди да се повторят</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm border-2 border-[#D4758C]/20 rounded-2xl p-5 text-left shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-[#D4758C] to-[#B85C7A] rounded-full flex items-center justify-center mb-3 shadow-md">
                <FaCheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[#7A5662] font-bold mb-2 text-base">Разбери дълбоката причина</h3>
              <p className="text-[#9B7680] text-sm leading-relaxed">Открий защо се връщаш към едни и същи избори</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm border-2 border-[#D4758C]/20 rounded-2xl p-5 text-left shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-[#D4758C] to-[#B85C7A] rounded-full flex items-center justify-center mb-3 shadow-md">
                <FaCheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[#7A5662] font-bold mb-2 text-base">Започни промяната</h3>
              <p className="text-[#9B7680] text-sm leading-relaxed">Получи яснота откъде да започнеш трансформацията</p>
            </div>
          </div>

          {/* Event details - MORE PROMINENT DATE */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 max-w-3xl mx-auto border-2 border-[#D4758C]/40 shadow-xl mt-8">
            <div className="text-center mb-4">
              <p className="text-xs uppercase tracking-wider text-[#D4758C] font-bold mb-2">Дата и час</p>
              <p style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#B85C7A] to-[#D4758C] bg-clip-text text-transparent">
                16 Юли 2026
              </p>
              <p className="text-2xl font-bold text-[#7A5662] mt-2">20:00ч</p>
            </div>
            
            <div className="h-px bg-gradient-to-r from-transparent via-[#D4758C] to-transparent my-4"></div>
            
            <div className="flex flex-wrap justify-center items-center gap-6 text-[#7A5662] text-sm">
              <div className="flex items-center gap-2">
                <span className="text-xl">💻</span>
                <span className="font-semibold">Google Meet</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🎁</span>
                <span className="font-bold text-lg bg-gradient-to-r from-[#D4758C] to-[#B85C7A] bg-clip-text text-transparent">БЕЗПЛАТНО</span>
              </div>
            </div>
          </div>
          
          {/* Registration Form - with rose theme */}
          <div className="max-w-md mx-auto mt-8">
            <RegistrationForm />
          </div>
          
          {/* Urgency elements */}
          <div className="max-w-md mx-auto space-y-4 mt-6">
            {/* Spots remaining */}
            <div className="bg-gradient-to-r from-rose-100 to-pink-100 backdrop-blur-sm p-4 rounded-2xl border-l-4 border-[#D4758C] shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <FaUsers className="text-[#D4758C] w-4 h-4" />
                <p className="font-bold text-[#7A5662] text-sm">Остават само 11 от 50 места!</p>
              </div>
              <div className="w-full bg-white/50 rounded-full h-3 overflow-hidden shadow-inner">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-[#D4758C] to-[#E89AAC] transition-all duration-500 shadow-sm"
                  style={{ width: '78%' }}
                />
              </div>
              <p className="text-xs text-[#9B7680] mt-2">39 места вече са заети</p>
            </div>
            
            {/* Countdown */}
            <div>
              <p className="text-sm text-[#9B7680] font-medium mb-3">⏰ Уебинарът започва след:</p>
              <CountdownTimer targetDate="2026-07-16T20:00:00+03:00" />
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default WebinarHero;
