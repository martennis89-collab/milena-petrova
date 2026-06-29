import React from 'react';
import { FaCheck } from 'react-icons/fa';

const WhoThisIsForSection = () => {
  const forYouIf = [
    'усещаш, че любовта ти носи повече тревога, отколкото спокойствие',
    'често оправдаваш поведение, което те наранява',
    'трудно поставяш граници',
    'страхуваш се да не изгубиш човека, дори когато губиш себе си',
    'връщаш се към един и същ болезнен модел',
    'искаш да разбереш защо избираш познатата болка',
    'искаш да започнеш да изграждаш по-здрав стандарт за любов',
  ];
  
  return (
    <section className="py-20 bg-[#F5F1EB]">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-serif text-[#2C3E50] text-center mb-12">
          Тази програма е за теб, ако…
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          {forYouIf.map((item, index) => (
            <div 
              key={index}
              className="flex items-start p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <FaCheck className="w-6 h-6 text-[#8C7A6B] flex-shrink-0 mt-0.5" />
              <p className="ml-4 text-[#4A4A4A] leading-relaxed">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoThisIsForSection;
