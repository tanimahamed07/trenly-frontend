"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Star, Sparkles, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

const CartPage = () => {
  const { cart, updateQty, removeFromCart } = useCart();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = subtotal > 500 || cart.length === 0 ? 0 : 15;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden bg-base-100">
        {/* Ambient Blobs matching NewArrivals */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 space-y-8">
          <div className="relative inline-block">
            <div className="w-32 h-32 rounded-[2.5rem] bg-base-200 border border-base-300 flex items-center justify-center text-primary/20">
              <ShoppingBag size={60} strokeWidth={1} />
            </div>
            <Sparkles className="absolute -top-4 -right-4 text-primary animate-pulse" size={32} />
          </div>
          
          <div className="space-y-3">
            <h2 className="text-4xl md:text-5xl font-black text-secondary uppercase italic tracking-tighter">
              Bag is <span className="text-primary underline decoration-primary/20 underline-offset-8">Empty.</span>
            </h2>
            <p className="text-neutral/50 font-medium text-sm md:text-base max-w-xs mx-auto uppercase tracking-widest">
              Refresh your style now
            </p>
          </div>

          <Link
            href="/explore"
            className="btn btn-primary btn-lg rounded-2xl px-12 text-white shadow-xl shadow-primary/20 border-none group transition-all hover:scale-105"
          >
            Start Shopping 
            <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-16 md:py-24 relative overflow-hidden">
      {/* Background Blobs based on theme primary/accent */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header - Matching NewArrivals Underline SVG */}
        <div className="mb-14 space-y-4">
          <span className="inline-flex items-center gap-2 text-[10px] md:text-xs font-black tracking-[0.2em] uppercase text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
            <ShoppingCart size={12} />
            Your Selection
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-secondary tracking-tighter uppercase leading-none">
            Checkout <span className="text-primary italic relative">
              Bag.
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 6" preserveAspectRatio="none" height="10">
                <path d="M0 5 Q50 0 100 5" stroke="currentColor" strokeWidth="4" fill="none" className="text-primary/30" />
              </svg>
            </span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 md:gap-14 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-6">
            {cart.map((item) => (
              <div
                key={item._id}
                className="group relative flex flex-col sm:flex-row items-center gap-6 p-5 
                           bg-base-200/50 border border-base-300 rounded-[2.5rem] 
                           hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5"
              >
                {/* Image matching ProductCard Style */}
                <div className="relative w-full sm:w-44 h-44 rounded-[2rem] overflow-hidden bg-base-300">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                <div className="flex-1 space-y-4 text-center sm:text-left">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70">
                      {item.category}
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-secondary leading-tight mt-1">
                      {item.title}
                    </h3>
                  </div>
                  
                  <div className="flex items-center justify-center sm:justify-start gap-4">
                     <p className="text-2xl font-black text-secondary">
                        ${item.price}
                     </p>
                     <div className="flex items-center gap-1 bg-warning/15 px-2.5 py-1 rounded-xl">
                        <Star size={12} className="fill-warning text-warning" />
                        <span className="text-xs font-bold text-warning-content">4.9</span>
                     </div>
                  </div>

                  <div className="flex items-center justify-center sm:justify-start gap-4">
                    {/* Qty Buttons - Bold UI */}
                    <div className="flex items-center gap-2 bg-base-100 rounded-2xl p-1 border border-base-300 shadow-sm">
                      <button
                        onClick={() => updateQty(item._id, -1)}
                        className="w-10 h-10 rounded-xl hover:bg-secondary hover:text-white flex items-center justify-center text-secondary transition-all active:scale-90"
                      >
                        <Minus size={16} strokeWidth={3} />
                      </button>
                      <span className="w-8 text-center font-black text-lg text-secondary">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item._id, 1)}
                        className="w-10 h-10 rounded-xl hover:bg-primary hover:text-white flex items-center justify-center text-secondary transition-all active:scale-90"
                      >
                        <Plus size={16} strokeWidth={3} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="p-4 rounded-2xl bg-error/10 text-error hover:bg-error hover:text-white transition-all duration-300 shadow-sm active:scale-95"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sticky Summary Card */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="p-10 rounded-[3rem] bg-secondary text-neutral-content shadow-2xl relative overflow-hidden border border-white/5">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[60px] -mr-16 -mt-16" />
              
              <h2 className="text-3xl font-black mb-10 tracking-tighter uppercase italic flex items-center gap-3">
                Order Sum.
                <Sparkles size={20} className="text-primary animate-pulse" />
              </h2>
              
              <div className="space-y-6 mb-10 relative z-10">
                <div className="flex justify-between text-[11px] font-black opacity-50 uppercase tracking-[0.2em]">
                  <span>Subtotal</span>
                  <span className="text-lg text-white font-bold">${subtotal}</span>
                </div>
                <div className="flex justify-between text-[11px] font-black opacity-50 uppercase tracking-[0.2em]">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-primary font-bold" : "text-white font-bold"}>
                    {shipping === 0 ? "FREE" : `$${shipping}`}
                  </span>
                </div>
                
                <div className="h-px bg-white/10 w-full" />
                
                <div className="flex justify-between items-center pt-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Grand Total</span>
                    <span className="text-5xl font-black text-primary tracking-tighter">
                      ${total}
                    </span>
                  </div>
                </div>
              </div>
              
              <button className="btn btn-primary btn-block h-16 rounded-2xl text-white font-black uppercase tracking-widest group border-none shadow-xl shadow-primary/30 transition-all hover:scale-[1.02]">
                Check Out
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
              </button>

              {shipping !== 0 && (
                <div className="mt-8 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                   <p className="text-[11px] font-bold uppercase tracking-tighter opacity-80 mb-3">
                    Goal: <span className="text-primary">Free Shipping</span> at $500
                  </p>
                  <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-primary h-full transition-all duration-1000 shadow-[0_0_15px_rgba(var(--p),0.6)]" 
                      style={{ width: `${Math.min((subtotal/500) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-[10px] mt-3 opacity-40 font-medium tracking-tight">
                    Just ${500 - subtotal} away from free delivery
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;