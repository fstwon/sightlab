# Content metadata types

Sightlab 콘텐츠 타입 정의 패키지.

## 콘텐츠 디렉터리

- `experiments/[slug]/experiment.json`: 실험 메타데이터
- `content/projects/[slug].md`: 프로젝트 소개
- `content/notes/[slug].md`: 기술 노트

slug는 파일명 또는 디렉터리명에서 생성.

## 관계

- Project는 여러 Experiment를 참조 가능
- Note는 여러 Project와 Experiment를 참조 가능
- 독립적인 Experiment 및 Note 허용

## 정책

- 스키마 버전: 1
- 공개 상태: draft / published
- publishedAt: 공개 Project 및 Note에서 필수, 최초 공개일 유지
- updatedAt: 선택적 수정일
- runtime과 viewer는 독립적인 설정

이 패키지는 정적 타입만 제공. 런타임 검증, 파일 탐색, slug 중복 검사 및 참조 무결성 검사는 후속 Collector 단계에서 구현.

## 검사

```bash
pnpm --filter @sightlab/content typecheck
pnpm --filter @sightlab/content lint
```
