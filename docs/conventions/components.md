# 컴포넌트 작성 원칙

앱(`apps/web`)의 React 컴포넌트를 나누고 배치하는 기준. 폴더 계층은 FSD(`app → pages → widgets → features → entities → shared`)를 따른다.
현업 관행(커스텀 hook + UI 컴포넌트 분리, 작은 클라이언트 경계, 경계에만 두는 index)과 맞춘 결정이다 (2026-11-23 확정).

## 원칙

| #   | 원칙                     | 내용                                                                                                                                       |
| --- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| P1  | 역할 3종으로 나눈다      | **UI 컴포넌트**: props → 마크업, 상태·효과 없음 / **hook**(`model/use-*.ts`): 상태와 브라우저 효과 / **조립 컴포넌트**: hook과 UI를 연결   |
| P2  | 클라이언트 경계는 최소로 | `'use client'`는 상태나 브라우저 API가 필요한 조립 컴포넌트에만 붙인다. 기본은 서버 컴포넌트                                               |
| P3  | 판단 로직은 순수 함수로  | 계산만 하는 로직은 `lib/*.ts` 순수 함수로 빼고 옆에 테스트(`*.test.ts`)를 둔다                                                             |
| P4  | 나누는 기준              | ① 바뀌는 이유가 다르다 ② 두 곳 이상에서 쓴다 ③ 서버·클라이언트 경계다 ④ 한 파일에 책임이 둘 이상이다. 하나도 해당하지 않으면 나누지 않는다 |
| P5  | 배치                     | 한 슬라이스 전용은 그 슬라이스의 `ui`·`model`·`lib`. 두 슬라이스 이상이 쓰는 범용 hook·함수는 `shared/lib`                                 |
| P6  | props 규칙               | 데이터는 props로 받고 동작은 `onX` 콜백으로 올린다. UI 컴포넌트 안에서 데이터 요청·전역 상태 접근을 하지 않는다                            |
| P7  | 파일 규칙                | 파일당 컴포넌트 하나, 컴포넌트마다 스타일 모듈 하나(`*.module.scss`). `index.ts`는 슬라이스와 shared 컴포넌트 경계에만 둔다                |

## 보류한 패턴 (도입 기준)

| 패턴                                    | 도입 시점                                                                |
| --------------------------------------- | ------------------------------------------------------------------------ |
| Compound Components (`<Tabs.List>` 등)  | 쓰는 곳마다 조각 배치가 달라지는 UI(탭, 필터 패널 등)가 생길 때          |
| Headless 라이브러리 (React Aria, Radix) | 대화상자·복합 메뉴처럼 키보드·focus 동작이 복잡한 UI가 생길 때 다시 검토 |
| Atomic Design 폴더 (atoms, molecules …) | 쓰지 않는다. FSD 계층과 겹치고 경계가 애매하다                           |
| Render Props, HOC                       | 쓰지 않는다. hook으로 대신한다                                           |

## 파일 이름

- 파일·폴더는 kebab-case, 컴포넌트는 PascalCase, hook은 `use` + 동사구 (`use-mobile-menu.ts` → `useMobileMenu`)
- 같은 슬라이스의 작은 UI 조각은 `ui/` 아래 파일로 둔다 (`ui/mobile-menu-item.tsx`). shared 컴포넌트는 폴더로 둔다 (`shared/ui/logo/`)

## 예시: `widgets/site-header`

```
shared/lib/
├─ is-active-path.ts         순수 함수: 현재 주소가 메뉴 주소(또는 그 하위)인지        P3·P5
├─ use-body-scroll-lock.ts   hook: 켜져 있는 동안 body 스크롤 잠금                    P5
├─ use-escape-key.ts         hook: Esc를 누르면 콜백
└─ use-media-query.ts        hook: 미디어 쿼리 일치 여부

widgets/site-header/
├─ index.ts                  공개 API: SiteHeader
├─ model/
│  └─ use-mobile-menu.ts     열림 상태 + 위 hook 조합                                 P1
└─ ui/
   ├─ site-header.tsx        서버 컴포넌트, 조립만                                    P2
   ├─ header-logo.tsx        UI: 로고 링크 (768px 기준 Primary/Compact)
   ├─ desktop-nav.tsx        'use client' 조립: 현재 주소 → 링크 목록
   ├─ nav-link.tsx           UI: 링크 하나 (isActive)
   ├─ mobile-menu.tsx        'use client' 조립: useMobileMenu + 아래 UI
   ├─ mobile-menu-toggle.tsx UI: 열기·닫기 버튼
   ├─ mobile-menu-panel.tsx  UI: 패널 + 항목 목록 + 덮개 (onClose)
   └─ mobile-menu-item.tsx   UI: 번호 + 이름 + 화살표 (isActive)
```

데스크톱 링크와 모바일 항목은 모양이 달라 UI는 따로 두고, 현재 메뉴 판단(`isActivePath`)만 공유한다.
