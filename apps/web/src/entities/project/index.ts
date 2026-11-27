// 브라우저에서도 쓸 수 있는 공개 API (UI·타입). 데이터 조회 함수는 ./server에서 가져온다.
export { getProjectOgContent } from './lib/get-project-og-content';
export { ProjectCard } from './ui/project-card';
export type { ProjectSummary } from '@/shared/api/notion';
