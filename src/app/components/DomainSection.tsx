import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import {
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  Activity,
  Check,
  Compass,
  Eye,
  Flag,
  Gauge,
  History,
  Mountain,
  ShieldCheck,
  UserRound,
  UsersRound,
  Waves,
} from 'lucide-react';

import lowSelf from '../../imports/10__Low_Self.svg';
import lowOthers from '../../imports/10__Low_Others.svg';
import lowPerception from '../../imports/10__Low_Perception.svg';
import highPerception from '../../imports/50__Perception.svg';
import highFuture from '../../imports/50__Future.svg';
import highPast from '../../imports/50__Past.svg';

const SERIF = '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif';

const dimIcons: Record<string, string> = {
  Self: lowSelf,
  Others: lowOthers,
  Perception: highPerception,
  Senses: lowPerception,
  Future: highFuture,
  Past: highPast,
};

interface DomainSectionProps {
  domain: 'Safety' | 'Play' | 'Challenge';
  score: number;
  band: string;
  felt: number;
  expressed: number;
  color: string;
}

const domainContent = {
  Safety: {
    what: "Safety is the foundation of inner peace, what lets you feel grounded from within and meet life without defence. It is experienced through two dimensions: your relationship with yourself (Self) and your relationship with others (Others).",
    levels: {
      low: {
        label: "When it's low",
        text: "Low safety often shows itself through over-controlling, driving too hard, or holding a composure that takes effort to maintain. Underneath, a background sense that something could go wrong, and rest that does not fully restore.",
      },
      balanced: {
        label: "When it's balanced",
        text: "You feel at ease without needing to manage it, steady in yourself when things are uncertain, calm in your body without conditions, and able to be close to people without monitoring or performing.",
      },
      excess: {
        label: "When it's excess",
        text: "So much weight on staying settled that you can feel numb, and stepping into anything new or stimulating starts to feel like a risk you would rather not take.",
      },
    },
    feltText: "At this level, your nervous system is rarely off duty. Even in moments that should feel safe, there is a quiet vigilance running underneath: the sense that something needs watching, that ease might not last, that you have to stay ready. Rest does not fully restore you. Your inner voice is often the loudest in the room, and it is seldom on your side. You may not call any of this anxiety, because it does not look dramatic from the outside. It is the texture you have learned to live in.",
    expressedText: "Outwardly, you express Safety at 35. You hold yourself together. You arrive on time, you meet your obligations, you keep your composure under pressure. Most people around you would describe you as steady, even reliable. What they do not see is what the steadiness costs, or that the composure is held by effort rather than ease.",
    alignmentText: "Your felt Safety reads 22; your expressed Safety reads 35. This is a significant upward divergence. You appear more settled than you actually feel, and the gap is wide enough that it is no longer a small piece of social management. It is structural. You have learned to look safer than you are, and the effort of that maintenance is a hidden cost most readings would not surface.",
    alignmentExtended: "The cost of carrying this gap is not only the energy of the performance. It is the slow erosion of the link between your inner experience and the people around you. The colleagues, friends, and partners who think you are fine are not wrong; you are showing them fine. But fine is not what is happening. The longer the gap persists, the harder it becomes to be received as you actually are.",
    isAlignmentFlagged: true,
    dimensions: [
      {
        name: 'Self',
        score: 38,
        band: 'Low',
        lead: "Your relationship with yourself runs on conditions. You are on your own side when you have produced something, held the line under pressure, or met your own standard. When you fall short, the approval withdraws quickly, and your inner voice turns sharper than the one you would use with anyone else, most reliably when you are tired or when something has not gone to plan.",
        working: "Held to a standard, you deliver, and the self-respect that follows is real because you earned it. This is an inner relationship that performs well in achievement and under pressure, when there is a clear bar to clear.",
        takeNote: "The approval is paid for by performance, never quite given freely. Rest with yourself waits until the work is finished, and in stillness, when there is nothing to earn it with, the same foundation thins out.",
      },
      {
        name: 'Others',
        score: 24,
        band: 'Very Low',
        lead: "Leaning on people is something you do rarely, and seldom without a quiet internal accounting. Support is harder for you to receive than to give. There may be people who would show up for you in a moment, and you simply have not asked, not from any lack of trust, but because asking carries a weight you would rather carry yourself.",
        working: "From the outside you are well-regarded, often the steady one others come to. You give support readily and generously, and people genuinely feel held by you.",
        takeNote: "Your relationship to interdependence runs mostly one way. You take in far less than you put out, and the gap is wide enough that the people who would gladly share the load have no idea there is a load to share.",
      },
    ],
  },
  Play: {
    what: "Play is vibrant, felt aliveness, what brings lightness, richness, and creative range to your experience of life. It is experienced through two dimensions: your relationship with your body (Senses) and your relationship with your mind (Perception).",
    levels: {
      low: {
        label: "When it's low",
        text: "Life can feel flat or mechanical, a quiet guilt around doing things purely for enjoyment, and a disconnection from the body's signals and pleasures. Spontaneity, surprise, and lightness meet resistance.",
      },
      balanced: {
        label: "When it's balanced",
        text: "There is a sense of lightness woven through ordinary days, enjoyment in sensory and creative experience, regular moments of laughter or flow, and energy that feels alive without needing a reason.",
      },
      excess: {
        label: "When it's excess",
        text: "Immersion tips into over-indulgence, the search for stimulation outpaces actual pleasure, and you can lose yourself in what feels good at the cost of your other demands.",
      },
    },
    feltText: "Your inner life has narrowed. The textures that would normally arrive without effort, the small flickers of curiosity, the body responding to a piece of music, the moment of being absorbed in something for its own sake, show up less than they used to, and you may not have noticed. You can describe your days, but fewer of them have flavour.",
    expressedText: "Outwardly, you express Play at 47. You laugh in the right places, you enjoy meals with people, you do the things that look like rest and pleasure. From a distance, your life appears to contain enjoyment. It does, just less than it appears to, and less than is available to you.",
    alignmentText: "Your felt Play reads 38; your expressed Play reads 47. This is a mild upward divergence. You express slightly more ease and pleasure than you currently feel. The gap is not architecturally significant on its own, but read alongside your Safety alignment, it suggests a consistent pattern. You are working harder than is visible to look more settled than you are.",
    alignmentExtended: null,
    isAlignmentFlagged: false,
    dimensions: [
      {
        name: 'Senses',
        score: 39,
        band: 'Low',
        text: "Your body is somewhere just outside the room. You inhabit it functionally, you move through your day, you eat, you sleep, but the small portals through which Play normally enters have narrowed. Warmth, taste, texture, breath, the weight of someone you love resting on you, these arrive as data more than as experience. You can register that something is pleasant without being filled by it.\n\nThis is not numbness. It is a body running a low-power mode it adopted to manage something. The disengagement is not a flaw in you. It is the result of asking your senses to do less so something else could carry more.",
      },
      {
        name: 'Perception',
        score: 43,
        band: 'Almost Balanced',
        text: "Your mental flexibility is present, but operating with less curiosity than is natural to you. You can hold complexity, you can shift perspective when asked, and you are not rigid in your thinking, but you are not currently generating new angles either. Interpretation has become more dutiful than playful. Your inner perceptual world is in maintenance mode.\n\nThis is a quieter dimension in your reading, neither the strongest nor the most depleted. The mental capacity is still there. It is the body's invitation to engage that has narrowed, and Perception, with less to receive from the senses, is generating less than it otherwise would.",
      },
    ],
  },
  Challenge: {
    what: "Challenge is meaningful forward motion, what gives you direction, purpose, and the sense that your actions matter. It is experienced through two dimensions: your relationship with your past (Past) and your relationship with your future (Future).",
    levels: {
      low: {
        label: "When it's low",
        text: "A sense of stagnation, avoiding decisions that carry real weight, and routines that stay busy while crowding out meaning. A quiet loss of momentum or direction, tension between what you want and what you actually move on.",
      },
      balanced: {
        label: "When it's balanced",
        text: "Clear direction that is personally meaningful, movement toward goals with self-respect, motivation that feels rooted rather than forced, and pride in how the challenges are chosen and carried.",
      },
      excess: {
        label: "When it's excess",
        text: "Struggle gets mistaken for meaning, busyness masquerades as growth, and you can chase goals you do not genuinely care about or find it hard to stop.",
      },
    },
    feltText: "Direction is one of the most settled things in your life. You know what you are doing, you know why you are doing it, and the connection between your effort and your meaning is strong. Pursuit feels good in your body. Forward motion regulates you in a way that few other things do. When you set a goal that matters, your system organises around it quickly, and that organisation is itself a source of relief.",
    expressedText: "Outwardly, you express Challenge at 77, almost exactly what you feel. Others would describe you as driven, focused, often ambitious. They would say you are someone who follows through. The match between the inner and outer experience here is real. This is the part of your architecture where what you feel and what you show are the same thing.",
    alignmentText: "Your felt Challenge reads 75; your expressed Challenge reads 77. This is an aligned reading. The drive you are showing the world is the drive you actually feel. There is no performance here. In a reading otherwise marked by alignment gaps, this domain is doing something important. It is the part of you that is fully whole, and the part you can most reliably trust.",
    alignmentExtended: null,
    isAlignmentFlagged: false,
    dimensions: [
      {
        name: 'Past',
        score: 51,
        band: 'Almost Balanced',
        text: "Your history is mostly integrated. You have a working relationship with where you have been, and you are not haunted by your story, but there are still some chapters that have not fully been authored. You can describe what happened, yet a few pieces of it remain on the shelf rather than woven into your identity.\n\nThis is not a depleted dimension. It is a foundation that is functional and not yet finished. What is interesting in your reading is that your Future runs significantly higher than your Past, meaning you are oriented forward more strongly than you are anchored backward.",
      },
      {
        name: 'Future',
        score: 82,
        band: 'High',
        text: "You are oriented forward with real clarity. Your sense of direction is one of the most resourced parts of your entire architecture. You know where you are going, you have planned the next few steps, and the future you are working toward is one you actually want. Choosing what to pursue is not where your energy gets stuck.\n\nThis is also, read against your other scores, the most architecturally interesting part of your reading. Your Future dimension is doing significant work, pulling you forward into a life that has not yet arrived while your Safety foundations sit thin underneath. Strong forward orientation is a real resource here. It can also become its own form of compensation, a place to live mentally that asks less of the foundations than the present moment does.",
        flagged: true,
      },
    ],
  },
};

