import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/next',
  async rewrites() {
    return [
      // Do NOT rewrite Next.js internals or static assets
      {
        source: '/next/_next/:path*',
        destination: '/next/_next/:path*',
      },
      {
        source: '/next/static/:path*',
        destination: '/next/static/:path*',
      },
      // Rewrite everything else
      {
        source: '/next/:path*',
        destination: '/:path*',
      },
    ]
  },
};

export default nextConfig;
