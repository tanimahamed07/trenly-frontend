import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const ProductBreadcrumb = ({ category, title }: { category: string; title: string }) => (
  <div className="container mx-auto px-4 pt-6 pb-2">
    <div className="flex items-center gap-2 text-[11px] font-bold text-neutral/30 uppercase tracking-widest flex-wrap">
      <Link href="/" className="hover:text-primary transition-colors">Home</Link>
      <ChevronRight size={12} />
      <Link href="/explore" className="hover:text-primary transition-colors">Explore</Link>
      <ChevronRight size={12} />
      <Link href={`/explore?category=${category}`} className="hover:text-primary transition-colors capitalize">{category}</Link>
      <ChevronRight size={12} />
      <span className="text-secondary/50 truncate max-w-[140px]">{title}</span>
    </div>
  </div>
);