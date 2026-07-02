import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Eye, Flame, Info, Shield, Sun, Zap } from 'lucide-react';
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
    promise: 'Where steadiness is available, and where it has to be earned.',
    hook: 'Read this first if you want to understand calm, trust, and ease.',
    color: SAFETY,
    Icon: Shield,
    target: 'safety',
  },
  {
    domain: 'Play',
    promise: 'What restores aliveness, pleasure, and flexibility.',
    hook: 'Read this first if you want to understand lightness and enjoyment.',
    color: PLAY,
    Icon: Sun,
    target: 'play',
  },
  {
    domain: 'Challenge',
    promise: 'The engine behind your drive and direction.',
    hook: 'Read this first if you want to understand the strongest part of the profile.',
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
          <linearGradient id="playLine" x1="98" x2="241" y1="228" y2="174" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E8DED2" />
            <stop offset="1" stopColor="#FFAB00" />
          </linearGradient>
          <linearGradient id="safetyLine" x1="72" x2="230" y1="250" y2="234" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D8D0C5" />
            <stop offset="1" stopColor="#42A68E" />
          </linearGradient>
        </defs>
        <path d="M66 248 C112 240 166 238 230 224" fill="none" stroke="url(#safetyLine)" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.72" />
        <path d="M94 232 C132 210 172 202 242 170" fill="none" stroke="url(#playLine)" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.76" />
        <path d="M74 238 C122 214 158 169 174 126 C187 90 206 61 238 44" fill="none" stroke="#E7DED3" strokeWidth="16" strokeLinecap="round" />
        <path d="M74 238 C122 214 158 169 174 126 C187 90 206 61 238 44" fill="none" stroke="url(#movementLine)" strokeWidth="3" strokeLinecap="round" />
        {[92, 128, 164, 198].map((x, index) => (
          <line key={x} x1={x} y1={245 - index * 38} x2={x} y2={258 - index * 38} stroke="#BFB5A8" strokeWidth="2" strokeLinecap="round" />
        ))}
        <circle cx="66" cy="248" r="6" fill={SAFETY} opacity="0.72" />
        <circle cx="94" cy="232" r="6" fill={PLAY} opacity="0.72" />
        <circle cx="74" cy="238" r="7" fill="#B8B0A5" opacity="0.78" />
        <circle cx="238" cy="44" r="10" fill="#F2551A" />
        <motion.circle
          r="5.5"
          fill="#F2551A"
          animate={{ cx: [74, 132, 174, 238], cy: [238, 194, 126, 44], opacity: [0.35, 0.7, 1, 0.45] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <g fontSize="10.5" fontWeight="800" letterSpacing="1.1" textAnchor="middle">
          <text x="238" y="26" fill="#DC4C0C">DIRECTION</text>
          <text x="232" y="164" fill="#B47700">ALIVENESS</text>
          <text x="222" y="244" fill="#2C8D78">STEADINESS</text>
        </g>
      </svg>
      <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-3">
        {[
          ['Safety', 'base'],
          ['Play', 'lift'],
          ['Challenge', 'drive'],
        ].map(([domain, label]) => (
          <span key={domain} className="rounded-full bg-white/72 px-3 py-2 text-center text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#8C837A] ring-1 ring-[#E8DED2]">
            {domain} <span className="font-semibold normal-case tracking-[0.02em] text-[#A0988F]">{label}</span>
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
    <div className="relative min-h-[350px] overflow-hidden rounded-[30px] border border-[#2B211B] bg-[#1A1614] p-5 shadow-[0_24px_70px_-45px_rgba(26,18,14,0.82)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_30%,rgba(242,85,26,0.20),transparent_30%),radial-gradient(circle_at_52%_63%,rgba(122,61,154,0.24),transparent_34%),linear-gradient(145deg,rgba(255,255,255,0.045),rgba(255,255,255,0))]" />
      <div className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-[#F7E7D8]/18 to-transparent" />
      <svg viewBox="0 0 409 356" className="relative z-10 h-full min-h-[300px] w-full overflow-visible" aria-labelledby="revelationTitle revelationDesc" role="img">
        <title id="revelationTitle">Visible strength layered over hidden strain</title>
        <desc id="revelationDesc">The Sharp Peak alternates between the strong visible apex and a hidden fragile base beneath it.</desc>
        <defs>
          <linearGradient id="visiblePeakFill" x1="204" x2="204" y1="64" y2="210" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF6A2D" stopOpacity="0.84" />
            <stop offset="1" stopColor="#FF6A2D" stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id="shadowStrain" x1="204" x2="204" y1="150" y2="296" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E6B4FF" stopOpacity="0.48" />
            <stop offset="1" stopColor="#E6B4FF" stopOpacity="0.1" />
          </linearGradient>
          <filter id="insideGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.g
          transform="translate(10 22) scale(0.95)"
          animate={{ opacity: [0.32, 0.88, 0.32], y: [6, 0, 6] }}
          transition={{ duration: 6.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d={DOMAIN_HEX_OUTLINES.Challenge} fill="none" stroke="#E6B4FF" strokeOpacity="0.55" strokeWidth="2.2" strokeDasharray="8 8" />
          <path d={DOMAIN_HEX_OUTLINES.Safety} fill="url(#shadowStrain)" stroke="#C989E2" strokeOpacity="0.36" strokeWidth="2" strokeDasharray="7 9" />
          <path d={DOMAIN_HEX_OUTLINES.Play} fill="url(#shadowStrain)" stroke="#C989E2" strokeOpacity="0.28" strokeWidth="2" strokeDasharray="7 9" />
          <path d="M156 250 C178 214 193 197 204 172 C218 205 234 223 260 255" fill="none" stroke="#E6B4FF" strokeOpacity="0.48" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M204 164 L204 264" stroke="#E6B4FF" strokeOpacity="0.42" strokeWidth="3" strokeLinecap="round" strokeDasharray="10 12" />
          <circle cx="204.5" cy="206" r="10" fill="#E6B4FF" opacity="0.46" filter="url(#insideGlow)" />
          <text x="204.5" y="306" textAnchor="middle" fill="#E6B4FF" fontSize="11" fontWeight="900" letterSpacing="1.6">HIDDEN STRAIN</text>
        </motion.g>

        <motion.g
          transform="translate(-4 -2)"
          animate={{ opacity: [0.96, 0.48, 0.96], y: [0, -4, 0] }}
          transition={{ duration: 6.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d={DOMAIN_HEX_OUTLINES.Safety} fill="#42A68E" opacity="0.1" />
          <path d={DOMAIN_HEX_OUTLINES.Play} fill="#FFAB00" opacity="0.1" />
          <path d={DOMAIN_HEX_OUTLINES.Challenge} fill="url(#visiblePeakFill)" stroke="#FF7542" strokeOpacity="0.95" strokeWidth="2.4" filter="url(#insideGlow)" />
          <path d={DOMAIN_HEX_OUTLINES.Safety} fill="none" stroke="#42E0C5" strokeOpacity="0.28" strokeWidth="1.8" />
          <path d={DOMAIN_HEX_OUTLINES.Play} fill="none" stroke="#FFC45A" strokeOpacity="0.24" strokeWidth="1.8" />
          <motion.circle
            cx="204.5"
            cy="116"
            r="14"
            fill="#FF7542"
            opacity="0.16"
            animate={{ r: [10, 22, 10], opacity: [0.18, 0.05, 0.18] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <text x="204.5" y="74" textAnchor="middle" fill="#FF9A75" fontSize="11" fontWeight="900" letterSpacing="1.6">VISIBLE STRENGTH</text>
        </motion.g>
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
        <h3
          style={{
            fontFamily: SERIF,
            fontSize: 'clamp(2rem, 3.6vw, 3.25rem)',
            lineHeight: 1,
            letterSpacing: '-0.045em',
            color: INK,
          }}
        >
          Your Sharp Peak opens three useful paths.
        </h3>
        <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-[#4A4139]" style={{ fontWeight: 300 }}>
          Your psychological shape is currently a Sharp Peak, with unique strengths and specific blind spots.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3 md:items-stretch">
        {doorways.map((door, index) => {
          const DoorIcon = door.Icon;
          return (
            <motion.button
              key={door.domain}
              type="button"
              onClick={() => openDoor(door.target)}
              className="group relative min-h-[345px] overflow-hidden rounded-b-[28px] rounded-t-[130px] border border-[#E6DED3] bg-[#FFFCF7] p-6 text-left shadow-[0_24px_68px_-58px_rgba(26,22,20,0.68)] transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/25"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: index * 0.08 }}
            >
              <div className="absolute inset-0 opacity-80" style={{ background: `radial-gradient(circle at 50% 18%, ${door.color}24, transparent 36%), linear-gradient(180deg, ${door.color}10, transparent 52%)` }} />
              <motion.div
                className="absolute left-1/2 top-14 h-20 w-20 -translate-x-1/2 rounded-full blur-2xl"
                style={{ backgroundColor: door.color }}
                animate={{ opacity: [0.16, 0.38, 0.16], scale: [0.92, 1.08, 0.92] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: index * 0.35 }}
              />
              <div className="relative flex h-full flex-col">
                <div className="mx-auto mt-9 grid h-16 w-16 place-items-center rounded-full bg-white/84 shadow-[0_16px_36px_-28px_rgba(26,22,20,0.72)]" style={{ color: door.color }}>
                  <DoorIcon size={24} strokeWidth={2.1} />
                </div>
                <div className="mt-16">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.17em]" style={{ color: door.color }}>
                    {door.domain}
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
                  <span className="ml-3 inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.14em]" style={{ color: door.color }}>
                    Start with {door.domain} <ArrowRight className="transition-transform group-hover:translate-x-1" size={16} strokeWidth={2.2} />
                  </span>
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
        className="absolute left-1/2 top-[7%] aspect-square w-[62%] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(242,85,26,0.23), rgba(255,171,0,0.10) 34%, rgba(242,85,26,0.04) 58%, rgba(242,85,26,0) 76%)' }}
        animate={{ opacity: [0.58, 0.92, 0.58], scale: [0.94, 1.05, 0.94] }}
        transition={{ duration: 6.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-1/2 top-[14%] aspect-square w-[38%] -translate-x-1/2 rounded-full blur-xl"
        style={{ background: 'radial-gradient(circle, rgba(255,90,31,0.34), rgba(255,90,31,0.12) 42%, rgba(255,90,31,0) 72%)' }}
        animate={{ opacity: [0.45, 0.82, 0.45], scale: [0.9, 1.12, 0.9] }}
        transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-1/2 top-[21%] aspect-square w-[17%] -translate-x-1/2 rounded-full blur-md"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.5), rgba(255,90,31,0.24) 38%, rgba(255,90,31,0) 70%)' }}
        animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.72, 1.18, 0.72] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
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
          <text x="204.5" y="17" fill="#B83F14" fontSize="20" fontWeight="600" letterSpacing="-0.5" fontFamily={SERIF}>Challenge</text>
          <text x="204.5" y="40" fill="#7A4632" fontSize="11" fontWeight="800" letterSpacing="1.1">HIGH</text>

          <text x="68" y="332" fill="#166F5F" fontSize="20" fontWeight="600" letterSpacing="-0.5" fontFamily={SERIF}>Safety</text>
          <text x="68" y="353" fill="#5D6864" fontSize="11" fontWeight="800" letterSpacing="1.1">VERY LOW</text>

          <text x="341" y="332" fill="#9A6A00" fontSize="20" fontWeight="600" letterSpacing="-0.5" fontFamily={SERIF}>Play</text>
          <text x="341" y="353" fill="#6D6254" fontSize="11" fontWeight="800" letterSpacing="1.1">LOW</text>
        </g>
      </svg>
    </div>
  );
}
