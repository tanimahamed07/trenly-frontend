"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { Star, MessageSquare } from "lucide-react";
import { TReview } from "@/types/review";
import { getReviewsByProduct } from "@/services/review.service";
import RatingBreakdown from "@/components/products/detail/reviews/RatingBreakdown";
import ReviewForm from "@/components/products/detail/reviews/ReviewForm";
import { ReviewCard } from "@/components/products/detail/reviews/ReviewCard";

export default function ReviewSection({
  productId,
  productRating,
  ratingCount,
}: any) {
  const { data: session, status } = useSession();
  const [reviews, setReviews] = useState<TReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchReviews = useCallback(
    async (p = 1) => {
      setLoading(true);
      try {
        const data = await getReviewsByProduct(productId, p, 3);
        if (data.success) {
          setReviews(data.data);
          setTotalPages(Math.ceil((data.meta?.total ?? 0) / 3));
          setPage(p);
        }
      } catch {
        console.error("Error loading reviews");
      } finally {
        setLoading(false);
      }
    },
    [productId],
  );

  useEffect(() => {
    fetchReviews(1);
  }, [fetchReviews]);

  return (
    <section className="container mx-auto px-4 pb-20">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase text-primary bg-primary/8 px-3 py-1 rounded-full border border-primary/20">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block" />{" "}
            Customer Feedback
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-secondary tracking-tight">
            Reviews & <span className="text-primary italic">Ratings</span>
          </h2>
        </div>
        <div className="flex items-center gap-2 bg-warning/10 px-4 py-2 rounded-2xl border border-warning/20">
          <Star size={18} className="fill-warning text-warning" />
          <span className="text-xl font-black text-secondary">
            {productRating}
          </span>
          <span className="text-xs text-neutral/40 font-medium">
            / 5 · {ratingCount} reviews
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <RatingBreakdown reviews={reviews} />
          <ReviewForm
            productId={productId}
            token={(session?.user as any)?.accessToken}
            isLoggedIn={status === "authenticated"}
            onSuccess={() => fetchReviews(1)}
          />
        </div>

        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-28 rounded-2xl bg-base-200/50 animate-pulse"
              />
            ))
          ) : reviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 bg-base-200/20 rounded-2xl border-2 border-dashed border-base-300">
              <MessageSquare size={36} className="text-base-300" />
              <p className="font-black text-secondary text-sm">
                No reviews yet
              </p>
            </div>
          ) : (
            <>
              {reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 pt-4">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (p) => (
                      <button
                        key={p}
                        onClick={() => fetchReviews(p)}
                        className={`w-9 h-9 rounded-xl font-black text-sm ${page === p ? "bg-primary text-white" : "bg-base-200"}`}
                      >
                        {p}
                      </button>
                    ),
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
