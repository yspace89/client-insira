"use client";

import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  ChevronUp,
  Download,
  Wallet,
  TrendingUp,
  LineChart,
  Users2,
  FileText,
  CreditCard,
  Calendar,
  Building2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Rocket,
  X,
  PieChart,
  ExternalLink,
  Eye,
  Info
} from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

export default function CapaianSales() {
  const [activeTab, setActiveTab] = useState('Kuartal ini');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRowId, setExpandedRowId] = useState(1);
  const [modalType, setModalType] = useState(null); // 'akad', 'registrasi', 'nup', 'booking'
  const [unitModalCustomer, setUnitModalCustomer] = useState(null);

  // Realistic Data
  const stats = {
    totalCIT: "Rp 12.450.000.000",
    totalCIR: "Rp 8.120.000.000",
    rerataCIT: "Rp 249.000.000",
    akadUnit: 50,
    registrasi: 124,
    nup: 86,
    bookingFee: 62,
    akadProsesi: 12
  };

  const dataMap = {
    akad: {
      title: 'Rincian Unit yang Sudah Akad',
      total: '50 Unit',
      unitLabel: 'Unit',
      items: [
        { type: 'Single', count: 10, percent: '20%' },
        { type: 'Single Premiere', count: 10, percent: '20%' },
        { type: 'Couple', count: 10, percent: '20%' },
        { type: 'Couple Premiere', count: 10, percent: '20%' },
        { type: 'Family', count: 5, percent: '10%' },
        { type: 'Family Signature', count: 5, percent: '10%' },
      ]
    },
    registrasi: {
      title: 'Capaian Registrasi Masing-Masing Role',
      total: '124 Registrasi',
      unitLabel: 'Registrasi',
      items: [
        { type: 'Memorial Officer', count: 60, percent: '48%' },
        { type: 'Memorial Promotor', count: 40, percent: '32%' },
        { type: 'Memorial Associate', count: 24, percent: '20%' },
      ]
    },
    nup: {
      title: 'Capaian NUP Masing-Masing Role',
      total: '86 NUP',
      unitLabel: 'NUP',
      items: [
        { type: 'Memorial Officer', count: 40, percent: '47%' },
        { type: 'Memorial Promotor', count: 30, percent: '35%' },
        { type: 'Memorial Associate', count: 16, percent: '18%' },
      ]
    },
    booking: {
      title: 'Capaian Booking Fee Masing-Masing Role',
      total: '62 Booking Fee',
      unitLabel: 'Booking Fee',
      items: [
        { type: 'Memorial Officer', count: 30, percent: '48%' },
        { type: 'Memorial Promotor', count: 20, percent: '32%' },
        { type: 'Memorial Associate', count: 12, percent: '20%' },
      ]
    }
  };

  const salesData = [
    { id: 1, customer: 'Sapto Pratolo', nup: 'INS-0326039', units: ['A15-20 - Single Premiere', 'B12-05 - Couple', 'C01-10 - Family', 'D02-04 - Single'], nominal: 'Rp 1.119.500.000', commission: 'Rp 76.644.893', date: '23 Apr 2026', steps: [{ label: 'Daftar', percent: '1.45%', value: 'Rp 1.627.590', user: 'Zulkipli Nasution', date: '28 Mar 2026' }, { label: 'NUP', percent: '2.675%', value: 'Rp 2.441.385', user: 'Zulkipli Nasution', date: '28 Mar 2026' }, { label: 'Booking Fee', percent: '3.125%', value: 'Rp 3.575.918', user: 'Zulkipli Nasution', date: '28 Mar 2026' }] },
    { id: 2, customer: 'Drs. Suro Jouhari, MM', nup: 'INS-0326038', units: ['A17-17 - Single'], nominal: 'Rp 39.800.000', commission: 'Rp 2.662.620', date: '06 Apr 2026', steps: [] },
    { id: 3, customer: 'Harum Kusumawati', nup: 'INS-0326037', units: ['B10-128 - Single'], nominal: 'Rp 39.800.000', commission: 'Rp 4.636.700', date: '22 Apr 2026', steps: [] },
    { id: 4, customer: 'Hartanti Desmuti, SE', nup: 'INS-0326035', units: ['A19-84 - Single', 'B05-12 - Single', 'C02-01 - Couple'], nominal: 'Rp 169.600.000', commission: 'Rp 18.108.400', date: '30 Apr 2026', steps: [] },
    { id: 5, customer: 'Bambang Sudarmanto', nup: 'INS-0326034', units: ['C12-45 - Couple'], nominal: 'Rp 150.000.000', commission: 'Rp 12.000.000', date: '24 Apr 2026', steps: [] },
    { id: 6, customer: 'Siti Rahmawati', nup: 'INS-0326033', units: ['A05-12 - Single', 'A05-13 - Single'], nominal: 'Rp 85.000.000', commission: 'Rp 8.400.000', date: '25 Apr 2026', steps: [] },
    { id: 7, customer: 'Andi Wijaya', nup: 'INS-0326032', units: ['D08-90 - Family'], nominal: 'Rp 280.000.000', commission: 'Rp 22.400.000', date: '26 Apr 2026', steps: [] },
    { id: 8, customer: 'Rina Marlina', nup: 'INS-0326031', units: ['B15-67 - Single Premiere'], nominal: 'Rp 125.000.000', commission: 'Rp 10.000.000', date: '27 Apr 2026', steps: [] },
    { id: 9, customer: 'Eko Prasetyo', nup: 'INS-0326030', units: ['C10-102 - Couple Premiere'], nominal: 'Rp 185.000.000', commission: 'Rp 14.800.000', date: '28 Apr 2026', steps: [] },
    { id: 10, customer: 'Lestari Wahyuni', nup: 'INS-0326029', units: ['E01-01 - Family Signature'], nominal: 'Rp 450.000.000', commission: 'Rp 36.000.000', date: '29 Apr 2026', steps: [] }
  ];

  const currentModal = modalType ? dataMap[modalType] : null;

  // Custom Shadow Styling
  const cardShadow = "shadow-[0_8px_30px_rgb(0,0,0,0.04)]";

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      <Sidebar activeMenu="Capaian Sales" />

      <main className="flex-1 p-8">
        <Header title="Laporan Performa Sales" />

        {/* Action Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex bg-slate-200/50 p-1.5 rounded-2xl w-fit gap-1 backdrop-blur-sm shadow-inner">
            {['Semua', 'Kuartal ini', 'Kuartal Sebelumnya'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${activeTab === tab ? 'bg-white text-blue-600 shadow-md scale-[1.02]' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 hover:bg-slate-950 hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-sm">
            <Download size={18} />
            Export Data
          </button>
        </div>

        {/* Row 1: Primary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className={`card-stat bg-white flex flex-col justify-between ${cardShadow} border-slate-100/50 hover:-translate-y-1 transition-all duration-300 p-6 rounded-[2rem]`}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="text-[13px] font-medium text-slate-400 mb-1 tracking-wide uppercase">Total CIT</div>
                <div className="text-3xl font-bold text-slate-900 tracking-tighter">{stats.totalCIT}</div>
              </div>
              <div className="w-12 h-12 flex items-center justify-center bg-amber-50 text-amber-500 rounded-2xl shadow-inner">
                <Wallet size={22} />
              </div>
            </div>
            {activeTab !== 'Semua' && (
              <div className="flex items-center gap-2 mt-4 animate-fadeIn">
                <span className="inline-flex items-center justify-center bg-red-50 text-red-600 px-2 py-0.5 rounded-lg text-[10px] font-bold border border-red-100">12.5%</span>
                <span className="text-[11px] font-medium text-slate-400">vs Kuartal Sebelumnya</span>
              </div>
            )}
          </div>

          <div className={`card-stat bg-white flex flex-col justify-between ${cardShadow} border-slate-100/50 hover:-translate-y-1 transition-all duration-300 p-6 rounded-[2rem]`}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="text-[13px] font-medium text-slate-400 mb-1 tracking-wide uppercase">Total CIR</div>
                <div className="text-3xl font-bold text-slate-900 tracking-tighter">{stats.totalCIR}</div>
              </div>
              <div className="w-12 h-12 flex items-center justify-center bg-emerald-50 text-emerald-600 rounded-2xl shadow-inner">
                <TrendingUp size={22} />
              </div>
            </div>
            {activeTab !== 'Semua' && (
              <div className="flex items-center gap-2 mt-4 animate-fadeIn">
                <span className="inline-flex items-center justify-center bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-lg text-[10px] font-bold border border-emerald-100">+8.4%</span>
                <span className="text-[11px] font-medium text-slate-400">vs Kuartal Sebelumnya</span>
              </div>
            )}
          </div>

          {/* Card 3: Akad Unit (Gradient Mesh) */}
          <div className={`card-stat bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white border-none shadow-blue-200/50 relative overflow-hidden flex flex-col justify-between min-h-[140px] hover:-translate-y-1 transition-all duration-300 p-6 rounded-[2rem]`}>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shine_3s_ease-in-out_infinite]" />
            <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                <div className="text-base font-bold text-white/90 tracking-tight">Akad Unit</div>
                <div className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
                  <Building2 size={22} />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-4xl font-bold tracking-tight">{stats.akadUnit} <span className="text-xl font-medium text-white/70">Akad Selesai</span></div>
                <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center gap-x-6 gap-y-2">
                  <div className="flex items-center gap-2">
                    <LineChart size={14} className="text-white/60" />
                    <span className="text-[11px] font-semibold tracking-wide uppercase opacity-80">Rerata CIT Akad: <span className="font-bold text-white opacity-100">{stats.rerataCIT}</span></span>
                  </div>
                  <button 
                    onClick={() => setModalType('akad')}
                    className="flex items-center gap-2 group cursor-pointer hover:bg-white/10 px-2 py-1 -mx-2 rounded-lg transition-all"
                  >
                    <PieChart size={14} className="text-white/60" />
                    <span className="text-[11px] font-semibold tracking-wide uppercase opacity-80 underline decoration-white/20 underline-offset-4 group-hover:decoration-white transition-all">Jumlah Unit: <span className="font-bold text-white opacity-100">{stats.akadUnit} Unit</span></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {[
            { id: 'registrasi', label: 'Registrasi', value: stats.registrasi, trend: '+14%', icon: Users2, color: 'bg-blue-50 text-blue-600', isUp: true },
            { id: 'nup', label: 'NUP', value: stats.nup, trend: '+5%', icon: FileText, color: 'bg-sky-50 text-sky-600', isUp: true },
            { id: 'booking', label: 'Booking Fee', value: stats.bookingFee, trend: '-2.5%', icon: CreditCard, color: 'bg-indigo-50 text-indigo-600', isUp: false },
            { id: 'akadProsesi', label: 'Akad Prosesi', value: stats.akadProsesi, trend: '+12%', icon: ClipboardCheck, color: 'bg-violet-50 text-violet-600', isUp: true }
          ].map((item, idx) => (
            <div key={idx} className={`card-stat bg-white flex flex-col justify-between min-h-[160px] ${cardShadow} border-slate-100/50 hover:-translate-y-1 transition-all duration-300 p-6 rounded-[2rem]`}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[13px] font-medium text-slate-400 mb-1 tracking-wide uppercase">{item.label}</div>
                  <div className="text-3xl font-bold text-slate-900 tracking-tighter">{item.value}</div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <div className={`w-11 h-11 flex items-center justify-center rounded-2xl ${item.color} shadow-sm`}>
                    <item.icon size={20} />
                  </div>
                  {item.id !== 'akadProsesi' && (
                    <button 
                      onClick={() => setModalType(item.id)}
                      className="w-9 h-9 flex items-center justify-center bg-slate-50 text-blue-600 rounded-xl border border-slate-100 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm group"
                      title="Lihat rincian"
                    >
                      <Eye size={16} className="group-hover:scale-110 transition-transform" />
                    </button>
                  )}
                </div>
              </div>
              <div className="mt-auto pt-4">
                {activeTab !== 'Semua' && (
                  <div className="flex items-center gap-1.5 animate-fadeIn">
                    <span className={`inline-flex items-center justify-center ${item.isUp ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'} px-2 py-0.5 rounded-lg text-[10px] font-bold border`}>{item.trend}</span>
                    <span className="text-[11px] font-medium text-slate-400">vs Kuartal Sebelumnya</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Table Container */}
        <div className={`bg-white rounded-[2rem] ${cardShadow} border border-slate-100/50 overflow-hidden`}>
          <div className="p-8 flex flex-col md:flex-row justify-between items-center gap-6 border-b border-slate-50">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
              Daftar Penjualan
              <span className="bg-slate-100 text-slate-500 text-[10px] px-2 py-1 rounded-lg uppercase tracking-widest">{activeTab}</span>
            </h2>
            <div className="relative w-full md:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Cari data pelanggan atau NUP..." 
                className="w-full pl-12 pr-6 py-3.5 text-sm bg-slate-50/80 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all placeholder:text-slate-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/50 border-b border-slate-100">
                <tr>
                  <th className="px-8 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest w-16 text-center">No</th>
                  <th className="px-8 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Informasi Pelanggan</th>
                  <th className="px-8 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Unit Properti</th>
                  <th className="px-8 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-right">Detail Finansial</th>
                  <th className="px-8 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Tanggal Approval</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {salesData.map((row, idx) => (
                  <React.Fragment key={row.id}>
                    <tr className={`table-row-main group hover:bg-slate-50/80 transition-colors cursor-pointer ${expandedRowId === row.id ? 'bg-blue-50/30' : ''}`} onClick={() => setExpandedRowId(expandedRowId === row.id ? null : row.id)}>
                      <td className="px-8 py-6 text-sm text-slate-400 text-center font-medium">
                        <div className="flex items-center justify-center gap-3">
                          {expandedRowId === row.id ? <ChevronUp size={14} className="text-blue-600" /> : <ChevronDown size={14} className="group-hover:text-slate-600" />}
                          {idx + 1}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-bold text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">{row.customer}</span>
                          <span className="text-[11px] font-medium text-slate-400 tracking-wider uppercase">{row.nup}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col items-start gap-2">
                          <div className="flex flex-wrap gap-2">
                            {row.units.slice(0, 2).map((unit, uIdx) => (
                              <span key={uIdx} className="px-2.5 py-1 text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100 rounded-lg whitespace-nowrap">{unit}</span>
                            ))}
                            {row.units.length > 2 && (
                              <span className="px-2 py-1 text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200 rounded-lg">+{row.units.length - 2}</span>
                            )}
                          </div>
                          {row.units.length > 2 && (
                            <button 
                              onClick={(e) => { e.stopPropagation(); setUnitModalCustomer(row); }}
                              className="text-[10px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                            >
                              Lihat unit <ExternalLink size={10} />
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-bold text-slate-900 tracking-tight">{row.nominal}</span>
                          <span className="text-[11px] font-bold text-blue-600 tracking-wide uppercase">Komisi: {row.commission}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                           <Calendar size={14} className="text-slate-300" />
                           {row.date}
                        </div>
                      </td>
                    </tr>
                    {expandedRowId === row.id && (
                      <tr className="bg-white/80 border-b border-slate-100 animate-fadeIn">
                        <td colSpan="5" className="px-12 py-10">
                          <div className="flex items-center gap-2 mb-8 text-blue-600">
                            <Rocket size={18} />
                            <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-slate-500">Sales Milestone Tracking</span>
                          </div>
                          <div className="flex flex-wrap gap-10">
                            {row.steps.length > 0 ? row.steps.map((step, sIdx) => (
                              <div key={sIdx} className="flex-1 min-w-[280px] bg-white border border-slate-100 p-6 rounded-[1.5rem] flex flex-col gap-5 shadow-sm hover:shadow-md transition-all border-l-4 border-l-blue-500">
                                <div className="flex justify-between items-center">
                                  <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-lg uppercase tracking-wider">{step.label} ({step.percent})</span>
                                  <span className="text-sm font-bold text-slate-900">{step.value}</span>
                                </div>
                                <div className="flex items-center gap-4 pt-2 border-t border-slate-50">
                                  <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 shadow-inner">{step.user.charAt(0)}</div>
                                  <div className="flex flex-col">
                                    <span className="text-[13px] font-bold text-slate-700">{step.user}</span>
                                    <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">{step.date}</span>
                                  </div>
                                </div>
                              </div>
                            )) : (
                              <div className="flex items-center gap-3 text-slate-400 italic bg-slate-50 px-8 py-10 rounded-[1.5rem] border border-dashed border-slate-200 w-full justify-center">
                                <Info size={20} />
                                <span className="text-sm font-medium tracking-wide">Data milestone komisi belum dikalkulasi untuk periode ini</span>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-8 flex flex-col md:flex-row justify-between items-center bg-slate-50/50 gap-6">
            <div className="text-[11px] font-bold text-slate-400 tracking-[0.1em] uppercase">Showing {salesData.length} entries of total performance</div>
            <div className="flex gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-white hover:text-blue-600 hover:shadow-md transition-all"><ChevronLeft size={18} /></button>
              {[1, 2, 3].map(page => (
                <button key={page} className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm transition-all ${page === 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110' : 'border border-slate-200 text-slate-500 hover:bg-white hover:shadow-sm'}`}>{page}</button>
              ))}
              <div className="px-3 flex items-center text-slate-300">...</div>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-white hover:text-blue-600 hover:shadow-md transition-all"><ChevronRight size={18} /></button>
            </div>
          </div>
        </div>
      </main>

      {/* Dynamic Breakdown Modal */}
      {modalType && currentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[20px] transition-opacity animate-fadeIn" onClick={() => setModalType(null)} />
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden relative animate-fadeIn border border-white/20">
            <div className="p-10 lg:p-14">
              <div className="flex justify-between items-center mb-10">
                <div className="flex flex-col gap-2">
                  <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{currentModal.title}</h3>
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-1.5 bg-blue-50 text-blue-700 text-[11px] font-bold rounded-full border border-blue-100 shadow-sm">Total: {currentModal.total}</span>
                  </div>
                </div>
                <button onClick={() => setModalType(null)} className="w-12 h-12 flex items-center justify-center bg-slate-50 text-slate-400 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all shadow-sm"><X size={24} /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentModal.items.map((item, idx) => (
                  <div key={idx} className="group flex flex-col gap-4 p-6 bg-slate-50/50 border border-slate-100 rounded-3xl hover:border-blue-200 hover:bg-white hover:shadow-md transition-all duration-300">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-700 tracking-tight text-lg">{item.type}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-blue-600">{item.count}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{currentModal.unitLabel}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-5">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out shadow-sm" style={{ width: item.percent }} />
                      </div>
                      <span className="text-xs font-bold text-slate-500 group-hover:text-blue-600 transition-colors w-12 text-right">{item.percent}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customer Unit Detail Modal */}
      {unitModalCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[20px] transition-opacity animate-fadeIn" onClick={() => setUnitModalCustomer(null)} />
          <div className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden relative animate-fadeIn border border-white/20">
            <div className="p-10 lg:p-14">
              <div className="flex justify-between items-center mb-10">
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Daftar Unit Pelanggan</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-500">{unitModalCustomer.customer}</span>
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{unitModalCustomer.nup}</span>
                  </div>
                </div>
                <button onClick={() => setUnitModalCustomer(null)} className="w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-400 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all shadow-sm"><X size={20} /></button>
              </div>
              <div className="flex flex-col gap-3">
                <div className="bg-blue-50 text-blue-600 px-6 py-4 rounded-2xl text-sm font-bold flex justify-between items-center mb-2">
                  <span>Total Properti</span>
                  <span className="bg-white px-3 py-1 rounded-xl shadow-sm text-blue-700">{unitModalCustomer.units.length} Unit</span>
                </div>
                {unitModalCustomer.units.map((unit, idx) => (
                  <div key={idx} className="flex items-center justify-between p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:shadow-sm transition-all border-l-4 border-l-blue-500">
                    <div className="flex items-center gap-4">
                      <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                      <span className="font-bold text-slate-700 tracking-tight">{unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
