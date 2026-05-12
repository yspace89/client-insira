"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { 
  Building2, 
  Users, 
  Rocket, 
  MapPin, 
  Calculator, 
  DollarSign, 
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  TrendingUp,
  RefreshCw,
  Search,
  Maximize2,
  X,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { 
  ModernDonut, 
  Sparkline,
  MetricStat, 
  AktivitasTableItem, 
  InteraksiTableItem,
  LeaderboardItem, 
  LinearProgressBar,
  CommandPalette
} from '../components/DashboardWidgets';

export default function Home() {
  const [activeTab, setActiveTab] = useState('ringkasan'); // ringkasan | aktivitas
  const [period, setPeriod] = useState('Quartal Ini');
  const [role, setRole] = useState('Memorial Representative');
  const [metricFilter, setMetricFilter] = useState('CIT');
  const [expandedInteraksiId, setExpandedInteraksiId] = useState(null);
  const [expandedAktivitasId, setExpandedAktivitasId] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  // Data States
  const [fullAktivitasData, setFullAktivitasData] = useState([]);
  const [fullInteraksiData, setFullInteraksiData] = useState([]);
  const [isLoadingAktivitas, setIsLoadingAktivitas] = useState(true);
  const [isLoadingInteraksi, setIsLoadingInteraksi] = useState(true);
  const [error, setError] = useState(null);

  // Activity & Interaction States
  const [searchAktivitas, setSearchAktivitas] = useState('');
  const [currentPageAktivitas, setCurrentPageAktivitas] = useState(1);
  const [searchInteraksi, setSearchInteraksi] = useState('');
  const [currentPageInteraksi, setCurrentPageInteraksi] = useState(1);
  const itemsPerPage = 5; // PRD Section 6.7: Default 5 baris per halaman

  // Fetch Data from Lark
  const fetchLarkData = async () => {
    setIsLoadingAktivitas(true);
    setIsLoadingInteraksi(true);
    setError(null);
    
    try {
      const [aktRes, intRes] = await Promise.all([
        fetch('/api/aktivitas'),
        fetch('/api/interaksi')
      ]);
      
      if (!aktRes.ok || !intRes.ok) throw new Error("Gagal mengambil data dari server.");
      
      const aktData = await aktRes.json();
      const intData = await intRes.json();
      
      setFullAktivitasData(aktData);
      setFullInteraksiData(intData);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Terjadi kesalahan saat memuat data Lark.");
    } finally {
      setIsLoadingAktivitas(false);
      setIsLoadingInteraksi(false);
    }
  };

  useEffect(() => {
    fetchLarkData();
  }, []);

  const modules = [
    { id: 'prospek-akad', title: 'Prospek Akad', desc: 'Monitoring data NUP, Booking Fee, dan skema konversi akad.', icon: Rocket, color: 'blue', href: '/prospek-akad', active: true },
    { id: 'kunjungan-site', title: 'Kunjungan Site', desc: 'Kelola jadwal kunjungan dan kehadiran leads di lokasi proyek.', icon: MapPin, color: 'emerald', href: '/kunjungan-site', active: true },
    { id: 'capaian-sales', title: 'Capaian Sales', desc: 'Analisis performa penjualan, KPI sales, dan perolehan unit.', icon: DollarSign, color: 'amber', href: '/capaian-sales', active: true },
    { id: 'tim', title: 'Anggota Tim', desc: 'Manajemen database sales agent dan pantau produktivitas.', icon: Users, color: 'indigo', href: '/anggota-tim', active: true },
    { id: 'setting-harga', title: 'Setting Harga', desc: 'Konfigurasi harga master, skema promo, dan simulasi unit.', icon: Calculator, color: 'rose', href: '/setting-harga', active: true },
    { id: 'agensi', title: 'Manajemen Agensi', desc: 'Pusat data partner agensi eksternal dan komisi penjualan.', icon: Building2, color: 'slate', href: '/manajemen-agensi', active: true }
  ];

  const leaderboardData = [
    { rank: 1, name: 'Rizki Andriana', value: 'Rp 69.600.000', avatar: null },
    { rank: 2, name: 'Sapto Pratolo', value: 'Rp 45.200.000', avatar: null },
    { rank: 3, name: 'Harum Kusumawati', value: 'Rp 38.500.000', avatar: null }
  ];

  // Filtering Logic (PRD 7.1)
  const filteredAktivitas = useMemo(() => {
    return (fullAktivitasData || []).filter(item => 
      String(item.salesName || "").toLowerCase().includes(searchAktivitas.toLowerCase())
    );
  }, [searchAktivitas, fullAktivitasData]);

  const filteredInteraksi = useMemo(() => {
    return (fullInteraksiData || []).filter(item => 
      String(item.salesName || "").toLowerCase().includes(searchInteraksi.toLowerCase())
    );
  }, [searchInteraksi, fullInteraksiData]);

  // Pagination
  const paginate = (data, page) => {
    const start = (page - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  };

  const totalPagesAktivitas = Math.ceil(filteredAktivitas.length / itemsPerPage);
  const totalPagesInteraksi = Math.ceil(filteredInteraksi.length / itemsPerPage);

  const currentAktivitasItems = paginate(filteredAktivitas, currentPageAktivitas);
  const currentInteraksiItems = paginate(filteredInteraksi, currentPageInteraksi);

  return (
    <div className="flex min-h-screen bg-slate-50/50 font-sans antialiased text-slate-900">
      <Sidebar activeMenu="Beranda" />

      <main className="flex-1 p-6 md:p-10 overflow-hidden">
        <Header title="Beranda" />

        <div className="max-w-6xl mx-auto space-y-10">
          {/* Welcome Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-4">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard Laporan Penjualan</h1>
              <p className="text-slate-400 text-sm font-medium">Ringkasan data penjualan dan performa anggota</p>
            </div>
            <CommandPalette />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-4 px-2">
            <div className="relative">
              <select 
                className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2.5 pr-10 text-xs font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all cursor-pointer shadow-sm hover:border-blue-200"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
              >
                <option>Semua</option>
                <option>Quartal Ini</option>
                <option>Bulan Ini</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
            <button 
              onClick={fetchLarkData}
              className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-500 transition-all shadow-sm"
            >
              <RefreshCw size={18} className={isLoadingAktivitas || isLoadingInteraksi ? 'animate-spin' : ''} />
            </button>
          </div>

          {/* Ringkasan Capaian - BENTO GRID RESTORED */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-[0_8px_40px_rgba(0,0,0,0.03)] relative overflow-hidden group hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] -mr-20 -mt-20 group-hover:bg-blue-500/10 transition-colors" />
              <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8 h-full">
                <div className="flex flex-col justify-between flex-1">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600"><TrendingUp size={20} /></div>
                      <h2 className="text-xl font-bold text-slate-800 tracking-tight">Capaian CIT</h2>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Akad Terlaksana</span>
                      <div className="flex items-baseline gap-3">
                        <h3 className="text-3xl font-black text-slate-900 tracking-tighter">Rp 1.076.200.000</h3>
                        <div className="flex items-center gap-1 text-emerald-500 text-[10px] font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100"><ChevronUp size={10} /> +12.5%</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100 shadow-inner"><div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 w-[7%]" /></div>
                      <span className="text-[10px] font-bold text-slate-400">7% of Target</span>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <MetricStat label="Target Tahunan" value="Rp 38.5M" />
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Weekly Trend</span>
                        <Sparkline data={[20, 35, 25, 45, 40, 55, 50]} color="#2563eb" width={120} height={30} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center md:border-l md:border-slate-50 md:pl-8">
                  <ModernDonut value={1076200000} max={38500000000} label="Pencapaian" subLabel="7.2%" color="blue" size={180} />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-[0_8px_40px_rgba(0,0,0,0.03)] relative overflow-hidden group hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-500">
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-emerald-500/5 rounded-full blur-[60px] group-hover:bg-emerald-500/10 transition-colors" />
              <div className="relative z-10 flex flex-col items-center text-center h-full justify-between">
                <div className="w-full flex justify-between items-start mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600"><DollarSign size={20} /></div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Revenue (CIR)</span>
                    <h3 className="text-lg font-bold text-slate-800 tracking-tight">Rp 51.4M</h3>
                  </div>
                </div>
                <ModernDonut value={51417000} max={3000000000} label="CIR Progress" subLabel="2.1%" color="emerald" size={150} />
                <div className="w-full mt-6 pt-6 border-t border-slate-50 flex justify-between items-center">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Status Target</span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100 mt-1">Healthy</span>
                  </div>
                  <Sparkline data={[10, 15, 12, 18, 22, 20, 25]} color="#10b981" width={80} height={20} />
                </div>
              </div>
            </div>
          </div>

          {/* Performa Anggota Section - RESTORED TABS */}
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 px-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Performa Anggota</h2>
                <p className="text-sm text-slate-400 font-medium tracking-tight">Pantau produktivitas dan KPI tim secara real-time.</p>
              </div>
              <div className="relative">
                <select 
                  className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2.5 pr-10 text-xs font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all cursor-pointer shadow-sm"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option>Memorial Representative</option>
                  <option>Manager</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex justify-center mb-10">
              <div className="bg-slate-200/50 backdrop-blur-md p-1.5 rounded-[1.5rem] flex gap-1 shadow-inner w-full max-w-md">
                <button 
                  onClick={() => setActiveTab('ringkasan')}
                  className={`flex-1 px-6 py-3 rounded-2xl text-xs font-bold transition-all duration-500 ${activeTab === 'ringkasan' ? 'bg-white text-slate-900 shadow-xl scale-[1.02]' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Ringkasan Performa
                </button>
                <button 
                  onClick={() => setActiveTab('aktivitas')}
                  className={`flex-1 px-6 py-3 rounded-2xl text-xs font-bold transition-all duration-500 ${activeTab === 'aktivitas' ? 'bg-white text-slate-900 shadow-xl scale-[1.02]' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Detail Aktivitas
                </button>
              </div>
            </div>

            <div className="animate-fadeIn">
              {activeTab === 'ringkasan' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500 rounded-full group-hover:scale-y-110 transition-transform" />
                    <h3 className="text-lg font-bold text-slate-800 mb-10 px-1 flex items-center gap-3">Akumulasi Capaian <TrendingUp size={18} className="text-emerald-500" /></h3>
                    <div className="space-y-12">
                      <LinearProgressBar label="Total CIT" value="Rp 69.6M" max="Rp 1B" percentage={7} status="Target Kritis" />
                      <LinearProgressBar label="Total CIR" value="Rp 34.2M" max="Rp 1B" percentage={3} status="Target Kritis" color="emerald" />
                    </div>
                  </div>
                  <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500 rounded-full group-hover:scale-y-110 transition-transform" />
                    <div className="flex justify-between items-center mb-10 px-1">
                      <h3 className="text-lg font-bold text-slate-800">Papan Peringkat</h3>
                    </div>
                    <div className="space-y-4">
                      {leaderboardData.map((item) => (
                        <LeaderboardItem key={item.rank} {...item} />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* PRD COMPLIANT TABLES SECTION */
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  {/* Interaksi Sales */}
                  <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm flex flex-col min-h-[500px]">
                    <div className="mb-6"><h3 className="text-base font-bold text-slate-800">Riwayat Komunikasi Leads</h3><span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest">Update Terakhir (Lark)</span></div>
                    <div className="relative mb-6">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                      <input type="text" placeholder="Cari Nama Sales..." className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-9 pr-4 text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" value={searchInteraksi} onChange={(e) => setSearchInteraksi(e.target.value)} />
                    </div>
                    <div className="flex-1 overflow-x-auto no-scrollbar relative">
                      {isLoadingInteraksi && <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center z-20"><Loader2 className="animate-spin text-blue-500" size={24} /></div>}
                      <table className="w-full text-left border-separate border-spacing-y-2.5">
                        <thead><tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest"><th className="px-4 pb-1">Sales & Leads</th><th className="px-4 pb-1 text-center">Status</th><th className="px-4 pb-1 text-right">Aksi</th></tr></thead>
                        <tbody>{currentInteraksiItems.map(item => <InteraksiTableItem key={item.id} item={item} isExpanded={expandedInteraksiId === item.id} onToggle={() => setExpandedInteraksiId(expandedInteraksiId === item.id ? null : item.id)} />)}</tbody>
                      </table>
                    </div>
                    <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
                      <span className="text-[9px] font-bold text-slate-400">Total: {filteredInteraksi.length}</span>
                      <div className="flex items-center gap-2">
                        <button disabled={currentPageInteraksi === 1} onClick={() => setCurrentPageInteraksi(p => p - 1)} className="p-1.5 rounded-lg border border-slate-100 disabled:opacity-30"><ChevronLeft size={16} /></button>
                        <button disabled={currentPageInteraksi === totalPagesInteraksi} onClick={() => setCurrentPageInteraksi(p => p + 1)} className="p-1.5 rounded-lg border border-slate-100 disabled:opacity-30"><ChevronRight size={16} /></button>
                      </div>
                    </div>
                  </div>
                  {/* Aktivitas Sales */}
                  <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm flex flex-col min-h-[500px]">
                    <div className="mb-6"><h3 className="text-base font-bold text-slate-800">Log Kegiatan Sales</h3><span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Update Terakhir (Lark)</span></div>
                    <div className="relative mb-6">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                      <input type="text" placeholder="Cari Nama Sales..." className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-9 pr-4 text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all" value={searchAktivitas} onChange={(e) => setSearchAktivitas(e.target.value)} />
                    </div>
                    <div className="flex-1 overflow-x-auto no-scrollbar relative">
                      {isLoadingAktivitas && <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center z-20"><Loader2 className="animate-spin text-emerald-500" size={24} /></div>}
                      <table className="w-full text-left border-separate border-spacing-y-2.5">
                        <thead><tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest"><th className="px-4 pb-1">Sales Rep</th><th className="px-4 pb-1 text-center">Tipe</th><th className="px-4 pb-1 text-right">Detail</th></tr></thead>
                        <tbody>{currentAktivitasItems.map(item => <AktivitasTableItem key={item.id} item={item} isExpanded={expandedAktivitasId === item.id} onToggle={() => setExpandedAktivitasId(expandedAktivitasId === item.id ? null : item.id)} onPhotoClick={setPhotoPreview} />)}</tbody>
                      </table>
                    </div>
                    <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
                      <span className="text-[9px] font-bold text-slate-400">Total: {filteredAktivitas.length}</span>
                      <div className="flex items-center gap-2">
                        <button disabled={currentPageAktivitas === 1} onClick={() => setCurrentPageAktivitas(p => p - 1)} className="p-1.5 rounded-lg border border-slate-100 disabled:opacity-30"><ChevronLeft size={16} /></button>
                        <button disabled={currentPageAktivitas === totalPagesAktivitas} onClick={() => setCurrentPageAktivitas(p => p + 1)} className="p-1.5 rounded-lg border border-slate-100 disabled:opacity-30"><ChevronRight size={16} /></button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Akses Cepat Modul - RESTORED */}
          <div>
            <div className="flex items-center gap-4 mb-10 px-4">
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">Akses Cepat Modul</h3>
              <div className="h-px flex-1 bg-slate-200/60" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 px-2">
              {modules.map((mod) => (
                <Link key={mod.id} href={mod.href} className={`group relative ${!mod.active && 'pointer-events-none opacity-60'}`}>
                  <div className={`h-full bg-white rounded-3xl p-6 border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1.5 flex flex-col items-center text-center relative overflow-hidden`}>
                    <div className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 bg-${mod.color}-50 text-${mod.color}-500 group-hover:bg-${mod.color}-500 group-hover:text-white`}>
                      <mod.icon size={22} strokeWidth={2} />
                    </div>
                    <h4 className="relative z-10 text-[11px] font-bold text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors uppercase">{mod.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Support Banner - RESTORED */}
          <div className="bg-slate-900 rounded-[3rem] p-12 flex flex-col md:flex-row justify-between items-center gap-10 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent" />
            <div className="text-center md:text-left relative z-10">
              <h4 className="text-2xl font-bold text-white tracking-tight mb-2">Bantuan Teknis</h4>
              <p className="text-slate-400 text-sm font-medium opacity-80 max-w-md">Butuh bantuan? Tim support kami siap membantu operasional harian Anda agar tetap lancar.</p>
            </div>
            <button className="px-10 py-5 bg-white text-slate-900 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all shadow-2xl relative z-10">Hubungi Support</button>
          </div>
        </div>
      </main>

      {/* Photo Modal Preview (PRD 7.2) */}
      {photoPreview && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md" onClick={() => setPhotoPreview(null)} />
          <div className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl animate-fadeInUp">
            <div className="absolute top-4 right-4 z-10 flex gap-2">
               <button onClick={() => window.open(photoPreview, '_blank')} className="w-10 h-10 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-white/40"><Maximize2 size={18} /></button>
               <button onClick={() => setPhotoPreview(null)} className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 shadow-lg"><X size={24} /></button>
            </div>
            <img src={photoPreview} alt="Full Preview" className="w-full h-auto max-h-[85vh] object-contain bg-slate-950" />
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-fadeInUp { animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
