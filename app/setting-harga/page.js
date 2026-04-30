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
  ShieldCheck,
  Zap,
  Calculator,
  Plus,
  Trash2,
  CheckCircle2,
  ChevronUp,
  ChevronDown,
  Layers,
  Target,
  Share2,
  LineChart,
  LayoutGrid,
  ArrowRight,
  Save,
  Loader2,
  X,
  ArrowUpRight,
  Receipt,
  Cpu
} from 'lucide-react';

const PriceField = ({ label, value, onChange, isReadOnly, percentage }) => (
  <div className="group">
    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">{label}</label>
    <div className={`relative flex items-center bg-white border ${isReadOnly ? 'border-slate-100 bg-slate-50/40' : 'border-slate-200'} rounded-2xl transition-all ${!isReadOnly && 'focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-50/50 shadow-sm'}`}>
      <span className="pl-4 text-slate-300 font-bold text-sm select-none">Rp</span>
      <input 
        type="text" 
        readOnly={isReadOnly}
        className={`w-full pl-2 pr-16 py-3.5 bg-transparent outline-none font-bold text-slate-700 ${isReadOnly ? 'cursor-default' : 'cursor-text'}`}
        value={formatDisplayNumber(value)} 
        onChange={!isReadOnly ? (e) => onChange(parseFormattedNumber(e.target.value)) : undefined} 
      />
      {percentage !== undefined && (
        <div className="absolute right-3 px-2 py-1 bg-blue-50 border border-blue-100 rounded-lg">
          <span className="text-[10px] font-bold text-blue-600">{percentage}%</span>
        </div>
      )}
    </div>
  </div>
);

const formatDisplayNumber = (val) => {
  if (val === undefined || val === null || isNaN(val)) return "0";
  return new Intl.NumberFormat('id-ID').format(val);
};

const parseFormattedNumber = (val) => {
  return Number(val.replace(/\./g, ''));
};

