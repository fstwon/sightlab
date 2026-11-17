import { fileURLToPath } from 'node:url';

import { baseConfig } from '@sightlab/stylelint-config/base';

// 진입점 하나만 넘기면 @import를 따라 모든 토큰 파일의 정의를 읽는다.
const TOKENS_ENTRY = fileURLToPath(new URL('./src/index.css', import.meta.url));

/** @type {import('stylelint').Config} */
export default {
  ...baseConfig,
  rules: {
    ...baseConfig.rules,
    // 토큰 파일은 원래 값을 정의하는 곳이므로 var() 강제를 끈다.
    'scale-unlimited/declaration-strict-value': null,
    // 역할 색이 원색 파일의 변수를 참조하므로 진입점 기준으로 정의를 찾는다.
    'csstools/value-no-unknown-custom-properties': [true, { importFrom: [TOKENS_ENTRY] }],
  },
};
