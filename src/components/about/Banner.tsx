import React from "react";
import { Info, Sparkles, Target, Users } from "lucide-react";
import Image from "next/image";

const AboutBanner = () => {
  return (
    <section className="relative w-full py-16 lg:py-24 bg-base-100 overflow-hidden border-b border-base-200">
      {/* Background Decorative Elements - global.css colors */}
      <div className="absolute top-0 right-0 w-[30%] h-[50%] rounded-full bg-primary/5 blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-[30%] h-[50%] rounded-full bg-accent/5 blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase">
              <Info size={14} />
              Our Story
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-secondary leading-tight tracking-tighter">
              Redefining the <br />
              <span className="text-primary italic">Digital Shopping</span>{" "}
              Experience.
            </h2>

            <p className="text-base text-neutral/70 max-w-lg leading-relaxed">
              At <span className="font-bold text-secondary">TRENDly</span>, we
              believe shopping should be more than just a transaction. Since
              2026, we've been crafting a curated space where premium quality
              meets modern lifestyle.
            </p>

            {/* Stats/Features - Matching DaisyUI Base Colors */}
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-base-200 text-primary border border-base-300">
                  <Target size={20} />
                </div>
                <div>
                  <h4 className="font-black text-secondary">Our Mission</h4>
                  <p className="text-xs text-neutral/60">
                    Quality-first products for everyone.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-base-200 text-primary border border-base-300">
                  <Users size={20} />
                </div>
                <div>
                  <h4 className="font-black text-secondary">Community</h4>
                  <p className="text-xs text-neutral/60">
                    10k+ Happy customers worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Visual Element */}
          <div className="relative">
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden border border-base-300 shadow-2xl">
              <Image
                width={500}
                height={400}
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
                alt="TRENDly Team"
                className="w-full h-[300px] md:h-[400px] object-cover"
              />
              {/* Glassmorphism Overlay Card */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-base-100/40 backdrop-blur-xl border border-white/20 shadow-xl hidden sm:block">
                <div className="flex items-center gap-4">
                  <div className="bg-primary p-3 rounded-xl shadow-lg shadow-primary/20">
                    <Sparkles className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-secondary font-black italic uppercase tracking-tighter leading-none">
                      Established 2026
                    </p>
                    <p className="text-[10px] text-secondary/70 font-bold mt-1 uppercase tracking-widest">
                      Quality • Trust • Style
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decorative Shape */}
            <div className="absolute -top-6 -right-6 w-full h-full border-2 border-primary/20 rounded-[2.5rem] -z-0" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBanner;
