import alertIcon from '@sightlab/icons/alert.svg?raw';
import searchIcon from '@sightlab/icons/search.svg?raw';
import type { Meta, StoryObj } from '@storybook/html-vite';

type StateKind = 'loading' | 'empty' | 'error';

type StateArgs = {
  state: StateKind;
  title: string;
  description: string;
  action: string;
};

// 아이콘 SVG에 aria-hidden을 붙인다 (@sightlab/icons는 SVG 파일만 제공).
function hideIcon(svg: string): string {
  return svg.replace('<svg ', '<svg aria-hidden="true" ');
}

const SKELETON = `
  <div class="sl-state__skeleton" aria-hidden="true">
    <span class="sl-state__line sl-state__line--title"></span>
    <span class="sl-state__line"></span>
    <span class="sl-state__line sl-state__line--short"></span>
  </div>`;

// 상태별 위쪽 요소, 버튼 모양, 알림 역할
const VISUAL: Record<StateKind, { top: string; button: string; role: string }> = {
  loading: { top: SKELETON, button: '', role: 'status' },
  empty: {
    top: `<span class="sl-state__icon">${hideIcon(searchIcon)}</span>`,
    button: 'sl-button--secondary',
    role: 'status',
  },
  error: {
    top: `<span class="sl-state__icon">${hideIcon(alertIcon)}</span>`,
    button: 'sl-button--primary',
    role: 'alert',
  },
};

// 규칙 문서(state.mdx)의 마크업과 같은 구조로 그린다.
function renderState({ state, title, description, action }: StateArgs): string {
  const { top, button, role } = VISUAL[state];
  const actionButton =
    button && action ? `<button type="button" class="sl-button ${button}">${action}</button>` : '';

  return `
    <div class="sl-state sl-state--${state}" role="${role}">
      ${top}
      <div class="sl-state__copy">
        <p class="sl-state__title">${title}</p>
        <p class="sl-state__description">${description}</p>
      </div>
      ${actionButton}
    </div>`;
}

// CSF 형식상 meta는 default export (D10 named export 규칙의 예외)
const meta = {
  title: 'Components/State',
  render: renderState,
  args: {
    state: 'loading',
    title: '노트를 불러오는 중입니다',
    description: '잠시만 기다리면 학습 기록을 확인할 수 있습니다.',
    action: '',
  },
  argTypes: {
    state: { control: 'inline-radio', options: ['loading', 'empty', 'error'] },
  },
  // 폭은 앱 레이아웃이 정한다. Figma 예시 폭(420px)으로 감싸 보여 준다.
  decorators: [
    (story) => {
      const wrapper = document.createElement('div');
      wrapper.style.maxWidth = '420px';
      const content = story();
      if (typeof content === 'string') wrapper.innerHTML = content;
      else wrapper.append(content);
      return wrapper;
    },
  ],
} satisfies Meta<StateArgs>;

export default meta;

type Story = StoryObj<StateArgs>;

export const Loading: Story = {};

export const Empty: Story = {
  args: {
    state: 'empty',
    title: '조건에 맞는 노트가 없습니다',
    description: '검색어나 선택한 태그를 변경해 다시 찾아보세요.',
    action: '필터 초기화',
  },
};

export const Error: Story = {
  args: {
    state: 'error',
    title: '노트를 불러오지 못했습니다',
    description: '네트워크 상태를 확인한 뒤 다시 시도해주세요.',
    action: '다시 시도',
  },
};
