import React from 'react';
import { X } from 'lucide-react';

const WhoThisIsNotForSection = () => {
  const notForYouIf = [
    'търсиш начин да контролираш или промениш друг човек',
    'искаш бърз трик, който да „поправи" връзката вместо теб',
    'не си готова да погледнеш честно към собствените си модели',
    'търсиш заместител на терапия, медицинска, правна или кризисна помощ',
  ];
  
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-serif text-[#2C3E50] text-center mb-12">
          Тази програма не е за теб, ако…
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {notForYouIf.map((item, index) => (
            <div 
              key={index}
              className="flex items-start p-6 bg-gray-50 rounded-xl border border-gray-200"
            >
              <X className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" />
              <p className="ml-4 text-[#4A4A4A] leading-relaxed">
                {item}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-lg text-[#2C3E50] font-medium">
            „Любов без болка" е програма за осъзнаване, яснота и връщане към себе си.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhoThisIsNotForSection;
