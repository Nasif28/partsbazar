/** @type {import('next').NextConfig} */
// const path = require("path");
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "example.com"],
  },
  experimental: {
    // serverActions: true,
    serverActions: {},
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/frontend",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
