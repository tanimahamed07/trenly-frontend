"use client";

import React, { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X, RefreshCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { getAllProducts } from "@/services/product.services";
import { TProduct } from "@/types/product";
import ProductCard from "@/components/shared/ProductCard";

interface ExploreClientProps {
  initialProducts: TProduct[];
  initialMeta: { total: number; limit: number };
}

const ExploreContent = ({ initialProducts, initialMeta }: ExploreClientProps) => {
  const searchParams = useSearchParams();
  const isMounted = useRef(false);
  
  // URL values
  const urlCategory = searchParams.get("category") || "";
  const urlSearch = searchParams.get("search") || "";

  const [products, setProducts] = useState<TProduct[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(initialMeta.total / initialMeta.limit));
  const [searchTerm, setSearchTerm] = useState(urlSearch);
  const [category, setCategory] = useState(urlCategory);
  const [priceMax, setPriceMax] = useState(10000);
  const [sortBy, setSortBy] = useState("");

  // ১. URL প্যারামস চেঞ্জ হলে স্টেট আপডেট
  useEffect(() => {
    if (urlCategory || urlSearch) {
      setCategory(urlCategory);
      setSearchTerm(urlSearch);
      setCurrentPage(1);
    }
  }, [urlCategory, urlSearch]);

  const fetchFilteredProducts = useCallback(async () => {
    setLoading(true);
    const filters: any = {
      search: searchTerm,
      priceMax,
      page: currentPage,
      limit: 9,
    };

    // ক্যাটাগরি থাকলে তবেই ফিল্টারে পাঠাবে
    if (category) filters.category = category;
    if (sortBy) filters.sort = sortBy;

    const queryParams = new URLSearchParams(filters).toString();
    try {
      const res = await getAllProducts(queryParams);
      if (res.success) {
        setProducts(res.data);
        setTotalPages(Math.ceil((res.meta?.total || 0) / (res.meta?.limit || 9)));
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, category, priceMax, sortBy, currentPage]);

  // ২. ফিল্টার চেঞ্জ হলে এপিআই কল (Debounced)
  useEffect(() => {
    // প্রথম মাউন্টে এপিআই কল স্কিপ (যদি কোনো স্পেশাল URL প্যারাম না থাকে)
    if (!isMounted.current) {
      isMounted.current = true;
      if (!urlCategory && !urlSearch) return;
    }

    const handler = setTimeout(() => {
      fetchFilteredProducts();
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm, category, priceMax, sortBy, currentPage, fetchFilteredProducts, urlCategory, urlSearch]);

  const resetFilters = () => {
    setSearchTerm("");
    setCategory("");
    setPriceMax(10000);
    setSortBy("");
    setCurrentPage(1);
  };

  return (
    <div className="bg-base-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-secondary tracking-tight">
              Explore <span className="text-primary italic">Items</span>
            </h1>
            <p className="text-neutral/50 text-sm mt-2 font-medium">
              {loading ? "Searching..." : `Showing page ${currentPage} of ${totalPages}`}
            </p>
          </div>
          <button onClick={() => setShowMobileFilters(true)} className="md:hidden flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 px-6 rounded-2xl shadow-lg">
            <SlidersHorizontal size={18} /> Filters
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Sidebar */}
          <aside className={`fixed inset-0 z-[100] bg-base-100 p-6 md:relative md:inset-auto md:z-0 md:p-0 md:w-64 lg:w-72 md:block ${showMobileFilters ? "block" : "hidden"}`}>
            <div className="sticky top-28 space-y-10">
              <div className="flex items-center justify-between md:hidden mb-6">
                <h2 className="text-2xl font-black">Filters</h2>
                <button onClick={() => setShowMobileFilters(false)} className="p-2 bg-base-200 rounded-full"><X size={20}/></button>
              </div>

              {/* Search */}
              <div className="space-y-3">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-secondary/40">Search</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral/30 size-4" />
                  <input type="text" value={searchTerm} placeholder="Search name..." className="w-full pl-10 pr-4 py-3 rounded-xl bg-base-200/50 outline-none text-sm font-medium border border-transparent focus:border-primary" onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}} />
                </div>
              </div>

              {/* Categories - Fixed "All Categories" logic */}
              <div className="space-y-3">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-secondary/40">Categories</h3>
                <div className="flex flex-col gap-2">
                  {["", "Electronics", "Fashion", "Home", "Sports", "Machinery"].map((cat) => (
                    <button 
                      key={cat} 
                      onClick={() => {setCategory(cat ? cat.toLowerCase() : ""); setCurrentPage(1);}} 
                      className={`text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${category === cat.toLowerCase() ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-base-200/40 hover:bg-base-200 text-secondary/60"}`}
                    >
                      {cat === "" ? "All Categories" : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-[11px] font-black uppercase tracking-widest text-secondary/40">Max Price</h3>
                  <span className="text-primary font-bold text-xs">${priceMax}</span>
                </div>
                <input type="range" min="0" max="10000" step="100" value={priceMax} onChange={(e) => {setPriceMax(Number(e.target.value)); setCurrentPage(1);}} className="w-full h-1.5 bg-base-300 rounded-lg appearance-none cursor-pointer accent-primary" />
              </div>

              {/* Sort */}
              <div className="space-y-3">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-secondary/40">Sort By</h3>
                <select value={sortBy} className="w-full px-4 py-3 rounded-xl bg-base-200/50 outline-none text-sm font-bold text-secondary/80 cursor-pointer border border-transparent focus:border-primary" onChange={(e) => {setSortBy(e.target.value); setCurrentPage(1);}}>
                  <option value="">Default Order</option>
                  <option value="-createdAt">New Arrivals</option>
                  <option value="price">Price: Low to High</option>
                  <option value="-price">Price: High to Low</option>
                  <option value="-rating">Top Rated</option>
                </select>
              </div>

              <button onClick={resetFilters} className="w-full py-4 rounded-2xl bg-error/5 text-error text-[10px] font-black uppercase tracking-widest hover:bg-error hover:text-white transition-all flex items-center justify-center gap-2">
                <RefreshCcw size={14} /> Reset All Filters
              </button>
            </div>
          </aside>

          {/* Grid & Pagination */}
          <main className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-base-200/50 animate-pulse h-[420px] rounded-[2.5rem]"></div>
                ))
              ) : products.length > 0 ? (
                products.map((product) => <ProductCard key={product._id} product={product} />)
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-24 bg-base-200/20 rounded-[3rem] border-2 border-dashed border-base-300">
                  <Search size={40} className="text-neutral/20 mb-4" />
                  <h3 className="text-xl font-bold text-secondary">No products found</h3>
                  <button onClick={resetFilters} className="mt-4 text-primary font-bold underline">Clear all filters</button>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {!loading && totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-16 pb-10">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="p-3 rounded-xl bg-base-200 hover:bg-primary hover:text-white transition-all disabled:opacity-30">
                  <ChevronLeft size={20} />
                </button>
                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-10 h-10 rounded-xl font-bold transition-all ${currentPage === i + 1 ? "bg-primary text-white shadow-lg" : "bg-base-200 hover:bg-base-300"}`}>
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="p-3 rounded-xl bg-base-200 hover:bg-primary hover:text-white transition-all disabled:opacity-30">
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

const ExploreClient = (props: ExploreClientProps) => {
  return (
    <Suspense fallback={<div className="min-h-screen flex justify-center items-center">Loading Explore...</div>}>
      <ExploreContent {...props} />
    </Suspense>
  );
};

export default ExploreClient;