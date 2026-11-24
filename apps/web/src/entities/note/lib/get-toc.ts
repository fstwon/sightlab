import GithubSlugger from 'github-slugger';

import { linesOutsideCode, toPlainText } from './markdown-text';

export type TocItem = {
  level: 2 | 3;
  text: string;
  // 본문 제목의 id (rehype-slug가 붙이는 값과 같음)
  id: string;
};

// 본문 목차 (F4): ## · ### 제목 목록. 코드 블록 안의 #은 제목이 아니다.
// id는 rehype-slug와 같은 github-slugger로 만들고, 같은 제목이 반복되면 -1, -2를 붙이는 규칙도 같다.
// rehype-slug는 모든 단계(h1~h6)의 제목에 순서대로 id를 매기므로, 여기서도 모든 제목을 같은 순서로 센다.
export function getToc(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];

  for (const line of linesOutsideCode(markdown)) {
    const match = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;
    const level = match[1]?.length ?? 0;
    const text = toPlainText(match[2] ?? '');
    const id = slugger.slug(text);
    if (level === 2 || level === 3) items.push({ level, text, id });
  }
  return items;
}
