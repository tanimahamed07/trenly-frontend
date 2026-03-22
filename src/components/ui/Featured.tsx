import React from "react";
import Link from "next/link";
import { Smartphone, Shirt, Home, Trophy, ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Electronics",
    slug: "electronics",
    icon: <Smartphone size={28} />,
    count: "150+ Products",
    lightColor: "bg-blue-500/10 text-blue-500",
    borderHover: "hover:border-blue-500/40",
    bgAccent: "rgb(59 130 246 / 0.15)",
    bgSolid: "rgb(59,130,246)",
  },
  {
    name: "Fashion",
    slug: "fashion",
    icon: <Shirt size={28} />,
    count: "280+ Products",
    lightColor: "bg-purple-500/10 text-purple-500",
    borderHover: "hover:border-purple-500/40",
    bgAccent: "rgb(168 85 247 / 0.15)",
    bgSolid: "rgb(168,85,247)",
  },
  {
    name: "Home & Living",
    slug: "home",
    icon: <Home size={28} />,
    count: "120+ Products",
    lightColor: "bg-orange-500/10 text-orange-500",
    borderHover: "hover:border-orange-500/40",
    bgAccent: "rgb(249 115 22 / 0.15)",
    bgSolid: "rgb(249,115,22)",
  },
  {
    name: "Sports",
    slug: "sports",
    icon: <Trophy size={28} />,
    count: "90+ Products",
    lightColor: "bg-emerald-500/10 text-emerald-500",
    borderHover: "hover:border-emerald-500/40",
    bgAccent: "rgb(16 185 129 / 0.15)",
    bgSolid: "rgb(16,185,129)",
  },
];

const Featured = () => {
  return (
    <section className="py-24 bg-base-100 relative overflow-hidden">
      {/* Ambient background blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-end mb-14">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 text-xs font-black tracking-[0.2em] uppercase text-primary bg-primary/8 px-3 py-1 rounded-full border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block" />
              Collections
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-secondary tracking-tight leading-tight">
              Shop by{" "}
              <span className="text-primary italic relative">
                Category
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
            <p className="text-neutral/40 font-medium text-sm">
              Explore our curated collections
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

        {/* Categories Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, index) => (
            <Link
              key={index}
              href={`/explore?category=${cat.slug}`}
              style={
                {
                  "--glow-color": cat.bgAccent,
                } as React.CSSProperties
              }
              className={`
                group relative overflow-hidden
                p-6 md:p-8
                rounded-[2rem] md:rounded-[2.5rem]
                bg-base-200/40
                border border-base-300/60
                ${cat.borderHover}
                transition-all duration-500
                hover:-translate-y-1
                hover:shadow-[0_8px_40px_var(--glow-color)]
              `}
            >
              {/* Top: icon + arrow row */}
              <div className="flex items-start justify-between mb-6 md:mb-8">
                {/* Icon Box */}
                <div
                  className={`
                    w-14 h-14 md:w-16 md:h-16
                    rounded-2xl md:rounded-3xl
                    ${cat.lightColor}
                    flex items-center justify-center
                    group-hover:scale-110 group-hover:-rotate-6
                    transition-transform duration-500
                    shrink-0
                  `}
                >
                  {cat.icon}
                </div>

                {/* Arrow — visible on hover */}
                <div className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowRight size={16} className="text-primary mt-1" />
                </div>
              </div>

              {/* Info */}
              <div className="relative z-10 space-y-1">
                <h3 className="text-base md:text-xl font-black text-secondary leading-tight">
                  {cat.name}
                </h3>
                <p className="text-[10px] md:text-xs font-bold opacity-35 uppercase tracking-widest">
                  {cat.count}
                </p>
              </div>

              {/* Ghost icon background */}
              <div className="absolute -bottom-3 -right-3 opacity-[0.04] group-hover:opacity-[0.09] group-hover:scale-110 transition-all duration-500">
                <div className="w-[100px] h-[100px] md:w-[120px] md:h-[120px]">
                  {cat.icon}
                </div>
              </div>

              {/* Bottom shimmer line */}
              <div
                className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{ background: cat.bgSolid, opacity: 0.5 }}
              />
            </Link>
          ))}
        </div>

        {/* Mobile "View All" */}
        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary border border-primary/20 bg-primary/5 px-6 py-2.5 rounded-2xl"
          >
            View All Categories
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Featured;