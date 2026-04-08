import React, { useState, useEffect, useRef } from 'react';
import { Play, Music } from 'lucide-react';

interface MusicPlayerProps {
  url: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ url }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Attempt to play on mount (usually requires user interaction first)
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1030] flex flex-col gap-3">
      <button
        onClick={togglePlay}
        className={`p-3 rounded-full shadow-lg border-2 border-white/20 backdrop-blur-md transition-all duration-500 flex items-center justify-center ${isPlaying ? 'bg-primary text-white animate-spin-slow' : 'bg-gray-100 text-gray-500'}`}
        aria-label={isPlaying ? "Pause Music" : "Play Music"}
      >
        {isPlaying ? <Music className="w-6 h-6" /> : <Play className="w-6 h-6 fill-current" />}
      </button>
      <audio ref={audioRef} src={url} loop />
    </div>
  );
};

export default MusicPlayer;
