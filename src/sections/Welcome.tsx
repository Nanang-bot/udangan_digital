import React from 'react';
import { MailOpen } from 'lucide-react';
import type { InvitationData } from '../types/invitation';

interface WelcomeProps {
  data: InvitationData;
  onOpen: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ data, onOpen }) => {
  return (
    <div className="fixed inset-0 z-[1056] flex flex-col items-center justify-center bg-white-black text-center p-6 bg-cover bg-center overflow-y-auto" style={{ backgroundImage: "url('assets/images/bg.webp')", backgroundBlendMode: 'overlay' }}>
      <div className="max-w-md w-full animate-fade-in">
        <h2 className="font-esthetic text-5xl mb-6 text-primary drop-shadow-sm">The Wedding Of</h2>
        
        <div className="relative mb-8 mx-auto w-48 h-48 rounded-full border-4 border-white shadow-2xl overflow-hidden ring-4 ring-primary/20">
          <img 
            src="assets/images/bg.webp" 
            alt="Wedding Cover" 
            className="w-full h-full object-cover animate-scale-subtle"
          />
        </div>

        <h1 className="font-esthetic text-6xl mb-4 text-primary">{data.groom.name.split(' ')[0]} & {data.bride.name.split(' ')[0]}</h1>
        
        <div className="mb-8 space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-white/70 font-medium">Kepada Yth. Bapak/Ibu/Saudara/i</span>
          <p className="text-2xl font-bold text-white drop-shadow-md">Tamu Undangan</p>
        </div>

        <button 
          onClick={onOpen}
          className="group relative inline-flex items-center gap-3 bg-primary text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 transform active:scale-95"
        >
          <MailOpen className="w-5 h-5 group-hover:animate-bounce" />
          <span>Open Invitation</span>
        </button>
      </div>
    </div>
  );
};

export default Welcome;
