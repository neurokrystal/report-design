import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Compass, DoorOpen, Eye, Flame, Info, Shield, Sparkles, Sun, Zap } from 'lucide-react';
import { useState } from 'react';
import { getScoreFillPath } from '../data/symbolFillPaths';

const SERIF = '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif';
const NAV_ORANGE = '#FF5A1F';
const CHALLENGE = '#DC4C0C';
const SAFETY = '#42A68E';
const PLAY = '#FFAB00';
const INK = '#15110F';

const shapePoints = [
  'One domain rises well above the rest of the profile.',
  'Challenge is the apex here: active, directional, and highly available.',
  'Safety and Play form the lower base, so the profile reads as strong but uneven.',
];

const journeySlides = [
  {
    kicker: 'Recognition',
    title: 'How this shape moves',
    Icon: Sparkles,
    color: CHALLENGE,
    body:
      'A Sharp Peak moves through the world by rising toward what matters. The person often recognises themselves in momentum, direction, development, responsibility, and the feeling of being pulled forward by something meaningful.',
    callout: 'The peak is not the problem. It is the most available part of the system.',
    signals: ['Forward motion feels clarifying', 'Purpose arrives faster than rest', 'The strongest part becomes the first place they go'],
  },
  {
    kicker: 'Revelation',
    title: "What's hard to see from inside it",
    Icon: Eye,
    color: '#7A3D9A',
    body:
      "From the inside, this can feel like strength, ambition, or simply being the person who keeps going. What is harder to see is that the peak may be creating coherence for the whole profile before the base has fully caught up.",
    callout: 'The sharpness is the clue: one part is carrying more visibility than the others.',
    signals: ['Capability may hide the thinner base', 'Progress can feel easier than settling', 'The person may underestimate how much they are holding'],
  },
  {
    kicker: 'Doorways',
    title: 'Where the deep dive opens',
    Icon: DoorOpen,
    color: PLAY,
    body:
      'The next part of the report lets you enter the three foundations separately. Each doorway shows a different reason this shape exists, and each one answers a different kind of curiosity.',
    callout: 'Choose the door that feels most alive first. The report will still hold the whole architecture.',
    doorways: [
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
    ],
  },
];

