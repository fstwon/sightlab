// Notes 화면 상태 = URL 쿼리 (F3: 검색·필터 상태는 URL에 반영).
export type NotesQuery = {
  // 검색어 (?q=)
  q: string;
  // 선택한 태그 slug (?tags=react,nextjs). 존재 여부 확인은 목록을 아는 쪽(selectExistingTags)이 한다.
  tags: string[];
  // 페이지 번호 원본 값 (?page=). 범위 정리는 parsePage가 한다.
  page: string | null;
};

// 페이지 번호 링크 등이 유지하는 거르기 조건
export type NotesFilters = Pick<NotesQuery, 'q' | 'tags'>;

type ReadableParams = { get(name: string): string | null } | null | undefined;

// ?tags= 값을 slug 목록으로. 빈 값·중복은 뺀다.
function parseTagList(raw: string | null | undefined): string[] {
  if (!raw) return [];
  const slugs = raw
    .split(',')
    .map((slug) => slug.trim())
    .filter(Boolean);
  return [...new Set(slugs)];
}

// URL 쿼리를 읽는다. 검색어는 앞뒤 공백을 뺀다.
export function readNotesQuery(params: ReadableParams): NotesQuery {
  return {
    q: params?.get('q')?.trim() ?? '',
    tags: parseTagList(params?.get('tags')),
    page: params?.get('page') ?? null,
  };
}

// 화면 상태로 /notes 주소를 만든다. 빈 검색어·빈 태그·1페이지는 주소에서 뺀다 (같은 화면의 주소를 하나로).
// 태그는 읽기 쉽게 쉼표를 그대로 두고 slug만 인코딩한다 (URLSearchParams는 쉼표를 %2C로 바꿈).
export function buildNotesHref({
  q = '',
  tags = [],
  page = 1,
}: {
  q?: string;
  tags?: readonly string[];
  page?: number;
}): string {
  const parts: string[] = [];
  const query = q.trim();
  if (query) parts.push(new URLSearchParams({ q: query }).toString());
  if (tags.length > 0) parts.push(`tags=${tags.map(encodeURIComponent).join(',')}`);
  if (page > 1) parts.push(`page=${page}`);

  return parts.length > 0 ? `/notes?${parts.join('&')}` : '/notes';
}
