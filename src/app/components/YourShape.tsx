import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Compass, Info, Shield, Sparkles, Zap } from 'lucide-react';
import { useState, type CSSProperties } from 'react';
import { getScoreFillPath, DOMAIN_HEX_OUTLINES, DOMAIN_SPOKE_LINES, DOMAIN_SPOKE_TRANSFORM, DOMAIN_VERTEX_DOTS } from '../data/symbolFillPaths';

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
    tidbit: 'The important signal is the distance between the apex and the base.',
    Icon: Zap,
  },
  {
    eyebrow: 'Why it matters',
    title: 'The peak is real, but it is carrying weight',
    body: 'Challenge is not a problem in itself. The important detail is that Safety and Play are not supporting it equally, so the system can look capable while quietly spending more than it restores.',
    tidbit: 'The strength is genuine. The question is whether it has enough ground beneath it.',
    Icon: Shield,
  },
  {
    eyebrow: 'How to read from here',
    title: 'Enter through the part that is most alive',
    body: 'You can begin with the apex, the lowest foundation, or the resource you are most curious about. The integration section brings the parts back together once you have met them individually.',
    tidbit: 'Choose a doorway, then return to the whole shape.',
    Icon: Compass,
    routes: true,
  },
];

export function YourShape() {
  const [infoOpen, setInfoOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = shapeSlides[activeSlide];
  const SlideIcon = slide.Icon;
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

      <section className="overflow-hidden rounded-[30px] bg-[#1A1614] p-5 text-white shadow-[0_28px_80px_-62px_rgba(26,22,20,0.76)] md:p-7">
        <div className="grid gap-5 lg:grid-cols-[1fr_280px] lg:items-stretch">
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="min-h-[235px] rounded-[22px] bg-white/[0.055] p-6 ring-1 ring-white/10 md:p-7"
              >
                <p className="text-[11px] font-extrabold uppercase tracking-[0.16em]" style={{ color: CHALLENGE }}>
                  {slide.eyebrow}
                </p>
                <h3 className="mt-3 text-[26px] leading-tight text-white md:text-[31px]" style={{ fontFamily: SERIF, fontWeight: 600, letterSpacing: '-0.035em' }}>
                  {slide.title}
                </h3>
                <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-white/76" style={{ fontWeight: 300 }}>
                  {slide.body}
                </p>
                {slide.routes && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {routeChips.map(chip => {
                      const Icon = chip.Icon;
                      return (
                        <a
                          key={chip.domain}
                          href={chip.href}
                          className="group inline-flex items-center gap-2 rounded-full border border-white/12 bg-white px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.12em] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2"
                          style={{ color: chip.color, '--tw-ring-color': `${chip.color}55` } as CSSProperties}
                        >
                          <Icon size={14} strokeWidth={2.3} />
                          <span>{chip.domain}</span>
                          <ArrowRight size={13} strokeWidth={2.4} className="transition-transform group-hover:translate-x-0.5" />
                        </a>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex flex-col justify-between gap-5 rounded-[22px] bg-[#F7F4EE] p-5 text-[#1A1614]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeSlide}-tidbit`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-[#DC4C0C] shadow-[0_14px_28px_-24px_rgba(26,22,20,0.55)]">
                  <SlideIcon size={19} strokeWidth={2.2} />
                </span>
                <p className="mt-5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#8B8682]">Reading note</p>
                <p className="mt-3 text-[20px] leading-snug" style={{ fontFamily: SERIF }}>
                  {slide.tidbit}
                </p>
              </motion.div>
            </AnimatePresence>
            <div>
              <div className="mb-4 flex items-center gap-2">
                {shapeSlides.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    className="h-2.5 rounded-full transition-all"
                    style={{
                      width: activeSlide === index ? 28 : 10,
                      backgroundColor: activeSlide === index ? CHALLENGE : '#D8D0C5',
                    }}
                    aria-label={`Show note ${index + 1}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => goToSlide(-1)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-[#E2D9CC] bg-white text-[#5F5952] transition-colors hover:bg-[#EEE6D8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/25"
                  aria-label="Previous shape note"
                >
                  <ChevronLeft size={18} strokeWidth={2.35} />
                </button>
                <button
                  type="button"
                  onClick={() => goToSlide(1)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-[#E2D9CC] bg-white text-[#5F5952] transition-colors hover:bg-[#EEE6D8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/25"
                  aria-label="Next shape note"
                >
                  <ChevronRight size={18} strokeWidth={2.35} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ShapeGraphic() {
  const challengePath = getScoreFillPath('Challenge', 78);
  const safetyPath = getScoreFillPath('Safety', 27);
  const playPath = getScoreFillPath('Play', 41);

  return (
    <div className="relative w-full max-w-[540px]">
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
          {safetyPath && <path d={safetyPath} fill="#42A68E" opacity="0.48" />}
          {playPath && <path d={playPath} fill="#FFBB30" opacity="0.56" />}
          {challengePath && (
            <motion.path
              d={challengePath}
              fill="#DC4C0C"
              animate={{ y: [0, -5, 0], filter: ['brightness(1)', 'brightness(1.12)', 'brightness(1)'] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          {Object.values(DOMAIN_HEX_OUTLINES).map((d, i) => (
            <path key={i} d={d} stroke="#BFB8AD" strokeWidth="1.2" fill="none" />
          ))}
          {DOMAIN_SPOKE_LINES.map((line, i) => (
            <line key={`s${i}`} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="#BFB8AD" strokeWidth="1.2" />
          ))}
          <line y1="-0.4" x2="167" y2="-0.4" transform={DOMAIN_SPOKE_TRANSFORM} stroke="#BFB8AD" strokeWidth="1.2" />
          {DOMAIN_VERTEX_DOTS.map((dot, index) => (
            <circle key={index} cx={dot.cx} cy={dot.cy} r={index === 0 ? 5 : 3.5} fill={index === 0 ? '#DC4C0C' : '#BFB8AD'} />
          ))}
          <motion.circle
            cx="204.5"
            cy="29.5"
            r="24"
            fill="none"
            stroke="#DC4C0C"
            strokeWidth="2"
            animate={{ opacity: [0.25, 0.65, 0.25], r: [18, 28, 18] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.g>

        <g textAnchor="middle">
          <text x="280" y="34" fill="#DC4C0C" fontSize="14" fontWeight="900" letterSpacing="2.4">CHALLENGE APEX</text>
          <text x="280" y="54" fill="#8B4330" fontSize="13" fontWeight="700">High</text>

          <text x="116" y="420" fill="#0F6E56" fontSize="13" fontWeight="900" letterSpacing="2">SAFETY</text>
          <text x="116" y="439" fill="#6F6A64" fontSize="12" fontWeight="700">Very Low</text>

          <text x="444" y="420" fill="#9A6D00" fontSize="13" fontWeight="900" letterSpacing="2">PLAY</text>
          <text x="444" y="439" fill="#6F6A64" fontSize="12" fontWeight="700">Low</text>
        </g>
      </svg>
    </div>
  );
}
