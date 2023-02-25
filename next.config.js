/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/:link(\\w{6})',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:link`,
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
