"use client";

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  ChevronRight, 
  ChevronDown,
  Info, 
  MessageSquare, 
  Phone, 
  MapPin, 
  Eye,
  Target,
  Search,
  Command,
  User,
  Calendar,
  FileText,
  CheckCircle2,
  XCircle,
  Map,
  MoreVertical,
  ExternalLink,
  MessageCircle,
  PhoneCall,
  UserCheck,
  AlertCircle
} from 'lucide-react';

/**
 * RadialProgress component for CIT/CIR charts
 */
export const RadialProgress = ({ 
  value, 
  max = 100, 
  label, 
  subLabel, 
  color = "blue", 
  size = 200, 
  strokeWidth = 12,
  showBadge = false,
  badgeText = "",
  onClick
}) => {
  const [currentOffset, setCurrentOffset] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  
  useEffect(() => {
    // Initial animation
    const targetOffset = circumference - (value / max) * circumference;
    const timer = setTimeout(() => setCurrentOffset(targetOffset), 100);
    return () => clearTimeout(timer);
  }, [value, max, circumference]);

  const colors = {
    blue: {
      stroke: "#2563eb",
      track: "#f1f5f9",
      bg: "rgba(37, 99, 235, 0.05)"
    },
    emerald: {
      stroke: "#10b981",
      track: "#f1f5f9",
      bg: "rgba(16, 185, 129, 0.05)"
    }
  };

  const currentColor = colors[color] || colors.blue;

  return (
    <div 
      className={`relative flex items-center justify-center cursor-pointer group transition-all duration-500 hover:scale-[1.02] active:scale-95`} 
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-2xl" />
      
      <svg
        className="transform -rotate-90 relative z-10"
        width={size}
        height={size}
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={currentColor.track}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={currentColor.stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference} // Start at full circumference for animation
          style={{ 
            strokeDashoffset: currentOffset,
            transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          fill="none"
          strokeLinecap="round"
          className="filter drop-shadow-[0_0_8px_rgba(37,99,235,0.3)]"
        />
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-20">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 group-hover:text-blue-500 transition-colors">{label}</span>
        <span className="text-xl font-bold text-slate-900 tracking-tight group-hover:scale-110 transition-transform">{subLabel}</span>
        {showBadge && (
          <div className="mt-2 px-2.5 py-0.5 bg-red-50 text-red-500 text-[9px] font-bold rounded-full border border-red-100 uppercase tracking-wide animate-pulse-subtle">
            {badgeText}
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes pulse-subtle {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

/**
 * Sparkline - Mini trend chart for premium dashboard feel
 */
export const Sparkline = ({ data = [30, 40, 35, 50, 45, 60, 55], color = "#2563eb", width = 100, height = 30 }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  const points = data.map((val, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - ((val - min) / range) * height
  }));
  
  const d = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;
  
  return (
    <svg width={width} height={height} className="overflow-visible">
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-draw"
        style={{ filter: `drop-shadow(0 2px 4px ${color}40)` }}
      />
      <style jsx>{`
        .animate-draw {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: draw 2s ease-out forwards;
        }
        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </svg>
  );
};

/**
 * ModernDonut - Stylized donut chart with gradients
 */
export const ModernDonut = ({ value, max, label, subLabel, color = "blue", size = 160 }) => {
  const radius = 65;
  const circumference = radius * 2 * Math.PI;
  const percentage = (value / max) * 100;
  const offset = circumference - (percentage / 100) * circumference;

  const colors = {
    blue: {
      from: "#2563eb",
      to: "#3b82f6",
      bg: "rgba(37, 99, 235, 0.05)"
    },
    emerald: {
      from: "#059669",
      to: "#10b981",
      bg: "rgba(16, 185, 129, 0.05)"
    }
  };

  const c = colors[color] || colors.blue;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 160 160" className="transform -rotate-90">
        <defs>
          <linearGradient id={`grad-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={c.from} />
            <stop offset="100%" stopColor={c.to} />
          </linearGradient>
        </defs>
        {/* Track */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="#f1f5f9"
          strokeWidth="12"
          fill="none"
        />
        {/* Progress */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke={`url(#grad-${color})`}
          strokeWidth="14"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          fill="none"
          style={{ 
            strokeDashoffset: offset,
            transition: 'stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          className="filter drop-shadow-[0_0_8px_rgba(37,99,235,0.2)]"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
        <span className="text-xl font-bold text-slate-900 tracking-tight">{subLabel}</span>
      </div>
    </div>
  );
};

/**
 * MetricStat component for target display
 */
export const MetricStat = ({ label, value, type = "default" }) => (
  <div className="flex flex-col gap-1 group">
    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-600 transition-colors">{label}</span>
    <span className="text-sm font-bold text-slate-800 tracking-tight group-hover:translate-x-1 transition-transform">{value}</span>
  </div>
);

/**
 * CommandPalette component (Mock)
 */
export const CommandPalette = () => (
  <div className="relative group w-full max-w-md">
    <div className="absolute inset-0 bg-blue-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative flex items-center bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm focus-within:ring-4 focus-within:ring-blue-500/5 focus-within:border-blue-500 transition-all">
      <Search className="text-slate-400 mr-3" size={18} />
      <input 
        type="text" 
        placeholder="Cari module, data sales, atau customer..." 
        className="flex-1 bg-transparent border-none focus:outline-none text-sm font-medium placeholder:text-slate-400"
      />
      <div className="flex items-center gap-1 px-2 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-bold text-slate-400">
        <Command size={10} />
        <span>K</span>
      </div>
    </div>
  </div>
);

/**
 * AktivitasTableItem - Compact row with dropdown based on Lark structure
 */
export const AktivitasTableItem = ({ 
  item, 
  isExpanded, 
  onToggle,
  onPhotoClick
}) => {
  const { 
    submittedOn, 
    salesName, 
    salesAvatar, 
    jenisKegiatan, 
    namaKegiatan, 
    kondisi, 
    proposal, 
    catatan, 
    lokasi, 
    foto 
  } = item;

  const jenisColors = {
    'Visit': 'bg-blue-50 text-blue-600 border-blue-100',
    'Event': 'bg-amber-50 text-amber-600 border-amber-100',
    'Meeting': 'bg-indigo-50 text-indigo-600 border-indigo-100'
  };

  const kondisiColors = {
    'Hot': 'bg-red-50 text-red-600 border-red-100',
    'Warm': 'bg-orange-50 text-orange-600 border-orange-100',
    'Cold': 'bg-sky-50 text-sky-600 border-sky-100'
  };

  return (
    <>
      <tr 
        className={`group/row transition-all cursor-pointer ${isExpanded ? 'bg-emerald-50/50' : 'hover:bg-slate-50/80'}`}
        onClick={onToggle}
      >
        <td className={`px-4 py-4 rounded-l-2xl border-y ${isExpanded ? 'border-emerald-100' : 'border-transparent'}`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-white shadow-sm overflow-hidden bg-slate-100 shrink-0">
              <img src={salesAvatar || `https://ui-avatars.com/api/?name=${salesName}&background=f1f5f9&color=64748b`} alt={salesName} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-slate-800 truncate group-hover/row:text-emerald-600 transition-colors uppercase tracking-tight">{salesName}</span>
              <span className="text-[9px] font-bold text-slate-400 mt-0.5">{submittedOn}</span>
            </div>
          </div>
        </td>
        <td className={`px-4 py-4 border-y ${isExpanded ? 'border-emerald-100' : 'border-transparent'} text-center`}>
          <div className={`px-2 py-0.5 rounded-full text-[9px] font-bold border inline-block ${jenisColors[jenisKegiatan] || 'bg-slate-50 text-slate-600 border-slate-100'}`}>
            {jenisKegiatan}
          </div>
        </td>
        <td className={`px-4 py-4 rounded-r-2xl border-y ${isExpanded ? 'border-emerald-100' : 'border-transparent'} text-right`}>
          <div className={`w-7 h-7 flex items-center justify-center bg-white text-slate-300 rounded-lg ml-auto shadow-sm transition-all ${isExpanded ? 'rotate-180 text-emerald-500' : ''}`}>
            <ChevronDown size={12} />
          </div>
        </td>
      </tr>
      
      {isExpanded && (
        <tr className="animate-fadeIn">
          <td colSpan="3" className="px-0 pb-2">
            <div className="bg-white border-x border-b border-emerald-100 rounded-b-3xl p-6 shadow-sm mx-1 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <FileText size={32} className="text-emerald-500" />
              </div>
              
              <div className="relative z-10 flex flex-col gap-5">
                {/* Title and Badges */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">
                    {namaKegiatan}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] font-bold border ${kondisiColors[kondisi] || 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {kondisi || 'No Status'}
                    </div>
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] font-bold border ${proposal === 'Ya' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                      {proposal === 'Ya' ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                      Proposal: {proposal}
                    </div>
                  </div>
                </div>

                {/* Notes and Photo */}
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="flex-1 min-w-0 space-y-1.5 w-full">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Catatan Kegiatan</span>
                    <div className="text-[11px] text-slate-600 leading-relaxed font-medium italic bg-slate-50/50 p-4 rounded-2xl border border-slate-100 whitespace-pre-wrap break-words">
                      {catatan ? `"${catatan}"` : 'Tidak ada catatan.'}
                    </div>
                  </div>
                  {foto && (
                    <div 
                      className="w-16 h-16 rounded-2xl border-2 border-white shadow-md overflow-hidden shrink-0 cursor-pointer hover:scale-110 transition-all hover:ring-4 hover:ring-blue-500/20 active:scale-95"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPhotoClick(foto);
                      }}
                    >
                      <img src={foto} alt="Bukti" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lokasi)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-400 hover:text-blue-500 transition-colors cursor-pointer group/loc max-w-[90%]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MapPin size={12} className="shrink-0" />
                    <span className="text-[10px] font-bold truncate tracking-tight">{lokasi}</span>
                    <ExternalLink size={10} className="opacity-0 group-hover/loc:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

/**
 * InteraksiTableItem - Compact row with dropdown based on Lark structure
 */
export const InteraksiTableItem = ({ 
  item, 
  isExpanded, 
  onToggle,
  onPhotoClick // Not used for Interaksi as per PRD but keeping for consistency if needed
}) => {
  const { 
    tanggalInteraksi, 
    leadsName, 
    salesName,
    status, 
    kendala, 
    catatan 
  } = item;

  const statusColors = {
    'Warm (Potensi)': 'bg-orange-50 text-orange-600 border-orange-100',
    'Cold (Belum Siap)': 'bg-blue-50 text-blue-600 border-blue-100',
    'Freeze': 'bg-slate-50 text-slate-500 border-slate-100'
  };

  return (
    <>
      <tr 
        className={`group/row transition-all cursor-pointer ${isExpanded ? 'bg-blue-50/50' : 'hover:bg-slate-50/80'}`}
        onClick={onToggle}
      >
        <td className={`px-4 py-4 rounded-l-2xl border-y ${isExpanded ? 'border-blue-100' : 'border-transparent'}`}>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-tight group-hover/row:text-blue-600 transition-colors truncate max-w-[120px]">{leadsName}</span>
            <div className="flex items-center gap-1.5 mt-0.5">
               <span className="text-[9px] font-bold text-slate-400">{tanggalInteraksi}</span>
               <span className="w-1 h-1 rounded-full bg-slate-200" />
               <span className="text-[9px] font-bold text-blue-500 uppercase tracking-tight">{salesName}</span>
            </div>
          </div>
        </td>
        <td className={`px-4 py-4 border-y ${isExpanded ? 'border-blue-100' : 'border-transparent'} text-center`}>
          <div className={`px-2 py-0.5 rounded-full text-[9px] font-bold border inline-block ${statusColors[status] || 'bg-slate-50 text-slate-400 border-slate-100'}`}>
            {status}
          </div>
        </td>
        <td className={`px-4 py-4 rounded-r-2xl border-y ${isExpanded ? 'border-blue-100' : 'border-transparent'} text-right`}>
          <div className={`w-7 h-7 flex items-center justify-center bg-white text-slate-300 rounded-lg ml-auto shadow-sm transition-all ${isExpanded ? 'rotate-180 text-blue-500' : ''}`}>
            <ChevronDown size={12} />
          </div>
        </td>
      </tr>
      
      {isExpanded && (
        <tr className="animate-fadeIn">
          <td colSpan="3" className="px-0 pb-2">
            <div className="bg-white border-x border-b border-blue-100 rounded-b-3xl p-6 shadow-sm mx-1 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <MessageCircle size={32} className="text-blue-500" />
              </div>
              
              <div className="relative z-10 flex flex-col gap-5">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Kendala</span>
                    <div className="px-2 py-0.5 bg-red-50 text-red-500 text-[9px] font-bold rounded-lg border border-red-100 uppercase tracking-wide">
                      {kendala || 'Tidak Ada Kendala'}
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Catatan Interaksi</span>
                  <div className="text-[11px] text-slate-600 leading-relaxed font-medium italic bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                    {catatan ? `"${catatan}"` : 'Tidak ada catatan detail.'}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Data Real-time Lark</span>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

/**
 * LeaderboardItem component
 */
export const LeaderboardItem = ({ rank, name, value, avatar }) => (
  <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-0.5 transition-all group cursor-pointer">
    <div className="flex items-center gap-4">
      <span className="w-6 text-center font-bold text-slate-400 group-hover:text-blue-500 transition-colors">{rank}</span>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden group-hover:border-blue-100 transition-colors">
          <img src={avatar || `https://ui-avatars.com/api/?name=${name}&background=f1f5f9&color=64748b`} alt={name} className="w-full h-full object-cover" />
        </div>
        <span className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{name}</span>
      </div>
    </div>
    <div className="flex flex-col items-end">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Capaian</span>
      <span className="text-xs font-bold text-blue-600 group-hover:scale-110 transition-transform">{value}</span>
    </div>
  </div>
);

/**
 * LinearProgressBar component
 */
export const LinearProgressBar = ({ label, value, max, percentage, color = "blue", status = "" }) => (
  <div className="flex flex-col gap-3 mb-6 last:mb-0 group cursor-pointer">
    <div className="flex justify-between items-end">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-800 uppercase tracking-widest group-hover:text-blue-500 transition-colors">{label}</span>
          <Info size={12} className="text-slate-400 group-hover:text-blue-400" />
        </div>
        {status && (
          <span className="px-2 py-0.5 bg-red-50 text-red-500 text-[9px] font-bold rounded-full border border-red-100 w-fit uppercase tracking-wide group-hover:bg-red-500 group-hover:text-white transition-all">
            {status}
          </span>
        )}
      </div>
      <span className="text-xs font-bold text-slate-400 tabular-nums">{percentage}%</span>
    </div>
    
    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner group-hover:h-2 transition-all">
      <div 
        className={`h-full bg-gradient-to-r ${color === 'blue' ? 'from-blue-500 to-indigo-600' : 'from-emerald-500 to-teal-600'} rounded-full transition-all duration-1000 ease-out`}
        style={{ width: `${percentage}%` }}
      />
    </div>
    
    <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
      Tercapai <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{value}</span> dari <span className="font-bold text-slate-600">{max}</span>
    </div>
    
    <button className="flex items-center gap-1.5 text-[10px] font-bold text-blue-500 hover:underline w-fit mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
      Lihat Detail <ChevronRight size={12} />
    </button>
  </div>
);
