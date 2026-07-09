import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

const SERIF = '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif';
const NAV_ORANGE = '#FF5A1F';
const SAFETY = '#42A68E';
const CHALLENGE = '#DC4C0C';
const PLAY = '#FFAB00';
const INK = '#15110F';

const gradientSteps = [
  {
    id: 'small',
    label: 'Small',
    title: 'Let one thing go unproduced.',
    copy: "A rest, a conversation, an afternoon that earns nothing - and notice you're still you afterwards.",
    safety: 42,
  },
  {
    id: 'medium',
    label: 'Medium',
    title: "Build steadiness that doesn't depend on the day's output.",
    copy: 'A footing you return to whether or not you have delivered.',
    safety: 58,
  },
  {
    id: 'large',
    label: 'Large',
    title: 'Let self-regard sit on something other than performance.',
    copy: 'A setback stops taking the ground out from under you.',
    safety: 72,
  },
] as const;

const traps = [
  {
    title: 'Achievement standing in for steadiness.',
    copy: "You push harder, and the momentum of getting things done hides the fact that nothing underneath has actually settled.",
  },
  {
    title: 'Rest becoming another performance.',
    copy: 'Getting better turns into one more thing to do correctly and be seen doing. Recovery becomes another arena to succeed in.',
  },
  {
    title: 'Being needed mistaken for being held.',
    copy: 'Connection looks strong because everyone leans on you. Carrying other people is not the same as being supported yourself.',
  },
  {
    title: 'Planning used as avoidance.',
    copy: 'Organising the next move keeps you busy with the future and skips the slower work of feeling steady where you already are.',
  },
];

export function FoundationDirection() {
  const [activeStep, setActiveStep] = useState<(typeof gradientSteps)[number]['id']>('small');
  const selected = gradientSteps.find(step => step.id === activeStep) ?? gradientSteps[0];

  return (
    <div className="space-y-14">
      <header>
        <p className="mb-[30px] text-[11px] font-extrabold uppercase tracking-[0.16em]" style={{ color: NAV_ORANGE }}>
          08 Direction
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
          Your Direction
        </h1>
        <div className="h-[3px] w-10" style={{ backgroundColor: NAV_ORANGE }} />
      </header>

      <section className="relative -mx-4 overflow-hidden px-4 pb-8 pt-2 md:-mx-8 md:px-8 lg:pb-14 lg:pt-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(66,166,142,0.14),transparent_33%),radial-gradient(circle_at_82%_18%,rgba(220,76,12,0.11),transparent_34%),radial-gradient(circle_at_54%_86%,rgba(255,171,0,0.10),transparent_38%)]" />
        <div className="relative mx-auto max-w-[1080px] space-y-16">
          <BeliefTurn />
          <ChangeGradient selected={selected} activeStep={activeStep} onSelect={setActiveStep} />
          <TrapTool />
        </div>
      </section>
    </div>
  );
}

function BeliefTurn() {
  return (
    <section className="grid min-h-[650px] gap-12 pt-2 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
      <div>
        <p className="text-[11px] font-extrabold uppercase tracking-[0.18em]" style={{ color: SAFETY }}>
          The turn
        </p>
        <h2
          className="mt-6 max-w-[670px]"
          style={{
            fontFamily: SERIF,
            fontSize: 'clamp(3rem, 5.8vw, 6.15rem)',
            lineHeight: 0.91,
            letterSpacing: '-0.065em',
            color: INK,
          }}
        >
          Steadiness would not cost you your drive. It would aim it.
        </h2>
        <p className="mt-9 max-w-[650px] text-[19px] leading-[1.8] text-[#332E29]" style={{ fontWeight: 300 }}>
          Your drive is not fuel you run out of if you rest - it is part of who you are. A strong swimmer does not lose the skill by getting out of the pool.
        </p>
        <p className="mt-5 max-w-[620px] text-[17px] leading-[1.75] text-[#5A534C]" style={{ fontWeight: 300 }}>
          What steadiness changes is not how much drive you have. It is that the drive stops having to hold up the whole system alone.
        </p>
      </div>
      <DirectionVisual safety={34} mode="turn" />
    </section>
  );
}

