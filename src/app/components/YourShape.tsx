import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Info } from 'lucide-react';
import { useState } from 'react';
import { DOMAIN_HEX_OUTLINES, getScoreFillPath } from '../data/symbolFillPaths';

const SERIF = '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif';
const NAV_ORANGE = '#FF5A1F';
const CHALLENGE = '#DC4C0C';
const SAFETY = '#42A68E';
const PLAY = '#FFAB00';
const INK = '#15110F';
const PROFILE_SCORES = {
  Safety: 27,
  Play: 41,
  Challenge: 78,
} as const;

const stateNav = [
  { label: 'Your shape' },
  { label: 'How you move' },
  { label: 'Your blind spot' },
  { label: 'Pathways' },
] as const;

const doorways = [
  {
    domain: 'Safety',
    copy: 'Where steadiness comes from, and where it currently has to be worked for.',
    hook: 'Start here to understand calm, trust, and ease.',
    color: SAFETY,
    target: 'safety',
  },
  {
    domain: 'Play',
    copy: 'What brings back energy, enjoyment, and flexibility.',
    hook: 'Start here to understand lightness and rest.',
    color: PLAY,
    target: 'play',
  },
  {
    domain: 'Challenge',
    copy: 'The engine behind your drive and direction.',
    hook: 'Start here to understand the strongest domain in your profile.',
    color: CHALLENGE,
    target: 'challenge',
  },
] as const;

