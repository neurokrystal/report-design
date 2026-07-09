import { motion } from 'motion/react';

const SERIF = '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif';
const NAV_ORANGE = '#FF5A1F';
const SAFETY = '#42A68E';
const PLAY = '#FFAB00';
const CHALLENGE = '#DC4C0C';
const INK = '#15110F';

const dailyCosts = [
  "Rest doesn't fully restore you - you slow down but don't quite settle.",
  "Stopping can feel unsafe, so you don't stop for long.",
  'You spend more than you take back; the system runs at a deficit.',
  "Things without a visible result get less of you, because investing in them can feel like time that isn't earning.",
];

export function HowFoundationsWork() {
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

      <section className="relative -mx-4 overflow-hidden px-4 pb-8 pt-2 md:-mx-8 md:px-8 lg:pb-14 lg:pt-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_16%,rgba(220,76,12,0.11),transparent_31%),radial-gradient(circle_at_74%_42%,rgba(255,171,0,0.10),transparent_36%),radial-gradient(circle_at_48%_88%,rgba(66,166,142,0.12),transparent_39%)]" />
        <div className="relative mx-auto max-w-[1080px] space-y-16">
          <PatternStop />
          <BenefitStop />
          <CostStop />
          <BeliefStop />
        </div>
      </section>
    </div>
  );
}

function PatternStop() {
  return (
    <section className="grid min-h-[720px] gap-12 pt-2 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:items-center">
      <div>
        <p className="text-[11px] font-extrabold uppercase tracking-[0.18em]" style={{ color: CHALLENGE }}>
          The pattern
        </p>
        <h2
          className="mt-6 max-w-[640px]"
          style={{
            fontFamily: SERIF,
            fontSize: 'clamp(3.15rem, 6vw, 6.4rem)',
            lineHeight: 0.91,
            letterSpacing: '-0.065em',
            color: INK,
          }}
        >
          Your three domains do not sit side by side.
        </h2>
        <p className="mt-9 max-w-[610px] text-[19px] leading-[1.8] text-[#332E29]" style={{ fontWeight: 300 }}>
          They work on each other, and together they produce one pattern you have been living inside without seeing its shape.
        </p>
        <p className="mt-5 max-w-[590px] text-[17px] leading-[1.75] text-[#5A534C]" style={{ fontWeight: 300 }}>
          Challenge leads; Safety and Play sit well below it. That gap is not three separate scores. It is a system with one part carrying most of the load, and it repeats.
        </p>
      </div>
      <PatternGeometry />
    </section>
  );
}

function BenefitStop() {
  return (
    <section className="relative min-h-[720px] overflow-hidden border border-[#F0E1D6] bg-[#FFFDF9]/78 p-8 shadow-[0_34px_110px_-86px_rgba(220,76,12,0.62)] md:p-11 lg:p-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_22%,rgba(220,76,12,0.16),transparent_34%),radial-gradient(circle_at_78%_32%,rgba(255,171,0,0.13),transparent_36%)]" />
      <div className="relative grid h-full gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em]" style={{ color: CHALLENGE }}>
            What it gives you
          </p>
          <h2
            className="mt-6 max-w-[660px]"
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(2.8rem, 5.35vw, 5.65rem)',
              lineHeight: 0.94,
              letterSpacing: '-0.062em',
              color: INK,
            }}
          >
            Your drive makes you capable in a way most people are not.
          </h2>
          <p className="mt-9 max-w-[650px] text-[19px] leading-[1.78] text-[#332E29]" style={{ fontWeight: 300 }}>
            You set a direction and move on it. You deliver when it matters, and you hold under pressure that makes others fold. People rely on you because you have earned it - you are the one who gets the hard thing done, and done well.
          </p>
          <p className="mt-7 max-w-[630px] border-l pl-5 text-[22px] leading-[1.52] text-[#1E1915]" style={{ borderColor: `${CHALLENGE}70`, fontFamily: SERIF }}>
            This is not a flaw dressed up as a strength. It is a genuine engine, and it reaches outcomes people without it never get near.
          </p>
        </div>
        <BenefitGeometry />
      </div>
    </section>
  );
}

