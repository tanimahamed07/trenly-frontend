import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Headset, LucideIcon } from 'lucide-react';

// ✅ icon কে JSX element না রেখে Component হিসেবে রাখো
const featureData: {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
  glowColor: string;
  borderHover: string;
  bgAccent: string;
}[] = [
  {
    icon: Truck,
    title: "Free Delivery",
    desc: "Orders over $99",
    color: "bg-primary/10 text-primary",
    glowColor: "group-hover:shadow-[0_8px_40px_oklch(45%_0.16_250/0.15)]",
    borderHover: "hover:border-[oklch(45%_0.16_250/0.4)]",
    bgAccent: "oklch(45%_0.16_250)",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    desc: "100% protected",
    color: "bg-green-500/10 text-green-600",
    glowColor: "group-hover:shadow-[0_8px_40px_rgb(16_185_129/0.15)]",
    borderHover: "hover:border-green-500/40",
    bgAccent: "rgb(16,185,129)",
  },
  {
    icon: RotateCcw,
    title: "Easy Return",
    desc: "30 days policy",
    color: "bg-orange-500/10 text-orange-600",
    glowColor: "group-hover:shadow-[0_8px_40px_rgb(249_115_22/0.15)]",
    borderHover: "hover:border-orange-500/40",
    bgAccent: "rgb(249,115,22)",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    desc: "Customer care",
    color: "bg-blue-500/10 text-blue-600",
    glowColor: "group-hover:shadow-[0_8px_40px_rgb(59_130_246/0.15)]",
    borderHover: "hover:border-blue-500/40",
    bgAccent: "rgb(59,130,246)",
  },
];

const Features = () => {
  return (
    <section className="py-16 md:py-24 bg-base-100 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="space-y-2 md:space-y-3 mb-8 md:mb-14">
          <span className="inline-flex items-center gap-2 text-[10px] md:text-xs font-black tracking-[0.2em] uppercase text-primary bg-primary/8 px-3 py-1 rounded-full border border-primary/20">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block" />
            Why Us
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-secondary tracking-tight leading-tight">
            Why{" "}
            <span className="text-primary italic relative">
              Choose Us
              <svg
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 100 6"
                preserveAspectRatio="none"
                height="6"
              >
                <path
                  d="M0 5 Q50 0 100 5"
                  stroke="oklch(45% 0.16 250)"
                  strokeWidth="2"
                  fill="none"
                  strokeOpacity="0.4"
                />
              </svg>
            </span>
          </h2>
          <p className="text-neutral/40 font-medium text-xs md:text-sm">
            Everything you need, all in one place
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {featureData.map((item, index) => {
            // ✅ Component হিসেবে use করো — cloneElement লাগবে না
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`
                  group relative overflow-hidden
                  p-4 md:p-8
                  rounded-[1.5rem] md:rounded-[2.5rem]
                  bg-base-200/40
                  border border-base-300/60
                  ${item.borderHover}
                  ${item.glowColor}
                  transition-all duration-500
                  hover:-translate-y-1
                `}
              >
                <div className="flex items-start justify-between mb-4 md:mb-8">
                  <div
                    className={`
                      w-11 h-11 md:w-16 md:h-16
                      rounded-xl md:rounded-3xl
                      ${item.color}
                      flex items-center justify-center
                      group-hover:scale-110 group-hover:-rotate-6
                      transition-transform duration-500
                      shrink-0
                    `}
                  >
                    {/* ✅ size prop সরাসরি দাও */}
                    <Icon size={20} className="md:hidden" />
                    <Icon size={28} className="hidden md:block" />
                  </div>
                </div>

                <div className="relative z-10 space-y-0.5 md:space-y-1">
                  <h3 className="text-sm md:text-xl font-black text-secondary leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[9px] md:text-xs font-bold opacity-35 uppercase tracking-widest">
                    {item.desc}
                  </p>
                </div>

                {/* Ghost icon */}
                <div className="absolute -bottom-3 -right-3 opacity-[0.04] group-hover:opacity-[0.09] group-hover:scale-110 transition-all duration-500">
                  <Icon size={100} className="hidden md:block" />
                  <Icon size={70} className="md:hidden" />
                </div>

                {/* Bottom shimmer */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
                  style={{ background: item.bgAccent, opacity: 0.5 }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;