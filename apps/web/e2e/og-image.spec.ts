import { expect, type Page, test } from '@playwright/test';

// 링크 미리보기: 페이지의 og:image가 가리키는 이미지가 실제로 PNG로 응답하는지 확인한다.
// 기본(홈)·노트·프로젝트가 각자 다른 이미지를 쓰므로 세 종류를 모두 본다.
// 화면 폭과 상관없는 검사라 데스크톱에서만 실행한다.
test.beforeEach(() => {
  test.skip(test.info().project.name !== 'desktop', '화면 폭과 상관없는 검사');
});

// og:image 주소의 경로만 꺼낸다. 사이트 주소(metadataBase)는 배포 주소일 수 있어 테스트 서버로 다시 요청한다.
async function readOgImagePath(page: Page): Promise<string> {
  const content = await page.locator('meta[property="og:image"]').first().getAttribute('content');
  expect(content, 'og:image 태그가 있어야 한다').toBeTruthy();
  return new URL(content ?? '').pathname;
}

async function expectPngImage(page: Page, path: string) {
  const response = await page.request.get(path);
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toBe('image/png');
}

// 목록의 첫 카드 링크 주소 (없으면 null)
async function readFirstCardHref(page: Page, listPath: string): Promise<string | null> {
  await page.goto(listPath);
  const links = page
    .getByRole('main')
    .getByRole('article')
    .getByRole('heading', { level: 3 })
    .getByRole('link');
  if ((await links.count()) === 0) return null;
  return links.first().getAttribute('href');
}

test('홈은 사이트 기본 미리보기 이미지를 쓴다', async ({ page }) => {
  await page.goto('/');
  const path = await readOgImagePath(page);
  expect(path).toBe('/opengraph-image');
  await expectPngImage(page, path);
});

test('노트 상세는 그 노트의 미리보기 이미지를 쓴다', async ({ page }) => {
  const href = await readFirstCardHref(page, '/notes');
  test.skip(!href, '공개된 노트가 없어 건너뜀');

  await page.goto(href ?? '');
  const path = await readOgImagePath(page);
  expect(path).toBe(`${href}/opengraph-image`);
  await expectPngImage(page, path);
});

test('프로젝트 상세는 그 프로젝트의 미리보기 이미지를 쓴다', async ({ page }) => {
  const href = await readFirstCardHref(page, '/projects');
  test.skip(!href, '공개된 프로젝트가 없어 건너뜀');

  await page.goto(href ?? '');
  const path = await readOgImagePath(page);
  expect(path).toBe(`${href}/opengraph-image`);
  await expectPngImage(page, path);
});
