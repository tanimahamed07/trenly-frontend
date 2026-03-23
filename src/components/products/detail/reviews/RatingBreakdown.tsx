import { Star } from "lucide-react";

const RatingBar = ({ star, count, total }: { star: number; count: number; total: number }) => {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] font-black text-secondary/50 w-4 text-right">{star}</span>
      <Star size={10} className="fill-warning text-warning shrink-0" />
      <div className="flex-1 h-1.5 bg-base-300/60 rounded-full overflow-hidden">
        <div className="h-full bg-warning rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[10px] font-bold text-neutral/30 w-6">{count}</span>
    </div>
  );
};

export default function RatingBreakdown({ reviews }: { reviews: any[] }) {
  const starCounts = [5, 4, 3, 2, 1].map((s) => ({
    star: s,
    count: reviews.filter((r) => r.rating === s).length,
  }));

  return (
    <div className="p-5 rounded-2xl bg-base-200/40 border border-base-300/60 space-y-3">
      <h3 className="text-xs font-black uppercase tracking-widest text-secondary/40 mb-4">Rating Breakdown</h3>
      {starCounts.map(({ star, count }) => (
        <RatingBar key={star} star={star} count={count} total={reviews.length} />
      ))}
    </div>
  );
}