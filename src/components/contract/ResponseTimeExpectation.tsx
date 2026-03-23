"use client";

import React from "react";
import { Clock, CheckCircle2, Zap, MessageSquare, ShieldCheck, Send } from "lucide-react";

const ResponseTimeExpectation = () => {
  return (
    <section className="py-24 bg-base-100 relative overflow-hidden transition-colors duration-300">
      {/* Ambient background blobs matching Featured section */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto space-y-16">
          
          {/* Main Card - Matching your UI Style */}
          <div 
            className="group relative overflow-hidden
                       p-8 md:p-16 rounded-[2.5rem] md:rounded-[3.5rem]
                       bg-base-200 border border-base-300
                       hover:border-primary/40 transition-all duration-500
                       hover:shadow-[0_20px_80px_oklch(45%_0.16_250/0.08)]"
          >
            <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16">
              
              {/* Left: Animated Icon Cluster */}
              <div className="relative shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] md:rounded-[2.5rem] bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-700">
                  <Clock size={48} strokeWidth={1.5} className="md:size-16" />
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-2xl bg-base-100 border border-base-300 flex items-center justify-center text-success shadow-lg animate-bounce">
                  <Zap size={18} fill="currentColor" />
                </div>
              </div>

              {/* Middle: Core Content */}
              <div className="flex-grow text-center lg:text-left space-y-6">
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-2 text-[10px] md:text-xs font-black tracking-[0.2em] uppercase text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    Service Standard
                  </span>
                  <h2 className="text-3xl md:text-5xl font-black text-secondary tracking-tight leading-tight">
                    Reliable <span className="text-primary italic relative">
                      Response.
                      <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 6" preserveAspectRatio="none" height="6">
                        <path d="M0 5 Q50 0 100 5" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary/40" />
                      </svg>
                    </span>
                  </h2>
                </div>
                
                <p className="text-neutral/60 font-medium text-sm md:text-lg max-w-2xl leading-relaxed">
                  Time is your most valuable asset. Our support team guarantees a comprehensive response 
                  within <span className="text-secondary font-bold border-b-2 border-primary/30">24 hours</span> during official business days.
                </p>
              </div>

              {/* Right: Live Badge */}
              <div className="shrink-0 w-full lg:w-auto">
                <div className="p-8 rounded-[2rem] bg-base-100 border border-base-300 flex flex-col items-center gap-4 shadow-sm group-hover:border-primary/20 transition-colors">
                   <div className="flex items-center gap-2 px-4 py-2 bg-success/10 text-success rounded-full border border-success/20">
                      <CheckCircle2 size={16} />
                      <span className="text-[10px] font-black uppercase tracking-[0.15em]">
                          Active Support
                      </span>
                   </div>
                   <div className="text-center">
                      <p className="text-xs font-black text-secondary uppercase tracking-widest opacity-40">Working Hours</p>
                      <p className="text-sm font-bold text-secondary mt-1">Mon — Fri • 9:00 - 18:00</p>
                   </div>
                </div>
              </div>
            </div>

            {/* Ghost Background Icon */}
            <div className="absolute -bottom-16 -right-10 opacity-[0.03] group-hover:opacity-[0.06] group-hover:scale-110 transition-all duration-1000 pointer-events-none text-secondary">
              <Clock size={400} strokeWidth={1} />
            </div>

            {/* Bottom Shimmer line matching Featured/Map */}
            <div className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-1000 rounded-full bg-primary opacity-50" />
          </div>

          {/* Related Content: The Process Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                icon: Send, 
                title: "Inquiry Received", 
                desc: "Your message is instantly logged and assigned to a specialist." 
              },
              { 
                icon: MessageSquare, 
                title: "Expert Review", 
                desc: "Our team analyzes your request to provide a precise solution." 
              },
              { 
                icon: ShieldCheck, 
                title: "Resolution", 
                desc: "You receive a detailed response aimed at solving your query." 
              }
            ].map((step, i) => (
              <div key={i} className="group p-8 rounded-[2rem] bg-base-200 border border-base-300 hover:border-primary/30 transition-all duration-500 flex flex-col items-center text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/10 transition-all">
                  <step.icon size={24} />
                </div>
                <div className="space-y-2">
                  <h4 className="font-black text-secondary text-sm uppercase tracking-widest">{step.title}</h4>
                  <p className="text-xs text-neutral/50 font-medium leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ResponseTimeExpectation;