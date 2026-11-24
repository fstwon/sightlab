// 서버 전용 공개 API (데이터 조회, 캐시 층, 빌드 때 변환하는 본문). 서버 컴포넌트에서만 import한다.
// NoteBody는 shiki·react-markdown을 쓰므로 브라우저용 입구(index)에 두지 않는다.
export { getNoteDetail, getNoteSlugs } from './api/get-note-detail';
export { getNotes } from './api/get-notes';
export { NoteBody } from './ui/note-body';
