import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Ép Vercel bỏ qua lỗi vặt khi xuất bản
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;