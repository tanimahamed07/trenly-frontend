"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  ShoppingBag, Menu, X, User, LogOut, LayoutDashboard,
  Moon, Sun, Home, LayoutGrid, ShoppingCart, UserPlus,
  LogIn, Info, Mail,
} from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState("light");
  const pathname = usePathname();

  const { data: session, status } = useSession();
  const user = session?.user as any; // Role এক্সেস করার জন্য কাস্টিং

  useEffect(() => {
    // থিম হ্যান্ডলিং
    const storedTheme = localStorage.getItem("theme") || "light";
    applyTheme(storedTheme);

    // স্ক্রল ডিটেকশন
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const applyTheme = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    applyTheme(nextTheme);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  const navLinks = [
    { name: "Home", href: "/", icon: <Home size={18} /> },
    { name: "Shop", href: "/explore", icon: <LayoutGrid size={18} /> },
    { name: "Orders", href: "/dashboard/my-orders", icon: <ShoppingBag size={18} /> },
    { name: "Cart", href: "/cart", icon: <ShoppingCart size={18} /> },
  ];

  return (
    <>
      {/* পরিবর্তন: 'sticky top-0' ব্যবহার করা হয়েছে যাতে এটি জায়গা দখল করে রাখে।
         শুরুতে 'bg-base-100' রাখা হয়েছে যাতে স্বচ্ছতার কারণে নিচের কন্টেন্ট নেভবারের ভেতরে না দেখায়।
      */}
      <nav className={`sticky top-0 w-full z-[100] transition-all duration-300 ${
        isScrolled 
        ? "bg-base-100/80 backdrop-blur-md shadow-md py-2" 
        : "bg-base-100 py-4 border-b border-base-200"
      }`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary p-2 rounded-xl transition-transform group-hover:rotate-12 shadow-lg shadow-primary/20">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-neutral dark:text-white uppercase italic">
                TRENDly<span className="text-primary text-4xl">.</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={`flex items-center gap-2 text-sm font-bold transition-all hover:text-primary px-3 py-2 rounded-lg hover:bg-primary/5 ${
                    pathname === link.href ? "text-primary bg-primary/5" : "text-neutral/70 dark:text-white/70"
                  }`}
                >
                  {link.icon}{link.name}
                </Link>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme} 
                className="p-2.5 rounded-xl bg-base-200 dark:bg-gray-800 text-neutral dark:text-white hover:scale-105 transition-all border border-base-300 dark:border-gray-700"
              >
                {theme === "dark" ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-primary" />}
              </button>

              {/* User Auth */}
              {status === "loading" ? (
                <div className="w-10 h-10 rounded-full bg-base-300 animate-pulse" />
              ) : user ? (
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ring-2 ring-primary/20 ring-offset-2 ring-offset-base-100">
                    <div className="w-10 rounded-full">
                      <Image 
                        alt="User" 
                        src={user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                        width={40} 
                        height={40} 
                      />
                    </div>
                  </div>
                  <ul tabIndex={0} className="mt-4 p-2 shadow-2xl menu menu-sm dropdown-content bg-base-100 dark:bg-base-200 rounded-2xl w-60 border border-base-300 z-[110]">
                    <div className="px-4 py-3 border-b border-base-200 mb-2">
                      <p className="font-black text-sm text-neutral dark:text-white truncate">{user.name}</p>
                      <p className="text-[10px] opacity-60 uppercase font-black text-primary tracking-widest">{user.role}</p>
                    </div>
                    <li><Link href="/dashboard" className="py-2.5"><LayoutDashboard size={18} /> Dashboard</Link></li>
                    <li><Link href="/dashboard/profile" className="py-2.5"><User size={18} /> Profile</Link></li>
                    <li className="text-error border-t border-base-200 mt-2">
                      <button onClick={handleLogout} className="py-2.5 font-bold"><LogOut size={18} /> Logout</button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login" className="btn btn-ghost btn-sm font-bold text-neutral dark:text-white normal-case px-4">
                    Login
                  </Link>
                  <Link href="/register" className="btn btn-primary btn-sm rounded-xl font-bold text-white normal-case px-6 shadow-lg shadow-primary/20">
                    Join Now
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
               <button 
                  onClick={toggleTheme} 
                  className="p-2 rounded-lg bg-base-200 dark:bg-gray-800"
                >
                  {theme === "dark" ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} />}
                </button>
              <button 
                className="p-2 text-neutral dark:text-white bg-base-200 dark:bg-gray-800 rounded-lg" 
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-secondary/20 backdrop-blur-sm z-[110] lg:hidden" 
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <div className={`fixed inset-y-0 right-0 w-[280px] bg-base-100 dark:bg-base-200 shadow-2xl z-[120] transform transition-transform duration-500 ease-in-out lg:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-10">
              <span className="font-black text-2xl text-neutral dark:text-white italic tracking-tighter">MENU.</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 bg-base-200 dark:bg-gray-800 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-4 text-base font-bold p-4 rounded-2xl transition-all ${
                    pathname === link.href 
                    ? "bg-primary text-white shadow-lg shadow-primary/30" 
                    : "text-neutral/70 dark:text-white/70 hover:bg-base-200"
                  }`}
                >
                  {link.icon} {link.name}
                </Link>
              ))}
            </div>

            <div className="mt-auto space-y-4 pt-6 border-t border-base-200">
              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setIsOpen(false)} className="btn btn-ghost w-full justify-start gap-3 rounded-2xl">
                    <LayoutDashboard size={18} /> Dashboard
                  </Link>
                  <button onClick={handleLogout} className="btn btn-error btn-outline w-full rounded-2xl gap-3">
                    <LogOut size={18} /> Logout
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  <Link href="/login" onClick={() => setIsOpen(false)} className="btn btn-outline border-base-300 w-full rounded-2xl">Login</Link>
                  <Link href="/register" onClick={() => setIsOpen(false)} className="btn btn-primary w-full rounded-2xl text-white">Register</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;