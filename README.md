# Sightlab

Sightlab은 개발 기술을 학습하고 실험 결과를 기록하기 위한 프로젝트입니다.

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
- `experiments/*`: 독립적인 기술 실험

Turborepo는 각 패키지의 스크립트를 실행합니다. Vite를 사용하지 않는 실험에는 Vite를 강제하지 않습니다.

## 공통 Vite 설정

프레임워크 중립적인 설정 패키지 [`@sightlab/vite`](./packages/config/vite/README.md)를 제공합니다. 개별 실험에서 `vite`와 공통 설정 패키지를 명시적으로 설치한 뒤 필요한 설정을 확장합니다.

현재 실행 가능한 앱과 실험 패키지는 아직 추가되지 않았습니다. 새 의존성이 추가된 경우 `pnpm install`을 통해 `pnpm-lock.yaml`을 갱신하고 설치·빌드·린트·테스트를 검증해야 합니다.

## 개발 규칙

[CONVENTION.md](./CONVENTION.md)를 참고해 주세요.
