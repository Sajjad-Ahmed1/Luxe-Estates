import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, GitCompare } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCompare } from '../context/CompareContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { wishlist } = useWishlist();
  const { compareList } = useCompare();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Always opaque on non-home pages
  const forceOpaque = location.pathname !== '/';
  const isScrolled  = scrolled || forceOpaque;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-8 py-4 flex items-center justify-between"
      style={{
        backgroundColor: isScrolled ? 'rgba(15,23,42,0.90)' : 'transparent',
        backdropFilter:   isScrolled ? 'blur(14px)' : 'none',
        borderBottom:     isScrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        transition: 'background-color 300ms ease, backdrop-filter 300ms ease, border-color 300ms ease',
      }}
    >
      {/* Logo */}
      <Link to="/" className="font-display text-xl font-semibold tracking-wide" style={{ color: '#C9A84C' }}>
        Luxe Estates
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-6">
        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/"        className="text-sm text-white/70 hover:text-white transition-colors">Home</Link>
          <Link to="/#listings" className="text-sm text-white/70 hover:text-white transition-colors">Properties</Link>
          <Link to="/agents"  className="text-sm text-white/70 hover:text-white transition-colors">Our Agents</Link>
        </div>

        {/* Wishlist icon */}
        <Link to="/wishlist" className="relative text-white/60 hover:text-white transition-colors">
          <Heart size={18} />
          {wishlist.length > 0 && (
            <span
              className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-slate-950 text-[10px] font-bold flex items-center justify-center"
              style={{ backgroundColor: '#C9A84C' }}
            >
              {wishlist.length}
            </span>
          )}
        </Link>

        {/* Compare link — only visible when items selected */}
        {compareList.length > 0 && (
          <Link to="/compare" className="relative text-white/60 hover:text-white transition-colors">
            <GitCompare size={18} />
            <span
              className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-slate-950 text-[10px] font-bold flex items-center justify-center"
              style={{ backgroundColor: '#C9A84C' }}
            >
              {compareList.length}
            </span>
          </Link>
        )}

        {/* CTA */}
        <a
          href="mailto:hello@luxeestates.ae"
          className="hidden md:block text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 text-primary-gold border border-primary-gold hover:bg-primary-gold hover:text-slate-950"
        >
          Get in Touch
        </a>
      </div>
    </nav>
  );
}
