import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';
import { CheckCircle2 } from 'lucide-react';
import { mockData } from '../../data/mock';

const BookingSection = () => {
  const { booking } = mockData;
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const calendlyRef = useRef(null);

  const packages = [
    {
      id: 'single',
      name: 'Индивидуална сесия',
      price: '€51',
      description: '60 минути индивидуална онлайн сесия',
      sessions: 1,
      calendlyUrl: booking.calendlyUrls.single
    },
    {
      id: 'package',
      name: 'Пакет 3 сесии',
      price: '€138',
      description: 'По-дълбока работа върху повтарящи се модели',
      sessions: 3,
      badge: 'Препоръчано',
      calendlyUrl: booking.calendlyUrls.package
    }
  ];

  // Load Calendly script once on mount
  useEffect(() => {
    const loadCalendlyScript = () => {
      // Check if script already exists
      if (window.Calendly) {
        setScriptLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = () => {
        setScriptLoaded(true);
        console.log('✅ Calendly script loaded');
      };
      script.onerror = () => {
        console.error('❌ Failed to load Calendly script');
      };
      document.head.appendChild(script);

      // Also load CSS
      const link = document.createElement('link');
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    };

    loadCalendlyScript();
  }, []);

  // Initialize Calendly widget when package is selected and script is loaded
  useEffect(() => {
    if (selectedPackage && scriptLoaded && window.Calendly && calendlyRef.current) {
      console.log('🔄 Initializing Calendly widget for:', selectedPackage.name);
      
      // Clear any existing content
      calendlyRef.current.innerHTML = '';
      
      // Initialize Calendly widget with package-specific URL
      window.Calendly.initInlineWidget({
        url: selectedPackage.calendlyUrl,
        parentElement: calendlyRef.current,
        prefill: {},
        utm: {}
      });
      
      console.log('✅ Calendly widget initialized with URL:', selectedPackage.calendlyUrl);
    }
  }, [selectedPackage, scriptLoaded]);

  const handlePackageSelect = (pkg) => {
    console.log('📦 Package selected:', pkg.name);
    setSelectedPackage(pkg);
    
    // Scroll to Calendly section after brief delay
    setTimeout(() => {
      const calendlySection = document.getElementById('calendly-widget-section');
      if (calendlySection) {
        const yOffset = -80;
        const y = calendlySection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({top: y, behavior: 'smooth'});
      }
    }, 300);
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
              onClick={() => handlePackageSelect(pkg)}
              className={`cursor-pointer transition-all duration-300 ${
                selectedPackage?.id === pkg.id
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
                
                {selectedPackage?.id === pkg.id && (
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
          <div id="calendly-widget-section" className="mt-16">
            <div className="text-center mb-8">
              <h3 className="font-serif text-2xl md:text-3xl text-[#2C2C2C] mb-4">
                Избери удобен час от календара
              </h3>
              <p className="text-[#4A4A4A] text-lg mb-2">
                Calendly ще обработи плащането и ще изпрати потвърждение
              </p>
              <p className="text-sm text-[#8C7A6B] font-medium">
                Избран пакет: {selectedPackage.name} - {selectedPackage.price}
              </p>
            </div>

            <Card className="booking-card bg-white border-none shadow-xl mb-8">
              <CardContent className="p-4 md:p-8">
                {/* Calendly Widget Container */}
                {!scriptLoaded ? (
                  <div className="flex items-center justify-center" style={{ height: '700px' }}>
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8C7A6B] mx-auto mb-4"></div>
                      <p className="text-[#4A4A4A]">Зареждане на календар...</p>
                    </div>
                  </div>
                ) : (
                  <div 
                    ref={calendlyRef}
                    className="calendly-widget-container"
                    style={{ width: '100%', height: '700px', minHeight: '700px' }}
                  ></div>
                )}
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
                    <span>Заплащаш директно в Calendly с карта</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#8C7A6B] font-bold">4.</span>
                    <span>Получаваш потвърждение и Google Meet линк по имейл</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
