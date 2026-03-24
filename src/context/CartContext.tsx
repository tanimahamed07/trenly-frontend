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
  clearCart: () => void; // ✅ Checkout-এর পর কার্ট খালি করার জন্য
  cartCount: number;
  isLoaded: boolean; // ✅ রিফ্রেশ সমস্যা সমাধানের জন্য
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false); // হাইড্রেশন ট্র্যাকিং

  // ১. মাউন্ট হওয়ার পর একবার localStorage থেকে ডেটা লোড করা
  useEffect(() => {
    const savedCart = localStorage.getItem("trendly-cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
    setIsLoaded(true); // লোডিং শেষ
  }, []);

  // ২. কার্ট স্টেট আপডেট হওয়ার সাথে সাথে localStorage-এ সেভ করা
  // তবে শুধুমাত্র যখন isLoaded true হবে (যাতে শুরুতে ফাঁকা অ্যারে সেভ না হয়ে যায়)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("trendly-cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (product: TProduct, qty: number) => {
    setCart((prev) => {
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

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("trendly-cart");
  };

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        cartCount,
        isLoaded,
      }}
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
