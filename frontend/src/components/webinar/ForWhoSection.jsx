import React from 'react';
import { FaHeart, FaShieldAlt, FaBalanceScale, FaBatteryEmpty, FaLightbulb } from 'react-icons/fa';

const ForWhoSection = () => {
  const audiencePoints = [
    {
      icon: <FaHeart className="w-6 h-6" />,
      text: "Попадаш в сходни болезнени отношения"
    },
    {
      icon: <FaShieldAlt className="w-6 h-6" />,
      text: "Трудно поставяш лични граници"
    },
    {
      icon: <FaBalanceScale className="w-6 h-6" />,
      text: "Често даваш повече, отколкото получаваш"
    },
    {
      icon: <FaBatteryEmpty className="w-6 h-6" />,
      text: "Оставаш в отношения, които те изтощават"
    },
    {
      icon: <FaLightbulb className="w-6 h-6" />,
      text: "Искаш да разбереш защо моделът се повтаря"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-[#FFF5F7] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD4DC] rounded-full blur-3xl opacity-15"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#E89AAC] rounded-full blur-3xl opacity-15"></div>
      
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          {/* Decorative element */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4758C]"></div>
            <span className="text-3xl">💕</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4758C]"></div>
          </div>
          
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl sm:text-4xl bg-gradient-to-r from-[#B85C7A] to-[#D4758C] bg-clip-text text-transparent mb-4 font-bold">
            Този уебинар е за теб, ако:
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {audiencePoints.map((point, index) => (
            <div 
              key={index}
              className="bg-white border-2 border-[#D4758C]/20 p-6 rounded-2xl hover:shadow-lg hover:border-[#D4758C]/40 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#D4758C] to-[#B85C7A] rounded-full flex items-center justify-center text-white shadow-md">
                  {point.icon}
                </div>
                <p className="text-[#7A5662] leading-relaxed font-medium pt-2">
                  {point.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Emotional connection text */}
        <div className="mt-10 text-center">
          <p className="text-base sm:text-lg text-[#9B7680] max-w-3xl mx-auto leading-relaxed">
            Ако се разпознаваш в поне едно от тези неща, този уебинар може да ти помогне да видиш ясно какво се случва и откъде започва промяната.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ForWhoSection;
