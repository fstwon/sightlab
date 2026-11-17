// React 컴포넌트를 쓰는 앱·패키지용. base에 React·Hooks·접근성 규칙을 더한다.
import { defineConfig } from 'eslint/config';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

import { baseConfig } from './base.js';

export const reactConfig = defineConfig(
  baseConfig,
  {
    files: ['**/*.{jsx,tsx}'],
    extends: [
      react.configs.flat.recommended,
      // React 17+ 자동 JSX 런타임: React import 없이 JSX 사용
      react.configs.flat['jsx-runtime'],
      jsxA11y.flatConfigs.recommended,
    ],
    settings: {
      react: { version: 'detect' },
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: [reactHooks.configs.flat['recommended-latest']],
    languageOptions: {
      globals: globals.browser,
    },
  },
);
