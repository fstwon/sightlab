import styles from './project-preview.module.scss';

type ProjectPreviewProps = {
  title: string;
  // 미리보기 이미지 (Blob 주소). 없으면 자리 표시를 그린다.
  imageUrl: string | null;
};

// 프로젝트 미리보기 (Figma PUBLIC-05 / MOBILE-05 Project Preview).
// 이미지가 있으면 영역을 이미지로 채우고, 없으면 프로젝트 이름(대문자) + 관찰 링 자리 표시.
// 제목은 위 h1과 같고 이미지도 같은 내용이라 둘 다 장식으로 숨긴다.
export function ProjectPreview({ title, imageUrl }: ProjectPreviewProps) {
  if (imageUrl) {
    return (
      <div className={`${styles.preview} ${styles.withImage}`}>
        {/* eslint-disable-next-line @next/next/no-img-element -- Blob 주소를 그대로 쓴다 (이미지 최적화 한도·설정 없이) */}
        <img className={styles.image} src={imageUrl} alt="" />
      </div>
    );
  }

  return (
    <div className={styles.preview} aria-hidden="true">
      <span className={styles.name}>{title}</span>
      <span className={styles.ring}>
        <span className={styles.focus} />
      </span>
    </div>
  );
}
