import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { storage } from '../utils/storage';
import { motion, AnimatePresence } from 'framer-motion';

const LikeButton: React.FC = () => {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showParticle, setShowParticle] = useState(false);

  useEffect(() => {
    setLikes(storage.getLikes());
  }, []);

  const handleLike = () => {
    storage.addLike();
    setLikes(prev => prev + 1);
    setIsLiked(true);
    setShowParticle(true);
    
    // Dispatch event to update Admin dashboard if open in another tab
    window.dispatchEvent(new Event('invitationDataChanged'));

    setTimeout(() => {
      setIsLiked(false);
      setShowParticle(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-20 right-6 z-40 flex flex-col items-center gap-1">
      <AnimatePresence>
        {showParticle && (
          <motion.div
            initial={{ y: 0, opacity: 1, scale: 0.5 }}
            animate={{ y: -40, opacity: 0, scale: 1.2 }}
            exit={{ opacity: 0 }}
            className="absolute text-pink-500"
          >
            <Heart className="w-4 h-4 fill-current" />
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        whileTap={{ scale: 0.8 }}
        onClick={handleLike}
        className={`p-2.5 rounded-full shadow-lg border-2 border-white/20 backdrop-blur-md transition-all duration-300 flex items-center justify-center ${
          isLiked ? 'bg-pink-500 text-white shadow-pink-200' : 'bg-white dark:bg-gray-800 text-pink-500 shadow-xl'
        }`}
      >
        <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
      </motion.button>
      
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-1.5 py-0.5 rounded-full text-[8px] font-black text-pink-600 shadow-sm border border-pink-50">
        {likes.toLocaleString()}
      </div>
    </div>
  );
};

export default LikeButton;
