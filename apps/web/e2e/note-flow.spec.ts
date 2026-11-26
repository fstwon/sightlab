import { expect, test } from '@playwright/test';

import { goByMainMenu } from './support/navigation';

// 핵심 흐름: 홈 → Notes 목록 → 노트 상세 (D13).
// 실제 Notion 글로 빌드한 사이트라 글 내용 대신 구조를 확인한다 (글이 바뀌어도 깨지지 않게).
test('홈에서 메뉴로 Notes 목록에 가서 첫 노트 상세를 연다', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  await goByMainMenu(page, 'Notes');
  await expect(page).toHaveURL('/notes');
  await expect(page.getByRole('heading', { level: 1, name: 'Learning Notes' })).toBeVisible();

  // 노트 카드는 article 안 제목(h3) 링크
  const firstNoteLink = page
    .getByRole('article')
    .first()
    .getByRole('heading', { level: 3 })
    .getByRole('link');
  const title = (await firstNoteLink.textContent())?.trim() ?? '';
  expect(title).not.toBe('');

  await firstNoteLink.click();
  await expect(page).toHaveURL(/\/notes\/[^/]+$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
});
