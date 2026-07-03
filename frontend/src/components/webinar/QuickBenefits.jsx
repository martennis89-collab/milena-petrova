import React from 'react';
import { FaLightbulb, FaHeart, FaKey, FaRoad } from 'react-icons/fa';

const QuickBenefits = () => {
  const benefits = [
    {
      icon: <FaLightbulb className="w-8 h-8" />,
      title: "Момент на осъзнаване",
      description: "Разбери защо се връщаш към едни и същи болезнени връзки"
    },
    {
      icon: <FaHeart className="w-8 h-8" />,
      title: "Емоционална свобода",
      description: "Научи се да избираш любов без болка и манипул ация"
    },
    {
      icon: <FaKey className="w-8 h-8" />,
      title: "Ключът към промяната",
      description: "Открий откъде наистина започва трансформацията"
    },
    {
      icon: <FaRoad className="w-8 h-8" />,
      title: "Конкретни стъпки",
      description: "Получи практични насоки за излизане от цикъла"
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-white to-[#FFF5F7] relative overflow-hidden">
      {/* Decorative floral accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD4DC] rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#E89AAC] rounded-full blur-3xl opacity-20"></div>
      
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-2xl bg-white border-2 border-[#D4758C]/20 hover:shadow-xl hover:border-[#D4758C]/40 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#D4758C] to-[#B85C7A] rounded-full text-white mb-4 shadow-lg">
                {benefit.icon}
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg text-[#7A5662] font-bold mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-[#9B7680] leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickBenefits;
