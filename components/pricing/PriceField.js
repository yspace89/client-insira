import React from 'react';
import { formatDisplayNumber, parseFormattedNumber } from '../../lib/pricing-utils';

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

export default PriceField;
