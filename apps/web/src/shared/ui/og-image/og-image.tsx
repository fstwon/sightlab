// OG 이미지 틀 (Figma 04. Public · OG Images 502:719). Satori가 그리므로 flexbox와 인라인 style만 쓴다.
// 색은 Light 토큰 값을 옮겨 적는다 (Satori는 CSS 변수를 읽지 못함).
export const OG_COLORS = {
  canvas: '#f7f7f4', // bg/canvas
  brandSoft: '#ede8fa', // bg/brand-soft
  primary: '#6535d8', // action/primary, text/brand
  accent: '#f2a74b', // accent/default
  textPrimary: '#181a1b', // text/primary
  textSecondary: '#686b70', // text/secondary
} as const;

export type OgImageContent = {
  // 제목 위 작은 글 (예: "Note · React"). 대문자로 바꿔 그린다.
  eyebrow: string;
  // 2줄을 넘으면 말줄임
  title: string;
  // 1줄을 넘으면 말줄임
  summary?: string;
  // 아래 줄 (예: "연재 #2 · 2026.11.26")
  meta?: string;
};

type OgImageProps = OgImageContent & {
  fontFamily: string;
  logoSymbolSrc: string;
};

const circle = { position: 'absolute', borderRadius: 9999 } as const;

export function OgImage({
  eyebrow,
  title,
  summary,
  meta,
  fontFamily,
  logoSymbolSrc,
}: OgImageProps) {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
        backgroundColor: OG_COLORS.canvas,
        fontFamily,
        color: OG_COLORS.textPrimary,
        wordBreak: 'keep-all',
      }}
    >
      {/* 관찰 그래픽: 연보라 큰 원 → 보라 링 → 주황 점 (그리는 순서대로 겹침) */}
      <div
        style={{
          ...circle,
          left: 930,
          top: 300,
          width: 420,
          height: 420,
          backgroundColor: OG_COLORS.brandSoft,
        }}
      />
      <div
        style={{
          ...circle,
          left: 860,
          top: 150,
          width: 220,
          height: 220,
          border: `10px solid ${OG_COLORS.primary}`,
        }}
      />
      <div
        style={{
          ...circle,
          left: 940,
          top: 230,
          width: 60,
          height: 60,
          backgroundColor: OG_COLORS.accent,
        }}
      />
      {/* 사이트 위쪽 테두리와 같은 보라 막대 */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: 8,
          backgroundColor: OG_COLORS.primary,
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 80,
          top: 72,
          width: 700,
          height: 486,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* 로고 Type=Primary를 1.25배 (심볼 45px, 글자 35px) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori는 next/image를 그리지 못한다 */}
          <img src={logoSymbolSrc} width={45} height={45} alt="" />
          <span style={{ fontSize: 35, fontWeight: 700, lineHeight: 1 }}>Sightlab</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              fontSize: 20,
              fontWeight: 500,
              lineHeight: 1.3,
              letterSpacing: 1,
              color: OG_COLORS.primary,
              textTransform: 'uppercase',
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: 'block',
              fontSize: 60,
              fontWeight: 700,
              lineHeight: 1.25,
              lineClamp: 2,
              textOverflow: 'ellipsis',
            }}
          >
            {title}
          </div>
          {summary ? (
            <div
              style={{
                display: 'block',
                fontSize: 26,
                fontWeight: 500,
                lineHeight: 1.4,
                color: OG_COLORS.textSecondary,
                lineClamp: 1,
                textOverflow: 'ellipsis',
              }}
            >
              {summary}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 20,
            fontWeight: 500,
            lineHeight: 1.3,
            letterSpacing: 1,
            color: OG_COLORS.textSecondary,
          }}
        >
          {meta ?? ''}
        </div>
      </div>
    </div>
  );
}
