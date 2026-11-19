import { baseConfig } from '@sightlab/eslint-config/base';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig(baseConfig, globalIgnores(['storybook-static/']), {
  languageOptions: { parserOptions: { tsconfigRootDir: import.meta.dirname } },
});
