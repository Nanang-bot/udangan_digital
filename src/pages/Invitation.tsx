import React, { useState, useEffect } from 'react';
import type { InvitationData } from '../types/invitation';
import Hero from '../sections/Hero';
import BrideGroom from '../sections/BrideGroom';
import Countdown from '../sections/Countdown';
import Story from '../sections/Story';
import Gallery from '../sections/Gallery';
import Gift from '../sections/Gift';
import Comments from '../sections/Comments';
import Welcome from '../sections/Welcome';
import MusicPlayer from '../components/MusicPlayer';
import confetti from 'canvas-confetti';

interface InvitationProps {
  data: InvitationData;
}

const Invitation: React.FC<InvitationProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading for premium feel
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    
    // Confetti effect
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start them a bit higher than random
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-black text-primary p-6">
        <div className="relative w-20 h-20 mb-6">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-primary rounded-full animate-spin"></div>
        </div>
        <p className="font-esthetic text-2xl animate-pulse">Menyiapkan Undangan...</p>
      </div>
    );
  }

  if (!isOpen) {
    return <Welcome data={data} onOpen={handleOpen} />;
  }

  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100 overflow-x-hidden selection:bg-primary/30">
      <MusicPlayer url={data.musicUrl} />
      <main className="max-w-md mx-auto shadow-2xl relative bg-white dark:bg-gray-900 min-h-screen border-x border-gray-100 dark:border-gray-800">
        <Hero data={data} />
        <BrideGroom data={data} />
        <Countdown date={data.weddingDate} />
        <Story stories={data.stories} />
        <Gallery />
        <Gift bankAccounts={data.bankAccounts} />
        <Comments />
        
        <footer className="py-12 text-center bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
          <div className="mb-6 opacity-30 flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-current"></div>
            <div className="font-esthetic text-2xl px-2">J & L</div>
            <div className="h-[1px] w-12 bg-current"></div>
          </div>
          <p className="text-xs font-bold uppercase tracking-widest opacity-40">Created with ❤️ for {data.groom.name} & {data.bride.name}</p>
          <p className="text-[10px] mt-2 opacity-30">© 2026 Digital Invitation Project</p>
        </footer>
      </main>
    </div>
  );
};

export default Invitation;
