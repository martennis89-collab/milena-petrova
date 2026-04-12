import React from 'react';
import { Button } from '../ui/button';
import { mockData } from '../../data/mock';

const FinalCtaSection = () => {
  const { finalCta } = mockData;

  const scrollToBooking = () => {
    document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="final-cta-section py-20 md:py-32 bg-gradient-to-b from-white to-[#F5F1EB]">
      <div className="container px-6 md:px-12 max-w-4xl mx-auto text-center">
        <h2 className="section-title font-serif text-3xl md:text-4xl lg:text-5xl mb-8 text-[#2C2C2C]">
          {finalCta.headline}
        </h2>

        <p className="text-lg md:text-xl text-[#4A4A4A] leading-relaxed mb-12 max-w-2xl mx-auto">
          {finalCta.text}
        </p>

        <Button 
          onClick={scrollToBooking}
          size="lg"
          className="bg-[#8C7A6B] hover:bg-[#6F6154] text-white px-12 py-7 text-xl rounded-md transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
        >
          {finalCta.cta}
        </Button>
      </div>
    </section>
  );
};

export default FinalCtaSection;
