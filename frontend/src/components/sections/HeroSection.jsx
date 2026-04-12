import React from 'react';
import { Button } from '../ui/button';
import { mockData } from '../../data/mock';

const HeroSection = () => {
  const { hero } = mockData;

  const scrollToBooking = () => {
    document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={hero.backgroundImage}
          alt="Hero background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F1EB]/95 via-[#F5F1EB]/90 to-[#F5F1EB]/95"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 px-6 md:px-12 max-w-4xl mx-auto text-center py-20">
        <h1 className="hero-headline font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-8 text-[#2C2C2C]">
          {hero.headline}
        </h1>
        
        <p className="hero-subheadline text-lg md:text-xl leading-relaxed mb-6 text-[#4A4A4A] max-w-3xl mx-auto">
          {hero.subheadline}
        </p>

        <p className="trust-line text-sm md:text-base text-[#8C7A6B] mb-12 font-medium">
          {hero.trustLine}
        </p>

        <div className="cta-buttons flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={scrollToBooking}
            size="lg"
            className="bg-[#8C7A6B] hover:bg-[#6F6154] text-white px-8 py-6 text-lg rounded-md transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {hero.ctaPrimary}
          </Button>
          
          <Button 
            onClick={scrollToHowItWorks}
            variant="outline"
            size="lg"
            className="border-[#8C7A6B] text-[#8C7A6B] hover:bg-[#8C7A6B]/10 px-8 py-6 text-lg rounded-md transition-all duration-300"
          >
            {hero.ctaSecondary}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
