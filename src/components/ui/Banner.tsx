"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Sparkles, ChevronDown } from "lucide-react";

const HeroSection = () => {
  const [activeProduct, setActiveProduct] = useState({
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    title: "Sony WH-1000XM4",
    price: "299.00",
    originalPrice: "350.00",
    id: 1,
  });

  const products = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      title: "Sony WH-1000XM4",
      price: "299.00",
      originalPrice: "350.00",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      title: "Nike Red Sneaker",
      price: "95.00",
      originalPrice: "130.00",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
      title: "Classic Watch",
      price: "120.00",
      originalPrice: "150.00",
    },
  ];

  return (
    // ✅ FIX 1: h-[65vh] সরিয়ে mobile-এ min-h + auto height, desktop-এ আগের মতো
    <section className="relative w-full min-h-[65vh] lg:h-[65vh] flex items-center bg-base-100 overflow-hidden border-b border-base-200">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] rounded-full bg-accent/10 blur-[120px]" />
      </div>

      {/* ✅ FIX 2: mobile-এ উপরে-নিচে padding যোগ করা */}
      <div className="container mx-auto px-6 relative z-10 py-12 lg:py-0">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-neutral-content text-xs font-bold tracking-widest uppercase">
              <Sparkles size={14} className="text-primary animate-pulse" />
              Curated Collection 2026
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-secondary leading-[1.1] tracking-tighter">
              Upgrade Your <br />
              <span className="text-primary italic">Lifestyle</span> with TRENDly.
            </h1>

            <p className="text-base text-neutral/70 max-w-lg leading-relaxed">
              Discover premium{" "}
              <span className="text-secondary font-bold">Electronics</span> and
              <span className="text-secondary font-bold"> Fashion</span> footwear.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button className="btn btn-primary btn-lg rounded-2xl px-10 text-white shadow-lg shadow-primary/20 group hover:scale-105 active:scale-95 transition-all">
                Explore Shop
                <ShoppingCart size={20} className="ml-2 group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center gap-6">
            {/* ✅ FIX 3: mobile-এ image box ছোট, desktop-এ আগের মতো 350px */}
            <div className="relative w-full h-[260px] sm:h-[300px] lg:h-[350px] bg-base-200 rounded-[3rem] p-4 border border-base-300 shadow-xl overflow-hidden">
              <Image
                src={activeProduct.image}
                alt={activeProduct.title}
                priority
                fill
                className="object-cover rounded-[2.5rem] p-4 transition-opacity duration-300"
                sizes="(max-width: 768px) 100vw, 500px"
              />
              <div className="absolute inset-x-6 bottom-6 bg-base-100/90 dark:bg-base-200/90 backdrop-blur-md p-5 rounded-2xl border border-primary/20 shadow-2xl flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase font-bold opacity-60">Featured Product</p>
                  <h4 className="text-lg font-black text-secondary truncate max-w-[150px]">
                    {activeProduct.title}
                  </h4>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-primary leading-none">
                    ${activeProduct.price}
                  </p>
                  <p className="text-[10px] font-bold line-through opacity-40">
                    ${activeProduct.originalPrice}
                  </p>
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4">
              {products.map((product) => (
                <button
                  key={product.id}
                  onMouseEnter={() => setActiveProduct(product)}
                  className={`relative w-16 h-16 rounded-2xl overflow-hidden border-2 transition-all ${
                    activeProduct.id === product.id
                      ? "border-primary shadow-lg"
                      : "border-base-300"
                  }`}
                >
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ✅ FIX 4: Scroll indicator — mobile-এ relative, desktop-এ absolute */}
      <div className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce flex-col items-center gap-2 text-neutral/40">
        <span className="text-xs font-bold uppercase tracking-widest">Scroll to explore</span>
        <ChevronDown size={20} />
      </div>
    </section>
  );
};

export default HeroSection;