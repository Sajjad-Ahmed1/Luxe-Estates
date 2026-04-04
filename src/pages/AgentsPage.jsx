import { motion } from 'framer-motion';
import { Star, Phone } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import agents from '../data/agents.json';

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.45, ease: 'easeOut' } }),
};

export default function AgentsPage() {
  return (
    <motion.div
      className="min-h-screen bg-slate-950 text-white pt-28 pb-20 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <Helmet>
        <title>Our Agents — Luxe Estates</title>
        <meta name="description" content="Meet our RERA-certified luxury property advisors." />
      </Helmet>

      <div className="max-w-5xl mx-auto">
        <h1 className="font-display text-4xl font-semibold mb-2">Our Agents</h1>
        <p className="text-white/50 text-sm mb-12">RERA-certified advisors with decades of luxury market experience.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-7 flex flex-col items-center text-center"
            >
              {/* Avatar */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mb-4"
                style={{ backgroundColor: 'rgba(201,168,76,0.15)', color: '#C9A84C', border: '2px solid rgba(201,168,76,0.35)' }}
              >
                {agent.avatar}
              </div>

              <h3 className="font-semibold text-white text-lg">{agent.name}</h3>
              <p className="text-white/50 text-sm mt-1 mb-3">{agent.specialization}</p>

              {/* Experience badge */}
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full mb-4"
                style={{ backgroundColor: 'rgba(201,168,76,0.12)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)' }}
              >
                {agent.experience}+ Years Experience
              </span>

              {/* Rating */}
              <div className="flex items-center gap-1.5 mb-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={13} fill={j < Math.round(agent.rating) ? '#C9A84C' : 'transparent'} stroke="#C9A84C" />
                ))}
                <span className="text-white/60 text-xs ml-1">{agent.rating}</span>
              </div>
              <p className="text-white/35 text-xs mb-5">{agent.reviewCount} reviews</p>

              {/* Phone */}
              <a
                href={`tel:${agent.phone}`}
                className="flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity"
                style={{ color: '#C9A84C' }}
              >
                <Phone size={14} />
                {agent.phone}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
