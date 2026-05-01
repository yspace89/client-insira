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
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  MapPin
} from 'lucide-react';


export default function Sidebar({ activeMenu }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = [
    { icon: Home, label: "Beranda", href: "/" },
    { icon: DollarSign, label: "Progress Komisi" },
    { icon: Trophy, label: "Capaian Sales", href: "/capaian-sales" },
    { icon: Calculator, label: "Simulasi Angsuran" },
    { icon: Building2, label: "Agensi", hasDropdown: true },
    { icon: Users2, label: "Tim", hasDropdown: true, href: "/anggota-tim" },
    { icon: Calendar, label: "Event", hasDropdown: true },
    { icon: RotateCcw, label: "Request Refund" },
    { icon: List, label: "Pembelian OTS" },
    { icon: ClipboardList, label: "Prospek Akad", href: "/prospek-akad" },
    { icon: MapPin, label: "Kunjungan Site", href: "/kunjungan-site" },
    { icon: DollarSign, label: "Setting Harga", href: "/setting-harga" },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-72'} bg-white/80 backdrop-blur-xl border-r border-slate-100 flex flex-col p-4 sticky top-0 h-screen transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-40 shadow-[4px_0_24px_rgba(0,0,0,0.02)]`}>
      {/* Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 bg-white border border-slate-100 rounded-full p-1.5 shadow-md hover:shadow-lg hover:scale-110 transition-all z-50 group"
      >
        {isCollapsed ? <ChevronRight size={12} className="text-slate-600 group-hover:text-blue-600" /> : <ChevronLeft size={12} className="text-slate-600 group-hover:text-blue-600" />}
      </button>

      {/* Logo Section */}
      <div className={`flex items-center gap-4 mb-10 px-2 transition-all duration-300 ${isCollapsed ? 'justify-center' : ''}`}>
        <div className="relative group">
          {/* Subtle Logo Glow */}
          <div className="absolute -inset-1 bg-blue-500/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
          
          <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center overflow-hidden rounded-2xl bg-black shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform cursor-pointer z-10">
            <img src="/research-space-logo.png" alt="Research Space Logo" className="w-full h-full object-cover scale-110" />
          </div>
        </div>
        
        {!isCollapsed && (
          <div className="flex flex-col animate-fadeIn overflow-hidden">
            <div className="relative">
              <span className="text-xl font-black text-slate-900 leading-tight tracking-tighter uppercase inline-block">
                RESEARCH <span className="text-blue-600">SPACE</span>
              </span>
              {/* Refined, Subtle Shine Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shine_4s_ease-in-out_infinite]" />
            </div>
            <span className="text-[7px] font-black text-slate-400 tracking-[0.2em] uppercase mt-1 opacity-70">Sales & Partnership Integration</span>
          </div>
        )}
      </div>

      {/* Search Bar */}
      <div className="mb-8 px-2">
        <div className="relative group">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${searchQuery ? 'text-blue-500' : 'text-slate-400 group-hover:text-slate-600'}`} size={16} />
          <input 
            type="text" 
            placeholder={isCollapsed ? "" : "Quick Search..."}
            className={`w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 outline-none text-xs font-semibold transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'pl-10 pr-4 focus:bg-white focus:ring-4 focus:ring-blue-50/50 focus:border-blue-200'}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto no-scrollbar px-1">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.label;
          const href = item.href || "#";
          
          return (
            <Link
              key={item.label}
              href={href}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all duration-300 group relative ${
                isActive 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200/50 scale-[1.02]' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-500'}`}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              {!isCollapsed && (
                <span className={`text-sm font-bold tracking-tight transition-all duration-300 ${isActive ? 'translate-x-0.5' : ''}`}>{item.label}</span>
              )}
              {isActive && !isCollapsed && (
                <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
              )}
              {isCollapsed && (
                <div className="absolute left-full ml-4 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-xl">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="mt-auto pt-6 border-t border-slate-50">
        <div className={`flex items-center gap-3 p-2.5 rounded-2xl transition-all duration-300 group ${isCollapsed ? 'justify-center cursor-pointer hover:bg-slate-50' : 'bg-slate-50/50 border border-slate-100'}`}>
          <div className="relative">
            <img 
              src="https://ui-avatars.com/api/?name=Y+Space&background=000&color=fff" 
              className="w-10 h-10 rounded-xl flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform" 
              alt="Avatar" 
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden animate-fadeIn">
              <span className="text-xs font-black text-slate-900 truncate tracking-tight uppercase">Y-Space</span>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Admin Hub</span>
            </div>
          )}
          {!isCollapsed && (
            <button className="ml-auto p-1.5 text-slate-400 hover:text-red-500 hover:bg-white rounded-lg transition-all shadow-sm">
              <LogOut size={14} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