function ChangeGradient({
  selected,
  activeStep,
  onSelect,
}: {
  selected: (typeof gradientSteps)[number];
  activeStep: (typeof gradientSteps)[number]['id'];
  onSelect: (step: (typeof gradientSteps)[number]['id']) => void;
}) {
  return (
    <section className="relative min-h-[850px] overflow-hidden border border-[#DDE8E1] bg-[#FFFDF9]/82 p-8 shadow-[0_34px_110px_-84px_rgba(66,166,142,0.52)] md:p-11 lg:p-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(66,166,142,0.18),transparent_35%),radial-gradient(circle_at_82%_28%,rgba(255,171,0,0.11),transparent_38%)]" />
      <div className="relative grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em]" style={{ color: SAFETY }}>
            The change gradient
          </p>
          <h2
            className="mt-6 max-w-[640px]"
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(2.75rem, 5.1vw, 5.45rem)',
              lineHeight: 0.94,
              letterSpacing: '-0.062em',
              color: INK,
            }}
          >
            You do not lower the peak. You build the base beneath it.
          </h2>
          <p className="mt-8 max-w-[620px] text-[18px] leading-[1.78] text-[#332E29]" style={{ fontWeight: 300 }}>
            The lowest domain in your profile is Safety, and it is the one your drive has been standing in for. You can take that as far as you are ready to, and further over time.
          </p>
        </div>
        <DirectionVisual safety={selected.safety} mode="gradient" />
      </div>

      <div className="relative mt-10 grid gap-5 lg:grid-cols-3">
        {gradientSteps.map(step => {
          const active = step.id === activeStep;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onSelect(step.id)}
              onMouseEnter={() => onSelect(step.id)}
              className="relative overflow-hidden border bg-[#FFFDF9]/88 p-7 text-left transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#42A68E]/25"
              style={{
                borderColor: active ? `${SAFETY}90` : '#E1D8CD',
                borderTopWidth: 3,
                boxShadow: active ? '0 30px 70px -58px rgba(66,166,142,0.8)' : '0 22px 70px -62px rgba(27,22,18,0.45)',
              }}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[62%] bg-[radial-gradient(circle_at_50%_0%,rgba(66,166,142,0.18),transparent_64%)]" />
              <div className="relative">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.18em]" style={{ color: SAFETY }}>
                  {step.label}
                </p>
                <h3 className="mt-5 text-[28px] leading-tight text-[#15110F]" style={{ fontFamily: SERIF, letterSpacing: '-0.04em' }}>
                  {step.title}
                </h3>
                <p className="mt-5 text-[16px] leading-[1.7] text-[#4A433D]" style={{ fontWeight: 300 }}>
                  {step.copy}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <p className="relative mt-10 max-w-[850px] text-[19px] leading-[1.78] text-[#332E29]" style={{ fontWeight: 300 }}>
        As the base fills in, the thing you have been chasing through achievement starts arriving directly. Rest restores. A setback stops being a threat to who you are. The relationships you have been starving feed you back. You are not trading achievement for calm - you are getting what you actually wanted from the achievement, and keeping the achievement too.
      </p>
      <p className="relative mt-6 max-w-[620px] text-[30px] leading-tight text-[#15110F]" style={{ fontFamily: SERIF, letterSpacing: '-0.045em' }}>
        Same fuel, better trajectory.
      </p>
    </section>
  );
}

