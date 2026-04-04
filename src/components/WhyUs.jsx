import { Video, BadgeCheck, Scale } from 'lucide-react';

const CARDS = [
  {
    Icon: Video,
    title: 'Drone Cinematography',
    desc: 'Every listing features a professional aerial walkthrough, giving you a complete perspective before your first visit.',
  },
  {
    Icon: BadgeCheck,
    title: 'Certified Agents',
    desc: 'Our advisors are RERA-certified with 10+ years of luxury market experience across the UAE and Saudi Arabia.',
  },
  {
    Icon: Scale,
    title: 'Legal Consultation',
    desc: 'Free legal advisory on every transaction — complete transparency, zero hidden fees, from offer to handover.',
  },
];

export default function WhyUs() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-3xl font-semibold text-white text-center mb-2">
          Why Luxe Estates
        </h2>
        <p className="text-white/40 text-sm text-center mb-10">
          The standard for luxury real estate in the Gulf
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CARDS.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 p-8 text-center"
              style={{ backgroundColor: 'rgba(30,41,59,0.40)' }}
            >
              <div
                className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-5"
                style={{ backgroundColor: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)' }}
              >
                <Icon size={26} style={{ color: '#C9A84C' }} />
              </div>
              <h3 className="font-semibold text-white text-lg mb-2">{title}</h3>
              <p className="text-white/55 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
