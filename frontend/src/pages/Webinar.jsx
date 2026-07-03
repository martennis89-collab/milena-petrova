import React from 'react';
import { Helmet } from 'react-helmet';
import WebinarHero from '../components/webinar/WebinarHero';
import WebinarTakeaways from '../components/webinar/WebinarTakeaways';
import AboutHost from '../components/webinar/AboutHost';
import WebinarFAQ from '../components/webinar/WebinarFAQ';
import FinalCTA from '../components/webinar/FinalCTA';

const Webinar = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Helmet>
        <title>Безплатен Уебинар: Защо попадаме в отношения които ни нараняват | Милена Петрова</title>
        <meta name="description" content="Присъединете се към безплатния уебинар на 16 Юли в 20:00ч. Научете защо най-важният въпрос не е 'Защо той се държи така?', а 'Какво ме задържа?' Само 11 места остават!" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Безплатен Уебинар: Защо попадаме в отношения които ни нараняват" />
        <meta property="og:description" content="16 Юли, 20:00ч. Научете невидимите модели, които ви връщат към едни и същи избори. Само 11 места остават!" />
        <meta property="og:image" content="https://customer-assets.emergentagent.com/job_guided-sessions-2/artifacts/z6q4f8xp_00BBF565-6315-4EAC-864A-B5832736105D.jpeg" />
        <meta property="og:url" content="https://milenapetrova.bg/webinar" />
      </Helmet>
      
      <WebinarHero />
      <WebinarTakeaways />
      <AboutHost />
      <WebinarFAQ />
      <FinalCTA />
    </div>
  );
};

export default Webinar;
