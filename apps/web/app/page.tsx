'use client';

import { useState } from 'react';

type Experiment = {
  id: string;
  name: string;
  stack: string;
  description: string;
  accent: string;
};

const experiments: Experiment[] = [
  { id: 'vanillajs', name: 'VanillaJS', stack: 'JavaScript · Vite', description: '프레임워크 없이 DOM과 이벤트를 다루는 독립 실행 실험', accent: '#F3C04C' },
  { id: 'react', name: 'React', stack: 'React · TypeScript · Vite', description: '컴포넌트 상태와 렌더링 동작을 확인하는 독립 실행 실험', accent: '#61DAFB' },
  { id: 'vue', name: 'Vue.js', stack: 'Vue · TypeScript · Vite', description: '반응형 상태와 템플릿 렌더링을 확인하는 독립 실행 실험', accent: '#42B883' },
];

export default function HomePage() {
  const [selected, setSelected] = useState(experiments[0].id);
  const experiment = experiments.find((item) => item.id === selected)!;

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="/" aria-label="Sightlab 홈"><span className="brand-symbol">✳</span> sightlab<span className="brand-dot">.</span></a>
        <nav className="site-nav" aria-label="주 메뉴"><a className="active" href="#experiments">Experiments</a><span>Notes</span><span>Projects</span></nav>
        <span className="header-label">WEB PREVIEW / 01</span>
      </header>

      <main className="main-content" id="experiments">
        <div className="eyebrow"><span className="eyebrow-line" /> EXPERIMENT PLAYGROUND <span className="eyebrow-index">001 — 003</span></div>
        <div className="intro"><div><h1>Build. Explore.<br /><em>Observe.</em></h1><p>서로 다른 기술 환경에서 실행되는 실험을 한곳에서 확인하기 위한 Sightlab Web 미리보기입니다.</p></div><div className="intro-aside"><span className="status-dot" /> PREVIEW MODE<br /><small>실험 프로젝트 연결 전</small></div></div>

        <section className="workspace" aria-label="실험 미리보기">
          <aside className="experiment-sidebar"><div className="section-label">01 / SELECT EXPERIMENT</div><div className="experiment-list">{experiments.map((item, index) => <button type="button" className={`experiment-item ${selected === item.id ? 'selected' : ''}`} key={item.id} onClick={() => setSelected(item.id)} aria-pressed={selected === item.id}><span className="experiment-number">0{index + 1}</span><span className="experiment-name">{item.name}<small>{item.stack}</small></span><span className="experiment-arrow">↗</span></button>)}</div><div className="sidebar-note"><span>ABOUT THIS PREVIEW</span><p>선택한 프로젝트의 실행 화면이 이 영역에 표시될 예정입니다. 현재는 연결 구조 확인용 UI만 제공됩니다.</p></div></aside>

          <div className="viewer-column"><div className="viewer-heading"><div><div className="section-label">02 / EXPERIMENT VIEWER</div><h2>{experiment.name}<span className="heading-dot">.</span></h2><p>{experiment.description}</p></div><span className="stack-tag">{experiment.stack}</span></div><div className="viewer-frame"><div className="viewer-toolbar"><div className="window-dots"><i /><i /><i /></div><span>experiments/{experiment.id}</span><span className="toolbar-status">NOT CONNECTED</span></div><div className="viewer-placeholder"><div className="preview-mark" style={{ '--preview-accent': experiment.accent } as React.CSSProperties}>{experiment.name === 'VanillaJS' ? 'JS' : experiment.name === 'React' ? 'R' : 'V'}</div><div className="placeholder-eyebrow">EXPERIMENT OUTPUT</div><h3>{experiment.name} preview</h3><p>실험 프로젝트 연결 후 이 영역에<br />독립 실행 화면(iframe)이 표시됩니다.</p><span className="pending-label"><span className="pending-dot" /> Awaiting experiment</span></div></div><div className="viewer-footer"><span><strong>VIEW TYPE</strong> iframe (planned)</span><span><strong>STATUS</strong> Preview only</span></div></div>
        </section>
      </main>
      <footer className="site-footer"><span>© SIGHTLAB — EXPERIMENTS & OBSERVATIONS</span><span>PREVIEW BUILD</span></footer>
    </div>
  );
}
