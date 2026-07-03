import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const WebinarFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "За кого е този уебинар?",
      answer: "За всяка жена, която се е питала защо попада винаги в едни и същи болезнени модели във връзките си. За тези, които искат да разберат корена на проблема и да направят промяна."
    },
    {
      question: "Ще получа запис на уебинара?",
      answer: "Уебинарът е само на живо. Не предоставяме записи, за да създадем атмосфера на присъствие и автентичност."
    },
    {
      question: "Какво ми е нужно за да се присъединя?",
      answer: "Само устройство с интернет връзка - компютър, таблет или телефон. Уебинарът е през Google Meet, не е нужно да инсталирате допълнителни програми."
    },
    {
      question: "Могат ли да участват мъже?",
      answer: "Уебинарът е създаден специално за жени и техния опит. Препоръчваме ви да го гледате в сигурна и спокойна среда."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl sm:text-4xl text-[#2C3E50] mb-4">
            Често задавани въпроси
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-[#E5E7EB] rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-6 text-left hover:bg-[#F5F1EB] transition-colors duration-200"
              >
                <span className="font-semibold text-[#2C3E50] pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <FaChevronUp className="flex-shrink-0 text-[#8C7A6B]" />
                ) : (
                  <FaChevronDown className="flex-shrink-0 text-[#8C7A6B]" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 text-[#4A4A4A] leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebinarFAQ;
