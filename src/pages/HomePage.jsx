import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/HeroSection';
import SearchBar from '../components/SearchBar';
import VideoCard from '../components/VideoCard';
import CardSkeleton from '../components/CardSkeleton';
import WhyUs from '../components/WhyUs';
import Testimonials from '../components/Testimonials';
import properties from '../data/properties.json';

const DEFAULT_FILTERS = { city: 'All Cities', price: 'Any Price', beds: 'Any Beds', type: 'Any Type' };

function matchPrice(property, filter) {
  // السعر مثل "$850,000" -> 850000
  const p = parseFloat(property.price.replace(/[^0-9.]/g, ''));
  if (filter === 'Under $700K') return p < 700000;
  if (filter === '$700K–1M')   return p >= 700000 && p <= 1000000;
  if (filter === '$1M+')        return p > 1000000;
  return true;
}

function matchBeds(property, filter) {
  const min = parseInt(filter);
  return isNaN(min) || property.beds >= min;
}

const cardVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.45, ease: 'easeOut' } }),
};

export default function HomePage() {
  const [filters, setFilters]   = useState(DEFAULT_FILTERS);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  const filtered = properties.filter((p) => {
    if (filters.city !== 'All Cities' && p.city !== filters.city) return false;
    if (!matchPrice(p, filters.price)) return false;
    if (!matchBeds(p, filters.beds)) return false;
    if (filters.type !== 'Any Type' && p.type !== filters.type) return false;
    return true;
  });

  return (
    <motion.div
      className="bg-slate-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <Helmet>
        <title>Luxe Estates — Luxury Real Estate</title>
        <meta name="description" content="Discover the world's most exclusive properties through immersive video walkthroughs." />
        <meta property="og:title" content="Luxe Estates — Luxury Real Estate" />
        <meta property="og:description" content="Video-first luxury real estate platform." />
        <meta property="og:image" content="/og-cover.jpg" />
      </Helmet>

      <HeroSection />

      <main id="listings">
        <SearchBar filters={filters} onChange={setFilters} />

        <div className="max-w-7xl mx-auto px-6 pt-6 pb-2">
          <h2 className="font-display text-3xl font-semibold text-white">Featured Properties</h2>
          <p className="text-white/50 text-sm mt-1">Hover a card to preview the property video</p>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[0, 1, 2].map((i) => <CardSkeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 text-white/40">
              <p className="text-lg">No properties match your criteria.</p>
              <button
                onClick={() => setFilters(DEFAULT_FILTERS)}
                className="mt-4 text-sm underline"
                style={{ color: '#C9A84C' }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <motion.div
              key={JSON.stringify(filters)}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {filtered.map((property, i) => (
                  <motion.div key={property.id} custom={i} variants={cardVariants}>
                    <VideoCard property={property} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>

      <WhyUs />
      <Testimonials />
    </motion.div>
  );
}
