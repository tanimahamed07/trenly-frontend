"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { 
  User, 
  Mail, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Edit3, 
  Package, 
  ShoppingBag,
  Clock
} from "lucide-react";
import Image from "next/image";

const Profile = () => {
  const { data: session } = useSession();
  const user = session?.user;
console.log(user)
  const stats = [
    { label: "Total Orders", value: "12", icon: ShoppingBag, color: "text-blue-500" },
    { label: "Pending", value: "02", icon: Clock, color: "text-orange-500" },
    { label: "Completed", value: "10", icon: Package, color: "text-green-500" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10 px-4 md:px-0 mt-6">
      {/* Header / Banner Section */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2.5rem] overflow-hidden border border-base-300">
        <div className="absolute -bottom-12 left-8 flex items-end gap-6">
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-base-100 bg-base-200 overflow-hidden shadow-xl">
             <Image 
                src={user?.image || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`}
                alt="Profile"
                fill
                className="object-cover"
                sizes="160px"
              />
          </div>
          <div className="mb-14 hidden md:block">
            <h1 className="text-3xl font-black text-secondary uppercase tracking-tight">
              {user?.name || "User Name"}
            </h1>
            <p className="text-sm font-bold text-neutral/50 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck size={14} className="text-primary" /> {user?.role || "Member"}
            </p>
          </div>
        </div>
        
        <button className="absolute bottom-6 right-8 btn btn-primary btn-sm rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20">
          <Edit3 size={14} /> Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16 md:mt-20">
        {/* Left Column: Personal Info */}
        <div className="space-y-6">
          <div className="bg-base-100 border border-base-300 rounded-[2rem] overflow-hidden shadow-sm">
            <div className="bg-base-200 border-b border-base-300 px-8 py-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral/50">
                Personal Details
              </span>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-neutral/40">Full Name</p>
                  <p className="font-bold text-secondary">{user?.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <Mail size={20} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] font-black uppercase tracking-widest text-neutral/40">Email Address</p>
                  <p className="font-bold text-secondary truncate">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-neutral/40">Location</p>
                  <p className="font-bold text-secondary">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Stats & Activity */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((item, index) => (
              <div key={index} className="bg-base-100 border border-base-300 p-6 rounded-[2rem] shadow-sm flex flex-col items-center text-center group hover:border-primary/30 transition-all">
                <div className={`p-3 rounded-2xl bg-base-200 mb-3 ${item.color} group-hover:scale-110 transition-transform`}>
                  <item.icon size={24} />
                </div>
                <p className="text-2xl font-black text-secondary">{item.value}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-neutral/40">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Additional Content Section (Bio or Recent Activity) */}
          <div className="bg-base-100 border border-base-300 rounded-[2rem] overflow-hidden shadow-sm">
             <div className="bg-base-200 border-b border-base-300 px-8 py-4 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral/50">
                Account Overview
              </span>
              <Calendar size={14} className="text-neutral/30" />
            </div>
            <div className="p-8">
              <p className="text-sm text-neutral/60 leading-relaxed font-medium">
                Welcome back, <span className="text-secondary font-bold">{user?.name}</span>! 
                You are currently logged in as a <span className="badge badge-primary badge-outline font-bold uppercase text-[9px]">{user?.role}</span>. 
                Explore your dashboard to manage orders, update your inventory, or track your recent purchases. 
              </p>
              
              <div className="mt-8 pt-8 border-t border-dashed border-base-300">
                <div className="flex flex-wrap gap-3">
                  <button className="btn btn-outline btn-sm rounded-xl font-black uppercase tracking-widest text-[10px]">Security Settings</button>
                  <button className="btn btn-outline btn-sm rounded-xl font-black uppercase tracking-widest text-[10px]">Order History</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;