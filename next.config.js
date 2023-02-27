/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/:link([A-Za-z0-9_-]{6})',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:link`,
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
