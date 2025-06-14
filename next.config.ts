import type { NextConfig } from "next";
import redirects from "./redirects";

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
    ],
    unoptimized: true,
  },
};

export default nextConfig;




