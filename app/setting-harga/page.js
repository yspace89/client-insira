"use client";

import React, { useState, useMemo } from 'react';
import Sidebar from '../../components/Sidebar';
import { 
  Calendar, 
  Tag, 
  Plus, 
  CheckCircle2, 
  ChevronUp, 
  ChevronDown, 
  Save, 
  Loader2, 
  Calculator, 
  Settings2, 
  DollarSign,
  ShieldCheck,
  Zap,
  Receipt,
  Activity,
  TrendingDown
} from 'lucide-react';

// Pricing Components
import PriceField from '../../components/pricing/PriceField';
import PricingCard from '../../components/pricing/PricingCard';
import DiscountConfig from '../../components/pricing/DiscountConfig';
import SimulatorModal from '../../components/pricing/SimulatorModal';
import ReviewModal from '../../components/pricing/ReviewModal';
import ConfirmationModal from '../../components/pricing/ConfirmationModal';

// Utilities
import { formatCurrency, calculateForQty } from '../../lib/pricing-utils';

export default function PricingPage() {
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

  const [globalPromo, setGlobalPromo] = useState({
    name: 'Bulan Berkah 2026',
    startDate: defaultDates.startDate,
    endDate: defaultDates.endDate
  });

  const [activeConfigUnit, setActiveConfigUnit] = useState('Single');
  const [configs, setConfigs] = useState({
    'Single': { ...initialUnitsData['Single'], ...defaultDates, minDP: 2000000, minBooking: 5000000, tiers: [{ id: 1, minQty: 2, discount: 1000000 }, { id: 2, minQty: 4, discount: 2500000 }], discountMode: 'after-min', discountType: 'per-unit', applicablePayment: 'both' },
    'Single Premiere': { ...initialUnitsData['Single Premiere'], ...defaultDates, minDP: 2000000, minBooking: 5000000, tiers: [{ id: 1, minQty: 2, discount: 1000000 }, { id: 2, minQty: 4, discount: 2500000 }], discountMode: 'after-min', discountType: 'per-unit', applicablePayment: 'both' },
    'Couple': { ...initialUnitsData['Couple'], ...defaultDates, minDP: 5000000, minBooking: 10000000, tiers: [{ id: 1, minQty: 2, discount: 2500000 }, { id: 2, minQty: 4, discount: 7500000 }], discountMode: 'after-min', discountType: 'per-unit', applicablePayment: 'both' },
    'Couple Premiere': { ...initialUnitsData['Couple Premiere'], ...defaultDates, minDP: 5000000, minBooking: 10000000, tiers: [{ id: 1, minQty: 2, discount: 3000000 }, { id: 2, minQty: 4, discount: 10000000 }], discountMode: 'after-min', discountType: 'per-unit', applicablePayment: 'both' },
    'Family': { ...initialUnitsData['Family'], ...defaultDates, minDP: 10000000, minBooking: 25000000, tiers: [{ id: 1, minQty: 2, discount: 7500000 }, { id: 2, minQty: 4, discount: 20000000 }], discountMode: 'after-min', discountType: 'per-unit', applicablePayment: 'both' },
    'Signature Family': { ...initialUnitsData['Signature Family'], ...defaultDates, minDP: 25000000, minBooking: 50000000, tiers: [{ id: 1, minQty: 2, discount: 25000000 }, { id: 2, minQty: 4, discount: 60000000 }], discountMode: 'after-min', discountType: 'per-unit', applicablePayment: 'both' }
  });

  const [simQty, setSimQty] = useState(2);
  const [simMode, setSimMode] = useState('master');
  const [simCategory, setSimCategory] = useState('preNeed');
  const [simPayment, setSimPayment] = useState('cash');
  const [isSimModalOpen, setIsSimModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState('idle');

  const updateGlobalPromo = (field, value) => {
    setGlobalPromo(prev => ({ ...prev, [field]: value }));
  };

  const updateConfig = (unit, field, value) => setConfigs(prev => ({ ...prev, [unit]: { ...prev[unit], [field]: value } }));

  const addTier = (unit) => {
    const currentTiers = configs[unit].tiers;
    const lastTier = [...currentTiers].sort((a, b) => a.minQty - b.minQty)[currentTiers.length - 1];
    const newTier = { id: Date.now(), minQty: lastTier ? lastTier.minQty + 2 : 2, discount: lastTier ? lastTier.discount * 1.5 : 5000000 };
    updateConfig(unit, 'tiers', [...currentTiers, newTier]);
  };

  const removeTier = (unit, id) => updateConfig(unit, 'tiers', configs[unit].tiers.filter(t => t.id !== id));
  const updateTier = (unit, id, field, value) => updateConfig(unit, 'tiers', configs[unit].tiers.map(t => {
    if (t.id === id) {
      const numVal = Number(value);
      return { ...t, [field]: isNaN(numVal) ? 0 : numVal };
    }
    return t;
  }));

  const generateShareText = () => {
    let text = `✨ *OFFICIAL PRICING & PROMO: ${globalPromo.name.toUpperCase()}* ✨\n`;
    text += `📅 Periode: ${new Date(globalPromo.startDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'long' })} - ${new Date(globalPromo.endDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}\n\n`;
    
    Object.keys(configs).forEach(unit => {
      const cfg = configs[unit];
      const hasPromo = cfg.seasonalPreNeed > 0;
      
      text += `🏢 *${unit.toUpperCase()}*\n`;
      if (hasPromo) {
        text += `• ~Harga Normal: ${formatCurrency(cfg.masterPreNeed)}~\n`;
        text += `• *HARGA PROMO: ${formatCurrency(cfg.seasonalPreNeed)}* 🔥\n`;
      } else {
        text += `• Harga: ${formatCurrency(cfg.masterPreNeed)}\n`;
      }
      
      [...cfg.tiers].sort((a, b) => a.minQty - b.minQty).forEach(t => {
        text += `• Ambil ${t.minQty} Unit: Potongan ${formatCurrency(t.discount)} ${cfg.discountType === 'per-unit' ? '/Unit' : 'Total'}\n`;
      });
      text += `\n`;
    });
    
    text += `_Dibuat via Space-Clientins Pricing Engine_`;
    
    navigator.clipboard.writeText(text);
    alert('Ringkasan promo berhasil disalin ke clipboard! Siap kirim ke WhatsApp Sales.');
  };

  const simulation = useMemo(() => calculateForQty(activeConfigUnit, simQty, simMode, simCategory, simPayment, configs), [configs, simQty, activeConfigUnit, simMode, simCategory, simPayment]);

  const confirmSave = () => {
    setSaveStatus('saving');
    // Tutup modal simulator jika terbuka
    setIsSimModalOpen(false);
    
    setTimeout(() => {
      setSaveStatus('success');
      setIsReviewModalOpen(false);
      setTimeout(() => setSaveStatus('idle'), 3000);
    }, 1500);
  };

  const activeCfg = configs[activeConfigUnit];

  const seasonalAtNeedUnit = activeCfg.masterAtNeed > 0 ? Math.round((activeCfg.masterAtNeedUnit / activeCfg.masterAtNeed) * activeCfg.seasonalAtNeed) : 0;
  const seasonalPreNeedUnit = activeCfg.masterPreNeed > 0 ? Math.round((activeCfg.masterPreNeedUnit / activeCfg.masterPreNeed) * activeCfg.seasonalPreNeed) : 0;

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans text-slate-900">
      <Sidebar activeMenu="Setting Harga" />

      <main className="flex-1 flex flex-col relative overflow-hidden bg-slate-50/50">
        {/* HEADER */}
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
                onClick={() => setIsReviewModalOpen(true)}
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

        {/* SUB-HEADER: UNIT SELECTOR */}
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

        {/* MAIN CONTENT */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8 no-scrollbar">
          <div className="max-w-7xl mx-auto space-y-12 pb-32">
            
            {/* MASTER PRICES */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 px-2">
                <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Konfigurasi Harga Master</h2>
                <div className="h-px flex-1 bg-slate-200/60" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <PricingCard 
                  title="Master At Need" 
                  icon={DollarSign} 
                  totalValue={activeCfg.masterAtNeed}
                  unitValue={activeCfg.masterAtNeedUnit}
                  onChangeTotal={(v) => updateConfig(activeConfigUnit, 'masterAtNeed', v)}
                  onChangeUnit={(v) => updateConfig(activeConfigUnit, 'masterAtNeedUnit', v)}
                  colorClass="blue"
                />
                <PricingCard 
                  title="Master Pre Need" 
                  icon={ShieldCheck} 
                  totalValue={activeCfg.masterPreNeed}
                  unitValue={activeCfg.masterPreNeedUnit}
                  onChangeTotal={(v) => updateConfig(activeConfigUnit, 'masterPreNeed', v)}
                  onChangeUnit={(v) => updateConfig(activeConfigUnit, 'masterPreNeedUnit', v)}
                  colorClass="slate"
                />
              </div>
            </div>

            {/* SEASONAL PROMO */}
            <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm space-y-10 group hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/10"><Calendar size={24} strokeWidth={2.5} /></div>
                  <div>
                    <h2 className="text-lg font-black text-slate-800 tracking-tight">Harga Promo Musiman</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Konfigurasi Periode & Kampanye Aktif</p>
                  </div>
                </div>
              </div>

              {/* PROMO IDENTITY & DATES */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-slate-50/50 p-8 rounded-3xl border border-slate-100">
                <div className="lg:col-span-1 space-y-4">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Nama Kampanye Promo</label>
                  <div className="flex items-center bg-white border border-slate-200 rounded-2xl px-5 py-4 focus-within:border-blue-500 transition-all shadow-sm">
                    <Tag size={20} className="text-slate-300 mr-3" />
                    <input type="text" className="w-full bg-transparent font-bold outline-none text-slate-800 placeholder:text-slate-300" placeholder="Contoh: Promo Bulan Berkah" value={globalPromo.name} onChange={(e) => updateGlobalPromo('name', e.target.value)} />
                  </div>
                </div>
                <div className="lg:col-span-2 grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Mulai Berlaku</label>
                    <div className="flex items-center bg-white border border-slate-200 rounded-2xl px-5 py-4 focus-within:border-blue-500 transition-all shadow-sm">
                      <Calendar size={18} className="text-slate-300 mr-3" />
                      <input type="date" className="bg-transparent font-bold outline-none text-slate-800 text-sm" value={globalPromo.startDate} onChange={(e) => updateGlobalPromo('startDate', e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Berakhir Pada</label>
                    <div className="flex items-center bg-white border border-slate-200 rounded-2xl px-5 py-4 focus-within:border-blue-500 transition-all shadow-sm">
                      <Calendar size={18} className="text-slate-300 mr-3" />
                      <input type="date" className="bg-transparent font-bold outline-none text-slate-800 text-sm" value={globalPromo.endDate} onChange={(e) => updateGlobalPromo('endDate', e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <PricingCard 
                  title="Seasonal At Need" 
                  icon={Zap} 
                  totalValue={activeCfg.seasonalAtNeed}
                  unitValue={seasonalAtNeedUnit}
                  onChangeTotal={(v) => updateConfig(activeConfigUnit, 'seasonalAtNeed', v)}
                  isReadOnly={false}
                  onChangeUnit={() => {}} // Read-only for unit price in seasonal
                  unitIsReadOnly={true}
                  colorClass="amber"
                />
                <PricingCard 
                  title="Seasonal Pre Need" 
                  icon={ShieldCheck} 
                  totalValue={activeCfg.seasonalPreNeed}
                  unitValue={seasonalPreNeedUnit}
                  onChangeTotal={(v) => updateConfig(activeConfigUnit, 'seasonalPreNeed', v)}
                  isReadOnly={false}
                  onChangeUnit={() => {}} // Read-only for unit price in seasonal
                  unitIsReadOnly={true}
                  colorClass="slate"
                />
              </div>
            </div>

            <div className="space-y-8 pb-32">
              {/* FULL WIDTH DP SECTION */}
              <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm group hover:shadow-md transition-all">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center shadow-lg shadow-rose-500/10"><Receipt size={24} strokeWidth={2.5} /></div>
                  <div>
                    <h2 className="text-lg font-black text-slate-800 tracking-tight">Aturan Down Payment</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Komitmen Awal & Biaya Pemesanan</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50/50 p-8 rounded-3xl border border-slate-100">
                  <PriceField label="Minimum DP" value={activeCfg.minDP} onChange={(v) => updateConfig(activeConfigUnit, 'minDP', v)} />
                  <PriceField label="Booking Fee" value={activeCfg.minBooking} onChange={(v) => updateConfig(activeConfigUnit, 'minBooking', v)} />
                </div>
              </div>

              {/* FULL WIDTH DISCOUNT CONFIG */}
              <DiscountConfig 
                activeCfg={activeCfg}
                unit={activeConfigUnit}
                updateConfig={updateConfig}
                updateTier={updateTier}
                removeTier={removeTier}
                addTier={addTier}
              />
            </div>
          </div>
        </div>

        {/* FLOATING ACTION BUTTON */}
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

        {/* MODALS */}
        <SimulatorModal 
          isOpen={isSimModalOpen}
          onClose={() => setIsSimModalOpen(false)}
          activeConfigUnit={activeConfigUnit}
          activeCfg={activeCfg}
          updateConfig={updateConfig}
          addTier={addTier}
          removeTier={removeTier}
          updateTier={updateTier}
          confirmSave={confirmSave}
          simulation={simulation}
          simQty={simQty}
          setSimQty={setSimQty}
          simMode={simMode}
          setSimMode={setSimMode}
          simCategory={simCategory}
          setSimCategory={setSimCategory}
          simPayment={simPayment}
          setSimPayment={setSimPayment}
          setIsConfirmModalOpen={setIsConfirmModalOpen}
        />

        <ReviewModal 
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          globalPromo={globalPromo}
          configs={configs}
          generateShareText={generateShareText}
          confirmSave={confirmSave}
          saveStatus={saveStatus}
        />

        <ConfirmationModal 
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={confirmSave}
          message={`Apakah Anda yakin ingin mengintegrasikan konfigurasi simulasi ini ke settingan Unit ${activeConfigUnit}? Seluruh aturan tier diskon yang baru akan menggantikan aturan lama.`}
        />
      </main>
    </div>
  );
}
