import type { Metadata } from 'next';

import { getNoteDetail, getNoteSlugs } from '@/entities/note/server';
import { NoteDetailPage } from '@/pages/note-detail';
import { OPEN_GRAPH_BASE } from '@/shared/config/site';

// 공개 노트가 하나도 없을 때 대신 넣는 주소. 목록에 없는 slug라 404 페이지로 만들어진다.
const EMPTY_FALLBACK_SLUG = 'no-published-notes';

// 빌드 때 미리 만들 노트 주소 목록. 모든 공개 노트를 정적 HTML로 만든다.
// Cache Components에서는 빈 배열을 돌려주면 빌드가 실패한다 (미리 만들 페이지를 하나도 검사할 수 없음).
// 그래서 공개 노트가 없으면 404가 되는 주소 하나를 넣어 빌드를 통과시킨다.
export async function generateStaticParams() {
  const slugs = await getNoteSlugs();
  if (slugs.length === 0) return [{ slug: EMPTY_FALLBACK_SLUG }];
  return slugs.map((slug) => ({ slug }));
}

// 탭 제목("글 제목 | Sightlab")·검색 결과 설명·대표 주소·링크 미리보기.
// 페이지와 같은 캐시 결과를 써서 Notion 호출은 늘지 않는다.
export async function generateMetadata({ params }: PageProps<'/notes/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const note = await getNoteDetail(slug);
  if (!note) return { title: 'Note를 찾을 수 없습니다' };
  const url = `/notes/${note.slug}`;
  return {
    title: note.title,
    description: note.summary,
    alternates: { canonical: url },
    // 글은 article 형식으로 두고 발행일·수정일을 함께 알린다
    openGraph: {
      ...OPEN_GRAPH_BASE,
      type: 'article',
      url,
      publishedTime: note.publishedAt,
      modifiedTime: note.updatedAt,
      tags: note.tags.map((tag) => tag.name),
    },
  };
}

// 라우팅만 담당한다. 주소의 slug를 꺼내 FSD pages 계층의 화면에 넘긴다.
export default async function Page({ params }: PageProps<'/notes/[slug]'>) {
  const { slug } = await params;
  return <NoteDetailPage slug={slug} />;
}
