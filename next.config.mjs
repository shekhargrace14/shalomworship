/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'techcrunch.com', // Correct hostname
      },
      {
          protocol: 'https',
          hostname: 'img.youtube.com', // Correct hostname
      }
    ],
  },
};

export default nextConfig;
