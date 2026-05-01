"use client";

import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  UserCircle,
  Briefcase,
  Users2,
  TrendingUp,
  LayoutGrid,
  Filter,
  ArrowLeft,
  ExternalLink,
  FileText,
  AlertCircle,
  ChevronDown,
  ArrowRight,
  Mail,
  Phone,
  BarChart3,
  Wallet
} from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

export default function ManajemenAgensiPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAgensi, setSelectedAgensi] = useState(null);
  
  const agensiStats = [
    { label: 'Total Agensi', count: 24, icon: Building2, color: 'text-blue-500', bg: 'bg-blue-50/50' },
    { label: 'Agensi Aktif', count: 18, icon: Briefcase, color: 'text-indigo-500', bg: 'bg-indigo-50/50' },
    { label: 'Total Agent', count: 156, icon: Users2, color: 'text-amber-500', bg: 'bg-amber-50/50' },
    { label: 'Komisi Pending', count: 'Rp 1.2M', icon: Wallet, color: 'text-emerald-500', bg: 'bg-emerald-50/50' },
  ];

  const agensiData = [
    { id: 1, name: 'Propertilogi', owner: 'Budi Santoso', agents: 42, activeLeads: 128, commissionRate: '2.5%', status: 'Internal' },
    { id: 2, name: 'Future Home', owner: 'Hendra Saputra', agents: 15, activeLeads: 45, commissionRate: '2.0%', status: 'External' },
    { id: 3, name: 'Citra Property', owner: 'Iwan Setiawan', agents: 12, activeLeads: 32, commissionRate: '2.0%', status: 'External' },
    { id: 4, name: 'Indo Home', owner: 'Joko Anwar', agents: 10, activeLeads: 28, commissionRate: '2.0%', status: 'External' },
    { id: 5, name: 'Metro Realty', owner: 'Siti Nur Lestari', agents: 8, activeLeads: 15, commissionRate: '2.0%', status: 'External' },
    { id: 6, name: 'Prime Estate', owner: 'Ahmad Subarjo', agents: 20, activeLeads: 64, commissionRate: '2.2%', status: 'External' },
  ];

  const filteredAgensi = agensiData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <Sidebar activeMenu="Agensi" />

      <main className="flex-1 p-6 md:p-10 overflow-hidden">
        <Header title="Manajemen Agensi" />

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
          <div className="flex bg-slate-200/40 p-1 rounded-xl w-fit gap-1 border border-slate-100">
            {['Semua Agensi', 'Internal', 'External'].map(tab => (
              <button 
                key={tab}
                className={`px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest rounded-lg transition-all ${tab === 'Semua Agensi' ? 'bg-white text-blue-600 shadow-sm border border-slate-100' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl text-[11px] font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-blue-600 transition-all shadow-xl shadow-slate-200">
            <Plus size={18} />
            Daftarkan Agensi Baru
          </button>
        </div>

        <section className="mb-12">
          <div className="flex items-center gap-3 mb-8 px-2">
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Ringkasan Agensi</h2>
            <div className="h-px flex-1 bg-slate-200/60" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {agensiStats.map((stat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-md transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${stat.bg} ${stat.color} group-hover:scale-105 transition-transform`}>
                    <stat.icon size={20} strokeWidth={2} />
                  </div>
                  <div className="text-2xl font-bold text-slate-800 tracking-tight leading-none">{stat.count}</div>
                </div>
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-white rounded-[2rem] shadow-[0_8px_40px_rgba(0,0,0,0.02)] border border-slate-100 overflow-hidden mb-10">
          <div className="p-8 flex flex-col lg:flex-row justify-between items-center gap-8 border-b border-slate-50/60">
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">Database Agensi <span className="ml-4 px-2 py-0.5 bg-blue-50 text-blue-500 rounded text-[10px] font-bold border border-blue-100">{filteredAgensi.length} Agensi</span></h2>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              <div className="relative flex-1 sm:w-72">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <input 
                  type="text" 
                  placeholder="Cari agensi atau owner..." 
                  className="w-full pl-11 pr-4 py-3 text-xs bg-slate-50/50 border border-slate-100 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-200 transition-all font-medium outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/30">
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center w-20">No</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nama Agensi</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Owner / PIC</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Jumlah Agent</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Leads Aktif</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredAgensi.map((agensi, idx) => (
                  <tr key={agensi.id} className="group hover:bg-slate-50/40 transition-all">
                    <td className="px-8 py-6 text-xs text-slate-300 text-center font-bold tabular-nums">{String(idx + 1).padStart(2, '0')}</td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800 tracking-tight">{agensi.name}</span>
                        <span className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${agensi.status === 'Internal' ? 'text-blue-500' : 'text-slate-400'}`}>{agensi.status}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-slate-700 tracking-tight">{agensi.owner}</td>
                    <td className="px-8 py-6 text-center">
                       <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-600 border border-slate-200">
                        {agensi.agents}
                       </span>
                    </td>
                    <td className="px-8 py-6 text-center">
                       <span className="px-3 py-1 bg-blue-50 rounded-lg text-xs font-bold text-blue-600 border border-blue-100">
                        {agensi.activeLeads}
                       </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="px-6 py-2.5 bg-slate-50 text-slate-600 hover:bg-slate-900 hover:text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all border border-slate-100">
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-8 flex flex-col md:flex-row justify-between items-center bg-slate-50/40 gap-6">
            <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">
              Halaman 01 <span className="mx-2 opacity-20">|</span> Menampilkan {filteredAgensi.length} data
            </div>
            <div className="flex gap-2">
              <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-100 text-slate-300 hover:text-blue-500 transition-all">
                <ChevronLeft size={16} />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-900 text-white font-bold text-xs shadow-xl shadow-slate-200">1</button>
              <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-100 text-slate-400 hover:bg-white transition-all">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
