import Image from "next/image";
import { Star, User } from "lucide-react";
import { TReview } from "@/types/review";

export const ReviewCard = ({ review }: { review: TReview }) => {
  const date = new Date(review.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  return (
    <div className="p-5 rounded-2xl bg-base-200/40 border border-base-300/60 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 overflow-hidden flex items-center justify-center shrink-0">
            {review.userId?.avatar ? <Image src={review.userId.avatar} alt={review.userId.name} width={40} height={40} className="object-cover" /> : <User size={18} className="text-primary/60" />}
          </div>
          <div>
            <p className="text-sm font-black text-secondary">{review.userId?.name ?? "Anonymous"}</p>
            <p className="text-[10px] text-neutral/30 font-medium">{date}</p>
          </div>
        </div>
        <div className="flex items-center gap-0.5 shrink-0">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} size={12} className={s <= review.rating ? "fill-warning text-warning" : "fill-base-300 text-base-300"} />
          ))}
        </div>
      </div>
      <p className="text-sm text-neutral/60 font-medium leading-relaxed">{review.comment}</p>
    </div>
  );
};