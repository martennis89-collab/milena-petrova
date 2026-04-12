import React from 'react';
import Header from '../components/Header';
import QuizHero from '../components/quiz/QuizHero';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="quiz-funnel-page">
      <Header />
      <QuizHero />
      <Footer />
    </div>
  );
};

export default Home;