export function YourShape() {
  const [infoOpen, setInfoOpen] = useState(false);
  const [activeState, setActiveState] = useState(0);
  const isFirst = activeState === 0;
  const isLast = activeState === stateNav.length - 1;

  const goToState = (direction: 1 | -1) => {
    setActiveState(current => Math.max(0, Math.min(stateNav.length - 1, current + direction)));
  };

  return (
    <div className="space-y-12">
      <header>
        <p className="mb-[30px] text-[11px] font-extrabold uppercase tracking-[0.16em]" style={{ color: NAV_ORANGE }}>
          03 Overview
        </p>
        <div className="relative inline-flex items-center gap-3">
          <h1
            className="mb-[30px]"
            style={{
              fontFamily: SERIF,
              fontWeight: 600,
              letterSpacing: '-0.03em',
              fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
              color: '#0F0F0F',
            }}
          >
            Your Shape
          </h1>
          <button
            type="button"
            onMouseEnter={() => setInfoOpen(true)}
            onMouseLeave={() => setInfoOpen(false)}
            onFocus={() => setInfoOpen(true)}
            onBlur={() => setInfoOpen(false)}
            onClick={() => setInfoOpen(open => !open)}
            className="mb-[30px] grid h-8 w-8 place-items-center rounded-full border border-[#D9D2C8] bg-white text-[#6F6A64] shadow-sm transition-colors hover:text-[#DC4C0C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/30"
            aria-label="What this shape means"
          >
            <Info size={16} strokeWidth={2.2} />
          </button>
          <AnimatePresence>
            {infoOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.98 }}
                transition={{ duration: 0.18 }}
                className="absolute left-full top-0 z-20 ml-4 w-[320px] rounded-[18px] border border-[#E5DED3] bg-white p-5 shadow-[0_22px_48px_-34px_rgba(26,22,20,0.45)] max-lg:left-0 max-lg:top-full max-lg:ml-0"
              >
                <p className="text-sm leading-relaxed text-[#3F3A35]" style={{ fontWeight: 300 }}>
                  Your shape shows the relationship among the three domains. This section reads the profile as one evolving pattern.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="mb-7 h-[3px] w-10" style={{ backgroundColor: NAV_ORANGE }} />
      </header>

      <ShapeStateControls
        activeState={activeState}
        isFirst={isFirst}
        isLast={isLast}
        onSelect={setActiveState}
        onPrevious={() => goToState(-1)}
        onNext={() => goToState(1)}
      />

      <section className="relative overflow-visible px-1 py-4 md:px-0 md:py-6">
        <div
          className="pointer-events-none absolute inset-x-[-5rem] bottom-[-4rem] top-[-2rem] opacity-75"
          style={{
            background: 'radial-gradient(circle at 78% 16%, rgba(242,85,26,0.11), transparent 30%), radial-gradient(circle at 20% 72%, rgba(255,187,48,0.08), transparent 32%), linear-gradient(135deg, rgba(255,255,255,0.88), rgba(255,255,255,0))',
          }}
        />

        {activeState === 3 ? (
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeState}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              >
                <ShapeStateCopy state={activeState} />
              </motion.div>
            </AnimatePresence>
            <PathwayDoorways />
          </div>
        ) : (
          <div className={`relative grid gap-12 lg:grid-cols-[0.95fr_1.05fr] ${activeState === 0 ? 'lg:items-center' : 'lg:items-start'}`}>
            <div className="order-2 lg:order-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeState}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:min-h-[510px]"
                >
                  <ShapeStateCopy state={activeState} />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="order-1 lg:order-2">
              <div className="lg:sticky lg:top-8">
                <EvolvingShape state={activeState} />
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function ShapeStateCopy({ state }: { state: number }) {
  if (state === 0) {
    return (
      <div className="flex lg:min-h-[510px] lg:items-center">
        <h2
          className="max-w-[530px]"
          style={{
            fontFamily: SERIF,
            fontSize: 'clamp(1.62rem, 2.18vw, 2.12rem)',
            fontWeight: 600,
            lineHeight: 1.24,
            letterSpacing: '-0.022em',
            color: INK,
          }}
        >
          <span className="block">Together, your domains form a Sharp Peak.</span>
          <span className="mt-5 block">Challenge stands clearly above Safety and Play.</span>
        </h2>
      </div>
    );
  }

  if (state === 1) {
    return (
      <article className="max-w-[690px] py-3 lg:py-8">
        <h2 className="mb-9" style={stateTitleStyle}>
          How you move
        </h2>
        <div className="max-w-[610px] space-y-5 text-[16px] leading-[1.78] text-[#332E29]" style={{ fontWeight: 300 }}>
          <p>
            You often lean into Challenge. You set direction easily, organise your life around what's next, and when something gets hard, you reach for drive - push harder, take it on, find the next thing to aim at.
          </p>
          <p>
            It works often enough that it's become your first move in almost any situation. When something feels off, you don't slow down to steady yourself, and you don't step back to enjoy anything - you set a goal.
          </p>
          <p>
            Drive is what you know, and it's the one thing you're sure you can rely on.
          </p>
        </div>
      </article>
    );
  }

  if (state === 2) {
    return (
      <article className="max-w-[720px] py-3 lg:py-8">
        <h2 className="mb-9" style={stateTitleStyle}>
          Your blind spot
        </h2>
        <div className="max-w-[640px] space-y-6 text-[16px] leading-[1.72] text-[#332E29]" style={{ fontWeight: 300 }}>
          <p className="text-[18px] leading-[1.55] text-[#1A1614]" style={{ fontFamily: SERIF }}>
            Inside and out, you look driven. The harder thing to see is what drive is being asked to carry.
          </p>
          <div className="space-y-4 border-l border-[#E4D8CB] pl-6">
            {[
              'A goal can focus you, but it cannot give you a settled sense of your own worth.',
              'When the target is reached, the question underneath tends to return.',
              'Because Safety and Play are quieter, pressure lands on Challenge first.',
              'The shape can look powerful while the base has less balance than it needs.',
            ].map(point => (
              <p key={point} className="relative">
                <span className="absolute -left-[30px] top-[0.72em] h-1.5 w-1.5 rounded-full bg-[#DC4C0C]" />
                {point}
              </p>
            ))}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="mx-auto max-w-[870px] text-center">
      <h2
        className="mb-7"
        style={{
          ...stateTitleStyle,
          fontSize: 'clamp(2.15rem, 3.6vw, 3.35rem)',
        }}
      >
        Go Deeper.
      </h2>
      <p className="mx-auto max-w-[760px] text-[20px] leading-[1.75] text-[#201A16]" style={{ fontFamily: SERIF }}>
        Most people who lead with drive aren't looking to slow down - and this isn't about doing less. It's more that there's a steadier, more settled sense of yourself available, one that doesn't depend on the next thing going right. Safety and Play are where that comes from. Start with the domain you'd like to understand first.
      </p>
    </article>
  );
}

function PathwayDoorways() {
  return (
    <div className="relative mt-28 md:mt-32">
      <svg
        viewBox="0 0 880 116"
        className="pointer-events-none absolute left-1/2 top-[-92px] hidden h-[128px] w-[86%] -translate-x-1/2 overflow-visible opacity-80 md:block"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="doorwayThread" x1="130" x2="750" y1="70" y2="70" gradientUnits="userSpaceOnUse">
            <stop stopColor={SAFETY} stopOpacity="0.82" />
            <stop offset="0.5" stopColor="#FFBB30" stopOpacity="0.88" />
            <stop offset="1" stopColor={CHALLENGE} stopOpacity="0.76" />
          </linearGradient>
        </defs>
        <circle cx="440" cy="34" r="5.5" fill="#F8F3EB" stroke="#E6D7C6" strokeWidth="2" />
        <path d="M440 34 C360 46 284 70 190 103" fill="none" stroke="url(#doorwayThread)" strokeWidth="2.4" strokeLinecap="round" strokeOpacity="0.5" />
        <path d="M440 34 C440 58 440 78 440 103" fill="none" stroke="url(#doorwayThread)" strokeWidth="2.4" strokeLinecap="round" strokeOpacity="0.48" />
        <path d="M440 34 C520 46 596 70 690 103" fill="none" stroke="url(#doorwayThread)" strokeWidth="2.4" strokeLinecap="round" strokeOpacity="0.5" />
        <motion.circle
          r="5"
          fill="#FFBB30"
          animate={{
            cx: [440, 190, 440, 440, 440, 690, 440],
            cy: [34, 103, 34, 103, 34, 103, 34],
            opacity: [0.22, 0.88, 0.22, 0.88, 0.22, 0.88, 0.22],
          }}
          transition={{ duration: 8.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>

      <div className="grid gap-5 md:grid-cols-3">
        {doorways.map(door => {
          return (
            <button
              key={door.domain}
              type="button"
              onClick={() => document.getElementById(door.target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="group relative min-h-[340px] overflow-hidden border border-[#E2D5C5] bg-[#FFFCF7] px-7 pb-7 pt-8 text-left shadow-[0_28px_70px_-58px_rgba(26,22,20,0.48)] transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/25"
              style={{ borderTopLeftRadius: 150, borderTopRightRadius: 150, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-32 opacity-28 transition-opacity group-hover:opacity-46"
                style={{ background: `radial-gradient(circle at 50% 12%, ${door.color}3D, transparent 62%)` }}
              />
              <div className="flex h-full flex-col">
                <div className="mb-7 flex h-[118px] items-center justify-center">
                  <DoorDomainSymbol domain={door.domain} color={door.color} />
                </div>
                <p className="text-[14px] font-extrabold uppercase tracking-[0.18em]" style={{ color: door.color }}>
                  {door.domain}
                </p>
                <p className="mt-5 min-h-[118px] text-[24px] leading-[1.24] text-[#1D1815]" style={{ fontFamily: SERIF }}>
                  {door.copy}
                </p>
                <p className="mt-5 min-h-[66px] text-[15px] leading-relaxed text-[#665E55]" style={{ fontWeight: 300 }}>
                  {door.hook}
                </p>
                <div className="mt-auto flex items-center justify-between border-t border-[#E5DACE] pt-4">
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.16em]" style={{ color: door.color }}>
                    Start with {door.domain}
                  </span>
                  <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} strokeWidth={2.2} style={{ color: door.color }} />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DoorDomainSymbol({ domain, color }: { domain: string; color: string }) {
  const active = (name: string) => domain === name;
  const activeFill = getScoreFillPath(domain, PROFILE_SCORES[domain as keyof typeof PROFILE_SCORES]);
  return (
    <svg viewBox="18 8 373 322" className="relative z-10 h-[112px] w-full max-w-[160px] overflow-visible" aria-hidden="true">
      <defs>
        <filter id={`doorGlow-${domain}`} x="-35%" y="-35%" width="170%" height="170%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id={`doorAura-${domain}`} cx="50%" cy="50%" r="55%">
          <stop offset="0" stopColor={color} stopOpacity="0.24" />
          <stop offset="0.62" stopColor={color} stopOpacity="0.08" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={active('Challenge') ? 204.5 : active('Safety') ? 124 : 285} cy={active('Challenge') ? 126 : 254} r="92" fill={`url(#doorAura-${domain})`} />
      <path d={DOMAIN_HEX_OUTLINES.Challenge} fill="#D8D0C5" opacity="0.13" />
      <path d={DOMAIN_HEX_OUTLINES.Safety} fill="#D8D0C5" opacity="0.13" />
      <path d={DOMAIN_HEX_OUTLINES.Play} fill="#D8D0C5" opacity="0.13" />
      {activeFill && <path d={activeFill} fill={color} opacity="0.92" filter={`url(#doorGlow-${domain})`} />}
    </svg>
  );
}

const stateTitleStyle = {
  fontFamily: SERIF,
  fontSize: 'clamp(2.35rem, 4.3vw, 4rem)',
  lineHeight: 1,
  letterSpacing: '-0.05em',
  color: INK,
} as const;

function ShapeStateControls({
  activeState,
  isFirst,
  isLast,
  onSelect,
  onPrevious,
  onNext,
}: {
  activeState: number;
  isFirst: boolean;
  isLast: boolean;
  onSelect: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const progress = `${(activeState / (stateNav.length - 1)) * 75}%`;
  const activeAccent = NAV_ORANGE;

  return (
    <nav className="mb-10 mt-1" aria-label="Shape story states">
      <div className="flex items-start gap-4 md:gap-6">
        <button
          type="button"
          onClick={onPrevious}
          disabled={isFirst}
          className="mt-[11px] grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#DDD4C8] bg-white/72 text-[#867E74] transition-colors hover:bg-white disabled:cursor-default disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/25"
          aria-label="Previous shape state"
        >
          <ArrowLeft size={17} strokeWidth={2.35} />
        </button>

        <div className="relative flex-1 pt-2">
          <div className="absolute left-[12.5%] right-[12.5%] top-[27px] h-px bg-[#D8CEC1]" />
          <motion.div
            className="absolute left-[12.5%] top-[26px] h-[3px] rounded-full"
            style={{ backgroundColor: activeAccent }}
            animate={{ width: progress }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="relative grid grid-cols-4 gap-2">
            {stateNav.map((item, index) => {
              const active = activeState === index;
              const passed = activeState >= index;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => onSelect(index)}
                  className="group flex min-w-0 flex-col items-center gap-3 text-center focus-visible:outline-none"
                  aria-current={active}
                  aria-label={`Show ${item.label}`}
                >
                  <span
                    className="grid h-9 w-9 rotate-45 place-items-center border transition-all duration-300"
                    style={{
                      borderColor: passed ? NAV_ORANGE : '#D8CEC1',
                      backgroundColor: active ? NAV_ORANGE : passed ? '#FFF8F0' : '#FBF8F3',
                      boxShadow: active ? `0 14px 28px -22px ${NAV_ORANGE}` : 'none',
                    }}
                  >
                    <span
                      className="block h-2.5 w-2.5 rounded-full transition-colors"
                      style={{ backgroundColor: active ? '#FFF8F0' : passed ? NAV_ORANGE : '#CFC5B8' }}
                    />
                  </span>
                  <span
                    className="block text-[10.5px] font-extrabold uppercase tracking-[0.14em] transition-colors max-sm:text-[9.5px]"
                    style={{ color: active ? NAV_ORANGE : passed ? '#5F554B' : '#968C80' }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={onNext}
          disabled={isLast}
          className="mt-[11px] grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#F2551A] text-white shadow-[0_16px_34px_-24px_rgba(220,76,12,0.8)] transition-colors hover:bg-[#DC4C0C] disabled:cursor-default disabled:bg-[#D9D0C4] disabled:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/25"
          aria-label="Next shape state"
        >
          <ArrowRight size={17} strokeWidth={2.35} />
        </button>
      </div>
    </nav>
  );
}

function EvolvingShape({ state }: { state: number }) {
  const fills = {
    Safety: getScoreFillPath('Safety', 27),
    Play: getScoreFillPath('Play', 41),
    Challenge: getScoreFillPath('Challenge', 78),
  };

  const isMoving = state === 1;
  const isBlindSpot = state === 2;
  const safetyOpacity = state === 0 ? 0.88 : isBlindSpot ? 0.32 : 0.24;
  const playOpacity = state === 0 ? 0.84 : isBlindSpot ? 0.32 : 0.24;
  const challengeOpacity = isMoving ? 0.58 : 1;
  const outlineOpacity = state === 0 || isBlindSpot ? 0 : 0.16;
  const labelOpacity = isMoving ? 0.62 : 1;

  return (
    <div className="relative mx-auto w-full max-w-[690px] pb-16 pt-12">
      <motion.div
        className="absolute left-1/2 top-[5%] aspect-square w-[58%] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(242,85,26,0.32), rgba(255,171,0,0.14) 36%, rgba(242,85,26,0) 73%)' }}
        animate={{
          opacity: state === 0 ? [0.6, 0.95, 0.6] : isMoving ? [0.34, 0.56, 0.34] : [0.42, 0.62, 0.42],
          scale: state === 0 ? [0.92, 1.1, 0.92] : [0.98, 1.04, 0.98],
        }}
        transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-1/2 top-[11%] aspect-square w-[40%] -translate-x-1/2 rounded-full blur-2xl"
        style={{ background: 'radial-gradient(circle, rgba(255,90,31,0.28), rgba(255,90,31,0.08) 46%, transparent 74%)' }}
        animate={{ opacity: [0.28, 0.55, 0.28], scale: [0.9, 1.08, 0.9] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      />
      <motion.div
        className="absolute left-1/2 top-[52%] aspect-square w-[46%] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(66,166,142,0.18), rgba(255,171,0,0.12) 38%, transparent 74%)' }}
        animate={{ opacity: isBlindSpot ? [0.18, 0.32, 0.18] : [0.06, 0.13, 0.06], scale: [1, 1.03, 1] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-x-16 bottom-[11%] h-20 rounded-full bg-[radial-gradient(ellipse,rgba(26,22,20,0.13),transparent_70%)] blur-xl" />

      <ShapeLabels state={state} opacity={labelOpacity} />

      <svg viewBox="0 0 409 356" className="relative z-10 w-full overflow-visible" aria-labelledby="evolvingShapeTitle evolvingShapeDesc" role="img">
        <title id="evolvingShapeTitle">Sharp Peak shape evolving through four states</title>
        <desc id="evolvingShapeDesc">The same Sharp Peak shape changes to show recognition, movement, blind spot, and pathways.</desc>
        <defs>
          <filter id="evolvingShapeDrop" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#1A1614" floodOpacity="0.13" />
          </filter>
          <filter id="shapeGlow" x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="loadGradient" x1="204" x2="204" y1="72" y2="260" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F2551A" stopOpacity="0.74" />
            <stop offset="1" stopColor="#B96B38" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="availablePath" x1="90" x2="315" y1="252" y2="252" gradientUnits="userSpaceOnUse">
            <stop stopColor="#42A68E" />
            <stop offset="0.5" stopColor="#FFBB30" />
            <stop offset="1" stopColor="#FFAB00" />
          </linearGradient>
          <radialGradient id="peakAura" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#F2551A" stopOpacity="0.34" />
            <stop offset="0.45" stopColor="#FFBB30" stopOpacity="0.15" />
            <stop offset="1" stopColor="#F2551A" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="blindShadow" x1="190" x2="352" y1="186" y2="317" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1A1614" stopOpacity="0.18" />
            <stop offset="0.58" stopColor="#1A1614" stopOpacity="0.08" />
            <stop offset="1" stopColor="#1A1614" stopOpacity="0" />
          </linearGradient>
        </defs>

        <ShapeStateOverlay state={state} layer="under" />

        <motion.g
          filter="url(#evolvingShapeDrop)"
          style={{ transformOrigin: '204.5px 248px' }}
          animate={{ rotate: 0, x: 0, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.path d={DOMAIN_HEX_OUTLINES.Safety} fill="none" stroke="#D8D0C5" strokeWidth="1.15" animate={{ opacity: outlineOpacity }} transition={{ duration: 0.45 }} />
          <motion.path d={DOMAIN_HEX_OUTLINES.Play} fill="none" stroke="#D8D0C5" strokeWidth="1.15" animate={{ opacity: outlineOpacity }} transition={{ duration: 0.45 }} />
          <motion.path d={DOMAIN_HEX_OUTLINES.Challenge} fill="none" stroke="#D8D0C5" strokeWidth="1.15" animate={{ opacity: outlineOpacity }} transition={{ duration: 0.45 }} />

          {fills.Safety && (
            <motion.path
              d={fills.Safety}
              fill={SAFETY}
              animate={{ opacity: safetyOpacity, x: isMoving ? -12 : 0, y: isMoving ? 8 : 0 }}
              transition={{ duration: 0.55, ease: 'easeInOut' }}
            />
          )}
          {fills.Play && (
            <motion.path
              d={fills.Play}
              fill={PLAY}
              animate={{ opacity: playOpacity, x: isMoving ? 12 : 0, y: isMoving ? 8 : 0 }}
              transition={{ duration: 0.55, ease: 'easeInOut' }}
            />
          )}
          {fills.Challenge && (
            <motion.path
              d={fills.Challenge}
              fill="#F2551A"
              animate={{ opacity: challengeOpacity, y: isMoving ? -8 : 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
        </motion.g>

        <ShapeStateOverlay state={state} layer="over" />
      </svg>
    </div>
  );
}

function ShapeLabels({ state, opacity }: { state: number; opacity: number }) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-20"
      style={{ transformOrigin: '50% 63%' }}
      animate={{
        opacity,
        rotate: 0,
        x: 0,
        y: 0,
      }}
      transition={{ duration: 0.35 }}
      aria-hidden="true"
    >
      <div className="absolute left-1/2 top-[10%] -translate-x-1/2 text-center">
        <p className="rounded-full border border-[#E9D8CC] bg-white/68 px-4 py-1.5 text-[17px] leading-none text-[#B83F14] shadow-[0_16px_38px_-32px_rgba(26,22,20,0.5)]" style={{ fontFamily: SERIF, fontWeight: 600 }}>
          Challenge
        </p>
      </div>
      <div className="absolute bottom-[18%] left-[13%] text-left md:left-[16%]">
        <p className="rounded-full border border-[#D7E8DF] bg-white/66 px-4 py-1.5 text-[17px] leading-none text-[#166F5F] shadow-[0_16px_38px_-32px_rgba(26,22,20,0.42)]" style={{ fontFamily: SERIF, fontWeight: 600 }}>
          Safety
        </p>
      </div>
      <div className="absolute bottom-[18%] right-[13%] text-right md:right-[16%]">
        <p className="rounded-full border border-[#EBDDBF] bg-white/66 px-4 py-1.5 text-[17px] leading-none text-[#9A6A00] shadow-[0_16px_38px_-32px_rgba(26,22,20,0.42)]" style={{ fontFamily: SERIF, fontWeight: 600 }}>
          Play
        </p>
      </div>
    </motion.div>
  );
}

function ShapeStateOverlay({ state, layer }: { state: number; layer: 'under' | 'over' }) {
  if (layer === 'under') {
    return (
      <g pointerEvents="none">
        <motion.g
          animate={{ opacity: state === 0 ? 1 : 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        >
          <motion.circle
            cx="204.5"
            cy="60"
            r="78"
            fill="url(#peakAura)"
            animate={{ r: [34, 74, 34], opacity: [0.85, 0.16, 0.85] }}
            transition={{ duration: 5.1, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="204.5"
            cy="60"
            r="58"
            fill="none"
            stroke="#F2551A"
            strokeWidth="1.4"
            strokeOpacity="0.34"
            animate={{ r: [22, 52, 22], opacity: [0.5, 0.09, 0.5] }}
            transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="204.5"
            cy="60"
            r="86"
            fill="none"
            stroke="#FFBB30"
            strokeWidth="1.2"
            strokeOpacity="0.22"
            animate={{ r: [42, 86, 42], opacity: [0.34, 0.05, 0.34] }}
            transition={{ duration: 5.6, repeat: Infinity, ease: 'easeInOut', delay: 0.35 }}
          />
        </motion.g>

        <motion.g
          animate={{ opacity: state === 1 ? 1 : 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        >
          <circle cx="204.5" cy="198" r="23" fill="#FFF8F0" stroke="#E8D9CC" strokeWidth="1.3" />
          <path d="M204.5 198 C186 216 157 239 112 272" fill="none" stroke="#9ECABD" strokeWidth="3.2" strokeLinecap="round" strokeOpacity="0.52" />
          <path d="M204.5 198 C225 218 256 240 304 272" fill="none" stroke="#E7C879" strokeWidth="3.2" strokeLinecap="round" strokeOpacity="0.52" />
          <circle cx="112" cy="272" r="5.3" fill="#FFF8F0" stroke={SAFETY} strokeWidth="2" strokeOpacity="0.7" />
          <circle cx="304" cy="272" r="5.3" fill="#FFF8F0" stroke={PLAY} strokeWidth="2" strokeOpacity="0.7" />
          <path d="M204.5 198 C204 157 204 112 204.5 60" fill="none" stroke="#FFF6E8" strokeWidth="7.8" strokeLinecap="round" strokeOpacity="0.8" />
          <path d="M204.5 198 C204 157 204 112 204.5 60" fill="none" stroke="#F2551A" strokeWidth="3.8" strokeLinecap="round" strokeOpacity="0.92" />
        </motion.g>

        <motion.g
          animate={{ opacity: state === 2 ? 1 : 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        >
          <motion.path
            d="M174 199 C232 244 290 282 358 313 L318 327 C263 294 216 258 185 221 Z"
            fill="url(#blindShadow)"
            animate={{ opacity: [0.62, 0.95, 0.62], x: [0, 6, 0] }}
            transition={{ duration: 5.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <ellipse cx="207" cy="290" rx="82" ry="17" fill="#1A1614" opacity="0.05" />
        </motion.g>
      </g>
    );
  }

  return (
    <g>
      <motion.g
        animate={{ opacity: state === 1 ? 1 : 0 }}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        pointerEvents="none"
      >
        <circle cx="204.5" cy="198" r="8.2" fill="#FFF8F0" stroke="#E5DACE" strokeWidth="1.2" />
        <motion.circle
          r="6"
          fill="#FFF8F0"
          stroke="#F2551A"
          strokeWidth="2.4"
          animate={{
            cx: [204.5, 218, 204.5, 191, 204.5, 204.5, 204.5, 204.5],
            cy: [198, 198, 184, 198, 198, 116, 60, 60],
            opacity: [0.55, 0.72, 0.72, 0.72, 0.95, 1, 1, 0],
          }}
          transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut', times: [0, 0.11, 0.22, 0.33, 0.44, 0.72, 0.86, 1] }}
        />
        <motion.circle
          cx="204.5"
          cy="60"
          r="8.5"
          fill="#F2551A"
          opacity="0.92"
          animate={{ r: [7.5, 12, 7.5], opacity: [0.95, 0.35, 0.95] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.g>

      <motion.g
        animate={{ opacity: state === 2 ? 1 : 0 }}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        pointerEvents="none"
      >
        <motion.circle
          cx="217"
          cy="210"
          r="22"
          fill="none"
          stroke="#F2551A"
          strokeWidth="1.5"
          strokeOpacity="0.22"
          animate={{ r: [16, 28, 16], opacity: [0.28, 0.08, 0.28] }}
          transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M204.5 56 L204.5 291"
          fill="none"
          stroke="#B96B38"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="6 10"
          strokeOpacity="0.28"
          animate={{ opacity: [0.16, 0.42, 0.16] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.g
          animate={{ x: [8, -4, 8], opacity: [0.18, 0.48, 0.18] }}
          transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M345 126 C323 146 307 173 300 207" fill="none" stroke="#C65D32" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.52" strokeDasharray="1 9" />
          <path d="M360 146 C335 165 318 193 313 229" fill="none" stroke="#C65D32" strokeWidth="2.6" strokeLinecap="round" strokeOpacity="0.44" strokeDasharray="1 10" />
          <path d="M374 170 C346 188 331 215 329 250" fill="none" stroke="#C65D32" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.36" strokeDasharray="1 9" />
        </motion.g>
      </motion.g>
    </g>
  );
}
