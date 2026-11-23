import '@/app/styles';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { BaseLayout } from '@/app/layouts/base-layout';

export const metadata: Metadata = {
  // 하위 페이지는 "Notes | Sightlab"처럼 이름 뒤에 사이트 이름을 붙인다
  title: { default: 'Sightlab', template: '%s | Sightlab' },
  description: '배우고 기록하고 다시 보는 학습 블로그',
};

// Next 필수 파일이라 default export (D10 named export 규칙의 예외)
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <BaseLayout>{children}</BaseLayout>
      </body>
    </html>
  );
}
