import { describe, expect, it } from 'vitest';

import { replaceMissingGlyphs } from './replace-missing-glyphs';

describe('replaceMissingGlyphs', () => {
  it('em dash와 en dash를 하이픈으로 바꾼다', () => {
    expect(replaceMissingGlyphs('캐시 — 재검증 2024–2026')).toBe('캐시 - 재검증 2024-2026');
  });

  it('글머리 기호를 가운뎃점으로 바꾼다', () => {
    expect(replaceMissingGlyphs('React • Next')).toBe('React · Next');
  });

  it('SUIT에 있는 글자는 그대로 둔다', () => {
    const text = '배우고 기록하고 · “다시” 보는 → 학습… ₩';
    expect(replaceMissingGlyphs(text)).toBe(text);
  });
});
