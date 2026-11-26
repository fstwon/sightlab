import { expect, type Page, test } from '@playwright/test';

// Notes 검색·태그 필터는 상태를 URL(?q=, ?tags=)에 둔다 (F3).
// 글 내용 대신 "첫 카드 제목", "태그 옆 개수"처럼 화면에 있는 값으로 기대 결과를 만든다.

const noteTitles = (page: Page) => page.getByRole('article').getByRole('heading', { level: 3 });
// 결과 개수 문구: "12 notes · latest first"
const resultCount = (page: Page) => page.getByText(/^\d+ notes? · latest first$/);
const searchParam = (page: Page, name: string) => new URL(page.url()).searchParams.get(name);

test('검색어를 입력하면 주소(?q=)에 남고, 새로 고쳐도 같은 결과를 보여 준다', async ({ page }) => {
  await page.goto('/notes');
  const title = (await noteTitles(page).first().textContent())?.trim() ?? '';
  expect(title).not.toBe('');

  const search = page.getByRole('searchbox', { name: '노트 검색' });
  await search.fill(title);
  // 입력을 멈추면(300ms) 주소가 바뀐다
  await expect.poll(() => searchParam(page, 'q')).toBe(title);
  await expect(noteTitles(page).first()).toHaveText(title);

  await page.reload();
  await expect(search).toHaveValue(title);
  await expect(noteTitles(page).first()).toHaveText(title);
});

test('맞는 노트가 없으면 빈 결과를 보여 주고, 필터 초기화로 전체 목록에 돌아간다', async ({
  page,
}) => {
  await page.goto('/notes');
  const total = await resultCount(page).textContent();

  await page.getByRole('searchbox', { name: '노트 검색' }).fill('e2e-없는-검색어-zzz');
  await expect(page.getByText('조건에 맞는 노트가 없습니다')).toBeVisible();
  await expect(noteTitles(page)).toHaveCount(0);

  await page.getByRole('link', { name: '필터 초기화' }).click();
  await expect(page).toHaveURL('/notes');
  await expect(resultCount(page)).toHaveText(total ?? '');
});

test('태그를 고르면 주소(?tags=)에 남고 개수가 맞으며, 칩으로 해제한다', async ({ page }) => {
  await page.goto('/notes');

  await page.getByRole('button', { name: '모든 태그' }).click();
  const firstOption = page.locator('.sl-filter-option').first();
  const slug = await firstOption.getByRole('checkbox').getAttribute('value');
  const name = (await firstOption.locator('.sl-filter-option__label').textContent())?.trim();
  const count = Number(await firstOption.locator('.sl-filter-option__count').textContent());
  expect(slug).toBeTruthy();

  // 체크박스는 모양(sl-filter-option__box) 뒤에 숨어 있어 사용자처럼 label을 누른다
  await firstOption.click();
  await expect(firstOption.getByRole('checkbox')).toBeChecked();
  await expect.poll(() => searchParam(page, 'tags')).toBe(slug);
  await expect(resultCount(page)).toHaveText(
    `${count} ${count === 1 ? 'note' : 'notes'} · latest first`,
  );

  // 패널을 닫고 선택한 태그 칩으로 해제
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: `${name} 필터 해제` }).click();
  await expect(page).toHaveURL('/notes');
  await expect(page.getByRole('button', { name: '모든 태그' })).toBeVisible();
});
