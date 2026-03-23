import { useState } from "react";
import { StarInput } from "./StarInput";
import { Loader2, Send, Star, LogIn } from "lucide-react";
import Link from "next/link";
import { postReview } from "@/services/review.service";


export default function ReviewForm({ productId, token, isLoggedIn, onSuccess }: any) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (rating === 0) return setFormError("Please select a star rating.");
    if (comment.trim().length < 10) return setFormError("Comment must be at least 10 characters.");

    setSubmitting(true);
    try {
      const data = await postReview({ itemId: productId, rating, comment }, token);
      if (data.success) {
        setSubmitted(true);
        setRating(0);
        setComment("");
        onSuccess();
      } else {
        setFormError(data.message ?? "Failed to submit review.");
      }
    } catch {
      setFormError("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-base-200/40 border border-base-300/60 space-y-4">
      <h3 className="text-xs font-black uppercase tracking-widest text-secondary/40">Write a Review</h3>
      {!isLoggedIn ? (
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center"><LogIn size={20} className="text-primary" /></div>
          <p className="text-sm font-bold text-secondary">Login to write a review</p>
          <Link href="/login" className="text-xs font-black text-white bg-primary px-5 py-2.5 rounded-xl">Sign In</Link>
        </div>
      ) : submitted ? (
        <div className="flex flex-col items-center gap-2 py-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-success/10 flex items-center justify-center"><Star size={24} className="fill-success text-success" /></div>
          <p className="font-black text-secondary text-sm">Thanks for your review!</p>
          <button onClick={() => setSubmitted(false)} className="text-xs text-primary font-bold underline">Write another</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5"><label className="text-[10px] font-black uppercase tracking-widest text-secondary/40">Your Rating</label><StarInput value={rating} onChange={setRating} /></div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40">Your Comment</label>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Share your experience..." rows={4} className="w-full px-4 py-3 rounded-xl bg-base-100 border border-base-300/60 focus:border-primary outline-none text-sm font-medium text-secondary resize-none" />
          </div>
          {formError && <p className="text-[11px] font-bold text-error">{formError}</p>}
          <button type="submit" disabled={submitting} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-white font-black text-sm disabled:opacity-50">
            {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />} {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      )}
    </div>
  );
}