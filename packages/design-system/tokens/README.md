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
| `index.css`            |                                            | 전체 진입점                                         |

## 규칙

- 컴포넌트와 앱은 **역할 색만** 사용한다. 원색은 역할 색 정의에만 쓴다.
- 글자 스타일 역할: `display`, `h1`~`h3`, `body-lg`, `body`, `body-sm`, `label`, `code`.
- 글자 크기·줄 높이는 rem(16px 기준), 그 외 길이는 px.
- 다크 모드는 아직 없다 (Figma에 Light만 정의).
- 값을 바꿀 때는 Figma 변수를 먼저 수정하고 이 파일에 반영한다.
