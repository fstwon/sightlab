import { fileURLToPath } from 'node:url';

import { bemConfig } from '@sightlab/stylelint-config/bem';
import { extendRules } from '@sightlab/stylelint-config/extend-rules';

// 빌드된 토큰 진입점(dist/index.css). turbo lint:css가 ^build에 의존해 tokens가 먼저 빌드된다.
const TOKENS_ENTRY = fileURLToPath(import.meta.resolve('@sightlab/tokens'));

/** @type {import('stylelint').Config} */
export default extendRules(bemConfig, {
  rules: {
    'csstools/value-no-unknown-custom-properties': [true, { importFrom: [TOKENS_ENTRY] }],
  },
});
