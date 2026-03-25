"use client";
import { generateInvoice } from "@/lib/invoice";

import React, { useEffect, useState } from "react";
import {
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  ExternalLink,
  Loader2,
  ShoppingBag,
  Download,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import { TOrder } from "@/types/order";
import { getUserOrders } from "@/services/order.service";

const MyOrders = () => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!session?.user?.accessToken) return;
      try {
        const res = await getUserOrders(session.user.accessToken);
        if (res.success) {
          setOrders(res.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [session?.user?.accessToken]);

  const totalSpent = orders
    .filter((order) => order.paymentStatus === "paid")
    .reduce((sum, order) => sum + order.price * (order.quantity || 1), 0);

  const getStatusBadge = (status: string) => {
    const badgeMap: Record<string, JSX.Element> = {
      pending: (
        <span className="badge badge-warning badge-sm font-bold gap-1 py-3 px-4">
          <Clock size={14} /> Pending
        </span>
      ),
      confirmed: (
        <span className="badge badge-info badge-sm font-bold gap-1 py-3 px-4 text-white">
          <CheckCircle2 size={14} /> Confirmed
        </span>
      ),
      delivered: (
        <span className="badge badge-success badge-sm font-bold gap-1 py-3 px-4 text-white">
          <Truck size={14} /> Delivered
        </span>
      ),
      cancelled: (
        <span className="badge badge-error badge-sm font-bold gap-1 py-3 px-4 text-white">
          <XCircle size={14} /> Cancelled
        </span>
      ),
    };
    return (
      badgeMap[status] || (
        <span className="badge badge-ghost uppercase">{status}</span>
      )
    );
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-secondary tracking-tight uppercase">
            My Orders
          </h2>
          <p className="text-neutral/60 font-medium">
            Manage and track your recent purchases
          </p>
        </div>
        <div className="stats shadow-sm bg-base-100 border border-base-300">
          <div className="stat py-2 px-6">
            <div className="stat-title text-[10px] font-bold uppercase tracking-widest text-primary">
              Total Spent (Paid)
            </div>
            <div className="stat-value text-2xl text-secondary">
              ${totalSpent.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-base-100 rounded-[2rem] border border-base-200 overflow-hidden shadow-xl shadow-base-300/20">
        <div className="overflow-x-auto">
          <table className="table table-lg w-full">
            <thead className="bg-base-200/50 text-secondary font-black text-xs uppercase tracking-wider">
              <tr>
                <th className="py-6">Product</th>
                <th>Order ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-200">
              {orders.length > 0 ? (
                orders.map((order) => {
                  const item = order.itemId as any;
                  return (
                    <tr
                      key={order._id}
                      className="hover:bg-base-200/30 transition-colors group"
                    >
                      <td className="py-5">
                        <div className="flex items-center gap-4">
                          <div className="avatar">
                            <div className="mask mask-squircle w-14 h-14 bg-base-200 relative">
                              <Image
                                src={item?.image || "/placeholder.png"}
                                alt={item?.title || "Product"}
                                width={100}
                                height={100}
                                className="object-cover"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-black text-secondary group-hover:text-primary transition-colors line-clamp-1 max-w-[180px]">
                              {item?.title || "Product Removed"}
                            </div>
                            <div className="text-xs font-bold text-neutral/40 uppercase">
                              Qty: {order.quantity}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="font-mono text-[10px] font-bold bg-base-200 px-2 py-1 rounded-md text-secondary">
                          #{order._id.slice(-8).toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <div className="text-sm font-bold text-neutral/70 italic">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td>{getStatusBadge(order.status)}</td>
                      <td>
                        <div className="font-black text-secondary">
                          ${(order.price * order.quantity).toFixed(2)}
                        </div>
                        <div
                          className={`text-[10px] font-bold uppercase ${
                            order.paymentStatus === "paid"
                              ? "text-success"
                              : "text-error"
                          }`}
                        >
                          {order.paymentStatus}
                        </div>
                      </td>
                      <th className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/dashboard/my-orders/${order._id}`}
                            className="btn btn-ghost btn-circle btn-sm hover:bg-primary hover:text-white transition-all"
                            title="View Details"
                          >
                            <ExternalLink size={18} />
                          </Link>

                          <button
                            onClick={() => generateInvoice(order)}
                            className="btn btn-ghost btn-circle btn-sm text-success hover:bg-success hover:text-white transition-all"
                            title="Download Invoice"
                          >
                            <Download size={18} />
                          </button>
                        </div>
                      </th>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="p-20 text-center">
                    <ShoppingBag
                      size={48}
                      className="mx-auto text-neutral/20 mb-4"
                    />
                    <h3 className="text-xl font-bold text-neutral/40">
                      No orders found yet.
                    </h3>
                    <Link
                      href="/explore"
                      className="btn btn-primary mt-4 rounded-xl px-8"
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
