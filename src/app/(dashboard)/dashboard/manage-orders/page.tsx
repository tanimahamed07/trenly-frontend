"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import {
  Package,
  Truck,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Loader2,
  MoreHorizontal,
  CreditCard,
  MapPin,
  Phone,
} from "lucide-react";
import Image from "next/image";
import { toast, Toaster } from "sonner";
import { getUserOrders, updateOrderStatus } from "@/services/order.service";

const ManageOrders = () => {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");
  const token = (session?.user as any)?.accessToken;

  const fetchOrders = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      const query = filterStatus ? `status=${filterStatus}` : "";
      const res = await getUserOrders(token, query);
      if (res.success) {
        setOrders(res.data);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }, [token, filterStatus]);

  useEffect(() => {
    if (status === "loading") return;
    fetchOrders();
  }, [token, status, fetchOrders]);

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      const res = await updateOrderStatus(token, orderId, {
        status: newStatus,
      });
      if (res.success) {
        toast.success(`Order marked as ${newStatus}`);
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order,
          ),
        );
      }
    } catch (error: any) {
      toast.error("Failed to update status");
    }
  };

  const handlePaymentUpdate = async (
    orderId: string,
    newPaymentStatus: string,
  ) => {
    try {
      const res = await updateOrderStatus(token, orderId, {
        paymentStatus: newPaymentStatus,
      });
      if (res.success) {
        toast.success(`Payment status: ${newPaymentStatus}`);
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId
              ? { ...order, paymentStatus: newPaymentStatus }
              : order,
          ),
        );
      }
    } catch (error: any) {
      toast.error("Failed to update payment");
    }
  };

  const getStatusStyle = (s: string) => {
    switch (s) {
      case "delivered":
        return "bg-success/10 text-success border-success/20";
      case "confirmed":
        return "bg-info/10 text-info border-info/20";
      case "cancelled":
        return "bg-error/10 text-error border-error/20";
      default:
        return "bg-warning/10 text-warning border-warning/20";
    }
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-center" richColors closeButton />

      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-secondary uppercase tracking-tight">
            Order Management
          </h2>
          <p className="text-[10px] font-bold text-neutral/40 uppercase tracking-widest">
            Total {orders.length} orders processed
          </p>
        </div>

        <div className="flex gap-2">
          {["pending", "confirmed", "delivered", "cancelled"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(filterStatus === s ? "" : s)}
              className={`btn btn-xs rounded-lg font-black uppercase tracking-tighter ${filterStatus === s ? "btn-primary" : "btn-ghost bg-base-200"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="h-96 flex flex-col items-center justify-center gap-3 bg-base-100 rounded-[2rem] border border-base-300">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-[10px] font-black uppercase tracking-widest text-neutral/30">
            Loading Cloud Data...
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="group bg-base-100 border border-base-300 rounded-[1.5rem] p-5 hover:border-primary/30 transition-all shadow-sm"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Product Info */}
                <div className="flex gap-4 flex-1">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-base-200 flex-shrink-0 border border-base-300">
                    <Image
                      src={order.itemId?.image || "/placeholder.png"}
                      alt="product"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-md border uppercase ${getStatusStyle(order.status)}`}
                      >
                        {order.status}
                      </span>
                      <span className="text-[10px] font-bold text-neutral/30">
                        #{order._id.slice(-6).toUpperCase()}
                      </span>
                    </div>
                    <h3 className="font-black text-secondary leading-tight">
                      {order.itemId?.title}
                    </h3>
                    <p className="text-sm font-bold text-primary">
                      ${order.price}{" "}
                      <span className="text-neutral/40 text-xs">
                        × {order.quantity}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Customer & Shipping */}
                <div className="flex flex-wrap gap-6 lg:border-x border-base-300 lg:px-6">
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-black text-neutral/30 uppercase flex items-center gap-1">
                      <MapPin size={10} /> Shipping To
                    </p>
                    <p className="text-xs font-bold text-secondary">
                      {order.shippingAddress?.fullName}
                    </p>
                    <p className="text-[10px] font-medium text-neutral/50 max-w-[150px]">
                      {order.shippingAddress?.address}
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-black text-neutral/30 uppercase flex items-center gap-1">
                      <Phone size={10} /> Contact
                    </p>
                    <p className="text-xs font-bold text-secondary">
                      {order.shippingAddress?.phone}
                    </p>
                    <div className="flex items-center gap-1">
                      <CreditCard
                        size={10}
                        className={
                          order.paymentStatus === "paid"
                            ? "text-success"
                            : "text-neutral/30"
                        }
                      />
                      <span
                        className={`text-[10px] font-black uppercase ${order.paymentStatus === "paid" ? "text-success" : "text-error"}`}
                      >
                        {order.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Admin Actions */}
                <div className="flex items-center gap-2 lg:flex-col justify-center">
                  <div className="dropdown dropdown-left lg:dropdown-bottom dropdown-end">
                    <label
                      tabIndex={0}
                      className="btn btn-ghost btn-sm btn-square rounded-xl bg-base-200 hover:bg-primary/10 hover:text-primary"
                    >
                      <MoreHorizontal size={18} />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 border border-base-300 rounded-2xl w-52 mt-2"
                    >
                      <li className="menu-title text-[10px] font-black uppercase opacity-50">
                        Update Status
                      </li>
                      <li>
                        <button
                          onClick={() =>
                            handleStatusUpdate(order._id, "confirmed")
                          }
                          className="text-xs font-bold"
                        >
                          <CheckCircle2 size={14} className="text-info" />{" "}
                          Confirm Order
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() =>
                            handleStatusUpdate(order._id, "delivered")
                          }
                          className="text-xs font-bold"
                        >
                          <Truck size={14} className="text-success" /> Mark
                          Delivered
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() =>
                            handleStatusUpdate(order._id, "cancelled")
                          }
                          className="text-xs font-bold text-error"
                        >
                          <XCircle size={14} /> Cancel Order
                        </button>
                      </li>
                      <div className="divider my-1"></div>
                      <li className="menu-title text-[10px] font-black uppercase opacity-50">
                        Payment
                      </li>
                      <li>
                        <button
                          onClick={() =>
                            handlePaymentUpdate(
                              order._id,
                              order.paymentStatus === "paid"
                                ? "unpaid"
                                : "paid",
                            )
                          }
                          className="text-xs font-bold"
                        >
                          <CreditCard size={14} /> Mark as{" "}
                          {order.paymentStatus === "paid" ? "Unpaid" : "Paid"}
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <div className="text-center py-20 bg-base-100 rounded-[2rem] border border-dashed border-base-300">
              <Package className="mx-auto text-neutral/20 mb-4" size={48} />
              <p className="font-black text-neutral/40 uppercase tracking-widest text-xs">
                No orders found
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
