import type { PageObjectResponse } from '@notionhq/client';
import { describe, expect, it } from 'vitest';

import fixture from './__fixtures__/note-page-published.json';
import {
  readDate,
  readMultiSelect,
  readNumber,
  readRelationIds,
  readRichText,
  readSelect,
  readTitle,
  readUrl,
} from './properties';

const { properties } = fixture as unknown as PageObjectResponse;

describe('Notion 속성 읽기', () => {
  it('title·rich_text는 plain_text를 이어 붙인다', () => {
    expect(readTitle(properties, 'Title')).toBe(
      '헥사고날 대신 리포지토리 패턴: 설명할 수 있는 만큼만 설계하기',
    );
    expect(readRichText(properties, 'Slug')).toBe('repository-pattern-over-hexagonal');
  });

  it('select·multi_select는 이름을 돌려준다', () => {
    expect(readSelect(properties, 'Type')).toBe('Architecture');
    expect(readMultiSelect(properties, 'Tags').length).toBeGreaterThan(0);
  });

  it('date는 시작일, number는 숫자를 돌려준다', () => {
    expect(readDate(properties, 'PublishedAt')).toBe('2026-11-23');
    expect(readNumber(properties, 'SeriesOrder')).toBe(6);
  });

  it('비어 있는 값은 null 또는 빈 배열이다', () => {
    expect(readRichText(properties, 'References')).toBeNull();
    expect(readUrl(properties, 'DemoUrl')).toBeNull();
    expect(readRelationIds(properties, 'Project')).toEqual([]);
  });

  it('없는 속성이나 타입이 다른 속성은 null 또는 빈 배열이다', () => {
    expect(readTitle(properties, 'NotExists')).toBeNull();
    expect(readSelect(properties, 'Title')).toBeNull();
    expect(readMultiSelect(properties, 'Title')).toEqual([]);
  });
});
