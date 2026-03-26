"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  ShoppingCart,
  ShieldCheck,
  ShoppingBag,
  Loader2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

const CartPage = () => {
  const { cart, updateQty, removeFromCart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = subtotal > 500 || cart.length === 0 ? 0 : 15;
  const total = subtotal + shipping;

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-base-100">
        <div className="w-20 h-20 rounded-full bg-base-200 flex items-center justify-center text-primary/20 mb-6 border border-base-300">
          <ShoppingBag size={40} strokeWidth={1.5} />
        </div>
        <h2 className="text-xl font-black text-secondary uppercase tracking-tight mb-2">
          Your bag is empty
        </h2>
        <p className="text-sm text-neutral/50 mb-8 max-w-xs">
          Looks like you haven&apos;t added anything to your cart yet.
        </p>
        <Link
          href="/explore"
          className="btn btn-primary btn-md rounded-xl px-10 text-white border-none font-bold shadow-lg shadow-primary/20"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-6 md:py-20 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8 border-b border-base-300 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-xl text-primary border border-primary/20">
              <ShoppingCart size={20} />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-secondary uppercase tracking-tighter">
                Shopping Bag
              </h1>
              <p className="text-[10px] font-bold text-neutral/40 uppercase tracking-widest">
                {cart.length} {cart.length === 1 ? "Item" : "Items"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="p-3 md:p-4 rounded-2xl border border-base-300 bg-base-100 flex flex-col sm:flex-row items-center sm:items-stretch gap-4 md:gap-6 group hover:border-primary/30 transition-all duration-300 shadow-sm"
              >
                {/* Image Section - Responsive size */}
                <Link
                  href={`/explore/${item._id}`}
                  className="relative w-full sm:w-28 h-48 sm:h-auto min-h-[120px] rounded-xl overflow-hidden bg-base-200 flex-shrink-0 border border-base-300"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>

                {/* Content Section */}
                <div className="flex-1 w-full flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start mb-2">
                    <div className="space-y-1 pr-4">
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">
                        {item.category}
                      </p>
                      <Link href={`/explore/${item._id}`}>
                        <h3 className="text-sm md:text-base font-bold text-secondary line-clamp-2 hover:text-primary transition-colors leading-snug">
                          {item.title}
                        </h3>
                      </Link>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="p-2 text-neutral/30 hover:text-error hover:bg-error/5 rounded-full transition-all shrink-0"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Price and Qty controls */}
                  <div className="flex items-center justify-between mt-4 sm:mt-auto">
                    <p className="text-xl font-black text-secondary tracking-tight">
                      ${item.price}
                    </p>

                    <div className="flex items-center gap-2 border border-base-300 rounded-xl p-1 bg-base-200/50">
                      <button
                        onClick={() => updateQty(item._id, -1)}
                        className="w-8 h-8 rounded-lg hover:bg-base-100 flex items-center justify-center text-secondary transition-all active:scale-90 border border-transparent hover:border-base-300"
                      >
                        <Minus size={12} strokeWidth={3} />
                      </button>
                      <span className="text-xs font-black text-secondary px-2 min-w-[24px] text-center">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item._id, 1)}
                        className="w-8 h-8 rounded-lg hover:bg-base-100 flex items-center justify-center text-secondary transition-all active:scale-90 border border-transparent hover:border-base-300"
                      >
                        <Plus size={12} strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Box Section */}
          <div className="lg:col-span-4 sticky top-24 pb-10">
            <div className="p-6 md:p-8 rounded-3xl bg-base-200 border border-base-300 shadow-sm">
              <h2 className="text-lg font-black text-secondary uppercase tracking-tight mb-6 flex items-center gap-2">
                Order Summary
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
                  <span className="text-neutral/60">Subtotal</span>
                  <span className="text-secondary">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
                  <span className="text-neutral/60">Shipping</span>
                  <span
                    className={
                      shipping === 0
                        ? "text-success font-black"
                        : "text-secondary"
                    }
                  >
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="border-t border-dashed border-base-300 my-2 pt-4">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-neutral/40 uppercase tracking-[0.2em]">
                        Estimated Total
                      </span>
                      <p className="text-3xl font-black text-primary tracking-tighter leading-none">
                        ${total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="btn btn-primary btn-block h-14 rounded-2xl text-white font-black uppercase tracking-widest border-none group shadow-lg shadow-primary/20 hover:shadow-primary/30"
              >
                Go to Checkout
                <ArrowRight
                  size={18}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Link>

              <div className="mt-8 flex flex-col items-center gap-3">
                <div className="flex items-center gap-2 opacity-30 text-[9px] font-black uppercase tracking-widest">
                  <ShieldCheck size={12} />
                  <span>Secure 256-bit SSL Payment</span>
                </div>
                {shipping !== 0 && (
                  <p className="text-[9px] font-bold text-primary/60 uppercase text-center">
                    Add ${(500 - subtotal).toFixed(2)} more for{" "}
                    <b>FREE SHIPPING</b>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
