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
  { label: 'Your shape', shortLabel: 'Shape', accent: CHALLENGE },
  { label: 'How you move', shortLabel: 'Move', accent: CHALLENGE },
  { label: 'The blind spot', shortLabel: 'Blind spot', accent: '#7A3D9A' },
  { label: 'Your pathways', shortLabel: 'Paths', accent: SAFETY },
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

      <section className="relative overflow-hidden rounded-[36px] border border-[#E7DED3] bg-[#F8F3EB] p-5 shadow-[0_34px_95px_-76px_rgba(26,22,20,0.72)] md:p-8 lg:p-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background: `radial-gradient(circle at 82% 20%, ${activeAccent}18, transparent 32%), radial-gradient(circle at 18% 82%, rgba(255,187,48,0.10), transparent 30%), linear-gradient(135deg, rgba(255,255,255,0.82), rgba(255,255,255,0))`,
          }}
        />

        <div className="relative grid gap-9 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
          <div className="order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeState}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="lg:min-h-[438px]"
              >
                <ShapeStateCopy state={activeState} />
              </motion.div>
            </AnimatePresence>

            <ShapeStateControls
              activeState={activeState}
              isFirst={isFirst}
              isLast={isLast}
              onSelect={setActiveState}
              onPrevious={() => goToState(-1)}
              onNext={() => goToState(1)}
            />
          </div>

          <div className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-8">
              <EvolvingShape state={activeState} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ShapeStateCopy({ state }: { state: number }) {
  if (state === 0) {
    return (
      <div className="flex lg:min-h-[438px] lg:items-center">
        <h2
          className="max-w-2xl"
          style={{
            fontFamily: SERIF,
            fontSize: 'clamp(2.15rem, 4.05vw, 3.82rem)',
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: '-0.055em',
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
      <article className="max-w-2xl">
        <h2 className="mb-7" style={stateTitleStyle}>
          How you move
        </h2>
        <p className="text-[20px] leading-[1.7] text-[#201A16]" style={{ fontFamily: SERIF }}>
          A Sharp Peak moves by leading with its strongest domain. You set direction easily, organise your life around what's next, and when something gets hard, you reach for drive - push harder, take it on, find the next thing to aim at. It works often enough that it's become your first move in almost any situation. When something feels off, you don't slow down to steady yourself, and you don't step back to enjoy anything - you set a goal. Drive is what you know, and it's the one thing you're sure you can rely on.
        </p>
      </article>
    );
  }

  if (state === 2) {
    return (
      <article className="max-w-2xl">
        <h2 className="mb-7" style={stateTitleStyle}>
          The blind spot
        </h2>
        <div className="space-y-6 text-[18.5px] leading-[1.68] text-[#201A16]" style={{ fontFamily: SERIF }}>
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
    <article className="max-w-2xl">
      <h2 className="mb-7" style={stateTitleStyle}>
        Your pathways
      </h2>
      <p className="text-[20px] leading-[1.7] text-[#201A16]" style={{ fontFamily: SERIF }}>
        Most people who lead with drive aren't looking to slow down - and this isn't about doing less. It's more that there's a steadier, more settled sense of yourself available, one that doesn't depend on the next thing going right. Safety and Play are where that comes from. Start with whichever you'd like to understand first.
      </p>
      <div className="mt-7 grid gap-3">
        {doorways.map(door => {
          const Icon = door.Icon;
          return (
            <button
              key={door.domain}
              type="button"
              onClick={() => document.getElementById(door.target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="group relative overflow-hidden rounded-[22px] border border-[#E6DED3] bg-[#FFFCF7] p-4 text-left shadow-[0_20px_50px_-44px_rgba(26,22,20,0.48)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/25"
            >
              <div className="absolute inset-y-0 left-0 w-1.5" style={{ backgroundColor: door.color }} />
              <div className="flex gap-4 pl-2">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#F7F1E9]" style={{ color: door.color }}>
                  <Icon size={19} strokeWidth={2.1} />
                </span>
                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.17em]" style={{ color: door.color }}>
                      {door.domain}
                    </p>
                    <ArrowRight className="shrink-0 opacity-55 transition-transform group-hover:translate-x-1 group-hover:opacity-90" size={16} strokeWidth={2.2} style={{ color: door.color }} />
                  </div>
                  <p className="mt-2 text-[15.5px] leading-relaxed text-[#211B17]" style={{ fontWeight: 300 }}>
                    {door.copy} <span className="text-[#5D554C]">{door.hook}</span>
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </article>
  );
}

const stateTitleStyle = {
  fontFamily: SERIF,
  fontSize: 'clamp(2.2rem, 4.4vw, 4rem)',
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
  return (
    <div className="mt-8 flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onPrevious}
          disabled={isFirst}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#DDD4C8] bg-white/72 text-[#867E74] transition-colors hover:bg-white disabled:cursor-default disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/25"
          aria-label="Previous shape state"
        >
          <ArrowLeft size={17} strokeWidth={2.35} />
        </button>

        <div className="grid flex-1 grid-cols-4 gap-2" aria-label="Shape reading states">
          {stateNav.map((item, index) => {
            const active = activeState === index;
            const passed = activeState >= index;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => onSelect(index)}
                className="group min-w-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/25"
                aria-current={active}
                aria-label={`Show ${item.label}`}
              >
                <span className="mb-2 block h-1.5 rounded-full bg-[#DDD3C6]">
                  <span
                    className="block h-full rounded-full transition-all duration-300"
                    style={{
                      width: passed ? '100%' : '0%',
                      backgroundColor: item.accent,
                      opacity: active ? 1 : 0.48,
                    }}
                  />
                </span>
                <span
                  className="block text-[10px] font-extrabold uppercase tracking-[0.12em] transition-colors"
                  style={{ color: active ? item.accent : '#91887D' }}
                >
                  {item.shortLabel}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onNext}
          disabled={isLast}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#F2551A] text-white shadow-[0_16px_34px_-24px_rgba(220,76,12,0.8)] transition-colors hover:bg-[#DC4C0C] disabled:cursor-default disabled:bg-[#D9D0C4] disabled:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/25"
          aria-label="Next shape state"
        >
          <ArrowRight size={17} strokeWidth={2.35} />
        </button>
      </div>
    </div>
  );
}

function EvolvingShape({ state }: { state: number }) {
  const fills = {
    Safety: getScoreFillPath('Safety', 27),
    Play: getScoreFillPath('Play', 41),
    Challenge: getScoreFillPath('Challenge', 78),
  };

  const safetyOpacity = state === 0 ? 0.9 : state === 3 ? 0.92 : state === 2 ? 0.28 : 0.36;
  const playOpacity = state === 0 ? 0.84 : state === 3 ? 0.92 : state === 2 ? 0.28 : 0.36;
  const challengeOpacity = state === 3 ? 0.76 : 1;
  const labelOpacity = state === 1 || state === 2 ? 0.68 : 1;

  return (
    <div className="relative mx-auto w-full max-w-[650px]">
      <motion.div
        className="absolute left-1/2 top-[8%] aspect-square w-[66%] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(242,85,26,0.25), rgba(255,171,0,0.09) 38%, rgba(242,85,26,0) 74%)' }}
        animate={{
          opacity: state === 0 ? [0.55, 0.9, 0.55] : state === 3 ? [0.42, 0.68, 0.42] : [0.36, 0.58, 0.36],
          scale: state === 0 ? [0.94, 1.05, 0.94] : [0.98, 1.02, 0.98],
        }}
        transition={{ duration: 6.4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-1/2 top-[49%] aspect-square w-[45%] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(66,166,142,0.18), rgba(255,171,0,0.12) 38%, transparent 74%)' }}
        animate={{ opacity: state === 3 ? [0.54, 0.86, 0.54] : [0.08, 0.18, 0.08], scale: state === 3 ? [0.9, 1.08, 0.9] : [1, 1.02, 1] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-x-16 bottom-[5%] h-20 rounded-full bg-[radial-gradient(ellipse,rgba(26,22,20,0.14),transparent_70%)] blur-xl" />

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

        <g filter="url(#evolvingShapeDrop)">
          <path d={DOMAIN_HEX_OUTLINES.Safety} fill="none" stroke="#D8D0C5" strokeWidth="1.15" strokeOpacity="0.65" />
          <path d={DOMAIN_HEX_OUTLINES.Play} fill="none" stroke="#D8D0C5" strokeWidth="1.15" strokeOpacity="0.65" />
          <path d={DOMAIN_HEX_OUTLINES.Challenge} fill="none" stroke="#D8D0C5" strokeWidth="1.15" strokeOpacity="0.65" />

          {fills.Safety && (
            <motion.path
              d={fills.Safety}
              fill={SAFETY}
              animate={{ opacity: safetyOpacity }}
              transition={{ duration: 0.55, ease: 'easeInOut' }}
            />
          )}
          {fills.Play && (
            <motion.path
              d={fills.Play}
              fill={PLAY}
              animate={{ opacity: playOpacity }}
              transition={{ duration: 0.55, ease: 'easeInOut' }}
            />
          )}
          {fills.Challenge && (
            <motion.path
              d={fills.Challenge}
              fill="#F2551A"
              animate={{ opacity: challengeOpacity, y: state === 1 ? -4 : 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
        </g>

        <ShapeStateOverlay state={state} />

        <motion.g textAnchor="middle" animate={{ opacity: labelOpacity }} transition={{ duration: 0.35 }}>
          <text x="204.5" y="17" fill="#B83F14" fontSize="20" fontWeight="600" letterSpacing="-0.5" fontFamily={SERIF}>Challenge</text>
          <text x="204.5" y="40" fill="#7A4632" fontSize="11" fontWeight="800" letterSpacing="1.1">HIGH</text>

          <text x="68" y="332" fill="#166F5F" fontSize="20" fontWeight="600" letterSpacing="-0.5" fontFamily={SERIF}>Safety</text>
          <text x="68" y="353" fill="#5D6864" fontSize="11" fontWeight="800" letterSpacing="1.1">VERY LOW</text>

          <text x="341" y="332" fill="#9A6A00" fontSize="20" fontWeight="600" letterSpacing="-0.5" fontFamily={SERIF}>Play</text>
          <text x="341" y="353" fill="#6D6254" fontSize="11" fontWeight="800" letterSpacing="1.1">LOW</text>
        </motion.g>
      </svg>
    </div>
  );
}

function ShapeStateOverlay({ state }: { state: number }) {
  return (
    <g>
      <motion.g
        animate={{ opacity: state === 1 ? 1 : 0 }}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        pointerEvents="none"
      >
        <path d="M204.5 254 C222 218 223 172 210 132 C205 116 204 99 207 80" fill="none" stroke="#F2551A" strokeWidth="3.2" strokeLinecap="round" strokeOpacity="0.78" filter="url(#shapeGlow)" />
        <path d="M172 259 C186 254 196 253 204.5 254 C214 253 224 254 237 259" fill="none" stroke="#D8D0C5" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.46" />
        <motion.circle
          r="5.8"
          fill="#F2551A"
          animate={{ cx: [204.5, 219, 216, 207], cy: [254, 214, 150, 80], opacity: [0.42, 0.78, 1, 0.52] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <circle cx="207" cy="80" r="8" fill="#F2551A" opacity="0.9" />
        <text x="236" y="104" fill="#B83F14" fontSize="10.5" fontWeight="900" letterSpacing="1.2">DRIVE LEADS</text>
      </motion.g>

      <motion.g
        animate={{ opacity: state === 2 ? 1 : 0 }}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        pointerEvents="none"
      >
        <path d="M204.5 77 C204.5 123 204.5 181 204.5 257" fill="none" stroke="url(#loadGradient)" strokeWidth="6" strokeLinecap="round" strokeDasharray="20 16" filter="url(#shapeGlow)" />
        <path d="M136 262 C158 230 183 219 204.5 197 C226 219 251 230 273 262" fill="none" stroke="#7A3D9A" strokeWidth="2.4" strokeLinecap="round" strokeOpacity="0.45" strokeDasharray="8 10" />
        <path d="M178 214 C190 201 198 193 204.5 177 C211 193 219 201 231 214" fill="none" stroke="#F2551A" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.55" />
        <motion.circle
          cx="204.5"
          cy="197"
          r="22"
          fill="none"
          stroke="#7A3D9A"
          strokeWidth="1.6"
          strokeOpacity="0.34"
          animate={{ r: [18, 30, 18], opacity: [0.48, 0.16, 0.48] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <circle cx="204.5" cy="197" r="6.5" fill="#7A3D9A" opacity="0.82" />
        <text x="204.5" y="71" textAnchor="middle" fill="#7A3D9A" fontSize="10.5" fontWeight="900" letterSpacing="1.2">LOAD ON DRIVE</text>
      </motion.g>

      <motion.g
        animate={{ opacity: state === 3 ? 1 : 0 }}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        pointerEvents="none"
      >
        <circle cx="204.5" cy="253" r="8.5" fill="#FFBB30" filter="url(#shapeGlow)" />
        <path d="M204.5 253 C172 245 132 260 82 302" fill="none" stroke="url(#availablePath)" strokeWidth="3.2" strokeLinecap="round" strokeOpacity="0.88" />
        <path d="M204.5 253 C238 245 279 260 328 302" fill="none" stroke="url(#availablePath)" strokeWidth="3.2" strokeLinecap="round" strokeOpacity="0.88" />
        <path d="M204.5 253 C210 213 208 169 204.5 101" fill="none" stroke="#F2551A" strokeWidth="2.4" strokeLinecap="round" strokeOpacity="0.34" />
        <motion.circle
          r="4.8"
          fill={SAFETY}
          animate={{ cx: [204.5, 172, 132, 82], cy: [253, 245, 260, 302], opacity: [0.25, 0.9, 0.9, 0.28] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle
          r="4.8"
          fill={PLAY}
          animate={{ cx: [204.5, 238, 279, 328], cy: [253, 245, 260, 302], opacity: [0.25, 0.9, 0.9, 0.28] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.35 }}
        />
        <text x="108" y="288" fill="#166F5F" fontSize="10.5" fontWeight="900" letterSpacing="1.2">STEADINESS</text>
        <text x="274" y="288" fill="#9A6A00" fontSize="10.5" fontWeight="900" letterSpacing="1.2">ENJOYMENT</text>
      </motion.g>
    </g>
  );
}
