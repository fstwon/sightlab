import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  addons: [],
  framework: '@storybook/react-vite',
  viteFinal: async (config) => {
    config.esbuild = { ...config.esbuild, jsx: 'automatic' };
    return config;
  },
};

export default config;
