/** @type {import('next').NextConfig} */
// const path = require("path");
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "example.com",
      "partschai.com",
      "japanparts.com.bd",
    ],
  },
  experimental: {
    // serverActions: true,
    serverActions: {},
  },
};

export default nextConfig;
