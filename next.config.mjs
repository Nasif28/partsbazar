/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "example.com"],
  },
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
