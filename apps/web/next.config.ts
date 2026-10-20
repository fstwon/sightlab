import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@sightlab/ui'],
  webpack(config) {
    const assetRule = config.module.rules.find(
      (rule: { test?: RegExp }) => rule && typeof rule === 'object' && rule.test?.test?.('.svg'),
    );
    if (assetRule && typeof assetRule === 'object') {
      assetRule.exclude = /\.svg$/i;
    }
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [{ loader: '@svgr/webpack', options: { titleProp: true } }],
    });
    return config;
  },
};

export default nextConfig;
