import { readFile } from 'node:fs/promises';

import matter from 'gray-matter';

export interface ParsedMarkdown {
  metadata: unknown;
  body: string;
}

/** Frontmatter를 분리합니다. 메타데이터 검증은 다음 단계에서 수행합니다. */
export async function parseMarkdown(filePath: string): Promise<ParsedMarkdown> {
  const source = await readFile(filePath, 'utf8');

  try {
    const parsed = matter(source);

    return { metadata: parsed.data as unknown, body: parsed.content };
  } catch (error) {
    throw new Error(`Markdown Frontmatter 파싱 실패: ${filePath}`, { cause: error });
  }
}
