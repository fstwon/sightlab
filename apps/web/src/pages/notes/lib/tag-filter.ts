import type { Label } from '@/shared/api/notion';

type Tagged = { tags: readonly Label[] };

export type TagOption = Label & {
  // 이 태그를 가진 노트 수
  count: number;
};

// 필터 패널에 보일 태그 목록: 전체 노트의 태그와 노트 수. 노트가 많은 순, 같으면 이름순.
export function getTagOptions(notes: readonly Tagged[]): TagOption[] {
  const options = new Map<string, TagOption>();
  for (const note of notes) {
    for (const tag of note.tags) {
      const option = options.get(tag.slug);
      if (option) option.count += 1;
      else options.set(tag.slug, { ...tag, count: 1 });
    }
  }
  return [...options.values()].sort(
    (a, b) => b.count - a.count || a.name.localeCompare(b.name, 'ko'),
  );
}

// URL의 태그 slug 중 실제로 있는 것만 남긴다 (오타·지워진 태그는 무시). 순서는 URL 그대로.
export function selectExistingTags(
  slugs: readonly string[],
  options: readonly TagOption[],
): string[] {
  const known = new Set(options.map((option) => option.slug));
  return slugs.filter((slug) => known.has(slug));
}

// 선택한 태그를 모두 가진 노트만 남긴다 (AND). 선택이 없으면 전체.
export function filterByTags<T extends Tagged>(notes: readonly T[], slugs: readonly string[]): T[] {
  if (slugs.length === 0) return [...notes];
  return notes.filter((note) => {
    const noteSlugs = new Set(note.tags.map((tag) => tag.slug));
    return slugs.every((slug) => noteSlugs.has(slug));
  });
}

// 태그 하나를 켜거나 끈 새 목록
export function toggleTag(slugs: readonly string[], slug: string): string[] {
  return slugs.includes(slug) ? slugs.filter((item) => item !== slug) : [...slugs, slug];
}
