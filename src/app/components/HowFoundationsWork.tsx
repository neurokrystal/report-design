import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

const SERIF = '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif';
const NAV_ORANGE = '#FF5A1F';
const SAFETY = '#42A68E';
const PLAY = '#FFAB00';
const CHALLENGE = '#DC4C0C';
const INK = '#15110F';
const PAPER = '#FDFCFA';

const PROFILE = {
  Safety: 27,
  Challenge: 78,
  Play: 41,
} as const;

const diagnosisBeats = [
  {
    label: 'The pattern',
    title: "Your three domains don't sit side by side.",
    copy:
      "They work on each other, and together they produce one pattern you've been living inside without quite seeing its shape. Challenge leads. Safety and Play sit well below it. That gap is not just three scores - it is a system with one part doing most of the work.",
    accent: CHALLENGE,
  },
  {
    label: 'What it gives',
    title: 'Your drive makes you capable in a way most people are not.',
    copy:
      "You set a direction and move on it. You deliver when it matters, and you hold under pressure that makes other people fold. People rely on you because you've earned it: you are the one who gets the difficult thing done and done well.",
    note: "This is not a flaw dressed up as a strength. It is a genuine engine, and you'd be right not to want to lose it.",
    accent: CHALLENGE,
  },
  {
    label: 'What it costs',
    title: "The price is larger than the trade you think you're making.",
    copy:
      "Day to day, the system spends more than it takes back. Over time, what you know about yourself can narrow to what you do.",
    accent: SAFETY,
  },
  {
    label: 'The loop',
    title: 'The effort is real. It is aimed at a target it cannot reach.',
    copy:
      "You reach for drive to feel steady, and to feel that you're enough. But steadiness and worth were never drive's to give. Achievement delivers the hit and not the thing. You feel it for a moment, then it fades, and the need underneath is still there. So you set the next goal, and the next.",
    accent: PLAY,
  },
  {
    label: 'The belief',
    title: 'The pattern completes itself around one quiet assumption.',
    copy:
      'You keep reaching for drive, it keeps not delivering the thing you are actually after, and you keep reaching again.',
    belief: 'that steadiness would cost you your drive.',
    accent: CHALLENGE,
  },
] as const;

const dayCosts = [
  "Rest doesn't fully restore you.",
  "Stopping can feel unsafe, so you don't stop for long.",
  'You spend more than you take back.',
  "Relationships and interests that don't produce a visible result can get less of you.",
];

const persistenceBeliefs = [
  "If you ease off, you'll lose your edge.",
  "If you let yourself feel content, the drive that gets you what others can't will go quiet.",
  "Comfort is for people who've settled for less.",
];

