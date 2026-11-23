# @sightlab/tokens

Sightlab 디자인 토큰. Figma 변수(`--sl-*`)를 **SCSS map 원본**에 정의하고,
패키지 빌드에서 `:root` CSS 변수로 컴파일해 배포한다. 앱은 컴파일된 CSS를 쓰므로 Sass가 없어도 된다.

## 사용법

```jsonc
// package.json
{ "dependencies": { "@sightlab/tokens": "workspace:*" } }
```

### 1. 토큰 CSS: 앱 진입점에서 한 번만

`:root` 변수와 `@font-face`를 **출력**하므로 앱 전체에서 한 번만 불러온다
(컴포넌트·CSS Module마다 불러오면 같은 CSS가 중복된다). 순서는 tokens → ui → 앱 스타일.

```ts
// JS 번들러 (Next.js app/layout.tsx, Vite main.ts)
import '@sightlab/tokens';
```

```css
/* CSS @import (번들러 또는 postcss-import) */
@import '@sightlab/tokens';
```

### 2. 화면 스타일: `var(--sl-*)`만 사용

```css
.noteTitle {
  color: var(--sl-color-text-primary);
  font-size: var(--sl-text-h2-size);
}
```

### 3. Sass 전용 API: 필요한 파일마다 (출력 없음)

토큰 map을 Sass 계산·반복에 쓸 때만 사용한다. CSS를 출력하지 않으므로 여러 파일에서 `@use` 해도 중복되지 않는다.

```scss
@use 'sass:map';
@use 'pkg:@sightlab/tokens/sass' as tokens; // Dart Sass 1.71+ NodePackageImporter

.grid {
  gap: map.get(tokens.$spacing, md);
}
```

### 4. breakpoint: 미디어 쿼리 (출력 없음)

미디어 쿼리에는 CSS 변수를 쓸 수 없어 breakpoint는 Sass 값과 mixin으로만 제공한다 (Figma 06 Responsive 주석 기준).

| 이름 | 값    | 용도                                         |
| ---- | ----- | -------------------------------------------- |
| `md` | 768px | 이상은 데스크톱 헤더·가로 푸터 (모바일 우선) |

```scss
// Next.js(Turbopack) 앱: 단일 파일 진입점 (다른 파일을 불러오지 않음)
@use '@sightlab/tokens/sass/breakpoints' as *;

.page {
  padding: var(--sl-layout-gutter-mobile);

  @include media-up(md) {
    padding: var(--sl-spacing-xl);
  }
}
```

Turbopack은 다른 패키지에서 불러온 Sass 파일 안의 상대 경로 `@forward`를 찾지 못해 `./sass`(여러 파일을 모으는 진입점)가 실패한다.
그래서 앱이 직접 쓰는 Sass는 단일 파일 진입점으로 따로 공개한다. `./sass`에도 같은 내용이 포함되어 `pkg:` 사용처(Vite 등)는 그대로 쓴다.

Sass에서 `@use 'pkg:@sightlab/tokens'`로 토큰 CSS를 불러오지 않는다.
Sass는 `url()`을 재작성하지 않아 글꼴 경로가 깨진다 (Vite에서 확인). 토큰 CSS는 1번 방식으로만 불러온다.

## exports

| 진입점                                       | 파일                         | 출력                                         |
| -------------------------------------------- | ---------------------------- | -------------------------------------------- |
| `@sightlab/tokens`                           | `dist/index.css`             | 글꼴 + 모든 토큰 (앱 진입점에서 1회)         |
| `@sightlab/tokens/<종류>.css`                | `dist/<종류>.css`            | 종류별 토큰 (선택)                           |
| `@sightlab/tokens/sass`                      | `src/sass/_index.scss`       | 없음 (Sass map)                              |
| `@sightlab/tokens/sass/breakpoints`          | `src/sass/_breakpoints.scss` | 없음 (`$breakpoints`, `media-up`, 단일 파일) |
| `@sightlab/tokens/fonts/<글꼴>/<파일>.woff2` | `fonts/…`                    | 글꼴 파일 (preload 등 직접 참조)             |

Vite 8(JS·CSS import)과 Next.js 16 Turbopack(JS import, `./<종류>.css` 포함)에서
`dist` CSS로 연결되고 글꼴 파일이 함께 내보내지는 것을 확인했다.

TypeScript 앱에서 `import '@sightlab/tokens'`(side-effect import)가 타입 검사를 통과하도록 `"."`에 빈 타입 선언(`index.d.ts`, `types` 조건)을 둔다.

## 파일

| 원본 (`src/sass/`, 출력 없음) | 출력 (`src/` → `dist/`) | CSS 변수                                       |
| ----------------------------- | ----------------------- | ---------------------------------------------- |
| `_primitive-colors.scss`      | `primitive-colors.css`  | `--sl-color-<색>-<단계>`                       |
| `_semantic-colors.scss`       | `semantic-colors.css`   | `--sl-color-<역할>` → `var(--sl-color-<원색>)` |
| `_typography.scss`            | `typography.css`        | `--sl-font-family-*`, `--sl-text-<역할>-*`     |
| `_spacing.scss`               | `spacing.css`           | `--sl-spacing-*` (2xs 4 ~ 3xl 64)              |
| `_radius.scss`                | `radius.css`            | `--sl-radius-*` (none, sm, md, lg, full)       |
| `_shadow.scss`                | `shadow.css`            | `--sl-shadow-*` (sm, md)                       |
| `_layout.scss`                | `layout.css`            | `--sl-layout-*`                                |
|                               | `fonts.css`             | `@font-face` (`_font-*.scss`)                  |
|                               | `index.css`             | 글꼴 + 위 전체                                 |

- 값은 `src/sass/_*.scss`의 map에서만 수정한다. 출력 파일은 map을 `@each`로 돌며 변수를 만든다.
- 역할 색이 없는 원색 이름을 참조하면 `@error`로 빌드가 실패한다.
- 그림자는 8자리 hex를 그대로 출력하려고 문자열로 둔다 (Sass가 색으로 해석하면 `rgba()`로 바꿈).

## 빌드

```bash
pnpm --filter @sightlab/tokens build   # src → dist (sass)
pnpm --filter @sightlab/tokens dev     # 변경 감시
```

루트 `turbo run build`는 tokens를 이를 쓰는 패키지·앱보다 먼저 빌드한다. `dist/`는 커밋하지 않는다.

## 글꼴

`index.css`가 `fonts.css`를 포함하므로 `import '@sightlab/tokens'` 한 줄로 글꼴까지 불러온다.
글꼴 파일은 패키지 `fonts/`에 직접 포함한다(직접 호스팅). 번들러가 `url()`의 파일을 함께 내보낸다.

| 글꼴                | 역할                  | 출처 (복사한 버전)                                          | 파일                                              |
| ------------------- | --------------------- | ----------------------------------------------------------- | ------------------------------------------------- |
| SUIT Variable       | 본문·UI 주 글꼴       | `@sun-typeface/suit` 2.0.5 `fonts/variable/woff2`           | 단일 파일 (약 610KB)                              |
| Pretendard Variable | SUIT에 없는 글자 대체 | `pretendard` 1.3.9 `dist/web/variable/woff2-dynamic-subset` | 범위별 92개, `unicode-range`로 필요한 범위만 받음 |
| JetBrains Mono      | 코드                  | `@fontsource-variable/jetbrains-mono` 5.3.0 `files`         | latin·latin-ext 정체 2개                          |

- 라이선스: 모두 SIL Open Font License 1.1, 각 `fonts/<글꼴>/LICENSE`.
- 갱신: 위 패키지의 새 버전에서 woff2를 같은 이름으로 복사하고, Pretendard·JetBrains Mono는 공식 CSS의 `unicode-range`를 `src/_font-*.scss`에 반영한다. 이 표의 버전을 함께 수정한다.
- `_font-*.scss`는 `src/` 바로 아래에 둔다. `url('../fonts/…')`이 `src/`와 `dist/` 어디서든 패키지의 `fonts/`를 가리키게 하기 위해서다.

## 규칙

- 컴포넌트와 앱은 **역할 색만** 사용한다. 원색은 역할 색 정의에만 쓴다.
- 글자 스타일 역할: `display`, `h1`~`h3`, `body-lg`, `body`, `body-sm`, `label`, `code`.
- 글자 크기·줄 높이는 rem(16px 기준), 그 외 길이는 px.
- 다크 모드는 아직 없다 (Figma에 Light만 정의). breakpoint는 아직 정의하지 않았다 (web 화면 작업 때 결정).
- 값을 바꿀 때는 Figma 변수를 먼저 수정하고 이 파일에 반영한다.
