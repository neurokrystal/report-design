import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, DoorOpen, Eye, Flame, Info, Shield, Sparkles, Sun, Zap } from 'lucide-react';
import { useState } from 'react';
import { DOMAIN_HEX_OUTLINES, getScoreFillPath } from '../data/symbolFillPaths';

const SERIF = '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif';
const NAV_ORANGE = '#FF5A1F';
const CHALLENGE = '#DC4C0C';
const SAFETY = '#42A68E';
const PLAY = '#FFAB00';
const INK = '#15110F';

const shapePoints = [
  {
    title: 'The visible apex',
    body: 'One domain rises well above the rest of the profile.',
    color: CHALLENGE,
  },
  {
    title: 'The strongest current',
    body: 'Challenge is active, directional, and highly available.',
    color: CHALLENGE,
  },
  {
    title: 'The quieter base',
    body: 'Safety and Play sit lower, so the profile reads as strong but uneven.',
    color: '#9C948B',
  },
];

const slides = [
  {
    title: 'How this shape moves',
    color: CHALLENGE,
  },
  {
    title: "What's hard to see from inside it",
    color: '#7A3D9A',
  },
  {
    title: 'Where the deep dive opens',
    color: PLAY,
  },
];

const doorways = [
  {
    domain: 'Safety',
    promise: 'Find where steadiness is available, and where it has to be earned.',
    hook: 'For the part of you that wants to know why ease does not always land.',
    color: SAFETY,
    Icon: Shield,
    target: 'safety',
  },
  {
    domain: 'Play',
    promise: 'Find what restores aliveness, pleasure, and flexibility.',
    hook: 'For the part of you that wants life to feel less functional and more alive.',
    color: PLAY,
    Icon: Sun,
    target: 'play',
  },
  {
    domain: 'Challenge',
    promise: 'Find the engine behind your drive and direction.',
    hook: 'For the part of you that wants to understand the power of the peak.',
    color: CHALLENGE,
    Icon: Flame,
    target: 'challenge',
  },
];

export function YourShape() {
  const [infoOpen, setInfoOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = slides[activeSlide];
  const isFirst = activeSlide === 0;
  const isLast = activeSlide === slides.length - 1;

  const goToSlide = (direction: 1 | -1) => {
    setActiveSlide(current => Math.max(0, Math.min(slides.length - 1, current + direction)));
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
                  Your shape shows the relationship among the three domains. It is the first view of the profile as one living pattern.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="mb-7 h-[3px] w-10" style={{ backgroundColor: NAV_ORANGE }} />
      </header>

      <section className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(1.95rem, 3.5vw, 3.25rem)',
              fontWeight: 600,
              color: INK,
              letterSpacing: '-0.045em',
              lineHeight: 1,
            }}
          >
            Together, your domains form a Sharp Peak.
          </h2>
          <p className="mt-5 max-w-md text-[18px] leading-relaxed text-[#4D4945]" style={{ fontWeight: 300 }}>
            Your profile has one clear apex. Challenge rises above the other two domains, making the whole shape feel driven, purposeful, and visibly uneven.
          </p>
          <div className="mt-7 grid gap-3">
            {shapePoints.map((point, index) => (
              <motion.div
                key={point.title}
                className="relative overflow-hidden rounded-[20px] border border-[#E7DED3] bg-[#F8F4EE] p-4 shadow-[0_18px_44px_-40px_rgba(26,22,20,0.48)]"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
              >
                <div className="absolute inset-y-0 left-0 w-1.5" style={{ backgroundColor: point.color }} />
                <div className="flex gap-4 pl-1">
                  <span className="mt-1 h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: point.color }} />
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.16em]" style={{ color: point.color }}>
                      {point.title}
                    </p>
                    <p className="mt-2 text-[15.5px] leading-relaxed text-[#26211D]" style={{ fontWeight: 300 }}>
                      {point.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="flex justify-center lg:justify-end">
          <ShapeGraphic />
        </div>
      </section>

      <section className="relative overflow-hidden rounded-[34px] border border-[#E8E1D6] bg-[#F7F2EA] p-6 shadow-[0_30px_90px_-70px_rgba(26,22,20,0.7)] md:p-9">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F2551A]/45 to-transparent" />
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            background: `linear-gradient(135deg, ${slide.color}10 0%, rgba(255,255,255,0) 45%), radial-gradient(circle at 88% 18%, ${slide.color}14, transparent 32%)`,
          }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            className="relative min-h-[455px]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeSlide === 0 && <MovementSlide />}
            {activeSlide === 1 && <RevelationSlide />}
            {activeSlide === 2 && <DoorwaySlide />}
          </motion.div>
        </AnimatePresence>

        <div className="relative mt-8 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => goToSlide(-1)}
            disabled={isFirst}
            className="grid h-11 w-11 place-items-center rounded-full border border-[#DED6CB] bg-[#FDFCFA]/72 text-[#867E74] transition-colors hover:bg-white disabled:cursor-default disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/25"
            aria-label="Previous shape reading"
          >
            <ArrowLeft size={17} strokeWidth={2.35} />
          </button>
          <div className="flex items-center gap-2" aria-label="Shape reading progress">
            {slides.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setActiveSlide(index)}
                className="h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/25"
                style={{
                  width: activeSlide === index ? 36 : 10,
                  backgroundColor: activeSlide === index ? item.color : '#D2C8BB',
                }}
                aria-label={`Show ${item.title}`}
                aria-current={activeSlide === index}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => goToSlide(1)}
            disabled={isLast}
            className="grid h-11 w-11 place-items-center rounded-full bg-[#F2551A] text-white shadow-[0_16px_34px_-24px_rgba(220,76,12,0.8)] transition-colors hover:bg-[#DC4C0C] disabled:cursor-default disabled:bg-[#D9D0C4] disabled:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/25"
            aria-label="Next shape reading"
          >
            <ArrowRight size={17} strokeWidth={2.35} />
          </button>
        </div>
      </section>
    </div>
  );
}

