# @sightlab/web

Sightlab 블로그 웹 앱. Next.js App Router + FSD(Feature-Sliced Design).

## 실행

```bash
pnpm --filter @sightlab/web dev                     # http://localhost:3000
pnpm turbo run build --filter @sightlab/web         # tokens·ui 빌드 후 next build
pnpm --filter @sightlab/web test                    # Vitest 단위 테스트
```

`dev`는 공용 패키지의 `dist`를 읽으므로 먼저 tokens·ui를 빌드하거나 각 패키지의 `dev`(sass watch)를 함께 실행한다.

## 구조

```
app/                  Next 라우팅만 (layout·page 등 필수 파일). 화면은 src/pages에서 가져온다
pages/README.md       빈 폴더. Next가 src/pages를 Pages Router로 오인하지 않게 한다
src/                  FSD 계층
  app/styles/         전역 스타일 한 곳: tokens → ui → global.css
  pages/<화면>/       화면 단위 슬라이스. index.ts로만 공개
  (widgets · features · entities · shared는 필요할 때 추가)
```

- 경로 별칭: `@/*` → `src/*` (`@/pages/home`, `@/shared/ui`)
- Next 필수 파일(`app/layout.tsx`, `app/page.tsx` 등)만 default export, 나머지는 named export (D10)
- 스타일 값은 토큰(`var(--sl-*)`)만 쓴다. 화면 스타일은 CSS Modules(`*.module.scss`, 클래스 camelCase)
- 공용 Sass는 단일 파일 진입점으로 불러온다: `@use '@sightlab/tokens/sass/breakpoints' as *;`(`media-up(md)`),
  `@use '@sightlab/ui/sass/focus-ring' as *;`. Turbopack은 여러 파일을 모으는 `./sass` 진입점을 해석하지 못한다

## 설정

| 파일                   | 내용                                                                                   |
| ---------------------- | -------------------------------------------------------------------------------------- |
| `next.config.ts`       | `turbopack.root`를 모노레포 루트로 지정 (pnpm 링크로 연결된 공용 패키지)               |
| `tsconfig.json`        | `@sightlab/typescript-config/nextjs.json` + 경로 별칭                                  |
| `eslint.config.mjs`    | `@sightlab/eslint-config/next`                                                         |
| `stylelint.config.mjs` | `@sightlab/stylelint-config/css-modules` + 토큰 변수 검사                              |
| `vitest.config.ts`     | `@sightlab/vitest-config/base` + tsconfig 경로 별칭(Vite 내장 `resolve.tsconfigPaths`) |
| `vercel.json`          | 빌드 명령 `turbo run build` (공용 패키지를 먼저 빌드)                                  |

`typecheck`는 `next typegen`으로 Next 타입 파일을 만든 뒤 `tsc --noEmit`을 실행한다 (CI에는 빌드 결과물이 없음).

테스트는 대상 옆 `*.test.ts`에 둔다. 규칙은 `@sightlab/vitest-config` README를 따른다
(기본 환경 node, 네트워크 대신 fixture, async 서버 컴포넌트는 E2E로 검사).

## 배포

Vercel 프로젝트를 앱마다 따로 만든다. 이 앱은 Root Directory를 `apps/web`으로 두면 `vercel.json`의 빌드 명령이 적용된다.
