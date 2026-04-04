import { useState, useEffect, Component } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  ArrowLeft, MapPin, BedDouble, Bath, Maximize2,
  Wifi, Waves, Dumbbell, Wine, Tv2, Bell, Building2, Sparkles, User,
  Phone, CheckCircle, Download, Loader2, AlertTriangle,
} from 'lucide-react';
import properties from '../data/properties.json';
import VideoAssetMap from '../utils/assetMap';
import ImageGallery from '../components/ImageGallery';
import PropertyMap from '../components/PropertyMap';
import MortgageCalculator from '../components/MortgageCalculator';
import VideoCard from '../components/VideoCard';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';

// ── Error Boundary ──────────────────────────────────────────────────────────
class ErrorBoundary extends Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4 text-white/50 px-6 text-center">
          <AlertTriangle size={40} style={{ color: '#C9A84C' }} />
          <p className="text-white text-lg font-semibold">Something went wrong loading this property.</p>
          <p className="text-sm text-white/40">{this.state.error?.message}</p>
          <button
            onClick={() => window.location.href = '/'}
            className="mt-2 text-sm underline"
            style={{ color: '#C9A84C' }}
          >
            Back to listings
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const AMENITY_ICONS = {
  'Smart Home Automation': Wifi,
  'Infinity Pool': Waves,
  'Rooftop Plunge Pool': Waves,
  'Private Gym': Dumbbell,
  'Wine Cellar': Wine,
  'Home Cinema': Tv2,
  'Concierge Service': Bell,
  'Butler Service': User,
  'Rooftop Terrace': Building2,
  'Spa & Sauna': Sparkles,
};

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Name is required.';
  if (!form.email.trim()) errors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email.';
  if (!form.date) errors.date = 'Please choose a date.';
  return errors;
}

function PropertyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addRecentlyViewed, recentlyViewed } = useRecentlyViewed();
  const property = properties.find((p) => p.id === id);

  const [form, setForm]         = useState({ name: '', email: '', date: '', message: '' });
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { if (property) addRecentlyViewed(property.id); }, [id]);

  if (!property) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4 text-white/50">
        <p>Property not found.</p>
        <button onClick={() => navigate('/')} className="text-sm underline" style={{ color: '#C9A84C' }}>
          Back to listings
        </button>
      </div>
    );
  }

  const videoSrc = VideoAssetMap[property.id];
  const similar  = properties.filter((p) => p.type === property.type && p.id !== property.id);
  const recent   = recentlyViewed.filter((rid) => rid !== property.id)
                    .map((rid) => properties.find((p) => p.id === rid)).filter(Boolean);

  // ── PDF Brochure — dynamic import لتفادي أي خطأ عند التحميل ───────
  const handleDownload = async () => {
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      doc.setFontSize(20);
      doc.text(property.title, 20, 25);
      doc.setFontSize(13);
      doc.text(`Price: ${property.price}`, 20, 38);
      doc.text(`Location: ${property.location}`, 20, 47);
      doc.text(`Beds: ${property.beds}   Baths: ${property.baths}   Sqft: ${property.sqft.toLocaleString()}`, 20, 56);
      doc.setFontSize(11);
      doc.text('Overview:', 20, 70);
      const split = doc.splitTextToSize(property.fullDescription, 170);
      doc.text(split, 20, 79);
      const amenityY = 79 + split.length * 6 + 8;
      doc.text('Amenities:', 20, amenityY);
      property.amenities.forEach((a, i) => doc.text(`• ${a}`, 24, amenityY + 9 + i * 7));
      const agentY = amenityY + 9 + property.amenities.length * 7 + 8;
      doc.text(`Agent: ${property.agentInfo.name}   Phone: ${property.agentInfo.phone}`, 20, agentY);
      doc.save(`${property.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-brochure.pdf`);
    } catch (err) {
      console.error('PDF generation failed:', err);
    }
  };

  // ── Booking form ────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      console.log('Viewing request:', { property: property.title, ...form });
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <motion.div
      className="min-h-screen bg-slate-950 text-white"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <Helmet>
        <title>{property.title} — Luxe Estates</title>
        <meta name="description" content={property.fullDescription.split('.')[0] + '.'} />
        <meta property="og:title" content={`${property.title} — Luxe Estates`} />
        <meta property="og:description" content={property.fullDescription.split('.')[0] + '.'} />
        <meta property="og:image" content={property.images[0]} />
      </Helmet>

      {/* ── Video header ──────────────────────────────────────────── */}
      <div className="relative w-full bg-slate-900" style={{ height: '70vh' }}>
        {/* poster يعرض الصورة الأولى أثناء تحميل الفيديو لمنع الشاشة السوداء */}
        <video
          src={videoSrc}
          poster={property.images[0]}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-black/20 to-transparent" />

        {/* Back + Download */}
        <div className="absolute top-24 left-6 right-6 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Back to Listings
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-white/20 hover:border-white/40 text-white/70 hover:text-white transition-all"
            style={{ borderColor: 'rgba(201,168,76,0.4)', color: '#C9A84C' }}
          >
            <Download size={14} />
            Download Brochure
          </button>
        </div>

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-10 max-w-5xl">
          <div className="flex flex-wrap gap-2 mb-3">
            {property.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm"
                style={{ color: '#C9A84C', border: '1px solid rgba(201,168,76,0.35)' }}
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight">{property.title}</h1>
          <div className="flex items-center gap-2 mt-3 text-white/60 text-sm">
            <MapPin size={14} />
            {property.location}
          </div>
        </div>
      </div>

      {/* ── Image Gallery ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <ImageGallery images={property.images} />
      </div>

      {/* ── Body ──────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-14">

        {/* LEFT */}
        <div className="space-y-10">
          {/* Price + stats */}
          <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-white/10">
            <span className="font-display text-3xl font-semibold" style={{ color: '#C9A84C' }}>
              {property.price}
            </span>
            <div className="flex gap-6 text-white/60 text-sm">
              <span className="flex items-center gap-1.5"><BedDouble size={15} style={{ color: '#C9A84C' }} />{property.beds} Beds</span>
              <span className="flex items-center gap-1.5"><Bath size={15} style={{ color: '#C9A84C' }} />{property.baths} Baths</span>
              <span className="flex items-center gap-1.5"><Maximize2 size={15} style={{ color: '#C9A84C' }} />{property.sqft.toLocaleString()} sqft</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="font-display text-xl font-semibold mb-4">Overview</h2>
            <p className="text-white/65 leading-relaxed">{property.fullDescription}</p>
          </div>

          {/* Amenities */}
          <div>
            <h2 className="font-display text-xl font-semibold mb-5">Amenities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {property.amenities.map((amenity) => {
                const Icon = AMENITY_ICONS[amenity] || Bell;
                return (
                  <div key={amenity} className="flex items-center gap-3">
                    <Icon size={16} style={{ color: '#C9A84C' }} className="shrink-0" />
                    <span className="text-white/70 text-sm">{amenity}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Map */}
          <PropertyMap
            coordinates={property.coordinates}
            nearbyPlaces={property.nearbyPlaces}
            title={property.title}
          />
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* Agent */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
            <p className="text-xs uppercase tracking-widest text-white/40 mb-4">Your Advisor</p>
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shrink-0"
                style={{ backgroundColor: 'rgba(201,168,76,0.15)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)' }}
              >
                {property.agentInfo.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-white">{property.agentInfo.name}</p>
                <a
                  href={`tel:${property.agentInfo.phone}`}
                  className="flex items-center gap-1.5 text-sm mt-1 hover:text-white transition-colors"
                  style={{ color: '#C9A84C' }}
                >
                  <Phone size={13} />
                  {property.agentInfo.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Booking form */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
            <h3 className="font-display text-lg font-semibold mb-5">Book a Viewing</h3>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 text-center space-y-3"
                >
                  <CheckCircle size={36} className="mx-auto" style={{ color: '#C9A84C' }} />
                  <h4 className="font-semibold text-white text-lg">Viewing Request Confirmed!</h4>
                  <p className="text-white/55 text-sm">
                    Our agent <strong className="text-white">{property.agentInfo.name}</strong> will contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', date: '', message: '' }); }}
                    className="mt-2 text-sm underline"
                    style={{ color: '#C9A84C' }}
                  >
                    Back to Property
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {[
                    { key: 'name',  label: 'Full Name',      type: 'text',  placeholder: 'Your name' },
                    { key: 'email', label: 'Email',           type: 'email', placeholder: 'you@email.com' },
                    { key: 'date',  label: 'Preferred Date',  type: 'date',  placeholder: '' },
                  ].map(({ key, label, type, placeholder }) => (
                    <div key={key}>
                      <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">{label}</label>
                      <input
                        type={type}
                        placeholder={placeholder}
                        value={form[key]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        className="w-full bg-white/5 border rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none transition-colors"
                        style={{ borderColor: errors[key] ? '#f87171' : 'rgba(255,255,255,0.1)' }}
                      />
                      {errors[key] && <p className="text-red-400 text-xs mt-1">{errors[key]}</p>}
                    </div>
                  ))}

                  <div>
                    <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Message</label>
                    <textarea
                      rows={3}
                      placeholder="Any specific requests..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-slate-950 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-70"
                    style={{ backgroundColor: '#C9A84C' }}
                  >
                    {loading ? <><Loader2 size={16} className="animate-spin" /> Submitting…</> : 'Request a Viewing'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Mortgage Calculator */}
          <MortgageCalculator price={property.price} />
        </div>
      </div>

      {/* ── Similar & Recently Viewed ─────────────────────────────── */}
      {(similar.length > 0 || recent.length > 0) && (
        <div className="max-w-7xl mx-auto px-6 pb-16 space-y-12">
          {similar.length > 0 && (
            <div>
              <h2 className="font-display text-2xl font-semibold mb-6">Similar Properties</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {similar.map((p) => <VideoCard key={p.id} property={p} />)}
              </div>
            </div>
          )}
          {recent.length > 0 && (
            <div>
              <h2 className="font-display text-2xl font-semibold mb-6">Recently Viewed</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recent.map((p) => <VideoCard key={p.id} property={p} />)}
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}

// ── تغليف الصفحة بالـ Error Boundary ──────────────────────────────────────
export default function PropertyDetailPageWithBoundary() {
  return (
    <ErrorBoundary>
      <PropertyDetailPage />
    </ErrorBoundary>
  );
}
