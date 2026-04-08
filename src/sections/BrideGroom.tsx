import React from 'react';
import { Heart } from 'lucide-react';
import type { InvitationData } from '../types/invitation';

interface BrideGroomProps {
  data: InvitationData;
}

const BrideGroom: React.FC<BrideGroomProps> = ({ data }) => {
  return (
    <section className="py-20 px-6 bg-white dark:bg-gray-900 overflow-hidden" id="bride">
      <div className="text-center mb-16">
        <h2 className="font-arabic text-3xl mb-6 text-gray-800 dark:text-gray-100" data-aos="fade-up">
          بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
        </h2>
        <h2 className="font-esthetic text-4xl mb-6 text-primary" data-aos="fade-up" data-aos-delay="200">
          Assalamualaikum Warahmatullahi Wabarakatuh
        </h2>
        <p className="max-w-xs mx-auto text-sm opacity-70 leading-relaxed" data-aos="fade-up" data-aos-delay="400">
          Tanpa mengurangi rasa hormat, kami mengundang Anda untuk berkenan menghadiri acara pernikahan kami:
        </p>
      </div>

      <div className="flex flex-col gap-16 items-center">
        {/* Groom Card */}
        <div className="text-center group" data-aos="fade-right" data-aos-duration="1200">
          <div className="relative mb-6 mx-auto w-44 h-44">
            <div className="absolute inset-0 bg-primary/10 rounded-full scale-110 group-hover:scale-125 transition-transform duration-500"></div>
            <img 
              src="/assets/images/cowo.webp" 
              alt={data.groom.name} 
              className="w-full h-full object-cover rounded-full border-4 border-white shadow-xl relative z-10 grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <h3 className="font-esthetic text-3xl mb-3 text-secondary">{data.groom.name}</h3>
          <p className="text-lg font-medium mb-2">{data.groom.order}</p>
          <div className="text-sm opacity-60">
            <p className="mb-1">Putra Tercinta dari:</p>
            <p className="font-bold">{data.groom.parents.father}</p>
            <p>&</p>
            <p className="font-bold">{data.groom.parents.mother}</p>
          </div>
        </div>

        {/* Separator Heart */}
        <div className="flex items-center gap-4 text-primary opacity-20" data-aos="zoom-in">
          <div className="h-[1px] w-12 bg-current"></div>
          <Heart className="w-8 h-8 fill-current animate-pulse" />
          <div className="h-[1px] w-12 bg-current"></div>
        </div>

        {/* Bride Card */}
        <div className="text-center group" data-aos="fade-left" data-aos-duration="1200">
          <div className="relative mb-6 mx-auto w-44 h-44">
            <div className="absolute inset-0 bg-primary/10 rounded-full scale-110 group-hover:scale-125 transition-transform duration-500"></div>
            <img 
              src="/assets/images/cewe.webp" 
              alt={data.bride.name} 
              className="w-full h-full object-cover rounded-full border-4 border-white shadow-xl relative z-10 grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <h3 className="font-esthetic text-3xl mb-3 text-secondary">{data.bride.name}</h3>
          <p className="text-lg font-medium mb-2">{data.bride.order}</p>
          <div className="text-sm opacity-60">
            <p className="mb-1">Putri Tercinta dari:</p>
            <p className="font-bold">{data.bride.parents.father}</p>
            <p>&</p>
            <p className="font-bold">{data.bride.parents.mother}</p>
          </div>
        </div>
      </div>

      <div className="mt-20 text-center" data-aos="fade-up">
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm italic text-sm text-gray-600 dark:text-gray-400">
          "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
          <p className="mt-4 font-bold not-italic font-josefin">— QS. Ar-Rum: 21</p>
        </div>
      </div>
    </section>
  );
};

export default BrideGroom;
