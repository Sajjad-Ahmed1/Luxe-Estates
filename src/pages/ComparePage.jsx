import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useCompare } from '../context/CompareContext';
import properties from '../data/properties.json';

const ROWS = [
  { label: 'Price',     key: 'price' },
  { label: 'Location',  key: 'location' },
  { label: 'Bedrooms',  key: 'beds' },
  { label: 'Bathrooms', key: 'baths' },
  { label: 'Sqft',      key: 'sqft' },
];

export default function ComparePage() {
  const { compareList, toggleCompare } = useCompare();
  const compared = compareList.map((id) => properties.find((p) => p.id === id)).filter(Boolean);

  return (
    <motion.div
      className="min-h-screen bg-slate-950 text-white pt-28 pb-20 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <Helmet><title>Compare Properties — Luxe Estates</title></Helmet>

      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-4xl font-semibold">Compare</h1>
            <p className="text-white/50 text-sm mt-1">Side-by-side property comparison</p>
          </div>
          {compared.length > 0 && (
            <button
              onClick={() => compared.forEach((p) => toggleCompare(p.id))}
              className="text-sm text-white/50 hover:text-white border border-white/15 hover:border-white/30 px-4 py-2 rounded-lg transition-colors"
            >
              Clear Comparison
            </button>
          )}
        </div>

        {compared.length === 0 ? (
          <div className="text-center py-32 text-white/30">
            No properties selected for comparison. Go back and select up to 2 properties.
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 overflow-hidden">
            {/* Header row */}
            <div
              className="grid border-b border-white/10"
              style={{ gridTemplateColumns: `200px repeat(${compared.length}, 1fr)` }}
            >
              <div className="p-4 bg-slate-800/40" />
              {compared.map((p) => (
                <div key={p.id} className="p-4 bg-slate-800/40 border-l border-white/10">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-sm leading-snug">{p.title}</h3>
                    <button onClick={() => toggleCompare(p.id)} className="text-white/30 hover:text-white shrink-0">
                      <X size={14} />
                    </button>
                  </div>
                  <p className="text-xs mt-1" style={{ color: '#C9A84C' }}>{p.price}</p>
                </div>
              ))}
            </div>

            {/* Stat rows */}
            {ROWS.map(({ label, key }) => (
              <div
                key={key}
                className="grid border-b border-white/8 last:border-0"
                style={{ gridTemplateColumns: `200px repeat(${compared.length}, 1fr)` }}
              >
                <div className="px-4 py-3 text-xs uppercase tracking-wider text-white/40 bg-slate-900/30">{label}</div>
                {compared.map((p) => (
                  <div key={p.id} className="px-4 py-3 text-sm text-white/70 border-l border-white/8">
                    {key === 'sqft' ? p[key].toLocaleString() : p[key]}
                  </div>
                ))}
              </div>
            ))}

            {/* Amenities */}
            {(() => {
              const allAmenities = [...new Set(compared.flatMap((p) => p.amenities))].sort();
              return allAmenities.map((amenity) => (
                <div
                  key={amenity}
                  className="grid border-b border-white/8 last:border-0"
                  style={{ gridTemplateColumns: `200px repeat(${compared.length}, 1fr)` }}
                >
                  <div className="px-4 py-3 text-xs text-white/40 bg-slate-900/20">{amenity}</div>
                  {compared.map((p) => (
                    <div key={p.id} className="px-4 py-3 border-l border-white/8">
                      {p.amenities.includes(amenity)
                        ? <Check size={15} style={{ color: '#C9A84C' }} />
                        : <X size={15} className="text-white/20" />}
                    </div>
                  ))}
                </div>
              ));
            })()}
          </div>
        )}
      </div>
    </motion.div>
  );
}
