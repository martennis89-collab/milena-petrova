import React from 'react';
import { Card, CardContent } from '../ui/card';
import { mockData } from '../../data/mock';

const BookingSection = () => {
  const { booking } = mockData;

  return (
    <section id="booking-section" className="booking-section py-20 md:py-32 bg-[#F5F1EB]">
      <div className="container px-6 md:px-12 max-w-5xl mx-auto">
        <h2 className="section-title font-serif text-3xl md:text-4xl lg:text-5xl text-center mb-6 text-[#2C2C2C]">
          {booking.title}
        </h2>

        <Card className="booking-card bg-white border-none shadow-xl mt-12">
          <CardContent className="p-8 md:p-12">
            {/* Calendly Placeholder */}
            <div className="calendly-placeholder min-h-[600px] flex items-center justify-center bg-gradient-to-br from-[#F5F1EB] to-[#D8CFC4] rounded-lg">
              <div className="text-center p-8">
                <div className="mb-6">
                  <svg 
                    className="w-20 h-20 mx-auto text-[#8C7A6B]" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl mb-4 text-[#2C2C2C]">
                  Календар за записване
                </h3>
                <p className="text-lg text-[#4A4A4A] mb-6">
                  Тук ще бъде интегриран Calendly календарът
                </p>
                <p className="text-base text-[#8C7A6B] italic">
                  URL: {booking.calendlyUrl}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BookingSection;
