/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/oauth/kakao:slug*',
        destination: `http://localhost:8080/oauth/kakao:sulg*`,
      },
    ];
  },
};

module.exports = nextConfig;
