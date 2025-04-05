import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "icon-library.com",
      },
    ],
  },
};

export default nextConfig;
