import 'server-only';

import { ImageResponse } from 'next/og';

import { loadOgAssets, OG_FONT_FAMILY } from './load-og-assets';
import { OG_COLORS, OgImage, type OgImageContent } from './og-image';
import { replaceMissingGlyphs } from './replace-missing-glyphs';

// 링크 미리보기 권장 크기 (1.91:1, 페이스북·X·카카오톡 공통)
export const OG_IMAGE_SIZE = { width: 1200, height: 630 };
export const OG_IMAGE_CONTENT_TYPE = 'image/png';

export async function renderOgImage(content: OgImageContent): Promise<ImageResponse> {
  const { fonts, logoSymbolSrc } = await loadOgAssets({
    ring: OG_COLORS.primary,
    dot: OG_COLORS.accent,
  });

  return new ImageResponse(
    <OgImage
      {...toDrawableContent(content)}
      fontFamily={OG_FONT_FAMILY}
      logoSymbolSrc={logoSymbolSrc}
    />,
    { ...OG_IMAGE_SIZE, fonts },
  );
}

// 모든 글에서 SUIT에 없는 기호를 바꾼다. 없는 항목(summary·meta)은 그대로 비워 둔다.
function toDrawableContent({ eyebrow, title, summary, meta }: OgImageContent): OgImageContent {
  return {
    eyebrow: replaceMissingGlyphs(eyebrow),
    title: replaceMissingGlyphs(title),
    ...(summary === undefined ? {} : { summary: replaceMissingGlyphs(summary) }),
    ...(meta === undefined ? {} : { meta: replaceMissingGlyphs(meta) }),
  };
}
