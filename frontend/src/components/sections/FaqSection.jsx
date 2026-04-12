import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { mockData } from '../../data/mock';

const FaqSection = () => {
  const { faq } = mockData;

  return (
    <section className="faq-section py-20 md:py-32 bg-[#F5F1EB]">
      <div className="container px-6 md:px-12 max-w-4xl mx-auto">
        <h2 className="section-title font-serif text-3xl md:text-4xl lg:text-5xl text-center mb-16 text-[#2C2C2C]">
          {faq.title}
        </h2>

        <Accordion type="single" collapsible className="space-y-4">
          {faq.items.map((item, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-white rounded-lg px-6 border-none shadow-sm"
            >
              <AccordionTrigger className="text-left text-lg md:text-xl text-[#2C2C2C] font-medium hover:text-[#8C7A6B] transition-colors duration-300 py-6">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-[#4A4A4A] leading-relaxed pb-6">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;
