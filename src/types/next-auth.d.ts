import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      role: 'user' | 'admin';
      accessToken: string;
    } & DefaultSession["user"]
  }

  interface User {
    _id: string;
    role: 'user' | 'admin';
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    role: 'user' | 'admin';
    accessToken: string;
  }
}