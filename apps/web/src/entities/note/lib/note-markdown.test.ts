import { readFileSync } from 'node:fs';

import type { Element, Root } from 'hast';
import { describe, expect, it } from 'vitest';

import { getCalloutType } from './get-callout-type';
import { getReadingTime } from './get-reading-time';
import { getToc } from './get-toc';
import { rehypeTableWhitespace } from './rehype-table-whitespace';

// 실제 Notion 예시 노트("Markdown render test")의 마크다운 (이미지 주소만 가짜 값)
const example = readFileSync(
  new URL('./__fixtures__/note-markdown-example.md', import.meta.url),
  'utf8',
);

describe('getCalloutType', () => {
  it('Notion 배경색으로 종류를 고른다', () => {
    expect(getCalloutType('blue_bg')).toBe('info');
    expect(getCalloutType('green_bg')).toBe('tip');
    expect(getCalloutType('yellow_bg')).toBe('warning');
    expect(getCalloutType('orange_bg')).toBe('warning');
    expect(getCalloutType('red_bg')).toBe('error');
    expect(getCalloutType('pink_background')).toBe('error');
  });

  it('모르는 색·색 없음은 info', () => {
    expect(getCalloutType('gray_bg')).toBe('info');
    expect(getCalloutType(undefined)).toBe('info');
  });
});

describe('getToc', () => {
  it('## · ### 제목만 목차로 모으고 id는 github-slugger 규칙', () => {
    expect(getToc(example)).toEqual([
      { level: 2, text: '제목2', id: '제목2' },
      { level: 3, text: '제목3', id: '제목3' },
    ]);
  });

  it('코드 블록 안의 #은 제목이 아니다', () => {
    expect(getToc('## 실제 제목\n```md\n## 코드 안\n```\n### 하위')).toEqual([
      { level: 2, text: '실제 제목', id: '실제-제목' },
      { level: 3, text: '하위', id: '하위' },
    ]);
  });

  it('같은 제목이 반복되면 -1을 붙이고, 강조·링크 기호는 뺀다', () => {
    expect(getToc('## 정리\n## **정리**\n## [링크 제목](https://a.com)')).toEqual([
      { level: 2, text: '정리', id: '정리' },
      { level: 2, text: '정리', id: '정리-1' },
      { level: 2, text: '링크 제목', id: '링크-제목' },
    ]);
  });

  it('id는 모든 단계의 제목을 순서대로 세어 rehype-slug와 같게 만든다', () => {
    // h1 "요약"이 먼저 나오면 rehype-slug는 h2 "요약"에 요약-1을 붙인다
    expect(getToc('# 요약\n## 요약')).toEqual([{ level: 2, text: '요약', id: '요약-1' }]);
  });
});

describe('getReadingTime', () => {
  it('공백을 뺀 글자 500자당 1분, 올림', () => {
    expect(getReadingTime('가'.repeat(500))).toBe(1);
    expect(getReadingTime('가'.repeat(501))).toBe(2);
    expect(getReadingTime(`${'가 '.repeat(500)}`)).toBe(1);
  });

  it('코드 블록·HTML 태그·마크다운 기호는 세지 않는다', () => {
    const code = '```ts\n' + 'x'.repeat(2000) + '\n```';
    expect(getReadingTime(`${code}\n${'가'.repeat(400)}`)).toBe(1);
    expect(getReadingTime(`<b>${'가'.repeat(500)}</b>`)).toBe(1);
    expect(getReadingTime(`## ${'가'.repeat(500)}`)).toBe(1);
  });

  it('최소 1분', () => {
    expect(getReadingTime('')).toBe(1);
    expect(getReadingTime(example)).toBe(1);
  });
});

describe('rehypeTableWhitespace', () => {
  it('표 요소 바로 아래의 공백 글자만 지우고 셀 안 글자는 둔다', () => {
    const text = (value: string) => ({ type: 'text' as const, value });
    const element = (tagName: string, children: (Element | ReturnType<typeof text>)[]) => ({
      type: 'element' as const,
      tagName,
      properties: {},
      children,
    });
    const tree: Root = {
      type: 'root',
      children: [
        element('table', [
          text('\n'),
          element('colgroup', [text('\n'), element('col', []), text('\n')]),
          element('tr', [text('\n'), element('td', [text(' 셀 ')]), text('\n')]),
        ]),
      ],
    };

    rehypeTableWhitespace()(tree);

    const table = tree.children[0] as Element;
    expect(table.children.map((child) => (child as Element).tagName)).toEqual(['colgroup', 'tr']);
    const row = table.children[1] as Element;
    expect(row.children).toHaveLength(1);
    expect((row.children[0] as Element).children).toEqual([text(' 셀 ')]);
  });
});
