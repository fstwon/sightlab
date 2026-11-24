// Notes 화면 상태 = URL 쿼리 (F3: 검색·필터 상태는 URL에 반영).
// 태그 필터(tags)는 다음 단계에서 같은 방식으로 붙인다.
export type NotesQuery = {
  // 검색어 (?q=)
  q: string;
  // 페이지 번호 원본 값 (?page=). 범위 정리는 parsePage가 한다.
  page: string | null;
};

type ReadableParams = { get(name: string): string | null } | null | undefined;

// URL 쿼리를 읽는다. 검색어는 앞뒤 공백을 뺀다.
export function readNotesQuery(params: ReadableParams): NotesQuery {
  return {
    q: params?.get('q')?.trim() ?? '',
    page: params?.get('page') ?? null,
  };
}

// 화면 상태로 /notes 주소를 만든다. 빈 검색어와 1페이지는 주소에서 뺀다 (같은 화면의 주소를 하나로).
export function buildNotesHref({ q = '', page = 1 }: { q?: string; page?: number }): string {
  const params = new URLSearchParams();
  const query = q.trim();
  if (query) params.set('q', query);
  if (page > 1) params.set('page', String(page));

  const search = params.toString();
  return search ? `/notes?${search}` : '/notes';
}
