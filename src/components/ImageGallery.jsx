import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Images } from 'lucide-react';

export default function ImageGallery({ images }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const isOpen = lightboxIndex !== null;

  const prev = useCallback(() =>
    setLightboxIndex((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() =>
    setLightboxIndex((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape')     setLightboxIndex(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, prev, next]);

  if (!images || images.length === 0) return null;

  const main   = images[0];
  const thumbs = images.slice(1, 5); // أقصى 4 صور جانبية
  const extra  = images.length - 5;

  return (
    <>
      {/* ── Grid المعرض ─────────────────────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gridTemplateRows: '220px 220px',
          gap: '6px',
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        {/* الصورة الرئيسية الكبيرة — تمتد للصفين */}
        <div
          onClick={() => setLightboxIndex(0)}
          style={{ gridRow: '1 / 3', position: 'relative', cursor: 'pointer', overflow: 'hidden' }}
          className="group"
        >
          <img
            src={main}
            alt="Property main"
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
            className="group-hover:scale-105"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)', transition: 'background 0.3s' }}
            className="group-hover:bg-black/20"
          />
          <div
            style={{
              position: 'absolute', bottom: 10, left: 10,
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
              color: '#fff', fontSize: 12, padding: '5px 10px', borderRadius: 20,
              opacity: 0, transition: 'opacity 0.3s',
            }}
            className="group-hover:opacity-100"
          >
            <Images size={12} />
            <span>عرض الصور</span>
          </div>
        </div>

        {/* الصور الجانبية */}
        {thumbs.map((src, i) => {
          const isLast = i === thumbs.length - 1 && extra > 0;
          return (
            <div
              key={i}
              onClick={() => setLightboxIndex(i + 1)}
              style={{ position: 'relative', cursor: 'pointer', overflow: 'hidden' }}
              className="group"
            >
              <img
                src={src}
                alt={`Property ${i + 2}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                className="group-hover:scale-105"
                onError={(e) => { e.target.style.background = '#1e293b'; }}
              />
              <div
                style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)', transition: 'background 0.3s' }}
                className="group-hover:bg-black/20"
              />
              {isLast && (
                <div
                  style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    gap: 6, background: 'rgba(0,0,0,0.62)', backdropFilter: 'blur(2px)',
                    color: '#fff', fontWeight: 600,
                  }}
                >
                  <Images size={22} />
                  <span style={{ fontSize: 14 }}>+{extra} صور</span>
                </div>
              )}
            </div>
          );
        })}

        {/* Placeholder إذا الصور أقل من 3 */}
        {thumbs.length < 2 && Array.from({ length: 2 - thumbs.length }).map((_, i) => (
          <div key={`ph-${i}`} style={{ background: '#1e293b' }} />
        ))}
      </div>

      {/* ── Lightbox ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.94)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            <motion.img
              key={lightboxIndex}
              src={images[lightboxIndex]}
              alt="Property"
              style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: 12, boxShadow: '0 25px 60px rgba(0,0,0,0.8)' }}
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.93 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* عداد */}
            <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.75)', fontSize: 13, background: 'rgba(0,0,0,0.45)', padding: '4px 14px', borderRadius: 20, backdropFilter: 'blur(6px)' }}>
              {lightboxIndex + 1} / {images.length}
            </div>

            {/* إغلاق */}
            <button
              onClick={() => setLightboxIndex(null)}
              style={{ position: 'absolute', top: 16, right: 16, width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={18} />
            </button>

            {/* السابق */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <ChevronLeft size={24} />
            </button>

            {/* التالي */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
