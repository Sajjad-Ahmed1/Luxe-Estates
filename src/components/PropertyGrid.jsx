import { motion } from 'framer-motion';
import properties from '../data/properties.json';
import VideoCard from './VideoCard';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
};

export default function PropertyGrid() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {properties.map((property) => (
        <motion.div key={property.id} variants={cardVariants}>
          <VideoCard property={property} />
        </motion.div>
      ))}
    </motion.div>
  );
}
