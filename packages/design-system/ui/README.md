# @sightlab/ui

Sightlab 공용 UI. 컴포넌트마다 BEM 스타일 하나를 **SCSS로 작성**하고, 패키지 빌드에서 CSS로 컴파일해 배포한다.
React 등 특정 프레임워크 없이 **CSS 클래스와 정해진 HTML 구조**로 사용하며, 앱에 Sass가 없어도 된다.
도메인과 무관한 컴포넌트만 둔다 (NoteCard·ProjectCard 등 도메인 UI는 `apps/web`).

## 사용법

```jsonc
// package.json
{ "dependencies": { "@sightlab/tokens": "workspace:*", "@sightlab/ui": "workspace:*" } }
```

### 1. 컴포넌트 CSS: 앱 진입점에서 한 번만

ui는 토큰을 포함하지 않는다. 앱 진입점에서 **tokens → ui** 순서로 한 번만 불러온다.

```ts
// JS 번들러 (Next.js app/layout.tsx, Vite main.ts)
import '@sightlab/tokens';
import '@sightlab/ui';
```

```css
/* CSS @import */
@import '@sightlab/tokens';
@import '@sightlab/ui';
```

```html
<button type="button" class="sl-button sl-button--primary">저장</button>
```

컴포넌트 하나만 필요하면 `@sightlab/ui/button.css`처럼 개별 파일을 불러온다.

### 2. Sass 전용 API: 필요한 파일마다 (출력 없음)

앱 화면 스타일에서 공용 UI와 같은 표현(예: focus 링)이 필요할 때 mixin을 쓴다.

```scss
@use 'pkg:@sightlab/ui/sass' as ui; // Dart Sass 1.71+ NodePackageImporter

.noteLink:focus-visible {
  @include ui.focus-ring;
}
```

## exports

| 진입점                        | 파일                   | 출력                              |
| ----------------------------- | ---------------------- | --------------------------------- |
| `@sightlab/ui`                | `dist/index.css`       | 모든 컴포넌트 (앱 진입점에서 1회) |
| `@sightlab/ui/<컴포넌트>.css` | `dist/<컴포넌트>.css`  | 컴포넌트 하나                     |
| `@sightlab/ui/sass`           | `src/sass/_index.scss` | 없음 (mixin)                      |

TypeScript 앱에서 `import '@sightlab/ui'`(side-effect import)가 타입 검사를 통과하도록 `"."`에 빈 타입 선언(`index.d.ts`, `types` 조건)을 둔다.

## 컴포넌트

| 컴포넌트      | 원본                 | 루트 클래스        | 수정자                                                                                                          |
| ------------- | -------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------- |
| Breadcrumb    | `breadcrumb.scss`    | `sl-breadcrumb`    | `--compact` (요소 `__item`, `__link`, `__current`)                                                              |
| Button        | `button.scss`        | `sl-button`        | `--primary`, `--secondary`, `--ghost`, `--danger`, `--disabled`                                                 |
| Filter Select | `filter-select.scss` | `sl-filter-select` | `--open`, `--disabled` (요소 `__icon`)                                                                          |
| Pagination    | `pagination.scss`    | `sl-pagination`    | 요소 `__item`(`--current`, `--disabled`), `__icon`, `__ellipsis`                                                |
| Search        | `search.scss`        | `sl-search`        | `--disabled` (요소 `__icon`, `__input`)                                                                         |
| State         | `state.scss`         | `sl-state`         | `--loading`, `--empty`, `--error` (요소 `__skeleton`, `__line`, `__icon`, `__copy`, `__title`, `__description`) |
| Tag           | `tag.scss`           | `sl-tag`           | `--brand`, `--accent`, `--selected`                                                                             |
| TOC Item      | `toc-item.scss`      | `sl-toc-item`      | `--h3`, `--active`                                                                                              |

마크업·변형·상태·접근성 규칙은 Storybook Docs(`apps/storybook`)가 정식 문서다. 각 SCSS 파일 상단 주석에 해당 문서 위치를 적는다.

## Sass API (`src/sass/`)

| mixin                | 용도                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| `focus-ring`         | `:focus-visible` 외곽 링 (3px, 간격 2px). Figma의 안쪽 테두리는 primary 배경에서 보이지 않아 변경 |
| `breadcrumb-compact` | Breadcrumb 모바일 축약. 앱이 미디어 쿼리 안에서 `.sl-breadcrumb`에 적용                           |

## 빌드

```bash
pnpm --filter @sightlab/ui build   # src → dist (sass)
pnpm --filter @sightlab/ui dev     # 변경 감시
```

`dist/`는 커밋하지 않는다. Stylelint는 정의 안 된 변수 검사에 빌드된 tokens(`dist/index.css`)를 쓰므로,
turbo `lint:css`가 tokens를 먼저 빌드한다.

## 규칙

- 클래스 이름: `sl-` 접두사 + BEM (`sl-block__element--modifier`), Stylelint `bemConfig`로 검사
- SCSS 중첩(`&__label`, `&--primary`)으로 작성하고, 루트 클래스는 보간(`#{$block}`) 없이 그대로 쓴다 (보간한 선택자는 Stylelint가 검사하지 않음)
- 변형·상태는 BEM 수정자로 표현 (`.sl-button--disabled`). aria 속성은 접근성용으로만 쓰고 스타일 선택자로 쓰지 않는다
- hover·focus 같은 상호작용 상태는 가상 클래스(`:hover`, `:focus-visible`) 사용
- 값은 `@sightlab/tokens`의 역할 토큰(`var(--sl-*)`)만 사용 (Sass 변수로 우회하지 않음)
- 상단 주석은 `//`로 써서 배포 CSS에 남기지 않는다
- JS 동작은 각 앱에서 구현
