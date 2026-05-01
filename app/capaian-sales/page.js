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
  const [modalType, setModalType] = useState(null);
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
      title: 'Rincian Unit Akad',
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
      title: 'Capaian Registrasi Role',
      total: '124 Registrasi',
      unitLabel: 'Registrasi',
      items: [
        { type: 'Memorial Officer', count: 60, percent: '48%' },
        { type: 'Memorial Promotor', count: 40, percent: '32%' },
        { type: 'Memorial Associate', count: 24, percent: '20%' },
      ]
    },
    nup: {
      title: 'Capaian NUP Role',
      total: '86 NUP',
      unitLabel: 'NUP',
      items: [
        { type: 'Memorial Officer', count: 40, percent: '47%' },
        { type: 'Memorial Promotor', count: 30, percent: '35%' },
        { type: 'Memorial Associate', count: 16, percent: '18%' },
      ]
    },
    booking: {
      title: 'Capaian Booking Role',
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

  // Refined Shadow & Rounding
  const cardShadow = "shadow-[0_4px_20px_rgb(0,0,0,0.03)]";
  const cardRound = "rounded-2xl";

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      <Sidebar activeMenu="Capaian Sales" />

      <main className="flex-1 p-6 lg:p-8">
        <Header title="Laporan Performa Sales" />

        {/* Action Header - More Compact */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex bg-slate-200/40 p-1 rounded-xl w-fit gap-1 backdrop-blur-sm">
            {['Semua', 'Kuartal ini', 'Kuartal Sebelumnya'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 text-xs font-bold rounded-lg transition-all duration-300 ${activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-slate-950 transition-all shadow-sm">
            <Download size={16} />
            Export Data
          </button>
        </div>

        {/* Row 1: Primary Metrics - Compact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          <div className={`card-stat bg-white flex flex-col justify-between ${cardShadow} border border-slate-100/50 hover:-translate-y-0.5 transition-all duration-300 p-5 ${cardRound}`}>
            <div className="flex justify-between items-start mb-1">
              <div>
                <div className="text-[11px] font-bold text-slate-400 mb-1 tracking-widest uppercase">Total CIT</div>
                <div className="text-2xl font-bold text-slate-900 tracking-tight">{stats.totalCIT}</div>
              </div>
              <div className="w-10 h-10 flex items-center justify-center bg-amber-50 text-amber-500 rounded-xl shadow-inner">
                <Wallet size={18} />
              </div>
            </div>
            {activeTab !== 'Semua' && (
              <div className="flex items-center gap-2 mt-3 animate-fadeIn">
                <span className="inline-flex items-center justify-center bg-red-50 text-red-600 px-1.5 py-0.5 rounded text-[9px] font-bold border border-red-100">12.5%</span>
                <span className="text-[10px] font-semibold text-slate-400">vs Kuartal Sebelumnya</span>
              </div>
            )}
          </div>

          <div className={`card-stat bg-white flex flex-col justify-between ${cardShadow} border border-slate-100/50 hover:-translate-y-0.5 transition-all duration-300 p-5 ${cardRound}`}>
            <div className="flex justify-between items-start mb-1">
              <div>
                <div className="text-[11px] font-bold text-slate-400 mb-1 tracking-widest uppercase">Total CIR</div>
                <div className="text-2xl font-bold text-slate-900 tracking-tight">{stats.totalCIR}</div>
              </div>
              <div className="w-10 h-10 flex items-center justify-center bg-emerald-50 text-emerald-600 rounded-xl shadow-inner">
                <TrendingUp size={18} />
              </div>
            </div>
            {activeTab !== 'Semua' && (
              <div className="flex items-center gap-2 mt-3 animate-fadeIn">
                <span className="inline-flex items-center justify-center bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded text-[9px] font-bold border border-emerald-100">+8.4%</span>
                <span className="text-[10px] font-semibold text-slate-400">vs Kuartal Sebelumnya</span>
              </div>
            )}
          </div>

          <div className={`card-stat bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none shadow-blue-200/40 relative overflow-hidden flex flex-col justify-between min-h-[130px] hover:-translate-y-0.5 transition-all duration-300 p-5 ${cardRound}`}>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shine_4s_ease-in-out_infinite]" />
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                <div className="text-[11px] font-bold text-white/70 tracking-widest uppercase">Akad Unit</div>
                <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-xl backdrop-blur-md border border-white/10">
                  <Building2 size={18} />
                </div>
              </div>
              <div className="mt-2">
                <div className="text-3xl font-bold tracking-tight">{stats.akadUnit} <span className="text-base font-medium text-white/60 tracking-normal">Akad Selesai</span></div>
                <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center gap-x-5 gap-y-1">
                  <div className="flex items-center gap-1.5">
                    <LineChart size={12} className="text-white/40" />
                    <span className="text-[10px] font-bold tracking-wide uppercase opacity-70">Rerata CIT Akad: <span className="text-white opacity-100">{stats.rerataCIT}</span></span>
                  </div>
                  <button 
                    onClick={() => setModalType('akad')}
                    className="flex items-center gap-1.5 group cursor-pointer hover:bg-white/5 px-1.5 py-0.5 -mx-1.5 rounded transition-all"
                  >
                    <PieChart size={12} className="text-white/40" />
                    <span className="text-[10px] font-bold tracking-wide uppercase opacity-70 underline decoration-white/20 underline-offset-2 group-hover:decoration-white transition-all">Jumlah Unit: {stats.akadUnit} Unit</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Secondary Metrics - Compact */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          {[
            { id: 'registrasi', label: 'Registrasi', value: stats.registrasi, trend: '+14%', icon: Users2, color: 'bg-blue-50 text-blue-600', isUp: true },
            { id: 'nup', label: 'NUP', value: stats.nup, trend: '+5%', icon: FileText, color: 'bg-sky-50 text-sky-600', isUp: true },
            { id: 'booking', label: 'Booking Fee', value: stats.bookingFee, trend: '-2.5%', icon: CreditCard, color: 'bg-indigo-50 text-indigo-600', isUp: false },
            { id: 'akadProsesi', label: 'Akad Prosesi', value: stats.akadProsesi, trend: '+12%', icon: ClipboardCheck, color: 'bg-violet-50 text-violet-600', isUp: true }
          ].map((item, idx) => (
            <div key={idx} className={`card-stat bg-white flex flex-col justify-between min-h-[140px] ${cardShadow} border border-slate-100/50 hover:-translate-y-0.5 transition-all duration-300 p-5 ${cardRound}`}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[11px] font-bold text-slate-400 mb-1 tracking-widest uppercase">{item.label}</div>
                  <div className="text-2xl font-bold text-slate-900 tracking-tight">{item.value}</div>
                </div>
                <div className="flex flex-col items-end gap-2.5">
                  <div className={`w-9 h-9 flex items-center justify-center rounded-xl ${item.color} shadow-sm`}>
                    <item.icon size={18} />
                  </div>
                  {item.id !== 'akadProsesi' && (
                    <button 
                      onClick={() => setModalType(item.id)}
                      className="w-7 h-7 flex items-center justify-center bg-slate-50 text-blue-600 rounded-lg border border-slate-100 hover:bg-blue-600 hover:text-white transition-all shadow-sm group"
                    >
                      <Eye size={14} className="group-hover:scale-110 transition-transform" />
                    </button>
                  )}
                </div>
              </div>
              <div className="mt-auto">
                {activeTab !== 'Semua' && (
                  <div className="flex items-center gap-1.5 animate-fadeIn">
                    <span className={`inline-flex items-center justify-center ${item.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'} px-1.5 py-0.5 rounded text-[9px] font-bold`}>{item.trend}</span>
                    <span className="text-[10px] font-semibold text-slate-400">vs Kuartal Sebelumnya</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Table Container - Compact & Classy */}
        <div className={`bg-white ${cardRound} ${cardShadow} border border-slate-100/50 overflow-hidden`}>
          <div className="px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-slate-50">
            <h2 className="text-lg font-bold text-slate-800 tracking-tight flex items-center gap-2">
              Daftar Penjualan
              <span className="bg-slate-100 text-slate-500 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-widest">{activeTab}</span>
            </h2>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Cari data pelanggan..." 
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50/80 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all placeholder:text-slate-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-12 text-center">#</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Customer & NUP</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Unit Properti</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Detail Finansial</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Timeline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50/60">
                {salesData.map((row, idx) => (
                  <React.Fragment key={row.id}>
                    <tr className={`table-row-main group hover:bg-slate-50/50 transition-colors cursor-pointer ${expandedRowId === row.id ? 'bg-blue-50/20' : ''}`} onClick={() => setExpandedRowId(expandedRowId === row.id ? null : row.id)}>
                      <td className="px-6 py-4 text-xs text-slate-300 text-center font-bold">
                        {idx + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-800 tracking-tight">{row.customer}</span>
                          <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">{row.nup}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col items-start gap-1.5">
                          <div className="flex flex-wrap gap-1.5">
                            {row.units.slice(0, 2).map((unit, uIdx) => (
                              <span key={uIdx} className="px-2 py-0.5 text-[9px] font-bold bg-blue-50 text-blue-600 border border-blue-100 rounded shadow-sm">{unit}</span>
                            ))}
                            {row.units.length > 2 && (
                              <span className="px-1.5 py-0.5 text-[9px] font-bold bg-slate-100 text-slate-500 border border-slate-200 rounded">+{row.units.length - 2}</span>
                            )}
                          </div>
                          {row.units.length > 2 && (
                            <button 
                              onClick={(e) => { e.stopPropagation(); setUnitModalCustomer(row); }}
                              className="text-[9px] font-bold text-blue-500 hover:underline flex items-center gap-1"
                            >
                              Lihat unit <ExternalLink size={10} />
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex flex-col gap-0.5">
                          <div className="flex flex-col items-end">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter block leading-none mb-0.5">Pembelian</span>
                            <span className="text-sm font-bold text-slate-900 tracking-tight leading-tight">{row.nominal}</span>
                          </div>
                          <span className="text-[10px] font-bold text-blue-600 tracking-tight leading-tight">Komisi: {row.commission}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                           <Calendar size={13} className="text-slate-300" />
                           {row.date}
                        </div>
                      </td>
                    </tr>
                    {expandedRowId === row.id && (
                      <tr className="bg-slate-50/30 border-b border-slate-100/50 animate-fadeIn">
                        <td colSpan="5" className="px-10 py-8">
                          <div className="flex items-center gap-2 mb-6">
                            <Rocket size={16} className="text-blue-500" />
                            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Milestone Sales</span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {row.steps.length > 0 ? row.steps.map((step, sIdx) => (
                              <div key={sIdx} className="bg-white border border-slate-100 p-4 rounded-xl flex flex-col gap-4 shadow-sm hover:shadow-md transition-all border-l-4 border-l-blue-500">
                                <div className="flex justify-between items-center">
                                  <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[9px] font-bold rounded uppercase tracking-wider">{step.label}</span>
                                  <span className="text-xs font-bold text-slate-900">{step.value}</span>
                                </div>
                                <div className="flex items-center gap-3 pt-2 border-t border-slate-50">
                                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-[10px] font-bold text-slate-400 shadow-inner">{step.user.charAt(0)}</div>
                                  <div className="flex flex-col">
                                    <span className="text-xs font-bold text-slate-700">{step.user}</span>
                                    <span className="text-[9px] text-slate-400 font-bold tracking-tight">{step.date}</span>
                                  </div>
                                </div>
                              </div>
                            )) : (
                              <div className="col-span-3 flex items-center gap-3 text-slate-400 italic bg-white/50 px-6 py-6 rounded-xl border border-dashed border-slate-200 justify-center">
                                <span className="text-xs font-medium tracking-tight">Data milestone belum dikalkulasi</span>
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

          <div className="px-6 py-5 flex flex-col md:flex-row justify-between items-center bg-slate-50/30 gap-4 border-t border-slate-50">
            <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Showing {salesData.length} entries</div>
            <div className="flex gap-1.5">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-white transition-all"><ChevronLeft size={16} /></button>
              {[1, 2, 3].map(page => (
                <button key={page} className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold text-xs transition-all ${page === 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'border border-slate-200 text-slate-400 hover:bg-white'}`}>{page}</button>
              ))}
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-white transition-all"><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
      </main>

      {/* Breakdown Modal - More Compact */}
      {modalType && currentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-md transition-opacity animate-fadeIn" onClick={() => setModalType(null)} />
          <div className="bg-white w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden relative animate-fadeIn border border-white/20">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">{currentModal.title}</h3>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Total: {currentModal.total}</span>
                </div>
                <button onClick={() => setModalType(null)} className="w-9 h-9 flex items-center justify-center bg-slate-50 text-slate-400 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all shadow-sm"><X size={20} /></button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {currentModal.items.map((item, idx) => (
                  <div key={idx} className="group flex flex-col gap-3 p-4 bg-slate-50/50 border border-slate-100 rounded-2xl hover:bg-white hover:shadow-md transition-all">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-700 tracking-tight text-sm">{item.type}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-base font-bold text-blue-600">{item.count}</span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{currentModal.unitLabel}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out" style={{ width: item.percent }} />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-600 transition-colors w-10 text-right">{item.percent}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Unit Detail Modal - More Compact */}
      {unitModalCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-md transition-opacity animate-fadeIn" onClick={() => setUnitModalCustomer(null)} />
          <div className="bg-white w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden relative animate-fadeIn border border-white/20">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">Daftar Unit</h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{unitModalCustomer.customer}</span>
                </div>
                <button onClick={() => setUnitModalCustomer(null)} className="w-8 h-8 flex items-center justify-center bg-slate-50 text-slate-400 rounded-lg hover:bg-red-50 hover:text-red-500 transition-all"><X size={18} /></button>
              </div>
              <div className="flex flex-col gap-2">
                <div className="bg-blue-50 text-blue-600 px-4 py-3 rounded-xl text-[11px] font-bold flex justify-between items-center mb-1">
                  <span>Total Properti</span>
                  <span>{unitModalCustomer.units.length} Unit</span>
                </div>
                {unitModalCustomer.units.map((unit, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3.5 bg-slate-50 border border-slate-100 rounded-xl hover:bg-white hover:shadow-sm transition-all">
                    <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">{idx + 1}</span>
                    <span className="text-xs font-bold text-slate-700 tracking-tight">{unit}</span>
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
