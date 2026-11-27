import { expect, test } from '@playwright/test';

import { goByMainMenu } from './support/navigation';

// 메뉴 → Projects 목록 → 프로젝트 상세 → 브레드크럼으로 목록에 돌아가기.
// 공개된 프로젝트가 없으면 빈 상태만 확인하고 상세 단계는 건너뛴다 (Notion 데이터에 따라 달라짐).
test('메뉴로 Projects 목록에 가서 첫 프로젝트 상세를 열고 목록으로 돌아온다', async ({ page }) => {
  await page.goto('/');
  await goByMainMenu(page, 'Projects');
  await expect(page).toHaveURL('/projects');
  await expect(page.getByRole('heading', { level: 1, name: 'Projects' })).toBeVisible();

  const projectLinks = page
    .getByRole('article')
    .getByRole('heading', { level: 3 })
    .getByRole('link');
  if ((await projectLinks.count()) === 0) {
    // getByText는 숨겨 둔 이전 화면(홈의 같은 문구)까지 찾으므로 보이는 상태 영역(role=status) 안에서 찾는다
    await expect(
      page.getByRole('status').filter({ hasText: '아직 공개된 프로젝트가 없습니다' }),
    ).toBeVisible();
    test.skip(true, '공개된 프로젝트가 없어 상세 단계를 건너뜀');
  }

  const firstLink = projectLinks.first();
  const title = (await firstLink.textContent())?.trim() ?? '';
  await firstLink.click();
  await expect(page).toHaveURL(/\/projects\/[^/]+$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);

  await page
    .getByRole('navigation', { name: '현재 위치' })
    .getByRole('link', { name: 'Projects' })
    .click();
  await expect(page).toHaveURL('/projects');
});

// 카드는 제목 링크의 누르는 영역을 카드 전체로 넓힌다. 맨 위 미리보기(이미지·번호 자리)를 눌러도 상세로 가야 한다.
test('프로젝트 카드의 미리보기를 눌러도 상세로 간다', async ({ page }) => {
  await page.goto('/projects');
  const firstCard = page.getByRole('main').getByRole('article').first();
  test.skip((await firstCard.count()) === 0, '공개된 프로젝트가 없어 건너뜀');

  const title = (await firstCard.getByRole('heading', { level: 3 }).textContent())?.trim() ?? '';
  const box = await firstCard.boundingBox();
  if (!box) throw new Error('카드 위치를 알 수 없음');
  // 카드 위쪽 여백(16·24px) 아래 미리보기 칸(130·160px)의 가운데
  await firstCard.click({ position: { x: box.width / 2, y: 80 } });

  await expect(page).toHaveURL(/\/projects\/[^/]+$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
});
