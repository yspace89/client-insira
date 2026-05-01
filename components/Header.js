import React from 'react';
import { Bell, UserCircle } from 'lucide-react';

export default function Header({ title, children }) {
  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 w-full">
      <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{title}</h1>
      <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-end">
        {children}
        <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
          <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:bg-white hover:shadow-lg hover:shadow-blue-500/5 rounded-xl transition-all border border-transparent hover:border-slate-100">
            <Bell size={18} strokeWidth={2} />
          </button>
          <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:bg-white hover:shadow-lg hover:shadow-blue-500/5 rounded-xl transition-all border border-transparent hover:border-slate-100">
            <UserCircle size={20} strokeWidth={2} />
          </button>
        </div>
      </div>
    </header>
  );
}
