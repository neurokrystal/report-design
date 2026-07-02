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
  const centre = 150;
  const maxRadius = 108;
  const axes = [
    { key: 'Challenge', label: 'Challenge', value: PROFILE_SCORES.Challenge, angle: -90, color: CHALLENGE },
    { key: 'Play', label: 'Play', value: PROFILE_SCORES.Play, angle: 30, color: PLAY },
    { key: 'Safety', label: 'Safety', value: PROFILE_SCORES.Safety, angle: 150, color: SAFETY },
  ] as const;
  const point = (angle: number, radius: number) => {
    const radians = (angle * Math.PI) / 180;
    return {
      x: centre + Math.cos(radians) * radius,
      y: centre + Math.sin(radians) * radius,
    };
  };
  const plotted = {
    Challenge: point(-90, maxRadius * (PROFILE_SCORES.Challenge / 100)),
    Play: point(30, maxRadius * (PROFILE_SCORES.Play / 100)),
    Safety: point(150, maxRadius * (PROFILE_SCORES.Safety / 100)),
  };
  const ringPoints = (scale: number) => axes.map(axis => {
    const p = point(axis.angle, maxRadius * scale);
    return `${p.x},${p.y}`;
  }).join(' ');
  const profilePoints = `${plotted.Challenge.x},${plotted.Challenge.y} ${plotted.Play.x},${plotted.Play.y} ${plotted.Safety.x},${plotted.Safety.y}`;
  const keyDomains = state === 3 ? ['Safety', 'Play', 'Challenge'] : ['Challenge'];
  const domainPointOpacity = (domain: string) => {
    if (keyDomains.includes(domain)) return 1;
    return state === 0 ? 0.7 : 0.34;
  };
  const axisOpacity = (domain: string) => {
    if (state === 1 && domain !== 'Challenge') return 0.18;
    if (state === 2 && domain !== 'Challenge') return 0.28;
    return 0.42;
  };

  return (
    <div className="relative mx-auto w-full max-w-[690px] pb-16 pt-12">
      <motion.div
        className="absolute left-1/2 top-[5%] aspect-square w-[58%] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(242,85,26,0.32), rgba(255,171,0,0.14) 36%, rgba(242,85,26,0) 73%)' }}
        animate={{
          opacity: state === 0 ? [0.6, 0.95, 0.6] : state === 1 ? [0.34, 0.56, 0.34] : [0.42, 0.62, 0.42],
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
        animate={{ opacity: state === 2 ? [0.18, 0.32, 0.18] : [0.06, 0.13, 0.06], scale: [1, 1.03, 1] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-x-16 bottom-[11%] h-20 rounded-full bg-[radial-gradient(ellipse,rgba(26,22,20,0.13),transparent_70%)] blur-xl" />

      <svg viewBox="0 0 300 300" className="relative z-10 mx-auto w-full max-w-[560px] overflow-visible" aria-labelledby="evolvingShapeTitle evolvingShapeDesc" role="img">
        <title id="evolvingShapeTitle">Sharp Peak radar shape evolving through states</title>
        <desc id="evolvingShapeDesc">A three-axis radar shape shows Challenge reaching farther than Safety and Play, then animates movement and blind spot states.</desc>
        <defs>
          <filter id="radarStoryGlow" x="-32%" y="-32%" width="164%" height="164%">
            <feGaussianBlur stdDeviation="4.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="radarPeakAura" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#F2551A" stopOpacity="0.34" />
            <stop offset="0.45" stopColor="#FFBB30" stopOpacity="0.15" />
            <stop offset="1" stopColor="#F2551A" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="radarBlindShadow" x1="150" x2="260" y1="68" y2="246" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1A1614" stopOpacity="0.18" />
            <stop offset="0.58" stopColor="#1A1614" stopOpacity="0.08" />
            <stop offset="1" stopColor="#1A1614" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="radarProfileLine" x1="116" x2="150" y1="174" y2="66" gradientUnits="userSpaceOnUse">
            <stop stopColor={SAFETY} stopOpacity="0.88" />
            <stop offset="0.58" stopColor="#FFBB30" stopOpacity="0.82" />
            <stop offset="1" stopColor={CHALLENGE} stopOpacity="0.96" />
          </linearGradient>
        </defs>

        <motion.g
          animate={{ opacity: state === 0 ? 1 : 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        >
          <motion.circle
            cx={plotted.Challenge.x}
            cy={plotted.Challenge.y}
            r="78"
            fill="url(#radarPeakAura)"
            animate={{ r: [24, 70, 24], opacity: [0.85, 0.14, 0.85] }}
            transition={{ duration: 5.1, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx={plotted.Challenge.x}
            cy={plotted.Challenge.y}
            r="58"
            fill="none"
            stroke="#F2551A"
            strokeWidth="1.4"
            strokeOpacity="0.34"
            animate={{ r: [18, 48, 18], opacity: [0.5, 0.09, 0.5] }}
            transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx={plotted.Challenge.x}
            cy={plotted.Challenge.y}
            r="86"
            fill="none"
            stroke="#FFBB30"
            strokeWidth="1.2"
            strokeOpacity="0.22"
            animate={{ r: [34, 82, 34], opacity: [0.34, 0.05, 0.34] }}
            transition={{ duration: 5.6, repeat: Infinity, ease: 'easeInOut', delay: 0.35 }}
          />
        </motion.g>

        <motion.g
          animate={{ opacity: state === 2 ? 1 : 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        >
          <motion.path
            d={`M${plotted.Challenge.x} ${plotted.Challenge.y} C${plotted.Challenge.x + 40} ${plotted.Challenge.y + 86} ${centre + 92} ${centre + 112} ${centre + 126} ${centre + 136} L${centre + 78} ${centre + 144} C${centre + 38} ${centre + 102} ${centre + 8} ${centre + 40} ${plotted.Challenge.x} ${plotted.Challenge.y} Z`}
            fill="url(#radarBlindShadow)"
            animate={{ opacity: [0.52, 0.88, 0.52], x: [0, 5, 0] }}
            transition={{ duration: 5.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.line
            x1={plotted.Challenge.x}
            y1={plotted.Challenge.y}
            x2={centre}
            y2={centre + 92}
            stroke="#B96B38"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="6 10"
            strokeOpacity="0.34"
            animate={{ opacity: [0.16, 0.45, 0.16] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.g>

        {[0.25, 0.5, 0.75, 1].map((scale, index) => (
          <motion.polygon
            key={scale}
            points={ringPoints(scale)}
            fill="none"
            stroke="#D8CEC1"
            strokeWidth="1"
            strokeOpacity={index === 3 ? 0.44 : 0.24}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.04 }}
            style={{ transformOrigin: `${centre}px ${centre}px` }}
          />
        ))}

        {axes.map((axis, index) => {
          const end = point(axis.angle, maxRadius);
          const label = point(axis.angle, maxRadius + 25);
          const plottedPoint = plotted[axis.key];
          return (
            <g key={axis.key}>
              <motion.line
                x1={centre}
                y1={centre}
                x2={end.x}
                y2={end.y}
                stroke={axis.color}
                strokeWidth="1.45"
                strokeOpacity={axisOpacity(axis.key)}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.56, delay: 0.12 + index * 0.08 }}
              />
              <text
                x={label.x}
                y={label.y}
                textAnchor={axis.key === 'Challenge' ? 'middle' : axis.key === 'Safety' ? 'end' : 'start'}
                dominantBaseline="middle"
                fill={axis.color}
                fillOpacity={state === 1 && axis.key !== 'Challenge' ? 0.62 : 1}
                fontSize="14"
                fontWeight="800"
                letterSpacing="1.1"
              >
                {axis.label}
              </text>
              <motion.text
                x={label.x}
                y={label.y + 16}
                textAnchor={axis.key === 'Challenge' ? 'middle' : axis.key === 'Safety' ? 'end' : 'start'}
                dominantBaseline="middle"
                fill="#5B5148"
                fontSize="9.5"
                fontWeight="800"
                letterSpacing="1.6"
                animate={{ opacity: state === 1 && axis.key !== 'Challenge' ? 0.38 : 0.76 }}
                transition={{ duration: 0.35 }}
              >
                {axis.value}
              </motion.text>
              <motion.circle
                cx={plottedPoint.x}
                cy={plottedPoint.y}
                r={axis.key === 'Challenge' ? 6.6 : 5.8}
                fill={axis.color}
                stroke="#FFF8F0"
                strokeWidth="2.2"
                animate={{ opacity: domainPointOpacity(axis.key), scale: axis.key === 'Challenge' && state === 0 ? [1, 1.14, 1] : 1 }}
                transition={{ duration: 2.8, repeat: axis.key === 'Challenge' && state === 0 ? Infinity : 0, ease: 'easeInOut' }}
              />
            </g>
          );
        })}

        <motion.g
          animate={{ opacity: state === 1 ? 1 : 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        >
          <circle cx={centre} cy={centre} r="19" fill="#FFF8F0" stroke="#E8D9CC" strokeWidth="1.3" />
          <path d={`M${centre} ${centre} C${centre - 14} ${centre + 4} ${plotted.Safety.x + 11} ${plotted.Safety.y + 3} ${plotted.Safety.x} ${plotted.Safety.y}`} fill="none" stroke="#9ECABD" strokeWidth="3.2" strokeLinecap="round" strokeOpacity="0.4" />
          <path d={`M${centre} ${centre} C${centre + 17} ${centre + 5} ${plotted.Play.x - 12} ${plotted.Play.y + 4} ${plotted.Play.x} ${plotted.Play.y}`} fill="none" stroke="#E7C879" strokeWidth="3.2" strokeLinecap="round" strokeOpacity="0.4" />
          <path d={`M${centre} ${centre} C${centre} ${centre - 30} ${plotted.Challenge.x} ${plotted.Challenge.y + 38} ${plotted.Challenge.x} ${plotted.Challenge.y}`} fill="none" stroke="#FFF6E8" strokeWidth="8" strokeLinecap="round" strokeOpacity="0.82" />
          <path d={`M${centre} ${centre} C${centre} ${centre - 30} ${plotted.Challenge.x} ${plotted.Challenge.y + 38} ${plotted.Challenge.x} ${plotted.Challenge.y}`} fill="none" stroke="#F2551A" strokeWidth="3.8" strokeLinecap="round" strokeOpacity="0.92" />
        </motion.g>

        <motion.g
          initial={{ opacity: 0, scale: 0.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: `${centre}px ${centre}px` }}
          filter="url(#radarStoryGlow)"
        >
          <motion.polygon
            points={profilePoints}
            fill="#DC4C0C"
            animate={{ fillOpacity: state === 1 ? 0.08 : state === 2 ? 0.12 : 0.1 }}
            transition={{ duration: 0.35 }}
          />
          <motion.polygon
            points={profilePoints}
            fill="none"
            stroke="url(#radarProfileLine)"
            strokeWidth={state === 1 ? 2.1 : 2.35}
            animate={{ strokeOpacity: state === 1 ? 0.48 : 0.72 }}
            transition={{ duration: 0.35 }}
          />
        </motion.g>

        <circle cx={centre} cy={centre} r="4.7" fill="#FFF8F0" stroke="#CFC2B3" strokeWidth="1.4" />

      <motion.g
        animate={{ opacity: state === 1 ? 1 : 0 }}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        pointerEvents="none"
      >
        <circle cx={centre} cy={centre} r="8.2" fill="#FFF8F0" stroke="#E5DACE" strokeWidth="1.2" />
        <motion.circle
          r="6"
          fill="#FFF8F0"
          stroke="#F2551A"
          strokeWidth="2.4"
          animate={{
            cx: [centre, plotted.Play.x, centre, plotted.Safety.x, centre, plotted.Challenge.x, plotted.Challenge.x],
            cy: [centre, plotted.Play.y, centre, plotted.Safety.y, centre, plotted.Challenge.y, plotted.Challenge.y],
            opacity: [0.55, 0.72, 0.72, 0.72, 0.95, 1, 1, 0],
          }}
          transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut', times: [0, 0.12, 0.24, 0.36, 0.48, 0.84, 0.92, 1] }}
        />
        <motion.circle
          cx={plotted.Challenge.x}
          cy={plotted.Challenge.y}
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
          cx={centre}
          cy={centre}
          r="22"
          fill="none"
          stroke="#F2551A"
          strokeWidth="1.5"
          strokeOpacity="0.22"
          animate={{ r: [16, 28, 16], opacity: [0.28, 0.08, 0.28] }}
          transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.g
          animate={{ x: [8, -4, 8], opacity: [0.18, 0.48, 0.18] }}
          transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M255 72 C237 94 229 121 230 149" fill="none" stroke="#C65D32" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.52" strokeDasharray="1 9" />
          <path d="M270 92 C249 114 241 144 246 174" fill="none" stroke="#C65D32" strokeWidth="2.6" strokeLinecap="round" strokeOpacity="0.44" strokeDasharray="1 10" />
          <path d="M282 115 C260 136 255 164 263 195" fill="none" stroke="#C65D32" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.36" strokeDasharray="1 9" />
        </motion.g>
      </motion.g>

      </svg>
    </div>
  );
}
