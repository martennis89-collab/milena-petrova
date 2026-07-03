import React, { useState } from 'react';
import CountdownTimer from './CountdownTimer';
import RegistrationForm from './RegistrationForm';
import { FaFire, FaUsers, FaCheckCircle } from 'react-icons/fa';

const WebinarHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#2C3E50] via-[#34495E] to-[#2C3E50] overflow-hidden">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>
      
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        {/* Centered content */}
        <div className="text-center space-y-6">
          {/* Label */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            <FaFire className="text-orange-400 w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider text-white">Безплатен Уебинар</span>
          </div>
          
          {/* Main headline */}
          <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight max-w-4xl mx-auto">
            Защо попадаме в отношения, които ни нараняват?
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            60 минути, които ще променят начина, по който гледаш на връзките си
          </p>
          
          {/* Key Benefits - 3 columns */}
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-8">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-left">
              <FaCheckCircle className="w-6 h-6 text-green-400 mb-2" />
              <h3 className="text-white font-semibold mb-1 text-sm">Разпознай моделите</h3>
              <p className="text-white/80 text-xs">Научи да виждаш болезнените модели преди да се повторят</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-left">
              <FaCheckCircle className="w-6 h-6 text-green-400 mb-2" />
              <h3 className="text-white font-semibold mb-1 text-sm">Разбери дълбоката причина</h3>
              <p className="text-white/80 text-xs">Открий защо се връщаш към едни и същи избори</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-left">
              <FaCheckCircle className="w-6 h-6 text-green-400 mb-2" />
              <h3 className="text-white font-semibold mb-1 text-sm">Започни промяната</h3>
              <p className="text-white/80 text-xs">Получи яснота откъде да започнеш трансформацията</p>
            </div>
          </div>

          {/* Event details compact */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-white/90 text-sm mt-8">
            <div className="flex items-center gap-2">
              <span className="text-xl">📅</span>
              <span className="font-medium">16 Юли 2026 • 20:00ч</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">💻</span>
              <span className="font-medium">Google Meet</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🎁</span>
              <span className="font-bold text-lg text-green-400">БЕЗПЛАТНО</span>
            </div>
          </div>
          
          {/* Registration Form - centered, max-width */}
          <div className="max-w-md mx-auto mt-8">
            <RegistrationForm />
          </div>
          
          {/* Urgency elements below form */}
          <div className="max-w-md mx-auto space-y-4 mt-6">
            {/* Spots remaining */}
            <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm p-4 rounded-xl border-l-4 border-red-500">
              <div className="flex items-center gap-2 mb-2">
                <FaUsers className="text-red-400 w-4 h-4" />
                <p className="font-semibold text-white text-sm">Остават само 11 от 50 места!</p>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-red-400 to-orange-400 transition-all duration-500"
                  style={{ width: '78%' }}
                />
              </div>
              <p className="text-xs text-white/70 mt-1.5">39 места вече са заети</p>
            </div>
            
            {/* Countdown */}
            <div>
              <p className="text-xs text-white/70 font-medium mb-2">Уебинарът започва след:</p>
              <CountdownTimer targetDate="2026-07-16T20:00:00+03:00" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebinarHero;
