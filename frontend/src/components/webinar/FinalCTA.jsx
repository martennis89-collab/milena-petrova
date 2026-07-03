import React from 'react';
import { Link } from 'react-router-dom';

const FinalCTA = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#FFF5F7] via-[#FFE8ED] to-[#FFD4DC] relative overflow-hidden">
      {/* Floral decorative elements */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#E89AAC] rounded-full blur-3xl opacity-20"></div>
      
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Decorative element */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4758C]"></div>
          <span className="text-4xl">🌸</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4758C]"></div>
        </div>
        
        <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl sm:text-4xl lg:text-5xl bg-gradient-to-r from-[#B85C7A] to-[#D4758C] bg-clip-text text-transparent mb-6 font-bold">
          Ако не се регистрирате сега...
        </h2>
        
        <p className="text-lg text-[#7A5662] mb-6 leading-relaxed max-w-2xl mx-auto">
          Ще продължите да се питате защо се връщате към едни и същи болезнени ситуации. Ще останете заседнали в модели, които ви пречат да намерите любовта, която заслужавате.
        </p>

        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl mb-8 max-w-2xl mx-auto border-2 border-[#D4758C]/30">
          <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl text-[#7A5662] mb-4 font-bold">
            Но ако се присъедините...
          </h3>
          <p className="text-[#9B7680] leading-relaxed mb-6">
            Ще направите първата стъпка към разбиране на невидимите модели, които управляват живота ви. Ще откриете къде наистина започва промяната. И ще получите увереността, че можете да изберете различно.
          </p>
          
          <div className="bg-gradient-to-r from-rose-100 to-pink-100 p-4 rounded-2xl border-l-4 border-[#D4758C] mb-6">
            <p className="font-bold text-[#7A5662]">⏰ Остават само 11 от 50 места</p>
          </div>

          <a 
            href="#registration"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-block bg-gradient-to-r from-[#D4758C] to-[#B85C7A] hover:from-[#B85C7A] hover:to-[#D4758C] text-white font-bold py-4 px-8 rounded-full transition-all duration-200 transform hover:-translate-y-0.5 text-lg shadow-lg"
          >
            Запази място безплатно 💝
          </a>
        </div>

        <p className="text-sm text-[#9B7680]">
          16 Юли 2026, 20:00ч • Google Meet • Безплатно
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
