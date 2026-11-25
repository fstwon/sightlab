import Link from 'next/link';

import { SearchIcon } from '@/shared/ui/icon';

import styles from './project-not-found.module.scss';

// 프로젝트를 찾을 수 없을 때 (Figma PUBLIC-05A / MOBILE-05A). 페이지에서 notFound()를 부르면 그려지고 상태 코드는 404.
// 노트 404와 같은 모양 (공용 State UI 빈 결과).
export function ProjectNotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.column}>
        <div className={`sl-state sl-state--empty ${styles.state}`} role="status">
          <span className="sl-state__icon">
            <SearchIcon aria-hidden="true" />
          </span>
          <div className="sl-state__copy">
            <h1 className="sl-state__title">Project를 찾을 수 없습니다.</h1>
            <p className="sl-state__description">
              요청한 Project가 비공개로 바뀌었거나
              <br />
              주소가 변경되었을 수 있습니다.
            </p>
          </div>
          <Link className="sl-button sl-button--secondary" href="/projects">
            Projects로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
