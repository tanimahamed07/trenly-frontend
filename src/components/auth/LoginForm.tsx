"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Mail, Lock, LogIn, 
  ArrowRight, Key, Eye, EyeOff,
  ShoppingBag, ShieldCheck, Zap,
  User, ShieldAlert, Briefcase
} from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200/50 px-4 py-20 relative overflow-hidden transition-colors duration-300">
      {/* Dynamic Decorative Glows - Using your Primary Blue */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] -z-10" />

      <div className="max-w-5xl w-full grid md:grid-cols-2 bg-base-100 rounded-[2.5rem] overflow-hidden shadow-2xl border border-base-300 transition-all">
        
        {/* Visual Side: Using Secondary (Slate Black) & Primary (Blue) */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-secondary text-neutral-content relative overflow-hidden">
          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-2 mb-12 group">
              <div className="bg-primary p-2 rounded-xl shadow-lg group-hover:rotate-12 transition-transform">
                <LogIn className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight italic">TRENDly.</span>
            </Link>
            
            <h1 className="text-4xl font-extrabold leading-tight mb-6">
              Welcome <br /> 
              <span className="text-primary italic underline decoration-primary/30">Back to</span> <br /> 
              Your Style.
            </h1>
            
            <div className="space-y-6 mt-10">
              <div className="flex items-center gap-4 opacity-90">
                <div className="bg-base-100/10 p-2 rounded-xl backdrop-blur-md border border-base-100/10">
                  <Zap size={20} className="text-primary" />
                </div>
                <div>
                    <p className="text-sm font-bold">Quick Re-order</p>
                    <p className="text-xs opacity-60">Access your favorite items instantly.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 opacity-90">
                <div className="bg-base-100/10 p-2 rounded-xl backdrop-blur-md border border-base-100/10">
                  <ShoppingBag size={20} className="text-primary" />
                </div>
                <div>
                    <p className="text-sm font-bold">Exclusive Dashboard</p>
                    <p className="text-xs opacity-60">Manage your orders and preferences.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 opacity-90">
                <div className="bg-base-100/10 p-2 rounded-xl backdrop-blur-md border border-base-100/10">
                  <ShieldCheck size={20} className="text-primary" />
                </div>
                <div>
                    <p className="text-sm font-bold">Data Privacy</p>
                    <p className="text-xs opacity-60">Your shopping data is always secure.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="relative z-10 bg-base-100/5 backdrop-blur-md border border-base-100/10 p-4 rounded-2xl flex items-center gap-4">
             <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <Key size={20} />
             </div>
             <div className="text-left">
                <p className="text-[10px] font-bold uppercase opacity-40 tracking-widest">Security Status</p>
                <p className="text-xs font-medium">SSL Encrypted Session Active</p>
             </div>
          </div>
          
          <div className="absolute top-[-20%] right-[-20%] w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
        </div>

        {/* Form Side */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-base-100">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-3xl font-black text-neutral mb-2">Sign In</h2>
            <p className="text-neutral/50 text-sm">
              New user? <Link href="/register" className="text-primary font-bold hover:underline">Create Account</Link>
            </p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* Email */}
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-bold text-neutral/60 text-xs uppercase tracking-wider">Registered Email</span>
              </label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-neutral/30 group-focus-within:text-primary transition-colors">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  placeholder="user@example.com"
                  className="input input-bordered w-full pl-11 bg-base-200/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all rounded-2xl outline-none text-neutral"
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control w-full">
              <div className="flex justify-between items-center px-1">
                <label className="label py-1">
                  <span className="label-text font-bold text-neutral/60 text-xs uppercase tracking-wider">Password</span>
                </label>
                <Link href="#" className="text-[10px] text-primary font-bold uppercase tracking-tighter hover:underline">Forgot?</Link>
              </div>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-neutral/30 group-focus-within:text-primary transition-colors">
                  <Lock size={18} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-11 pr-11 bg-base-200/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all rounded-2xl outline-none text-neutral"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral/30 hover:text-primary transition-colors">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button className="btn btn-primary w-full h-14 rounded-2xl text-white font-black gap-2 normal-case text-lg shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all mt-4 border-none">
              Access Account <ArrowRight size={20} />
            </button>
          </form>

          {/* Demo Access - Using Theme-consistent borders */}
          <div className="divider my-8 text-neutral/20 text-[10px] font-bold uppercase tracking-[0.2em]">Quick Demo Access</div>
          
          <div className="flex flex-col gap-2 mb-6">
             <div className="grid grid-cols-2 gap-2">
                <button className="btn btn-outline btn-sm border-base-300 rounded-xl hover:bg-base-200 hover:text-primary transition-all h-auto py-2 flex items-center gap-2 group">
                    <User size={14} className="opacity-50 group-hover:opacity-100 text-primary" />
                    <div className="flex flex-col items-start">
                        <span className="text-[8px] uppercase opacity-50 leading-none">User</span>
                        <span className="text-[10px] font-bold">Demo User</span>
                    </div>
                </button>
                <button className="btn btn-outline btn-sm border-base-300 rounded-xl hover:bg-base-200 hover:text-primary transition-all h-auto py-2 flex items-center gap-2 group">
                    <ShieldAlert size={14} className="opacity-50 group-hover:opacity-100 text-primary" />
                    <div className="flex flex-col items-start">
                        <span className="text-[8px] uppercase opacity-50 leading-none">Admin</span>
                        <span className="text-[10px] font-bold">Demo Admin</span>
                    </div>
                </button>
             </div>
             <button className="btn btn-outline btn-sm border-base-300 rounded-xl hover:bg-base-200 hover:text-primary transition-all h-auto py-2 flex items-center justify-center gap-2 group w-full">
                <Briefcase size={14} className="opacity-50 group-hover:opacity-100 text-primary" />
                <div className="flex flex-col items-start">
                    <span className="text-[8px] uppercase opacity-50 leading-none">Manager</span>
                    <span className="text-[10px] font-bold text-center">Demo Manager Access</span>
                </div>
             </button>
          </div>

          <button className="btn btn-outline border-base-300 hover:bg-base-200 w-full h-14 rounded-2xl gap-3 normal-case font-bold text-neutral transition-all">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;