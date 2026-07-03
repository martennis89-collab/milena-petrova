import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeBlock = ({ value, label }) => (
    <div className="bg-white/80 backdrop-blur-sm border-2 border-[#D4758C]/30 rounded-xl p-3 text-center min-w-[70px] shadow-md">
      <div className="text-3xl font-bold bg-gradient-to-r from-[#B85C7A] to-[#D4758C] bg-clip-text text-transparent">{String(value).padStart(2, '0')}</div>
      <div className="text-xs text-[#9B7680] font-semibold uppercase mt-1">{label}</div>
    </div>
  );

  return (
    <div className="flex gap-3 flex-wrap">
      <TimeBlock value={timeLeft.days} label="Дни" />
      <TimeBlock value={timeLeft.hours} label="Часа" />
      <TimeBlock value={timeLeft.minutes} label="Минути" />
      <TimeBlock value={timeLeft.seconds} label="Секунди" />
    </div>
  );
};

export default CountdownTimer;
