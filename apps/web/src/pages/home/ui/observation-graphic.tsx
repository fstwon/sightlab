import styles from './observation-graphic.module.scss';

// 히어로 오른쪽의 관찰 그래픽 (Figma Hero / Observation Graphic). 장식이라 화면 낭독기에서 뺀다.
// 도형은 CSS로 그려 색을 토큰으로 쓰고, 크기는 비율(420×224)로 줄어들게 한다.
export function ObservationGraphic() {
  return (
    <div className={styles.graphic} aria-hidden="true">
      <p className={styles.words}>
        Observe
        <br />
        Document
        <br />
        Revisit
      </p>
      <span className={styles.orbit} />
      <span className={styles.ring} />
      <span className={styles.focus} />
    </div>
  );
}
