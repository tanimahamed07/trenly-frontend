"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  User, Mail, Lock, UserPlus, 
  ArrowRight, ShieldCheck, Eye, EyeOff,
  ShoppingBag, Sparkles
} from "lucide-react";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200/50 px-4 py-20 relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] -z-10" />

      <div className="max-w-5xl w-full grid md:grid-cols-2 bg-base-100 rounded-[2.5rem] overflow-hidden shadow-2xl border border-base-300">
        
        {/* Visual Side: Meaningful E-commerce Content */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-primary relative overflow-hidden">
          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-2 mb-12 group">
              <div className="bg-white p-2 rounded-xl shadow-lg group-hover:rotate-12 transition-transform">
                <UserPlus className="w-6 h-6 text-primary" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white italic">TRENDly.</span>
            </Link>
            
            <h1 className="text-4xl font-extrabold text-white leading-tight mb-6">
              Unlock Your <br /> 
              <span className="opacity-70 italic underline decoration-white/30">Exclusive</span> <br /> 
              Shopping Perks.
            </h1>
            
            <div className="space-y-6 mt-10">
              <div className="flex items-center gap-4 text-white/90">
                <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md border border-white/10">
                  <ShieldCheck size={20} />
                </div>
                <div>
                    <p className="text-sm font-bold">Secure Checkout</p>
                    <p className="text-xs opacity-70">100% encrypted payment processing.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-white/90">
                <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md border border-white/10">
                  <Sparkles size={20} />
                </div>
                <div>
                    <p className="text-sm font-bold">AI Recommendations</p>
                    <p className="text-xs opacity-70">Personalized picks by Gemini AI.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-white/90">
                <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md border border-white/10">
                  <ShoppingBag size={20} />
                </div>
                <div>
                    <p className="text-sm font-bold">Member Discounts</p>
                    <p className="text-xs opacity-70">Early access to new arrivals & sales.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">Verified Platform</p>
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">v1.0.4</p>
          </div>
          
          <div className="absolute top-[-20%] right-[-20%] w-80 h-80 rounded-full bg-white/10 blur-3xl" />
        </div>

        {/* Form Side */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-base-100">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-black text-neutral dark:text-white mb-2">Create Account</h2>
            <p className="text-neutral/50 dark:text-white/50 text-sm">
              Ready to shop? <Link href="/login" className="text-primary font-bold hover:underline">Sign In Instead</Link>
            </p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* Full Name Input */}
            <div className="form-control w-full">
                <label className="label py-1">
                    <span className="label-text font-bold text-neutral/70 dark:text-white/70 text-xs uppercase tracking-wider">Full Name</span>
                </label>
                <div className="relative group">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-neutral/30 group-focus-within:text-primary transition-colors">
                    <User size={18} />
                    </span>
                    <input
                    type="text"
                    placeholder="Enter your full name"
                    className="input input-bordered w-full pl-11 bg-base-200/30 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all rounded-2xl outline-none"
                    />
                </div>
            </div>

            {/* Email Input */}
            <div className="form-control w-full">
                <label className="label py-1">
                    <span className="label-text font-bold text-neutral/70 dark:text-white/70 text-xs uppercase tracking-wider">Email Address</span>
                </label>
                <div className="relative group">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-neutral/30 group-focus-within:text-primary transition-colors">
                    <Mail size={18} />
                    </span>
                    <input
                    type="email"
                    placeholder="email@example.com"
                    className="input input-bordered w-full pl-11 bg-base-200/30 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all rounded-2xl outline-none"
                    />
                </div>
            </div>

            {/* Password Input */}
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-bold text-neutral/70 dark:text-white/70 text-xs uppercase tracking-wider">Security Password</span>
              </label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-neutral/30 group-focus-within:text-primary transition-colors">
                  <Lock size={18} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimum 6 characters"
                  className="input input-bordered w-full pl-11 pr-11 bg-base-200/30 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all rounded-2xl outline-none"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral/30 hover:text-primary transition-colors">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button className="btn btn-primary w-full h-14 rounded-2xl text-white font-black gap-2 normal-case text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all mt-4">
              Get Started Now <ArrowRight size={20} />
            </button>
          </form>

          <div className="divider my-8 text-neutral/20 text-[10px] font-bold uppercase tracking-[0.2em]">Fast Access via Google</div>

          <button className="btn btn-outline border-base-300 hover:bg-base-200 w-full h-14 rounded-2xl gap-3 normal-case font-bold dark:text-white transition-all">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;