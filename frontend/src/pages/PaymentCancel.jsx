import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { XCircle, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-cancel-page min-h-screen bg-gradient-to-b from-[#F5F1EB] to-white">
      <Header />
      
      <section className="py-24 px-6 md:px-12">
        <div className="container max-w-2xl mx-auto">
          {/* Cancel Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-orange-100 mb-6">
              <XCircle className="w-12 h-12 text-orange-600" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl mb-4 text-[#2C2C2C]">
              Плащането е отменено
            </h1>
            <p className="text-xl text-[#4A4A4A]">
              Не се притеснявай, нищо не е таксувано
            </p>
          </div>

          {/* Info Card */}
          <Card className="bg-white border-none shadow-xl mb-8">
            <CardContent className="p-8">
              <p className="text-lg text-[#4A4A4A] leading-relaxed mb-6">
                Отменил си процеса на плащане. Ако имаше проблем или въпроси, можеш да се свържеш с нас.
              </p>

              <div className="p-4 bg-[#F5F1EB] rounded-lg">
                <p className="text-[#2C2C2C]">
                  <strong>Имейл:</strong>{' '}
                  <a href="mailto:kontakt@milenapetrova.bg" className="text-[#8C7A6B] hover:underline">
                    kontakt@milenapetrova.bg
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/book')}
              size="lg"
              className="bg-[#8C7A6B] hover:bg-[#6F6154] text-white px-10 py-6 text-lg"
            >
              <ArrowLeft className="mr-2 w-5 h-5" />
              Обратно към записване
            </Button>
            
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              size="lg"
              className="border-[#8C7A6B] text-[#8C7A6B] hover:bg-[#8C7A6B]/10 px-10 py-6 text-lg"
            >
              Началнастраница
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PaymentCancel;
