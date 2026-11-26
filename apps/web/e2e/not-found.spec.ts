import { expect, test } from '@playwright/test';

// 공개 목록에 없는 slug는 404 화면과 상태 코드를 돌려주고, 목록으로 돌아가는 링크가 있다.
const CASES = [
  {
    path: '/notes/e2e-missing-note',
    title: 'Note를 찾을 수 없습니다.',
    back: 'Notes로 돌아가기',
    list: '/notes',
  },
  {
    path: '/projects/e2e-missing-project',
    title: 'Project를 찾을 수 없습니다.',
    back: 'Projects로 돌아가기',
    list: '/projects',
  },
];

for (const { path, title, back, list } of CASES) {
  test(`없는 주소 ${path}는 404 화면을 보여 준다`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1, name: title })).toBeVisible();

    await page.getByRole('link', { name: back }).click();
    await expect(page).toHaveURL(list);
  });
}
