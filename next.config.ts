import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const ORIGIN =
  process.env.NODE_ENV === "production" ? "https://www.hsm-gustavo.dev" : "*"

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
  output: "standalone",
  async headers() {
    return [
      {
        source: "/api/email",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: ORIGIN,
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "POST, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ]
  },
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
