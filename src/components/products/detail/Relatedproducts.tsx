import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/shared/ProductCard";
import { getRelatedProducts } from "@/services/product.services";

interface RelatedProductsProps {
  category: string;
  currentId: string;
}

export default async function RelatedProducts({
  category,
  currentId,
}: RelatedProductsProps) {
  const products = await getRelatedProducts(category, currentId);

  // যদি কোনো রিলেটেড প্রোডাক্ট না থাকে, তবে সেকশনটি দেখানোর দরকার নেই
  if (products.length === 0) return null;

  return (
    <section className="container mx-auto px-4 pb-16">
      {/* ── Section Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase text-primary bg-primary/8 px-3 py-1 rounded-full border border-primary/20">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block" />
            More Like This
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-secondary tracking-tight">
            Related <span className="text-primary italic">Products</span>
          </h2>
        </div>

        {/* Desktop View All */}
        <Link
          href={`/explore?category=${category}`}
          className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-primary border border-primary/20 bg-primary/5 hover:bg-primary/10 px-4 py-2 rounded-2xl transition-all group"
        >
          View All
          <ArrowRight
            size={14}
            className="group-hover:translate-x-1 transition-transform duration-300"
          />
        </Link>
      </div>

      {/* ── Product Grid ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* ── Mobile View All ── */}
      <div className="mt-8 flex justify-center sm:hidden">
        <Link
          href={`/explore?category=${category}`}
          className="w-full flex items-center justify-center gap-2 text-sm font-bold text-primary border border-primary/20 bg-primary/5 px-6 py-3.5 rounded-2xl active:scale-95 transition-transform"
        >
          View All <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}