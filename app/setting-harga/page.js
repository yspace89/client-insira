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
  Cpu,
  Clock,
  Settings2,
  Activity
} from 'lucide-react';

const PriceField = ({ label, value, onChange, isReadOnly, percentage }) => (
  <div className="group">
    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">{label}</label>
    <div className={`relative flex items-center bg-white border ${isReadOnly ? 'border-slate-100 bg-slate-50/40' : 'border-slate-200'} rounded-2xl transition-all ${!isReadOnly && 'focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/5 shadow-sm'}`}>
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
    'Single': { ...initialUnitsData['Single'], ...defaultDates, minDP: 2000000, minBooking: 5000000, tiers: [{ id: 1, minQty: 2, discount: 1000000 }], discountMode: 'after-min', discountType: 'per-unit' },
    'Single Premiere': { ...initialUnitsData['Single Premiere'], ...defaultDates, minDP: 2000000, minBooking: 5000000, tiers: [{ id: 1, minQty: 2, discount: 1000000 }], discountMode: 'after-min', discountType: 'per-unit' },
    'Couple': { ...initialUnitsData['Couple'], ...defaultDates, minDP: 5000000, minBooking: 10000000, tiers: [{ id: 1, minQty: 2, discount: 2000000 }], discountMode: 'after-min', discountType: 'per-unit' },
    'Couple Premiere': { ...initialUnitsData['Couple Premiere'], ...defaultDates, minDP: 5000000, minBooking: 10000000, tiers: [{ id: 1, minQty: 2, discount: 2000000 }], discountMode: 'after-min', discountType: 'per-unit' },
    'Family': { ...initialUnitsData['Family'], ...defaultDates, minDP: 10000000, minBooking: 25000000, tiers: [{ id: 1, minQty: 2, discount: 5000000 }], discountMode: 'after-min', discountType: 'per-unit' },
    'Signature Family': { ...initialUnitsData['Signature Family'], ...defaultDates, minDP: 25000000, minBooking: 50000000, tiers: [{ id: 1, minQty: 2, discount: 10000000 }], discountMode: 'after-min', discountType: 'per-unit' }
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
        const applicableQty = Math.max(0, qty - activeTier.minQty);
        totalAdditionalDiscount = cfg.discountType === 'per-unit' ? activeTier.discount * applicableQty : activeTier.discount;
      } else {
        const factor = Math.floor(qty / activeTier.minQty);
        totalAdditionalDiscount = cfg.discountType === 'per-unit' ? (activeTier.discount * factor * activeTier.minQty) : (activeTier.discount * factor);
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

  const seasonalAtNeedUnit = activeCfg.masterAtNeed > 0 ? Math.round((activeCfg.masterAtNeedUnit / activeCfg.masterAtNeed) * activeCfg.seasonalAtNeed) : 0;
  const seasonalPreNeedUnit = activeCfg.masterPreNeed > 0 ? Math.round((activeCfg.masterPreNeedUnit / activeCfg.masterPreNeed) * activeCfg.seasonalPreNeed) : 0;

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
      <Sidebar activeMenu="Setting Harga" />

      <main className="flex-1 flex flex-col relative overflow-hidden bg-slate-50/50">
        {/* ENHANCED STRATEGIC HEADER */}
        <div className="bg-white border-b border-slate-200 px-6 lg:px-10 py-6 z-20 shadow-sm shrink-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 max-w-[1600px] mx-auto">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-200">
                <Settings2 size={24} strokeWidth={2} />
              </div>
              <div className="space-y-0.5">
                <h1 className="text-xl font-bold text-slate-800 tracking-tight">Strategi Harga</h1>
                <div className="flex items-center gap-2">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                    Konfigurasi Presisi & Simulator Sales Pintar
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={handleSaveAll}
                disabled={saveStatus === 'saving'}
                className={`flex items-center gap-3 px-8 py-3 rounded-2xl font-bold text-[11px] uppercase tracking-widest transition-all shadow-xl ${
                  saveStatus === 'success' ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-slate-900 text-white hover:bg-blue-600 shadow-slate-200 hover:-translate-y-0.5 active:translate-y-0'
                }`}
              >
                {saveStatus === 'saving' ? (
                  <><Loader2 size={16} className="animate-spin" /> Menyimpan...</>
                ) : saveStatus === 'success' ? (
                  <><CheckCircle2 size={16} /> Berhasil Disimpan</>
                ) : (
                  <><Save size={16} /> Perbarui Harga</>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* UNIT SELECTOR BAR (INTEGRATED) */}
        <div className="bg-white/40 backdrop-blur-md border-b border-slate-200 px-6 lg:px-10 py-3 z-10 sticky top-0 shrink-0">
          <div className="max-w-[1600px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-r border-slate-200 pr-4 leading-none">Pilih Unit:</span>
              <div className="flex p-1 bg-slate-200/40 rounded-xl border border-slate-100 overflow-x-auto no-scrollbar max-w-[60vw]">
                {Object.keys(configs).map(unit => (
                  <button 
                    key={unit} 
                    onClick={() => setActiveConfigUnit(unit)}
                    className={`px-5 py-2 rounded-lg text-[10px] font-bold tracking-widest transition-all shrink-0 ${activeConfigUnit === unit ? 'bg-white text-blue-600 shadow-sm border border-slate-100' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
               <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold tracking-wider border border-blue-100 uppercase">{activeConfigUnit} Aktif</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8 no-scrollbar">
          <div className="max-w-7xl mx-auto space-y-12 pb-32">
            
            {/* MASTER CARDS */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 px-2">
                <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Konfigurasi Harga Master</h2>
                <div className="h-px flex-1 bg-slate-200/60" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] space-y-8 group hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center group-hover:scale-105 transition-transform"><DollarSign size={18} strokeWidth={2.5} /></div>
                    <h2 className="text-[11px] font-bold text-slate-800 uppercase tracking-widest">Master At Need</h2>
                  </div>
                  <PriceField label="Harga Total" value={activeCfg.masterAtNeed} onChange={(v) => updateConfig(activeConfigUnit, 'masterAtNeed', v)} />
                  <div className="grid grid-cols-2 gap-6">
                    <PriceField label="Harga Satuan Unit" value={activeCfg.masterAtNeedUnit} onChange={(v) => updateConfig(activeConfigUnit, 'masterAtNeedUnit', v)} percentage={activeCfg.masterAtNeed > 0 ? Math.round((activeCfg.masterAtNeedUnit/activeCfg.masterAtNeed)*100) : 0} />
                    <PriceField label="Biaya IPLM" value={activeCfg.masterAtNeed - activeCfg.masterAtNeedUnit} isReadOnly percentage={activeCfg.masterAtNeed > 0 ? Math.round(((activeCfg.masterAtNeed - activeCfg.masterAtNeedUnit)/activeCfg.masterAtNeed)*100) : 0} />
                  </div>
                </div>
                <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] space-y-8 group hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:scale-105 transition-transform"><ShieldCheck size={18} strokeWidth={2.5} /></div>
                    <h2 className="text-[11px] font-bold text-slate-800 uppercase tracking-widest">Master Pre Need</h2>
                  </div>
                  <PriceField label="Harga Total" value={activeCfg.masterPreNeed} onChange={(v) => updateConfig(activeConfigUnit, 'masterPreNeed', v)} />
                  <div className="grid grid-cols-2 gap-6">
                    <PriceField label="Harga Satuan Unit" value={activeCfg.masterPreNeedUnit} onChange={(v) => updateConfig(activeConfigUnit, 'masterPreNeedUnit', v)} percentage={activeCfg.masterPreNeed > 0 ? Math.round((activeCfg.masterPreNeedUnit/activeCfg.masterPreNeed)*100) : 0} />
                    <PriceField label="Biaya IPLM" value={activeCfg.masterPreNeed - activeCfg.masterPreNeedUnit} isReadOnly percentage={activeCfg.masterPreNeed > 0 ? Math.round(((activeCfg.masterPreNeed - activeCfg.masterPreNeedUnit)/activeCfg.masterPreNeed)*100) : 0} />
                  </div>
                </div>
              </div>
            </div>

            {/* SEASONAL SECTION */}
            <div className="space-y-6">
              <div className="bg-amber-50/30 border border-amber-100 rounded-[2.5rem] p-10 shadow-[0_10px_40px_rgba(245,158,11,0.03)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full blur-3xl -mr-16 -mt-16" />
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-10 relative z-10">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-xl shadow-amber-200"><Zap size={22} strokeWidth={2.5} /></div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-800 tracking-tight">Harga Promo Musiman</h2>
                      <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mt-0.5">Aturan Kampanye & Promo Musiman</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-2xl border border-amber-200 shadow-md">
                      <div className="flex flex-col">
                        <span className="text-[8px] font-bold text-amber-500 uppercase tracking-widest mb-1.5 opacity-70">Tanggal Mulai</span>
                        <input type="date" className="text-sm font-bold text-slate-700 bg-transparent outline-none cursor-pointer" value={activeCfg.startDate} onChange={(e) => updateConfig(activeConfigUnit, 'startDate', e.target.value)} />
                      </div>
                      <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-300">
                        <ArrowRight size={18} strokeWidth={3} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] font-bold text-amber-500 uppercase tracking-widest mb-1.5 opacity-70">Tanggal Selesai</span>
                        <input type="date" className="text-sm font-bold text-slate-700 bg-transparent outline-none cursor-pointer" value={activeCfg.endDate} onChange={(e) => updateConfig(activeConfigUnit, 'endDate', e.target.value)} />
                      </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 relative z-10">
                  <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm space-y-8 group hover:shadow-md transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center"><DollarSign size={18} strokeWidth={2.5} /></div>
                      <h2 className="text-[11px] font-bold text-slate-800 uppercase tracking-widest">Seasonal At Need</h2>
                    </div>
                    <PriceField label="Harga Total" value={activeCfg.seasonalAtNeed} onChange={(v) => updateConfig(activeConfigUnit, 'seasonalAtNeed', v)} />
                    <div className="grid grid-cols-2 gap-6">
                      <PriceField label="Harga Satuan Unit" value={seasonalAtNeedUnit} isReadOnly percentage={activeCfg.seasonalAtNeed > 0 ? Math.round((seasonalAtNeedUnit/activeCfg.seasonalAtNeed)*100) : 0} />
                      <PriceField label="Biaya IPLM" value={activeCfg.seasonalAtNeed - seasonalAtNeedUnit} isReadOnly percentage={activeCfg.seasonalAtNeed > 0 ? Math.round(((activeCfg.seasonalAtNeed - seasonalAtNeedUnit)/activeCfg.seasonalAtNeed)*100) : 0} />
                    </div>
                  </div>
                  <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm space-y-8 group hover:shadow-md transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center"><ShieldCheck size={18} strokeWidth={2.5} /></div>
                      <h2 className="text-[11px] font-bold text-slate-800 uppercase tracking-widest">Seasonal Pre Need</h2>
                    </div>
                    <PriceField label="Harga Total" value={activeCfg.seasonalPreNeed} onChange={(v) => updateConfig(activeConfigUnit, 'seasonalPreNeed', v)} />
                    <div className="grid grid-cols-2 gap-6">
                      <PriceField label="Harga Satuan Unit" value={seasonalPreNeedUnit} isReadOnly percentage={activeCfg.seasonalPreNeed > 0 ? Math.round((seasonalPreNeedUnit/activeCfg.seasonalPreNeed)*100) : 0} />
                      <PriceField label="Biaya IPLM" value={activeCfg.seasonalPreNeed - seasonalPreNeedUnit} isReadOnly percentage={activeCfg.seasonalPreNeed > 0 ? Math.round(((activeCfg.seasonalPreNeed - seasonalPreNeedUnit)/activeCfg.seasonalPreNeed)*100) : 0} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RULES & DISCOUNTS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 pb-20">
              <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm space-y-10 group hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center"><Receipt size={18} strokeWidth={2.5} /></div>
                  <h2 className="text-[11px] font-bold text-slate-800 uppercase tracking-widest">Aturan Down Payment</h2>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <PriceField label="Minimum DP" value={activeCfg.minDP} onChange={(v) => updateConfig(activeConfigUnit, 'minDP', v)} />
                  <PriceField label="Booking Fee" value={activeCfg.minBooking} onChange={(v) => updateConfig(activeConfigUnit, 'minBooking', v)} />
                </div>
              </div>
              <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm space-y-8 group hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center"><Tag size={18} strokeWidth={2.5} /></div>
                    <h2 className="text-[11px] font-bold text-slate-800 uppercase tracking-widest">Aturan Diskon Kuantitas</h2>
                  </div>
                  <div className="flex bg-slate-100 p-1 rounded-xl scale-90 border border-slate-200/50">
                    <button onClick={() => updateConfig(activeConfigUnit, 'discountType', 'flat')} className={`px-4 py-1.5 rounded-lg text-[9px] font-bold transition-all ${activeCfg.discountType === 'flat' ? 'bg-white text-emerald-600 shadow-sm border border-slate-100' : 'text-slate-400'}`}>DISKON FLAT</button>
                    <button onClick={() => updateConfig(activeConfigUnit, 'discountType', 'per-unit')} className={`px-4 py-1.5 rounded-lg text-[9px] font-bold transition-all ${activeCfg.discountType === 'per-unit' ? 'bg-white text-emerald-600 shadow-sm border border-slate-100' : 'text-slate-400'}`}>DISKON PER UNIT</button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-4 px-1">
                   <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
                    <button onClick={() => updateConfig(activeConfigUnit, 'discountMode', 'after-min')} className={`px-4 py-1.5 rounded-lg text-[9px] font-bold transition-all ${activeCfg.discountMode === 'after-min' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}>MINIMAL QTY</button>
                    <button onClick={() => updateConfig(activeConfigUnit, 'discountMode', 'multiple')} className={`px-4 py-1.5 rounded-lg text-[9px] font-bold transition-all ${activeCfg.discountMode === 'multiple' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}>SETIAP KELIPATAN</button>
                  </div>
                </div>

                <div className="space-y-4">
                  {(activeCfg.discountMode === 'multiple' ? activeCfg.tiers.slice(0, 1) : activeCfg.tiers).map(tier => (
                    <div key={tier.id} className="flex items-end gap-5 p-6 bg-slate-50/50 rounded-2xl border border-slate-100 border-l-[6px] border-l-emerald-500">
                      <div className="w-28">
                        <label className="text-[9px] font-bold text-slate-400 mb-2 block uppercase tracking-widest opacity-70">
                          {activeCfg.discountMode === 'after-min' ? 'Min Unit' : 'Kelipatan'}
                        </label>
                        <input type="number" className="w-full bg-transparent font-bold outline-none text-slate-800 text-lg" value={tier.minQty} onChange={(e) => updateTier(activeConfigUnit, tier.id, 'minQty', e.target.value)} />
                      </div>
                      <div className="flex-1">
                        <label className="text-[9px] font-bold text-slate-400 mb-2 block uppercase tracking-widest opacity-70">
                          {activeCfg.discountType === 'per-unit' ? 'Diskon Per Unit' : 'Nilai Diskon Flat'}
                        </label>
                        <div className="flex items-center gap-2">
                           <span className="text-slate-300 font-bold">Rp</span>
                           <input type="text" className="w-full bg-transparent font-bold outline-none text-slate-800 text-lg" value={formatDisplayNumber(tier.discount)} onChange={(e) => updateTier(activeConfigUnit, tier.id, 'discount', parseFormattedNumber(e.target.value))} />
                        </div>
                      </div>
                      {activeCfg.discountMode !== 'multiple' && activeCfg.tiers.length > 1 && (
                        <button onClick={() => removeTier(activeConfigUnit, tier.id)} className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16} /></button>
                      )}
                    </div>
                  ))}
                  {activeCfg.discountMode !== 'multiple' && (
                    <button onClick={() => addTier(activeConfigUnit)} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-[1.5rem] text-[10px] font-bold text-slate-400 hover:bg-white hover:border-blue-300 hover:text-blue-500 transition-all flex items-center justify-center gap-2">
                      <協 size={16} /> TAMBAH TIER DISKON
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- FLOATING ESTIMASI WIDGET --- */}
        <div className="fixed bottom-10 right-10 z-40">
          <button 
            onClick={() => setIsSimModalOpen(true)}
            className="group flex items-center gap-5 bg-slate-900 text-white pl-8 pr-3 py-3 rounded-full shadow-[0_30px_60px_-12px_rgba(15,23,42,0.4)] border border-white/10 hover:bg-blue-600 transition-all scale-110"
          >
            <div className="flex flex-col items-start pr-4 border-r border-white/10">
              <span className="text-[9px] font-bold text-slate-500 group-hover:text-white/60 uppercase tracking-widest mb-0.5">Estimasi Cepat</span>
              <span className="text-base font-bold tracking-tight">{formatCurrency(simulation.totalBill)}</span>
            </div>
            <div className="w-10 h-10 bg-blue-600 group-hover:bg-white group-hover:text-blue-600 rounded-full flex items-center justify-center transition-all">
              <Calculator size={18} strokeWidth={2.5} />
            </div>
          </button>
        </div>

        {/* --- ULTIMATE CENTERED MODAL --- */}
        {isSimModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-md" onClick={() => setIsSimModalOpen(false)} />
            <div className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
              <div className="px-10 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-xl shadow-slate-200"><Cpu size={20} /></div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">Simulator Sales</h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Menghitung untuk Unit: {activeConfigUnit}</p>
                  </div>
                </div>
                <button onClick={() => setIsSimModalOpen(false)} className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"><X size={20} /></button>
              </div>

              <div className="px-12 py-10 space-y-10 flex flex-col items-center overflow-y-auto no-scrollbar">
                <div className="grid grid-cols-2 gap-8 w-full">
                  <div className="space-y-3">
                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Tier Harga</label>
                     <div className="flex bg-slate-100 p-1.5 rounded-[1.25rem] border border-slate-200/50">
                        <button onClick={() => setSimMode('master')} className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${simMode === 'master' ? 'bg-white text-blue-600 shadow-sm border border-slate-100' : 'text-slate-400'}`}>HARGA MASTER</button>
                        <button onClick={() => setSimMode('seasonal')} className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${simMode === 'seasonal' ? 'bg-white text-blue-600 shadow-sm border border-slate-100' : 'text-slate-400'}`}>HARGA PROMO</button>
                     </div>
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Tipe Pembelian</label>
                     <div className="flex bg-slate-100 p-1.5 rounded-[1.25rem] border border-slate-200/50">
                        <button onClick={() => setSimCategory('atNeed')} className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${simCategory === 'atNeed' ? 'bg-white text-blue-600 shadow-sm border border-slate-100' : 'text-slate-400'}`}>AT NEED</button>
                        <button onClick={() => setSimCategory('preNeed')} className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${simCategory === 'preNeed' ? 'bg-white text-blue-600 shadow-sm border border-slate-100' : 'text-slate-400'}`}>PRE NEED</button>
                     </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 flex flex-col items-center justify-center space-y-4 w-full shadow-inner">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-70">Penyesuaian Kuantitas</span>
                  <div className="flex items-center gap-10">
                     <button onClick={() => setSimQty(Math.max(1, simQty - 1))} className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"><ChevronDown size={28} /></button>
                     <div className="flex flex-col items-center">
                        <input type="number" className="bg-transparent text-center text-8xl font-bold text-slate-800 outline-none tabular-nums [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-40" value={simQty} onChange={(e) => setSimQty(Math.max(1, parseInt(e.target.value) || 1))} />
                        <span className="text-xs font-bold text-blue-500 uppercase tracking-[0.3em] mt-2">Unit dari {activeConfigUnit}</span>
                     </div>
                     <button onClick={() => setSimQty(simQty + 1)} className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"><ChevronUp size={28} /></button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 w-full">
                  <div className="p-8 bg-emerald-50 rounded-[2rem] border border-emerald-100 flex flex-col items-center space-y-2">
                    <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest opacity-80">Hemat Grosir</span>
                    <div className="text-3xl font-bold text-emerald-600 tabular-nums">-{formatCurrency(simulation.totalAdditionalDiscount)}</div>
                  </div>
                  <div className="p-8 bg-blue-600 rounded-[2rem] shadow-xl shadow-blue-200 flex flex-col items-center space-y-2 text-white">
                    <span className="text-[11px] font-bold text-blue-100 uppercase tracking-widest opacity-70">Estimasi Akhir</span>
                    <div className="text-4xl font-bold tabular-nums tracking-tight">{formatCurrency(simulation.totalBill)}</div>
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
