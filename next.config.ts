import type { NextConfig } from "next";
import redirects from "./redirects";
import withPWA from "next-pwa";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
async redirects() {
    // console.log('🔁 Redirects loaded:', redirects.length);
    // console.log(
    //   redirects.slice(0, 5).map(r => `${r.source} → ${r.destination}`)
    // );

    return redirects.map((r) => ({
      ...r,
      permanent: true,
    }));
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "yt3.googleusercontent.com" },
      { protocol: "https", hostname: "yt3.ggpht.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "www.google.com" },
      { protocol: "https", hostname: "drive.google.com" },
      { protocol: "https", hostname: "drive.hillsong.com" },
    ],
    unoptimized: true,
  },
};


export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: isDev,
})(nextConfig);
