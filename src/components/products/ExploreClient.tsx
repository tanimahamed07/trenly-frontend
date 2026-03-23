"use client";

import React, { useState, useEffect, useRef, Suspense, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  X,
  RefreshCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { TProduct } from "@/types/product";
import ProductCard from "@/components/shared/ProductCard";
import { getAllProducts } from "@/services/product.services";

interface ExploreClientProps {
  initialProducts: TProduct[];
  initialMeta: { total: number; limit: number; page?: number };
}

const LIMIT = 9;
const CATEGORIES = [
  { label: "All Categories", value: "" },
  { label: "Electronics", value: "electronics" },
  { label: "Fashion", value: "fashion" },
  { label: "Home", value: "home" },
  { label: "Sports", value: "sports" },
  { label: "Machinery", value: "machinery" },
];

const ExploreContent = ({ initialProducts, initialMeta }: ExploreClientProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL-ই single source of truth
  const urlCategory = searchParams.get("category") ?? "";
  const urlSearch = searchParams.get("search") ?? "";
  const urlPage = Number(searchParams.get("page") ?? "1");
  const urlPriceMax = Number(searchParams.get("priceMax") ?? "10000");
  const urlSort = searchParams.get("sort") ?? "";

  const [searchInput, setSearchInput] = useState(urlSearch);
  const [products, setProducts] = useState<TProduct[]>(initialProducts);
  const [totalPages, setTotalPages] = useState(Math.ceil((initialMeta.total || 0) / LIMIT));
  const [loading, setLoading] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    setSearchInput(urlSearch);
  }, [urlSearch]);

  // Fetch Logic
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams(searchParams.toString());
        query.set("limit", String(LIMIT));
        const res = await getAllProducts(query.toString());
        if (res?.success) {
          setProducts(res.data ?? []);
          setTotalPages(Math.ceil((res.meta?.total ?? 0) / LIMIT));
        }
      } catch {
        console.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchParams]);

  const updateURL = useCallback((updates: Record<string, string | number | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === 0 || value === "") params.delete(key);
      else params.set(key, String(value));
    });
    if (!("page" in updates)) params.delete("page");
    router.push(`?${params.toString()}`, { scroll: false });
  }, [searchParams, router]);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      updateURL({ search: value || null });
    }, 500);
  };

  const resetFilters = () => {
    setSearchInput("");
    router.push("/explore", { scroll: false });
  };

  return (
    <div className="bg-base-100 min-h-screen pb-20 text-neutral">
      {/* Mobile Drawer Backdrop */}
      <div 
        className={`fixed inset-0 z-[99] bg-secondary/20 backdrop-blur-md transition-opacity md:hidden ${showMobileFilters ? "opacity-100" : "opacity-0 pointer-events-none"}`} 
        onClick={() => setShowMobileFilters(false)} 
      />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="space-y-1">
            <h1 className="text-4xl md:text-5xl font-black text-secondary tracking-tighter">
              Explore <span className="text-primary italic">Items</span>
            </h1>
            <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
               <p className="text-neutral/50 text-[10px] font-black uppercase tracking-[0.2em]">
                {loading ? "Searching..." : `Page ${urlPage} of ${totalPages || 1}`}
              </p>
            </div>
          </div>
          <button 
            onClick={() => setShowMobileFilters(true)} 
            className="md:hidden flex items-center justify-center gap-3 bg-secondary text-base-100 font-black py-4 px-8 rounded-2xl shadow-xl active:scale-95 transition-all"
          >
            <SlidersHorizontal size={18} /> Filters
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar - Filters */}
          <aside className={`fixed inset-y-0 right-0 z-[100] w-[320px] bg-base-100 border-l border-base-300 p-8 shadow-2xl transition-transform duration-500 md:relative md:inset-auto md:z-0 md:w-72 lg:w-80 md:p-0 md:shadow-none md:translate-x-0 md:border-none ${showMobileFilters ? "translate-x-0" : "translate-x-full"}`}>
            <div className="sticky top-28 space-y-10">
              <div className="flex items-center justify-between md:hidden">
                <h2 className="text-2xl font-black text-secondary">Filters</h2>
                <button onClick={() => setShowMobileFilters(false)} className="p-3 bg-base-200 text-secondary rounded-2xl"><X size={20} /></button>
              </div>

              {/* Search */}
              <div className="group space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40">Keyword</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/30 group-focus-within:text-primary transition-colors" size={16} />
                  <input 
                    type="text" 
                    value={searchInput} 
                    placeholder="Search name..." 
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-base-200 border border-transparent outline-none focus:border-primary/50 focus:bg-base-100 transition-all font-bold text-sm text-secondary" 
                    onChange={(e) => handleSearchChange(e.target.value)} 
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40">Category</label>
                <div className="flex flex-col gap-2">
                  {CATEGORIES.map((cat) => (
                    <button 
                      key={cat.value} 
                      onClick={() => updateURL({ category: cat.value || null })} 
                      className={`text-left px-5 py-3 rounded-2xl text-xs font-black transition-all border-2 ${urlCategory === cat.value ? "bg-secondary text-base-100 border-secondary shadow-lg shadow-secondary/20" : "bg-transparent border-base-300 hover:border-primary/50 text-secondary/70"}`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40">Max Price</label>
                  <span className="text-primary font-black text-xs">${urlPriceMax.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="10000" 
                  step="100" 
                  value={urlPriceMax} 
                  onChange={(e) => updateURL({ priceMax: Number(e.target.value) < 10000 ? e.target.value : null })} 
                  className="range range-primary range-xs" 
                />
              </div>

              {/* Sort By */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40">Sort Order</label>
                <select 
                  value={urlSort} 
                  className="select select-bordered w-full rounded-2xl bg-base-200 border-transparent focus:border-primary/50 font-bold text-xs text-secondary" 
                  onChange={(e) => updateURL({ sort: e.target.value || null })}
                >
                  <option value="">Default Order</option>
                  <option value="-createdAt">New Arrivals</option>
                  <option value="price">Price: Low to High</option>
                  <option value="-price">Price: High to Low</option>
                  <option value="-rating">Top Rated</option>
                </select>
              </div>

              <button 
                onClick={resetFilters} 
                className="w-full py-4 rounded-2xl bg-error/10 text-error text-[10px] font-black uppercase tracking-widest hover:bg-error hover:text-white transition-all flex items-center justify-center gap-2 border border-error/20"
              >
                <RefreshCcw size={14} /> Reset Filters
              </button>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1 min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                Array.from({ length: LIMIT }).map((_, i) => (
                  <div key={i} className="bg-base-200 animate-pulse h-[420px] rounded-[2.5rem] border border-base-300" />
                ))
              ) : products.length > 0 ? (
                products.map((product) => <ProductCard key={product._id} product={product} />)
              ) : (
                <div className="col-span-full py-32 flex flex-col items-center bg-base-200/30 rounded-[3rem] border-2 border-dashed border-base-300">
                  <Search size={48} className="text-secondary/10 mb-6" />
                  <p className="text-secondary font-black text-xl">No Matches Found</p>
                  <button onClick={resetFilters} className="mt-4 text-primary font-bold hover:underline underline-offset-8">Clear filters</button>
                </div>
              )}
            </div>

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="mt-20 flex justify-center items-center gap-3">
                <button 
                  disabled={urlPage === 1} 
                  onClick={() => updateURL({ page: urlPage - 1 })} 
                  className="p-4 rounded-2xl bg-base-200 text-secondary hover:bg-primary hover:text-white disabled:opacity-20 transition-all border border-base-300"
                >
                  <ChevronLeft size={20} />
                </button>
                
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button 
                      key={p} 
                      onClick={() => updateURL({ page: p })} 
                      className={`w-12 h-12 rounded-2xl font-black text-xs transition-all border ${urlPage === p ? "bg-secondary text-base-100 border-secondary shadow-xl shadow-secondary/20 scale-110" : "bg-base-100 border-base-300 hover:border-primary text-secondary"}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                <button 
                  disabled={urlPage === totalPages} 
                  onClick={() => updateURL({ page: urlPage + 1 })} 
                  className="p-4 rounded-2xl bg-base-200 text-secondary hover:bg-primary hover:text-white disabled:opacity-20 transition-all border border-base-300"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

const ExploreClient = (props: ExploreClientProps) => (
  <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><span className="loading loading-ring loading-lg text-primary" /></div>}>
    <ExploreContent {...props} />
  </Suspense>
);

export default ExploreClient;