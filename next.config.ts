module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/portal",
        permanent: true,
      },
    ];
  },
};
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: "standalone",
//   experimental: {
//     runtime: "edge",
//     serverActions: true,
//   },
// };

// module.exports = nextConfig;
