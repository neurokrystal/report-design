import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Compass, DoorOpen, EyeOff, Info, Triangle } from 'lucide-react';
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
  { label: 'Your shape', Icon: Triangle },
  { label: 'What you lead with', Icon: Compass },
  { label: 'Your blind spot', Icon: EyeOff },
  { label: 'Go deeper', Icon: DoorOpen },
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
          <div className={`relative grid gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.28fr)] lg:gap-4 xl:gap-2 ${activeState === 0 ? 'lg:items-center' : 'lg:items-start'}`}>
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

            <div className="order-1 lg:order-2 lg:-mr-8 xl:-mr-12">
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
          <span className="block">
            Together, your domains form a{' '}
            <span className="relative inline-block pr-4 text-[#DC4C0C]">
              Sharp Peak
              <span className="absolute -right-1 top-0 inline-grid h-4 w-4 place-items-center" aria-hidden="true">
                <span className="absolute h-3.5 w-3.5 rotate-45 border border-[#DC4C0C]/42 bg-[#FFF3EC]" />
                <span className="absolute top-0 h-2 w-2 rotate-45 bg-[#DC4C0C]" />
              </span>
            </span>.
          </span>
          <span className="mt-5 block">Challenge stands clearly above Safety and Play.</span>
        </h2>
      </div>
    );
  }

  if (state === 1) {
    return (
      <article className="max-w-[690px] py-3 lg:py-8">
        <h2 className="mb-9" style={stateTitleStyle}>
          What you lead with
        </h2>
        <div className="max-w-[610px] space-y-5 text-[16px] leading-[1.78] text-[#332E29]" style={{ fontWeight: 300 }}>
          <p>
            You lead with Challenge — your drive. It's the domain you reach for first, and the one you're most sure of. When you want to get somewhere, this is the part you trust.
          </p>
          <p>
            It shows up as a way of moving: you set direction easily, organise your life around what's next, and when something gets hard, you push harder rather than pause. Over time it's become your answer to almost everything — when something feels off, you don't slow down to steady yourself or step back to enjoy anything. You set a goal.
          </p>
          <p>
            There's good reason for it. Drive is what you know, and it's the one thing you're sure will respond when you call on it.
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
            Here's what's easy to miss: you reach for Challenge even when it's the one thing that can't help.
          </p>
          <p>
            Confidence and steadiness come from Safety and Play — not from the next goal. But drive is the move you trust, so you make it again and again, for things it can't give you.
          </p>
          <div className="space-y-4 border-l border-[#E4D8CB] pl-6">
            {[
              'You chase a goal, partly to feel better about yourself.',
              'You reach it, yet nothing underneath actually shifts.',
              "The feeling you wanted isn't something a goal can give.",
              "So you pick a new goal — when it's your approach that keeps you stuck.",
            ].map(point => (
              <p key={point} className="relative">
                <span className="absolute -left-[30px] top-[0.72em] h-1.5 w-1.5 rounded-full bg-[#DC4C0C]" />
                {point}
              </p>
            ))}
          </div>
          <p className="text-[17px] leading-[1.58] text-[#1A1614]" style={{ fontFamily: SERIF }}>
            Your blind spot: you keep choosing drive to get what it can't give — instead of the two routes that can.
          </p>
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
        Go deeper.
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
  const domains = ['Challenge', 'Safety', 'Play'] as const;
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
      {domains.map(name => (
        <path key={`${name}-field`} d={DOMAIN_HEX_OUTLINES[name]} fill="#DED6CB" opacity="0.18" />
      ))}
      {domains.map(name => {
        const fill = getScoreFillPath(name, PROFILE_SCORES[name]);
        if (!fill) return null;
        const isActive = active(name);
        return (
          <path
            key={`${name}-fill`}
            d={fill}
            fill={isActive ? color : '#CFC6B9'}
            opacity={isActive ? 0.94 : 0.5}
            filter={isActive ? `url(#doorGlow-${domain})` : undefined}
          />
        );
      })}
      {domains.map(name => (
        <path
          key={`${name}-outline`}
          d={DOMAIN_HEX_OUTLINES[name]}
          fill="none"
          stroke={active(name) ? color : '#BFB5A8'}
          strokeWidth={active(name) ? 1.7 : 1.1}
          opacity={active(name) ? 0.62 : 0.36}
        />
      ))}
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
    <nav className="mb-8 mt-1" aria-label="Shape story states">
      <div className="flex items-start gap-3 md:gap-5">
        <button
          type="button"
          onClick={onPrevious}
          disabled={isFirst}
          className="mt-[6px] grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#DDD4C8] bg-white/72 text-[#867E74] transition-colors hover:bg-white disabled:cursor-default disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/25"
          aria-label="Previous shape state"
        >
          <ArrowLeft size={15} strokeWidth={2.2} />
        </button>

        <div className="relative flex-1 pt-1">
          <div className="absolute left-[12.5%] right-[12.5%] top-[20px] h-px bg-[#D8CEC1]" />
          <motion.div
            className="absolute left-[12.5%] top-[19px] h-[2px] rounded-full"
            style={{ backgroundColor: activeAccent }}
            animate={{ width: progress }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="relative grid grid-cols-4 gap-2">
            {stateNav.map((item, index) => {
              const active = activeState === index;
              const passed = activeState >= index;
              const Icon = item.Icon;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => onSelect(index)}
                  className="group flex min-w-0 flex-col items-center gap-2 text-center focus-visible:outline-none"
                  aria-current={active}
                  aria-label={`Show ${item.label}`}
                >
                  <span
                    className="grid h-8 w-8 place-items-center rounded-full border transition-all duration-300"
                    style={{
                      borderColor: passed ? NAV_ORANGE : '#D8CEC1',
                      backgroundColor: active ? '#FFF8F0' : '#FBF8F3',
                      boxShadow: active ? `0 13px 24px -20px ${NAV_ORANGE}` : 'none',
                      color: active || passed ? NAV_ORANGE : '#A39B91',
                    }}
                  >
                    <Icon size={14} strokeWidth={active ? 2.35 : 1.9} />
                  </span>
                  <span
                    className="block max-w-[7.2rem] text-[9.5px] font-extrabold uppercase leading-tight tracking-[0.1em] transition-colors max-sm:text-[8.5px] max-sm:tracking-[0.07em]"
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
          className="mt-[6px] grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#F2551A] text-white shadow-[0_16px_34px_-24px_rgba(220,76,12,0.8)] transition-colors hover:bg-[#DC4C0C] disabled:cursor-default disabled:bg-[#D9D0C4] disabled:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/25"
          aria-label="Next shape state"
        >
          <ArrowRight size={15} strokeWidth={2.2} />
        </button>
      </div>
    </nav>
  );
}

function EvolvingShape({ state }: { state: number }) {
  const centre = 150;
  const maxRadius = 132;
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
  const rim = {
    Challenge: point(-90, maxRadius),
    Play: point(30, maxRadius),
    Safety: point(150, maxRadius),
  };
  const challengeBeyond = point(-90, maxRadius + 7);
  const svgViewBox = state === 2 ? '-24 -34 348 372' : '-24 -24 348 352';
  const keyDomains = state === 3 ? ['Safety', 'Play', 'Challenge'] : ['Challenge'];
  const domainPointOpacity = (domain: string) => {
    if (keyDomains.includes(domain)) return 1;
    return state === 0 ? 0.36 : 0.34;
  };
  const axisOpacity = (domain: string) => {
    if (state === 1 && domain !== 'Challenge') return 0.18;
    if (state === 2) return domain === 'Challenge' ? 0.28 : 0.22;
    if (state === 0 && domain !== 'Challenge') return 0.18;
    return 0.42;
  };

  return (
    <div className="relative mx-auto w-full max-w-[920px] pb-16 pt-4 lg:w-[114%]">
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

      <svg viewBox={svgViewBox} className={`relative z-10 mx-auto w-full overflow-visible ${state === 2 ? 'max-w-[820px]' : 'max-w-[800px]'}`} aria-labelledby="evolvingShapeTitle evolvingShapeDesc" role="img">
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
          <linearGradient id="radarProfileLine" x1="116" x2="150" y1="174" y2="66" gradientUnits="userSpaceOnUse">
            <stop stopColor="#AAA196" stopOpacity="0.58" />
            <stop offset="0.58" stopColor="#D7A35F" stopOpacity="0.66" />
            <stop offset="1" stopColor={CHALLENGE} stopOpacity="0.96" />
          </linearGradient>
          <linearGradient id="blindSpotCometTrail" x1="150" x2="150" y1="128" y2="166" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F2551A" stopOpacity="0" />
            <stop offset="0.62" stopColor="#F2551A" stopOpacity="0.32" />
            <stop offset="1" stopColor="#FFF3D2" stopOpacity="0.9" />
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
          const label = point(axis.angle, maxRadius + 21);
          const plottedPoint = plotted[axis.key];
          const mutedForPeak = state === 0 && axis.key !== 'Challenge';
          const mutedForLead = state === 1 && axis.key !== 'Challenge';
          const axisColor = mutedForPeak ? '#A9A097' : axis.color;
          const pointFill = mutedForPeak ? '#B7AEA5' : axis.color;
          return (
            <g key={axis.key}>
              <motion.line
                x1={centre}
                y1={centre}
                x2={end.x}
                y2={end.y}
                stroke={axisColor}
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
                fill={axisColor}
                fillOpacity={mutedForLead ? 0.48 : mutedForPeak ? 0.54 : 1}
                fontSize="12.5"
                fontFamily={SERIF}
                fontWeight="600"
                letterSpacing="0"
              >
                {axis.label}
              </text>
              {state !== 2 && (
                <motion.circle
                  cx={plottedPoint.x}
                  cy={plottedPoint.y}
                  r={axis.key === 'Challenge' ? 7.2 : 5.8}
                  fill={pointFill}
                  stroke="#FFF8F0"
                  strokeWidth={axis.key === 'Challenge' ? 2.8 : 2}
                  animate={{ opacity: domainPointOpacity(axis.key), scale: axis.key === 'Challenge' && state === 0 ? [1, 1.16, 1] : 1 }}
                  transition={{ duration: 2.8, repeat: axis.key === 'Challenge' && state === 0 ? Infinity : 0, ease: 'easeInOut' }}
                />
              )}
            </g>
          );
        })}

        <motion.g
          animate={{ opacity: state === 1 ? 1 : 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        >
          <path d={`M${centre} ${centre} C${centre - 14} ${centre + 4} ${plotted.Safety.x + 11} ${plotted.Safety.y + 3} ${plotted.Safety.x} ${plotted.Safety.y}`} fill="none" stroke="#9ECABD" strokeWidth="3.2" strokeLinecap="round" strokeOpacity="0.4" />
          <path d={`M${centre} ${centre} C${centre + 17} ${centre + 5} ${plotted.Play.x - 12} ${plotted.Play.y + 4} ${plotted.Play.x} ${plotted.Play.y}`} fill="none" stroke="#E7C879" strokeWidth="3.2" strokeLinecap="round" strokeOpacity="0.4" />
          <path d={`M${centre} ${centre} C${centre} ${centre - 30} ${plotted.Challenge.x} ${plotted.Challenge.y + 38} ${plotted.Challenge.x} ${plotted.Challenge.y}`} fill="none" stroke="#FFF6E8" strokeWidth="8" strokeLinecap="round" strokeOpacity="0.82" />
          <path d={`M${centre} ${centre} C${centre} ${centre - 30} ${plotted.Challenge.x} ${plotted.Challenge.y + 38} ${plotted.Challenge.x} ${plotted.Challenge.y}`} fill="none" stroke="#F2551A" strokeWidth="3.8" strokeLinecap="round" strokeOpacity="0.92" />
          {[0.26, 0.48, 0.7].map((amount, index) => (
            <motion.circle
              key={amount}
              cx={centre + (plotted.Challenge.x - centre) * amount}
              cy={centre + (plotted.Challenge.y - centre) * amount}
              r={4.2}
              fill="#1A1614"
              animate={{ opacity: [0.03, 0.15 + index * 0.04, 0.03] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.28 }}
            />
          ))}
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
            fill={state === 2 ? '#9B9389' : '#DC4C0C'}
            animate={{ fillOpacity: state === 1 ? 0.08 : state === 2 ? 0.12 : state === 0 ? 0.16 : 0.1 }}
            transition={{ duration: 0.35 }}
          />
          <motion.polygon
            points={profilePoints}
            fill="none"
            stroke={state === 2 ? '#8D8378' : 'url(#radarProfileLine)'}
            strokeWidth={state === 1 ? 2.1 : 2.35}
            animate={{ strokeOpacity: state === 1 ? 0.48 : state === 2 ? 0 : 0.72 }}
            transition={{ duration: 0.35 }}
          />
        </motion.g>

        <circle cx={centre} cy={centre} r="4.7" fill="#FFF8F0" stroke="#CFC2B3" strokeWidth="1.4" />

      <motion.g
        animate={{ opacity: state === 1 ? 1 : 0 }}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        pointerEvents="none"
      >
        <motion.circle
          r="4.9"
          fill="#1A1614"
          stroke="#FFF8F0"
          strokeWidth="1.4"
          animate={{
            cx: [centre + 11, centre + 1, centre - 11, centre - 1, centre + 11, centre, plotted.Challenge.x, plotted.Challenge.x],
            cy: [centre, centre - 11, centre, centre + 11, centre, centre, plotted.Challenge.y, plotted.Challenge.y],
            opacity: [0.58, 0.78, 0.78, 0.78, 0.82, 0.94, 1, 0],
          }}
          transition={{ duration: 5.6, repeat: Infinity, ease: 'easeInOut', times: [0, 0.12, 0.24, 0.36, 0.48, 0.56, 0.86, 1] }}
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
        <path
          d={`M${centre} ${centre} L${rim.Challenge.x} ${rim.Challenge.y}`}
          fill="none"
          stroke="#8E877E"
          strokeWidth="6.2"
          strokeLinecap="round"
          strokeOpacity="0.5"
        />
        <motion.path
          d={`M${centre} ${centre} L${rim.Safety.x} ${rim.Safety.y}`}
          fill="none"
          stroke={SAFETY}
          strokeWidth="5.8"
          strokeLinecap="round"
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d={`M${centre} ${centre} L${rim.Play.x} ${rim.Play.y}`}
          fill="none"
          stroke={PLAY}
          strokeWidth="5.8"
          strokeLinecap="round"
          animate={{ opacity: [0.46, 0.88, 0.46] }}
          transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut', delay: 2.2 }}
        />
        <motion.path
          d={`M${centre} ${centre} L${rim.Safety.x} ${rim.Safety.y}`}
          fill="none"
          stroke={SAFETY}
          strokeWidth="12"
          strokeLinecap="round"
          animate={{ opacity: [0.02, 0.24, 0.02] }}
          transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d={`M${centre} ${centre} L${rim.Play.x} ${rim.Play.y}`}
          fill="none"
          stroke={PLAY}
          strokeWidth="12"
          strokeLinecap="round"
          animate={{ opacity: [0.02, 0.24, 0.02] }}
          transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut', delay: 2.2 }}
        />
        <circle cx={rim.Challenge.x} cy={rim.Challenge.y} r="6.2" fill="#9E978E" stroke="#FFF8F0" strokeWidth="1.7" />
        <motion.circle
          cx={rim.Challenge.x}
          cy={rim.Challenge.y}
          r="12"
          fill="#8E877E"
          animate={{ opacity: [0.06, 0.14, 0.06], scale: [0.88, 1.08, 0.88] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle
          cx={rim.Safety.x}
          cy={rim.Safety.y}
          r="6.2"
          fill={SAFETY}
          stroke="#FFF8F0"
          strokeWidth="1.7"
          animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.2, 1] }}
          transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle
          cx={rim.Safety.x}
          cy={rim.Safety.y}
          r="14"
          fill={SAFETY}
          animate={{ opacity: [0.02, 0.24, 0.02], scale: [0.75, 1.25, 0.75] }}
          transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle
          cx={rim.Play.x}
          cy={rim.Play.y}
          r="6.2"
          fill={PLAY}
          stroke="#FFF8F0"
          strokeWidth="1.7"
          animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.2, 1] }}
          transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut', delay: 2.2 }}
        />
        <motion.circle
          cx={rim.Play.x}
          cy={rim.Play.y}
          r="14"
          fill={PLAY}
          animate={{ opacity: [0.02, 0.24, 0.02], scale: [0.75, 1.25, 0.75] }}
          transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut', delay: 2.2 }}
        />
        <circle cx={centre} cy={centre} r="6.2" fill="#FFF8F0" stroke="#D8CEC1" strokeWidth="1.4" />
        <motion.g
          animate={{
            y: [centre, challengeBeyond.y, challengeBeyond.y, centre, centre],
            opacity: [0, 1, 1, 0.84, 0],
            scale: [0.88, 1.1, 1.02, 0.94, 0.88],
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            times: [0, 0.16, 0.25, 0.82, 1],
            ease: ['easeIn', 'linear', [0.12, 0.02, 0.3, 1], 'linear'],
          }}
        >
          <motion.line
            x1={centre}
            x2={centre}
            y1="14"
            y2="36"
            stroke="url(#blindSpotCometTrail)"
            strokeWidth="6.6"
            strokeLinecap="round"
            animate={{ y1: [14, 16, -30, -34, 14], y2: [34, 38, -4, -10, 34], opacity: [0, 0.96, 0.42, 0.28, 0] }}
            transition={{
              duration: 4.8,
              repeat: Infinity,
              times: [0, 0.16, 0.25, 0.82, 1],
              ease: ['easeIn', 'linear', [0.12, 0.02, 0.3, 1], 'linear'],
            }}
          />
          <circle cx={centre} cy="0" r="10" fill="#F2551A" opacity="0.12" />
          <circle cx={centre} cy="0" r="6.2" fill="#FFF3D2" opacity="0.82" />
          <circle cx={centre} cy="0" r="4.1" fill="#F2551A" opacity="0.9" />
        </motion.g>
      </motion.g>

      </svg>
    </div>
  );
}
