# @sightlab/storybook

Sightlab 디자인 시스템(`@sightlab/tokens`·`@sightlab/ui`·`@sightlab/icons`) 문서와 스토리.
`@storybook/html-vite`로 React 없이 HTML 문자열을 그린다.

## 실행

```bash
pnpm --filter @sightlab/storybook dev     # http://localhost:6006
pnpm turbo run build --filter @sightlab/storybook   # tokens·ui 빌드 후 storybook-static/ 생성
```

`dev`는 공용 패키지의 `dist`를 읽으므로 먼저 tokens·ui를 빌드하거나 각 패키지의 `dev`(sass watch)를 함께 실행한다.

## 구성

```
.storybook/
  main.ts        framework(html-vite), stories 경로, addons(docs, a11y)
  preview.ts     공용 CSS 불러오기(tokens → ui), 사이드바 순서, a11y
src/
  introduction.mdx          시작 문서
  foundations/              토큰·아이콘 문서 (값은 빌드된 토큰 CSS를 ?raw로 읽어 표시)
  <component>/
    <component>.stories.ts  변형·상태마다 스토리 1개
    <component>.mdx         규칙 문서 (정식 문서)
```

사이드바 순서: `Introduction` → `Foundations`(토큰·아이콘) → `Components`

## 작성 규칙

- Foundations 문서는 값을 다시 적지 않는다. `@sightlab/tokens/<종류>.css?raw`를 `readCssVariables`로 읽어 표시하고, 견본은 `var(--sl-*)`로 그린다.
- 아이콘 목록(`foundations/icons.ts`)은 공개 경로로 하나씩 불러오므로 아이콘을 추가하면 함께 수정한다.
- 공용 패키지는 일반 의존성(`workspace:*`)으로만 쓰고, 다른 패키지의 내부 파일을 참조하지 않는다.
- 스토리 `title`은 `Components/<컴포넌트>`, 변형·상태(BEM 수정자)마다 스토리 1개.
- `render`는 규칙 문서의 마크업과 같은 HTML을 돌려준다.
- 규칙 문서(MDX) 항목: 마크업(필수·선택 요소), 변형, 상태, 접근성. 각 항목 옆에 `<Canvas>`로 실제 렌더를 둔다.
- CSF 형식상 meta는 `export default`를 쓴다 (named export 규칙의 예외).
- hover·focus는 스토리로 고정하지 않고 마우스·키보드로 확인한다.

## 배포 (Vercel)

이 앱은 Vercel 프로젝트 하나로 배포한다. 한 저장소에 앱마다 Vercel 프로젝트를 따로 연결하며
(web은 `apps/web`을 Root Directory로 하는 별도 프로젝트), 도메인·환경변수·배포 기록은 프로젝트마다 따로 갖는다.

빌드 설정은 `vercel.json`에 있다.

| 설정             | 값                                                                     |
| ---------------- | ---------------------------------------------------------------------- |
| Build Command    | `turbo run build` (Root Directory 기준으로 이 앱과 의존 패키지만 빌드) |
| Output Directory | `storybook-static`                                                     |
| Install Command  | Vercel 자동 감지 (`pnpm install`)                                      |

Vercel 대시보드 설정 (프로젝트 생성 시 1회):

| 설정                                     | 값                                                           |
| ---------------------------------------- | ------------------------------------------------------------ |
| Root Directory                           | `apps/storybook`                                             |
| Include files outside the root directory | 켬 (공용 패키지 빌드에 필요)                                 |
| Framework Preset                         | Other (`vercel.json`이 빌드 명령·출력 폴더 지정)             |
| Node.js Version                          | 26.x (루트 `engines.node`)                                   |
| 환경변수 `ENABLE_EXPERIMENTAL_COREPACK`  | `1` (`packageManager`의 pnpm 12.21.0 사용, 없으면 9·10 사용) |
| Skip unaffected projects                 | 켬 (이 앱·의존 패키지에 변경이 없으면 빌드 생략)             |

배포 로그에서 pnpm 버전(12.21.0)과 빌드 순서(tokens → ui → storybook)를 확인한다.
PR마다 미리보기 URL이 생기고, `main` 병합 시 운영 URL이 갱신된다.

## 참고

- MDX 문서 블록은 `@storybook/addon-docs`가 내부적으로 React로 그린다. React는 addon-docs의 의존성으로 설치되며, 이 앱의 코드는 React를 쓰지 않는다.
- 접근성은 `@storybook/addon-a11y`(axe)가 스토리마다 검사한다.
