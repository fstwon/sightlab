import checkIcon from '@sightlab/icons/check.svg?raw';
import copyIcon from '@sightlab/icons/copy.svg?raw';
import type { Meta, StoryObj } from '@storybook/html-vite';

type CodeBlockArgs = {
  language: string;
  code: string;
  copied: boolean;
};

const TYPESCRIPT = `type Note = { id: string; title: string };

const visibleNotes = notes.filter((note) =>
  selectedTags.every((tag) =>
    note.tags.includes(tag)
  )
);`;

const escapeHtml = (text: string) =>
  text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

const icon = (svg: string) =>
  svg.replace('<svg ', '<svg aria-hidden="true" width="14" height="14" ');

// 규칙 문서(code-block.mdx)의 마크업과 같은 구조로 그린다. 줄마다 sl-code-block__line으로 감싼다.
function renderCodeBlock({ language, code, copied }: CodeBlockArgs): string {
  const lines = code
    .split('\n')
    .map((line) => `<span class="sl-code-block__line">${escapeHtml(line)}</span>`)
    .join('\n');
  return `
    <figure class="sl-code-block${copied ? ' sl-code-block--copied' : ''}">
      <figcaption class="sl-code-block__header">
        <span>${language}</span>
        <button type="button" class="sl-code-block__copy">
          ${copied ? `Copied ${icon(checkIcon)}` : `Copy ${icon(copyIcon)}`}
        </button>
      </figcaption>
      <div class="sl-code-block__body" tabindex="0">
        <pre class="sl-code-block__code"><code>${lines}</code></pre>
      </div>
    </figure>`;
}

// CSF 형식상 meta는 default export (D10 named export 규칙의 예외)
const meta = {
  title: 'Components/Code Block',
  render: renderCodeBlock,
  args: { language: 'typescript', code: TYPESCRIPT, copied: false },
  argTypes: { code: { control: 'text' } },
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
} satisfies Meta<CodeBlockArgs>;

export default meta;

type Story = StoryObj<CodeBlockArgs>;

export const Default: Story = {};

export const Copied: Story = { args: { copied: true } };

export const LongLine: Story = {
  name: 'Long line (scroll)',
  args: {
    language: 'java',
    code: 'public final class NoteRepository implements Repository<Note, String> { /* 아주 긴 한 줄은 코드 영역만 가로로 스크롤한다 */ }',
  },
};
