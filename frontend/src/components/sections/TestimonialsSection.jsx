import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Quote } from 'lucide-react';
import { mockData } from '../../data/mock';

const TestimonialsSection = () => {
  const { testimonials } = mockData;

  return (
    <section className="testimonials-section py-20 md:py-32 bg-white">
      <div className="container px-6 md:px-12 max-w-6xl mx-auto">
        <h2 className="section-title font-serif text-3xl md:text-4xl lg:text-5xl text-center mb-16 text-[#2C2C2C]">
          {testimonials.title}
        </h2>

        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.items.map((testimonial, index) => (
            <Card 
              key={index}
              className="testimonial-card bg-[#F5F1EB]/50 border-none hover:bg-[#F5F1EB] transition-all duration-300 hover:shadow-lg"
            >
              <CardContent className="p-8">
                <Quote className="w-10 h-10 text-[#8C7A6B] mb-4 opacity-60" />
                <p className="text-[#2C2C2C] text-base md:text-lg leading-relaxed mb-6">
                  {testimonial.text}
                </p>
                <p className="text-[#8C7A6B] font-medium text-sm">
                  — {testimonial.author}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
