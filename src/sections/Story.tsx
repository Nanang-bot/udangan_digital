import React from 'react';
import type { StoryEvent } from '../types/invitation';

interface StoryProps {
  stories: StoryEvent[];
}

const Story: React.FC<StoryProps> = ({ stories }) => {
  return (
    <section className="py-20 px-6 bg-gray-50 dark:bg-gray-800 overflow-hidden" id="story">
      <div className="text-center mb-16">
        <h2 className="font-esthetic text-5xl text-primary" data-aos="fade-up">Kisah Cinta</h2>
      </div>

      <div className="relative max-w-sm mx-auto">
        {/* Timeline Line */}
        <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-primary/20"></div>

        <div className="space-y-12">
          {stories.map((item, index) => (
            <div key={item.id} className="relative pl-12" data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}>
              {/* Dot */}
              <div className="absolute left-[11px] top-2 w-4 h-4 bg-primary rounded-full ring-4 ring-primary/20 z-10"></div>
              
              <div className="bg-white dark:bg-gray-700 p-6 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-600 hover:shadow-xl transition-shadow duration-300">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
                  {item.date}
                </span>
                <h3 className="font-bold text-lg mb-3 text-gray-800 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed italic">
                  "{item.content}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Story;
