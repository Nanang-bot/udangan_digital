import React from 'react';
import { LayoutDashboard, Users, MessageSquare, Settings as SettingsIcon, LogOut } from 'lucide-react';

const Admin: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h1 className="font-bold text-xl flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-primary" />
            Admin Panel
          </h1>
        </div>
        
        <nav className="flex-grow p-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-xl font-bold text-sm">
            <MessageSquare className="w-5 h-5" />
            Manage Comments
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl text-gray-500 font-medium text-sm transition-colors">
            <Users className="w-5 h-5" />
            Guest List
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl text-gray-500 font-medium text-sm transition-colors mt-auto">
            <SettingsIcon className="w-5 h-5" />
            Settings
          </button>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500 font-bold text-sm hover:bg-red-50 rounded-xl transition-colors">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-10">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Dashboard Overview</h2>
          <p className="text-gray-500 mt-2">Welcome back to your invitation management.</p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Total Comments</span>
            <p className="text-4xl font-black mt-2">124</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Guests Present</span>
            <p className="text-4xl font-black mt-2 text-green-500">86</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Likes</span>
            <p className="text-4xl font-black mt-2 text-primary">512</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold">Recent Comments</h3>
            <button className="text-primary text-sm font-bold">View All</button>
          </div>
          <div className="p-6">
            <p className="text-gray-400 text-center py-10 uppercase text-xs tracking-widest font-black">Feature coming soon...</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
