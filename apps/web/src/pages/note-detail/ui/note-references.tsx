import type { Reference } from '@/entities/note';

import styles from './note-references.module.scss';

type NoteReferencesProps = {
  references: Reference[];
};

// 본문 아래 참고 자료 (Figma PUBLIC-03 / MOBILE-03 References): 번호 · 출처 · 제목 링크.
// 다른 사이트로 가는 링크라 새 탭으로 열고, 화면 낭독기에는 새 탭에서 열린다는 것을 알린다.
export function NoteReferences({ references }: NoteReferencesProps) {
  return (
    <section className={styles.references} aria-labelledby="note-references-title">
      <h2 id="note-references-title" className={styles.title}>
        References
      </h2>
      <ol className={styles.list}>
        {references.map((reference, index) => (
          <li key={reference.url} className={styles.item}>
            <span className={styles.number} aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className={styles.body}>
              <p className={styles.source}>{reference.source}</p>
              <a
                className={styles.link}
                href={reference.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {reference.title}
                <span aria-hidden="true"> ↗</span>
                <span className={styles.hidden}> (새 탭에서 열림)</span>
              </a>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
