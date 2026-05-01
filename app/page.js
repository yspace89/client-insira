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
      desc: 'Pantau pergerakan data NUP, Booking Fee, dan kelengkapan skema menuju konversi Akad.',
      icon: Rocket,
      color: 'blue',
      href: '/prospek-akad',
      active: true
    },
    {
      id: 'kunjungan-site',
      title: 'Kunjungan Site',
      desc: 'Monitoring jadwal dan kehadiran leads di lokasi proyek secara real-time.',
      icon: MapPin,
      color: 'emerald',
      href: '/kunjungan-site',
      active: true
    },
    {
      id: 'capaian-sales',
      title: 'Capaian Sales',
      desc: 'Analisis performa penjualan dan perolehan unit per periode.',
      icon: DollarSign,
      color: 'amber',
      href: '/capaian-sales',
      active: true
    },
    {
      id: 'tim',
      title: 'Anggota Tim',
      desc: 'Manajemen data sales agent dan monitoring produktivitas tim.',
      icon: Users,
      color: 'indigo',
      href: '/anggota-tim',
      active: true
    },
    {
      id: 'setting-harga',
      title: 'Setting Harga',
      desc: 'Konfigurasi master price dan skema promo unit properti.',
      icon: Calculator,
      color: 'rose',
      href: '/setting-harga',
      active: true
    },
    {
      id: 'agensi',
      title: 'Manajemen Agensi',
      desc: 'Kelola data partner agensi dan komisi penjualan secara terpusat.',
      icon: Building2,
      color: 'slate',
      href: '#',
      active: false
    }
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeMenu="Beranda" />

      <main className="flex-1 p-8 overflow-hidden">
        <Header title="Beranda" />

        <div className="max-w-6xl">
          {/* Welcome Banner with Mesh Gradient */}
          <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-14 shadow-2xl mb-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -mr-32 -mt-32 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px] -ml-20 -mb-20" />
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                  Research Space Hub
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter leading-tight uppercase">
                  Selamat Datang,<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Y-Space Admin</span>
                </h2>
                <p className="text-slate-400 text-lg max-w-xl leading-relaxed font-medium">
                  Optimalkan manajemen aset dan performa tim melalui ekosistem digital terintegrasi Research Space.
                </p>
              </div>
              
              <div className="hidden lg:flex flex-col items-end text-right">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Status Sistem</div>
                <div className="text-xl font-black text-white tracking-tight uppercase">Operational</div>
                <div className="mt-4 flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <img key={i} src={`https://ui-avatars.com/api/?name=U${i}&background=random&color=fff`} className="w-8 h-8 rounded-full border-2 border-slate-900" alt="user" />
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white">+12</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-8 px-2 flex items-center gap-4">
              Pilih Modul Management
              <div className="h-px flex-1 bg-slate-200" />
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((mod) => (
                <Link 
                  key={mod.id} 
                  href={mod.href} 
                  className={`group relative ${!mod.active && 'pointer-events-none opacity-60'}`}
                >
                  <div className={`h-full bg-white rounded-[2rem] p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-2 flex flex-col relative overflow-hidden`}>
                    
                    {/* Hover Effect Light */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm ${
                        mod.active 
                        ? `bg-${mod.color}-50 text-${mod.color}-600 group-hover:bg-${mod.color}-600 group-hover:text-white` 
                        : 'bg-slate-100 text-slate-400'
                      }`}>
                        <mod.icon size={28} />
                      </div>
                      
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-xl font-black text-slate-900 tracking-tight uppercase leading-none">{mod.title}</h4>
                        {mod.active && (
                          <div className="text-blue-600 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
                            <ArrowRight size={20} />
                          </div>
                        )}
                      </div>
                      
                      <p className="text-sm text-slate-500 leading-relaxed font-medium">
                        {mod.desc}
                      </p>
                      
                      {!mod.active && (
                        <div className="mt-6 inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black rounded-full uppercase tracking-wider">
                          Coming Soon
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Quick Action Footer */}
          <div className="bg-blue-600 rounded-[2rem] p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl shadow-blue-200/50">
            <div className="text-center md:text-left">
              <h4 className="text-xl font-black text-white uppercase tracking-tight mb-1">Butuh Bantuan Teknis?</h4>
              <p className="text-blue-100 text-sm font-medium opacity-80">Hubungi tim developer Research Space untuk bantuan integrasi.</p>
            </div>
            <button className="px-8 py-4 bg-white text-blue-600 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-lg">
              Open Support Ticket
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
