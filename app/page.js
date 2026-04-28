"use client";

import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Building2, Users, Rocket, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeMenu="Beranda" />

      <main className="flex-1 p-8">
        <Header title="Beranda" />

        <div className="max-w-4xl">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-bl-full opacity-50 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Selamat Datang di Portal Insira</h2>
              <p className="text-slate-500 text-lg mb-8 max-w-2xl leading-relaxed">
                Pusat manajemen terpadu untuk memantau aktivitas agensi, progres penjualan, hingga konversi akad secara *real-time*.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Modul Prospek Akad */}
                <Link href="/prospek-akad" className="group">
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all cursor-pointer h-full flex flex-col relative overflow-hidden">
                    <div className="absolute top-4 right-4 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                      <ExternalLink size={20} />
                    </div>
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Rocket size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Prospek Akad</h3>
                    <p className="text-sm text-slate-500 leading-relaxed flex-1">
                      Pantau pergerakan data NUP, Booking Fee, dan kelengkapan skema menuju konversi Akad.
                    </p>
                  </div>
                </Link>

                {/* Modul Agensi (Coming Soon) */}
                <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100 opacity-70 h-full flex flex-col">
                  <div className="w-12 h-12 bg-slate-200 text-slate-400 rounded-xl flex items-center justify-center mb-4">
                    <Building2 size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Manajemen Agensi</h3>
                  <p className="text-sm text-slate-500 leading-relaxed flex-1">
                    Kelola data partner agensi dan komisi penjualan.
                  </p>
                  <div className="mt-4 inline-block bg-slate-200 text-slate-500 text-[10px] font-bold px-2 py-1 rounded w-fit uppercase tracking-wider">Segera Hadir</div>
                </div>

                {/* Modul Tim (Coming Soon) */}
                <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100 opacity-70 h-full flex flex-col">
                  <div className="w-12 h-12 bg-slate-200 text-slate-400 rounded-xl flex items-center justify-center mb-4">
                    <Users size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Performa Tim</h3>
                  <p className="text-sm text-slate-500 leading-relaxed flex-1">
                    Analisis produktivitas dan KPI dari tim sales internal.
                  </p>
                  <div className="mt-4 inline-block bg-slate-200 text-slate-500 text-[10px] font-bold px-2 py-1 rounded w-fit uppercase tracking-wider">Segera Hadir</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
