// 앱 화면용 CSS Modules(*.module.css). 클래스 이름은 JS에서 styles.noteCard로 쓰도록 camelCase.
import { baseConfig } from './base.js';
import { BEM_CLASS_PATTERN } from './bem.js';
import { resolveModule } from './resolve-module.js';

const CAMEL_CASE_PATTERN = '[a-z][a-zA-Z0-9]*';

/** @type {import('stylelint').Config} */
export const cssModulesConfig = {
  ...baseConfig,
  // :global·:local·composes 등 CSS Modules 문법 허용
  extends: [...baseConfig.extends, resolveModule('stylelint-config-css-modules')],
  rules: {
    ...baseConfig.rules,
    // 모듈 클래스는 camelCase. 공용 UI 클래스를 :global(.sl-tag)로 참조할 수 있도록 sl- BEM도 허용
    'selector-class-pattern': [
      `^(?:${CAMEL_CASE_PATTERN}|${BEM_CLASS_PATTERN})$`,
      { message: (name) => `"${name}"는 camelCase(예: noteCard)여야 합니다` },
    ],
  },
};
