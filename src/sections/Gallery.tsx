import React from 'react';
import { motion } from 'framer-motion';

const Gallery: React.FC = () => {
  const images = [
    { src: 'https://picsum.photos/800/800?random=1', label: 'Together' },
    { src: 'https://picsum.photos/800/1200?random=2', label: 'Moments' },
    { src: 'https://picsum.photos/1200/800?random=3', label: 'Happiness' },
    { src: 'https://picsum.photos/800/800?random=4', label: 'Forever' },
    { src: 'https://picsum.photos/800/1200?random=5', label: 'Love' },
    { src: 'https://picsum.photos/1200/800?random=6', label: 'Promise' },
  ];

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900" id="gallery">
      <div className="text-center mb-16">
        <h2 className="font-esthetic text-5xl text-primary" data-aos="fade-up">Galeri</h2>
      </div>

      <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
        {images.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`relative rounded-2xl overflow-hidden shadow-md group ${index % 3 === 0 ? 'col-span-1 row-span-2' : ''}`}
          >
            <img 
              src={img.src} 
              alt={img.label} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white font-esthetic text-2xl">{img.label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
