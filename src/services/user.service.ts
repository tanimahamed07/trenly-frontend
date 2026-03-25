const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * User Service: Native Fetch API ব্যবহার করে ব্যাকএন্ডের সাথে যোগাযোগ
 */
export const UserService = {
  // ১. সকল ইউজার ফেচ করা (Admin Only)
  getAllUsers: async (token: string) => {
    const res = await fetch(`${BACKEND_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) throw data;
    return data;
  },

  // ২. ইউজার ডিলিট করা
  deleteUser: async (id: string, token: string) => {
    const res = await fetch(`${BACKEND_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) throw data;
    return data;
  },

  // ৩. ইউজারের রোল পরিবর্তন করা
  updateUserRole: async (
    userId: string,
    role: "admin" | "user",
    token: string,
  ) => {
    const res = await fetch(`${BACKEND_URL}/users/role`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, role }),
    });

    const data = await res.json();
    if (!res.ok) throw data;
    return data;
  },

  // ৪. প্রোফাইল আপডেট করা
  updateUser: async (id: string, updateData: any, token: string) => {
    const res = await fetch(`${BACKEND_URL}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });

    const data = await res.json();
    if (!res.ok) throw data;
    return data;
  },

  // ৫. আইডি দিয়ে ইউজার খোঁজা
  getUserById: async (id: string, token: string) => {
    const res = await fetch(`${BACKEND_URL}/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) throw data;
    return data;
  },
};
