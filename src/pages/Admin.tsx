import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, MessageSquare, Settings as SettingsIcon, LogOut, Trash2, CheckCircle, XCircle, Heart, Lock } from 'lucide-react';
import { storage } from '../utils/storage';
import { invitationData as defaultData } from '../config/invitationData';
import type { Comment, InvitationData } from '../types/invitation';

interface AdminProps {
  onDataChange?: () => void;
}

const Admin: React.FC<AdminProps> = ({ onDataChange }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'comments' | 'guests' | 'settings'>('dashboard');
  
  // Data State
  const [comments, setComments] = useState<Comment[]>([]);
  const [likes, setLikes] = useState(0);
  const [invData, setInvData] = useState<InvitationData>(defaultData);

  useEffect(() => {
    if (isAuthenticated) {
      setComments(storage.getComments());
      setLikes(storage.getLikes());
      setInvData(storage.getInvitationData(defaultData));
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Default password
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleDeleteComment = (id: string) => {
    if (window.confirm('Hapus komentar ini?')) {
      storage.deleteComment(id);
      setComments(storage.getComments());
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    storage.saveInvitationData(invData);
    
    // Notify same-tab components (via App.tsx prop)
    if (onDataChange) onDataChange();
    
    // Notify other components/tabs
    window.dispatchEvent(new Event('invitationDataChanged'));
    
    alert('Pengaturan berhasil disimpan!');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-gray-800">Admin Login</h1>
            <p className="text-gray-500 text-sm mt-2">Masukkan password untuk mengelola undangan.</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-gray-50 border ${loginError ? 'border-red-500' : 'border-gray-100'} px-4 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
                placeholder="••••••••"
              />
              {loginError && <p className="text-red-500 text-[10px] font-bold px-1">Password salah. Coba lagi.</p>}
            </div>
            <button type="submit" className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all transform active:scale-95">
              Masuk Sekarang
            </button>
          </form>
          <p className="mt-8 text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest italic">Hint: admin123</p>
        </div>
      </div>
    );
  }

  const stats = {
    totalComments: comments.length,
    present: comments.filter(c => c.presence === '1').length,
    absent: comments.filter(c => c.presence === '2').length,
    likes: likes
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl flex flex-col hidden md:flex sticky top-0 h-screen">
        <div className="p-6 border-b border-gray-100">
          <h1 className="font-bold text-xl flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            Admin Panel
          </h1>
        </div>
        
        <nav className="flex-grow p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'dashboard' ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('comments')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'comments' ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <MessageSquare className="w-5 h-5" />
            Manage Comments
          </button>
          <button 
            onClick={() => setActiveTab('guests')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'guests' ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Users className="w-5 h-5" />
            Guest List
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'settings' ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <SettingsIcon className="w-5 h-5" />
            Settings
          </button>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 font-bold text-sm hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-10 pt-20 md:pt-10 overflow-auto">
        {activeTab === 'dashboard' && (
          <div className="space-y-10 animate-fade-in">
            <div>
              <h2 className="text-3xl font-black text-gray-800">Dashboard Overview</h2>
              <p className="text-gray-500 mt-2">Pantau statistik undangan Anda secara real-time.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Komentar</span>
                  <p className="text-2xl font-black">{stats.totalComments}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Hadir</span>
                  <p className="text-2xl font-black">{stats.present}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center">
                  <XCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Absen</span>
                  <p className="text-2xl font-black">{stats.absent}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-pink-50 text-pink-500 rounded-2xl flex items-center justify-center">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Likes</span>
                  <p className="text-2xl font-black">{stats.likes}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="font-black text-gray-800">Ucapan Terbaru</h3>
                <button onClick={() => setActiveTab('comments')} className="text-primary text-sm font-bold hover:underline">Lihat Semua</button>
              </div>
              <div className="divide-y divide-gray-50">
                {comments.slice(0, 5).map((c) => (
                  <div key={c.id} className="p-6 flex justify-between items-center group hover:bg-gray-50/50 transition-all">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 font-bold text-xs uppercase">
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-gray-800">{c.name}</h4>
                          <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${c.presence === '1' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {c.presence === '1' ? 'Hadir' : 'Absen'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1 italic">"{c.text}"</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDeleteComment(c.id)}
                      className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {comments.length === 0 && (
                  <div className="p-20 text-center">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest italic">Belum ada ucapan...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'comments' && (
          <div className="space-y-10 animate-fade-in">
            <div>
              <h2 className="text-3xl font-black text-gray-800">Manajemen Ucapan</h2>
              <p className="text-gray-500 mt-2">Kelola semua ucapan dan doa yang masuk dari tamu.</p>
            </div>
            
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100">
                      <th className="px-6 py-4">Nama Tamu</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Ucapan</th>
                      <th className="px-6 py-4">Waktu</th>
                      <th className="px-6 py-4">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {comments.map((c) => (
                      <tr key={c.id} className="hover:bg-gray-50/50 transition-all">
                        <td className="px-6 py-4 font-bold text-sm text-gray-800">{c.name}</td>
                        <td className="px-6 py-4">
                          <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${c.presence === '1' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {c.presence === '1' ? 'Hadir' : 'Absen'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs text-gray-500 italic max-w-xs capitalize line-clamp-2">{c.text}</td>
                        <td className="px-6 py-4 text-[10px] text-gray-400 font-medium">
                          {new Date(c.date).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => handleDeleteComment(c.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'guests' && (
          <div className="space-y-10 animate-fade-in">
            <div>
              <h2 className="text-3xl font-black text-gray-800">Daftar Tamu</h2>
              <p className="text-gray-500 mt-2">Daftar konfirmasi kehadiran tamu undangan.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 bg-green-50/50 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-bold text-green-700">Akan Hadir ({stats.present})</h3>
                </div>
                <div className="p-4 space-y-2">
                  {comments.filter(c => c.presence === '1').map(c => (
                    <div key={c.id} className="p-3 bg-gray-50 rounded-xl flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-[10px]">✓</div>
                      <span className="text-sm font-bold text-gray-700">{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 bg-red-50/50 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-bold text-red-700">Berhalangan ({stats.absent})</h3>
                </div>
                <div className="p-4 space-y-2">
                  {comments.filter(c => c.presence === '2').map(c => (
                    <div key={c.id} className="p-3 bg-gray-50 rounded-xl flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-[10px]">✕</div>
                      <span className="text-sm font-bold text-gray-700">{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-10 animate-fade-in">
            <div>
              <h2 className="text-3xl font-black text-gray-800">Pengaturan Undangan</h2>
              <p className="text-gray-500 mt-2">Ubah informasi dasar undangan Anda.</p>
            </div>
            
            <form onSubmit={handleSaveSettings} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-10 max-w-4xl pb-20">
              <div className="flex justify-between items-center bg-primary/5 p-4 rounded-2xl border border-primary/10">
                <p className="text-xs font-bold text-primary italic">Tips: Halaman utama (Hero) menampilkan data dari bagian "Akad Nikah".</p>
                <button 
                  type="button"
                  onClick={() => {
                    setInvData({
                      ...invData,
                      resepsi: {
                        ...invData.resepsi,
                        date: invData.akad.date,
                        location: { ...invData.akad.location }
                      }
                    });
                    alert('Data Akad telah disalin ke Resepsi!');
                  }}
                  className="text-[10px] bg-primary text-white px-3 py-2 rounded-lg font-black uppercase tracking-widest hover:bg-primary-dark transition-all"
                >
                  Salin Akad ke Resepsi
                </button>
              </div>

              {/* Main Names & Countdown */}
              <div className="space-y-6">
                <h3 className="font-black text-lg border-l-4 border-primary pl-4">Utama & Hitung Mundur</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Nama Panggilan Pria</label>
                    <input 
                      type="text" 
                      value={invData.groom.name} 
                      onChange={e => setInvData({...invData, groom: {...invData.groom, name: e.target.value}})}
                      className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Nama Panggilan Wanita</label>
                    <input 
                      type="text" 
                      value={invData.bride.name} 
                      onChange={e => setInvData({...invData, bride: {...invData.bride, name: e.target.value}})}
                      className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Tanggal Pernikahan (Untuk Countdown)</label>
                  <input 
                    type="datetime-local" 
                    value={invData.weddingDate.substring(0, 16)} 
                    onChange={e => setInvData({...invData, weddingDate: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Groom's Family Details */}
              <div className="space-y-6">
                <h3 className="font-black text-lg border-l-4 border-blue-500 pl-4">Keluarga Pengantin Pria</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Nama Ayah</label>
                    <input 
                      type="text" 
                      value={invData.groom.parents.father} 
                      onChange={e => setInvData({...invData, groom: {...invData.groom, parents: {...invData.groom.parents, father: e.target.value}}})}
                      className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Nama Ibu</label>
                    <input 
                      type="text" 
                      value={invData.groom.parents.mother} 
                      onChange={e => setInvData({...invData, groom: {...invData.groom, parents: {...invData.groom.parents, mother: e.target.value}}})}
                      className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Urutan (Contoh: Putra ke-1)</label>
                  <input 
                    type="text" 
                    value={invData.groom.order} 
                    onChange={e => setInvData({...invData, groom: {...invData.groom, order: e.target.value}})}
                    className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Bride's Family Details */}
              <div className="space-y-6">
                <h3 className="font-black text-lg border-l-4 border-pink-500 pl-4">Keluarga Pengantin Wanita</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Nama Ayah</label>
                    <input 
                      type="text" 
                      value={invData.bride.parents.father} 
                      onChange={e => setInvData({...invData, bride: {...invData.bride, parents: {...invData.bride.parents, father: e.target.value}}})}
                      className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Nama Ibu</label>
                    <input 
                      type="text" 
                      value={invData.bride.parents.mother} 
                      onChange={e => setInvData({...invData, bride: {...invData.bride, parents: {...invData.bride.parents, mother: e.target.value}}})}
                      className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Urutan (Contoh: Putri ke-2)</label>
                  <input 
                    type="text" 
                    value={invData.bride.order} 
                    onChange={e => setInvData({...invData, bride: {...invData.bride, order: e.target.value}})}
                    className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Akad Details */}
              <div className="space-y-6">
                <h3 className="font-black text-lg border-l-4 border-green-500 pl-4">Detail Akad Nikah</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Tanggal (Teks) - Muncul di Halaman Utama</label>
                    <input 
                      type="text" 
                      value={invData.akad.date} 
                      onChange={e => setInvData({...invData, akad: {...invData.akad, date: e.target.value}})}
                      placeholder="Sabtu, 10 Oktober 2026"
                      className="w-full bg-gray-50 border border-primary/30 px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all ring-2 ring-primary/5"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Waktu</label>
                    <input 
                      type="text" 
                      value={invData.akad.time} 
                      onChange={e => setInvData({...invData, akad: {...invData.akad, time: e.target.value}})}
                      placeholder="09.00 WIB - Selesai"
                      className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Alamat Lokasi</label>
                  <textarea 
                    value={invData.akad.location.address} 
                    onChange={e => setInvData({...invData, akad: {...invData.akad, location: {...invData.akad.location, address: e.target.value}}})}
                    className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    rows={2}
                  />
                </div>
              </div>

              {/* Resepsi Details */}
              <div className="space-y-6">
                <h3 className="font-black text-lg border-l-4 border-orange-500 pl-4">Detail Resepsi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Tanggal (Teks)</label>
                    <input 
                      type="text" 
                      value={invData.resepsi.date} 
                      onChange={e => setInvData({...invData, resepsi: {...invData.resepsi, date: e.target.value}})}
                      placeholder="Sabtu, 10 Oktober 2026"
                      className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Waktu</label>
                    <input 
                      type="text" 
                      value={invData.resepsi.time} 
                      onChange={e => setInvData({...invData, resepsi: {...invData.resepsi, time: e.target.value}})}
                      placeholder="11.00 WIB - Selesai"
                      className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Alamat Lokasi</label>
                  <textarea 
                    value={invData.resepsi.location.address} 
                    onChange={e => setInvData({...invData, resepsi: {...invData.resepsi, location: {...invData.resepsi.location, address: e.target.value}}})}
                    className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    rows={2}
                  />
                </div>
              </div>

              <div className="fixed bottom-0 left-64 right-0 p-6 bg-white/80 backdrop-blur-md border-t border-gray-100 flex justify-end z-50">
                <button type="submit" className="bg-primary text-white font-black px-12 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform active:scale-95 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Simpan Semua Perubahan
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
