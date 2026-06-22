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
  MapPin,
  Scale,
  Fingerprint,
  UserRound,
  UsersRound,
} from 'lucide-react';

import lowSelf from '../../imports/10__Low_Self.svg';
import lowOthers from '../../imports/10__Low_Others.svg';
import lowPerception from '../../imports/10__Low_Perception.svg';
import highPerception from '../../imports/50__Perception.svg';
import highFuture from '../../imports/50__Future.svg';
import highPast from '../../imports/50__Past.svg';
import lowSafetySymbol from '../../imports/Low_Safety.svg';
import safetyDimensionsSymbol from '../../imports/Safety_dimensions.svg';
import lowSelfNew from '../../imports/10_Low_Self_new.svg';
import lowOthersNew from '../../imports/10_Low_Others_new.svg';

const SERIF = '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif';
const FLAG_COLOR = '#B21E4B';
const SAFETY_DARK = '#064238';
const FELT_COLOR = '#2D2924';
const EXPRESSED_COLOR = '#55708D';

const dimIcons: Record<string, string> = {
  Self: lowSelf,
  Others: lowOthers,
  Perception: highPerception,
  Senses: lowPerception,
  Future: highFuture,
  Past: highPast,
};

const safetyDimIcons: Record<string, string> = {
  Self: lowSelfNew,
  Others: lowOthersNew,
};

const allDimensionScores = [
  { name: 'Self', score: 38 },
  { name: 'Others', score: 24 },
  { name: 'Past', score: 51 },
  { name: 'Future', score: 82 },
  { name: 'Senses', score: 39 },
  { name: 'Perception', score: 43 },
];

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

function DomainImmersiveSection({ domain, content, score, band, felt, expressed, color, tint }: {
  domain: 'Safety' | 'Play' | 'Challenge';
  content: any;
  score: number;
  band: string;
  felt: number;
  expressed: number;
  color: string;
  tint: string;
}) {
  const [activeDimension, setActiveDimension] = useState<string | null>(null);
  const dimensions = content.dimensions;

  return (
    <div className="space-y-16">
      <SectionHeader domain={domain} />

      {domain === 'Safety' ? (
        <SafetyDomainHero
          content={content}
          score={score}
          band={band}
          color={color}
          dimensions={dimensions}
          active={activeDimension}
          onActive={setActiveDimension}
        />
      ) : (
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
              <p className="max-w-xl text-[#1A1614] leading-relaxed" style={{ fontSize: 18, fontWeight: 300 }}>
                {content.what}
              </p>
              <div className="mt-8 flex items-center gap-5">
                <OverallScoreMark value={score} color={color} />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] font-bold" style={{ color }}>Overall {domain}</p>
                  <p className="mt-1 text-[#1A1614] text-2xl" style={{ fontWeight: 400 }}>{band}</p>
                </div>
              </div>
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
      )}

      <motion.div className="relative" {...reveal}>
        <p className="text-xs tracking-[0.15em] uppercase text-[#8B8682] mb-6 font-semibold">What your level means</p>
        <LevelContinuum domain={domain} score={score} band={band} color={color} tint={tint} levels={content.levels} />
      </motion.div>

      <motion.div id={`${domain.toLowerCase()}-alignment`} className={`relative overflow-hidden rounded-[28px] py-2 ${content.isAlignmentFlagged ? 'pt-14' : ''}`} {...reveal}>
        {content.isAlignmentFlagged && <FlaggedForYou />}
        <div className="relative">
          <div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem, 4vw, 3.1rem)', lineHeight: 1, letterSpacing: '-0.035em', color: '#15110F', margin: 0 }}>
              Alignment
            </h2>
            <p className="mt-5 max-w-2xl text-[#4D4945] leading-relaxed" style={{ fontWeight: 300 }}>
              Alignment compares what is felt inside with what is expressed outside, then shows the distance between the two.
            </p>
          </div>

          <DomainAlignmentBridge domain={domain} felt={felt} expressed={expressed} alignmentText={content.alignmentText} />
        </div>
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

