import type { Element, Root, RootContent } from 'hast';

// 표 요소 안에는 글자를 둘 수 없다 (HTML 규칙). Notion은 표를 줄바꿈이 섞인 HTML로 보내서
// <tr>, <colgroup> 등 바로 아래에 공백 글자가 생기고, React가 잘못된 구조로 경고한다.
const TABLE_PARTS = new Set(['table', 'thead', 'tbody', 'tfoot', 'tr', 'colgroup']);

const isBlankText = (node: RootContent) => node.type === 'text' && node.value.trim() === '';

function clean(node: Root | Element): void {
  if (node.type === 'element' && TABLE_PARTS.has(node.tagName)) {
    node.children = node.children.filter((child) => !isBlankText(child));
  }
  for (const child of node.children) {
    if (child.type === 'element') clean(child);
  }
}

// rehype 플러그인: 표 요소 바로 아래의 공백 글자를 지운다 (셀 안의 글자는 그대로)
export function rehypeTableWhitespace() {
  return (tree: Root) => {
    clean(tree);
  };
}
