/*************  ✨ Codeium Command 🌟  *************/
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true, // Enable source maps
  images: {
    domains: ['localhost', 'example.com', 'upload.wikimedia.org', 'gstatic.com', 'res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  eslint: {
    dirs: ['app', 'components', 'lib', 'pages', 'utils'],
  },
};

export default nextConfig;