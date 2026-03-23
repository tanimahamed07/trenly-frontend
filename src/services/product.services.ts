// services/productService.ts


export const getTrendingProducts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/items?isTrending=true&limit=8`,
     { cache: "no-store" }, // ← এটা দাও আপাতত
  );

  if (!res.ok) {
    // এরর হ্যান্ডেল করা ভালো
    return [];
  }

  const data = await res.json();

  return data.success ? data.data : [];
};

export const getNewArrivalProducts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/items?sort=-createdAt&limit=8`,
    {
      next: {
        revalidate: 3600,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data.success ? data.data : [];
};

export const getTopRatedProducts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/items?rating=4&limit=8`,
    {
      next: {
        revalidate: 3600,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data.success ? data.data : [];
};


// services/product.service.ts
export const getAllProducts = async (queryParams: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/items?${queryParams}`,
    {
      cache: "no-store",
    }
  );
  return res.json();
};

import { TProduct } from "@/types/product";

export const getSingleProduct = async (id: string): Promise<TProduct | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/items/${id}`,
      { cache: "no-store" } 
    );
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error("Fetch Product Error:", error);
    return null;
  }
};

// src/services/product.service.ts
import { TProduct, TApiResponse } from "@/types/product";

export const getRelatedProducts = async (
  category: string,
  currentId: string,
  limit: number = 8
): Promise<TProduct[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/items?category=${category}&limit=${limit}`,
      { cache: "no-store" }
    );
    const data: TApiResponse<TProduct[]> = await res.json();
    
    if (!data.success) return [];

    return data.data
      .filter((p) => p._id !== currentId)
      .slice(0, 4);
  } catch (error) {
    console.error("Related Products Fetch Error:", error);
    return [];
  }
};