import { motion } from 'motion/react';
import { useState } from 'react';

const SERIF = '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif';
const NAV_ORANGE = '#FF5A1F';
const SAFETY = '#42A68E';
const PLAY = '#FFAB00';
const CHALLENGE = '#DC4C0C';
const INK = '#15110F';

const PROFILE = {
  Safety: 27,
  Challenge: 78,
  Play: 41,
} as const;

const movements = [
  {
    id: 'gives',
    kicker: 'What it gives',
    title: 'A real engine.',
    copy:
      "Your drive makes you capable in a way most people aren't. You set a direction and move on it. You deliver when it matters, and people rely on you because you've earned it.",
    note:
      "This isn't a flaw dressed up as a strength. It is a genuine engine, and you'd be right not to want to lose it.",
    accent: CHALLENGE,
  },
  {
    id: 'costs',
    kicker: 'What it costs',
    title: 'A larger trade than it first appears.',
    copy:
      "Rest does not fully restore you. Stopping can feel unsafe, so you do not stop for long. Over time, what you know about yourself can narrow to what you do.",
    note:
      "At your level, this has likely moved past the daily cost toward the deeper one: there is less underneath to stand on when output is not available.",
    accent: SAFETY,
  },
  {
    id: 'loop',
    kicker: 'The loop',
    title: 'A real strength, aimed at a target it cannot reach.',
    copy:
      "You reach for drive to feel steady. Achievement delivers the hit and not the thing. It fades, the need underneath is still there, and the system reaches for the next goal.",
    note:
      "The effort is real. The problem is not the effort. It is where the effort is pointed.",
    accent: PLAY,
  },
] as const;

const dailyCosts = [
  "Rest does not fully restore you.",
  "Stopping can feel unsafe.",
  "The system spends more than it takes back.",
  "Some relationships and interests get less of you.",
];

const sustainingBeliefs = [
  "If you ease off, you'll lose your edge.",
  "If you let yourself feel content, the drive will go quiet.",
  "Comfort is for people who've settled for less.",
];

