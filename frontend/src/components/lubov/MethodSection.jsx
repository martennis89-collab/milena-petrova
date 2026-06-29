import React from 'react';
import { FaEye, FaBrain, FaShieldAlt, FaHeart } from 'react-icons/fa';

const MethodSection = () => {
  const steps = [
    {
      icon: FaEye,
      title: 'Разпознаване',
      text: 'Първо започваш да виждаш цикъла, вместо да гледаш само отделните ситуации.',
    },
    {
      icon: FaBrain,
      title: 'Разбиране',
      text: 'После разбираш защо този модел може да се усеща толкова познат, дори когато те боли.',
    },
    {
      icon: FaShieldAlt,
      title: 'Граници',
      text: 'Започваш да връщаш усещането за себе си, своите нужди и своето „не".',
    },
    {
      icon: FaHeart,
      title: 'Нов избор',
      text: 'Постепенно започваш да избираш не от страх, а от повече яснота и връзка със себе си.',
    },
  ];
  
  return (
    <section className="py-20 bg-[#F5F1EB]">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-serif text-[#2C3E50] text-center mb-4">
          Методът на програмата
        </h2>
        
        <div className="text-center mb-12">
          <p className="text-lg text-[#8C7A6B] font-medium">
            Разпознаване → Разбиране → Граници → Нов избор
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-[#8C7A6B]/10 rounded-full flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#8C7A6B]" />
                </div>
                <h3 className="text-xl font-serif text-[#2C3E50] mb-3">
                  {step.title}
                </h3>
                <p className="text-[#4A4A4A] leading-relaxed">
                  {step.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MethodSection;
;
