import type { NoteSummary } from '@/shared/api/notion';

// 공개 노트를 연결 프로젝트별로 묶는다 (프로젝트 id → 노트 목록, 들어온 순서 유지).
// 프로젝트 카드의 "N connected notes"와 상세의 Connected Notes가 같은 기준(공개 노트만)을 쓰게 한다.
// Notion 관계(project.noteIds)에는 Draft 노트도 들어 있어 그대로 세면 화면 숫자가 어긋난다.
export function groupNotesByProject(notes: NoteSummary[]): Map<string, NoteSummary[]> {
  const groups = new Map<string, NoteSummary[]>();
  for (const note of notes) {
    if (note.projectId === null) continue;
    const group = groups.get(note.projectId) ?? [];
    group.push(note);
    groups.set(note.projectId, group);
  }
  return groups;
}
