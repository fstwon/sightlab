import { globalIgnores } from 'eslint/config';
import next from '@sightlab/eslint/next';

export default [
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
  ...next,
];
