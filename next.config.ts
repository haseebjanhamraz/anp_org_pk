/*************  ✨ Codeium Command 🌟  *************/
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true, // Enable source maps
  images: {
    domains: [
      "localhost",
      "example.com",
      "upload.wikimedia.org",
      "gstatic.com",
      "res.cloudinary.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  eslint: {
    dirs: ["app", "components", "lib", "pages", "utils"],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      crypto: false, // Add fallbacks if necessary
    };
    config.plugins.push(
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      new (require("webpack").DefinePlugin)({
        "process.env.NODE_OPTIONS": JSON.stringify("--openssl-legacy-provider"),
      })
    );
    return config;
  },
};

export default nextConfig;
