import React from 'react';
import { ShoppingCart, Mail, Key, Play } from 'lucide-react';

const HowAccessWorksSection = () => {
  const steps = [
    {
      icon: ShoppingCart,
      title: 'Завършваш поръчката',
      description: 'Завършваш поръчката през защитена checkout страница.',
    },
    {
      icon: Mail,
      title: 'Получаваш имейл',
      description: 'Получаваш имейл с достъп до програмата.',
    },
    {
      icon: Key,
      title: 'Създаваш парола',
      description: 'В имейла има потребителско име и линк за създаване на парола.',
    },
    {
      icon: Play,
      title: 'Започваш програмата',
      description: 'Влизаш в платформата и започваш с първия урок.',
    },
  ];
  
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-serif text-[#2C3E50] text-center mb-12">
          Какво се случва след покупка?
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-[#8C7A6B] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-[#8C7A6B] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-lg font-medium text-[#2C3E50] mb-2">
                  {step.title}
                </h3>
                <p className="text-[#4A4A4A] text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
        
        <div className="bg-[#F5F1EB] rounded-xl p-6 text-center">
          <p className="text-sm text-[#4A4A4A]">
            Ако не виждаш имейла до няколко минути, провери папките Promotions, Updates или Spam.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowAccessWorksSection;
