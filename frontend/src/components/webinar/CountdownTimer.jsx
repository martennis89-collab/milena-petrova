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
    <div className="bg-[#F5F1EB] rounded-lg p-3 text-center min-w-[70px]">
      <div className="text-3xl font-bold text-[#2C3E50]">{String(value).padStart(2, '0')}</div>
      <div className="text-xs text-[#8C7A6B] font-medium uppercase mt-1">{label}</div>
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
