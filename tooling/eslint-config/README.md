# @sightlab/eslint-config

Sightlab의 앱·패키지가 확장하는 공용 ESLint 9 flat config.
ESLint 플러그인은 모두 이 패키지의 의존성이며, 루트에는 ESLint 설정을 두지 않는다.

## 설정

| 진입점                          | export        | 내용                                                                                                                                                          |
| ------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@sightlab/eslint-config/base`  | `baseConfig`  | `@eslint/js` recommended, typescript-eslint recommendedTypeChecked, `consistent-type-imports`, import 자동 정렬(simple-import-sort), `eslint-config-prettier` |
| `@sightlab/eslint-config/react` | `reactConfig` | base + React(recommended·jsx-runtime), React Hooks, jsx-a11y, 브라우저 globals                                                                                |
| `@sightlab/eslint-config/next`  | `nextConfig`  | react + `@next/eslint-plugin-next`(recommended·core-web-vitals), Node globals                                                                                 |

## 사용법

```jsonc
// package.json
{
  "scripts": { "lint": "eslint ." },
  "devDependencies": {
    "@sightlab/eslint-config": "workspace:*",
    "eslint": "^9.39.5",
    "typescript": "^6.0.3",
  },
}
```

```js
// eslint.config.mjs
import { nextConfig } from '@sightlab/eslint-config/next';
import { defineConfig } from 'eslint/config';

export default defineConfig(nextConfig, {
  // 타입 기반 규칙이 이 패키지의 tsconfig를 기준으로 동작하도록 지정
  languageOptions: { parserOptions: { tsconfigRootDir: import.meta.dirname } },
});
```

## 참고

- 서식 검사는 하지 않는다. 서식은 루트 Prettier가 담당한다.
- JS 파일(설정 파일 등)에는 타입 기반 규칙을 적용하지 않는다.
- ESLint 10은 `eslint-plugin-react`·`eslint-plugin-jsx-a11y`가 지원하지 않아 9를 사용한다.
- Next.js 16은 `next lint`가 없으므로 `eslint`를 직접 실행한다.
