/*************  ✨ Codeium Command 🌟  *************/
import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true, // Enable source maps
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      }
    ],
  },
  eslint: {
    dirs: ["app", "components", "lib", "pages", "utils"],
  },
  webpack: (config) => {
    // Combine webpack configurations from both files
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
    };
    
    config.resolve.fallback = {
      ...config.resolve.fallback,
      crypto: false,
      canvas: false,
      encoding: false,
    };
    config.plugins.push(
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      new (require("webpack").DefinePlugin)({
        "process.env.NODE_OPTIONS": JSON.stringify("--openssl-legacy-provider"),
      })
    );
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
};

export default nextConfig;
