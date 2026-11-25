import styles from './project-preview.module.scss';

type ProjectPreviewProps = {
  title: string;
};

// 미리보기 자리 표시 (Figma PUBLIC-05 / MOBILE-05 Project Preview): 프로젝트 이름(대문자) + 관찰 링.
// 미리보기 이미지는 Notion 주소가 1시간 뒤 만료되어 asset-storage 작업 이후 이 자리에 붙인다.
// 제목은 위 h1과 같아 장식으로 숨긴다.
export function ProjectPreview({ title }: ProjectPreviewProps) {
  return (
    <div className={styles.preview} aria-hidden="true">
      <span className={styles.name}>{title}</span>
      <span className={styles.ring}>
        <span className={styles.focus} />
      </span>
    </div>
  );
}
