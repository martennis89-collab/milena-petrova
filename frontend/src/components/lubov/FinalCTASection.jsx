import React from 'react';
import CheckoutCTA from './CheckoutCTA';

const FinalCTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#F5F1EB] to-white">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-3xl md:text-5xl font-serif text-[#2C3E50] mb-6">
          Любовта не трябва да те кара да губиш себе си.
        </h2>
        
        <p className="text-xl text-[#4A4A4A] leading-relaxed mb-10 max-w-2xl mx-auto">
          Ако усещаш, че е време да спреш да избираш познатата болка, започни оттук.
        </p>
        
        <div className="mb-10">
          <CheckoutCTA 
            location="final_cta"
            className="text-lg px-12 py-5"
          />
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 max-w-3xl mx-auto">
          <p className="text-xs text-[#8C7A6B] leading-relaxed">
            <strong>Важно:</strong> Програмата е образователна и подкрепяща. Не заменя терапия, медицинска, правна или кризисна помощ. Ако си в непосредствена опасност, потърси помощ от близък човек или местните служби за спешна помощ.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
