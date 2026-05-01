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
  AlertCircle
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
    { label: 'Memorial Representative', count: 10, icon: UserCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Marketing Officer', count: 3, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Memorial Associate', count: 479, icon: Users2, color: 'text-sky-600', bg: 'bg-sky-50' },
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
    // Top Level Filter
    if (topFilter === 'Sales Propertilogi') {
      if (member.agensi !== 'Propertilogi') return false;
    } else if (topFilter === 'Sales PA lain') {
      if (member.agensi === 'Propertilogi' || !member.jabatan.includes('MA')) return false;
    }

    // Jabatan Filter
    if (jabatanFilter !== 'Semua Jabatan') {
      if (member.jabatan !== jabatanFilter) return false;
    }

    // Search Filter
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
        <main className="flex-1 p-8">
          <div className="flex items-center gap-4 mb-8">
            <button 
              onClick={() => setSelectedMember(null)}
              className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 transition-all shadow-sm"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">Detail Anggota Tim</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Profile Card */}
            <div className="lg:col-span-2 bg-white rounded-[2rem] p-10 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-10">
              <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 relative overflow-hidden">
                  <UserCircle size={100} strokeWidth={1} />
                </div>
                <div className={`text-xs font-bold ${selectedMember.status === 'Aktif' ? 'text-emerald-500' : 'text-red-500'}`}>
                   Status {selectedMember.status}
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <div>
                  <h2 className="text-3xl font-semibold text-slate-900 mb-6 tracking-tight">{selectedMember.name}</h2>
                  <div className="flex flex-wrap gap-3 mb-8">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-white rounded-xl text-xs font-bold hover:bg-amber-600 transition-all shadow-sm">
                      <Briefcase size={16} />
                      Ubah Jabatan
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-xl text-xs font-bold hover:bg-red-600 transition-all shadow-sm">
                      <AlertCircle size={16} />
                      Tangguhkan Sales
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 pt-6 border-t border-slate-50">
                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Jabatan</span>
                    <p className="text-sm font-semibold text-slate-700">{selectedMember.jabatan}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Kode Referral</span>
                    <p className="text-sm font-semibold text-slate-700">{selectedMember.referral}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Surat Perjanjian</span>
                    <p className="text-sm font-semibold text-slate-700">{selectedMember.agreement}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Properti Agensi</span>
                    <p className="text-sm font-semibold text-indigo-600">{selectedMember.agensi}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Level Card */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider border ${getLevelStyle(selectedMember.level)}`}>
                    Level {selectedMember.level}
                  </span>
                  <Info size={18} className="text-slate-400" />
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-slate-900">Rp 0</span>
                    <span className="text-sm font-semibold text-slate-400">/Rp 150.000.000</span>
                  </div>
                  <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-0 h-full bg-blue-500 rounded-full" />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-[10px] font-bold text-slate-300">0%</span>
                  </div>
                </div>
                <p className="text-xs font-medium text-slate-500 leading-relaxed">
                  Capai <span className="font-bold text-slate-800">Rp 150.000.000</span> lagi untuk naik ke Level <span className="font-bold text-slate-800">Gold</span>
                </p>
              </div>
              <button className="text-xs font-bold text-blue-600 flex items-center gap-2 hover:text-blue-700 transition-colors mt-6">
                Lihat Riwayat Level <ExternalLink size={14} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Target Card */}
            <div className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-sm space-y-8">
              <h3 className="text-lg font-semibold text-slate-800">Target dan Pencapaian</h3>
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-xs font-medium text-slate-400">Total Cash in Transactions</span>
                  <p className="text-lg font-bold text-slate-900">Rp 0</p>
                  <div className="h-px bg-slate-50 w-full" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-medium text-slate-400">Total Potensi</span>
                  <p className="text-lg font-bold text-slate-900">Rp 0</p>
                  <div className="h-px bg-slate-50 w-full" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-medium text-slate-400">Total Komisi</span>
                  <p className="text-lg font-bold text-slate-900">Rp 0</p>
                </div>
              </div>
            </div>

            {/* Banking Card */}
            <div className="bg-blue-50/50 rounded-[2rem] p-10 border border-blue-100/50 flex flex-col items-center justify-center text-center space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 self-start mb-4">Detail Rekening</h3>
              <div className="flex flex-col items-center justify-center py-6">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-blue-200 mb-4 shadow-sm">
                  <FileText size={32} />
                </div>
                <h4 className="text-sm font-bold text-slate-700 mb-1">Rekening Belum Ada</h4>
                <p className="text-xs text-slate-500 max-w-[280px] leading-relaxed">
                  Silakan hubungi anggota tim Anda untuk menambahkan detail rekening guna melengkapi data.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeMenu="Tim" />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Header title="Manajemen Anggota Tim" />

        {/* Top Filter Tabs & Action */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex bg-slate-200/50 p-1 rounded-xl w-fit gap-1">
            {['Semua Sales', 'Sales Propertilogi', 'Sales PA lain'].map(tab => (
              <button 
                key={tab}
                onClick={() => setTopFilter(tab)}
                className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all ${topFilter === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-blue-500 transition-all shadow-md shadow-blue-100">
            <Plus size={18} />
            Tambah Anggota
          </button>
        </div>

        {/* Team Summary Section */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-6 px-1">
            <LayoutGrid size={18} className="text-slate-400" />
            <h2 className="text-base font-semibold text-slate-800 tracking-tight">Ringkasan Tim Aktif</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {teamStats.map((stat, idx) => (
              <div key={idx} className="card-stat bg-white flex flex-col justify-between min-h-[120px] p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-default">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1 leading-tight">
                      {stat.label}
                    </div>
                    <div className="text-3xl font-bold text-slate-900 tracking-tight">{stat.count}</div>
                  </div>
                  <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}>
                    <stat.icon size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Table Container */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-slate-50">
            <h2 className="text-lg font-semibold text-slate-800">
              Daftar Anggota <span className="ml-2 px-2.5 py-0.5 bg-slate-100 text-slate-500 rounded-full text-xs font-bold">{filteredMembers.length}</span>
            </h2>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Cari anggota atau agensi..." 
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative">
                <select 
                  className="pl-4 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer font-semibold text-slate-600"
                  value={jabatanFilter}
                  onChange={(e) => setJabatanFilter(e.target.value)}
                >
                  <option>Semua Jabatan</option>
                  {['MR', 'MO', 'MA Customer', 'MA Under MR', 'MA Under ACO', 'MA PA lain'].map(j => (
                    <option key={j} value={j}>{j}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/40">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-semibold text-slate-400 uppercase tracking-widest text-center w-16">No</th>
                  <th className="px-6 py-4 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Nama Lengkap</th>
                  <th className="px-6 py-4 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Level</th>
                  <th className="px-6 py-4 text-[10px] font-semibold text-slate-400 uppercase tracking-widest text-right">Nominal CIT</th>
                  <th className="px-6 py-4 text-[10px] font-semibold text-slate-400 uppercase tracking-widest text-center">Jabatan</th>
                  <th className="px-6 py-4 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Properti Agensi</th>
                  <th className="px-6 py-4 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Referral</th>
                  <th className="px-6 py-4 text-[10px] font-semibold text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {displayMembers.map((member, idx) => (
                  <tr key={member.id} className="table-row-main group hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-5 text-sm text-slate-400 text-center font-medium">{idx + 1}</td>
                    <td className="px-6 py-5">
                      <div className="text-sm font-semibold text-slate-800">{member.name}</div>
                      <div className={`text-[10px] font-semibold mt-0.5 ${member.status === 'Aktif' ? 'text-emerald-500' : 'text-red-500'}`}>
                        {member.status}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider border ${getLevelStyle(member.level)}`}>
                        {member.level}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right text-sm font-semibold text-blue-600 tabular-nums">
                      {formatCurrency(member.cit)}
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="text-[10px] font-semibold text-slate-500">
                        {member.jabatan}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`text-xs font-semibold ${member.agensi === 'Propertilogi' ? 'text-slate-700' : 'text-indigo-600'}`}>
                        {member.agensi}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-xs font-semibold text-slate-400 tracking-tight">{member.referral}</td>
                    <td className="px-6 py-5 text-right">
                      <button 
                        onClick={() => setSelectedMember(member)}
                        className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white text-[10px] font-bold rounded-xl transition-all shadow-sm"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 flex flex-col md:flex-row justify-between items-center bg-slate-50/30 gap-4">
            <div className="text-[11px] font-semibold text-slate-400 tracking-widest uppercase">
              Menampilkan {displayMembers.length} dari {filteredMembers.length} Sales
            </div>
            <div className="flex gap-1.5">
              <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-white transition-all shadow-sm">
                <ChevronLeft size={16} />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-600 text-white font-semibold text-xs shadow-md shadow-blue-100">1</button>
              <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 font-semibold text-xs hover:bg-white transition-all shadow-sm">2</button>
              <div className="px-2 flex items-center text-slate-300 text-xs font-bold">...</div>
              <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-white transition-all shadow-sm">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Internal component for dropdown icon
function ChevronDown({ className, size }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m6 9 6 6 6-6"/>
    </svg>
  );
}
