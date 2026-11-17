// Next.js 앱용. react 설정에 Next 규칙(Core Web Vitals 포함)을 더한다.
import nextPlugin from '@next/eslint-plugin-next';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

import { reactConfig } from './react.js';

export const nextConfig = defineConfig(
  reactConfig,
  nextPlugin.configs.recommended,
  nextPlugin.configs['core-web-vitals'],
  {
    // 서버 컴포넌트·Route Handler·설정 파일은 Node 환경에서도 실행된다.
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      // Pages Router 전용 규칙. App Router만 쓰고, FSD의 src/pages를 Pages Router로 오인하므로 끈다.
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
);
