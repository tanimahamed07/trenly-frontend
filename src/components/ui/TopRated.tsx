import React from "react";
import { Star, Heart, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { TProduct } from "@/types/product";
import { getTopRatedProducts } from "@/services/product.services";
import { AddToCartButton } from "../shared/AddToCartButton";

const TopRated = async () => {
  const products = await getTopRatedProducts();

  return (
    <section className="py-16 md:py-24 bg-base-100 relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* Header */}
        <div className="flex justify-between items-end mb-8 md:mb-14">
          <div className="space-y-2 md:space-y-3">
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 text-[10px] md:text-xs font-black tracking-[0.2em] uppercase text-primary bg-primary/8 px-3 py-1 rounded-full border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block" />
              Hot Right Now
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-secondary tracking-tight leading-tight">
              Trending{" "}
              <span className="text-primary italic relative">
                Now
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 100 6"
                  preserveAspectRatio="none"
                  height="6"
                >
                  <path
                    d="M0 5 Q50 0 100 5"
                    stroke="oklch(45% 0.16 250)"
                    strokeWidth="2"
                    fill="none"
                    strokeOpacity="0.4"
                  />
                </svg>
              </span>
            </h2>
            <p className="text-neutral/40 font-medium text-xs md:text-sm">
              Most loved products by our community
            </p>
          </div>

          <Link
            href="/explore"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-primary border border-primary/20 bg-primary/5 hover:bg-primary/10 px-4 py-2 rounded-2xl transition-all duration-300 group"
          >
            View All
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 md:gap-6">
          {products.map((item: TProduct) => (
            <div
              key={item._id}
              className="group relative overflow-hidden
                bg-base-200/40 border border-base-300/60
                hover:border-primary/30
                group-hover:shadow-[0_8px_40px_oklch(45%_0.16_250/0.12)]
                rounded-[1.5rem] md:rounded-[2rem]
                p-3 md:p-4
                transition-all duration-500
                hover:-translate-y-1
                hover:shadow-[0_8px_40px_oklch(45%_0.16_250/0.12)]"
            >
              {/* Image Container */}
              <div className="relative h-40 sm:h-52 md:h-64 w-full overflow-hidden rounded-[1rem] md:rounded-[1.5rem]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Sale Badge */}
                {item.compareAtPrice && item.compareAtPrice > item.price && (
                  <div className="absolute top-3 left-3 text-[9px] md:text-[10px] font-black tracking-widest uppercase bg-primary text-white px-2 py-0.5 rounded-lg">
                    SALE
                  </div>
                )}

                {/* Wishlist */}
                <div className="absolute top-3 right-3 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                  <button className="btn btn-circle btn-xs md:btn-sm bg-base-100/90 backdrop-blur-sm border-none shadow-lg text-error hover:bg-error hover:text-white">
                    <Heart size={13} className="md:hidden" />
                    <Heart size={15} className="hidden md:block" />
                  </button>
                </div>

                {/* Bottom shimmer line */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
                  style={{ background: "oklch(45% 0.16 250)", opacity: 0.6 }}
                />
              </div>

              {/* Details */}
              <div className="mt-3 md:mt-5 px-1 md:px-2 pb-1 md:pb-2">
                {/* Category + Rating */}
                <div className="flex justify-between items-center mb-1.5 md:mb-2">
                  <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.15em] text-primary/60">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-0.5 bg-warning/10 px-1.5 md:px-2 py-0.5 rounded-lg">
                    <Star size={10} className="fill-warning text-warning" />
                    <span className="text-[10px] md:text-xs font-bold text-warning">
                      {item.rating}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-sm md:text-lg font-black text-secondary truncate group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Price + Cart */}
                <div className="flex items-center justify-between mt-3 md:mt-4">
                  <div className="flex flex-col">
                    <span className="text-base md:text-2xl font-black text-secondary leading-none">
                      ${item.price}
                    </span>
                    {item.compareAtPrice && (
                      <span className="text-[10px] md:text-xs font-bold line-through opacity-30 mt-0.5">
                        ${item.compareAtPrice}
                      </span>
                    )}
                  </div>

                  <AddToCartButton product={item} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-6 flex justify-center sm:hidden">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary border border-primary/20 bg-primary/5 px-6 py-2.5 rounded-2xl"
          >
            View All Products
            <ArrowRight size={15} />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default TopRated;