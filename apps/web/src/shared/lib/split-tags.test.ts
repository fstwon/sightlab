import { describe, expect, it } from 'vitest';

import { splitTags } from '@/shared/lib/split-tags';

describe('splitTags', () => {
  it('최대 개수 이하면 모두 보이고 숨긴 개수는 0이다', () => {
    expect(splitTags([])).toEqual({ visible: [], hiddenCount: 0 });
    expect(splitTags(['a', 'b'])).toEqual({ visible: ['a', 'b'], hiddenCount: 0 });
  });

  it('넘치면 앞에서부터 최대 개수만 보이고 나머지 개수를 센다', () => {
    expect(splitTags(['a', 'b', 'c', 'd', 'e'])).toEqual({ visible: ['a', 'b'], hiddenCount: 3 });
  });

  it('최대 개수를 바꿀 수 있다', () => {
    expect(splitTags(['a', 'b', 'c'], 1)).toEqual({ visible: ['a'], hiddenCount: 2 });
  });
});
