import { describe, expect, it, vi } from 'vitest';

import { replaceNoteImages } from './replace-note-images';

const NOTION = 'https://prod-files-secure.s3.amazonaws.com/ws/file-id/cover.png';
const STORED = 'https://store.public.blob.vercel-storage.com/notes/abc.png';

// 원본 주소(서명 포함)를 받아 보관소 주소를 돌려주는 가짜 resolve
const toStored = vi.fn((url: string) => Promise.resolve(url.startsWith(NOTION) ? STORED : null));

describe('본문 이미지 주소 바꾸기', () => {
  it('캡션 없는 <image />는 alt가 빈 figure로 바뀐다', async () => {
    const markdown = `글\n\n<image source="${NOTION}?X-Amz-Signature=a&amp;X-Amz-Date=b" />\n\n다음 글`;

    await expect(replaceNoteImages(markdown, toStored)).resolves.toBe(
      `글\n\n<figure><img src="${STORED}" alt="" /></figure>\n\n다음 글`,
    );
    // &amp;를 &로 되돌려 원본 주소 그대로 넘긴다
    expect(toStored).toHaveBeenCalledWith(`${NOTION}?X-Amz-Signature=a&X-Amz-Date=b`);
  });

  it('캡션이 있으면 alt와 figcaption에 글자만 넣는다 (태그 제거, HTML 이스케이프)', async () => {
    const markdown = `<image source="${NOTION}" color="gray">그림 1. <b>상태</b> & "경계"</image>`;

    await expect(replaceNoteImages(markdown, toStored)).resolves.toBe(
      `<figure><img src="${STORED}" alt="그림 1. 상태 &amp; &quot;경계&quot;" />` +
        `<figcaption>그림 1. 상태 &amp; &quot;경계&quot;</figcaption></figure>`,
    );
  });

  it('마크다운 이미지 문법도 같은 figure로 바꾼다', async () => {
    await expect(replaceNoteImages(`![구조도](${NOTION})`, toStored)).resolves.toBe(
      `<figure><img src="${STORED}" alt="구조도" /><figcaption>구조도</figcaption></figure>`,
    );
  });

  it('복사하지 못한 이미지는 본문에서 뺀다', async () => {
    await expect(
      replaceNoteImages('앞\n\n![](https://example.com/broken.png)\n\n뒤', toStored),
    ).resolves.toBe('앞\n\n\n\n뒤');
  });

  it('같은 이미지가 여러 번 나와도 한 번만 복사한다', async () => {
    const resolve = vi.fn(() => Promise.resolve(STORED));
    const markdown = `<image source="${NOTION}" />\n\n<image source="${NOTION}" />`;

    const result = await replaceNoteImages(markdown, resolve);

    expect(resolve).toHaveBeenCalledTimes(1);
    expect(result.match(/<figure>/g)).toHaveLength(2);
  });

  it('줄 중간이나 코드 블록 예시처럼 한 줄 전체가 아닌 문법은 건드리지 않는다', async () => {
    const resolve = vi.fn(() => Promise.resolve(STORED));
    const markdown = '마크다운 이미지는 `![설명](주소)`로 쓴다';

    await expect(replaceNoteImages(markdown, resolve)).resolves.toBe(markdown);
    expect(resolve).not.toHaveBeenCalled();
  });
});
