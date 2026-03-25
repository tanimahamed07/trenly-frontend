import { TProduct } from "@/types/product";

// কমন এপিআই রেসপন্স টাইপ
export interface TApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const API_FETCH_TIMEOUT_MS = 8000;

const fetchWithTimeout = async (input: RequestInfo, init?: RequestInit) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(input, {
      ...init,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
};

const isBackendUrlConfigured = () => {
  if (!BASE_URL || BASE_URL.trim().length === 0) {
    console.warn(
      "NEXT_PUBLIC_BACKEND_URL is not set. API requests are disabled.",
    );
    return false;
  }
  return true;
};

/**
 * ১. সমস্ত প্রোডাক্ট পাওয়ার জন্য (Search/Filter/Pagination)
 */
export const getAllProducts = async (queryParams: string = "") => {
  if (!isBackendUrlConfigured()) return { success: false, data: [] };

  try {
    const res = await fetchWithTimeout(`${BASE_URL}/items?${queryParams}`, {
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
export const getSingleProduct = async (
  id: string,
): Promise<TProduct | null> => {
  if (!isBackendUrlConfigured()) return null;

  try {
    const res = await fetchWithTimeout(`${BASE_URL}/items/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data: TApiResponse<TProduct> = await res.json();
    return data.success ? data.data : null;
  } catch {
    return null;
  }
};

/**
 * ৩. রিলেটেড প্রোডাক্টস (ক্যাটাগরি অনুযায়ী)
 */
export const getRelatedProducts = async (
  category: string,
  currentId: string,
  limit: number = 8,
): Promise<TProduct[]> => {
  if (!isBackendUrlConfigured()) return [];

  try {
    const res = await fetchWithTimeout(
      `${BASE_URL}/items?category=${category}&limit=${limit}`,
      { cache: "no-store" },
    );

    if (!res.ok) return [];

    const data: TApiResponse<TProduct[]> = await res.json();

    if (!data.success) return [];

    return data.data.filter((p) => p._id !== currentId).slice(0, 4);
  } catch {
    return [];
  }
};

/**
 * ৪. ট্রেন্ডিং প্রোডাক্টস (isTrending flag অনুযায়ী)
 */
export const getTrendingProducts = async (): Promise<TProduct[]> => {
  if (!isBackendUrlConfigured()) return [];

  try {
    const res = await fetchWithTimeout(
      `${BASE_URL}/items?isTrending=true&limit=8`,
      {
        next: { revalidate: 3600 },
        cache: "force-cache",
      },
    );

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
  if (!isBackendUrlConfigured()) return [];

  try {
    const res = await fetchWithTimeout(
      `${BASE_URL}/items?sort=-createdAt&limit=8`,
      {
        next: { revalidate: 3600 },
        cache: "force-cache",
      },
    );

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
  if (!isBackendUrlConfigured()) return [];

  try {
    const res = await fetchWithTimeout(`${BASE_URL}/items?rating=4&limit=8`, {
      next: { revalidate: 3600 },
      cache: "force-cache",
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
  if (!isBackendUrlConfigured())
    return { success: false, message: "Backend URL not configured" };

  try {
    const res = await fetchWithTimeout(`${BASE_URL}/items`, {
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
export const updateProduct = async (
  token: string,
  id: string,
  updateData: any,
) => {
  if (!isBackendUrlConfigured())
    return { success: false, message: "Backend URL not configured" };

  try {
    const res = await fetchWithTimeout(`${BASE_URL}/items/${id}`, {
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
  if (!isBackendUrlConfigured())
    return { success: false, message: "Backend URL not configured" };

  try {
    const res = await fetchWithTimeout(`${BASE_URL}/items/${id}`, {
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
