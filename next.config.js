/** @type {import('next').NextConfig} */
export default {
  distDir: "dist",
  cleanDistDir: true,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: [
      "@mantine/core",
      "@mantine/hooks",
      "@mantine/notifications",
      "@tabler/icons-react",
    ],
    serverComponentsExternalPackages: [
      "@smithy/util-retry",
      "@smithy/middleware-retry",
      "uuid",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kqap36f76ezg1dly.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
};
