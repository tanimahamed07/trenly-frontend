"use client";

import React, { useState } from "react";
import { Mail, ArrowRight, Check, Sparkles } from "lucide-react";

const perks = [
  { text: "Exclusive deals & early access" },
  { text: "New arrivals every week" },
  { text: "No spam, unsubscribe anytime" },
];

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email || !email.includes("@")) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="py-16 md:py-24 bg-base-100 relative overflow-hidden">
      {/* Ambient blobs — Features এর মতো */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* Header — Features এর মতো left-aligned */}
        <div className="space-y-2 md:space-y-3 mb-8 md:mb-14">
          <span className="inline-flex items-center gap-2 text-[10px] md:text-xs font-black tracking-[0.2em] uppercase text-primary bg-primary/8 px-3 py-1 rounded-full border border-primary/20">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block" />
            Newsletter
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-secondary tracking-tight leading-tight">
            Stay in the{" "}
            <span className="text-primary italic relative">
              Loop
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
            Join 12,000+ subscribers. Deals, drops & discounts — first.
          </p>
        </div>

        {/* Main layout — 2 col on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">

          {/* Left — perks cards, same style as feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 md:gap-4">
            {perks.map((perk, i) => {
              const configs = [
                {
                  color: "bg-primary/10 text-primary",
                  borderHover: "hover:border-primary/30",
                  bgAccent: "oklch(45% 0.16 250)",
                  glowAccent: "rgb(59 130 246 / 0.12)",
                },
                {
                  color: "bg-green-500/10 text-green-600",
                  borderHover: "hover:border-green-500/30",
                  bgAccent: "rgb(16,185,129)",
                  glowAccent: "rgb(16 185 129 / 0.12)",
                },
                {
                  color: "bg-orange-500/10 text-orange-600",
                  borderHover: "hover:border-orange-500/30",
                  bgAccent: "rgb(249,115,22)",
                  glowAccent: "rgb(249 115 22 / 0.12)",
                },
              ];
              const c = configs[i];
              return (
                <div
                  key={i}
                  style={{ "--glow-color": c.glowAccent } as React.CSSProperties}
                  className={`
                    group relative overflow-hidden
                    flex items-center gap-4
                    p-4 md:p-5
                    rounded-[1.25rem] md:rounded-[1.5rem]
                    bg-base-200/40
                    border border-base-300/60
                    ${c.borderHover}
                    transition-all duration-500
                    hover:-translate-y-0.5
                    hover:shadow-[0_8px_40px_var(--glow-color)]
                  `}
                >
                  {/* Icon box — Features এর মতো */}
                  <div
                    className={`
                      w-10 h-10 md:w-11 md:h-11
                      rounded-xl
                      ${c.color}
                      flex items-center justify-center
                      group-hover:scale-110 group-hover:-rotate-6
                      transition-transform duration-500
                      shrink-0
                    `}
                  >
                    <Check size={18} />
                  </div>
                  <p className="text-sm font-bold text-secondary/80">
                    {perk.text}
                  </p>

                  {/* Bottom shimmer */}
                  <div
                    className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
                    style={{ background: c.bgAccent, opacity: 0.5 }}
                  />
                </div>
              );
            })}
          </div>

          {/* Right — input card */}
          <div
            className="
              group relative overflow-hidden
              bg-base-200/40
              border border-base-300/60
              hover:border-primary/20
              rounded-[1.5rem] md:rounded-[2rem]
              p-6 md:p-8
              transition-all duration-500
              hover:shadow-[0_8px_40px_oklch(45%_0.16_250/0.08)]
              flex flex-col justify-center
            "
          >
            {/* Ghost decoration */}
            <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-primary/5 blur-[40px] pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-accent/5 blur-[40px] pointer-events-none" />

            <div className="relative z-10">
              {/* Icon */}
              <div className="relative inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary/10 text-primary mb-4 group-hover:scale-105 transition-transform duration-500">
                <Mail size={22} />
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-warning/20 border border-warning/30 flex items-center justify-center">
                  <Sparkles size={8} className="text-warning" />
                </div>
              </div>

              <h3 className="text-lg md:text-2xl font-black text-secondary mb-1">
                Get Deals First
              </h3>
              <p className="text-xs text-neutral/40 font-medium mb-5">
                Drop your email. We'll handle the rest.
              </p>

              {submitted ? (
                <div className="flex items-center gap-3 bg-success/8 border border-success/20 rounded-2xl px-4 py-3">
                  <div className="w-8 h-8 rounded-xl bg-success/15 flex items-center justify-center shrink-0">
                    <Check size={16} className="text-success" />
                  </div>
                  <div>
                    <p className="font-black text-secondary text-sm">You're in! 🎉</p>
                    <p className="text-neutral/40 text-[11px] font-medium">
                      Check your inbox soon.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Mail
                      size={14}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral/30"
                    />
                    <input
                      type="email"
                      value={email}
                      suppressHydrationWarning={true}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                      placeholder="your@email.com"
                      className="w-full pl-9 pr-4 py-3 rounded-xl bg-base-100 border border-base-300/60 focus:border-primary/40 focus:outline-none text-sm font-medium text-secondary placeholder:text-neutral/25 transition-all duration-300"
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white font-black text-sm px-5 py-3 rounded-xl hover:bg-primary/90 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_oklch(45%_0.16_250/0.3)] group/btn shrink-0"
                  >
                    Subscribe
                    <ArrowRight
                      size={14}
                      className="group-hover/btn:translate-x-1 transition-transform duration-300"
                    />
                  </button>
                </div>
              )}
            </div>

            {/* Bottom shimmer */}
            <div
              className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full opacity-40"
              style={{
                background: "linear-gradient(90deg, transparent, oklch(45% 0.16 250), transparent)",
              }}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Newsletter;