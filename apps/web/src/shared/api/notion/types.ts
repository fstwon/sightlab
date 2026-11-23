// 데이터 접근 층이 돌려주는 도메인 타입. Notion 응답 형식은 이 층 밖으로 나가지 않는다 (D0-2).

// 화면 표시 이름과 URL용 slug (예: Next.js → nextjs)
export type Label = {
  name: string;
  slug: string;
};

// 노트 목록·카드에 필요한 값 (D5 Notes 속성표)
export type NoteSummary = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  // 발행일 (YYYY-MM-DD)
  publishedAt: string;
  // 마지막 수정 시각 (ISO 8601, sitemap lastmod)
  updatedAt: string;
  category: Label;
  type: Label;
  tags: Label[];
  // 연재 이름과 순서. 연재에 속하지 않으면 null
  series: { name: string; order: number } | null;
  // 연결 프로젝트(최대 1개)의 Notion 페이지 id
  projectId: string | null;
};
