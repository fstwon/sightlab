import rehypeShiki from '@shikijs/rehype';
import { cacheLife } from 'next/cache';
import type { ComponentProps } from 'react';
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

// 본문 이미지: getNoteDetail에서 Blob 주소의 <figure><img>로 바꿔 둔 것 (replace-note-images).
// 화면 아래쪽 이미지는 스크롤해 다가올 때 불러온다. 원본 크기를 모르므로 next/image 대신 <img>를 쓴다.
function NoteImage({ src, alt }: ComponentProps<'img'>) {
  // eslint-disable-next-line @next/next/no-img-element -- 크기를 모르는 본문 이미지라 next/image를 쓸 수 없다
  return <img src={src} alt={alt ?? ''} loading="lazy" decoding="async" />;
}

// Notion 전용 태그 <callout>은 HTML 표준 요소가 아니라 Components 타입에 없어 넓혀서 지정한다.
const NOTE_COMPONENTS = {
  callout: NoteCallout,
  img: NoteImage,
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
// 콜아웃·코드 블록은 공용 UI 모양으로 바꿔 그리고, 이미지는 Prose의 figure 스타일을 쓴다.
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
