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
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-[#FFF5F7]">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {/* Decorative element */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4758C]"></div>
            <span className="text-3xl">💬</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4758C]"></div>
          </div>
          
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl sm:text-4xl bg-gradient-to-r from-[#B85C7A] to-[#D4758C] bg-clip-text text-transparent mb-4 font-bold">
            Често задавани въпроси
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-2 border-[#D4758C]/20 rounded-2xl overflow-hidden bg-white hover:border-[#D4758C]/40 transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-6 text-left hover:bg-[#FFF5F7] transition-colors duration-200"
              >
                <span className="font-bold text-[#7A5662] pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <FaChevronUp className="flex-shrink-0 text-[#D4758C]" />
                ) : (
                  <FaChevronDown className="flex-shrink-0 text-[#D4758C]" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 text-[#9B7680] leading-relaxed bg-[#FFF5F7]/50">
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
