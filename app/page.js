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
  Box
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Kuartal ini');
  const [nupData, setNupData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua Status');
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [selectedUnitsModal, setSelectedUnitsModal] = useState(null);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editNoteValue, setEditNoteValue] = useState("");

  useEffect(() => {
    const unitTypes = ['Single', 'Couple', 'Family', 'Single Premiere', 'Couple Premiere'];
    const blocks = ['A', 'B', 'C', 'D', 'E'];
    const names = [
      'Budi Santoso', 'Siti Aminah', 'Hendro Wibowo', 'Dewi Lestari', 'Eko Prasetyo',
      'Rina Sulistyo', 'Ahmad Dani', 'Maya Indah', 'Joko Anwar', 'Fitriani'
    ];
    const statusPool = ['Bayar NUP', 'Bayar Booking Fee', 'Sudah Pilih Unit - Belum Akad', 'Sudah Akad'];
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
      const status = statusPool[Math.floor(Math.random() * statusPool.length)];
      const hasUnit = status === 'Sudah Pilih Unit - Belum Akad' || status === 'Sudah Akad';
      const unitCount = hasUnit ? (index % 3 === 0 ? Math.floor(Math.random() * 9) + 2 : 1) : 0;
      const unitList = Array.from({ length: unitCount }, () => generateUnit());
      
      return {
        id: index + 1,
        nup: `NUP-2023-${(index + 1).toString().padStart(3, '0')}`,
        customer: name,
        status,
        units: unitList,
        schema: schemas[index],
        notes: initialNotes[index],
        role: 'MA',
        company: 'Propertilogi',
        regDate: `${index + 1} Nov 2026`,
        nupDate: `0${index + 1} Nov 2023`,
        bookingFeeDate: `${index + 2} Nov 2026`
      };
    });
    setNupData(data);
    setExpandedRowId(2);
  }, []);

  const handleNoteChange = (id, val) => {
    setNupData(prev => prev.map(i => i.id === id ? { ...i, notes: val } : i));
  };

  const filteredData = nupData.filter(i => {
    const s = searchTerm.toLowerCase();
    const matchSearch = i.customer.toLowerCase().includes(s) || i.nup.toLowerCase().includes(s);
    const matchStatus = statusFilter === 'Semua Status' || i.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeMenu="Prospek Akad" />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Header title="Prospek Akad" />

        {/* Tabs */}
        <div className="flex bg-slate-200/50 p-1 rounded-xl w-fit mb-8 gap-1">
          {['Semua', 'Kuartal ini', 'Kuartal sebelumnya'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10">
          <div className="grid grid-cols-2 gap-6">
            {/* Card 1: Total Prospek Akad */}
            <div className="card-stat bg-white flex flex-col justify-between">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="text-sm font-medium text-slate-500 mb-1">Total Prospek Akad</div>
                  <div className="text-3xl font-bold text-slate-900">156</div>
                </div>
                <div className="w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-600 rounded-xl">
                  <Users2 size={20} />
                </div>
              </div>
            </div>
            
            {/* Card 2: Belum Akad */}
            <div className="card-stat bg-white flex flex-col justify-between">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="text-sm font-medium text-slate-500 mb-1">Belum Akad</div>
                  <div className="text-3xl font-bold text-slate-900">45</div>
                </div>
                <div className="w-10 h-10 flex items-center justify-center bg-orange-50 text-orange-500 rounded-xl">
                  <Calendar size={20} />
                </div>
              </div>
              <div className="text-[11px] font-medium text-slate-400 mt-2">
                <span className="text-slate-700 font-bold mr-1">29%</span> dari total prospek
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Card 3: Sudah Akad */}
            <div className="card-stat bg-white flex flex-col justify-between">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="text-sm font-medium text-slate-500 mb-1">Sudah Akad</div>
                  <div className="text-3xl font-bold text-slate-900">111</div>
                </div>
                <div className="w-10 h-10 flex items-center justify-center bg-green-50 text-green-600 rounded-xl">
                  <Trophy size={20} />
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="inline-flex items-center justify-center bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-[10px] font-bold">+12%</span>
                <span className="text-[11px] font-medium text-slate-400">dari kuartal sebelumnya</span>
              </div>
            </div>

            {/* Card 4: Tingkat Konversi (Animated) */}
            <div className="card-stat bg-blue-600 text-white border-none shadow-blue-200 relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-300/50 flex flex-col justify-between">
              {/* Efek Cahaya Menyapu (Shine) */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shine_2s_ease-in-out_infinite]" />
              
              {/* Efek Partikel Naik (Floating Bubbles) */}
              <div className="absolute w-8 h-8 bg-white/20 rounded-full blur-sm right-12 top-10 opacity-0 animate-[floatUp_3s_ease-in-out_infinite]" />
              <div className="absolute w-12 h-12 bg-white/10 rounded-full blur-md right-4 top-20 opacity-0 animate-[floatUp_4s_ease-in-out_infinite_0.5s]" />
              <div className="absolute w-6 h-6 bg-white/20 rounded-full blur-sm right-24 top-16 opacity-0 animate-[floatUp_3.5s_ease-in-out_infinite_1s]" />

              <div className="relative z-10">
                <div className="text-sm font-medium opacity-80 mb-1">Tingkat Konversi</div>
                <div className="text-3xl font-bold mb-1 origin-left">71%</div>
              </div>
              
              {/* Animasi Garis Pertumbuhan */}
              <div className="absolute right-0 bottom-0 w-1/2 h-2/3 opacity-20 pointer-events-none">
                <svg viewBox="0 0 100 50" width="100%" height="100%" preserveAspectRatio="none">
                  <path 
                    d="M0 45 Q 25 40, 50 25 T 100 5" 
                    fill="none" 
                    stroke="white" 
                    strokeWidth="4" 
                    className="animate-[dashFlow_2s_linear_infinite]"
                    strokeDasharray="4 6"
                  />
                  {/* Garis solid bayangan */}
                  <path d="M0 45 Q 25 40, 50 25 T 100 5" fill="none" stroke="white" strokeWidth="1" opacity="0.3" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-lg font-bold text-slate-800">Daftar Customer</h2>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Cari nama atau nomor NUP..." 
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select 
                className="pl-4 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>Semua Status</option>
                <option>Bayar NUP</option>
                <option>Bayar Booking Fee</option>
                <option>Sudah Pilih Unit - Belum Akad</option>
                <option>Sudah Akad</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-y border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider w-16">No</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider w-40">Nomor NUP</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider w-52">Nama Customer</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider w-44">Status</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider w-48">Unit Terpilih</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider w-36">Skema</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Catatan</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, idx) => (
                  <React.Fragment key={item.id}>
                    <tr 
                      className={`table-row-main ${expandedRowId === item.id ? 'bg-slate-50/80 shadow-inner' : ''}`}
                      onClick={() => setExpandedRowId(expandedRowId === item.id ? null : item.id)}
                    >
                      <td className="px-6 py-5 text-sm text-slate-500">{idx + 1}</td>
                      <td className="px-6 py-5 text-sm font-bold text-slate-900">{item.nup}</td>
                      <td className="px-6 py-5 text-sm font-medium text-slate-700">{item.customer}</td>
                      <td className="px-6 py-5">
                        <span className={`status-badge ${
                          item.status === 'Sudah Pilih Unit - Belum Akad' ? 'bg-purple-100 text-purple-700' : 
                          item.status === 'Bayar Booking Fee' ? 'bg-blue-100 text-blue-700' : 
                          item.status === 'Bayar NUP' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-sm font-bold">
                        {(item.status === 'Sudah Pilih Unit - Belum Akad' || item.status === 'Sudah Akad') && item.units.length > 0 ? (
                          <div className="flex flex-col gap-1">
                            <div className="text-blue-700 leading-snug">
                              {item.units.slice(0, 2).join(', ')}
                              {item.units.length > 2 && (
                                <span className="inline-flex items-center justify-center bg-red-100 text-red-600 ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-bold">+{item.units.length - 2}</span>
                              )}
                            </div>
                            {item.units.length > 2 && (
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedUnitsModal({ customer: item.customer, nup: item.nup, units: item.units });
                                }}
                                className="text-[11px] text-red-500 underline hover:text-red-700 text-left font-bold w-fit mt-0.5"
                              >
                                Lihat Semua
                              </button>
                            )}
                          </div>
                        ) : <span className="text-slate-500 font-medium text-[11px] bg-slate-100 px-2 py-1 rounded-md">Belum Pilih Unit</span>}
                      </td>
                      <td className="px-6 py-5 text-sm font-medium">
                        {item.status === 'Sudah Pilih Unit - Belum Akad' || item.status === 'Sudah Akad' ? (
                          <span className="text-slate-600">{item.schema}</span>
                        ) : (
                          <span className="text-slate-500 font-medium text-[11px] bg-slate-100 px-2 py-1 rounded-md">Belum Buat Skema</span>
                        )}
                      </td>
                      <td className="px-6 py-5" onClick={e => e.stopPropagation()}>
                        {editingNoteId === item.id ? (
                          <div className="flex flex-col gap-2 animate-fadeIn min-w-[200px]">
                            <textarea
                              value={editNoteValue}
                              onChange={e => setEditNoteValue(e.target.value)}
                              placeholder="Ketik catatan di sini..."
                              className="w-full text-sm bg-white border border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg p-2.5 min-h-[80px] resize-y shadow-sm transition-all outline-none"
                              autoFocus
                            />
                            <div className="flex justify-end gap-2">
                              <button 
                                onClick={() => setEditingNoteId(null)}
                                className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-700 rounded-md transition-colors"
                              >
                                Batal
                              </button>
                              <button 
                                onClick={() => {
                                  handleNoteChange(item.id, editNoteValue);
                                  setEditingNoteId(null);
                                }}
                                className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm hover:shadow-blue-200 transition-all flex items-center gap-1.5"
                              >
                                <Check size={14} /> Simpan
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="group relative flex items-start gap-2 pr-8 cursor-pointer min-h-[2.5rem] rounded-lg hover:bg-slate-50 p-2 -m-2 transition-colors" onClick={() => { setEditingNoteId(item.id); setEditNoteValue(item.notes); }}>
                            <div className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed w-full">
                              {item.notes ? item.notes : <span className="text-slate-400 italic">Tambahkan catatan...</span>}
                            </div>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingNoteId(item.id);
                                setEditNoteValue(item.notes);
                              }}
                              className="absolute right-1 top-1 p-1.5 text-slate-400 opacity-0 group-hover:opacity-100 hover:text-blue-600 hover:bg-blue-100 rounded-md transition-all"
                            >
                              <Edit2 size={14} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                    
                    {expandedRowId === item.id && (
                      <tr className="bg-white/50 border-b border-slate-100 animate-fadeIn">
                        <td colSpan="7" className="px-8 py-8">
                          <div className="flex flex-col md:flex-row gap-6">
                            {[
                              { label: 'Registrasi', dateLabel: 'Tanggal Registrasi', date: item.regDate, icon: UserPlus, color: 'bg-indigo-50 text-indigo-600' },
                              { label: 'NUP', dateLabel: 'Tanggal Bayar', date: item.nupDate, icon: ClipboardList, color: 'bg-amber-50 text-amber-600' },
                              { label: 'Booking Fee', dateLabel: 'Tanggal Bayar', date: item.bookingFeeDate, icon: Box, color: 'bg-blue-50 text-blue-600' }
                            ].map((card, i) => (
                              <div key={i} className="flex-1 bg-white border border-slate-100 p-5 rounded-2xl flex items-center gap-4 shadow-sm">
                                <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${card.color}`}>
                                  <card.icon size={24} />
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">{card.label}</span>
                                  <span className="text-sm font-bold text-slate-800 mb-0.5">{item.customer} - MA, Propertilogi</span>
                                  <span className="text-xs text-slate-500 font-medium">{card.dateLabel}: {card.date}</span>
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

          <div className="p-6 flex flex-col md:flex-row justify-between items-center bg-slate-50 gap-4">
            <div className="text-xs font-semibold text-slate-500 tracking-wide">
              Menampilkan {filteredData.length} dari 1.248 NUP
            </div>
            <div className="flex gap-1.5">
              <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-white hover:shadow-sm transition-all">
                <ChevronLeft size={16} />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm shadow-md shadow-blue-200">1</button>
              <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 font-bold text-sm hover:bg-white transition-all">2</button>
              <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 font-bold text-sm hover:bg-white transition-all">3</button>
              <div className="px-2 flex items-center text-slate-400">...</div>
              <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-white hover:shadow-sm transition-all">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {selectedUnitsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity animate-fadeIn" onClick={() => setSelectedUnitsModal(null)} />
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative animate-fadeIn">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md uppercase tracking-wider">Total {selectedUnitsModal.units.length} Unit</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-none mb-1.5">{selectedUnitsModal.customer}</h3>
                  <span className="text-sm font-medium text-slate-500 leading-none">{selectedUnitsModal.nup}</span>
                </div>
                <button 
                  onClick={() => setSelectedUnitsModal(null)}
                  className="w-8 h-8 flex flex-shrink-0 items-center justify-center bg-slate-100 text-slate-400 rounded-full hover:bg-slate-200 hover:text-slate-700 transition-all"
                >
                  <X size={16} />
                </button>
              </div>
              
              <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-2 pb-2">
                {selectedUnitsModal.units.map((unit, i) => (
                  <div key={i} className="px-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl flex items-center gap-4 group hover:bg-white hover:border-blue-100 hover:shadow-sm transition-all cursor-default">
                    <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full bg-slate-200 text-slate-500 text-[11px] font-bold group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                      {i + 1}
                    </div>
                    <span className="font-bold text-sm text-slate-700 group-hover:text-blue-700 transition-colors">{unit}</span>
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
