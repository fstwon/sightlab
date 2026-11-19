import searchIcon from '@sightlab/icons/search.svg?raw';
import type { Meta, StoryObj } from '@storybook/html-vite';

type SearchArgs = {
  placeholder: string;
  value: string;
  disabled: boolean;
};

// 아이콘 SVG에 클래스와 aria-hidden을 붙인다 (@sightlab/icons는 SVG 파일만 제공).
const ICON = searchIcon.replace('<svg ', '<svg class="sl-search__icon" aria-hidden="true" ');

// 규칙 문서(search.mdx)의 마크업과 같은 구조로 그린다.
function renderSearch({ placeholder, value, disabled }: SearchArgs): string {
  const classes = ['sl-search'];
  if (disabled) classes.push('sl-search--disabled');

  return `
    <label class="${classes.join(' ')}">
      ${ICON}
      <input class="sl-search__input" type="search" placeholder="${placeholder}" aria-label="${placeholder}" value="${value}"${disabled ? ' disabled' : ''} />
    </label>`;
}

// CSF 형식상 meta는 default export (D10 named export 규칙의 예외)
const meta = {
  title: 'Components/Search',
  render: renderSearch,
  args: { placeholder: '노트 검색', value: '', disabled: false },
  parameters: { layout: 'padded' },
  // 입력란은 컨테이너 폭을 채우므로 Figma 예시 폭(420px)으로 감싸 보여 준다.
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
} satisfies Meta<SearchArgs>;

export default meta;

type Story = StoryObj<SearchArgs>;

export const Default: Story = {};

export const Filled: Story = { args: { value: '디자인 토큰' } };

export const Disabled: Story = { args: { disabled: true } };
