import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { getResultType } from '../../data/quizData';

const QuizResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalScore } = location.state || { totalScore: 0 };
  const result = getResultType(totalScore);

  const scrollToBooking = () => {
    navigate('/book#booking-section');
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

        {/* Result Description */}
        <Card className="bg-white border-none shadow-xl mb-12">
          <CardContent className="p-8 md:p-12">
            <p className="text-lg md:text-xl text-[#4A4A4A] leading-relaxed mb-6">
              {result.description}
            </p>

            <div className="my-10 pt-8 border-t border-[#D8CFC4]">
              <p className="text-lg md:text-xl text-[#2C2C2C] leading-relaxed mb-6">
                Ако усещаш, че едни и същи ситуации се повтарят в живота ти – това не е случайно.
              </p>
              <p className="text-lg md:text-xl text-[#2C2C2C] leading-relaxed mb-6">
                В много случаи причината не е в избора или характера ти, а в по-дълбоки модели, които се формират във връзките с родителите и се предават несъзнателно.
              </p>
            </div>

            <div className="bg-[#F5F1EB] rounded-lg p-6 mb-8">
              <h3 className="font-serif text-xl md:text-2xl text-[#2C2C2C] mb-4">
                Затова:
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-[#8C7A6B] mt-1">–</span>
                  <span className="text-[#2C2C2C]">попадаш в едни и същи типове връзки</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#8C7A6B] mt-1">–</span>
                  <span className="text-[#2C2C2C]">изпитваш вина или напрежение без ясна причина</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#8C7A6B] mt-1">–</span>
                  <span className="text-[#2C2C2C]">даваш повече, отколкото получаваш</span>
                </div>
              </div>
            </div>

            <div className="bg-[#8C7A6B]/10 rounded-lg p-6 border-l-4 border-[#8C7A6B]">
              <h3 className="font-serif text-xl md:text-2xl text-[#2C2C2C] mb-3">
                Добрата новина е:
              </h3>
              <p className="text-lg text-[#2C2C2C] mb-4">
                Когато този модел стане видим, той започва да се променя.
              </p>
              <p className="text-lg text-[#2C2C2C] font-medium">
                Още в първата сесия можеш да получиш яснота:
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#8C7A6B] mt-0.5 flex-shrink-0" />
                  <span className="text-[#2C2C2C]">какво точно се повтаря</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#8C7A6B] mt-0.5 flex-shrink-0" />
                  <span className="text-[#2C2C2C]">откъде идва</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#8C7A6B] mt-0.5 flex-shrink-0" />
                  <span className="text-[#2C2C2C]">как може да се прекъсне</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-b from-white to-[#F5F1EB] rounded-2xl p-10 md:p-12 shadow-lg">
          <h3 className="font-serif text-2xl md:text-3xl text-[#2C2C2C] mb-4">
            Запази своята сесия
          </h3>
          <p className="text-base md:text-lg text-[#8C7A6B] mb-8 italic">
            Ограничен брой часове на седмица
          </p>
          <Button
            onClick={scrollToBooking}
            size="lg"
            className="bg-[#8C7A6B] hover:bg-[#6F6154] text-white px-12 py-7 text-xl rounded-md transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            Запази час сега
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default QuizResults;
