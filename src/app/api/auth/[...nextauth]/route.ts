import { authOptions } from "@/lib/authOptions"; // default → named import
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };