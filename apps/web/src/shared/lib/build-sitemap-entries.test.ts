import { describe, expect, it } from 'vitest';

import { buildSitemapEntries } from './build-sitemap-entries';

const SITE_URL = 'https://sightlab.example';

describe('buildSitemapEntries', () => {
  it('고정 페이지 3개 뒤에 노트·프로젝트 상세 주소를 수정 시각과 함께 넣는다', () => {
    const entries = buildSitemapEntries({
      siteUrl: SITE_URL,
      notes: [
        { slug: 'note-a', updatedAt: '2026-11-20T00:00:00.000Z' },
        { slug: 'note-b', updatedAt: '2026-11-24T00:00:00.000Z' },
      ],
      projects: [{ slug: 'project-a', updatedAt: '2026-11-22T00:00:00.000Z' }],
    });

    expect(entries).toEqual([
      { url: SITE_URL, lastModified: '2026-11-24T00:00:00.000Z' },
      { url: `${SITE_URL}/notes`, lastModified: '2026-11-24T00:00:00.000Z' },
      { url: `${SITE_URL}/projects`, lastModified: '2026-11-22T00:00:00.000Z' },
      { url: `${SITE_URL}/notes/note-a`, lastModified: '2026-11-20T00:00:00.000Z' },
      { url: `${SITE_URL}/notes/note-b`, lastModified: '2026-11-24T00:00:00.000Z' },
      { url: `${SITE_URL}/projects/project-a`, lastModified: '2026-11-22T00:00:00.000Z' },
    ]);
  });

  it('콘텐츠가 없으면 고정 페이지만 넣고 수정 시각은 생략한다', () => {
    const entries = buildSitemapEntries({ siteUrl: SITE_URL, notes: [], projects: [] });

    expect(entries).toEqual([
      { url: SITE_URL },
      { url: `${SITE_URL}/notes` },
      { url: `${SITE_URL}/projects` },
    ]);
  });
});
