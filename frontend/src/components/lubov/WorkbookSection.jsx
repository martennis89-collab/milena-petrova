import React from 'react';
import { CheckCircle } from 'lucide-react';

const WorkbookSection = () => {
  const workbookUses = [
    'своите осъзнавания',
    'повтарящите се модели',
    'въпросите, които избягваш',
    'границите, които искаш да върнеш',
    'новите избори, които искаш да започнеш да правиш',
  ];
  
  return (
    <section className="py-20 bg-gradient-to-b from-[#F5F1EB] to-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left: Workbook mockup */}
          <div className="order-2 md:order-1">
            <div className="relative">
              {/* Elegant workbook mockup placeholder */}
              <div className="bg-gradient-to-br from-[#E8D5C4] to-[#C9B8A8] rounded-2xl shadow-2xl p-8 aspect-[3/4] flex flex-col items-center justify-center">
                <div className="text-center">
                  {/* Lotus icon representation */}
                  <div className="w-16 h-16 mx-auto mb-6 opacity-40">
                    <svg viewBox="0 0 100 100" className="text-[#8C7A6B]">
                      <circle cx="50" cy="70" r="8" fill="currentColor" />
                      <path d="M50 70 Q30 50 30 30 Q30 20 50 20 Q70 20 70 30 Q70 50 50 70" fill="none" stroke="currentColor" strokeWidth="2" />
                      <path d="M50 70 Q35 55 35 35" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M50 70 Q65 55 65 35" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-serif text-[#8C7A6B] mb-2">
                    Любов без болка
                  </h3>
                  <p className="text-sm text-[#8C7A6B]/70 tracking-widest uppercase">
                    Работна тетрадка
                  </p>
                </div>
              </div>
              
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#BFAE9F] rounded-full opacity-20 blur-2xl"></div>
            </div>
          </div>
          
          {/* Right: Copy */}
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-serif text-[#2C3E50] mb-6">
              Работната тетрадка превръща програмата в личен процес.
            </h2>
            
            <p className="text-lg text-[#4A4A4A] leading-relaxed mb-8">
              Видеата ти дават яснота. Работната тетрадка ти помага да я приложиш към твоята история.
            </p>
            
            <p className="text-lg font-medium text-[#2C3E50] mb-4">
              В нея можеш да записваш:
            </p>
            
            <div className="space-y-3 mb-8">
              {workbookUses.map((use, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#8C7A6B] flex-shrink-0 mt-0.5" />
                  <p className="ml-3 text-[#4A4A4A]">{use}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <p className="text-[#4A4A4A] leading-relaxed italic">
                Така програмата не остава просто информация. Тя се превръща в личен процес.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default WorkbookSection;
