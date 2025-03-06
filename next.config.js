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

    // Add cache configuration
    config.cache = {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename],
      },
      cacheDirectory: '.next/cache/webpack',
    };

    return config;
  },
  experimental: {
    appDir: true,
    optimizeCss: true,
    optimizePackageImports: ['@stripe/stripe-js', 'framer-motion', 'gsap'],
  },
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  compiler: {
    removeConsole: false,
  },
  // Add output configuration for better caching
  output: 'standalone',
  poweredByHeader: false,
  generateEtags: false,
}

module.exports = nextConfig 