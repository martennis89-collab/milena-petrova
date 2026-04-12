import React, { useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { mockData } from '../../data/mock';

const BookingSection = () => {
  const { booking } = mockData;

  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section id="booking-section" className="booking-section py-20 md:py-32 bg-[#F5F1EB]">
      <div className="container px-6 md:px-12 max-w-5xl mx-auto">
        <h2 className="section-title font-serif text-3xl md:text-4xl lg:text-5xl text-center mb-6 text-[#2C2C2C]">
          {booking.title}
        </h2>

        <Card className="booking-card bg-white border-none shadow-xl mt-12">
          <CardContent className="p-4 md:p-8">
            {/* Calendly Inline Widget */}
            <div 
              className="calendly-inline-widget" 
              data-url={booking.calendlyUrl}
              style={{ minWidth: '320px', height: '700px' }}
            ></div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BookingSection;
