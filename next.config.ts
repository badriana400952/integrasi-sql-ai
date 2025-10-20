// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "store.scuto.co.id",
      },
      {
        protocol: "https",
        hostname: "scuto.co.id",
      },
       {
        protocol: "https",
        hostname: "assets.aceternity.com",
      },
       {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

module.exports = nextConfig;
