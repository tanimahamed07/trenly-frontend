import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { TProduct } from "@/types/product";
import { getTopRatedProducts } from "@/services/product.services";
import ProductCard from "../shared/ProductCard";

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
            {/* Eyebrow - Changed to indicate high ratings */}
            <span className="inline-flex items-center gap-2 text-[10px] md:text-xs font-black tracking-[0.2em] uppercase text-primary bg-primary/8 px-3 py-1 rounded-full border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block" />
              Customer Favorites
            </span>

            {/* Heading - Changed "Trending Now" to "Top Rated" */}
            <h2 className="text-2xl md:text-4xl font-black text-secondary tracking-tight leading-tight">
              Top{" "}
              <span className="text-primary italic relative">
                Rated
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

            {/* Description - Changed to emphasize quality/reviews */}
            <p className="text-neutral/40 font-medium text-xs md:text-sm">
              Highest rated picks loved by our customers
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
          {products?.map((item: TProduct) => (
            <ProductCard key={item._id} product={item} />
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