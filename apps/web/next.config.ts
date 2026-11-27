import { fileURLToPath } from 'node:url';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 'use cache' · cacheLife · cacheTag를 쓴다 (entities/*/api의 캐시 층, D0-2 ③).
  cacheComponents: true,
  // Partial Prefetching은 끈다 (값을 정하지 않으면 경고가 뜬다).
  // 켜면 상세 경로의 공통 뼈대가 먼저 200으로 나가서, 없는 slug의 notFound()가 404 대신
  // 200 + noindex가 된다. 정적 페이지 위주라 켜서 얻는 이득이 적어 404 상태 코드를 지킨다.
  // 다음 메이저에서 켜기가 강제되면 그때 404 처리를 다시 정한다.
  partialPrefetching: false,
  turbopack: {
    // pnpm 작업 공간의 공용 패키지(@sightlab/*)는 모노레포 루트를 가리키는 링크라서,
    // Turbopack이 앱 폴더 밖의 파일을 읽을 수 있도록 루트를 모노레포 루트로 지정한다.
    root: fileURLToPath(new URL('../..', import.meta.url)),
    rules: {
      // @sightlab/icons의 SVG를 React 컴포넌트로 불러온다 (인라인 SVG, 색은 currentColor).
      // 크기는 CSS로 정하므로 width·height를 빼고, viewBox를 지우지 않도록 SVGO는 끈다.
      '*.svg': {
        loaders: [{ loader: '@svgr/webpack', options: { dimensions: false, svgo: false } }],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
