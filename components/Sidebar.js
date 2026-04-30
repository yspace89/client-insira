import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Home,
  DollarSign,
  Trophy,
  Calculator,
  Building2,
  Users2,
  Calendar,
  RotateCcw,
  List,
  ClipboardList,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active = false, hasDropdown = false, href = "#", isCollapsed }) => (
  <Link href={href} className={`nav-item-tw ${active ? 'active' : ''} group relative`}>
    <div className="flex items-center gap-3 flex-1">
      <div className={`flex items-center justify-center ${isCollapsed ? 'w-full' : ''}`}>
        <Icon size={20} className={active ? 'text-blue-600' : 'text-slate-500 group-hover:text-blue-500 transition-colors'} />
      </div>
      {!isCollapsed && <span className="transition-opacity duration-300 whitespace-nowrap">{label}</span>}
    </div>
    {!isCollapsed && hasDropdown && <ChevronDown size={16} className="opacity-40" />}
    
    {/* Tooltip for collapsed state */}
    {isCollapsed && (
      <div className="absolute left-full ml-4 px-2 py-1 bg-slate-900 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
        {label}
      </div>
    )}
  </Link>
);

export default function Sidebar({ activeMenu }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = [
    { icon: Home, label: "Beranda", href: "/" },
    { icon: DollarSign, label: "Progress Komisi" },
    { icon: Trophy, label: "Capaian Sales", href: "/capaian-sales" },
    { icon: Calculator, label: "Simulasi Angsuran" },
    { icon: Building2, label: "Agensi", hasDropdown: true },
    { icon: Users2, label: "Tim", hasDropdown: true },
    { icon: Calendar, label: "Event", hasDropdown: true },
    { icon: RotateCcw, label: "Request Refund" },
    { icon: List, label: "Pembelian OTS" },
    { icon: ClipboardList, label: "Prospek Akad", href: "/prospek-akad" },
    { icon: DollarSign, label: "Setting Harga", href: "/setting-harga" },
  ];

  const filteredItems = menuItems.filter(item => 
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-72'} bg-white border-r border-slate-200 flex flex-col p-4 sticky top-0 h-screen transition-all duration-300 ease-in-out z-40`}>
      {/* Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 bg-white border border-slate-200 rounded-full p-1 shadow-sm hover:bg-slate-50 transition-colors z-50"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Logo Section */}
      <div className={`flex items-center gap-3 mb-8 px-2 transition-all duration-300 ${isCollapsed ? 'justify-center' : ''}`}>
        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-amber-400 rounded-lg shadow-sm">
          <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 5L65 35H35L50 5Z" fill="white" />
            <path d="M95 50L65 65V35L95 50Z" fill="white" />
            <path d="M50 95L35 65H65L50 95Z" fill="white" />
            <path d="M5 50L35 35V65L5 50Z" fill="white" />
            <circle cx="50" cy="50" r="10" fill="white" />
          </svg>
        </div>
        {!isCollapsed && (
          <div className="flex flex-col animate-fadeIn">
            <span className="text-xl font-bold text-slate-900 leading-none tracking-tight">INSIRA</span>
            <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mt-0.5 whitespace-nowrap">Memorial Park</span>
          </div>
        )}
      </div>

      {/* Search Bar - only shown/functional when expanded or as an icon when collapsed */}
      <div className="mb-6 px-2">
        <div className={`relative flex items-center ${isCollapsed ? 'justify-center' : 'bg-slate-50 border border-slate-100 rounded-xl px-3 py-2'}`}>
          <Search size={18} className="text-slate-400 flex-shrink-0" />
          {!isCollapsed && (
            <input 
              type="text" 
              placeholder="Cari menu..." 
              className="ml-2 bg-transparent text-sm w-full outline-none text-slate-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          )}
        </div>
      </div>

      {!isCollapsed && (
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-4 animate-fadeIn">Menu</div>
      )}
      
      <nav className="flex-1 flex flex-col gap-1 overflow-y-auto pr-1 custom-scrollbar">
        {filteredItems.map((item, index) => (
          <SidebarItem 
            key={index}
            icon={item.icon} 
            label={item.label} 
            href={item.href} 
            active={activeMenu === item.label}
            hasDropdown={item.hasDropdown}
            isCollapsed={isCollapsed}
          />
        ))}
        {filteredItems.length === 0 && !isCollapsed && (
          <div className="px-3 py-4 text-xs text-slate-400 italic text-center">
            Menu tidak ditemukan
          </div>
        )}
      </nav>

      {/* Footer / User Profile */}
      <div className="mt-auto pt-6 border-t border-slate-100">
        <div className={`flex items-center gap-3 p-2 rounded-xl transition-all duration-300 ${isCollapsed ? 'justify-center' : 'bg-slate-50'}`}>
          <img 
            src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff" 
            className="w-10 h-10 rounded-lg flex-shrink-0" 
            alt="Avatar" 
          />
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden animate-fadeIn">
              <span className="text-sm font-semibold text-slate-900 truncate">Admin User</span>
              <span className="text-[11px] text-slate-500 font-medium">Super Admin</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
