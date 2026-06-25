import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Compass, Info, Route, Shield, Sparkles } from 'lucide-react';
import { useState, type CSSProperties } from 'react';

const SERIF = '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif';
const NAV_ORANGE = '#FF5A1F';
const CHALLENGE = '#DC4C0C';
const PLAY = '#FFAB00';
const SAFETY = '#42A68E';

const observations = [
  'Challenge forms the clear apex.',
  'Play offers partial support, while Safety sits at the lowest point of the base.',
  'Resources are concentrated rather than evenly distributed across the system.',
];

const routeCards = [
  {
    domain: 'Challenge',
    href: '#challenge',
    role: 'APEX',
    headline: 'Start with what is working',
    body: 'Explore the resource carrying the strongest direction, momentum and meaning in this profile.',
    action: 'Explore Challenge',
    color: CHALLENGE,
    Icon: Sparkles,
  },
  {
    domain: 'Safety',
    href: '#safety',
    role: 'LOWEST FOUNDATION',
    headline: 'Start with what needs support',
    body: 'Explore the foundation with the least available steadiness and the greatest potential to change the architecture.',
    action: 'Explore Safety',
    color: SAFETY,
    Icon: Shield,
  },
  {
    domain: 'Play',
    href: '#play',
    role: 'SUPPORTING FOUNDATION',
    headline: 'Start with what could replenish',
    body: 'Explore the partial resource that can broaden the base through aliveness, flexibility and restoration.',
    action: 'Explore Play',
    color: PLAY,
    Icon: Compass,
  },
];

const roleLabels = [
  {
    domain: 'Challenge',
    role: 'APEX',
    line: 'Your clearest available resource',
    color: CHALLENGE,
  },
  {
    domain: 'Play',
    role: 'SUPPORTING FOUNDATION',
    line: 'Some resource is available here',
    color: PLAY,
  },
  {
    domain: 'Safety',
    role: 'LOWEST FOUNDATION',
    line: 'The least supported part of the profile',
    color: SAFETY,
  },
];

