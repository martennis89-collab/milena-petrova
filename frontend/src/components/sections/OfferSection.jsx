import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { CheckCircle2 } from 'lucide-react';
import { mockData } from '../../data/mock';

const OfferSection = () => {
  const { offer } = mockData;

  const scrollToBooking = () => {
    document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="offer-section py-20 md:py-32 bg-[#F5F1EB]">
      <div className="container px-6 md:px-12 max-w-5xl mx-auto">
        <h2 className="section-title font-serif text-3xl md:text-4xl lg:text-5xl text-center mb-16 text-[#2C2C2C]">
          {offer.title}
        </h2>

        {/* Session Details */}
        <div className="details-container max-w-2xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {offer.details.map((detail, index) => (
              <div 
                key={index}
                className="detail-item flex items-center gap-3 p-4 rounded-lg bg-white"
              >
                <CheckCircle2 className="w-5 h-5 text-[#8C7A6B] flex-shrink-0" />
                <span className="text-[#2C2C2C] text-base md:text-lg">{detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="pricing-container grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-10">
          {offer.pricing.map((price, index) => (
            <Card 
              key={index}
              className="pricing-card bg-white border-2 border-[#D8CFC4] hover:border-[#8C7A6B] transition-all duration-300 hover:shadow-xl"
            >
              <CardContent className="p-8 text-center">
                <h3 className="font-serif text-2xl md:text-3xl mb-4 text-[#2C2C2C]">
                  {price.type}
                </h3>
                <p className="text-4xl md:text-5xl font-bold text-[#8C7A6B] mb-6">
                  {price.price}
                </p>
                <Button 
                  onClick={scrollToBooking}
                  className="w-full bg-[#8C7A6B] hover:bg-[#6F6154] text-white py-6 text-lg rounded-md transition-all duration-300"
                >
                  Запази час
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-base md:text-lg text-[#4A4A4A] italic max-w-2xl mx-auto">
          {offer.note}
        </p>
      </div>
    </section>
  );
};

export default OfferSection;
