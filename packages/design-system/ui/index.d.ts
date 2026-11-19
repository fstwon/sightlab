// CSS 진입점("." → dist/index.css)을 TypeScript에서 side-effect import할 때 쓰는 빈 타입 선언.
// TS 6은 side-effect import의 대상 타입도 검사하며, 패키지 이름만 쓴 import는 *.css 선언에 걸리지 않는다.
export {};