export function YourShape() {
  const [infoOpen, setInfoOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = journeySlides[activeSlide];
  const SlideIcon = slide.Icon;

  const goToSlide = (direction: 1 | -1) => {
    setActiveSlide(current => (current + direction + journeySlides.length) % journeySlides.length);
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
          <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.18em]" style={{ color: CHALLENGE }}>
            Shape type
          </p>
          <h2
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(2rem, 3.7vw, 3.45rem)',
              fontWeight: 600,
              color: INK,
              letterSpacing: '-0.045em',
              lineHeight: 0.98,
            }}
          >
            Sharp Peak
          </h2>
          <p className="mt-5 max-w-md text-[18px] leading-relaxed text-[#4D4945]" style={{ fontWeight: 300 }}>
            Your profile has one clear apex. Challenge rises above the other two domains, making the whole shape feel driven, purposeful, and visibly uneven.
          </p>
          <div className="mt-7 grid gap-3">
            {shapePoints.map((point, index) => (
              <motion.div
                key={point}
                className="flex gap-4 border-l border-[#E2D9CE] pl-4"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
              >
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: index === 0 ? CHALLENGE : '#B8B0A5' }} />
                <p className="text-[16px] leading-relaxed text-[#26211D]" style={{ fontWeight: 300 }}>
                  {point}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="flex justify-center lg:justify-end">
          <ShapeGraphic />
        </div>
      </section>

      <section className="relative overflow-hidden rounded-[34px] border border-[#E8E1D6] bg-[#F7F2EA] shadow-[0_30px_90px_-70px_rgba(26,22,20,0.7)]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F2551A]/45 to-transparent" />
        <div className="grid gap-0 lg:grid-cols-[230px_1fr]">
          <aside className="border-b border-[#E1D8CB] bg-[#F0E9DD]/70 p-5 lg:border-b-0 lg:border-r">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#948A7D]">Shape journey</p>
            <div className="mt-7 grid gap-3">
              {journeySlides.map((item, index) => {
                const StepIcon = item.Icon;
                const active = index === activeSlide;
                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    className="group grid grid-cols-[auto_1fr] items-center gap-3 rounded-[18px] px-3 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/25"
                    style={{ backgroundColor: active ? '#FDFCFA' : 'transparent' }}
                    aria-current={active}
                  >
                    <span
                      className="grid h-10 w-10 place-items-center rounded-full transition-transform group-hover:scale-105"
                      style={{
                        color: active ? item.color : '#9C948B',
                        backgroundColor: active ? `${item.color}16` : '#E6DED2',
                      }}
                    >
                      <StepIcon size={18} strokeWidth={2.1} />
                    </span>
                    <span>
                      <span className="block text-[10px] font-extrabold uppercase tracking-[0.16em]" style={{ color: active ? item.color : '#A09A93' }}>
                        {String(index + 1).padStart(2, '0')} {item.kicker}
                      </span>
                      <span className="mt-1 block text-[14px] leading-tight text-[#201B17]">{item.title}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="relative min-h-[480px] p-6 md:p-9">
            <div
              className="pointer-events-none absolute inset-0 opacity-80"
              style={{
                background: `linear-gradient(135deg, ${slide.color}12 0%, rgba(255,255,255,0) 46%), radial-gradient(circle at 86% 18%, ${slide.color}18, transparent 34%)`,
              }}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.title}
                className="relative"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex flex-wrap items-center justify-between gap-5">
                  <div>
                    <div className="mb-4 flex items-center gap-3">
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-white shadow-[0_18px_40px_-32px_rgba(26,22,20,0.6)]" style={{ color: slide.color }}>
                        <SlideIcon size={21} strokeWidth={2.1} />
                      </span>
                      <p className="text-[11px] font-extrabold uppercase tracking-[0.18em]" style={{ color: slide.color }}>
                        {slide.kicker}
                      </p>
                    </div>
                    <h3
                      style={{
                        fontFamily: SERIF,
                        fontSize: 'clamp(2rem, 3.6vw, 3.4rem)',
                        lineHeight: 1,
                        letterSpacing: '-0.045em',
                        color: INK,
                      }}
                    >
                      {slide.title}
                    </h3>
                  </div>
                  <div className="hidden items-center gap-2 md:flex" aria-hidden="true">
                    {journeySlides.map((item, index) => (
                      <span
                        key={item.title}
                        className="h-2.5 rounded-full transition-all"
                        style={{
                          width: index === activeSlide ? 34 : 10,
                          backgroundColor: index === activeSlide ? item.color : '#D6CCC0',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {'doorways' in slide ? <DoorwaySlide doorways={slide.doorways} /> : <ReadingSlide slide={slide} />}

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => goToSlide(-1)}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#DED6CB] bg-[#FDFCFA]/70 px-5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#8E867C] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/25"
                    aria-label="Previous shape journey step"
                  >
                    <ArrowLeft size={15} strokeWidth={2.35} />
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => goToSlide(1)}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#F2551A] px-6 text-[11px] font-extrabold uppercase tracking-[0.14em] text-white shadow-[0_16px_34px_-24px_rgba(220,76,12,0.8)] transition-colors hover:bg-[#DC4C0C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/25"
                    aria-label="Next shape journey step"
                  >
                    Next
                    <ArrowRight size={15} strokeWidth={2.35} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}

function ReadingSlide({ slide }: { slide: (typeof journeySlides)[0] }) {
  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[0.68fr_0.32fr] lg:items-start">
      <div>
        <p className="max-w-2xl text-[21px] leading-[1.72] text-[#1F1A16]" style={{ fontFamily: SERIF }}>
          {slide.body}
        </p>
        <div className="mt-8 flex gap-4 border-l pl-5" style={{ borderColor: `${slide.color}55` }}>
          <Zap className="mt-1 shrink-0" size={21} strokeWidth={2.1} style={{ color: slide.color }} />
          <p className="max-w-xl text-[18px] leading-relaxed text-[#2A241F]" style={{ fontWeight: 300 }}>
            {slide.callout}
          </p>
        </div>
      </div>

      <div className="grid gap-3">
        {slide.signals?.map((signal, index) => (
          <motion.div
            key={signal}
            className="rounded-[22px] bg-white/72 px-5 py-4 shadow-[0_18px_46px_-42px_rgba(26,22,20,0.6)] ring-1 ring-[#E5DDD2]"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.32, delay: index * 0.07 }}
          >
            <span className="text-[11px] font-black" style={{ color: slide.color }}>{String(index + 1).padStart(2, '0')}</span>
            <p className="mt-2 text-[15px] leading-relaxed text-[#3F3933]" style={{ fontWeight: 300 }}>{signal}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function DoorwaySlide({ doorways }: { doorways: NonNullable<(typeof journeySlides)[2]['doorways']> }) {
  const openDoor = (target: string) => {
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="mt-7">
      <div className="grid gap-6 xl:grid-cols-[0.62fr_0.38fr] xl:items-start">
        <p className="max-w-2xl text-[20px] leading-[1.65] text-[#1F1A16]" style={{ fontFamily: SERIF }}>
          Each doorway answers a different kind of curiosity inside the same shape. The deep dive is not more scoring; it is where the shape starts to explain itself.
        </p>
        <div className="flex gap-4 border-l border-[#FFAB00]/45 pl-5">
          <Compass className="mt-1 shrink-0 text-[#B47700]" size={21} strokeWidth={2.1} />
          <p className="text-[15px] leading-relaxed text-[#4A4139]" style={{ fontWeight: 300 }}>
            The doors are not a fixed order. Start with the one that feels most alive, then return for the rest of the architecture.
          </p>
        </div>
      </div>

      <div className="relative mt-7">
        <div className="absolute left-8 right-8 top-8 hidden h-px bg-gradient-to-r from-[#42A68E]/45 via-[#FFAB00]/50 to-[#DC4C0C]/42 md:block" />
        <div className="grid gap-4 md:grid-cols-3 md:items-stretch">
        {doorways.map((door, index) => {
          const DoorIcon = door.Icon;
          const offsets = ['md:mt-0', 'md:mt-6', 'md:mt-2'];
          return (
            <motion.button
              key={door.domain}
              type="button"
              onClick={() => openDoor(door.target)}
              className={`group relative overflow-hidden rounded-[24px] border border-[#E6DED3] bg-white/84 p-5 text-left shadow-[0_20px_58px_-50px_rgba(26,22,20,0.65)] transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/25 ${offsets[index]}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, delay: index * 0.08 }}
            >
              <div
                className="absolute inset-x-0 top-0 h-1.5"
                style={{ backgroundColor: door.color }}
              />
              <div className="mb-5 flex items-center justify-between gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-full" style={{ color: door.color, backgroundColor: `${door.color}16` }}>
                  <DoorIcon size={21} strokeWidth={2.1} />
                </span>
                <ArrowRight className="opacity-45 transition-transform group-hover:translate-x-1 group-hover:opacity-80" size={18} strokeWidth={2.2} style={{ color: door.color }} />
              </div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.17em]" style={{ color: door.color }}>{door.domain}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-[#17120F]" style={{ fontWeight: 300 }}>
                {door.promise}
              </p>
              <p className="mt-4 border-t border-[#E6DED3] pt-4 text-[13px] leading-relaxed text-[#6B635A]" style={{ fontWeight: 300 }}>
                {door.hook}
              </p>
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
