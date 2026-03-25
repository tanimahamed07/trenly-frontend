"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Loader2,
  Package,
  TrendingUp,
  Eye,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { toast, Toaster } from "sonner";
import { getAllProducts, deleteProduct } from "@/services/product.services";
import Link from "next/link";
import { TProduct } from "@/types/product";

const ManageProducts = () => {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // প্যাগিনেশন স্টেট
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const token = (session?.user as any)?.accessToken;

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const limit = 10;
      let query = `page=${currentPage}&limit=${limit}`;
      if (searchTerm) query += `&search=${searchTerm}`;

      const res = await getAllProducts(query);
      if (res.success) {
        setProducts(res.data);
        if (res.meta) {
          setTotalPages(Math.ceil(res.meta.total / limit));
          setTotalProducts(res.meta.total);
        }
      }
    } catch (error: any) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [searchTerm, currentPage]);

  useEffect(() => {
    if (status === "loading") return;
    fetchProducts();
  }, [status, fetchProducts]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleDelete = async (id: string) => {
    if (!token) return toast.error("You must be logged in to delete products.");

    toast("Delete Product?", {
      description: "Are you sure? This action cannot be undone.",
      action: {
        label: "Delete",
        onClick: async () => {
          const loadingToast = toast.loading("Deleting product...");
          try {
            const res = await deleteProduct(token, id);
            if (res.success) {
              toast.success("Product deleted successfully", {
                id: loadingToast,
              });
              setProducts((prev) => prev.filter((p) => p._id !== id));
              setTotalProducts((prev) => prev - 1);
            } else {
              toast.error(res.message || "Failed to delete product", {
                id: loadingToast,
              });
            }
          } catch (error) {
            toast.error("An error occurred while deleting", {
              id: loadingToast,
            });
          }
        },
      },
    });
  };

  return (
    <div className="space-y-6 pb-10 px-4 md:px-0">
      <Toaster position="top-center" richColors closeButton />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-secondary uppercase tracking-tight">
            Inventory
          </h2>
          <p className="text-[10px] font-bold text-neutral/40 uppercase tracking-widest">
            Manage your store / {totalProducts} items total
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group w-full md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral/40 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search products..."
              className="input input-bordered w-full pl-11 bg-base-100 border-base-300 focus:border-primary/50 focus:ring-0 rounded-2xl font-bold text-sm"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <Link
            href="/dashboard/manage-products/add"
            className="btn btn-primary rounded-2xl font-black uppercase tracking-tighter shadow-lg shadow-primary/20"
          >
            <Plus size={18} />
            Add Product
          </Link>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-base-100 border border-base-300 rounded-[2rem] overflow-hidden shadow-sm">
        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-[10px] font-black uppercase tracking-widest text-neutral/30">
              Loading Inventory...
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="table table-lg w-full">
                <thead className="bg-base-200/50 border-b border-base-300">
                  <tr>
                    <th className="text-[10px] font-black uppercase tracking-widest text-neutral/50">
                      Details
                    </th>
                    <th className="text-[10px] font-black uppercase tracking-widest text-neutral/50">
                      Category
                    </th>
                    <th className="text-[10px] font-black uppercase tracking-widest text-neutral/50">
                      Price & Stock
                    </th>
                    <th className="text-[10px] font-black uppercase tracking-widest text-neutral/50 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product._id}
                      className="hover:bg-base-200/30 transition-colors border-b border-base-200 last:border-0"
                    >
                      <td>
                        <div className="flex items-center gap-4">
                          <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-base-200 border border-base-300">
                            <Image
                              src={product.image || "/placeholder.png"} // ইমেজ না থাকলে বা ইনভ্যালিড লিংকে এরর ঠেকাবে
                              alt={product.title || "Product Image"}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // এই লাইনটি জরুরি (কনসোল ওয়ার্নিং ফিক্স করবে)
                              className="object-cover"
                              priority={false} 
                            />
                          </div>
                          <div>
                            <div className="font-black text-secondary flex items-center gap-2">
                              {product.title}
                              {product.isTrending && (
                                <TrendingUp
                                  size={14}
                                  className="text-primary"
                                />
                              )}
                            </div>
                            <div className="text-[10px] font-bold text-neutral/40 uppercase tracking-tighter">
                              SKU: {product.sku}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-sm bg-base-200 border-none font-black uppercase text-[10px] py-3 px-4 rounded-xl text-neutral/60">
                          {product.category}
                        </span>
                      </td>
                      <td>
                        <div className="space-y-1">
                          <div className="text-sm font-black text-primary">
                            ${product.price}
                          </div>
                          <div
                            className={`flex items-center gap-1 text-[10px] font-black uppercase ${product.stock < 10 ? "text-error" : "text-success"}`}
                          >
                            {product.stock < 10 && <AlertCircle size={10} />}
                            {product.stock} in stock
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/explore/${product._id}`}
                            className="btn btn-ghost btn-sm btn-square rounded-xl hover:bg-info/10 hover:text-info"
                          >
                            <Eye size={18} />
                          </Link>
                          <Link
                            href={`/dashboard/manage-products/edit/${product._id}`}
                            className="btn btn-ghost btn-sm btn-square rounded-xl hover:bg-primary/10 hover:text-primary"
                          >
                            <Edit3 size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="btn btn-ghost btn-sm btn-square rounded-xl hover:bg-error/10 hover:text-error"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {products.length === 0 && (
                <div className="p-20 text-center flex flex-col items-center">
                  <Package size={48} className="text-neutral/20 mb-4" />
                  <p className="font-black text-neutral/40 uppercase tracking-widest text-xs">
                    No products found
                  </p>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-base-200/30 border-t border-base-300 gap-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-neutral/40">
                  Page {currentPage} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="btn btn-sm btn-square rounded-xl bg-base-100 border-base-300 disabled:opacity-30"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  {[...Array(totalPages)].map((_, index) => {
                    const pageNum = index + 1;
                    if (
                      totalPages > 5 &&
                      Math.abs(pageNum - currentPage) > 1 &&
                      pageNum !== 1 &&
                      pageNum !== totalPages
                    )
                      return null;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`btn btn-sm btn-square rounded-xl ${currentPage === pageNum ? "btn-primary shadow-lg shadow-primary/20" : "bg-base-100 border-base-300 hover:bg-base-300"}`}
                      >
                        <span className="text-[10px] font-black">
                          {pageNum}
                        </span>
                      </button>
                    );
                  })}

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="btn btn-sm btn-square rounded-xl bg-base-100 border-base-300 disabled:opacity-30"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