function MovementSlide() {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.56fr_0.44fr] lg:items-center">
      <div>
        <h3
          style={{
            fontFamily: SERIF,
            fontSize: 'clamp(2rem, 3.7vw, 3.45rem)',
            lineHeight: 1,
            letterSpacing: '-0.045em',
            color: INK,
          }}
        >
          How this shape moves
        </h3>
        <p className="mt-7 max-w-2xl text-[21px] leading-[1.72] text-[#1F1A16]" style={{ fontFamily: SERIF }}>
          A Sharp Peak moves through the world by rising toward what matters. The person often recognises themselves in momentum, direction, development, responsibility, and the feeling of being pulled forward by something meaningful.
        </p>
        <div className="mt-8 flex gap-4 border-l border-[#F2551A]/45 pl-5">
          <Zap className="mt-1 shrink-0 text-[#F2551A]" size={21} strokeWidth={2.1} />
          <p className="max-w-xl text-[17px] leading-relaxed text-[#342D27]" style={{ fontWeight: 300 }}>
            The peak is not the problem. It is the most available part of the system, so movement often becomes the first way the whole profile finds coherence.
          </p>
        </div>
      </div>
      <MovementGraphic />
    </div>
  );
}

function MovementGraphic() {
  return (
    <div className="relative min-h-[330px] overflow-hidden rounded-[30px] border border-[#E8DED2] bg-[#FDFCFA]/72 p-6 shadow-[0_24px_60px_-54px_rgba(26,22,20,0.58)]">
      <svg viewBox="0 0 320 300" className="h-full min-h-[278px] w-full overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id="movementLine" x1="80" x2="238" y1="238" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D6CEC2" />
            <stop offset="1" stopColor="#F2551A" />
          </linearGradient>
        </defs>
        <path d="M74 238 C122 214 158 169 174 126 C187 90 206 61 238 44" fill="none" stroke="url(#movementLine)" strokeWidth="3" strokeLinecap="round" />
        <path d="M134 242 C160 214 184 205 228 206" fill="none" stroke="#FFAB00" strokeOpacity="0.42" strokeWidth="2" strokeLinecap="round" />
        <path d="M86 242 C111 220 132 213 162 215" fill="none" stroke="#42A68E" strokeOpacity="0.42" strokeWidth="2" strokeLinecap="round" />
        <circle cx="74" cy="238" r="7" fill="#42A68E" opacity="0.78" />
        <circle cx="228" cy="206" r="7" fill="#FFAB00" opacity="0.78" />
        <circle cx="238" cy="44" r="10" fill="#F2551A" />
        <motion.circle
          r="5.5"
          fill="#F2551A"
          animate={{ cx: [74, 132, 174, 238], cy: [238, 194, 126, 44], opacity: [0.35, 0.7, 1, 0.45] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <text x="238" y="26" textAnchor="middle" fill="#DC4C0C" fontSize="12" fontWeight="800">apex</text>
      </svg>
      <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-3">
        {['base', 'motion', 'meaning'].map((label, index) => (
          <span key={label} className="rounded-full bg-white/72 px-3 py-2 text-center text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#8C837A] ring-1 ring-[#E8DED2]">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function RevelationSlide() {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.55fr_0.45fr] lg:items-center">
      <div>
        <h3
          style={{
            fontFamily: SERIF,
            fontSize: 'clamp(2rem, 3.7vw, 3.45rem)',
            lineHeight: 1,
            letterSpacing: '-0.045em',
            color: INK,
          }}
        >
          What's hard to see from inside it
        </h3>
        <p className="mt-7 max-w-2xl text-[21px] leading-[1.72] text-[#1F1A16]" style={{ fontFamily: SERIF }}>
          From the inside, this can feel like strength, ambition, or simply being the person who keeps going. What is harder to see is that the peak may be creating coherence for the whole profile before the base has fully caught up.
        </p>
        <div className="mt-8 flex gap-4 border-l border-[#7A3D9A]/35 pl-5">
          <Eye className="mt-1 shrink-0 text-[#7A3D9A]" size={21} strokeWidth={2.1} />
          <p className="max-w-xl text-[17px] leading-relaxed text-[#342D27]" style={{ fontWeight: 300 }}>
            The sharpness is the clue: one part is carrying more visibility than the others.
          </p>
        </div>
      </div>
      <RevelationGraphic />
    </div>
  );
}

function RevelationGraphic() {
  return (
    <div className="relative min-h-[330px] overflow-hidden rounded-[30px] border border-[#E8DED2] bg-[#FDFCFA]/72 p-6 shadow-[0_24px_60px_-54px_rgba(26,22,20,0.58)]">
      <svg viewBox="0 0 409 356" className="relative z-10 h-full min-h-[278px] w-full overflow-visible" aria-labelledby="revelationTitle" role="img">
        <title id="revelationTitle">Sharp Peak outline with inner signal</title>
        <g transform="translate(0 8)">
          <path d={DOMAIN_HEX_OUTLINES.Challenge} fill="none" stroke="#DC4C0C" strokeOpacity="0.58" strokeWidth="2" />
          <path d={DOMAIN_HEX_OUTLINES.Safety} fill="none" stroke="#42A68E" strokeOpacity="0.36" strokeWidth="2" />
          <path d={DOMAIN_HEX_OUTLINES.Play} fill="none" stroke="#FFAB00" strokeOpacity="0.36" strokeWidth="2" />
          <motion.circle
            cx="204.5"
            cy="206"
            r="18"
            fill="#7A3D9A"
            opacity="0.16"
            animate={{ r: [14, 28, 14], opacity: [0.18, 0.05, 0.18] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="204.5"
            cy="206"
            r="6"
            fill="#7A3D9A"
            animate={{ opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <path d="M204.5 206 C204.5 178 204.5 154 204.5 128" fill="none" stroke="#7A3D9A" strokeOpacity="0.22" strokeWidth="2" strokeLinecap="round" />
        </g>
      </svg>
      <div className="absolute bottom-6 left-6 right-6 rounded-[20px] bg-white/72 p-4 ring-1 ring-[#E8DED2]">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#7A3D9A]">inside signal</p>
        <p className="mt-2 text-[14px] leading-relaxed text-[#514940]" style={{ fontWeight: 300 }}>
          The profile may feel coherent from the inside because the peak is doing so much organising work.
        </p>
      </div>
    </div>
  );
}

function DoorwaySlide() {
  const openDoor = (target: string) => {
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div>
      <div className="grid gap-8 xl:grid-cols-[0.35fr_0.65fr] xl:items-center">
        <div>
          <div className="relative mx-auto grid h-32 w-32 place-items-center rounded-full bg-[#FFF4DB] text-[#B47700] shadow-[0_22px_54px_-42px_rgba(180,119,0,0.55)] ring-1 ring-[#F2D58E]">
            <motion.div
              className="absolute inset-5 rounded-full border border-[#FFAB00]/35"
              animate={{ scale: [0.95, 1.08, 0.95], opacity: [0.35, 0.8, 0.35] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <DoorOpen size={48} strokeWidth={1.65} />
          </div>
          <h3
            className="mt-7 text-center xl:text-left"
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(2rem, 3.6vw, 3.25rem)',
              lineHeight: 1,
              letterSpacing: '-0.045em',
              color: INK,
            }}
          >
            Where the deep dive opens
          </h3>
          <p className="mt-5 text-center text-[17px] leading-relaxed text-[#4A4139] xl:text-left" style={{ fontWeight: 300 }}>
            Each doorway answers a different kind of curiosity inside the same shape. Start with the one that feels most alive.
          </p>
        </div>

        <div className="grid gap-3">
          {doorways.map((door, index) => {
            const DoorIcon = door.Icon;
            return (
              <motion.button
                key={door.domain}
                type="button"
                onClick={() => openDoor(door.target)}
                className="group relative grid gap-4 overflow-hidden rounded-[24px] border border-[#E6DED3] bg-white/84 p-5 text-left shadow-[0_20px_58px_-50px_rgba(26,22,20,0.65)] transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/25 md:grid-cols-[auto_1fr_auto] md:items-center"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.38, delay: index * 0.08 }}
              >
                <div className="absolute inset-y-0 left-0 w-1.5" style={{ backgroundColor: door.color }} />
                <span className="grid h-12 w-12 place-items-center rounded-full" style={{ color: door.color, backgroundColor: `${door.color}16` }}>
                  <DoorIcon size={22} strokeWidth={2.1} />
                </span>
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.17em]" style={{ color: door.color }}>{door.domain}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#17120F]" style={{ fontWeight: 300 }}>
                    {door.promise}
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-[#6B635A]" style={{ fontWeight: 300 }}>
                    {door.hook}
                  </p>
                </div>
                <ArrowRight className="opacity-45 transition-transform group-hover:translate-x-1 group-hover:opacity-80" size={18} strokeWidth={2.2} style={{ color: door.color }} />
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ShapeGraphic() {
  const fills = {
    Safety: getScoreFillPath('Safety', 27),
    Play: getScoreFillPath('Play', 41),
    Challenge: getScoreFillPath('Challenge', 78),
  };

  return (
    <div className="relative w-full max-w-[650px]">
      <motion.div
        className="absolute left-1/2 top-[8%] h-[42%] w-[50%] -translate-x-1/2 rounded-full blur-2xl"
        style={{ background: 'radial-gradient(circle, rgba(242,85,26,0.32), rgba(242,85,26,0.1) 54%, rgba(242,85,26,0) 72%)' }}
        animate={{ opacity: [0.45, 0.82, 0.45], scale: [0.96, 1.04, 0.96] }}
        transition={{ duration: 6.4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-x-14 bottom-[5%] h-20 rounded-full bg-[radial-gradient(ellipse,rgba(26,22,20,0.12),transparent_70%)] blur-xl" />
      <svg viewBox="0 0 409 356" className="relative z-10 w-full overflow-visible" aria-labelledby="shapeGraphicTitle shapeGraphicDesc" role="img">
        <title id="shapeGraphicTitle">Sharp Peak shape</title>
        <desc id="shapeGraphicDesc">Challenge is high, Play is low, and Safety is very low, creating a sharp peak shape.</desc>
        <defs>
          <filter id="scoreShapeDrop" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#1A1614" floodOpacity="0.13" />
          </filter>
        </defs>

        <g filter="url(#scoreShapeDrop)">
          {fills.Safety && <path d={fills.Safety} fill={SAFETY} opacity="0.9" />}
          {fills.Play && <path d={fills.Play} fill={PLAY} opacity="0.82" />}
          {fills.Challenge && (
            <motion.path
              d={fills.Challenge}
              fill="#F2551A"
              initial={{ y: 12, opacity: 0.88 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
        </g>

        <g textAnchor="middle">
          <text x="204.5" y="18" fill={CHALLENGE} fontSize="18" fontWeight="800" letterSpacing="0">Challenge</text>
          <text x="204.5" y="39" fill="#8B3A18" fontSize="13" fontWeight="700">High</text>

          <text x="68" y="332" fill="#166F5F" fontSize="18" fontWeight="800" letterSpacing="0">Safety</text>
          <text x="68" y="352" fill="#5D6864" fontSize="13" fontWeight="700">Very Low</text>

          <text x="341" y="332" fill="#B47700" fontSize="18" fontWeight="800" letterSpacing="0">Play</text>
          <text x="341" y="352" fill="#6D6254" fontSize="13" fontWeight="700">Low</text>
        </g>
      </svg>
    </div>
  );
}
