import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { CheckCircle2, ArrowRight, Clock } from 'lucide-react';
import { getResultType } from '../../data/quizData';

const QuizResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalScore } = location.state || { totalScore: 0 };
  const result = getResultType(totalScore);

  const scrollToBooking = () => {
    // Navigate to booking page with state to trigger scroll
    navigate('/book', { state: { scrollToBooking: true } });
  };

  return (
    <section className="quiz-results min-h-screen bg-gradient-to-b from-[#F5F1EB] to-white pt-24 pb-20">
      <div className="container px-6 md:px-12 max-w-4xl mx-auto">
        {/* Result Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#8C7A6B]/20 mb-6">
            <CheckCircle2 className="w-10 h-10 text-[#8C7A6B]" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2C2C2C] mb-4">
            Твоят резултат показва:
          </h1>
          <h2 className="font-serif text-2xl md:text-3xl text-[#8C7A6B] font-bold">
            {result.type}
          </h2>
        </div>

        {/* Emotional Validation - Opening */}
        <Card className="bg-white border-none shadow-xl mb-8">
          <CardContent className="p-8 md:p-12">
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-[#2C2C2C] leading-relaxed">
                Ако усещаш, че едни и същи ситуации се повтарят в живота ти – това не е случайно.
              </p>
              
              <p className="text-lg md:text-xl text-[#2C2C2C] leading-relaxed">
                Вероятно вече си опитвала да промениш нещата. Може би си се питала дали проблемът е в теб. Може би си се чувствала объркана, защото каквото и да правиш – моделът продължава.
              </p>

              <div className="bg-[#F5F1EB] rounded-lg p-6 my-8">
                <p className="text-lg md:text-xl text-[#2C2C2C] leading-relaxed font-medium">
                  {result.description}
                </p>
              </div>

              <p className="text-lg md:text-xl text-[#2C2C2C] leading-relaxed">
                Причината не е в избора или характера ти. Тя е по-дълбока – и затова е невидима.
              </p>

              <p className="text-lg md:text-xl text-[#2C2C2C] leading-relaxed">
                В много случаи тези модели се формират във връзките с родителите и се предават несъзнателно през поколенията.
              </p>
            </div>

            {/* Why This Happens */}
            <div className="mt-10 pt-8 border-t border-[#D8CFC4]">
              <h3 className="font-serif text-xl md:text-2xl text-[#2C2C2C] mb-4">
                Затова:
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-[#8C7A6B] mt-1 text-lg">–</span>
                  <span className="text-[#2C2C2C] text-lg">попадаш в едни и същи типове връзки</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#8C7A6B] mt-1 text-lg">–</span>
                  <span className="text-[#2C2C2C] text-lg">изпитваш вина или напрежение без ясна причина</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#8C7A6B] mt-1 text-lg">–</span>
                  <span className="text-[#2C2C2C] text-lg">даваш повече, отколкото получаваш</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#8C7A6B] mt-1 text-lg">–</span>
                  <span className="text-[#2C2C2C] text-lg">чувстваш се заседнала в ситуация, която не можеш да обясниш</span>
                </div>
              </div>
            </div>

            {/* Good News */}
            <div className="bg-gradient-to-br from-[#8C7A6B]/10 to-[#D8CFC4]/20 rounded-lg p-8 mt-8 border-l-4 border-[#8C7A6B]">
              <h3 className="font-serif text-xl md:text-2xl text-[#2C2C2C] mb-4 font-bold">
                Добрата новина е:
              </h3>
              <p className="text-lg md:text-xl text-[#2C2C2C] leading-relaxed">
                Когато този модел стане видим, той започва да се променя.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* How Milena Can Help - NEW SECTION */}
        <Card className="bg-white border-none shadow-xl mb-8">
          <CardContent className="p-8 md:p-12">
            <h3 className="font-serif text-2xl md:text-3xl text-[#2C2C2C] mb-6">
              Как може да ти помогне Милена
            </h3>
            
            <p className="text-lg md:text-xl text-[#4A4A4A] leading-relaxed mb-6">
              Милена не дава съвети. Тя не казва какво да правиш.
            </p>

            <p className="text-lg md:text-xl text-[#4A4A4A] leading-relaxed mb-6">
              Вместо това, тя разкрива скритата динамика във взаимоотношенията ти – с партньори, родители, деца. Прави видимо това, което досега е било невидимо.
            </p>

            <p className="text-lg md:text-xl text-[#2C2C2C] leading-relaxed font-medium">
              Когато веднъж видиш модела, той вече не може да продължава по същия начин.
            </p>
          </CardContent>
        </Card>

        {/* Benefits Block */}
        <Card className="bg-gradient-to-br from-[#F5F1EB] to-white border-2 border-[#8C7A6B]/30 shadow-xl mb-8">
          <CardContent className="p-8 md:p-12">
            <h3 className="font-serif text-2xl md:text-3xl text-[#2C2C2C] mb-8 text-center">
              Още в първата сесия ще получиш:
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-[#8C7A6B] mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-lg text-[#2C2C2C] mb-1">Яснота</h4>
                  <p className="text-[#4A4A4A]">какво точно се повтаря и откъде идва</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-[#8C7A6B] mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-lg text-[#2C2C2C] mb-1">Разбиране</h4>
                  <p className="text-[#4A4A4A]">защо досега не си могла да промениш ситуацията</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-[#8C7A6B] mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-lg text-[#2C2C2C] mb-1">Облекчение</h4>
                  <p className="text-[#4A4A4A]">от усещането, че носиш нещо, което не е твое</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-[#8C7A6B] mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-lg text-[#2C2C2C] mb-1">Посока</h4>
                  <p className="text-[#4A4A4A]">как може да се прекъсне моделът</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Qualification Block */}
        <Card className="bg-white border-none shadow-xl mb-8">
          <CardContent className="p-8 md:p-12">
            <h3 className="font-serif text-2xl md:text-3xl text-[#2C2C2C] mb-6">
              Тази сесия е за теб ако:
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-5 rounded-lg bg-[#F5F1EB]/50 border-l-4 border-[#8C7A6B]">
                <CheckCircle2 className="w-5 h-5 text-[#8C7A6B] mt-1 flex-shrink-0" />
                <span className="text-[#2C2C2C] text-lg">Усещаш, че се повтаряш в отношенията си и искаш да разбереш защо</span>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-lg bg-[#F5F1EB]/50 border-l-4 border-[#8C7A6B]">
                <CheckCircle2 className="w-5 h-5 text-[#8C7A6B] mt-1 flex-shrink-0" />
                <span className="text-[#2C2C2C] text-lg">Готова си да видиш причината, дори ако е по-дълбока от очакваното</span>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-lg bg-[#F5F1EB]/50 border-l-4 border-[#8C7A6B]">
                <CheckCircle2 className="w-5 h-5 text-[#8C7A6B] mt-1 flex-shrink-0" />
                <span className="text-[#2C2C2C] text-lg">Търсиш яснота, не съвети – искаш да видиш, а не да ти казват какво да правиш</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Urgency Block */}
        <div className="bg-gradient-to-r from-[#D8CFC4]/30 to-[#F5F1EB]/30 rounded-lg p-6 mb-8 border border-[#8C7A6B]/20">
          <div className="flex items-start gap-4">
            <Clock className="w-6 h-6 text-[#8C7A6B] mt-1 flex-shrink-0" />
            <p className="text-base md:text-lg text-[#2C2C2C] leading-relaxed">
              <strong>Милена работи с ограничен брой жени седмично,</strong> за да запази качеството на всяка сесия. Свободните часове са малко.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-b from-white to-[#F5F1EB] rounded-2xl p-10 md:p-12 shadow-2xl">
          <h3 className="font-serif text-2xl md:text-3xl text-[#2C2C2C] mb-3">
            Запази своята сесия
          </h3>
          <p className="text-lg text-[#4A4A4A] mb-8 max-w-2xl mx-auto">
            и разбери какво се повтаря при теб
          </p>
          
          <Button
            onClick={scrollToBooking}
            size="lg"
            className="bg-[#8C7A6B] hover:bg-[#6F6154] text-white px-12 py-7 text-xl rounded-md transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 mb-6"
          >
            Запази час и получи яснота
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          {/* Trust Microcopy */}
          <div className="flex items-center justify-center gap-2 text-sm text-[#8C7A6B] flex-wrap">
            <span>Запазваш час</span>
            <span>→</span>
            <span>плащаш онлайн</span>
            <span>→</span>
            <span>получаваш линк за срещата</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizResults;
