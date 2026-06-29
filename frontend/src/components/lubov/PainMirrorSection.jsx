import React from 'react';

const PainMirrorSection = () => {
  const painPoints = [
    'Чакаш съобщение и цялото ти настроение зависи от него.',
    'Оправдаваш поведение, което те боли.',
    'Надяваш се, че този път ще бъде различно.',
    'Даваш прекалено много, но се страхуваш да поставиш граница.',
    'Част от теб знае истината, но друга част още се държи за надеждата.',
  ];
  
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-serif text-[#2C3E50] text-center mb-8">
          Може би не е само „сложна връзка".
        </h2>
        
        <p className="text-lg text-[#4A4A4A] text-center max-w-3xl mx-auto mb-12 leading-relaxed">
          Понякога връзката не изглежда драматична отвън. Няма нужда всеки ден да има скандали, за да усещаш, че нещо вътре в теб се свива.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {painPoints.map((point, index) => (
            <div 
              key={index}
              className="flex items-start p-6 bg-[#F5F1EB] rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 rounded-full bg-[#8C7A6B]/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#8C7A6B]"></div>
                </div>
              </div>
              <p className="ml-4 text-[#4A4A4A] leading-relaxed">
                {point}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-xl font-medium text-[#2C3E50] italic">
            И най-трудното е, че започваш да се питаш: „Защо не мога просто да спра?"
          </p>
        </div>
      </div>
    </section>
  );
};

export default PainMirrorSection;
