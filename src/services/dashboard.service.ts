// src/services/dashboard.service.ts

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export type TApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  error?: any;
};

export const DashboardService = {
  /**
   * ১. ড্যাশবোর্ড স্ট্যাটিস্টিকস পাওয়ার জন্য (Admin Only)
   */
  getDashboardStats: async (token: string): Promise<TApiResponse<any>> => {
    try {
      const res = await fetch(`${BASE_URL}/dashboard/stats`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store", // রিয়েল টাইম ডাটার জন্য
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch stats");
      }

      return await res.json();
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Something went wrong",
        data: null,
      };
    }
  },

  /**
   * ২. চার্ট ডাটা পাওয়ার জন্য (Admin Only)
   * এটি বার চার্ট, লাইন চার্ট এবং পাই চার্ট ডাটা একসাথে রিটার্ন করবে
   */
  getChartData: async (token: string): Promise<TApiResponse<any>> => {
    try {
      const res = await fetch(`${BASE_URL}/dashboard/chart-data`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch chart data");
      }

      return await res.json();
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Something went wrong",
        data: null,
      };
    }
  },
};