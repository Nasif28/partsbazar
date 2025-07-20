/** @type {import('next').NextConfig} */
// const path = require("path");
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "example.com" },
      { protocol: "https", hostname: "partschai.com" },
      { protocol: "https", hostname: "japanparts.com.bd" },
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "cdn.pixabay.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],

    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/webp"],
    minimumCacheTTL: 60,
  },

  experimental: {
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
