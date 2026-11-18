// 공용 UI(packages/design-system/ui)용. 클래스 이름을 sl- 접두사 BEM으로 제한한다.
import { baseConfig } from './base.js';
import { extendRules } from './extend-rules.js';

// sl-block, sl-block__element, sl-block--modifier, sl-block__element--modifier (각 부분 kebab-case)
const KEBAB = '[a-z0-9]+(?:-[a-z0-9]+)*';
export const BEM_CLASS_PATTERN = `sl-${KEBAB}(?:__${KEBAB})?(?:--${KEBAB})?`;

const options = {
  message: (name) => `"${name}"는 sl- 접두사 BEM(sl-block__element--modifier)이어야 합니다`,
};

/** @type {import('stylelint').Config} */
export const bemConfig = extendRules(baseConfig, {
  rules: { 'selector-class-pattern': [`^${BEM_CLASS_PATTERN}$`, options] },
  scssRules: {
    // SCSS는 중첩(&__label, &--primary)을 합친 최종 클래스 이름으로 검사하는 stylelint-scss 규칙 사용
    'selector-class-pattern': null,
    'scss/selector-class-pattern': [
      `^${BEM_CLASS_PATTERN}$`,
      {
        // stylelint-scss 규칙은 메시지 함수에 클래스 이름을 넘기지 않아 고정 문구 사용
        message: '클래스 이름은 sl- 접두사 BEM(sl-block__element--modifier)이어야 합니다',
        resolveNestedSelectors: true,
      },
    ],
  },
});
