"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Mail, Lock, LogIn, 
  ArrowRight, Key, Eye, EyeOff,
  ShoppingBag, ShieldCheck, Zap
} from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200/50 px-4 py-20 relative overflow-hidden">
      {/* Decorative Glows (Matching Register UI) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] -z-10" />

      <div className="max-w-5xl w-full grid md:grid-cols-2 bg-base-100 rounded-[2.5rem] overflow-hidden shadow-2xl border border-base-300">
        
        {/* Visual Side: Matching Register Page's Primary Theme */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-primary relative overflow-hidden">
          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-2 mb-12 group">
              <div className="bg-white p-2 rounded-xl shadow-lg group-hover:rotate-12 transition-transform">
                <LogIn className="w-6 h-6 text-primary" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white italic">TRENDly.</span>
            </Link>
            
            <h1 className="text-4xl font-extrabold text-white leading-tight mb-6">
              Welcome <br /> 
              <span className="opacity-70 italic underline decoration-white/30">Back to</span> <br /> 
              Your Style.
            </h1>
            
            <div className="space-y-6 mt-10">
              <div className="flex items-center gap-4 text-white/90">
                <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md border border-white/10">
                  <Zap size={20} />
                </div>
                <div>
                    <p className="text-sm font-bold">Quick Re-order</p>
                    <p className="text-xs opacity-70">Access your favorite items instantly.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-white/90">
                <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md border border-white/10">
                  <ShoppingBag size={20} />
                </div>
                <div>
                    <p className="text-sm font-bold">Exclusive Dashboard</p>
                    <p className="text-xs opacity-70">Manage your orders and preferences.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-white/90">
                <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md border border-white/10">
                  <ShieldCheck size={20} />
                </div>
                <div>
                    <p className="text-sm font-bold">Data Privacy</p>
                    <p className="text-xs opacity-70">Your shopping data is always secure.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center gap-4">
             <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                <Key size={20} />
             </div>
             <div className="text-left text-white">
                <p className="text-[10px] font-bold uppercase opacity-50 tracking-widest">Security Status</p>
                <p className="text-xs font-medium">SSL Encrypted Session Active</p>
             </div>
          </div>
          
          <div className="absolute top-[-20%] right-[-20%] w-80 h-80 rounded-full bg-white/10 blur-3xl" />
        </div>

        {/* Form Side */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-base-100">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-black text-neutral dark:text-white mb-2">Sign In</h2>
            <p className="text-neutral/50 dark:text-white/50 text-sm">
              New user? <Link href="/register" className="text-primary font-bold hover:underline">Create Account</Link>
            </p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* Email Input */}
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-bold text-neutral/70 dark:text-white/70 text-xs uppercase tracking-wider">Registered Email</span>
              </label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-neutral/30 group-focus-within:text-primary transition-colors">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  placeholder="user@example.com"
                  className="input input-bordered w-full pl-11 bg-base-200/30 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all rounded-2xl outline-none"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="form-control w-full">
              <div className="flex justify-between items-center px-1">
                <label className="label py-1">
                  <span className="label-text font-bold text-neutral/70 dark:text-white/70 text-xs uppercase tracking-wider">Password</span>
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
                  className="input input-bordered w-full pl-11 pr-11 bg-base-200/30 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all rounded-2xl outline-none"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral/30 hover:text-primary transition-colors">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button className="btn btn-primary w-full h-14 rounded-2xl text-white font-black gap-2 normal-case text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all mt-4">
              Access Account <ArrowRight size={20} />
            </button>
          </form>

          {/* Demo Access (Required) */}
          <div className="divider my-8 text-neutral/20 text-[10px] font-bold uppercase tracking-[0.2em]">Demo Credentials</div>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
             <button className="btn btn-outline btn-sm border-base-300 rounded-xl text-[9px] hover:text-primary hover:border-primary uppercase font-bold flex flex-col h-auto py-2">
                <span className="opacity-50">User Access</span>
                <span>user@example.com</span>
             </button>
             <button className="btn btn-outline btn-sm border-base-300 rounded-xl text-[9px] hover:text-primary hover:border-primary uppercase font-bold flex flex-col h-auto py-2">
                <span className="opacity-50">Admin Access</span>
                <span>admin@example.com</span>
             </button>
          </div>

          <button className="btn btn-outline border-base-300 hover:bg-base-200 w-full h-14 rounded-2xl gap-3 normal-case font-bold dark:text-white transition-all">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;