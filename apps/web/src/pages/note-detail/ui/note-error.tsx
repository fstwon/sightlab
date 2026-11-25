'use client';

import { useRouter } from 'next/navigation';

import { AlertIcon } from '@/shared/ui/icon';

import styles from './note-state-page.module.scss';

// 노트를 그리다 오류가 났을 때 (Figma PUBLIC-03B / MOBILE-03D). app/notes/[slug]/error.tsx가 이 화면을 쓴다.
// 버튼을 눌러야 하므로 클라이언트 컴포넌트다. 오류 내용은 사용자에게 보여 주지 않는다.
export function NoteError() {
  const router = useRouter();

  // 이전 페이지가 있으면 그리로, 주소로 바로 들어와 이전 페이지가 없으면 Notes 목록으로 간다
  const goBack = () => {
    if (window.history.length > 1) router.back();
    else router.push('/notes');
  };

  return (
    <div className={styles.page}>
      {/* 오류 경계는 클라이언트 컴포넌트라 metadata를 쓸 수 없어, 탭 제목을 직접 넣는다 (React가 head로 옮김) */}
      <title>글을 불러오지 못했습니다 | Sightlab</title>
      <div className={styles.column}>
        <div className={`sl-state sl-state--error ${styles.state}`} role="alert">
          <span className="sl-state__icon">
            <AlertIcon aria-hidden="true" />
          </span>
          <div className="sl-state__copy">
            <h1 className="sl-state__title">글을 불러오지 못했습니다.</h1>
            <p className="sl-state__description">잠시 후 다시 시도해주세요.</p>
          </div>
          <button type="button" className="sl-button sl-button--primary" onClick={goBack}>
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
}
