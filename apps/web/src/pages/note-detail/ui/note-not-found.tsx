import Link from 'next/link';

import { SearchIcon } from '@/shared/ui/icon';

import styles from './note-state-page.module.scss';

// 노트를 찾을 수 없을 때 (Figma PUBLIC-03C / MOBILE-03E). 페이지에서 notFound()를 부르면 이 화면이 그려지고 상태 코드는 404.
// 공용 State UI의 빈 결과 모양을 쓴다.
export function NoteNotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.column}>
        <div className={`sl-state sl-state--empty ${styles.state}`} role="status">
          <span className="sl-state__icon">
            <SearchIcon aria-hidden="true" />
          </span>
          <div className="sl-state__copy">
            <h1 className="sl-state__title">Note를 찾을 수 없습니다.</h1>
            <p className="sl-state__description">
              요청한 Note가 삭제되었거나
              <br />
              주소가 변경되었을 수 있습니다.
            </p>
          </div>
          <Link className="sl-button sl-button--secondary" href="/notes">
            Notes로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
