import React from 'react';
import { Percent, Trash2, Plus } from 'lucide-react';
import { formatDisplayNumber, parseFormattedNumber } from '../../lib/pricing-utils';

const DiscountConfig = ({ activeCfg, updateConfig, updateTier, removeTier, addTier, unit }) => {
  return (
    <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm space-y-8 group hover:shadow-md transition-all">
      <div className="flex items-center justify-between border-b border-slate-50 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center"><Percent size={18} strokeWidth={2.5} /></div>
          <div>
            <h2 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Konfigurasi Strategi Diskon</h2>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Pengaturan Tier & Logika Potongan</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Mode Diskon</span>
            </div>
            <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
              <button onClick={() => updateConfig(unit, 'discountMode', 'after-min')} className={`flex-1 py-1.5 rounded-lg text-[9px] font-bold transition-all ${activeCfg.discountMode === 'after-min' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>MINIMAL UNIT</button>
              <button onClick={() => updateConfig(unit, 'discountMode', 'multiple')} className={`flex-1 py-1.5 rounded-lg text-[9px] font-bold transition-all ${activeCfg.discountMode === 'multiple' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>KELIPATAN UNIT</button>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Tipe Potongan</span>
            </div>
            <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
              <button onClick={() => updateConfig(unit, 'discountType', 'per-unit')} className={`flex-1 py-1.5 rounded-lg text-[9px] font-bold transition-all ${activeCfg.discountType === 'per-unit' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>POTONGAN PER UNIT</button>
              <button onClick={() => updateConfig(unit, 'discountType', 'flat')} className={`flex-1 py-1.5 rounded-lg text-[9px] font-bold transition-all ${activeCfg.discountType === 'flat' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>POTONGAN FLAT</button>
            </div>
          </div>
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Metode Pembayaran Berlaku</span>
            </div>
            <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
              <button onClick={() => updateConfig(unit, 'applicablePayment', 'cash')} className={`flex-1 py-1.5 rounded-lg text-[9px] font-bold transition-all ${activeCfg.applicablePayment === 'cash' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>CASH ONLY</button>
              <button onClick={() => updateConfig(unit, 'applicablePayment', 'angsur')} className={`px-8 py-1.5 rounded-lg text-[9px] font-bold transition-all ${activeCfg.applicablePayment === 'angsur' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>ANGSUR ONLY</button>
              <button onClick={() => updateConfig(unit, 'applicablePayment', 'both')} className={`flex-1 py-1.5 rounded-lg text-[9px] font-bold transition-all ${activeCfg.applicablePayment === 'both' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>KEDUANYA</button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {activeCfg.tiers.map(tier => (
          <div key={tier.id} className="flex items-end gap-5 p-6 bg-slate-50/50 rounded-2xl border border-slate-100 border-l-[6px] border-l-emerald-500">
            <div className="w-28">
              <label className="text-[9px] font-bold text-slate-400 mb-2 block uppercase tracking-widest opacity-70">Min Qty</label>
              <input type="number" className="w-full bg-transparent font-bold outline-none text-slate-800 text-lg" value={tier.minQty} onChange={(e) => updateTier(unit, tier.id, 'minQty', e.target.value)} />
            </div>
            <div className="flex-1">
              <label className="text-[9px] font-bold text-slate-400 mb-2 block uppercase tracking-widest opacity-70">Diskon</label>
              <div className="flex items-center gap-2">
                 <span className="text-slate-300 font-bold">Rp</span>
                 <input type="text" className="w-full bg-transparent font-bold outline-none text-slate-800 text-lg" value={formatDisplayNumber(tier.discount)} onChange={(e) => updateTier(unit, tier.id, 'discount', parseFormattedNumber(e.target.value))} />
              </div>
            </div>
            {activeCfg.tiers.length > 1 && (
              <button onClick={() => removeTier(unit, tier.id)} className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16} /></button>
            )}
          </div>
        ))}
        <button onClick={() => addTier(unit)} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-[1.5rem] text-[10px] font-bold text-slate-400 hover:bg-white hover:border-blue-300 hover:text-blue-500 transition-all flex items-center justify-center gap-2">
          <Plus size={16} /> TAMBAH TIER DISKON
        </button>
      </div>
    </div>
  );
};

export default DiscountConfig;
