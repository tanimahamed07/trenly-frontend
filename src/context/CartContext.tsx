"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { TProduct } from "@/types/product";

interface CartItem extends TProduct {
  qty: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: TProduct, qty: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, delta: number) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("trendly-cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("trendly-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: TProduct, qty: number) => {
    setCart((prev) => {
      // ✅ id-r bodole _id use kora hoyeche
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + qty } : item,
        );
      }
      return [...prev, { ...product, qty }];
    });
  };

  const removeFromCart = (id: string) => {
    // ✅ _id filtering
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item,
      ),
    );
  };

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
