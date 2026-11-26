import type { Page } from '@playwright/test';

// 상단 메뉴로 이동한다. 모바일 폭에서는 메뉴 버튼을 먼저 열어야 링크가 보인다.
export async function goByMainMenu(page: Page, label: string): Promise<void> {
  const menuToggle = page.getByRole('button', { name: '메뉴 열기' });
  if (await menuToggle.isVisible()) await menuToggle.click();

  await page
    .getByRole('navigation', { name: '주 메뉴' })
    .getByRole('link', { name: label })
    .click();
}