// Tinted background per domain
const domainTints: Record<string, string> = {
  Safety: '#F0FAF7',
  Play: '#FFFBF0',
  Challenge: '#FFF5F0',
};

// Shared reveal animation for each row.
const reveal = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

export function DomainSection({ domain, score, band, felt, expressed, color }: DomainSectionProps) {
  const content = domainContent[domain];
  const alignmentGap = Math.abs(felt - expressed);
  const tint = domainTints[domain];

  return (
    <DomainImmersiveSection
      domain={domain}
      content={content}
      score={score}
      band={band}
      felt={felt}
      expressed={expressed}
      color={color}
      tint={tint}
      alignmentGap={alignmentGap}
    />
  );
}

// ── Sub-components ──

function SectionHeader({ domain }: { domain: 'Safety' | 'Play' | 'Challenge' }) {
  return (
    <div id={`${domain.toLowerCase()}-overview`}>
      <p style={{ color: '#DC4C0C', fontWeight: 800, letterSpacing: '0.06em', fontSize: '14px', marginBottom: '30px' }}>
        {domain === 'Safety' ? '04' : domain === 'Play' ? '05' : '06'}
      </p>
      <h1 style={{ fontFamily: SERIF, fontWeight: 600, letterSpacing: '-0.03em', fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', color: '#0F0F0F', margin: 0 }}>
        {domain}
      </h1>
      <div style={{ width: '40px', height: '3px', backgroundColor: '#DC4C0C', marginTop: '30px' }} />
    </div>
  );
}

function DomainImmersiveSection({ domain, content, score, band, felt, expressed, color, tint, alignmentGap }: {
  domain: 'Safety' | 'Play' | 'Challenge';
  content: any;
  score: number;
  band: string;
  felt: number;
  expressed: number;
  color: string;
  tint: string;
  alignmentGap: number;
}) {
  const [activeDimension, setActiveDimension] = useState<string | null>(null);
  const dimensions = content.dimensions;
  const DomainIcon = getDomainIcon(domain);

  return (
    <div className="space-y-16">
      <SectionHeader domain={domain} />

      <motion.div
        className="relative overflow-hidden rounded-[28px] border p-6 md:p-8 lg:p-10"
        style={{ borderColor: `${color}2E` }}
        {...reveal}
      >
        <motion.div
          className="absolute left-8 top-8 h-24 w-24 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${color}22 0%, transparent 68%)` }}
          animate={{ scale: [1, 1.16, 1], opacity: [0.65, 0.95, 0.65] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${color}0F 1px, transparent 1px), linear-gradient(90deg, ${color}0F 1px, transparent 1px)`,
            backgroundSize: '34px 34px',
            maskImage: 'linear-gradient(to bottom, black, transparent 78%)',
          }}
        />

        <div className="relative grid lg:grid-cols-[0.92fr_1.08fr] gap-8 lg:gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-[11px] uppercase tracking-[0.14em] font-bold shadow-[0_14px_34px_-28px_rgba(0,0,0,0.45)]" style={{ color }}>
              <DomainIcon size={14} strokeWidth={2.8} />
              Overall {domain}
            </div>
            <div className="mt-7 flex items-end gap-3">
              <CountUp to={score} className="tabular-nums" style={{ color, fontWeight: 300, fontSize: 'clamp(5rem, 11vw, 7.5rem)', lineHeight: 0.85, letterSpacing: '-0.06em' }} />
              <div className="pb-3">
                <p className="text-sm uppercase tracking-[0.16em] text-[#8B8682] font-semibold">/ 100</p>
                <p className="text-[#1A1614] text-xl" style={{ fontWeight: 400 }}>{band}</p>
              </div>
            </div>
            <p className="mt-7 max-w-xl text-[#1A1614] leading-relaxed" style={{ fontSize: 17, fontWeight: 300 }}>
              {content.what}
            </p>
          </div>

          <DomainArchitectureGraphic
            domain={domain}
            color={color}
            score={score}
            dimensions={dimensions}
            active={activeDimension}
            onActive={setActiveDimension}
          />
        </div>
      </motion.div>

      <motion.div className="relative" {...reveal}>
        <p className="text-xs tracking-[0.15em] uppercase text-[#8B8682] mb-6 font-semibold">What your level means</p>
        <div className="grid md:grid-cols-3 gap-6">
          {(['low', 'balanced', 'excess'] as const).map((key, i) => {
            const level = content.levels[key];
            const isActive = key === 'low'
              ? score < 35
              : key === 'balanced'
              ? score >= 35 && score <= 65
              : score > 65;
            return (
              <LevelMeaningPanel
                key={key}
                label={level.label}
                text={level.text}
                color={color}
                active={isActive}
                index={i}
              />
            );
          })}
        </div>
      </motion.div>

      <motion.div id={`${domain.toLowerCase()}-alignment`} className="relative overflow-hidden rounded-[28px] py-2" {...reveal}>
        <div className="relative grid lg:grid-cols-[0.88fr_1.12fr] gap-8 lg:gap-12 items-center">
          <div className="flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.14em] font-bold text-white" style={{ backgroundColor: color }}>
                <Flag size={14} fill="currentColor" />
                {content.isAlignmentFlagged ? 'Flagged alignment' : 'Alignment reading'}
              </div>
              <div className="mt-7 flex items-end gap-3">
                <CountUp to={alignmentGap} className="tabular-nums" style={{ color, fontWeight: 300, fontSize: '88px', lineHeight: 0.85, letterSpacing: '-0.05em' }} />
                <span className="mb-3 text-sm uppercase tracking-[0.14em] text-[#8B8682] font-semibold">point gap</span>
              </div>
            </div>
          </div>

          <DomainAlignmentBridge felt={felt} expressed={expressed} color={color} />
        </div>
        <AlignmentInsights
          domain={domain}
          color={color}
          tint={tint}
          alignmentText={content.alignmentText}
          feltText={content.feltText}
          expressedText={content.expressedText}
          alignmentExtended={content.alignmentExtended}
        />
      </motion.div>

      <div className="space-y-8">
        <p className="text-xs tracking-[0.15em] uppercase text-[#8B8682] font-semibold">Your {domain} dimensions</p>
        {dimensions.map((dim: any, index: number) => (
          <DomainDimensionCard
            key={dim.name}
            dim={dim}
            domain={domain}
            color={color}
            tint={tint}
            index={index}
            active={activeDimension === dim.name}
            onActive={() => setActiveDimension(dim.name)}
            onClear={() => setActiveDimension(null)}
          />
        ))}
      </div>
    </div>
  );
}

function DomainArchitectureGraphic({ domain, color, score, dimensions, active, onActive }: {
  domain: 'Safety' | 'Play' | 'Challenge';
  color: string;
  score: number;
  dimensions: any[];
  active: string | null;
  onActive: (dim: string | null) => void;
}) {
  return (
    <div className="relative min-h-[360px] rounded-[24px] bg-white/80 p-6 shadow-[0_24px_70px_-58px_rgba(0,0,0,0.45)]">
      <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 520 360" preserveAspectRatio="none">
        <motion.path
          d="M100 250 C160 170, 218 156, 260 112 C302 156, 360 170, 420 250"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeDasharray="8 12"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.34 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.polygon
          points="260,56 414,278 106,278"
          fill={color}
          initial={{ opacity: 0, scale: 0.92, originX: '260px', originY: '180px' }}
          whileInView={{ opacity: 0.06, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9 }}
        />
      </svg>

      <motion.div
        className="absolute left-1/2 top-8 -translate-x-1/2 rounded-2xl border bg-white px-5 py-4 text-center"
        style={{ borderColor: `${color}30` }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <DomainGlyph domain={domain} color={color} size={50} />
        <p className="mt-2 text-[10px] uppercase tracking-[0.16em] font-bold" style={{ color }}>{domain}</p>
        <CountUp to={score} className="tabular-nums block" style={{ color, fontSize: 38, lineHeight: 1, fontWeight: 300 }} />
      </motion.div>

      {dimensions.map((dim, index) => {
        const isActive = active === dim.name;
        const xClass = index === 0 ? 'left-[7%]' : 'right-[7%]';
        const DimIcon = getDimensionIcon(dim.name);
        const scale = isActive ? 1.08 : active ? 0.96 : 1;
        return (
          <motion.button
            key={dim.name}
            type="button"
            onMouseEnter={() => onActive(dim.name)}
            onFocus={() => onActive(dim.name)}
            onMouseLeave={() => onActive(null)}
            onBlur={() => onActive(null)}
            className={`absolute ${xClass} bottom-8 w-[42%] rounded-[22px] border bg-white p-5 text-left cursor-default`}
            style={{ borderColor: isActive ? `${color}70` : `${color}24` }}
            animate={{ scale, y: isActive ? -7 : 0 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
          >
            <DimIcon size={18} style={{ color }} />
            <p className="mt-3 text-[11px] uppercase tracking-[0.16em] font-bold" style={{ color }}>{dim.name}</p>
            <p className="mt-1 text-[#1A1614]" style={{ fontFamily: SERIF, fontSize: 26, lineHeight: 1 }}>{dim.band}</p>
            <MiniBar value={dim.score} color={color} />
          </motion.button>
        );
      })}
    </div>
  );
}

function DomainAlignmentBridge({ felt, expressed, color }: { felt: number; expressed: number; color: string }) {
  const gap = expressed - felt;
  const direction = gap >= 0 ? 'Upward display' : 'Downward display';

  return (
    <div className="relative overflow-hidden rounded-[24px] p-6" style={{ backgroundColor: '#F6FAF7' }}>
      <div
        className="absolute inset-0 pointer-events-none opacity-80"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 24%, ${color}1F 0 2px, transparent 3px), radial-gradient(circle at 78% 68%, ${color}24 0 2px, transparent 3px)`,
          backgroundSize: '42px 42px',
        }}
      />
      <div className="relative space-y-8">
        <GapLane label="Felt inside" value={felt} color={color} align="left" />
        <motion.div
          className="relative mx-auto flex h-24 w-full max-w-[430px] items-center justify-center"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.65, delay: 0.25 }}
        >
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 430 96" preserveAspectRatio="none">
            <motion.path
              d="M72 18 C145 36, 160 70, 214 70 C268 70, 285 36, 358 18"
              fill="none"
              stroke={color}
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.path
              d="M214 70 L214 22"
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeDasharray="6 8"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.45 }}
            />
          </svg>
          <motion.div
            className="relative rounded-full bg-white px-5 py-3 text-center shadow-[0_18px_38px_-30px_rgba(0,0,0,0.55)]"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <p className="text-[10px] uppercase tracking-[0.16em] font-bold" style={{ color }}>{direction}</p>
            <p className="text-[#1A1614] leading-none" style={{ fontFamily: SERIF, fontSize: 30 }}>{gap > 0 ? '+' : ''}{gap}</p>
          </motion.div>
        </motion.div>
        <GapLane label="Expressed outside" value={expressed} color={color} align="right" />
      </div>
    </div>
  );
}

