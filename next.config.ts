import type { NextConfig } from "next";
import withPWA from "next-pwa";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  ...(isDev ? {} : { output: "export" }),
  //   return redirects.map((r) => ({
  //     ...r,
  //     permanent: true,
  //   }));
  // },
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
