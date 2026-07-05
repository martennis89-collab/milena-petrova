import React from 'react';

const AboutHost = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#FFF5F7] to-white relative overflow-hidden">
      {/* Floral accent */}
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-[#FFD4DC] rounded-full blur-3xl opacity-15"></div>
      
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-[#E89AAC] rounded-3xl opacity-20 z-0" />
            <img
              src="https://customer-assets.emergentagent.com/job_guided-sessions-2/artifacts/z6q4f8xp_00BBF565-6315-4EAC-864A-B5832736105D.jpeg"
              alt="Милена Петрова"
              className="relative z-10 rounded-3xl shadow-2xl w-full object-cover border-4 border-white"
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#D4758C] mb-3">Вашият водещ</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl sm:text-4xl bg-gradient-to-r from-[#B85C7A] to-[#D4758C] bg-clip-text text-transparent mb-4 font-bold">
                Милена Петрова
              </h2>
            </div>

            <p className="text-lg text-[#7A5662] leading-relaxed">
              Коуч и ментор за лична трансформация, специализирана в работа с жени, които искат да излязат от болезнени отношения и да изградят по-здрави връзки със себе си и с другите.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#D4758C] to-[#B85C7A] rounded-full flex items-center justify-center text-white font-bold shadow-md">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-[#7A5662] mb-1">Дългогодишен опит</h4>
                  <p className="text-[#9B7680] text-sm">Работа с хиляди жени, които са преминали през болезнени връзки и са намерили своя път към здравето.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#D4758C] to-[#B85C7A] rounded-full flex items-center justify-center text-white font-bold shadow-md">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-[#7A5662] mb-1">Разбиране от първа ръка</h4>
                  <p className="text-[#9B7680] text-sm">Милена е преминала през собствената си трансформация и знае точно какво означава да се чувстваш заседнала.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#D4758C] to-[#B85C7A] rounded-full flex items-center justify-center text-white font-bold shadow-md">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-[#7A5662] mb-1">Практичен подход</h4>
                  <p className="text-[#9B7680] text-sm">Без теория без приложение. Всичко, което ще научите, можете да приложите веднага.</p>
                </div>
              </div>
            </div>

            <blockquote className="border-l-4 border-[#D4758C] pl-6 py-2 italic text-[#7A5662] bg-white/50 rounded-r-lg">
              "Когато променим начина, по който се отнасяме към себе си, започваме да променяме и начина, по който другите се отнасят към нас."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHost;
