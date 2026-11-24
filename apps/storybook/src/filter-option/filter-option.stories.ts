import type { Meta, StoryObj } from '@storybook/html-vite';

import { type FilterOptionArgs, renderFilterOption } from './render-filter-option';

// CSF 형식상 meta는 default export (D10 named export 규칙의 예외)
const meta = {
  title: 'Components/Filter Option',
  render: renderFilterOption,
  args: { label: 'React', count: 8, checked: false },
  // 폭은 패널이 정한다. Figma 패널 안쪽 폭(264px)으로 감싸 보여 준다.
  decorators: [
    (story) => {
      const wrapper = document.createElement('div');
      wrapper.style.width = '264px';
      const content = story();
      if (typeof content === 'string') wrapper.innerHTML = content;
      else wrapper.append(content);
      return wrapper;
    },
  ],
} satisfies Meta<FilterOptionArgs>;

export default meta;

type Story = StoryObj<FilterOptionArgs>;

export const Default: Story = {};

export const Checked: Story = { args: { checked: true } };
