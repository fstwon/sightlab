# @sightlab/stylelint-config

Sightlab의 CSS가 있는 앱·패키지가 확장하는 공용 Stylelint 설정.
플러그인과 공유 설정은 모두 이 패키지의 의존성이며, 서식은 루트 Prettier가 담당한다.

## 설정

| 진입점                                   | export             | 대상              | 내용                                                                         |
| ---------------------------------------- | ------------------ | ----------------- | ---------------------------------------------------------------------------- |
| `@sightlab/stylelint-config/base`        | `baseConfig`       | 모든 CSS          | standard, 속성 순서 자동 정렬(recess-order), 토큰 강제, 정의 안 된 변수 검출 |
| `@sightlab/stylelint-config/bem`         | `bemConfig`        | 공용 UI           | base + 클래스 이름 `sl-block__element--modifier`                             |
| `@sightlab/stylelint-config/css-modules` | `cssModulesConfig` | 앱 `*.module.css` | base + CSS Modules 문법 + 클래스 이름 camelCase (`:global(.sl-*)` 참조 허용) |

## 사용법

```jsonc
// package.json
{
  "scripts": { "lint:css": "stylelint \"**/*.css\"" },
  "devDependencies": {
    "@sightlab/stylelint-config": "workspace:*",
    "stylelint": "^17.16.0",
  },
}
```

```js
// stylelint.config.mjs
import { fileURLToPath } from 'node:url';

import { cssModulesConfig } from '@sightlab/stylelint-config/css-modules';

// 토큰 진입점 하나만 넘기면 @import를 따라가 모든 --sl-* 변수를 인식한다.
const TOKENS = fileURLToPath(import.meta.resolve('@sightlab/tokens'));

/** @type {import('stylelint').Config} */
export default {
  ...cssModulesConfig,
  rules: {
    ...cssModulesConfig.rules,
    'csstools/value-no-unknown-custom-properties': [true, { importFrom: [TOKENS] }],
  },
};
```

`importFrom` 경로는 실행 위치 기준으로 해석되므로 절대 경로를 넘긴다.

## 규칙

- **토큰 강제** (`scale-unlimited/declaration-strict-value`): 색(`*color`, fill, stroke), 그림자, 모서리,
  margin·padding·gap, font-size·font-family는 `var()`로 지정한다.
  `0`, `auto`, `none`, `inherit`, `transparent`, `currentColor` 등 키워드와 `calc()` 같은 함수는 허용한다.
- **정의 안 된 변수** (`csstools/value-no-unknown-custom-properties`): 같은 파일·`@import`·`importFrom`에서
  정의를 찾지 못한 `var(--*)`를 오류로 처리한다.
- 속성 순서는 `stylelint --fix`로 자동 정렬된다.
- standard에서 조정한 규칙: `import-notation: 'string'`(`@import './x.css'`), `custom-property-empty-line-before` 끔(변수 묶음 사이 빈 줄 허용).
- extends·plugins는 이 패키지 안에서 절대 경로로 해석해 넘긴다(`resolve-module.js`). pnpm에서는 소비 패키지가 이 패키지의 의존성을 찾을 수 없기 때문.

## 참고

- Stylelint 18은 `stylelint-config-recess-order`·`stylelint-config-css-modules`가 지원하지 않아 17을 사용한다.
