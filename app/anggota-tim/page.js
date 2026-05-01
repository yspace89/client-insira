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
  ChevronDown
} from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

export default function AnggotaTimPage() {
  const [topFilter, setTopFilter] = useState('Semua Sales');
  const [searchTerm, setSearchTerm] = useState('');
  const [jabatanFilter, setJabatanFilter] = useState('Semua Jabatan');
  const [selectedMember, setSelectedMember] = useState(null);
  
  const teamStats = [
    { label: 'Sales Manager', count: 1, icon: ShieldCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Agency Coordinator', count: 1, icon: Briefcase, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Memorial Rep.', count: 10, icon: UserCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Marketing Off.', count: 3, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Memorial Assoc.', count: 479, icon: Users2, color: 'text-sky-600', bg: 'bg-sky-50' },
  ];

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
  ];

  const filteredMembers = teamMembersData.filter(member => {
    if (topFilter === 'Sales Propertilogi') {
      if (member.agensi !== 'Propertilogi') return false;
    } else if (topFilter === 'Sales PA lain') {
      if (member.agensi === 'Propertilogi' || !member.jabatan.includes('MA')) return false;
    }
    if (jabatanFilter !== 'Semua Jabatan') {
      if (member.jabatan !== jabatanFilter) return false;
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
      case 'Silver': return 'bg-slate-100 text-slate-500 border-slate-200/50';
      case 'Gold': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Platinum': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      default: return 'bg-slate-100 text-slate-500 border-slate-200/50';
    }
  };

  if (selectedMember) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar activeMenu="Tim" />
        <main className="flex-1 p-8 overflow-hidden">
          <div className="flex items-center gap-6 mb-10">
            <button 
              onClick={() => setSelectedMember(null)}
              className="w-12 h-12 flex items-center justify-center bg-white border border-slate-200 rounded-2xl text-slate-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Profil Anggota Tim</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-12 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[5rem] -mr-8 -mt-8" />
               <div className="flex flex-col items-center gap-6 z-10">
                <div className="w-40 h-40 bg-slate-100 rounded-[2.5rem] flex items-center justify-center text-slate-200 relative overflow-hidden border-4 border-white shadow-xl">
                  <UserCircle size={140} strokeWidth={0.5} />
                </div>
                <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${selectedMember.status === 'Aktif' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                   Status {selectedMember.status}
                </div>
              </div>

              <div className="flex-1 space-y-8 z-10">
                <div>
                  <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tighter uppercase leading-none">{selectedMember.name}</h2>
                  <div className="flex flex-wrap gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-slate-200">
                      Ubah Jabatan
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 border border-red-100 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
                      Tangguhkan
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 pt-8 border-t border-slate-50">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Jabatan Utama</span>
                    <p className="text-sm font-black text-slate-800 uppercase tracking-tight">{selectedMember.jabatan}</p>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">ID Referral</span>
                    <p className="text-sm font-black text-slate-800">{selectedMember.referral}</p>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Dokumen Perjanjian</span>
                    <p className="text-sm font-black text-slate-800">{selectedMember.agreement}</p>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Mitra Agensi</span>
                    <p className="text-sm font-black text-blue-600 uppercase tracking-tight">{selectedMember.agensi}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-slate-300 flex flex-col justify-between relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-500/20 transition-all duration-700" />
               <div className="space-y-8 z-10">
                <div className="flex justify-between items-center">
                  <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10 bg-white/5`}>
                    Level {selectedMember.level}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-400"><TrendingUp size={20} /></div>
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-black tabular-nums tracking-tighter">Rp 0</span>
                    <span className="text-sm font-bold text-slate-500 tracking-tight">/ 150 Jt</span>
                  </div>
                  <div className="h-2.5 bg-white/5 rounded-full overflow-hidden mb-3">
                    <div className="w-1/12 h-full bg-blue-500 rounded-full animate-pulse" />
                  </div>
                  <p className="text-xs font-bold text-slate-400 leading-relaxed uppercase tracking-widest">
                    <span className="text-white">Rp 150.000.000</span> lagi menuju <span className="text-amber-400">Gold</span>
                  </p>
                </div>
              </div>
              <button className="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors z-10 group/btn mt-8">
                Riwayat Upgrade <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-[2.5rem] p-12 border border-slate-100 shadow-sm space-y-10">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Performa & Pencapaian</h3>
              <div className="space-y-8">
                <div className="flex justify-between items-end border-b border-slate-50 pb-4 group">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Cash in Transactions</span>
                    <p className="text-2xl font-black text-slate-900 tracking-tight">Rp 0</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform"><DollarSign size={20} /></div>
                </div>
                <div className="flex justify-between items-end border-b border-slate-50 pb-4 group">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Potensi Akad</span>
                    <p className="text-2xl font-black text-slate-900 tracking-tight">Rp 0</p>
                  </div>
                   <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform"><Rocket size={20} /></div>
                </div>
                <div className="flex justify-between items-end group">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Akumulasi Komisi</span>
                    <p className="text-2xl font-black text-slate-900 tracking-tight">Rp 0</p>
                  </div>
                   <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform"><CreditCard size={20} /></div>
                </div>
              </div>
            </div>

            <div className="bg-blue-600 rounded-[2.5rem] p-12 text-white flex flex-col items-center justify-center text-center space-y-6 shadow-2xl shadow-blue-200 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />
               <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center text-blue-200 mb-2 border border-white/10">
                  <FileText size={40} />
               </div>
               <div>
                 <h4 className="text-xl font-black uppercase tracking-tight mb-2">Detail Rekening Bank</h4>
                 <p className="text-blue-100 text-sm font-medium opacity-80 max-w-[320px] leading-relaxed">
                   Data rekening belum tersedia. Silakan hubungi anggota tim untuk melengkapi informasi pembayaran.
                 </p>
               </div>
               <button className="mt-4 px-8 py-3 bg-white text-blue-600 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-xl">
                 Kirim Permintaan Data
               </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeMenu="Tim" />

      <main className="flex-1 p-8 overflow-hidden">
        <Header title="Manajemen Anggota Tim" />

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
          <div className="flex bg-slate-200/50 p-1 rounded-xl w-fit gap-1">
            {['Semua Sales', 'Sales Propertilogi', 'Sales PA lain'].map(tab => (
              <button 
                key={tab}
                onClick={() => setTopFilter(tab)}
                className={`px-6 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-lg transition-all ${topFilter === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-black transition-all shadow-xl shadow-slate-200">
            <Plus size={20} />
            Tambah Anggota
          </button>
        </div>

        <section className="mb-12">
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-white shadow-lg"><LayoutGrid size={18} /></div>
            <h2 className="text-[11px] font-black text-slate-800 uppercase tracking-[0.3em]">Ringkasan Tim Strategis</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            {teamStats.map((stat, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                    <stat.icon size={24} />
                  </div>
                  <div className="text-3xl font-black text-slate-900 tracking-tighter">{stat.count}</div>
                </div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden mb-10">
          <div className="p-8 flex flex-col lg:flex-row justify-between items-center gap-8 border-b border-slate-50">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
              Daftar Database Tim <span className="ml-4 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black">{filteredMembers.length} Personel</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              <div className="relative flex-1 sm:w-72">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Cari anggota..." 
                  className="w-full pl-12 pr-4 py-3.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative sm:w-56">
                <select 
                  className="w-full pl-4 pr-10 py-3.5 text-[11px] bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer font-black text-slate-600 uppercase tracking-widest"
                  value={jabatanFilter}
                  onChange={(e) => setJabatanFilter(e.target.value)}
                >
                  <option>Semua Jabatan</option>
                  {['MR', 'MO', 'MA Customer', 'MA Under MR', 'MA Under ACO', 'MA PA lain'].map(j => (
                    <option key={j} value={j}>{j}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center w-16">No</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Anggota</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Level</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Nominal CIT</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Agensi</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Referral</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {displayMembers.map((member, idx) => (
                  <tr key={member.id} className="group hover:bg-slate-50/50 transition-all cursor-pointer">
                    <td className="px-8 py-6 text-sm text-slate-300 text-center font-black tabular-nums">{idx + 1}</td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-900 tracking-tight uppercase">{member.name}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${member.status === 'Aktif' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{member.jabatan}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border shadow-sm ${getLevelStyle(member.level)}`}>
                        {member.level}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right text-sm font-black text-blue-600 tabular-nums">
                      {formatCurrency(member.cit)}
                    </td>
                    <td className="px-8 py-6">
                      <span className={`text-[11px] font-black uppercase tracking-widest ${member.agensi === 'Propertilogi' ? 'text-slate-800' : 'text-blue-600'}`}>
                        {member.agensi}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-[11px] font-black text-slate-400 tracking-tighter uppercase">{member.referral}</td>
                    <td className="px-8 py-6 text-right">
                      <button 
                        onClick={() => setSelectedMember(member)}
                        className="px-6 py-2.5 bg-slate-900 hover:bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg shadow-slate-200"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-8 flex flex-col md:flex-row justify-between items-center bg-slate-50/50 gap-6">
            <div className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase">
              Personel 1-10 <span className="mx-2 text-slate-200">|</span> Total {filteredMembers.length} Anggota Terdaftar
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-white transition-all shadow-sm">
                <ChevronLeft size={18} />
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900 text-white font-black text-sm shadow-xl shadow-slate-200">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-white transition-all shadow-sm">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
