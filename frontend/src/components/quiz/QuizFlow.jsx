import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Progress } from '../ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { quizQuestions } from '../../data/quizData';

const QuizFlow = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      const newAnswers = [...answers, selectedAnswer];
      setAnswers(newAnswers);

      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        // Calculate total score
        const totalScore = newAnswers.reduce((sum, ans) => sum + ans.score, 0);
        // Navigate to results with score
        navigate('/results', { state: { totalScore, answers: newAnswers } });
      }
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const previousAnswers = answers.slice(0, -1);
      setAnswers(previousAnswers);
      setSelectedAnswer(previousAnswers[currentQuestion - 1] || null);
    } else {
      navigate('/');
    }
  };

  return (
    <section className="quiz-flow min-h-screen bg-gradient-to-b from-[#F5F1EB] to-white pt-24 pb-20">
      <div className="container px-6 md:px-12 max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[#8C7A6B] font-medium">
              Въпрос {currentQuestion + 1} от {quizQuestions.length}
            </span>
            <span className="text-sm text-[#8C7A6B] font-medium">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="bg-white border-none shadow-xl">
          <CardContent className="p-8 md:p-12">
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#2C2C2C] mb-8 leading-tight">
              {question.question}
            </h2>

            <div className="space-y-4">
              {question.answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(answer)}
                  className={`w-full p-5 rounded-lg border-2 text-left transition-all duration-300 ${
                    selectedAnswer?.value === answer.value
                      ? 'border-[#8C7A6B] bg-[#8C7A6B]/10 shadow-md'
                      : 'border-[#D8CFC4] hover:border-[#BFAE9F] hover:bg-[#F5F1EB]/50'
                  }`}
                >
                  <span className="text-lg text-[#2C2C2C]">{answer.text}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <Button
            onClick={handleBack}
            variant="outline"
            size="lg"
            className="border-[#8C7A6B] text-[#8C7A6B] hover:bg-[#8C7A6B]/10"
          >
            <ArrowLeft className="mr-2 w-5 h-5" />
            Назад
          </Button>

          <Button
            onClick={handleNext}
            disabled={!selectedAnswer}
            size="lg"
            className="bg-[#8C7A6B] hover:bg-[#6F6154] text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestion < quizQuestions.length - 1 ? 'Напред' : 'Виж резултата'}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default QuizFlow;
