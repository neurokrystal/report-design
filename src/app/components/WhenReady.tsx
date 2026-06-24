import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CalendarClock, FileText, RefreshCw, Route, Sparkles, TrendingUp } from 'lucide-react';

const SERIF = '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif';
const NAV_ORANGE = '#FF5A1F';

export function WhenReady() {
  return (
    <div className="space-y-9 pb-16">
      <div>
        <p className="mb-[30px] text-[11px] font-extrabold uppercase tracking-[0.16em]" style={{ color: NAV_ORANGE }}>09 Next Steps</p>
        <h1 style={{ fontFamily: SERIF, fontWeight: 600, letterSpacing: '-0.03em', fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', color: '#0F0F0F', marginBottom: '30px' }}>
          When You're Ready
        </h1>
        <div style={{ width: '40px', height: '3px', backgroundColor: NAV_ORANGE, marginTop: '30px', marginBottom: '16px' }} />
      </div>

      <section className="relative overflow-hidden rounded-[32px] bg-[#1A1614] p-8 text-white shadow-[0_28px_76px_-54px_rgba(26,22,20,0.74)] md:p-10">
        <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[#42A68E]/12" />
        <div className="absolute -bottom-32 left-10 h-72 w-72 rounded-full bg-[#FFAB00]/10" />
        <div className="relative grid gap-9 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#FFBB30]">This reading is a map</p>
            <h2 className="mt-4" style={{ fontFamily: SERIF, fontSize: 'clamp(2rem, 3.5vw, 3.25rem)', lineHeight: 1, letterSpacing: '-0.04em' }}>
              You do not need to solve the whole architecture at once.
            </h2>
          </div>
          <div className="space-y-4 text-[15.5px] leading-relaxed text-white/78" style={{ fontWeight: 300 }}>
            <p>
              The report shows what is true this season: the shape, the gaps, and the foundation that would create the most change if it became stronger.
            </p>
            <p>
              The next step is not to become a different person. It is to use this reading as a precise lens for development, reflection, therapy, coaching, or a retest after meaningful work.
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-5 md:grid-cols-3">
        <NextStepCard
          icon={<FileText className="h-6 w-6" />}
          title="Explore specific contexts"
          description="See how this architecture shows up in leadership, relationships, wellbeing, or another part of life."
          color="#42A68E"
          delay={0}
        />

        <NextStepCard
          icon={<TrendingUp className="h-6 w-6" />}
          title="Build the foundation"
          description="Use the development pathway to strengthen the base, especially where the reading points to Safety."
          color="#DC4C0C"
          delay={0.06}
        />

        <NextStepCard
          icon={<RefreshCw className="h-6 w-6" />}
          title="Return after a season"
          description="Retest after intentional work or a meaningful life shift, when the architecture has had time to move."
          color="#FFAB00"
          delay={0.12}
        />
      </div>

      <section className="relative overflow-hidden rounded-[30px] border border-[#E8E1D6] bg-white p-7 shadow-[0_24px_70px_-58px_rgba(26,22,20,0.5)] md:p-8">
        <div className="grid gap-7 md:grid-cols-[0.68fr_1.32fr] md:items-center">
          <div className="relative grid min-h-52 place-items-center rounded-[26px] bg-[#F8F6F1]">
            <motion.div
              className="absolute h-28 w-28 rounded-full border-[10px] border-[#42A68E]/22"
              animate={{ scale: [1, 1.08, 1], opacity: [0.72, 1, 0.72] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute h-40 w-40 rounded-full border-[10px] border-[#FFAB00]/18"
              animate={{ scale: [1, 1.05, 1], opacity: [0.55, 0.88, 0.55] }}
              transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            />
            <Route className="relative h-12 w-12 text-[#1A1614]" strokeWidth={1.7} />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8B8682]">How to use this now</p>
            <div className="mt-5 grid gap-4">
              <UsePoint icon={<Sparkles size={18} />} title="Let the profile organise the conversation" text="Bring the reading to someone who knows you, and use the shape, alignment gap, and direction as the shared language." />
              <UsePoint icon={<CalendarClock size={18} />} title="Treat change as seasonal" text="A foundation does not shift because you understood it once. It shifts when the pattern is practised differently over time." />
            </div>
          </div>
        </div>
      </section>

      <div className="rounded-[24px] bg-[#F8F6F3] p-6 text-center">
        <p className="text-sm text-[#8B8682]">
          This reading was generated by the Dimensional System on June 9, 2026.
        </p>
      </div>
    </div>
  );
}

interface NextStepCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color: string;
  delay: number;
}

function NextStepCard({ icon, title, description, color, delay }: NextStepCardProps) {
  return (
    <motion.button
      type="button"
      className="group relative overflow-hidden rounded-[26px] border border-[#E8E1D6] bg-white p-6 text-left shadow-[0_22px_58px_-52px_rgba(26,22,20,0.55)] transition-colors hover:bg-[#FCFBF8]"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.44, delay }}
      whileHover={{ y: -5 }}
    >
      <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-[38px]" style={{ backgroundColor: `${color}10` }} />
      <div className="relative grid h-12 w-12 place-items-center rounded-[16px]" style={{ backgroundColor: `${color}16`, color }}>
        {icon}
      </div>
      <h3 className="relative mt-6 text-[18px] font-semibold text-[#1A1614]">{title}</h3>
      <p className="relative mt-3 text-sm leading-relaxed text-[#4D4945]" style={{ fontWeight: 300 }}>{description}</p>
      <div className="relative mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color }}>
        Continue <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </div>
    </motion.button>
  );
}

function UsePoint({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="flex gap-4 rounded-[22px] bg-[#FBFAF7] p-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-[#DC4C0C]">
        {icon}
      </span>
      <div>
        <h4 className="font-semibold text-[#1A1614]">{title}</h4>
        <p className="mt-1 text-sm leading-relaxed text-[#4D4945]" style={{ fontWeight: 300 }}>{text}</p>
      </div>
    </div>
  );
}
