import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--sl-loaded-font-sans' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], display: 'swap', variable: '--sl-loaded-font-mono' });
import '@sightlab/design-tokens/tokens.css';
import '@sightlab/design-tokens/reset.css';
import '@sightlab/design-tokens/typography.css';
import './globals.scss';

export const metadata: Metadata = {
  title: 'Sightlab',
  description: '개발 실험과 기술 기록을 위한 Sightlab',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
