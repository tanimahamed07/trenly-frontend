import React from "react";
import { Github, Linkedin, Twitter, ArrowRight } from "lucide-react";
import Link from "next/link";

const team = [
  {
    name: "Anika Rahman",
    role: "Co-Founder & CEO",
    bio: "Visionary behind Trendly's product strategy and brand identity.",
    avatar: "AR",
    bgAccent: "rgb(59 130 246 / 0.15)", // Blue glow
    bgSolid: "rgb(59,130,246)",
    lightColor: "bg-blue-500/10 text-blue-500",
    borderHover: "hover:border-blue-500/40",
    social: { linkedin: "#", twitter: "#", github: "#" },
  },
  {
    name: "Tanvir Hossain",
    role: "CTO & Lead Engineer",
    bio: "Full-stack architect building scalable systems that power millions.",
    avatar: "TH",
    bgAccent: "rgb(168 85 247 / 0.15)", // Purple glow
    bgSolid: "rgb(168,85,247)",
    lightColor: "bg-purple-500/10 text-purple-500",
    borderHover: "hover:border-purple-500/40",
    social: { linkedin: "#", twitter: "#", github: "#" },
  },
  {
    name: "Sadia Islam",
    role: "Head of Design",
    bio: "Crafting pixel-perfect experiences with a deep sense of aesthetics.",
    avatar: "SI",
    bgAccent: "rgb(249 115 22 / 0.15)", // Orange glow
    bgSolid: "rgb(249,115,22)",
    lightColor: "bg-orange-500/10 text-orange-500",
    borderHover: "hover:border-orange-500/40",
    social: { linkedin: "#", twitter: "#", github: "#" },
  },
  {
    name: "Rafiq Ahmed",
    role: "Growth & Marketing",
    bio: "Data-driven growth hacker turning ideas into measurable impact.",
    avatar: "RA",
    bgAccent: "rgb(16 185 129 / 0.15)", // Emerald glow
    bgSolid: "rgb(16,185,129)",
    lightColor: "bg-emerald-500/10 text-emerald-500",
    borderHover: "hover:border-emerald-500/40",
    social: { linkedin: "#", twitter: "#", github: "#" },
  },
];

const OurTeam = () => {
  return (
    <section className="py-24 bg-base-100 relative overflow-hidden">
      {/* Ambient blobs matching Featured section */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-black tracking-[0.2em] uppercase text-primary bg-primary/8 px-3 py-1 rounded-full border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block" />
              The People
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-secondary tracking-tight leading-[1.1]">
              Meet the <br />
              <span className="text-primary italic relative">
                Team
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 100 6" preserveAspectRatio="none" height="6">
                  <path d="M0 5 Q50 0 100 5" stroke="oklch(45% 0.16 250)" strokeWidth="2" fill="none" strokeOpacity="0.4" />
                </svg>
              </span>
            </h2>
            <p className="text-neutral/40 font-medium text-base leading-relaxed mt-4">
              The passionate humans building the future of e-commerce, one pixel at a time.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-4 p-6 rounded-[2rem] bg-base-200/50 border border-base-300/60 shadow-sm">
            <div className="flex -space-x-3">
              {team.map((m, i) => (
                <div key={i} className={`w-10 h-10 rounded-full border-2 border-base-100 flex items-center justify-center text-[10px] font-black ${m.lightColor} ring-1 ring-base-300`}>
                  {m.avatar}
                </div>
              ))}
            </div>
            <div>
              <p className="text-xl font-black text-secondary leading-none">{team.length}+</p>
              <p className="text-[10px] text-neutral/30 font-bold uppercase tracking-widest">Members</p>
            </div>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <div
              key={index}
              style={{ "--glow-color": member.bgAccent } as React.CSSProperties}
              className={`
                group relative overflow-hidden
                p-8 rounded-[2.5rem]
                bg-base-200/40 border border-base-300/60
                ${member.borderHover}
                transition-all duration-500
                hover:-translate-y-2
                hover:shadow-[0_8px_40px_var(--glow-color)]
              `}
            >
              {/* Avatar Box */}
              <div className="relative mb-8 flex justify-between items-start">
                <div className={`
                  w-20 h-20 rounded-3xl
                  ${member.lightColor}
                  flex items-center justify-center
                  text-2xl font-black
                  group-hover:scale-110 group-hover:-rotate-6
                  transition-transform duration-500 shadow-inner
                `}>
                  {member.avatar}
                </div>
                
                {/* Arrow visible on hover */}
                <div className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                   <ArrowRight size={18} className="text-primary mt-1" />
                </div>
              </div>

              {/* Member Info */}
              <div className="relative z-10 space-y-2 mb-6">
                <h3 className="text-xl font-black text-secondary italic tracking-tight">
                  {member.name}
                </h3>
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-primary/70">
                  {member.role}
                </p>
                <p className="text-sm text-neutral/40 leading-relaxed font-medium">
                  {member.bio}
                </p>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3 relative z-10">
                {Object.entries(member.social).map(([platform, link], i) => (
                  <Link
                    key={i}
                    href={link}
                    className="w-9 h-9 rounded-xl bg-base-100 border border-base-300/60 flex items-center justify-center text-neutral/40 hover:text-primary hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
                  >
                    {platform === "linkedin" && <Linkedin size={14} />}
                    {platform === "twitter" && <Twitter size={14} />}
                    {platform === "github" && <Github size={14} />}
                  </Link>
                ))}
              </div>

              {/* Ghost Avatar Background */}
              <div className="absolute -bottom-6 -right-6 opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-110 transition-all duration-500 pointer-events-none font-black text-9xl">
                {member.avatar}
              </div>

              {/* Bottom Shimmer Line */}
              <div
                className="absolute bottom-0 left-0 h-[2.5px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{ background: member.bgSolid, opacity: 0.6 }}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-4">
          <p className="text-sm text-neutral/40 font-medium">
            Interested in joining our mission?
          </p>
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-sm font-black text-primary border border-primary/20 bg-primary/5 hover:bg-primary/10 px-6 py-3 rounded-2xl transition-all group"
          >
            View Open Roles
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;