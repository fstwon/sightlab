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
  // 미리보기 이미지(첫 파일). Notion 주소는 1시간 뒤 만료되므로 entities 캐시 층에서 Blob 주소로 바꾼다
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

// 목록 조회 응답에 함께 들어 있는, 상세에서만 쓰는 값 (F4-2).
// 목록 조회 때 같이 꺼내 두어 상세에서 속성을 다시 조회하지 않는다 (Notion API 호출 수 절약).
export type NoteExtras = {
  references: Reference[];
  // 실험 앱 데모·소스 주소 (없으면 null)
  demoUrl: string | null;
  sourceUrl: string | null;
};

// 목록 조회 결과 한 건 = 목록 값 + 상세 전용 값. 브라우저로 보내는 목록에는 summary만 쓴다.
export type NoteEntry = {
  summary: NoteSummary;
  extras: NoteExtras;
};

// 노트 상세에 필요한 값 = 목록 값 + 상세 전용 값 + 본문 (F4)
export type NoteDetail = NoteSummary &
  NoteExtras & {
    // Notion 마크다운 API(v2)로 받은 본문
    markdown: string;
  };
