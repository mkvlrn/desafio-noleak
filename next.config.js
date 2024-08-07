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

        hostname: "desafio-noleak-mkvlrn.s3.sa-east-1.amazonaws.com",
        port: "",
      },
    ],
  },
};
