import React from "react";
import Link from "next/link";
import { Heart, ShieldCheck, Zap, Globe, ArrowRight, LucideIcon } from "lucide-react";

interface ValueProps {
  title: string;
  description: string;
  icon: LucideIcon;
  lightColor: string;
  borderHover: string;
  bgAccent: string;
  bgSolid: string;
}

const values: ValueProps[] = [
  {
    title: "Customer First",
    description: "Your satisfaction is our core mission. We verify every product's quality before it reaches your doorstep.",
    icon: Heart,
    lightColor: "bg-blue-500/10 text-blue-500",
    borderHover: "hover:border-blue-500/40",
    bgAccent: "rgb(59 130 246 / 0.15)",
    bgSolid: "rgb(59,130,246)",
  },
  {
    title: "Authentic Quality",
    description: "At TRENDly, we guarantee only 100% authentic brands and premium materials for a lasting experience.",
    icon: ShieldCheck,
    lightColor: "bg-emerald-500/10 text-emerald-500",
    borderHover: "hover:border-emerald-500/40",
    bgAccent: "rgb(16 185 129 / 0.15)",
    bgSolid: "rgb(16,185,129)",
  },
  {
    title: "Fast Delivery",
    description: "We value your time. Our logistics network is optimized to ensure lightning-fast shipping across the country.",
    icon: Zap,
    lightColor: "bg-orange-500/10 text-orange-500",
    borderHover: "hover:border-orange-500/40",
    bgAccent: "rgb(249 115 22 / 0.15)",
    bgSolid: "rgb(249,115,22)",
  },
  {
    title: "Modern Lifestyle",
    description: "Stay ahead with the latest trends curated for the digital age, blending style with functionality.",
    icon: Globe,
    lightColor: "bg-purple-500/10 text-purple-500",
    borderHover: "hover:border-purple-500/40",
    bgAccent: "rgb(168 85 247 / 0.15)",
    bgSolid: "rgb(168,85,247)",
  },
];

const OurStory = () => {
  return (
    <section className="py-24 bg-base-100 relative overflow-hidden">
      {/* Featured সেকশনের মতো Ambient Blobs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header - Featured স্টাইল অনুযায়ী */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-black tracking-[0.2em] uppercase text-primary bg-primary/8 px-3 py-1 rounded-full border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block" />
              Our Philosophy
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-secondary tracking-tight leading-[1.1]">
              Beyond Just <br />
              <span className="text-primary italic relative">
                Selling
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 100 6" preserveAspectRatio="none" height="6">
                  <path d="M0 5 Q50 0 100 5" stroke="oklch(45% 0.16 250)" strokeWidth="2" fill="none" strokeOpacity="0.4" />
                </svg>
              </span>, We Build Trust.
            </h2>
            <p className="text-neutral/40 font-medium text-base leading-relaxed mt-4">
              Founded in 2026, TRENDly transforms everyday shopping into an extraordinary experience, ensuring premium quality is accessible to all.
            </p>
          </div>

          {/* Stats Badge */}
          <div className="hidden lg:block p-6 rounded-[2rem] bg-base-200/50 border border-base-300/60 text-center min-w-[180px]">
            <p className="text-primary font-black text-4xl italic tracking-tighter">10K+</p>
            <p className="text-[10px] font-bold opacity-30 uppercase tracking-[0.2em]">Happy Customers</p>
          </div>
        </div>

        {/* Content Grid - Featured Card এর হুবহু ডিজাইন */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                style={{ "--glow-color": item.bgAccent } as React.CSSProperties}
                className={`
                  group relative overflow-hidden
                  p-8 rounded-[2.5rem]
                  bg-base-200/40 border border-base-300/60
                  ${item.borderHover}
                  transition-all duration-500
                  hover:-translate-y-1
                  hover:shadow-[0_8px_40px_var(--glow-color)]
                `}
              >
                {/* Top: Icon Box */}
                <div className="flex items-start justify-between mb-8">
                  <div className={`
                    w-16 h-16 rounded-3xl
                    ${item.lightColor}
                    flex items-center justify-center
                    group-hover:scale-110 group-hover:-rotate-6
                    transition-transform duration-500
                  `}>
                    <Icon size={28} />
                  </div>
                  
                  {/* Hover Arrow */}
                  <div className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowRight size={18} className="text-primary mt-1" />
                  </div>
                </div>

                {/* Info */}
                <div className="relative z-10 space-y-3">
                  <h3 className="text-xl font-black text-secondary italic tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral/40 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>

                {/* Ghost Icon Background */}
                <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-110 transition-all duration-500 pointer-events-none">
                   <Icon size={120} />
                </div>

                {/* Bottom Shimmer Line */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
                  style={{ background: item.bgSolid, opacity: 0.5 }}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Card - Featured সেকশনের গ্লাসমরফিজম স্টাইলে */}
        <div className="mt-20 relative rounded-[3rem] overflow-hidden bg-secondary p-12 lg:p-16 text-center border border-white/5 shadow-2xl">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent" />
            <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-[120px]" />
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-accent rounded-full blur-[120px]" />
          </div>
          
          <h3 className="text-2xl md:text-4xl font-black text-white italic tracking-tighter mb-6 relative z-10 leading-tight">
            Ready to Elevate Your Style?
          </h3>
          <p className="text-white/60 max-w-xl mx-auto mb-10 relative z-10 font-medium text-lg">
            Join our global community and explore the latest collections curated just for you.
          </p>
          <Link
            href="/explore"
            className="btn btn-primary btn-lg rounded-2xl px-12 text-white shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all relative z-10 border-none group"
          >
            Explore Collection
            <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurStory;