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
    <section className="py-12 bg-white">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-[#F5F1EB] to-[#E5D5C5] hover:shadow-lg transition-shadow duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full text-[#8C7A6B] mb-4 shadow-sm">
                {benefit.icon}
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg text-[#2C3E50] font-semibold mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-[#4A4A4A] leading-relaxed">
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
