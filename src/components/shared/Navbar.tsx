"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  ShoppingBag, Menu, X,
  Moon, Sun, Home, LayoutGrid, ShoppingCart, Info, Mail
} from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext"; // ✅ Context import kora holo

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState("light");
  const pathname = usePathname();

  const { cartCount } = useCart(); // ✅ Cart count niye asha holo
  const { data: session } = useSession();
  const user = session?.user as any;

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.setAttribute("data-theme", storedTheme);

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  const navLinks = [
    { name: "Home", href: "/", icon: <Home size={18} /> },
    { name: "Shop", href: "/explore", icon: <LayoutGrid size={18} /> },
    { name: "About", href: "/about", icon: <Info size={18} /> },
    { name: "Contract", href: "/contract", icon: <Mail size={18} /> },
    { name: "Orders", href: "/dashboard/my-orders", icon: <ShoppingBag size={18} /> },
    { name: "Cart", href: "/cart", icon: <ShoppingCart size={18} /> },
  ];

  if (!mounted) return <div className="h-[65px] sm:h-[81px] bg-base-100" />;

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        isScrolled
          ? "bg-base-100/80 backdrop-blur-xl shadow-xl py-2"
          : "bg-base-100 py-3 sm:py-4 border-b border-base-200"
      }`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary p-2 rounded-xl transition-transform group-hover:rotate-12 shadow-lg shadow-primary/20">
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-black tracking-tighter uppercase italic">
                TRENDly<span className="text-primary text-3xl sm:text-4xl">.</span>
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative flex items-center gap-2 text-sm font-bold transition-all px-4 py-2 rounded-xl ${
                    pathname === link.href
                      ? "text-primary bg-primary/5"
                      : "text-neutral/70 dark:text-white/70 hover:bg-base-200"
                  }`}
                >
                  {link.icon}
                  {link.name}

                  {/* ✅ Desktop Cart Badge */}
                  {link.name === "Cart" && cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-lg border-2 border-base-100 animate-in zoom-in duration-300">
                      {cartCount}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-3">
              {/* ✅ Mobile Cart Icon (Always visible on mobile) */}
              <Link href="/cart" className="lg:hidden relative p-2.5 rounded-xl bg-base-200 border border-base-300">
                <ShoppingCart size={20} className="text-secondary" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-base-100 shadow-md">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button
                onClick={toggleTheme}
                className="hidden sm:flex p-2.5 rounded-xl bg-base-200 border border-base-300"
              >
                {theme === "dark"
                  ? <Sun size={18} className="text-yellow-400" />
                  : <Moon size={18} className="text-primary" />}
              </button>

              {/* User Dropdown details... (no changes needed) */}
              {user ? (
                <div className="hidden lg:block dropdown dropdown-end">
                   {/* ... your existing dropdown code */}
                   <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ring-2 ring-primary/20">
                    <div className="w-9 sm:w-10 rounded-full">
                      <Image
                        alt="User"
                        src={user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                        width={40} height={40}
                      />
                    </div>
                  </div>
                  <ul tabIndex={0} className="mt-4 p-2 shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-2xl w-56 border border-base-300 z-[110]">
                    <div className="px-4 py-2 border-b border-base-200 mb-2">
                      <p className="font-black text-sm truncate">{user.name}</p>
                    </div>
                    <li><Link href="/dashboard">Dashboard</Link></li>
                    <li>
                      <button onClick={() => signOut()} className="text-error font-bold">
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="hidden lg:flex items-center gap-2">
                  <Link href="/login" className="btn btn-ghost btn-sm font-bold">Login</Link>
                  <Link href="/register" className="btn btn-primary btn-sm rounded-xl text-white px-5">Join</Link>
                </div>
              )}

              <button
                className="lg:hidden p-2 bg-base-200 rounded-lg"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer remains same... */}
      <div className={`${isScrolled ? "h-[60px] sm:h-[68px]" : "h-[65px] sm:h-[81px]"} transition-all duration-500`} />

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer panel */}
      <div className={`
        fixed top-0 right-0 h-full w-[78vw] max-w-xs z-[120]
        bg-base-100 shadow-2xl flex flex-col
        transition-transform duration-300 ease-in-out lg:hidden
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}>
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-base-200">
          <span className="text-lg font-black tracking-tighter uppercase italic">
            TRENDly<span className="text-primary text-2xl">.</span>
          </span>
          <button onClick={() => setIsOpen(false)} className="p-2 rounded-xl bg-base-200">
            <X size={20} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1 px-4 py-6 flex-1 overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                pathname === link.href
                  ? "bg-primary/10 text-primary"
                  : "text-neutral/70 hover:bg-base-200"
              }`}
            >
              <div className="flex items-center gap-3">
                {link.icon}
                {link.name}
              </div>
              
              {/* ✅ Mobile Drawer Badge */}
              {link.name === "Cart" && cartCount > 0 && (
                <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-black">
                  {cartCount}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Footer info remains same... */}
        <div className="px-4 py-5 border-t border-base-200 space-y-3">
           {/* ... your existing footer code */}
           <button
            onClick={toggleTheme}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-base-200 font-bold text-sm"
          >
            {theme === "dark"
              ? <Sun size={18} className="text-yellow-400" />
              : <Moon size={18} className="text-primary" />}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>

          {user ? (
            <>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-base-200">
                <Image
                  alt="User"
                  src={user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                  width={36} height={36}
                  className="rounded-full"
                />
                <p className="font-black text-sm truncate flex-1">{user.name}</p>
              </div>
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-base-200 font-bold text-sm"
              >
                Dashboard
              </Link>
              <button
                onClick={() => { signOut(); setIsOpen(false); }}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-error hover:bg-error/10 font-bold text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="btn btn-ghost btn-sm flex-1 font-bold"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="btn btn-primary btn-sm flex-1 rounded-xl text-white"
              >
                Join
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;