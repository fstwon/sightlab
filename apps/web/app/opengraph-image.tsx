import { DEFAULT_OG_IMAGE_ALT, SITE_DESCRIPTION } from '@/shared/config/site';
import { OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE, renderOgImage } from '@/shared/ui/og-image';

// 사이트 기본 링크 미리보기 이미지 (Figma OG-01 / Default). 빌드 때 한 번 만들어 둔다.
// openGraph를 직접 정하는 하위 페이지는 OPEN_GRAPH_BASE.images로 이 이미지를 이어 받는다.
export const alt = DEFAULT_OG_IMAGE_ALT;
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

// Next 필수 파일이라 default export (D10 named export 규칙의 예외)
export default function Image() {
  return renderOgImage({
    eyebrow: 'Learning Archive',
    title: SITE_DESCRIPTION,
    meta: 'NOTES · PROJECTS',
  });
}
