"use client";

import { ShoppingCart } from "lucide-react";
import { TProduct } from "@/types/product";
import { useCart } from "@/context/CartContext"; // ✅ Context hook import

export const AddToCartButton = ({ product }: { product: TProduct }) => {
  const { addToCart } = useCart(); // ✅ addToCart function-ti niye asa holo

  const handleAdd = (e: React.MouseEvent) => {
    // Jodi button-ti kono Link ba Card-er bhetore thake, tobe propagation stop kora bhalo
    e.preventDefault();
    e.stopPropagation();

    // ✅ Context call kore cart-e item add kora
    addToCart(product, 1);
    
    console.log("Added to cart:", product.title);
  };

  return (
    <button
      onClick={handleAdd}
      className="btn btn-primary btn-circle shadow-lg shadow-primary/20 hover:scale-110 active:scale-95 transition-all"
      title="Add to Cart"
    >
      <ShoppingCart size={20} className="text-white" />
    </button>
  );
};