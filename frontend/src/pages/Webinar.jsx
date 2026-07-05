import React from 'react';
import { Helmet } from 'react-helmet';
import WebinarHero from '../components/webinar/WebinarHero';
import ForWhoSection from '../components/webinar/ForWhoSection';
import WebinarTakeaways from '../components/webinar/WebinarTakeaways';
import TransformationSection from '../components/webinar/TransformationSection';
import AboutHost from '../components/webinar/AboutHost';
import FinalCTA from '../components/webinar/FinalCTA';
import RegistrationForm from '../components/webinar/RegistrationForm';

const Webinar = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Helmet>
        <title>Безплатен Уебинар: Защо попадаме в отношения които ни нараняват | Милена Петрова</title>
        <meta name="description" content="Присъединете се към безплатния уебинар на 16 Юли 2026 в 20:00ч. Научете защо най-важният въпрос не е 'Защо той се държи така?', а 'Какво ме задържа?' Само 11 места остават!" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Безплатен Уебинар: Защо попадаме в отношения които ни нараняват" />
        <meta property="og:description" content="16 Юли 2026, 20:00ч. Научете невидимите модели, които ви връщат към едни и същи избори. Само 11 места остават!" />
        <meta property="og:image" content="https://customer-assets.emergentagent.com/job_guided-sessions-2/artifacts/z6q4f8xp_00BBF565-6315-4EAC-864A-B5832736105D.jpeg" />
        <meta property="og:url" content="https://milenapetrova.bg/webinar" />
      </Helmet>
      
      <WebinarHero />
      <ForWhoSection />
      <WebinarTakeaways />
      <TransformationSection />
      <AboutHost />
      
      {/* Final Registration Section with countdown reminder */}
      <section className="py-16 bg-gradient-to-br from-[#FFF5F7] via-[#FFE8ED] to-[#FFD4DC]">
        <div className="container max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4758C]"></div>
              <span className="text-3xl">🌸</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4758C]"></div>
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl sm:text-3xl bg-gradient-to-r from-[#B85C7A] to-[#D4758C] bg-clip-text text-transparent font-bold mb-3">
              Готова ли си да видиш модела ясно?
            </h3>
            <p className="text-[#7A5662] font-medium mb-2">Запази своето безплатно място за уебинара на 16 юли от 20:00 ч.</p>
          </div>
          <RegistrationForm />
        </div>
      </section>
    </div>
  );
};

export default Webinar;
