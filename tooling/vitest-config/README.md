# @sightlab/vitest-config

Sightlab 앱·패키지가 확장하는 공용 Vitest 설정. 런타임 의존성 없이 설정 객체만 내보내며, `vitest`는 소비 패키지가 설치한다.

## 설정

| 진입점                         | export       | 내용                                                                                             |
| ------------------------------ | ------------ | ------------------------------------------------------------------------------------------------ |
| `@sightlab/vitest-config/base` | `baseConfig` | 테스트 위치 `src/**/*.test.{ts,tsx}`, 기본 환경 `node`, 테스트마다 mock·전역·환경 변수 원상 복구 |

## 사용법

```jsonc
// package.json
{
  "scripts": { "test": "vitest run" },
  "devDependencies": {
    "@sightlab/vitest-config": "workspace:*",
    "vitest": "^5.1.1",
    "vite": "^8.3.8", // Vitest 5부터 vite는 peer 의존성
  },
}
```

```ts
// vitest.config.ts
import { baseConfig } from '@sightlab/vitest-config/base';
import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  baseConfig,
  defineConfig({
    // 앱 전용 설정 (예: tsconfig 경로 별칭)
  }),
);
```

## 규칙

- 테스트 파일은 대상 옆 `*.test.ts(x)` (D10·D13)
- 기본 환경은 `node`. DOM이 필요한 컴포넌트 테스트 파일만 맨 위에 `// @vitest-environment jsdom`
- 네트워크를 쓰지 않는다. 외부 응답은 저장해 둔 fixture(`__fixtures__/*.json`)로 대신한다
- Vitest는 async 서버 컴포넌트를 실행하지 못한다 (Next.js 공식 문서). 데이터를 불러오는 화면은 E2E로 검사한다
