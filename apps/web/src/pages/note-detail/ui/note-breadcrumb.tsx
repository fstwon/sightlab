import Link from 'next/link';

import styles from './note-breadcrumb.module.scss';

type NoteBreadcrumbProps = {
  category: string;
  title: string;
};

// 노트 상세 위치: Notes / 카테고리 / 글 제목 (공용 Breadcrumb).
// 카테고리는 Notes 목록에 카테고리 필터가 없어 링크 없이 글자로 둔다.
export function NoteBreadcrumb({ category, title }: NoteBreadcrumbProps) {
  return (
    <nav aria-label="현재 위치" className={styles.breadcrumb}>
      <ol className="sl-breadcrumb">
        <li className="sl-breadcrumb__item">
          <Link className="sl-breadcrumb__link" href="/notes">
            Notes
          </Link>
        </li>
        <li className="sl-breadcrumb__item">{category}</li>
        <li className="sl-breadcrumb__item">
          <span className="sl-breadcrumb__current" aria-current="page">
            {title}
          </span>
        </li>
      </ol>
    </nav>
  );
}
