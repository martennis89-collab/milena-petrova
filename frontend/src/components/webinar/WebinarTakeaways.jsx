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
    <section className="py-16 md:py-24 bg-white">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl sm:text-4xl text-[#2C3E50] mb-4">
            Какво ще научите
          </h2>
          <p className="text-lg text-[#4A4A4A] max-w-2xl mx-auto">
            60 минути, които могат да променят начина, по който гледате на връзките си
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {takeaways.map((item, index) => (
            <div 
              key={index}
              className="bg-[#F5F1EB] p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl text-[#2C3E50] font-semibold mb-3">
                {item.title}
              </h3>
              <p className="text-[#4A4A4A] leading-relaxed">
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
