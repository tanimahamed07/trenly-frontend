"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  ShoppingBag,
  LayoutGrid,
  Home,
  ShoppingCart,
  Mail,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  ArrowRight,
} from "lucide-react";

const Footer = () => {
  const { data: session } = useSession();
  const user = session?.user as any;
  const isAdmin = user?.role === "admin";

  const footerLinks = {
    shop: [
      { name: "All Products", href: "/explore" },
      { name: "Electronics", href: "/explore?category=electronics" },
      { name: "Fashion", href: "/explore?category=fashion" },
    ],
    account: isAdmin 
      ? [
          { name: "Manage Users", href: "/dashboard/manage-users" },
          { name: "Manage Products", href: "/dashboard/manage-products" },
          { name: "Dashboard", href: "/dashboard" },
        ]
      : [
          { name: "My Orders", href: "/dashboard/my-orders" },
          { name: "Cart", href: "/cart" },
          { name: "Dashboard", href: "/dashboard" },
        ],
    company: [
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contract" },
      { name: "Privacy", href: "/privacy" },
    ],
  };

  return (
    <footer className="bg-base-200/40 border-t border-base-300/50 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-[80px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 py-8 md:py-10">
          <div className="col-span-2 space-y-3">
            <Link href="/" className="inline-flex items-center gap-1.5 group">
              <div className="bg-primary p-1 rounded-lg transition-transform group-hover:rotate-6">
                <ShoppingBag className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-base font-black tracking-tighter uppercase italic">
                TRENDly<span className="text-primary text-xl">.</span>
              </span>
            </Link>
            <p className="text-[11px] text-neutral/40 font-medium leading-relaxed max-w-[180px]">
              Trending products across every category in one place.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <div className="flex items-center gap-1.5 text-[10px] text-neutral/50 font-medium"><MapPin size={10} className="text-primary/60" /> Dhaka</div>
              <div className="flex items-center gap-1.5 text-[10px] text-neutral/50 font-medium"><Mail size={10} className="text-primary/60" /> hello@trendly.shop</div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-3">
              <h4 className="text-[10px] font-black tracking-[0.2em] uppercase text-secondary/70">{title}</h4>
              <ul className="space-y-1.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-[11px] text-neutral/50 font-medium hover:text-primary transition-colors duration-200 flex items-center gap-1 group">
                      <ArrowRight size={8} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="h-px bg-base-300/40" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-4 text-[10px] text-neutral/35 font-medium">
          <p>© {new Date().getFullYear()} Trendly.</p>
          <div className="flex items-center gap-0.5 bg-base-300/20 p-0.5 rounded-lg border border-base-300/30">
            <Link href="/" className="px-2.5 py-1 hover:text-primary transition-all flex items-center gap-1"><Home size={11} /> Home</Link>
            <Link href="/explore" className="px-2.5 py-1 hover:text-primary transition-all flex items-center gap-1"><LayoutGrid size={11} /> Shop</Link>
            {!isAdmin && <Link href="/cart" className="px-2.5 py-1 hover:text-primary transition-all flex items-center gap-1"><ShoppingCart size={11} /> Cart</Link>}
          </div>
          <p>Crafted in Bangladesh</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;