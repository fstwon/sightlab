import rehypeShiki from '@shikijs/rehype';
import { cacheLife } from 'next/cache';
import { type Components, MarkdownAsync } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import type { ShikiTransformer } from 'shiki';

import { rehypeTableWhitespace } from '../lib/rehype-table-whitespace';
import { NoteCallout } from './note-callout';
import { NoteCodeBlock } from './note-code-block';

// 줄 번호(공용 Code Block의 CSS 카운터)를 위해 줄마다 클래스를 붙이고, 머리줄에 보일 언어 이름을 남긴다
const codeBlockTransformer: ShikiTransformer = {
  line(node) {
    this.addClassToHast(node, 'sl-code-block__line');
  },
  pre(node) {
    node.properties['dataLanguage'] = this.options.lang;
  },
};

// Notion 전용 태그 <callout>은 HTML 표준 요소가 아니라 Components 타입에 없어 넓혀서 지정한다.
// Notion의 <image source> 태그는 HTML 해석 규칙상 <img>로 바뀌므로 img를 비운다 (마크다운 이미지도 같음).
const NOTE_COMPONENTS = {
  callout: NoteCallout,
  img: () => null,
  pre: NoteCodeBlock,
} as Components;

type NoteBodyProps = {
  // Notion 마크다운 API(v2)로 받은 본문
  markdown: string;
};

// 노트 본문 (F4·F8). 서버 컴포넌트라 변환은 빌드 때 한 번 일어나고, 브라우저에는 결과 HTML만 간다.
// ① remark-gfm: 표·체크리스트 문법
// ② rehype-raw: Notion이 섞어 보내는 HTML(<b>, <table>, <callout>)을 해석 (+ 표 안 줄바꿈 공백 제거)
// ③ rehype-slug: 제목 id (목차 링크)
// ④ shiki: 코드 블록 색 (줄마다 sl-code-block__line)
// 콜아웃·코드 블록은 공용 UI 모양으로 바꿔 그리고, 이미지는 asset-storage 전까지 그리지 않는다
// (Notion 이미지 주소는 1시간 뒤 만료).
export async function NoteBody({ markdown }: NoteBodyProps) {
  // 변환 결과를 캐시해 빌드 때 한 번만 만든다. 변환 라이브러리가 현재 시각을 읽어서,
  // 캐시 없이 정적 페이지에서 실행하면 Cache Components가 막는다. 같은 본문이면 같은 결과다.
  'use cache';
  cacheLife('max');

  const body = await MarkdownAsync({
    children: markdown,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeRaw,
      rehypeTableWhitespace,
      rehypeSlug,
      [
        rehypeShiki,
        {
          theme: 'github-dark-default',
          defaultLanguage: 'text',
          fallbackLanguage: 'text',
          transformers: [codeBlockTransformer],
        },
      ],
    ],
    components: NOTE_COMPONENTS,
  });

  return <div className="sl-prose">{body}</div>;
}
