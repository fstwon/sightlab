import { fileURLToPath } from 'node:url';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // pnpm 작업 공간의 공용 패키지(@sightlab/*)는 모노레포 루트를 가리키는 링크라서,
  // Turbopack이 앱 폴더 밖의 파일을 읽을 수 있도록 루트를 모노레포 루트로 지정한다.
  turbopack: {
    root: fileURLToPath(new URL('../..', import.meta.url)),
  },
};

export default nextConfig;
