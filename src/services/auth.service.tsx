import { TRegisterData, TUser } from "@/types/user";

export const registerUser = async (data: TRegisterData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res;
};
