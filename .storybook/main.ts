import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../lib/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [],
  framework: '@storybook/react-vite',
};

export default config;
