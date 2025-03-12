
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
      return [
          {
              source: "/api/:path*",
              destination: "http://app-20ce8ab4-2f87-49c9-a647-2a5fbcdfacbc.cleverapps.io/api/:path*",
          },
      ];
  },
};

module.exports = nextConfig;