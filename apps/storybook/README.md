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
  <component>/
    <component>.stories.ts  변형·상태마다 스토리 1개
    <component>.mdx         규칙 문서 (정식 문서)
```

사이드바 순서: `Introduction` → `Foundations`(토큰·아이콘) → `Components`

## 작성 규칙

- 공용 패키지는 일반 의존성(`workspace:*`)으로만 쓰고, 다른 패키지의 내부 파일을 참조하지 않는다.
- 스토리 `title`은 `Components/<컴포넌트>`, 변형·상태(BEM 수정자)마다 스토리 1개.
- `render`는 규칙 문서의 마크업과 같은 HTML을 돌려준다.
- 규칙 문서(MDX) 항목: 마크업(필수·선택 요소), 변형, 상태, 접근성. 각 항목 옆에 `<Canvas>`로 실제 렌더를 둔다.
- CSF 형식상 meta는 `export default`를 쓴다 (named export 규칙의 예외).
- hover·focus는 스토리로 고정하지 않고 마우스·키보드로 확인한다.

## 참고

- MDX 문서 블록은 `@storybook/addon-docs`가 내부적으로 React로 그린다. React는 addon-docs의 의존성으로 설치되며, 이 앱의 코드는 React를 쓰지 않는다.
- 접근성은 `@storybook/addon-a11y`(axe)가 스토리마다 검사한다.
