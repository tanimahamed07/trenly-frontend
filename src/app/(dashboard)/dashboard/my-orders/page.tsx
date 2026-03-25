"use client";

import { generateInvoice } from "@/lib/invoice";
import React, { useEffect, useState, useCallback, ReactNode } from "react";
import {
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  ExternalLink,
  Loader2,
  ShoppingBag,
  Download,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { toast, Toaster } from "sonner";
import { TOrder } from "@/types/order";
import { getUserOrders } from "@/services/order.service";

const MyOrders = () => {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const token = (session?.user as any)?.accessToken;

  const fetchOrders = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await getUserOrders(token);
      if (res.success) {
        setOrders(res.data);
      }
    } catch (error) {
      toast.error("Failed to load your orders");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (status === "loading") return;
    fetchOrders();
  }, [status, fetchOrders]);

  const totalSpent = orders
    .filter((order) => order.paymentStatus === "paid")
    .reduce((sum, order) => sum + order.price * (order.quantity || 1), 0);

  const getStatusBadge = (status: string) => {
    const baseClass =
      "badge badge-sm font-black uppercase text-[10px] py-3 px-4 rounded-xl border-none";

    switch (status) {
      case "pending":
        return (
          <span className={`${baseClass} bg-warning/10 text-warning`}>
            Pending
          </span>
        );
      case "confirmed":
        return (
          <span className={`${baseClass} bg-info/10 text-info`}>Confirmed</span>
        );
      case "delivered":
        return (
          <span className={`${baseClass} bg-success/10 text-success`}>
            Delivered
          </span>
        );
      case "cancelled":
        return (
          <span className={`${baseClass} bg-error/10 text-error`}>
            Cancelled
          </span>
        );
      default:
        return (
          <span className={`${baseClass} bg-base-200 text-neutral/40`}>
            {status}
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-widest text-neutral/30">
          Loading your history...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10 px-4 md:px-0">
      <Toaster position="top-center" richColors closeButton />

      {/* Header Section - Manage Product এর মত ডিজাইন */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-secondary uppercase tracking-tight">
            Purchase History
          </h2>
          <p className="text-[10px] font-bold text-neutral/40 uppercase tracking-widest">
            Track your orders / {orders.length} orders total
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-base-100 border border-base-300 rounded-2xl px-6 py-2 shadow-sm">
            <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-0.5">
              Total Spent
            </div>
            <div className="text-xl font-black text-secondary leading-tight">
              ${totalSpent.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Table Section - Manage Product এর টেবিল স্টাইল */}
      <div className="bg-base-100 border border-base-300 rounded-[2rem] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="table table-lg w-full">
            <thead className="bg-base-200/50 border-b border-base-300">
              <tr>
                <th className="text-[10px] font-black uppercase tracking-widest text-neutral/50">
                  Product Details
                </th>
                <th className="text-[10px] font-black uppercase tracking-widest text-neutral/50">
                  Order ID
                </th>
                <th className="text-[10px] font-black uppercase tracking-widest text-neutral/50">
                  Status & Payment
                </th>
                <th className="text-[10px] font-black uppercase tracking-widest text-neutral/50">
                  Amount
                </th>
                <th className="text-[10px] font-black uppercase tracking-widest text-neutral/50 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => {
                  const item = order.itemId as any;
                  return (
                    <tr
                      key={order._id}
                      className="hover:bg-base-200/30 transition-colors border-b border-base-200 last:border-0"
                    >
                      <td>
                        <div className="flex items-center gap-4">
                          <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-base-200 border border-base-300">
                            <Image
                              src={item?.image || "/placeholder.png"}
                              alt={item?.title || "Product"}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-black text-secondary line-clamp-1 max-w-[200px]">
                              {item?.title || "Product Removed"}
                            </div>
                            <div className="text-[10px] font-bold text-neutral/40 uppercase tracking-tighter">
                              Quantity: {order.quantity}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="font-mono text-[10px] font-black bg-base-200 px-3 py-1.5 rounded-xl text-secondary border border-base-300">
                          #{order._id.slice(-8).toUpperCase()}
                        </span>
                        <div className="text-[10px] font-bold text-neutral/40 mt-1 uppercase italic">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td>
                        <div className="space-y-1.5">
                          {getStatusBadge(order.status)}
                          <div
                            className={`flex items-center gap-1 text-[9px] font-black uppercase pl-1 ${order.paymentStatus === "paid" ? "text-success" : "text-error"}`}
                          >
                            {order.paymentStatus === "paid" ? (
                              <CheckCircle2 size={10} />
                            ) : (
                              <AlertCircle size={10} />
                            )}
                            {order.paymentStatus}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="text-sm font-black text-primary">
                          ${(order.price * order.quantity).toFixed(2)}
                        </div>
                        <div className="text-[9px] font-bold text-neutral/30 uppercase">
                          Unit: ${order.price}
                        </div>
                      </td>
                      <td className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/explore/${item?._id}`}
                            className="btn btn-ghost btn-sm btn-square rounded-xl hover:bg-info/10 hover:text-info"
                          >
                            <ExternalLink size={18} />
                          </Link>
                          <button
                            onClick={() => {
                              toast.promise(generateInvoice(order), {
                                loading: "Preparing invoice...",
                                success: "Invoice downloaded!",
                                error: "Failed to generate invoice",
                              });
                            }}
                            className="btn btn-ghost btn-sm btn-square rounded-xl hover:bg-success/10 hover:text-success"
                          >
                            <Download size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="p-20 text-center flex flex-col items-center"
                  >
                    <ShoppingBag size={48} className="text-neutral/20 mb-4" />
                    <p className="font-black text-neutral/40 uppercase tracking-widest text-xs">
                      You haven&apos;t ordered anything yet
                    </p>
                    <Link
                      href="/explore"
                      className="btn btn-primary btn-sm rounded-xl mt-4 font-black uppercase text-[10px]"
                    >
                      Start Shopping
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
