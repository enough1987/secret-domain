import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/next/:path*',
        destination: '/:path*', // This will rewrite /next/abc to /abc
      },
    ]
  },
};

export default nextConfig;
