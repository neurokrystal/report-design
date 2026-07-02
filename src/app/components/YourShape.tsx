import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Flame, Info, Shield, Sun } from 'lucide-react';
import { useState } from 'react';
import { DOMAIN_HEX_OUTLINES, getScoreFillPath } from '../data/symbolFillPaths';

const SERIF = '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif';
const NAV_ORANGE = '#FF5A1F';
const CHALLENGE = '#DC4C0C';
const SAFETY = '#42A68E';
const PLAY = '#FFAB00';
const INK = '#15110F';

const stateNav = [
  { label: 'Your shape', accent: CHALLENGE },
  { label: 'How you move', accent: CHALLENGE },
  { label: 'Your blind spot', accent: '#7A3D9A' },
  { label: 'Pathways', accent: SAFETY },
] as const;

const doorways = [
  {
    domain: 'Safety',
    copy: 'Where steadiness comes from, and where it currently has to be worked for.',
    hook: 'Start here to understand calm, trust, and ease.',
    color: SAFETY,
    Icon: Shield,
    target: 'safety',
  },
  {
    domain: 'Play',
    copy: 'What brings back energy, enjoyment, and flexibility.',
    hook: 'Start here to understand lightness and rest.',
    color: PLAY,
    Icon: Sun,
    target: 'play',
  },
  {
    domain: 'Challenge',
    copy: 'The engine behind your drive and direction.',
    hook: 'Start here to understand the strongest domain in your profile.',
    color: CHALLENGE,
    Icon: Flame,
    target: 'challenge',
  },
] as const;

export function YourShape() {
  const [infoOpen, setInfoOpen] = useState(false);
  const [activeState, setActiveState] = useState(0);
  const isFirst = activeState === 0;
  const isLast = activeState === stateNav.length - 1;
  const activeAccent = stateNav[activeState].accent;

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

      <section className="relative overflow-hidden rounded-[36px] border border-[#E9DED0] bg-[#F8F3EB] px-6 py-9 shadow-[0_34px_95px_-76px_rgba(26,22,20,0.62)] md:px-10 md:py-12 lg:px-14 lg:py-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background: `radial-gradient(circle at 82% 20%, ${activeAccent}18, transparent 32%), radial-gradient(circle at 18% 82%, rgba(255,187,48,0.10), transparent 30%), linear-gradient(135deg, rgba(255,255,255,0.82), rgba(255,255,255,0))`,
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
          className="max-w-xl"
          style={{
            fontFamily: SERIF,
            fontSize: 'clamp(2rem, 3.05vw, 2.82rem)',
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: '-0.045em',
            color: INK,
          }}
        >
          Together, your domains form a Sharp Peak. Challenge stands clearly above Safety and Play.
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
        <p className="text-[20.5px] leading-[1.82] text-[#201A16]" style={{ fontFamily: SERIF }}>
          A Sharp Peak moves by leading with its strongest domain. You set direction easily, organise your life around what's next, and when something gets hard, you reach for drive - push harder, take it on, find the next thing to aim at. It works often enough that it's become your first move in almost any situation. When something feels off, you don't slow down to steady yourself, and you don't step back to enjoy anything - you set a goal. Drive is what you know, and it's the one thing you're sure you can rely on.
        </p>
      </article>
    );
  }

  if (state === 2) {
    return (
      <article className="max-w-[720px] py-3 lg:py-8">
        <h2 className="mb-9" style={stateTitleStyle}>
          Your blind spot
        </h2>
        <div className="space-y-7 text-[18.5px] leading-[1.76] text-[#201A16]" style={{ fontFamily: SERIF }}>
          <p>
            Inside and out, you look very driven. Your blind spot is that drive can't actually give you some of the things you keep using it to get. Real confidence comes from a steady sense of your own worth - one that holds whether or not you hit the next target. A big goal doesn't build that. It pulls your attention onto the target and quiets the discomfort for a while, and it promises that reaching it will finally settle the question.
          </p>
          <p>
            It never quite does. The goal gets met, the question comes back, and you set another one.
          </p>
          <p>
            This is why the shape is worth understanding. A lot rests on the one strong domain - not just your goals, but a good deal of your sense of worth and enjoyment too. While things are moving, it holds well. But when something doesn't go to plan, more is affected than just the goal itself, because the other two domains weren't carrying much weight to begin with.
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className="mx-auto max-w-[870px] text-center">
      <h2 className="mb-7" style={stateTitleStyle}>
        Begin with a domain
      </h2>
      <p className="mx-auto max-w-[760px] text-[20px] leading-[1.75] text-[#201A16]" style={{ fontFamily: SERIF }}>
        Most people who lead with drive aren't looking to slow down - and this isn't about doing less. It's more that there's a steadier, more settled sense of yourself available, one that doesn't depend on the next thing going right. Safety and Play are where that comes from. Start with whichever you'd like to understand first.
      </p>
    </article>
  );
}

