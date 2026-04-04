const CITIES = ['All Cities', 'Dubai', 'Abu Dhabi', 'Riyadh'];
const PRICES = ['Any Price', 'Under $700K', '$700K–$1M', '$1M+'];
const BEDS   = ['Any Beds', '1+', '2+', '3+', '4+', '5+'];
const TYPES  = ['Any Type', 'Villa', 'Penthouse', 'Estate'];

export default function SearchBar({ filters, onChange }) {
  const select = (key, val) => onChange({ ...filters, [key]: val });

  const labelClass = 'block text-xs text-white/40 uppercase tracking-wider mb-1';
  const selectClass =
    'w-full bg-slate-800/60 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 transition-colors appearance-none cursor-pointer';

  return (
    <div className="px-6 py-6">
      <div className="max-w-7xl mx-auto rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md px-6 py-5">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 items-end">

          {/* City */}
          <div>
            <label className={labelClass}>City</label>
            <select className={selectClass} value={filters.city} onChange={(e) => select('city', e.target.value)}>
              {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className={labelClass}>Price Range</label>
            <select className={selectClass} value={filters.price} onChange={(e) => select('price', e.target.value)}>
              {PRICES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          {/* Beds */}
          <div>
            <label className={labelClass}>Bedrooms</label>
            <select className={selectClass} value={filters.beds} onChange={(e) => select('beds', e.target.value)}>
              {BEDS.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>

          {/* Type */}
          <div>
            <label className={labelClass}>Type</label>
            <select className={selectClass} value={filters.type} onChange={(e) => select('type', e.target.value)}>
              {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* Reset */}
          <div>
            <button
              onClick={() => onChange({ city: 'All Cities', price: 'Any Price', beds: 'Any Beds', type: 'Any Type' })}
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
