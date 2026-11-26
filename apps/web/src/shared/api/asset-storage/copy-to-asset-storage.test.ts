import type { ListBlobResult } from '@vercel/blob';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { toAssetPathname } from './asset-pathname';

// 서버 전용 표시와 외부 서비스(Blob)·환경 변수는 가짜로 바꾼다.
vi.mock('server-only', () => ({}));
vi.mock('@vercel/blob', () => ({ list: vi.fn(), put: vi.fn() }));
vi.mock('@/shared/config/env', () => ({ getBlobToken: vi.fn() }));

const SOURCE = 'https://prod-files-secure.s3.amazonaws.com/ws/file-id/cover.png?X-Amz-Signature=x';
const PATHNAME = toAssetPathname('notes', SOURCE) ?? '';
const BLOB_URL = `https://store.public.blob.vercel-storage.com/${PATHNAME}`;

// 이미 올린 목록·복사 결과를 모듈 안에 기억하므로, 테스트마다 모듈을 새로 불러온다.
async function load() {
  vi.resetModules();
  const blob = await import('@vercel/blob');
  const env = await import('@/shared/config/env');
  const { copyToAssetStorage } = await import('./copy-to-asset-storage');
  return {
    copyToAssetStorage,
    list: vi.mocked(blob.list),
    put: vi.mocked(blob.put),
    getBlobToken: vi.mocked(env.getBlobToken),
  };
}

function storedBlobs(pathnames: string[]) {
  return {
    blobs: pathnames.map((pathname) => ({
      pathname,
      url: `https://store.public.blob.vercel-storage.com/${pathname}`,
    })),
    hasMore: false,
  } as unknown as ListBlobResult;
}

describe('Blob에 이미지 복사', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve(new Response('image-bytes', { headers: { 'content-type': 'image/png' } })),
      ),
    );
  });

  it('이미 올린 이미지는 내려받거나 다시 올리지 않고 Blob 주소를 돌려준다', async () => {
    const { copyToAssetStorage, list, put, getBlobToken } = await load();
    getBlobToken.mockReturnValue('token');
    list.mockResolvedValue(storedBlobs([PATHNAME]));

    await expect(copyToAssetStorage('notes', SOURCE)).resolves.toBe(BLOB_URL);
    expect(fetch).not.toHaveBeenCalled();
    expect(put).not.toHaveBeenCalled();
  });

  it('처음 보는 이미지는 내려받아 올리고, 같은 이미지는 한 번만 올린다', async () => {
    const { copyToAssetStorage, list, put, getBlobToken } = await load();
    getBlobToken.mockReturnValue('token');
    list.mockResolvedValue(storedBlobs([]));
    put.mockResolvedValue({ url: BLOB_URL } as Awaited<ReturnType<typeof put>>);

    const results = await Promise.all([
      copyToAssetStorage('notes', SOURCE),
      copyToAssetStorage('notes', SOURCE.replace('Signature=x', 'Signature=y')),
    ]);

    expect(results).toEqual([BLOB_URL, BLOB_URL]);
    expect(list).toHaveBeenCalledTimes(1);
    expect(put).toHaveBeenCalledTimes(1);
    expect(put).toHaveBeenCalledWith(
      PATHNAME,
      expect.any(ArrayBuffer),
      expect.objectContaining({ access: 'public', contentType: 'image/png' }),
    );
  });

  it('내려받지 못하면 빌드를 멈추지 않고 null을 돌려준다', async () => {
    const { copyToAssetStorage, list, put, getBlobToken } = await load();
    getBlobToken.mockReturnValue('token');
    list.mockResolvedValue(storedBlobs([]));
    vi.mocked(fetch).mockResolvedValue(new Response(null, { status: 403 }));

    await expect(copyToAssetStorage('notes', SOURCE)).resolves.toBeNull();
    expect(put).not.toHaveBeenCalled();
  });

  it('토큰이 없으면(로컬) 복사하지 않고 원본 주소를 그대로 쓴다', async () => {
    const { copyToAssetStorage, list, getBlobToken } = await load();
    getBlobToken.mockReturnValue(undefined);

    await expect(copyToAssetStorage('notes', SOURCE)).resolves.toBe(SOURCE);
    expect(list).not.toHaveBeenCalled();
  });
});
