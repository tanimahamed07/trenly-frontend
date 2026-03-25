"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  ArrowLeft,
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
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast, Toaster } from "sonner";
import { getSingleProduct, updateProduct } from "@/services/product.services";

const CATEGORIES = ["Electronics", "Fashion", "Home", "Sports", "Machinery"];

const inputClass =
  "w-full px-4 py-3 rounded-2xl font-bold text-sm border border-base-300 bg-base-200 text-neutral placeholder:text-neutral/30 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition-all";

const EditProduct = () => {
  const router = useRouter();
  const { id } = useParams();
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [isTrending, setIsTrending] = useState(false);
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // ইমেজের জন্য আলাদা স্টেট

  const [initialData, setInitialData] = useState<any>(null);

  const token = (session?.user as any)?.accessToken;

  const fetchProductDetails = useCallback(async () => {
    try {
      setFetching(true);
      const res = await getSingleProduct(id as string);
      if (res) {
        setInitialData(res);
        setCategory(res.category);
        setIsTrending(res.isTrending);
        setImageUrl(res.image); // ইনিশিয়াল ইমেজ সেট করা
      } else {
        toast.error("Product not found!");
        router.push("/dashboard/manage-products");
      }
    } catch (error) {
      toast.error("Failed to fetch product details");
    } finally {
      setFetching(false);
    }
  }, [id, router]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return toast.error("Please login to perform this action");

    const formData = new FormData(e.currentTarget);
    const updatedData = {
      title: formData.get("title"),
      price: Number(formData.get("price")),
      stock: Number(formData.get("stock")),
      category,
      sku: formData.get("sku"),
      image: imageUrl, // স্টেট থেকে ইমেজ নেয়া
      description: formData.get("description"),
      brand: formData.get("brand"),
      isTrending,
    };

    try {
      setLoading(true);
      const res = await updateProduct(token, id as string, updatedData);
      if (res.success) {
        toast.success("Product updated successfully!");
        router.push("/dashboard/manage-products");
        router.refresh();
      } else {
        toast.error(res.message || "Failed to update product");
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-widest text-neutral/30">
          Loading Product Data...
        </p>
      </div>
    );
  }

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
            Edit Product
          </h2>
          <p className="text-[10px] font-bold text-neutral/40 uppercase tracking-widest">
            Inventory / Update item : {initialData?.sku}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-base-100 border border-base-300 rounded-[2rem] overflow-hidden shadow-sm">
              <div className="bg-base-200 border-b border-base-300 px-8 py-4 flex items-center gap-2">
                <AlignLeft className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral/50">
                  Basic Information
                </span>
              </div>

              <div className="p-8 space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral/50 block">
                    Product Title
                  </label>
                  <input
                    name="title"
                    type="text"
                    defaultValue={initialData?.title}
                    className={inputClass}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral/50 block">
                      <Tag size={10} className="inline mr-1" /> Category
                    </label>
                    <div className="relative">
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                        required
                      >
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

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral/50 block">
                      <Layers size={10} className="inline mr-1" /> Brand
                    </label>
                    <input
                      name="brand"
                      type="text"
                      defaultValue={initialData?.brand}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral/50 block">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows={5}
                    defaultValue={initialData?.description}
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>
            </div>

            {/* Media Section with Preview & Link */}
            <div className="bg-base-100 border border-base-300 rounded-[2rem] overflow-hidden shadow-sm">
              <div className="bg-base-200 border-b border-base-300 px-8 py-4 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral/50">
                  Media & Visuals
                </span>
              </div>

              <div className="p-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Image Preview Box */}
                  <div className="relative w-full md:w-48 aspect-square rounded-[1.5rem] bg-base-200 border border-base-300 overflow-hidden group">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt="Preview"
                        fill
                        className="object-cover transition-transform group-hover:scale-110"
                        unoptimized // External link এর জন্য সুবিধাজনক
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-neutral/20">
                        <ImageIcon size={40} />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-4 w-full">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-neutral/50 block">
                        Image URL
                      </label>
                      <input
                        name="image"
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className={inputClass}
                        required
                      />
                    </div>

                    {/* View Original Link Button */}
                    {imageUrl && (
                      <a
                        href={imageUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-[10px] font-bold text-primary hover:underline uppercase tracking-widest"
                      >
                        <ExternalLink size={12} /> View Original Image
                      </a>
                    )}
                    <p className="text-[9px] font-medium text-neutral/30 italic">
                      * Changes to the URL will update the preview box
                      automatically.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
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
                    defaultValue={initialData?.price}
                    className={`${inputClass} text-primary font-black`}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral/50 block">
                    Stock Quantity
                  </label>
                  <input
                    name="stock"
                    type="number"
                    defaultValue={initialData?.stock}
                    className={inputClass}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral/50 block">
                    SKU Code
                  </label>
                  <input
                    name="sku"
                    type="text"
                    defaultValue={initialData?.sku}
                    className={inputClass}
                    required
                  />
                </div>
              </div>
            </div>

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

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full h-14 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-primary/20 text-white"
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                "Update Product"
              )}
            </button>

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

export default EditProduct;
