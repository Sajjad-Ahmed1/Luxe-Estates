import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import VideoAssetMap from '../utils/assetMap';

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: 'easeOut', delay },
  },
});

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background video */}
      <video
        src={VideoAssetMap['property-001']}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Subtle vignette — pulls focus to center */}
      <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-transparent via-transparent to-black/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.p
          className="text-xs font-semibold uppercase tracking-[0.25em] mb-5"
          style={{ color: '#C9A84C' }}
          variants={fadeUp(0.1)}
          initial="hidden"
          animate="visible"
        >
          Premier Luxury Real Estate
        </motion.p>

        <motion.h1
          className="font-display text-5xl md:text-7xl font-semibold text-white leading-tight max-w-4xl"
          variants={fadeUp(0.3)}
          initial="hidden"
          animate="visible"
        >
          Experience Luxury
          <br />
          <span style={{ color: '#C9A84C' }}>Without Boundaries</span>
        </motion.h1>

        <motion.p
          className="mt-6 text-white/65 text-lg md:text-xl max-w-xl leading-relaxed"
          variants={fadeUp(0.5)}
          initial="hidden"
          animate="visible"
        >
          Discover the world's most exclusive properties through immersive video walkthroughs.
        </motion.p>

        <motion.button
          className="mt-10 px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-widest text-slate-950 transition-transform duration-200 hover:scale-105 active:scale-95"
          style={{ backgroundColor: '#C9A84C' }}
          variants={fadeUp(0.7)}
          initial="hidden"
          animate="visible"
          onClick={() => {
            document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Discover Properties
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="text-white/40 text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
