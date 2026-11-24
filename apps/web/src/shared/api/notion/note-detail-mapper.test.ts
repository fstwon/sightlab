import type { PageObjectResponse } from '@notionhq/client';
import { describe, expect, it } from 'vitest';

import missingCategoryFixture from './__fixtures__/note-page-missing-category.json';
import publishedFixture from './__fixtures__/note-page-published.json';
import { mapNoteDetailPage } from './note-detail-mapper';
import { readLinks } from './properties';

const publishedPage = publishedFixture as unknown as PageObjectResponse;

// 실제 노트에 References가 아직 없어, SDK 타입(RichTextItemResponse) 모양대로 만든 값.
// 링크 하나가 굵게 표시 때문에 두 조각으로 나뉜 경우와, 링크 없는 설명 글자를 함께 넣었다.
const text = (content: string, url: string | null = null, bold = false) => ({
  type: 'text',
  text: { content, link: url ? { url } : null },
  annotations: {
    bold,
    italic: false,
    strikethrough: false,
    underline: false,
    code: false,
    color: 'default',
  },
  plain_text: content,
  href: url,
});
const referencesProperty = {
  id: 'refs',
  type: 'rich_text',
  rich_text: [
    text('Intersection ', 'https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API'),
    text(
      'Observer API',
      'https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API',
      true,
    ),
    text('\n'),
    text('Sharing State Between Components', 'https://react.dev/learn/sharing-state'),
    text(' (설명 글자)\n'),
    text('잘못된 주소', 'not a url'),
  ],
};

function withProperties(page: PageObjectResponse, extra: Record<string, unknown>) {
  return { ...page, properties: { ...page.properties, ...extra } } as PageObjectResponse;
}

describe('readLinks', () => {
  it('링크 조각만 모으고, 같은 주소가 연달아 오면 한 링크로 잇는다', () => {
    const page = withProperties(publishedPage, { References: referencesProperty });
    expect(readLinks(page.properties, 'References')).toEqual([
      {
        text: 'Intersection Observer API',
        url: 'https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API',
      },
      { text: 'Sharing State Between Components', url: 'https://react.dev/learn/sharing-state' },
      { text: '잘못된 주소', url: 'not a url' },
    ]);
  });

  it('비어 있으면 빈 배열이다', () => {
    expect(readLinks(publishedPage.properties, 'References')).toEqual([]);
  });
});

describe('mapNoteDetailPage', () => {
  it('목록 값에 본문·참고 자료·실험 앱 링크를 더한다 (출처는 www. 뺀 도메인)', () => {
    const page = withProperties(publishedPage, {
      References: referencesProperty,
      DemoUrl: { id: 'demo', type: 'url', url: 'https://sightlab-red.vercel.app/' },
    });
    const result = mapNoteDetailPage(page, '## 본문');
    if (!result.ok) throw new Error('매핑 실패');

    expect(result.value.slug).toBe('repository-pattern-over-hexagonal');
    expect(result.value.markdown).toBe('## 본문');
    expect(result.value.references).toEqual([
      {
        title: 'Intersection Observer API',
        url: 'https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API',
        source: 'developer.mozilla.org',
      },
      {
        title: 'Sharing State Between Components',
        url: 'https://react.dev/learn/sharing-state',
        source: 'react.dev',
      },
      { title: '잘못된 주소', url: 'not a url', source: '' },
    ]);
    expect(result.value.demoUrl).toBe('https://sightlab-red.vercel.app/');
    expect(result.value.sourceUrl).toBeNull();
  });

  it('필수 속성이 빠지면 목록 매퍼와 같이 빠진 속성을 돌려준다', () => {
    const page = missingCategoryFixture as unknown as PageObjectResponse;
    expect(mapNoteDetailPage(page, '')).toEqual({ ok: false, missing: ['Category'] });
  });
});
