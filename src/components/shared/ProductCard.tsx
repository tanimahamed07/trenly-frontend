import React from "react";
import { AddToCartButton } from "./AddToCartButton";
import { Star, Heart } from "lucide-react";
import { TProduct } from "@/types/product";
import Image from "next/image";

const ProductCard = ({ product }: { product: TProduct }) => {
  return (
    <div
      key={product._id}
      className="group relative overflow-hidden
                bg-base-200/40 border border-base-300/60
                hover:border-primary/30
                rounded-[1.5rem] md:rounded-[2rem]
                p-3 md:p-4
                transition-all duration-500
                hover:-translate-y-1
                hover:shadow-[0_8px_40px_oklch(45%_0.16_250/0.12)]"
    >
      {/* Image Container */}
      <div className="relative h-48 sm:h-52 md:h-64 w-full overflow-hidden rounded-[1rem] md:rounded-[1.5rem]">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* NEW Badge */}
        <div className="absolute top-3 left-3 text-[9px] md:text-[10px] font-black tracking-widest uppercase bg-secondary text-base-100 px-2 py-0.5 rounded-lg">
          NEW
        </div>

        {/* Sale Badge */}
        {product.compareAtPrice && product.compareAtPrice > product.price && (
          <div className="absolute top-3 left-14 text-[9px] md:text-[10px] font-black tracking-widest uppercase bg-primary text-white px-2 py-0.5 rounded-lg">
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
            {product.category}
          </span>
          <div className="flex items-center gap-0.5 bg-warning/10 px-1.5 md:px-2 py-0.5 rounded-lg">
            <Star size={10} className="fill-warning text-warning" />
            <span className="text-[10px] md:text-xs font-bold text-warning">
              {product.rating}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm md:text-lg font-black text-secondary truncate group-hover:text-primary transition-colors duration-300">
          {product.title}
        </h3>

        {/* Price + Cart */}
        <div className="flex items-center justify-between mt-3 md:mt-4">
          <div className="flex flex-col">
            <span className="text-base md:text-2xl font-black text-secondary leading-none">
              ${product.price}
            </span>
            {product.compareAtPrice && (
              <span className="text-[10px] md:text-xs font-bold line-through opacity-30 mt-0.5">
                ${product.compareAtPrice}
              </span>
            )}
          </div>

          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
