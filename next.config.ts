import type { NextConfig } from "next";
import redirects from "./redirects";

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
})

const nextConfig: NextConfig = {
  async redirects() {
    return redirects;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yt3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "yt3.ggpht.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "drive.hillsong.com",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;




