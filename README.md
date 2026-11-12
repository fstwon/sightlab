# Sightlab

Sightlab은 기술 기록과 프로젝트 포트폴리오를 제공하는 웹사이트입니다. 기술 스택별 프로젝트는 모노레포 내 독립 앱으로 구성하고 별도로 배포합니다. 콘텐츠 작성과 관리는 Notion을 활용할 예정입니다.

## 개발 환경

- Node.js 22
- pnpm 9.15.9
- Turborepo 2.5

### 설치

```bash
corepack enable
pnpm install
```

### 명령어

```bash
pnpm dev
pnpm build
pnpm lint
pnpm test
```

## 디렉터리 구성

- `apps/*`: 웹 애플리케이션
- `lib/*`: 공유 UI 및 디자인 토큰
- `packages/config/*`: 공통 개발 도구 설정
- `tools/*`: Storybook 등 개발 도구

Turborepo는 각 워크스페이스 패키지의 스크립트를 실행합니다. 기술 스택별 프로젝트는 필요에 따라 `apps/*`에 추가하고 독립적으로 빌드·배포합니다.

## 공통 Vite 설정

프레임워크 중립적인 설정 패키지 [`@sightlab/vite`](./packages/config/vite/README.md)를 제공합니다. Vite 기반 앱에서 `vite`와 공통 설정 패키지를 명시적으로 설치한 뒤 필요한 설정을 확장합니다.

현재 `apps/web`은 Sightlab 웹사이트의 기본 골격입니다. 새 의존성이 추가된 경우 `pnpm install`을 통해 `pnpm-lock.yaml`을 갱신하고 설치·빌드·린트·테스트를 검증해야 합니다.

## 개발 규칙

[CONVENTION.md](./CONVENTION.md)를 참고해 주세요.
