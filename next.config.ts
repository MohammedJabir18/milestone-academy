import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },
  transpilePackages: ['@splinetool/runtime', '@splinetool/react-spline'],
};

export default nextConfig;
