import type { Metadata } from 'next';
import '@sightlab/design-tokens/tokens.css';
import '@sightlab/design-tokens/reset.css';
import '@sightlab/design-tokens/typography.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sightlab | Experiments',
  description: '개별 기술 실험을 탐색하고 실행하는 Sightlab 미리보기',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
