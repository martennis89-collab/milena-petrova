import React from 'react';
import { FaHeart, FaCompass, FaLightbulb, FaUnlock } from 'react-icons/fa';

const WebinarTakeaways = () => {
  const takeaways = [
    {
      icon: <FaHeart className="w-8 h-8 text-[#8C7A6B]" />,
      title: "Невидимите модели",
      description: "Разберете защо се връщате към едни и същи болезнени избори във връзките си, дори когато знаете, че не са добри за вас."
    },
    {
      icon: <FaCompass className="w-8 h-8 text-[#8C7A6B]" />,
      title: "Правилният въпрос",
      description: "Научете защо въпросът не е 'Защо той се държи така?', а 'Какво ме задържа тук?' и как това променя всичко."
    },
    {
      icon: <FaLightbulb className="w-8 h-8 text-[#8C7A6B]" />,
      title: "Моментът на промяна",
      description: "Открийте точния момент, в който започва истинската промяна - и как да го разпознаете."
    },
    {
      icon: <FaUnlock className="w-8 h-8 text-[#8C7A6B]" />,
      title: "Пътят напред",
      description: "Получете практични стъпки за излизане от цикъла на болезнените отношения и намиране на любов, която ви заслужавате."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#FFF5F7] to-white relative overflow-hidden">
      {/* Floral accents */}
      <div className="absolute top-20 left-10 w-48 h-48 bg-[#FFD4DC] rounded-full blur-3xl opacity-15"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-[#E89AAC] rounded-full blur-3xl opacity-15"></div>
      
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          {/* Decorative element */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4758C]"></div>
            <span className="text-3xl">🌸</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4758C]"></div>
          </div>
          
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl sm:text-4xl bg-gradient-to-r from-[#B85C7A] to-[#D4758C] bg-clip-text text-transparent mb-4 font-bold">
            Какво ще научите
          </h2>
          <p className="text-lg text-[#9B7680] max-w-2xl mx-auto">
            60 минути, които могат да променят начина, по който гледате на връзките си
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {takeaways.map((item, index) => (
            <div 
              key={index}
              className="bg-white border-2 border-[#D4758C]/20 p-8 rounded-2xl hover:shadow-xl hover:border-[#D4758C]/40 transition-all duration-300"
            >
              <div className="mb-4 text-[#D4758C]">{item.icon}</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl text-[#7A5662] font-bold mb-3">
                {item.title}
              </h3>
              <p className="text-[#9B7680] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebinarTakeaways;
