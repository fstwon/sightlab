import '@/app/styles';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { BaseLayout } from '@/app/layouts/base-layout';
import { getSiteUrl } from '@/shared/config/env';
import { OPEN_GRAPH_BASE, SITE_DESCRIPTION, SITE_NAME } from '@/shared/config/site';

export const metadata: Metadata = {
  // canonical·Open Graph에 "/notes"처럼 짧게 쓴 주소 앞에 사이트 주소를 붙여 전체 주소로 만든다
  metadataBase: new URL(getSiteUrl()),
  // 하위 페이지는 "Notes | Sightlab"처럼 이름 뒤에 사이트 이름을 붙인다
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  // openGraph를 정하지 않은 페이지(404 등)에 쓰이는 기본값
  openGraph: { ...OPEN_GRAPH_BASE, type: 'website' },
  // X는 이 값이 있어야 링크 미리보기를 큰 이미지 카드로 보여 준다 (이미지는 og:image를 그대로 씀)
  twitter: { card: 'summary_large_image' },
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
