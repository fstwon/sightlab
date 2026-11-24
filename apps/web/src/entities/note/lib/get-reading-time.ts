import { linesOutsideCode, toPlainText } from './markdown-text';

// 한 분에 읽는 글자 수 (공백 제외, 한글 기준)
export const CHARACTERS_PER_MINUTE = 500;

// 읽는 시간(분) (F4·P5). 한글은 단어 수보다 글자 수가 정확해서 공백을 뺀 글자 수로 센다.
// 코드 블록, 마크다운 기호, HTML 태그는 세지 않는다. 올림, 최소 1분.
export function getReadingTime(markdown: string): number {
  let characters = 0;
  for (const line of linesOutsideCode(markdown)) {
    const text = toPlainText(line.replace(/^\s*(#{1,6}|>|[-*+]|\d+\.)\s+(\[[ x]\]\s+)?/, ''));
    characters += text.replace(/\s/g, '').length;
  }
  return Math.max(1, Math.ceil(characters / CHARACTERS_PER_MINUTE));
}
