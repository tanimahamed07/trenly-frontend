// src/app/(public)/explore/[id]/page.tsx
// ✅ Server Component — no "use client"

import { Package } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TProduct } from "@/types/product";
import ProductDetailClient from "./ProductDetailClient";


async function getProduct(id: string): Promise<TProduct | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/items/${id}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    return data.success ? data.data : null;
  } catch {
    return null;
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-base-100">
        <Package size={56} className="text-base-300" />
        <h2 className="text-2xl font-black text-secondary">Product not found</h2>
        <Link
          href="/explore"
          className="flex items-center gap-2 text-primary font-bold text-sm underline underline-offset-4"
        >
          <ArrowLeft size={16} /> Back to Explore
        </Link>
      </div>
    );
  }

  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(
          ((product.compareAtPrice - product.price) / product.compareAtPrice) *
            100
        )
      : null;

  return <ProductDetailClient product={product} discount={discount} />;
}