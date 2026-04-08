import React, { useState } from 'react';
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';
import type { InvitationData } from '../types/invitation';
import { motion, AnimatePresence } from 'framer-motion';

interface ScheduleProps {
  data: InvitationData;
}

const Schedule: React.FC<ScheduleProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'akad' | 'resepsi'>('akad');

  return (
    <section className="py-20 px-6 bg-white dark:bg-gray-900" id="schedule">
      <div className="text-center mb-12">
        <h2 className="font-esthetic text-5xl text-primary" data-aos="fade-up">Agenda Acara</h2>
      </div>

      {/* Tab Switcher */}
      <div className="flex justify-center mb-10 p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl max-w-xs mx-auto" data-aos="fade-up" data-aos-delay="200">
        <button
          onClick={() => setActiveTab('akad')}
          className={`flex-1 py-3 px-6 rounded-xl text-sm font-black transition-all duration-300 ${
            activeTab === 'akad' 
            ? 'bg-white dark:bg-gray-700 text-primary shadow-sm scale-100' 
            : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
          }`}
        >
          Akad Nikah
        </button>
        <button
          onClick={() => setActiveTab('resepsi')}
          className={`flex-1 py-3 px-6 rounded-xl text-sm font-black transition-all duration-300 ${
            activeTab === 'resepsi' 
            ? 'bg-primary text-white shadow-lg scale-100' 
            : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
          }`}
        >
          Resepsi
        </button>
      </div>

      <div className="max-w-md mx-auto min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === 'akad' ? (
            <motion.div
              key="akad"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="relative p-8 rounded-3xl bg-gray-50 dark:bg-gray-800 border border-primary/10 shadow-xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Calendar className="w-24 h-24 text-primary" />
              </div>
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Hari & Tanggal</p>
                    <p className="font-bold text-gray-800 dark:text-white">{data.akad.date}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Waktu</p>
                    <p className="font-bold text-gray-800 dark:text-white">{data.akad.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Lokasi</p>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-relaxed">
                      {data.akad.location.address}
                    </p>
                  </div>
                </div>

                <a 
                  href={data.akad.location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full flex items-center justify-center gap-2 bg-primary text-white px-6 py-4 rounded-2xl font-bold text-sm shadow-lg hover:shadow-xl transition-all transform active:scale-95"
                >
                  <ExternalLink className="w-4 h-4" />
                  Buka Google Maps
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="resepsi"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="relative p-8 rounded-3xl bg-primary text-white shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Calendar className="w-24 h-24" />
              </div>
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Hari & Tanggal</p>
                    <p className="font-bold">{data.resepsi.date}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Waktu</p>
                    <p className="font-bold">{data.resepsi.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Lokasi</p>
                    <p className="text-sm font-medium leading-relaxed">
                      {data.resepsi.location.address}
                    </p>
                  </div>
                </div>

                <a 
                  href={data.resepsi.location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full flex items-center justify-center gap-2 bg-white text-primary px-6 py-4 rounded-2xl font-bold text-sm shadow-lg hover:shadow-xl transition-all transform active:scale-95"
                >
                  <ExternalLink className="w-4 h-4" />
                  Buka Google Maps
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Schedule;
