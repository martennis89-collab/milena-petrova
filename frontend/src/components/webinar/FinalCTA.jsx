import React from 'react';
import { Link } from 'react-router-dom';

const FinalCTA = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#F5F1EB] to-[#E5D5C5]">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl sm:text-4xl lg:text-5xl text-[#2C3E50] mb-6">
          Ако не се регистрирате сега...
        </h2>
        
        <p className="text-lg text-[#4A4A4A] mb-6 leading-relaxed max-w-2xl mx-auto">
          Ще продължите да се питате защо се връщате към едни и същи болезнени ситуации. Ще останете заседнали в модели, които ви пречат да намерите любовта, която заслужавате.
        </p>

        <div className="bg-white p-8 rounded-2xl shadow-lg mb-8 max-w-2xl mx-auto">
          <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl text-[#2C3E50] mb-4">
            Но ако се присъедините...
          </h3>
          <p className="text-[#4A4A4A] leading-relaxed mb-6">
            Ще направите първата стъпка към разбиране на невидимите модели, които управляват живота ви. Ще откриете къде наистина започва промяната. И ще получите увереността, че можете да изберете различно.
          </p>
          
          <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg border-l-4 border-red-500 mb-6">
            <p className="font-semibold text-[#2C3E50]">⏰ Остават само 11 от 50 места</p>
          </div>

          <a 
            href="#registration"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-block bg-[#2C3E50] hover:bg-[#34495E] text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 text-lg"
          >
            Запази място безплатно
          </a>
        </div>

        <p className="text-sm text-[#8C7A6B]">
          16 Юли 2025, 20:00ч • Google Meet • Безплатно
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
