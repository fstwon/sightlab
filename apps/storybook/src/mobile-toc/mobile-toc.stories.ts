import chevronDownIcon from '@sightlab/icons/chevron-down.svg?raw';
import type { Meta, StoryObj } from '@storybook/html-vite';

type Heading = { label: string; id: string; level: 2 | 3 };

type MobileTocArgs = {
  title: string;
  open: boolean;
  headings: Heading[];
  activeIndex: number;
};

// 아이콘 SVG에 클래스와 aria-hidden을 붙인다 (@sightlab/icons는 SVG 파일만 제공).
const ICON = chevronDownIcon.replace(
  '<svg ',
  '<svg class="sl-mobile-toc__icon" aria-hidden="true" ',
);

// 규칙 문서(mobile-toc.mdx)의 마크업과 같은 구조로 그린다.
function renderMobileToc({ title, open, headings, activeIndex }: MobileTocArgs): string {
  const items = headings
    .map(({ label, id, level }, index) => {
      const classes = ['sl-toc-item'];
      if (level === 3) classes.push('sl-toc-item--h3');
      const active = index === activeIndex;
      if (active) classes.push('sl-toc-item--active');
      return `<li><a class="${classes.join(' ')}" href="#${id}"${active ? ' aria-current="location"' : ''}>${label}</a></li>`;
    })
    .join('');

  return `
    <details class="sl-mobile-toc"${open ? ' open' : ''}>
      <summary class="sl-mobile-toc__header">
        <span>${title}</span>
        ${ICON}
      </summary>
      <nav class="sl-mobile-toc__body" aria-label="${title}">
        <ol class="sl-mobile-toc__list">${items}</ol>
      </nav>
    </details>`;
}

// Figma Mobile TOC 예시와 같은 제목 구성
const NOTE_HEADINGS: Heading[] = [
  { label: 'Context를 분리한 기준', id: 'context-split', level: 2 },
  { label: '상태 변경 범위', id: 'update-scope', level: 3 },
  { label: 'Provider 위치', id: 'provider', level: 3 },
  { label: '리렌더링 확인', id: 'rerender', level: 2 },
  { label: 'memo 적용 범위', id: 'memo', level: 3 },
];

// CSF 형식상 meta는 default export (D10 named export 규칙의 예외)
const meta = {
  title: 'Components/Mobile TOC',
  render: renderMobileToc,
  args: { title: '이 글의 목차', open: false, headings: NOTE_HEADINGS, activeIndex: 0 },
  argTypes: {
    activeIndex: { control: { type: 'number', min: -1, step: 1 } },
  },
  // 폭은 앱 레이아웃이 정한다. Figma 예시 폭(342px)으로 감싸 보여 준다.
  decorators: [
    (story) => {
      const wrapper = document.createElement('div');
      wrapper.style.width = '342px';
      const content = story();
      if (typeof content === 'string') wrapper.innerHTML = content;
      else wrapper.append(content);
      return wrapper;
    },
  ],
} satisfies Meta<MobileTocArgs>;

export default meta;

type Story = StoryObj<MobileTocArgs>;

export const Collapsed: Story = {};

export const Expanded: Story = { args: { open: true } };
