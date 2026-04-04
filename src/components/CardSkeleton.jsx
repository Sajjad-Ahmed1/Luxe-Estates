export default function CardSkeleton() {
  return (
    <div
      className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 animate-pulse"
      style={{ aspectRatio: '16/9' }}
    >
      {/* Video placeholder */}
      <div className="w-full h-3/4 bg-slate-800" />
      {/* Info placeholder */}
      <div className="p-4 space-y-2">
        <div className="h-3 bg-slate-700 rounded w-2/3" />
        <div className="h-3 bg-slate-700 rounded w-1/3" />
      </div>
    </div>
  );
}
