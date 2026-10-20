import type { StorybookConfig } from '@storybook/react-vite';
import svgr from 'vite-plugin-svgr';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [],
  framework: '@storybook/react-vite',
  viteFinal: async (config) => {
    config.esbuild = { ...config.esbuild, jsx: 'automatic' };
    config.plugins = [
      ...(config.plugins ?? []),
      svgr({ include: '**/*.svg', svgrOptions: { titleProp: true } }),
    ];
    return config;
  },
};

export default config;
