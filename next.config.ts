import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use standalone only for Docker; Netlify uses @netlify/plugin-nextjs
  ...(process.env.DEPLOY_TARGET === "docker" ? { output: "standalone" as const } : {}),
  images: {
    unoptimized: process.env.NETLIFY === "true",
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
