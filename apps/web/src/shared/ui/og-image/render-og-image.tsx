import 'server-only';

import { ImageResponse } from 'next/og';

import { loadOgAssets, OG_FONT_FAMILY } from './load-og-assets';
import { OG_COLORS, OgImage, type OgImageContent } from './og-image';

// 링크 미리보기 권장 크기 (1.91:1, 페이스북·X·카카오톡 공통)
export const OG_IMAGE_SIZE = { width: 1200, height: 630 };
export const OG_IMAGE_CONTENT_TYPE = 'image/png';

export async function renderOgImage(content: OgImageContent): Promise<ImageResponse> {
  const { fonts, logoSymbolSrc } = await loadOgAssets({
    ring: OG_COLORS.primary,
    dot: OG_COLORS.accent,
  });

  return new ImageResponse(
    <OgImage {...content} fontFamily={OG_FONT_FAMILY} logoSymbolSrc={logoSymbolSrc} />,
    { ...OG_IMAGE_SIZE, fonts },
  );
}
