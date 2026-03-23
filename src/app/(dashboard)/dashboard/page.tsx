import React from "react";
// Clock icon-ti add kora hoyeche
import {
  ShoppingBag,
  CreditCard,
  Heart,
  Package,
  Sparkles,
  Clock,
} from "lucide-react";
import { useSession } from "next-auth/react";

const DashboardPage = () => {
  
  const stats = [
    {
      label: "Total Orders",
      value: "12",
      icon: Package,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Pending",
      value: "01",
      icon: Clock,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      label: "Wishlist",
      value: "08",
      icon: Heart,
      color: "text-error",
      bg: "bg-error/10",
    },
    {
      label: "Spent",
      value: "$1,240",
      icon: CreditCard,
      color: "text-success",
      bg: "bg-success/10",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Welcome Header */}
      <div className="space-y-2">
        <span className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
          <Sparkles size={12} className="animate-pulse" />
          Welcome back
        </span>
        <h2 className="text-3xl font-black text-secondary tracking-tight">
          Account{" "}
          <span className="text-primary italic relative">
            Overview.
            <svg
              className="absolute -bottom-1 left-0 w-full"
              viewBox="0 0 100 6"
              preserveAspectRatio="none"
              height="6"
            >
              <path
                d="M0 5 Q50 0 100 5"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-primary/40"
              />
            </svg>
          </span>
        </h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="p-6 rounded-[2rem] bg-base-100 border border-base-300 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
          >
            <div
              className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
            >
              <stat.icon size={24} />
            </div>
            <p className="text-xs font-bold text-neutral/40 uppercase tracking-widest">
              {stat.label}
            </p>
            <h3 className="text-2xl font-black text-secondary mt-1">
              {stat.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Placeholder for Recent Orders */}
      <div className="rounded-[2.5rem] border border-base-300 border-dashed p-10 flex flex-col items-center justify-center text-center space-y-4 bg-base-100/50">
        <div className="w-20 h-20 rounded-full bg-base-200 flex items-center justify-center text-neutral/20 group hover:bg-primary/5 transition-colors">
          <ShoppingBag
            size={40}
            className="group-hover:text-primary/40 transition-colors"
          />
        </div>
        <div className="space-y-1">
          <h4 className="font-black text-secondary">No Recent Orders</h4>
          <p className="text-sm text-neutral/50 max-w-xs mx-auto">
            Looks like you haven't ordered anything yet. Explore our shop to
            find something you love!
          </p>
        </div>
        <button className="btn btn-primary btn-sm rounded-xl px-8 text-white shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
          Go to Shop
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
