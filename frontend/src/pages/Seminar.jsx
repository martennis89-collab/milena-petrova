import React from 'react';
import { Helmet } from 'react-helmet';
import {
  FaMapPin,
  FaRegCalendarAlt,
  FaRegClock,
  FaMapMarkerAlt,
  FaEuroSign,
  FaUsers,
  FaFacebookMessenger,
} from 'react-icons/fa';

// Live seminar landing page — faithful rebuild of milenapetrova.bg/seminar
// Calm cream / taupe palette, Playfair Display headings, Manrope body.

const SERIF = { fontFamily: "'Playfair Display', serif" };

const MESSENGER_URL = 'https://m.me/tihoprostranstvo';

const SEMINAR = {
  date: '17 октомври',
  year: '2026 г.',
  timeStart: '10:30',
  timeEnd: 'до 12:30 ч.',
  city: 'гр. Ямбол',
  venue: 'Diana Palace',
  price: '10',
  currency: 'EUR',
};

const InfoCard = ({ icon: Icon, label, value, sub, highlight }) => (
  <div
    className={
      'rounded-3xl p-6 sm:p-7 flex flex-col items-center text-center shadow-sm ' +
      (highlight
        ? 'bg-[#6B5D4F] text-white shadow-lg'
        : 'bg-white text-[#2C3E50] border border-[#E7E0D4]')
    }
  >
    <div
      className={
        'w-14 h-14 rounded-full flex items-center justify-center mb-4 ' +
        (highlight ? 'bg-white/15' : 'bg-[#8C7A6B]')
      }
    >
      <Icon className="w-6 h-6 text-white" />
    </div>
    <span
      className={
        'text-xs font-semibold uppercase tracking-widest mb-2 ' +
        (highlight ? 'text-white/70' : 'text-[#A89A88]')
      }
    >
      {label}
    </span>
    <span style={SERIF} className="text-2xl sm:text-[28px] font-bold leading-tight">
      {value}
    </span>
    {sub && (
      <span className={'text-sm mt-1 ' + (highlight ? 'text-white/80' : 'text-[#8C7A6B]')}>
        {sub}
      </span>
    )}
  </div>
);

const Seminar = () => {
  return (
    <div className="min-h-screen bg-[#F5F2EC] font-sans text-[#2C3E50]">
      <Helmet>
        <title>Семинар на живо - Защо попадаме в отношения, които ни нараняват? | Милена Петрова</title>
        <meta
          name="description"
          content="Двучасов семинар на живо на 17 октомври 2026 в Ямбол (Diana Palace). Защо попадаме в повтарящи се модели във връзките, защо оставаме и как започва промяната. Местата са ограничени."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Милена Петрова" />
        <meta property="og:title" content="Семинар на живо: Защо попадаме в отношения, които ни нараняват?" />
        <meta
          property="og:description"
          content="Двучасов семинар на живо, 17 октомври 2026, гр. Ямбол — Diana Palace. Местата са ограничени."
        />
        <meta property="og:image" content="https://milenapetrova.bg/assets/milena.jpg" />
        <meta property="og:url" content="https://milenapetrova.bg/seminar" />
      </Helmet>

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Background: hero image if present, warm gradient fallback underneath */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(58,48,38,0.35) 0%, rgba(58,48,38,0.45) 60%, rgba(245,242,236,0.95) 100%), url('/assets/seminar-hero.jpg')",
            backgroundColor: '#C9B79C',
          }}
        />
        <div className="relative z-10 container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm px-6 py-2 rounded-full shadow-sm mb-8">
            <FaMapPin className="w-4 h-4 text-[#D46A8C]" />
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#8C7A6B]">
              Семинар на живо
            </span>
          </div>
          <h1
            style={SERIF}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight max-w-3xl mx-auto drop-shadow-sm"
          >
            Защо попадаме в отношения, които ни нараняват?
          </h1>
        </div>
      </section>

      {/* INTRO + DETAILS */}
      <section className="relative z-10 -mt-6">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-lg sm:text-xl text-[#6B6155] max-w-3xl mx-auto leading-relaxed mb-10">
            Двучасов семинар на живо за повтарящите се модели в отношенията – защо попадаме в тях,
            защо оставаме и как започва промяната.
          </p>

          {/* Detail cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <InfoCard icon={FaRegCalendarAlt} label="Дата" value={SEMINAR.date} sub={SEMINAR.year} />
            <InfoCard icon={FaRegClock} label="Час" value={SEMINAR.timeStart} sub={SEMINAR.timeEnd} />
            <InfoCard icon={FaMapMarkerAlt} label="Локация" value={SEMINAR.city} sub={SEMINAR.venue} />
            <InfoCard icon={FaEuroSign} label="Такса" value={SEMINAR.price} sub={SEMINAR.currency} highlight />
          </div>

          {/* Limited seats banner */}
          <div className="mt-6 bg-white border border-[#E7E0D4] rounded-3xl px-6 py-6 shadow-sm max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-full bg-[#8C7A6B] flex items-center justify-center shrink-0">
                <FaUsers className="w-4 h-4 text-white" />
              </div>
              <p style={SERIF} className="text-lg font-bold text-[#2C3E50]">
                Местата са ограничени
              </p>
            </div>
            <p className="text-sm text-[#8C7A6B]">Запазете си място сега за да не пропуснете</p>
          </div>
        </div>
      </section>

      {/* HOST + BOOKING */}
      <section className="py-16 sm:py-20">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Host card */}
            <div className="bg-white border border-[#E7E0D4] rounded-3xl p-8 sm:p-10 shadow-sm text-center flex flex-col items-center justify-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#A89A88] mb-3">
                Водещ
              </span>
              <h2 style={SERIF} className="text-3xl sm:text-4xl font-bold text-[#2C3E50] mb-5">
                Милена Петрова
              </h2>
              <div className="flex flex-wrap justify-center gap-2">
                {['Констелатор', 'Коуч', 'НЛП практик', 'Треньор личностно развитие'].map((role) => (
                  <span
                    key={role}
                    className="text-sm text-[#6B6155] bg-[#F5F2EC] border border-[#E7E0D4] rounded-full px-4 py-1.5"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            {/* Booking card */}
            <div className="bg-white border border-[#E7E0D4] rounded-3xl p-8 sm:p-10 shadow-sm text-center flex flex-col items-center justify-center">
              <h2 style={SERIF} className="text-3xl sm:text-4xl font-bold text-[#2C3E50] mb-4">
                Запази своето място
              </h2>
              <p className="text-[#6B6155] leading-relaxed mb-6 max-w-sm">
                За да запазите своето място, пишете ми на лично съобщение. Ще получите информация за
                плащането и потвърждение на участието.
              </p>
              <a
                href={MESSENGER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#6B5D4F] hover:bg-[#5A4E42] text-white font-semibold text-base sm:text-lg py-4 px-8 rounded-full transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg shadow-md"
              >
                <FaFacebookMessenger className="w-5 h-5" />
                Пиши ми за записване
              </a>
              <p className="text-xs text-[#A89A88] mt-4 max-w-xs">
                Отговарям бързо на всички съобщения и ще Ви изпратя детайлите за плащането
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / boundary note — consistent with the rest of the site */}
      <footer className="pb-12 text-center">
        <p className="text-xs text-[#A89A88] max-w-md mx-auto px-4">
          Сесиите и семинарите не заместват медицинска или психотерапевтична помощ.
        </p>
      </footer>
    </div>
  );
};

export default Seminar;
