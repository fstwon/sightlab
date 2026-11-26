import { createHash } from 'node:crypto';

// Blob 안의 폴더. 노트 본문 이미지와 프로젝트 미리보기 이미지를 나눠 둔다.
export type AssetFolder = 'notes' | 'projects';

// 이름에 붙여 둘 확장자 (Blob이 확장자로 Content-Type을 정할 때도 쓴다)
const IMAGE_EXTENSIONS = new Set(['avif', 'gif', 'jpeg', 'jpg', 'png', 'svg', 'webp']);

// 해시 앞 16자(64비트)만 써도 블로그 이미지 수에서는 겹칠 일이 없다.
const HASH_LENGTH = 16;

// 원본 주소로 Blob 안의 이름을 만든다. 예: notes/3f2a9c0d1b4e5f67.png
// Notion 파일 주소는 조회할 때마다 물음표 뒤 서명만 바뀌고 앞 경로(파일 ID)는 그대로라
// 물음표 앞까지만 써서 같은 이미지는 항상 같은 이름이 되게 한다 (다시 올리지 않기 위해).
// Notion에서 이미지를 바꾸면 파일 ID가 바뀌어 새 이름이 된다. 주소가 잘못됐으면 null.
export function toAssetPathname(folder: AssetFolder, sourceUrl: string): string | null {
  let url: URL;
  try {
    url = new URL(sourceUrl);
  } catch {
    return null;
  }

  const hash = createHash('sha256')
    .update(url.origin + url.pathname)
    .digest('hex')
    .slice(0, HASH_LENGTH);

  const fileName = url.pathname.slice(url.pathname.lastIndexOf('/') + 1);
  const dotIndex = fileName.lastIndexOf('.');
  const extension = dotIndex === -1 ? '' : fileName.slice(dotIndex + 1).toLowerCase();

  return IMAGE_EXTENSIONS.has(extension) ? `${folder}/${hash}.${extension}` : `${folder}/${hash}`;
}
