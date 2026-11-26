import 'server-only';

import { list, put } from '@vercel/blob';

import { getBlobToken } from '@/shared/config/env';

import { type AssetFolder, toAssetPathname } from './asset-pathname';

// 빌드(프로세스) 하나 동안 재사용하는 값.
// 폴더별 "이미 올린 이름 → 주소" 목록: list는 고급 작업 한도(월 2,000)에 들어가 폴더마다 한 번만 부른다.
const storedByFolder = new Map<AssetFolder, Promise<Map<string, string>>>();
// 이름별 복사 결과: 같은 이미지가 여러 페이지에서 동시에 쓰여도 한 번만 올린다.
const copies = new Map<string, Promise<string | null>>();
let warnedNoToken = false;

async function listStored(folder: AssetFolder, token: string): Promise<Map<string, string>> {
  const stored = new Map<string, string>();
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: `${folder}/`, token, ...(cursor ? { cursor } : {}) });
    for (const blob of page.blobs) stored.set(blob.pathname, blob.url);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return stored;
}

function getStored(folder: AssetFolder, token: string): Promise<Map<string, string>> {
  let stored = storedByFolder.get(folder);
  if (!stored) {
    stored = listStored(folder, token);
    storedByFolder.set(folder, stored);
    // 목록을 못 불렀으면 다음 이미지에서 다시 시도한다
    stored.catch(() => storedByFolder.delete(folder));
  }
  return stored;
}

async function copy(
  folder: AssetFolder,
  pathname: string,
  sourceUrl: string,
  token: string,
): Promise<string | null> {
  try {
    const stored = await getStored(folder, token);
    const storedUrl = stored.get(pathname);
    if (storedUrl) return storedUrl;

    // Notion 주소는 1시간 동안 유효해서, 방금 조회한 주소로 바로 내려받는다.
    const response = await fetch(sourceUrl);
    if (!response.ok) throw new Error(`내려받기 실패 (HTTP ${response.status})`);
    const contentType = response.headers.get('content-type');

    // 다른 빌드가 같은 이름을 먼저 올렸을 수 있어 덮어쓰기를 허용한다 (같은 원본이라 내용도 같다).
    const blob = await put(pathname, await response.arrayBuffer(), {
      access: 'public',
      token,
      allowOverwrite: true,
      ...(contentType ? { contentType } : {}),
    });
    stored.set(pathname, blob.url);
    return blob.url;
  } catch (error) {
    // 이미지 하나 때문에 빌드 전체를 멈추지 않는다. 그 이미지만 빼고 로그를 남긴다.
    console.warn(`[asset-storage] ${pathname} 복사 실패: ${String(error)}`);
    return null;
  }
}

// 원본 이미지(Notion 파일 등)를 Vercel Blob에 복사하고 만료 없는 Blob 주소를 돌려준다.
// 이미 올린 이미지는 다시 올리지 않는다. 복사하지 못하면 null (화면에서 그 이미지를 빼면 된다).
// 토큰이 없으면(로컬) 원본 주소를 그대로 돌려준다: 개발 중에는 1시간이면 충분하다.
export function copyToAssetStorage(folder: AssetFolder, sourceUrl: string): Promise<string | null> {
  const token = getBlobToken();
  if (!token) {
    if (!warnedNoToken) {
      warnedNoToken = true;
      console.warn(
        '[asset-storage] BLOB_READ_WRITE_TOKEN이 없어 이미지를 복사하지 않고 원본 주소를 씁니다',
      );
    }
    return Promise.resolve(sourceUrl);
  }

  const pathname = toAssetPathname(folder, sourceUrl);
  if (!pathname) {
    console.warn(`[asset-storage] 이미지 주소가 올바르지 않습니다: ${sourceUrl.slice(0, 80)}`);
    return Promise.resolve(null);
  }

  let result = copies.get(pathname);
  if (!result) {
    result = copy(folder, pathname, sourceUrl, token);
    copies.set(pathname, result);
  }
  return result;
}
