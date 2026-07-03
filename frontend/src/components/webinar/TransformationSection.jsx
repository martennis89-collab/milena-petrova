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
    <section className="py-16 md:py-24 bg-white">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl sm:text-4xl text-[#2C3E50] mb-4">
            Преди и след уебинара
          </h2>
          <p className="text-lg text-[#4A4A4A]">
            60 минути, които ще променят перспективата ти
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Old Me - Current painful state */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl border border-gray-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-100 rounded-full blur-3xl opacity-30" />
            
            <div className="relative z-10">
              <div className="inline-block bg-gray-200 px-4 py-2 rounded-full mb-6">
                <span className="text-sm font-bold uppercase tracking-wide text-gray-600">Преди уебинара</span>
              </div>
              
              <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl text-[#2C3E50] mb-6 font-semibold">
                Заседнала в болезнения цикъл
              </h3>

              <ul className="space-y-4">
                {oldMe.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <FaTimesCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-[#4A4A4A] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 p-4 bg-white rounded-lg border-l-4 border-red-400">
                <p className="text-sm text-[#4A4A4A] italic">
                  "Защо пак се случва? Защо винаги избирам същия тип мъже?"
                </p>
              </div>
            </div>
          </div>

          {/* New Me - Transformed state */}
          <div className="bg-gradient-to-br from-[#F5F1EB] to-[#E5D5C5] p-8 rounded-2xl border-2 border-[#8C7A6B] relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#BFAE9F] rounded-full blur-3xl opacity-40" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8C7A6B] to-[#BFAE9F] px-4 py-2 rounded-full mb-6">
                <span className="text-sm font-bold uppercase tracking-wide text-white">След уебинара</span>
                <span className="text-lg">✨</span>
              </div>
              
              <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl text-[#2C3E50] mb-6 font-semibold">
                Осъзната и свободна да избираш
              </h3>

              <ul className="space-y-4">
                {newMe.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <FaCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-[#2C3E50] leading-relaxed font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 p-4 bg-white rounded-lg border-l-4 border-[#8C7A6B] shadow-sm">
                <p className="text-sm text-[#2C3E50] italic font-medium">
                  "Разбирам какво ме задържаше. Сега мога да избера различно."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-[#4A4A4A] mb-6">
            Кой "аз" избираш да бъдеш след 16 Юли?
          </p>
          <a 
            href="#registration"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-block bg-[#2C3E50] hover:bg-[#34495E] text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5"
          >
            Запази място за трансформацията
          </a>
        </div>
      </div>
    </section>
  );
};

export default TransformationSection;
