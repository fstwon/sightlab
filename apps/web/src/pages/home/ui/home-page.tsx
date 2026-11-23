import styles from './home-page.module.scss';

// 임시 홈: 레이아웃·토큰 연결 확인용. 실제 홈은 Figma 04 Public 화면을 기준으로 만든다.
export function HomePage() {
  return (
    <div className={styles.page}>
      <h1>Sightlab</h1>
      <p>배우고 기록하고 다시 보는 학습 블로그</p>
      <button type="button" className="sl-button sl-button--primary">
        준비 중
      </button>
    </div>
  );
}
