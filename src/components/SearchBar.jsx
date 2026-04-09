import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';

const CITIES = ['All Cities', 'Dubai', 'Abu Dhabi', 'Riyadh'];
const PRICES = ['Any Price', 'Under $700K', '$700K–$1M', '$1M+'];
const BEDS   = ['Any Beds', '1+', '2+', '3+', '4+', '5+'];
const TYPES  = ['Any Type', 'Villa', 'Penthouse', 'Estate'];

const DEFAULT_FILTERS = { city: 'All Cities', price: 'Any Price', beds: 'Any Beds', type: 'Any Type' };

export default function SearchBar({ filters, onChange }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const select = (key, val) => onChange({ ...filters, [key]: val });

  const hasActiveFilters =
    filters.city  !== DEFAULT_FILTERS.city  ||
    filters.price !== DEFAULT_FILTERS.price ||
    filters.beds  !== DEFAULT_FILTERS.beds  ||
    filters.type  !== DEFAULT_FILTERS.type;

  const labelClass  = 'block text-xs text-white/40 uppercase tracking-wider mb-1';
  const selectClass = 'w-full bg-slate-800/60 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 transition-colors appearance-none cursor-pointer';

  const selects = [
    { key: 'city',  label: 'City',        options: CITIES },
    { key: 'price', label: 'Price Range', options: PRICES },
    { key: 'beds',  label: 'Bedrooms',    options: BEDS   },
    { key: 'type',  label: 'Type',        options: TYPES  },
  ];

  return (
    <div className="px-4 md:px-6 py-4 md:py-6">
      <div className="max-w-7xl mx-auto rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md px-4 md:px-6 py-4 md:py-5">

        {/* ── Mobile: toggle button ─────────────────────────────── */}
        <div className="flex items-center justify-between md:hidden">
          <span className="text-sm text-white/60">Filter Properties</span>
          <div className="flex items-center gap-3">
            {hasActiveFilters && (
              <button
                onClick={() => onChange(DEFAULT_FILTERS)}
                className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
              >
                <X size={12} /> Reset
              </button>
            )}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg"
              style={{ backgroundColor: 'rgba(201,168,76,0.15)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)' }}
            >
              <SlidersHorizontal size={14} />
              {mobileOpen ? 'Close' : 'Filters'}
              {hasActiveFilters && (
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#C9A84C' }} />
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile: expanded filters ──────────────────────────── */}
        {mobileOpen && (
          <div className="mt-4 grid grid-cols-2 gap-3 md:hidden">
            {selects.map(({ key, label, options }) => (
              <div key={key}>
                <label className={labelClass}>{label}</label>
                <select
                  className={selectClass}
                  value={filters[key]}
                  onChange={(e) => select(key, e.target.value)}
                >
                  {options.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <div className="col-span-2">
              <button
                onClick={() => { onChange(DEFAULT_FILTERS); setMobileOpen(false); }}
                className="w-full py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider text-slate-950 hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#C9A84C' }}
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* ── Desktop: always visible ───────────────────────────── */}
        <div className="hidden md:grid grid-cols-4 lg:grid-cols-5 gap-4 items-end">
          {selects.map(({ key, label, options }) => (
            <div key={key}>
              <label className={labelClass}>{label}</label>
              <select
                className={selectClass}
                value={filters[key]}
                onChange={(e) => select(key, e.target.value)}
              >
                {options.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
          <div>
            <button
              onClick={() => onChange(DEFAULT_FILTERS)}
              className="w-full py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider text-slate-950 hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#C9A84C' }}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