export function HowFoundationsWork() {
  const [activeBeat, setActiveBeat] = useState(0);
  const beat = diagnosisBeats[activeBeat];

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

      <section className="relative -mx-4 overflow-hidden px-4 py-6 md:-mx-8 md:px-8 lg:py-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(220,76,12,0.12),transparent_30%),radial-gradient(circle_at_78%_24%,rgba(255,171,0,0.10),transparent_34%),radial-gradient(circle_at_48%_86%,rgba(66,166,142,0.12),transparent_38%)]" />
        <div className="pointer-events-none absolute left-1/2 top-[15%] h-[620px] w-[620px] -translate-x-1/2 rounded-full border border-[#E8DED1]/50" />
        <motion.div
          className="pointer-events-none absolute right-[-10%] top-20 h-[520px] w-[520px] rounded-full border border-[#F0E7D9]/60"
          animate={{ scale: [0.96, 1.04, 0.96], opacity: [0.28, 0.62, 0.28] }}
          transition={{ duration: 8.2, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative mx-auto max-w-[1080px]">
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.18em]" style={{ color: CHALLENGE }}>
                System diagnosis
              </p>
              <h2
                className="mt-4 max-w-[680px]"
                style={{
                  fontFamily: SERIF,
                  fontSize: 'clamp(2.8rem, 5.8vw, 6rem)',
                  lineHeight: 0.94,
                  letterSpacing: '-0.06em',
                  color: INK,
                }}
              >
                The machinery becomes visible.
              </h2>
            </div>
            <p className="max-w-[620px] text-[18px] leading-[1.75] text-[#332E29]" style={{ fontWeight: 300 }}>
              This is where Safety, Play, and Challenge stop reading as separate findings. The question is no longer which score is high or low. It is what one repeating system they create together.
            </p>
          </div>

          <BeatNavigator activeBeat={activeBeat} onSelect={setActiveBeat} />

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:items-center">
            <div className="min-h-[560px]">
              <AnimatePresence mode="wait">
                <motion.article
                  key={activeBeat}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                  className="py-3"
                >
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.18em]" style={{ color: beat.accent }}>
                    {beat.label}
                  </p>
                  <h3
                    className="mt-5"
                    style={{
                      fontFamily: SERIF,
                      fontSize: 'clamp(2.45rem, 4.8vw, 4.75rem)',
                      lineHeight: 0.98,
                      letterSpacing: '-0.055em',
                      color: INK,
                    }}
                  >
                    {beat.title}
                  </h3>
                  <p className="mt-8 max-w-[610px] text-[18px] leading-[1.78] text-[#332E29]" style={{ fontWeight: 300 }}>
                    {beat.copy}
                  </p>

                  {'note' in beat && (
                    <p
                      className="mt-7 max-w-[570px] border-l pl-5 text-[20px] leading-[1.55] text-[#1D1815]"
                      style={{ borderColor: `${beat.accent}66`, fontFamily: SERIF }}
                    >
                      {beat.note}
                    </p>
                  )}

                  {activeBeat === 2 && <CostReadout />}
                  {activeBeat === 4 && <BeliefReadout belief={beat.belief} />}
                </motion.article>
              </AnimatePresence>
            </div>

            <div className="relative min-h-[620px]">
              <DiagnosisVisual activeBeat={activeBeat} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function BeatNavigator({
  activeBeat,
  onSelect,
}: {
  activeBeat: number;
  onSelect: (index: number) => void;
}) {
  return (
    <nav aria-label="Section 7 diagnostic beats" className="relative">
      <div className="absolute left-0 right-0 top-[17px] h-px bg-[#E4DDD4]" />
      <div className="relative grid gap-2 sm:grid-cols-5">
        {diagnosisBeats.map((beat, index) => {
          const active = activeBeat === index;
          const completed = index < activeBeat;
          return (
            <button
              key={beat.label}
              type="button"
              onClick={() => onSelect(index)}
              onMouseEnter={() => onSelect(index)}
              className="group flex items-center gap-3 rounded-full bg-transparent py-2 pr-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/20"
            >
              <span
                className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full border bg-[#FDFCFA] text-[11px] font-extrabold transition-all"
                style={{
                  borderColor: active || completed ? beat.accent : '#D8D0C4',
                  color: active ? '#FFFFFF' : active || completed ? beat.accent : '#8C857C',
                  backgroundColor: active ? beat.accent : PAPER,
                  boxShadow: active ? `0 16px 34px -24px ${beat.accent}` : undefined,
                }}
              >
                {index + 1}
              </span>
              <span
                className="text-[10px] font-extrabold uppercase tracking-[0.14em] transition-colors"
                style={{ color: active ? beat.accent : '#8C857C' }}
              >
                {beat.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function CostReadout() {
  return (
    <div className="mt-8 grid gap-5 md:grid-cols-2">
      <div className="border-l border-[#42A68E]/45 pl-5">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#42A68E]">Day to day</p>
        <ul className="mt-4 space-y-3">
          {dayCosts.map(item => (
            <li key={item} className="text-[15.5px] leading-relaxed text-[#3F3A35]" style={{ fontWeight: 300 }}>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="border-l border-[#DC4C0C]/42 pl-5">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#DC4C0C]">Why it persists</p>
        <ul className="mt-4 space-y-3">
          {persistenceBeliefs.map(item => (
            <li key={item} className="text-[15.5px] leading-relaxed text-[#3F3A35]" style={{ fontWeight: 300 }}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function BeliefReadout({ belief }: { belief: string }) {
  return (
    <div className="mt-9 max-w-[590px] bg-[#15110F] px-7 py-6 text-white shadow-[0_30px_82px_-62px_rgba(26,22,20,0.85)]">
      <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#FFBB30]">The hinge</p>
      <p className="mt-4 text-[27px] leading-tight" style={{ fontFamily: SERIF, letterSpacing: '-0.035em' }}>
        {belief}
      </p>
    </div>
  );
}

function DiagnosisVisual({ activeBeat }: { activeBeat: number }) {
  const isPattern = activeBeat === 0;
  const isGift = activeBeat === 1;
  const isCost = activeBeat === 2;
  const isLoop = activeBeat === 3;
  const isBelief = activeBeat === 4;
  const points = radarPoints(PROFILE);
  const profile = `${points.challenge.x},${points.challenge.y} ${points.play.x},${points.play.y} ${points.safety.x},${points.safety.y}`;

  return (
    <div className="relative h-full min-h-[620px] overflow-visible">
      <motion.div
        className="absolute left-1/2 top-1/2 h-[470px] w-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ backgroundColor: isCost ? 'rgba(66,166,142,0.18)' : isBelief ? 'rgba(26,17,15,0.12)' : 'rgba(220,76,12,0.18)' }}
        animate={{ scale: [0.96, 1.08, 0.96], opacity: [0.34, 0.66, 0.34] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <svg viewBox="0 0 720 660" className="absolute inset-0 h-full w-full overflow-visible" role="img" aria-labelledby="diagnosisTitle diagnosisDesc">
        <title id="diagnosisTitle">Foundation system diagnosis</title>
        <desc id="diagnosisDesc">A three-axis shape shows Challenge leading while Safety and Play sit lower, then reveals the loop that keeps the pattern running.</desc>
        <defs>
          <filter id="diagnosisGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="diagnosisFill" x1="360" x2="360" y1="94" y2="520" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F2551A" stopOpacity="0.42" />
            <stop offset="0.62" stopColor="#F2551A" stopOpacity="0.17" />
            <stop offset="1" stopColor="#42A68E" stopOpacity="0.08" />
          </linearGradient>
          <radialGradient id="diagnosisArrival" cx="50%" cy="50%" r="50%">
            <stop stopColor="#FFFFFF" stopOpacity="0.94" />
            <stop offset="0.34" stopColor="#FFBB30" stopOpacity="0.52" />
            <stop offset="1" stopColor="#F2551A" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g opacity="0.82">
          {[0.25, 0.5, 0.75, 1].map(scale => (
            <polygon
              key={scale}
              points={ringPoints(scale)}
              fill="none"
              stroke="#D8D0C4"
              strokeWidth={scale === 1 ? 1.35 : 0.9}
              opacity={scale === 1 ? 0.64 : 0.36}
            />
          ))}
          <line x1="360" y1="330" x2="360" y2="100" stroke="#D8D0C4" strokeWidth="1.1" />
          <line x1="360" y1="330" x2="161" y2="445" stroke="#D8D0C4" strokeWidth="1.1" />
          <line x1="360" y1="330" x2="559" y2="445" stroke="#D8D0C4" strokeWidth="1.1" />
        </g>

        <motion.polygon
          points={profile}
          fill="url(#diagnosisFill)"
          stroke={isPattern ? CHALLENGE : '#B8AEA2'}
          strokeWidth={isPattern ? 2.6 : 1.35}
          strokeOpacity={isBelief ? 0.28 : isPattern ? 0.55 : 0.34}
          animate={{ opacity: isBelief ? 0.32 : isCost ? 0.42 : 0.72, scale: isPattern ? [0.99, 1.015, 0.99] : 1 }}
          style={{ transformOrigin: '360px 330px' }}
          transition={{ duration: 4.8, repeat: isPattern ? Infinity : 0, ease: 'easeInOut' }}
        />

        {(isGift || isLoop || isBelief) && (
          <g>
            <motion.path
              d={`M360 330 L${points.challenge.x} ${points.challenge.y}`}
              fill="none"
              stroke={CHALLENGE}
              strokeWidth={isLoop ? 5.8 : 7}
              strokeLinecap="round"
              opacity={isBelief ? 0.34 : 0.82}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.circle
              cx={points.challenge.x}
              cy={points.challenge.y}
              r={isGift ? 82 : 64}
              fill="url(#diagnosisArrival)"
              animate={{ scale: [0.82, 1.2, 0.82], opacity: [0.16, 0.52, 0.16] }}
              style={{ transformOrigin: `${points.challenge.x}px ${points.challenge.y}px` }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </g>
        )}

        {isGift && (
          <g>
            {[
              { x: 474, y: 136, text: 'delivers' },
              { x: 496, y: 188, text: 'holds pressure' },
              { x: 476, y: 242, text: 'gets it done' },
            ].map((item, index) => (
              <motion.g
                key={item.text}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.38, delay: index * 0.1 }}
              >
                <circle cx={item.x - 22} cy={item.y - 5} r="4.5" fill={CHALLENGE} opacity="0.72" />
                <text x={item.x} y={item.y} fill="#5B3324" fontSize="13" fontWeight="800" letterSpacing="1.4">
                  {item.text.toUpperCase()}
                </text>
              </motion.g>
            ))}
          </g>
        )}

        {isCost && (
          <g>
            <motion.path
              d="M166 488 C242 532 471 532 554 488"
              fill="none"
              stroke="#8B8278"
              strokeWidth="3.8"
              strokeLinecap="round"
              opacity="0.34"
              animate={{ pathLength: [0, 1, 1], opacity: [0.12, 0.42, 0.2] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.path
              d={`M${points.safety.x} ${points.safety.y} C266 486 310 494 360 330`}
              fill="none"
              stroke={SAFETY}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="5 12"
              opacity="0.56"
              animate={{ strokeDashoffset: [0, -68] }}
              transition={{ duration: 5.8, repeat: Infinity, ease: 'linear' }}
            />
            <motion.path
              d={`M${points.play.x} ${points.play.y} C454 486 410 494 360 330`}
              fill="none"
              stroke={PLAY}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="5 12"
              opacity="0.5"
              animate={{ strokeDashoffset: [0, -68] }}
              transition={{ duration: 5.8, repeat: Infinity, ease: 'linear', delay: 0.2 }}
            />
          </g>
        )}

        {isLoop && (
          <g>
            <motion.circle
              r="10"
              fill="#FFF9F0"
              stroke={CHALLENGE}
              strokeWidth="4"
              filter="url(#diagnosisGlow)"
              animate={{
                cx: [360, points.challenge.x, points.challenge.x, 360, 360],
                cy: [330, points.challenge.y, points.challenge.y, 330, 330],
                opacity: [1, 1, 1, 0.86, 1],
              }}
              transition={{ duration: 4.7, repeat: Infinity, ease: [0.58, 0, 0.2, 1], times: [0, 0.28, 0.42, 0.82, 1] }}
            />
            <motion.path
              d={`M360 330 L${points.challenge.x} ${points.challenge.y}`}
              fill="none"
              stroke={CHALLENGE}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="9 13"
              opacity="0.48"
              animate={{ strokeDashoffset: [0, -70] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'linear' }}
            />
            <text x="404" y="274" fill="#7A4A34" fontSize="13" fontWeight="800" letterSpacing="1.5">
              SAME ROUTE
            </text>
          </g>
        )}

        {isBelief && (
          <g>
            <motion.rect
              x="202"
              y="226"
              width="316"
              height="162"
              rx="28"
              fill="#15110F"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 0.94, y: 0 }}
              transition={{ duration: 0.42 }}
            />
            <text x="360" y="276" textAnchor="middle" fill="#FFBB30" fontSize="12" fontWeight="800" letterSpacing="2.2">
              THE BELIEF
            </text>
            <text x="360" y="326" textAnchor="middle" fill="#FFF7EC" fontSize="26" fontFamily={SERIF}>
              steadiness would
            </text>
            <text x="360" y="358" textAnchor="middle" fill="#FFF7EC" fontSize="26" fontFamily={SERIF}>
              cost the drive
            </text>
          </g>
        )}

        <g>
          <circle cx={points.challenge.x} cy={points.challenge.y} r="15" fill={CHALLENGE} stroke="#FFF9F0" strokeWidth="6" filter="url(#diagnosisGlow)" />
          <circle cx={points.safety.x} cy={points.safety.y} r="12" fill={SAFETY} stroke="#FFF9F0" strokeWidth="5" opacity={isBelief ? 0.46 : 0.86} />
          <circle cx={points.play.x} cy={points.play.y} r="12" fill={PLAY} stroke="#FFF9F0" strokeWidth="5" opacity={isBelief ? 0.46 : 0.86} />
          <circle cx="360" cy="330" r="13" fill="#FFFDF9" stroke="#D9D1C5" strokeWidth="4" />
        </g>

        <g style={{ fontFamily: SERIF, fontWeight: 600 }}>
          <text x="360" y="62" textAnchor="middle" fill={CHALLENGE} fontSize="31">Challenge</text>
          <text x="184" y="545" textAnchor="middle" fill={SAFETY} fontSize="25">Safety</text>
          <text x="536" y="545" textAnchor="middle" fill={PLAY} fontSize="25">Play</text>
        </g>
      </svg>
    </div>
  );
}

function radarPoints(scores: typeof PROFILE) {
  const centre = { x: 360, y: 330 };
  const max = 230;
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
  const centre = { x: 360, y: 330 };
  const max = 230 * scale;
  return [-90, 30, 150]
    .map(angle => {
      const radians = (angle * Math.PI) / 180;
      return `${centre.x + Math.cos(radians) * max},${centre.y + Math.sin(radians) * max}`;
    })
    .join(' ');
}
