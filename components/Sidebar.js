import React from 'react';
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
  ChevronDown
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active = false, hasDropdown = false, href = "#" }) => (
  <Link href={href} className={`nav-item-tw ${active ? 'active' : ''} block`}>
    <div className="flex items-center gap-3 flex-1">
      <Icon size={20} className={active ? 'text-blue-600' : 'text-slate-500'} />
      <span>{label}</span>
    </div>
    {hasDropdown && <ChevronDown size={16} className="opacity-40" />}
  </Link>
);

export default function Sidebar({ activeMenu }) {
  return (
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col p-6 sticky top-0 h-screen">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 flex items-center justify-center bg-amber-400 rounded-lg shadow-sm">
          <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 5L65 35H35L50 5Z" fill="white" />
            <path d="M95 50L65 65V35L95 50Z" fill="white" />
            <path d="M50 95L35 65H65L50 95Z" fill="white" />
            <path d="M5 50L35 35V65L5 50Z" fill="white" />
            <circle cx="50" cy="50" r="10" fill="white" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold text-slate-900 leading-none tracking-tight">INSIRA</span>
          <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mt-0.5">Memorial Park</span>
        </div>
      </div>

      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-4">Menu</div>
      <nav className="flex-1 flex flex-col gap-1 overflow-y-auto pr-2">
        <SidebarItem icon={Home} label="Beranda" href="/" active={activeMenu === "Beranda"} />
        <SidebarItem icon={DollarSign} label="Progress Komisi" active={activeMenu === "Progress Komisi"} />
        <SidebarItem icon={Trophy} label="Capaian Sales" active={activeMenu === "Capaian Sales"} />
        <SidebarItem icon={Calculator} label="Simulasi Angsuran" active={activeMenu === "Simulasi Angsuran"} />
        <SidebarItem icon={Building2} label="Agensi" hasDropdown active={activeMenu === "Agensi"} />
        <SidebarItem icon={Users2} label="Tim" hasDropdown active={activeMenu === "Tim"} />
        <SidebarItem icon={Calendar} label="Event" hasDropdown active={activeMenu === "Event"} />
        <SidebarItem icon={RotateCcw} label="Request Refund" active={activeMenu === "Request Refund"} />
        <SidebarItem icon={List} label="Pembelian OTS" active={activeMenu === "Pembelian OTS"} />
        <SidebarItem icon={ClipboardList} label="Prospek Akad" href="/prospek-akad" active={activeMenu === "Prospek Akad"} />
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-100">
        <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl">
          <img src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff" className="w-10 h-10 rounded-lg" alt="Avatar" />
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-semibold text-slate-900 truncate">Admin User</span>
            <span className="text-[11px] text-slate-500 font-medium">Super Admin</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
