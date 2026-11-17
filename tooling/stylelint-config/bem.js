// 공용 UI(packages/design-system/ui)용. 클래스 이름을 sl- 접두사 BEM으로 제한한다.
import { baseConfig } from './base.js';

// sl-block, sl-block__element, sl-block--modifier, sl-block__element--modifier (각 부분 kebab-case)
const KEBAB = '[a-z0-9]+(?:-[a-z0-9]+)*';
export const BEM_CLASS_PATTERN = `sl-${KEBAB}(?:__${KEBAB})?(?:--${KEBAB})?`;

/** @type {import('stylelint').Config} */
export const bemConfig = {
  ...baseConfig,
  rules: {
    ...baseConfig.rules,
    'selector-class-pattern': [
      `^${BEM_CLASS_PATTERN}$`,
      { message: (name) => `"${name}"는 sl- 접두사 BEM(sl-block__element--modifier)이어야 합니다` },
    ],
  },
};
