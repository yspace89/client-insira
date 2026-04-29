"use client";

import React, { useState, useMemo } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { 
  DollarSign, 
  Calendar, 
  Tag, 
  Info, 
  TrendingDown, 
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Zap,
  Calculator
} from 'lucide-react';

export default function SettingHarga() {
  // --- STATE ---
  const [masterPrice, setMasterPrice] = useState(500000000); // 500 Juta
  const [promoStart, setPromoStart] = useState('');
  const [promoEnd, setPromoEnd] = useState('');
  const [promoNominal, setPromoNominal] = useState(10000000); // 10 Juta
  
  const [targetType, setTargetType] = useState('Type 36');
  const [minQty, setMinQty] = useState(2);
  const [additionalDiscount, setAdditionalDiscount] = useState(5000000); // 5 Juta

  // Simulation State
  const [simQty, setSimQty] = useState(1);
  const [simType, setSimType] = useState('Type 36');

  // --- LOGIC ---
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(val);
  };

  const getPricePerUnit = (type, qty, dateStr) => {
    let basePrice = masterPrice;
    const currentDate = dateStr ? new Date(dateStr) : new Date();
    
    let isPromoActive = false;
    if (promoStart && promoEnd) {
      const start = new Date(promoStart);
      const end = new Date(promoEnd);
      if (currentDate >= start && currentDate <= end) {
        basePrice = masterPrice - promoNominal;
        isPromoActive = true;
      }
    }

    let isAdditionalApplied = false;
    if (type === targetType && qty >= minQty) {
      basePrice = basePrice - additionalDiscount;
      isAdditionalApplied = true;
    }

    return { 
      price: basePrice, 
      isPromoActive, 
      isAdditionalApplied 
    };
  };

  const simulation = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const scenario1 = getPricePerUnit(simType, 1, today);
    const scenarioX = getPricePerUnit(simType, simQty, today);

    return {
      scenario1,
      scenarioX,
      totalX: scenarioX.price * simQty
    };
  }, [masterPrice, promoStart, promoEnd, promoNominal, targetType, minQty, additionalDiscount, simQty, simType]);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeMenu="Setting Harga" />

      <main className="flex-1 p-8 overflow-y-auto">
        <Header title="Setting Harga" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl">
          
          {/* LEFT COLUMN: CONFIGURATION */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* SECTION A: MASTER PRICE */}
            <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <DollarSign size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Harga Master</h3>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Base Unit Price Configuration</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Harga Pokok Unit (Rp)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span>
                    <input 
                      type="number" 
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-lg font-bold text-slate-800"
                      value={masterPrice}
                      onChange={(e) => setMasterPrice(Number(e.target.value))}
                    />
                  </div>
                  <p className="mt-2 text-xs text-slate-400 italic flex items-center gap-1">
                    <Info size={12} />
                    Harga ini akan menjadi patokan dasar sebelum promo/diskon.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION B: PROMO PRICE */}
            <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full -z-0 opacity-50" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">Promo Periode</h3>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Seasonal Event Discounts</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Tanggal Mulai</label>
                    <input 
                      type="date" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none"
                      value={promoStart}
                      onChange={(e) => setPromoStart(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Tanggal Berakhir</label>
                    <input 
                      type="date" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none"
                      value={promoEnd}
                      onChange={(e) => setPromoEnd(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nominal Potongan Promo (Rp)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span>
                    <input 
                      type="number" 
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none text-lg font-bold text-slate-800"
                      value={promoNominal}
                      onChange={(e) => setPromoNominal(Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION C: CONDITIONAL DISCOUNT */}
            <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                  <Tag size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Diskon Tambahan (Layered)</h3>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Conditional & Volume Discount</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Tipe Unit</label>
                  <select 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none appearance-none"
                    value={targetType}
                    onChange={(e) => setTargetType(e.target.value)}
                  >
                    <option>Type 36</option>
                    <option>Type 45</option>
                    <option>Type 60</option>
                    <option>Ruko</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Minimal Pembelian (Unit)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold"
                      value={minQty}
                      onChange={(e) => setMinQty(Number(e.target.value))}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">Unit</span>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nominal Diskon per Unit (Rp)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span>
                    <input 
                      type="number" 
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-lg font-bold text-slate-800"
                      value={additionalDiscount}
                      onChange={(e) => setAdditionalDiscount(Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: PREVIEW & SIMULATION */}
          <div className="space-y-6">
            
            {/* REAL-TIME PREVIEW CARD */}
            <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl sticky top-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Calculator size={18} className="text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Simulation Engine</span>
                </div>
                <div className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded-lg uppercase">
                  Active Real-time
                </div>
              </div>

              <div className="space-y-8">
                {/* Scenario 1: Basic Purchase */}
                <div>
                  <div className="flex items-center gap-2 text-slate-400 mb-3">
                    <ArrowRight size={14} />
                    <span className="text-sm font-medium">Jika Beli 1 Unit (Tanpa Syarat)</span>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <div className="text-2xl font-bold mb-1">
                      {formatCurrency(simulation.scenario1.price)}
                    </div>
                    <div className="flex gap-2">
                      {simulation.scenario1.isPromoActive && (
                        <span className="flex items-center gap-1 text-[10px] bg-amber-400/20 text-amber-400 px-2 py-0.5 rounded font-bold uppercase">
                          <Zap size={10} /> Promo Aktif
                        </span>
                      )}
                      {!simulation.scenario1.isPromoActive && (
                        <span className="text-[10px] text-slate-500 font-medium italic">Menggunakan Harga Master</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Scenario 2: Volume Purchase */}
                <div>
                  <div className="flex items-center gap-2 text-slate-400 mb-3">
                    <ArrowRight size={14} />
                    <span className="text-sm font-medium">Simulasi Pembelian Volume</span>
                  </div>
                  
                  <div className="flex gap-2 mb-4">
                    <div className="flex-1">
                      <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Qty</label>
                      <input 
                        type="number" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm focus:border-amber-400 outline-none"
                        value={simQty}
                        onChange={(e) => setSimQty(Number(e.target.value))}
                      />
                    </div>
                    <div className="flex-[2]">
                      <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Tipe</label>
                      <select 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm focus:border-amber-400 outline-none appearance-none"
                        value={simType}
                        onChange={(e) => setSimType(e.target.value)}
                      >
                        <option className="text-slate-900">Type 36</option>
                        <option className="text-slate-900">Type 45</option>
                        <option className="text-slate-900">Type 60</option>
                        <option className="text-slate-900">Ruko</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 shadow-lg border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold opacity-80 uppercase tracking-wider">Total Pembayaran</span>
                      <ShoppingBag size={18} className="opacity-50" />
                    </div>
                    <div className="text-3xl font-bold mb-2">
                      {formatCurrency(simulation.totalX)}
                    </div>
                    <div className="text-[11px] opacity-70 mb-4 font-medium italic">
                      Harga per unit: {formatCurrency(simulation.scenarioX.price)}
                    </div>

                    <div className="space-y-2 border-t border-white/10 pt-4">
                      {simulation.scenarioX.isPromoActive && (
                        <div className="flex items-center gap-2 text-xs">
                          <TrendingDown size={14} className="text-amber-400" />
                          <span>Promo Periode Berhasil Digunakan</span>
                        </div>
                      )}
                      {simulation.scenarioX.isAdditionalApplied && (
                        <div className="flex items-center gap-2 text-xs">
                          <ShieldCheck size={14} className="text-emerald-400" />
                          <span>Diskon Tambahan (Layer) Terdeteksi</span>
                        </div>
                      )}
                      {!simulation.scenarioX.isAdditionalApplied && simQty < minQty && (
                        <div className="flex items-center gap-2 text-[11px] text-white/50 bg-black/20 p-2 rounded-lg leading-tight">
                          <Info size={14} className="flex-shrink-0" />
                          <span>Tambah {minQty - simQty} unit lagi untuk mendapatkan diskon tambahan {formatCurrency(additionalDiscount)}/unit.</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button className="w-full bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold py-4 rounded-2xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2">
                  <ShieldCheck size={20} />
                  Simpan Konfigurasi Harga
                </button>
                <p className="text-center text-[10px] text-slate-500 mt-4 uppercase tracking-widest font-bold">
                  Last updated: Today, 16:45
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
