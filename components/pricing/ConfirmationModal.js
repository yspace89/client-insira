import React from 'react';
import { AlertCircle, X, CheckCircle2 } from 'lucide-react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message, title = "Konfirmasi Perubahan" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center">
              <AlertCircle size={24} />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-800">{title}</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Verifikasi Tindakan</p>
            </div>
          </div>
          
          <p className="text-sm font-medium text-slate-600 leading-relaxed">
            {message}
          </p>

          <div className="flex gap-3 pt-2">
            <button 
              onClick={onClose}
              className="flex-1 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all border border-slate-100"
            >
              Batal
            </button>
            <button 
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={14} /> Ya, Integrasikan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
