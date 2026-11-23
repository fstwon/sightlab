import { fileURLToPath } from 'node:url';

import { cssModulesConfig } from '@sightlab/stylelint-config/css-modules';
import { extendRules } from '@sightlab/stylelint-config/extend-rules';

// 빌드된 토큰 진입점(dist/index.css). turbo lint:css가 ^build에 의존해 tokens가 먼저 빌드된다.
const TOKENS_ENTRY = fileURLToPath(import.meta.resolve('@sightlab/tokens'));

/** @type {import('stylelint').Config} */
export default extendRules(cssModulesConfig, {
  rules: {
    'csstools/value-no-unknown-custom-properties': [true, { importFrom: [TOKENS_ENTRY] }],
  },
});
