import React, { useState, useEffect } from 'react';

interface CountdownProps {
  date: string;
}

const Countdown: React.FC<CountdownProps> = ({ date }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(date).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center bg-white/10 backdrop-blur-md rounded-2xl p-4 min-w-[70px] shadow-lg border border-white/20">
      <span className="text-2xl font-bold text-primary">{String(value).padStart(2, '0')}</span>
      <span className="text-[10px] uppercase tracking-widest opacity-60 font-medium">{label}</span>
    </div>
  );

  return (
    <section className="py-16 px-6 text-center bg-gray-50 dark:bg-gray-800" id="wedding-date">
      <h2 className="font-esthetic text-4xl mb-8" data-aos="fade-up">Momen Bahagia</h2>
      <div className="flex justify-center gap-4" data-aos="fade-up" data-aos-delay="200">
        <TimeBox value={timeLeft.days} label="Hari" />
        <TimeBox value={timeLeft.hours} label="Jam" />
        <TimeBox value={timeLeft.minutes} label="Menit" />
        <TimeBox value={timeLeft.seconds} label="Detik" />
      </div>
    </section>
  );
};

export default Countdown;