function TrapTool() {
  return (
    <section className="relative overflow-hidden bg-[#17120F] p-8 text-white shadow-[0_34px_110px_-82px_rgba(19,14,12,0.96)] md:p-11 lg:p-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_4%,rgba(220,76,12,0.20),transparent_34%),radial-gradient(circle_at_82%_100%,rgba(255,171,0,0.13),transparent_40%)]" />
      <div className="relative grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#FFBB30]">What to watch for</p>
          <h2
            className="mt-6"
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(2.45rem, 4.8vw, 5rem)',
              lineHeight: 0.94,
              letterSpacing: '-0.062em',
            }}
          >
            If it looks like progress but feels like the old pattern, check here.
          </h2>
          <p className="mt-8 max-w-[560px] text-[18px] leading-[1.78] text-[#EFE5D9]" style={{ fontWeight: 300 }}>
            The pattern is good at disguising itself. Whatever size step you take, it will try to reassert itself in new clothes.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {traps.map(trap => (
            <article key={trap.title} className="border border-white/12 bg-white/[0.045] p-6">
              <h3 className="text-[22px] leading-tight text-[#FFF9EE]" style={{ fontFamily: SERIF, letterSpacing: '-0.035em' }}>
                {trap.title}
              </h3>
              <p className="mt-4 text-[15.5px] leading-relaxed text-[#E9DED1]" style={{ fontWeight: 300 }}>
                {trap.copy}
              </p>
            </article>
          ))}
        </div>
      </div>
      <p className="relative mt-9 max-w-[790px] border-l border-[#FFBB30]/60 pl-5 text-[20px] leading-[1.55] text-[#FFF9EE]" style={{ fontFamily: SERIF }}>
        None of these mean you have failed. They mean the pattern is working as designed. Catching them is the skill.
      </p>

      <div className="relative mt-10 flex flex-wrap gap-3">
        <a
          href="#safety"
          className="inline-flex items-center gap-3 rounded-full bg-[#42A68E] px-6 py-3 text-[12px] font-extrabold uppercase tracking-[0.13em] text-white shadow-[0_20px_38px_-30px_rgba(66,166,142,0.85)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#42A68E]/30"
        >
          Read Safety
          <ArrowRight size={16} strokeWidth={2.4} />
        </a>
        <a
          href="#when-ready"
          className="inline-flex items-center gap-3 rounded-full border border-white/18 bg-white/10 px-6 py-3 text-[12px] font-extrabold uppercase tracking-[0.13em] text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
        >
          Continue
          <ArrowRight size={16} strokeWidth={2.4} />
        </a>
      </div>
    </section>
  );
}

