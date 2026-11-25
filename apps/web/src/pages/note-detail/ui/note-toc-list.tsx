import type { TocItem } from '@/entities/note';

type NoteTocListProps = {
  items: TocItem[];
  activeId: string | null;
  className?: string | undefined;
  // 항목을 누른 뒤 할 일 (접는 목차는 목차를 접는다). 이동은 링크 기본 동작이 한다.
  onItemClick?: () => void;
};

// 목차 항목 목록 (공용 TOC Item). 데스크톱 목차와 접는 목차가 함께 쓴다.
// 현재 항목에는 모양(--active)과 화면 낭독기용 aria-current를 함께 붙인다.
export function NoteTocList({ items, activeId, className, onItemClick }: NoteTocListProps) {
  return (
    <ol className={className}>
      {items.map((item) => {
        const isActive = item.id === activeId;
        const classNames = ['sl-toc-item'];
        if (item.level === 3) classNames.push('sl-toc-item--h3');
        if (isActive) classNames.push('sl-toc-item--active');

        return (
          <li key={item.id}>
            <a
              className={classNames.join(' ')}
              href={`#${item.id}`}
              aria-current={isActive ? 'location' : undefined}
              onClick={onItemClick}
            >
              {item.text}
            </a>
          </li>
        );
      })}
    </ol>
  );
}
