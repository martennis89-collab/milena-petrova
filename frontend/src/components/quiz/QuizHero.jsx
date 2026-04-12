import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

const QuizHero = () => {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate('/quiz');
  };

  return (
    <section className="quiz-hero relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F5F1EB] to-white pt-20">
      <div className="container px-6 md:px-12 max-w-4xl mx-auto text-center py-20">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-8 text-[#2C2C2C] animate-fadeIn">
          Ако усещаш, че повтаряш едни и същи модели във връзките си… вероятно причината е по-дълбока. И може да се промени.
        </h1>
        
        <p className="text-xl md:text-2xl leading-relaxed mb-6 text-[#4A4A4A] max-w-3xl mx-auto">
          2-минутен тест, който ще ти помогне да разбереш какво всъщност се повтаря при теб – и откъде идва.
        </p>

        <Button 
          onClick={startQuiz}
          size="lg"
          className="bg-[#8C7A6B] hover:bg-[#6F6154] text-white px-12 py-7 text-xl rounded-md transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 mt-8"
        >
          Направи теста
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>

        <p className="text-sm md:text-base text-[#8C7A6B] mt-6 font-medium">
          Отнема 2 минути • Безплатно • Без ангажимент
        </p>

        {/* Secondary CTA */}
        <div className="mt-12 pt-8 border-t border-[#D8CFC4]">
          <p className="text-base text-[#4A4A4A] mb-4">
            Вече си сигурна в решението си?
          </p>
          <Button
            onClick={() => navigate('/book')}
            variant="outline"
            size="lg"
            className="border-[#8C7A6B] text-[#8C7A6B] hover:bg-[#8C7A6B]/10 px-8 py-6 text-lg rounded-md transition-all duration-300"
          >
            Запази час директно
          </Button>
        </div>
      </div>
    </section>
  );
};

export default QuizHero;
