"use client";

import React, { useState, useEffect } from "react"; // useEffect add kora hoyeche
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  User,
  Settings,
  LogOut,
  Menu,
  Bell,
  Search,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState("light"); // Theme state add kora hoyeche
  const pathname = usePathname();
  const { data: session } = useSession();
  console.log("====================>", session);

  const user = session?.user as any;

  // Duibar useSession call kora chilo, seta bad deya hoyeche

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.querySelector("html")?.setAttribute("data-theme", storedTheme);
  }, []);

  // Theme handle korar logic thik kora hoyeche
  const handleTheme = (checked: boolean) => {
    const newTheme = checked ? "dark" : "light";
    setTheme(newTheme);
    const html = document.querySelector("html");
    html?.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const menuItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Orders", href: "/dashboard/my-orders", icon: ShoppingBag },
    { name: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-base-100 flex transition-colors duration-300">
      {/* --- Sidebar --- */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-[150] w-72 bg-base-100 border-r border-base-200 
        transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="h-full flex flex-col p-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-10 px-2 group">
            <div className="bg-primary p-2 rounded-xl transition-transform group-hover:rotate-12 shadow-lg shadow-primary/20">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic">
              TRENDly<span className="text-primary text-2xl">.</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all group
                    ${
                      isActive
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "text-neutral/60 hover:bg-base-200 hover:text-secondary"
                    }
                  `}
                >
                  <item.icon
                    size={20}
                    className={`${isActive ? "animate-pulse" : "group-hover:scale-110 transition-transform"}`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <button
            onClick={() => signOut()}
            className="mt-auto flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm text-error hover:bg-error/10 transition-all"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-base-100/80 backdrop-blur-md border-b border-base-200 px-6 flex items-center justify-between sticky top-0 z-[140]">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 bg-base-200 rounded-xl"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-black text-secondary uppercase tracking-tight hidden sm:block">
              {menuItems.find((item) => item.href === pathname)?.name ||
                "Dashboard"}
            </h1>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            {/* Search - Desktop */}
            <div className="hidden md:flex items-center bg-base-200 rounded-xl px-4 py-2 border border-base-300 focus-within:border-primary/50 transition-all">
              <Search size={18} className="text-neutral/40" />
              <input
                type="text"
                placeholder="Search orders..."
                className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-40 lg:w-60"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2.5 bg-base-200 rounded-xl border border-base-300 text-secondary hover:text-primary transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-base-100"></span>
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-3 border-l border-base-200">
              <div className="hidden text-right md:block">
                <p className="text-sm font-black text-secondary leading-none">
                  {user?.name || "User"}
                </p>
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                  Premium Member
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl ring-2 ring-primary/10 overflow-hidden relative">
                <Image
                  src={
                    user?.image ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`
                  }
                  alt="Avatar"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content Page */}
        <div className="p-6 md:p-10 flex-1 bg-base-200/30 overflow-y-auto">
          {children}
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[145] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
