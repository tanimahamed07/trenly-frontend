"use client";

import React from "react";
import { AddToCartButton } from "./AddToCartButton";
import { Star, Heart } from "lucide-react";
import { TProduct } from "@/types/product";
import Image from "next/image";
import Link from "next/link"; // ১. লিঙ্ক ইমপোর্ট করুন

const ProductCard = ({ product }: { product: TProduct }) => {
  return (
    <div
      className="group relative overflow-hidden
                bg-base-200/40 border border-base-300/60
                hover:border-primary/30
                rounded-[1.5rem] md:rounded-[2rem]
                p-3 md:p-4
                transition-all duration-500
                hover:-translate-y-2
                hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
    >
      {/* ২. ইমেজ কন্টেইনারকে লিঙ্কে মুড়িয়ে দিন */}
      <Link
        href={`/explore/${product._id}`}
        className="block relative h-48 sm:h-52 md:h-64 w-full overflow-hidden rounded-[1rem] md:rounded-[1.5rem] cursor-pointer"
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className="text-[9px] md:text-[10px] font-black tracking-widest uppercase bg-secondary text-base-100 px-2 py-0.5 rounded-lg shadow-lg">
            NEW
          </span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-[9px] md:text-[10px] font-black tracking-widest uppercase bg-primary text-white px-2 py-0.5 rounded-lg shadow-lg">
              SALE
            </span>
          )}
        </div>
      </Link>

      {/* Wishlist Button - এটাকে লিঙ্কের বাইরে রাখতে হবে নাহলে ক্লিক করলে পেজ চেঞ্জ হয়ে যাবে */}
      <div className="absolute top-6 right-6 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-10">
        <button className="btn btn-circle btn-xs md:btn-sm bg-base-100 shadow-xl text-error border-none hover:bg-error hover:text-white">
          <Heart size={15} fill="currentColor" fillOpacity={0.1} />
        </button>
      </div>

      {/* Details */}
      <div className="mt-4 px-1 md:px-2">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] text-primary/60">
            {product.category}
          </span>
          <div className="flex items-center gap-1 bg-warning/10 px-2 py-0.5 rounded-lg">
            <Star size={12} className="fill-warning text-warning" />
            <span className="text-xs font-bold text-warning">
              {product.rating}
            </span>
          </div>
        </div>

        {/* ৩. টাইটেলকেও লিঙ্ক করে দিন */}
        <Link href={`/explore/${product._id}`}>
          <h3 className="text-sm md:text-lg font-black text-secondary truncate hover:text-primary transition-colors duration-300 cursor-pointer">
            {product.title}
          </h3>
        </Link>

        {/* Price + Cart */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col">
            <span className="text-lg md:text-2xl font-black text-secondary leading-none">
              ${product.price}
            </span>
            {product.compareAtPrice && (
              <span className="text-[10px] md:text-xs font-bold line-through opacity-30 mt-1">
                ${product.compareAtPrice}
              </span>
            )}
          </div>

          {/* এই বাটনটি লিঙ্কের বাইরে থাকবে যাতে কার্টে এড করার সময় ডিটেইল পেজে চলে না যায় */}
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
