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

현재는 모노레포의 루트 설정만 구성되어 있습니다. 실행 가능한 앱과 실험 패키지는 다음 단계에서 추가합니다. 따라서 아직 실제 애플리케이션 빌드 및 테스트 대상은 없습니다.

> `pnpm-lock.yaml`은 의존성 설치를 실제 수행하여 검증한 후 추가해야 합니다. 현재 PR은 개발 환경 초기 설정을 검토하기 위한 초안입니다.

## 디렉터리 구성

- `apps/*`: 웹 애플리케이션
- `packages/*`: 공유 패키지 및 설정
- `experiments/*`: 독립적인 기술 실험

Vite는 기본 빌드 도구로 고려하지만, 실험별로 다른 빌드 도구를 사용할 수 있습니다. Turborepo는 각 패키지의 스크립트를 실행하는 역할만 담당합니다.

## 개발 규칙

[CONVENTION.md](./CONVENTION.md)를 참고해 주세요.
