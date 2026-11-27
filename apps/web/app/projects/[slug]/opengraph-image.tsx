import { notFound } from 'next/navigation';

import { getProjectOgContent } from '@/entities/project';
import { getProject } from '@/entities/project/server';
import { OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE, renderOgImage } from '@/shared/ui/og-image';

// 프로젝트 링크 미리보기 이미지 (Figma OG-03 / Project). 공개 프로젝트마다 빌드 때 만들고,
// 웹훅으로 'projects' 캐시가 비워지면 다음 요청 때 다시 만든다 (노트 이미지와 같은 방식).
// og:image 태그는 page.tsx의 generateMetadata가 프로젝트 이름을 alt로 넣어 만든다. 아래 alt는 그 기본값.
export const alt = 'Sightlab 프로젝트 미리보기';
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

// 이미지 경로는 page.tsx의 목록을 이어 받지 않아 같은 목록을 따로 알려 준다 (없으면 요청 때마다 그림)
export { generateStaticParams } from './page';

// 페이지와 같은 캐시 결과(getProject)를 쓴다
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return renderOgImage(getProjectOgContent(project));
}
