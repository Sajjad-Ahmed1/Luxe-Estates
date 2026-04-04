import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useWishlist } from '../context/WishlistContext';
import properties from '../data/properties.json';
import VideoCard from '../components/VideoCard';

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const saved = properties.filter((p) => wishlist.includes(p.id));

  return (
    <motion.div
      className="min-h-screen bg-slate-950 text-white pt-28 pb-20 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <Helmet>
        <title>Saved Properties — Luxe Estates</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <h1 className="font-display text-4xl font-semibold mb-2">Saved Properties</h1>
        <p className="text-white/50 text-sm mb-10">
          {saved.length} {saved.length === 1 ? 'property' : 'properties'} saved
        </p>

        {saved.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <Heart size={48} className="mb-4 text-white/20" />
            <p className="text-white/50 text-base">You haven't saved any properties yet.</p>
            <p className="text-white/30 text-sm mt-1">Hover a card and click the heart to save it.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {saved.map((property) => (
              <VideoCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