function DirectionVisual({ safety, mode }: { safety: number; mode: 'turn' | 'gradient' }) {
  const points = directionPoints({ Safety: safety, Challenge: 78, Play: mode === 'gradient' ? 50 : 41 });
  const original = directionPoints({ Safety: 27, Challenge: 78, Play: 41 });
  const profile = `${points.challenge.x},${points.challenge.y} ${points.play.x},${points.play.y} ${points.safety.x},${points.safety.y}`;
  const originalProfile = `${original.challenge.x},${original.challenge.y} ${original.play.x},${original.play.y} ${original.safety.x},${original.safety.y}`;

  return (
    <div className="relative min-h-[520px] overflow-visible">
      <motion.div
        className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ backgroundColor: mode === 'gradient' ? 'rgba(66,166,142,0.2)' : 'rgba(220,76,12,0.13)' }}
        animate={{ scale: [0.96, 1.08, 0.96], opacity: [0.32, 0.68, 0.32] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <svg viewBox="0 0 720 630" className="absolute inset-0 h-full w-full overflow-visible" role="img" aria-labelledby={`direction-${mode}-title direction-${mode}-desc`}>
        <title id={`direction-${mode}-title`}>Direction shape</title>
        <desc id={`direction-${mode}-desc`}>The Challenge peak remains while Safety grows beneath it.</desc>
        <defs>
          <filter id={`directionGlow-${mode}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id={`directionFill-${mode}`} x1="360" x2="360" y1="94" y2="520" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F2551A" stopOpacity="0.32" />
            <stop offset="0.58" stopColor="#42A68E" stopOpacity="0.18" />
            <stop offset="1" stopColor="#42A68E" stopOpacity="0.10" />
          </linearGradient>
        </defs>

        <g opacity="0.82">
          {[0.25, 0.5, 0.75, 1].map(scale => (
            <polygon key={scale} points={directionRingPoints(scale)} fill="none" stroke="#D8D0C4" strokeWidth={scale === 1 ? 1.35 : 0.9} opacity={scale === 1 ? 0.64 : 0.36} />
          ))}
          <line x1="360" y1="318" x2="360" y2="88" stroke="#D8D0C4" strokeWidth="1.1" />
          <line x1="360" y1="318" x2="161" y2="433" stroke="#D8D0C4" strokeWidth="1.1" />
          <line x1="360" y1="318" x2="559" y2="433" stroke="#D8D0C4" strokeWidth="1.1" />
        </g>

        <polygon points={originalProfile} fill="#1A1614" opacity="0.05" />
        <motion.polygon
          key={`${mode}-${safety}`}
          points={profile}
          fill={`url(#directionFill-${mode})`}
          stroke={mode === 'gradient' ? SAFETY : CHALLENGE}
          strokeWidth="2.4"
          strokeOpacity={mode === 'gradient' ? 0.48 : 0.36}
          initial={{ opacity: 0.48, scale: 0.98 }}
          animate={{ opacity: 0.76, scale: [0.99, 1.012, 0.99] }}
          style={{ transformOrigin: '360px 318px' }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {mode === 'gradient' && (
          <g>
            <motion.path
              d={`M360 318 L${points.safety.x} ${points.safety.y}`}
              fill="none"
              stroke={SAFETY}
              strokeWidth="7"
              strokeLinecap="round"
              opacity="0.78"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
              filter={`url(#directionGlow-${mode})`}
            />
            <motion.circle
              cx={points.safety.x}
              cy={points.safety.y}
              r="78"
              fill={SAFETY}
              opacity="0.12"
              animate={{ scale: [0.82, 1.18, 0.82], opacity: [0.08, 0.2, 0.08] }}
              style={{ transformOrigin: `${points.safety.x}px ${points.safety.y}px` }}
              transition={{ duration: 4.1, repeat: Infinity, ease: 'easeInOut' }}
            />
          </g>
        )}

        {mode === 'turn' && (
          <g>
            <motion.path
              d={`M${original.challenge.x} ${original.challenge.y} C432 198 468 248 450 318 C432 386 390 414 360 318`}
              fill="none"
              stroke="#FFBB30"
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeDasharray="7 12"
              opacity="0.58"
              animate={{ strokeDashoffset: [0, -76] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'linear' }}
            />
            <text x="478" y="300" fill="#8A5B20" fontSize="13" fontWeight="800" letterSpacing="1.4">
              IT STAYS
            </text>
          </g>
        )}

        <g>
          <circle cx={points.challenge.x} cy={points.challenge.y} r="14" fill={CHALLENGE} stroke="#FFF9F0" strokeWidth="6" opacity="0.9" />
          <motion.circle
            cx={points.safety.x}
            cy={points.safety.y}
            r={mode === 'gradient' ? 15 : 11}
            fill={SAFETY}
            stroke="#FFF9F0"
            strokeWidth="6"
            filter={mode === 'gradient' ? `url(#directionGlow-${mode})` : undefined}
            animate={mode === 'gradient' ? { scale: [1, 1.14, 1] } : undefined}
            style={{ transformOrigin: `${points.safety.x}px ${points.safety.y}px` }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <circle cx={points.play.x} cy={points.play.y} r="12" fill={PLAY} stroke="#FFF9F0" strokeWidth="5" opacity="0.78" />
          <circle cx="360" cy="318" r="13" fill="#FFFDF9" stroke="#D9D1C5" strokeWidth="4" />
        </g>

        <g style={{ fontFamily: SERIF, fontWeight: 600 }}>
          <text x="360" y="54" textAnchor="middle" fill={CHALLENGE} fontSize="31">Challenge</text>
          <text x="184" y="535" textAnchor="middle" fill={SAFETY} fontSize="25">Safety</text>
          <text x="536" y="535" textAnchor="middle" fill={PLAY} fontSize="25">Play</text>
        </g>
      </svg>
    </div>
  );
}

function directionPoints(scores: { Safety: number; Challenge: number; Play: number }) {
  const centre = { x: 360, y: 318 };
  const max = 230;
  const point = (angle: number, score: number) => {
    const radians = (angle * Math.PI) / 180;
    return {
      x: centre.x + Math.cos(radians) * max * (score / 100),
      y: centre.y + Math.sin(radians) * max * (score / 100),
    };
  };
  return {
    challenge: point(-90, scores.Challenge),
    play: point(30, scores.Play),
    safety: point(150, scores.Safety),
  };
}

function directionRingPoints(scale: number) {
  const centre = { x: 360, y: 318 };
  const max = 230 * scale;
  return [-90, 30, 150]
    .map(angle => {
      const radians = (angle * Math.PI) / 180;
      return `${centre.x + Math.cos(radians) * max},${centre.y + Math.sin(radians) * max}`;
    })
    .join(' ');
}
