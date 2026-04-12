import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { CheckCircle2, Calendar, Mail, Video } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState(null);

  // Extract Calendly event details from URL params
  useEffect(() => {
    const eventUri = searchParams.get('event');
    const inviteeUri = searchParams.get('invitee');
    const eventName = searchParams.get('event_type_name');
    const inviteeName = searchParams.get('invitee_name');
    const inviteeEmail = searchParams.get('invitee_email');
    const eventStartTime = searchParams.get('event_start_time');

    if (eventUri || inviteeEmail) {
      setBookingDetails({
        eventUri,
        inviteeUri,
        eventName: eventName || 'Сесия с Милена Петрова',
        inviteeName: inviteeName || 'Клиент',
        inviteeEmail: inviteeEmail || '',
        eventStartTime: eventStartTime || ''
      });
    }
  }, [searchParams]);

  return (
    <div className="thank-you-page min-h-screen bg-gradient-to-b from-[#F5F1EB] to-white">
      <Header />
      
      <section className="py-24 px-6 md:px-12">
        <div className="container max-w-4xl mx-auto">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-6 animate-bounce">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl mb-4 text-[#2C2C2C]">
              Благодаря ти за записването!
            </h1>
            <p className="text-xl md:text-2xl text-[#4A4A4A] max-w-2xl mx-auto">
              Твоята сесия е потвърдена и чакам с нетърпение да работим заедно
            </p>
          </div>

          {/* Booking Details */}
          {bookingDetails && bookingDetails.inviteeEmail && (
            <Card className="bg-white border-none shadow-xl mb-8">
              <CardContent className="p-8">
                <h2 className="font-serif text-2xl text-[#2C2C2C] mb-6 text-center">
                  Детайли за записването
                </h2>

                <div className="space-y-4">
                  {bookingDetails.inviteeName && (
                    <div className="flex items-start gap-4 p-4 bg-[#F5F1EB] rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-[#8C7A6B] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-[#8C7A6B] font-medium">Име</p>
                        <p className="text-[#2C2C2C]">{bookingDetails.inviteeName}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-4 p-4 bg-[#F5F1EB] rounded-lg">
                    <Mail className="w-5 h-5 text-[#8C7A6B] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-[#8C7A6B] font-medium">Email</p>
                      <p className="text-[#2C2C2C]">{bookingDetails.inviteeEmail}</p>
                    </div>
                  </div>

                  {bookingDetails.eventStartTime && (
                    <div className="flex items-start gap-4 p-4 bg-[#F5F1EB] rounded-lg">
                      <Calendar className="w-5 h-5 text-[#8C7A6B] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-[#8C7A6B] font-medium">Дата и час</p>
                        <p className="text-[#2C2C2C]">
                          {new Date(bookingDetails.eventStartTime).toLocaleString('bg-BG', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

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
                      Провери имейла си
                    </h3>
                    <p className="text-[#4A4A4A]">
                      Изпратихме ти потвърждение с всички детайли на имейла, който въведе в Calendly
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-[#F5F1EB] rounded-lg">
                  <Video className="w-6 h-6 text-[#8C7A6B] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-lg text-[#2C2C2C] mb-1">
                      Google Meet линк
                    </h3>
                    <p className="text-[#4A4A4A]">
                      Google Meet линкът за срещата е включен в календарната покана. Ще получиш и reminder 1 ден преди сесията.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-[#F5F1EB] rounded-lg">
                  <Calendar className="w-6 h-6 text-[#8C7A6B] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-lg text-[#2C2C2C] mb-1">
                      Добави в календара
                    </h3>
                    <p className="text-[#4A4A4A]">
                      Calendly автоматично добавя срещата в твоя календар. Провери за календарна покана.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Welcome Message */}
          <Card className="bg-gradient-to-br from-[#8C7A6B]/10 to-[#D8CFC4]/20 border-2 border-[#8C7A6B]/30 mb-8">
            <CardContent className="p-8 text-center">
              <h3 className="font-serif text-2xl text-[#2C2C2C] mb-4">
                Добре дошла в нашата работа заедно
              </h3>
              <p className="text-lg text-[#4A4A4A] leading-relaxed mb-6">
                Радвам се, че направи тази крачка. Ако имаш въпроси преди сесията, не се колебай да ми пишеш.
              </p>
              <p className="text-[#2C2C2C] font-medium">
                До скоро,<br />
                <span className="font-serif text-xl text-[#8C7A6B]">Милена</span>
              </p>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="bg-white border-none shadow-lg mb-8">
            <CardContent className="p-6 text-center">
              <p className="text-[#4A4A4A] mb-2">Имаш въпроси?</p>
              <a 
                href="mailto:kontakt@milenapetrova.bg" 
                className="text-[#8C7A6B] hover:underline font-medium text-lg"
              >
                kontakt@milenapetrova.bg
              </a>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="text-center">
            <Button
              onClick={() => navigate('/')}
              size="lg"
              className="bg-[#8C7A6B] hover:bg-[#6F6154] text-white px-10 py-6 text-lg"
            >
              Обратно към началната страница
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ThankYou;
