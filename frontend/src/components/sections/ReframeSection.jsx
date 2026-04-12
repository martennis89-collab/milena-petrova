import React from 'react';
import { mockData } from '../../data/mock';

const ReframeSection = () => {
  const { reframe } = mockData;

  return (
    <section className="reframe-section py-20 md:py-32 bg-[#F5F1EB]">
      <div className="container px-6 md:px-12 max-w-3xl mx-auto text-center">
        <h2 className="section-title font-serif text-3xl md:text-4xl lg:text-5xl mb-10 text-[#2C2C2C]">
          {reframe.title}
        </h2>

        <div className="text-content space-y-6">
          {reframe.text.split('\n\n').map((paragraph, index) => (
            <p 
              key={index}
              className="text-lg md:text-xl text-[#4A4A4A] leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReframeSection;
