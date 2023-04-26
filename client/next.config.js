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
        return [
          {
            source: '/api/oauth/kakao:slug*',
            destination: `http://localhost:8080/oauth/kakao:sulg*`,
          },
        ];
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
