"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  ArrowLeft,
  Minus,
  Plus,
  Share2,
  CheckCircle2,
} from "lucide-react";
import { TProduct } from "@/types/product";
import { StarRating } from "./StarRating";
import { TrustBadges } from "./TrustBadges";
import { ProductBreadcrumb } from "./ProductBreadcrumb";
import { useCart } from "@/context/CartContext"; // ✅ Context import kora holo

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

  const { addToCart } = useCart(); // ✅ addToCart function-ti niye asa holo

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  // ✅ Cart handle korar logic update kora holo
  const handleAddToCart = () => {
    addToCart(product, qty); // Context call kore qty soho add kora
    setAddedToCart(true);
    
    // 2 second por "Added!" state reset hobe
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div
      className={`min-h-screen bg-base-100 transition-opacity duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <ProductBreadcrumb category={product.category} title={product.title} />

      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20 items-start">
          {/* ── LEFT: Image Section ── */}
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

              <button
                onClick={() => setWishlisted(!wishlisted)}
                className="absolute top-4 right-4 z-10 w-11 h-11 rounded-2xl bg-base-100/80 backdrop-blur-md border border-base-300/60 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              >
                <Heart
                  size={18}
                  className={
                    wishlisted ? "fill-error text-error" : "text-neutral/40"
                  }
                />
              </button>

              <button className="absolute bottom-4 right-4 z-10 w-11 h-11 rounded-2xl bg-base-100/80 backdrop-blur-md border border-base-300/60 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <Share2 size={16} className="text-neutral/40" />
              </button>
            </div>
            <div className="absolute -bottom-6 -left-6 w-48 h-48 rounded-full bg-primary/5 blur-3xl pointer-events-none -z-10" />
          </div>

          {/* ── RIGHT: Details Section ── */}
          <div
            className="flex flex-col gap-6"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
            }}
          >
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-[0.2em] uppercase text-primary bg-primary/8 px-3 py-1.5 rounded-full border border-primary/20 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block" />
              {product.category}
            </span>

            <h1 className="text-3xl md:text-5xl font-black text-secondary leading-tight tracking-tight">
              {product.title}
            </h1>

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

            {product.description && (
              <p className="text-sm text-neutral/50 font-medium leading-relaxed">
                {product.description}
              </p>
            )}

            <div className="h-px bg-base-300/60" />

            {/* Qty + Cart Actions */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1 bg-base-200/60 border border-base-300/60 rounded-2xl p-1">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty === 1}
                  className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-base-200 transition-colors disabled:opacity-30"
                >
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center text-base font-black text-secondary">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-base-200 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-black text-sm transition-all duration-300 shadow-lg ${addedToCart ? "bg-success text-white" : "bg-primary text-white hover:bg-primary/90 shadow-primary/20"}`}
              >
                {addedToCart ? (
                  <>
                    <CheckCircle2 size={18} /> Added!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} /> Add to Cart
                  </>
                )}
              </button>

              <button
                onClick={() => setWishlisted(!wishlisted)}
                className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all ${wishlisted ? "bg-error/10 border-error/30 text-error" : "bg-base-200/60 border-base-300/60 text-neutral/40"}`}
              >
                <Heart size={20} className={wishlisted ? "fill-error" : ""} />
              </button>
            </div>

            <TrustBadges />

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