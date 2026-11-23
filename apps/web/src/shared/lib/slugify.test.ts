import { describe, expect, it } from 'vitest';

import { slugify } from '@/shared/lib/slugify';

describe('slugify', () => {
  it('소문자로 바꾸고 점을 없앤다', () => {
    expect(slugify('Next.js')).toBe('nextjs');
    expect(slugify('TypeScript')).toBe('typescript');
  });

  it('공백과 밑줄은 하이픈 하나로 바꾼다', () => {
    expect(slugify('React  Hooks')).toBe('react-hooks');
    expect(slugify('design_system')).toBe('design-system');
  });

  it('한글은 그대로 둔다', () => {
    expect(slugify('이미지')).toBe('이미지');
    expect(slugify('AI로 블로그 개발')).toBe('ai로-블로그-개발');
  });

  it('문자·숫자·하이픈 외 기호는 없애고 앞뒤 하이픈을 정리한다', () => {
    expect(slugify(' C++ / CSS! ')).toBe('c-css');
    expect(slugify('Vue 3')).toBe('vue-3');
  });
});
