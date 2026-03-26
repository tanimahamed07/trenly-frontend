"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  ShoppingBag,
  Menu,
  X,
  Moon,
  Sun,
  Home,
  LayoutGrid,
  ShoppingCart,
  Info,
  Mail,
  Users,
  PackageSearch,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState("light");
  const pathname = usePathname();

  const { cartCount } = useCart();
  const { data: session } = useSession();
  const user = session?.user as any;
  const userRole = user?.role;

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
    return () => {
      document.body.style.overflow = "";
    };
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

  const navLinks = useMemo(() => {
    const links = [
      { name: "Home", href: "/", icon: <Home size={18} /> },
      { name: "Shop", href: "/explore", icon: <LayoutGrid size={18} /> },
      { name: "About", href: "/about", icon: <Info size={18} /> },
      { name: "Contract", href: "/contract", icon: <Mail size={18} /> },
    ];

    if (userRole === "admin") {
      links.push(
        { name: "Manage Users", href: "/dashboard/manage-users", icon: <Users size={18} /> },
        { name: "Manage Products", href: "/dashboard/manage-products", icon: <PackageSearch size={18} /> },
      );
    } else if (userRole === "user") {
      links.push(
        { name: "My Orders", href: "/dashboard/my-orders", icon: <ShoppingBag size={18} /> },
      );
    }
    return links;
  }, [userRole]);

  if (!mounted) return <div className="h-[65px] sm:h-[81px] bg-base-100" />;

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled ? "bg-base-100/80 backdrop-blur-xl shadow-xl py-2" : "bg-base-100 py-3 sm:py-4 border-b border-base-200"}`}>
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
                <Link key={link.name} href={link.href} className={`relative flex items-center gap-2 text-sm font-bold transition-all px-4 py-2 rounded-xl ${pathname === link.href ? "text-primary bg-primary/5" : "text-neutral/70 dark:text-white/70 hover:bg-base-200"}`}>
                  {link.icon} {link.name}
                </Link>
              ))}
              {/* ✅ Desktop Cart (Text Style) */}
              <Link href="/cart" className={`relative flex items-center gap-2 text-sm font-bold transition-all px-4 py-2 rounded-xl ${pathname === '/cart' ? "text-primary bg-primary/5" : "text-neutral/70 dark:text-white/70 hover:bg-base-200"}`}>
                <ShoppingCart size={18} /> Cart
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-lg border-2 border-base-100 animate-in zoom-in duration-300">{cartCount}</span>
                )}
              </Link>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-3">
              {/* ✅ Minimal Mobile Cart (Hidden on Desktop) */}
              <Link href="/cart" className="lg:hidden relative p-2 text-neutral/70 hover:text-primary transition-colors">
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-primary text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button onClick={toggleTheme} className="hidden sm:flex p-2.5 rounded-xl bg-base-200 border border-base-300">
                {theme === "dark" ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-primary" />}
              </button>

              {user ? (
                <div className="hidden lg:block dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ring-2 ring-primary/20">
                    <div className="w-10 rounded-full">
                      <Image alt="User" src={user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} width={40} height={40} />
                    </div>
                  </div>
                  <ul tabIndex={0} className="mt-4 p-2 shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-2xl w-56 border border-base-300 z-[110]">
                    <div className="px-4 py-2 border-b border-base-200 mb-2">
                      <p className="font-black text-sm truncate">{user.name}</p>
                      <span className="badge badge-primary badge-xs font-bold uppercase">{userRole}</span>
                    </div>
                    <li><Link href="/dashboard">Dashboard</Link></li>
                    <li><button onClick={() => signOut()} className="text-error font-bold">Logout</button></li>
                  </ul>
                </div>
              ) : (
                <div className="hidden lg:flex items-center gap-2">
                  <Link href="/login" className="btn btn-ghost btn-sm font-bold">Login</Link>
                  <Link href="/register" className="btn btn-primary btn-sm rounded-xl text-white px-5">Join</Link>
                </div>
              )}

              <button className="lg:hidden p-2 bg-base-200 rounded-lg text-secondary" onClick={() => setIsOpen(true)}>
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-[150] lg:hidden transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        <div className="absolute inset-0 bg-secondary/20 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
        <div className={`absolute top-0 right-0 h-full w-[80%] max-w-sm bg-base-100 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
          
          <div className="flex items-center justify-between px-6 py-5 border-b border-base-200">
            <span className="text-lg font-black tracking-tighter uppercase italic">TRENDly<span className="text-primary text-2xl">.</span></span>
            <div className="flex items-center gap-2">
              <button onClick={toggleTheme} className="p-2.5 rounded-xl bg-base-200 border border-base-300">
                {theme === "dark" ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-primary" />}
              </button>
              <button onClick={() => setIsOpen(false)} className="p-2.5 rounded-xl bg-base-200"><X size={20} /></button>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
            <p className="px-4 text-[10px] font-black uppercase tracking-widest text-neutral/40 mb-2">Menu</p>
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${pathname === link.href ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-neutral/70 hover:bg-base-200"}`}>
                {link.icon} {link.name}
              </Link>
            ))}
            {user && (
              <Link href="/dashboard" className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${pathname === "/dashboard" ? "bg-primary text-white" : "text-neutral/70 hover:bg-base-200"}`}>
                <LayoutDashboard size={18} /> Dashboard
              </Link>
            )}
          </nav>

          <div className="p-4 border-t border-base-200 bg-base-200/50">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-base-100 rounded-2xl border border-base-300">
                  <div className="avatar ring-2 ring-primary/10 rounded-full">
                    <div className="w-10 rounded-full">
                      <Image alt="User" src={user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} width={40} height={40} />
                    </div>
                  </div>
                  <div className="flex flex-col truncate">
                    <p className="font-black text-sm truncate">{user.name}</p>
                    <span className="text-[10px] font-bold uppercase text-primary">{userRole}</span>
                  </div>
                </div>
                <button onClick={() => signOut()} className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-error/10 text-error font-bold text-xs uppercase tracking-widest border border-error/20">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link href="/login" className="btn btn-ghost w-full font-black">Login</Link>
                <Link href="/register" className="btn btn-primary w-full rounded-2xl text-white font-black">Join Now</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`${isScrolled ? "h-[60px] sm:h-[68px]" : "h-[65px] sm:h-[81px]"} transition-all duration-500`} />
    </>
  );
};

export default Navbar;