export function YourShape() {
  const [infoOpen, setInfoOpen] = useState(false);

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
        <p className="max-w-2xl text-[17px] leading-relaxed text-[#5F5952]" style={{ fontWeight: 300 }}>
          The relationship among your three domains, not only each score on its own.
        </p>
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
          <p className="max-w-xl text-[16px] leading-relaxed text-[#1A1614]" style={{ fontWeight: 300 }}>
            Challenge stands distinctly above Safety and Play, concentrating much of this profile's available resource at one point. The defining feature is the distance between the apex and the two foundations beneath it, not simply that Challenge is high.
          </p>
          <div className="grid gap-3 pt-1">
            {observations.map((point, index) => (
              <motion.div
                key={point}
                className="group flex items-start gap-3 rounded-[18px] bg-[#F7F4EE] px-4 py-3 transition-colors hover:bg-[#F0EBE1]"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.55 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
              >
                <span
                  className="mt-[0.45rem] h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: index === 0 ? CHALLENGE : index === 1 ? SAFETY : PLAY }}
                />
                <span className="text-[15px] leading-snug text-[#1A1614]" style={{ fontWeight: 350 }}>
                  {point}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <ShapeGraphic />
        </div>
      </section>

      <section className="rounded-[32px] bg-[#F6F3ED] p-5 md:p-6" aria-label="Choose where to begin">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8B8682]">Choose your entry point</p>
            <p className="mt-1 max-w-xl text-[14px] leading-relaxed text-[#5F5952]" style={{ fontWeight: 300 }}>
              This section is intentionally non-linear. You can begin with the apex, the lowest foundation, or the place that feels most alive to investigate first.
            </p>
          </div>
          <div className="hidden h-px flex-1 bg-[#DFD6C9] md:block" />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
        {routeCards.map((card, index) => {
          const Icon = card.Icon;
          return (
            <motion.a
              key={card.domain}
              href={card.href}
              className="group relative flex min-h-[225px] flex-col overflow-hidden rounded-[24px] border border-[#E8E1D6] bg-white p-5 shadow-[0_22px_58px_-52px_rgba(26,22,20,0.52)] transition-colors focus-visible:outline-none focus-visible:ring-2"
              style={{ '--tw-ring-color': `${card.color}55` } as CSSProperties}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.42, delay: index * 0.06 }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-x-0 top-0 h-1.5" style={{ backgroundColor: card.color }} />
              <div className="mb-6 flex items-center justify-between gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-full" style={{ backgroundColor: `${card.color}16`, color: card.color }}>
                  <Icon size={19} strokeWidth={2.15} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#8B8682]">{card.role}</span>
              </div>
              <p className="text-[13px] font-extrabold uppercase tracking-[0.16em]" style={{ color: card.color }}>
                {card.domain}
              </p>
              <h3 className="mt-2 text-[20px] leading-tight text-[#15110F]" style={{ fontFamily: SERIF, fontWeight: 600 }}>
                {card.headline}
              </h3>
              <p className="mt-3 flex-1 text-[14px] leading-relaxed text-[#5F5952]" style={{ fontWeight: 300 }}>
                {card.body}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] transition-transform group-hover:translate-x-1" style={{ color: card.color }}>
                {card.action}
                <ArrowRight size={15} strokeWidth={2.35} />
              </span>
            </motion.a>
          );
        })}
        </div>
      </section>

      <section className="rounded-[28px] bg-white p-7 shadow-[0_24px_70px_-62px_rgba(26,22,20,0.6)] ring-1 ring-[#E8E1D6] md:p-9">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8B8682]">Shape definition</p>
            <p className="mt-3 text-[16px] leading-relaxed text-[#1A1614]" style={{ fontWeight: 300 }}>
              A Sharp Peak appears when one domain stands distinctly above the other two. It shows where the profile's resources are concentrated and which foundations sit comparatively lower.
            </p>
          </div>
          <div className="rounded-[22px] bg-[#F7F4EE] p-5">
            <div className="mb-3 flex items-center gap-2 text-[#DC4C0C]">
              <Route size={18} strokeWidth={2.2} />
              <p className="text-[11px] font-extrabold uppercase tracking-[0.16em]">Reading guidance</p>
            </div>
            <p className="text-[15px] leading-relaxed text-[#3F3A35]" style={{ fontWeight: 300 }}>
              You do not have to read the domains in order. Begin with the apex, the lowest foundation or the resource that feels most relevant now. Once you have explored them individually, Section 7 will show how they operate together.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function ShapeGraphic() {
  return (
    <div className="relative w-full max-w-[560px]">
      <motion.div
        className="absolute left-1/2 top-[4%] h-[48%] w-[62%] -translate-x-1/2 rounded-full blur-2xl"
        style={{ background: 'radial-gradient(circle, rgba(220,76,12,0.32), rgba(220,76,12,0))' }}
        animate={{ opacity: [0.6, 1, 0.6], scale: [0.97, 1.06, 0.97] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-x-8 bottom-[18%] h-20 rounded-full bg-[radial-gradient(ellipse,rgba(26,22,20,0.12),transparent_68%)] blur-xl" />
      <svg viewBox="0 0 720 620" className="relative z-10 w-full overflow-visible" aria-labelledby="shapeGraphicTitle shapeGraphicDesc" role="img">
        <title id="shapeGraphicTitle">Sharp Peak structure</title>
        <desc id="shapeGraphicDesc">Challenge forms the apex, with Play and Safety forming the lower foundations beneath it.</desc>
        <defs>
          <filter id="shapeDrop" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="22" stdDeviation="20" floodColor="#1A1614" floodOpacity="0.12" />
          </filter>
          <linearGradient id="challengeFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F15A1A" />
            <stop offset="100%" stopColor="#C94A29" />
          </linearGradient>
          <linearGradient id="safetyFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5BC5AC" />
            <stop offset="100%" stopColor="#2E9583" />
          </linearGradient>
          <linearGradient id="playFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFC13B" />
            <stop offset="100%" stopColor="#E79A00" />
          </linearGradient>
        </defs>

        <motion.g filter="url(#shapeDrop)" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.55 }}>
          <motion.path
            d="M360 24 L492 254 L360 254 L228 254 Z"
            fill="url(#challengeFill)"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.path
            d="M360 24 L492 254 L360 254 Z"
            fill="#FFFFFF"
            opacity="0.08"
            animate={{ opacity: [0.08, 0.17, 0.08] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <path d="M228 254 L360 254 L286 390 L112 390 Z" fill="url(#safetyFill)" />
          <path d="M360 254 L492 254 L608 390 L434 390 Z" fill="url(#playFill)" />
          <path d="M228 254 L360 254 L286 390 L112 390 Z" fill="#FFFFFF" opacity="0.09" />
          <path d="M360 254 L492 254 L608 390 L434 390 Z" fill="#FFFFFF" opacity="0.07" />
        </motion.g>

        <g textAnchor="middle">
          <text x="360" y="162" fill="#FFFFFF" fontSize="22" fontWeight="900" letterSpacing="3">CHALLENGE</text>
          <text x="360" y="194" fill="#FFFFFF" fontSize="16" fontWeight="700">APEX</text>
          <text x="360" y="222" fill="#FFFFFF" fontSize="13" opacity="0.88">Your clearest available resource</text>

          <text x="224" y="318" fill="#FFFFFF" fontSize="17" fontWeight="900" letterSpacing="2.5">SAFETY</text>
          <text x="224" y="346" fill="#FFFFFF" fontSize="12" fontWeight="800">LOWEST FOUNDATION</text>
          <text x="224" y="366" fill="#FFFFFF" fontSize="10.5" opacity="0.88">
            <tspan x="224" dy="0">The least supported part</tspan>
            <tspan x="224" dy="13">of the profile</tspan>
          </text>

          <text x="486" y="318" fill="#FFFFFF" fontSize="17" fontWeight="900" letterSpacing="2.5">PLAY</text>
          <text x="486" y="346" fill="#FFFFFF" fontSize="12" fontWeight="800">SUPPORTING FOUNDATION</text>
          <text x="486" y="366" fill="#FFFFFF" fontSize="10.5" opacity="0.88">
            <tspan x="486" dy="0">Some resource is available</tspan>
            <tspan x="486" dy="13">here</tspan>
          </text>
        </g>

        <g transform="translate(34 442)">
          {roleLabels.map((label, index) => (
            <g key={label.domain} transform={`translate(${index * 226} 0)`}>
              <circle cx="14" cy="14" r="6" fill={label.color} />
              <text x="30" y="14" dominantBaseline="middle" fill={label.color} fontSize="10" fontWeight="900" letterSpacing="1.2">
                {label.role}
              </text>
              <text x="0" y="50" fill="#5F5952" fontSize="12">
                {label.line}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
