"use client";

import Image from "next/image";
import { Star, User } from "lucide-react";
import { TReview } from "@/types/review";

export const ReviewCard = ({ review }: { review: TReview }) => {
  // তারিখ ফরম্যাট করা
  const date = new Date(review.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  /**
   * টাইপ এরর ফিক্স:
   * userId স্ট্রিং (ID) হতে পারে আবার অবজেক্ট (Populated) হতে পারে।
   * তাই আমরা চেক করে নিচ্ছি এটি অবজেক্ট কি না।
   */
  const user = typeof review.userId === "object" ? review.userId : null;

  return (
    <div className="p-5 rounded-2xl bg-base-200/40 border border-base-300/60 space-y-3 transition-all hover:border-primary/20">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* ইউজার অবতার সেকশন */}
          <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 overflow-hidden flex items-center justify-center shrink-0">
            {user?.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name || "User"}
                width={40}
                height={40}
                className="object-cover"
              />
            ) : (
              <User size={18} className="text-primary/60" />
            )}
          </div>

          {/* ইউজার নাম ও তারিখ */}
          <div>
            <p className="text-sm font-black text-secondary">
              {user?.name ?? "Anonymous User"}
            </p>
            <p className="text-[10px] text-neutral/30 font-bold uppercase tracking-tighter">
              {date}
            </p>
          </div>
        </div>

        {/* স্টার রেটিং সেকশন */}
        <div className="flex items-center gap-0.5 shrink-0">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              size={12}
              className={
                s <= review.rating
                  ? "fill-warning text-warning"
                  : "fill-base-300 text-base-300"
              }
            />
          ))}
        </div>
      </div>

      {/* রিভিউ কমেন্ট */}
      <p className="text-sm text-neutral/60 font-medium leading-relaxed">
        {review.comment}
      </p>
    </div>
  );
};
