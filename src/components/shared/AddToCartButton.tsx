"use client";
import { ShoppingCart } from "lucide-react";
import { TProduct } from "@/types/product";

export const AddToCartButton = ({ product }: { product: TProduct }) => {
  const handleAdd = () => {
    console.log("Added to cart:", product.title);
  };

  return (
    <button
      onClick={handleAdd}
      className="btn btn-primary btn-circle shadow-lg shadow-primary/20 hover:scale-110 active:scale-95 transition-all"
    >
      <ShoppingCart size={20} className="text-white" />
    </button>
  );
};
