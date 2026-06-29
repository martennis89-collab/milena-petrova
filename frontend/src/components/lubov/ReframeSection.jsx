import React from 'react';

const ReframeSection = () => {
  const quotes = [
    'Може би просто му трябва време.',
    'Може би ако се държа по-добре, ще ме избере.',
    'Може би този път ще бъде различно.',
  ];
  
  return (
    <section className="py-20 bg-gradient-to-b from-[#F5F1EB] to-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-serif text-[#2C3E50] text-center mb-8">
          Не си слаба. Не си прекалено чувствителна. Не си счупена.
        </h2>
        
        <div className="max-w-3xl mx-auto mb-10">
          <p className="text-lg text-[#4A4A4A] leading-relaxed mb-6">
            Когато любовта се смеси с болка, надежда, страх и привързаност, човек може да започне да бърка напрежението с близост. Малките жестове започват да изглеждат като доказателство, че всичко ще се оправи. А потенциалът на другия човек започва да изглежда по-важен от реалното му поведение.
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-10 border-l-4 border-[#8C7A6B]">
          {quotes.map((quote, index) => (
            <p 
              key={index}
              className="text-lg text-[#4A4A4A] italic mb-4 last:mb-0"
            >
              "{quote}"
            </p>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-xl md:text-2xl font-medium text-[#2C3E50] leading-relaxed">
            Но любовта не трябва да изисква да изгубиш себе си, за да бъдеш обичана.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReframeSection;
