// src/services/dashboard.service.ts

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export type TApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  error?: any;
};

/**
 * Common fetcher function to handle repetitive logic
 */
const fetcher = async (url: string, token: string) => {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Something went wrong");
    }

    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch data",
      data: null,
    };
  }
};

export const DashboardService = {
  /**
   * ১. অ্যাডমিন স্ট্যাটাস (Admin Only)
   */
  getDashboardStats: async (token: string): Promise<TApiResponse<any>> => {
    return fetcher(`${BASE_URL}/dashboard/stats`, token);
  },

  /**
   * ২. অ্যাডমিন চার্ট ডাটা (Admin Only)
   */
  getChartData: async (token: string): Promise<TApiResponse<any>> => {
    return fetcher(`${BASE_URL}/dashboard/chart-data`, token);
  },

  /**
   * ৩. ইউজারের ব্যক্তিগত স্ট্যাটাস (User Only)
   */
  getUserDashboardStats: async (token: string): Promise<TApiResponse<any>> => {
    return fetcher(`${BASE_URL}/dashboard/user-stats`, token);
    // নোট: ব্যাকএন্ড রাউটে যে নাম দিয়েছেন সেটি নিশ্চিত করুন (যেমন: /user-stats)
  },

  /**
   * ৪. ইউজারের ব্যক্তিগত চার্ট ডাটা (User Only)
   */
  getUserChartData: async (token: string): Promise<TApiResponse<any>> => {
    return fetcher(`${BASE_URL}/dashboard/user-chart-data`, token);
  },
};
