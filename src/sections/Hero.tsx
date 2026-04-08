import React from 'react';
import { Calendar, MousePointer2 } from 'lucide-react';
import type { InvitationData } from '../types/invitation';

interface HeroProps {
  data: InvitationData;
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center p-0 m-0 overflow-hidden">
      {/* Background with parallax effect simulation */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/images/bg.webp" 
          alt="Wedding Hero" 
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white dark:via-black/50 dark:to-black"></div>
      </div>

      <div className="relative z-10 text-center px-6">
        <h1 className="font-esthetic text-4xl pt-10 pb-4 fw-medium text-primary" data-aos="fade-down" data-aos-duration="1500">
          Undangan Pernikahan
        </h1>

        <div className="relative my-8 mx-auto" data-aos="zoom-in" data-aos-duration="1500">
          <div className="absolute inset-0 animate-ping rounded-full bg-primary/20 scale-110"></div>
          <img 
            src="/assets/images/bg.webp" 
            alt="Couple" 
            className="w-52 h-52 object-cover rounded-full border-4 border-white shadow-2xl relative z-10 mx-auto"
          />
        </div>

        <h2 className="font-esthetic text-5xl my-6 text-gray-800 dark:text-white" data-aos="fade-up" data-aos-duration="1500">
          {data.groom.name.split(' ')[0]} & {data.bride.name.split(' ')[0]}
        </h2>
        
        <p className="my-2 text-xl tracking-wide opacity-80" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="200">
          {data.akad.date}
        </p>

        <button className="mt-8 flex items-center gap-2 mx-auto btn btn-outline-auto border-2 border-primary/40 hover:bg-primary hover:text-white hover:border-primary px-6 py-2 rounded-full transition-all duration-300 shadow-md transform hover:scale-105" data-aos="fade-up" data-aos-delay="400">
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-semibold">Save to Google Calendar</span>
        </button>

        <div className="mt-16 animate-bounce opacity-40 flex flex-col items-center gap-2">
          <MousePointer2 className="w-6 h-6 rotate-180" />
          <p className="text-[10px] uppercase tracking-widest font-bold">Scroll Down</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