function PathwayDoorways() {
  return (
    <div className="relative mt-12">
      <svg
        viewBox="0 0 880 116"
        className="pointer-events-none absolute left-1/2 top-[-78px] hidden h-[128px] w-[86%] -translate-x-1/2 overflow-visible opacity-80 md:block"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="doorwayThread" x1="130" x2="750" y1="70" y2="70" gradientUnits="userSpaceOnUse">
            <stop stopColor={SAFETY} stopOpacity="0.82" />
            <stop offset="0.5" stopColor="#FFBB30" stopOpacity="0.88" />
            <stop offset="1" stopColor={CHALLENGE} stopOpacity="0.76" />
          </linearGradient>
        </defs>
        <path d="M440 34 C360 46 284 70 190 103" fill="none" stroke="url(#doorwayThread)" strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.42" />
        <path d="M440 34 C440 58 440 78 440 103" fill="none" stroke="url(#doorwayThread)" strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.42" />
        <path d="M440 34 C520 46 596 70 690 103" fill="none" stroke="url(#doorwayThread)" strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.42" />
        <motion.circle
          r="5"
          fill="#FFBB30"
          animate={{
            cx: [440, 190, 440, 440, 690, 440],
            cy: [34, 103, 34, 103, 103, 34],
            opacity: [0.2, 0.88, 0.2, 0.88, 0.88, 0.2],
          }}
          transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>

      <div className="grid gap-5 md:grid-cols-3">
        {doorways.map(door => {
          const Icon = door.Icon;
          return (
            <button
              key={door.domain}
              type="button"
              onClick={() => document.getElementById(door.target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="group relative min-h-[300px] overflow-hidden border border-[#E4D8CB] bg-[#FFFCF7] px-7 pb-7 pt-16 text-left shadow-[0_28px_70px_-56px_rgba(26,22,20,0.55)] transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/25"
              style={{ borderTopLeftRadius: 150, borderTopRightRadius: 150, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-28 opacity-30 transition-opacity group-hover:opacity-50"
                style={{ background: `radial-gradient(circle at 50% 12%, ${door.color}3D, transparent 62%)` }}
              />
              <span
                className="absolute left-1/2 top-7 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full bg-white/72 shadow-[0_18px_38px_-28px_rgba(26,22,20,0.65)]"
                style={{ color: door.color }}
              >
                <Icon size={20} strokeWidth={2.1} />
              </span>
              <div className="flex h-full flex-col justify-end">
                <p className="text-[12px] font-extrabold uppercase tracking-[0.17em]" style={{ color: door.color }}>
                  {door.domain}
                </p>
                <p className="mt-4 text-[24px] leading-[1.22] text-[#1D1815]" style={{ fontFamily: SERIF }}>
                  {door.copy}
                </p>
                <p className="mt-5 text-[15px] leading-relaxed text-[#665E55]" style={{ fontWeight: 300 }}>
                  {door.hook}
                </p>
                <div className="mt-9 flex items-center justify-between border-t border-[#E5DACE] pt-4">
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
  const activeAccent = stateNav[activeState].accent;

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
                      borderColor: passed ? item.accent : '#D8CEC1',
                      backgroundColor: active ? item.accent : passed ? '#FFF8F0' : '#FBF8F3',
                      boxShadow: active ? `0 14px 28px -22px ${item.accent}` : 'none',
                    }}
                  >
                    <span
                      className="block h-2.5 w-2.5 rounded-full transition-colors"
                      style={{ backgroundColor: active ? '#FFF8F0' : passed ? item.accent : '#CFC5B8' }}
                    />
                  </span>
                  <span
                    className="block text-[10.5px] font-extrabold uppercase tracking-[0.14em] transition-colors max-sm:text-[9.5px]"
                    style={{ color: active ? item.accent : passed ? '#5F554B' : '#968C80' }}
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
  const safetyOpacity = state === 0 ? 0.88 : isBlindSpot ? 0.36 : 0.24;
  const playOpacity = state === 0 ? 0.84 : isBlindSpot ? 0.36 : 0.24;
  const outlineOpacity = state === 0 ? 0 : isBlindSpot ? 0.28 : 0.2;
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
            <stop offset="1" stopColor="#7A3D9A" stopOpacity="0.22" />
          </linearGradient>
          <linearGradient id="availablePath" x1="90" x2="315" y1="252" y2="252" gradientUnits="userSpaceOnUse">
            <stop stopColor="#42A68E" />
            <stop offset="0.5" stopColor="#FFBB30" />
            <stop offset="1" stopColor="#FFAB00" />
          </linearGradient>
        </defs>

        <ShapeStateOverlay state={state} layer="under" />

        <motion.g
          filter="url(#evolvingShapeDrop)"
          style={{ transformOrigin: '204.5px 253px' }}
          animate={{ rotate: isBlindSpot ? [-3.4, 2.2, -3.4] : 0, y: isBlindSpot ? [0, -1, 0] : 0 }}
          transition={isBlindSpot ? { duration: 5.8, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
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
              animate={{ opacity: 1, y: isMoving ? -8 : 0 }}
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
      animate={{ opacity }}
      transition={{ duration: 0.35 }}
      aria-hidden="true"
    >
      <div className="absolute left-1/2 top-0 -translate-x-1/2 text-center">
        <p className="text-[23px] leading-none text-[#B83F14]" style={{ fontFamily: SERIF, fontWeight: 600 }}>
          Challenge
        </p>
        <p className="mt-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#7A4632]">High</p>
      </div>
      <div className="absolute bottom-1 left-[4%] text-left md:left-[7%]">
        <p className="text-[22px] leading-none text-[#166F5F]" style={{ fontFamily: SERIF, fontWeight: 600 }}>
          Safety
        </p>
        <p className="mt-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#5D6864]">Very Low</p>
      </div>
      <div className="absolute bottom-1 right-[4%] text-right md:right-[7%]">
        <p className="text-[22px] leading-none text-[#9A6A00]" style={{ fontFamily: SERIF, fontWeight: 600 }}>
          Play
        </p>
        <p className="mt-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#6D6254]">Low</p>
      </div>
    </motion.div>
  );
}

function ShapeStateOverlay({ state, layer }: { state: number; layer: 'under' | 'over' }) {
  if (layer === 'under') {
    return (
      <g pointerEvents="none">
        <motion.g
          animate={{ opacity: state === 1 ? 1 : 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        >
          <path d="M204.5 253 C184 250 154 263 104 302" fill="none" stroke="#D8CEC1" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.48" />
          <path d="M204.5 253 C225 250 255 263 305 302" fill="none" stroke="#D8CEC1" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.48" />
          <path d="M204.5 253 C207 209 208 158 207 75" fill="none" stroke="#F2551A" strokeWidth="3.4" strokeLinecap="round" strokeOpacity="0.82" filter="url(#shapeGlow)" />
        </motion.g>

        <motion.g
          animate={{ opacity: state === 2 ? 1 : 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        >
          <motion.path
            d="M89 303 L321 285"
            fill="none"
            stroke="#7B7167"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeOpacity="0.38"
            style={{ transformOrigin: '204.5px 294px' }}
            animate={{ rotate: [-2.5, 2.5, -2.5] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <path d="M204.5 286 L218 312 H191 Z" fill="#EFE6DA" stroke="#CFC3B6" strokeWidth="1" />
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
        <circle cx="204.5" cy="253" r="13" fill="#FFF8F0" stroke="#E5DACE" strokeWidth="1.2" />
        <motion.circle
          r="5.8"
          fill="#F2551A"
          animate={{ cx: [204.5, 207, 209, 207], cy: [253, 204, 134, 75], opacity: [0.42, 0.86, 1, 0.48] }}
          transition={{ duration: 4.9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle
          r="4.2"
          fill={SAFETY}
          animate={{ cx: [204.5, 160, 104], cy: [253, 263, 302], opacity: [0, 0.28, 0] }}
          transition={{ duration: 4.9, repeat: Infinity, ease: 'easeInOut', delay: 0.65 }}
        />
        <motion.circle
          r="4.2"
          fill={PLAY}
          animate={{ cx: [204.5, 250, 305], cy: [253, 263, 302], opacity: [0, 0.24, 0] }}
          transition={{ duration: 4.9, repeat: Infinity, ease: 'easeInOut', delay: 1.05 }}
        />
        <circle cx="207" cy="75" r="8.5" fill="#F2551A" opacity="0.94" />
        <text x="231" y="103" fill="#B83F14" fontSize="10.5" fontWeight="900" letterSpacing="1.1">DRIVE ROUTE</text>
      </motion.g>

      <motion.g
        animate={{ opacity: state === 2 ? 1 : 0 }}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        pointerEvents="none"
      >
        <path d="M204.5 82 C204.5 133 204.5 194 204.5 274" fill="none" stroke="url(#loadGradient)" strokeWidth="5.4" strokeLinecap="round" strokeDasharray="16 14" filter="url(#shapeGlow)" />
        <path d="M150 250 C167 232 187 219 204.5 198 C222 219 242 232 259 250" fill="none" stroke="#7A3D9A" strokeWidth="2.4" strokeLinecap="round" strokeOpacity="0.38" strokeDasharray="7 10" />
        <motion.circle
          cx="204.5"
          cy="214"
          r="22"
          fill="none"
          stroke="#7A3D9A"
          strokeWidth="1.6"
          strokeOpacity="0.34"
          animate={{ r: [18, 30, 18], opacity: [0.48, 0.16, 0.48] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle
          cx="204.5"
          cy="214"
          r="6.8"
          fill="#7A3D9A"
          opacity="0.84"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <text x="204.5" y="330" textAnchor="middle" fill="#7A3D9A" fontSize="10.5" fontWeight="900" letterSpacing="1.1">TOO MUCH RESTS ON ONE POINT</text>
      </motion.g>
    </g>
  );
}
