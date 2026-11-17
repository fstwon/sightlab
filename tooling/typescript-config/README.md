# @sightlab/typescript-config

Sightlab의 앱·패키지가 `extends`로 사용하는 공용 TypeScript 설정.
루트에는 tsconfig를 두지 않고, 각 앱·패키지가 이 패키지를 devDependency로 받아 확장한다.

## 설정

| 파일          | 대상                            | 내용                                                     |
| ------------- | ------------------------------- | -------------------------------------------------------- |
| `base.json`   | 모든 TS 코드                    | 엄격 검사, 번들러 기준 모듈 해석, 출력 없음(`noEmit`)    |
| `nextjs.json` | Next.js 앱                      | base + DOM, `jsx: preserve`, Next TS 플러그인, Node 타입 |
| `vite.json`   | Vite 앱(Storybook html-vite 등) | base + DOM, `vite/client` 타입                           |

## 사용법

```jsonc
// package.json
{ "devDependencies": { "@sightlab/typescript-config": "workspace:*", "typescript": "^6.0.3" } }
```

```jsonc
// tsconfig.json
{
  "extends": "@sightlab/typescript-config/nextjs.json",
  "include": ["next-env.d.ts", "src", "app", ".next/types/**/*.ts"],
}
```

`include`·`exclude`·`paths`는 경로가 소비 패키지 기준이어야 하므로 각 tsconfig에서 지정한다.

## 선택 이유

- `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`: 배열 인덱스 접근과 선택 속성의 `undefined`까지 검사
- `module: preserve` + `moduleResolution: bundler`: 번들러(Next.js·Vite)가 모듈을 처리하므로 tsc는 타입 검사만 담당
- `verbatimModuleSyntax`: 타입 import를 `import type`으로 강제해 번들 결과를 예측 가능하게 유지
- `types: []`: 전역 타입을 명시한 것만 불러옴(TS 6 기본값과 같음). 필요한 타입은 nextjs·vite 설정 또는 각 tsconfig에서 추가
- TypeScript 6.x 기준: typescript-eslint가 TS 7을 아직 지원하지 않음
