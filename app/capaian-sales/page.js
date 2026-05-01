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
  Eye
} from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

export default function CapaianSales() {
  const [activeTab, setActiveTab] = useState('Kuartal ini');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRowId, setExpandedRowId] = useState(1);
  const [modalType, setModalType] = useState(null);

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
    { id: 1, customer: 'Sapto Pratolo', nup: 'INS-0326039', unit: 'A15 - 20 - Single Premiere', extraUnits: 4, nominal: 'Rp 119.500.000', commission: 'Rp 7.644.893', date: 'Kamis, 23 April 2026', steps: [{ label: 'Daftar', percent: '1.45%', value: 'Rp 1.627.590', user: 'Zulkipli Nasution', date: '28 Mar 2026' }, { label: 'NUP', percent: '2.675%', value: 'Rp 2.441.385', user: 'Zulkipli Nasution', date: '28 Mar 2026' }, { label: 'Booking Fee', percent: '3.125%', value: 'Rp 3.575.918', user: 'Zulkipli Nasution', date: '28 Mar 2026' }] },
    { id: 2, customer: 'Drs. Suro Jouhari, MM', nup: 'INS-0326038', unit: 'A17 - 17 - Single', extraUnits: 1, nominal: 'Rp 39.800.000', commission: 'Rp 2.662.620', date: 'Senin, 06 April 2026', steps: [] },
    { id: 3, customer: 'Harum Kusumawati', nup: 'INS-0326037', unit: 'B10 - 128 - Single', extraUnits: 1, nominal: 'Rp 39.800.000', commission: 'Rp 4.636.700', date: 'Rabu, 22 April 2026', steps: [] },
    { id: 4, customer: 'Hartanti Desmuti, SE', nup: 'INS-0326035', unit: 'A19 - 84 - Single', extraUnits: 3, nominal: 'Rp 69.600.000', commission: 'Rp 8.108.400', date: 'Kamis, 30 April 2026', steps: [] },
    { id: 5, customer: 'Bambang Sudarmanto', nup: 'INS-0326034', unit: 'C12 - 45 - Couple', extraUnits: 0, nominal: 'Rp 150.000.000', commission: 'Rp 12.000.000', date: 'Jumat, 24 April 2026', steps: [] },
    { id: 6, customer: 'Siti Rahmawati', nup: 'INS-0326033', unit: 'A05 - 12 - Single', extraUnits: 2, nominal: 'Rp 55.000.000', commission: 'Rp 4.400.000', date: 'Sabtu, 25 April 2026', steps: [] },
    { id: 7, customer: 'Andi Wijaya', nup: 'INS-0326032', unit: 'D08 - 90 - Family', extraUnits: 1, nominal: 'Rp 280.000.000', commission: 'Rp 22.400.000', date: 'Minggu, 26 April 2026', steps: [] },
    { id: 8, customer: 'Rina Marlina', nup: 'INS-0326031', unit: 'B15 - 67 - Single Premiere', extraUnits: 0, nominal: 'Rp 125.000.000', commission: 'Rp 10.000.000', date: 'Senin, 27 April 2026', steps: [] },
    { id: 9, customer: 'Eko Prasetyo', nup: 'INS-0326030', unit: 'C10 - 102 - Couple Premiere', extraUnits: 1, nominal: 'Rp 185.000.000', commission: 'Rp 14.800.000', date: 'Selasa, 28 April 2026', steps: [] },
    { id: 10, customer: 'Lestari Wahyuni', nup: 'INS-0326029', unit: 'E01 - 01 - Family Signature', extraUnits: 0, nominal: 'Rp 450.000.000', commission: 'Rp 36.000.000', date: 'Rabu, 29 April 2026', steps: [] }
  ];

  const currentModal = modalType ? dataMap[modalType] : null;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeMenu="Capaian Sales" />

      <main className="flex-1 p-8">
        <Header title="Laporan Performa Sales" />

        {/* Action Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
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
          <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-950 transition-colors shadow-sm">
            <Download size={18} />
            Export Data
          </button>
        </div>

        {/* Row 1: Primary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="card-stat bg-white flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="text-sm font-medium text-slate-500 mb-1">Total CIT</div>
                <div className="text-3xl font-bold text-slate-900">{stats.totalCIT}</div>
              </div>
              <div className="w-10 h-10 flex items-center justify-center bg-amber-50 text-amber-500 rounded-xl">
                <Wallet size={20} />
              </div>
            </div>
            {activeTab !== 'Semua' && (
              <div className="flex items-center gap-1.5 mt-2 animate-fadeIn">
                <span className="inline-flex items-center justify-center bg-red-100 text-red-700 px-1.5 py-0.5 rounded text-[10px] font-bold">12.5%</span>
                <span className="text-[11px] font-medium text-slate-400">vs Kuartal Sebelumnya</span>
              </div>
            )}
          </div>

          <div className="card-stat bg-white flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="text-sm font-medium text-slate-500 mb-1">Total CIR</div>
                <div className="text-3xl font-bold text-slate-900">{stats.totalCIR}</div>
              </div>
              <div className="w-10 h-10 flex items-center justify-center bg-emerald-50 text-emerald-600 rounded-xl">
                <TrendingUp size={20} />
              </div>
            </div>
            {activeTab !== 'Semua' && (
              <div className="flex items-center gap-1.5 mt-2 animate-fadeIn">
                <span className="inline-flex items-center justify-center bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-[10px] font-bold">+8.4%</span>
                <span className="text-[11px] font-medium text-slate-400">vs Kuartal Sebelumnya</span>
              </div>
            )}
          </div>

          {/* Card 3: Akad Unit */}
          <div className="card-stat bg-blue-600 text-white border-none shadow-blue-200 relative overflow-hidden flex flex-col justify-between min-h-[140px]">
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shine_2s_ease-in-out_infinite]" />
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                <div className="text-base font-bold text-white">Akad Unit</div>
                <div className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-xl">
                  <Building2 size={20} />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-4xl font-bold">{stats.akadUnit} Akad Selesai</div>
                <div className="mt-3 pt-3 border-t border-white/20 flex flex-wrap items-center gap-x-6 gap-y-2">
                  <div className="flex items-center gap-2">
                    <LineChart size={14} className="text-white/80" />
                    <span className="text-xs font-semibold whitespace-nowrap">Rerata CIT Akad: <span className="font-bold">{stats.rerataCIT}</span></span>
                  </div>
                  <button 
                    onClick={() => setModalType('akad')}
                    className="flex items-center gap-2 group cursor-pointer hover:bg-white/10 p-1 -m-1 rounded transition-colors"
                  >
                    <PieChart size={14} className="text-white/80" />
                    <span className="text-xs font-semibold whitespace-nowrap">Jumlah Unit: <span className="font-bold underline decoration-white/40 underline-offset-2 group-hover:decoration-white transition-all">{stats.akadUnit} Unit</span></span>
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
            <div key={idx} className="card-stat bg-white flex flex-col justify-between min-h-[160px]">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm font-medium text-slate-500 mb-1">{item.label}</div>
                  <div className="text-3xl font-bold text-slate-900">{item.value}</div>
                </div>
                <div className={`flex flex-col items-end gap-2`}>
                   <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${item.color}`}>
                    <item.icon size={20} />
                  </div>
                  {item.id !== 'akadProsesi' && (
                    <button 
                      onClick={() => setModalType(item.id)}
                      title="Lihat rincian"
                      className="w-8 h-8 flex items-center justify-center bg-slate-50 text-blue-600 rounded-lg border border-slate-100 hover:bg-blue-50 transition-all shadow-sm group"
                    >
                      <Eye size={16} className="group-hover:scale-110 transition-transform" />
                    </button>
                  )}
                </div>
              </div>
              <div className="mt-auto">
                {activeTab !== 'Semua' && (
                  <div className="flex items-center gap-1.5 mb-1 animate-fadeIn">
                    <span className={`inline-flex items-center justify-center ${item.isUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} px-1.5 py-0.5 rounded text-[10px] font-bold`}>{item.trend}</span>
                    <span className="text-[10px] font-medium text-slate-400">vs Kuartal Sebelumnya</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-slate-50">
            <h2 className="text-lg font-bold text-slate-800">Daftar Penjualan</h2>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Cari data pelanggan atau NUP..." 
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider w-16 text-center">No</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nama Pelanggan</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">NUP</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nama Unit</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Nominal</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Komisi Saya</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Tanggal Disetujui</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {salesData.map((row, idx) => (
                  <React.Fragment key={row.id}>
                    <tr className={`table-row-main ${expandedRowId === row.id ? 'bg-slate-50/80' : ''}`} onClick={() => setExpandedRowId(expandedRowId === row.id ? null : row.id)}>
                      <td className="px-6 py-5 text-sm text-slate-500 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {expandedRowId === row.id ? <ChevronUp size={14} className="text-blue-600" /> : <ChevronDown size={14} />}
                          {idx + 1}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm font-bold text-slate-800">{row.customer}</td>
                      <td className="px-6 py-5 text-sm font-medium text-slate-500">{row.nup}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <span className="status-badge bg-blue-50 text-blue-700 border border-blue-100">{row.unit}</span>
                          {row.extraUnits > 0 && <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">+{row.extraUnits}</span>}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm font-bold text-slate-900 text-right">{row.nominal}</td>
                      <td className="px-6 py-5 text-sm font-bold text-blue-600 text-right">{row.commission}</td>
                      <td className="px-6 py-5 text-sm font-medium text-slate-500">{row.date}</td>
                    </tr>
                    {expandedRowId === row.id && (
                      <tr className="bg-white/50 border-b border-slate-100 animate-fadeIn">
                        <td colSpan="7" className="px-10 py-10">
                          <div className="flex items-center gap-2 mb-6"><Rocket size={16} className="text-blue-600" /><span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Step & Persentase Komisi</span></div>
                          <div className="flex flex-wrap gap-10">
                            {row.steps.length > 0 ? row.steps.map((step, sIdx) => (
                              <div key={sIdx} className="flex-1 bg-white border border-slate-100 p-5 rounded-2xl flex flex-col gap-4 shadow-sm min-w-[250px]">
                                <div className="flex justify-between items-center"><span className="status-badge bg-blue-600 text-white border-none">{step.label} ({step.percent})</span><span className="text-sm font-bold text-slate-900">{step.value}</span></div>
                                <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">{step.user.charAt(0)}</div><div className="flex flex-col"><span className="text-xs font-bold text-slate-700">{step.user}</span><span className="text-[10px] text-slate-400 font-medium">{step.date}</span></div></div>
                              </div>
                            )) : <div className="text-sm text-slate-400 italic">Data komisi belum tersedia</div>}
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
          <div className="p-6 flex flex-col md:flex-row justify-between items-center bg-slate-50 gap-4">
            <div className="text-xs font-semibold text-slate-500 tracking-wide">Menampilkan {salesData.length} data penjualan</div>
            <div className="flex gap-1.5">
              <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-white hover:shadow-sm transition-all"><ChevronLeft size={16} /></button>
              <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm shadow-md shadow-blue-200">1</button>
              <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 font-bold text-sm hover:bg-white transition-all">2</button>
              <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 font-bold text-sm hover:bg-white transition-all">3</button>
              <div className="px-2 flex items-center text-slate-400">...</div>
              <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-white hover:shadow-sm transition-all"><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
      </main>

      {/* Dynamic Breakdown Modal */}
      {modalType && currentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity animate-fadeIn" onClick={() => setModalType(null)} />
          <div className="bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden relative animate-fadeIn">
            <div className="p-8 lg:p-10">
              <div className="flex justify-between items-center mb-8">
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{currentModal.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="status-badge bg-blue-100 text-blue-700 border border-blue-200 px-3 py-1">Total: {currentModal.total}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setModalType(null)}
                  className="w-10 h-10 flex items-center justify-center bg-slate-100 text-slate-400 rounded-full hover:bg-slate-200 hover:text-slate-700 transition-all shadow-sm"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {currentModal.items.map((item, idx) => (
                  <div key={idx} className="group flex flex-col gap-2.5 p-5 bg-slate-50/50 border border-slate-100 rounded-2xl hover:border-blue-200 hover:bg-blue-50/30 transition-all shadow-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-700 tracking-tight">{item.type}</span>
                      <div className="flex items-center gap-2.5">
                        <span className="text-[15px] font-bold text-blue-600">{item.count}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">
                          {currentModal.unitLabel}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out" 
                          style={{ width: item.percent }}
                        />
                      </div>
                      <span className="text-[11px] font-bold text-slate-400 group-hover:text-blue-500 transition-colors w-10 text-right">{item.percent}</span>
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
