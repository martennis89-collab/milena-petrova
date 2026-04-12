import React from 'react';
import { mockData } from '../../data/mock';

const MethodSection = () => {
  const { method } = mockData;

  return (
    <section className="method-section py-20 md:py-32 bg-white">
      <div className="container px-6 md:px-12 max-w-4xl mx-auto">
        <h2 className="section-title font-serif text-3xl md:text-4xl lg:text-5xl text-center mb-10 text-[#2C2C2C]">
          {method.title}
        </h2>

        <p className="text-lg md:text-xl text-[#4A4A4A] leading-relaxed mb-8 text-center max-w-3xl mx-auto">
          {method.text}
        </p>

        <div className="benefits-container max-w-2xl mx-auto mt-12">
          <p className="text-lg md:text-xl font-medium text-[#2C2C2C] mb-6 text-center">
            {method.subtitle}
          </p>
          
          <div className="benefits-list space-y-4">
            {method.benefits.map((benefit, index) => (
              <div 
                key={index}
                className="benefit-item p-5 rounded-lg bg-[#F5F1EB]/50 text-center transition-all duration-300 hover:bg-[#F5F1EB]"
              >
                <span className="text-[#2C2C2C] text-lg md:text-xl">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-lg text-[#4A4A4A] text-center mt-12 max-w-2xl mx-auto">
          {method.closing}
        </p>
      </div>
    </section>
  );
};

export default MethodSection;
