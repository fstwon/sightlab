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

// 파일 속성의 파일 목록. Notion에 올린 파일(file)은 주소가 1시간 뒤 만료된다.
export function readFiles(
  properties: PageProperties,
  name: string,
): { name: string; url: string }[] {
  return (
    getProperty(properties, name, 'files')?.files.map((file) => ({
      name: file.name,
      url: file.type === 'file' ? file.file.url : file.external.url,
    })) ?? []
  );
}

// rich_text 속성 안의 링크 목록 (글자 = 링크 이름). 링크 없는 글자는 버린다.
// 굵게 등 서식 때문에 한 링크가 여러 조각으로 나뉘면 이어 붙인다 (같은 주소가 연달아 올 때).
export function readLinks(
  properties: PageProperties,
  name: string,
): { text: string; url: string }[] {
  const items = getProperty(properties, name, 'rich_text')?.rich_text ?? [];
  const links: { text: string; url: string }[] = [];
  let previousUrl: string | null = null;
  for (const item of items) {
    const url = item.href;
    const last = links.at(-1);
    if (url && last && url === previousUrl) last.text += item.plain_text;
    else if (url) links.push({ text: item.plain_text, url });
    previousUrl = url;
  }
  return links
    .map((link) => ({ ...link, text: link.text.trim() }))
    .filter((link) => link.text !== '');
}
