import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@sightlab/ui'],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      resourceQuery: /react/,
      use: [{ loader: '@svgr/webpack', options: { titleProp: true } }],
    });
    return config;
  },
};

export default nextConfig;
