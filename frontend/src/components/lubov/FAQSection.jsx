import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { trackEvent } from '../../utils/tracking';

const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggle = () => {
    if (!isOpen) {
      trackEvent('faq_open', { question, index });
    }
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between py-6 text-left hover:text-[#8C7A6B] transition-colors"
      >
        <span className="text-lg font-medium text-[#2C3E50] pr-4">
          {question}
        </span>
        <ChevronDown 
          className={`w-5 h-5 text-[#8C7A6B] flex-shrink-0 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}
      >
        <div className="text-[#4A4A4A] leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const faqs = [
    {
      question: 'Трябва ли вече да съм приключила връзката?',
      answer: 'Не. Програмата може да бъде полезна както ако още си във връзката, така и ако вече си излязла от нея, но усещаш, че моделът още живее в теб.',
    },
    {
      question: 'Това терапия ли е?',
      answer: 'Не. Това е образователна и подкрепяща онлайн програма. Тя не заменя терапия, медицинска, правна или кризисна помощ.',
    },
    {
      question: 'Колко време ще ми отнеме?',
      answer: 'Можеш да гледаш със собствено темпо. Най-добре е да не бързаш. Гледай урок, работи с тетрадката и си дай време да усетиш какво се променя вътре в теб.',
    },
    {
      question: 'Ще ми помогне ли да го променя?',
      answer: 'Целта на програмата не е да промениш друг човек. Целта е да върнеш фокуса към себе си — към твоите граници, яснота, стойност и избори.',
    },
    {
      question: 'Ами ако не съм сигурна дали връзката ми е токсична?',
      answer: 'Не е нужно да си сигурна. Първата част на програмата е създадена точно за това — да ти помогне да разпознаеш какво се случва и как се чувстваш в този модел.',
    },
    {
      question: 'Мога ли да гледам програмата със собствено темпо?',
      answer: 'Да. Програмата е онлайн и можеш да преминаваш през уроците със собствено темпо.',
    },
    {
      question: 'Как получавам достъп?',
      answer: 'След покупка ще получиш имейл с потребителско име и линк за създаване на парола. След това можеш да влезеш в платформата и да започнеш.',
    },
    {
      question: 'Ще имам ли работна тетрадка?',
      answer: 'Да. Към програмата получаваш брандирана работна тетрадка, която ти помага да приложиш уроците към собствената си история.',
    },
  ];
  
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-serif text-[#2C3E50] text-center mb-12">
          Често задавани въпроси
        </h2>
        
        <div className="bg-[#F5F1EB] rounded-2xl p-8 md:p-12">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
