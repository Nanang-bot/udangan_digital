import React, { useState } from 'react';
import { Send, User, MessageSquare as MessageCircleQuote } from 'lucide-react';
import { storage } from '../utils/storage';
import type { Comment } from '../types/invitation';

const Comments: React.FC = () => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [presence, setPresence] = useState<'0' | '1' | '2'>('1');
  const [comments, setComments] = useState<Comment[]>(storage.getComments());

  const handleSend = () => {
    if (!name || !comment) return;
    
    const newComment = storage.saveComment({
      name,
      text: comment,
      presence: presence as any
    });

    setComments([newComment, ...comments]);
    setName('');
    setComment('');
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // seconds

    if (diff < 60) return 'Baru Saja';
    if (diff < 3600) return `${Math.floor(diff / 60)}m lalu`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}j lalu`;
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  };

  return (
    <section className="py-20 px-6 bg-white dark:bg-gray-900" id="comments">
      <div className="text-center mb-16">
        <h2 className="font-esthetic text-5xl text-primary" data-aos="fade-up">Ucapan & Doa</h2>
        <p className="mt-4 text-sm opacity-60" data-aos="fade-up" data-aos-delay="200">
          Berikan doa dan ucapan terbaik untuk kami:
        </p>
      </div>

      <div className="max-w-sm mx-auto space-y-8">
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest opacity-60 px-1">Nama</label>
              <div className="flex items-center gap-3 bg-white dark:bg-gray-900 px-4 py-3 rounded-2xl border border-gray-100 dark:border-gray-600">
                <User className="w-4 h-4 text-primary" />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama Lengkap"
                  className="bg-transparent border-none outline-none text-sm w-full"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest opacity-60 px-1">Konfirmasi Kehadiran</label>
              <select 
                value={presence}
                onChange={(e) => setPresence(e.target.value as '0' | '1' | '2')}
                className="w-full bg-white dark:bg-gray-900 px-4 py-3 rounded-2xl border border-gray-100 dark:border-gray-600 text-sm outline-none"
              >
                <option value="0">Pilih Kehadiran</option>
                <option value="1">Hadir</option>
                <option value="2">Tidak Hadir</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest opacity-60 px-1">Ucapan</label>
              <textarea 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tulis ucapan..."
                rows={4}
                className="w-full bg-white dark:bg-gray-900 px-4 py-3 rounded-2xl border border-gray-100 dark:border-gray-600 text-sm outline-none resize-none"
              />
            </div>

            <button 
              onClick={handleSend}
              className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group transform active:scale-95"
            >
              <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              <span>Kirim Ucapan</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-50 dark:border-gray-700 flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <MessageCircleQuote className="w-5 h-5" />
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-sm">{c.name}</h4>
                  {c.presence === '1' && (
                    <span className="text-[8px] bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-bold uppercase">Hadir</span>
                  )}
                  {c.presence === '2' && (
                    <span className="text-[8px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold uppercase">Berhalangan</span>
                  )}
                </div>
                <p className="text-xs opacity-70 mb-2 italic">"{c.text}"</p>
                <span className="text-[8px] opacity-40 uppercase font-bold tracking-tighter">{formatDate(c.date)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Comments;
