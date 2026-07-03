import React from 'react';
import { FaTimesCircle, FaCheckCircle } from 'react-icons/fa';

const TransformationSection = () => {
  const oldMe = [
    "Повтаряш едни и същи грешки във всяка връзка",
    "Чувстваш се безпомощна и не разбираш защо се случва отново",
    "Обвиняваш себе си или партньора си, но нищо не се променя",
    "Оставаш в отношения, които те изтощават емоционално",
    "Не знаеш откъде да започнеш промяната"
  ];

  const newMe = [
    "Разпознаваш болезнените модели преди да се повторят",
    "Разбираш дълбоката причина зад твоите избори",
    "Вземаш отговорност за промяната, без самообвинение",
    "Имаш яснота и сила да избереш различно",
    "Знаеш точно откъде започва истинската промяна"
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-[#FFF5F7] relative overflow-hidden">
      {/* Floral decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#FFD4DC] rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E89AAC] rounded-full blur-3xl opacity-10"></div>
      
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          {/* Decorative element */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4758C]"></div>
            <span className="text-3xl">🌺</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4758C]"></div>
          </div>
          
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl sm:text-4xl bg-gradient-to-r from-[#B85C7A] to-[#D4758C] bg-clip-text text-transparent mb-4 font-bold">
            Преди и след уебинара
          </h2>
          <p className="text-lg text-[#9B7680]">
            60 минути, които ще променят перспективата ти
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Old Me - Current painful state */}
          <div className="bg-white border-2 border-gray-300 p-8 rounded-2xl relative overflow-hidden shadow-md">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-200 rounded-full blur-3xl opacity-30" />
            
            <div className="relative z-10">
              <div className="inline-block bg-gray-200 px-4 py-2 rounded-full mb-6">
                <span className="text-sm font-bold uppercase tracking-wide text-gray-600">Преди уебинара</span>
              </div>
              
              <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl text-[#7A5662] mb-6 font-bold">
                Заседнала в болезнения цикъл
              </h3>

              <ul className="space-y-4">
                {oldMe.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <FaTimesCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-[#9B7680] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300">
                <p className="text-sm text-[#9B7680] italic">
                  "Защо пак се случва? Защо винаги избирам същия тип мъже?"
                </p>
              </div>
            </div>
          </div>

          {/* New Me - Transformed state */}
          <div className="bg-gradient-to-br from-[#FFF5F7] to-[#FFE8ED] p-8 rounded-2xl border-2 border-[#D4758C] relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E89AAC] rounded-full blur-3xl opacity-40" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4758C] to-[#B85C7A] px-4 py-2 rounded-full mb-6 shadow-md">
                <span className="text-sm font-bold uppercase tracking-wide text-white">След уебинара</span>
                <span className="text-lg">✨</span>
              </div>
              
              <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl bg-gradient-to-r from-[#B85C7A] to-[#D4758C] bg-clip-text text-transparent mb-6 font-bold">
                Осъзната и свободна да избираш
              </h3>

              <ul className="space-y-4">
                {newMe.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <FaCheckCircle className="w-5 h-5 text-[#D4758C] flex-shrink-0 mt-0.5" />
                    <span className="text-[#7A5662] leading-relaxed font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 p-4 bg-white rounded-lg border-l-4 border-[#D4758C] shadow-sm">
                <p className="text-sm text-[#7A5662] italic font-medium">
                  "Разбирам какво ме задържаше. Сега мога да избера различно."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-[#7A5662] mb-6 font-medium">
            Кой "аз" избираш да бъдеш след 16 Юли?
          </p>
          <a 
            href="#registration"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-block bg-gradient-to-r from-[#D4758C] to-[#B85C7A] hover:from-[#B85C7A] hover:to-[#D4758C] text-white font-semibold py-4 px-8 rounded-full transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg"
          >
            Запази място за трансформацията
          </a>
        </div>
      </div>
    </section>
  );
};

export default TransformationSection;
