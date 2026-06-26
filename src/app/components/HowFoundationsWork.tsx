import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Compass, GitBranch, RefreshCcw, ShieldAlert, Sparkles } from 'lucide-react';
import { useState } from 'react';

const SERIF = '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif';
const NAV_ORANGE = '#FF5A1F';
const SAFETY = '#42A68E';
const PLAY = '#FFAB00';
const CHALLENGE = '#DC4C0C';
const INK = '#15110F';

const sequence = [
  {
    label: 'Challenge provides',
    copy: 'Direction, momentum and meaning',
    color: CHALLENGE,
    Icon: Sparkles,
  },
  {
    label: 'Safety cannot yet hold enough',
    copy: 'Internal steadiness remains limited',
    color: SAFETY,
    Icon: ShieldAlert,
  },
  {
    label: 'Challenge takes on more',
    copy: 'Progress and planning also become ways to create stability',
    color: CHALLENGE,
    Icon: GitBranch,
  },
  {
    label: 'Play does not fully refill the system',
    copy: 'Restoration and flexibility do not yet match expenditure',
    color: PLAY,
    Icon: RefreshCcw,
  },
];

const synthesisCards = [
  {
    eyebrow: 'Available resource',
    copy: 'Challenge supplies direction, momentum and significance.',
    color: CHALLENGE,
  },
  {
    eyebrow: 'Central interaction',
    copy: 'Challenge is also carrying some of the stabilising work that Safety cannot yet hold.',
    color: SAFETY,
  },
  {
    eyebrow: 'System outcome',
    copy: 'The profile can perform strongly while still feeling effortful, under-restored or unsettled underneath.',
    color: PLAY,
  },
];

const synthesisSlides = [
  {
    leftTitle: 'Where you feel most yourself',
    leftCopy:
      'You may recognise yourself most clearly in Challenge: in movement, development, meaning and forward direction. The apex is not merely where you perform well; it may be where you feel most coherent.',
    rightTitle: 'Why arrival can feel elusive',
    rightCopy:
      'Progress can be real and important without producing a matching sense of rest or internal security. The system keeps moving because movement is doing more than moving you forward.',
    color: CHALLENGE,
  },
  {
    leftTitle: 'What is working',
    leftCopy:
      'Your peak is a genuine resource. It generates direction, persistence and a clear relationship with what matters. None of this needs to be dismissed or reduced.',
    rightTitle: 'What is carrying too much',
    rightCopy:
      'Challenge may be asked to create movement, identity and stability at the same time. This does not make the strength false; it makes the strength heavily loaded.',
    color: SAFETY,
  },
  {
    leftTitle: 'What the system is asking for',
    leftCopy:
      'More internal steadiness and more reliable replenishment would allow responsibility to be distributed across the three foundations rather than concentrated at the apex.',
    rightTitle: 'What should remain intact',
    rightCopy:
      'Challenge does not need to become smaller. It needs to become better supported, so that purpose and momentum remain available without carrying the whole architecture.',
    color: PLAY,
  },
];

