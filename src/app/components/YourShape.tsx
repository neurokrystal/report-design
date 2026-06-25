import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Compass, Info, Shield, Sparkles, Zap } from 'lucide-react';
import { useState, type CSSProperties } from 'react';

const SERIF = '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif';
const NAV_ORANGE = '#FF5A1F';
const CHALLENGE = '#DC4C0C';
const PLAY = '#FFAB00';
const SAFETY = '#42A68E';

const observations = [
  {
    title: 'Challenge forms a clear apex',
    body: 'The strongest resource rises visibly above the rest of the profile.',
    color: CHALLENGE,
    Icon: Zap,
  },
  {
    title: 'Play offers partial support',
    body: 'There is some flexibility and aliveness in the base, but it is not enough to hold the peak on its own.',
    color: PLAY,
    Icon: Compass,
  },
  {
    title: 'Safety sits lower in the base',
    body: 'The foundation that would make the system feel steadier is the least available part of this shape.',
    color: SAFETY,
    Icon: Shield,
  },
];

const routeChips = [
  {
    domain: 'Challenge',
    href: '#challenge',
    label: 'Apex',
    color: CHALLENGE,
    Icon: Sparkles,
  },
  {
    domain: 'Safety',
    href: '#safety',
    label: 'Lowest foundation',
    color: SAFETY,
    Icon: Shield,
  },
  {
    domain: 'Play',
    href: '#play',
    label: 'Partial support',
    color: PLAY,
    Icon: Compass,
  },
];

const shapeSlides = [
  {
    eyebrow: 'Shape definition',
    title: 'What a Sharp Peak is',
    body: 'A Sharp Peak appears when one domain stands distinctly above the other two. It tells you where the profile is most resourced, and where the base is thinner.',
  },
  {
    eyebrow: 'Why it matters',
    title: 'The peak is real, but it is carrying weight',
    body: 'Challenge is not a problem in itself. The important detail is that Safety and Play are not supporting it equally, so the system can look capable while quietly spending more than it restores.',
  },
  {
    eyebrow: 'How to read from here',
    title: 'You do not have to move through the deep dives in order',
    body: 'You can begin with the apex, the lowest foundation, or the resource you are most curious about. Section 7 brings the parts back together once you have met them individually.',
  },
];

