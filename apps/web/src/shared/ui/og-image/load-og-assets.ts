import 'server-only';

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { cacheLife } from 'next/cache';

// OG 이미지(Satori)는 woff2를 읽지 못해 SUIT OTF를 쓴다 (@sightlab/tokens/fonts/suit).
// 빌드·요청 때 앱 폴더(apps/web)에서 실행되므로 앱의 node_modules 링크로 찾는다.
const TOKENS_DIR = join(process.cwd(), 'node_modules/@sightlab/tokens');
const ICONS_DIR = join(process.cwd(), 'node_modules/@sightlab/icons');

export const OG_FONT_FAMILY = 'SUIT';

export type OgFont = {
  name: string;
  data: ArrayBuffer;
  weight: 500 | 700;
  style: 'normal';
};

export type OgAssets = {
  fonts: OgFont[];
  logoSymbolSrc: string;
};

type LogoColors = { ring: string; dot: string };

// Cache Components에서는 파일을 비동기로 읽으면 미리 그리기(빌드 때 생성)가 멈춘다.
// 글꼴·로고는 배포마다 바뀌지 않으므로 캐시에 넣어 OG 이미지를 빌드 때 만들게 한다.
export async function loadOgAssets(logoColors: LogoColors): Promise<OgAssets> {
  'use cache';
  cacheLife('max');

  const [medium, bold, logoSvg] = await Promise.all([
    readFile(join(TOKENS_DIR, 'fonts/suit/SUIT-Medium.otf')),
    readFile(join(TOKENS_DIR, 'fonts/suit/SUIT-Bold.otf')),
    readFile(join(ICONS_DIR, 'brand/logo-symbol.svg'), 'utf8'),
  ]);

  return {
    fonts: [
      { name: OG_FONT_FAMILY, data: toArrayBuffer(medium), weight: 500, style: 'normal' },
      { name: OG_FONT_FAMILY, data: toArrayBuffer(bold), weight: 700, style: 'normal' },
    ],
    logoSymbolSrc: toLogoDataUri(logoSvg, logoColors),
  };
}

// 캐시에 담을 수 있도록 Buffer에서 그 파일 부분만 ArrayBuffer로 떼어 낸다
function toArrayBuffer(buffer: Buffer): ArrayBuffer {
  return new Uint8Array(buffer).buffer;
}

// 로고 심볼 SVG를 그림 주소(data URI)로 만든다.
// Satori는 CSS 변수와 currentColor를 모르므로 색을 직접 채워 넣는다.
function toLogoDataUri(svg: string, { ring, dot }: LogoColors): string {
  const filled = svg
    .replaceAll('currentColor', ring)
    .replace(/style="fill: var\([^)]*\)"/, `fill="${dot}"`);

  return `data:image/svg+xml;base64,${Buffer.from(filled).toString('base64')}`;
}