export function HowFoundationsWork() {
  const [activeMovement, setActiveMovement] = useState<(typeof movements)[number]['id']>('gives');
  const active = movements.find(movement => movement.id === activeMovement) ?? movements[0];

  return (
    <div className="space-y-14">
      <header>
        <p className="mb-[30px] text-[11px] font-extrabold uppercase tracking-[0.16em]" style={{ color: NAV_ORANGE }}>
          07 Integration
        </p>
        <h1
          style={{
            fontFamily: SERIF,
            fontWeight: 600,
            letterSpacing: '-0.03em',
            fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
            color: '#0F0F0F',
            marginBottom: '30px',
          }}
        >
          How Your Foundations Work Together
        </h1>
        <div className="h-[3px] w-10" style={{ backgroundColor: NAV_ORANGE }} />
      </header>

      <section className="relative -mx-4 overflow-hidden px-4 pb-4 pt-2 md:-mx-8 md:px-8 lg:pb-10 lg:pt-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_26%_20%,rgba(220,76,12,0.10),transparent_31%),radial-gradient(circle_at_74%_34%,rgba(255,171,0,0.12),transparent_35%),radial-gradient(circle_at_48%_92%,rgba(66,166,142,0.13),transparent_38%)]" />
        <motion.div
          className="pointer-events-none absolute left-[43%] top-[22%] h-[620px] w-[620px] rounded-full border border-[#E5DCCF]/55"
          animate={{ scale: [0.98, 1.04, 0.98], opacity: [0.34, 0.72, 0.34] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative mx-auto max-w-[1080px]">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
            <div>
              <h2
                className="max-w-[620px]"
                style={{
                  fontFamily: SERIF,
                  fontSize: 'clamp(3rem, 6vw, 6.35rem)',
                  lineHeight: 0.91,
                  letterSpacing: '-0.065em',
                  color: INK,
                }}
              >
                Not three scores. One repeating system.
              </h2>
              <p className="mt-9 max-w-[600px] text-[19px] leading-[1.8] text-[#332E29]" style={{ fontWeight: 300 }}>
                Your three domains do not sit side by side. They work on each other, and together they produce one pattern you have been living inside without quite seeing its shape.
              </p>
              <p className="mt-5 max-w-[570px] text-[17px] leading-[1.75] text-[#5A534C]" style={{ fontWeight: 300 }}>
                Challenge leads. Safety and Play sit well below it. That gap is not just three scores - it is a system with one part doing most of the work.
              </p>
            </div>

            <SystemPatternVisual activeMovement={activeMovement} />
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {movements.map(movement => {
              const isActive = movement.id === activeMovement;
              return (
                <button
                  key={movement.id}
                  type="button"
                  onMouseEnter={() => setActiveMovement(movement.id)}
                  onClick={() => setActiveMovement(movement.id)}
                  className="group relative min-h-[310px] overflow-hidden border bg-[#FFFDF9]/78 p-7 text-left shadow-[0_22px_70px_-58px_rgba(27,22,18,0.55)] transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/20"
                  style={{
                    borderColor: isActive ? `${movement.accent}88` : '#E4DACE',
                    borderTopWidth: 3,
                  }}
                >
                  <motion.div
                    className="pointer-events-none absolute inset-x-0 top-0 h-[62%]"
                    style={{
                      background: `radial-gradient(circle at 50% 8%, ${movement.accent}24, transparent 64%)`,
                    }}
                    animate={{ opacity: isActive ? 1 : 0.34 }}
                    transition={{ duration: 0.28 }}
                  />
                  <div className="relative">
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.17em]" style={{ color: movement.accent }}>
                      {movement.kicker}
                    </p>
                    <h3
                      className="mt-5 max-w-[310px]"
                      style={{
                        fontFamily: SERIF,
                        fontSize: 'clamp(2rem, 2.7vw, 2.65rem)',
                        lineHeight: 1.02,
                        letterSpacing: '-0.045em',
                        color: INK,
                      }}
                    >
                      {movement.title}
                    </h3>
                    <p className="mt-6 text-[16px] leading-[1.72] text-[#3E3832]" style={{ fontWeight: 300 }}>
                      {movement.copy}
                    </p>
                    <p
                      className="mt-6 border-l pl-4 text-[17px] leading-[1.5] text-[#1E1915]"
                      style={{ borderColor: `${movement.accent}70`, fontFamily: SERIF }}
                    >
                      {movement.note}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="bg-[#17120F] p-8 text-white shadow-[0_32px_90px_-70px_rgba(20,15,12,0.95)]">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#FFBB30]">What the cost is made of</p>
              <div className="mt-7 grid gap-8 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <div>
                  <p className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-[#BFB7AD]">Day to day</p>
                  <ul className="mt-4 space-y-3">
                    {dailyCosts.map(item => (
                      <li key={item} className="text-[15.5px] leading-relaxed text-[#F2E9DD]" style={{ fontWeight: 300 }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-[#BFB7AD]">Why it persists</p>
                  <ul className="mt-4 space-y-3">
                    {sustainingBeliefs.map(item => (
                      <li key={item} className="text-[15.5px] leading-relaxed text-[#F2E9DD]" style={{ fontWeight: 300 }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden border border-[#E5DACE] bg-[#FFFDF9]/86 p-8">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_10%,rgba(220,76,12,0.14),transparent_35%),radial-gradient(circle_at_12%_95%,rgba(66,166,142,0.14),transparent_42%)]" />
              <div className="relative">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.18em]" style={{ color: PLAY }}>
                  The connection
                </p>
                <h3
                  className="mt-5 max-w-[680px]"
                  style={{
                    fontFamily: SERIF,
                    fontSize: 'clamp(2.25rem, 3.6vw, 3.85rem)',
                    lineHeight: 1,
                    letterSpacing: '-0.055em',
                    color: INK,
                  }}
                >
                  The benefit and the cost are the same transaction, repeating.
                </h3>
                <p className="mt-7 max-w-[680px] text-[17px] leading-[1.78] text-[#332E29]" style={{ fontWeight: 300 }}>
                  You reach for drive to feel steady, and to feel that you are enough. But steadiness and worth were never drive's to give. Achievement delivers the hit and not the thing. It fades, and the need underneath is still there. So you set the next goal, and the next.
                </p>
              </div>
            </div>
          </div>

          <BeliefHinge />
        </div>
      </section>
    </div>
  );
}

function SystemPatternVisual({ activeMovement }: { activeMovement: (typeof movements)[number]['id'] }) {
  const isGift = activeMovement === 'gives';
  const isCost = activeMovement === 'costs';
  const isLoop = activeMovement === 'loop';
  const points = radarPoints(PROFILE);
  const profile = `${points.challenge.x},${points.challenge.y} ${points.play.x},${points.play.y} ${points.safety.x},${points.safety.y}`;

  return (
    <div className="relative min-h-[610px] overflow-visible">
      <motion.div
        className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          backgroundColor: isCost ? 'rgba(22,18,15,0.13)' : isLoop ? 'rgba(255,171,0,0.16)' : 'rgba(220,76,12,0.16)',
        }}
        animate={{ scale: [0.96, 1.08, 0.96], opacity: [0.36, 0.66, 0.36] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <svg viewBox="0 0 760 690" className="absolute inset-0 h-full w-full overflow-visible" role="img" aria-labelledby="systemPatternTitle systemPatternDesc">
        <title id="systemPatternTitle">Integrated foundation pattern</title>
        <desc id="systemPatternDesc">A three-axis profile shows Challenge leading, with Safety and Play lower, and reveals the benefit, cost, and repeated loop of the pattern.</desc>
        <defs>
          <filter id="systemGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="systemProfileFill" x1="380" x2="380" y1="76" y2="545" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F2551A" stopOpacity="0.44" />
            <stop offset="0.5" stopColor="#F2551A" stopOpacity="0.18" />
            <stop offset="1" stopColor="#42A68E" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="costSink" x1="380" x2="380" y1="260" y2="612" gradientUnits="userSpaceOnUse">
            <stop stopColor="#15110F" stopOpacity="0" />
            <stop offset="1" stopColor="#15110F" stopOpacity="0.42" />
          </linearGradient>
          <radialGradient id="earnedGlow" cx="50%" cy="50%" r="50%">
            <stop stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="0.28" stopColor="#FFBB30" stopOpacity="0.56" />
            <stop offset="1" stopColor="#F2551A" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g opacity="0.8">
          {[0.25, 0.5, 0.75, 1].map(scale => (
            <polygon
              key={scale}
              points={ringPoints(scale)}
              fill="none"
              stroke="#D8D0C4"
              strokeWidth={scale === 1 ? 1.35 : 0.85}
              opacity={scale === 1 ? 0.64 : 0.33}
            />
          ))}
          <line x1="380" y1="342" x2="380" y2="94" stroke="#D8D0C4" strokeWidth="1" />
          <line x1="380" y1="342" x2="165" y2="466" stroke="#D8D0C4" strokeWidth="1" />
          <line x1="380" y1="342" x2="595" y2="466" stroke="#D8D0C4" strokeWidth="1" />
        </g>

        <motion.polygon
          points={profile}
          fill="url(#systemProfileFill)"
          stroke={isGift ? CHALLENGE : '#B8AEA2'}
          strokeOpacity={isCost ? 0.22 : 0.45}
          strokeWidth={isGift ? 2.4 : 1.3}
          animate={{
            opacity: isCost ? 0.34 : 0.74,
            scale: isGift ? [0.99, 1.018, 0.99] : 1,
          }}
          style={{ transformOrigin: '380px 342px' }}
          transition={{ duration: 4.8, repeat: isGift ? Infinity : 0, ease: 'easeInOut' }}
        />

        {isGift && (
          <g>
            <motion.circle
              cx={points.challenge.x}
              cy={points.challenge.y}
              r="112"
              fill="url(#earnedGlow)"
              animate={{ scale: [0.86, 1.16, 0.86], opacity: [0.28, 0.72, 0.28] }}
              style={{ transformOrigin: `${points.challenge.x}px ${points.challenge.y}px` }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
            />
            {[
              { x: 506, y: 116, text: 'capable' },
              { x: 542, y: 184, text: 'reliable' },
              { x: 512, y: 250, text: 'under pressure' },
            ].map((item, index) => (
              <motion.g
                key={item.text}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.38, delay: index * 0.08 }}
              >
                <circle cx={item.x - 22} cy={item.y - 5} r="5" fill={CHALLENGE} opacity="0.72" />
                <text x={item.x} y={item.y} fill="#5A3122" fontSize="14" fontWeight="800" letterSpacing="1.45">
                  {item.text.toUpperCase()}
                </text>
              </motion.g>
            ))}
          </g>
        )}

        {isCost && (
          <g>
            <motion.path
              d="M154 530 C250 592 507 592 606 530"
              fill="none"
              stroke="#15110F"
              strokeWidth="7"
              strokeLinecap="round"
              opacity="0.18"
              animate={{ pathLength: [0, 1, 1], opacity: [0.08, 0.24, 0.12] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.rect x="112" y="338" width="536" height="238" rx="118" fill="url(#costSink)" opacity="0.72" />
            <motion.path
              d={`M${points.safety.x} ${points.safety.y} C276 520 318 540 380 342`}
              fill="none"
              stroke={SAFETY}
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeDasharray="6 14"
              opacity="0.58"
              animate={{ strokeDashoffset: [0, -80] }}
              transition={{ duration: 6.4, repeat: Infinity, ease: 'linear' }}
            />
            <motion.path
              d={`M${points.play.x} ${points.play.y} C488 520 442 540 380 342`}
              fill="none"
              stroke={PLAY}
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeDasharray="6 14"
              opacity="0.52"
              animate={{ strokeDashoffset: [0, -80] }}
              transition={{ duration: 6.4, repeat: Infinity, ease: 'linear', delay: 0.18 }}
            />
          </g>
        )}

        {isLoop && (
          <g>
            <motion.path
              d={`M380 342 C348 284 358 215 ${points.challenge.x} ${points.challenge.y} C416 220 421 286 380 342`}
              fill="none"
              stroke={CHALLENGE}
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.56"
              strokeDasharray="12 16"
              animate={{ strokeDashoffset: [0, -120] }}
              transition={{ duration: 2.9, repeat: Infinity, ease: 'linear' }}
            />
            <motion.circle
              r="10"
              fill="#FFF9F0"
              stroke={CHALLENGE}
              strokeWidth="4"
              filter="url(#systemGlow)"
              animate={{
                cx: [380, points.challenge.x, points.challenge.x, 380, 380],
                cy: [342, points.challenge.y, points.challenge.y, 342, 342],
              }}
              transition={{ duration: 4.8, repeat: Infinity, ease: [0.6, 0, 0.2, 1], times: [0, 0.26, 0.44, 0.84, 1] }}
            />
            <text x="430" y="300" fill="#7A4A34" fontSize="13" fontWeight="800" letterSpacing="1.4">
              SAME TARGET
            </text>
          </g>
        )}

        <g>
          <circle cx={points.challenge.x} cy={points.challenge.y} r="16" fill={CHALLENGE} stroke="#FFF9F0" strokeWidth="6" filter="url(#systemGlow)" />
          <circle cx={points.safety.x} cy={points.safety.y} r="12" fill={SAFETY} stroke="#FFF9F0" strokeWidth="5" opacity={isCost ? 0.62 : 0.86} />
          <circle cx={points.play.x} cy={points.play.y} r="12" fill={PLAY} stroke="#FFF9F0" strokeWidth="5" opacity={isCost ? 0.62 : 0.86} />
          <circle cx="380" cy="342" r="13" fill="#FFFDF9" stroke="#D9D1C5" strokeWidth="4" />
        </g>

        <g style={{ fontFamily: SERIF, fontWeight: 600 }}>
          <text x="380" y="58" textAnchor="middle" fill={CHALLENGE} fontSize="30">Challenge</text>
          <text x="196" y="572" textAnchor="middle" fill={SAFETY} fontSize="24">Safety</text>
          <text x="564" y="572" textAnchor="middle" fill={PLAY} fontSize="24">Play</text>
        </g>
      </svg>
    </div>
  );
}

function BeliefHinge() {
  return (
    <div className="relative mt-14 overflow-hidden bg-[#15110F] px-8 py-10 text-white shadow-[0_34px_94px_-70px_rgba(19,14,12,0.95)] md:px-11 md:py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(255,90,31,0.22),transparent_35%),radial-gradient(circle_at_82%_100%,rgba(255,171,0,0.16),transparent_36%)]" />
      <div className="relative grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#FFBB30]">The hinge into direction</p>
          <h3
            className="mt-5"
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(2.25rem, 4.2vw, 4.4rem)',
              lineHeight: 0.96,
              letterSpacing: '-0.055em',
            }}
          >
            The pattern completes itself around one quiet assumption.
          </h3>
        </div>
        <div>
          <p className="max-w-[660px] text-[18px] leading-[1.75] text-[#EFE5D9]" style={{ fontWeight: 300 }}>
            You keep reaching for drive, it keeps not delivering the thing you are actually after, and you keep reaching again - held in place by the belief:
          </p>
          <p className="mt-6 max-w-[640px] text-[32px] leading-tight text-[#FFF7EC]" style={{ fontFamily: SERIF, letterSpacing: '-0.04em' }}>
            that steadiness would cost you your drive.
          </p>
        </div>
      </div>
    </div>
  );
}

function radarPoints(scores: typeof PROFILE) {
  const centre = { x: 380, y: 342 };
  const max = 248;
  const point = (angle: number, score: number) => {
    const radians = (angle * Math.PI) / 180;
    return {
      x: centre.x + Math.cos(radians) * max * (score / 100),
      y: centre.y + Math.sin(radians) * max * (score / 100),
    };
  };
  return {
    challenge: point(-90, scores.Challenge),
    play: point(30, scores.Play),
    safety: point(150, scores.Safety),
  };
}

function ringPoints(scale: number) {
  const centre = { x: 380, y: 342 };
  const max = 248 * scale;
  return [-90, 30, 150]
    .map(angle => {
      const radians = (angle * Math.PI) / 180;
      return `${centre.x + Math.cos(radians) * max},${centre.y + Math.sin(radians) * max}`;
    })
    .join(' ');
}
