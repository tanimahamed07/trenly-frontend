"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation"; // useSearchParams যোগ করা হয়েছে
import {
  Mail,
  Lock,
  LogIn,
  ArrowRight,
  Key,
  Eye,
  EyeOff,
  ShieldCheck,
  Zap,
  User,
  ShieldAlert,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // searchParams ইনিশিয়ালাইজ করা হয়েছে
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Input States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ইউআরএল থেকে redirect পাথ নেওয়া, না থাকলে হোম পেজ (/)
  const callbackUrl = searchParams.get("redirect") || "/";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password. Please try again.");
      } else {
        setSuccess("Welcome back to TRENDly!");
        // নির্ধারিত callbackUrl-এ রিডাইরেক্ট করা
        setTimeout(() => {
          router.push(callbackUrl);
          router.refresh();
        }, 1500);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Google login failed", error);
      setError("Google login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200/50 px-4 py-20 relative overflow-hidden transition-colors duration-300">
      {/* Decorative Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] -z-10" />

      <div className="max-w-5xl w-full grid md:grid-cols-2 bg-base-100 rounded-[2.5rem] overflow-hidden shadow-2xl border border-base-300 transition-all">
        {/* Visual Side */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-secondary text-neutral-content relative overflow-hidden">
          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-2 mb-12 group">
              <div className="bg-primary p-2 rounded-xl shadow-lg group-hover:rotate-12 transition-transform">
                <LogIn className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight italic">
                TRENDly.
              </span>
            </Link>

            <h1 className="text-4xl font-extrabold leading-tight mb-6">
              Welcome <br />
              <span className="text-primary italic underline decoration-primary/30">
                Back to
              </span>{" "}
              <br />
              Your Style.
            </h1>

            <div className="space-y-6 mt-10">
              <div className="flex items-center gap-4 opacity-90">
                <div className="bg-base-100/10 p-2 rounded-xl border border-base-100/10">
                  <Zap size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold">Quick Re-order</p>
                  <p className="text-xs opacity-60">
                    Access your favorite items instantly.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 opacity-90">
                <div className="bg-base-100/10 p-2 rounded-xl border border-base-100/10">
                  <ShieldCheck size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold">Data Privacy</p>
                  <p className="text-xs opacity-60">
                    Your shopping data is always secure.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 bg-base-100/5 backdrop-blur-md border border-base-100/10 p-4 rounded-2xl flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <Key size={20} />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-bold uppercase opacity-40 tracking-widest">
                Security Status
              </p>
              <p className="text-xs font-medium">
                SSL Encrypted Session Active
              </p>
            </div>
          </div>

          <div className="absolute top-[-20%] right-[-20%] w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
        </div>

        {/* Form Side */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-base-100">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-3xl font-black text-neutral mb-2">Sign In</h2>
            <p className="text-neutral/50 text-sm">
              New user?{" "}
              <Link
                href="/register"
                className="text-primary font-bold hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>

          {/* Feedback Messages */}
          {error && (
            <div className="flex items-center gap-2 p-3 mb-4 bg-error/10 text-error rounded-xl text-sm font-bold border border-error/20 animate-in fade-in zoom-in duration-300">
              <AlertCircle size={18} /> {error}
            </div>
          )}
          {success && (
            <div className="flex items-center gap-2 p-3 mb-4 bg-success/10 text-success rounded-xl text-sm font-bold border border-success/20 animate-in fade-in zoom-in duration-300">
              <CheckCircle2 size={18} /> {success}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-bold text-neutral/60 text-xs uppercase tracking-wider">
                  Registered Email
                </span>
              </label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-neutral/30 group-focus-within:text-primary transition-colors">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="input input-bordered w-full pl-11 bg-base-200/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all rounded-2xl outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control w-full">
              <div className="flex justify-between items-center px-1">
                <label className="label py-1">
                  <span className="label-text font-bold text-neutral/60 text-xs uppercase tracking-wider">
                    Password
                  </span>
                </label>
                <Link
                  href="#"
                  className="text-[10px] text-primary font-bold uppercase tracking-tighter hover:underline"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-neutral/30 group-focus-within:text-primary transition-colors">
                  <Lock size={18} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-11 pr-11 bg-base-200/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all rounded-2xl outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral/30 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              disabled={loading}
              className={`btn btn-primary w-full h-14 rounded-2xl text-white font-black gap-2 normal-case text-lg shadow-xl shadow-primary/20 transition-all mt-4 border-none ${loading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.01] active:scale-95"}`}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <>
                  <p>Access Account</p> <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Updated Demo Access - Manager Removed */}
          <div className="divider my-8 text-neutral/20 text-[10px] font-bold uppercase tracking-[0.2em]">
            Quick Demo Access
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => {
                setEmail("user@gmail.com");
                setPassword("111111");
              }}
              className="btn btn-outline border-base-300 rounded-xl hover:bg-base-200 hover:text-primary transition-all h-auto py-3 flex flex-col items-center gap-1 group"
            >
              <User
                size={16}
                className="text-primary opacity-50 group-hover:opacity-100"
              />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Demo User
              </span>
            </button>
            <button
              onClick={() => {
                setEmail("admin@gmail.com");
                setPassword("111111");
              }}
              className="btn btn-outline border-base-300 rounded-xl hover:bg-base-200 hover:text-primary transition-all h-auto py-3 flex flex-col items-center gap-1 group"
            >
              <ShieldAlert
                size={16}
                className="text-primary opacity-50 group-hover:opacity-100"
              />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Demo Admin
              </span>
            </button>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline border-base-300 hover:bg-base-200 w-full h-14 rounded-2xl gap-3 normal-case font-bold text-neutral transition-all"
          >
            <Image
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              width={20}
              height={20}
              alt="Google"
              className="w-5 h-5"
            />
            Sign With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
