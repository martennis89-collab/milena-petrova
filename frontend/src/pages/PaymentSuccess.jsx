import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { CheckCircle2, Loader2, Mail, Calendar } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session_id');
  
  const [status, setStatus] = useState('checking'); // checking, success, error
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (!sessionId) {
      navigate('/book');
      return;
    }

    pollPaymentStatus();
  }, [sessionId]);

  const pollPaymentStatus = async () => {
    const maxAttempts = 5;
    const pollInterval = 2000; // 2 seconds

    if (attempts >= maxAttempts) {
      setStatus('timeout');
      return;
    }

    try {
      const response = await axios.get(`${BACKEND_URL}/api/payments/checkout/status/${sessionId}`);
      
      if (response.data.payment_status === 'paid') {
        setStatus('success');
        setPaymentDetails(response.data);
        return;
      } else if (response.data.status === 'expired') {
        setStatus('error');
        return;
      }

      // Continue polling
      setAttempts(prev => prev + 1);
      setTimeout(pollPaymentStatus, pollInterval);
    } catch (error) {
      console.error('Error checking payment status:', error);
      setStatus('error');
    }
  };

  if (status === 'checking') {
    return (
      <div className="payment-success-page min-h-screen bg-gradient-to-b from-[#F5F1EB] to-white">
        <Header />
        <section className="py-24 px-6 md:px-12">
          <div className="container max-w-2xl mx-auto text-center">
            <Loader2 className="w-16 h-16 text-[#8C7A6B] animate-spin mx-auto mb-6" />
            <h1 className="font-serif text-3xl md:text-4xl mb-4 text-[#2C2C2C]">
              Проверяваме плащането...
            </h1>
            <p className="text-lg text-[#4A4A4A]">
              Моля, изчакай момент
            </p>
          </div>
        </section>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="payment-success-page min-h-screen bg-gradient-to-b from-[#F5F1EB] to-white">
        <Header />
        <section className="py-24 px-6 md:px-12">
          <div className="container max-w-3xl mx-auto">
            {/* Success Icon */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <h1 className="font-serif text-4xl md:text-5xl mb-4 text-[#2C2C2C]">
                Плащането е успешно!
              </h1>
              <p className="text-xl text-[#4A4A4A]">
                Благодарим ти! Сесията ти е потвърдена.
              </p>
            </div>

            {/* What's Next Card */}
            <Card className="bg-white border-none shadow-xl mb-8">
              <CardContent className="p-8">
                <h2 className="font-serif text-2xl text-[#2C2C2C] mb-6">
                  Какво следва:
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-[#F5F1EB] rounded-lg">
                    <Mail className="w-6 h-6 text-[#8C7A6B] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-lg text-[#2C2C2C] mb-1">
                        Проверка имейл
                      </h3>
                      <p className="text-[#4A4A4A]">
                        Получи потвърждение за плащането на имейла, който си въвел в Calendly
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-[#F5F1EB] rounded-lg">
                    <Calendar className="w-6 h-6 text-[#8C7A6B] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-lg text-[#2C2C2C] mb-1">
                        Google Meet линк
                      </h3>
                      <p className="text-[#4A4A4A]">
                        Calendly ще ти изпрати автоматично линк за Google Meet срещата преди записания час
                      </p>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-[#8C7A6B]/10 to-[#D8CFC4]/20 rounded-lg border-l-4 border-[#8C7A6B]">
                    <p className="text-[#2C2C2C] leading-relaxed">
                      Ако имаш въпроси или трябва да промениш часа си, можеш да ни пишеш на{' '}
                      <a href="mailto:kontakt@milenapetrova.bg" className="text-[#8C7A6B] hover:underline font-medium">
                        kontakt@milenapetrova.bg
                      </a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Details */}
            {paymentDetails && (
              <Card className="bg-gradient-to-br from-[#F5F1EB] to-white border border-[#D8CFC4] mb-8">
                <CardContent className="p-6">
                  <h3 className="font-serif text-lg text-[#2C2C2C] mb-4">
                    Детайли за плащане:
                  </h3>
                  <div className="space-y-2 text-[#4A4A4A]">
                    <div className="flex justify-between">
                      <span>Сума:</span>
                      <span className="font-medium">€{(paymentDetails.amount_total / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Статус:</span>
                      <span className="font-medium text-green-600">Заплатено</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="text-center">
              <Button
                onClick={() => navigate('/')}
                size="lg"
                className="bg-[#8C7A6B] hover:bg-[#6F6154] text-white px-10 py-6 text-lg"
              >
                Към началната страница
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  // Error or timeout
  return (
    <div className="payment-success-page min-h-screen bg-gradient-to-b from-[#F5F1EB] to-white">
      <Header />
      <section className="py-24 px-6 md:px-12">
        <div className="container max-w-2xl mx-auto text-center">
          <h1 className="font-serif text-3xl md:text-4xl mb-4 text-[#2C2C2C]">
            Имаше проблем
          </h1>
          <p className="text-lg text-[#4A4A4A] mb-8">
            Моля, провери имейла си за потвърждение или се свържи с нас.
          </p>
          <Button
            onClick={() => navigate('/')}
            size="lg"
            className="bg-[#8C7A6B] hover:bg-[#6F6154] text-white px-10 py-6 text-lg"
          >
            Към началната страница
          </Button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
