// 연결 노트 개수 문구 (Figma Project Card "12 connected notes"). 1개일 때만 단수형.
export function formatConnectedNotes(count: number): string {
  return `${count} connected ${count === 1 ? 'note' : 'notes'}`;
}
