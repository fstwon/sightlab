// 모든 CSS·SCSS에 적용하는 기본 규칙. bem·css-modules 설정이 이 설정을 확장한다.
import { extendRules } from './extend-rules.js';
import { resolveModule } from './resolve-module.js';

// 디자인 토큰(var())으로만 지정해야 하는 속성
const TOKEN_PROPERTIES = [
  '/color$/',
  'fill',
  'stroke',
  'box-shadow',
  'border-radius',
  '/^margin/',
  '/^padding/',
  '/gap$/',
  'font-size',
  'font-family',
];

// 토큰 없이 써도 되는 CSS 키워드·값
const ALLOWED_VALUES = [
  '0',
  'auto',
  'none',
  'inherit',
  'initial',
  'unset',
  'revert',
  'transparent',
  'currentColor',
  'currentcolor',
];

/** @type {import('stylelint').Config} */
export const baseConfig = extendRules(
  {
    extends: [
      resolveModule('stylelint-config-standard'),
      resolveModule('stylelint-config-recess-order'),
    ],
    plugins: [
      resolveModule('stylelint-declaration-strict-value'),
      resolveModule('stylelint-value-no-unknown-custom-properties'),
    ],
    overrides: [
      {
        // SCSS 파일: SCSS 문법(@use, @mixin, 중첩 등)을 이해하는 standard-scss 적용
        files: ['**/*.scss'],
        extends: [resolveModule('stylelint-config-standard-scss')],
      },
    ],
  },
  {
    rules: {
      // 변수를 종류별로 빈 줄로 묶어 읽기 쉽게 한다.
      'custom-property-empty-line-before': null,
      // @import './x.css' 형식 유지 (번들러·Sass 공통으로 쓰는 형식)
      'import-notation': 'string',
      'scale-unlimited/declaration-strict-value': [
        TOKEN_PROPERTIES,
        { ignoreValues: ALLOWED_VALUES },
      ],
      // 정의되지 않은 변수 검출. 다른 파일(토큰 패키지)의 변수는
      // 소비 패키지가 importFrom으로 정의 파일을 지정해야 인식한다.
      'csstools/value-no-unknown-custom-properties': true,
    },
  },
);
