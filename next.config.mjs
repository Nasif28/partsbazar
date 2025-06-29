/** @type {import('next').NextConfig} */
// const path = require("path");
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "example.com"],
  },
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
