import arrowUpIcon from '@sightlab/icons/arrow-up.svg?raw';
import type { Meta, StoryObj } from '@storybook/html-vite';

type ToTocArgs = {
  label: string;
  target: string;
};

// 아이콘 SVG에 클래스와 aria-hidden을 붙인다 (@sightlab/icons는 SVG 파일만 제공).
const ICON = arrowUpIcon.replace('<svg ', '<svg class="sl-to-toc__icon" aria-hidden="true" ');

// 규칙 문서(to-toc.mdx)의 마크업과 같은 구조로 그린다.
function renderToToc({ label, target }: ToTocArgs): string {
  return `
    <a class="sl-to-toc" href="#${target}">
      ${ICON}
      <span>${label}</span>
    </a>`;
}

// CSF 형식상 meta는 default export (D10 named export 규칙의 예외)
const meta = {
  title: 'Components/To TOC Action',
  render: renderToToc,
  args: { label: '목차', target: 'note-toc' },
  // 실제로는 화면 오른쪽 아래에 고정된다. 모바일 화면 크기의 틀로 감싸 위치를 보여 준다.
  // transform이 있는 요소 안에서는 position: fixed가 그 요소 기준이 된다.
  decorators: [
    (story) => {
      const screen = document.createElement('div');
      screen.style.cssText =
        'position: relative; width: 390px; height: 320px; overflow: hidden; transform: translateZ(0); border: 1px solid var(--sl-color-border-default); border-radius: var(--sl-radius-md); background: var(--sl-color-bg-canvas);';
      const content = story();
      if (typeof content === 'string') screen.innerHTML = content;
      else screen.append(content);
      return screen;
    },
  ],
} satisfies Meta<ToTocArgs>;

export default meta;

type Story = StoryObj<ToTocArgs>;

export const Default: Story = {};
