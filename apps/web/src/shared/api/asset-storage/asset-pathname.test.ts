import { describe, expect, it } from 'vitest';

import { toAssetPathname } from './asset-pathname';

const NOTION_FILE =
  'https://prod-files-secure.s3.us-west-2.amazonaws.com/workspace-id/file-id/cover.png';

describe('Blob 이름 만들기', () => {
  it('서명(물음표 뒤)만 다른 같은 파일은 같은 이름이 된다', () => {
    const first = toAssetPathname('notes', `${NOTION_FILE}?X-Amz-Signature=aaa`);
    const second = toAssetPathname('notes', `${NOTION_FILE}?X-Amz-Signature=bbb`);

    expect(first).toBe(second);
    expect(first).toMatch(/^notes\/[0-9a-f]{16}\.png$/);
  });

  it('파일 ID가 다르면 다른 이름이 된다 (Notion에서 이미지를 바꾼 경우)', () => {
    const before = toAssetPathname('notes', NOTION_FILE);
    const after = toAssetPathname('notes', NOTION_FILE.replace('file-id', 'new-file-id'));

    expect(before).not.toBe(after);
  });

  it('폴더 이름이 앞에 붙고, 확장자는 소문자로 둔다', () => {
    expect(toAssetPathname('projects', 'https://example.com/a/Preview.JPG')).toMatch(
      /^projects\/[0-9a-f]{16}\.jpg$/,
    );
  });

  it('이미지 확장자가 아니면 확장자 없이 둔다', () => {
    expect(toAssetPathname('notes', 'https://example.com/image')).toMatch(/^notes\/[0-9a-f]{16}$/);
    expect(toAssetPathname('notes', 'https://example.com/file.exe')).toMatch(
      /^notes\/[0-9a-f]{16}$/,
    );
  });

  it('주소가 잘못됐으면 null', () => {
    expect(toAssetPathname('notes', 'not a url')).toBeNull();
  });
});
