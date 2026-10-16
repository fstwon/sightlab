import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--sl-loaded-font-sans' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], display: 'swap', variable: '--sl-loaded-font-mono' });
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
    <html lang="ko" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
