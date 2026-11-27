import type { Metadata } from 'next';

import { getProject, getProjectSlugs } from '@/entities/project/server';
import { ProjectDetailPage } from '@/pages/project-detail';
import { OPEN_GRAPH_BASE } from '@/shared/config/site';
import { OG_IMAGE_SIZE } from '@/shared/ui/og-image';

// 공개 프로젝트가 하나도 없을 때 대신 넣는 주소. 목록에 없는 slug라 404 페이지로 만들어진다.
const EMPTY_FALLBACK_SLUG = 'no-published-projects';

// 빌드 때 미리 만들 프로젝트 주소 목록. 모든 공개 프로젝트를 정적 HTML로 만든다.
// Cache Components에서는 빈 배열을 돌려주면 빌드가 실패해서, 공개 프로젝트가 없으면 404가 되는 주소 하나를 넣는다
// (노트 상세와 같은 방식).
export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  if (slugs.length === 0) return [{ slug: EMPTY_FALLBACK_SLUG }];
  return slugs.map((slug) => ({ slug }));
}

// 탭 제목("프로젝트 이름 | Sightlab")·설명(Summary)·대표 주소·링크 미리보기. 페이지와 같은 캐시 결과를 쓴다.
export async function generateMetadata({
  params,
}: PageProps<'/projects/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: 'Project를 찾을 수 없습니다' };
  const url = `/projects/${project.slug}`;
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: {
      ...OPEN_GRAPH_BASE,
      type: 'website',
      url,
      // 페이지의 openGraph가 같은 폴더의 opengraph-image보다 우선하므로 프로젝트 이미지를 직접 알려 준다
      images: [{ url: `${url}/opengraph-image`, ...OG_IMAGE_SIZE, alt: project.title }],
    },
  };
}

// 라우팅만 담당한다. 주소의 slug를 꺼내 FSD pages 계층의 화면에 넘긴다.
export default async function Page({ params }: PageProps<'/projects/[slug]'>) {
  const { slug } = await params;
  return <ProjectDetailPage slug={slug} />;
}
