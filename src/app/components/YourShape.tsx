import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Info } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';

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
type DomainKey = keyof typeof PROFILE_SCORES;

const stateNav = [
  { label: 'Your shape' },
  { label: 'Your instinct' },
  { label: 'Your blind spot' },
  { label: 'Go deeper' },
] as const;

const doorways = [
  {
    domain: 'Safety',
    copy: 'Where steadiness comes from, and where it currently has to be worked for.',
    hook: 'Start here to understand calm, trust, and ease.',
    result: 'Steadiness',
    color: SAFETY,
    target: 'safety',
  },
  {
    domain: 'Play',
    copy: 'What brings back energy, enjoyment, and flexibility.',
    hook: 'Start here to understand lightness and rest.',
    result: 'Enjoyment',
    color: PLAY,
    target: 'play',
  },
  {
    domain: 'Challenge',
    copy: 'The engine behind your drive and direction.',
    hook: 'Start here to understand the strongest domain in your profile.',
    result: 'Drive',
    color: CHALLENGE,
    target: 'challenge',
  },
] as const;

export function YourShape({
  activeState,
  onStateChange,
}: {
  activeState: number;
  onStateChange: Dispatch<SetStateAction<number>>;
}) {
  const [infoOpen, setInfoOpen] = useState(false);
  const [activePathway, setActivePathway] = useState<DomainKey | null>(null);

  const goToState = (direction: 1 | -1) => {
    onStateChange(current => Math.max(0, Math.min(stateNav.length - 1, current + direction)));
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
        onSelect={onStateChange}
      />

      <section className="relative overflow-visible py-2 md:py-4">
        {activeState === 3 ? (
          <div className="relative">
            <GoDeeperFinale highlightedDomain={activePathway} onHighlight={setActivePathway} />
            <StateArrowControls
              activeState={activeState}
              onPrevious={() => goToState(-1)}
              onNext={() => goToState(1)}
              className="mx-auto mt-7 max-w-[1040px]"
            />
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
                  <StateArrowControls
                    activeState={activeState}
                    onPrevious={() => goToState(-1)}
                    onNext={() => goToState(1)}
                    className={activeState === 0 ? 'mt-8 max-w-[530px]' : 'mt-9 max-w-[610px]'}
                  />
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

function GoDeeperFinale({
  highlightedDomain,
  onHighlight,
}: {
  highlightedDomain: DomainKey | null;
  onHighlight: (domain: DomainKey | null) => void;
}) {
  return (
    <motion.div
      key="go-deeper-finale"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto max-w-[1080px] overflow-visible pt-1"
    >
      <div className="pointer-events-none absolute left-1/2 top-16 h-[430px] w-[72%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(255,171,0,0.13),rgba(242,85,26,0.08)_44%,transparent_72%)] blur-3xl" />
      <div className="pointer-events-none absolute left-[9%] top-48 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(66,166,142,0.16),transparent_68%)] blur-2xl" />
      <div className="pointer-events-none absolute right-[8%] top-44 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(255,171,0,0.16),transparent_68%)] blur-2xl" />

      <article className="relative mx-auto max-w-[900px] text-center">
        <p className="mb-5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#A09A91]">
          The shape opens from here
        </p>
        <h2 className="mb-6" style={stateTitleStyle}>
          Go deeper.
        </h2>
        <p className="mx-auto max-w-[790px] text-[18px] leading-[1.62] text-[#332E29]" style={{ fontFamily: SERIF }}>
          Most people who lead with drive aren't looking to slow down - and this isn't about doing less. It's more that there's a steadier, more settled sense of yourself available, one that doesn't depend on the next thing going right. Safety and Play are where that comes from. Start with the domain you'd like to understand first.
        </p>
      </article>

      <div className="relative mt-5 grid items-end gap-4 lg:grid-cols-[minmax(0,0.78fr)_minmax(310px,0.9fr)_minmax(0,0.78fr)] lg:gap-5">
        <PathwayActionCard
          door={doorways[0]}
          highlightedDomain={highlightedDomain}
          onHighlight={onHighlight}
          className="lg:mb-20"
          index={0}
        />
        <div className="relative order-first mx-auto w-full max-w-[460px] lg:order-none">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E8DED0]/70" />
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#D8CEC1]/80"
            animate={{ rotate: 360 }}
            transition={{ duration: 46, repeat: Infinity, ease: 'linear' }}
          />
          <EvolvingShape state={3} highlightedDomain={highlightedDomain} compact />
        </div>
        <div className="grid gap-4 lg:mb-4">
          <PathwayActionCard
            door={doorways[1]}
            highlightedDomain={highlightedDomain}
            onHighlight={onHighlight}
            index={1}
          />
          <PathwayActionCard
            door={doorways[2]}
            highlightedDomain={highlightedDomain}
            onHighlight={onHighlight}
            index={2}
          />
        </div>
      </div>
    </motion.div>
  );
}

function ShapeStateCopy({ state }: { state: number }) {
  if (state === 0) {
    return (
      <div className="flex pt-4 lg:pt-20">
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
            <span className="text-[#DC4C0C]">Sharp Peak</span>.
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
          Your instinct
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
    <article className="mx-auto max-w-[940px] py-3 text-center lg:py-6">
      <h2 className="mb-9" style={stateTitleStyle}>
        Go deeper.
      </h2>
      <p className="mx-auto max-w-[790px] text-[19px] leading-[1.72] text-[#332E29]" style={{ fontFamily: SERIF }}>
        Most people who lead with drive aren't looking to slow down - and this isn't about doing less. It's more that there's a steadier, more settled sense of yourself available, one that doesn't depend on the next thing going right. Safety and Play are where that comes from. Start with the domain you'd like to understand first.
      </p>
    </article>
  );
}

function PathwayActionCard({
  door,
  highlightedDomain,
  onHighlight,
  className = '',
  index,
}: {
  door: (typeof doorways)[number];
  highlightedDomain: DomainKey | null;
  onHighlight: (domain: DomainKey | null) => void;
  className?: string;
  index: number;
}) {
  const active = highlightedDomain === door.domain;
  const dimmed = highlightedDomain !== null && !active;

  return (
    <motion.button
      type="button"
      onClick={() => document.getElementById(door.target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
      onMouseEnter={() => onHighlight(door.domain)}
      onMouseLeave={() => onHighlight(null)}
      onFocus={() => onHighlight(door.domain)}
      onBlur={() => onHighlight(null)}
      className={`group relative min-h-[174px] overflow-hidden rounded-[24px] border p-5 text-left shadow-[0_24px_62px_-54px_rgba(26,22,20,0.52)] transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/22 ${className}`}
      style={{
        borderColor: active ? door.color : '#E6DCCF',
        background: active
          ? `linear-gradient(140deg, #FFFCF7 0%, ${door.color}14 100%)`
          : 'rgba(255, 252, 247, 0.82)',
        opacity: dimmed ? 0.66 : 1,
      }}
      initial={{ opacity: 0, y: 14, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.38, delay: index * 0.06 }}
    >
      <div
        className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full opacity-18 blur-2xl transition-opacity group-hover:opacity-45"
        style={{ background: `radial-gradient(circle, ${door.color}8F, transparent 70%)` }}
      />
      <motion.div
        className="absolute inset-x-5 top-0 h-[3px] rounded-full"
        style={{ backgroundColor: door.color }}
        animate={{ opacity: active ? [0.78, 1, 0.78] : 0.72 }}
        transition={{ duration: 2.3, repeat: active ? Infinity : 0, ease: 'easeInOut' }}
      />
      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[13px] font-extrabold uppercase tracking-[0.16em]" style={{ color: door.color }}>
              {door.domain}
            </p>
            <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#8E857B]">
              {door.result}
            </p>
          </div>
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/82 transition-transform group-hover:translate-x-1" style={{ color: door.color }}>
            <ArrowRight size={16} strokeWidth={2.1} />
          </span>
        </div>
        <p className="mt-5 text-[18px] leading-[1.18] text-[#1D1815]" style={{ fontFamily: SERIF }}>
          {door.copy}
        </p>
        <p className="mt-auto pt-4 text-[13px] leading-relaxed text-[#70675E]" style={{ fontWeight: 300 }}>
          {door.hook}
        </p>
      </div>
    </motion.button>
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
  onSelect,
}: {
  activeState: number;
  onSelect: (index: number) => void;
}) {
  return (
    <nav className="mb-12 mt-2 max-w-[690px]" aria-label="Shape story states">
      <div className="relative">
        <div className="absolute left-0 right-0 top-[calc(100%+0.55rem)] h-px bg-[#E3DBD0]" aria-hidden="true" />
        <motion.div
          className="absolute left-0 top-[calc(100%+0.5rem)] h-[2px] rounded-full bg-[#FF5A1F]"
          animate={{ width: `${((activeState + 1) / stateNav.length) * 100}%` }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {stateNav.map((item, index) => {
              const active = activeState === index;
              const passed = activeState >= index;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => onSelect(index)}
                  className="group rounded-sm px-1.5 py-2 text-left focus:outline-none focus-visible:underline focus-visible:decoration-[#DC4C0C]/45 focus-visible:decoration-2 focus-visible:underline-offset-4"
                  aria-current={active}
                  aria-label={`Show ${item.label}`}
                >
                  <span
                    className="block whitespace-nowrap text-[10px] font-extrabold uppercase leading-none tracking-[0.13em] transition-colors"
                    style={{ color: active ? NAV_ORANGE : passed ? '#5F554B' : '#9A9288' }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
        </div>
      </div>
    </nav>
  );
}

function StateArrowControls({
  activeState,
  onPrevious,
  onNext,
  className = '',
}: {
  activeState: number;
  onPrevious: () => void;
  onNext: () => void;
  className?: string;
}) {
  return (
    <div className={`flex justify-end gap-2.5 ${className}`}>
      <button
        type="button"
        onClick={onPrevious}
        disabled={activeState === 0}
        className="grid h-9 w-9 place-items-center rounded-full border border-[#DCD2C6] bg-white/68 text-[#786F66] transition-colors hover:border-[#CBBFB2] hover:bg-white disabled:cursor-default disabled:opacity-28 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/18"
        aria-label="Previous shape state"
      >
        <ArrowLeft size={16} strokeWidth={2} />
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={activeState === stateNav.length - 1}
        className="grid h-9 w-9 place-items-center rounded-full bg-[#F2551A] text-white shadow-[0_14px_24px_-20px_rgba(220,76,12,0.75)] transition-colors hover:bg-[#DC4C0C] disabled:cursor-default disabled:bg-[#D9D0C4] disabled:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/22"
        aria-label="Next shape state"
      >
        <ArrowRight size={16} strokeWidth={2} />
      </button>
    </div>
  );
}

function EvolvingShape({
  state,
  highlightedDomain = null,
  compact = false,
}: {
  state: number;
  highlightedDomain?: DomainKey | null;
  compact?: boolean;
}) {
  const centre = 150;
  const maxRadius = 116;
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
  const challengeBeyond = point(-90, maxRadius + 6);
  const svgViewBox = state === 2 ? '-18 -24 336 350' : '-18 -18 336 336';
  const labelPoint = (domain: keyof typeof PROFILE_SCORES) => {
    if (domain === 'Challenge') return { x: centre, y: rim.Challenge.y - 30, anchor: 'middle' as const };
    if (domain === 'Safety') return { x: centre - 70, y: centre + 100, anchor: 'middle' as const };
    return { x: centre + 70, y: centre + 100, anchor: 'middle' as const };
  };
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
    <div className={`relative mx-auto w-full ${compact ? 'max-w-[430px] pb-1 pt-0' : 'max-w-[860px] pb-14 pt-4 lg:w-[108%]'}`}>
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

      <svg viewBox={svgViewBox} className={`relative z-10 mx-auto w-full overflow-visible ${compact ? 'max-w-[430px]' : state === 2 ? 'max-w-[760px]' : 'max-w-[740px]'}`} aria-labelledby="evolvingShapeTitle evolvingShapeDesc" role="img">
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
          <radialGradient id="pathwayChoiceBloom" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#FFF2C8" stopOpacity="0.88" />
            <stop offset="0.35" stopColor="#FFAB00" stopOpacity="0.22" />
            <stop offset="0.72" stopColor="#42A68E" stopOpacity="0.12" />
            <stop offset="1" stopColor="#F2551A" stopOpacity="0" />
          </radialGradient>
          <filter id="pathwaySparkGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="3.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
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
          const label = labelPoint(axis.key);
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
                textAnchor={label.anchor}
                dominantBaseline="middle"
                fill={axisColor}
                fillOpacity={mutedForLead ? 0.48 : mutedForPeak ? 0.54 : 1}
                fontSize="10.6"
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
          <path d={`M${centre} ${centre} L${plotted.Safety.x} ${plotted.Safety.y}`} fill="none" stroke="#9ECABD" strokeWidth="3.2" strokeLinecap="round" strokeOpacity="0.4" />
          <path d={`M${centre} ${centre} L${plotted.Play.x} ${plotted.Play.y}`} fill="none" stroke="#E7C879" strokeWidth="3.2" strokeLinecap="round" strokeOpacity="0.4" />
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
            cx: [centre, centre, centre, plotted.Challenge.x, plotted.Challenge.x],
            cy: [centre, centre, centre, plotted.Challenge.y, plotted.Challenge.y],
            opacity: [0, 0.82, 0.94, 1, 0],
          }}
          transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut', times: [0, 0.12, 0.24, 0.78, 1] }}
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
          stroke="#A49D94"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeOpacity="0.28"
        />
        <motion.path
          d={`M${centre} ${centre} L${rim.Safety.x} ${rim.Safety.y}`}
          fill="none"
          stroke={SAFETY}
          strokeWidth="5"
          strokeLinecap="round"
          animate={{ opacity: [0.18, 0.95, 0.18], strokeWidth: [3.2, 5.8, 3.2] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d={`M${centre} ${centre} L${rim.Play.x} ${rim.Play.y}`}
          fill="none"
          stroke={PLAY}
          strokeWidth="5"
          strokeLinecap="round"
          animate={{ opacity: [0.16, 0.94, 0.16], strokeWidth: [3.1, 5.8, 3.1] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 2.4 }}
        />
        <motion.path
          d={`M${centre} ${centre} L${rim.Safety.x} ${rim.Safety.y}`}
          fill="none"
          stroke={SAFETY}
          strokeWidth="12"
          strokeLinecap="round"
          animate={{ opacity: [0, 0.36, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d={`M${centre} ${centre} L${rim.Play.x} ${rim.Play.y}`}
          fill="none"
          stroke={PLAY}
          strokeWidth="12"
          strokeLinecap="round"
          animate={{ opacity: [0, 0.34, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 2.4 }}
        />
        <circle cx={rim.Challenge.x} cy={rim.Challenge.y} r="5.8" fill="#9E978E" stroke="#FFF8F0" strokeWidth="1.6" />
        <motion.circle
          cx={rim.Challenge.x}
          cy={rim.Challenge.y}
          r="10"
          fill="#8E877E"
          animate={{ opacity: [0.05, 0.12, 0.05], scale: [0.88, 1.06, 0.88] }}
          transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle
          cx={rim.Safety.x}
          cy={rim.Safety.y}
          r="5.8"
          fill={SAFETY}
          stroke="#FFF8F0"
          strokeWidth="1.6"
          animate={{ opacity: [0.34, 1, 0.34], scale: [0.86, 1.25, 0.86] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle
          cx={rim.Safety.x}
          cy={rim.Safety.y}
          r="13"
          fill={SAFETY}
          animate={{ opacity: [0, 0.34, 0], scale: [0.68, 1.32, 0.68] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle
          cx={rim.Play.x}
          cy={rim.Play.y}
          r="5.8"
          fill={PLAY}
          stroke="#FFF8F0"
          strokeWidth="1.6"
          animate={{ opacity: [0.32, 1, 0.32], scale: [0.86, 1.25, 0.86] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 2.4 }}
        />
        <motion.circle
          cx={rim.Play.x}
          cy={rim.Play.y}
          r="13"
          fill={PLAY}
          animate={{ opacity: [0, 0.34, 0], scale: [0.68, 1.32, 0.68] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 2.4 }}
        />
        <circle cx={centre} cy={centre} r="5.8" fill="#FFF8F0" stroke="#D8CEC1" strokeWidth="1.4" />
        <motion.g
          animate={{
            y: [centre, centre, challengeBeyond.y, challengeBeyond.y, centre, centre],
            opacity: [1, 1, 1, 1, 1, 1],
            scale: [1, 1, 1.06, 1.02, 1, 1],
          }}
          transition={{
            duration: 5.8,
            repeat: Infinity,
            times: [0, 0.14, 0.64, 0.76, 0.94, 1],
            ease: ['linear', [0.58, 0, 0.9, 1], 'linear', [0.68, 0, 1, 0.62], 'linear'],
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
            animate={{
              y1: [18, 18, 16, 8, 18, 18],
              y2: [36, 36, 40, 44, 30, 36],
              opacity: [0.1, 0.12, 0.72, 0.42, 0.88, 0.1],
            }}
            transition={{
              duration: 5.8,
              repeat: Infinity,
              times: [0, 0.14, 0.64, 0.76, 0.94, 1],
              ease: ['linear', [0.58, 0, 0.9, 1], 'linear', [0.68, 0, 1, 0.62], 'linear'],
            }}
          />
          <circle cx={centre} cy="0" r="10" fill="#F2551A" opacity="0.12" />
          <circle cx={centre} cy="0" r="6.2" fill="#FFF3D2" opacity="0.82" />
          <circle cx={centre} cy="0" r="4.1" fill="#F2551A" opacity="0.9" />
        </motion.g>
      </motion.g>

      <motion.g
        animate={{ opacity: state === 3 ? 1 : 0 }}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        pointerEvents="none"
      >
        <motion.circle
          cx={centre}
          cy={centre}
          r="54"
          fill="url(#pathwayChoiceBloom)"
          animate={{ opacity: [0.45, 0.88, 0.45], scale: [0.86, 1.1, 0.86] }}
          transition={{ duration: 6.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: `${centre}px ${centre}px` }}
        />
        <motion.path
          d={`M${plotted.Safety.x} ${plotted.Safety.y} Q${centre} ${centre - 34} ${plotted.Play.x} ${plotted.Play.y}`}
          fill="none"
          stroke="#E8DED0"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray="2 8"
          animate={{ opacity: [0.16, 0.5, 0.16], pathLength: [0.12, 1, 0.12] }}
          transition={{ duration: 7.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d={`M${plotted.Safety.x} ${plotted.Safety.y} Q${centre - 24} ${centre - 18} ${plotted.Challenge.x} ${plotted.Challenge.y}`}
          fill="none"
          stroke="#E8DED0"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray="2 8"
          animate={{ opacity: [0.12, 0.38, 0.12], pathLength: [0.2, 1, 0.2] }}
          transition={{ duration: 8.4, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
        />
        <motion.path
          d={`M${plotted.Play.x} ${plotted.Play.y} Q${centre + 24} ${centre - 18} ${plotted.Challenge.x} ${plotted.Challenge.y}`}
          fill="none"
          stroke="#E8DED0"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray="2 8"
          animate={{ opacity: [0.12, 0.38, 0.12], pathLength: [0.2, 1, 0.2] }}
          transition={{ duration: 8.4, repeat: Infinity, ease: 'easeInOut', delay: 1.15 }}
        />
        {[
          { key: 'Safety' as DomainKey, point: plotted.Safety, color: SAFETY, delay: 0 },
          { key: 'Play' as DomainKey, point: plotted.Play, color: PLAY, delay: 1.45 },
          { key: 'Challenge' as DomainKey, point: plotted.Challenge, color: CHALLENGE, delay: 2.9 },
        ].map(route => {
          const selected = highlightedDomain === route.key;
          const dimmed = highlightedDomain !== null && !selected;
          return (
            <g key={route.key}>
              <motion.path
                d={`M${centre} ${centre} L${route.point.x} ${route.point.y}`}
                fill="none"
                stroke={route.color}
                strokeWidth={selected ? 5.6 : 3.8}
                strokeLinecap="round"
                animate={{
                  opacity: dimmed ? 0.16 : selected ? [0.82, 1, 0.82] : [0.24, 0.92, 0.24],
                  strokeWidth: selected ? [4.8, 6.2, 4.8] : [2.1, 5.1, 2.1],
                }}
                transition={{ duration: selected ? 2.4 : 4.2, repeat: Infinity, ease: 'easeInOut', delay: selected ? 0 : route.delay }}
              />
              <motion.path
                d={`M${centre} ${centre} L${route.point.x} ${route.point.y}`}
                fill="none"
                stroke={route.color}
                strokeWidth={selected ? 22 : 16}
                strokeLinecap="round"
                animate={{ opacity: dimmed ? 0 : selected ? [0.08, 0.28, 0.08] : [0, 0.2, 0] }}
                transition={{ duration: selected ? 2.4 : 4.2, repeat: Infinity, ease: 'easeInOut', delay: selected ? 0 : route.delay }}
              />
              <motion.circle
                cx={route.point.x}
                cy={route.point.y}
                r={selected ? 8.8 : 7.4}
                fill={route.color}
                stroke="#FFF8F0"
                strokeWidth="2"
                filter="url(#pathwaySparkGlow)"
                animate={{ scale: dimmed ? 0.78 : selected ? [1.05, 1.36, 1.05] : [0.86, 1.24, 0.86], opacity: dimmed ? 0.34 : [0.72, 1, 0.72] }}
                transition={{ duration: selected ? 2.4 : 4.2, repeat: Infinity, ease: 'easeInOut', delay: selected ? 0 : route.delay }}
              />
            </g>
          );
        })}
        <motion.circle
          cx={centre}
          cy={centre}
          r="9.4"
          fill="#FFF8F0"
          stroke="#E4D8C8"
          strokeWidth="1.4"
          animate={{ r: [7.2, 10.6, 7.2], opacity: [0.88, 1, 0.88] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle
          r="5.2"
          fill="#FFF3D2"
          stroke="#F2551A"
          strokeWidth="2"
          animate={{
            cx: [centre, plotted.Safety.x, centre, plotted.Play.x, centre, plotted.Challenge.x, centre],
            cy: [centre, plotted.Safety.y, centre, plotted.Play.y, centre, plotted.Challenge.y, centre],
            opacity: [0.86, 1, 0.72, 1, 0.72, 1, 0.86],
          }}
          transition={{ duration: 8.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {[0, 1, 2, 3, 4].map(index => {
          const spark = [
            { x: centre - 50, y: centre - 22, color: SAFETY },
            { x: centre + 46, y: centre - 12, color: PLAY },
            { x: centre + 8, y: centre - 76, color: CHALLENGE },
            { x: centre - 22, y: centre + 30, color: '#FFBB30' },
            { x: centre + 36, y: centre + 28, color: '#F2551A' },
          ][index];
          return (
            <motion.circle
              key={index}
              cx={spark.x}
              cy={spark.y}
              r="2.6"
              fill={spark.color}
              animate={{ opacity: [0.05, 0.72, 0.05], scale: [0.72, 1.2, 0.72] }}
              transition={{ duration: 3.9, repeat: Infinity, ease: 'easeInOut', delay: index * 0.42 }}
              style={{ transformOrigin: `${spark.x}px ${spark.y}px` }}
            />
          );
        })}
      </motion.g>

      </svg>
    </div>
  );
}
