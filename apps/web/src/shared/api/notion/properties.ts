import type { PageObjectResponse } from '@notionhq/client';

// Notion 페이지 속성을 읽는 함수들 (순수 함수).
// 속성이 없거나, 타입이 예상과 다르거나, 비어 있으면 null(목록은 빈 배열)을 돌려준다.
// 필수 여부 판단은 매퍼가 한다.

export type PageProperties = PageObjectResponse['properties'];
type Property = PageProperties[string];
type PropertyOf<T extends Property['type']> = Extract<Property, { type: T }>;

function getProperty<T extends Property['type']>(
  properties: PageProperties,
  name: string,
  type: T,
): PropertyOf<T> | null {
  const property = properties[name];
  if (!property || property.type !== type) return null;
  return property as PropertyOf<T>;
}

function joinPlainText(items: { plain_text: string }[]): string | null {
  const text = items
    .map((item) => item.plain_text)
    .join('')
    .trim();
  return text === '' ? null : text;
}

export function readTitle(properties: PageProperties, name: string): string | null {
  const property = getProperty(properties, name, 'title');
  return property ? joinPlainText(property.title) : null;
}

export function readRichText(properties: PageProperties, name: string): string | null {
  const property = getProperty(properties, name, 'rich_text');
  return property ? joinPlainText(property.rich_text) : null;
}

export function readSelect(properties: PageProperties, name: string): string | null {
  return getProperty(properties, name, 'select')?.select?.name ?? null;
}

export function readMultiSelect(properties: PageProperties, name: string): string[] {
  return getProperty(properties, name, 'multi_select')?.multi_select.map(({ name }) => name) ?? [];
}

// 날짜 속성의 시작일 (YYYY-MM-DD 또는 시각 포함 ISO 문자열)
export function readDate(properties: PageProperties, name: string): string | null {
  return getProperty(properties, name, 'date')?.date?.start ?? null;
}

export function readRelationIds(properties: PageProperties, name: string): string[] {
  return getProperty(properties, name, 'relation')?.relation.map(({ id }) => id) ?? [];
}

export function readUrl(properties: PageProperties, name: string): string | null {
  return getProperty(properties, name, 'url')?.url ?? null;
}

export function readNumber(properties: PageProperties, name: string): number | null {
  return getProperty(properties, name, 'number')?.number ?? null;
}
