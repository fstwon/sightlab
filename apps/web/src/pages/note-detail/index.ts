// 서버 화면 입구 (노트 상세·404). 오류 화면은 클라이언트 파일이 쓰므로 ./client에서 가져온다.
// 로딩 화면(loading.tsx)은 두지 않는다: 노트는 빌드 때 미리 만들어져 거의 보이지 않고,
// 있으면 응답을 먼저 보내기 시작해 없는 노트도 상태 코드가 404가 아닌 200이 되기 때문이다.
export { NoteDetailPage } from './ui/note-detail-page';
export { NoteNotFound } from './ui/note-not-found';
