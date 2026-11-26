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

// Vercel Blob 읽기·쓰기 토큰. Blob 스토어를 프로젝트에 연결할 때 Vercel이 넣어 준다.
// 없으면(로컬에 아직 받지 않은 경우) 이미지를 복사하지 않고 Notion 주소를 그대로 쓴다 (asset-storage).
export function getBlobToken(): string | undefined {
  return process.env.BLOB_READ_WRITE_TOKEN || undefined;
}

// 로컬 개발·빌드에서 쓰는 사이트 주소 (Vercel 밖에서는 아래 변수가 없다)
const LOCAL_SITE_URL = 'http://localhost:3000';

// 사이트의 대표 주소. canonical·Open Graph·sitemap의 전체 주소를 만들 때 쓴다.
// VERCEL_PROJECT_PRODUCTION_URL은 Vercel이 빌드 때 자동으로 넣는 프로덕션 도메인(https:// 없이 이름만)이라
// 직접 등록할 필요가 없다. PR 미리보기 배포에도 프로덕션 도메인이 들어가서 대표 주소가 미리보기 주소로 바뀌지 않는다.
export function getSiteUrl(): string {
  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return productionHost ? `https://${productionHost}` : LOCAL_SITE_URL;
}
