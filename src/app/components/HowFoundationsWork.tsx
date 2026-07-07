import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

const SERIF = '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif';
const NAV_ORANGE = '#FF5A1F';
const SAFETY = '#42A68E';
const PLAY = '#FFAB00';
const CHALLENGE = '#DC4C0C';
const INK = '#15110F';

const synthesisBeats = [
  {
    label: 'The pattern',
    title: 'Your strongest part is being asked to hold the most.',
    copy:
      "Your drive is not only moving you forward. It is also being asked to create steadiness and keep energy alive, because Safety and Play are not yet carrying enough of that weight.",
    accent: CHALLENGE,
  },
  {
    label: 'Why it keeps running',
    title: 'It works often enough to feel necessary.',
    copy:
      'Pushing forward genuinely produces results, and those results can make you feel steadier for a while. So when the ground feels shaky, doing more becomes the fastest way to feel right again.',
    accent: PLAY,
  },
  {
    label: 'What it costs',
    title: 'Arrival never fully gets to arrive.',
    copy:
      "When steadiness depends mostly on progress, stopping can feel unsafe. Work that matters can still begin to take more than it gives, because the part that should refill you is not yet replenishing the system.",
    accent: SAFETY,
  },
] as const;

export function HowFoundationsWork() {
  const [activeBeat, setActiveBeat] = useState(0);
  const beat = synthesisBeats[activeBeat];

  return (
    <div className="space-y-14">
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

      <section className="relative -mx-4 overflow-hidden px-4 py-8 md:-mx-8 md:px-8 lg:py-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(220,76,12,0.14),transparent_31%),radial-gradient(circle_at_76%_18%,rgba(255,171,0,0.11),transparent_30%),radial-gradient(circle_at_45%_84%,rgba(66,166,142,0.12),transparent_36%)]" />
        <div className="pointer-events-none absolute left-1/2 top-20 h-[520px] w-[520px] -translate-x-1/2 rounded-full border border-[#E7DED1]/55" />
        <motion.div
          className="pointer-events-none absolute left-1/2 top-10 h-[620px] w-[620px] -translate-x-1/2 rounded-full border border-[#EFE7DD]/70"
          animate={{ scale: [0.98, 1.04, 0.98], opacity: [0.36, 0.74, 0.36] }}
          transition={{ duration: 7.4, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative mx-auto max-w-[1050px]">
          <div className="grid gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:items-center">
            <div className="space-y-8">
              <div>
                <p className="mb-5 text-[11px] font-extrabold uppercase tracking-[0.18em]" style={{ color: CHALLENGE }}>
                  System synthesis
                </p>
                <h2
                  style={{
                    fontFamily: SERIF,
                    fontSize: 'clamp(2.6rem, 5.2vw, 5.7rem)',
                    lineHeight: 0.95,
                    letterSpacing: '-0.06em',
                    color: INK,
                  }}
                >
                  The pattern finally becomes visible.
                </h2>
              </div>

              <p className="max-w-[560px] text-[18px] leading-[1.75] text-[#332E29]" style={{ fontWeight: 300 }}>
                You have now seen Safety, Play, and Challenge separately. This is where they stop reading as three results and begin to read as one living system.
              </p>

              <div className="grid gap-3">
                {synthesisBeats.map((item, index) => {
                  const active = activeBeat === index;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onMouseEnter={() => setActiveBeat(index)}
                      onFocus={() => setActiveBeat(index)}
                      onClick={() => setActiveBeat(index)}
                      className="group relative w-full overflow-hidden rounded-[22px] border bg-white/74 p-5 text-left shadow-[0_20px_56px_-50px_rgba(26,22,20,0.58)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/30"
                      style={{
                        borderColor: active ? `${item.accent}58` : '#E8E1D6',
                        transform: active ? 'translateX(4px)' : 'translateX(0)',
                      }}
                    >
                      <motion.div
                        className="pointer-events-none absolute inset-y-0 left-0 w-1"
                        style={{ backgroundColor: item.accent }}
                        animate={{ opacity: active ? 1 : 0.34 }}
                        transition={{ duration: 0.2 }}
                      />
                      <div className="flex items-start gap-4 pl-2">
                        <span
                          className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full text-[11px] font-black"
                          style={{ color: item.accent, backgroundColor: `${item.accent}12` }}
                        >
                          {index + 1}
                        </span>
                        <span>
                          <span className="block text-[11px] font-extrabold uppercase tracking-[0.16em]" style={{ color: item.accent }}>
                            {item.label}
                          </span>
                          <span className="mt-2 block text-[18px] leading-snug text-[#15110F]" style={{ fontFamily: SERIF, fontWeight: 600 }}>
                            {item.title}
                          </span>
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="relative min-h-[640px]">
              <SystemSynthesisVisual activeBeat={activeBeat} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1050px] gap-9 lg:grid-cols-[0.6fr_0.4fr] lg:items-start">
        <div className="relative overflow-hidden rounded-[34px] border border-[#E8E1D6] bg-[#FCFAF6] p-8 shadow-[0_28px_76px_-66px_rgba(26,22,20,0.7)] md:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(220,76,12,0.10),transparent_34%),radial-gradient(circle_at_82%_80%,rgba(66,166,142,0.10),transparent_36%)]" />
          <AnimatePresence mode="wait">
            <motion.article
              key={activeBeat}
              className="relative"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-[11px] font-extrabold uppercase tracking-[0.18em]" style={{ color: beat.accent }}>
                {beat.label}
              </p>
              <h3
                className="mt-4"
                style={{
                  fontFamily: SERIF,
                  fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
                  lineHeight: 1.03,
                  letterSpacing: '-0.05em',
                  color: INK,
                }}
              >
                {beat.title}
              </h3>
              <p className="mt-7 max-w-[680px] text-[18px] leading-[1.78] text-[#332E29]" style={{ fontWeight: 300 }}>
                {beat.copy}
              </p>
            </motion.article>
          </AnimatePresence>
        </div>

        <div className="space-y-5">
          <div className="rounded-[30px] bg-[#1A1614] p-7 text-white shadow-[0_30px_80px_-62px_rgba(26,22,20,0.78)]">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#FFBB30]">The mechanism</p>
            <p className="mt-5 text-[27px] leading-tight" style={{ fontFamily: SERIF, fontWeight: 600, letterSpacing: '-0.04em' }}>
              The peak is being asked to do the base's job.
            </p>
          </div>
          <div className="rounded-[30px] border border-[#E8E1D6] bg-white p-7 shadow-[0_18px_52px_-48px_rgba(26,22,20,0.55)]">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em]" style={{ color: CHALLENGE }}>
              The bridge
            </p>
            <p className="mt-5 text-[17px] leading-relaxed text-[#332E29]" style={{ fontWeight: 300 }}>
              None of this means your drive is the problem. The shift is about giving the other two foundations enough support that your drive can remain powerful without holding everything up on its own.
            </p>
          </div>
        </div>
      </section>

      <a
        href="#direction"
        className="group mx-auto block max-w-[1050px] rounded-[32px] bg-[#15110F] p-7 text-white shadow-[0_28px_78px_-58px_rgba(26,22,20,0.78)] transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/30 md:p-8"
      >
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <p className="text-[20px] leading-relaxed text-white/88" style={{ fontWeight: 300 }}>
            The strength stays. The next section begins where this pattern can actually shift.
          </p>
          <span className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#15110F] transition-transform group-hover:translate-x-1">
            Your Direction
            <ArrowRight size={16} strokeWidth={2.4} />
          </span>
        </div>
      </a>
    </div>
  );
}

function SystemSynthesisVisual({ activeBeat }: { activeBeat: number }) {
  const patternActive = activeBeat === 0;
  const loopActive = activeBeat === 1;
  const costActive = activeBeat === 2;

  return (
    <div className="relative h-full min-h-[640px] overflow-visible">
      <motion.div
        className="absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ backgroundColor: loopActive ? 'rgba(255,171,0,0.22)' : patternActive ? 'rgba(220,76,12,0.18)' : 'rgba(66,166,142,0.16)' }}
        animate={{ scale: [0.96, 1.08, 0.96], opacity: [0.42, 0.74, 0.42] }}
        transition={{ duration: 6.6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <svg viewBox="0 0 680 640" className="absolute inset-0 h-full w-full overflow-visible" role="img" aria-labelledby="foundationSystemTitle foundationSystemDesc">
        <title id="foundationSystemTitle">Foundations working as one system</title>
        <desc id="foundationSystemDesc">Challenge forms the strongest peak while Safety and Play sit lower, showing how one foundation carries more of the system.</desc>
        <defs>
          <filter id="integrationSoftGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="integrationShadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="22" stdDeviation="18" floodColor="#1A1614" floodOpacity="0.14" />
          </filter>
          <linearGradient id="loadedPeakFill" x1="340" y1="88" x2="340" y2="474" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F35A20" stopOpacity="0.9" />
            <stop offset="0.68" stopColor="#F35A20" stopOpacity="0.42" />
            <stop offset="1" stopColor="#F2A900" stopOpacity="0.16" />
          </linearGradient>
          <radialGradient id="arrivalGlow" cx="50%" cy="50%" r="50%">
            <stop stopColor="#FFFFFF" stopOpacity="0.96" />
            <stop offset="0.32" stopColor="#FFAB00" stopOpacity="0.62" />
            <stop offset="1" stopColor="#FFAB00" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g opacity="0.78">
          {[0.25, 0.5, 0.75, 1].map((ring, index) => (
            <path
              key={ring}
              d={`M340 ${474 - 386 * ring} L${116 + 224 * (1 - ring)} ${474} L${564 - 224 * (1 - ring)} ${474} Z`}
              fill="none"
              stroke="#D8D0C4"
              strokeWidth={index === 3 ? 1.4 : 1}
              opacity={index === 3 ? 0.7 : 0.46}
            />
          ))}
          <path d="M340 88 L340 474" stroke="#D8D0C4" strokeWidth="1.2" />
          <path d="M340 474 L116 474" stroke="#D8D0C4" strokeWidth="1.2" />
          <path d="M340 474 L564 474" stroke="#D8D0C4" strokeWidth="1.2" />
        </g>

        <motion.path
          d="M340 172 L253 382 L412 398 Z"
          fill="url(#loadedPeakFill)"
          animate={{
            opacity: costActive ? 0.46 : 0.72,
            scale: patternActive ? [1, 1.018, 1] : 1,
          }}
          style={{ transformOrigin: '340px 474px' }}
          transition={{ duration: 4.8, repeat: patternActive ? Infinity : 0, ease: 'easeInOut' }}
        />

        <motion.path
          d="M340 172 L253 382 L412 398"
          fill="none"
          stroke={patternActive ? CHALLENGE : '#B9B0A6'}
          strokeWidth={patternActive ? 4 : 2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={patternActive ? 'url(#integrationSoftGlow)' : undefined}
          animate={{ opacity: patternActive ? [0.76, 1, 0.76] : 0.44 }}
          transition={{ duration: 3.8, repeat: patternActive ? Infinity : 0, ease: 'easeInOut' }}
        />

        <motion.path
          d="M340 474 C342 404 341 298 340 172"
          fill="none"
          stroke={CHALLENGE}
          strokeWidth="9"
          strokeLinecap="round"
          opacity={patternActive ? 0.78 : 0.34}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />

        <motion.path
          d="M253 382 C280 334 314 282 340 172"
          fill="none"
          stroke={SAFETY}
          strokeWidth="4"
          strokeLinecap="round"
          opacity={patternActive ? 0.56 : 0.22}
          strokeDasharray="4 14"
          animate={{ strokeDashoffset: patternActive ? [0, -54] : 0 }}
          transition={{ duration: 5.8, repeat: patternActive ? Infinity : 0, ease: 'linear' }}
        />
        <motion.path
          d="M412 398 C388 346 358 280 340 172"
          fill="none"
          stroke={PLAY}
          strokeWidth="4"
          strokeLinecap="round"
          opacity={patternActive ? 0.56 : 0.22}
          strokeDasharray="4 14"
          animate={{ strokeDashoffset: patternActive ? [0, -54] : 0 }}
          transition={{ duration: 5.8, repeat: patternActive ? Infinity : 0, ease: 'linear', delay: 0.3 }}
        />

        {loopActive && (
          <g>
            <path d="M340 474 C474 456 520 346 442 260 C392 204 342 196 340 172" fill="none" stroke="#E9A821" strokeWidth="2" strokeDasharray="8 11" opacity="0.58" />
            <motion.circle
              r="7"
              fill={PLAY}
              filter="url(#integrationSoftGlow)"
              animate={{
                cx: [340, 442, 514, 442, 340],
                cy: [474, 260, 354, 466, 474],
                opacity: [0.18, 0.78, 0.62, 0.42, 0.18],
              }}
              transition={{ duration: 4.6, repeat: Infinity, ease: [0.43, 0, 0.2, 1] }}
            />
            <motion.path
              d="M340 474 C340 384 340 284 340 172"
              fill="none"
              stroke={CHALLENGE}
              strokeWidth="5"
              strokeLinecap="round"
              animate={{ pathLength: [0, 1, 1], opacity: [0.2, 0.86, 0.18] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }}
            />
          </g>
        )}

        {costActive && (
          <g>
            <motion.path
              d="M116 506 C218 540 308 540 340 506 C374 470 448 470 564 506"
              fill="none"
              stroke="#7B756E"
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.34"
              animate={{ pathLength: [0, 1, 1], opacity: [0.12, 0.42, 0.24] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.path
              d="M228 512 C276 552 320 562 340 528 C360 494 406 504 452 544"
              fill="none"
              stroke={SAFETY}
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.52"
              strokeDasharray="5 12"
              animate={{ strokeDashoffset: [0, -68] }}
              transition={{ duration: 5.4, repeat: Infinity, ease: 'linear' }}
            />
            <motion.circle
              cx="340"
              cy="172"
              r="108"
              fill="none"
              stroke={CHALLENGE}
              strokeWidth="2"
              strokeDasharray="3 13"
              opacity="0.32"
              animate={{ scale: [0.94, 1.18, 0.94], opacity: [0.18, 0.38, 0.18] }}
              style={{ transformOrigin: '340px 172px' }}
              transition={{ duration: 3.9, repeat: Infinity, ease: 'easeInOut' }}
            />
          </g>
        )}

        <g filter="url(#integrationShadow)">
          <motion.circle
            cx="340"
            cy="172"
            r="17"
            fill={CHALLENGE}
            stroke="#FFF9F0"
            strokeWidth="6"
            animate={{ scale: patternActive ? [1, 1.18, 1] : 1 }}
            style={{ transformOrigin: '340px 172px' }}
            transition={{ duration: 3.2, repeat: patternActive ? Infinity : 0, ease: 'easeInOut' }}
          />
          <circle cx="253" cy="382" r="13" fill={SAFETY} stroke="#FFF9F0" strokeWidth="5" opacity="0.9" />
          <circle cx="412" cy="398" r="13" fill={PLAY} stroke="#FFF9F0" strokeWidth="5" opacity="0.9" />
          <circle cx="340" cy="334" r="14" fill="#FFFDF9" stroke="#D9D1C5" strokeWidth="4" />
        </g>

        <motion.circle
          cx="340"
          cy="172"
          r="86"
          fill="url(#arrivalGlow)"
          opacity={loopActive ? 0.5 : 0.22}
          animate={{ scale: [0.82, 1.24, 0.82], opacity: loopActive ? [0.18, 0.58, 0.18] : [0.12, 0.3, 0.12] }}
          style={{ transformOrigin: '340px 172px' }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        />

        <g style={{ fontFamily: SERIF, fontWeight: 600 }}>
          <text x="340" y="78" textAnchor="middle" fill={CHALLENGE} fontSize="34">Challenge</text>
          <text x="168" y="556" textAnchor="middle" fill={SAFETY} fontSize="28">Safety</text>
          <text x="512" y="556" textAnchor="middle" fill={PLAY} fontSize="28">Play</text>
        </g>
      </svg>

      <div className="absolute bottom-10 left-1/2 w-[72%] -translate-x-1/2 rounded-[30px] border border-[#E8E1D6] bg-white/82 p-6 text-center shadow-[0_24px_70px_-58px_rgba(26,22,20,0.55)] backdrop-blur-md">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.18em]" style={{ color: CHALLENGE }}>
          The system view
        </p>
        <p className="mt-3 text-[23px] leading-tight text-[#15110F]" style={{ fontFamily: SERIF, fontWeight: 600, letterSpacing: '-0.035em' }}>
          One shape. Three foundations. One load.
        </p>
      </div>
    </div>
  );
}
