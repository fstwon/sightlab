# Sightlab Web

VanillaJS, React, Vue.js 실험을 표시할 Next.js 호스트 애플리케이션의 최소 미리보기입니다.

## 실행

루트에서 의존성 설치 후 실행합니다.

```bash
pnpm install
pnpm --filter @sightlab/web dev
```

브라우저에서 `http://localhost:3000` 접속 후 프로젝트 선택 메뉴를 클릭하여 Viewer의 상태 변경을 확인할 수 있습니다.

## 현재 범위

- 프로젝트 선택 메뉴 및 반응형 Viewer 레이아웃
- 세 가지 실험의 연결 전 상태 표시
- iframe과 실험 실행 기능 미구현
- 기존 Figma 디자인을 완전히 반영하지 않은 임시 UI

## 후속 작업

- `experiments/vanillajs`, `experiments/react`, `experiments/vue` 생성
- 실험별 독립 실행 및 정적 빌드 검증
- 실제 iframe URL 연동 및 개발·배포 경로 검증

의존성 추가 후 `pnpm-lock.yaml` 갱신과 설치·빌드·린트·테스트 검증이 필요합니다.
