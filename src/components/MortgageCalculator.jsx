import { useState, useMemo } from 'react';

function parsePrice(priceStr) {
  // "$850,000" → 850000  (بدون ضرب بمليون)
  return parseFloat(priceStr.replace(/[^0-9.]/g, ''));
}

export default function MortgageCalculator({ price }) {
  const [downPct, setDownPct] = useState(20);
  const [term, setTerm]       = useState(25);
  const [rate, setRate]       = useState(4.5);

  const propertyPrice = parsePrice(price);

  const { monthly, totalPayment, totalInterest } = useMemo(() => {
    const principal = propertyPrice * (1 - downPct / 100);
    const r = rate / 100 / 12;
    const n = term * 12;
    if (r === 0) {
      const m = principal / n;
      return { monthly: m, totalPayment: m * n, totalInterest: 0 };
    }
    const m = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return { monthly: m, totalPayment: m * n, totalInterest: m * n - principal };
  }, [propertyPrice, downPct, term, rate]);

  const fmt = (n) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 space-y-5">
      <h3 className="font-display text-lg font-semibold text-white">Mortgage Calculator</h3>

      {/* Down Payment */}
      <div>
        <div className="flex justify-between text-xs text-white/50 mb-1.5">
          <span className="uppercase tracking-wider">Down Payment</span>
          <span style={{ color: '#C9A84C' }}>{downPct}%</span>
        </div>
        <input
          type="range" min={10} max={50} value={downPct}
          onChange={(e) => setDownPct(+e.target.value)}
          className="w-full accent-yellow-500"
        />
        <p className="text-xs text-white/40 mt-1">{fmt(propertyPrice * downPct / 100)} down</p>
      </div>

      {/* Loan Term */}
      <div>
        <label className="block text-xs uppercase tracking-wider text-white/50 mb-1.5">Loan Term</label>
        <select
          value={term}
          onChange={(e) => setTerm(+e.target.value)}
          className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
        >
          {[15, 20, 25, 30].map((y) => <option key={y} value={y} className="bg-slate-900 text-white">{y} years</option>)}
        </select>
      </div>

      {/* Interest Rate */}
      <div>
        <label className="block text-xs uppercase tracking-wider text-white/50 mb-1.5">Interest Rate (%)</label>
        <input
          type="number" min={1} max={15} step={0.1} value={rate}
          onChange={(e) => setRate(+e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
        />
      </div>

      {/* Results */}
      <div className="border-t border-white/10 pt-4 space-y-3">
        <div className="text-center">
          <p className="text-xs uppercase tracking-wider text-white/40 mb-1">Monthly Payment</p>
          <p className="font-display text-3xl font-semibold" style={{ color: '#C9A84C' }}>{fmt(monthly)}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-white/5 rounded-xl p-3">
            <p className="text-xs text-white/40 mb-1">Total Payment</p>
            <p className="text-sm font-semibold text-white">{fmt(totalPayment)}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3">
            <p className="text-xs text-white/40 mb-1">Total Interest</p>
            <p className="text-sm font-semibold text-white">{fmt(totalInterest)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
