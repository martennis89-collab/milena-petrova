import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const WhatIsSection = () => {
  const learnings = [
    'как работи болезненият модел',
    'защо понякога избираш познатата болка',
    'как се губиш във връзката',
    'как да започнеш да поставяш по-здрави граници',
    'как да изградиш нов стандарт за любов',
  ];
  
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-serif text-[#2C3E50] text-center mb-8">
          Какво е „Любов без болка"?
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-[#4A4A4A] leading-relaxed mb-6">
            „Любов без болка" е онлайн програма, която те води през процес на осъзнаване, разбиране и вътрешно връщане към себе си.
          </p>
          
          <div className="bg-[#F5F1EB] rounded-2xl p-8 mb-8">
            <p className="text-lg text-[#4A4A4A] leading-relaxed">
              Тя не е създадена, за да ти каже какво да направиш с конкретен човек. Създадена е, за да ти помогне да видиш по-ясно какъв модел се повтаря, защо ти е толкова познат и как да започнеш да избираш себе си.
            </p>
          </div>
          
          <div className="space-y-4">
            <p className="text-lg font-medium text-[#2C3E50] mb-6">
              В програмата ще разбереш:
            </p>
            {learnings.map((item, index) => (
              <div 
                key={index}
                className="flex items-start"
              >
                <FaCheckCircle className="w-6 h-6 text-[#8C7A6B] flex-shrink-0 mt-0.5" />
                <p className="ml-3 text-[#4A4A4A] text-lg">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsSection;
