"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  Loader2,
  RefreshCcw,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell
} from "recharts";
import { toast, Toaster } from "sonner";
import { DashboardService } from "@/services/dashboard.service";

const AdminOverview = () => {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState<any>(null);
  const [charts, setCharts] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const token = (session?.user as any)?.accessToken;

  const fetchData = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      const [statsRes, chartsRes] = await Promise.all([
        DashboardService.getDashboardStats(token),
        DashboardService.getChartData(token),
      ]);
      if (statsRes.success) setStats(statsRes.data);
      if (chartsRes.success) setCharts(chartsRes.data);
    } catch {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (status === "loading") return;
    fetchData();
  }, [status, fetchData]);

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-3 bg-base-100 rounded-2xl border border-base-300">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-widest text-neutral/40">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  // ডার্ক মোডে টেক্সট ভিজিবিলিটি ঠিক করার জন্য কমন স্টাইল
  const axisStyle = {
    fontSize: 10,
    fontWeight: 600,
    fill: "currentColor", // এটি প্যারেন্ট ডিভ (text-neutral) থেকে কালার নিবে
    opacity: 0.6
  };

  return (
    <div className="space-y-6 text-neutral"> {/* text-neutral যোগ করা হয়েছে */}
      <Toaster position="top-center" richColors closeButton />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-secondary uppercase tracking-tight">
            Dashboard Overview
          </h2>
          <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest">
            Analytics Summary
          </p>
        </div>

        <button
          onClick={fetchData}
          className="btn btn-xs rounded-lg font-black uppercase tracking-tight bg-base-200 border-none hover:bg-primary/10 hover:text-primary transition-colors"
        >
          <RefreshCcw size={14} /> Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Users size={18} />} label="Users" value={stats?.totalUsers || 0} />
        <StatCard icon={<Package size={18} />} label="Items" value={stats?.totalItems || 0} />
        <StatCard icon={<ShoppingCart size={18} />} label="Orders" value={stats?.totalOrders || 0} />
        <StatCard icon={<DollarSign size={18} />} label="Revenue" value={`$${stats?.totalRevenue || 0}`} />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Line Chart */}
        <div className="bg-base-100 border border-base-300 rounded-2xl p-5">
          <h3 className="text-xs font-black uppercase mb-6 opacity-50">
            Revenue (7 days)
          </h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={charts?.lineChart?.labels?.map((l: any, i: number) => ({
                name: l,
                value: charts.lineChart.datasets[0].data[i],
              }))}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" opacity={0.1} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={axisStyle} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={axisStyle} dx={-10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-base-100)",
                    borderColor: "var(--color-base-300)",
                    borderRadius: "12px",
                    color: "var(--color-neutral)"
                  }}
                  itemStyle={{ color: "var(--color-primary)" }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="var(--color-primary)"
                  strokeWidth={4}
                  dot={{ r: 4, fill: "var(--color-primary)" }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-base-100 border border-base-300 rounded-2xl p-5">
          <h3 className="text-xs font-black uppercase mb-6 opacity-50">
            Order Status
          </h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts?.barChart?.labels?.map((l: any, i: number) => ({
                name: l,
                value: charts.barChart.datasets[0].data[i],
              }))}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" opacity={0.1} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={axisStyle} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={axisStyle} dx={-10} />
                <Tooltip
                  cursor={{ fill: 'currentColor', opacity: 0.05 }}
                  contentStyle={{
                    backgroundColor: "var(--color-base-100)",
                    borderColor: "var(--color-base-300)",
                    borderRadius: "12px",
                    color: "var(--color-neutral)"
                  }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={30}>
                  {charts?.barChart?.labels?.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill="var(--color-primary)" opacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }: any) => (
  <div className="bg-base-100 border border-base-300 rounded-xl p-4 flex items-center gap-3 hover:shadow-lg transition-all duration-300">
    <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-black uppercase opacity-40">
        {label}
      </p>
      <p className="text-lg font-black text-secondary leading-tight">{value}</p>
    </div>
  </div>
);

export default AdminOverview;