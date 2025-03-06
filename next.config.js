/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    config.infrastructureLogging = {
      level: 'verbose',
    };
    
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    if (!isServer && !process.env.NODE_ENV === 'development') {
      config.devtool = 'source-map';
    }

    return config;
  },
  experimental: {
    appDir: true,
  },
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  compiler: {
    removeConsole: false,
  },
}

module.exports = nextConfig 