/** @type {import('next').NextConfig} */
// const path = require("path");
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "example.com", "partschai.com"],
  },
  experimental: {
    // serverActions: true,
    serverActions: {},
  },
};

export default nextConfig;
