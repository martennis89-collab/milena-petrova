import React from 'react';
import { mockData } from '../../data/mock';

const AboutSection = () => {
  const { about } = mockData;

  return (
    <section className="about-section py-20 md:py-32 bg-[#F5F1EB]">
      <div className="container px-6 md:px-12 max-w-6xl mx-auto">
        <h2 className="section-title font-serif text-3xl md:text-4xl lg:text-5xl text-center mb-16 text-[#2C2C2C]">
          {about.title}
        </h2>

        <div className="content-wrapper grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Portrait Image */}
          <div className="portrait-container">
            <div className="image-wrapper rounded-lg overflow-hidden shadow-2xl">
              <img 
                src={about.image}
                alt="Милена Петрова"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="text-content space-y-6">
            {about.text.split('\n\n').map((paragraph, index) => (
              <p 
                key={index}
                className="text-lg md:text-xl text-[#4A4A4A] leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
