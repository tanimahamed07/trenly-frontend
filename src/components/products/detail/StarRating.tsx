import { Star } from "lucide-react";

export const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        size={14}
        className={
          s <= Math.round(rating)
            ? "fill-warning text-warning"
            : "fill-base-300 text-base-300"
        }
      />
    ))}
  </div>
);
