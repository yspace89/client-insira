import React from 'react';
import PriceField from './PriceField';

const PricingCard = ({ title, icon: Icon, totalValue, unitValue, onChangeTotal, onChangeUnit, isReadOnly = false, colorClass = "blue" }) => {
  const iplmValue = totalValue - unitValue;
  const unitPercentage = totalValue > 0 ? Math.round((unitValue / totalValue) * 100) : 0;
  const iplmPercentage = totalValue > 0 ? Math.round((iplmValue / totalValue) * 100) : 0;

  const bgColors = {
    blue: "bg-blue-50 text-blue-500",
    slate: "bg-slate-50 text-slate-400",
    amber: "bg-amber-50 text-amber-500"
  };

  return (
    <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm space-y-8 group hover:shadow-md transition-all">
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform ${bgColors[colorClass] || bgColors.slate}`}>
          <Icon size={18} strokeWidth={2.5} />
        </div>
        <h2 className="text-[11px] font-bold text-slate-800 uppercase tracking-widest">{title}</h2>
      </div>
      
      <PriceField 
        label="Harga Total" 
        value={totalValue} 
        onChange={onChangeTotal} 
        isReadOnly={isReadOnly}
      />
      
      <div className="grid grid-cols-2 gap-6">
        <PriceField 
          label="Harga Satuan Unit" 
          value={unitValue} 
          onChange={onChangeUnit} 
          isReadOnly={isReadOnly}
          percentage={unitPercentage} 
        />
        <PriceField 
          label="Biaya IPLM" 
          value={iplmValue} 
          isReadOnly 
          percentage={iplmPercentage} 
        />
      </div>
    </div>
  );
};

export default PricingCard;
