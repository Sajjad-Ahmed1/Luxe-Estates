import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import VideoAssetMap from '../utils/assetMap';
import { useWishlist } from '../context/WishlistContext';
import { useCompare } from '../context/CompareContext';

export default function VideoCard({ property }) {
  const videoRef  = useRef(null);
  const videoSrc  = VideoAssetMap[property.id];
  const [playing, setPlaying] = useState(false);

  const { wishlist, toggleWishlist }   = useWishlist();
  const { compareList, toggleCompare } = useCompare();

  const isWished   = wishlist.includes(property.id);
  const isCompared = compareList.includes(property.id);

  const startPlay = () => {
    videoRef.current?.play();
    setPlaying(true);
  };
  const stopPlay = () => {
    videoRef.current?.pause();
    setPlaying(false);
  };

  return (
    <div className="relative group">
      <Link
        to={`/property/${property.id}`}
        className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md cursor-pointer block"
        style={{ aspectRatio: '16/9' }}
        onMouseEnter={startPlay}
        onMouseLeave={stopPlay}
        onTouchStart={startPlay}
      >
        {/* Thumbnail — always visible until video plays */}
        {!playing && (
          <img
            src={property.images?.[0] || property.thumbnail}
            alt={property.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: playing ? 1 : 0, transition: 'opacity 0.4s' }}
        />

        {/* Tags */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {property.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-semibold px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm"
              style={{ color: '#C9A84C', border: '1px solid rgba(201,168,76,0.4)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 z-10">
          <h3 className="text-white font-semibold text-base md:text-lg leading-snug mb-1">{property.title}</h3>
          <p className="text-sm md:text-base font-bold mb-1" style={{ color: '#C9A84C', textShadow: '0 1px 6px rgba(0,0,0,1)' }}>
            {property.price}
          </p>
          <p className="text-white/70 text-xs md:text-sm mb-2 md:mb-3">{property.location}</p>
          <div
            className="flex gap-3 md:gap-4 text-xs font-medium pt-2 md:pt-3"
            style={{ borderTop: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.55)' }}
          >
            <span>{property.beds} Beds</span>
            <span>{property.baths} Baths</span>
            <span>{property.sqft.toLocaleString()} sqft</span>
          </div>
        </div>
      </Link>

      {/* Heart — outside Link */}
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(property.id); }}
        className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-sm transition-transform active:scale-90 hover:scale-110"
        aria-label="Save property"
      >
        <Heart
          size={15}
          fill={isWished ? '#C9A84C' : 'transparent'}
          stroke={isWished ? '#C9A84C' : 'rgba(255,255,255,0.7)'}
        />
      </button>

      {/* Compare checkbox */}
      <label className="flex items-center gap-2 mt-2 px-1 cursor-pointer w-fit select-none">
        <input
          type="checkbox"
          checked={isCompared}
          onChange={() => toggleCompare(property.id)}
          className="accent-yellow-500 w-3.5 h-3.5"
        />
        <span className="text-xs text-white/50">Compare</span>
      </label>
    </div>
  );
}
