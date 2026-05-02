"use client";

import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Building2, Users, Rocket, ExternalLink, MapPin, Calculator, DollarSign, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const modules = [
    {
      id: 'prospek-akad',
      title: 'Prospek Akad',
      desc: 'Monitoring data NUP, Booking Fee, dan skema konversi akad secara real-time.',
      icon: Rocket,
      color: 'blue',
      href: '/prospek-akad',
      active: true
    },
    {
      id: 'kunjungan-site',
      title: 'Kunjungan Site',
      desc: 'Kelola jadwal kunjungan dan kehadiran leads di lokasi proyek dengan efisien.',
      icon: MapPin,
      color: 'emerald',
      href: '/kunjungan-site',
      active: true
    },
    {
      id: 'capaian-sales',
      title: 'Capaian Sales',
      desc: 'Analisis performa penjualan, KPI sales, dan perolehan unit secara mendalam.',
      icon: DollarSign,
      color: 'amber',
      href: '/capaian-sales',
      active: true
    },
    {
      id: 'tim',
      title: 'Anggota Tim',
      desc: 'Manajemen database sales agent dan pantau produktivitas seluruh tim.',
      icon: Users,
      color: 'indigo',
      href: '/anggota-tim',
      active: true
    },
    {
      id: 'setting-harga',
      title: 'Setting Harga',
      desc: 'Konfigurasi harga master, skema promo, dan simulasi angsuran unit.',
      icon: Calculator,
      color: 'rose',
      href: '/setting-harga',
      active: true
    },
    {
      id: 'agensi',
      title: 'Manajemen Agensi',
      desc: 'Pusat data partner agensi eksternal dan pengelolaan komisi penjualan.',
      icon: Building2,
      color: 'slate',
      href: '/manajemen-agensi',
      active: true
    }
  ];

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <Sidebar activeMenu="Beranda" />

      <main className="flex-1 p-6 md:p-10 overflow-hidden">
        <Header title="Beranda" />

        <div className="max-w-6xl mx-auto">
          {/* Welcome Banner - Elegant Refinement */}
          <div className="bg-slate-900 rounded-[2rem] p-10 md:p-14 shadow-2xl mb-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[100px] -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-indigo-600/5 rounded-full blur-[80px] -ml-20 -mb-20" />
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center md:items-end gap-10">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  Ekosistem Space-Clientins
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                  Selamat Datang Kembali,<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Administrator Space-Clientins</span>
                </h2>
                <p className="text-slate-400 text-lg max-w-xl leading-relaxed font-medium">
                  Monitor dan kelola ekosistem properti Anda dengan presisi melalui modul terintegrasi.
                </p>
              </div>
              
              <div className="hidden lg:flex flex-col items-end text-right shrink-0">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[1.5rem] p-6 shadow-xl">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Performa Sistem</div>
                  <div className="text-xl font-bold text-white tracking-tight flex items-center gap-3">
                    99.8% 
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-[10px] font-bold border border-emerald-500/20 uppercase tracking-wide">Stabil</span>
                  </div>
                  <div className="mt-5 flex -space-x-1.5">
                    {[1,2,3,4].map(i => (
                      <img key={i} src={`https://ui-avatars.com/api/?name=U${i}&background=f1f5f9&color=64748b`} className="w-8 h-8 rounded-full border-2 border-slate-900" alt="user" />
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white">+12</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <div className="flex items-center gap-4 mb-10 px-2">
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">
                Modul Manajemen
              </h3>
              <div className="h-px flex-1 bg-slate-200/60" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {modules.map((mod) => (
                <Link 
                  key={mod.id} 
                  href={mod.href} 
                  className={`group relative ${!mod.active && 'pointer-events-none opacity-60'}`}
                >
                  <div className={`h-full bg-white rounded-[2rem] p-8 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-1.5 flex flex-col relative overflow-hidden`}>
                    
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-105 shadow-sm ${
                        mod.active 
                        ? `bg-${mod.color}-50 text-${mod.color}-500 group-hover:bg-${mod.color}-500 group-hover:text-white` 
                        : 'bg-slate-50 text-slate-300'
                      }`}>
                        <mod.icon size={26} strokeWidth={1.5} />
                      </div>
                      
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="text-lg font-bold text-slate-800 tracking-tight">{mod.title}</h4>
                        {mod.active && (
                          <div className="text-blue-500 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                            <ArrowRight size={18} />
                          </div>
                        )}
                      </div>
                      
                      <p className="text-sm text-slate-500 leading-relaxed font-medium">
                        {mod.desc}
                      </p>
                      
                      {!mod.active && (
                        <div className="mt-6 inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-400 text-[10px] font-bold rounded-lg uppercase tracking-wider border border-slate-100">
                          Segera Hadir
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Quick Action - Elegant Dark Footer */}
          <div className="bg-slate-900 rounded-[2.5rem] p-10 flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-transparent" />
            <div className="text-center md:text-left relative z-10">
              <h4 className="text-xl font-bold text-white tracking-tight mb-1">Bantuan Teknis</h4>
              <p className="text-slate-400 text-sm font-medium opacity-80">Butuh bantuan? Hubungi tim support developer Space-Clientins.</p>
            </div>
            <button className="px-8 py-4 bg-white text-slate-900 rounded-2xl text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-blue-600 hover:text-white transition-all shadow-xl relative z-10">
              Buka Tiket Support
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