function GapLane({ label, value, color, align }: {
  label: string;
  value: number;
  color: string;
  align: 'left' | 'right';
}) {
  return (
    <div>
      <div className={`mb-2 flex items-center ${align === 'right' ? 'justify-end' : 'justify-start'} gap-3`}>
        <p className="text-[11px] uppercase tracking-[0.15em] text-[#8B8682] font-bold">{label}</p>
        <CountUp to={value} className="tabular-nums" style={{ color, fontSize: 22, fontWeight: 600, lineHeight: 1 }} />
      </div>
      <div className="h-3 rounded-full bg-white overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${align === 'right' ? 'ml-auto' : ''}`}
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

function LevelMeaningPanel({ label, text, color, active, index }: {
  label: string;
  text: string;
  color: string;
  active: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5 }}
      className="group/level relative overflow-hidden rounded-[24px] border bg-white p-6 cursor-default"
      style={{ borderColor: active ? `${color}55` : '#E5E3DD' }}
    >
      <LevelGraphic color={color} active={active} index={index} />
      <p className="mt-5 text-[11px] tracking-[0.15em] uppercase font-semibold" style={{ color: active ? color : '#8B8682' }}>
        {label}
      </p>
      <p className="mt-3 text-sm text-[#1A1614] leading-relaxed" style={{ fontWeight: 300 }}>{text}</p>
    </motion.div>
  );
}

