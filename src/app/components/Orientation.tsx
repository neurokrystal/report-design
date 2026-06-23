import { Layers, Clock } from 'lucide-react';

// Shared header style used by every section
const SERIF = '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif';
const NAV_ORANGE = '#FF5A1F';

// ── Correct three-diamond mark (equal rhombuses, triangular arrangement) ──
function DimensionalShapeIcon({ color, size = 68 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      {/* Top diamond */}
      <polygon
        points="40,6 55,22 40,38 25,22"
        stroke={color} strokeWidth="1.3" strokeLinejoin="round" fill="none"
      />
      {/* Bottom-left diamond */}
      <polygon
        points="26,40 41,56 26,72 11,56"
        stroke={color} strokeWidth="1.3" strokeLinejoin="round" fill="none"
      />
      {/* Bottom-right diamond */}
      <polygon
        points="54,40 69,56 54,72 39,56"
        stroke={color} strokeWidth="1.3" strokeLinejoin="round" fill="none"
      />
    </svg>
  );
}

// ── Full-area graphic ──
function DimensionalGraphic() {
  return (
    <svg
      viewBox="0 0 400 680"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      style={{ display: 'block' }}
    >
      <polygon points="200,18 388,352 12,352" fill="#DC4C0C" />
      <polygon points="12,352 200,662 200,352"  fill="#42A68E" />
      <polygon points="388,352 200,662 200,352" fill="#FFAB00" />
      <polygon points="200,160 296,352 104,352" fill="rgba(255,255,255,0.06)" />
      <line x1="200" y1="18"  x2="200" y2="352" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
      <line x1="12"  y1="352" x2="388" y2="352" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
      <text x="200" y="225" textAnchor="middle" fill="white" fontSize="11" fontWeight="400" letterSpacing="5" opacity="0.6">CHALLENGE</text>
      <text x="98"  y="540" textAnchor="middle" fill="white" fontSize="11" fontWeight="400" letterSpacing="4" opacity="0.6">SAFETY</text>
      <text x="302" y="540" textAnchor="middle" fill="white" fontSize="11" fontWeight="400" letterSpacing="4" opacity="0.6">PLAY</text>
    </svg>
  );
}

const concepts = [
  {
    renderIcon: (c: string) => <Layers style={{ width: '68px', height: '68px', color: c, strokeWidth: 1.3 }} />,
    title: "YOUR PSYCHOLOGICAL FOUNDATION",
    body: "Three domains govern how you function: Safety, Play, and Challenge. Together they form a strong foundation, providing you ease and confidence, energy and adaptability to overcome difficulty, and a clear sense of direction and meaning in your life.",
    accent: "#DC4C0C",
  },
  {
    renderIcon: (c: string) => <DimensionalShapeIcon color={c} size={68} />,
    title: "YOUR SHAPE",
    body: "These three domains sit together to form your shape. Whether each one is balanced or developing, they interact with each other to drive how you function at work, in your relationships, and under pressure.",
    accent: "#42A68E",
  },
  {
    renderIcon: (c: string) => <Clock style={{ width: '68px', height: '68px', color: c, strokeWidth: 1.3 }} />,
    title: "YOUR SEASON",
    body: "This reading captures how you are experiencing this current season of life. Your psychological foundation can be built and strengthened. It will support you through the changes life brings and every decision you make.",
    accent: "#FFAB00",
  },
];

