import { TApiResponse } from "@/services/product.service"; // আপনার আগের ফাইল থেকে টাইপ ইম্পোর্ট

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * ১. ইউজারের সমস্ত অর্ডার পাওয়ার জন্য (Pagination & Filtering সহ)
 */
export const getUserOrders = async (
  token: string, 
  queryParams: string = ""
): Promise<TApiResponse<any>> => {
  try {
    const res = await fetch(`${BASE_URL}/bookings?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // এটি আপনার কন্ট্রোলারের req.user নিশ্চিত করবে
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch orders");
    }

    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong",
      data: [],
    };
  }
};

/**
 * ২. নতুন অর্ডার ক্রিয়েট করার জন্য
 */
export const createOrder = async (token: string, orderData: any) => {
  try {
    const res = await fetch(`${BASE_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to place order",
    };
  }
};

/**
 * ৩. স্পেসিফিক একটি অর্ডার ডিটেইলস দেখার জন্য
 */
export const getOrderById = async (token: string, id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/bookings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

/**
 * ৪. অর্ডার ক্যান্সেল বা আপডেট করার জন্য (User/Admin)
 */
export const updateOrderStatus = async (token: string, id: string, statusData: any) => {
  try {
    const res = await fetch(`${BASE_URL}/bookings/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(statusData),
    });

    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};