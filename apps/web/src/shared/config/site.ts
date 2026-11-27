// 사이트 공통 정보. 탭 제목·검색 결과·링크 미리보기(Open Graph)가 함께 쓴다.
export const SITE_NAME = 'Sightlab';
export const SITE_DESCRIPTION = '배우고 기록하고 다시 보는 학습 블로그';
export const DEFAULT_OG_IMAGE_ALT = `${SITE_NAME} · ${SITE_DESCRIPTION}`;

// 모든 페이지에 들어가는 Open Graph 값.
// 페이지가 openGraph를 정하면 레이아웃의 openGraph를 통째로 덮어쓰기 때문에(얕은 병합),
// 레이아웃에만 두지 않고 각 페이지가 이 값을 펼쳐 넣는다.
export const OPEN_GRAPH_BASE = {
  siteName: SITE_NAME,
  locale: 'ko_KR',
  // 기본 미리보기 이미지 (app/opengraph-image.tsx). 자기 opengraph-image가 있는 경로는 그 이미지가 이긴다.
  images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: DEFAULT_OG_IMAGE_ALT }],
};