export function Orientation() {
  const goToDomains = () =>
    document.getElementById('your-domains')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="grid lg:grid-cols-5 gap-0 min-h-[90vh] items-start">

      {/* ── LEFT CONTENT (60%) ── */}
      <div className="lg:col-span-3 pr-0 lg:pr-14 py-2">

        {/* Section number — left-aligned with title */}
        <p style={{
          color: NAV_ORANGE,
          fontWeight: 800,
          letterSpacing: '0.16em',
          fontSize: '11px',
          marginBottom: '30px',
          textTransform: 'uppercase',
        }}>
          01 Overview
        </p>

        {/* Heading */}
        <h1 style={{
          fontFamily: SERIF,
          fontWeight: 600,
          letterSpacing: '-0.03em',
          fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
          color: '#0F0F0F',
          whiteSpace: 'nowrap',
          margin: 0,
          marginBottom: '30px',
        }}>
          Your Dimensional Profile
        </h1>

        {/* Orange divider line */}
        <div style={{ width: '40px', height: '3px', backgroundColor: NAV_ORANGE, marginTop: '30px', marginBottom: '32px' }} />

        {/* Intro paragraph — below the divider */}
        <p style={{ fontWeight: 300, fontSize: '15px', lineHeight: 1.7, color: '#1A1614', marginBottom: '40px', maxWidth: '520px' }}>
          This is a reading of your psychological foundations: the deeper structure that shapes the unique way you think, feel, and act. When you understand your inner foundations, you gain the critical clarity needed for precise and meaningful growth.
        </p>

        {/* Concept cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', marginBottom: '52px' }}>
          {concepts.map((c) => (
            <ConceptCard key={c.title} renderIcon={c.renderIcon} title={c.title} body={c.body} accent={c.accent} />
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={goToDomains}
          className="bg-[#1A1614] text-white px-8 py-3 rounded-full text-sm tracking-wide hover:bg-[#2E2926] transition-colors"
        >
          Begin the reading →
        </button>
      </div>

      {/* ── RIGHT GRAPHIC (40%) ── */}
      <div className="hidden lg:block lg:col-span-2 sticky top-8 h-[calc(100vh-4rem)] overflow-hidden translate-x-32 xl:translate-x-44" style={{ backgroundColor: '#F0EDE8' }}>
        <div className="h-full w-full translate-y-24 scale-[0.62]">
          <DimensionalGraphic />
        </div>
      </div>

    </div>
  );
}

interface ConceptCardProps {
  renderIcon: (color: string) => React.ReactNode;
  title: string;
  body: string;
  accent: string;
}

function SoftPentagonBg({ color, size }: { color: string; size: number }) {
  const cx = size / 2, cy = size / 2, r = size * 0.43, cr = size * 0.09;
  const angle = (i: number) => ((i * 72) - 90) * Math.PI / 180;
  const pts = Array.from({ length: 5 }, (_, i) => ({
    x: cx + r * Math.cos(angle(i)),
    y: cy + r * Math.sin(angle(i)),
  }));
  const path = pts.map((v, i) => {
    const prev = pts[(i + 4) % 5];
    const next = pts[(i + 1) % 5];
    const d1 = Math.hypot(v.x - prev.x, v.y - prev.y);
    const d2 = Math.hypot(v.x - next.x, v.y - next.y);
    const t1 = Math.min(cr / d1, 0.45);
    const t2 = Math.min(cr / d2, 0.45);
    const p1x = v.x + (prev.x - v.x) * t1, p1y = v.y + (prev.y - v.y) * t1;
    const p2x = v.x + (next.x - v.x) * t2, p2y = v.y + (next.y - v.y) * t2;
    if (i === 0) return `M ${p1x.toFixed(1)},${p1y.toFixed(1)} Q ${v.x.toFixed(1)},${v.y.toFixed(1)} ${p2x.toFixed(1)},${p2y.toFixed(1)}`;
    return `L ${p1x.toFixed(1)},${p1y.toFixed(1)} Q ${v.x.toFixed(1)},${v.y.toFixed(1)} ${p2x.toFixed(1)},${p2y.toFixed(1)}`;
  }).join(' ') + ' Z';
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: 'absolute', top: 0, left: 0 }}>
      <path d={path} fill={`${color}18`} />
    </svg>
  );
}

function ConceptCard({ renderIcon, title, body, accent }: ConceptCardProps) {
  const iconSize = 112;
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '38px' }}>
      {/* Icon — soft pentagon background */}
      <div style={{
        flexShrink: 0,
        width: `${iconSize}px`,
        height: `${iconSize}px`,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <SoftPentagonBg color={accent} size={iconSize} />
        <div style={{ position: 'relative', zIndex: 1, padding: '22px' }}>
          {renderIcon(accent)}
        </div>
      </div>

      {/* Text */}
      <div style={{ flex: 1, paddingTop: '8px' }}>
        <h3 style={{
          color: '#0F0F0F',
          fontWeight: 700,
          fontSize: '15px',
          letterSpacing: '0.10em',
          marginBottom: '10px',
        }}>
          {title}
        </h3>
        <p style={{
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: 1.7,
          color: '#1A1614',
        }}>
          {body}
        </p>
      </div>
    </div>
  );
}
