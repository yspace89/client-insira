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

      <main className="flex-1 flex flex-col relative overflow-hidden bg-slate-50">
        {/* ENHANCED STRATEGIC HEADER */}
        <div className="bg-white border-b border-slate-200 px-6 lg:px-10 py-6 z-20 shadow-sm shrink-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 max-w-[1600px] mx-auto">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-slate-900 rounded-[1.25rem] flex items-center justify-center text-white shadow-xl shadow-slate-200">
                <Settings2 size={28} strokeWidth={2.5} />
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none">Pusat Strategi Harga</h1>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    Konfigurasi Presisi & Simulator Penjualan Pintar
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                <Activity size={16} className="text-blue-500" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">System Online</span>
              </div>
              <button 
                onClick={handleSaveAll}
                disabled={saveStatus === 'saving'}
                className={`flex items-center gap-3 px-8 py-3.5 rounded-2xl font-black text-[11px] tracking-widest transition-all shadow-lg ${
                  saveStatus === 'success' ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-200 hover:-translate-y-0.5 active:translate-y-0'
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
          </div>
        </div>

        {/* UNIT SELECTOR BAR (INTEGRATED) */}
        <div className="bg-slate-50/80 backdrop-blur-md border-b border-slate-200 px-6 lg:px-10 py-3 z-10 sticky top-0 shrink-0">
          <div className="max-w-[1600px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-200 pr-4">Pilih Unit:</span>
              <div className="flex p-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto no-scrollbar max-w-[60vw]">
                {Object.keys(configs).map(unit => (
                  <button 
                    key={unit} 
                    onClick={() => setActiveConfigUnit(unit)}
                    className={`px-5 py-2 rounded-lg text-[10px] font-black tracking-widest transition-all shrink-0 ${activeConfigUnit === unit ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active:</span>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black tracking-wider border border-blue-100">{activeConfigUnit}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8 no-scrollbar">
          <div className="max-w-7xl mx-auto space-y-12 pb-32">
            
            {/* MASTER CARDS */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 px-2">
                <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-white shadow-lg"><Layers size={16} /></div>
                <h2 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Pengaturan Harga Master</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white"><DollarSign size={16} /></div>
                    <h2 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Master At Need</h2>
                  </div>
                  <PriceField label="Total Harga" value={activeCfg.masterAtNeed} onChange={(v) => updateConfig(activeConfigUnit, 'masterAtNeed', v)} />
                  <div className="grid grid-cols-2 gap-4">
                    <PriceField label="Harga Satuan Unit" value={activeCfg.masterAtNeedUnit} onChange={(v) => updateConfig(activeConfigUnit, 'masterAtNeedUnit', v)} percentage={activeCfg.masterAtNeed > 0 ? Math.round((activeCfg.masterAtNeedUnit/activeCfg.masterAtNeed)*100) : 0} />
                    <PriceField label="Biaya IPLM Master" value={activeCfg.masterAtNeed - activeCfg.masterAtNeedUnit} isReadOnly percentage={activeCfg.masterAtNeed > 0 ? Math.round(((activeCfg.masterAtNeed - activeCfg.masterAtNeedUnit)/activeCfg.masterAtNeed)*100) : 0} />
                  </div>
                </div>
                <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-xl bg-slate-600 flex items-center justify-center text-white"><ShieldCheck size={16} /></div>
                    <h2 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Master Pre Need</h2>
                  </div>
                  <PriceField label="Total Harga" value={activeCfg.masterPreNeed} onChange={(v) => updateConfig(activeConfigUnit, 'masterPreNeed', v)} />
                  <div className="grid grid-cols-2 gap-4">
                    <PriceField label="Harga Satuan Unit" value={activeCfg.masterPreNeedUnit} onChange={(v) => updateConfig(activeConfigUnit, 'masterPreNeedUnit', v)} percentage={activeCfg.masterPreNeed > 0 ? Math.round((activeCfg.masterPreNeedUnit/activeCfg.masterPreNeed)*100) : 0} />
                    <PriceField label="Biaya IPLM Master" value={activeCfg.masterPreNeed - activeCfg.masterPreNeedUnit} isReadOnly percentage={activeCfg.masterPreNeed > 0 ? Math.round(((activeCfg.masterPreNeed - activeCfg.masterPreNeedUnit)/activeCfg.masterPreNeed)*100) : 0} />
                  </div>
                </div>
              </div>
            </div>

            {/* SEASONAL SECTION */}
            <div className="space-y-6">
              <div className="bg-amber-50/50 border border-amber-100 rounded-[2.5rem] p-8 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 px-2">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-xl shadow-amber-200/50 animate-pulse"><Zap size={24} /></div>
                    <div>
                      <h2 className="text-lg font-black text-slate-800 tracking-tight">Pengaturan Harga Seasonal</h2>
                      <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Periode Promosi Musiman</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border-2 border-amber-200 shadow-md">
                    <div className="flex items-center gap-6 px-4">
                      <div className="flex flex-col">
                        <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest mb-1">MULAI BERLAKU</span>
                        <input type="date" className="text-sm font-black text-slate-700 bg-transparent outline-none cursor-pointer" value={activeCfg.startDate} onChange={(e) => updateConfig(activeConfigUnit, 'startDate', e.target.value)} />
                      </div>
                      <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-400">
                        <ArrowRight size={20} strokeWidth={3} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest mb-1">HINGGA TANGGAL</span>
                        <input type="date" className="text-sm font-black text-slate-700 bg-transparent outline-none cursor-pointer" value={activeCfg.endDate} onChange={(e) => updateConfig(activeConfigUnit, 'endDate', e.target.value)} />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                  <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600"><DollarSign size={16} /></div>
                      <h2 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Seasonal At Need</h2>
                    </div>
                    <PriceField label="Total Harga" value={activeCfg.seasonalAtNeed} onChange={(v) => updateConfig(activeConfigUnit, 'seasonalAtNeed', v)} />
                    <div className="grid grid-cols-2 gap-4">
                      <PriceField label="Harga Unit Seasonal" value={seasonalAtNeedUnit} isReadOnly percentage={activeCfg.seasonalAtNeed > 0 ? Math.round((seasonalAtNeedUnit/activeCfg.seasonalAtNeed)*100) : 0} />
                      <PriceField label="Biaya IPLM Seasonal" value={activeCfg.seasonalAtNeed - seasonalAtNeedUnit} isReadOnly percentage={activeCfg.seasonalAtNeed > 0 ? Math.round(((activeCfg.seasonalAtNeed - seasonalAtNeedUnit)/activeCfg.seasonalAtNeed)*100) : 0} />
                    </div>
                  </div>
                  <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600"><ShieldCheck size={16} /></div>
                      <h2 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Seasonal Pre Need</h2>
                    </div>
                    <PriceField label="Total Harga" value={activeCfg.seasonalPreNeed} onChange={(v) => updateConfig(activeConfigUnit, 'seasonalPreNeed', v)} />
                    <div className="grid grid-cols-2 gap-4">
                      <PriceField label="Harga Unit Seasonal" value={seasonalPreNeedUnit} isReadOnly percentage={activeCfg.seasonalPreNeed > 0 ? Math.round((seasonalPreNeedUnit/activeCfg.seasonalPreNeed)*100) : 0} />
                      <PriceField label="Biaya IPLM Seasonal" value={activeCfg.seasonalPreNeed - seasonalPreNeedUnit} isReadOnly percentage={activeCfg.seasonalPreNeed > 0 ? Math.round(((activeCfg.seasonalPreNeed - seasonalPreNeedUnit)/activeCfg.seasonalPreNeed)*100) : 0} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RULES & DISCOUNTS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 pb-20">
              <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-500 flex items-center justify-center text-white"><Receipt size={16} /></div>
                  <h2 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Aturan Pembayaran</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <PriceField label="Min. DP" value={activeCfg.minDP} onChange={(v) => updateConfig(activeConfigUnit, 'minDP', v)} />
                  <PriceField label="Booking Fee" value={activeCfg.minBooking} onChange={(v) => updateConfig(activeConfigUnit, 'minBooking', v)} />
                </div>
              </div>
              <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white"><Tag size={16} /></div>
                    <h2 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Diskon Tambahan Unit</h2>
                  </div>
                  <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 scale-90">
                    <button onClick={() => updateConfig(activeConfigUnit, 'discountType', 'flat')} className={`px-4 py-1.5 rounded-lg text-[9px] font-black transition-all ${activeCfg.discountType === 'flat' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400'}`}>POTONGAN FLAT</button>
                    <button onClick={() => updateConfig(activeConfigUnit, 'discountType', 'per-unit')} className={`px-4 py-1.5 rounded-lg text-[9px] font-black transition-all ${activeCfg.discountType === 'per-unit' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400'}`}>POTONGAN PER UNIT</button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-4 px-1">
                   <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-200">
                    <button onClick={() => updateConfig(activeConfigUnit, 'discountMode', 'after-min')} className={`px-4 py-1.5 rounded-lg text-[9px] font-black transition-all ${activeCfg.discountMode === 'after-min' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400'}`}>SETELAH MINIMAL</button>
                    <button onClick={() => updateConfig(activeConfigUnit, 'discountMode', 'multiple')} className={`px-4 py-1.5 rounded-lg text-[9px] font-black transition-all ${activeCfg.discountMode === 'multiple' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400'}`}>KELIPATAN</button>
                  </div>
                </div>

                <div className="space-y-4">
                  {(activeCfg.discountMode === 'multiple' ? activeCfg.tiers.slice(0, 1) : activeCfg.tiers).map(tier => (
                    <div key={tier.id} className="flex items-end gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-200 border-l-4 border-l-emerald-500">
                      <div className="w-28">
                        <label className="text-[8px] font-bold text-slate-400 mb-1 block uppercase tracking-widest">
                          {activeCfg.discountMode === 'after-min' ? 'Minimal Unit' : 'Setiap Kelipatan'}
                        </label>
                        <input type="number" className="w-full bg-transparent font-bold outline-none text-slate-700" value={tier.minQty} onChange={(e) => updateTier(activeConfigUnit, tier.id, 'minQty', e.target.value)} />
                      </div>
                      <div className="flex-1">
                        <label className="text-[8px] font-bold text-slate-400 mb-1 block uppercase tracking-widest">
                          {activeCfg.discountType === 'per-unit' ? 'Potongan per Unit' : 'Total Potongan Flat'}
                        </label>
                        <input type="text" className="w-full bg-transparent font-bold outline-none text-slate-700" value={formatDisplayNumber(tier.discount)} onChange={(e) => updateTier(activeConfigUnit, tier.id, 'discount', parseFormattedNumber(e.target.value))} />
                      </div>
                      {activeCfg.discountMode !== 'multiple' && activeCfg.tiers.length > 1 && (
                        <button onClick={() => removeTier(activeConfigUnit, tier.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                      )}
                    </div>
                  ))}
                  {activeCfg.discountMode !== 'multiple' && (
                    <button onClick={() => addTier(activeConfigUnit)} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-[10px] font-bold text-slate-400 hover:bg-slate-100 hover:border-blue-300 transition-all flex items-center justify-center gap-2">
                      <Plus size={16} /> TAMBAH ATURAN DISKON
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

        {/* --- ULTIMATE CENTERED MODAL --- */}
        {isSimModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick={() => setIsSimModalOpen(false)} />
            <div className="relative w-full max-w-4xl bg-slate-900 rounded-[3rem] shadow-[0_80px_160px_-20px_rgba(0,0,0,0.9)] border border-white/10 overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300 m-6">
              <div className="px-10 py-5 border-b border-white/5 flex items-center justify-between bg-slate-900/50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-2xl shadow-blue-900/50"><Cpu size={20} /></div>
                  <div><h2 className="text-lg font-black text-white tracking-tight">Simulator Penjualan</h2><p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Unit {activeConfigUnit}</p></div>
                </div>
                <button onClick={() => setIsSimModalOpen(false)} className="w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center text-slate-500 transition-colors"><X size={20} /></button>
              </div>

              <div className="px-12 py-6 space-y-8 flex flex-col items-center shrink-0">
                <div className="grid grid-cols-2 gap-6 w-full">
                  <div className="space-y-2"><label className="text-[8px] font-black text-slate-500 uppercase tracking-widest px-1">Harga yang Digunakan</label><div className="flex bg-slate-950 p-1 rounded-xl border border-white/5"><button onClick={() => setSimMode('master')} className={`flex-1 py-3 rounded-lg text-[9px] font-black tracking-widest transition-all ${simMode === 'master' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600'}`}>MASTER</button><button onClick={() => setSimMode('seasonal')} className={`flex-1 py-3 rounded-lg text-[9px] font-black tracking-widest transition-all ${simMode === 'seasonal' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600'}`}>SEASONAL</button></div></div>
                  <div className="space-y-2"><label className="text-[8px] font-black text-slate-500 uppercase tracking-widest px-1">Jenis Pembelian</label><div className="flex bg-slate-950 p-1 rounded-xl border border-white/5"><button onClick={() => setSimCategory('atNeed')} className={`flex-1 py-3 rounded-lg text-[9px] font-black tracking-widest transition-all ${simCategory === 'atNeed' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600'}`}>AT NEED</button><button onClick={() => setSimCategory('preNeed')} className={`flex-1 py-3 rounded-lg text-[9px] font-black tracking-widest transition-all ${simCategory === 'preNeed' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600'}`}>PRE NEED</button></div></div>
                </div>

                <div className="bg-slate-950 rounded-[2rem] p-6 border border-white/5 flex flex-col items-center justify-center space-y-2 w-full">
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Masukkan Jumlah Unit</span>
                  <div className="flex flex-col items-center w-full">
                    <input type="number" className="w-full bg-transparent text-center text-6xl font-black text-white outline-none tabular-nums focus:text-blue-500 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" value={simQty} onChange={(e) => setSimQty(Math.max(1, parseInt(e.target.value) || 1))} />
                    <div className="border-t border-white/5 pt-3 mt-1 px-8 text-center"><span className="text-base font-black text-blue-500 uppercase tracking-wider">{simQty} Unit {activeConfigUnit}</span><p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Basis Harga: {formatCurrency(simulation.unitPriceBeforeAdditional)}</p></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 w-full pb-2">
                  <div className="p-5 bg-emerald-500/10 rounded-3xl border border-emerald-500/20 flex flex-col items-center space-y-1"><span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Total Diskon</span><div className="text-2xl font-black text-emerald-400 tabular-nums">-{formatCurrency(simulation.totalAdditionalDiscount)}</div></div>
                  <div className="p-5 bg-blue-600/10 rounded-3xl border border-blue-500/20 flex flex-col items-center space-y-1"><span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Tagihan Akhir</span><div className="text-3xl font-black text-white tabular-nums tracking-tighter">{formatCurrency(simulation.totalBill)}</div></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
