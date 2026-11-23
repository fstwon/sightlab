import type { PageObjectResponse } from '@notionhq/client';
import { describe, expect, it } from 'vitest';

import missingCategoryFixture from './__fixtures__/note-page-missing-category.json';
import publishedFixture from './__fixtures__/note-page-published.json';
import { mapNotePage } from './note-mapper';

// fixture: 실제 Notion 응답을 저장한 것 (사용자·워크스페이스 id, 주소는 가짜 값, Status만 Published로 변경)
const publishedPage = publishedFixture as unknown as PageObjectResponse;
const missingCategoryPage = missingCategoryFixture as unknown as PageObjectResponse;

function withProperty(page: PageObjectResponse, name: string, value: unknown): PageObjectResponse {
  return { ...page, properties: { ...page.properties, [name]: value } } as PageObjectResponse;
}

describe('mapNotePage', () => {
  it('필수 속성이 모두 있으면 NoteSummary로 바꾼다', () => {
    const result = mapNotePage(publishedPage);

    expect(result).toEqual({
      ok: true,
      value: {
        id: '00000000-0000-4000-8000-00000000a001',
        slug: 'repository-pattern-over-hexagonal',
        title: '헥사고날 대신 리포지토리 패턴: 설명할 수 있는 만큼만 설계하기',
        summary: expect.any(String) as string,
        publishedAt: '2026-11-23',
        updatedAt: publishedPage.last_edited_time,
        category: { name: 'TypeScript', slug: 'typescript' },
        type: { name: 'Architecture', slug: 'architecture' },
        tags: expect.any(Array) as unknown[],
        series: { name: 'AI로 블로그 개발', order: 6 },
        projectId: null,
      },
    });
  });

  it('태그는 이름과 slug로 바꾼다', () => {
    const result = mapNotePage(publishedPage);
    if (!result.ok) throw new Error('매핑 실패');

    expect(result.value.tags.length).toBeGreaterThan(0);
    for (const tag of result.value.tags) {
      expect(tag.slug).toMatch(/^[\p{L}\p{N}-]+$/u);
    }
  });

  it('필수 속성(Category)이 비어 있으면 빠진 속성 이름을 돌려준다', () => {
    expect(mapNotePage(missingCategoryPage)).toEqual({ ok: false, missing: ['Category'] });
  });

  it('연재가 있는데 순서가 없으면 SeriesOrder를 빠진 속성으로 본다', () => {
    const page = withProperty(publishedPage, 'SeriesOrder', {
      id: 'order',
      type: 'number',
      number: null,
    });

    expect(mapNotePage(page)).toEqual({ ok: false, missing: ['SeriesOrder'] });
  });

  it('연재가 없으면 series는 null이다', () => {
    const page = withProperty(publishedPage, 'Series', {
      id: 'series',
      type: 'select',
      select: null,
    });
    const result = mapNotePage(page);
    if (!result.ok) throw new Error('매핑 실패');

    expect(result.value.series).toBeNull();
  });

  it('시각이 포함된 발행일은 날짜만 남긴다', () => {
    const page = withProperty(publishedPage, 'PublishedAt', {
      id: 'date',
      type: 'date',
      date: { start: '2026-11-23T09:00:00.000+09:00', end: null, time_zone: null },
    });
    const result = mapNotePage(page);
    if (!result.ok) throw new Error('매핑 실패');

    expect(result.value.publishedAt).toBe('2026-11-23');
  });
});
