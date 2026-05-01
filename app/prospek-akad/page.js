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
  ArrowRight
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
        regDate: `${index + 1} Nov 2026`,
        nupDate: `0${index + 1} Nov 2023`,
        bookingFeeDate: `${index + 2} Nov 2026`,
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
  const sudahAkadPercent = totalProspek > 0 ? Math.round((sudahAkad / totalProspek) * 100) : 0;
  const belumAkadPercent = totalProspek > 0 ? Math.round((belumAkad / totalProspek) * 100) : 0;

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
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeMenu="Prospek Akad" />

      <main className="flex-1 p-8 overflow-hidden">
        <Header title="Prospek Akad Management" />

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
          <div className="flex bg-slate-200/50 p-1 rounded-xl w-fit gap-1">
            {['Semua', 'Kuartal ini', 'Kuartal sebelumnya'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-lg transition-all ${activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-black transition-all shadow-xl shadow-slate-200">
            <UserPlus size={20} />
            Input Lead Baru
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-lg transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                <Users2 size={20} />
              </div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Lead</div>
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tighter">{totalProspek}</div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-lg transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 flex items-center justify-center bg-amber-50 text-amber-500 rounded-xl group-hover:scale-110 transition-transform">
                <Calendar size={20} />
              </div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Belum Akad</div>
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tighter">{belumAkad}</div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-lg transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 flex items-center justify-center bg-emerald-50 text-emerald-600 rounded-xl group-hover:scale-110 transition-transform">
                <Trophy size={20} />
              </div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sudah Akad</div>
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tighter">{sudahAkad}</div>
          </div>

          <div className="bg-slate-900 rounded-[2rem] p-6 text-white shadow-2xl shadow-blue-200 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl -mr-16 -mt-16 animate-pulse" />
            <div className="relative z-10">
               <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-500/20 text-blue-400 rounded-xl">
                    <Rocket size={20} />
                  </div>
                  <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Konversi</div>
               </div>
               <div className="text-3xl font-black tracking-tighter">{conversionRate}%</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden mb-10">
          <div className="p-8 flex flex-col lg:flex-row justify-between items-center gap-8">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Lead Database Management</h2>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              <div className="relative flex-1 sm:w-72">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Cari lead..." 
                  className="w-full pl-12 pr-4 py-3.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative sm:w-56">
                <select 
                  className="w-full pl-4 pr-10 py-3.5 text-[11px] bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none appearance-none cursor-pointer font-black text-slate-600 uppercase tracking-widest"
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
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
              </div>
            </div>
          </div>

          <div className="px-8 pb-8">
            <div className="flex flex-wrap items-center gap-4 p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100">
              <div className="flex items-center gap-3 pr-4 border-r border-slate-200">
                <Calendar size={18} className="text-blue-600" />
                <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Filter Jadwal Akad</span>
              </div>
              <div className="flex items-center gap-4">
                <input type="date" className="bg-transparent text-sm font-black text-slate-700 outline-none" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <span className="text-slate-300 font-bold">/</span>
                <input type="date" className="bg-transparent text-sm font-black text-slate-700 outline-none" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                {(startDate || endDate) && (
                  <button onClick={() => { setStartDate(''); setEndDate(''); }} className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:text-red-700">Clear</button>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center w-16">No</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Identitas NUP</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Customer</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status Lead</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Jadwal Akad</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredData.map((item, idx) => (
                  <React.Fragment key={item.id}>
                    <tr 
                      className={`group hover:bg-slate-50/50 transition-all cursor-pointer ${expandedRowId === item.id ? 'bg-slate-50/80' : ''}`}
                      onClick={() => setExpandedRowId(expandedRowId === item.id ? null : item.id)}
                    >
                      <td className="px-8 py-6 text-sm text-slate-300 text-center font-black tabular-nums">
                        <div className="flex items-center justify-center gap-3">
                          <div className={`transition-transform duration-300 ${expandedRowId === item.id ? 'rotate-180 text-blue-600' : ''}`}>
                            <ChevronDown size={14} />
                          </div>
                          {idx + 1}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-slate-900 tracking-tight uppercase">{item.nup}</span>
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
                              className="text-[10px] text-blue-600 font-black uppercase tracking-widest w-fit mt-1.5 hover:text-blue-800"
                            >
                              Detail Unit ({item.units.length})
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-sm font-black text-slate-900 uppercase tracking-tight">{item.customer}</td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                          item.status === 'Sudah Akad' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                          item.status === 'Proses Akad' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-slate-100 text-slate-500 border-slate-200'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-8 py-6" onClick={e => e.stopPropagation()}>
                         <div 
                            className="group/date flex items-center gap-3 cursor-pointer hover:bg-white px-4 py-2 rounded-xl transition-all w-fit"
                            onClick={() => { setEditingAcadId(item.id); setTempAcadDate(item.acadDate || ""); }}
                          >
                            <Calendar size={14} className="text-slate-300 group-hover/date:text-blue-500 transition-colors" />
                            <span className={`text-[11px] font-black uppercase tracking-widest ${item.acadDate ? "text-slate-900" : "text-slate-300"}`}>
                              {item.acadDate ? new Date(item.acadDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : "Input Jadwal"}
                            </span>
                          </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-black transition-all shadow-lg shadow-slate-200">
                          Timeline
                        </button>
                      </td>
                    </tr>
                    
                    {expandedRowId === item.id && (
                      <tr className="bg-slate-50/50 border-b border-slate-100 animate-fadeIn">
                        <td colSpan="6" className="px-12 py-10">
                          <div className="flex flex-col md:flex-row gap-8">
                             {[
                                { label: 'Registrasi', dateLabel: 'Registered', date: item.regDate, icon: UserPlus, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                                { label: 'NUP System', dateLabel: 'Paid', date: item.nupDate, icon: ClipboardList, color: 'text-amber-600', bg: 'bg-amber-50' },
                                { label: 'Booking Fee', dateLabel: 'Secured', date: item.bookingFeeDate, icon: Box, color: 'text-blue-600', bg: 'bg-blue-50', show: item.status !== 'Bayar NUP' }
                             ].filter(c => c.show !== false).map((card, i) => (
                               <div key={i} className="flex-1 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5 group/card hover:shadow-md transition-all">
                                  <div className={`w-14 h-14 flex items-center justify-center rounded-2xl ${card.bg} ${card.color} group-hover/card:scale-110 transition-transform`}>
                                    <card.icon size={28} />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{card.label}</span>
                                    <span className="text-sm font-black text-slate-900 tracking-tight">{item.customer}</span>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{card.dateLabel}: {card.date}</span>
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
        </div>
      </main>
    </div>
  );
}
