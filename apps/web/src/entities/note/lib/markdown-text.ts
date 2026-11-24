// 마크다운 한 줄에서 화면에 보이는 글자만 남긴다 (목차 제목·글자 수 계산용).
// HTML 태그, 링크 주소, 강조·코드 기호를 뺀다. 완벽한 파서가 아니라 제목·본문 글자에 충분한 정도.
export function toPlainText(markdown: string): string {
  return markdown
    .replace(/<[^>]+>/g, '')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_~`]/g, '')
    .trim();
}

// 코드 블록(``` 또는 ~~~로 감싼 부분) 안인지 한 줄씩 따라가며 알려 준다
export function* linesOutsideCode(markdown: string): Generator<string> {
  let fence: string | null = null;
  for (const line of markdown.split('\n')) {
    const marker = /^\s*(```|~~~)/.exec(line)?.[1];
    if (marker) {
      if (fence === null) fence = marker;
      else if (marker === fence) fence = null;
      continue;
    }
    if (fence === null) yield line;
  }
}
