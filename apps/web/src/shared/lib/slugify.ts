// 화면 표시 이름을 URL용 slug로 바꾼다 (D5: 선택지 이름은 영문 라벨, slug는 코드에서 생성).
// 예: 'Next.js' → 'nextjs', 'React Hooks' → 'react-hooks', '이미지' → '이미지'
export function slugify(name: string): string {
  return name
    .normalize('NFKC')
    .toLowerCase()
    .replace(/\./g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/[^\p{L}\p{N}-]/gu, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
