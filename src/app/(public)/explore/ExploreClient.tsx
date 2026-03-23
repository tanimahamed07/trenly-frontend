"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  X,
  RefreshCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getAllProducts } from "@/services/product.services";
import { TProduct } from "@/types/product";
import ProductCard from "@/components/shared/ProductCard";

interface ExploreClientProps {
  initialProducts: TProduct[];
  initialMeta: { total: number; limit: number };
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

  // ✅ URL-ই single source of truth — সব filter URL থেকে পড়া হয়
  const urlCategory = searchParams.get("category") ?? "";
  const urlSearch = searchParams.get("search") ?? "";
  const urlPage = Number(searchParams.get("page") ?? "1");
  const urlPriceMax = Number(searchParams.get("priceMax") ?? "10000");
  const urlSort = searchParams.get("sort") ?? "";

  // শুধু search input এর জন্য local state (debounce এর কারণে)
  const [searchInput, setSearchInput] = useState(urlSearch);
  const [products, setProducts] = useState<TProduct[]>(initialProducts);
  const [totalPages, setTotalPages] = useState(
    Math.ceil((initialMeta.total || 0) / LIMIT)
  );
  const [loading, setLoading] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    setSearchInput(urlSearch);
  }, [urlSearch]);


  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.set("limit", String(LIMIT));
        params.set("page", String(urlPage));
        if (urlSearch) params.set("search", urlSearch);
        if (urlCategory) params.set("category", urlCategory);
        if (urlPriceMax < 10000) params.set("priceMax", String(urlPriceMax));
        if (urlSort) params.set("sort", urlSort);

        const res = await getAllProducts(params.toString());
        if (res?.success) {
          setProducts(res.data ?? []);
          setTotalPages(Math.ceil((res.meta?.total ?? 0) / LIMIT));
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [urlCategory, urlSearch, urlPage, urlPriceMax, urlSort]);

  // ✅ Filter change → URL update করো (page reset সহ)
  const updateURL = (updates: Record<string, string | number | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "" || value === 0) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    // page ছাড়া অন্য filter change হলে page reset
    if (!("page" in updates)) {
      params.delete("page");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Search debounce — typing এ URL বারবার না বদলে
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => {
      updateURL({ search: value || null, page: null });
    }, 400);
  };

  const resetFilters = () => {
    setSearchInput("");
    router.push("?", { scroll: false });
  };

  return (
    <div className="bg-base-100 min-h-screen">
      {/* Mobile backdrop */}
      {showMobileFilters && (
        <div
          className="fixed inset-0 z-[99] bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setShowMobileFilters(false)}
        />
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-secondary tracking-tight">
              Explore <span className="text-primary italic">Items</span>
            </h1>
            <p className="text-neutral/50 text-sm mt-2 font-medium">
              {loading
                ? "Searching..."
                : `Showing page ${urlPage} of ${totalPages || 1}`}
            </p>
          </div>
          <button
            onClick={() => setShowMobileFilters(true)}
            className="md:hidden flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 px-6 rounded-2xl shadow-lg"
          >
            <SlidersHorizontal size={18} /> Filters
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Sidebar */}
          <aside
            className={`
              fixed inset-y-0 right-0 z-[100] w-[300px] bg-base-100 p-6 shadow-2xl transition-transform duration-300
              md:relative md:inset-auto md:z-0 md:w-64 lg:w-72 md:p-0 md:shadow-none md:translate-x-0
              ${showMobileFilters ? "translate-x-0" : "translate-x-full"}
              md:block
            `}
          >
            <div className="sticky top-28 space-y-8">
              {/* Mobile close */}
              <div className="flex items-center justify-between md:hidden mb-2">
                <h2 className="text-2xl font-black">Filters</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 bg-base-200 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Search */}
              <div className="space-y-3">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-secondary/40">
                  Search
                </h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral/30 size-4" />
                  <input
                    type="text"
                    value={searchInput}
                    placeholder="Search name..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-base-200/50 outline-none text-sm font-medium border border-transparent focus:border-primary transition-colors"
                    onChange={(e) => handleSearchChange(e.target.value)}
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-3">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-secondary/40">
                  Categories
                </h3>
                <div className="flex flex-col gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() =>
                        updateURL({ category: cat.value || null, page: null })
                      }
                      className={`text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                        urlCategory === cat.value
                          ? "bg-primary text-white shadow-md shadow-primary/20"
                          : "bg-base-200/40 hover:bg-base-200 text-secondary/60"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-[11px] font-black uppercase tracking-widest text-secondary/40">
                    Max Price
                  </h3>
                  <span className="text-primary font-bold text-xs">
                    ${urlPriceMax.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={urlPriceMax}
                  onChange={(e) =>
                    updateURL({
                      priceMax:
                        Number(e.target.value) < 10000
                          ? Number(e.target.value)
                          : null,
                      page: null,
                    })
                  }
                  className="w-full h-1.5 bg-base-300 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[10px] text-secondary/30 font-medium">
                  <span>$0</span>
                  <span>$10,000</span>
                </div>
              </div>

              {/* Sort */}
              <div className="space-y-3">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-secondary/40">
                  Sort By
                </h3>
                <select
                  value={urlSort}
                  className="w-full px-4 py-3 rounded-xl bg-base-200/50 outline-none text-sm font-bold text-secondary/80 cursor-pointer border border-transparent focus:border-primary transition-colors"
                  onChange={(e) =>
                    updateURL({ sort: e.target.value || null, page: null })
                  }
                >
                  <option value="">Default Order</option>
                  <option value="-createdAt">New Arrivals</option>
                  <option value="price">Price: Low to High</option>
                  <option value="-price">Price: High to Low</option>
                  <option value="-rating">Top Rated</option>
                </select>
              </div>

              {/* Reset */}
              <button
                onClick={resetFilters}
                className="w-full py-4 rounded-2xl bg-error/5 text-error text-[10px] font-black uppercase tracking-widest hover:bg-error hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <RefreshCcw size={14} /> Reset All Filters
              </button>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1 min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                Array.from({ length: LIMIT }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-base-200/50 animate-pulse h-[420px] rounded-[2.5rem]"
                  />
                ))
              ) : products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-24 bg-base-200/20 rounded-[3rem] border-2 border-dashed border-base-300">
                  <Search size={40} className="text-neutral/20 mb-4" />
                  <h3 className="text-xl font-bold text-secondary">
                    No products found
                  </h3>
                  <p className="text-sm text-neutral/40 mt-1">
                    Try adjusting your filters or search term
                  </p>
                  <button
                    onClick={resetFilters}
                    className="mt-4 text-primary font-bold underline underline-offset-4"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-16 pb-10">
                <button
                  disabled={urlPage === 1}
                  onClick={() => updateURL({ page: urlPage - 1 })}
                  className="p-3 rounded-xl bg-base-200 hover:bg-primary hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="flex gap-2 flex-wrap justify-center">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => updateURL({ page })}
                        className={`w-10 h-10 rounded-xl font-bold transition-all ${
                          urlPage === page
                            ? "bg-primary text-white shadow-lg shadow-primary/30"
                            : "bg-base-200 hover:bg-base-300"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  disabled={urlPage === totalPages}
                  onClick={() => updateURL({ page: urlPage + 1 })}
                  className="p-3 rounded-xl bg-base-200 hover:bg-primary hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
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

const ExploreClient = (props: ExploreClientProps) => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex justify-center items-center">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      }
    >
      <ExploreContent {...props} />
    </Suspense>
  );
};

export default ExploreClient;