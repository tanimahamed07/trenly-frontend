import React from "react";
import Link from "next/link";
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
  Phone,
  ArrowRight,
} from "lucide-react";

const footerLinks = {
  shop: [
    { name: "All Products", href: "/explore" },
    { name: "Electronics", href: "/explore?category=electronics" },
    { name: "Fashion", href: "/explore?category=fashion" },
    { name: "Home & Living", href: "/explore?category=home" },
  ],
  account: [
    { name: "Orders", href: "/dashboard/my-orders" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Cart", href: "/cart" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy", href: "/privacy" },
  ],
};

const socials = [
  { icon: <Instagram size={14} />, href: "#", label: "Instagram" },
  { icon: <Twitter size={14} />, href: "#", label: "Twitter" },
  { icon: <Youtube size={14} />, href: "#", label: "Youtube" },
];

const Footer = () => {
  return (
    <footer className="bg-base-200/40 border-t border-base-300/50 relative overflow-hidden">
      {/* Ambient blobs - size and blur reduced for slim look */}
      <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-[80px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Main footer grid - py-12 reduced to py-8 */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 py-8 md:py-10">
          
          {/* Brand col - col-span increased for balance */}
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

            {/* Contact info - simplified */}
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <div className="flex items-center gap-1.5 text-[10px] text-neutral/50 font-medium">
                <MapPin size={10} className="text-primary/60" />
                Dhaka
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-neutral/50 font-medium">
                <Mail size={10} className="text-primary/60" />
                hello@trendly.shop
              </div>
            </div>

            {/* Socials - smaller icons */}
            <div className="flex items-center gap-1.5 pt-0.5">
              {socials.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  className="w-7 h-7 rounded-lg bg-base-200 border border-base-300/40 hover:border-primary/30 flex items-center justify-center text-neutral/50 hover:text-primary transition-all duration-300"
                >
                  {s.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Links sections - space-y reduced */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-3">
              <h4 className="text-[10px] font-black tracking-[0.2em] uppercase text-secondary/70">
                {title}
              </h4>
              <ul className="space-y-1.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[11px] text-neutral/50 font-medium hover:text-primary transition-colors duration-200 flex items-center gap-1 group"
                    >
                      <ArrowRight
                        size={8}
                        className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                      />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-base-300/40" />

        {/* Bottom bar - more compact py-4 */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-4">
          <p className="text-[10px] text-neutral/35 font-medium">
            © {new Date().getFullYear()} Trendly.
          </p>

          <div className="flex items-center gap-0.5 bg-base-300/20 p-0.5 rounded-lg border border-base-300/30">
            {[
              { href: "/", icon: <Home size={11} />, label: "Home" },
              { href: "/explore", icon: <LayoutGrid size={11} />, label: "Shop" },
              { href: "/cart", icon: <ShoppingCart size={11} />, label: "Cart" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-1 text-[10px] font-bold text-neutral/40 hover:text-primary px-2.5 py-1 rounded-md hover:bg-base-100 transition-all duration-200"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>

          <p className="text-[10px] text-neutral/30 font-medium">
            Crafted in Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;