"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  MessageSquareText, // রিভিউ এর জন্য এটি ভালো
  User,
  Settings,
  LogOut,
  Menu,
  Bell,
  Search,
  Loader2,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // Hydration fix এর জন্য
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const user = session?.user as any;

  // Hydration Error এড়াতে mounted চেক
  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme") || "light";
    document.querySelector("html")?.setAttribute("data-theme", storedTheme);
  }, []);

  const menuItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Orders", href: "/dashboard/my-orders", icon: ShoppingBag },
    { name: "My Reviews", href: "/dashboard/my-reviews", icon: MessageSquareText }, // এখানে আইকন পরিবর্তন করা হয়েছে
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  // যদি মাউন্ট না হয়, তবে সার্ভার রেন্ডারিং এর সময় কিছু দেখাবে না (Hydration Fix)
  if (!mounted) return null;

  return (
    <div className="h-screen bg-base-100 flex overflow-hidden font-sans">
      
      {/* --- Sidebar --- */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-[150] w-72 bg-base-100 border-r border-base-200 
        transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="h-full flex flex-col p-6">
          <Link href="/" className="flex items-center gap-2 mb-10 px-2 group">
            <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic">
              TRENDly<span className="text-primary text-2xl">.</span>
            </span>
          </Link>

          <nav className="flex-1 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all
                    ${isActive ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-neutral/60 hover:bg-base-200 hover:text-secondary"}
                  `}
                >
                  <item.icon size={20} className={isActive ? "animate-pulse" : "transition-transform group-hover:scale-110"} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="mt-auto flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm text-error hover:bg-error/10 transition-all"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="h-20 bg-base-100/80 backdrop-blur-md border-b border-base-200 px-6 flex items-center justify-between z-[140] flex-shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 bg-base-200 rounded-xl"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-black text-secondary uppercase tracking-tight hidden sm:block">
              {menuItems.find((item) => item.href === pathname)?.name || "Dashboard"}
            </h1>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <div className="hidden md:flex items-center bg-base-200 rounded-xl px-4 py-2 border border-base-300 transition-all focus-within:border-primary/40">
              <Search size={18} className="text-neutral/40" />
              <input type="text" placeholder="Search..." className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-40 lg:w-60" />
            </div>

            <button className="relative p-2.5 bg-base-200 rounded-xl border border-base-300 text-secondary hover:text-primary transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-base-100"></span>
            </button>

            <div className="flex items-center gap-3 pl-3 border-l border-base-200">
              <div className="hidden text-right md:block">
                <p className="text-sm font-black text-secondary leading-none">
                  {status === "loading" ? "Loading..." : user?.name || "User"}
                </p>
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Premium Member</span>
              </div>
              <div className="w-10 h-10 rounded-xl ring-2 ring-primary/10 overflow-hidden relative border border-base-300">
                {user?.image ? (
                   <Image
                   src={user?.image}
                   alt="Avatar" fill className="object-cover"
                 />
                ) : (
                  <div className="w-full h-full bg-base-300 flex items-center justify-center font-bold text-secondary">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content Page - Scrollable Area */}
        <main className="flex-1 overflow-y-auto bg-base-200/30 scroll-smooth">
          <div className="p-6 md:p-10 min-h-full">
            {children}
          </div>
        </main>
      </div>

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