export function HowFoundationsWork() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = synthesisSlides[activeSlide];

  return (
    <div className="space-y-10">
      <header>
        <p className="mb-[30px] text-[11px] font-extrabold uppercase tracking-[0.16em]" style={{ color: NAV_ORANGE }}>
          07 Integration
        </p>
        <h1
          style={{
            fontFamily: SERIF,
            fontWeight: 600,
            letterSpacing: '-0.03em',
            fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
            color: '#0F0F0F',
            marginBottom: '30px',
          }}
        >
          How Your Foundations Work Together
        </h1>
        <div className="h-[3px] w-10" style={{ backgroundColor: NAV_ORANGE }} />
      </header>

      <section className="relative overflow-hidden rounded-[34px] border border-[#E8E1D6] bg-[#F7F4EE] shadow-[0_28px_80px_-64px_rgba(26,22,20,0.62)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(220,76,12,0.14),transparent_34%),radial-gradient(circle_at_16%_84%,rgba(66,166,142,0.12),transparent_38%),radial-gradient(circle_at_82%_78%,rgba(255,171,0,0.12),transparent_34%)]" />
        <div className="relative grid gap-0 lg:grid-cols-[0.54fr_0.46fr]">
          <div className="p-7 md:p-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: CHALLENGE }}>
              System synthesis
            </p>
            <h2
              className="mt-3 max-w-[680px]"
              style={{
                fontFamily: SERIF,
                fontSize: 'clamp(2.2rem, 4vw, 3.55rem)',
                lineHeight: 1.02,
                letterSpacing: '-0.045em',
                color: INK,
              }}
            >
              Your strength is genuine. It is also carrying too much.
            </h2>
            <div className="mt-7 max-w-[690px] space-y-4 text-[16px] leading-relaxed text-[#1A1614]" style={{ fontWeight: 300 }}>
              <p>
                Challenge is the clearest available resource in this profile. It provides direction, momentum and a strong relationship with what matters to you.
              </p>
              <p>
                Safety is not currently providing the same degree of internal steadiness, while Play is not sufficiently resourced to restore what sustained forward movement spends. Challenge may therefore be doing more than its natural work of growth and pursuit: it may also be helping the system create stability through progress, planning and continued motion.
              </p>
              <p>
                The result can be genuine outward capability alongside an internal sense that rest, arrival or ease never fully lands. The answer is not to make the peak smaller. It is to distribute more support beneath it.
              </p>
            </div>
          </div>

          <div className="relative min-h-[560px] overflow-hidden border-l border-[#E8E1D6]/80 bg-white/50 p-7 md:p-9">
            <SystemMap />
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.42fr_0.58fr]">
        <div className="rounded-[30px] bg-[#1A1614] p-7 text-white shadow-[0_28px_70px_-60px_rgba(26,22,20,0.85)] md:p-8">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#FFBB30]">End state</p>
          <h3
            className="mt-4"
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(1.7rem, 2.55vw, 2.32rem)',
              lineHeight: 1.14,
              letterSpacing: '-0.04em',
            }}
          >
            High outward capability. Internal effort. Difficulty fully settling.
          </h3>
        </div>

        <div className="grid gap-4">
          {sequence.map((item, index) => {
            const Icon = item.Icon;
            return (
              <motion.div
                key={item.label}
                className="group grid grid-cols-[auto_1fr] gap-4 rounded-[24px] border border-[#E8E1D6] bg-white p-5 shadow-[0_18px_52px_-48px_rgba(26,22,20,0.58)] transition-colors hover:bg-[#FCFAF6]"
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                whileHover={{ x: 4 }}
              >
                <div className="grid h-12 w-12 place-items-center rounded-full" style={{ color: item.color, backgroundColor: `${item.color}16` }}>
                  <Icon size={20} strokeWidth={2.25} />
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-3">
                    <span className="text-[12px] font-black" style={{ color: item.color }}>{String(index + 1).padStart(2, '0')}</span>
                    <p className="text-[12px] font-extrabold uppercase tracking-[0.14em]" style={{ color: item.color }}>{item.label}</p>
                  </div>
                  <p className="text-[15px] leading-relaxed text-[#3F3A35]" style={{ fontWeight: 300 }}>{item.copy}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {synthesisCards.map((card, index) => (
          <motion.div
            key={card.eyebrow}
            className="rounded-[28px] border border-[#E8E1D6] bg-white p-6 shadow-[0_18px_52px_-48px_rgba(26,22,20,0.58)]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.42, delay: index * 0.06 }}
            whileHover={{ y: -4 }}
          >
            <div className="mb-5 h-1 w-12 rounded-full" style={{ backgroundColor: card.color }} />
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em]" style={{ color: card.color }}>{card.eyebrow}</p>
            <p className="mt-4 text-[18px] leading-relaxed text-[#15110F]" style={{ fontWeight: 300 }}>{card.copy}</p>
          </motion.div>
        ))}
      </section>

      <section className="overflow-hidden rounded-[32px] border border-[#E8E1D6] bg-[#F7F4EE] p-5 shadow-[0_24px_70px_-62px_rgba(26,22,20,0.58)] md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.16em]" style={{ color: slide.color }}>
            Reading the system
          </p>
          <div className="flex items-center gap-2">
            {synthesisSlides.map((item, index) => (
              <button
                key={item.leftTitle}
                type="button"
                aria-label={`Show synthesis slide ${index + 1}`}
                aria-current={activeSlide === index}
                onClick={() => setActiveSlide(index)}
                className="h-3 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/30"
                style={{
                  width: activeSlide === index ? 32 : 12,
                  backgroundColor: activeSlide === index ? item.color : '#D9D2C8',
                }}
              />
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <AnimatePresence mode="wait">
            <motion.article
              key={activeSlide}
              className="contents"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              <div className="rounded-[26px] bg-white p-6 shadow-[0_18px_52px_-48px_rgba(26,22,20,0.58)] md:p-7">
                <div className="mb-5 h-1 w-12 rounded-full" style={{ backgroundColor: slide.color }} />
                <p className="text-[11px] font-extrabold uppercase tracking-[0.15em]" style={{ color: slide.color }}>
                  {slide.leftTitle}
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-[#4D4741]" style={{ fontWeight: 300 }}>
                  {slide.leftCopy}
                </p>
              </div>
              <div className="rounded-[26px] bg-white p-6 shadow-[0_18px_52px_-48px_rgba(26,22,20,0.58)] md:p-7">
                <div className="mb-5 h-1 w-12 rounded-full" style={{ backgroundColor: slide.color }} />
                <p className="text-[11px] font-extrabold uppercase tracking-[0.15em]" style={{ color: slide.color }}>
                  {slide.rightTitle}
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-[#4D4741]" style={{ fontWeight: 300 }}>
                  {slide.rightCopy}
                </p>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        <div className="mt-5 flex flex-wrap justify-between gap-3">
          <button
            type="button"
            onClick={() => setActiveSlide((activeSlide + synthesisSlides.length - 1) % synthesisSlides.length)}
            className="rounded-full border border-[#DED6CB] px-5 py-3 text-[12px] font-bold uppercase tracking-[0.12em] text-[#5F5952] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/30"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => setActiveSlide((activeSlide + 1) % synthesisSlides.length)}
            className="rounded-full px-5 py-3 text-[12px] font-bold uppercase tracking-[0.12em] text-white transition-transform hover:translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/30"
            style={{ backgroundColor: CHALLENGE }}
          >
            Next
          </button>
        </div>
      </section>

      <a
        href="#direction"
        className="group block rounded-[28px] bg-[#1A1614] p-7 text-white shadow-[0_26px_70px_-58px_rgba(26,22,20,0.72)] transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/30 md:p-8"
      >
        <div className="grid gap-5 md:grid-cols-[auto_1fr_auto] md:items-center">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-[#FFBB30]">
            <Compass size={21} strokeWidth={2.2} />
          </div>
          <p className="text-[18px] leading-relaxed text-white/88" style={{ fontWeight: 300 }}>
            Your direction is not to lower the peak. It is to strengthen the foundations beneath it so that Challenge can remain powerful without carrying the whole system.
          </p>
          <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.13em] text-[#FFBB30] transition-transform group-hover:translate-x-1">
            Your Direction
            <ArrowRight size={16} strokeWidth={2.4} />
          </span>
        </div>
      </a>
    </div>
  );
}

function SystemMap() {
  return (
    <div className="relative z-10 flex h-full min-h-[500px] flex-col justify-between">
      <div className="relative mx-auto h-[360px] w-full max-w-[430px]">
        <motion.div
          className="absolute left-1/2 top-4 h-52 w-52 -translate-x-1/2 rounded-full blur-2xl"
          style={{ backgroundColor: 'rgba(220,76,12,0.2)' }}
          animate={{ opacity: [0.45, 0.8, 0.45], scale: [0.95, 1.08, 0.95] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <svg viewBox="0 0 430 360" className="relative z-10 h-full w-full overflow-visible" aria-labelledby="systemMapTitle systemMapDesc" role="img">
          <title id="systemMapTitle">Dynamic foundation system</title>
          <desc id="systemMapDesc">Challenge generates the strongest momentum while Safety and Play provide less support underneath.</desc>
          <defs>
            <filter id="nodeShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="#1A1614" floodOpacity="0.13" />
            </filter>
            <linearGradient id="apexGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F15A1A" />
              <stop offset="100%" stopColor="#C84A2D" />
            </linearGradient>
          </defs>

          <motion.path
            d="M112 258 C165 210 212 170 215 104"
            fill="none"
            stroke={SAFETY}
            strokeWidth="12"
            strokeLinecap="round"
            opacity="0.38"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          />
          <motion.path
            d="M318 258 C268 214 219 170 215 104"
            fill="none"
            stroke={PLAY}
            strokeWidth="10"
            strokeLinecap="round"
            opacity="0.35"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, delay: 0.12, ease: 'easeOut' }}
          />
          <motion.path
            d="M215 104 C215 158 223 206 250 252"
            fill="none"
            stroke={CHALLENGE}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="2 18"
            opacity="0.72"
            animate={{ strokeDashoffset: [0, -60] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'linear' }}
          />

          <motion.g filter="url(#nodeShadow)" animate={{ y: [0, -5, 0] }} transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}>
            <path d="M215 18 L282 104 L215 190 L148 104 Z" fill="url(#apexGradient)" />
            <text x="215" y="97" textAnchor="middle" fill="#FFFFFF" fontSize="15" fontWeight="900" letterSpacing="2.2">CHALLENGE</text>
            <text x="215" y="122" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="700">GENERATES MOMENTUM</text>
          </motion.g>

          <g filter="url(#nodeShadow)">
            <path d="M70 222 L188 222 L136 308 L30 308 Z" fill={SAFETY} opacity="0.82" />
            <text x="108" y="266" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="900" letterSpacing="2">SAFETY</text>
            <text x="108" y="288" textAnchor="middle" fill="#FFFFFF" fontSize="11">NEEDS SUPPORT</text>
          </g>
          <g filter="url(#nodeShadow)">
            <path d="M242 222 L360 222 L400 308 L294 308 Z" fill={PLAY} opacity="0.82" />
            <text x="322" y="266" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="900" letterSpacing="2">PLAY</text>
            <text x="322" y="288" textAnchor="middle" fill="#FFFFFF" fontSize="11">PARTIAL REFILL</text>
          </g>

          <motion.circle
            cx="215"
            cy="104"
            r="122"
            fill="none"
            stroke={CHALLENGE}
            strokeWidth="2"
            strokeDasharray="7 12"
            opacity="0.28"
            animate={{ rotate: 360 }}
            style={{ transformOrigin: '215px 104px' }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          />
        </svg>
      </div>

      <div className="rounded-[24px] bg-white/76 p-5 shadow-[0_18px_44px_-38px_rgba(26,22,20,0.5)]">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.16em]" style={{ color: CHALLENGE }}>
          The synthesis in one line
        </p>
        <p className="mt-3 text-[18px] leading-snug text-[#15110F]" style={{ fontFamily: SERIF, fontWeight: 600 }}>
          The strongest part of the system is also the part being asked to hold the most.
        </p>
      </div>
    </div>
  );
}