function LevelGraphic({ color, active, index }: { color: string; active: boolean; index: number }) {
  const paths = [
    'M16 56 C46 52, 54 40, 88 42 C116 44, 126 24, 152 20',
    'M16 42 C46 26, 72 58, 102 42 C122 32, 138 34, 152 42',
    'M16 56 C48 58, 66 16, 92 18 C126 20, 126 56, 152 60',
  ];

  return (
    <div className="relative h-20">
      <svg viewBox="0 0 168 76" className="h-full w-full">
        <path d="M14 62 H154" stroke="#EDEAE3" strokeWidth="2" strokeLinecap="round" />
        <motion.path
          d={paths[index]}
          fill="none"
          stroke={color}
          strokeWidth={active ? 5 : 3}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: active ? 0.9 : 0.45 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.circle
          cx={index === 0 ? 152 : index === 1 ? 102 : 92}
          cy={index === 0 ? 20 : index === 1 ? 42 : 18}
          r={active ? 7 : 4}
          fill={color}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ type: 'spring', stiffness: 360, damping: 22, delay: 0.5 + index * 0.08 }}
        />
      </svg>
    </div>
  );
}

function AlignmentInsights({ domain, color, tint, alignmentText, feltText, expressedText, alignmentExtended }: {
  domain: 'Safety' | 'Play' | 'Challenge';
  color: string;
  tint: string;
  alignmentText: string;
  feltText: string;
  expressedText: string;
  alignmentExtended: string | null;
}) {
  const items = [
    {
      label: 'What this means',
      body: alignmentText,
      Icon: Gauge,
    },
    {
      label: 'How this shows up',
      body: `Inside: ${firstSentence(feltText)} Outside: ${firstSentence(expressedText)}`,
      Icon: Eye,
    },
    {
      label: 'The impact',
      body: alignmentExtended || fallbackImpact(domain),
      Icon: Activity,
    },
  ];

  return (
    <div className="mt-10 grid lg:grid-cols-3 gap-8 border-t pt-8" style={{ borderColor: `${color}24` }}>
      {items.map(({ label, body, Icon }, index) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, delay: index * 0.08 }}
          whileHover={{ y: -4 }}
          className="relative cursor-default"
        >
          <div className="mb-4 inline-grid h-10 w-10 place-items-center rounded-full" style={{ backgroundColor: `${color}14`, color }}>
            <Icon size={18} strokeWidth={2.4} />
          </div>
          <p className="text-[11px] uppercase tracking-[0.15em] font-bold" style={{ color }}>{label}</p>
          <p className="mt-3 text-sm text-[#1A1614] leading-relaxed" style={{ fontWeight: 300 }}>{body}</p>
        </motion.div>
      ))}
    </div>
  );
}

