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
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Rocket,
  X,
  PieChart,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

export default function CapaianSales() {
  const [activeTab, setActiveTab] = useState('Kuartal ini');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRowId, setExpandedRowId] = useState(1);
  const [modalType, setModalType] = useState(null); 

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
      title: 'Rincian Unit Sudah Akad',
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
      title: 'Capaian Booking Fee Role',
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
    {
      id: 1,
      customer: 'Sapto Pratolo',
      nup: 'INS-0326039',
      unit: 'A15 - 20 - Single Premiere',
      extraUnits: 4,
      nominal: 'Rp 119.500.000',
      commission: 'Rp 7.644.893',
      date: 'Kamis, 23 April 2026',
      steps: [
        { label: 'Daftar', percent: '1.45%', value: 'Rp 1.627.590', user: 'Zulkipli Nasution', date: '28 Mar 2026' },
        { label: 'NUP', percent: '2.675%', value: 'Rp 2.441.385', user: 'Zulkipli Nasution', date: '28 Mar 2026' },
        { label: 'Booking Fee', percent: '3.125%', value: 'Rp 3.575.918', user: 'Zulkipli Nasution', date: '28 Mar 2026' },
      ]
    },
    {
      id: 2,
      customer: 'Drs. Suro Jouhari, MM',
      nup: 'INS-0326038',
      unit: 'A17 - 17 - Single',
      extraUnits: 1,
      nominal: 'Rp 39.800.000',
      commission: 'Rp 2.662.620',
      date: 'Senin, 06 April 2026',
      steps: []
    }
  ];

  const currentModal = modalType ? dataMap[modalType] : null;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeMenu="Capaian Sales" />

      <main className="flex-1 p-8 overflow-hidden">
        <Header title="Laporan Performa Sales" />

        {/* Action Header - Modern Sync */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
          <div className="flex bg-slate-200/50 p-1 rounded-xl w-fit gap-1">
            {['Semua', 'Kuartal ini', 'Kuartal Sebelumnya'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-widest flex items-center gap-3 hover:bg-black transition-all shadow-xl shadow-slate-200">
            <Download size={18} />
            Export Laporan
          </button>
        </div>

        {/* Row 1: Primary Metrics - Mesh Gradient Sync */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-tight">Total CIT</div>
                <div className="text-3xl font-black text-slate-900 tracking-tight">{stats.totalCIT}</div>
              </div>
              <div className="w-12 h-12 flex items-center justify-center bg-amber-50 text-amber-500 rounded-2xl group-hover:scale-110 transition-transform">
                <Wallet size={24} />
              </div>
            </div>
            {activeTab !== 'Semua' && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-xl w-fit">
                <span className="text-[10px] font-black">12.5%</span>
                <span className="text-[10px] font-bold opacity-60">VS PREVIOUS</span>
              </div>
            )}
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-tight">Total CIR</div>
                <div className="text-3xl font-black text-slate-900 tracking-tight">{stats.totalCIR}</div>
              </div>
              <div className="w-12 h-12 flex items-center justify-center bg-emerald-50 text-emerald-600 rounded-2xl group-hover:scale-110 transition-transform">
                <TrendingUp size={24} />
              </div>
            </div>
            {activeTab !== 'Semua' && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-600 rounded-xl w-fit">
                <span className="text-[10px] font-black">+8.4%</span>
                <span className="text-[10px] font-bold opacity-60">VS PREVIOUS</span>
              </div>
            )}
          </div>

          {/* Card 3: Akad Unit - Premium Dark Sync */}
          <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl group shadow-slate-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl -mr-16 -mt-16 animate-pulse" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-1">Akad Unit</div>
                  <div className="text-4xl font-black">{stats.akadUnit}</div>
                </div>
                <div className="w-12 h-12 flex items-center justify-center bg-blue-500/20 text-blue-400 rounded-2xl group-hover:rotate-12 transition-transform">
                  <Building2 size={24} />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <LineChart size={16} className="text-blue-500" />
                  <span className="text-[11px] font-bold text-slate-400">Rerata CIT: <span className="text-white">{stats.rerataCIT}</span></span>
                </div>
                <button 
                  onClick={() => setModalType('akad')}
                  className="flex items-center justify-between group/btn bg-white/5 border border-white/10 hover:bg-white/10 px-4 py-3 rounded-xl transition-all"
                >
                  <div className="flex items-center gap-3">
                    <PieChart size={16} className="text-blue-500" />
                    <span className="text-[11px] font-black uppercase tracking-widest">Rincian Unit</span>
                  </div>
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Secondary Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { id: 'registrasi', label: 'Registrasi', value: stats.registrasi, trend: '+14%', icon: Users2, color: 'text-blue-600', bg: 'bg-blue-50' },
            { id: 'nup', label: 'NUP', value: stats.nup, trend: '+5%', icon: FileText, color: 'text-sky-600', bg: 'bg-sky-50' },
            { id: 'booking', label: 'Booking Fee', value: stats.bookingFee, trend: '-2.5%', icon: CreditCard, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { id: 'akadProsesi', label: 'Akad Prosesi', value: stats.akadProsesi, trend: '+12%', icon: ClipboardCheck, color: 'text-violet-600', bg: 'bg-violet-50' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}>
                  <item.icon size={20} />
                </div>
                {item.id !== 'akadProsesi' && (
                  <button onClick={() => setModalType(item.id)} className="text-slate-400 hover:text-blue-600 transition-colors">
                    <ExternalLink size={16} />
                  </button>
                )}
              </div>
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</div>
                <div className="text-2xl font-black text-slate-900 tracking-tight">{item.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Table Container - Sync with Table Style */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden mb-10">
          <div className="p-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Daftar Penjualan</h2>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Cari data pelanggan..." 
                className="w-full pl-12 pr-4 py-3.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/50 border-y border-slate-100">
                <tr>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] w-16 text-center">No</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Pelanggan</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Unit</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Nominal</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Komisi</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Disetujui</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {salesData.map((row, idx) => (
                  <React.Fragment key={row.id}>
                    <tr className={`group hover:bg-slate-50/50 transition-all cursor-pointer ${expandedRowId === row.id ? 'bg-slate-50/80' : ''}`} onClick={() => setExpandedRowId(expandedRowId === row.id ? null : row.id)}>
                      <td className="px-8 py-6 text-sm text-slate-500 text-center font-bold tabular-nums">
                        <div className="flex items-center justify-center gap-3">
                          <div className={`transition-transform duration-300 ${expandedRowId === row.id ? 'rotate-180 text-blue-600' : 'text-slate-300'}`}>
                            <ChevronDown size={14} />
                          </div>
                          {idx + 1}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-slate-900 tracking-tight">{row.customer}</span>
                          <span className="text-[11px] font-bold text-slate-400 mt-0.5">{row.nup}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-xl">
                          <span className="text-[10px] font-black uppercase tracking-wider">{row.unit}</span>
                          {row.extraUnits > 0 && <span className="text-[10px] font-black text-slate-400">+{row.extraUnits}</span>}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-sm font-black text-slate-900 text-right tabular-nums">{row.nominal}</td>
                      <td className="px-8 py-6 text-sm font-black text-blue-600 text-right tabular-nums">{row.commission}</td>
                      <td className="px-8 py-6 text-sm font-bold text-slate-400">{row.date}</td>
                    </tr>
                    {expandedRowId === row.id && (
                      <tr className="bg-slate-50/30 border-b border-slate-100 animate-fadeIn">
                        <td colSpan="6" className="px-12 py-10">
                          <div className="flex items-center gap-3 mb-8">
                            <Rocket size={18} className="text-blue-600 animate-bounce" />
                            <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Aliran Komisi & Timeline</h4>
                          </div>
                          <div className="flex flex-wrap gap-8">
                            {row.steps.length > 0 ? row.steps.map((step, sIdx) => (
                              <div key={sIdx} className="flex-1 min-w-[280px] bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group/step">
                                <div className="absolute top-0 right-0 w-2 h-full bg-blue-600 opacity-0 group-hover/step:opacity-100 transition-opacity" />
                                <div className="flex justify-between items-start mb-6">
                                  <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">{step.label}</div>
                                  <div className="text-sm font-black text-slate-900">{step.value}</div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-black text-white">{step.user.charAt(0)}</div>
                                  <div className="flex flex-col">
                                    <span className="text-xs font-black text-slate-800 tracking-tight">{step.user}</span>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{step.date}</span>
                                  </div>
                                  <div className="ml-auto px-2 py-0.5 bg-slate-100 rounded text-[9px] font-black text-slate-500 uppercase">{step.percent}</div>
                                </div>
                              </div>
                            )) : <div className="text-xs font-bold text-slate-400 italic">Data komisi belum diverifikasi oleh sistem.</div>}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-8 flex flex-col md:flex-row justify-between items-center bg-slate-50/50 gap-6">
            <div className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase">
              Halaman 1 <span className="mx-2 text-slate-200">|</span> Total {salesData.length} Transaksi Terdata
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-white hover:text-blue-600 transition-all shadow-sm">
                <ChevronLeft size={18} />
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900 text-white font-black text-sm shadow-xl shadow-slate-200">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-white transition-all shadow-sm">2</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-white transition-all shadow-sm">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Breakdown Modal - Modern Sync */}
        {modalType && currentModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xl animate-fadeIn">
            <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden relative animate-slideUp">
              <div className="p-10">
                <div className="flex justify-between items-start mb-10">
                  <div className="flex flex-col gap-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest w-fit">
                      {currentModal.unitLabel} Breakdown
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">{currentModal.title}</h3>
                    <div className="text-lg font-black text-blue-600 tracking-tight">Total {currentModal.total}</div>
                  </div>
                  <button 
                    onClick={() => setModalType(null)}
                    className="w-12 h-12 flex items-center justify-center bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-100 hover:text-slate-900 transition-all"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentModal.items.map((item, idx) => (
                    <div key={idx} className="group p-6 bg-slate-50/50 border border-slate-100 rounded-[2rem] hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-black text-slate-700 uppercase tracking-widest leading-none">{item.type}</span>
                        <div className="text-lg font-black text-blue-600 tracking-tight leading-none">{item.count}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out" 
                            style={{ width: item.percent }}
                          />
                        </div>
                        <span className="text-[11px] font-black text-slate-400 w-10 text-right tabular-nums">{item.percent}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
