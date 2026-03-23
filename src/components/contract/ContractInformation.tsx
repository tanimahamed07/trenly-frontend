"use client";

import React from "react";
import { Mail, Phone, MapPin, Send, Sparkles, MessageSquare } from "lucide-react";

const ContactInformation = () => {
  return (
    <div className="bg-base-100 text-neutral relative overflow-hidden transition-colors duration-300">
      {/* Ambient Background Blobs - Using Theme Accent & Primary Opacity */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      {/* Hero Header Section */}
      <section className="pt-20 pb-12 md:pt-28 md:pb-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 text-[10px] md:text-xs font-black tracking-[0.2em] uppercase text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-secondary tracking-tight leading-[1.1]">
              Contact <span className="text-primary italic relative">
                Us.
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 6" preserveAspectRatio="none" height="6">
                  <path d="M0 5 Q50 0 100 5" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary/40" />
                </svg>
              </span>
            </h1>
            <p className="text-sm md:text-lg text-neutral/60 font-medium max-w-xl leading-relaxed">
              Have a question or just want to say hi? We'd love to hear from you. 
              Our team usually responds within <span className="text-primary font-bold">24 hours.</span>
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
            
            {/* Left: Essential Info Cards */}
            <div className="lg:col-span-4 space-y-6">
              {[
                { icon: Mail, label: "Email", value: "support@trendly.com" },
                { icon: Phone, label: "Phone", value: "+880 1234 567 890" },
                { icon: MapPin, label: "Office", value: "Dhanmondi, Dhaka 1209" },
              ].map((item, idx) => (
                <div key={idx} className="group p-6 rounded-[2rem] bg-base-200 border border-base-300 hover:border-primary/40 transition-all duration-500">
                  <div className="flex gap-5 items-center">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">
                      <item.icon size={22} />
                    </div>
                    <div>
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-neutral/40 mb-0.5">{item.label}</h3>
                      <p className="text-sm md:text-base font-bold text-secondary">{item.value}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Business Hours Card - Themed with Secondary & Neutral Content */}
              <div className="p-8 rounded-[2rem] bg-secondary text-neutral-content relative overflow-hidden group shadow-xl shadow-secondary/10">
                <div className="relative z-10">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] opacity-70 mb-4 flex items-center gap-2">
                    <Sparkles size={14} className="text-primary" /> Business Hours
                  </h4>
                  <div className="space-y-2 text-sm font-medium">
                    <p className="flex justify-between border-b border-neutral-content/10 pb-2">
                      <span>Mon — Fri:</span> <span>9am – 6pm</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Saturday:</span> <span>10am – 4pm</span>
                    </p>
                  </div>
                </div>
                <MessageSquare size={120} className="absolute -bottom-8 -right-8 opacity-5 group-hover:scale-110 transition-transform duration-700" />
              </div>
            </div>

            {/* Right: Modern Form Card */}
            <div className="lg:col-span-8">
              <div className="p-8 md:p-12 rounded-[2.5rem] bg-base-200 border border-base-300 relative overflow-hidden transition-colors">
                <form className="space-y-8 relative z-10">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-neutral/50 ml-1">Full Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full bg-base-100 border border-base-300 rounded-2xl px-5 py-4 focus:border-primary/50 focus:outline-none transition-all font-medium text-secondary placeholder:text-neutral/30"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-neutral/50 ml-1">Email Address</label>
                      <input
                        type="email"
                        placeholder="hello@example.com"
                        className="w-full bg-base-100 border border-base-300 rounded-2xl px-5 py-4 focus:border-primary/50 focus:outline-none transition-all font-medium text-secondary placeholder:text-neutral/30"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral/50 ml-1">Subject</label>
                    <input
                      type="text"
                      placeholder="How can we help you?"
                      className="w-full bg-base-100 border border-base-300 rounded-2xl px-5 py-4 focus:border-primary/50 focus:outline-none transition-all font-medium text-secondary placeholder:text-neutral/30"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral/50 ml-1">Message</label>
                    <textarea
                      rows={4}
                      placeholder="Your message goes here..."
                      className="w-full bg-base-100 border border-base-300 rounded-2xl px-5 py-4 focus:border-primary/50 focus:outline-none transition-all font-medium text-secondary resize-none placeholder:text-neutral/30"
                    ></textarea>
                  </div>

                  <button className="group relative inline-flex items-center justify-center gap-3 bg-primary text-neutral-content font-black uppercase tracking-widest text-[10px] md:text-xs px-10 py-5 rounded-2xl hover:brightness-110 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-primary/20 border-none">
                    Send Message
                    <div className="p-2 bg-neutral-content/20 rounded-lg group-hover:rotate-12 transition-transform">
                      <Send size={16} />
                    </div>
                  </button>
                </form>

                {/* Ghost Icon background using Primary with very low opacity */}
                <Send size={300} className="absolute -bottom-20 -right-20 text-primary opacity-[0.03] pointer-events-none" />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactInformation;