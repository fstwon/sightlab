# @sightlab/tokens

Sightlab 디자인 토큰. Figma 변수(`--sl-*`)를 그대로 옮긴 **CSS 변수 파일이 원본**이며,
Sass나 특정 프레임워크 없이 모든 앱에서 사용할 수 있다.

## 사용법

```jsonc
// package.json
{ "dependencies": { "@sightlab/tokens": "workspace:*" } }
```

```css
/* CSS (번들러 또는 postcss-import) */
@import '@sightlab/tokens';

.note-title {
  color: var(--sl-color-text-primary);
  font-size: var(--sl-text-h2-size);
}
```

```scss
// Sass (Dart Sass 1.71+ pkg: importer)
@use 'pkg:@sightlab/tokens';
```

```ts
// JS 번들러 (Next.js, Vite)
import '@sightlab/tokens';
```

필요한 종류만 불러올 수도 있다: `@sightlab/tokens/spacing.css`.
역할 색 파일은 원색을 참조하므로 `semantic-colors.css`는 `primitive-colors.css`와 함께 불러온다.

## 파일

| 파일                   | 접두사                                     | 내용                                                |
| ---------------------- | ------------------------------------------ | --------------------------------------------------- |
| `primitive-colors.css` | `--sl-color-<색>-<단계>`                   | 원색 팔레트                                         |
| `semantic-colors.css`  | `--sl-color-<역할>-<이름>`                 | 역할 색 (bg, text, border, action, accent, status)  |
| `typography.css`       | `--sl-font-family-*`, `--sl-text-<역할>-*` | 글꼴, 역할별 size·line-height·weight·letter-spacing |
| `spacing.css`          | `--sl-spacing-*`                           | 2xs(4) ~ 3xl(64)                                    |
| `radius.css`           | `--sl-radius-*`                            | none, sm, md, lg, full                              |
| `shadow.css`           | `--sl-shadow-*`                            | sm, md                                              |
| `layout.css`           | `--sl-layout-*`                            | 콘텐츠·본문 최대 폭, 모바일 여백, 터치 영역         |
| `fonts.css`            |                                            | 글꼴 `@font-face` 진입점 (`font-faces/*.css`)       |
| `index.css`            |                                            | 전체 진입점 (글꼴 포함)                             |

## 글꼴

`index.css`가 `fonts.css`를 포함하므로 `@import '@sightlab/tokens'` 한 줄로 글꼴까지 불러온다.
글꼴 파일은 패키지 `fonts/`에 직접 포함한다(직접 호스팅). 번들러가 `url()`의 파일을 함께 내보낸다.

| 글꼴                | 역할                  | 출처 (복사한 버전)                                          | 파일                                              |
| ------------------- | --------------------- | ----------------------------------------------------------- | ------------------------------------------------- |
| SUIT Variable       | 본문·UI 주 글꼴       | `@sun-typeface/suit` 2.0.5 `fonts/variable/woff2`           | 단일 파일 (약 610KB)                              |
| Pretendard Variable | SUIT에 없는 글자 대체 | `pretendard` 1.3.9 `dist/web/variable/woff2-dynamic-subset` | 범위별 92개, `unicode-range`로 필요한 범위만 받음 |
| JetBrains Mono      | 코드                  | `@fontsource-variable/jetbrains-mono` 5.3.0 `files`         | latin·latin-ext 정체 2개                          |

- 라이선스: 모두 SIL Open Font License 1.1, 각 `fonts/<글꼴>/LICENSE`.
- 갱신: 위 패키지의 새 버전에서 woff2를 같은 이름으로 복사하고, Pretendard·JetBrains Mono는 공식 CSS의 `unicode-range`를 `src/font-faces/*.css`에 반영한다. 이 표의 버전을 함께 수정한다.
- 글꼴 파일을 직접 참조할 때: `@sightlab/tokens/fonts/suit/SUIT-Variable.woff2` (예: `<link rel="preload">`).

## 규칙

- 컴포넌트와 앱은 **역할 색만** 사용한다. 원색은 역할 색 정의에만 쓴다.
- 글자 스타일 역할: `display`, `h1`~`h3`, `body-lg`, `body`, `body-sm`, `label`, `code`.
- 글자 크기·줄 높이는 rem(16px 기준), 그 외 길이는 px.
- 다크 모드는 아직 없다 (Figma에 Light만 정의).
- 값을 바꿀 때는 Figma 변수를 먼저 수정하고 이 파일에 반영한다.
