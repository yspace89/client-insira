export const formatDisplayNumber = (val) => {
  if (val === undefined || val === null || isNaN(val)) return "0";
  return new Intl.NumberFormat('id-ID').format(val);
};

export const parseFormattedNumber = (val) => {
  if (typeof val !== 'string') return val;
  return Number(val.replace(/\./g, ''));
};

export const formatCurrency = (val) => 
  new Intl.NumberFormat('id-ID', { 
    style: 'currency', 
    currency: 'IDR', 
    minimumFractionDigits: 0 
  }).format(val);

export const calculateForQty = (unit, qty, mode, cat, pay, configs) => {
  const cfg = configs[unit];
  if (!cfg) return null;

  const priceKey = mode === 'master' ? (cat === 'atNeed' ? 'masterAtNeed' : 'masterPreNeed') : (cat === 'atNeed' ? 'seasonalAtNeed' : 'seasonalPreNeed');
  const unitPriceBeforeAdditional = cfg[priceKey] || 0;
  const subtotalBeforeAdditional = unitPriceBeforeAdditional * qty;
  
  const sortedTiers = [...cfg.tiers].sort((a, b) => b.minQty - a.minQty);
  const activeTier = sortedTiers.find(t => qty >= t.minQty) || null;
  
  let totalAdditionalDiscount = 0;
  const isPaymentValid = cfg.applicablePayment === 'both' || cfg.applicablePayment === pay;

  if (activeTier && isPaymentValid) {
    if (cfg.discountMode === 'after-min') {
      const applicableQty = qty;
      totalAdditionalDiscount = cfg.discountType === 'per-unit' ? activeTier.discount * applicableQty : activeTier.discount;
    } else {
      const factor = Math.floor(qty / activeTier.minQty);
      totalAdditionalDiscount = cfg.discountType === 'per-unit' ? (activeTier.discount * factor * activeTier.minQty) : (activeTier.discount * factor);
    }
  }
  const totalBill = subtotalBeforeAdditional - totalAdditionalDiscount;
  
  return { 
    totalBill, 
    finalPricePerUnit: qty > 0 ? totalBill / qty : 0, 
    totalAdditionalDiscount, 
    activeTier,
    isActive: (!!activeTier && isPaymentValid), 
    unitPriceBeforeAdditional, 
    isPaymentMismatch: (!!activeTier && !isPaymentValid) 
  };
};
