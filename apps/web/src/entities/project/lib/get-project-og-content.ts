import type { ProjectSummary } from '@/shared/api/notion';
import type { OgImageContent } from '@/shared/ui/og-image';

// 이미지 아래 줄에 넣을 기술 스택 수 (Figma OG-03 / Project)
const OG_STACK_LIMIT = 3;

// 프로젝트 링크 미리보기 이미지에 넣을 글 (Figma OG-03 / Project).
// 아래 줄은 스택 앞 3개를 " · "로 잇고, 스택이 없으면 비운다.
export function getProjectOgContent(project: ProjectSummary): OgImageContent {
  const stack = project.stack
    .slice(0, OG_STACK_LIMIT)
    .map((item) => item.name)
    .join(' · ');

  return {
    eyebrow: `Project · ${project.progress.name}`,
    title: project.title,
    ...(project.summary ? { summary: project.summary } : {}),
    ...(stack ? { meta: stack } : {}),
  };
}
