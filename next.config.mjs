/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["framer-motion", "gsap", "zustand"]
  }
};

export default nextConfig;