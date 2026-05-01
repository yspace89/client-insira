"use client";

import React, { useState } from 'react';
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
  PhoneCall
} from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

export default function KunjunganSite() {
  const [activeTab, setActiveTab] = useState('Belum berkunjung');
  const [searchTerm, setSearchTerm] = useState('');

  const stats = [
    { label: 'Jadwal Hari Ini', count: 12, icon: CalendarDays, color: 'text-blue-500', bg: 'bg-blue-50/50' },
    { label: 'Di Lokasi', count: 4, icon: MapPin, color: 'text-emerald-500', bg: 'bg-emerald-50/50' },
    { label: 'Total Terjadwal', count: 48, icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-50/50' },
  ];

  const kunjunganData = [
    { id: 1, name: 'Bpk. Ahmad Subarjo', phone: '081234567890', schedule: 'Senin, 27 April 2026', time: '10:00 WIB', location: 'Cluster A - Unit 12', sales: 'Zulkipli Nasution', status: 'Belum berkunjung' },
    { id: 2, name: 'Ibu Ratna Sari', phone: '085678901234', schedule: 'Senin, 27 April 2026', time: '13:30 WIB', location: 'Cluster B - Unit 05', sales: 'Ani Wijaya', status: 'Sudah berkunjung' },
    { id: 3, name: 'Bpk. Hendra Kurniawan', phone: '087788990011', schedule: 'Selasa, 28 April 2026', time: '09:00 WIB', location: 'Cluster A - Unit 20', sales: 'Budi Santoso', status: 'Belum berkunjung' },
    { id: 4, name: 'Ibu Maya Indah', phone: '081122334455', schedule: 'Selasa, 28 April 2026', time: '15:00 WIB', location: 'Cluster C - Unit 02', sales: 'Zulkipli Nasution', status: 'Belum berkunjung' },
    { id: 5, name: 'Bpk. Joko Anwar', phone: '089900112233', schedule: 'Rabu, 29 April 2026', time: '11:00 WIB', location: 'Cluster B - Unit 15', sales: 'Siti Aminah', status: 'Sudah berkunjung' },
    { id: 6, name: 'Ibu Fitriani', phone: '081223344556', schedule: 'Rabu, 29 April 2026', time: '14:00 WIB', location: 'Cluster A - Unit 08', sales: 'Hendro Wibowo', status: 'Belum berkunjung' },
  ];

  const filteredData = kunjunganData.filter(item => {
    const matchesTab = item.status === activeTab;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.sales.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <Sidebar activeMenu="Kunjungan Site" />

      <main className="flex-1 p-6 md:p-10 overflow-hidden">
        <Header title="Kunjungan Site" />

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
          <div className="flex bg-slate-200/40 p-1 rounded-xl w-fit gap-1 border border-slate-100">
            {['Belum berkunjung', 'Sudah berkunjung'].map(tab => (
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
            <Plus size={18} />
            Jadwalkan Kunjungan Baru
          </button>
        </div>

        <section className="mb-12">
          <div className="flex items-center gap-3 mb-8 px-2">
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Metrik Operasional</h2>
            <div className="h-px flex-1 bg-slate-200/60" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-md transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-105 transition-transform`}>
                    <stat.icon size={24} strokeWidth={1.5} />
                  </div>
                  <div className="text-3xl font-bold text-slate-800 tracking-tight leading-none">{stat.count}</div>
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-white rounded-[2rem] shadow-[0_8px_40px_rgba(0,0,0,0.02)] border border-slate-100 overflow-hidden mb-10">
          <div className="p-8 flex flex-col lg:flex-row justify-between items-center gap-8 border-b border-slate-50/60">
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">Jadwal Kunjungan <span className="ml-4 px-2 py-0.5 bg-blue-50 text-blue-500 rounded text-[10px] font-bold border border-blue-100">{filteredData.length} Data</span></h2>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              <div className="relative flex-1 sm:w-72">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <input 
                  type="text" 
                  placeholder="Cari prospek atau sales..." 
                  className="w-full pl-11 pr-4 py-3 text-xs bg-slate-50/50 border border-slate-100 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-200 transition-all font-medium outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative sm:w-56">
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <Calendar size={14} className="text-slate-400" />
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">Filter Jadwal Kunjungan</span>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/30">
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center w-20">No</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Informasi Customer</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Detail Jadwal</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lokasi</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sales Terkait</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredData.map((item, idx) => (
                  <tr key={item.id} className="group hover:bg-slate-50/40 transition-all">
                    <td className="px-8 py-6 text-xs text-slate-300 text-center font-bold tabular-nums">{String(idx + 1).padStart(2, '0')}</td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800 tracking-tight">{item.name}</span>
                        <a href={`https://wa.me/${item.phone}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-500 mt-1 hover:text-emerald-600 transition-colors">
                          <PhoneCall size={10} strokeWidth={2.5} />
                          {item.phone}
                        </a>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-700">
                          <Calendar size={12} className="text-slate-300" />
                          {item.schedule}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-medium text-slate-400">
                          <Clock size={12} className="text-slate-200" />
                          {item.time}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-xs font-bold text-slate-600 tracking-tight uppercase">{item.location}</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                          {item.sales.charAt(0)}
                        </div>
                        <span className="text-[11px] font-bold text-slate-700">{item.sales}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="px-5 py-2.5 bg-slate-50 text-slate-600 hover:bg-blue-600 hover:text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all border border-slate-100 shadow-sm">
                        Lihat Info
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-8 flex flex-col md:flex-row justify-between items-center bg-slate-50/40 gap-6">
            <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">
              Halaman 01 <span className="mx-2 opacity-20">|</span> Menampilkan {filteredData.length} data
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
    </div>
  );
}
