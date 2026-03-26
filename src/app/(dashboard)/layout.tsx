"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  MessageSquareText,
  User,
  Settings,
  LogOut,
  Menu,
  Bell,
  Search,
  Users,
  PackageSearch,
  ClipboardList,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const user = session?.user as any;
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme") || "light";
    document.querySelector("html")?.setAttribute("data-theme", storedTheme);
  }, []);

  const commonTopLinks = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  ];

  const adminLinks = [
    { name: "Manage Users", href: "/dashboard/manage-users", icon: Users },
    {
      name: "Manage Products",
      href: "/dashboard/manage-products",
      icon: PackageSearch,
    },
    {
      name: "Manage Orders",
      href: "/dashboard/manage-orders",
      icon: ClipboardList,
    },
  ];

  const userLinks = [
    { name: "My Orders", href: "/dashboard/my-orders", icon: ShoppingBag },
    {
      name: "My Reviews",
      href: "/dashboard/my-reviews",
      icon: MessageSquareText,
    },
  ];

  const commonBottomLinks = [
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const allLinks = [
    ...commonTopLinks,
    ...adminLinks,
    ...userLinks,
    ...commonBottomLinks,
  ];
  const currentPageName =
    allLinks.find((item) => item.href === pathname)?.name || "Dashboard";

  if (!mounted) return null;

  const NavLink = ({ item }: { item: any }) => {
    const isActive = pathname === item.href;
    return (
      <Link
        href={item.href}
        onClick={() => setIsSidebarOpen(false)}
        className={`
          flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all mb-1
          ${isActive ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-neutral/60 hover:bg-base-200 hover:text-secondary"}
        `}
      >
        <item.icon size={20} className={isActive ? "animate-pulse" : ""} />
        {item.name}
      </Link>
    );
  };

  return (
    <div className="h-screen bg-base-100 flex overflow-hidden font-sans">
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

          <nav className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            {/* Common Overview */}
            <div>
              {commonTopLinks.map((item) => (
                <NavLink key={item.name} item={item} />
              ))}
            </div>

            {/* Conditional Rendering: Admin links OR User links */}
            {isAdmin ? (
              <div className="pt-2">
                <p className="px-4 mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                  Admin Control
                </p>
                {adminLinks.map((item) => (
                  <NavLink key={item.name} item={item} />
                ))}
              </div>
            ) : (
              <div className="pt-2">
                <p className="px-4 mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-neutral/40">
                  Personal Space
                </p>
                {userLinks.map((item) => (
                  <NavLink key={item.name} item={item} />
                ))}
              </div>
            )}

            {/* Common Bottom Section */}
            <div className="pt-2 border-t border-base-200 mt-4">
              <p className="px-4 mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-neutral/40">
                Account Settings
              </p>
              {commonBottomLinks.map((item) => (
                <NavLink key={item.name} item={item} />
              ))}
            </div>
          </nav>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="mt-6 flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm text-error hover:bg-error/10 transition-all"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-base-100/80 backdrop-blur-md border-b border-base-200 px-6 flex items-center justify-between z-[140]">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 bg-base-200 rounded-xl"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-black text-secondary uppercase tracking-tight hidden sm:block">
              {currentPageName}
            </h1>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <button className="relative p-2.5 bg-base-200 rounded-xl border border-base-300">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-base-100"></span>
            </button>

            <div className="flex items-center gap-3 pl-3 border-l border-base-200">
              <div className="hidden text-right md:block">
                <p className="text-sm font-black text-secondary leading-none">
                  {status === "loading" ? "Loading..." : user?.name || "User"}
                </p>
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                  {isAdmin ? "Administrator" : "Premium Member"}
                </span>
              </div>
              <Link href={'/dashboard/profile'} className="w-10 h-10 rounded-xl ring-2 ring-primary/10 overflow-hidden relative border border-base-300 bg-base-300">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt="Avatar"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-secondary text-lg">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                )}
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-base-200/30 scroll-smooth">
          <div className="p-2 md:p-10 min-h-full">{children}</div>
        </main>
      </div>

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
