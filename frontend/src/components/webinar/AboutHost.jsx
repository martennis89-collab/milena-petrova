import React from 'react';

const AboutHost = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#F5F1EB] to-white">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-[#BFAE9F] rounded-3xl opacity-20 z-0" />
            <img
              src="https://customer-assets.emergentagent.com/job_guided-sessions-2/artifacts/z6q4f8xp_00BBF565-6315-4EAC-864A-B5832736105D.jpeg"
              alt="Милена Петрова"
              className="relative z-10 rounded-3xl shadow-xl w-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#8C7A6B] mb-3">Вашият водач</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl sm:text-4xl text-[#2C3E50] mb-4">
                Милена Петрова
              </h2>
            </div>

            <p className="text-lg text-[#4A4A4A] leading-relaxed">
              Коуч и ментор за лична трансформация, специализирана в работа с жени, които искат да излязат от болезнени отношения и да изградят здрави връзки.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#8C7A6B] rounded-full flex items-center justify-center text-white font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold text-[#2C3E50] mb-1">Дългогодишен опит</h4>
                  <p className="text-[#8C7A6B] text-sm">Работа с хиляди жени, които са преминали през болезнени връзки и са намерили своя път към здравето.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#8C7A6B] rounded-full flex items-center justify-center text-white font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold text-[#2C3E50] mb-1">Разбиране от първа ръка</h4>
                  <p className="text-[#8C7A6B] text-sm">Милена е преминала през собствената си трансформация и знае точно какво означава да се чувстваш заседнала.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#8C7A6B] rounded-full flex items-center justify-center text-white font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold text-[#2C3E50] mb-1">Практичен подход</h4>
                  <p className="text-[#8C7A6B] text-sm">Без теория без приложение. Всичко, което ще научите, можете да приложите веднага.</p>
                </div>
              </div>
            </div>

            <blockquote className="border-l-4 border-[#8C7A6B] pl-6 py-2 italic text-[#4A4A4A]">
              "Променихме начина, по който се отнасяме към себе си, променяме и начина, по който другите се отнасят към нас."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHost;
