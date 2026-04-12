import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { CheckCircle2 } from 'lucide-react';
import { mockData } from '../../data/mock';

const BookingSection = () => {
  const { booking } = mockData;
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(null);

  const packages = [
    {
      id: 'single',
      name: 'Единична сесия',
      price: '€90',
      description: '60-90 минути индивидуална онлайн сесия',
      sessions: 1
    },
    {
      id: 'package',
      name: 'Пакет 3 сесии',
      price: '€240',
      description: 'По-дълбока работа върху повтарящи се модели',
      sessions: 3,
      badge: 'Препоръчано'
    }
  ];

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

  const handlePackageSelect = (packageId) => {
    setSelectedPackage(packageId);
  };

  const handleProceedToPayment = () => {
    if (selectedPackage) {
      // Navigate to payment page with selected package
      navigate('/payment', { state: { packageId: selectedPackage } });
    }
  };

  return (
    <section id="booking-section" className="booking-section py-20 md:py-32 bg-[#F5F1EB]">
      <div className="container px-6 md:px-12 max-w-6xl mx-auto">
        <h2 className="section-title font-serif text-3xl md:text-4xl lg:text-5xl text-center mb-6 text-[#2C2C2C]">
          Избери пакет и запази час
        </h2>

        <p className="text-center text-lg text-[#4A4A4A] mb-12 max-w-2xl mx-auto">
          Първо избери опцията, която ти подхожда
        </p>

        {/* Package Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              onClick={() => handlePackageSelect(pkg.id)}
              className={`cursor-pointer transition-all duration-300 ${
                selectedPackage === pkg.id
                  ? 'border-4 border-[#8C7A6B] shadow-2xl scale-105'
                  : 'border-2 border-[#D8CFC4] hover:border-[#BFAE9F] hover:shadow-lg'
              }`}
            >
              <CardContent className="p-8 relative">
                {pkg.badge && (
                  <div className="absolute top-4 right-4 bg-[#8C7A6B] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {pkg.badge}
                  </div>
                )}
                
                {selectedPackage === pkg.id && (
                  <div className="absolute top-4 left-4">
                    <CheckCircle2 className="w-6 h-6 text-[#8C7A6B]" />
                  </div>
                )}

                <h3 className="font-serif text-2xl md:text-3xl text-[#2C2C2C] mb-4 mt-2">
                  {pkg.name}
                </h3>
                
                <div className="text-5xl font-bold text-[#8C7A6B] mb-4">
                  {pkg.price}
                </div>

                <p className="text-[#4A4A4A] text-lg mb-6">
                  {pkg.description}
                </p>

                <div className="text-sm text-[#8C7A6B] font-medium">
                  {pkg.sessions} {pkg.sessions === 1 ? 'сесия' : 'сесии'}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Calendly Section - Only show if package selected */}
        {selectedPackage && (
          <>
            <div className="text-center mb-8">
              <h3 className="font-serif text-2xl md:text-3xl text-[#2C2C2C] mb-4">
                {booking.title}
              </h3>
              <p className="text-[#4A4A4A] text-lg">
                След избор на час ще те пренасочим към плащане
              </p>
            </div>

            <Card className="booking-card bg-white border-none shadow-xl mb-8">
              <CardContent className="p-4 md:p-8">
                {/* Calendly Inline Widget */}
                <div 
                  className="calendly-inline-widget" 
                  data-url={booking.calendlyUrl}
                  style={{ minWidth: '320px', height: '700px' }}
                ></div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="bg-gradient-to-br from-[#F5F1EB] to-white border-2 border-[#8C7A6B]/30 max-w-3xl mx-auto">
              <CardContent className="p-8">
                <h4 className="font-serif text-xl text-[#2C2C2C] mb-4">
                  Как протича процесът:
                </h4>
                <div className="space-y-3 text-[#4A4A4A]">
                  <div className="flex items-start gap-3">
                    <span className="text-[#8C7A6B] font-bold">1.</span>
                    <span>Избираш удобен ден и час от календара</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#8C7A6B] font-bold">2.</span>
                    <span>Попълваш данните си в Calendly</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#8C7A6B] font-bold">3.</span>
                    <span>Calendly ще те препрати към плащане с карта</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#8C7A6B] font-bold">4.</span>
                    <span>След успешно плащане получаваш потвърждение и линк за срещата</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Select package reminder */}
        {!selectedPackage && (
          <div className="text-center">
            <p className="text-lg text-[#8C7A6B] font-medium">
              ⬆️ Избери пакет, за да продължиш
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookingSection;
