import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    urlImports: ['https://framer.com', 'https://framerusercontent.com'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's.alicdn.com',
      },
      {
        protocol: 'https',
        hostname: 'img.alicdn.com',
      },
      {
        protocol: 'https',
        hostname: 'sc01.alicdn.com',
      },
      {
        protocol: 'https',
        hostname: 'sc02.alicdn.com',
      },
      {
        protocol: 'https',
        hostname: 'sc04.alicdn.com',
      },
    ],
  },
};

export default nextConfig;
