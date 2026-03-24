"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  ArrowRight,
  Lock,
  Phone,
  User,
  Loader2,
  Home,
  ShoppingBag,
  MapPin,
  ShieldCheck,
  PackageCheck,
} from "lucide-react";
import { toast } from "sonner";

const CheckoutPage = () => {
  const { cart, clearCart, isLoaded } = useCart();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = subtotal > 500 || cart.length === 0 ? 0 : 15;
  const total = subtotal + shipping;

  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    phone: "",
    address: "",
  });

  // Hydration Fix
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && status === "unauthenticated") {
      toast.error("Please login to place an order");
      router.push("/login?redirect=/checkout");
    }

    if (status === "authenticated" && session?.user) {
      setShippingDetails((prev) => ({
        ...prev,
        fullName: session.user?.name || "",
      }));
    }
  }, [status, router, session, mounted]);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = session?.user?.accessToken;

    if (!token) {
      toast.error("Your session has expired. Please login again.");
      return router.push("/login");
    }

    setLoading(true);

    try {
      const orderPromises = cart.map((item) => {
        const payload = {
          itemId: item._id, 
          quantity: item.qty,
          price: item.price * item.qty,
          shippingAddress: {
            fullName: shippingDetails.fullName,
            phone: shippingDetails.phone,
            address: shippingDetails.address,
          },
        };

        return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bookings`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      });

      const responses = await Promise.all(orderPromises);
      const allOk = responses.every((res) => res.ok);

      if (allOk) {
        toast.success("Order confirmed successfully! 🎉");
        clearCart();
        router.push("/dashboard/my-orders");
      } else {
        const errorResponse = responses.find(res => !res.ok);
        const errorData = await errorResponse?.json();
        toast.error(errorData?.message || "Failed to process order.");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      toast.error("Server connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted || status === "loading" || !isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center bg-base-100">
        <div className="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center text-primary/20 mb-6 border border-base-300">
          <ShoppingBag size={32} strokeWidth={1.5} />
        </div>
        <h2 className="text-xl font-black text-secondary uppercase tracking-tight mb-2">Your bag is empty</h2>
        <button
          onClick={() => router.push("/explore")}
          className="btn btn-primary btn-sm rounded-lg px-8 text-neutral-content border-none font-bold"
        >
          Explore Shop
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-12 md:py-20 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-10 border-b border-base-300 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-lg text-primary border border-primary/20">
              <Lock size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-secondary uppercase tracking-tighter">Secure Checkout</h1>
              <p className="text-[10px] font-bold text-neutral/40 uppercase tracking-widest">Complete your purchase</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Shipping Form Side */}
          <div className="lg:col-span-7">
            <div className="p-6 md:p-10 rounded-2xl bg-base-100 border border-base-300 shadow-sm">
              <div className="flex items-center gap-2 mb-8 border-b border-base-300 pb-4">
                <MapPin size={16} className="text-primary" />
                <h2 className="text-base font-black text-secondary uppercase tracking-tight">Delivery Information</h2>
              </div>

              <form onSubmit={handlePlaceOrder} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-secondary/60 ml-1">Full Name</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/30 group-focus-within:text-primary transition-colors" size={16} />
                      <input
                        required
                        type="text"
                        placeholder="e.g. Tanim Ahamed"
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-base-200/50 border border-base-300 focus:border-primary focus:bg-base-100 focus:outline-none transition-all text-sm font-bold text-secondary"
                        value={shippingDetails.fullName}
                        onChange={(e) => setShippingDetails({ ...shippingDetails, fullName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-secondary/60 ml-1">Phone Number</label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/30 group-focus-within:text-primary transition-colors" size={16} />
                      <input
                        required
                        type="tel"
                        placeholder="01XXXXXXXXX"
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-base-200/50 border border-base-300 focus:border-primary focus:bg-base-100 focus:outline-none transition-all text-sm font-bold text-secondary"
                        value={shippingDetails.phone}
                        onChange={(e) => setShippingDetails({ ...shippingDetails, phone: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-secondary/60 ml-1">Shipping Address</label>
                  <div className="relative group">
                    <Home className="absolute left-4 top-4 text-neutral/30 group-focus-within:text-primary transition-colors" size={16} />
                    <textarea
                      required
                      placeholder="Street name, City, Area (e.g. Dhaka, Bangladesh)"
                      className="w-full pl-11 pr-4 py-4 rounded-xl bg-base-200/50 border border-base-300 focus:border-primary focus:bg-base-100 focus:outline-none transition-all text-sm font-bold text-secondary min-h-[120px] resize-none"
                      value={shippingDetails.address}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex gap-3 items-start">
                  <ShieldCheck size={18} className="text-primary mt-0.5 shrink-0" />
                  <p className="text-[11px] font-medium text-secondary/70 leading-relaxed">
                    By placing this order, you agree to our Terms of Service. Your data is encrypted and secure.
                  </p>
                </div>

                <button
                  disabled={loading}
                  className="btn btn-primary btn-block h-14 rounded-xl text-neutral-content font-bold uppercase tracking-widest border-none group mt-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <>Confirm Order <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" /></>}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary Side */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="p-8 rounded-2xl bg-base-200 border border-base-300 shadow-sm">
              <h2 className="text-lg font-black text-secondary uppercase tracking-tight mb-6 flex items-center gap-2">
                <PackageCheck size={20} className="text-primary" />
                Items In Order
              </h2>

              <div className="space-y-1 mb-8 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item._id} className="flex items-center gap-4 py-4 border-b border-base-300 last:border-0 group">
                    <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-base-100 shrink-0 border border-base-300">
                      <Image src={item.image} alt={item.title} fill className="object-cover transition-transform group-hover:scale-110" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-black text-secondary truncate uppercase tracking-tight group-hover:text-primary transition-colors">{item.title}</h4>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-[10px] font-bold text-neutral/40 uppercase tracking-widest">Qty: {item.qty}</p>
                        <p className="text-sm font-black text-secondary">${(item.price * item.qty).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
                  <span className="text-neutral/60">Subtotal</span>
                  <span className="text-secondary">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
                  <span className="text-neutral/60">Shipping</span>
                  <span className={shipping === 0 ? "text-success font-black" : "text-secondary"}>
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="border-t border-dashed border-base-300 my-2 pt-4">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-neutral/40 uppercase tracking-[0.2em]">Total Amount</span>
                      <p className="text-3xl font-black text-primary tracking-tighter leading-none">
                        ${total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center gap-2 opacity-30 text-[9px] font-black uppercase tracking-widest">
                <ShieldCheck size={12} />
                <span>Verified Secure Payment</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;