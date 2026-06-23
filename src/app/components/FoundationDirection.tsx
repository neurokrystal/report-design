import { useState } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, ArrowRight, Compass, ShieldCheck, Sparkles, Sprout, type LucideIcon } from 'lucide-react';

const SERIF = '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif';
const NAV_ORANGE = '#FF5A1F';
const SAFETY = '#42A68E';
const CHALLENGE = '#DC4C0C';
const PLAY = '#FFAB00';

const changeStates = [
  {
    label: 'Small',
    title: 'A little more steadiness',
    copy: 'The inner voice softens slightly. Rest produces a little more recovery than it currently does. Your Challenge still leads, but it begins to push from a less urgent edge.',
  },
  {
    label: 'Medium',
    title: 'A foundation that can hold',
    copy: 'Safety becomes less conditional. You let people lean on you and let yourself lean back. The whole architecture becomes more harmonious because Challenge no longer has to carry the weight of three domains.',
  },
  {
    label: 'Large',
    title: 'The shape begins to round out',
    copy: 'Challenge becomes pursuit instead of compensation. Play returns as a daily presence, and the gap between what you feel and what you show starts to close. The peak softens because it no longer has to hold everything up.',
  },
];

const traps = [
  {
    title: 'Pushing harder at Challenge',
    text: 'Achievement can hide the absence of Safety by giving the system enough momentum to keep going without it.',
    Icon: Compass,
  },
  {
    title: 'Performing wellness',
    text: 'A practice only reaches Safety when it can be imperfect and still received without judgement.',
    Icon: Sparkles,
  },
  {
    title: 'Being needed instead of held',
    text: 'Connection grows when support can move toward you, not only through you.',
    Icon: Sprout,
  },
  {
    title: 'Planning faster',
    text: 'Your Future is strong, but direction is not the same thing as a foundation.',
    Icon: ArrowRight,
  },
];

