type Searchable = { title: string; summary: string };

// 비교용 글자: 유니코드 정규화(전각·호환 문자 통일) + 소문자
const normalize = (text: string) => text.normalize('NFKC').toLowerCase();

// 제목·요약 검색 (F3). 검색어를 공백으로 나눈 낱말이 모두 들어간 노트만 남긴다 (순서 무관).
// 대소문자와 앞뒤 공백은 무시하고, 빈 검색어면 전체를 돌려준다.
export function searchNotes<T extends Searchable>(notes: readonly T[], query: string): T[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [...notes];

  return notes.filter((note) => {
    const text = normalize(`${note.title} ${note.summary}`);
    return terms.every((term) => text.includes(term));
  });
}
