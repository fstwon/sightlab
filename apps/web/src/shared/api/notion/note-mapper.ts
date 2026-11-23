import type { PageObjectResponse } from '@notionhq/client';

import { slugify } from '@/shared/lib/slugify';

import {
  readDate,
  readMultiSelect,
  readNumber,
  readRelationIds,
  readRichText,
  readSelect,
  readTitle,
} from './properties';
import type { Label, NoteSummary } from './types';

// 매핑 결과. 필수 속성이 빠지면 어떤 속성이 빠졌는지 돌려준다 (호출한 쪽이 경고 후 제외).
export type MapResult<T> = { ok: true; value: T } | { ok: false; missing: string[] };

const toLabel = (name: string): Label => ({ name, slug: slugify(name) });

// Notion Notes 페이지 → NoteSummary (D5 Notes 속성표 기준)
export function mapNotePage(page: PageObjectResponse): MapResult<NoteSummary> {
  const { properties } = page;
  const title = readTitle(properties, 'Title');
  const slug = readRichText(properties, 'Slug');
  const summary = readRichText(properties, 'Summary');
  const publishedAt = readDate(properties, 'PublishedAt');
  const category = readSelect(properties, 'Category');
  const type = readSelect(properties, 'Type');
  const seriesName = readSelect(properties, 'Series');
  const seriesOrder = readNumber(properties, 'SeriesOrder');

  const required = {
    Title: title,
    Slug: slug,
    Summary: summary,
    PublishedAt: publishedAt,
    Category: category,
    Type: type,
  };
  const missing = Object.entries(required)
    .filter(([, value]) => value === null)
    .map(([name]) => name);
  // 연재가 있으면 순서도 필수
  if (seriesName !== null && seriesOrder === null) missing.push('SeriesOrder');

  if (
    missing.length > 0 ||
    title === null ||
    slug === null ||
    summary === null ||
    publishedAt === null ||
    category === null ||
    type === null
  ) {
    return { ok: false, missing };
  }

  return {
    ok: true,
    value: {
      id: page.id,
      slug,
      title,
      summary,
      // 시각이 포함된 날짜여도 발행일은 날짜만 쓴다
      publishedAt: publishedAt.slice(0, 10),
      updatedAt: page.last_edited_time,
      category: toLabel(category),
      type: toLabel(type),
      tags: readMultiSelect(properties, 'Tags').map(toLabel),
      series:
        seriesName !== null && seriesOrder !== null
          ? { name: seriesName, order: seriesOrder }
          : null,
      projectId: readRelationIds(properties, 'Project')[0] ?? null,
    },
  };
}
