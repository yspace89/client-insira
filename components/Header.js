import React from 'react';
import { Bell, UserCircle } from 'lucide-react';

export default function Header({ title, children }) {
  return (
    <header className="flex justify-between items-center mb-10 w-full">
      <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
      <div className="flex items-center gap-4">
        {children}
        <div className="flex items-center gap-2 ml-2 border-l border-slate-200 pl-4">
          <button className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-white hover:shadow-sm rounded-xl transition-all border border-transparent hover:border-slate-100">
            <Bell size={20} />
          </button>
          <button className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-white hover:shadow-sm rounded-xl transition-all border border-transparent hover:border-slate-100">
            <UserCircle size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
