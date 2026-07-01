import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, DoorOpen, Eye, Flame, Info, Shield, Sun, Zap } from 'lucide-react';
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
    color: '#B83F14',
  },
  {
    title: 'The quieter base',
    body: 'Safety and Play sit lower, so the profile reads as strong but uneven.',
    color: SAFETY,
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
    title: 'Choose a domain to open',
    color: CHALLENGE,
  },
];

const doorways = [
  {
    domain: 'Safety',
    promise: 'See where steadiness is available, and where it has to be earned.',
    hook: 'Open this if you want to understand your relationship with calm, trust, and ease.',
    color: SAFETY,
    Icon: Shield,
    target: 'safety',
  },
  {
    domain: 'Play',
    promise: 'See what restores aliveness, pleasure, and flexibility.',
    hook: 'Open this if you want to understand where lightness and enjoyment are still available.',
    color: PLAY,
    Icon: Sun,
    target: 'play',
  },
  {
    domain: 'Challenge',
    promise: 'See the engine behind your drive and direction.',
    hook: 'Open this if you want to understand the strongest part of the whole profile.',
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
                  backgroundColor: activeSlide === index ? NAV_ORANGE : '#D2C8BB',
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
        <path d="M74 238 C122 214 158 169 174 126 C187 90 206 61 238 44" fill="none" stroke="#E7DED3" strokeWidth="16" strokeLinecap="round" />
        <path d="M74 238 C122 214 158 169 174 126 C187 90 206 61 238 44" fill="none" stroke="url(#movementLine)" strokeWidth="3" strokeLinecap="round" />
        {[92, 128, 164, 198].map((x, index) => (
          <line key={x} x1={x} y1={245 - index * 38} x2={x} y2={258 - index * 38} stroke="#BFB5A8" strokeWidth="2" strokeLinecap="round" />
        ))}
        <circle cx="74" cy="238" r="7" fill="#B8B0A5" opacity="0.78" />
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
        {['start', 'rising', 'apex'].map(label => (
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
    <div className="relative min-h-[350px] overflow-hidden rounded-[30px] border border-[#372337] bg-[#17121A] p-5 shadow-[0_24px_70px_-45px_rgba(26,18,28,0.82)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(122,61,154,0.28),transparent_35%),radial-gradient(circle_at_50%_14%,rgba(242,85,26,0.18),transparent_34%),linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0))]" />
      <div className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
      <svg viewBox="0 0 409 356" className="relative z-10 h-full min-h-[300px] w-full overflow-visible" aria-labelledby="revelationTitle revelationDesc" role="img">
        <title id="revelationTitle">Hidden organising force inside a Sharp Peak</title>
        <desc id="revelationDesc">The visible apex is bright above a hidden centre that sends organising currents through the whole shape.</desc>
        <defs>
          <linearGradient id="hiddenCurrent" x1="204" x2="204" y1="265" y2="70" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7A3D9A" stopOpacity="0.2" />
            <stop offset="0.52" stopColor="#7A3D9A" stopOpacity="0.56" />
            <stop offset="1" stopColor="#F2551A" stopOpacity="0.78" />
          </linearGradient>
          <filter id="insideGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g transform="translate(0 8)">
          <path d={DOMAIN_HEX_OUTLINES.Challenge} fill="#F2551A" opacity="0.11" />
          <path d={DOMAIN_HEX_OUTLINES.Safety} fill="#42A68E" opacity="0.055" />
          <path d={DOMAIN_HEX_OUTLINES.Play} fill="#FFAB00" opacity="0.055" />
          <path d={DOMAIN_HEX_OUTLINES.Challenge} fill="none" stroke="#FF6A2D" strokeOpacity="0.92" strokeWidth="2.4" filter="url(#insideGlow)" />
          <path d={DOMAIN_HEX_OUTLINES.Safety} fill="none" stroke="#42E0C5" strokeOpacity="0.32" strokeWidth="2" />
          <path d={DOMAIN_HEX_OUTLINES.Play} fill="none" stroke="#FFC45A" strokeOpacity="0.32" strokeWidth="2" />

          <motion.path
            d="M83 282 C121 234 168 226 204.5 206 C241 226 288 234 326 282"
            fill="none"
            stroke="#C989E2"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeOpacity="0.25"
            strokeDasharray="10 13"
            animate={{ strokeDashoffset: [0, -46] }}
            transition={{ duration: 5.6, repeat: Infinity, ease: 'linear' }}
          />
          <motion.path
            d="M122 276 C152 228 183 224 204.5 206 C226 224 257 228 287 276"
            fill="none"
            stroke="#C989E2"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeOpacity="0.42"
            strokeDasharray="8 12"
            animate={{ strokeDashoffset: [0, -40] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'linear' }}
          />
          <motion.path
            d="M204.5 255 C204.5 216 204.5 170 204.5 101"
            fill="none"
            stroke="url(#hiddenCurrent)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="20 18"
            animate={{ strokeDashoffset: [38, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.circle
            cx="204.5"
            cy="206"
            r="42"
            fill="none"
            stroke="#C989E2"
            strokeOpacity="0.2"
            strokeWidth="1.6"
            animate={{ r: [32, 48, 32], opacity: [0.72, 0.24, 0.72] }}
            transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="204.5"
            cy="206"
            r="17"
            fill="#C989E2"
            opacity="0.24"
            animate={{ scale: [0.9, 1.18, 0.9] }}
            transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <circle cx="204.5" cy="206" r="6.5" fill="#E6B4FF" />

          <motion.circle
            cx="204.5"
            cy="206"
            r="4.5"
            fill="#F2551A"
            animate={{ cy: [206, 170, 124, 101], opacity: [0, 0.65, 1, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="204.5"
            cy="206"
            r="3.5"
            fill="#E6B4FF"
            animate={{ cx: [204.5, 158, 122], cy: [206, 230, 276], opacity: [0, 0.7, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          />
          <motion.circle
            cx="204.5"
            cy="206"
            r="3.5"
            fill="#E6B4FF"
            animate={{ cx: [204.5, 251, 287], cy: [206, 230, 276], opacity: [0, 0.7, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.65 }}
          />

          <g textAnchor="middle">
            <text x="204.5" y="64" fill="#FF7542" fontSize="11" fontWeight="900" letterSpacing="1.6">VISIBLE PEAK</text>
            <text x="204.5" y="304" fill="#E6B4FF" fontSize="11" fontWeight="900" letterSpacing="1.6">HIDDEN ORGANISING WORK</text>
          </g>
        </g>
      </svg>
    </div>
  );
}

function DoorwaySlide() {
  const openDoor = (target: string) => {
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="space-y-8">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-t-full rounded-b-[18px] bg-[#211A17] text-white shadow-[0_20px_48px_-34px_rgba(26,22,20,0.72)]">
          <DoorOpen size={30} strokeWidth={1.7} />
        </div>
        <h3
          style={{
            fontFamily: SERIF,
            fontSize: 'clamp(2rem, 3.6vw, 3.25rem)',
            lineHeight: 1,
            letterSpacing: '-0.045em',
            color: INK,
          }}
        >
          Where do you want to go first?
        </h3>
        <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-[#4A4139]" style={{ fontWeight: 300 }}>
          Choose the domain you want to read first. Each door answers a different question about this Sharp Peak.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {doorways.map((door, index) => {
          const DoorIcon = door.Icon;
          return (
            <motion.button
              key={door.domain}
              type="button"
              onClick={() => openDoor(door.target)}
              className="group relative min-h-[315px] overflow-hidden rounded-[28px] border border-[#E6DED3] bg-[#FFFCF7] p-5 text-left shadow-[0_24px_68px_-58px_rgba(26,22,20,0.68)] transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/25"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: index * 0.08 }}
            >
              <div
                className="absolute inset-x-5 top-5 h-[140px] rounded-t-[90px] rounded-b-[22px] border transition-transform duration-500 group-hover:-translate-y-1"
                style={{
                  borderColor: `${door.color}45`,
                  background: `linear-gradient(180deg, ${door.color}24, ${door.color}0 68%), radial-gradient(circle at 50% 30%, ${door.color}26, transparent 60%)`,
                }}
              />
              <motion.div
                className="absolute left-1/2 top-10 h-20 w-20 -translate-x-1/2 rounded-full blur-2xl"
                style={{ backgroundColor: door.color }}
                animate={{ opacity: [0.16, 0.38, 0.16], scale: [0.92, 1.08, 0.92] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: index * 0.35 }}
              />
              <div className="relative flex h-full flex-col">
                <div className="mx-auto mt-4 grid h-14 w-14 place-items-center rounded-full bg-white/82 shadow-[0_16px_36px_-28px_rgba(26,22,20,0.72)]" style={{ color: door.color }}>
                  <DoorIcon size={24} strokeWidth={2.1} />
                </div>
                <div className="mt-24">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.17em]" style={{ color: door.color }}>
                    Open {door.domain}
                  </p>
                  <p className="mt-3 text-[17px] leading-snug text-[#17120F]" style={{ fontFamily: SERIF }}>
                    {door.promise}
                  </p>
                  <p className="mt-3 text-[13px] leading-relaxed text-[#6B635A]" style={{ fontWeight: 300 }}>
                    {door.hook}
                  </p>
                </div>
                <div className="mt-auto flex items-center justify-between pt-5">
                  <span className="h-px flex-1" style={{ backgroundColor: `${door.color}42` }} />
                  <ArrowRight className="ml-3 opacity-55 transition-transform group-hover:translate-x-1 group-hover:opacity-90" size={18} strokeWidth={2.2} style={{ color: door.color }} />
                </div>
              </div>
            </motion.button>
          );
        })}
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
        className="absolute left-1/2 top-[4%] h-[50%] w-[58%] -translate-x-1/2 rounded-full blur-2xl"
        style={{ background: 'radial-gradient(circle, rgba(242,85,26,0.42), rgba(242,85,26,0.18) 46%, rgba(255,171,0,0.08) 62%, rgba(242,85,26,0) 76%)' }}
        animate={{ opacity: [0.62, 0.98, 0.62], scale: [0.94, 1.08, 0.94] }}
        transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-1/2 top-[15%] h-[28%] w-[34%] -translate-x-1/2 rounded-full border border-[#F2551A]/25"
        animate={{ opacity: [0.2, 0.72, 0.2], scale: [0.86, 1.12, 0.86] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
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
