# @sightlab/vite

프레임워크에 종속되지 않는 공통 Vite 설정 패키지입니다. React, Vue 등 프레임워크 전용 플러그인은 포함하지 않습니다.

## 적용 방법

Vite를 사용하는 워크스페이스 패키지에서 아래 의존성을 추가합니다.

```json
{
  "devDependencies": {
    "@sightlab/vite": "workspace:*",
    "vite": "^7.0.0"
  }
}
```

해당 패키지의 `vite.config.js`에서 공통 설정을 가져옵니다.

```js
import { createViteConfig } from '@sightlab/vite';

export default createViteConfig({
  server: {
    port: 5173,
  },
});
```

공통 설정은 `clearScreen: false`, `build.outDir: 'dist'`만 정의합니다. 다른 옵션은 개별 패키지에서 설정하며, 전달한 설정은 Vite의 `mergeConfig`를 통해 병합합니다.

## 설계 원칙

- 공통 패키지에서 Vite 버전 설치를 강제하지 않음 (`peerDependencies` 사용)
- Vite를 사용하지 않는 Node.js 또는 CLI 실험에는 적용하지 않음
- 프레임워크 플러그인 및 실험별 서버 포트는 해당 실험에서 관리
- HTML이 없는 모듈 실행 결과 수집은 별도 실행기 설계 단계에서 처리

## 검증

실제 Vite 소비 패키지가 추가되기 전까지는 구성 파일의 정적 검토만 가능하며, 번들 생성과 설정 병합의 실제 동작은 별도 검증이 필요합니다.
