import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "augipesrjjztnzjrojgy.supabase.co",
      }
    ],
  },
  transpilePackages: ['@splinetool/runtime', '@splinetool/react-spline'],
};

export default nextConfig;
