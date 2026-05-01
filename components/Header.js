import React from 'react';
import { Bell, UserCircle } from 'lucide-react';

export default function Header({ title, children }) {
  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 w-full">
      <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">{title}</h1>
      <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-end">
        {children}
        <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
          <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md rounded-xl transition-all border border-transparent hover:border-slate-100">
            <Bell size={20} />
          </button>
          <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md rounded-xl transition-all border border-transparent hover:border-slate-100">
            <UserCircle size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
