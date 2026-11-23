import 'server-only';

// 서버 전용 환경 변수. process.env는 이 파일에서만 읽는다 (D10).
// NEXT_PUBLIC_ 접두사를 쓰지 않아 브라우저 번들에 들어가지 않는다 (N4).
// 빌드에 전달하려면 turbo.json의 build.env에도 선언해야 한다 (Turborepo strict env 모드).

export type ServerEnv = {
  notionToken: string;
  notionNotesDataSourceId: string;
  notionProjectsDataSourceId: string;
};

function readRequired(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `환경 변수 ${name}가 없습니다. 로컬은 apps/web/.env.local, 배포는 Vercel 환경 변수를 확인하세요.`,
    );
  }
  return value;
}

// import만으로는 검사하지 않고, 실제로 Notion을 부를 때 읽는다 (Notion을 쓰지 않는 빌드·테스트가 깨지지 않게).
export function getServerEnv(): ServerEnv {
  return {
    notionToken: readRequired('NOTION_TOKEN'),
    notionNotesDataSourceId: readRequired('NOTION_NOTES_DATA_SOURCE_ID'),
    notionProjectsDataSourceId: readRequired('NOTION_PROJECTS_DATA_SOURCE_ID'),
  };
}
