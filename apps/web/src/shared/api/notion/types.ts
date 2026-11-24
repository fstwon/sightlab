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

// 프로젝트 목록·카드에 필요한 값 (D5 Projects 속성표)
export type ProjectSummary = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  // 발행일 (YYYY-MM-DD)
  publishedAt: string;
  // 마지막 수정 시각 (ISO 8601, sitemap lastmod)
  updatedAt: string;
  role: string;
  stack: Label[];
  // 진행 상태 (In progress, Completed, On hold). 시안의 Status
  progress: Label;
  // 미리보기 이미지(첫 파일). Notion 주소는 1시간 뒤 만료되므로 화면 연결 전에 복사 방식을 정한다
  preview: { name: string; url: string } | null;
  // 연결 노트의 Notion 페이지 id
  noteIds: string[];
};

// 참고 자료 한 줄 (D5 References: 링크 글자 = 제목, 주소의 도메인 = 출처)
export type Reference = {
  title: string;
  url: string;
  // 예: developer.mozilla.org (www. 제외)
  source: string;
};

// 노트 상세에 필요한 값 = 목록 값 + 본문·참고 자료·실험 앱 링크 (F4)
export type NoteDetail = NoteSummary & {
  // Notion 마크다운 API(v2)로 받은 본문
  markdown: string;
  references: Reference[];
  // 실험 앱 데모·소스 주소 (없으면 null)
  demoUrl: string | null;
  sourceUrl: string | null;
};
