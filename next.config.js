/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    config.infrastructureLogging = {
      level: 'verbose',
    };
    
    config.module.rules.push({
      test: /\.m?js$/,
      exclude: /node_modules\/(?!undici)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-private-methods']
        }
      }
    });

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      'undici': false
    };

    if (!isServer && !process.env.NODE_ENV === 'development') {
      config.devtool = 'source-map';
    }

    return config;
  },
  experimental: {
    appDir: true,
    optimizeCss: true,
    optimizePackageImports: ['@stripe/stripe-js', 'framer-motion', 'gsap'],
  },
  // Cloudflare Pages specific settings
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com']
  },
  // Disable features not needed for static export
  poweredByHeader: false,
  generateEtags: false,
}

module.exports = nextConfig 