import checkIcon from '@sightlab/icons/check.svg?raw';
import closeIcon from '@sightlab/icons/close.svg?raw';
import exclamationIcon from '@sightlab/icons/exclamation.svg?raw';
import infoIcon from '@sightlab/icons/info.svg?raw';
import type { Meta, StoryObj } from '@storybook/html-vite';

type CalloutType = 'info' | 'tip' | 'warning' | 'error';

type CalloutArgs = {
  type: CalloutType;
  title: string;
  content: string;
};

// 종류마다 정해진 아이콘 (Figma Callout)
const ICONS: Record<CalloutType, string> = {
  info: infoIcon,
  tip: checkIcon,
  warning: exclamationIcon,
  error: closeIcon,
};

// 규칙 문서(callout.mdx)의 마크업과 같은 구조로 그린다.
function renderCallout({ type, title, content }: CalloutArgs): string {
  const icon = ICONS[type].replace('<svg ', '<svg aria-hidden="true" ');
  return `
    <div class="sl-callout sl-callout--${type}" role="note">
      <span class="sl-callout__icon">${icon}</span>
      <div class="sl-callout__body">
        <p class="sl-callout__title">${title}</p>
        <div class="sl-callout__content"><p>${content}</p></div>
      </div>
    </div>`;
}

// CSF 형식상 meta는 default export (D10 named export 규칙의 예외)
const meta = {
  title: 'Components/Callout',
  render: renderCallout,
  args: { type: 'info', title: '참고', content: '관련 개념을 함께 확인하면 이해하기 쉽습니다.' },
  argTypes: { type: { control: 'select', options: ['info', 'tip', 'warning', 'error'] } },
  // Figma 예시 폭 620px
  decorators: [
    (story) => {
      const wrapper = document.createElement('div');
      wrapper.style.maxWidth = '620px';
      const content = story();
      if (typeof content === 'string') wrapper.innerHTML = content;
      else wrapper.append(content);
      return wrapper;
    },
  ],
} satisfies Meta<CalloutArgs>;

export default meta;

type Story = StoryObj<CalloutArgs>;

export const Info: Story = {};

export const Tip: Story = {
  args: {
    type: 'tip',
    title: '팁',
    content: '작은 단위로 분리한 뒤 실제 변경 범위를 비교해보세요.',
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    title: '주의',
    content: '이 방식은 Provider 중첩이 많을 때 복잡도가 커질 수 있습니다.',
  },
};

export const ErrorType: Story = {
  name: 'Error',
  args: {
    type: 'error',
    title: '중요',
    content: '의존성 배열을 누락하면 오래된 상태를 참조할 수 있습니다.',
  },
};
