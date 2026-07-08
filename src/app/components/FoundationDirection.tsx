import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

const SERIF = '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif';
const NAV_ORANGE = '#FF5A1F';
const SAFETY = '#42A68E';
const CHALLENGE = '#DC4C0C';
const PLAY = '#FFAB00';
const INK = '#15110F';

const directionBeats = [
  {
    label: 'The belief',
    title: "This is the thing to look at first, because it isn't true.",
    copy:
      'You ended the last section holding one assumption: that easing off, or building steadiness, would cost you the drive you rely on.',
    accent: CHALLENGE,
  },
  {
    label: "Why it's wrong",
    title: "Your drive is not fuel you'll run out of if you rest.",
    copy:
      "It is part of who you are. A strong swimmer doesn't lose the skill by getting out of the pool; the skill is theirs whether they are swimming or not. Your drive is the same. It does not drain when you stop, and it does not shrink when you put attention elsewhere.",
    accent: PLAY,
  },
  {
    label: 'What opens',
    title: 'You get what you were chasing, with less waste.',
    copy:
      "Once steadiness comes from where it is actually made, the thing you have been chasing through achievement starts arriving more directly. You are not trading achievement for calm. You are getting what you wanted from the achievement, and keeping the achievement too.",
    accent: SAFETY,
  },
  {
    label: 'Where to move',
    title: 'You do not lower the peak. You build the base beneath it.',
    copy:
      "The highest-leverage change in your profile is Safety. It is the lowest, and it is the one your drive has been standing in for. The same drive that has carried everything gets to be a strength again, rather than the only thing holding the structure up.",
    accent: SAFETY,
  },
  {
    label: 'The catch',
    title: 'The price is not your edge.',
    copy:
      "It is the discomfort of investing in something you have quietly believed was beneath you or risky, and letting yourself feel steady before you have earned it. That will feel unfamiliar, and at first it may feel wrong. That is the whole price: not your edge, just the discomfort of building a floor you have never fully trusted.",
    accent: CHALLENGE,
  },
] as const;

const openedList = [
  'Rest starts to restore, because settling no longer depends on having produced.',
  "A setback stops taking the ground out from under you, because your footing is not only in output.",
  "Relationships and interests get fed, and they turn out to feed you back.",
];

