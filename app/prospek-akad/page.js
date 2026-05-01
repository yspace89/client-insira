"use client";

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight,
  Trophy,
  Users2,
  Calendar,
  X,
  Edit2,
  Check,
  UserPlus,
  ClipboardList,
  Box,
  ChevronDown,
  Rocket,
  ArrowRight,
  Clock
} from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Kuartal ini');
  const [nupData, setNupData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua Status');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [selectedUnitsModal, setSelectedUnitsModal] = useState(null);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editNoteValue, setEditNoteValue] = useState("");
  const [editingAcadId, setEditingAcadId] = useState(null);
  const [tempAcadDate, setTempAcadDate] = useState("");

  useEffect(() => {
    const unitTypes = ['Single', 'Couple', 'Family', 'Single Premiere', 'Couple Premiere'];
    const blocks = ['A', 'B', 'C', 'D', 'E'];
    const names = [
      'Budi Santoso', 'Siti Aminah', 'Hendro Wibowo', 'Dewi Lestari', 'Eko Prasetyo',
      'Rina Sulistyo', 'Ahmad Dani', 'Maya Indah', 'Joko Anwar', 'Fitriani'
    ];
    const statusPool = ['Bayar NUP', 'Bayar Booking Fee', 'Sudah Pilih Unit - Belum Akad', 'Proses Akad', 'Sudah Akad'];
    const schemas = ['Cash', 'Angsur 3 bln', 'Cash', 'Angsur 3 bln', 'Cash', 'Angsur 3 bln', 'Cash', 'Angsur 3 bln', 'Cash', 'Angsur 3 bln'];
    const initialNotes = ['Proses SP3K', 'Menunggu pelunasan DP', '', 'Berkas lengkap', '', 'Menunggu konfirmasi bank', 'Siap akad', '', '', 'Pemberkasan KPR'];

    const generateUnit = () => {
      const b = blocks[Math.floor(Math.random() * blocks.length)];
      const c1 = Math.floor(Math.random() * 20) + 1;
      const c2 = Math.floor(Math.random() * 50) + 1;
      const t = unitTypes[Math.floor(Math.random() * unitTypes.length)];
      return `${b}${c1} - ${c2} - ${t}`;
    };

    const data = names.map((name, index) => {
      const status = statusPool[index % statusPool.length];
      const hasUnit = status === 'Sudah Pilih Unit - Belum Akad' || status === 'Proses Akad' || status === 'Sudah Akad';
      const unitCount = hasUnit ? (index % 3 === 0 ? Math.floor(Math.random() * 9) + 2 : 1) : 0;
      const unitList = Array.from({ length: unitCount }, () => generateUnit());
      
      return {
        id: index + 1,
        nup: `INS-${(Math.floor(Math.random() * 90000) + 10000)}${index.toString().padStart(2, '0')}`,
        customer: name,
        status,
        units: unitList,
        schema: schemas[index],
        notes: initialNotes[index],
        role: 'MA',
        company: 'Propertilogi',
        regDate: `2026-11-${(index + 1).toString().padStart(2, '0')}`,
        nupDate: `2023-11-${(index + 1).toString().padStart(2, '0')}`,
        bookingFeeDate: `2026-11-${(index + 2).toString().padStart(2, '0')}`,
        acadDate: index % 4 === 0 ? `2026-05-${(index + 10).toString().padStart(2, '0')}` : null
      };
    });
    setNupData(data);
    setExpandedRowId(7);
  }, []);

  const handleNoteChange = (id, val) => {
    setNupData(prev => prev.map(i => i.id === id ? { ...i, notes: val } : i));
  };

  const totalProspek = nupData.length;
  const sudahAkad = nupData.filter(i => i.status === 'Sudah Akad').length;
  const belumAkad = totalProspek - sudahAkad;
  const totalBookingFee = nupData.filter(i => i.status !== 'Bayar NUP').length;
  const conversionRate = totalBookingFee > 0 ? Math.round((sudahAkad / totalBookingFee) * 100) : 0;

  const filteredData = nupData.filter(i => {
    const s = searchTerm.toLowerCase();
    const matchSearch = i.customer.toLowerCase().includes(s) || 
                       i.nup.toLowerCase().includes(s) || 
                       (i.notes && i.notes.toLowerCase().includes(s));
    const matchStatus = statusFilter === 'Semua Status' || i.status === statusFilter;
    
    let matchDate = true;
    if (startDate || endDate) {
      if (!i.acadDate) {
        matchDate = false;
      } else {
        if (startDate && endDate) {
          matchDate = i.acadDate >= startDate && i.acadDate <= endDate;
        } else if (startDate) {
          matchDate = i.acadDate >= startDate;
        } else if (endDate) {
          matchDate = i.acadDate <= endDate;
        }
      }
    }
    
    return matchSearch && matchStatus && matchDate;
  });

  const handleAcadDateUpdate = (id, date) => {
    setNupData(prev => prev.map(i => i.id === id ? { ...i, acadDate: date } : i));
  };

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <Sidebar activeMenu="Prospek Akad" />

      <main className="flex-1 p-6 md:p-10 overflow-hidden">
        <Header title="Prospek Akad" />

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
          <div className="flex bg-slate-200/40 p-1 rounded-xl w-fit gap-1 border border-slate-100">
            {['Semua', 'Kuartal ini', 'Kuartal Sebelumnya'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest rounded-lg transition-all ${activeTab === tab ? 'bg-white text-blue-600 shadow-sm border border-slate-100' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl text-[11px] font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-blue-600 transition-all shadow-xl shadow-slate-200">
            <UserPlus size={18} />
            Input Prospek Baru
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Total Prospek', val: totalProspek, icon: Users2, color: 'text-blue-500', bg: 'bg-blue-50/50' },
            { label: 'Belum Akad', val: belumAkad, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50/50' },
            { label: 'Sudah Akad', val: sudahAkad, icon: Trophy, color: 'text-emerald-500', bg: 'bg-emerald-50/50' }
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-md transition-all group">
               <div className="flex justify-between items-start mb-4">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${item.bg} ${item.color} group-hover:scale-105 transition-transform`}>
                    <item.icon size={20} strokeWidth={2} />
                  </div>
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">{item.label}</div>
               </div>
               <div className="text-3xl font-bold text-slate-800 tracking-tight leading-none">{item.val}</div>
            </div>
          ))}

          <div className="bg-slate-900 rounded-[1.5rem] p-6 text-white shadow-2xl shadow-blue-200 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl -mr-16 -mt-16" />
            <div className="relative z-10 flex h-full flex-col justify-between">
               <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-white/5 text-blue-400 rounded-xl">
                    <Rocket size={20} strokeWidth={1.5} />
                  </div>
                  <div className="text-[9px] font-bold text-blue-400 uppercase tracking-widest leading-none">Konversi</div>
               </div>
               <div className="text-3xl font-bold tracking-tight leading-none">{conversionRate}%</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] shadow-[0_8px_40px_rgba(0,0,0,0.02)] border border-slate-100 overflow-hidden mb-10">
          <div className="p-8 flex flex-col lg:flex-row justify-between items-center gap-8 border-b border-slate-50/60">
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">Database Prospek <span className="ml-4 px-2 py-0.5 bg-blue-50 text-blue-500 rounded text-[10px] font-bold border border-blue-100">{filteredData.length} Data</span></h2>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              <div className="relative flex-1 sm:w-72">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <input 
                  type="text" 
                  placeholder="Cari prospek..." 
                  className="w-full pl-11 pr-4 py-3 text-xs bg-slate-50/50 border border-slate-100 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-200 transition-all font-medium outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative sm:w-56">
                <select 
                  className="w-full pl-4 pr-10 py-3 text-[11px] bg-slate-50 border border-slate-100 rounded-xl focus:outline-none appearance-none cursor-pointer font-bold text-slate-600 uppercase tracking-widest"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option>Semua Status</option>
                  <option>Bayar NUP</option>
                  <option>Bayar Booking Fee</option>
                  <option>Sudah Pilih Unit - Belum Akad</option>
                  <option>Proses Akad</option>
                  <option>Sudah Akad</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
              </div>
            </div>
          </div>

          <div className="px-8 py-6">
            <div className="flex flex-wrap items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3 pr-4 border-r border-slate-200">
                <Calendar size={16} className="text-blue-500" strokeWidth={2} />
                <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">Filter Jadwal Akad</span>
              </div>
              <div className="flex items-center gap-4">
                <input type="date" className="bg-transparent text-sm font-bold text-slate-800 outline-none" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <span className="text-slate-300 font-bold">/</span>
                <input type="date" className="bg-transparent text-sm font-bold text-slate-800 outline-none" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                {(startDate || endDate) && (
                  <button onClick={() => { setStartDate(''); setEndDate(''); }} className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Hapus</button>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/30">
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center w-20">No</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nomor NUP</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Customer</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tahapan</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Jadwal Akad</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredData.map((item, idx) => (
                  <React.Fragment key={item.id}>
                    <tr 
                      className={`group hover:bg-slate-50/40 transition-all cursor-pointer ${expandedRowId === item.id ? 'bg-slate-50/60' : ''}`}
                      onClick={() => setExpandedRowId(expandedRowId === item.id ? null : item.id)}
                    >
                      <td className="px-8 py-6 text-xs text-slate-300 text-center font-bold tabular-nums">
                        <div className="flex items-center justify-center gap-3">
                          <ChevronDown size={14} className={`transition-transform duration-300 ${expandedRowId === item.id ? 'rotate-180 text-blue-500' : 'text-slate-200'}`} />
                          {String(idx + 1).padStart(2, '0')}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-800 tracking-tight uppercase">{item.nup}</span>
                          {(item.status === 'Sudah Pilih Unit - Belum Akad' || item.status === 'Proses Akad' || item.status === 'Sudah Akad') && (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedUnitsModal({ 
                                  customer: item.customer, 
                                  nup: item.nup, 
                                  units: item.units, 
                                  schema: item.schema 
                                });
                              }}
                              className="text-[10px] text-blue-600 font-bold uppercase tracking-widest w-fit mt-1.5 hover:text-blue-800"
                            >
                              Detail Unit ({item.units.length})
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-sm font-bold text-slate-800 tracking-tight">{item.customer}</td>
                      <td className="px-8 py-6">
                        <span className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest border ${
                          item.status === 'Sudah Akad' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                          item.status === 'Proses Akad' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-slate-100 text-slate-500 border-slate-200'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-8 py-6" onClick={e => e.stopPropagation()}>
                         <div 
                            className="group/date flex items-center gap-2.5 cursor-pointer hover:bg-white px-3 py-1.5 rounded-lg transition-all w-fit border border-transparent hover:border-slate-100"
                            onClick={() => { setEditingAcadId(item.id); setTempAcadDate(item.acadDate || ""); }}
                          >
                            <Calendar size={14} className="text-slate-300 group-hover/date:text-blue-500 transition-colors" />
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${item.acadDate ? "text-slate-700" : "text-slate-300"}`}>
                              {item.acadDate ? new Date(item.acadDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : "Input Tanggal"}
                            </span>
                          </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button className="px-5 py-2.5 bg-slate-50 text-slate-600 hover:bg-slate-900 hover:text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all border border-slate-100 shadow-sm">
                          Timeline
                        </button>
                      </td>
                    </tr>
                    
                    {expandedRowId === item.id && (
                      <tr className="bg-slate-50/20 animate-fadeIn">
                        <td colSpan="6" className="px-12 py-10">
                          <div className="flex flex-col md:flex-row gap-8">
                             {[
                                { label: 'Registrasi', val: 'Terverifikasi', date: item.regDate, icon: UserPlus, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                                { label: 'Pembayaran NUP', val: 'Terkonfirmasi', date: item.nupDate, icon: ClipboardList, color: 'text-amber-600', bg: 'bg-amber-50' },
                                { label: 'Booking Fee', val: 'Terbayar', date: item.bookingFeeDate, icon: Box, color: 'text-blue-600', bg: 'bg-blue-50', show: item.status !== 'Bayar NUP' }
                             ].filter(c => c.show !== false).map((card, i) => (
                               <div key={i} className="flex-1 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5 group/card hover:shadow-md transition-all">
                                  <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${card.bg} ${card.color} group-hover/card:scale-105 transition-transform`}>
                                    <card.icon size={24} strokeWidth={2} />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">{card.label}</span>
                                    <span className="text-sm font-bold text-slate-800 tracking-tight">{card.val}</span>
                                    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-1">{new Date(card.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                  </div>
                               </div>
                             ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-8 flex flex-col md:flex-row justify-between items-center bg-slate-50/40 gap-6">
            <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">
              Halaman 01 <span className="mx-2 opacity-20">|</span> Total {filteredData.length} data
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

      {/* Modal - Refined */}
      {selectedUnitsModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden relative animate-slideUp">
            <div className="p-10">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 tracking-tight">{selectedUnitsModal.customer}</h3>
                    <div className="text-[11px] font-bold text-blue-600 uppercase tracking-widest mt-1">{selectedUnitsModal.nup}</div>
                  </div>
                  <button 
                    onClick={() => setSelectedUnitsModal(null)}
                    className="w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-400 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4 mb-8">
                   <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Unit Terpilih</span>
                      <span className="text-sm font-bold text-slate-800">{selectedUnitsModal.units.length} Unit</span>
                   </div>
                   <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Skema Pembayaran</span>
                      <span className="text-sm font-bold text-slate-800">{selectedUnitsModal.schema}</span>
                   </div>
                </div>
                
                <div className="space-y-2 max-h-[40vh] overflow-y-auto no-scrollbar">
                  {selectedUnitsModal.units.map((unit, i) => (
                    <div key={i} className="px-5 py-3.5 bg-white border border-slate-100 rounded-xl flex items-center gap-4 group hover:border-blue-200 transition-all">
                      <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <span className="font-bold text-xs text-slate-700 tracking-tight">{unit}</span>
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
