import { describe, expect, it } from 'vitest';

import { isActivePath } from '@/shared/lib/is-active-path';

describe('isActivePath', () => {
  it('메뉴 주소와 같으면 현재 메뉴다', () => {
    expect(isActivePath('/notes', '/notes')).toBe(true);
  });

  it('메뉴 주소의 하위 주소도 현재 메뉴다', () => {
    expect(isActivePath('/notes/context-api', '/notes')).toBe(true);
  });

  it('이름이 메뉴 주소로 시작하기만 하는 주소는 현재 메뉴가 아니다', () => {
    expect(isActivePath('/notesx', '/notes')).toBe(false);
  });

  it('다른 메뉴나 홈은 현재 메뉴가 아니다', () => {
    expect(isActivePath('/projects', '/notes')).toBe(false);
    expect(isActivePath('/', '/notes')).toBe(false);
  });
});