export function FoundationDirection() {
  const [activeBeat, setActiveBeat] = useState(0);
  const beat = directionBeats[activeBeat];

  return (
    <div className="space-y-14">
      <header>
        <p className="mb-[30px] text-[11px] font-extrabold uppercase tracking-[0.16em]" style={{ color: NAV_ORANGE }}>
          08 Direction
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
          Your Direction
        </h1>
        <div className="h-[3px] w-10" style={{ backgroundColor: NAV_ORANGE }} />
      </header>

      <section className="relative -mx-4 overflow-hidden px-4 py-6 md:-mx-8 md:px-8 lg:py-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_26%,rgba(66,166,142,0.14),transparent_32%),radial-gradient(circle_at_80%_18%,rgba(220,76,12,0.12),transparent_34%),radial-gradient(circle_at_56%_86%,rgba(255,171,0,0.10),transparent_38%)]" />
        <div className="relative mx-auto max-w-[1080px]">
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.18em]" style={{ color: SAFETY }}>
                Direction
              </p>
              <h2
                className="mt-4 max-w-[720px]"
                style={{
                  fontFamily: SERIF,
                  fontSize: 'clamp(2.8rem, 5.8vw, 6rem)',
                  lineHeight: 0.94,
                  letterSpacing: '-0.06em',
                  color: INK,
                }}
              >
                The drive stays. The floor changes.
              </h2>
            </div>
            <p className="max-w-[650px] text-[18px] leading-[1.75] text-[#332E29]" style={{ fontWeight: 300 }}>
              The barrier was never that you did not know how to do more. It was the belief that building steadiness would take something essential from you. This section answers that belief directly.
            </p>
          </div>

          <DirectionNavigator activeBeat={activeBeat} onSelect={setActiveBeat} />

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
            <div className="relative min-h-[610px] lg:order-2">
              <DirectionVisual activeBeat={activeBeat} />
            </div>

            <div className="min-h-[560px] lg:order-1">
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
                  <p className="mt-8 max-w-[620px] text-[18px] leading-[1.78] text-[#332E29]" style={{ fontWeight: 300 }}>
                    {beat.copy}
                  </p>

                  {activeBeat === 2 && (
                    <ul className="mt-8 max-w-[620px] space-y-4">
                      {openedList.map(item => (
                        <li key={item} className="border-l border-[#42A68E]/45 pl-5 text-[16px] leading-relaxed text-[#3F3A35]" style={{ fontWeight: 300 }}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {activeBeat === 3 && (
                    <div className="mt-9 max-w-[610px] bg-[#15110F] px-7 py-6 text-white shadow-[0_30px_82px_-62px_rgba(26,22,20,0.85)]">
                      <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#42E0C4]">Structural move</p>
                      <p className="mt-4 text-[27px] leading-tight" style={{ fontFamily: SERIF, letterSpacing: '-0.035em' }}>
                        Same fuel. Better trajectory.
                      </p>
                    </div>
                  )}
                </motion.article>
              </AnimatePresence>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="#safety"
                  className="inline-flex items-center gap-3 rounded-full bg-[#42A68E] px-6 py-3 text-[12px] font-extrabold uppercase tracking-[0.13em] text-white shadow-[0_20px_38px_-30px_rgba(66,166,142,0.85)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#42A68E]/30"
                >
                  Read Safety
                  <ArrowRight size={16} strokeWidth={2.4} />
                </a>
                <a
                  href="#when-ready"
                  className="inline-flex items-center gap-3 rounded-full border border-[#DED6CA] bg-white px-6 py-3 text-[12px] font-extrabold uppercase tracking-[0.13em] text-[#4D4945] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/20"
                >
                  Continue
                  <ArrowRight size={16} strokeWidth={2.4} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function DirectionNavigator({
  activeBeat,
  onSelect,
}: {
  activeBeat: number;
  onSelect: (index: number) => void;
}) {
  return (
    <nav aria-label="Section 8 direction beats" className="relative">
      <div className="absolute left-0 right-0 top-[17px] h-px bg-[#E4DDD4]" />
      <div className="relative grid gap-2 sm:grid-cols-5">
        {directionBeats.map((beat, index) => {
          const active = activeBeat === index;
          const completed = index < activeBeat;
          return (
            <button
              key={beat.label}
              type="button"
              onClick={() => onSelect(index)}
              onMouseEnter={() => onSelect(index)}
              className="group flex items-center gap-3 rounded-full bg-transparent py-2 pr-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#42A68E]/20"
            >
              <span
                className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full border bg-[#FDFCFA] text-[11px] font-extrabold transition-all"
                style={{
                  borderColor: active || completed ? beat.accent : '#D8D0C4',
                  color: active ? '#FFFFFF' : active || completed ? beat.accent : '#8C857C',
                  backgroundColor: active ? beat.accent : '#FDFCFA',
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

function DirectionVisual({ activeBeat }: { activeBeat: number }) {
  const belief = activeBeat === 0;
  const wrong = activeBeat === 1;
  const opens = activeBeat === 2;
  const leverage = activeBeat === 3;
  const catchBeat = activeBeat === 4;
  const baseLift = activeBeat >= 2;
  const safetyReach = leverage ? 68 : baseLift ? 56 : 27;
  const points = directionPoints({ Safety: safetyReach, Challenge: 78, Play: baseLift ? 50 : 41 });
  const original = directionPoints({ Safety: 27, Challenge: 78, Play: 41 });
  const profile = `${points.challenge.x},${points.challenge.y} ${points.play.x},${points.play.y} ${points.safety.x},${points.safety.y}`;
  const originalProfile = `${original.challenge.x},${original.challenge.y} ${original.play.x},${original.play.y} ${original.safety.x},${original.safety.y}`;

  return (
    <div className="relative h-full min-h-[610px] overflow-visible">
      <motion.div
        className="absolute left-1/2 top-1/2 h-[470px] w-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ backgroundColor: leverage || opens ? 'rgba(66,166,142,0.2)' : 'rgba(220,76,12,0.14)' }}
        animate={{ scale: [0.96, 1.08, 0.96], opacity: [0.34, 0.68, 0.34] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <svg viewBox="0 0 720 660" className="absolute inset-0 h-full w-full overflow-visible" role="img" aria-labelledby="directionTitle directionDesc">
        <title id="directionTitle">Foundation direction</title>
        <desc id="directionDesc">The same Challenge peak remains while Safety grows into a stronger base beneath it.</desc>
        <defs>
          <filter id="directionGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="directionFill" x1="360" x2="360" y1="94" y2="520" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F2551A" stopOpacity="0.34" />
            <stop offset="0.62" stopColor="#42A68E" stopOpacity="0.18" />
            <stop offset="1" stopColor="#42A68E" stopOpacity="0.10" />
          </linearGradient>
        </defs>

        <g opacity="0.82">
          {[0.25, 0.5, 0.75, 1].map(scale => (
            <polygon
              key={scale}
              points={directionRingPoints(scale)}
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

        <polygon points={originalProfile} fill="#1A1614" opacity="0.045" />
        <motion.polygon
          key={`${activeBeat}-profile`}
          points={profile}
          fill="url(#directionFill)"
          stroke={baseLift ? SAFETY : CHALLENGE}
          strokeWidth={2.4}
          strokeOpacity={baseLift ? 0.48 : 0.36}
          initial={{ opacity: 0.48, scale: 0.98 }}
          animate={{ opacity: catchBeat ? 0.52 : 0.76, scale: [0.99, 1.012, 0.99] }}
          style={{ transformOrigin: '360px 330px' }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {(opens || leverage || catchBeat) && (
          <g>
            <motion.path
              d={`M360 330 L${points.safety.x} ${points.safety.y}`}
              fill="none"
              stroke={SAFETY}
              strokeWidth={leverage ? 8 : 5}
              strokeLinecap="round"
              opacity={leverage ? 0.82 : 0.55}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
              filter={leverage ? 'url(#directionGlow)' : undefined}
            />
            <motion.circle
              cx={points.safety.x}
              cy={points.safety.y}
              r={leverage ? 82 : 56}
              fill={SAFETY}
              opacity="0.12"
              animate={{ scale: [0.82, 1.18, 0.82], opacity: [0.08, 0.2, 0.08] }}
              style={{ transformOrigin: `${points.safety.x}px ${points.safety.y}px` }}
              transition={{ duration: 4.1, repeat: Infinity, ease: 'easeInOut' }}
            />
          </g>
        )}

        {wrong && (
          <g>
            <motion.path
              d={`M${original.challenge.x} ${original.challenge.y} C432 210 468 260 450 330 C432 398 390 426 360 330`}
              fill="none"
              stroke="#FFBB30"
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeDasharray="7 12"
              opacity="0.58"
              animate={{ strokeDashoffset: [0, -76] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'linear' }}
            />
            <text x="478" y="312" fill="#8A5B20" fontSize="13" fontWeight="800" letterSpacing="1.4">
              IT STAYS
            </text>
          </g>
        )}

        {belief && (
          <g>
            <motion.path
              d={`M360 330 L${original.challenge.x} ${original.challenge.y}`}
              fill="none"
              stroke="#8B8278"
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.54"
              strokeDasharray="8 12"
              animate={{ strokeDashoffset: [0, -72] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: 'linear' }}
            />
            <text x="414" y="236" fill="#7A6F66" fontSize="13" fontWeight="800" letterSpacing="1.4">
              FEAR OF LOSING IT
            </text>
          </g>
        )}

        {catchBeat && (
          <g>
            <motion.path
              d="M194 496 C266 536 448 536 526 496"
              fill="none"
              stroke="#BBAF9F"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.42"
              animate={{ pathLength: [0, 1, 1], opacity: [0.1, 0.42, 0.22] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <text x="360" y="546" textAnchor="middle" fill="#6F665C" fontSize="13" fontWeight="800" letterSpacing="1.5">
              A FLOOR YOU CAN TRUST
            </text>
          </g>
        )}

        <g>
          <circle cx={points.challenge.x} cy={points.challenge.y} r="14" fill={CHALLENGE} stroke="#FFF9F0" strokeWidth="6" opacity="0.9" />
          <motion.circle
            cx={points.safety.x}
            cy={points.safety.y}
            r={baseLift ? 15 : 11}
            fill={SAFETY}
            stroke="#FFF9F0"
            strokeWidth="6"
            filter={baseLift ? 'url(#directionGlow)' : undefined}
            animate={baseLift ? { scale: [1, 1.14, 1] } : undefined}
            style={{ transformOrigin: `${points.safety.x}px ${points.safety.y}px` }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <circle cx={points.play.x} cy={points.play.y} r="12" fill={PLAY} stroke="#FFF9F0" strokeWidth="5" opacity="0.78" />
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

function directionPoints(scores: { Safety: number; Challenge: number; Play: number }) {
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

function directionRingPoints(scale: number) {
  const centre = { x: 360, y: 330 };
  const max = 230 * scale;
  return [-90, 30, 150]
    .map(angle => {
      const radians = (angle * Math.PI) / 180;
      return `${centre.x + Math.cos(radians) * max},${centre.y + Math.sin(radians) * max}`;
    })
    .join(' ');
}
