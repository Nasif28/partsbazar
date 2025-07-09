/** @type {import('next').NextConfig} */
// const path = require("path");
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "example.com",
      "partschai.com",
      "japanparts.com.bd",
      "m.media-amazon.com",
      "cdn.pixabay.com",
    ],
  },
  experimental: {
    // serverActions: true,
    serverActions: {},
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.json$/,
      type: "json",
    });
    return config;
  },
};

export default nextConfig;
