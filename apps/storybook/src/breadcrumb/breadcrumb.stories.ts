import type { Meta, StoryObj } from '@storybook/html-vite';

type Crumb = { label: string; href?: string };

type BreadcrumbArgs = {
  items: Crumb[];
  compact: boolean;
};

// 규칙 문서(breadcrumb.mdx)의 마크업과 같은 구조로 그린다. 마지막 항목이 현재 위치.
function renderBreadcrumb({ items, compact }: BreadcrumbArgs): string {
  const classes = ['sl-breadcrumb'];
  if (compact) classes.push('sl-breadcrumb--compact');

  const lastIndex = items.length - 1;
  const crumbs = items
    .map(({ label, href }, index) =>
      index === lastIndex
        ? `<li class="sl-breadcrumb__item"><span class="sl-breadcrumb__current" aria-current="page">${label}</span></li>`
        : `<li class="sl-breadcrumb__item"><a class="sl-breadcrumb__link" href="${href ?? '#'}">${label}</a></li>`,
    )
    .join('');

  return `<nav aria-label="현재 위치"><ol class="${classes.join(' ')}">${crumbs}</ol></nav>`;
}

const NOTE_PATH: Crumb[] = [
  { label: 'Notes', href: '/notes' },
  { label: 'React', href: '/notes?tag=react' },
  { label: 'Context API' },
];

const LONG_PATH: Crumb[] = [
  { label: 'Projects', href: '/projects' },
  { label: 'Sightlab', href: '/projects/sightlab' },
  { label: 'Architecture', href: '/projects/sightlab/architecture' },
  { label: 'Authentication' },
];

// CSF 형식상 meta는 default export (D10 named export 규칙의 예외)
const meta = {
  title: 'Components/Breadcrumb',
  render: renderBreadcrumb,
  args: { items: NOTE_PATH, compact: false },
} satisfies Meta<BreadcrumbArgs>;

export default meta;

type Story = StoryObj<BreadcrumbArgs>;

export const Default: Story = {};

export const LongPath: Story = { name: 'Long path', args: { items: LONG_PATH } };

export const Compact: Story = { args: { items: LONG_PATH, compact: true } };
