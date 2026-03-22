"use client";

import React from "react";
import { Star, Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Fashion Enthusiast",
    avatar: "SM",
    rating: 5,
    text: "Absolutely love the quality of products here. The delivery was lightning fast and the packaging was premium. Will definitely be ordering again!",
    product: "Summer Collection",
    avatarColor: "bg-purple-500/10 text-purple-500",
    bgAccent: "rgb(168 85 247 / 0.12)",
    bgSolid: "rgb(168,85,247)",
    borderHover: "hover:border-purple-500/30",
  },
  {
    name: "James Okafor",
    role: "Tech Reviewer",
    avatar: "JO",
    rating: 5,
    text: "Best electronics store I've found online. The product descriptions are accurate and customer support was incredibly helpful when I had questions.",
    product: "Wireless Earbuds Pro",
    avatarColor: "bg-blue-500/10 text-blue-500",
    bgAccent: "rgb(59 130 246 / 0.12)",
    bgSolid: "rgb(59,130,246)",
    borderHover: "hover:border-blue-500/30",
  },
  {
    name: "Priya Sharma",
    role: "Interior Designer",
    avatar: "PS",
    rating: 5,
    text: "The Home & Living collection is stunning. Every piece feels carefully curated. My clients always ask where I source such unique items.",
    product: "Minimalist Desk Lamp",
    avatarColor: "bg-orange-500/10 text-orange-500",
    bgAccent: "rgb(249 115 22 / 0.12)",
    bgSolid: "rgb(249,115,22)",
    borderHover: "hover:border-orange-500/30",
  },
  {
    name: "Daniel Cruz",
    role: "Fitness Coach",
    avatar: "DC",
    rating: 5,
    text: "Top-tier sports gear at a fair price. I've recommended Trendly to all my clients. The quality speaks for itself after months of heavy use.",
    product: "Pro Resistance Set",
    avatarColor: "bg-emerald-500/10 text-emerald-500",
    bgAccent: "rgb(16 185 129 / 0.12)",
    bgSolid: "rgb(16,185,129)",
    borderHover: "hover:border-emerald-500/30",
  },
  {
    name: "Emma Lawson",
    role: "Lifestyle Blogger",
    avatar: "EL",
    rating: 5,
    text: "I've featured Trendly in three of my blog posts already. My readers keep thanking me. The trending section always has something fresh and exciting.",
    product: "Aesthetic Journal Set",
    avatarColor: "bg-pink-500/10 text-pink-500",
    bgAccent: "rgb(236 72 153 / 0.12)",
    bgSolid: "rgb(236,72,153)",
    borderHover: "hover:border-pink-500/30",
  },
  {
    name: "Rafi Hossain",
    role: "Software Engineer",
    avatar: "RH",
    rating: 4,
    text: "Smooth shopping experience from start to finish. The filter system is great, found exactly what I needed in seconds. Checkout was seamless.",
    product: "Mechanical Keyboard",
    avatarColor: "bg-cyan-500/10 text-cyan-500",
    bgAccent: "rgb(6 182 212 / 0.12)",
    bgSolid: "rgb(6,182,212)",
    borderHover: "hover:border-cyan-500/30",
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={12}
        className={
          i < rating ? "fill-warning text-warning" : "fill-base-300 text-base-300"
        }
      />
    ))}
  </div>
);

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-base-100 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* Header */}
        <div className="flex justify-between items-end mb-8 md:mb-14">
          <div className="space-y-2 md:space-y-3">
            <span className="inline-flex items-center gap-2 text-[10px] md:text-xs font-black tracking-[0.2em] uppercase text-primary bg-primary/8 px-3 py-1 rounded-full border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block" />
              Customer Stories
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-secondary tracking-tight leading-tight">
              Loved by{" "}
              <span className="text-primary italic relative">
                Thousands
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
              Real reviews from real customers
            </p>
          </div>

          <div className="hidden sm:flex flex-col items-end gap-1">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-warning text-warning" />
              ))}
            </div>
            <span className="text-xs font-black text-secondary">
              4.9{" "}
              <span className="font-medium text-neutral/40">from 2,400+ reviews</span>
            </span>
          </div>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={16}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          style={{ alignItems: "flex-start" }}
          className="!pb-10"
        >
          {testimonials.map((t, index) => (
            <SwiperSlide key={index} style={{ height: "auto" }}>
              <div
                style={{ "--glow-color": t.bgAccent } as React.CSSProperties}
                className={`
                  group relative overflow-hidden
                  bg-base-200/40
                  border border-base-300/60
                  ${t.borderHover}
                  rounded-[1.25rem]
                  p-4 md:p-5
                  transition-all duration-500
                  hover:-translate-y-1
                  hover:shadow-[0_8px_40px_var(--glow-color)]
                `}
              >
                {/* Ghost quote */}
                <div className="absolute top-3 right-3 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-300 pointer-events-none">
                  <Quote size={36} />
                </div>

                {/* Top: avatar + rating */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`
                      w-10 h-10
                      rounded-xl
                      ${t.avatarColor}
                      flex items-center justify-center
                      text-xs font-black
                      group-hover:scale-110 group-hover:-rotate-6
                      transition-transform duration-500
                      shrink-0
                    `}
                  >
                    {t.avatar}
                  </div>
                  <StarRating rating={t.rating} />
                </div>

                {/* Review text */}
                <p className="text-sm text-neutral/65 leading-relaxed font-medium">
                  "{t.text}"
                </p>

                {/* Product tag */}
                <div className="mt-2.5">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-widest uppercase text-primary/60 bg-primary/5 border border-primary/10 px-2 py-0.5 rounded-lg">
                    <span className="w-1 h-1 rounded-full bg-primary/40 inline-block" />
                    {t.product}
                  </span>
                </div>

                {/* Divider */}
                <div className="my-3 h-px bg-base-300/60" />

                {/* Author row */}
                <div className="flex items-center gap-2.5">
                  <div>
                    <p className="text-sm font-black text-secondary leading-tight">
                      {t.name}
                    </p>
                    <p className="text-[11px] text-neutral/40 font-medium mt-0.5">
                      {t.role}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <span className="text-[9px] font-black tracking-wider uppercase text-success bg-success/10 px-2 py-0.5 rounded-lg">
                      ✓ Verified
                    </span>
                  </div>
                </div>

                {/* Bottom shimmer line */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
                  style={{ background: t.bgSolid, opacity: 0.5 }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;