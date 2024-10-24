/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'techcrunch.com', // Correct hostname
      },
    ],
  },
};

export default nextConfig;
