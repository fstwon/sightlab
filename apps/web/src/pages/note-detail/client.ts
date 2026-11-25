// 브라우저용 입구: 클라이언트 파일(app/notes/[slug]/error.tsx)이 가져오는 화면만 둔다.
// index(서버 화면)에서 가져오면 서버 전용 코드('use cache', shiki)까지 브라우저용으로 묶이기 때문에 나눈다.
export { NoteError } from './ui/note-error';
