"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Star, Trash2, Calendar, ShoppingBag, Loader2, MessageSquareText, AlertCircle } from "lucide-react";
import Image from "next/image";
import { getMyReviews, deleteReview } from "@/services/review.service";
import { TReview } from "@/types/review";
import { toast, Toaster } from "sonner"; // Toaster এখানে ইম্পোর্ট করুন
import Link from "next/link";

const MyReviews = () => {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<TReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null); // ডিলিট হওয়ার সময় লোডিং দেখানোর জন্য

  const fetchReviews = async () => {
    if (!session?.user?.accessToken) return;
    try {
      const res = await getMyReviews(session.user.accessToken);
      if (res.success) {
        setReviews(res.data);
      }
    } catch (error) {
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [session?.user?.accessToken]);

  // ডিলিট কনফার্মেশন লজিক
  const confirmDelete = (id: string) => {
    toast("Delete Review?", {
      description: "Are you sure you want to remove this feedback? This action cannot be undone.",
      action: {
        label: "Delete",
        onClick: () => executeDelete(id),
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.dismiss(),
      },
    });
  };

  const executeDelete = async (id: string) => {
    setDeletingId(id);
    const promise = deleteReview(id, session?.user?.accessToken as string);

    toast.promise(promise, {
      loading: 'Deleting your review...',
      success: (res) => {
        if (res.success) {
          setReviews((prev) => prev.filter((r) => r._id !== id));
          return "Review deleted successfully!";
        } else {
          throw new Error(res.message);
        }
      },
      error: (err) => err.message || "Could not delete review",
      finally: () => setDeletingId(null),
    });
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  // ... (No reviews found সেকশন আগের মতোই থাকবে)

  return (
    <div className="space-y-6">
      {/* Sonner Toaster setup */}
      <Toaster position="top-center" richColors closeButton />

      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <MessageSquareText size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-secondary uppercase tracking-tight">My Reviews</h1>
          <p className="text-[10px] font-bold text-neutral/40 uppercase tracking-widest">
            Manage your feedback ({reviews.length})
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            className={`group p-4 bg-base-100 border border-base-300 rounded-2xl flex flex-col md:flex-row gap-5 hover:border-primary/30 transition-all shadow-sm ${deletingId === review._id ? 'opacity-50 grayscale' : ''}`}
          >
            {/* ... (প্রোডাক্ট ইমেজ এবং কন্টেন্ট সেকশন আগের মতোই থাকবে) ... */}
            
            <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-base-200 flex-shrink-0 border border-base-300">
              <Image src={review.itemId?.image || "/placeholder.png"} alt="Product" fill className="object-cover" />
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-start">
                 <h3 className="font-bold text-secondary">{review.itemId?.title}</h3>
                 <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < review.rating ? "fill-warning text-warning" : "text-base-300"} />
                  ))}
                </div>
              </div>
              <p className="text-sm text-neutral/60 italic">"{review.comment}"</p>
            </div>

            {/* Action Buttons */}
            <div className="flex md:flex-col justify-end gap-2">
              <button
                disabled={deletingId === review._id}
                onClick={() => confirmDelete(review._id)} // এখানে কনফার্মেশন কল হচ্ছে
                className="btn btn-ghost btn-square btn-sm text-error hover:bg-error/10 disabled:bg-transparent"
              >
                {deletingId === review._id ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Trash2 size={18} />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReviews;