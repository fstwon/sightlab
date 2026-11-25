'use client';

// 노트 상세를 그리다 오류가 나면 page 대신 그려지는 화면 (오류 경계). 라우팅만 담당한다.
// 오류 경계는 클라이언트 컴포넌트여야 해서 브라우저용 입구(client)에서 가져온다.
export { NoteError as default } from '@/pages/note-detail/client';
