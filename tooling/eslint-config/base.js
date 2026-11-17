// 모든 TS 코드에 적용하는 기본 규칙. react·next 설정이 이 배열을 확장한다.
import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

export const baseConfig = defineConfig(
  globalIgnores([
    '**/node_modules/',
    '**/dist/',
    '**/.next/',
    '**/storybook-static/',
    '**/coverage/',
  ]),

  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    // 타입 정보 기반 규칙: 각 파일에서 가장 가까운 tsconfig를 찾아 사용한다.
    // 소비 패키지는 tsconfigRootDir: import.meta.dirname을 지정한다.
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  {
    // 설정 파일 등 JS 파일은 tsconfig에 포함되지 않으므로 타입 기반 규칙을 끈다.
    files: ['**/*.{js,mjs,cjs}'],
    extends: [tseslint.configs.disableTypeChecked],
  },

  {
    plugins: { 'simple-import-sort': simpleImportSort },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },

  // 서식은 Prettier가 담당하므로 충돌하는 규칙을 마지막에 끈다.
  prettier,
);