function SafetyDomainHero({ content, score, band, color, dimensions, active, onActive }: {
  content: any;
  score: number;
  band: string;
  color: string;
  dimensions: any[];
  active: string | null;
  onActive: (dim: string | null) => void;
}) {
  return (
    <motion.div className="relative py-4 md:py-8" {...reveal}>
      <div
        className="absolute right-[-10%] top-4 h-80 w-80 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${color}18 0%, transparent 68%)` }}
      />
      <div className="relative grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center">
        <div>
          <p className="max-w-xl text-[#1A1614] leading-relaxed" style={{ fontSize: 20, fontWeight: 300 }}>
            {content.what}
          </p>
          <div className="mt-12">
            <SafetyScoreCard score={score} band={band} color={color} />
          </div>
        </div>

        <div className="relative min-h-[450px]">
          <motion.div
            className="absolute left-1/2 -top-12 -translate-x-1/2"
            animate={{ y: [0, -5, 0], rotate: [0, -1.2, 0.8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <SafetyFocusSymbol color={color} size={340} />
          </motion.div>

          <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 560 450" preserveAspectRatio="none">
            <motion.path
              d="M220 220 C178 250, 162 276, 132 320 C126 328, 121 336, 116 342"
              fill="none"
              stroke={color}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.42 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            />
            <motion.path
              d="M220 220 C278 258, 332 288, 416 322 C428 327, 434 335, 438 342"
              fill="none"
              stroke={color}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.42 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.9, delay: 0.32 }}
            />
            <circle cx="220" cy="220" r="4.5" fill={color} opacity="0.75" />
            <circle cx="116" cy="342" r="3.5" fill={color} opacity="0.55" />
            <circle cx="438" cy="342" r="3.5" fill={color} opacity="0.55" />
          </svg>

          {dimensions.map((dim, index) => {
            const isActive = active === dim.name;
            const side = index === 0 ? 'left-0 bottom-7' : 'right-0 bottom-7';
            const Icon = dim.name === 'Self' ? Fingerprint : UsersRound;
            return (
              <motion.button
                key={dim.name}
                type="button"
                onClick={() => document.getElementById(`safety-${dim.name.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                onMouseEnter={() => onActive(dim.name)}
                onFocus={() => onActive(dim.name)}
                onMouseLeave={() => onActive(null)}
                onBlur={() => onActive(null)}
                className={`absolute ${side} w-[46%] rounded-[24px] bg-white/88 p-5 text-left cursor-pointer backdrop-blur-sm shadow-[0_22px_50px_-44px_rgba(0,0,0,0.55)]`}
                style={{ border: `1px solid ${isActive ? `${color}52` : 'transparent'}` }}
                animate={{ y: isActive ? -8 : 0, scale: isActive ? 1.035 : 1 }}
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-full" style={{ backgroundColor: `${color}14`, color }}>
                    <Icon size={dim.name === 'Self' ? 23 : 25} strokeWidth={2.1} />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] font-bold" style={{ color }}>{dim.name}</p>
                    <p className="mt-1 text-sm text-[#6F6A64]">{dim.band}</p>
                  </div>
                </div>
                <MiniBar value={dim.score} color={color} />
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function SafetyScoreCard({ score, band, color }: { score: number; band: string; color: string }) {
  return (
    <motion.div
      className="relative max-w-[400px] overflow-hidden rounded-[22px] px-5 py-4 text-white shadow-[0_22px_48px_-34px_rgba(0,0,0,0.72)]"
      style={{ backgroundColor: SAFETY_DARK }}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 22% 50%, ${color}30 0%, transparent 42%), radial-gradient(circle at 88% 20%, rgba(255,255,255,0.09) 0%, transparent 36%)`,
        }}
      />
      <div className="relative flex items-center gap-5">
        <div className="relative grid h-24 w-24 shrink-0 place-items-center rounded-full bg-white/8">
          <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 112 112" aria-hidden="true">
            <circle cx="56" cy="56" r="47" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="7" />
            <motion.circle
              cx="56"
              cy="56"
              r="47"
              fill="none"
              stroke={color}
              strokeWidth="7"
              strokeLinecap="round"
              pathLength="1"
              strokeDasharray="1"
              initial={{ strokeDashoffset: 1 }}
              whileInView={{ strokeDashoffset: 1 - score / 100 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
          <CountUp to={score} className="relative tabular-nums block" style={{ color: '#8FE9D5', fontSize: 42, lineHeight: 1, fontWeight: 400 }} />
        </div>
        <div className="min-w-0">
          <p className="text-[12px] uppercase tracking-[0.18em] font-bold" style={{ color }}>Overall Safety</p>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2.15rem, 3.4vw, 3rem)', lineHeight: 0.95, letterSpacing: '-0.045em', margin: '9px 0 0', color: '#FFFFFF', whiteSpace: 'nowrap' }}>
            {band}
          </h2>
        </div>
      </div>
    </motion.div>
  );
}

function SafetyFocusSymbol({ color, size = 250 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 998 862" aria-hidden="true" className="drop-shadow-[0_26px_42px_rgba(66,166,142,0.12)] overflow-visible">
      <defs>
        <linearGradient id="safetyNeutralFade" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#F8F5EF" />
          <stop offset="100%" stopColor="#E7E1D8" />
        </linearGradient>
      </defs>
      <g transform="translate(998,0) scale(-1,1)">
        <motion.path d="M597.693 863.691H998L549.849 605.382L500.539 690.557L401.847 520.078L397.232 517.419L597.693 863.691Z" fill={color} stroke="#297E70" strokeWidth="7" strokeLinejoin="round" opacity="0.82" initial={{ opacity: 0 }} whileInView={{ opacity: 0.82 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7 }} />
        <motion.path d="M600.768 517.419L549.849 605.382L998 863.691L797.848 517.419H600.768Z" fill={color} stroke="#297E70" strokeWidth="7" strokeLinejoin="round" opacity="0.54" initial={{ opacity: 0 }} whileInView={{ opacity: 0.54 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7, delay: 0.08 }} />
        <path d="M401.847 520.078L400.307 517.419H397.232L401.847 520.078Z" fill={color} opacity="0.54" />

        <path d="M500.533 -2L300.381 344.272L400.61 517.41L400.616 517.419H600.756L700.994 344.272L500.533 -2Z" fill="url(#safetyNeutralFade)" stroke="#D2CBC0" strokeWidth="7" strokeLinejoin="round" opacity="0.5" />
        <path d="M500.539 690.557L450.496 604.111L0 864H400.307L600.768 517.419L500.539 690.557Z" fill="#F5F1E9" stroke="#D2CBC0" strokeWidth="7" strokeLinejoin="round" opacity="0.64" />
        <path d="M200.155 517.419L0 864L450.496 604.111L400.307 517.419H200.155Z" fill="#F7F4EE" stroke="#D2CBC0" strokeWidth="7" strokeLinejoin="round" opacity="0.6" />
      </g>
    </svg>
  );
}

function OverallScoreMark({ value, color }: { value: number; color: string }) {
  return (
    <div className="relative grid h-28 w-28 shrink-0 place-items-center">
      <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 112 112">
        <circle cx="56" cy="56" r="48" fill="white" stroke="#EDEAE3" strokeWidth="8" />
        <motion.circle
          cx="56"
          cy="56"
          r="48"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          pathLength="1"
          strokeDasharray="1"
          initial={{ strokeDashoffset: 1 }}
          whileInView={{ strokeDashoffset: 1 - value / 100 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="relative text-center">
        <CountUp to={value} className="tabular-nums block" style={{ color, fontSize: 34, lineHeight: 1, fontWeight: 400 }} />
        <span className="text-[13px] leading-none" style={{ color }}>%</span>
      </div>
    </div>
  );
}

function LevelContinuum({ domain, score, band, color, tint, levels }: {
  domain: 'Safety' | 'Play' | 'Challenge';
  score: number;
  band: string;
  color: string;
  tint: string;
  levels: any;
}) {
  const steps = [
    { label: 'Depleted', x: 68, y: 124 },
    { label: 'Balanced', x: 638, y: 48 },
    { label: 'Excess', x: 768, y: 52 },
  ];
  const activeIndex = score < 45 ? 0 : score < 70 ? 1 : 2;
  const marker = Math.min(96, Math.max(4, score));
  const activeBody = activeIndex === 2 ? levels.excess.text : activeIndex === 1 ? levels.balanced.text : levels.low.text;
  const cards = [
    { label: 'Where you are', title: band, body: activeBody, Icon: MapPin },
    { label: 'Where you could be', title: 'Balanced', body: levels.balanced.text, Icon: Scale },
  ];

  return (
    <div className="rounded-[28px] border bg-white p-6 md:p-8" style={{ borderColor: `${color}28` }}>
      <div className="relative pb-10 pt-3">
        <svg className="h-44 w-full overflow-visible" viewBox="0 0 820 176" preserveAspectRatio="none" aria-hidden="true">
          <path d="M34 126 C190 126, 264 100, 382 74 C462 56, 516 48, 596 50 C650 51, 676 47, 704 50 L724 43 L746 57 L768 45 L792 54" fill="none" stroke="#EDEAE3" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
          <motion.path
            d="M34 126 C190 126, 264 100, 382 74 C462 56, 516 48, 596 50"
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            pathLength="1"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: marker / 100 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.path
            d="M596 50 C650 51, 676 47, 704 50 L724 43 L746 57 L768 45 L792 54"
            fill="none"
            stroke="#D8D3CA"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          <motion.ellipse
            cx="638"
            cy="50"
            rx="96"
            ry="34"
            fill={color}
            opacity="0.08"
            animate={{ opacity: [0.08, 0.14, 0.08], scale: [1, 1.03, 1] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
        <motion.div
          className="absolute grid h-14 w-14 place-items-center rounded-full bg-white shadow-[0_18px_38px_-28px_rgba(0,0,0,0.6)]"
          style={{
            left: `calc(${marker}% - 28px)`,
            top: `${118 - Math.min(72, score * 0.72)}px`,
            color,
            border: `2px solid ${color}`,
          }}
          initial={{ scale: 0.7, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          animate={{ scale: [1, 1.13, 1.06, 1], boxShadow: ['0 18px 38px -28px rgba(0,0,0,0.6)', `0 20px 48px -20px ${color}90`, `0 18px 44px -24px ${color}66`, '0 18px 38px -28px rgba(0,0,0,0.6)'] }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ scale: { duration: 4.4, repeat: Infinity, ease: [0.45, 0, 0.25, 1] }, boxShadow: { duration: 4.4, repeat: Infinity, ease: [0.45, 0, 0.25, 1] } }}
        >
          <span className="text-sm font-semibold">{score}</span>
        </motion.div>
        <div className="relative h-14">
          {steps.map((step, index) => (
            <div
              key={step.label}
              className="absolute top-0 text-center"
              style={{
                left: `${(step.x / 820) * 100}%`,
                transform: 'translateX(-50%)',
              }}
            >
              <div className="mx-auto mb-3 h-3 w-px" style={{ backgroundColor: index === activeIndex ? color : '#D8D3CA' }} />
              <p className="text-[10px] uppercase tracking-[0.12em] font-bold" style={{ color: index === activeIndex ? color : '#9A948D' }}>
                {step.label}
              </p>
              {step.label === 'Balanced' && (
                <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#A49D94]">Ideal range</p>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.12fr_0.88fr]">
        {cards.map(({ Icon, ...card }, index) => (
          <motion.div
            key={`${card.label}-${card.title}`}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className={`relative grid gap-5 rounded-[22px] p-5 md:grid-cols-[72px_1fr] ${index === 0 ? 'shadow-[0_22px_48px_-42px_rgba(0,0,0,0.55)]' : 'lg:translate-y-3'}`}
            style={{
              background: index === 0 ? `linear-gradient(135deg, ${tint} 0%, #FFFFFF 100%)` : '#FBFAF7',
              border: index === 0 ? `1px solid ${color}2E` : '1px solid #EEE9E0',
            }}
          >
            {index === 0 && (
              <span className="absolute right-5 top-5 rounded-full px-3 py-1 text-[9px] uppercase tracking-[0.14em] font-bold text-white" style={{ backgroundColor: color }}>
                Current
              </span>
            )}
            <div className="grid h-16 w-16 place-items-center rounded-full bg-white shadow-[0_18px_32px_-28px_rgba(0,0,0,0.5)]" style={{ color: index === 0 ? color : '#9B8F80' }}>
              <Icon size={34} strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.14em] font-bold" style={{ color: index === 0 ? color : '#9B8F80' }}>{card.label}</p>
              <h3 style={{ fontFamily: SERIF, fontSize: index === 0 ? 34 : 30, lineHeight: 1, margin: '10px 0 12px', color: '#15110F' }}>{card.title}</h3>
              <p className="text-sm text-[#1A1614] leading-relaxed" style={{ fontWeight: 300 }}>{card.body}</p>
            </div>
          </motion.div>
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
  const isSafety = domain === 'Safety';
  return (
    <div className="relative min-h-[360px] rounded-[24px] bg-white/80 p-6 shadow-[0_24px_70px_-58px_rgba(0,0,0,0.45)]">
      {isSafety && (
        <img
          src={safetyDimensionsSymbol}
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 top-8 h-64 w-64 -translate-x-1/2 object-contain pointer-events-none select-none"
          style={{ opacity: 0.08 }}
        />
      )}
      <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 520 360" preserveAspectRatio="none">
        <motion.path
          d="M100 250 C160 170, 218 156, 260 112 C302 156, 360 170, 420 250"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeDasharray={isSafety ? '1 0' : '8 12'}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: isSafety ? 0.24 : 0.34 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
        {!isSafety && (
          <motion.polygon
            points="260,56 414,278 106,278"
            fill={color}
            initial={{ opacity: 0, scale: 0.92, originX: '260px', originY: '180px' }}
            whileInView={{ opacity: 0.06, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9 }}
          />
        )}
      </svg>

      <motion.div
        className="absolute left-1/2 top-7 -translate-x-1/2 text-center"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        {isSafety ? (
          <img src={lowSafetySymbol} alt="" aria-hidden="true" className="mx-auto h-28 w-28 object-contain" />
        ) : (
          <DomainGlyph domain={domain} color={color} size={72} />
        )}
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
            {isSafety && safetyDimIcons[dim.name] ? (
              <img src={safetyDimIcons[dim.name]} alt="" aria-hidden="true" className="h-7 w-7 object-contain" />
            ) : (
              <DimIcon size={18} style={{ color }} />
            )}
            <p className="mt-3 text-[11px] uppercase tracking-[0.16em] font-bold" style={{ color }}>{dim.name}</p>
            <p className="mt-1 text-[#1A1614]" style={{ fontFamily: SERIF, fontSize: 26, lineHeight: 1 }}>{dim.band}</p>
            <MiniBar value={dim.score} color={color} />
          </motion.button>
        );
      })}
    </div>
  );
}

function FlaggedForYou() {
  return (
    <motion.div
      className="absolute right-2 top-0 z-10 inline-flex items-center gap-3 rounded-t-[16px] rounded-b-[8px] px-4 py-3 text-white shadow-[0_20px_38px_-28px_rgba(178,30,75,0.8)]"
      style={{ backgroundColor: FLAG_COLOR }}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.45 }}
    >
      <span
        className="absolute -bottom-2 right-9 h-0 w-0 border-l-[9px] border-r-[9px] border-t-[9px] border-l-transparent border-r-transparent"
        style={{ borderTopColor: FLAG_COLOR }}
      />
      <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 text-white">
        <Flag size={15} fill="currentColor" />
      </span>
      <span className="text-[11px] uppercase tracking-[0.16em] font-bold">Flagged for you</span>
    </motion.div>
  );
}

function DomainAlignmentBridge({ domain, felt, expressed, alignmentText }: {
  domain: 'Safety' | 'Play' | 'Challenge';
  felt: number;
  expressed: number;
  alignmentText: string;
}) {
  const gap = expressed - felt;
  const absoluteGap = Math.abs(gap);
  const alignmentLabel = absoluteGap <= 4 ? 'Very aligned' : absoluteGap <= 9 ? 'Slightly misaligned' : absoluteGap <= 14 ? 'Misaligned' : 'Very misaligned';
  const upward = gap > 0;
  const verdict = gap === 0
    ? `Your expressed ${domain} is closely reflecting what you feel.`
    : upward
      ? `You show more ${domain} than you feel.`
      : `You show less ${domain} than you feel.`;
  const maskingLabel = upward ? 'Upward masking' : gap < 0 ? 'Downward masking' : 'Integrated signal';

  return (
    <div className="relative mt-8 overflow-hidden rounded-[28px] border bg-white p-6 md:p-8" style={{ borderColor: `${FLAG_COLOR}18` }}>
      <div
        className="absolute -right-24 -top-28 h-80 w-80 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${FLAG_COLOR}12 0%, transparent 70%)` }}
      />
      <div className="relative grid gap-8 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="flex flex-col items-center justify-center">
          <SplitAlignmentCircle domain={domain} felt={felt} expressed={expressed} gap={absoluteGap} />
        </div>

        <div className="grid content-center gap-3">
          <AlignmentInfoTile
            label={`Felt ${domain}`}
            body={`What is actually available inside your ${domain} system.`}
            mode="felt"
          />
          <AlignmentInfoTile
            label={`Expressed ${domain}`}
            body={`What other people can see, receive, or infer from your ${domain}.`}
            mode="expressed"
          />
          <AlignmentInfoTile
            label="Masking direction"
            body={upward
              ? `Your outside signal is running ahead of your inside ${domain}.`
              : gap < 0
                ? `Your inside ${domain} is stronger than what you show outwardly.`
                : `Your inside and outside signals are moving together.`}
            mode="masking"
          />
        </div>
      </div>

      <div className="relative mt-7 grid gap-6 rounded-[24px] bg-[#FBFAF7] p-5 md:grid-cols-[0.92fr_1.08fr] md:p-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] font-bold" style={{ color: FLAG_COLOR }}>
            {maskingLabel} · {alignmentLabel}
          </p>
          <h3 className="mt-3" style={{ fontFamily: SERIF, fontSize: 'clamp(1.75rem, 3.2vw, 2.55rem)', lineHeight: 1.02, letterSpacing: '-0.035em', color: '#15110F' }}>
            {verdict}
          </h3>
        </div>
        <div>
          <AlignmentSeverityCue gap={absoluteGap} label={alignmentLabel} />
          <p className="mt-5 text-[15px] leading-relaxed text-[#1A1614]" style={{ fontWeight: 300 }}>
            {alignmentText}
          </p>
        </div>
      </div>
    </div>
  );
}

function SplitAlignmentCircle({ domain, felt, expressed, gap }: {
  domain: 'Safety' | 'Play' | 'Challenge';
  felt: number;
  expressed: number;
  gap: number;
}) {
  const separation = Math.min(38, 6 + gap * 1.45);
  const topY = 138 - separation / 2;
  const bottomY = 170 + separation / 2;
  const expressedPath = `M 54 ${topY} A 116 116 0 0 1 286 ${topY}`;
  const feltPath = `M 54 ${bottomY} A 116 116 0 0 0 286 ${bottomY}`;
  const closedExpressedPath = 'M 54 154 A 116 116 0 0 1 286 154';
  const closedFeltPath = 'M 54 154 A 116 116 0 0 0 286 154';
  const gapCenterY = (topY + bottomY) / 2;

  return (
    <svg viewBox="0 0 340 340" className="h-[330px] w-full max-w-[420px] overflow-visible" aria-label="Felt and expressed alignment gap" role="img">
      <defs>
        <filter id="alignmentSoftShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="16" stdDeviation="18" floodColor="#1A1614" floodOpacity="0.12" />
        </filter>
      </defs>
      <motion.path
        d={expressedPath}
        initial={{ d: closedExpressedPath }}
        whileInView={{ d: expressedPath }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        fill="none"
        stroke="#E9E4DC"
        strokeWidth="30"
        strokeLinecap="butt"
        filter="url(#alignmentSoftShadow)"
      />
      <motion.path
        d={feltPath}
        initial={{ d: closedFeltPath }}
        whileInView={{ d: feltPath }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        fill="none"
        stroke="#E9E4DC"
        strokeWidth="30"
        strokeLinecap="butt"
        filter="url(#alignmentSoftShadow)"
      />
      <motion.path
        d={expressedPath}
        initial={{ d: closedExpressedPath, strokeDashoffset: 1 }}
        whileInView={{ d: expressedPath, strokeDashoffset: 1 - expressed / 100 }}
        viewport={{ once: true, amount: 0.45 }}
        fill="none"
        stroke={EXPRESSED_COLOR}
        strokeWidth="30"
        strokeLinecap="butt"
        pathLength="1"
        strokeDasharray="1"
        transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        d={feltPath}
        initial={{ d: closedFeltPath, strokeDashoffset: 1 }}
        whileInView={{ d: feltPath, strokeDashoffset: 1 - felt / 100 }}
        viewport={{ once: true, amount: 0.45 }}
        fill="none"
        stroke={FELT_COLOR}
        strokeWidth="30"
        strokeLinecap="butt"
        pathLength="1"
        strokeDasharray="1"
        transition={{ duration: 1.05, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.rect
        x="60"
        y={topY + 18}
        width="220"
        height={Math.max(10, bottomY - topY - 36)}
        rx="5"
        fill={FLAG_COLOR}
        initial={{ opacity: 0, scaleY: 0.2 }}
        whileInView={{ opacity: 0.08, scaleY: 1 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: '170px 170px' }}
      />
      <motion.line
        x1="76"
        y1={gapCenterY}
        x2="264"
        y2={gapCenterY}
        stroke={FLAG_COLOR}
        strokeWidth="2"
        strokeDasharray="6 8"
        strokeLinecap="round"
        initial={{ opacity: 0, pathLength: 0 }}
        whileInView={{ opacity: 0.52, pathLength: 1 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.75, delay: 0.55 }}
      />
      <motion.circle
        cx="170"
        cy={gapCenterY}
        r="34"
        fill="#FFFFFF"
        stroke={FLAG_COLOR}
        strokeWidth="2"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <text x="170" y={gapCenterY - 3} textAnchor="middle" style={{ fontFamily: SERIF, fontSize: 32, fill: '#15110F' }}>{gap}</text>
      <text x="170" y={gapCenterY + 18} textAnchor="middle" style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.15em', fill: FLAG_COLOR }}>GAP</text>
      <text x="170" y={topY - 48} textAnchor="middle" style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.16em', fill: EXPRESSED_COLOR }}>EXPRESSED {domain.toUpperCase()}</text>
      <text x="170" y={bottomY + 62} textAnchor="middle" style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.16em', fill: FELT_COLOR }}>FELT {domain.toUpperCase()}</text>
      <text x="286" y={topY + 10} textAnchor="middle" style={{ fontFamily: SERIF, fontSize: 30, fill: EXPRESSED_COLOR }}>{expressed}</text>
      <text x="54" y={bottomY + 10} textAnchor="middle" style={{ fontFamily: SERIF, fontSize: 30, fill: FELT_COLOR }}>{felt}</text>
    </svg>
  );
}

function AlignmentSeverityCue({ gap, label }: { gap: number; label: string }) {
  const stages = ['Aligned', 'Almost aligned', 'Slightly misaligned', 'Misaligned', 'Very misaligned'];
  const active = gap <= 4 ? 0 : gap <= 8 ? 1 : gap <= 11 ? 2 : gap <= 16 ? 3 : 4;
  return (
    <div>
      <div className="flex items-center gap-2" aria-label={`Alignment level: ${label}`}>
        {stages.map((stage, index) => {
          const selected = index === active;
          return (
            <motion.span
              key={stage}
              className="h-2.5 flex-1 rounded-full"
              style={{ backgroundColor: selected ? FLAG_COLOR : index < active ? `${FLAG_COLOR}40` : '#E2DDD5' }}
              initial={{ scaleX: 0.4, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: selected ? 1 : 0.72 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.32, delay: index * 0.04 }}
            />
          );
        })}
      </div>
      <div className="mt-2 flex justify-between gap-3 text-[9px] uppercase tracking-[0.12em] font-bold text-[#9B958C]">
        <span>Integrated</span>
        <span style={{ color: FLAG_COLOR }}>{label}</span>
      </div>
    </div>
  );
}

function AlignmentInfoTile({ label, body, mode }: {
  label: string;
  body: string;
  mode: 'felt' | 'expressed' | 'masking';
}) {
  const isFelt = mode === 'felt';
  const isExpressed = mode === 'expressed';
  const color = isFelt ? FELT_COLOR : isExpressed ? EXPRESSED_COLOR : FLAG_COLOR;
  const Icon = mode === 'masking' ? ArrowUpRight : null;
  return (
    <div className="rounded-[20px] bg-[#FBFAF7] p-4">
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[15px]" style={{ backgroundColor: isFelt ? '#F1EFE9' : isExpressed ? '#EEF3F7' : '#F7E7ED', color }}>
          {Icon ? <Icon size={23} strokeWidth={2.1} /> : <AlignmentSignalIcon mode={mode} color={color} />}
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.15em] font-bold" style={{ color }}>{label}</p>
          <p className="mt-1 text-sm leading-snug text-[#4D4945]" style={{ fontWeight: 300 }}>{body}</p>
        </div>
      </div>
    </div>
  );
}

function AlignmentSignalIcon({ mode, color }: { mode: 'felt' | 'expressed' | 'masking'; color: string }) {
  const isFelt = mode === 'felt';
  return (
    <svg viewBox="0 0 48 48" className="h-9 w-9" aria-hidden="true">
      <circle cx="24" cy="24" r="16" fill={isFelt ? '#FFFFFF' : color} />
      <circle cx="24" cy="24" r="7.5" fill={isFelt ? color : '#FFFFFF'} />
    </svg>
  );
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
  if (domain === 'Safety') {
    return (
      <SafetyDimensionJourney
        dim={dim}
        color={color}
        tint={tint}
        index={index}
        active={active}
        onActive={onActive}
        onClear={onClear}
      />
    );
  }

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

function SafetyDimensionJourney({ dim, color, tint, index, active, onActive, onClear }: {
  dim: any;
  color: string;
  tint: string;
  index: number;
  active: boolean;
  onActive: () => void;
  onClear: () => void;
}) {
  const scorePosition = dim.name === 'Self'
    ? { left: '7%', top: '42%' }
    : { left: '54%', top: '42%' };

  return (
    <motion.div
      id={`safety-${dim.name.toLowerCase()}`}
      onMouseEnter={onActive}
      onFocus={onActive}
      onMouseLeave={onClear}
      onBlur={onClear}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 360, damping: 34, delay: index * 0.04 }}
      className="group/safety-dim relative overflow-hidden rounded-[30px] bg-white p-7 md:p-9 cursor-default"
    >
      <div
        className="absolute -right-20 -bottom-24 h-80 w-80 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${color}12 0%, transparent 70%)` }}
      />
      <div className="relative grid lg:grid-cols-[0.44fr_0.56fr] gap-8 lg:gap-14 items-start">
        <div>
          <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(3.5rem, 7vw, 6.2rem)', fontWeight: 600, color: '#0F0F0F', letterSpacing: '-0.06em', lineHeight: 0.88, margin: 0 }}>
            {dim.name}
          </h3>

          <div className="relative mt-10 h-72">
            <motion.div
              className="absolute z-20"
              style={scorePosition}
              animate={{ y: [0, -5, 0], scale: [1, 1.035, 1] }}
              transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <RadialScore value={dim.score} color={color} size={104} />
            </motion.div>
            <SafetyDimensionSymbol selected={dim.name} value={dim.score} color={color} />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-start">
            <div className="inline-flex items-center gap-5 rounded-[24px] bg-[#F7F5EF] px-5 py-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#8B8682]">Your level</p>
                <p className="mt-1 text-[#15110F]" style={{ fontFamily: SERIF, fontSize: 34, lineHeight: 1 }}>{dim.band}</p>
              </div>
              <LevelIndicator band={dim.band} color={color} />
            </div>
          </div>
          <p className="mt-7 text-[#1A1614] leading-relaxed text-[16px]" style={{ fontWeight: 300 }}>{dim.lead}</p>
        </div>
      </div>

      <div className="relative mt-9 grid gap-5 lg:grid-cols-[1.18fr_0.82fr]">
        <SixDimensionScale active={dim.name} color={color} />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-1">
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

function SafetyDimensionSymbol({ selected, color }: { selected: string; value: number; color: string }) {
  const isSelf = selected === 'Self';
  return (
    <div className="absolute inset-0">
      <svg viewBox="0 0 320 280" className="h-full w-full overflow-visible" aria-hidden="true">
        <g transform="translate(262 18) scale(-0.24 0.24)" opacity="0.94" strokeLinejoin="round">
          <path d="M597.693 863.691H998L549.849 605.382L500.539 690.557L401.847 520.078L397.232 517.419L597.693 863.691Z" fill={isSelf ? color : '#F4F1EA'} stroke={isSelf ? '#2C7C70' : '#BFB8AD'} strokeWidth="8" opacity={isSelf ? 0.88 : 0.46} />
          <path d="M600.768 517.419L549.849 605.382L998 863.691L797.848 517.419H600.768Z" fill={!isSelf ? color : '#F4F1EA'} stroke={!isSelf ? '#2C7C70' : '#BFB8AD'} strokeWidth="8" opacity={!isSelf ? 0.86 : 0.46} />
          <path d="M401.847 520.078L400.307 517.419H397.232L401.847 520.078Z" fill={color} opacity="0.42" />
          <path d="M500.533 -2L300.381 344.272L400.61 517.41L400.616 517.419H600.756L700.994 344.272L500.533 -2Z" fill="#F8F5EF" stroke="#BFB8AD" strokeWidth="8" opacity="0.36" />
          <path d="M500.539 690.557L450.496 604.111L0 864H400.307L600.768 517.419L500.539 690.557Z" fill="#F8F5EF" stroke="#BFB8AD" strokeWidth="8" opacity="0.36" />
          <path d="M200.155 517.419L0 864L450.496 604.111L400.307 517.419H200.155Z" fill="#F8F5EF" stroke="#BFB8AD" strokeWidth="8" opacity="0.36" />
        </g>
      </svg>
    </div>
  );
}

function LevelIndicator({ band, color }: { band: string; color: string }) {
  const normalized = band.toLowerCase();
  const active =
    normalized.includes('very') ? 1 :
    normalized === 'low' ? 2 :
    normalized.includes('almost') ? 3 :
    normalized.includes('balanced') ? 4 :
    5;

  return (
    <div className="flex h-20 flex-col-reverse justify-between gap-1.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, index) => {
        const on = index < active;
        const isBalance = index === 3;
        const isExcess = index === 4;
        return (
          <motion.span
            key={index}
            className="block rounded-full"
            style={{
              width: isExcess ? 24 : isBalance ? 30 : 16 + index * 3,
              height: 7,
              backgroundColor: on ? (isExcess ? FLAG_COLOR : color) : '#DDD7CE',
              opacity: on ? (isExcess ? 0.86 : 0.95) : 0.72,
              transform: isExcess ? 'skewX(-14deg)' : undefined,
            }}
            initial={{ scaleX: 0.4, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: on ? (isExcess ? 0.86 : 0.95) : 0.72 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.28, delay: index * 0.04 }}
          />
        );
      })}
    </div>
  );
}

function SixDimensionScale({ active, color }: { active: string; color: string }) {
  return (
    <div className="relative overflow-hidden rounded-[24px] border bg-white p-6" style={{ borderColor: `${color}22` }}>
      <div className="mb-7 flex items-center justify-between gap-4">
        <p className="text-[12px] uppercase tracking-[0.16em] font-bold text-[#1A1614]">Your six dimensions</p>
        <p className="text-[10px] uppercase tracking-[0.13em] font-bold text-[#A09A91]">Balance line</p>
      </div>
      <div className="relative h-72">
        <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-[#CFC8BE]" />
        <div className="absolute inset-0 grid grid-cols-6 gap-6 items-end">
          {allDimensionScores.map((item) => {
            const selected = item.name === active;
            return (
              <div key={item.name} className="flex h-full flex-col items-center justify-end gap-3">
                <div className="relative flex h-56 w-full items-end justify-center">
                  <div className="absolute bottom-0 h-full w-9 rounded-full bg-[#F1EEE8]" />
                  <motion.div
                    className="relative z-10 w-9 rounded-full"
                    style={{ backgroundColor: selected ? color : '#D6D0C8' }}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${item.score}%` }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
                <p className="text-center text-[10px] uppercase tracking-[0.08em] font-bold" style={{ color: selected ? color : '#9A948D' }}>{item.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
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
