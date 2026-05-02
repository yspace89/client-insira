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
  const [activeTab, setActiveTab] = useState('Belum');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [confirmModal, setConfirmModal] = useState({ show: false, id: null, nextStatus: null });
  const [showAddModal, setShowAddModal] = useState(false);
  const [salesSearch, setSalesSearch] = useState('');
  const [showSalesDropdown, setShowSalesDropdown] = useState(false);

  const salesList = [
    'Fattah - MA, Propertilogi',
    'Zulkipli - MO, Internal',
    'Ani - MP, Future Home',
    'Budi - MO, Citra Property',
    'Siti - MA, Indo Home',
    'Hendro - MO, Metro Realty',
    'Rina - MP, Prime Estate'
  ];

  const [newSchedule, setNewSchedule] = useState({
    name: '',
    phone: '',
    schedule: '',
    time: '',
    sales: '',
    notes: ''
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. FUNGSI AMBIL DATA DARI API
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/kunjungan');
      const result = await response.json();
      if (Array.isArray(result)) {
        setData(result);
      }
    } catch (error) {
      console.error("Gagal ambil data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Ambil data pas halaman pertama kali dibuka
  React.useEffect(() => {
    fetchData();
  }, []);

  const formatFullDate = (dateStr) => {
    if (!dateStr) return "-";
    const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString('id-ID', options);
  };

  // 2. FUNGSI UPDATE DATA KE API (In-place edit)
  const handleUpdateField = async (id, field, value) => {
    // Update tampilan lokal dulu biar kerasa cepet (Optimistic Update)
    setData(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));

    try {
      await fetch('/api/kunjungan', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, [field]: value })
      });
    } catch (error) {
      console.error("Gagal update data ke server:", error);
      fetchData(); // Refresh data kalau gagal biar balik ke data asli
    }
  };

  const requestStatusChange = (id, currentStatus) => {
    const nextStatus = currentStatus === 'Belum' ? 'Sudah' : 'Belum';
    setConfirmModal({ show: true, id, nextStatus });
  };

  // 3. FUNGSI UPDATE STATUS
  const confirmStatusChange = async () => {
    const { id, nextStatus } = confirmModal;
    
    // Update lokal
    setData(prev => prev.map(item => 
      item.id === id ? { ...item, status: nextStatus } : item
    ));
    setConfirmModal({ show: false, id: null, nextStatus: null });

    try {
      await fetch('/api/kunjungan', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: nextStatus })
      });
    } catch (error) {
      console.error("Gagal ganti status:", error);
      fetchData();
    }
  };

  // 4. FUNGSI SIMPAN JADWAL BARU
  const handleAddSchedule = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/kunjungan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSchedule)
      });
      
      if (response.ok) {
        setShowAddModal(false);
        setNewSchedule({ name: '', phone: '', schedule: '', time: '', sales: '', notes: '' });
        fetchData(); // Ambil data terbaru dari Lark
      }
    } catch (error) {
      console.error("Gagal simpan jadwal:", error);
    } finally {
      setLoading(false);
    }
  };

  const monthlyStats = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthlyData = data.filter(item => {
      if (!item.schedule) return false;
      const d = new Date(item.schedule);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });

    return {
      total: monthlyData.length,
      sudah: monthlyData.filter(d => d.status === 'Sudah').length,
      belum: monthlyData.filter(d => d.status === 'Belum').length,
      monthName: now.toLocaleDateString('id-ID', { month: 'long' })
    };
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesTab = item.status === activeTab;
      const matchesSearch = item.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.sales?.toLowerCase().includes(searchTerm.toLowerCase());
      
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

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
          <div className="flex items-center gap-5">
             <div className="w-14 h-14 bg-white rounded-[1.25rem] flex items-center justify-center text-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/80 group hover:scale-105 transition-all duration-300">
                <MapPin size={26} className="group-hover:text-blue-600 transition-colors" />
             </div>
             <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Manajemen Kunjungan</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Sistem Pemantauan Site Visit Properti Terpadu</p>
                </div>
             </div>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-slate-900 text-white px-8 py-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-500/20 transition-all shadow-xl shadow-slate-200 group active:scale-95"
          >
            <div className="w-6 h-6 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <Plus size={16} />
            </div>
            Jadwalkan Kunjungan Baru
          </button>
        </div>

        {/* SUMMARY SECTION */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-8 px-2">
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Jadwal Kunjungan Bulan ini</h2>
            <div className="h-px flex-1 bg-slate-200/60" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className={`bg-white flex flex-col justify-between ${cardShadow} border border-slate-100/50 hover:-translate-y-0.5 transition-all duration-300 p-6 ${cardRound}`}>
              <div className="flex justify-between items-start mb-1">
                <div>
                  <div className="text-[11px] font-bold text-slate-400 mb-2 tracking-widest uppercase">Jadwal Kunjungan Bulan ini</div>
                  <div className="flex flex-col gap-1">
                    <span className="text-4xl font-bold text-slate-900 tracking-tight">{monthlyStats.total}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Jadwal dibuat</span>
                  </div>
                </div>
                <div className="w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-600 rounded-xl shadow-inner">
                  <CalendarDays size={18} />
                </div>
              </div>
            </div>

            <div className={`bg-white flex flex-col justify-between ${cardShadow} border border-slate-100/50 hover:-translate-y-0.5 transition-all duration-300 p-6 ${cardRound}`}>
               <div className="flex justify-between items-start mb-1">
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 mb-2 tracking-widest uppercase">Sudah Kunjungan</div>
                    <div className="text-4xl font-bold text-slate-900 tracking-tight">{monthlyStats.sudah}</div>
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center bg-emerald-50 text-emerald-600 rounded-xl shadow-inner">
                    <CheckCircle2 size={18} />
                  </div>
               </div>
               <div className="flex items-center gap-2 mt-4">
                  <span className="inline-flex items-center justify-center bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[9px] font-bold border border-emerald-100">
                    {monthlyStats.total > 0 ? Math.round((monthlyStats.sudah / monthlyStats.total) * 100) : 0}% Dari total Jadwal
                  </span>
               </div>
            </div>

            <div className={`bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none shadow-blue-200/40 relative overflow-hidden flex flex-col justify-between min-h-[140px] hover:-translate-y-0.5 transition-all duration-300 p-6 ${cardRound}`}>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shine_4s_ease-in-out_infinite]" />
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start">
                  <div className="text-[11px] font-bold text-white/70 tracking-widest uppercase">Belum berkunjung</div>
                  <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-xl backdrop-blur-md border border-white/10">
                    <Clock3 size={18} />
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-4xl font-bold tracking-tight">{monthlyStats.belum} <span className="text-sm font-medium text-white/60 tracking-normal ml-2">Sisa Jadwal</span></div>
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2">
                    <TrendingUp size={12} className="text-amber-400" />
                    <span className="text-[10px] font-bold tracking-wide uppercase opacity-70">Perlu Follow-up Segera</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DATABASE SECTION */}
        <div className={`bg-white ${cardRound} ${cardShadow} border border-slate-100/50 overflow-hidden mb-10`}>
          <div className="p-8 border-b border-slate-50/60">
            <div className="flex justify-between items-center mb-6">
               <h2 className="text-lg font-bold text-slate-800 tracking-tight flex items-center gap-3">
                  Daftar Jadwal Semua Kunjungan
                  <span className="ml-2 px-2 py-0.5 bg-blue-50 text-blue-500 rounded text-[10px] font-bold border border-blue-100">{filteredData.length} Data</span>
               </h2>
            </div>
            
            <div className="flex flex-col xl:flex-row items-center justify-between gap-4 pt-2">
               
               <div className="flex bg-slate-100/60 p-1 rounded-xl w-full xl:w-auto gap-1 border border-slate-200/40 backdrop-blur-sm shrink-0">
                {['Belum', 'Sudah'].map(tab => (
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
                 
                 {/* RANGE DATE FILTER */}
                 <div className="flex flex-col gap-1.5 w-full md:w-auto">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest px-1">Filter Jadwal Kunjungan</label>
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
                          item.status === 'Sudah' 
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100' 
                          : 'bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-900 hover:text-white'
                        }`}
                      >
                        {item.status}
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
                {loading && (
                  <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] z-50 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Memproses ke Lark...</span>
                    </div>
                  </div>
                )}
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

                <div className="space-y-2 relative">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Sales</label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input 
                      type="text"
                      placeholder="Cari nama, role, atau agensi..."
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all outline-none"
                      value={salesSearch || newSchedule.sales}
                      onFocus={() => setShowSalesDropdown(true)}
                      onChange={(e) => {
                        setSalesSearch(e.target.value);
                        setShowSalesDropdown(true);
                      }}
                    />
                    {showSalesDropdown && (
                      <div className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl max-h-48 overflow-y-auto no-scrollbar animate-fadeIn">
                        {salesList.filter(s => s.toLowerCase().includes(salesSearch.toLowerCase())).length > 0 ? (
                          salesList.filter(s => s.toLowerCase().includes(salesSearch.toLowerCase())).map((sales, idx) => (
                            <div 
                              key={idx}
                              onClick={() => {
                                setNewSchedule({ ...newSchedule, sales: sales });
                                setSalesSearch(sales);
                                setShowSalesDropdown(false);
                              }}
                              className="px-4 py-3 text-xs font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-all border-b border-slate-50 last:border-0"
                            >
                              {sales}
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-4 text-xs font-bold text-slate-400 text-center italic">Sales tidak ditemukan</div>
                        )}
                      </div>
                    )}
                  </div>
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
