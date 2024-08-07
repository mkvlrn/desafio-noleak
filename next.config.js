/** @type {import('next').NextConfig} */
export default {
  distDir: "dist",
  cleanDistDir: true,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks", "@tabler/icons-react"],
  },
  images: {
    domains: ["iili.io"],
  },
};
