import type { Meta, StoryObj } from '@storybook/html-vite';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

type ButtonArgs = {
  label: string;
  variant: ButtonVariant;
  disabled: boolean;
  as: 'button' | 'a';
};

// 규칙 문서(button.mdx)의 마크업과 같은 구조로 그린다.
function renderButton({ label, variant, disabled, as }: ButtonArgs): string {
  const classes = ['sl-button', `sl-button--${variant}`];

  if (as === 'a') {
    // <a>는 disabled 속성이 없으므로 수정자 + aria-disabled, href 제거
    if (disabled) classes.push('sl-button--disabled');
    const link = disabled ? 'aria-disabled="true"' : 'href="#"';
    return `<a class="${classes.join(' ')}" ${link}>${label}</a>`;
  }

  return `<button type="button" class="${classes.join(' ')}"${disabled ? ' disabled' : ''}>${label}</button>`;
}

// CSF 형식상 meta는 default export (D10 named export 규칙의 예외)
const meta = {
  title: 'Components/Button',
  render: renderButton,
  args: { label: 'Button', variant: 'primary', disabled: false, as: 'button' },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'danger'] },
    as: { control: 'inline-radio', options: ['button', 'a'] },
  },
} satisfies Meta<ButtonArgs>;

export default meta;

type Story = StoryObj<ButtonArgs>;

export const Primary: Story = {};

export const Secondary: Story = { args: { variant: 'secondary' } };

export const Ghost: Story = { args: { variant: 'ghost' } };

export const Danger: Story = { args: { variant: 'danger' } };

export const Disabled: Story = { args: { disabled: true } };

export const LinkDisabled: Story = {
  name: 'Link (disabled)',
  args: { as: 'a', variant: 'secondary', disabled: true, label: '목록' },
};
