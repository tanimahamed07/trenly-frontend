import { loginUser } from "@/services/auth.service";
import { TLoginData } from "@/types/user";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    // ১. Google Provider যোগ করা হলো
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const loginData: TLoginData = {
            email: credentials.email,
            password: credentials.password,
          };

          const res = await loginUser(loginData);
          const data = await res.json();

          if (data.success && data.data) {
            // আপনার ডিফাইন করা User ইন্টারফেস অনুযায়ী রিটার্ন দেওয়া হচ্ছে
            return {
              id: data.data._id,
              name: data.data.name,
              email: data.data.email,
              role: data.data.role, // "user" | "admin"
              accessToken: data.token,
            };
          }
          return null;
        } catch {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      // যদি প্রথমবার লগইন হয় (Credentials বা Google)
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }

      // গুগল লগইনের ক্ষেত্রে যদি ইউজার অবজেক্টে সরাসরি রোল/টোকেন না থাকে
      if (account?.provider === "google" && !token.role) {
        token.role = "user"; // গুগল ইউজারদের ডিফল্ট রোল
        token.accessToken = account.access_token as string;
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
