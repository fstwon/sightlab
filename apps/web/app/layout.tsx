import '@/app/styles';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { BaseLayout } from '@/app/layouts/base-layout';

export const metadata: Metadata = {
  title: 'Sightlab',
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
