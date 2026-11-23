import { describe, expect, it } from 'vitest';

import { formatConnectedNotes } from './format-connected-notes';

describe('formatConnectedNotes', () => {
  it('1개면 단수형이다', () => {
    expect(formatConnectedNotes(1)).toBe('1 connected note');
  });

  it('0개와 여러 개는 복수형이다', () => {
    expect(formatConnectedNotes(0)).toBe('0 connected notes');
    expect(formatConnectedNotes(12)).toBe('12 connected notes');
  });
});
