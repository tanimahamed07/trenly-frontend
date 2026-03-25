"use client";

import React, { useState } from "react";
import {
  User,
  Lock,
  Bell,
  Shield,
  Trash2,
  Save,
  Globe,
  Moon,
} from "lucide-react";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4 md:px-0 pb-20">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-secondary uppercase tracking-tight">
          Settings
        </h1>
        <p className="text-sm font-bold text-neutral/40 uppercase tracking-widest">
          Manage your account preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <div className="flex flex-col gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-primary-content shadow-lg shadow-primary/20"
                  : "bg-base-100 hover:bg-base-200 text-neutral/50 border border-base-300"
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}

          <div className="mt-6 pt-6 border-t border-dashed border-base-300">
            <button className="flex items-center gap-3 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] text-error hover:bg-error/10 w-full transition-all">
              <Trash2 size={18} />
              Delete Account
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-base-100 border border-base-300 rounded-[2.5rem] shadow-sm overflow-hidden">
            {/* Tab Header */}
            <div className="bg-base-200 border-b border-base-300 px-10 py-5">
              <h2 className="text-sm font-black text-secondary uppercase tracking-widest flex items-center gap-2">
                {activeTab === "profile" && (
                  <>
                    <User size={16} className="text-primary" /> Profile Settings
                  </>
                )}
                {activeTab === "security" && (
                  <>
                    <Lock size={16} className="text-primary" /> Security &
                    Password
                  </>
                )}
                {activeTab === "notifications" && (
                  <>
                    <Bell size={16} className="text-primary" /> Notification
                    Preferences
                  </>
                )}
              </h2>
            </div>

            {/* Tab Body */}
            <div className="p-10">
              {activeTab === "profile" && (
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                      <label className="label text-[10px] font-black uppercase tracking-widest text-neutral/50">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Tanim Ahamed"
                        className="input input-bordered rounded-xl font-bold bg-base-200 focus:outline-primary border-base-300"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label text-[10px] font-black uppercase tracking-widest text-neutral/50">
                        Username
                      </label>
                      <input
                        type="text"
                        placeholder="@tamimahamed07"
                        className="input input-bordered rounded-xl font-bold bg-base-200 focus:outline-primary border-base-300"
                      />
                    </div>
                  </div>
                  <div className="form-control">
                    <label className="label text-[10px] font-black uppercase tracking-widest text-neutral/50">
                      Bio
                    </label>
                    <textarea
                      className="textarea textarea-bordered rounded-xl font-bold bg-base-200 h-24 focus:outline-primary border-base-300"
                      placeholder="Tell us about yourself..."
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="btn btn-primary rounded-xl font-black uppercase tracking-widest px-8"
                    >
                      <Save size={16} /> Save Changes
                    </button>
                  </div>
                </form>
              )}

              {activeTab === "security" && (
                <form className="space-y-6">
                  <div className="form-control">
                    <label className="label text-[10px] font-black uppercase tracking-widest text-neutral/50">
                      Current Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="input input-bordered rounded-xl bg-base-200 focus:outline-primary border-base-300"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label text-[10px] font-black uppercase tracking-widest text-neutral/50">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="input input-bordered rounded-xl bg-base-200 focus:outline-primary border-base-300"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="btn btn-secondary rounded-xl font-black uppercase tracking-widest px-8"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              )}

              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-base-200 rounded-2xl border border-base-300">
                    <div>
                      <p className="font-bold text-secondary">
                        Email Notifications
                      </p>
                      <p className="text-[10px] font-black text-neutral/40 uppercase tracking-widest">
                        Get updates about your orders
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      defaultChecked
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-base-200 rounded-2xl border border-base-300">
                    <div>
                      <p className="font-bold text-secondary">
                        Promotional Emails
                      </p>
                      <p className="text-[10px] font-black text-neutral/40 uppercase tracking-widest">
                        Receive special offers and discounts
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle toggle-secondary"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
