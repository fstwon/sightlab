import { SearchIcon } from '@/shared/ui/icon';

type HomeEmptyStateProps = {
  title: string;
  description: string;
};

// 홈 섹션에 보일 글이 없을 때 (Figma PUBLIC-01A·MOBILE-01A / Home · Empty).
// 공용 State UI의 빈 결과 마크업을 그대로 쓰고, 홈에서는 후속 버튼을 두지 않는다.
export function HomeEmptyState({ title, description }: HomeEmptyStateProps) {
  return (
    <div className="sl-state sl-state--empty" role="status">
      <span className="sl-state__icon">
        <SearchIcon aria-hidden="true" />
      </span>
      <div className="sl-state__copy">
        <p className="sl-state__title">{title}</p>
        <p className="sl-state__description">{description}</p>
      </div>
    </div>
  );
}
