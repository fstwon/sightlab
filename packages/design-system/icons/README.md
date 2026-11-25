# @sightlab/icons

Sightlab 공용 아이콘. Figma Icon Library의 아이콘을 **SVG 파일 그대로** 배포한다.
빌드 단계가 없고, 아이콘을 컴포넌트로 감싸는 일(React 등)은 각 앱에서 한다.

## 사용법

```jsonc
// package.json
{ "dependencies": { "@sightlab/icons": "workspace:*" } }
```

아이콘 색은 `currentColor`이므로, 사용 방식에 따라 글자색을 따라가는지가 다르다.

| 방식       | 글자색 따라가기 | 용도                      |
| ---------- | --------------- | ------------------------- |
| 인라인 SVG | 됨              | 기본. 버튼·링크 안 아이콘 |
| CSS mask   | 됨              | 마크업을 바꾸기 어려울 때 |
| `<img>`    | 안 됨 (검정)    | 색이 바뀌지 않는 장식용   |

### 인라인 SVG

번들러로 SVG 내용을 문자열로 불러와 마크업에 넣는다. 방식은 앱마다 고른다.

```ts
// Vite
import searchIcon from '@sightlab/icons/search.svg?raw';
button.insertAdjacentHTML('afterbegin', searchIcon);
```

Next.js(React)는 SVGR 등 앱의 설정으로 컴포넌트화한다.

### CSS mask

```ts
// Vite: 파일 URL을 CSS 변수로 넘긴다
import searchIconUrl from '@sightlab/icons/search.svg?url';
icon.style.setProperty('--icon', `url(${searchIconUrl})`);
```

```css
.icon {
  width: 24px;
  height: 24px;
  background-color: currentColor;
  mask: var(--icon) center / contain no-repeat;
}
```

CSS `url()` 안에 패키지 경로(`@sightlab/icons/…`)를 직접 쓰는 방식은 번들러마다 해석이 달라 쓰지 않는다.

### `<img>`

```ts
// Vite
import searchIconUrl from '@sightlab/icons/search.svg?url';
```

```html
<img src="…/search.svg" alt="" width="24" height="24" />
```

## exports

| 진입점                       | 파일             |
| ---------------------------- | ---------------- |
| `@sightlab/icons/<이름>.svg` | `svg/<이름>.svg` |

## 아이콘

| 파일                | Figma             |
| ------------------- | ----------------- |
| `menu.svg`          | Icon/Menu         |
| `close.svg`         | Icon/Close        |
| `search.svg`        | Icon/Search       |
| `filter.svg`        | Icon/Filter       |
| `chevron-up.svg`    | Icon/ChevronUp    |
| `chevron-down.svg`  | Icon/ChevronDown  |
| `chevron-left.svg`  | Icon/ChevronLeft  |
| `chevron-right.svg` | Icon/ChevronRight |
| `arrow-up.svg`      | Icon/ArrowUp      |
| `arrow-left.svg`    | Icon/ArrowLeft    |
| `arrow-right.svg`   | Icon/ArrowRight   |
| `copy.svg`          | Icon/Copy         |
| `check.svg`         | Icon/Check        |
| `external-link.svg` | Icon/ExternalLink |
| `refresh.svg`       | Icon/Refresh      |
| `more.svg`          | Icon/More         |
| `alert.svg`         | Icon/Alert        |
| `info.svg`          | Icon/Info         |
| `exclamation.svg`   | Icon/Exclamation  |
| `code.svg`          | Icon/Code         |
| `globe.svg`         | Icon/Globe        |

## 제작 규칙

- `viewBox="0 0 24 24"`, `width`·`height` 24
- 선 아이콘: `fill="none"`, `stroke="currentColor"`, `stroke-width="1.75"` (점 부분은 `fill="currentColor"`: `more`의 점, `alert`·`exclamation`의 느낌표 점, `info`의 i 점)
- 파일 이름은 kebab-case, Figma `Icon/<Name>`에 대응 (`Icon/ChevronDown` → `chevron-down.svg`)
- 새 아이콘은 Figma Icon Library에 먼저 추가하고 같은 규칙으로 내보낸다

## 브랜드 심볼 (`brand/`)

아이콘 목록과 성격이 달라(색 두 가지, Figma Brand / Logo Final) 폴더를 나눈다.

| 파일                    | Figma                                              | 진입점                                  |
| ----------------------- | -------------------------------------------------- | --------------------------------------- |
| `brand/logo-symbol.svg` | Logo / Observation, Observation Symbol (node 54:7) | `@sightlab/icons/brand/logo-symbol.svg` |

- 원·타원은 `currentColor`: 쓰는 곳에서 `color: var(--sl-color-action-primary)`로 지정한다
- 가운데 점은 `style="fill: var(--sl-color-accent-default, #f2a74b)"`: 인라인 SVG는 토큰 색, `<img>` 등 단독 사용은 괄호 안 기본값
- Figma 내보내기는 타원의 안쪽 테두리를 mask로 표현한다. 한 화면에 여러 번 쓰면 mask `id`가 겹치므로, 같은 모양의 일반 선(가운데 기준)으로 바꿔 저장했다
- "Sightlab" 글자는 SVG에 넣지 않는다. 화면에서는 HTML 텍스트(사이트 글꼴, 낭독·검색 가능)로 쓴다

## 접근성

- 의미가 있는 아이콘(텍스트 없는 버튼 등)은 버튼에 `aria-label`을 붙이거나 숨김 텍스트를 함께 둔다
- 장식용 아이콘은 `aria-hidden="true"`(인라인 SVG) 또는 `alt=""`(`<img>`)
