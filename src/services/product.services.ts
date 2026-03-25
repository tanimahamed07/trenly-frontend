import { TProduct } from "@/types/product";

// কমন এপিআই রেসপন্স টাইপ
export interface TApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * ১. সমস্ত প্রোডাক্ট পাওয়ার জন্য (Search/Filter/Pagination)
 */
export const getAllProducts = async (queryParams: string = "") => {
  try {
    const res = await fetch(`${BASE_URL}/items?${queryParams}`, {
      cache: "no-store",
    });

    if (!res.ok) return { success: false, data: [] };
    return res.json();
  } catch {
    return { success: false, data: [] };
  }
};

/**
 * ২. সিঙ্গেল প্রোডাক্ট ডিটেইলস
 */
export const getSingleProduct = async (id: string): Promise<TProduct | null> => {
  try {
    const res = await fetch(`${BASE_URL}/items/${id}`, {
      cache: "no-store",
    });
    
    if (!res.ok) return null;
    
    const data: TApiResponse<TProduct> = await res.json();
    return data.success ? data.data : null;
  } catch {
    // console.error ব্যবহার করতে চাইলে আন্ডারস্কোর (_) দিয়ে রাখুন, নয়তো শুধু catch {} লিখুন
    return null;
  }
};

/**
 * ৩. রিলেটেড প্রোডাক্টস (ক্যাটাগরি অনুযায়ী)
 */
export const getRelatedProducts = async (
  category: string,
  currentId: string,
  limit: number = 8
): Promise<TProduct[]> => {
  try {
    const res = await fetch(
      `${BASE_URL}/items?category=${category}&limit=${limit}`,
      { cache: "no-store" }
    );
    
    if (!res.ok) return [];
    
    const data: TApiResponse<TProduct[]> = await res.json();

    if (!data.success) return [];

    // বর্তমান প্রোডাক্টটি বাদ দিয়ে প্রথম ৪টি রিটার্ন করা
    return data.data
      .filter((p) => p._id !== currentId)
      .slice(0, 4);
  } catch {
    return [];
  }
};

/**
 * ৪. ট্রেন্ডিং প্রোডাক্টস (isTrending flag অনুযায়ী)
 */
export const getTrendingProducts = async (): Promise<TProduct[]> => {
  try {
    const res = await fetch(`${BASE_URL}/items?isTrending=true&limit=8`, {
      cache: "no-store",
    });
    
    if (!res.ok) return [];
    
    const data: TApiResponse<TProduct[]> = await res.json();
    return data.success ? data.data : [];
  } catch {
    return [];
  }
};

/**
 * ৫. নিউ অ্যারাইভাল (সর্টিং অনুযায়ী)
 */
export const getNewArrivalProducts = async (): Promise<TProduct[]> => {
  try {
    const res = await fetch(`${BASE_URL}/items?sort=-createdAt&limit=8`, {
      next: { revalidate: 3600 },
    });
    
    if (!res.ok) return [];
    
    const data: TApiResponse<TProduct[]> = await res.json();
    return data.success ? data.data : [];
  } catch {
    return [];
  }
};

/**
 * ৬. টপ রেটেড প্রোডাক্টস (Rating >= 4)
 */
export const getTopRatedProducts = async (): Promise<TProduct[]> => {
  try {
    const res = await fetch(`${BASE_URL}/items?rating=4&limit=8`, {
      next: { revalidate: 3600 },
    });
    
    if (!res.ok) return [];
    
    const data: TApiResponse<TProduct[]> = await res.json();
    return data.success ? data.data : [];
  } catch {
    return [];
  }
};


/**
 * ৭. নতুন প্রোডাক্ট তৈরি (Admin Only)
 */
export const createProduct = async (token: string, productData: any) => {
  try {
    const res = await fetch(`${BASE_URL}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

/**
 * ৮. প্রোডাক্ট আপডেট (Admin Only)
 */
export const updateProduct = async (token: string, id: string, updateData: any) => {
  try {
    const res = await fetch(`${BASE_URL}/items/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

/**
 * ৯. প্রোডাক্ট ডিলিট (Admin Only)
 */
export const deleteProduct = async (token: string, id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/items/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};