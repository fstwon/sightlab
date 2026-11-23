import type { PageObjectResponse } from '@notionhq/client';

import { type MapResult, toLabel } from './mapping';
import {
  readDate,
  readFiles,
  readMultiSelect,
  readRelationIds,
  readRichText,
  readSelect,
  readTitle,
} from './properties';
import type { ProjectSummary } from './types';

// Notion Projects 페이지 → ProjectSummary (D5 Projects 속성표 기준)
export function mapProjectPage(page: PageObjectResponse): MapResult<ProjectSummary> {
  const { properties } = page;
  const title = readTitle(properties, 'Title');
  const slug = readRichText(properties, 'Slug');
  const summary = readRichText(properties, 'Summary');
  const publishedAt = readDate(properties, 'PublishedAt');
  const role = readRichText(properties, 'Role');
  const stack = readMultiSelect(properties, 'Stack');
  const progress = readSelect(properties, 'Progress');

  const missing = Object.entries({
    Title: title,
    Slug: slug,
    Summary: summary,
    PublishedAt: publishedAt,
    Role: role,
    Progress: progress,
  })
    .filter(([, value]) => value === null)
    .map(([name]) => name);
  // 기술 스택은 하나 이상 필요
  if (stack.length === 0) missing.push('Stack');

  if (
    missing.length > 0 ||
    title === null ||
    slug === null ||
    summary === null ||
    publishedAt === null ||
    role === null ||
    progress === null
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
      publishedAt: publishedAt.slice(0, 10),
      updatedAt: page.last_edited_time,
      role,
      stack: stack.map(toLabel),
      progress: toLabel(progress),
      preview: readFiles(properties, 'Preview')[0] ?? null,
      noteIds: readRelationIds(properties, 'Notes'),
    },
  };
}
