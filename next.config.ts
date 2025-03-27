import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  allowedDevOrigins: ["https://placeholder.co"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
