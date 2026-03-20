import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // ১. SVG ব্যবহারের অনুমতি দেয় (DiceBear বা অন্য SVG ইমেজের জন্য প্রয়োজন)
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    // ২. রিমোট প্যাটার্ন কনফিগারেশন
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // সব ডোমেইন সাপোর্ট করবে
      },
    ],
  },
  // অন্যান্য কনফিগারেশন এখানে থাকতে পারে
};

export default nextConfig;