import React, { useState } from 'react';
import Link from 'next/link';
import { signOut } from "next-auth/react";
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
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = [
    { icon: Home, label: "Beranda", href: "/" },
    { icon: DollarSign, label: "Progress Komisi" },
    { icon: Trophy, label: "Capaian Sales", href: "/capaian-sales" },
    { icon: Calculator, label: "Simulasi Angsuran" },
    { icon: Building2, label: "Agensi", hasDropdown: true, href: "/manajemen-agensi" },
    { icon: Users2, label: "Anggota Tim", hasDropdown: true, href: "/anggota-tim" },
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
          <div className="absolute -inset-1 bg-blue-500/5 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-1000"></div>
          
          <div className="relative w-11 h-11 flex-shrink-0 flex items-center justify-center overflow-hidden rounded-xl bg-slate-900 shadow-lg group-hover:scale-105 transition-transform cursor-pointer z-10">
            <img src="/research-space-logo.png" alt="Research Space Logo" className="w-full h-full object-cover scale-110" />
          </div>
        </div>
        
        {!isCollapsed && (
          <div className="flex flex-col animate-fadeIn overflow-hidden">
            <div className="relative">
              <span className="text-lg font-bold text-slate-800 leading-tight tracking-tight inline-block uppercase">
                RESEARCH <span className="text-blue-600">SPACE</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shine_4s_ease-in-out_infinite]" />
            </div>
            <span className="text-[8px] font-medium text-slate-400 tracking-[0.1em] uppercase mt-0.5 opacity-80">SALES & PARTNERSHIP INTEGRATION</span>
          </div>
        )}
      </div>

      {/* Search Bar */}
      <div className="mb-8 px-2">
        <div className="relative group">
          <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${searchQuery ? 'text-blue-500' : 'text-slate-400 group-hover:text-slate-600'}`} size={14} />
          <input 
            type="text" 
            placeholder={isCollapsed ? "" : "Cari menu..."}
            className={`w-full bg-slate-50/50 border border-slate-100 rounded-xl py-2 text-[11px] font-medium transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'pl-10 pr-4 focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-200'}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto overflow-x-hidden no-scrollbar px-1 py-2">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.label;
          const href = item.href || "#";
          
          return (
            <Link
              key={item.label}
              href={href}
              className={`w-full flex items-center rounded-xl transition-all duration-300 group relative ${
                isActive 
                ? 'bg-blue-50 text-blue-600 border border-blue-100/50 shadow-sm shadow-blue-500/5' 
                : 'text-slate-500 hover:bg-slate-50/80 hover:text-slate-900'
              } ${isCollapsed ? 'justify-center h-11' : 'gap-3 px-4 py-2.5'}`}
            >
              <div className={`transition-all duration-300 ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-500'}`}>
                <Icon size={isCollapsed ? 20 : 18} strokeWidth={isActive ? 2 : 1.5} />
              </div>
              
              {!isCollapsed && (
                <span className={`text-[13px] font-semibold tracking-tight transition-all duration-300 ${isActive ? 'translate-x-0.5' : ''}`}>{item.label}</span>
              )}
              
              {isActive && (
                <div className={`absolute rounded-full bg-blue-600 transition-all duration-300 ${isCollapsed ? 'left-0 w-0.5 h-4 top-1/2 -translate-y-1/2' : 'right-4 w-1 h-1 opacity-40'}`} />
              )}
              
              {isCollapsed && (
                <div className="absolute left-full ml-4 px-3 py-2 bg-slate-900 text-white text-[10px] font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-xl">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="mt-auto pt-6 border-t border-slate-50/50">
        <div className={`flex items-center rounded-xl transition-all duration-300 group ${isCollapsed ? 'justify-center p-0 h-11' : 'gap-3 p-2 hover:bg-slate-50/50'}`}>
          <div className="relative flex-shrink-0">
            <img 
              src="https://ui-avatars.com/api/?name=Space+Clientins&background=f1f5f9&color=64748b" 
              className="w-8 h-8 rounded-lg shadow-sm group-hover:scale-105 transition-transform" 
              alt="Avatar" 
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 border-2 border-white rounded-full" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden animate-fadeIn">
              <span className="text-xs font-bold text-slate-800 truncate tracking-tight">Research Space Admin</span>
              <span className="text-[9px] text-slate-400 font-medium tracking-wide">System Management</span>
            </div>
          )}
          {!isCollapsed && (
            <button 
              onClick={() => setShowLogoutModal(true)}
              className="ml-auto p-1.5 text-slate-300 hover:text-red-400 transition-all"
              title="Logout"
            >
              <LogOut size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setShowLogoutModal(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 border border-slate-100 animate-in zoom-in-95 duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6">
                <LogOut size={28} className="text-red-500" />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-2">Konfirmasi Keluar</h3>
              <p className="text-slate-500 text-sm mb-8">Apakah Anda yakin ingin mengakhiri sesi ini? Anda harus login kembali untuk mengakses data.</p>
              
              <div className="grid grid-cols-2 gap-3 w-full">
                <button 
                  onClick={() => setShowLogoutModal(false)}
                  className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs uppercase tracking-widest rounded-2xl transition-all"
                >
                  Batal
                </button>
                <button 
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="px-6 py-3.5 bg-red-500 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-red-500/20"
                >
                  Ya, Keluar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
