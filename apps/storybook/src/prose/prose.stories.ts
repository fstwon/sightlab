import type { Meta, StoryObj } from '@storybook/html-vite';

type ProseArgs = {
  width: number;
};

// 이미지 자리 (외부 주소 대신 회색 SVG)
const IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='720' height='360'%3E%3Crect width='100%25' height='100%25' fill='%23f0f0eb'/%3E%3C/svg%3E";

// 마크다운 변환기가 만드는 HTML과 같은 모양 (Notion 마크다운 → react-markdown, remark-gfm)
const SAMPLE = `
  <h2 id="context">Context를 분리한 기준</h2>
  <p>상태를 한곳에 모으는 것보다 <b>변경 이유</b>와 <i>소비 범위</i>를 기준으로 나누는 편이 구조를 이해하기 쉽습니다.
  자세한 내용은 <a href="https://react.dev">React 문서</a>와 <code>useContext</code>를 참고합니다.</p>
  <h3 id="scope">상태 변경 범위</h3>
  <ul>
    <li>변경 빈도가 같은 상태끼리 묶습니다.</li>
    <li>소비하는 컴포넌트가 다르면 Provider를 나눕니다.</li>
  </ul>
  <ol>
    <li>상태를 나열합니다.</li>
    <li>변경 이유별로 묶습니다.</li>
  </ol>
  <blockquote><p>좋은 구조는 상태의 위치가 아니라 변경의 이유를 드러냅니다.</p></blockquote>
  <ul class="contains-task-list">
    <li class="task-list-item"><input type="checkbox" checked disabled /> React 구조 설계</li>
    <li class="task-list-item"><input type="checkbox" checked disabled /> 컴포넌트 구현</li>
    <li class="task-list-item"><input type="checkbox" disabled /> API 연결</li>
  </ul>
  <table>
    <thead><tr><th>기준</th><th>예시</th></tr></thead>
    <tbody>
      <tr><td>변경 이유</td><td>테마, 로그인 사용자</td></tr>
      <tr><td>소비 범위</td><td>헤더만, 전체 화면</td></tr>
    </tbody>
  </table>
  <figure>
    <img src="${IMAGE}" alt="Context 상태와 소비 경계를 분리한 구조" width="720" height="360" />
    <figcaption>Figure 1. Context 상태와 소비 경계를 분리한 구조</figcaption>
  </figure>
  <hr />
  <p>마지막 문단입니다.</p>`;

function renderProse({ width }: ProseArgs): string {
  return `<div class="sl-prose" style="max-width: ${width}px">${SAMPLE}</div>`;
}

// CSF 형식상 meta는 default export (D10 named export 규칙의 예외)
const meta = {
  title: 'Components/Prose',
  render: renderProse,
  // Figma 본문 폭: 데스크톱 720px, 모바일 342px
  args: { width: 720 },
  argTypes: { width: { control: { type: 'range', min: 320, max: 960, step: 2 } } },
} satisfies Meta<ProseArgs>;

export default meta;

type Story = StoryObj<ProseArgs>;

export const Desktop: Story = {};

export const Mobile: Story = {
  args: { width: 342 },
};
