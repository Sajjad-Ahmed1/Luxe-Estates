import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Star } from 'lucide-react';
import testimonials from '../data/testimonials.json';

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[index];

  return (
    <section className="px-6 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-display text-3xl font-semibold text-white mb-2">
          What Our Clients Say
        </h2>
        <p className="text-white/40 text-sm mb-12">Trusted by buyers across the Gulf and beyond</p>

        <div className="relative" style={{ minHeight: '240px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md px-8 py-10 text-left"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="#C9A84C" stroke="none" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/80 text-base leading-relaxed mb-6 italic">
                "{t.text}"
              </p>

              {/* Client */}
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ backgroundColor: 'rgba(201,168,76,0.15)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)' }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-white/40 text-xs">{t.location} · {t.property}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{ backgroundColor: i === index ? '#C9A84C' : 'rgba(255,255,255,0.2)' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
