import { defineConfig, devices } from '@playwright/test';

// E2E 설정 (D13). 빌드 결과(next start)를 진짜 브라우저로 열어 핵심 흐름을 확인한다.
// dev 서버가 아니라 빌드 결과로 시험해야 배포와 같은 정적 HTML·캐시를 본다.
// 먼저 `pnpm build`가 끝나 있어야 한다 (turbo test:e2e는 build 다음에 실행).
const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;
const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  // CI에서 test.only가 남아 있으면 실패시킨다
  forbidOnly: isCI,
  // CI의 일시적인 지연으로 실패한 것인지 가리기 위해 한 번만 다시 시도
  retries: isCI ? 1 : 0,
  reporter: isCI
    ? [['github'], ['html', { open: 'never' }]]
    : [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: BASE_URL,
    // 실패한 테스트만 기록을 남긴다 (보고서에서 단계별 화면·네트워크 확인)
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  // 데스크톱과 모바일 폭(Figma MOBILE 시안 375)을 모두 확인한다. 브라우저는 Chromium만.
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    {
      name: 'mobile',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 375, height: 812 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
  // 테스트 전에 서버를 켜고 주소가 응답할 때까지 기다린다. 로컬은 이미 켜 둔 서버를 다시 쓴다.
  webServer: {
    command: 'pnpm start',
    url: BASE_URL,
    reuseExistingServer: !isCI,
    timeout: 60_000,
  },
});
