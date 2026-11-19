import type { StorybookConfig } from '@storybook/html-vite';
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
  // html-vite: 스토리는 HTML 문자열·DOM 요소를 돌려준다 (공용 UI가 CSS 클래스 + HTML 구조이므로)
  framework: '@storybook/html-vite',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.ts'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        // MDX 3은 표 등 GFM 문법을 기본 지원하지 않아 remark-gfm을 추가한다.
        mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } },
      },
    },
    '@storybook/addon-a11y',
  ],
};

export default config;
