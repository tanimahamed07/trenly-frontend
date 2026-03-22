// components/ui/PromoBanner.tsx
import React from "react";
import { Zap, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

const PromoBanner = () => {
  return (
    <section className="py-6 md:py-8 bg-base-100 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div
          className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10"
          style={{
            background:
              "linear-gradient(135deg, oklch(45% 0.16 250) 0%, oklch(35% 0.18 270) 50%, oklch(40% 0.14 230) 100%)",
          }}
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/5 blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-white/5 blur-[60px] pointer-events-none" />
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left content */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-4 md:gap-6 text-center sm:text-left">
              {/* Icon badge */}
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center shrink-0">
                <Zap size={26} className="text-white fill-white/80" />
              </div>

              <div className="space-y-1">
                {/* Eyebrow */}
                <span className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-[0.2em] uppercase text-white/70 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15">
                  <Clock size={9} />
                  Limited Time Offer
                </span>
                <h3 className="text-xl md:text-3xl font-black text-white leading-tight">
                  Get{" "}
                  <span className="text-warning relative">
                    30% OFF
                    <svg
                      className="absolute -bottom-0.5 left-0 w-full"
                      viewBox="0 0 100 4"
                      preserveAspectRatio="none"
                      height="4"
                    >
                      <path
                        d="M0 3 Q50 0 100 3"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeOpacity="0.6"
                      />
                    </svg>
                  </span>{" "}
                  on Your First Order
                </h3>
                <p className="text-white/60 text-xs md:text-sm font-medium">
                  Use code{" "}
                  <span className="font-black text-white bg-white/15 px-2 py-0.5 rounded-lg tracking-widest">
                    TRENDLY30
                  </span>{" "}
                  at checkout
                </p>
              </div>
            </div>

            {/* Right: CTA */}
            <div className="flex flex-col items-center gap-2 shrink-0">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 bg-white text-primary font-black text-sm px-6 py-3 rounded-2xl hover:bg-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] group"
              >
                Shop Now
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </Link>
              <span className="text-white/40 text-[10px] font-bold tracking-wider uppercase">
                Ends in 48 hours
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;