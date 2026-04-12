import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Loader2, CreditCard, Shield, CheckCircle2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { packageId } = location.state || {};
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [packageDetails, setPackageDetails] = useState(null);

  const packages = {
    single: {
      name: 'Единична сесия',
      price: '€90',
      description: '60-90 минути индивидуална онлайн сесия',
      sessions: 1
    },
    package: {
      name: 'Пакет 3 сесии',
      price: '€240',
      description: 'По-дълбока работа върху повтарящи се модели',
      sessions: 3
    }
  };

  useEffect(() => {
    if (!packageId || !packages[packageId]) {
      navigate('/book');
      return;
    }
    setPackageDetails(packages[packageId]);
  }, [packageId]);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const originUrl = window.location.origin;
      
      const response = await axios.post(`${BACKEND_URL}/api/payments/checkout/session`, {
        package_id: packageId,
        origin_url: originUrl
      });

      if (response.data && response.data.url) {
        // Redirect to Stripe Checkout
        window.location.href = response.data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.response?.data?.detail || 'Failed to initiate payment. Please try again.');
      setLoading(false);
    }
  };

  if (!packageDetails) {
    return null;
  }

  return (
    <div className="payment-page min-h-screen bg-gradient-to-b from-[#F5F1EB] to-white">
      <Header />
      
      <section className="py-24 px-6 md:px-12">
        <div className="container max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl text-center mb-4 text-[#2C2C2C]">
            Завърши записването
          </h1>
          
          <p className="text-center text-lg text-[#4A4A4A] mb-12">
            Само още една стъпка до твоята сесия
          </p>

          {/* Package Summary */}
          <Card className="bg-white border-2 border-[#8C7A6B]/30 shadow-xl mb-8">
            <CardContent className="p-8">
              <h2 className="font-serif text-2xl text-[#2C2C2C] mb-6">
                Избран пакет
              </h2>
              
              <div className="flex items-start justify-between mb-6 pb-6 border-b border-[#D8CFC4]">
                <div>
                  <h3 className="font-medium text-xl text-[#2C2C2C] mb-2">
                    {packageDetails.name}
                  </h3>
                  <p className="text-[#4A4A4A]">
                    {packageDetails.description}
                  </p>
                  <p className="text-sm text-[#8C7A6B] mt-2">
                    {packageDetails.sessions} {packageDetails.sessions === 1 ? 'сесия' : 'сесии'}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-[#8C7A6B]">
                    {packageDetails.price}
                  </div>
                </div>
              </div>

              {/* What's Included */}
              <div className="space-y-3 mb-6">
                <p className="font-medium text-[#2C2C2C] mb-3">Включено:</p>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#8C7A6B] mt-0.5 flex-shrink-0" />
                  <span className="text-[#4A4A4A]">Google Meet онлайн сесия</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#8C7A6B] mt-0.5 flex-shrink-0" />
                  <span className="text-[#4A4A4A]">60-90 минути индивидуална работа</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#8C7A6B] mt-0.5 flex-shrink-0" />
                  <span className="text-[#4A4A4A]">Пълна конфиденциалност</span>
                </div>
                {packageDetails.sessions > 1 && (
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#8C7A6B] mt-0.5 flex-shrink-0" />
                    <span className="text-[#4A4A4A]">Проследяване и развитие във времето</span>
                  </div>
                )}
              </div>

              {/* Payment Button */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                  {error}
                </div>
              )}

              <Button
                onClick={handlePayment}
                disabled={loading}
                size="lg"
                className="w-full bg-[#8C7A6B] hover:bg-[#6F6154] text-white py-7 text-xl rounded-md transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Зареждане...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-5 w-5" />
                    Продължи към плащане
                  </>
                )}
              </Button>

              {/* Trust Badges */}
              <div className="mt-6 flex items-center justify-center gap-6 text-sm text-[#8C7A6B]">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Защитено плащане</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  <span>Stripe</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Process Info */}
          <Card className="bg-gradient-to-br from-[#F5F1EB] to-white border border-[#D8CFC4]">
            <CardContent className="p-6">
              <h3 className="font-serif text-lg text-[#2C2C2C] mb-4">
                Какво следва:
              </h3>
              <div className="space-y-2 text-[#4A4A4A]">
                <div className="flex items-start gap-3">
                  <span className="text-[#8C7A6B]">1.</span>
                  <span>Ще бъдеш пренасочен към защитената Stripe страница за плащане</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#8C7A6B]">2.</span>
                  <span>Въвеждаш данните на картата си</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#8C7A6B]">3.</span>
                  <span>След успешно плащане получаваш потвърждение по имейл</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#8C7A6B]">4.</span>
                  <span>Calendly изпраща линк за Google Meet срещата</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Payment;
