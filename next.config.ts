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
