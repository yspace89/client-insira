"use client";

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Clock, 
  ChevronDown, 
  User, 
  Phone, 
  ArrowRight,
  Filter,
  Users,
  CheckCircle2,
  Clock3,
  CalendarDays,
  Plus,
  ChevronLeft,
  ChevronRight,
  PhoneCall,
  AlertCircle,
  X,
  Check,
  MoreHorizontal,
  Edit3,
  StickyNote,
  ArrowLeftRight,
  UserPlus,
  Save,
  Activity,
  Target,
  BarChart3,
  TrendingUp
} from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

export default function KunjunganSite() {
  const [activeTab, setActiveTab] = useState('Belum berkunjung');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [confirmModal, setConfirmModal] = useState({ show: false, id: null, nextStatus: null });
  const [showAddModal, setShowAddModal] = useState(false);

  const [newSchedule, setNewSchedule] = useState({
    name: '',
    phone: '',
    schedule: '',
    time: '',
    sales: '',
    notes: ''
  });

  const [data, setData] = useState([
    { id: 1, name: 'Ahmad Subarjo', phone: '081234567890', schedule: '2026-04-27', time: '10:00', sales: 'Zulkipli Nasution', status: 'Belum berkunjung', notes: '' },
    { id: 2, name: 'Ratna Sari', phone: '085678901234', schedule: '2026-04-27', time: '13:30', sales: 'Ani Wijaya', status: 'Sudah berkunjung', notes: 'Tertarik dengan Cluster B' },
    { id: 3, name: 'Hendra Kurniawan', phone: '087788990011', schedule: '2026-04-28', time: '09:00', sales: 'Budi Santoso', status: 'Belum berkunjung', notes: '' },
    { id: 4, name: 'Maya Indah', phone: '081122334455', schedule: '2026-04-28', time: '15:00', sales: 'Zulkipli Nasution', status: 'Belum berkunjung', notes: '' },
    { id: 5, name: 'Joko Anwar', phone: '089900112233', schedule: '2026-04-29', time: '11:00', sales: 'Siti Aminah', status: 'Sudah berkunjung', notes: 'Bawa keluarga besar' },
    { id: 6, name: 'Fitriani', phone: '081223344556', schedule: '2026-04-29', time: '14:00', sales: 'Hendro Wibowo', status: 'Belum berkunjung', notes: '' },
    { id: 7, name: 'Budi Santoso', phone: '081234567001', schedule: '2026-05-01', time: '10:00', sales: 'Ani Wijaya', status: 'Belum berkunjung', notes: '' },
    { id: 8, name: 'Dewi Lestari', phone: '081234567002', schedule: '2026-05-01', time: '11:30', sales: 'Budi Santoso', status: 'Belum berkunjung', notes: '' },
    { id: 9, name: 'Eko Prasetyo', phone: '081234567003', schedule: '2026-05-02', time: '13:00', sales: 'Siti Aminah', status: 'Belum berkunjung', notes: '' },
    { id: 10, name: 'Linda Wati', phone: '081234567004', schedule: '2026-05-02', time: '15:30', sales: 'Zulkipli Nasution', status: 'Belum berkunjung', notes: '' },
  ]);

  // WEEKLY STATS
  const weeklyStats = {
    total: 34,
    sudah: 10,
    belum: 24,
  };

  const formatFullDate = (dateStr) => {
    if (!dateStr) return "-";
    const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString('id-ID', options);
  };

  const handleUpdateField = (id, field, value) => {
    setData(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const requestStatusChange = (id, currentStatus) => {
    const nextStatus = currentStatus === 'Belum berkunjung' ? 'Sudah berkunjung' : 'Belum berkunjung';
    setConfirmModal({ show: true, id, nextStatus });
  };

  const confirmStatusChange = () => {
    setData(prev => prev.map(item => 
      item.id === confirmModal.id ? { ...item, status: confirmModal.nextStatus } : item
    ));
    setConfirmModal({ show: false, id: null, nextStatus: null });
  };

  const handleAddSchedule = (e) => {
    e.preventDefault();
    const newId = data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1;
    setData([{ ...newSchedule, id: newId, status: 'Belum berkunjung' }, ...data]);
    setShowAddModal(false);
    setNewSchedule({ name: '', phone: '', schedule: '', time: '', sales: '', notes: '' });
  };

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesTab = item.status === activeTab;
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.sales.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDateRange = (!dateRange.start || item.schedule >= dateRange.start) && 
                               (!dateRange.end || item.schedule <= dateRange.end);

      return matchesTab && matchesSearch && matchesDateRange;
    });
  }, [data, activeTab, searchTerm, dateRange]);

  const displayData = filteredData.slice(0, 10);

  // Common Card Style from Capaian Sales
  const cardShadow = "shadow-[0_4px_20px_rgb(0,0,0,0.03)]";
  const cardRound = "rounded-2xl";

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <Sidebar activeMenu="Kunjungan Site" />

      <main className="flex-1 p-6 md:p-8 overflow-hidden relative">
        <Header title="Kunjungan Site" />

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-800 shadow-xl shadow-slate-200/50 border border-slate-100">
                <MapPin size={24} />
             </div>
             <div>
                <h1 className="text-xl font-bold text-slate-800 tracking-tight">Manajemen Kunjungan</h1>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Pantau Aktivitas Site Visit Properti</p>
             </div>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl text-[11px] font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"
          >
            <Plus size={18} />
            Jadwalkan Kunjungan Baru
          </button>
        </div>

        {/* SUMMARY SECTION */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className={`bg-white flex flex-col justify-between ${cardShadow} border border-slate-100/50 hover:-translate-y-0.5 transition-all duration-300 p-6 ${cardRound}`}>
              <div className="flex justify-between items-start mb-1">
                <div>
                  <div className="text-[11px] font-bold text-slate-400 mb-2 tracking-widest uppercase">Fokus Minggu Ini</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-slate-900 tracking-tight">{weeklyStats.belum}</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sisa Kunjungan</span>
                  </div>
                </div>
                <div className="w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-600 rounded-xl shadow-inner">
                  <CalendarDays size={18} />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <span className="inline-flex items-center justify-center bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[9px] font-bold border border-blue-100">
                  Total {weeklyStats.total} Jadwal
                </span>
                <span className="text-[10px] font-semibold text-slate-400">Minggu Ini</span>
              </div>
            </div>

            <div className={`bg-white flex flex-col justify-between ${cardShadow} border border-slate-100/50 hover:-translate-y-0.5 transition-all duration-300 p-6 ${cardRound}`}>
               <div className="flex justify-between items-start mb-1">
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 mb-2 tracking-widest uppercase">Sudah Berkunjung</div>
                    <div className="text-4xl font-bold text-slate-900 tracking-tight">42</div>
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center bg-emerald-50 text-emerald-600 rounded-xl shadow-inner">
                    <CheckCircle2 size={18} />
                  </div>
               </div>
               <div className="flex items-center gap-2 mt-4">
                  <span className="inline-flex items-center justify-center bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[9px] font-bold border border-emerald-100">+12.5%</span>
                  <span className="text-[10px] font-semibold text-slate-400">vs Bulan Lalu</span>
               </div>
            </div>

            <div className={`bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none shadow-blue-200/40 relative overflow-hidden flex flex-col justify-between min-h-[140px] hover:-translate-y-0.5 transition-all duration-300 p-6 ${cardRound}`}>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shine_4s_ease-in-out_infinite]" />
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start">
                  <div className="text-[11px] font-bold text-white/70 tracking-widest uppercase">Belum Berkunjung</div>
                  <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-xl backdrop-blur-md border border-white/10">
                    <Clock3 size={18} />
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-4xl font-bold tracking-tight">86 <span className="text-sm font-medium text-white/60 tracking-normal ml-2">Total Leads</span></div>
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2">
                    <TrendingUp size={12} className="text-amber-400" />
                    <span className="text-[10px] font-bold tracking-wide uppercase opacity-70">Butuh Follow-up Segera</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DATABASE SECTION */}
        <div className={`bg-white ${cardRound} ${cardShadow} border border-slate-100/50 overflow-hidden mb-10`}>
          <div className="p-8 border-b border-slate-50">
            <div className="flex justify-between items-center mb-6">
               <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
                  Database Kunjungan
                  <span className="bg-slate-100 text-slate-500 text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-widest leading-none">{filteredData.length} Data ditemukan</span>
               </h2>
            </div>
            
            <div className="flex flex-col xl:flex-row items-center justify-between gap-4 pt-2">
               
               <div className="flex bg-slate-100/60 p-1 rounded-xl w-full xl:w-auto gap-1 border border-slate-200/40 backdrop-blur-sm shrink-0">
                {['Belum berkunjung', 'Sudah berkunjung'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 xl:flex-none px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all duration-300 ${activeTab === tab ? 'bg-white text-blue-600 shadow-md border border-slate-100' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex flex-col md:flex-row items-center gap-4 w-full xl:w-auto flex-1 justify-end">
                 
                 <div className="flex items-center gap-3 bg-slate-50/50 p-1 rounded-xl border border-slate-100/50 w-full md:w-auto shrink-0">
                    <div className="relative flex-1 md:w-36">
                      <Calendar size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="date" 
                        className="w-full pl-8 pr-2 py-2.5 bg-white border border-slate-100 rounded-lg text-[10px] font-bold text-slate-600 outline-none focus:border-blue-500 transition-all"
                        value={dateRange.start}
                        onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                      />
                    </div>
                    <ArrowLeftRight size={12} className="text-slate-300" />
                    <div className="relative flex-1 md:w-36">
                      <Calendar size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="date" 
                        className="w-full pl-8 pr-2 py-2.5 bg-white border border-slate-100 rounded-lg text-[10px] font-bold text-slate-600 outline-none focus:border-blue-500 transition-all"
                        value={dateRange.end}
                        onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                      />
                    </div>
                 </div>

                 <div className="relative w-full md:w-72 lg:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input 
                      type="text" 
                      placeholder="Cari Leads atau Sales..." 
                      className="w-full pl-10 pr-4 py-3 text-[11px] bg-slate-50/80 border border-slate-100 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all font-medium outline-none placeholder:text-slate-400"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                 </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/30">
                  <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center w-20">No</th>
                  <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Leads</th>
                  <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-64">Jadwal (Hari, Tanggal)</th>
                  <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-32">Jam</th>
                  <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sales</th>
                  <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-80">Catatan Kunjungan</th>
                  <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center w-40">Aksi Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50/60">
                {displayData.map((item, idx) => (
                  <tr key={item.id} className="group hover:bg-slate-50/40 transition-all">
                    <td className="px-8 py-8 text-xs text-slate-300 text-center font-bold tabular-nums">{String(idx + 1).padStart(2, '0')}</td>
                    <td className="px-8 py-8">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800 tracking-tight uppercase group-hover:text-blue-600 transition-colors">{item.name}</span>
                        <a href={`https://wa.me/${item.phone}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-500 mt-1 hover:text-emerald-600 transition-colors">
                          <PhoneCall size={10} strokeWidth={2.5} />
                          {item.phone}
                        </a>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[11px] font-bold text-slate-700">{formatFullDate(item.schedule)}</span>
                        <input 
                          type="date" 
                          value={item.schedule}
                          onChange={(e) => handleUpdateField(item.id, 'schedule', e.target.value)}
                          className="bg-slate-50 border border-slate-100 rounded-lg px-2 py-1 text-[10px] font-medium text-slate-400 outline-none focus:bg-white focus:border-blue-200 transition-all cursor-pointer w-fit"
                        />
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <input 
                        type="time" 
                        value={item.time}
                        onChange={(e) => handleUpdateField(item.id, 'time', e.target.value)}
                        className="bg-transparent text-[11px] font-bold text-slate-700 outline-none hover:bg-white focus:bg-white px-2 py-1.5 rounded-lg border border-transparent focus:border-slate-100 transition-all cursor-pointer"
                      />
                    </td>
                    <td className="px-8 py-8">
                      <span className="text-[11px] font-bold text-slate-700 whitespace-nowrap">{item.sales}</span>
                    </td>
                    <td className="px-8 py-8">
                      <div className="relative flex items-center">
                        <StickyNote size={12} className="absolute left-3 text-slate-300" />
                        <input 
                          type="text" 
                          placeholder="Catatan..."
                          value={item.notes}
                          onChange={(e) => handleUpdateField(item.id, 'notes', e.target.value)}
                          className="w-full bg-slate-50/50 border border-slate-100 rounded-xl pl-8 pr-4 py-3 text-[11px] font-medium text-slate-600 outline-none focus:bg-white focus:border-blue-200 transition-all"
                        />
                      </div>
                    </td>
                    <td className="px-8 py-8 text-center">
                      <button 
                        onClick={() => requestStatusChange(item.id, item.status)}
                        className={`mx-auto px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border flex items-center justify-center min-w-[100px] shadow-sm ${
                          item.status === 'Sudah berkunjung' 
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100' 
                          : 'bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-900 hover:text-white'
                        }`}
                      >
                        {item.status.split(' ')[0]}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-8 flex flex-col md:flex-row justify-between items-center bg-slate-50/40 gap-6 border-t border-slate-50">
            <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">
              Halaman 01 <span className="mx-2 opacity-20">|</span> Total {filteredData.length} data
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-100 text-slate-300 hover:text-blue-500 transition-all">
                <ChevronLeft size={18} />
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900 text-white font-bold text-xs shadow-xl shadow-slate-200">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-100 text-slate-400 hover:bg-white transition-all">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* MODAL: TAMBAH JADWAL BARU */}
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity animate-fadeIn" onClick={() => setShowAddModal(false)} />
            <div className="relative bg-white rounded-[2.5rem] shadow-2xl border border-white/20 w-full max-w-xl animate-fadeIn overflow-hidden">
              <div className="bg-slate-900 px-8 py-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center">
                    <UserPlus size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Jadwalkan Kunjungan Baru</h3>
                </div>
                <button onClick={() => setShowAddModal(false)} className="w-9 h-9 flex items-center justify-center bg-white/10 text-slate-400 rounded-xl hover:bg-red-500 hover:text-white transition-all"><X size={20} /></button>
              </div>

              <form onSubmit={handleAddSchedule} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Nama Leads</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Masukkan nama..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all outline-none"
                      value={newSchedule.name}
                      onChange={(e) => setNewSchedule({ ...newSchedule, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Nomor WhatsApp</label>
                    <input 
                      required
                      type="text" 
                      placeholder="0812..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all outline-none"
                      value={newSchedule.phone}
                      onChange={(e) => setNewSchedule({ ...newSchedule, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Tanggal Kunjungan</label>
                    <input 
                      required
                      type="date" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all outline-none"
                      value={newSchedule.schedule}
                      onChange={(e) => setNewSchedule({ ...newSchedule, schedule: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Jam Kunjungan</label>
                    <input 
                      required
                      type="time" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all outline-none"
                      value={newSchedule.time}
                      onChange={(e) => setNewSchedule({ ...newSchedule, time: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Sales Terkait</label>
                  <select 
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 outline-none appearance-none cursor-pointer focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all"
                    value={newSchedule.sales}
                    onChange={(e) => setNewSchedule({ ...newSchedule, sales: e.target.value })}
                  >
                    <option value="">Pilih Sales...</option>
                    {['Zulkipli Nasution', 'Ani Wijaya', 'Budi Santoso', 'Siti Aminah', 'Hendro Wibowo'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Catatan Awal</label>
                  <textarea 
                    placeholder="Contoh: Customer ingin lihat unit Hook..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all outline-none min-h-[80px]"
                    value={newSchedule.notes}
                    onChange={(e) => setNewSchedule({ ...newSchedule, notes: e.target.value })}
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:bg-slate-50 rounded-2xl transition-all"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    className="flex-2 py-4 bg-slate-900 text-white rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2"
                  >
                    <Save size={16} />
                    Simpan Jadwal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* CONFIRMATION POPUP */}
        {confirmModal.show && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity animate-fadeIn" onClick={() => setConfirmModal({ ...confirmModal, show: false })} />
            <div className="relative bg-white rounded-[2rem] p-8 shadow-2xl border border-slate-100 max-w-sm w-full animate-fadeIn">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                <AlertCircle size={28} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2 tracking-tight">Konfirmasi Status</h3>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed font-medium">
                Apakah Anda yakin ingin mengubah status kunjungan ini menjadi <span className="font-bold text-blue-600">"{confirmModal.nextStatus}"</span>?
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setConfirmModal({ ...confirmModal, show: false })}
                  className="flex-1 py-3.5 rounded-xl text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all"
                >
                  Batal
                </button>
                <button 
                  onClick={confirmStatusChange}
                  className="flex-1 py-3.5 bg-slate-900 text-white rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"
                >
                  Ya, Ubah
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