function CostStop() {
  return (
    <section className="relative min-h-[800px] overflow-hidden bg-[#17120F] p-8 text-white shadow-[0_34px_110px_-82px_rgba(19,14,12,0.96)] md:p-11 lg:p-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(255,90,31,0.16),transparent_34%),radial-gradient(circle_at_70%_88%,rgba(66,166,142,0.14),transparent_42%)]" />
      <div className="relative grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#FFBB30]">What it costs</p>
          <h2
            className="mt-6 max-w-[620px]"
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(2.8rem, 5.4vw, 5.7rem)',
              lineHeight: 0.94,
              letterSpacing: '-0.062em',
            }}
          >
            The price is larger than the trade you think you are making.
          </h2>
          <p className="mt-8 max-w-[600px] text-[18px] leading-[1.78] text-[#EFE5D9]" style={{ fontWeight: 300 }}>
            You already know there is a cost, and you have likely decided it is a fair price. It is worth seeing the whole of it.
          </p>
        </div>
        <CostGeometry />
      </div>

      <div className="relative mt-10 grid gap-5 lg:grid-cols-2">
        <div className="border border-white/12 bg-white/[0.045] p-7">
          <p className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-[#CFC6BC]">Day to day</p>
          <ul className="mt-5 space-y-4">
            {dailyCosts.map(item => (
              <li key={item} className="text-[16px] leading-relaxed text-[#F5EDE3]" style={{ fontWeight: 300 }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-white/12 bg-white/[0.045] p-7">
          <p className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-[#CFC6BC]">Over time</p>
          <p className="mt-5 text-[17px] leading-[1.8] text-[#F5EDE3]" style={{ fontWeight: 300 }}>
            What you know about yourself narrows to what you do. Steadiness and self-regard come mostly from output, so when output is not available - an illness, a setback, a stretch where you cannot act - there is less underneath to stand on.
          </p>
          <p className="mt-5 border-l border-[#FFBB30]/60 pl-5 text-[19px] leading-[1.55] text-[#FFF9EE]" style={{ fontFamily: SERIF }}>
            At your level, with Challenge sitting this far above the rest, this has likely moved past the daily cost toward the deeper one.
          </p>
        </div>
      </div>
    </section>
  );
}

function BeliefStop() {
  return (
    <section className="relative overflow-hidden border border-[#E2D7C9] bg-[#FFFDF9] p-8 shadow-[0_28px_90px_-78px_rgba(27,22,18,0.55)] md:p-11 lg:p-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(220,76,12,0.13),transparent_34%),radial-gradient(circle_at_12%_100%,rgba(255,171,0,0.12),transparent_36%)]" />
      <div className="relative grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em]" style={{ color: CHALLENGE }}>
            The belief that keeps it running
          </p>
          <h2
            className="mt-6"
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(2.3rem, 4.4vw, 4.7rem)',
              lineHeight: 0.96,
              letterSpacing: '-0.058em',
              color: INK,
            }}
          >
            It does not feel like a belief. It feels like a fact.
          </h2>
          <HingeGeometry />
        </div>
        <div>
          <p className="max-w-[650px] text-[18px] leading-[1.75] text-[#332E29]" style={{ fontWeight: 300 }}>
            Underneath all of it is one quiet assumption:
          </p>
          <p className="mt-5 max-w-[650px] text-[35px] leading-tight text-[#15110F]" style={{ fontFamily: SERIF, letterSpacing: '-0.045em' }}>
            that steadiness would cost you your drive.
          </p>
          <p className="mt-6 max-w-[620px] text-[17px] leading-[1.7] text-[#5A534C]" style={{ fontWeight: 300 }}>
            That is why the pattern holds.
          </p>
        </div>
      </div>
    </section>
  );
}

function HingeGeometry() {
  return (
    <div className="mt-9 h-[96px] max-w-[360px]">
      <svg viewBox="0 0 360 96" className="h-full w-full overflow-visible" role="img" aria-labelledby="hingeGeometryTitle hingeGeometryDesc">
        <title id="hingeGeometryTitle">Belief hinge</title>
        <desc id="hingeGeometryDesc">Two quiet plates meet at one small point, showing the assumption that holds the pattern in place.</desc>
        <defs>
          <linearGradient id="hingeWarm" x1="0" x2="360" y1="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#DC4C0C" stopOpacity="0.14" />
            <stop offset="0.5" stopColor="#15110F" stopOpacity="0.62" />
            <stop offset="1" stopColor="#FFAB00" stopOpacity="0.14" />
          </linearGradient>
        </defs>
        <motion.path
          d="M24 48 L166 48"
          stroke="url(#hingeWarm)"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{ pathLength: [0.18, 1, 0.18], opacity: [0.3, 0.82, 0.3] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M194 48 L336 48"
          stroke="url(#hingeWarm)"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{ pathLength: [0.18, 1, 0.18], opacity: [0.3, 0.82, 0.3] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.25 }}
        />
        <motion.polygon points="180,28 200,48 180,68 160,48" fill="#15110F" animate={{ scale: [0.92, 1.06, 0.92] }} style={{ transformOrigin: '180px 48px' }} transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }} />
        <circle cx="180" cy="48" r="5" fill="#FFAB00" />
      </svg>
    </div>
  );
}

