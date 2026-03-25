"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  ArrowLeft,
  Save,
  Image as ImageIcon,
  DollarSign,
  Flame,
  AlignLeft,
  Loader2,
  Package,
  Hash,
  Tag,
  Layers,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { toast, Toaster } from "sonner";
import { createProduct } from "@/services/product.services";

const CATEGORIES = ["Electronics", "Fashion", "Home", "Sports", "Machinery"];

const inputClass =
  "w-full px-4 py-3 rounded-2xl font-bold text-sm border border-base-300 bg-base-200 text-neutral placeholder:text-neutral/30 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition-all";

const AddProduct = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [isTrending, setIsTrending] = useState(false);
  const [category, setCategory] = useState("");

  const token = (session?.user as any)?.accessToken;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return toast.error("Please login to perform this action");
    if (!category) return toast.error("Please select a category");

    const formData = new FormData(e.currentTarget);
    const productData = {
      title: formData.get("title"),
      price: Number(formData.get("price")),
      stock: Number(formData.get("stock")),
      category,
      sku: formData.get("sku"),
      image: formData.get("image"),
      description: formData.get("description"),
      brand: formData.get("brand"),
      isTrending,
      isActive: true,
      currency: "USD",
    };

    try {
      setLoading(true);
      const res = await createProduct(token, productData);
      if (res.success) {
        toast.success("Product created successfully!");
        router.push("/dashboard/manage-products");
      } else {
        toast.error(res.message || "Failed to create product");
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-10 px-4 md:px-0">
      <Toaster position="top-center" richColors closeButton />

      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/manage-products"
          className="btn btn-ghost btn-circle bg-base-100 border border-base-300 shadow-sm"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-2xl font-black text-secondary uppercase tracking-tight">
            Add New Product
          </h2>
          <p className="text-[10px] font-bold text-neutral/40 uppercase tracking-widest">
            Inventory / Create entry
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ───── Left Column ───── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info Card */}
            <div className="bg-base-100 border border-base-300 rounded-[2rem] overflow-hidden shadow-sm">
              <div className="bg-base-200 border-b border-base-300 px-8 py-4 flex items-center gap-2">
                <AlignLeft className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral/50">
                  Basic Information
                </span>
              </div>

              <div className="p-8 space-y-5">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral/50 block">
                    Product Title
                  </label>
                  <input
                    name="title"
                    type="text"
                    placeholder="e.g. Premium Wireless Headphones"
                    className={inputClass}
                    required
                  />
                </div>

                {/* Category Dropdown + Brand */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Category */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral/50 flex items-center gap-1 block">
                      <Tag size={10} /> Category
                    </label>
                    <div className="relative">
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                        required
                      >
                        <option value="" disabled>
                          Select category...
                        </option>
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={16}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral/40 pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Brand */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral/50 flex items-center gap-1 block">
                      <Layers size={10} /> Brand
                    </label>
                    <input
                      name="brand"
                      type="text"
                      placeholder="Sony"
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral/50 block">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows={5}
                    placeholder="Detailed product description..."
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>
            </div>

            {/* Media Card */}
            <div className="bg-base-100 border border-base-300 rounded-[2rem] overflow-hidden shadow-sm">
              <div className="bg-base-200 border-b border-base-300 px-8 py-4 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral/50">
                  Media
                </span>
              </div>

              <div className="p-8 space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral/50 block">
                  Image URL
                </label>
                <input
                  name="image"
                  type="url"
                  placeholder="https://image-link.com/photo.jpg"
                  className={inputClass}
                  required
                />
              </div>
            </div>
          </div>

          {/* ───── Right Column ───── */}
          <div className="space-y-6">
            {/* Pricing & Stock Card */}
            <div className="bg-base-100 border border-base-300 rounded-[2rem] overflow-hidden shadow-sm">
              <div className="bg-base-200 border-b border-base-300 px-8 py-4 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral/50">
                  Pricing & Stock
                </span>
              </div>

              <div className="p-8 space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral/50 block">
                    Price ($)
                  </label>
                  <input
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className={`${inputClass} text-primary font-black`}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral/50 flex items-center gap-1 block">
                    <Package size={10} /> Stock Quantity
                  </label>
                  <input
                    name="stock"
                    type="number"
                    min="0"
                    placeholder="0"
                    className={inputClass}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral/50 flex items-center gap-1 block">
                    <Hash size={10} /> SKU Code
                  </label>
                  <input
                    name="sku"
                    type="text"
                    placeholder="PROD-123"
                    className={inputClass}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Trending Toggle Card */}
            <div className="bg-base-100 border border-base-300 rounded-[2rem] overflow-hidden shadow-sm">
              <div className="bg-base-200 border-b border-base-300 px-8 py-4 flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral/50">
                  Visibility
                </span>
              </div>

              <div className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-black text-sm text-secondary">
                      Trending Item
                    </p>
                    <p className="text-[10px] font-bold text-neutral/40 uppercase tracking-wider mt-0.5">
                      Show in trending section
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={isTrending}
                    onChange={(e) => setIsTrending(e.target.checked)}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full h-14 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-primary/20 text-white"
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  <Save size={18} />
                  Publish Product
                </>
              )}
            </button>

            {/* Cancel */}
            <Link
              href="/dashboard/manage-products"
              className="btn btn-ghost w-full rounded-2xl font-black uppercase tracking-widest border border-base-300 text-neutral"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
