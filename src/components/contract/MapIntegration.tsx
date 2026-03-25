"use client";

import React from "react";
import { MapPin, ExternalLink, ArrowRight, Sparkles } from "lucide-react";

const MapIntegration = () => {
  /**
   * Google Maps-এর সঠিক Embed URL এখানে ব্যবহার করতে হবে।
   * নিচে আমি ধানমন্ডির একটি লোকেশন দিয়েছি।
   * আপনি Google Maps-এ গিয়ে Share > Embed a map থেকে src এর অংশটুকু এখানে রিপ্লেস করতে পারেন।
   */
  const googleMapsEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.1963286367373!2d90.37086887589366!3d23.740417989163276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b2969408e3%3A0x629555c825447153!2sDhanmondi%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd";

  return (
    <section className="py-24 bg-base-100 relative overflow-hidden transition-colors duration-300">
      {/* Ambient background blobs matching Featured section */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header - Identical to Featured Section */}
        <div className="flex justify-between items-end mb-14">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 text-xs font-black tracking-[0.2em] uppercase text-primary bg-primary/8 px-3 py-1 rounded-full border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block" />
              Location
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-secondary tracking-tight leading-tight">
              Visit our{" "}
              <span className="text-primary italic relative">
                Flagship Store
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 100 6"
                  preserveAspectRatio="none"
                  height="6"
                >
                  <path
                    d="M0 5 Q50 0 100 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-primary/40"
                  />
                </svg>
              </span>
            </h2>
            <p className="text-neutral/40 font-medium text-sm">
              Find us in the heart of the city
            </p>
          </div>

          <a
            href="https://maps.app.goo.gl/YfWJ3RzJ8Z8J8Z8J8" // আসল ডিরেকশন লিংক এখানে দিন
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-primary border border-primary/20 bg-primary/5 hover:bg-primary/10 px-4 py-2 rounded-2xl transition-all duration-300 group"
          >
            Get Directions
            <ExternalLink
              size={15}
              className="group-hover:scale-110 transition-transform duration-300"
            />
          </a>
        </div>

        {/* Map and Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Map Container - Fixed iframe logic */}
          {/* Map Container - Fixed allowFullScreen logic */}
          <div className="lg:col-span-8 group relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-base-200 border border-base-300 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(var(--color-primary),0.1)] h-[400px] md:h-[500px]">
            <iframe
              src={googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true} // এখানে "" এর বদলে true দিন অথবা শুধু allowFullScreen লিখুন
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Store Location"
              className="grayscale-[0.5] contrast-[1.1] dark:invert-[0.9] dark:hue-rotate-180 hover:grayscale-0 transition-all duration-700 ease-in-out"
            ></iframe>

            {/* Shimmer line bottom */}
            <div className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-700 rounded-full bg-primary opacity-50" />
          </div>

          {/* Right: Info Card - Matching Featured Card UI */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="group relative overflow-hidden p-8 rounded-[2rem] md:rounded-[2.5rem] bg-base-200 border border-base-300 transition-all duration-500 hover:-translate-y-1 flex-grow">
              <div className="flex items-start justify-between mb-8">
                <div className="w-16 h-16 rounded-3xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">
                  <MapPin size={28} />
                </div>
                <div className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <Sparkles size={18} className="text-primary mt-1" />
                </div>
              </div>

              <div className="relative z-10 space-y-4">
                <div>
                  <h3 className="text-xl font-black text-secondary leading-tight">
                    Dhanmondi HQ
                  </h3>
                  <p className="text-xs font-bold opacity-35 uppercase tracking-widest mt-1">
                    Headquarters
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <p className="text-sm font-medium text-neutral/70 leading-relaxed">
                    House #123, Road #45, <br />
                    Dhanmondi, Dhaka - 1209, <br />
                    Bangladesh
                  </p>

                  <div className="pt-4 border-t border-base-300">
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">
                      Store Hours
                    </p>
                    <p className="text-sm font-bold text-secondary">
                      Sat - Thu: 9AM - 8PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Ghost icon background */}
              <div className="absolute -bottom-4 -right-4 opacity-[0.04] group-hover:opacity-[0.09] group-hover:scale-110 transition-all duration-500 pointer-events-none text-secondary">
                <MapPin size={150} />
              </div>

              {/* Bottom shimmer line */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full bg-primary opacity-50" />
            </div>

            {/* Quick Action Button for Mobile */}
            <button className="sm:hidden btn btn-primary btn-lg rounded-2xl w-full text-white gap-2 border-none">
              Get Directions <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapIntegration;
