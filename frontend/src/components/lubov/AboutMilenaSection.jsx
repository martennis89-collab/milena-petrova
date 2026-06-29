import React from 'react';
import CheckoutCTA from './CheckoutCTA';
import LUBOV_BEZ_BOLKA_CONFIG from '../../config/lubovBezBolka';

const AboutMilenaSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <h2 className="text-3xl md:text-4xl font-serif text-[#2C3E50] text-center mb-12">
          Тя не говори за това от теория. Говори като жена, която е била там.
        </h2>
        
        <div className="grid md:grid-cols-5 gap-12 items-start">
          
          {/* Left: Milena portrait */}
          <div className="md:col-span-2">
            <div className="sticky top-8">
              <img 
                src={LUBOV_BEZ_BOLKA_CONFIG.MILENA_PHOTO}
                alt="Милена Петрова"
                className="w-full rounded-2xl shadow-xl"
              />
              <div className="mt-6 text-center">
                <h3 className="text-xl font-serif text-[#2C3E50] mb-1">
                  Милена Петрова
                </h3>
                <p className="text-sm text-[#8C7A6B]">
                  Коуч и ментор за лични трансформации
                </p>
              </div>
            </div>
          </div>
          
          {/* Right: Story */}
          <div className="md:col-span-3 space-y-6 text-[#4A4A4A] leading-relaxed text-lg">
            
            <p>
              Милена Петрова познава отвътре модела, в който една жена дава повече, отколкото получава. Чака. Надява се. Оправдава. Вярва, че ако обича достатъчно, ако търпи още малко, ако бъде още по-добра — един ден ще бъде избрана.
            </p>
            
            <p>
              В живота си тя е преминала през ранна отговорност, млад брак, майчинство, труден развод, голяма промяна и продължителна болезнена връзка, в която постепенно е започнала да губи усещането за себе си.
            </p>
            
            <p>
              Дълго време е вярвала, че остава заради любовта. По-късно е разбрала, че често я е държала надеждата.
            </p>
            
            <div className="bg-[#F5F1EB] rounded-xl p-6 my-8">
              <p className="italic">
                Надеждата, че човекът срещу нея ще се промени. Надеждата, че следващия път ще бъде различно. Надеждата, че ако даде още малко от себе си, най-накрая ще получи любовта, която чака.
              </p>
            </div>
            
            <p>
              Но най-големият обрат не идва, когато една връзка приключи. Истинският обрат идва, когато жената започне да вижда модела.
            </p>
            
            <p>
              Милена осъзнава, че болезнените отношения не се повтарят само защото срещаме „неправилните" хора. Понякога се повтарят, защото сме научили да бъркаме познатото с любов. Да заслужаваме. Да спасяваме. Да чакаме. Да се съмняваме първо в себе си. Да се страхуваме да поставим граница.
            </p>
            
            <p className="font-medium text-[#2C3E50]">
              От този личен път започва и професионалната ѝ мисия.
            </p>
            
            <p>
              Днес Милена работи с жени, които са уморени да губят себе си в отношенията. Жени, които искат да разберат защо се връщат към болката, защо им е трудно да изберат себе си и как да започнат да изграждат по-здрав вътрешен стандарт за любов.
            </p>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <p className="text-sm text-[#8C7A6B] mb-2 font-medium">Квалификации</p>
              <p className="text-base">
                Милена съчетава личния си път с обучения и практика в личностно развитие, коучинг, НЛП, системни констелации и енергийни методи.
              </p>
            </div>
            
            <div className="bg-[#F5F1EB] rounded-xl p-6 border-l-4 border-[#8C7A6B]">
              <p className="italic">
                „Любов без болка" е създадена не като теория, а като път — към повече яснота, граници и връщане към себе си.
              </p>
            </div>
            
            <div className="pt-6">
              <CheckoutCTA location="about_milena" />
            </div>
            
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default AboutMilenaSection;
