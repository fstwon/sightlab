// 브라우저에서도 쓸 수 있는 공개 API (UI·타입). 데이터 조회 함수는 ./server에서 가져온다.
// 'use cache' 함수가 클라이언트 컴포넌트의 import 경로에 섞이면 빌드가 실패하기 때문에 나눈다.
export { getReadingTime } from './lib/get-reading-time';
export { getToc, type TocItem } from './lib/get-toc';
export { groupNotesByProject } from './lib/group-notes-by-project';
export { selectRelatedNotes } from './lib/select-related-notes';
export { FeaturedNoteCard } from './ui/featured-note-card';
export { NoteCard } from './ui/note-card';
export type { NoteDetail, NoteSummary, Reference } from '@/shared/api/notion';
