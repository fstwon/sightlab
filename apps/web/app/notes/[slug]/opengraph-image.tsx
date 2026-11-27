import { notFound } from 'next/navigation';

import { getNoteOgContent } from '@/entities/note';
import { getNotes } from '@/entities/note/server';
import { OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE, renderOgImage } from '@/shared/ui/og-image';

// 노트 링크 미리보기 이미지 (Figma OG-02 / Note). page.tsx의 generateStaticParams로
// 공개 노트마다 빌드 때 만들고, 웹훅으로 'notes' 캐시가 비워지면 다음 요청 때 다시 만든다.
// og:image 태그는 page.tsx의 generateMetadata가 노트 제목을 alt로 넣어 만든다. 아래 alt는 그 기본값.
export const alt = 'Sightlab 노트 미리보기';
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

// 이미지 경로는 page.tsx의 목록을 이어 받지 않아 같은 목록을 따로 알려 준다 (없으면 요청 때마다 그림)
export { generateStaticParams } from './page';

// 본문이 필요 없으므로 상세(getNoteDetail) 대신 캐시된 목록에서 찾는다
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = (await getNotes()).find((item) => item.slug === slug);
  if (!note) notFound();

  return renderOgImage(getNoteOgContent(note));
}
