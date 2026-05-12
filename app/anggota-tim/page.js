"use client";

import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  UserCircle,
  Briefcase,
  Users2,
  ShieldCheck,
  TrendingUp,
  LayoutGrid,
  Building2,
  Filter,
  ArrowLeft,
  Info,
  ExternalLink,
  FileText,
  AlertCircle,
  ChevronDown,
  ArrowRight,
  Mail,
  Phone
} from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

export default function AnggotaTimPage() {
  const [topFilter, setTopFilter] = useState('Semua Anggota');
  const [searchTerm, setSearchTerm] = useState('');
  const [jabatanFilter, setJabatanFilter] = useState('Semua Jabatan');
  const [levelFilter, setLevelFilter] = useState('Semua Level');
  const [selectedMember, setSelectedMember] = useState(null);
  
  const teamMembersData = [
    { id: 1, name: 'Aan Semiharti', status: 'Aktif', level: 'Silver', cit: 450000000, jabatan: 'MA Under ACO', agensi: 'Propertilogi', referral: 'PRO624AAN', agreement: '-' },
    { id: 2, name: 'Siti Nur Lestari', status: 'Aktif', level: 'Silver', cit: 320000000, jabatan: 'MA Under MR', agensi: 'Propertilogi', referral: 'PRO623SITI', agreement: '-' },
    { id: 3, name: 'Budi Santoso', status: 'Aktif', level: 'Gold', cit: 1200000000, jabatan: 'MO', agensi: 'Propertilogi', referral: 'PRO624BUD', agreement: 'AGR-624-001' },
    { id: 4, name: 'Dewi Lestari', status: 'Non-Aktif', level: 'Silver', cit: 80000000, jabatan: 'MR', agensi: 'Propertilogi', referral: 'PRO624DEW', agreement: '-' },
    { id: 5, name: 'Eko Prasetyo', status: 'Aktif', level: 'Silver', cit: 210000000, jabatan: 'MA PA lain', agensi: 'MRKR', referral: 'EXT624EKO', agreement: '-' },
    { id: 6, name: 'Fitriani', status: 'Aktif', level: 'Platinum', cit: 2500000000, jabatan: 'SM', agensi: 'Propertilogi', referral: 'PRO624FIT', agreement: 'AGR-624-002' },
    { id: 7, name: 'Hendra Saputra', status: 'Aktif', level: 'Silver', cit: 150000000, jabatan: 'MA Customer', agensi: 'Future Home', referral: 'EXT624HEN', agreement: '-' },
    { id: 8, name: 'Iwan Setiawan', status: 'Aktif', level: 'Bronze', cit: 95000000, jabatan: 'MA Customer', agensi: 'Citra Property', referral: 'EXT624IWA', agreement: '-' },
    { id: 9, name: 'Joko Anwar', status: 'Aktif', level: 'Silver', cit: 280000000, jabatan: 'MA PA lain', agensi: 'Indo Home', referral: 'EXT624JOK', agreement: '-' },
    { id: 10, name: 'Kurniawan', status: 'Non-Aktif', level: 'Gold', cit: 550000000, jabatan: 'MO', agensi: 'Propertilogi', referral: 'PRO624KUR', agreement: '-' },
    { id: 11, name: 'Linda Wati', status: 'Aktif', level: 'Platinum', cit: 1800000000, jabatan: 'MA Under MR', agensi: 'Propertilogi', referral: 'PRO624LIN', agreement: '-' },
    { id: 12, name: 'Rahmat Hidayat', status: 'Aktif', level: 'Gold', cit: 950000000, jabatan: 'ACO', agensi: 'Propertilogi', referral: 'PRO624RAH', agreement: 'AGR-624-003' },
  ];

  const getActiveCount = (rolePrefix) => {
    return teamMembersData.filter(m => m.status === 'Aktif' && m.jabatan.startsWith(rolePrefix)).length;
  };

  const teamStats = [
    { label: 'Manager', count: getActiveCount('SM'), icon: ShieldCheck, color: 'text-blue-500', bg: 'bg-blue-50/50' },
    { label: 'Koordinator', count: getActiveCount('ACO'), icon: Briefcase, color: 'text-indigo-500', bg: 'bg-indigo-50/50' },
    { label: 'Memorial Representative', count: getActiveCount('MR'), icon: ShieldCheck, color: 'text-amber-500', bg: 'bg-amber-50/50' },
    { label: 'Memorial Officer', count: getActiveCount('MO'), icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50/50' },
    { label: 'Memorial Associate', count: getActiveCount('MA'), icon: Users2, color: 'text-sky-500', bg: 'bg-sky-50/50' },
  ];

  const filteredMembers = teamMembersData.filter(member => {
    if (topFilter === 'Propertilogi') {
      if (member.agensi !== 'Propertilogi') return false;
    } else if (topFilter === 'PA Lain') {
      if (member.agensi === 'Propertilogi') return false;
    }
    if (jabatanFilter !== 'Semua Jabatan') {
      if (member.jabatan !== jabatanFilter) return false;
    }
    if (levelFilter !== 'Semua Level') {
      if (member.level !== levelFilter) return false;
    }
    const s = searchTerm.toLowerCase();
    return member.name.toLowerCase().includes(s) || member.referral.toLowerCase().includes(s) || member.agensi.toLowerCase().includes(s);
  });

  const displayMembers = filteredMembers.slice(0, 10);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(val);
  };

  const getLevelStyle = (level) => {
    switch (level) {
      case 'Silver': return 'bg-slate-50 text-slate-500 border-slate-100';
      case 'Gold': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Platinum': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      default: return 'bg-slate-50 text-slate-400 border-slate-100';
    }
  };

  if (selectedMember) {
    return (
      <div className="flex min-h-screen bg-slate-50/50">
        <Sidebar activeMenu="Anggota Tim" />
        <main className="flex-1 p-6 md:p-10 overflow-hidden">
          <div className="flex items-center gap-6 mb-10">
            <button 
              onClick={() => setSelectedMember(null)}
              className="w-11 h-11 flex items-center justify-center bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-blue-500 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-500/5 transition-all"
            >
              <ArrowLeft size={20} strokeWidth={2} />
            </button>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Detail Profil</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            <div className="lg:col-span-2 bg-white rounded-[2rem] p-10 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col md:flex-row gap-12 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-40 h-40 bg-slate-50 rounded-bl-[5rem] -mr-10 -mt-10 group-hover:bg-blue-50/50 transition-colors duration-500" />
               <div className="flex flex-col items-center gap-6 z-10">
                <div className="w-40 h-40 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-200 relative border-4 border-white shadow-xl">
                  <UserCircle size={140} strokeWidth={0.5} />
                </div>
                <div className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest ${selectedMember.status === 'Aktif' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                   {selectedMember.status}
                </div>
              </div>

              <div className="flex-1 space-y-8 z-10">
                <div>
                  <h2 className="text-3xl font-bold text-slate-800 mb-6 tracking-tight">{selectedMember.name}</h2>
                  <div className="flex flex-wrap gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-200">
                      Perbarui Jabatan
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-white text-red-500 border border-red-100 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-red-50 transition-all">
                      Suspend
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 pt-8 border-t border-slate-50">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Jabatan Utama</span>
                    <p className="text-sm font-bold text-slate-700">{selectedMember.jabatan}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kode Referral</span>
                    <p className="text-sm font-bold text-slate-700">{selectedMember.referral}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Agensi</span>
                    <p className="text-sm font-bold text-blue-500">{selectedMember.agensi}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dokumen</span>
                    <p className="text-sm font-bold text-slate-700">{selectedMember.agreement}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-[2rem] p-10 text-white shadow-2xl flex flex-col justify-between relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
               <div className="space-y-8 z-10">
                <div className="flex justify-between items-center">
                  <span className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-white/10 bg-white/5`}>
                    Level {selectedMember.level}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-blue-400"><TrendingUp size={20} strokeWidth={2} /></div>
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-4xl font-bold tracking-tight">Rp 0</span>
                    <span className="text-sm font-semibold text-slate-500">/ 150 Jt</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-4">
                    <div className="w-1/12 h-full bg-blue-500 rounded-full" />
                  </div>
                  <p className="text-[11px] font-semibold text-slate-400 leading-relaxed uppercase tracking-wider">
                    Kurang <span className="text-white">Rp 150.000.000</span> untuk mencapai <span className="text-amber-400">Gold</span>
                  </p>
                </div>
              </div>
              <button className="text-[10px] font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors z-10 group/btn mt-8">
                Lihat Progresi <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-sm space-y-10">
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">Ringkasan Performa</h3>
              <div className="space-y-8">
                {[
                  { label: 'Total Transaksi CIT', val: 'Rp 0', color: 'blue' },
                  { label: 'Potensi Pencapaian', val: 'Rp 0', color: 'amber' },
                  { label: 'Akumulasi Pendapatan', val: 'Rp 0', color: 'emerald' }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-end border-b border-slate-50 pb-5">
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</span>
                      <p className="text-2xl font-bold text-slate-800 tracking-tight">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-600 rounded-[2rem] p-12 text-white flex flex-col items-center justify-center text-center space-y-8 relative overflow-hidden shadow-2xl shadow-blue-200">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />
               <div className="w-20 h-20 bg-white/10 rounded-[1.5rem] flex items-center justify-center text-blue-100 border border-white/10">
                  <FileText size={36} strokeWidth={1.5} />
               </div>
               <div>
                 <h4 className="text-xl font-bold tracking-tight mb-2">Informasi Rekening</h4>
                 <p className="text-blue-100 text-sm font-medium opacity-80 max-w-[280px] leading-relaxed">
                   Belum ada rekening terdaftar. Minta verifikasi dari anggota.
                 </p>
               </div>
               <button className="px-8 py-3.5 bg-white text-blue-600 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-all shadow-xl">
                 Minta Detail
               </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <Sidebar activeMenu="Anggota Tim" />

      <main className="flex-1 p-6 md:p-10 overflow-hidden">
        <Header title="Anggota Tim" />

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
          <div className="flex bg-slate-200/40 p-1 rounded-xl w-fit gap-1 border border-slate-100">
            {['Semua Anggota', 'Propertilogi', 'PA Lain'].map(tab => (
              <button 
                key={tab}
                onClick={() => setTopFilter(tab)}
                className={`px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest rounded-lg transition-all ${topFilter === tab ? 'bg-white text-blue-600 shadow-sm border border-slate-100' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl text-[11px] font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-blue-600 transition-all shadow-xl shadow-slate-200">
            <Plus size={18} />
            Tambah Anggota Baru
          </button>
        </div>

        <section className="mb-12">
          <div className="flex items-center gap-3 mb-8 px-2">
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Overview Operasional</h2>
            <div className="h-px flex-1 bg-slate-200/60" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            {teamStats.map((stat, idx) => (
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
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">
              Daftar Anggota {topFilter === 'Semua Anggota' ? 'Keseluruhan' : topFilter} 
              <span className="ml-4 px-2 py-0.5 bg-blue-50 text-blue-500 rounded text-[10px] font-bold border border-blue-100 whitespace-nowrap">
                {filteredMembers.length} Anggota Aktif
              </span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              <div className="relative flex-1 sm:w-72">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <input 
                  type="text" 
                  placeholder="Cari anggota..." 
                  className="w-full pl-11 pr-4 py-3 text-xs bg-slate-50/50 border border-slate-100 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-200 transition-all font-medium outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative sm:w-56">
                <select 
                  className="w-full pl-4 pr-10 py-3 text-[11px] bg-slate-50 border border-slate-100 rounded-xl focus:outline-none appearance-none cursor-pointer font-bold text-slate-600 uppercase tracking-widest"
                  value={jabatanFilter}
                  onChange={(e) => setJabatanFilter(e.target.value)}
                >
                  <option>Semua Jabatan</option>
                  {['MR', 'MO', 'MA Customer', 'MA Under MR', 'MA Under ACO', 'MA PA lain'].map(j => (
                    <option key={j} value={j}>{j}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
              </div>
              <div className="relative sm:w-48">
                <select 
                  className="w-full pl-4 pr-10 py-3 text-[11px] bg-slate-50 border border-slate-100 rounded-xl focus:outline-none appearance-none cursor-pointer font-bold text-slate-600 uppercase tracking-widest"
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                >
                  <option>Semua Level</option>
                  {['Silver', 'Gold', 'Platinum'].map(l => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/30">
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center w-20">No</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Anggota</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Level</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Nilai CIT</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Agensi</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Referral</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {displayMembers.map((member, idx) => (
                  <tr key={member.id} className="group hover:bg-slate-50/40 transition-all cursor-pointer">
                    <td className="px-8 py-6 text-xs text-slate-300 text-center font-bold tabular-nums">{idx + 1}</td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800 tracking-tight">{member.name}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${member.status === 'Aktif' ? 'bg-emerald-500' : 'bg-red-500 animate-pulse'}`} />
                          <span className={`text-[9px] font-bold uppercase tracking-widest ${member.status === 'Aktif' ? 'text-slate-400' : 'text-red-500'}`}>
                            {member.status} • {member.jabatan}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest border border-slate-100 ${getLevelStyle(member.level)}`}>
                        {member.level}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right text-sm font-bold text-blue-600 tabular-nums">
                      {formatCurrency(member.cit)}
                    </td>
                    <td className="px-8 py-6">
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${member.agensi === 'Propertilogi' ? 'text-slate-500' : 'text-blue-500'}`}>
                        {member.agensi}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-[10px] font-medium text-slate-400 tracking-tight">{member.referral}</td>
                    <td className="px-8 py-6 text-right">
                      <button 
                        onClick={() => setSelectedMember(member)}
                        className="px-6 py-2.5 bg-slate-50 text-slate-600 hover:bg-slate-900 hover:text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all border border-slate-100"
                      >
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
              Halaman 01 <span className="mx-2 opacity-20">|</span> Menampilkan {filteredMembers.length} hasil
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
