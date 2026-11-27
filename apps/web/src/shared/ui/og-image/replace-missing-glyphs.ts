// SUIT OTF에 없는 기호를 비슷한 기호로 바꾼다. OG 이미지에는 대체 글꼴이 없어
// 그대로 두면 그 글자가 빠지거나 빈 네모로 그려진다. (한자는 대상이 아니다)
const REPLACEMENTS: Record<string, string> = {
  '—': '-', // — em dash
  '–': '-', // – en dash
  '•': '·', // • bullet → · 가운뎃점
};

const MISSING_GLYPHS = new RegExp(`[${Object.keys(REPLACEMENTS).join('')}]`, 'g');

export function replaceMissingGlyphs(text: string): string {
  return text.replace(MISSING_GLYPHS, (glyph) => REPLACEMENTS[glyph] ?? glyph);
}
