import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Youtube } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Properties', to: '/#listings' },
  { label: 'Our Agents', to: '/agents' },
  { label: 'Contact', to: '/#contact' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Newsletter subscribe:', email);
    setSubscribed(true);
  };

  return (
    <footer className="bg-slate-950 border-t border-white/8 pt-14 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

        {/* Column 1 — Brand */}
        <div>
          <span className="font-display text-2xl font-semibold" style={{ color: '#C9A84C' }}>
            Luxe Estates
          </span>
          <p className="text-white/45 text-sm mt-3 leading-relaxed max-w-xs">
            Connecting discerning buyers with the world's most extraordinary properties through immersive video experiences.
          </p>
          <div className="flex gap-4 mt-6">
            {[Instagram, Linkedin, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full flex items-center justify-center border border-white/15 text-white/50 hover:text-white hover:border-white/40 transition-all"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2 — Quick Links */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">Quick Links</h4>
          <ul className="space-y-3">
            {NAV_LINKS.map(({ label, to }) => (
              <li key={label}>
                <Link
                  to={to}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Newsletter */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">Stay Updated</h4>
          <p className="text-white/45 text-sm mb-4">
            Receive exclusive listings and market insights before they go public.
          </p>
          {subscribed ? (
            <p className="text-sm" style={{ color: '#C9A84C' }}>You're on the list. Welcome.</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-950 hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#C9A84C' }}
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8 pt-6 text-center text-white/30 text-xs">
        © 2026 Luxe Estates. All rights reserved.
      </div>
    </footer>
  );
}
