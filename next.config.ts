import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'via.placeholder.com',
      'upload.wikimedia.org',
      'cdn.worldvectorlogo.com',
      'seeklogo.com',
      'cdn-icons-png.flaticon.com',
      'fake-image-url.com'  // For our dummy image URLs
    ],
  },
};

export default nextConfig;
