"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  Moon,
  Sun,
  Home,
  LayoutGrid,
  ShoppingCart,
  UserPlus,
  LogIn,
  Info,
  Mail,
  Search,
  Heart,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState("light");
  const pathname = usePathname();

  // ইউজার স্টেট (লজিক অনুযায়ী পরে আপডেট করবেন)
  const user = { name: "Tanim", role: "admin", isLoggedIn: false };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    applyTheme(storedTheme);

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const applyTheme = (newTheme: string) => {
    setTheme(newTheme);
    const html = document.documentElement;
    html.setAttribute("data-theme", newTheme);
    if (newTheme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("theme", newTheme);
  };

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    applyTheme(nextTheme);
  };

  // ই-কমার্স রিলেটেড মিনিংফুল লিঙ্কস
  const navLinks = [
    { name: "Home", href: "/", icon: <Home size={18} /> },
    { name: "Shop", href: "/explore", icon: <LayoutGrid size={18} /> },
    { name: "About", href: "/about", icon: <Info size={18} /> }, // Info আইকন
    { name: "Contact", href: "/contact", icon: <Mail size={18} /> }, // Mail আইকন
    {
      name: "Orders",
      href: "/dashboard/my-orders",
      icon: <ShoppingBag size={18} />,
    },
    { name: "Cart", href: "/cart", icon: <ShoppingCart size={18} /> },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-base-100/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-2 rounded-xl transition-transform group-hover:rotate-12">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-neutral dark:text-white">
              TRENDly<span className="text-primary">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href
                    ? "text-primary"
                    : "text-neutral/70 dark:text-white/70"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-base-200 dark:bg-gray-800 text-neutral dark:text-white hover:scale-105 transition-all"
            >
              {theme === "dark" ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-blue-600" />
              )}
            </button>

            {/* User Auth or Profile Section */}
            {user.isLoggedIn ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar border border-primary/20"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="User"
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 dark:bg-base-200 rounded-2xl w-52 border border-base-300"
                >
                  <div className="px-4 py-2 border-b border-base-300 mb-2">
                    <p className="font-bold text-sm text-neutral dark:text-white">
                      {user.name}
                    </p>
                    <p className="text-[10px] opacity-60 uppercase font-bold text-primary">
                      {user.role}
                    </p>
                  </div>
                  <li>
                    <Link href="/dashboard">
                      <LayoutDashboard size={16} /> Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/profile">
                      <User size={16} /> Profile
                    </Link>
                  </li>
                  <li className="text-error border-t border-base-300 mt-2">
                    <button>
                      <LogOut size={16} /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="btn btn-ghost btn-sm text-neutral dark:text-white gap-2 normal-case"
                >
                  <LogIn size={18} /> Login
                </Link>
                <Link
                  href="/register"
                  className="btn btn-primary btn-sm rounded-lg gap-2 text-white normal-case"
                >
                  <UserPlus size={18} /> Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              className="p-2 text-neutral dark:text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-[300px] bg-base-100 dark:bg-base-200 shadow-2xl z-[60] transform transition-transform duration-300 lg:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-8">
            <span className="font-bold text-xl text-neutral dark:text-white">
              Menu
            </span>
            <button onClick={() => setIsOpen(false)}>
              <X size={24} className="text-neutral dark:text-white" />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 text-lg font-medium p-2 rounded-lg hover:bg-base-200 transition-colors ${pathname === link.href ? "bg-primary/10 text-primary" : "text-neutral dark:text-white/70"}`}
              >
                {link.icon} {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-auto space-y-4">
            {/* Auth Buttons for Mobile */}
            {!user.isLoggedIn && (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="btn btn-outline btn-sm rounded-xl"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="btn btn-primary btn-sm rounded-xl text-white"
                >
                  Register
                </Link>
              </div>
            )}

            <button
              onClick={toggleTheme}
              className="btn btn-ghost w-full border border-base-300 rounded-xl flex items-center gap-2 dark:text-white"
            >
              {theme === "dark" ? (
                <>
                  <Sun size={18} className="text-yellow-400" /> Light Mode
                </>
              ) : (
                <>
                  <Moon size={18} className="text-blue-600" /> Dark Mode
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
