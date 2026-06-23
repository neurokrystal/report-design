import { motion } from 'motion/react';
import { Layers3, ShieldCheck, Sparkles, type LucideIcon } from 'lucide-react';

const SERIF = '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif';
const NAV_ORANGE = '#FF5A1F';
const SAFETY = '#42A68E';
const PLAY = '#FFAB00';
const CHALLENGE = '#DC4C0C';

const domainStates = [
  {
    name: 'Challenge',
    value: '78%',
    label: 'Apex',
    copy: 'Direction and pursuit are genuinely available. This is the part carrying the profile forward.',
    color: CHALLENGE,
  },
  {
    name: 'Play',
    value: '41%',
    label: 'Low support',
    copy: 'There is some aliveness here, but not enough replenishment to refill what the system is spending.',
    color: PLAY,
  },
  {
    name: 'Safety',
    value: '27%',
    label: 'Depleted base',
    copy: 'This is the foundation most likely to change the whole architecture if it receives support.',
    color: SAFETY,
  },
];

export function HowFoundationsWork() {
  return (
    <div className="space-y-9">
      <div>
        <p className="mb-[30px] text-[11px] font-extrabold uppercase tracking-[0.16em]" style={{ color: NAV_ORANGE }}>07 Integration</p>
        <h1 style={{ fontFamily: SERIF, fontWeight: 600, letterSpacing: '-0.03em', fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', color: '#0F0F0F', marginBottom: '30px' }}>
          How Your Foundations Work Together
        </h1>
        <div style={{ width: '40px', height: '3px', backgroundColor: NAV_ORANGE, marginTop: '30px', marginBottom: '16px' }} />
        <p className="text-lg text-[#6F6A64]">The synthesis: your three domains as one interacting system.</p>
      </div>

      <div className="overflow-hidden rounded-[32px] border border-[#E8E1D6] bg-white p-7 shadow-[0_26px_70px_-58px_rgba(26,22,20,0.55)] md:p-10">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <SystemGraphic />

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: CHALLENGE }}>Your three, as one system</p>
            <h2 className="mt-3" style={{ fontFamily: SERIF, fontSize: 'clamp(2rem, 3.2vw, 3rem)', lineHeight: 1.04, letterSpacing: '-0.04em', color: '#15110F' }}>
              The peak is real. The base is asking for support.
            </h2>
            <div className="mt-6 space-y-4 text-[15.5px] leading-relaxed text-[#1A1614]" style={{ fontWeight: 300 }}>
              <p>
                Challenge is the apex of this profile: clear, meaningful, and strongly forward-facing. That part of the system is not fake or inflated. It is a real resource.
              </p>
              <p>
                The strain is architectural. Safety is low and carrying an alignment gap, while Play is not resourced enough to restore what Safety spends. This creates a profile that can move with impressive direction while still feeling strangely unrested underneath.
              </p>
              <p>
                The reading does not ask you to lower the peak. It shows why strengthening the base would let the peak become less effortful, less brittle, and more naturally supported.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {domainStates.map((domain, index) => (
            <motion.div
              key={domain.name}
              className="rounded-[22px] bg-[#F8F6F1] p-5"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.42, delay: index * 0.06 }}
              whileHover={{ y: -4, backgroundColor: '#FCFAF6' }}
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: domain.color }} />
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8B8682]">{domain.label}</span>
              </div>
              <p className="text-[15px] font-semibold text-[#1A1614]">{domain.name}</p>
              <p className="mt-1 text-3xl tabular-nums" style={{ color: domain.color, fontFamily: SERIF }}>{domain.value}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#5F5952]" style={{ fontWeight: 300 }}>{domain.copy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SystemGraphic() {
  return (
    <div className="relative min-h-[430px] overflow-hidden rounded-[28px] bg-[#F6F3ED] p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(220,76,12,0.12),transparent_42%),radial-gradient(circle_at_27%_75%,rgba(66,166,142,0.14),transparent_38%)]" />
      <svg viewBox="0 0 420 420" className="relative z-10 mx-auto h-[360px] w-full max-w-[420px]" aria-hidden="true">
        <defs>
          <filter id="softSystemShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#1A1614" floodOpacity="0.12" />
          </filter>
        </defs>
        <motion.path
          d="M210 32 L305 196 L210 196 L115 196 Z"
          fill={CHALLENGE}
          opacity="0.9"
          filter="url(#softSystemShadow)"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <path d="M115 196 L210 196 L158 286 L44 286 Z" fill={SAFETY} opacity="0.9" />
        <path d="M210 196 L305 196 L376 286 L262 286 Z" fill={PLAY} opacity="0.9" />
        <motion.path
          d="M210 316 C210 288 210 252 210 216"
          stroke="#1A1614"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="4 9"
          opacity="0.28"
          animate={{ strokeDashoffset: [0, -26] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
        <motion.g animate={{ y: [0, 6, 0] }} transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDownIcon x={198} y={306} />
        </motion.g>
      </svg>

      <div className="relative z-10 grid gap-3 sm:grid-cols-3">
        <MiniCallout icon={Sparkles} title="Peak" text="Momentum is available." color={CHALLENGE} />
        <MiniCallout icon={Layers3} title="Base" text="Support is uneven." color={PLAY} />
        <MiniCallout icon={ShieldCheck} title="Direction" text="Build beneath it." color={SAFETY} />
      </div>
    </div>
  );
}

function ArrowDownIcon({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M12 2 V28" stroke="#42A68E" strokeWidth="3" strokeLinecap="round" />
      <path d="M2 19 L12 30 L22 19" fill="none" stroke="#42A68E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

function MiniCallout({ icon: Icon, title, text, color }: { icon: LucideIcon; title: string; text: string; color: string }) {
  return (
    <div className="rounded-[18px] bg-white/78 p-4 shadow-[0_18px_40px_-34px_rgba(26,22,20,0.5)]">
      <div className="mb-2 flex items-center gap-2">
        <Icon size={17} strokeWidth={2.2} style={{ color }} />
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#1A1614]">{title}</p>
      </div>
      <p className="text-xs leading-relaxed text-[#6F6A64]">{text}</p>
    </div>
  );
}
