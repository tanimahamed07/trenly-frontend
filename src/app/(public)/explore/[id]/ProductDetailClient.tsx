"use client";
// src/app/(public)/explore/[id]/ProductDetailClient.tsx
// ✅ Client Component — interactivity এখানে

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Heart,
  ShoppingCart,
  ArrowLeft,
  Shield,
  Truck,
  RefreshCw,
  ChevronRight,
  Minus,
  Plus,
  Share2,
  CheckCircle2,
} from "lucide-react";
import { TProduct } from "@/types/product";

// ─── Star Rating ─────────────────────────────────────────────────
const StarRating = ({ rating }: { rating: number }) => (
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

// ─── Trust Badge ─────────────────────────────────────────────────
const TrustBadge = ({
  icon,
  title,
  sub,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
}) => (
  <div className="flex items-center gap-3 p-4 rounded-2xl bg-base-200/60 border border-base-300/60">
    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-xs font-black text-secondary">{title}</p>
      <p className="text-[10px] text-neutral/40 font-medium">{sub}</p>
    </div>
  </div>
);

// ─── Main Client Component ────────────────────────────────────────
export default function ProductDetailClient({
  product,
  discount,
}: {
  product: TProduct;
  discount: number | null;
}) {
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div
      className={`min-h-screen bg-base-100 transition-opacity duration-700 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* ── Breadcrumb ── */}
      <div className="container mx-auto px-4 pt-6 pb-2">
        <div className="flex items-center gap-2 text-[11px] font-bold text-neutral/30 uppercase tracking-widest flex-wrap">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link href="/explore" className="hover:text-primary transition-colors">
            Explore
          </Link>
          <ChevronRight size={12} />
          <Link
            href={`/explore?category=${product.category}`}
            className="hover:text-primary transition-colors capitalize"
          >
            {product.category}
          </Link>
          <ChevronRight size={12} />
          <span className="text-secondary/50 truncate max-w-[140px]">
            {product.title}
          </span>
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20 items-start">

          {/* ── LEFT: Image ── */}
          <div
            className="relative"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            }}
          >
            <div className="relative w-full aspect-square rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-base-200/40 border border-base-300/60 group">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                <span className="text-[10px] font-black tracking-widest uppercase bg-secondary text-base-100 px-3 py-1 rounded-xl shadow-lg">
                  NEW
                </span>
                {discount && (
                  <span className="text-[10px] font-black tracking-widest uppercase bg-primary text-white px-3 py-1 rounded-xl shadow-lg">
                    −{discount}%
                  </span>
                )}
              </div>

              {/* Wishlist on image */}
              <button
                onClick={() => setWishlisted((p) => !p)}
                className="absolute top-4 right-4 z-10 w-11 h-11 rounded-2xl bg-base-100/80 backdrop-blur-md border border-base-300/60 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
              >
                <Heart
                  size={18}
                  className={wishlisted ? "fill-error text-error" : "text-neutral/40"}
                />
              </button>

              {/* Share */}
              <button className="absolute bottom-4 right-4 z-10 w-11 h-11 rounded-2xl bg-base-100/80 backdrop-blur-md border border-base-300/60 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
                <Share2 size={16} className="text-neutral/40" />
              </button>
            </div>

            {/* Glow blob */}
            <div className="absolute -bottom-6 -left-6 w-48 h-48 rounded-full bg-primary/5 blur-3xl pointer-events-none -z-10" />
          </div>

          {/* ── RIGHT: Details ── */}
          <div
            className="flex flex-col gap-6"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
            }}
          >
            {/* Category chip */}
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-[0.2em] uppercase text-primary bg-primary/8 px-3 py-1.5 rounded-full border border-primary/20 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block" />
              {product.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl xl:text-5xl font-black text-secondary leading-tight tracking-tight">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4 flex-wrap">
              <StarRating rating={product.rating} />
              <span className="text-sm font-black text-secondary">
                {product.rating}
              </span>
              <span className="text-xs font-medium text-neutral/30">
                ({product.ratingCount ?? 0} reviews)
              </span>
              <span className="ml-auto text-[10px] font-black uppercase tracking-widest text-success bg-success/10 px-3 py-1 rounded-full">
                In Stock
              </span>
            </div>

            <div className="h-px bg-base-300/60" />

            {/* Price */}
            <div className="flex items-end gap-4">
              <span className="text-4xl md:text-5xl font-black text-secondary leading-none">
                ${product.price.toLocaleString()}
              </span>
              {product.compareAtPrice && (
                <div className="flex flex-col mb-1">
                  <span className="text-sm font-bold line-through text-neutral/30">
                    ${product.compareAtPrice.toLocaleString()}
                  </span>
                  {discount && (
                    <span className="text-xs font-black text-primary">
                      Save {discount}%
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-sm text-neutral/50 font-medium leading-relaxed">
                {product.description}
              </p>
            )}

            <div className="h-px bg-base-300/60" />

            {/* Qty + Cart + Wishlist */}
            <div className="flex items-center gap-4 flex-wrap">
              {/* Qty */}
              <div className="flex items-center gap-1 bg-base-200/60 border border-base-300/60 rounded-2xl p-1">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty === 1}
                  className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-base-300/60 transition-colors text-secondary font-black disabled:opacity-30"
                >
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center text-base font-black text-secondary">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-base-300/60 transition-colors text-secondary font-black"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-black text-sm transition-all duration-300 shadow-lg
                  ${
                    addedToCart
                      ? "bg-success text-white shadow-success/20"
                      : "bg-primary text-white hover:opacity-90 shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0"
                  }`}
              >
                {addedToCart ? (
                  <>
                    <CheckCircle2 size={18} /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} /> Add to Cart
                  </>
                )}
              </button>

              {/* Wishlist */}
              <button
                onClick={() => setWishlisted((p) => !p)}
                className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-300
                  ${
                    wishlisted
                      ? "bg-error/10 border-error/30 text-error"
                      : "bg-base-200/60 border-base-300/60 text-neutral/40 hover:border-error/30 hover:text-error"
                  }`}
              >
                <Heart size={20} className={wishlisted ? "fill-error" : ""} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <TrustBadge
                icon={<Truck size={18} />}
                title="Free Shipping"
                sub="Orders over $50"
              />
              <TrustBadge
                icon={<RefreshCw size={18} />}
                title="Easy Returns"
                sub="30-day policy"
              />
              <TrustBadge
                icon={<Shield size={18} />}
                title="Secure Pay"
                sub="100% protected"
              />
            </div>

            {/* Back */}
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 text-xs font-bold text-neutral/40 hover:text-primary transition-colors mt-2 w-fit"
            >
              <ArrowLeft size={14} /> Back to Explore
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}