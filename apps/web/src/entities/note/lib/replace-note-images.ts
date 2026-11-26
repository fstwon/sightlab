// Notion 마크다운(v2)의 이미지 블록 두 가지 모양. 이미지는 늘 한 줄에 따로 오므로 줄 단위로만 찾는다
// (코드 블록 안의 예시 문법을 바꾸지 않도록 줄 중간에 섞인 것은 건드리지 않는다).
//   <image source="URL" color="…">캡션</image>   또는   <image source="URL" />
//   ![캡션](URL)
const IMAGE_TAG = /^<image\b[^>]*?\bsource="([^"]*)"[^>]*?(?:\/>|>(.*?)<\/image>)[ \t]*$/gm;
const MARKDOWN_IMAGE = /^!\[([^\]]*)\]\(([^)\s]+)\)[ \t]*$/gm;

// 원본 주소 → 보관소 주소. 복사하지 못하면 null (그 이미지는 본문에서 뺀다).
export type ResolveImageUrl = (sourceUrl: string) => Promise<string | null>;

function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

// 캡션은 글자만 쓴다 (Notion이 캡션 안 서식을 어떻게 보내는지 문서에 없어서 태그는 떼어 낸다)
function toPlainText(caption: string | undefined): string {
  return (caption ?? '').replace(/<[^>]*>/g, '').trim();
}

// 공용 Prose가 스타일을 정한 <figure> + <img> + <figcaption>으로 바꾼다 (Figma Markdown Content / Image).
// 캡션이 없으면 alt를 비워 화면 낭독기가 파일 이름을 읽지 않게 한다.
function toFigure(url: string, caption: string): string {
  const alt = escapeHtml(caption);
  const figcaption = caption ? `<figcaption>${alt}</figcaption>` : '';
  return `<figure><img src="${escapeHtml(url)}" alt="${alt}" />${figcaption}</figure>`;
}

// 본문의 이미지 주소를 resolve가 돌려준 주소(Blob)로 바꾼다.
// Notion 이미지 주소는 1시간 뒤 만료되므로, 정적 HTML에는 만료 없는 주소만 남긴다.
// 같은 주소는 한 번만 resolve한다.
export async function replaceNoteImages(
  markdown: string,
  resolve: ResolveImageUrl,
): Promise<string> {
  const images = [
    ...[...markdown.matchAll(IMAGE_TAG)].map((match) => ({
      text: match[0],
      // 속성값 안의 &는 &amp;로 올 수도 있어 되돌린다
      sourceUrl: (match[1] ?? '').replaceAll('&amp;', '&'),
      caption: toPlainText(match[2]),
    })),
    ...[...markdown.matchAll(MARKDOWN_IMAGE)].map((match) => ({
      text: match[0],
      sourceUrl: match[2] ?? '',
      caption: toPlainText(match[1]),
    })),
  ];
  if (images.length === 0) return markdown;

  const sourceUrls = [...new Set(images.map((image) => image.sourceUrl))];
  const resolved = new Map(
    await Promise.all(sourceUrls.map(async (url) => [url, await resolve(url)] as const)),
  );

  let result = markdown;
  for (const image of images) {
    const url = resolved.get(image.sourceUrl);
    const replacement = url ? toFigure(url, image.caption) : '';
    // 함수로 넘겨 주소 안의 $ 문자가 치환 패턴으로 해석되지 않게 한다
    result = result.replace(image.text, () => replacement);
  }
  return result;
}
