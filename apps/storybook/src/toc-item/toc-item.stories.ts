import type { Meta, StoryObj } from '@storybook/html-vite';

type Heading = { label: string; id: string; level: 2 | 3 };

type TocItemArgs = {
  headings: Heading[];
  activeIndex: number;
};

// 규칙 문서(toc-item.mdx)의 마크업과 같은 구조로 그린다.
// 목록 스타일은 앱 몫이라 스토리에서만 인라인으로 정한다.
function renderToc({ headings, activeIndex }: TocItemArgs): string {
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
    <nav aria-label="목차">
      <ol style="display: grid; gap: 4px; padding: 0; margin: 0; list-style: none;">${items}</ol>
    </nav>`;
}

const NOTE_HEADINGS: Heading[] = [
  { label: 'Context를 분리한 기준', id: 'context-split', level: 2 },
  { label: '상태 변경 범위', id: 'update-scope', level: 3 },
  { label: 'Provider 위치', id: 'provider', level: 3 },
  { label: '정리', id: 'summary', level: 2 },
];

const LONG_HEADINGS: Heading[] = [
  {
    label: '상태 관리 라이브러리 없이 Context와 reducer로 전역 상태를 나눈 기준',
    id: 'without-library',
    level: 2,
  },
  {
    label: 'Provider를 화면 단위로 분리했을 때 생긴 리렌더링 범위 문제',
    id: 'rerender-scope',
    level: 3,
  },
];

// CSF 형식상 meta는 default export (D10 named export 규칙의 예외)
const meta = {
  title: 'Components/TOC Item',
  render: renderToc,
  args: { headings: NOTE_HEADINGS, activeIndex: 1 },
  argTypes: {
    activeIndex: { control: { type: 'number', min: -1, step: 1 } },
  },
  // 목차 폭은 앱 레이아웃이 정한다. Figma 예시 폭(240px)으로 감싸 보여 준다.
  decorators: [
    (story) => {
      const wrapper = document.createElement('div');
      wrapper.style.width = '240px';
      const content = story();
      if (typeof content === 'string') wrapper.innerHTML = content;
      else wrapper.append(content);
      return wrapper;
    },
  ],
} satisfies Meta<TocItemArgs>;

export default meta;

type Story = StoryObj<TocItemArgs>;

export const Default: Story = {};

export const LongLabel: Story = {
  name: 'Long label',
  args: { headings: LONG_HEADINGS, activeIndex: 1 },
};
