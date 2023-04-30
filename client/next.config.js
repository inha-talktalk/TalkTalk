const { PHASE_DEVELOPMENT_SERVER } = require('next/dist/shared/lib/constants');

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  if (isDev) {
    return {
      reactStrictMode: true,
      compiler: {
        emotion: true,
      },
      async rewrites() {
        return {
          fallback: [
            {
              source: '/api/:path*',
              destination: `http://localhost:8080/:path*`,
            },
          ],
        };
      },
      images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'k.kakaocdn.net',
          },
          {
            protocol: 'https',
            hostname: 'inha-talktalk.s3.ap-northeast-2.amazonaws.com',
          },
        ],
      },
    };
  } else {
    return {
      reactStrictMode: false,
      compiler: {
        emotion: true,
      },
    };
  }
};

module.exports = nextConfig;
