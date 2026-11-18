// 앱 화면용 CSS Modules(*.module.css·*.module.scss). 클래스 이름은 JS에서 styles.noteCard로 쓰도록 camelCase.
import { baseConfig } from './base.js';
import { BEM_CLASS_PATTERN } from './bem.js';
import { extendRules } from './extend-rules.js';
import { resolveModule } from './resolve-module.js';

// 모듈 클래스는 camelCase. 공용 UI 클래스를 :global(.sl-tag)로 참조할 수 있도록 sl- BEM도 허용
const CAMEL_CASE_PATTERN = '[a-z][a-zA-Z0-9]*';
const PATTERN = `^(?:${CAMEL_CASE_PATTERN}|${BEM_CLASS_PATTERN})$`;
const options = { message: (name) => `"${name}"는 camelCase(예: noteCard)여야 합니다` };

// :global·:local·composes 등 CSS Modules 문법 허용
const CSS_MODULES = resolveModule('stylelint-config-css-modules');

/** @type {import('stylelint').Config} */
export const cssModulesConfig = extendRules(
  { ...baseConfig, extends: [...baseConfig.extends, CSS_MODULES] },
  {
    rules: { 'selector-class-pattern': [PATTERN, options] },
    // SCSS overrides의 standard-scss가 CSS Modules 허용 규칙을 덮어쓰지 않도록 뒤에 다시 적용
    scssExtends: [CSS_MODULES],
    scssRules: {
      'selector-class-pattern': null,
      'scss/selector-class-pattern': [
        PATTERN,
        {
          // stylelint-scss 규칙은 메시지 함수에 클래스 이름을 넘기지 않아 고정 문구 사용
          message: '클래스 이름은 camelCase(예: noteCard)여야 합니다',
          resolveNestedSelectors: true,
        },
      ],
    },
  },
);
