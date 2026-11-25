import type { MetadataRoute } from 'next';

// sitemap에 넣을 콘텐츠 한 건. 노트·프로젝트 모두 주소용 slug와 마지막 수정 시각만 쓴다.
export type SitemapContent = {
  slug: string;
  // ISO 8601 (예: 2026-11-25T07:16:00.000Z)
  updatedAt: string;
};

type SitemapInput = {
  siteUrl: string;
  notes: readonly SitemapContent[];
  projects: readonly SitemapContent[];
};

// 가장 최근 수정 시각. 같은 형식의 ISO 문자열은 글자 순서가 곧 시간 순서라 문자열로 비교한다.
// 목록이 비어 있으면 undefined (sitemap에서 lastModified를 생략한다).
function getLatestUpdatedAt(contents: readonly SitemapContent[]): string | undefined {
  return contents.reduce<string | undefined>(
    (latest, content) =>
      latest === undefined || content.updatedAt > latest ? content.updatedAt : latest,
    undefined,
  );
}

// 수정 시각이 없으면 키 자체를 넣지 않는다 (exactOptionalPropertyTypes)
function withLastModified(url: string, lastModified: string | undefined) {
  return lastModified === undefined ? { url } : { url, lastModified };
}

// 검색 로봇에게 알릴 공개 페이지 목록 (N3).
// 목록 페이지의 수정 시각은 그 목록에 들어 있는 콘텐츠 중 가장 최근 수정 시각으로 둔다.
export function buildSitemapEntries({
  siteUrl,
  notes,
  projects,
}: SitemapInput): MetadataRoute.Sitemap {
  const latestNote = getLatestUpdatedAt(notes);
  const latestProject = getLatestUpdatedAt(projects);

  return [
    withLastModified(siteUrl, getLatestUpdatedAt([...notes, ...projects])),
    withLastModified(`${siteUrl}/notes`, latestNote),
    withLastModified(`${siteUrl}/projects`, latestProject),
    ...notes.map((note) => ({
      url: `${siteUrl}/notes/${note.slug}`,
      lastModified: note.updatedAt,
    })),
    ...projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: project.updatedAt,
    })),
  ];
}
