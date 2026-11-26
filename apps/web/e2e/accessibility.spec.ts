import { expect, test } from '@playwright/test';

import { expectNoAccessibilityViolations } from './support/accessibility';

// 공개 화면을 axe로 검사한다 (D13). 상세 주소는 글이 바뀌어도 되도록 목록의 첫 카드에서 찾는다.
const STATIC_PAGES = [
  { name: '홈', path: '/' },
  { name: 'Notes 목록', path: '/notes' },
  { name: 'Projects 목록', path: '/projects' },
  { name: '노트 404', path: '/notes/e2e-missing-note' },
  { name: '프로젝트 404', path: '/projects/e2e-missing-project' },
];

for (const { name, path } of STATIC_PAGES) {
  test(`${name} (${path})`, async ({ page }) => {
    await page.goto(path);
    await expectNoAccessibilityViolations(page);
  });
}

test('노트 상세 (목록의 첫 노트)', async ({ page }) => {
  await page.goto('/notes');
  const href = await page
    .getByRole('article')
    .first()
    .getByRole('heading', { level: 3 })
    .getByRole('link')
    .getAttribute('href');
  expect(href).toBeTruthy();

  await page.goto(href ?? '/notes');
  await expectNoAccessibilityViolations(page);
});

test('프로젝트 상세 (목록의 첫 프로젝트)', async ({ page }) => {
  await page.goto('/projects');
  const links = page.getByRole('article').getByRole('heading', { level: 3 }).getByRole('link');
  test.skip((await links.count()) === 0, '공개된 프로젝트가 없어 건너뜀');

  await page.goto((await links.first().getAttribute('href')) ?? '/projects');
  await expectNoAccessibilityViolations(page);
});

// 열었을 때만 보이는 화면도 검사한다
test('태그 필터를 연 Notes 목록', async ({ page }) => {
  await page.goto('/notes');
  await page.getByRole('button', { name: '모든 태그' }).click();
  await expect(page.getByRole('group', { name: '태그' })).toBeVisible();
  await expectNoAccessibilityViolations(page);
});

test('모바일 메뉴를 연 홈', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', '메뉴 버튼은 모바일 폭에서만 보임');
  await page.goto('/');
  await page.getByRole('button', { name: '메뉴 열기' }).click();
  await expect(page.getByRole('navigation', { name: '주 메뉴' })).toBeVisible();
  await expectNoAccessibilityViolations(page);
});
