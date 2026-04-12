import React from 'react';
import { mockData } from '../../data/mock';

const HowItWorksSection = () => {
  const { howItWorks } = mockData;

  return (
    <section id="how-it-works-section" className="how-it-works-section py-20 md:py-32 bg-white">
      <div className="container px-6 md:px-12 max-w-4xl mx-auto">
        <h2 className="section-title font-serif text-3xl md:text-4xl lg:text-5xl text-center mb-16 text-[#2C2C2C]">
          {howItWorks.title}
        </h2>

        <div className="steps-container max-w-3xl mx-auto space-y-6">
          {howItWorks.steps.map((step, index) => (
            <div 
              key={index}
              className="step-item flex items-start gap-6 p-6 rounded-lg bg-[#F5F1EB]/30 transition-all duration-300 hover:bg-[#F5F1EB]/60"
            >
              <div className="step-number flex-shrink-0 w-12 h-12 rounded-full bg-[#8C7A6B] text-white flex items-center justify-center font-serif text-xl font-bold">
                {index + 1}
              </div>
              <p className="text-[#2C2C2C] text-lg md:text-xl leading-relaxed pt-2">
                {step}
              </p>
            </div>
          ))}
        </div>

        <div className="note-container mt-12 p-6 rounded-lg bg-[#D8CFC4]/30 border-l-4 border-[#8C7A6B] max-w-3xl mx-auto">
          <p className="text-[#2C2C2C] text-base md:text-lg font-medium">
            {howItWorks.note}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
