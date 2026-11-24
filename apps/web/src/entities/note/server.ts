// 서버 전용 공개 API (데이터 조회, 캐시 층). 서버 컴포넌트에서만 import한다.
export { getNoteDetail, getNoteSlugs } from './api/get-note-detail';
export { getNotes } from './api/get-notes';