export function FoundationDirection() {
  const [active, setActive] = useState(1);
  const state = changeStates[active];

  return (
    <div className="space-y-9">
      <div>
        <p className="mb-[30px] text-[11px] font-extrabold uppercase tracking-[0.16em]" style={{ color: NAV_ORANGE }}>08 Direction</p>
        <h1 style={{ fontFamily: SERIF, fontWeight: 600, letterSpacing: '-0.03em', fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', color: '#0F0F0F', marginBottom: '30px' }}>
          Your Foundation Direction
        </h1>
        <div style={{ width: '40px', height: '3px', backgroundColor: NAV_ORANGE, marginTop: '30px', marginBottom: '16px' }} />
      </div>

      <div className="overflow-hidden rounded-[32px] border border-[#E8E1D6] bg-white p-7 shadow-[0_26px_70px_-58px_rgba(26,22,20,0.55)] md:p-10">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <PathwayGraphic />
          <div>
            <div className="mb-5 inline-flex items-center gap-3 rounded-full bg-[#EAF7F3] px-4 py-2 text-[#0F473D]">
              <ShieldCheck size={18} strokeWidth={2.3} />
              <span className="text-[11px] font-bold uppercase tracking-[0.15em]">Safety is the path</span>
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem, 3.2vw, 3rem)', lineHeight: 1.05, letterSpacing: '-0.04em', color: '#15110F' }}>
              Strengthening the base changes more than the base.
            </h2>
            <div className="mt-6 space-y-4 text-[15.5px] leading-relaxed text-[#1A1614]" style={{ fontWeight: 300 }}>
              <p>
                Your reading points to Safety because it is the depleted leg of the Sharp Peak. Challenge has been compensating for it, which keeps you moving but makes rest harder to receive.
              </p>
              <p>
                Building Safety is not another surface intervention. It changes the foundation the interventions were trying to reach: how you hold yourself, how you receive support, and how much effort it takes to feel steady.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-[28px] bg-[#F8F6F1] p-6 md:p-7">
          <div className="mb-6 flex flex-wrap gap-3">
            {changeStates.map((item, index) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setActive(index)}
                className="rounded-full px-5 py-2 text-sm font-semibold transition-colors"
                style={{
                  backgroundColor: active === index ? SAFETY : '#FFFFFF',
                  color: active === index ? '#FFFFFF' : '#5F5952',
                  boxShadow: active === index ? '0 14px 26px -20px rgba(66,166,142,0.8)' : 'inset 0 0 0 1px #E4DED5',
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="grid gap-8 md:grid-cols-[0.7fr_1.3fr] md:items-center">
            <GrowthGauge active={active} />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: SAFETY }}>{state.label} change</p>
              <h3 className="mt-2" style={{ fontFamily: SERIF, fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', lineHeight: 1.05, letterSpacing: '-0.035em', color: '#15110F' }}>
                {state.title}
              </h3>
              <p className="mt-4 text-[15.5px] leading-relaxed text-[#1A1614]" style={{ fontWeight: 300 }}>{state.copy}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-5" style={{ fontFamily: SERIF, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', lineHeight: 1.05, letterSpacing: '-0.035em', color: '#15110F' }}>
          Patterns that can look like progress
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {traps.map((trap, index) => (
            <TrapCard key={trap.title} {...trap} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PathwayGraphic() {
  return (
    <div className="relative min-h-[380px] overflow-hidden rounded-[28px] bg-[#F6F3ED] p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_70%,rgba(66,166,142,0.18),transparent_40%),radial-gradient(circle_at_78%_28%,rgba(220,76,12,0.10),transparent_38%)]" />
      <svg viewBox="0 0 420 340" className="relative z-10 h-[330px] w-full" aria-hidden="true">
        <motion.path
          d="M54 244 C128 196 178 205 222 158 C266 111 315 91 366 72"
          fill="none"
          stroke="#DCD5CA"
          strokeWidth="20"
          strokeLinecap="round"
        />
        <motion.path
          d="M54 244 C128 196 178 205 222 158 C266 111 315 91 366 72"
          fill="none"
          stroke={SAFETY}
          strokeWidth="20"
          strokeLinecap="round"
          pathLength="1"
          strokeDasharray="1"
          initial={{ strokeDashoffset: 1 }}
          whileInView={{ strokeDashoffset: 0.28 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
        <Node x={54} y={244} color={SAFETY} label="Safety" />
        <Node x={222} y={158} color={PLAY} label="Play returns" />
        <Node x={366} y={72} color={CHALLENGE} label="Challenge rests" />
      </svg>
    </div>
  );
}

function Node({ x, y, color, label }: { x: number; y: number; color: string; label: string }) {
  return (
    <g>
      <motion.circle
        cx={x}
        cy={y}
        r="20"
        fill="#FFFFFF"
        stroke={color}
        strokeWidth="6"
        animate={{ r: [19, 22, 19] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <text x={x} y={y + 44} textAnchor="middle" style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', fill: '#5F5952' }}>{label}</text>
    </g>
  );
}

function GrowthGauge({ active }: { active: number }) {
  return (
    <div className="grid h-40 place-items-center">
      <div className="relative h-32 w-32">
        {[0, 1, 2].map((index) => (
          <motion.span
            key={index}
            className="absolute inset-0 rounded-full border-[10px]"
            style={{
              borderColor: index <= active ? SAFETY : '#E4DED5',
              opacity: index <= active ? 0.24 + index * 0.18 : 0.55,
              transform: `scale(${0.62 + index * 0.2})`,
            }}
            animate={index === active ? { scale: [0.62 + index * 0.2, 0.68 + index * 0.2, 0.62 + index * 0.2] } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
        <div className="absolute inset-0 grid place-items-center">
          <ShieldCheck size={34} color={SAFETY} strokeWidth={2.2} />
        </div>
      </div>
    </div>
  );
}

function TrapCard({ title, text, Icon, index }: { title: string; text: string; Icon: LucideIcon; index: number }) {
  return (
    <motion.div
      className="rounded-[24px] border border-[#E8D9D0] bg-[#FFF8F4] p-5"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.38, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-[#DC4C0C]">
          <Icon size={20} strokeWidth={2.1} />
        </div>
        <div>
          <h4 className="font-semibold text-[#1A1614]">{title}</h4>
          <p className="mt-2 text-sm leading-relaxed text-[#4D4945]" style={{ fontWeight: 300 }}>{text}</p>
        </div>
      </div>
    </motion.div>
  );
}
