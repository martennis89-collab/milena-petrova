import React from 'react';
import { Button } from '../ui/button';
import { Check } from 'lucide-react';
import { mockData } from '../../data/mock';

const IdentificationSection = () => {
  const { identification } = mockData;

  const scrollToBooking = () => {
    document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="identification-section py-20 md:py-32 bg-white">
      <div className="container px-6 md:px-12 max-w-4xl mx-auto">
        <h2 className="section-title font-serif text-3xl md:text-4xl lg:text-5xl text-center mb-8 text-[#2C2C2C]">
          {identification.title}
        </h2>

        <p className="intro-text text-lg md:text-xl text-center mb-12 text-[#4A4A4A] leading-relaxed">
          {identification.intro}
        </p>

        <div className="bullets-container max-w-2xl mx-auto mb-12 space-y-4">
          {identification.bullets.map((bullet, index) => (
            <div 
              key={index}
              className="bullet-item flex items-start gap-4 p-4 rounded-lg bg-[#F5F1EB]/50 transition-all duration-300 hover:bg-[#F5F1EB]"
            >
              <Check className="w-5 h-5 text-[#8C7A6B] mt-1 flex-shrink-0" />
              <span className="text-[#2C2C2C] text-base md:text-lg">{bullet}</span>
            </div>
          ))}
        </div>

        <p className="closing-text text-lg md:text-xl text-center mb-10 text-[#4A4A4A] font-medium">
          {identification.closing}
        </p>

        <div className="text-center">
          <Button 
            onClick={scrollToBooking}
            size="lg"
            className="bg-[#8C7A6B] hover:bg-[#6F6154] text-white px-10 py-6 text-lg rounded-md transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {identification.cta}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default IdentificationSection;
