import AxeBuilder from '@axe-core/playwright';
import { expect, type Page } from '@playwright/test';

// 검사 규칙: WCAG 2.0·2.1 A·AA (axe-core 태그). 자동 검사는 대비·이름·속성처럼 기계로 찾을 수 있는 문제만 잡는다.
const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

// 현재 페이지를 axe로 검사하고, 위반이 있으면 규칙·요소를 읽기 쉽게 보여 주며 실패한다.
export async function expectNoAccessibilityViolations(page: Page): Promise<void> {
  const { violations } = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();

  const summary = violations.map((violation) => ({
    rule: violation.id,
    impact: violation.impact,
    help: violation.help,
    targets: violation.nodes.map((node) => node.target.join(' ')),
  }));
  expect(summary).toEqual([]);
}
