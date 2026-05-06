import React from 'react';
import { 
  X, 
  Cpu, 
  Save, 
  Settings2, 
  Coins, 
  Trash2, 
  Hash, 
  Plus, 
  Play, 
  ChevronDown, 
  ChevronUp, 
  Percent, 
  Receipt 
} from 'lucide-react';
import { formatDisplayNumber, parseFormattedNumber, formatCurrency } from '../../lib/pricing-utils';

const SimulatorModal = ({ 
  isOpen, 
  onClose, 
  activeConfigUnit, 
  activeCfg, 
  updateConfig, 
  addTier, 
  removeTier, 
  updateTier, 
  confirmSave, 
  simulation, 
  simQty, 
  setSimQty, 
  simMode, 
  setSimMode, 
  simCategory, 
  setSimCategory, 
  simPayment, 
  setSimPayment 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xl" onClick={onClose} />
      <div className="relative w-full max-w-[1400px] max-h-[95vh] flex flex-col gap-4 animate-in fade-in zoom-in duration-300">
        <div className="flex items-center justify-between bg-white/10 backdrop-blur-md rounded-[1.25rem] px-6 py-3 border border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-slate-900 shadow-lg shadow-black/20"><Cpu size={18} strokeWidth={2.5} /></div>
            <div>
              <h2 className="text-lg font-black text-white tracking-tight">Simulator Sales Pintar</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[8px] text-white/40 font-bold uppercase tracking-[0.2em]">Engine Aktif:</span>
                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded-full text-[7px] font-black uppercase tracking-widest border border-blue-500/30">Unit {activeConfigUnit}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={confirmSave} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 active:scale-95"><Save size={14} /> Simpan Perubahan</button>
            <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-red-400 hover:bg-white/10 transition-all"><X size={16} /></button>
          </div>
        </div>

        <div className="flex-1 flex gap-4 min-h-0 overflow-hidden">
          {/* DARK SIDE - DYNAMIC TIER CONFIGURATION */}
          <div className="flex-1 bg-slate-900 rounded-[2rem] shadow-2xl border border-white/5 flex flex-col overflow-hidden">
            <div className="p-6 flex-1 overflow-y-auto no-scrollbar space-y-6">
              <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center"><Settings2 size={14} /></div>
                <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-white/80">Konfigurasi Aturan Diskon</h4>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block px-1">Mode Strategi</span>
                  <div className="flex bg-black/20 rounded-xl border border-white/5 p-1">
                    <button onClick={() => updateConfig(activeConfigUnit, 'discountMode', 'after-min')} className={`flex-1 py-2 rounded-lg text-[8px] font-bold transition-all ${activeCfg.discountMode === 'after-min' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500'}`}>MINIMAL</button>
                    <button onClick={() => updateConfig(activeConfigUnit, 'discountMode', 'multiple')} className={`flex-1 py-2 rounded-lg text-[8px] font-bold transition-all ${activeCfg.discountMode === 'multiple' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500'}`}>KELIPATAN</button>
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block px-1">Tipe Potongan</span>
                  <div className="flex bg-black/20 rounded-xl border border-white/5 p-1">
                    <button onClick={() => updateConfig(activeConfigUnit, 'discountType', 'per-unit')} className={`flex-1 py-2 rounded-lg text-[8px] font-bold transition-all ${activeCfg.discountType === 'per-unit' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500'}`}>PER UNIT</button>
                    <button onClick={() => updateConfig(activeConfigUnit, 'discountType', 'flat')} className={`flex-1 py-2 rounded-lg text-[8px] font-bold transition-all ${activeCfg.discountType === 'flat' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500'}`}>FLAT</button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center"><Coins size={10} /></div>
                    <h5 className="text-[8px] font-black uppercase tracking-widest text-white/40">Daftar Tier Diskon ({activeCfg.tiers.length})</h5>
                  </div>
                </div>
                
                <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2 no-scrollbar">
                  {[...activeCfg.tiers].sort((a,b) => a.minQty - b.minQty).map((tier, idx) => (
                    <div key={tier.id} className={`group bg-black/30 p-4 rounded-xl border transition-all ${simulation.activeTier?.id === tier.id ? 'border-blue-500/50 bg-blue-500/5 shadow-lg shadow-blue-500/5' : 'border-white/5'}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${simulation.activeTier?.id === tier.id ? 'bg-blue-500 animate-pulse' : 'bg-slate-700'}`} />
                          <span className="text-[7px] font-black text-white/40 uppercase tracking-[0.2em]">Tier {idx + 1}</span>
                        </div>
                        {activeCfg.tiers.length > 1 && (
                          <button onClick={() => removeTier(activeConfigUnit, tier.id)} className="w-6 h-6 rounded-md hover:bg-red-500/10 text-slate-700 hover:text-red-400 transition-all flex items-center justify-center"><Trash2 size={12} /></button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[7px] font-bold text-slate-500 uppercase tracking-widest px-1">{activeCfg.discountMode === 'after-min' ? 'Min Unit' : 'Kelipatan'}</label>
                          <div className="relative group/input">
                            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/input:text-blue-400 transition-colors" size={12} />
                            <input 
                              type="number" 
                              className="w-full bg-slate-800 border border-white/5 rounded-lg pl-8 pr-3 py-1.5 text-white font-bold outline-none focus:border-blue-500 transition-all text-[11px]"
                              value={tier.minQty}
                              onChange={(e) => updateTier(activeConfigUnit, tier.id, 'minQty', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[7px] font-bold text-slate-500 uppercase tracking-widest px-1">Diskon {activeCfg.discountType === 'per-unit' ? 'per Unit' : 'Flat'}</label>
                          <div className="relative group/input">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 font-bold text-[9px] group-focus-within/input:text-blue-400 transition-colors">Rp</span>
                            <input 
                              type="text" 
                              className="w-full bg-slate-800 border border-white/5 rounded-lg pl-8 pr-3 py-1.5 text-white font-bold outline-none focus:border-blue-500 transition-all text-[11px]"
                              value={formatDisplayNumber(tier.discount)}
                              onChange={(e) => updateTier(activeConfigUnit, tier.id, 'discount', parseFormattedNumber(e.target.value))}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button 
                    onClick={() => addTier(activeConfigUnit)} 
                    className="w-full py-3 border-2 border-dashed border-white/10 rounded-xl text-[8px] font-black text-slate-600 hover:border-blue-500/50 hover:text-blue-400 hover:bg-blue-500/5 transition-all flex items-center justify-center gap-2 group"
                  >
                    <Plus size={14} className="group-hover:scale-110 transition-transform" /> TAMBAH TIER PROMO
                  </button>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block px-1">Restriksi Metode Pembayaran</span>
                <div className="flex bg-black/20 rounded-xl border border-white/5 p-1">
                  <button onClick={() => updateConfig(activeConfigUnit, 'applicablePayment', 'cash')} className={`flex-1 py-2 rounded-lg text-[8px] font-bold transition-all ${activeCfg.applicablePayment === 'cash' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500'}`}>CASH ONLY</button>
                  <button onClick={() => updateConfig(activeConfigUnit, 'applicablePayment', 'angsur')} className={`flex-1 py-2 rounded-lg text-[8px] font-bold transition-all ${activeCfg.applicablePayment === 'angsur' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500'}`}>ANGSUR ONLY</button>
                  <button onClick={() => updateConfig(activeConfigUnit, 'applicablePayment', 'both')} className={`flex-1 py-2 rounded-lg text-[8px] font-bold transition-all ${activeCfg.applicablePayment === 'both' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500'}`}>SEMUA</button>
                </div>
              </div>
            </div>
          </div>

          {/* WHITE SIDE - SIMULATION RESULTS */}
          <div className="flex-1 bg-white rounded-[2rem] shadow-2xl border border-slate-100 flex flex-col overflow-hidden">
            <div className="p-6 flex-1 overflow-y-auto no-scrollbar space-y-5">
              <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center"><Play size={12} fill="currentColor" /></div>
                  <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-800">Uji Coba Kalkulasi</h4>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { label: 'Tipe Harga', options: [['master', 'Master'], ['seasonal', 'Promo']], state: simMode, setter: setSimMode },
                  { label: 'Kategori', options: [['atNeed', 'At Need'], ['preNeed', 'Pre Need']], state: simCategory, setter: setSimCategory },
                  { label: 'Metode', options: [['cash', 'Cash'], ['angsur', 'Angsur']], state: simPayment, setter: setSimPayment }
                ].map((grp, i) => (
                  <div key={i} className="space-y-1.5">
                    <label className="text-[7px] font-black text-slate-400 uppercase tracking-widest px-1">{grp.label}</label>
                    <div className="flex bg-slate-50 p-0.5 rounded-lg border border-slate-200">
                      {grp.options.map(([v, l]) => (
                        <button key={v} onClick={() => grp.setter(v)} className={`flex-1 py-1 rounded-md text-[7px] font-black transition-all ${grp.state === v ? 'bg-white text-blue-600 shadow-sm border border-slate-100' : 'text-slate-500'}`}>{l}</button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50/50 rounded-[1.25rem] p-4 border border-slate-100 flex items-center justify-between">
                <div className="space-y-0">
                  <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest block mb-1">Jumlah Unit</span>
                  <div className="flex items-baseline gap-1.5">
                    <input type="number" className="w-12 bg-transparent text-2xl font-black text-slate-900 outline-none" value={simQty} onChange={(e) => setSimQty(Math.max(1, parseInt(e.target.value) || 1))} />
                    <span className="text-[8px] font-bold text-slate-400 uppercase">Unit {activeConfigUnit}</span>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <button onClick={() => setSimQty(Math.max(1, simQty-1))} className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all active:scale-90"><ChevronDown size={16} /></button>
                  <button onClick={() => setSimQty(simQty+1)} className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all active:scale-90"><ChevronUp size={16} /></button>
                </div>
              </div>
              
              <div className={`p-3 rounded-xl border transition-all ${simulation.isActive ? 'bg-blue-50 border-blue-100 shadow-sm' : 'bg-slate-50 border-slate-100'}`}>
                <div className="flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${simulation.isActive ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-200 text-slate-400'}`}>
                    <Percent size={12} strokeWidth={3} />
                  </div>
                  <div>
                    <h5 className={`text-[9px] font-black uppercase tracking-widest ${simulation.isActive ? 'text-blue-600' : 'text-slate-400'} leading-none`}>
                      {simulation.isActive ? `Tier Terdeteksi: Min ${simulation.activeTier.minQty} Unit` : 'Tier Belum Terpenuhi'}
                    </h5>
                    <p className="text-[8px] font-bold text-slate-500 mt-1 leading-none">
                      {simulation.isActive 
                        ? `Strategi ${activeCfg.discountMode === 'after-min' ? 'Minimal' : 'Kelipatan'} Aktif: ${formatCurrency(simulation.activeTier.discount)} ${activeCfg.discountType === 'per-unit' ? 'per unit' : 'flat'}` 
                        : `Ambil ${[...activeCfg.tiers].sort((a,b)=>a.minQty-b.minQty).find(t => t.minQty > simQty)?.minQty - simQty || '?'} unit lagi untuk tier berikutnya.`}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 rounded-[1.5rem] p-6 shadow-2xl space-y-4 mt-auto">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-lg flex items-center justify-center"><Receipt size={12} /></div>
                    <span className="text-[8px] font-black text-white uppercase tracking-[0.2em]">Summary Perhitungan</span>
                  </div>
                  <div className={`flex items-center gap-2 text-[7px] font-black ${simulation.isActive ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500'} px-2 py-1 rounded-md uppercase tracking-widest`}>
                    {simulation.isActive ? 'TERPENUHI' : 'NORMAL'}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-0.5"><span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest block">Harga {simMode}</span><span className="text-xs font-black text-white leading-none tabular-nums">{formatCurrency(simulation.unitPriceBeforeAdditional)}</span></div>
                  <div className="space-y-0.5 text-right"><span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest block">Total Potongan</span><span className="text-xs font-black text-emerald-400 leading-none tabular-nums">-{formatCurrency(simulation.totalAdditionalDiscount)}</span></div>
                  <div className="col-span-2 pt-4 border-t border-white/5 flex justify-between items-end">
                    <div><span className="text-[8px] font-black text-blue-400 uppercase tracking-[0.3em] block mb-1">Total Tagihan</span><span className="text-3xl font-black text-white leading-none tabular-nums tracking-tighter">{formatCurrency(simulation.totalBill)}</span></div>
                    <div className="text-[6px] font-bold text-slate-500 uppercase italic">PPN Included</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulatorModal;