export default function SettingHarga() {
  const initialUnitsData = {
    'Single': { masterAtNeed: 45100000, masterAtNeedUnit: 40000000, masterPreNeed: 19900000, masterPreNeedUnit: 17000000, seasonalAtNeed: 0, seasonalPreNeed: 0 },
    'Single Premiere': { masterAtNeed: 50100000, masterAtNeedUnit: 45000000, masterPreNeed: 24900000, masterPreNeedUnit: 22000000, seasonalAtNeed: 0, seasonalPreNeed: 0 },
    'Couple': { masterAtNeed: 125000000, masterAtNeedUnit: 110000000, masterPreNeed: 59900000, masterPreNeedUnit: 53000000, seasonalAtNeed: 0, seasonalPreNeed: 0 },
    'Couple Premiere': { masterAtNeed: 175000000, masterAtNeedUnit: 155000000, masterPreNeed: 84900000, masterPreNeedUnit: 75000000, seasonalAtNeed: 0, seasonalPreNeed: 0 },
    'Family': { masterAtNeed: 325000000, masterAtNeedUnit: 290000000, masterPreNeed: 189000000, masterPreNeedUnit: 165000000, seasonalAtNeed: 0, seasonalPreNeed: 0 },
    'Signature Family': { masterAtNeed: 825000000, masterAtNeedUnit: 750000000, masterPreNeed: 501000000, masterPreNeedUnit: 450000000, seasonalAtNeed: 0, seasonalPreNeed: 0 }
  };

  const defaultDates = {
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0]
  };

  const [activeConfigUnit, setActiveConfigUnit] = useState('Single');
  const [configs, setConfigs] = useState({
    'Single': { ...initialUnitsData['Single'], ...defaultDates, minDP: 2000000, minBooking: 5000000, tiers: [{ id: 1, minQty: 2, discount: 1000000 }], discountMode: 'after-min' },
    'Single Premiere': { ...initialUnitsData['Single Premiere'], ...defaultDates, minDP: 2000000, minBooking: 5000000, tiers: [{ id: 1, minQty: 2, discount: 1000000 }], discountMode: 'after-min' },
    'Couple': { ...initialUnitsData['Couple'], ...defaultDates, minDP: 5000000, minBooking: 10000000, tiers: [{ id: 1, minQty: 2, discount: 2000000 }], discountMode: 'after-min' },
    'Couple Premiere': { ...initialUnitsData['Couple Premiere'], ...defaultDates, minDP: 5000000, minBooking: 10000000, tiers: [{ id: 1, minQty: 2, discount: 2000000 }], discountMode: 'after-min' },
    'Family': { ...initialUnitsData['Family'], ...defaultDates, minDP: 10000000, minBooking: 25000000, tiers: [{ id: 1, minQty: 2, discount: 5000000 }], discountMode: 'after-min' },
    'Signature Family': { ...initialUnitsData['Signature Family'], ...defaultDates, minDP: 25000000, minBooking: 50000000, tiers: [{ id: 1, minQty: 2, discount: 10000000 }], discountMode: 'after-min' }
  });

  const [simQty, setSimQty] = useState(2);
  const [simMode, setSimMode] = useState('master');
  const [simCategory, setSimCategory] = useState('preNeed');
  const [isSimModalOpen, setIsSimModalOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState('idle');

  const updateConfig = (unit, field, value) => setConfigs(prev => ({ ...prev, [unit]: { ...prev[unit], [field]: value } }));

  const addTier = (unit) => {
    const currentTiers = configs[unit].tiers;
    const lastTier = [...currentTiers].sort((a, b) => a.minQty - b.minQty)[currentTiers.length - 1];
    const newTier = { id: Date.now(), minQty: lastTier ? lastTier.minQty + 2 : 2, discount: lastTier ? lastTier.discount * 2 : 5000000 };
    updateConfig(unit, 'tiers', [...currentTiers, newTier]);
  };

  const removeTier = (unit, id) => updateConfig(unit, 'tiers', configs[unit].tiers.filter(t => t.id !== id));
  const updateTier = (unit, id, field, value) => updateConfig(unit, 'tiers', configs[unit].tiers.map(t => t.id === id ? { ...t, [field]: Number(value) } : t));

  const formatCurrency = (val) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);

  const calculateForQty = (unit, qty) => {
    const cfg = configs[unit];
    const priceKey = simMode === 'master' ? (simCategory === 'atNeed' ? 'masterAtNeed' : 'masterPreNeed') : (simCategory === 'atNeed' ? 'seasonalAtNeed' : 'seasonalPreNeed');
    const unitPriceBeforeAdditional = cfg[priceKey] || 0;
    const subtotalBeforeAdditional = unitPriceBeforeAdditional * qty;
    const activeTier = [...cfg.tiers].filter(t => qty >= t.minQty).sort((a, b) => b.minQty - a.minQty)[0] || null;
    let totalAdditionalDiscount = 0;
    if (activeTier) {
      if (cfg.discountMode === 'after-min') {
        totalAdditionalDiscount = activeTier.discount * Math.max(0, qty - activeTier.minQty);
      } else {
        totalAdditionalDiscount = Math.floor(qty / activeTier.minQty) * activeTier.discount;
      }
    }
    const totalBill = subtotalBeforeAdditional - totalAdditionalDiscount;
    return { totalBill, finalPricePerUnit: totalBill / qty, totalAdditionalDiscount, isActive: !!activeTier, unitPriceBeforeAdditional };
  };

  const simulation = useMemo(() => calculateForQty(activeConfigUnit, simQty), [configs, simQty, activeConfigUnit, simMode, simCategory]);

  const handleSaveAll = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }, 1500);
  };

  const activeCfg = configs[activeConfigUnit];

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
      <Sidebar activeMenu="Setting Harga" />

      <main className="flex-1 flex flex-col relative overflow-hidden bg-slate-50">
        <Header title="Manajemen Harga Unit" />

        {/* TOP NAV */}
        <div className="bg-white border-b border-slate-200 px-6 lg:px-10 py-4 flex items-center justify-between z-10 shadow-sm shrink-0">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-black text-slate-800 tracking-tight">Katalog Harga</h1>
            <div className="h-6 w-px bg-slate-200 hidden sm:block" />
            <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200/50 overflow-x-auto no-scrollbar">
              {Object.keys(configs).map(unit => (
                <button 
                  key={unit} 
                  onClick={() => setActiveConfigUnit(unit)}
                  className={`px-5 py-2 rounded-xl text-[11px] font-bold tracking-wider transition-all shrink-0 ${activeConfigUnit === unit ? 'bg-white text-blue-600 shadow-md scale-105' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>
          
          <button 
            onClick={handleSaveAll}
            disabled={saveStatus === 'saving'}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl font-bold text-[11px] tracking-widest transition-all shadow-lg shrink-0 ${
              saveStatus === 'success' ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-100'
            }`}
          >
            {saveStatus === 'saving' ? (
              <><Loader2 size={16} className="animate-spin" /> MENYIMPAN...</>
            ) : saveStatus === 'success' ? (
              <><CheckCircle2 size={16} /> BERHASIL DISIMPAN</>
            ) : (
              <><Save size={16} /> SIMPAN PERUBAHAN</>
            )}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8 no-scrollbar">
          <div className="max-w-7xl mx-auto space-y-8 pb-32">
            
            {/* HARGA MASTER */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
              <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white"><DollarSign size={16} /></div>
                  <h2 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Konfigurasi At Need</h2>
                </div>
                <PriceField label="Total Transaksi Master" value={activeCfg.masterAtNeed} onChange={(v) => updateConfig(activeConfigUnit, 'masterAtNeed', v)} />
                <div className="grid grid-cols-2 gap-4">
                  <PriceField label="Harga Satuan Unit" value={activeCfg.masterAtNeedUnit} onChange={(v) => updateConfig(activeConfigUnit, 'masterAtNeedUnit', v)} percentage={activeCfg.masterAtNeed > 0 ? Math.round((activeCfg.masterAtNeedUnit/activeCfg.masterAtNeed)*100) : 0} />
                  <PriceField label="Biaya IPLM Master" value={activeCfg.masterAtNeed - activeCfg.masterAtNeedUnit} isReadOnly percentage={activeCfg.masterAtNeed > 0 ? Math.round(((activeCfg.masterAtNeed - activeCfg.masterAtNeedUnit)/activeCfg.masterAtNeed)*100) : 0} />
                </div>
              </div>
              <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-600 flex items-center justify-center text-white"><ShieldCheck size={16} /></div>
                  <h2 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Konfigurasi Pre Need</h2>
                </div>
                <PriceField label="Total Transaksi Master" value={activeCfg.masterPreNeed} onChange={(v) => updateConfig(activeConfigUnit, 'masterPreNeed', v)} />
                <div className="grid grid-cols-2 gap-4">
                  <PriceField label="Harga Satuan Unit" value={activeCfg.masterPreNeedUnit} onChange={(v) => updateConfig(activeConfigUnit, 'masterPreNeedUnit', v)} percentage={activeCfg.masterPreNeed > 0 ? Math.round((activeCfg.masterPreNeedUnit/activeCfg.masterPreNeed)*100) : 0} />
                  <PriceField label="Biaya IPLM Master" value={activeCfg.masterPreNeed - activeCfg.masterPreNeedUnit} isReadOnly percentage={activeCfg.masterPreNeed > 0 ? Math.round(((activeCfg.masterPreNeed - activeCfg.masterPreNeedUnit)/activeCfg.masterPreNeed)*100) : 0} />
                </div>
              </div>
            </div>

            {/* SEASONAL */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center text-white"><Zap size={16} /></div>
                  <h2 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Pengaturan Promo Musiman</h2>
                </div>
                <div className="flex items-center gap-6 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-200">
                  <div className="flex flex-col"><span className="text-[8px] font-bold text-slate-400">MULAI</span><input type="date" className="text-xs font-bold bg-transparent outline-none" value={activeCfg.startDate} onChange={(e) => updateConfig(activeConfigUnit, 'startDate', e.target.value)} /></div>
                  <div className="text-slate-300"><ArrowRight size={16} /></div>
                  <div className="flex flex-col"><span className="text-[8px] font-bold text-slate-400">AKHIR</span><input type="date" className="text-xs font-bold bg-transparent outline-none" value={activeCfg.endDate} onChange={(e) => updateConfig(activeConfigUnit, 'endDate', e.target.value)} /></div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <PriceField label="Harga Promo At Need" value={activeCfg.seasonalAtNeed} onChange={(v) => updateConfig(activeConfigUnit, 'seasonalAtNeed', v)} />
                <PriceField label="Harga Promo Pre Need" value={activeCfg.seasonalPreNeed} onChange={(v) => updateConfig(activeConfigUnit, 'seasonalPreNeed', v)} />
              </div>
            </div>

            {/* ATURAN */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 pb-20">
              <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm space-y-6">
                <h2 className="text-[11px] font-black text-slate-800 uppercase tracking-widest px-1">Aturan Pembayaran</h2>
                <div className="grid grid-cols-2 gap-4">
                  <PriceField label="Min. DP" value={activeCfg.minDP} onChange={(v) => updateConfig(activeConfigUnit, 'minDP', v)} />
                  <PriceField label="Booking Fee" value={activeCfg.minBooking} onChange={(v) => updateConfig(activeConfigUnit, 'minBooking', v)} />
                </div>
              </div>
              <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-[11px] font-black text-slate-800 uppercase tracking-widest px-1">Diskon Tambahan Unit</h2>
                  <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                    <button onClick={() => updateConfig(activeConfigUnit, 'discountMode', 'after-min')} className={`px-4 py-1.5 rounded-lg text-[9px] font-black ${activeCfg.discountMode === 'after-min' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>SETELAH MIN</button>
                    <button onClick={() => updateConfig(activeConfigUnit, 'discountMode', 'multiple')} className={`px-4 py-1.5 rounded-lg text-[9px] font-black ${activeCfg.discountMode === 'multiple' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>KELIPATAN</button>
                  </div>
                </div>
                {activeCfg.tiers.slice(0, 1).map(tier => (
                  <div key={tier.id} className="flex items-end gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="w-24"><label className="text-[8px] font-bold text-slate-400 mb-1 block">UNIT</label><input type="number" className="w-full bg-transparent font-bold outline-none" value={tier.minQty} onChange={(e) => updateTier(activeConfigUnit, tier.id, 'minQty', e.target.value)} /></div>
                    <div className="flex-1"><label className="text-[8px] font-bold text-slate-400 mb-1 block">POTONGAN / UNIT</label><input type="text" className="w-full bg-transparent font-bold outline-none" value={formatDisplayNumber(tier.discount)} onChange={(e) => updateTier(activeConfigUnit, tier.id, 'discount', parseFormattedNumber(e.target.value))} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- FLOATING ESTIMASI WIDGET --- */}
        <div className="fixed bottom-10 right-10 z-40">
          <button 
            onClick={() => setIsSimModalOpen(true)}
            className="group flex items-center gap-4 bg-slate-900 text-white pl-6 pr-2 py-2 rounded-full shadow-[0_20px_50px_-10px_rgba(15,23,42,0.6)] border border-white/10 hover:bg-blue-600 transition-all"
          >
            <div className="flex flex-col items-start pr-2 border-r border-white/10">
              <span className="text-[8px] font-black text-slate-500 group-hover:text-white/70 uppercase tracking-widest text-left">Estimasi Penjualan</span>
              <span className="text-sm font-black tracking-tight">{formatCurrency(simulation.totalBill)}</span>
            </div>
            <div className="w-10 h-10 bg-blue-600 group-hover:bg-white group-hover:text-blue-600 rounded-full flex items-center justify-center transition-all">
              <Calculator size={18} />
            </div>
          </button>
        </div>

        {/* --- ULTIMATE CENTERED NO-SCROLL MODAL --- */}
        {isSimModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick={() => setIsSimModalOpen(false)} />
            
            <div className="relative w-full max-w-4xl bg-slate-900 rounded-[2.5rem] shadow-[0_60px_120px_-20px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
              {/* MODAL HEADER (VERY COMPACT) */}
              <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-slate-900/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                    <Cpu size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-white tracking-tight">Simulator Penjualan</h2>
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Unit {activeConfigUnit}</p>
                  </div>
                </div>
                <button onClick={() => setIsSimModalOpen(false)} className="w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center text-slate-500 transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* MODAL BODY (SCALED DOWN FOR ZERO-SCROLL) */}
              <div className="px-10 py-8 space-y-8 flex flex-col items-center">
                
                {/* MODE SELECTION */}
                <div className="grid grid-cols-2 gap-6 w-full">
                  <div className="space-y-2">
                    <label className="text-[8px] font-black text-slate-500 uppercase tracking-widest px-1">Harga yang Digunakan</label>
                    <div className="flex bg-slate-950 p-1 rounded-xl border border-white/5">
                      <button onClick={() => setSimMode('master')} className={`flex-1 py-3 rounded-lg text-[10px] font-black tracking-widest transition-all ${simMode === 'master' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600'}`}>MASTER</button>
                      <button onClick={() => setSimMode('seasonal')} className={`flex-1 py-3 rounded-lg text-[10px] font-black tracking-widest transition-all ${simMode === 'seasonal' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600'}`}>PROMO</button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[8px] font-black text-slate-500 uppercase tracking-widest px-1">Jenis Pembelian</label>
                    <div className="flex bg-slate-950 p-1 rounded-xl border border-white/5">
                      <button onClick={() => setSimCategory('atNeed')} className={`flex-1 py-3 rounded-lg text-[10px] font-black tracking-widest transition-all ${simCategory === 'atNeed' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600'}`}>AT NEED</button>
                      <button onClick={() => setSimCategory('preNeed')} className={`flex-1 py-3 rounded-lg text-[10px] font-black tracking-widest transition-all ${simCategory === 'preNeed' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600'}`}>PRE NEED</button>
                    </div>
                  </div>
                </div>

                {/* SCALED QUANTITY INPUT */}
                <div className="bg-slate-950 rounded-[2rem] p-8 border border-white/5 flex flex-col items-center justify-center space-y-2 w-full">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Jumlah Unit yang Dibeli</span>
                  <div className="flex flex-col items-center w-full">
                    <input 
                      type="number" 
                      className="w-full bg-transparent text-center text-7xl font-black text-white outline-none tabular-nums focus:text-blue-500 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      value={simQty}
                      onChange={(e) => setSimQty(Math.max(1, parseInt(e.target.value) || 1))}
                    />
                    <div className="border-t border-white/5 pt-4 mt-2 px-8 text-center">
                      <span className="text-lg font-black text-blue-500 uppercase tracking-wider">{simQty} Unit {activeConfigUnit}</span>
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                        Basis Harga: {formatCurrency(simulation.unitPriceBeforeAdditional)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* SCALED FINAL METRICS */}
                <div className="grid grid-cols-2 gap-6 w-full pb-2">
                  <div className="p-6 bg-emerald-500/10 rounded-3xl border border-emerald-500/20 flex flex-col items-center space-y-1">
                    <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Total Diskon</span>
                    <div className="text-2xl font-black text-emerald-400 tabular-nums">-{formatCurrency(simulation.totalAdditionalDiscount)}</div>
                  </div>
                  <div className="p-6 bg-blue-600/10 rounded-3xl border border-blue-500/20 flex flex-col items-center space-y-1">
                    <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Tagihan Akhir</span>
                    <div className="text-3xl font-black text-white tabular-nums tracking-tighter">{formatCurrency(simulation.totalBill)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
