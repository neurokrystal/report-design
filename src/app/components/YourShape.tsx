import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Compass, Info, Layers3, Shield, Triangle, Zap } from 'lucide-react';
import { useState } from 'react';
import { DOMAIN_HEX_OUTLINES } from '../data/symbolFillPaths';

const SERIF = '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif';
const NAV_ORANGE = '#FF5A1F';
const CHALLENGE = '#DC4C0C';

const observations = [
  {
    body: 'Challenge sits at the top.',
    color: CHALLENGE,
  },
  {
    body: 'Safety and Play are running low beneath it.',
    color: '#AAA399',
  },
  {
    body: 'The result is a powerful peak with a fragile base.',
    color: '#AAA399',
  },
];

const shapeSlides = [
  {
    leftLabel: 'The shape',
    leftBody: 'A Sharp Peak is created when one domain becomes visibly taller than the other two.',
    rightLabel: 'The architecture',
    rightBody: 'In this profile, Challenge holds the apex while Safety and Play sit as a narrower base beneath it.',
    LeftIcon: Triangle,
    RightIcon: Layers3,
  },
  {
    leftLabel: 'The resource',
    leftBody: 'The apex is not a flaw. Challenge is a real strength here: clear, active, and personally meaningful.',
    rightLabel: 'The load',
    rightBody: 'Because the base is thinner, Challenge may be holding more of the system than it was designed to hold alone.',
    LeftIcon: Zap,
    RightIcon: Shield,
  },
  {
    leftLabel: 'The direction',
    leftBody: 'The work is not to make Challenge smaller. It is to give the base enough support that the peak can remain strong without doing everything.',
    rightLabel: 'The reading',
    rightBody: 'The next sections show what each foundation is carrying, then bring the whole profile back together.',
    LeftIcon: Compass,
    RightIcon: ArrowRight,
  },
];

export function YourShape() {
  const [infoOpen, setInfoOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = shapeSlides[activeSlide];
  const LeftIcon = slide.LeftIcon;
  const RightIcon = slide.RightIcon;
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
              return (
              <motion.div
                key={point.body}
                className="group flex items-center gap-4 rounded-[18px] bg-[#F7F4EE] px-5 py-4 transition-colors hover:bg-[#F0EBE1]"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.55 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
              >
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: point.color }} />
                <span className="text-[18px] leading-snug text-[#1A1614]" style={{ fontWeight: 300 }}>
                  {point.body}
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

      <section className="overflow-hidden rounded-[30px] bg-[#F4F0E9] p-6 shadow-[0_24px_70px_-58px_rgba(26,22,20,0.42)] ring-1 ring-[#E6DED2] md:p-8">
        <div className="min-h-[275px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="grid gap-8 md:grid-cols-2"
            >
              <div className="md:border-r md:border-[#DED6CB] md:pr-10">
                <div className="mb-5 flex items-center gap-3">
                  <LeftIcon size={22} strokeWidth={1.9} className="text-[#969087]" />
                  <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#8B8682]">{slide.leftLabel}</p>
                </div>
                <p className="text-[22px] leading-[1.55] text-[#1A1614]" style={{ fontWeight: 300 }}>
                  {slide.leftBody}
                </p>
              </div>
              <div className="md:pl-2">
                <div className="mb-5 flex items-center gap-3">
                  <RightIcon size={22} strokeWidth={1.9} className="text-[#969087]" />
                  <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#8B8682]">{slide.rightLabel}</p>
                </div>
                <p className="text-[22px] leading-[1.55] text-[#1A1614]" style={{ fontWeight: 300 }}>
                  {slide.rightBody}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => goToSlide(-1)}
            className="inline-flex h-12 min-w-[150px] items-center justify-center gap-2 rounded-[12px] border border-[#DED6CB] bg-[#FDFCFA]/55 px-5 text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#9A948D] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/25"
            aria-label="Previous shape note"
          >
            <ArrowLeft size={16} strokeWidth={2.35} />
            Previous
          </button>
          <div className="flex items-center gap-2">
            {shapeSlides.map((item, index) => (
              <button
                key={item.leftLabel}
                type="button"
                onClick={() => setActiveSlide(index)}
                className="h-3 rounded-full transition-all"
                style={{
                  width: activeSlide === index ? 28 : 12,
                  backgroundColor: activeSlide === index ? CHALLENGE : '#D1C8BC',
                }}
                aria-label={`Show note ${index + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => goToSlide(1)}
            className="inline-flex h-12 min-w-[150px] items-center justify-center gap-2 rounded-[12px] bg-[#F2551A] px-5 text-[12px] font-extrabold uppercase tracking-[0.14em] text-white shadow-[0_14px_28px_-20px_rgba(220,76,12,0.72)] transition-colors hover:bg-[#DC4C0C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/25"
            aria-label="Next shape note"
          >
            Next
            <ArrowRight size={16} strokeWidth={2.35} />
          </button>
        </div>
      </section>
    </div>
  );
}

function ShapeGraphic() {
  return (
    <div className="relative w-full max-w-[580px]">
      <motion.div
        className="absolute left-1/2 top-[6%] h-[42%] w-[52%] -translate-x-1/2 rounded-full blur-xl"
        style={{ background: 'radial-gradient(circle, rgba(242,85,26,0.22), rgba(242,85,26,0.08) 52%, rgba(242,85,26,0) 74%)' }}
        animate={{ opacity: [0.58, 0.9, 0.58], scale: [0.96, 1.06, 0.96] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-x-8 bottom-[10%] h-20 rounded-full bg-[radial-gradient(ellipse,rgba(26,22,20,0.13),transparent_68%)] blur-xl" />
      <svg viewBox="0 0 560 500" className="relative z-10 w-full overflow-visible" aria-labelledby="shapeGraphicTitle shapeGraphicDesc" role="img">
        <title id="shapeGraphicTitle">Sharp Peak structure</title>
        <desc id="shapeGraphicDesc">Challenge forms the apex, with Play and Safety forming the lower foundations beneath it.</desc>
        <defs>
          <filter id="shapeDrop" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="22" stdDeviation="20" floodColor="#1A1614" floodOpacity="0.12" />
          </filter>
        </defs>

        <motion.g
          transform="translate(76 36) scale(1)"
          filter="url(#shapeDrop)"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
        >
          <path d={DOMAIN_HEX_OUTLINES.Safety} fill="#C9C1B5" opacity="0.92" />
          <path d={DOMAIN_HEX_OUTLINES.Play} fill="#BDB5A9" opacity="0.95" />
          <motion.path
            d={DOMAIN_HEX_OUTLINES.Challenge}
            fill="#F2551A"
            animate={{ y: [0, -4, 0], filter: ['brightness(1)', 'brightness(1.07)', 'brightness(1)'] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.g>

        <g textAnchor="middle">
          <text x="280" y="158" fill="#FFFFFF" fontSize="18" fontWeight="900" letterSpacing="2.2">CHALLENGE</text>
          <text x="280" y="183" fill="#FFFFFF" fontSize="15" fontWeight="800">High</text>

          <text x="168" y="296" fill="#56606A" fontSize="17" fontWeight="900" letterSpacing="2">SAFETY</text>
          <text x="168" y="321" fill="#56606A" fontSize="14" fontWeight="800">Very Low</text>

          <text x="392" y="296" fill="#56606A" fontSize="17" fontWeight="900" letterSpacing="2">PLAY</text>
          <text x="392" y="321" fill="#56606A" fontSize="14" fontWeight="800">Low</text>
        </g>
      </svg>
    </div>
  );
}