function firstSentence(text: string) {
  const match = text.match(/.*?[.!?](\s|$)/);
  return (match ? match[0] : text).trim();
}

function DomainDimensionCard({ dim, domain, color, tint, index, active, onActive, onClear }: {
  dim: any;
  domain: 'Safety' | 'Play' | 'Challenge';
  color: string;
  tint: string;
  index: number;
  active: boolean;
  onActive: () => void;
  onClear: () => void;
}) {
  const DimIcon = getDimensionIcon(dim.name);
  const icon = dimIcons[dim.name];
  const hasColumns = dim.working && dim.takeNote;
  const paragraphs = dim.text ? dim.text.split('\n\n') : [];

  return (
    <motion.div
      id={`${domain.toLowerCase()}-${dim.name.toLowerCase()}`}
      onMouseEnter={onActive}
      onFocus={onActive}
      onMouseLeave={onClear}
      onBlur={onClear}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      whileHover={{ y: -5, backgroundColor: '#FCFDFB' }}
      transition={{ type: 'spring', stiffness: 360, damping: 34, delay: index * 0.04 }}
      className="group/domain-dim relative overflow-hidden rounded-[28px] border bg-white p-7 md:p-9 cursor-default"
      style={{ borderColor: active ? `${color}66` : '#E5E3DD' }}
    >
      {dim.flagged && <div className="absolute left-0 top-0 h-full w-1.5" style={{ backgroundColor: color }} />}
      {icon && (
        <img
          src={icon}
          alt=""
          aria-hidden="true"
          className="absolute -right-12 -bottom-14 h-72 w-72 pointer-events-none select-none transition-transform duration-700 group-hover/domain-dim:scale-110 group-hover/domain-dim:-rotate-6"
          style={{ opacity: active ? 0.1 : 0.052 }}
        />
      )}

      <div className="relative grid lg:grid-cols-[0.78fr_1.22fr] gap-8 lg:gap-12 items-start">
        <div className="lg:sticky lg:top-8">
          <div className="flex items-start justify-between gap-5">
            <div>
              <div className="inline-grid h-11 w-11 place-items-center rounded-full" style={{ backgroundColor: `${color}18`, color }}>
                <DimIcon size={19} strokeWidth={2.5} />
              </div>
              {dim.flagged && (
                <span className="ml-3 inline-flex rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.12em] font-bold text-white" style={{ backgroundColor: color }}>
                  Flagged
                </span>
              )}
              <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(2.3rem, 5vw, 4.6rem)', fontWeight: 600, color: '#0F0F0F', letterSpacing: '-0.045em', lineHeight: 0.95, margin: '24px 0 0' }}>
                {dim.name}
              </h3>
              <p className="mt-3 text-base text-[#6F6A64]">{dim.band}</p>
            </div>
            <RadialScore value={dim.score} color={color} size={112} />
          </div>

          <div className="mt-8 hidden lg:block">
            <DomainGlyph domain={domain} color={color} size={132} muted />
          </div>
        </div>

        <div>
          {hasColumns ? (
            <>
              <p className="text-[#1A1614] leading-relaxed text-[16px]" style={{ fontWeight: 300 }}>{dim.lead}</p>
              <div className="grid md:grid-cols-2 gap-5 mt-7">
                <InsightPanel
                  kind="working"
                  label="What's working"
                  body={dim.working}
                  accent={color}
                  bg={tint}
                  border={`${color}24`}
                  Icon={Check}
                />
                <InsightPanel
                  kind="note"
                  label="Take note"
                  body={dim.takeNote}
                  accent="#A96A28"
                  bg="#FBF6EE"
                  border="#EBDFCB"
                  Icon={AlertCircle}
                />
              </div>
            </>
          ) : (
            <div className="space-y-5">
              {paragraphs.map((para: string, i: number) => (
                <p key={i} className="text-[#1A1614] leading-relaxed text-[16px]" style={{ fontWeight: 300 }}>{para}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function DomainGlyph({ domain, color, size = 96, muted = false }: {
  domain: 'Safety' | 'Play' | 'Challenge';
  color: string;
  size?: number;
  muted?: boolean;
}) {
  const active = muted ? 0.2 : 0.9;
  const quiet = muted ? 0.08 : 0.14;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden="true">
      <motion.polygon
        points="60,12 105,92 15,92"
        fill="none"
        stroke={color}
        strokeWidth="2"
        opacity={muted ? 0.16 : 0.32}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      />
      <polygon points="60,12 105,92 60,74" fill={color} opacity={domain === 'Challenge' ? active : quiet} />
      <polygon points="60,74 105,92 15,92" fill={color} opacity={domain === 'Safety' ? active : quiet} />
      <polygon points="60,12 60,74 15,92" fill={color} opacity={domain === 'Play' ? active : quiet} />
      <circle cx="60" cy="74" r="4" fill={color} opacity={muted ? 0.28 : 0.55} />
    </svg>
  );
}

function getDomainIcon(domain: 'Safety' | 'Play' | 'Challenge') {
  if (domain === 'Safety') return ShieldCheck;
  if (domain === 'Play') return Waves;
  return Mountain;
}

function getDimensionIcon(name: string) {
  const icons: Record<string, typeof UserRound> = {
    Self: UserRound,
    Others: UsersRound,
    Senses: Activity,
    Perception: Eye,
    Past: History,
    Future: Compass,
  };
  return icons[name] || Gauge;
}

function fallbackImpact(domain: 'Safety' | 'Play' | 'Challenge') {
  if (domain === 'Safety') {
    return 'The cost is carried as effort: the system looks steadier than it feels, and the people around you may not know where support is actually needed.';
  }
  if (domain === 'Play') {
    return 'The cost is subtle but cumulative: life can contain the appearance of enjoyment while the felt aliveness underneath stays quieter than it should.';
  }
  return 'The impact is mostly stabilising here: what you show and what you feel are closely matched, giving this domain unusually clean signal in the profile.';
}

function MiniBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#EFECE6]">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

function SafetyDimensionCard({ dim, domain, color, tint, icon, Icon, active, onActive, onClear }: {
  dim: any;
  domain: string;
  color: string;
  tint: string;
  icon: string;
  Icon: typeof UserRound;
  active: boolean;
  onActive: () => void;
  onClear: () => void;
}) {
  return (
    <motion.div
      id={`safety-${dim.name.toLowerCase()}`}
      onMouseEnter={onActive}
      onFocus={onActive}
      onMouseLeave={onClear}
      onBlur={onClear}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      whileHover={{ y: -5, backgroundColor: '#FBFEFC' }}
      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
      className="group/safety-card relative overflow-hidden rounded-[26px] border bg-white p-7 cursor-default"
      style={{ borderColor: active ? `${color}66` : '#E5E3DD' }}
    >
      <img
        src={icon}
        alt=""
        aria-hidden="true"
        className="absolute -right-10 -bottom-12 h-60 w-60 pointer-events-none select-none transition-transform duration-700 group-hover/safety-card:scale-110 group-hover/safety-card:-rotate-6"
        style={{ opacity: active ? 0.1 : 0.055 }}
      />
      <div className="relative">
        <div className="mb-6 flex items-start justify-between gap-5">
          <div>
            <div className="inline-grid h-10 w-10 place-items-center rounded-full" style={{ backgroundColor: `${color}18`, color }}>
              <Icon size={18} strokeWidth={2.5} />
            </div>
            <p className="mt-4 text-[10.5px] tracking-[0.2em] uppercase font-bold" style={{ color }}>{domain}</p>
            <h3 style={{ fontFamily: SERIF, fontSize: '38px', fontWeight: 600, color: '#0F0F0F', letterSpacing: '-0.03em', lineHeight: 1, margin: '4px 0 0' }}>
              {dim.name}
            </h3>
            <p className="mt-2 text-sm text-[#8B8682]">{dim.band}</p>
          </div>
          <RadialScore value={dim.score} color={color} size={104} />
        </div>

        <p className="text-[#1A1614] leading-relaxed text-[15px]" style={{ fontWeight: 300 }}>{dim.lead}</p>
        <div className="mt-6 grid gap-4">
          <InsightPanel
            kind="working"
            label="What's working"
            body={dim.working}
            accent={color}
            bg={tint}
            border={`${color}24`}
            Icon={Check}
          />
          <InsightPanel
            kind="note"
            label="Take note"
            body={dim.takeNote}
            accent="#A96A28"
            bg="#FBF6EE"
            border="#EBDFCB"
            Icon={AlertCircle}
          />
        </div>
      </div>
    </motion.div>
  );
}

function DimensionBlock({ id, dim, domain, color, tint, index }: {
  id: string;
  dim: any;
  domain: string;
  color: string;
  tint: string;
  index: number;
}) {
  const hasColumns = dim.working && dim.takeNote;
  const icon = dimIcons[dim.name];
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
      className="group/dim relative rounded-2xl border overflow-hidden bg-white transition-shadow duration-300 hover:shadow-[0_18px_40px_-22px_rgba(0,0,0,0.25)]"
      style={dim.flagged ? { borderColor: `${color}50` } : { borderColor: '#E5E3DD' }}
    >
      {dim.flagged && <div className="h-1 w-full" style={{ backgroundColor: color }} />}

      {/* faint dimensional glyph for immersion */}
      {icon && (
        <img
          src={icon}
          alt=""
          aria-hidden="true"
          className="absolute -right-8 -bottom-10 w-52 h-52 pointer-events-none select-none transition-transform duration-700 group-hover/dim:scale-105 group-hover/dim:-rotate-3"
          style={{ opacity: 0.06 }}
        />
      )}

      <div className="relative p-8">
        {dim.flagged && (
          <span className="inline-block text-[10px] tracking-[0.12em] uppercase px-2 py-1 rounded-full text-white mb-4 font-semibold"
            style={{ backgroundColor: color }}>
            Flagged dimension
          </span>
        )}

        {/* heading row: name + radial score */}
        <div className="flex items-center justify-between gap-6 mb-6">
          <div>
            <p className="text-[10.5px] tracking-[0.2em] uppercase font-bold mb-1.5" style={{ color }}>{domain}</p>
            <h3 style={{ fontFamily: SERIF, fontSize: '34px', fontWeight: 600, color: '#0F0F0F', letterSpacing: '-0.02em', lineHeight: 1, margin: 0 }}>
              {dim.name}
            </h3>
            <p className="text-sm text-[#8B8682] mt-2">{dim.band}</p>
          </div>
          <RadialScore value={dim.score} color={color} />
        </div>

        {hasColumns ? (
          <>
            <p className="text-[#1A1614] leading-relaxed text-[15px]" style={{ fontWeight: 300 }}>{dim.lead}</p>
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              <InsightPanel
                kind="working"
                label="What's working"
                body={dim.working}
                accent={color}
                bg={tint}
                border={`${color}26`}
                Icon={Check}
              />
              <InsightPanel
                kind="note"
                label="Take note"
                body={dim.takeNote}
                accent="#B26A1C"
                bg="#FBF6EE"
                border="#EBDFCB"
                Icon={AlertCircle}
              />
            </div>
          </>
        ) : (
          <div className="space-y-4">
            {dim.text.split('\n\n').map((para: string, i: number) => (
              <p key={i} className="text-[#1A1614] leading-relaxed text-[15px]" style={{ fontWeight: 300 }}>{para}</p>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function InsightPanel({ label, body, accent, bg, border, Icon }: {
  kind: string;
  label: string;
  body: string;
  accent: string;
  bg: string;
  border: string;
  Icon: typeof Check;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      className="group/panel relative rounded-xl p-5 pl-6 overflow-hidden cursor-default"
      style={{ backgroundColor: bg, border: `1px solid ${border}` }}
    >
      {/* growing accent rail */}
      <div
        className="absolute top-0 left-0 h-full transition-all duration-300 group-hover/panel:w-[5px]"
        style={{ width: 3, backgroundColor: accent }}
      />
      <div className="flex items-center gap-2 mb-2.5" style={{ color: accent }}>
        <span
          className="grid place-items-center rounded-full transition-transform duration-300 group-hover/panel:scale-110"
          style={{ width: 24, height: 24, backgroundColor: `${accent}1F` }}
        >
          <Icon size={13} strokeWidth={3} />
        </span>
        <span className="text-[11px] tracking-[0.14em] uppercase font-bold">{label}</span>
      </div>
      <p className="text-sm text-[#1A1614] leading-relaxed" style={{ fontWeight: 300 }}>{body}</p>
    </motion.div>
  );
}

function CountUp({ to, duration = 1.2, className, style }: {
  to: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return <span ref={ref} className={className} style={style}>{val}</span>;
}

function RadialScore({ value, color, size = 108, stroke = 9 }: {
  value: number;
  color: string;
  size?: number;
  stroke?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = inView ? circ * (1 - value / 100) : circ;
  return (
    <div ref={ref} className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EFECE6" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.25s cubic-bezier(0.16,1,0.3,1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <CountUp to={value} className="tabular-nums" style={{ color, fontWeight: 300, fontSize: size * 0.32, lineHeight: 1 }} />
      </div>
    </div>
  );
}

function AnimatedBar({ value, color, track = '#EFECE6' }: { value: number; color: string; track?: string }) {
  return (
    <div className="w-full rounded-full overflow-hidden" style={{ backgroundColor: track, height: 8 }}>
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

// A "dumbbell" track showing felt vs expressed, the gap between them, and the
// direction of masking. Gridlines and animated markers give it an infographic feel.
function AlignmentTrack({ felt, expressed, color }: { felt: number; expressed: number; color: string }) {
  const lo = Math.min(felt, expressed);
  const hi = Math.max(felt, expressed);
  const gap = hi - lo;
  const mid = (lo + hi) / 2;
  const maskUp = expressed > felt;
  const showDirection = gap >= 4;
  const TRACK = 74;
  return (
    <div className="relative select-none" style={{ height: 128 }}>
      {/* gridlines */}
      {[0, 25, 50, 75, 100].map((t) => (
        <div key={t} className="absolute" style={{ left: `${t}%`, top: TRACK - 8, height: 16, width: 1, backgroundColor: '#E8E4DC' }} />
      ))}
      {/* baseline track */}
      <div className="absolute left-0 right-0 rounded-full" style={{ top: TRACK, height: 6, backgroundColor: '#EDEAE3', transform: 'translateY(-50%)' }} />
      {/* gap segment */}
      <motion.div
        className="absolute rounded-full"
        style={{ top: TRACK, left: `${lo}%`, height: 6, backgroundColor: color, opacity: 0.55, transform: 'translateY(-50%)' }}
        initial={{ width: 0 }}
        whileInView={{ width: `${gap}%` }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* end scale labels */}
      <span className="absolute text-[10px] text-[#B0ADA8]" style={{ left: 0, top: TRACK + 12 }}>0</span>
      <span className="absolute text-[10px] text-[#B0ADA8]" style={{ right: 0, top: TRACK + 12 }}>100</span>

      {/* masking-direction tag above the gap */}
      {showDirection && (
        <motion.div
          className="absolute flex items-center gap-1"
          style={{ left: `${mid}%`, top: 36, transform: 'translateX(-50%)' }}
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
          <span className="whitespace-nowrap text-[9.5px] tracking-[0.12em] uppercase font-bold px-2 py-1 rounded-full inline-flex items-center gap-1"
            style={{ color, backgroundColor: `${color}16` }}>
            {maskUp ? <ArrowUpRight size={11} strokeWidth={2.75} /> : <ArrowDownRight size={11} strokeWidth={2.75} />}
            {maskUp ? 'Masking upward' : 'Masking downward'}
          </span>
        </motion.div>
      )}

      {/* Expressed marker (solid) + label above */}
      <motion.div
        className="absolute"
        style={{ left: `${expressed}%`, top: TRACK, transform: 'translate(-50%,-50%)' }}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: color, boxShadow: '0 0 0 4px #FFFFFF' }} />
      </motion.div>
      <div className="absolute text-center" style={{ left: `${expressed}%`, top: 2, transform: 'translateX(-50%)' }}>
        <p className="text-[10px] tracking-[0.12em] uppercase text-[#8B8682] font-semibold leading-none">Expressed</p>
        <CountUp to={expressed} className="tabular-nums block leading-none mt-1" style={{ color, fontWeight: 600, fontSize: 18 }} />
      </div>

      {/* Felt marker (hollow) + label below */}
      <motion.div
        className="absolute"
        style={{ left: `${felt}%`, top: TRACK, transform: 'translate(-50%,-50%)' }}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.4, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: '#FFFFFF', border: `3px solid ${color}`, boxShadow: '0 0 0 3px #FFFFFF' }} />
      </motion.div>
      <div className="absolute text-center" style={{ left: `${felt}%`, top: TRACK + 16, transform: 'translateX(-50%)' }}>
        <CountUp to={felt} className="tabular-nums block leading-none" style={{ color, fontWeight: 600, fontSize: 18 }} />
        <p className="text-[10px] tracking-[0.12em] uppercase text-[#8B8682] font-semibold leading-none mt-1">Felt</p>
      </div>
    </div>
  );
}
