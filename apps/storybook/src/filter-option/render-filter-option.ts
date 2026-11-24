import checkIcon from '@sightlab/icons/check.svg?raw';

export type FilterOptionArgs = {
  label: string;
  count: number;
  checked: boolean;
};

// 아이콘 SVG에 클래스와 aria-hidden을 붙인다 (@sightlab/icons는 SVG 파일만 제공).
const ICON = checkIcon.replace('<svg ', '<svg class="sl-filter-option__check" aria-hidden="true" ');

// 규칙 문서(filter-option.mdx)의 마크업과 같은 구조로 그린다.
export function renderFilterOption({ label, count, checked }: FilterOptionArgs): string {
  return `
    <label class="sl-filter-option">
      <input class="sl-filter-option__input" type="checkbox" name="tags" value="${label.toLowerCase()}"${checked ? ' checked' : ''} />
      <span class="sl-filter-option__box" aria-hidden="true">${ICON}</span>
      <span class="sl-filter-option__label">${label}</span>
      <span class="sl-filter-option__count">${count}</span>
    </label>`;
}
