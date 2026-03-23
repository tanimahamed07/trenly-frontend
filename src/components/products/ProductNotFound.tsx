import { Package, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const ProductNotFound = () => (
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