import React from 'react';
import { Activity, Tag, X, Share2, Receipt, Loader2, Save } from 'lucide-react';
import { formatCurrency } from '../../lib/pricing-utils';

const ReviewModal = ({ 
  isOpen, 
  onClose, 
  globalPromo, 
  configs, 
  generateShareText, 
  confirmSave, 
  saveStatus 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-5xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in slide-in-from-bottom-10 duration-500">
        <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20"><Activity size={28} /></div>
            <div>
              <h3 className="text-2xl font-black text-slate-800 leading-tight">Review Ringkasan Promo</h3>
              <p className="text-sm font-bold text-slate-400 flex items-center gap-2 mt-1"><Tag size={14} /> {globalPromo.name} • {new Date(globalPromo.startDate).toLocaleDateString('id-ID')} - {new Date(globalPromo.endDate).toLocaleDateString('id-ID')}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-12 h-12 rounded-full bg-white text-slate-300 hover:text-rose-500 hover:shadow-xl transition-all flex items-center justify-center"><X size={24} /></button>
        </div>
        
        <div className="p-10 overflow-y-auto no-scrollbar flex-1 space-y-8">
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-6 px-6 py-3 bg-slate-100 rounded-xl">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipe Unit</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Harga Master</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Harga Promo</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest col-span-3">Aturan Diskon (Tiers)</span>
            </div>
            {Object.keys(configs).map(unit => {
              const hasPromo = configs[unit].seasonalPreNeed > 0;
              return (
                <div key={unit} className="grid grid-cols-6 px-6 py-5 bg-white border border-slate-100 rounded-2xl hover:border-blue-200 transition-all group">
                  <span className="font-black text-slate-800">{unit}</span>
                  <span className={`font-bold ${hasPromo ? 'text-slate-300 line-through' : 'text-slate-500'}`}>
                    {formatCurrency(configs[unit].masterPreNeed)}
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className={`font-black ${hasPromo ? 'text-blue-600' : 'text-slate-300'}`}>
                      {hasPromo ? formatCurrency(configs[unit].seasonalPreNeed) : '-'}
                    </span>
                    {hasPromo && (
                      <span className="w-fit px-2 py-1 bg-emerald-500 text-white text-[7px] font-black rounded-md uppercase tracking-widest animate-pulse">
                        Berlaku s/d {new Date(globalPromo.endDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                    )}
                  </div>
                  <div className="col-span-3 flex flex-wrap gap-2">
                    {[...configs[unit].tiers].sort((a,b)=>a.minQty-b.minQty).map(t => (
                      <span key={t.id} className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[9px] font-black border border-emerald-100 italic">
                        Ambil {t.minQty} Unit → -{formatCurrency(t.discount)}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-blue-50 rounded-3xl p-8 flex items-center justify-between border border-blue-100">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20"><Share2 size={24} /></div>
              <div>
                <h4 className="text-lg font-black text-blue-900">Bagikan ke Tim Sales</h4>
                <p className="text-sm font-medium text-blue-600/80 mt-1">Salin ringkasan harga ini untuk disebar ke grup WhatsApp Sales.</p>
              </div>
            </div>
            <button onClick={generateShareText} className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm border border-blue-100 active:scale-95 flex items-center gap-2">
              <Receipt size={18} /> Salin Penawaran
            </button>
          </div>
        </div>

        <div className="p-10 border-t border-slate-100 flex gap-4">
          <button onClick={onClose} className="flex-1 py-5 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all border border-slate-100">Batal</button>
          <button onClick={confirmSave} className="flex-[2] py-5 rounded-2xl font-black text-xs uppercase tracking-widest bg-blue-600 text-white hover:bg-blue-500 shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-3 active:scale-95">
            {saveStatus === 'saving' ? (
              <><Loader2 className="animate-spin" size={20} /> Sedang Mensinkronkan...</>
            ) : (
              <><Save size={20} /> Konfirmasi & Simpan ke Database</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
