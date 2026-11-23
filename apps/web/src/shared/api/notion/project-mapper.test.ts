import type { PageObjectResponse } from '@notionhq/client';
import { describe, expect, it } from 'vitest';

import incompleteFixture from './__fixtures__/project-page-incomplete.json';
import publishedFixture from './__fixtures__/project-page-published.json';
import { mapProjectPage } from './project-mapper';

// fixture: 실제 Notion 응답을 저장한 것 (사용자·워크스페이스·연결 노트 id, 주소는 가짜 값).
// published는 실제 응답에 비어 있던 Role·Summary만 채웠고, incomplete는 그대로 둔 것이다.
const publishedPage = publishedFixture as unknown as PageObjectResponse;
const incompletePage = incompleteFixture as unknown as PageObjectResponse;

function withProperty(page: PageObjectResponse, name: string, value: unknown): PageObjectResponse {
  return { ...page, properties: { ...page.properties, [name]: value } } as PageObjectResponse;
}

describe('mapProjectPage', () => {
  it('필수 속성이 모두 있으면 ProjectSummary로 바꾼다', () => {
    expect(mapProjectPage(publishedPage)).toEqual({
      ok: true,
      value: {
        id: '00000000-0000-4000-8000-00000000b001',
        slug: 'sightlab',
        title: 'AI로 블로그 개발',
        summary: 'AI와 함께 기획부터 배포까지 진행하는 개인 기술 블로그',
        publishedAt: '2026-11-16',
        updatedAt: publishedPage.last_edited_time,
        role: '기획 · 디자인 · 개발',
        stack: [
          { name: 'Monorepo', slug: 'monorepo' },
          { name: 'AI', slug: 'ai' },
        ],
        progress: { name: 'In progress', slug: 'in-progress' },
        preview: { name: 'cover.png', url: 'https://files.example.com/project/cover.png' },
        noteIds: ['00000000-0000-4000-8000-00000000a001'],
      },
    });
  });

  it('필수 속성(Summary·Role)이 비어 있으면 빠진 속성 이름을 돌려준다', () => {
    expect(mapProjectPage(incompletePage)).toEqual({ ok: false, missing: ['Summary', 'Role'] });
  });

  it('기술 스택이 비어 있으면 Stack을 빠진 속성으로 본다', () => {
    const page = withProperty(publishedPage, 'Stack', {
      id: 'stack',
      type: 'multi_select',
      multi_select: [],
    });

    expect(mapProjectPage(page)).toEqual({ ok: false, missing: ['Stack'] });
  });

  it('미리보기와 연결 노트가 없으면 null과 빈 배열이다', () => {
    let page = withProperty(publishedPage, 'Preview', { id: 'preview', type: 'files', files: [] });
    page = withProperty(page, 'Notes', {
      id: 'notes',
      type: 'relation',
      relation: [],
      has_more: false,
    });
    const result = mapProjectPage(page);
    if (!result.ok) throw new Error('매핑 실패');

    expect(result.value.preview).toBeNull();
    expect(result.value.noteIds).toEqual([]);
  });
});
