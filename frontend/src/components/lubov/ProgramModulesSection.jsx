import React, { useState } from 'react';
import { FaChevronDown, FaCheckCircle } from 'react-icons/fa';
import { trackEvent } from '../../utils/tracking';

const ModuleCard = ({ module, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpand = () => {
    if (!isExpanded) {
      trackEvent('module_card_click', { module: module.title, index });
    }
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
      <button
        onClick={toggleExpand}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-[#F5F1EB]/30 transition-colors"
      >
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <span className="text-sm font-medium text-[#8C7A6B] bg-[#8C7A6B]/10 px-3 py-1 rounded-full">
              {module.label}
            </span>
          </div>
          <h3 className="text-xl font-serif text-[#2C3E50]">
            {module.title}
          </h3>
        </div>
        <FaChevronDown 
          className={`w-6 h-6 text-[#8C7A6B] flex-shrink-0 ml-4 transition-transform duration-200 ${isExpanded ? 'transform rotate-180' : ''}`}
        />
      </button>
      
      <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[800px]' : 'max-h-0'}`}>
        <div className="p-6 pt-0 border-t border-gray-100">
          <p className="text-[#4A4A4A] leading-relaxed mb-6">
            {module.description}
          </p>
          
          <div className="space-y-3 mb-6">
            {module.bullets.map((bullet, idx) => (
              <div key={idx} className="flex items-start">
                <FaCheckCircle className="w-5 h-5 text-[#8C7A6B] flex-shrink-0 mt-0.5" />
                <p className="ml-3 text-[#4A4A4A]">{bullet}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-[#F5F1EB] rounded-xl p-4">
            <p className="text-sm font-medium text-[#2C3E50]">
              {module.outcome}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProgramModulesSection = () => {
  const modules = [
    {
      label: 'Модул 1',
      title: 'Как работи токсичната връзка',
      description: 'В този модул ще започнеш да разбираш защо връзката може да бъде болезнена, но въпреки това трудно да се пусне.',
      bullets: [
        'как да разпознаеш токсичната динамика',
        'защо се повтаря цикълът болка → радост → надежда → разочарование',
        'защо понякога оправдаваш поведение, което те наранява',
        'каква е разликата между любов и емоционална зависимост',
      ],
      outcome: 'Целта на този модул е да спреш да гледаш само отделните ситуации и да започнеш да виждаш модела.',
    },
    {
      label: 'Модул 2',
      title: 'Защо избираш познатото',
      description: 'В този модул ще разгледаш защо болезнената любов може да изглежда толкова позната.',
      bullets: [
        'защо понякога болката се усеща като „нормална"',
        'защо любовта не трябва да се заслужава',
        'защо се привързваш към потенциала на другия човек',
        'как старите вътрешни модели влияят на избора ти днес',
      ],
      outcome: 'Този модул ти помага да видиш защо не винаги избираш това, което е добро за теб — а това, което ти е познато.',
    },
    {
      label: 'Модул 3',
      title: 'Когато изгубиш себе си във връзката',
      description: 'Тук започва най-дълбоката част от процеса: връщането към себе си.',
      bullets: [
        'защо продължаваш да казваш „да", когато вътре в теб има „не"',
        'как изглеждат здравите граници',
        'защо се връщаш, дори когато знаеш, че боли',
        'как да спреш да се изоставяш',
        'как постепенно да върнеш връзката със себе си',
      ],
      outcome: 'Този модул е за моментите, в които осъзнаваш, че не си изгубила само спокойствието си — изгубила си части от себе си.',
    },
    {
      label: 'Модул 4',
      title: 'Новият модел на любовта',
      description: 'В този модул започваш да изграждаш нов вътрешен стандарт.',
      bullets: [
        'как изглежда любовта, когато не трябва да се бориш за нея',
        'защо започваш да избираш различно',
        'как да отпуснеш натиска да бъдеш избрана на всяка цена',
        'как да обобщиш наученото и да го превърнеш в нова посока',
      ],
      outcome: 'Това е модулът, в който започваш да виждаш, че любовта не трябва да бъде постоянна битка.',
    },
  ];
  
  const bonusModule = {
    label: 'Бонус модул',
    title: 'Водени практики за връщане към себе си',
    description: 'Към програмата получаваш бонус модул с водени практики, създадени да ти помогнат да се свържеш отново със себе си, да върнеш енергията си към теб и да започнеш да усещаш повече вътрешна стабилност.',
    bullets: [
      'Среща с новата версия на себе си',
      'Връщане на енергията към себе си',
      'Балансиране на мъжката и женската енергия',
    ],
    outcome: 'Практики за вътрешна стабилност и връзка със себе си.',
  };
  
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-serif text-[#2C3E50] text-center mb-4">
          Какво има в програмата?
        </h2>
        
        <p className="text-lg text-[#4A4A4A] text-center max-w-3xl mx-auto mb-12">
          4 основни модула, бонус модул и работна тетрадка, които те водят стъпка по стъпка през процеса.
        </p>
        
        <div className="space-y-4 mb-6">
          {modules.map((module, index) => (
            <ModuleCard key={index} module={module} index={index} />
          ))}
        </div>
        
        <div className="mt-6">
          <ModuleCard module={bonusModule} index={4} />
        </div>
      </div>
    </section>
  );
};

export default ProgramModulesSection;
