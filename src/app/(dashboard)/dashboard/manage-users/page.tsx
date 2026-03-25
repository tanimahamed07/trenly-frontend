"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import {
  Trash2,
  ShieldCheck,
  User as UserIcon,
  Loader2,
  Search,
} from "lucide-react";
import Image from "next/image";
import { toast, Toaster } from "sonner";
import { UserService } from "@/services/user.service";

const ManageUser = () => {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const token = (session?.user as any)?.accessToken;

  const fetchUsers = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await UserService.getAllUsers(token);
      if (res.success) {
        setUsers(res.data);
      }
    } catch (error: any) {
      console.error("Fetch Error:", error);
      toast.error(error.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (status === "loading") return;
    if (token) {
      fetchUsers();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [token, status, fetchUsers]);

  // রোল পরিবর্তন করার কনফার্মেশন লজিক
  const handleToggleRole = (userId: string, currentRole: string) => {
    const newRole = currentRole === "admin" ? "user" : "admin";

    toast(`Change User Role?`, {
      description: `Are you sure you want to change this user's role to ${newRole.toUpperCase()}?`,
      action: {
        label: "Confirm",
        onClick: async () => {
          try {
            const res = await UserService.updateUserRole(
              userId,
              newRole,
              token,
            );
            if (res.success) {
              toast.success(`User role updated to ${newRole}`);
              setUsers((prev) =>
                prev.map((u) =>
                  u._id === userId ? { ...u, role: newRole } : u,
                ),
              );
            }
          } catch (error: any) {
            toast.error(error.message || "Failed to update role");
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.dismiss(),
      },
    });
  };

  // ইউজার ডিলিট করা
  const handleDelete = async (id: string) => {
    toast("Delete User?", {
      description: "Are you sure? This user will be permanently removed.",
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            const res = await UserService.deleteUser(id, token);
            if (res.success) {
              toast.success("User deleted successfully");
              setUsers((prev) => prev.filter((u) => u._id !== id));
            }
          } catch (error: any) {
            toast.error(error.message || "Failed to delete user");
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.dismiss(),
      },
    });
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <Toaster position="top-center" richColors closeButton />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-secondary uppercase tracking-tight">
            Manage Users
          </h2>
          <p className="text-[10px] font-bold text-neutral/40 uppercase tracking-widest">
            Control center / {users.length} registered accounts
          </p>
        </div>

        <div className="relative group w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral/40 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="input input-bordered w-full pl-11 bg-base-100 border-base-300 focus:border-primary/50 focus:ring-0 rounded-2xl font-bold text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-base-100 border border-base-300 rounded-[2rem] overflow-hidden shadow-sm">
        {loading ? (
          <div className="h-64 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-[10px] font-black uppercase tracking-widest text-neutral/30">
              Syncing database...
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-lg w-full">
              <thead className="bg-base-200/50 border-b border-base-300">
                <tr>
                  <th className="text-[10px] font-black uppercase tracking-widest text-neutral/50">
                    User Details
                  </th>
                  <th className="text-[10px] font-black uppercase tracking-widest text-neutral/50">
                    Access Level
                  </th>
                  <th className="text-[10px] font-black uppercase tracking-widest text-neutral/50">
                    Joined At
                  </th>
                  <th className="text-[10px] font-black uppercase tracking-widest text-neutral/50 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-base-200/30 transition-colors border-b border-base-200 last:border-0"
                  >
                    <td>
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12 bg-base-200 relative">
                            {user.avatar ? (
                              <Image
                                src={user.avatar || "/placeholder.png"} // যদি অ্যাভাটার না থাকে তবে প্লেসহোল্ডার দেখাবে
                                alt={user.name || "User Avatar"}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // পারফরম্যান্সের জন্য এটি জরুরি
                                className="object-cover"
                                priority={false} 
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-black text-lg">
                                {user.name?.charAt(0)}
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="font-black text-secondary">
                            {user.name}
                          </div>
                          <div className="text-[10px] font-bold text-neutral/40 uppercase tracking-tight">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`badge badge-sm font-black uppercase tracking-tighter py-3 px-4 rounded-xl border-none ${
                          user.role === "admin"
                            ? "bg-primary text-white shadow-lg shadow-primary/20"
                            : "bg-base-200 text-neutral/60"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="text-sm font-bold text-neutral/60">
                      {new Date(user.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleToggleRole(user._id, user.role)}
                          className={`btn btn-ghost btn-sm btn-square rounded-xl transition-all ${user.role === "admin" ? "hover:bg-neutral/10" : "hover:bg-primary/10 hover:text-primary"}`}
                          title={
                            user.role === "admin"
                              ? "Demote to User"
                              : "Promote to Admin"
                          }
                        >
                          {user.role === "admin" ? (
                            <UserIcon size={18} />
                          ) : (
                            <ShieldCheck size={18} />
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="btn btn-ghost btn-sm btn-square rounded-xl hover:bg-error/10 hover:text-error transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="p-20 text-center">
                <div className="inline-flex p-4 rounded-full bg-base-200 mb-4 text-neutral/20">
                  <Search size={32} />
                </div>
                <p className="font-black text-neutral/40 uppercase tracking-widest text-xs">
                  No matching users found
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUser;