function PatternGeometry() {
  return (
    <div className="relative min-h-[520px] overflow-visible">
      <motion.div
        className="absolute left-[54%] top-1/2 h-[470px] w-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(220,76,12,0.16)' }}
        animate={{ scale: [0.96, 1.1, 0.96], opacity: [0.24, 0.58, 0.24] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <svg viewBox="0 0 760 640" className="absolute inset-0 h-full w-full overflow-visible" role="img" aria-labelledby="patternGeometryTitle patternGeometryDesc">
        <title id="patternGeometryTitle">Repeating system pattern</title>
        <desc id="patternGeometryDesc">Several translucent force fields overlap around one repeated load path, showing three domains producing one operating pattern.</desc>
        <defs>
          <filter id="patternGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="13" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="patternChallengeField" x1="444" x2="444" y1="86" y2="548" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F2551A" stopOpacity="0.7" />
            <stop offset="0.55" stopColor="#F2551A" stopOpacity="0.22" />
            <stop offset="1" stopColor="#F2551A" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="patternSafetyField" x1="92" x2="560" y1="442" y2="354" gradientUnits="userSpaceOnUse">
            <stop stopColor="#42A68E" stopOpacity="0.42" />
            <stop offset="1" stopColor="#42A68E" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="patternPlayField" x1="660" x2="240" y1="456" y2="316" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFAB00" stopOpacity="0.38" />
            <stop offset="1" stopColor="#FFAB00" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="patternLoadStack" x1="238" x2="548" y1="210" y2="430" gradientUnits="userSpaceOnUse">
            <stop stopColor="#15110F" stopOpacity="0.06" />
            <stop offset="0.45" stopColor="#DC4C0C" stopOpacity="0.2" />
            <stop offset="1" stopColor="#15110F" stopOpacity="0.04" />
          </linearGradient>
        </defs>

        <g opacity="0.38">
          {[0, 1, 2].map(index => (
            <motion.ellipse
              key={index}
              cx="382"
              cy="336"
              rx={148 + index * 72}
              ry={104 + index * 46}
              fill="none"
              stroke="#DED4C8"
              strokeWidth="1"
              transform="rotate(-8 382 336)"
              animate={{ scale: [0.985, 1.025, 0.985], opacity: [0.18, 0.38, 0.18] }}
              style={{ transformOrigin: '382px 336px' }}
              transition={{ duration: 7.2 + index * 1.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </g>

        <motion.path
          d="M416 88 C488 176 526 290 504 410 C488 494 442 548 404 566 C352 482 328 390 348 286 C364 198 386 132 416 88Z"
          fill="url(#patternChallengeField)"
          filter="url(#patternGlow)"
          animate={{ y: [0, -12, 0], opacity: [0.62, 0.92, 0.62] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M94 414 C224 364 388 346 572 392 C460 452 322 492 144 496 C104 478 88 450 94 414Z"
          fill="url(#patternSafetyField)"
          animate={{ x: [0, 12, 0], opacity: [0.44, 0.72, 0.44] }}
          transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M666 426 C548 354 390 326 220 372 C320 446 456 498 620 506 C660 486 678 458 666 426Z"
          fill="url(#patternPlayField)"
          animate={{ x: [0, -12, 0], opacity: [0.42, 0.68, 0.42] }}
          transition={{ duration: 6.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        />
        {[0, 1, 2, 3].map(index => (
          <motion.rect
            key={index}
            x={232 + index * 30}
            y={246 + index * 36}
            width={296 - index * 28}
            height="44"
            rx="22"
            fill="url(#patternLoadStack)"
            transform={`rotate(${index % 2 ? -6 : 7} ${380} ${268 + index * 36})`}
            animate={{ x: [0, index % 2 ? 12 : -12, 0], opacity: [0.18, 0.42, 0.18] }}
            transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.18 }}
          />
        ))}

        <motion.path
          d="M180 464 C266 382 492 376 586 462"
          fill="none"
          stroke="#AFA397"
          strokeWidth="1.4"
          strokeDasharray="6 12"
          opacity="0.5"
          animate={{ strokeDashoffset: [0, -72] }}
          transition={{ duration: 7.4, repeat: Infinity, ease: 'linear' }}
        />
        {[0, 1, 2].map(index => (
          <motion.path
            key={index}
            d={`M${400 + index * 20} ${148 + index * 38} C${420 + index * 10} ${256 + index * 22} ${390 - index * 14} ${396 + index * 16} ${404 - index * 6} 526`}
            fill="none"
            stroke={CHALLENGE}
            strokeWidth={index === 1 ? 3.2 : 1.5}
            strokeOpacity={index === 1 ? 0.28 : 0.13}
            strokeLinecap="round"
            animate={{ pathLength: [0.24, 1, 0.24], opacity: [0.12, index === 1 ? 0.4 : 0.2, 0.12] }}
            transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: index * 0.22 }}
          />
        ))}
        {[
          { cx: 224, cy: 448, fill: SAFETY },
          { cx: 548, cy: 452, fill: PLAY },
          { cx: 426, cy: 190, fill: CHALLENGE },
          { cx: 386, cy: 354, fill: '#FFFDF9' },
        ].map((dot, index) => (
          <motion.circle
            key={`${dot.cx}-${dot.cy}`}
            cx={dot.cx}
            cy={dot.cy}
            r={index === 3 ? 18 : 8}
            fill={dot.fill}
            stroke={index === 3 ? '#D8CFC4' : '#FFFDF9'}
            strokeWidth={index === 3 ? 4 : 3}
            animate={{ scale: [0.92, 1.1, 0.92], opacity: [0.58, 0.95, 0.58] }}
            style={{ transformOrigin: `${dot.cx}px ${dot.cy}px` }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: index * 0.25 }}
          />
        ))}
      </svg>
    </div>
  );
}

function BenefitGeometry() {
  return (
    <div className="relative min-h-[520px] overflow-visible">
      <motion.div
        className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(255,90,31,0.18)' }}
        animate={{ scale: [0.94, 1.08, 0.94], opacity: [0.3, 0.68, 0.3] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <svg viewBox="0 0 760 640" className="absolute inset-0 h-full w-full overflow-visible" role="img" aria-labelledby="benefitGeometryTitle benefitGeometryDesc">
        <title id="benefitGeometryTitle">Drive as engine</title>
        <desc id="benefitGeometryDesc">Warm geometric thrust rises from a stable centre, representing earned capability and pressure held well.</desc>
        <defs>
          <filter id="benefitGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="9" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="benefitBeam" x1="380" x2="380" y1="78" y2="544" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F2551A" stopOpacity="0.78" />
            <stop offset="0.52" stopColor="#FFAB00" stopOpacity="0.34" />
            <stop offset="1" stopColor="#FFAB00" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="benefitCore" cx="50%" cy="50%" r="50%">
            <stop stopColor="#FFFDF9" stopOpacity="1" />
            <stop offset="0.42" stopColor="#FFAB00" stopOpacity="0.6" />
            <stop offset="1" stopColor="#F2551A" stopOpacity="0" />
          </radialGradient>
        </defs>

        <motion.polygon points="380,86 516,520 244,520" fill="url(#benefitBeam)" opacity="0.72" animate={{ scaleY: [0.96, 1.04, 0.96], opacity: [0.48, 0.78, 0.48] }} style={{ transformOrigin: '380px 520px' }} transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }} />
        {[0, 1, 2, 3].map(index => (
          <motion.rect
            key={index}
            x={318 + index * 30}
            y={384 - index * 56}
            width="124"
            height="34"
            rx="17"
            fill={index % 2 ? '#FFAB00' : '#DC4C0C'}
            opacity={0.18 + index * 0.08}
            transform={`rotate(-18 ${380 + index * 30} ${401 - index * 56})`}
            animate={{ y: [0, -16, 0], opacity: [0.18 + index * 0.08, 0.36 + index * 0.1, 0.18 + index * 0.08] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: index * 0.22 }}
          />
        ))}
        <motion.circle cx="380" cy="392" r="104" fill="url(#benefitCore)" filter="url(#benefitGlow)" animate={{ scale: [0.86, 1.08, 0.86], opacity: [0.58, 0.94, 0.58] }} style={{ transformOrigin: '380px 392px' }} transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }} />
        <circle cx="380" cy="392" r="22" fill="#FFFDF9" stroke={CHALLENGE} strokeWidth="7" />
        {[
          { x: 160, y: 190, text: 'earned trust' },
          { x: 504, y: 180, text: 'under pressure' },
          { x: 506, y: 450, text: 'gets it done' },
        ].map((item, index) => (
          <motion.g key={item.text} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.18 + index * 0.12 }}>
            <line x1={item.x - 18} y1={item.y - 5} x2={item.x - 54} y2={item.y - 5} stroke={CHALLENGE} strokeWidth="2" strokeOpacity="0.4" />
            <text x={item.x} y={item.y} fill="#5A3122" fontSize="13" fontWeight="800" letterSpacing="1.45">
              {item.text.toUpperCase()}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

function CostGeometry() {
  return (
    <div className="relative min-h-[520px] overflow-visible">
      <motion.div
        className="absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(0,0,0,0.28)' }}
        animate={{ scale: [0.98, 1.06, 0.98], opacity: [0.32, 0.62, 0.32] }}
        transition={{ duration: 6.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <svg viewBox="0 0 760 640" className="absolute inset-0 h-full w-full overflow-visible" role="img" aria-labelledby="costGeometryTitle costGeometryDesc">
        <title id="costGeometryTitle">Cost of the pattern</title>
        <desc id="costGeometryDesc">A tall warm load presses down onto a narrow base, with dim side paths showing the system running at a deficit.</desc>
        <defs>
          <linearGradient id="costLoad" x1="380" x2="380" y1="88" y2="480" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F2551A" stopOpacity="0.62" />
            <stop offset="1" stopColor="#15110F" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="costFloor" x1="150" x2="610" y1="522" y2="522" gradientUnits="userSpaceOnUse">
            <stop stopColor="#42A68E" stopOpacity="0.18" />
            <stop offset="0.5" stopColor="#F5EDE3" stopOpacity="0.46" />
            <stop offset="1" stopColor="#FFAB00" stopOpacity="0.16" />
          </linearGradient>
          <filter id="costBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>

        <motion.polygon points="380,82 468,420 380,505 292,420" fill="url(#costLoad)" opacity="0.7" animate={{ y: [0, 18, 0] }} transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.rect x="196" y="512" width="368" height="20" rx="10" fill="url(#costFloor)" animate={{ rotate: [-1.4, 1.8, -1.4], y: [0, 10, 0] }} style={{ transformOrigin: '380px 522px' }} transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.path d="M186 536 C280 580 480 580 574 536" fill="none" stroke="#F5EDE3" strokeWidth="6" strokeLinecap="round" opacity="0.16" animate={{ pathLength: [0, 1, 1], opacity: [0.06, 0.22, 0.1] }} transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.g animate={{ opacity: [0.24, 0.5, 0.24] }} transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}>
          <circle cx="284" cy="450" r="7" fill={SAFETY} opacity="0.58" />
          <circle cx="332" cy="474" r="5" fill={SAFETY} opacity="0.34" />
          <circle cx="476" cy="454" r="7" fill={PLAY} opacity="0.5" />
          <circle cx="428" cy="480" r="5" fill={PLAY} opacity="0.3" />
        </motion.g>
        {[0, 1, 2, 3, 4].map(index => (
          <motion.line
            key={index}
            x1={270 + index * 55}
            y1="118"
            x2={238 + index * 55}
            y2="540"
            stroke="#F5EDE3"
            strokeWidth="1"
            strokeOpacity="0.08"
            filter="url(#costBlur)"
            animate={{ opacity: [0.04, 0.12, 0.04] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
          />
        ))}
        <text x="380" y="596" textAnchor="middle" fill="#D8CFC4" fontSize="13" fontWeight="800" letterSpacing="1.5">
          LESS UNDERNEATH TO STAND ON
        </text>
      </svg>
    </div>
  );
}
