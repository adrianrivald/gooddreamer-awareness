/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: process.env.NEXT_PUBLIC_HOST_URL,
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
