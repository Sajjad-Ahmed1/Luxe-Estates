import { MapPin, School, Plane, ShoppingBag } from 'lucide-react';

const NEARBY_ICONS = [School, Plane, ShoppingBag];

export default function PropertyMap({ coordinates, nearbyPlaces, title }) {
  if (!coordinates) return null;

  // بناء رابط OpenStreetMap iframe بدون أي مكتبة خارجية
  const { lat, lng } = coordinates;
  const zoom = 14;
  const bbox = [
    lng - 0.02, lat - 0.015,
    lng + 0.02, lat + 0.015,
  ].join(',');
  const mapUrl =
    `https://www.openstreetmap.org/export/embed.html` +
    `?bbox=${bbox}` +
    `&layer=mapnik` +
    `&marker=${lat},${lng}`;

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-white">Location</h2>

      {/* Nearby badges */}
      <div className="flex flex-wrap gap-3">
        {nearbyPlaces?.map(({ name, distance }, i) => {
          const Icon = NEARBY_ICONS[i] || MapPin;
          return (
            <div
              key={name}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border border-white/10 bg-white/5 text-white/70"
            >
              <Icon size={12} style={{ color: '#C9A84C' }} />
              <span>{name}</span>
              <span className="text-white/40">{distance}</span>
            </div>
          );
        })}
      </div>

      {/* Map — iframe من OpenStreetMap بدون مكتبات */}
      <div className="rounded-2xl overflow-hidden border border-white/10" style={{ height: '320px' }}>
        <iframe
          title={`Map — ${title}`}
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg) brightness(0.85)' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
