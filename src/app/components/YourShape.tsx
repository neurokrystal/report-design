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
          className="max-w-[520px]"
          style={{
            fontFamily: SERIF,
            fontSize: 'clamp(1.72rem, 2.45vw, 2.36rem)',
            fontWeight: 600,
            lineHeight: 1.18,
            letterSpacing: '-0.028em',
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
        Go Deeper
      </h2>
      <p className="mx-auto max-w-[760px] text-[20px] leading-[1.75] text-[#201A16]" style={{ fontFamily: SERIF }}>
        Most people who lead with drive aren't looking to slow down - and this isn't about doing less. It's more that there's a steadier, more settled sense of yourself available, one that doesn't depend on the next thing going right. Safety and Play are where that comes from. Start with the domain you'd like to understand first.
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
              className="group relative min-h-[330px] overflow-hidden border border-[#E2D5C5] bg-[#FFFCF7] px-7 pb-7 pt-14 text-left shadow-[0_28px_70px_-58px_rgba(26,22,20,0.48)] transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/25"
              style={{ borderTopLeftRadius: 150, borderTopRightRadius: 150, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-32 opacity-28 transition-opacity group-hover:opacity-46"
                style={{ background: `radial-gradient(circle at 50% 12%, ${door.color}3D, transparent 62%)` }}
              />
              <div className="flex h-full flex-col">
                <div className="mb-9 flex items-center justify-center">
                  <DomainGlyph domain={door.domain} color={door.color} />
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

function DomainGlyph({ domain, color }: { domain: string; color: string }) {
  const points =
    domain === 'Safety'
      ? ['50% 15%', '82% 37%', '70% 76%', '30% 76%', '18% 37%']
      : domain === 'Play'
        ? ['50% 8%', '70% 32%', '96% 42%', '76% 63%', '78% 91%', '50% 78%', '22% 91%', '24% 63%', '4% 42%', '30% 32%']
        : ['50% 7%', '82% 50%', '50% 93%', '18% 50%'];

  return (
    <span className="relative grid h-16 w-16 place-items-center rounded-full bg-white/72 shadow-[0_18px_38px_-30px_rgba(26,22,20,0.62)]">
      <span className="absolute inset-[-10px] rounded-full opacity-30" style={{ background: `radial-gradient(circle, ${color}33, transparent 68%)` }} />
      <span
        className="relative block h-8 w-8"
        style={{
          backgroundColor: `${color}1F`,
          border: `1.5px solid ${color}`,
          clipPath: `polygon(${points.join(', ')})`,
        }}
      />
    </span>
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
  const safetyOpacity = state === 0 ? 0.88 : isBlindSpot ? 0.36 : 0.24;
  const playOpacity = state === 0 ? 0.84 : isBlindSpot ? 0.36 : 0.24;
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
        </defs>

        <ShapeStateOverlay state={state} layer="under" />

        <motion.g
          filter="url(#evolvingShapeDrop)"
          style={{ transformOrigin: '204.5px 248px' }}
          animate={{ rotate: isBlindSpot ? [-6.8, -11.5, -6.8] : 0, x: isBlindSpot ? [-2, -7, -2] : 0, y: isBlindSpot ? [0, 2, 0] : 0 }}
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
        <p className="rounded-full border border-[#E9D8CC] bg-white/68 px-4 py-1.5 text-[17px] leading-none text-[#B83F14] shadow-[0_16px_38px_-32px_rgba(26,22,20,0.5)]" style={{ fontFamily: SERIF, fontWeight: 600 }}>
          Challenge
        </p>
      </div>
      <div className="absolute bottom-1 left-[4%] text-left md:left-[7%]">
        <p className="rounded-full border border-[#D7E8DF] bg-white/66 px-4 py-1.5 text-[17px] leading-none text-[#166F5F] shadow-[0_16px_38px_-32px_rgba(26,22,20,0.42)]" style={{ fontFamily: SERIF, fontWeight: 600 }}>
          Safety
        </p>
      </div>
      <div className="absolute bottom-1 right-[4%] text-right md:right-[7%]">
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
            cy="127"
            r="62"
            fill="none"
            stroke="#F2551A"
            strokeWidth="1.2"
            strokeOpacity="0.23"
            animate={{ r: [50, 72, 50], opacity: [0.28, 0.08, 0.28] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="204.5"
            cy="127"
            r="86"
            fill="none"
            stroke="#FFBB30"
            strokeWidth="1"
            strokeOpacity="0.15"
            animate={{ r: [72, 98, 72], opacity: [0.18, 0.05, 0.18] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut', delay: 0.45 }}
          />
        </motion.g>

        <motion.g
          animate={{ opacity: state === 1 ? 1 : 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        >
          <circle cx="204.5" cy="198" r="23" fill="#FFF8F0" stroke="#E8D9CC" strokeWidth="1.3" />
          <path d="M204.5 198 C190 216 168 232 135 252" fill="none" stroke="#BFD7CD" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.56" />
          <path d="M204.5 198 C221 217 244 233 276 252" fill="none" stroke="#E8D29E" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.56" />
          <path d="M204.5 198 C205 160 205 118 205 75" fill="none" stroke="#F2551A" strokeWidth="3.6" strokeLinecap="round" strokeOpacity="0.84" filter="url(#shapeGlow)" />
          <circle cx="135" cy="252" r="3.8" fill={SAFETY} opacity="0.34" />
          <circle cx="276" cy="252" r="3.8" fill={PLAY} opacity="0.34" />
        </motion.g>

        <motion.g
          animate={{ opacity: state === 2 ? 1 : 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        >
          <motion.path
            d="M88 301 C141 295 214 295 318 286"
            fill="none"
            stroke="#7B7167"
            strokeWidth="3"
            strokeLinecap="round"
            strokeOpacity="0.32"
            style={{ transformOrigin: '204.5px 296px' }}
            animate={{ rotate: [-1.8, -3.4, -1.8] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <ellipse cx="202" cy="288" rx="92" ry="19" fill="#1A1614" opacity="0.06" />
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
            cx: [204.5, 218, 204.5, 191, 204.5, 204.8, 205],
            cy: [198, 198, 184, 198, 198, 138, 75],
            opacity: [0.55, 0.72, 0.72, 0.72, 0.95, 1, 0.4],
          }}
          transition={{ duration: 5.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle
          r="4.2"
          fill={SAFETY}
          animate={{ cx: [204.5, 168, 135], cy: [198, 231, 252], opacity: [0.16, 0.28, 0] }}
          transition={{ duration: 5.6, repeat: Infinity, ease: 'easeInOut', delay: 0.45 }}
        />
        <motion.circle
          r="4.2"
          fill={PLAY}
          animate={{ cx: [204.5, 241, 276], cy: [198, 231, 252], opacity: [0.16, 0.24, 0] }}
          transition={{ duration: 5.6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        />
        <circle cx="205" cy="75" r="8.5" fill="#F2551A" opacity="0.92" />
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
        <path d="M337 142 C313 151 292 165 272 183" fill="none" stroke="#C65D32" strokeWidth="2.6" strokeLinecap="round" strokeOpacity="0.45" />
        <path d="M279 169 L269 187 L289 181" fill="none" stroke="#C65D32" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" />
      </motion.g>
    </g>
  );
}