export function YourShape() {
  const [infoOpen, setInfoOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = shapeSlides[activeSlide];
  const goToSlide = (direction: 1 | -1) => {
    setActiveSlide(current => (current + direction + shapeSlides.length) % shapeSlides.length);
  };

  return (
    <div className="space-y-10">
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
                  Your shape shows how the three domains relate to one another. It is the relationship among them, not only each score on its own.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="mb-7 h-[3px] w-10" style={{ backgroundColor: NAV_ORANGE }} />
      </header>

      <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="space-y-6">
          <h2
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(1.65rem, 2.65vw, 2.25rem)',
              fontWeight: 600,
              color: '#0F0F0F',
              letterSpacing: '-0.035em',
              lineHeight: 1.1,
            }}
          >
            Together, your domains form a Sharp Peak.
          </h2>
          <div className="grid gap-3">
            {observations.map((point, index) => {
              const Icon = point.Icon;
              return (
              <motion.div
                key={point.title}
                className="group flex items-start gap-4 rounded-[20px] bg-[#F7F4EE] px-4 py-4 transition-colors hover:bg-[#F0EBE1]"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.55 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full" style={{ backgroundColor: `${point.color}14`, color: point.color }}>
                  <Icon size={17} strokeWidth={2.25} />
                </span>
                <span>
                  <span className="block text-[15px] font-bold leading-snug text-[#1A1614]">{point.title}</span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-[#5F5952]" style={{ fontWeight: 300 }}>
                    {point.body}
                  </span>
                </span>
              </motion.div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <ShapeGraphic />
        </div>
      </section>

      <section className="rounded-[30px] bg-[#F6F3ED] p-5 md:p-6" aria-label="Shape reading options">
        <div className="mb-5 max-w-2xl">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8B8682]">Explore from any point</p>
          <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[#5F5952]" style={{ fontWeight: 300 }}>
            The report has a sequence, but the deep dives can also be entered through the part of the shape you most want to understand first.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {routeChips.map(chip => {
            const Icon = chip.Icon;
            return (
              <a
                key={chip.domain}
                href={chip.href}
                className="group inline-flex items-center gap-2 rounded-full border border-[#E2D9CC] bg-white px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2"
                style={{ color: chip.color, '--tw-ring-color': `${chip.color}55` } as CSSProperties}
              >
                <Icon size={15} strokeWidth={2.3} />
                <span>{chip.domain}</span>
                <span className="hidden text-[#8B8682] sm:inline">{chip.label}</span>
                <ArrowRight size={14} strokeWidth={2.4} className="transition-transform group-hover:translate-x-0.5" />
              </a>
            );
          })}
        </div>
      </section>

      <section className="rounded-[30px] bg-white p-6 shadow-[0_24px_70px_-62px_rgba(26,22,20,0.6)] ring-1 ring-[#E8E1D6] md:p-8">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                <p className="text-[11px] font-extrabold uppercase tracking-[0.16em]" style={{ color: CHALLENGE }}>
                  {slide.eyebrow}
                </p>
                <h3 className="mt-3 text-[26px] leading-tight text-[#15110F] md:text-[30px]" style={{ fontFamily: SERIF, fontWeight: 600, letterSpacing: '-0.035em' }}>
                  {slide.title}
                </h3>
                <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-[#3F3A35]" style={{ fontWeight: 300 }}>
                  {slide.body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-3 md:justify-end">
            <button
              type="button"
              onClick={() => goToSlide(-1)}
              className="grid h-10 w-10 place-items-center rounded-full border border-[#E2D9CC] bg-[#F7F4EE] text-[#5F5952] transition-colors hover:bg-[#EEE6D8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/25"
              aria-label="Previous shape note"
            >
              <ChevronLeft size={18} strokeWidth={2.35} />
            </button>
            <div className="flex items-center gap-2">
              {shapeSlides.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  className="h-2.5 rounded-full transition-all"
                  style={{
                    width: activeSlide === index ? 26 : 10,
                    backgroundColor: activeSlide === index ? CHALLENGE : '#D8D0C5',
                  }}
                  aria-label={`Show note ${index + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => goToSlide(1)}
              className="grid h-10 w-10 place-items-center rounded-full border border-[#E2D9CC] bg-[#F7F4EE] text-[#5F5952] transition-colors hover:bg-[#EEE6D8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/25"
              aria-label="Next shape note"
            >
              <ChevronRight size={18} strokeWidth={2.35} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ShapeGraphic() {
  return (
    <div className="relative w-full max-w-[540px]">
      <motion.div
        className="absolute left-1/2 top-[1%] h-[54%] w-[72%] -translate-x-1/2 rounded-full blur-2xl"
        style={{ background: 'radial-gradient(circle, rgba(220,76,12,0.34), rgba(220,76,12,0.08) 45%, rgba(220,76,12,0) 72%)' }}
        animate={{ opacity: [0.72, 1, 0.72], scale: [0.98, 1.08, 0.98] }}
        transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-1/2 top-[8%] h-[48%] w-[48%] -translate-x-1/2 rounded-full border border-[#DC4C0C]/12"
        animate={{ opacity: [0.4, 0.72, 0.4], scale: [0.94, 1.04, 0.94] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-x-8 bottom-[20%] h-20 rounded-full bg-[radial-gradient(ellipse,rgba(26,22,20,0.14),transparent_68%)] blur-xl" />
      <svg viewBox="0 0 720 560" className="relative z-10 w-full overflow-visible" aria-labelledby="shapeGraphicTitle shapeGraphicDesc" role="img">
        <title id="shapeGraphicTitle">Sharp Peak structure</title>
        <desc id="shapeGraphicDesc">Challenge forms the apex, with Play and Safety forming the lower foundations beneath it.</desc>
        <defs>
          <filter id="shapeDrop" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="22" stdDeviation="20" floodColor="#1A1614" floodOpacity="0.12" />
          </filter>
          <linearGradient id="challengeShapeFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F15A1A" />
            <stop offset="100%" stopColor="#C94A29" />
          </linearGradient>
          <linearGradient id="mutedBaseFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#BCC6CB" />
            <stop offset="100%" stopColor="#919DA5" />
          </linearGradient>
        </defs>

        <motion.g filter="url(#shapeDrop)" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.55 }}>
          <motion.path
            d="M108 358 L326 358 L254 494 L38 494 Z"
            fill="url(#mutedBaseFill)"
            opacity="0.78"
            animate={{ y: [0, 4, 0], rotate: [-0.35, 0.25, -0.35] }}
            style={{ transformOrigin: '190px 430px' }}
            transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.path
            d="M394 358 L612 358 L686 494 L470 494 Z"
            fill="url(#mutedBaseFill)"
            opacity="0.74"
            animate={{ y: [2, -1, 2], rotate: [0.25, -0.2, 0.25] }}
            style={{ transformOrigin: '540px 430px' }}
            transition={{ duration: 5.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.path
            d="M360 22 L510 322 L210 322 Z"
            fill="url(#challengeShapeFill)"
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.path
            d="M360 22 L510 322 L360 322 Z"
            fill="#FFFFFF"
            opacity="0.08"
            animate={{ opacity: [0.08, 0.16, 0.08] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.g>

        <motion.path
          d="M170 530 C238 500 301 494 360 512 C419 494 482 500 550 530"
          fill="none"
          stroke="#1A1614"
          strokeOpacity="0.18"
          strokeWidth="3"
          strokeDasharray="10 12"
          animate={{ pathLength: [0.45, 1, 0.45], opacity: [0.22, 0.46, 0.22] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
        />

        <g textAnchor="middle">
          <text x="360" y="185" fill="#FFFFFF" fontSize="26" fontWeight="900" letterSpacing="3.2">CHALLENGE</text>
          <text x="360" y="220" fill="#FFFFFF" fontSize="18" fontWeight="700">High</text>

          <text x="184" y="428" fill="#F9F8F5" fontSize="22" fontWeight="900" letterSpacing="2.6">SAFETY</text>
          <text x="184" y="458" fill="#F9F8F5" fontSize="15" fontWeight="800">Very Low</text>

          <text x="536" y="428" fill="#F9F8F5" fontSize="22" fontWeight="900" letterSpacing="2.6">PLAY</text>
          <text x="536" y="458" fill="#F9F8F5" fontSize="15" fontWeight="800">Low</text>
        </g>
      </svg>
    </div>
  );
}
