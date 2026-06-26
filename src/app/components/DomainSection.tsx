import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowDownRight,
  ArrowUpRight,
  Activity,
  BookOpen,
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
import { getScoreFillPath, DOMAIN_HEX_OUTLINES, DOMAIN_SPOKE_LINES, DOMAIN_SPOKE_TRANSFORM } from '../data/symbolFillPaths';

const SERIF = '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif';
const FLAG_COLOR = '#DC4C0C';
const NAV_ORANGE = '#FF5A1F';
const ALIGNMENT_ACCENT = '#2F9A86';
const ALIGNMENT_INK = '#0F473D';
const ALIGNMENT_TRACK = '#E3DED5';
const ALIGNMENT_WASH = '#F2F8F5';
const SAFETY_DARK = '#064238';
const PLAY_DARK = '#4A3500';
const CHALLENGE_DARK = '#3E1607';
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

const dimensionSymbolAssets = import.meta.glob('../../imports/generated-dimensions/*.svg', { eager: true, import: 'default' }) as Record<string, string>;

function roundedDimensionScore(score: number) {
  return Math.min(100, Math.max(0, Math.round(score / 10) * 10));
}

function scoreBand(score: number) {
  if (score <= 30) return 'very low';
  if (score <= 45) return 'low';
  if (score <= 60) return 'almost balanced';
  if (score <= 72) return 'balanced';
  if (score <= 86) return 'high';
  return 'very high';
}

function contrastAccent(color: string): string {
  if (color === '#FFAB00') return '#9A6D00';
  if (color === '#42A68E') return '#0F6E56';
  return color;
}

function contrastText(color: string): string {
  if (color === '#FFAB00') return '#854F0B';
  if (color === '#42A68E') return '#0F6E56';
  return color;
}

function getDimensionSymbolAsset(name: string, score: number) {
  const rounded = roundedDimensionScore(score);
  const key = `../../imports/generated-dimensions/${name}_${rounded}.svg`;
  return dimensionSymbolAssets[key] || dimIcons[name];
}

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
    alignmentText: [
      "Your felt Safety reads 22; your expressed Safety reads 35. This is a significant upward divergence. You appear more settled than you actually feel, and the gap is wide enough that it is no longer just a normal piece of social adjustment.",
      "It has become structural: the version of Safety other people meet is steadier than the one your system can easily feel. People may experience you as calm, capable, and composed, while privately you may be carrying vigilance, strain, or the sense that you have to keep yourself together.",
      "That mismatch costs energy because it asks you to maintain a version of Safety that is visible before it is fully available. Over time, this can make support harder to receive, because the people around you respond to the steadiness they can see rather than the steadiness you actually need.",
    ],
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
    alignmentText: [
      "Your felt Play reads 38; your expressed Play reads 47. This is a mild upward divergence. You express slightly more ease and pleasure than you currently feel.",
      "The gap is not architecturally significant on its own, but read alongside your Safety alignment, it suggests a consistent pattern. You are working harder than is visible to look more settled than you are.",
      "This kind of gap tends to be invisible to others and quietly tiring for you. The people around you see someone who enjoys life. What they do not see is the effort that enjoyment sometimes takes.",
    ],
    alignmentExtended: null,
    isAlignmentFlagged: false,
    dimensions: [
      {
        name: 'Senses',
        score: 39,
        band: 'Low',
        lead: "Your body is somewhere just outside the room. You inhabit it functionally, you move through your day, you eat, you sleep, but the small portals through which Play normally enters have narrowed. Warmth, taste, texture, breath, the weight of someone you love resting on you, these arrive as data more than as experience. You can register that something is pleasant without being filled by it.",
        text: "Your body is somewhere just outside the room. You inhabit it functionally, you move through your day, you eat, you sleep, but the small portals through which Play normally enters have narrowed. Warmth, taste, texture, breath, the weight of someone you love resting on you, these arrive as data more than as experience. You can register that something is pleasant without being filled by it.\n\nThis is not numbness. It is a body running a low-power mode it adopted to manage something. The disengagement is not a flaw in you. It is the result of asking your senses to do less so something else could carry more.\n\nBecause Senses is the bodily doorway into Play, this narrowing changes more than pleasure. It affects how quickly ordinary life can reach you: food, sound, movement, touch, weather, colour, physical ease. Rebuilding here is often quiet at first. It starts with letting the body have small, believable moments of contact before asking it to feel fully alive.\n\nThe practical clue is whether pleasure changes state in you. A pleasant meal, song, shower, walk, or touch may be present, but it may not alter your pace, breath, or mood very much. This dimension strengthens when the body is allowed to register enjoyment long enough for it to become nourishment rather than information.",
        working: "You still show up physically. You exercise, you eat well enough, you manage. The body is not neglected, it is simply on a shorter leash. Functionality is intact, and people around you would say you take reasonable care of yourself.",
        takeNote: "The richness has narrowed. Pleasure arrives as information rather than experience, and the body's invitation to feel has been turned down so low you may not notice it is missing until something briefly turns it back up.",
      },
      {
        name: 'Perception',
        score: 43,
        band: 'Almost Balanced',
        lead: "Your mental flexibility is present, but operating with less curiosity than is natural to you. You can hold complexity, you can shift perspective when asked, and you are not rigid in your thinking, but you are not currently generating new angles either. Interpretation has become more dutiful than playful. Your inner perceptual world is in maintenance mode.",
        text: "Your mental flexibility is present, but operating with less curiosity than is natural to you. You can hold complexity, you can shift perspective when asked, and you are not rigid in your thinking, but you are not currently generating new angles either. Interpretation has become more dutiful than playful. Your inner perceptual world is in maintenance mode.\n\nThis is a quieter dimension in your reading, neither the strongest nor the most depleted. The mental capacity is still there. It is the body's invitation to engage that has narrowed, and Perception, with less to receive from the senses, is generating less than it otherwise would.\n\nWhen Perception strengthens, the mind does not only think better. It wanders more fruitfully, notices alternate meanings, and lets surprise become useful again. For you, this dimension likely comes back through gentle experimentation rather than analysis alone: new inputs, new angles, and permission for an idea to be interesting before it is productive.\n\nThe important distinction is between flexibility on demand and curiosity at rest. You can still shift when a situation requires it. What is quieter is the unforced movement of attention: the little sideways thought, the fresh interpretation, the sense that reality has more texture than the first explanation offered.",
        working: "You can still reframe, hold nuance, and shift perspective when the situation calls for it. Cognitive flexibility has not left. It is available when summoned, and your ability to hold complexity under pressure remains reliable.",
        takeNote: "The generative side of perception, the part that produces new angles unprompted, has quieted. You are interpreting the world more than playing with it, and the difference is felt in how few surprises your own thinking offers you lately.",
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
        text: "The strength stays healthiest when it remains chosen. At the far edge, Challenge can become so compelling that rest, receiving, and ordinary presence feel less convincing than the next meaningful push.",
      },
    },
    feltText: "Direction is one of the most settled things in your life. You know what you are doing, you know why you are doing it, and the connection between your effort and your meaning is strong. Pursuit feels good in your body. Forward motion regulates you in a way that few other things do. When you set a goal that matters, your system organises around it quickly, and that organisation is itself a source of relief.",
    expressedText: "Outwardly, you express Challenge at 77, almost exactly what you feel. Others would describe you as driven, focused, often ambitious. They would say you are someone who follows through. The match between the inner and outer experience here is real. This is the part of your architecture where what you feel and what you show are the same thing.",
    alignmentText: [
      "Your felt Challenge reads 75; your expressed Challenge reads 77. This is an aligned reading. The drive you are showing the world is the drive you actually feel. There is no performance here.",
      "In a reading otherwise marked by alignment gaps, this domain is doing something important. It is the part of you that is fully whole, and the part you can most reliably trust.",
      "When alignment is this close, the domain becomes a reference point. If you ever wonder whether you are performing or being real, look at how Challenge feels versus how it shows. That match tells you something trustworthy about yourself.",
    ],
    alignmentExtended: null,
    isAlignmentFlagged: false,
    dimensions: [
      {
        name: 'Past',
        score: 51,
        band: 'Almost Balanced',
        lead: "Your history is mostly integrated. You have a working relationship with where you have been, and you are not haunted by your story, but there are still some chapters that have not fully been authored. You can describe what happened, yet a few pieces of it remain on the shelf rather than woven into your identity.",
        text: "Your history is mostly integrated. You have a working relationship with where you have been, and you are not haunted by your story, but there are still some chapters that have not fully been authored. You can describe what happened, yet a few pieces of it remain on the shelf rather than woven into your identity.\n\nThis is not a depleted dimension. It is a foundation that is functional and not yet finished. What is interesting in your reading is that your Future runs significantly higher than your Past, meaning you are oriented forward more strongly than you are anchored backward.\n\nPast becomes most useful when it is not only understood, but metabolised. The task here is less about revisiting everything and more about letting earlier versions of you become part of the current architecture, so forward motion has memory beneath it rather than only momentum ahead of it.\n\nThis matters because a strong future can sometimes make the past look less relevant than it is. You may not feel defined by old experiences, which is a genuine strength. The remaining work is subtler: noticing where unfinished chapters still set the emotional weather, shape what feels possible, or make certain forms of support harder to receive.",
        working: "You are not stuck in your history. The past does not paralyse you or define you against your will. You can narrate where you have been with clarity, and most of it has been digested enough to carry without distortion.",
        takeNote: "Integration is partial. Some chapters sit on the shelf described but not fully authored into your identity. The risk is not that the past controls you, but that the unfinished pieces quietly shape decisions you believe are only about the future.",
      },
      {
        name: 'Future',
        score: 82,
        band: 'High',
        lead: "You are oriented forward with real clarity. Your sense of direction is one of the most resourced parts of your entire architecture. You know where you are going, you have planned the next few steps, and the future you are working toward is one you actually want. Choosing what to pursue is not where your energy gets stuck.",
        text: "You are oriented forward with real clarity. Your sense of direction is one of the most resourced parts of your entire architecture. You know where you are going, you have planned the next few steps, and the future you are working toward is one you actually want. Choosing what to pursue is not where your energy gets stuck.\n\nThis is also, read against your other scores, the most architecturally interesting part of your reading. Your Future dimension is doing significant work, pulling you forward into a life that has not yet arrived while your Safety foundations sit thin underneath. Strong forward orientation is a real resource here. It can also become its own form of compensation, a place to live mentally that asks less of the foundations than the present moment does.\n\nThe invitation is not to distrust your ambition. It is to let the future remain a direction rather than a refuge. When the ground beneath you becomes steadier, this same clarity can feel less like something that has to carry you and more like something you are free to choose.\n\nFuture is therefore both gift and signal. It shows where your system has access to momentum, vision, and agency. It also shows where the rest of the profile may be borrowing regulation from what comes next. The more Safety can develop underneath, the more this forward pull can become spacious rather than load-bearing.",
        working: "Direction is clear, genuinely chosen, and well-resourced. You are not wandering. Your forward motion is one of the most intact parts of your architecture and one of the places you can most reliably trust yourself.",
        takeNote: "Strong forward pull can become its own form of compensation, a place to live mentally that asks less of the foundations than the present moment does. When Future runs this far ahead of Safety, the question is whether the drive is building the life or outrunning the ground it stands on.",
        flagged: true,
        excess: true,
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
  const label = `${domain === 'Safety' ? '04' : domain === 'Play' ? '05' : '06'} Deep Dive`;
  return (
    <div id={`${domain.toLowerCase()}-overview`}>
      <p style={{ color: NAV_ORANGE, fontWeight: 800, letterSpacing: '0.16em', fontSize: '11px', marginBottom: '28px', textTransform: 'uppercase' }}>
        {label}
      </p>
      <h1 style={{ fontFamily: SERIF, fontWeight: 600, letterSpacing: '-0.03em', fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', color: '#0F0F0F', margin: 0 }}>
        {domain}
      </h1>
      <div style={{ width: '40px', height: '3px', backgroundColor: NAV_ORANGE, marginTop: '30px' }} />
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
  const [returnTarget, setReturnTarget] = useState<{ id: string; label: string } | null>(null);
  const dimensions = content.dimensions;
  const navigateToDimension = (id: string) => {
    setReturnTarget({ id: `${domain.toLowerCase()}-overview`, label: `Back to ${domain} overview` });
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const returnToOrigin = () => {
    if (!returnTarget) return;
    document.getElementById(returnTarget.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setReturnTarget(null);
  };

  return (
    <div className="space-y-16">
      <SectionHeader domain={domain} />

      <SafetyDomainHero
        domain={domain}
        content={content}
        score={score}
        band={band}
        felt={felt}
        expressed={expressed}
        color={color}
        dimensions={dimensions}
        active={activeDimension}
        onActive={setActiveDimension}
        onNavigateDimension={navigateToDimension}
      />

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

          <DomainAlignmentBridge domain={domain} felt={felt} expressed={expressed} alignmentText={content.alignmentText} color={color} tint={tint} />
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
      {returnTarget && (
        <motion.button
          type="button"
          onClick={returnToOrigin}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          className="fixed bottom-7 right-7 z-50 inline-flex items-center gap-2 rounded-full bg-[#1A1614] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_38px_-24px_rgba(26,22,20,0.7)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A1F]/40"
        >
          <ArrowLeft size={16} strokeWidth={2.4} />
          {returnTarget.label}
        </motion.button>
      )}
    </div>
  );
}

function SafetyDomainHero({ domain, content, score, band, felt, expressed, color, dimensions, active, onActive, onNavigateDimension }: {
  domain: 'Safety' | 'Play' | 'Challenge';
  content: any;
  score: number;
  band: string;
  felt: number;
  expressed: number;
  color: string;
  dimensions: any[];
  active: string | null;
  onActive: (dim: string | null) => void;
  onNavigateDimension: (targetId: string) => void;
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
            <SafetyScoreCard domain={domain} score={score} band={band} color={color} />
          </div>
        </div>

        <div className="relative min-h-[480px]">
          <motion.div
            className="absolute left-1/2 -top-8 -translate-x-1/2"
            animate={{ y: [0, -5, 0], rotate: [0, -1.2, 0.8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <DomainFocusSymbol domain={domain} score={score} gap={Math.abs(expressed - felt)} color={color} />
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
            const Icon = getDimensionIcon(dim.name);
            return (
              <motion.button
                key={dim.name}
                type="button"
                onClick={() => onNavigateDimension(`${domain.toLowerCase()}-${dim.name.toLowerCase()}`)}
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
                    <p className="text-[11px] uppercase tracking-[0.16em] font-bold" style={{ color: contrastText(color) }}>{dim.name}</p>
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

function SafetyScoreCard({ domain, score, band, color }: { domain: string; score: number; band: string; color: string }) {
  return (
    <motion.div
      className="relative max-w-[400px] overflow-hidden rounded-[22px] px-5 py-4 text-white shadow-[0_22px_48px_-34px_rgba(0,0,0,0.72)]"
      style={{ backgroundColor: domain === 'Safety' ? SAFETY_DARK : domain === 'Play' ? PLAY_DARK : CHALLENGE_DARK }}
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
          <CountUp to={score} className="relative tabular-nums block" style={{ color: domain === 'Safety' ? '#8FE9D5' : domain === 'Play' ? '#FFD97A' : '#FF8F6B', fontSize: 42, lineHeight: 1, fontWeight: 400 }} />
        </div>
        <div className="min-w-0">
          <p className="text-[12px] uppercase tracking-[0.18em] font-bold" style={{ color }}>Overall {domain}</p>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2.15rem, 3.4vw, 3rem)', lineHeight: 0.95, letterSpacing: '-0.045em', margin: '9px 0 0', color: '#FFFFFF', whiteSpace: 'nowrap' }}>
            {band}
          </h2>
        </div>
      </div>
    </motion.div>
  );
}

const SAFETY_FILLS = [
  "M197.977 241.564L161.527 241.453L160.342 242.139L160.735 241.451L159.944 241.449L161.129 240.765L179.257 209.145L197.977 241.564Z",
  "M188.279 224.973H188.281L202.093 248.895L148.119 249.062L147.272 249.546L147.553 249.063L146.996 249.065L147.837 248.574L174.968 201.916L188.279 224.973Z",
  "M172.53 197.693L204.53 253.118L202.773 256.441L135.505 256.385L134.561 256.927L134.873 256.384H134.248L135.188 255.837L168.773 197.553L172.53 197.693Z",
  "M172.529 197.692L204.529 253.117L198.329 263.986L122.355 263.922L121.547 264.387L121.814 263.922H121.28L122.083 263.454L160.016 197.627L172.529 197.692Z",
  "M172.529 197.694L204.529 253.118L193.981 271.533L109.211 271.461L108.535 271.85L108.759 271.461H108.312L108.984 271.069L151.308 197.621L172.529 197.694Z",
  "M172.53 197.692L204.53 253.118L189.915 278.803L97.1777 278.724L95.6826 279.588L96.1807 278.723H95.1836L96.6777 277.859L142.979 197.508L172.53 197.692Z",
  "M172.53 197.693L188.279 224.973H188.281L204.53 253.118L185.194 286.625L82.917 286.538L82.5098 286.772L82.6445 286.538H82.376L82.7793 286.303L133.844 197.686L172.53 197.693Z",
  "M172.53 197.692L204.53 253.118L180.891 294.172L69.7656 294.078L69.4971 294.232L69.585 294.078H69.4082L69.6748 293.922L125.157 197.639L172.53 197.692Z",
  "M172.53 197.693L188.279 224.972H188.281L204.531 253.117L176.88 301.225L59.0654 300.729L57.5781 301.589L58.0713 300.726L57.0781 300.722L58.5645 299.863L117.043 197.586L172.53 197.693Z",
  "M204.53 253.118L171.245 309.863L42 310.005L106.744 198.146L172.53 197.693L204.53 253.118Z",
];
const SAFETY_OVERFLOWS = [
  "M41.6984 309.7L106.798 197H100.298L31.8984 315.5H168.598L171.898 309.7H41.6984Z",
  "M41.7016 310.408L106.802 197.508H93.8016L22.1016 321.708H165.402L171.902 310.408H41.7016Z",
  "M106.798 197.805H87.2984L12.3984 327.504H162.198L171.898 310.604H41.6984L106.798 197.805Z",
];
const PLAY_FILLS = [
  "M247.88 241.453L248.672 241.449L247.488 240.766L229.359 209.145L210.64 241.565L247.089 241.455L248.275 242.139L247.88 241.453Z",
  "M261.063 249.062L261.619 249.063L260.778 248.573L233.648 201.914L206.523 248.893L260.496 249.061L261.343 249.544L261.063 249.062Z",
  "M273.743 256.383L274.368 256.382L273.427 255.835L239.843 197.551L236.086 197.692L204.086 253.116L205.842 256.439L273.11 256.384L274.055 256.925L273.743 256.383Z",
  "M286.801 263.923L287.336 263.922L286.532 263.455L248.6 197.627L236.086 197.692L204.087 253.117L210.286 263.987L286.26 263.923L287.069 264.386L286.801 263.923Z",
  "M299.631 271.07L257.308 197.621L236.086 197.694L204.086 253.118L214.634 271.533L299.405 271.463L300.08 271.85L299.857 271.462L300.304 271.461L299.631 271.07Z",
  "M311.937 277.86L265.637 197.508L236.086 197.693L204.085 253.119L218.701 278.803L311.438 278.725L312.933 279.588L312.435 278.724L313.433 278.723L311.937 277.86Z",
  "M325.971 286.539L326.24 286.538L325.836 286.304L274.772 197.686L236.086 197.693L220.336 224.973L220.334 224.972L204.085 253.117L223.422 286.625L325.699 286.54L326.106 286.772L325.971 286.539Z",
  "M339.03 294.076L339.208 294.075L338.94 293.921L283.459 197.637L236.085 197.69L204.085 253.116L227.724 294.169L338.85 294.076L339.119 294.23L339.03 294.076Z",
  "M350.546 300.725L351.537 300.72L350.053 299.863L291.573 197.584L236.085 197.691L204.085 253.115L231.736 301.222L349.552 300.729L351.038 301.586L350.546 300.725Z",
  "M301.872 198.145L236.087 197.691L204.086 253.117L237.372 309.862L366.617 310.003L301.872 198.145Z",
];
const PLAY_OVERFLOWS = [
  "M308.198 197.305H301.798L366.898 310.005H236.598L239.898 315.805H376.598L308.198 197.305Z",
  "M386.901 320.997L315.202 196.797H302.202L367.302 309.697H237.102L243.602 320.997H386.901Z",
  "M320.698 197.102H301.198L366.398 309.901H236.098L245.798 326.801H395.598L320.698 197.102Z",
];
const CHALLENGE_FILLS = [
  "M204.647 165.79L222.967 197.297H185.53L203.85 165.79V164.418L204.248 165.104L204.647 164.418V165.79Z",
  "M204.031 150.674L230.873 197.497H176.626L203.467 150.674L203.472 149.697L203.749 150.182L204.027 149.697L204.031 150.674Z",
  "M238.249 194.014L236.248 197.196H204.248L204.249 197.497H171.749L169.749 194.314L203.934 135.22L203.936 134.697L238.249 194.014Z",
  "M204.519 120.628L242.562 186.392L236.248 197.196H172.249L165.936 186.392L203.978 120.628L203.98 119.697L204.248 120.16L204.517 119.697L204.519 120.628Z",
  "M204.475 105.476L246.922 178.854L236.248 197.195H172.249L161.575 178.854L204.021 105.476L204.024 104.697L204.248 105.084L204.473 104.697L204.475 105.476Z",
  "M204.748 91.4238L251.185 171.697L236.249 197.196H172.248L157.312 171.697L203.749 91.4238V89.6973L204.248 90.5605L204.748 89.6973V91.4238Z",
  "M204.384 75.1631L255.599 163.697L236.249 197.196H172.248L152.898 163.697L204.112 75.1631L204.114 74.6973L204.248 74.9287L204.383 74.6973L204.384 75.1631Z",
  "M204.338 60.0068L259.982 156.197L236.249 197.196H172.248L148.515 156.197L204.158 60.0068L204.159 59.6973L204.248 59.8516L204.338 59.6973V60.0068Z",
  "M204.748 47.4102L264.085 149.197L236.249 197.197H172.249L144.412 149.197L203.749 47.4102V45.6973L204.248 46.5537L204.748 45.6973V47.4102Z",
  "M268.749 139.998L236.249 197.196H172.249L139.748 139.998L204.249 27.998L268.749 139.998Z",
];
const CHALLENGE_OVERFLOWS = [
  "M204.498 28.606L269.598 141.406L272.898 135.906L204.498 17.4062L136.098 135.906L139.398 141.506L204.498 28.606Z",
  "M269.601 141.103L276.101 129.803L204.501 5.70312L132.801 129.903L139.301 141.103L204.501 28.3032L269.601 141.103Z",
  "M279.402 125.403L204.502 -4.296875L129.602 125.503L139.402 142.403L204.502 29.5029L269.602 142.303L279.402 125.403Z",
];

const DOMAIN_OUTLINES: Record<string, string> = {
  Safety: "M171.661 197.701L203.922 253.6L171.611 309.501H42.5645L107.088 197.701H171.661Z",
  Play: "M301.909 197.701L366.434 309.602H237.388L205.075 253.651L237.337 197.701H301.909Z",
  Challenge: "M269.023 140.797L236.713 196.698H172.189L139.877 140.797L204.5 28.9971L269.023 140.797Z",
};

function DomainFocusSymbol({ domain, score, gap, color, size = 440 }: {
  domain: 'Safety' | 'Play' | 'Challenge';
  score: number;
  gap: number;
  color: string;
  size?: number;
}) {
  const bandIndex = Math.min(9, Math.floor((Math.max(1, score) - 1) / 10));
  const gapIndex = gap <= 3 ? 0 : gap <= 6 ? 1 : gap <= 8 ? 2 : 3;

  const fills = domain === 'Safety' ? SAFETY_FILLS : domain === 'Play' ? PLAY_FILLS : CHALLENGE_FILLS;
  const overflows = domain === 'Safety' ? SAFETY_OVERFLOWS : domain === 'Play' ? PLAY_OVERFLOWS : CHALLENGE_OVERFLOWS;
  const darkColor = domain === 'Safety' ? '#09795F' : domain === 'Play' ? '#A97200' : '#8C3109';

  const fillPath = fills[bandIndex];
  const overflowPath = bandIndex >= 8 && gapIndex > 0 ? overflows[gapIndex - 1] : null;
  const h = Math.round(size * (338 / 409));
  const otherDomains = (['Safety', 'Play', 'Challenge'] as const).filter(d => d !== domain);
  const shadowColor = domain === 'Safety' ? 'rgba(66,166,142,0.14)' : domain === 'Play' ? 'rgba(255,171,0,0.14)' : 'rgba(220,76,12,0.14)';

  return (
    <svg width={size} height={h} viewBox="0 0 409 338" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ overflow: 'visible', filter: `drop-shadow(0 30px 52px ${shadowColor})` }}>
      {otherDomains.map(d => {
        const otherScore = d === 'Safety' ? 27 : d === 'Play' ? 41 : 78;
        const neutralPath = getScoreFillPath(d, otherScore);
        return neutralPath ? <path key={d} d={neutralPath} fill="#E8E5DE" /> : null;
      })}
      <path d={DOMAIN_OUTLINES.Safety} stroke="#CCCAC5" fill="none" />
      <path d={DOMAIN_OUTLINES.Play} stroke="#CCCAC5" fill="none" />
      <path d={DOMAIN_OUTLINES.Challenge} stroke="#CCCAC5" fill="none" />
      <motion.path d={fillPath} fill={color} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }} />
      {overflowPath && (
        <motion.path d={overflowPath} fill={darkColor} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: 0.15 }} />
      )}
      <circle cx="204.5" cy="29.498" r="2.5" fill="#CCCAC5" />
      <circle cx="366.5" cy="309.498" r="2.5" fill="#CCCAC5" />
      <circle cx="2.5" cy="2.5" r="2.5" transform="matrix(-1 0 0 1 45 306.998)" fill="#CCCAC5" />
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
  const CONTINUUM_PATH = "M34 126 C190 126, 264 100, 382 74 C462 56, 516 48, 596 50 C650 51, 676 47, 704 50 L724 43 L746 57 L768 45 L792 54";
  const pathRef = useRef<SVGPathElement>(null);
  const [endPt, setEndPt] = useState<{ x: number; y: number } | null>(null);
  const marker = Math.min(96, Math.max(4, score));

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const total = path.getTotalLength();
    const pt = path.getPointAtLength(total * marker / 100);
    setEndPt({ x: pt.x, y: pt.y });
  }, [marker]);

  const steps = [
    { label: 'Depleted', x: 68, y: 124 },
    { label: 'Balanced', x: 638, y: 48 },
    { label: 'Excess', x: 768, y: 52 },
  ];
  const activeIndex = score < 45 ? 0 : score < 70 ? 1 : 2;
  // "Where you are": low gets the depleted reading; balanced and high are described by the healthy/strong state.
  const whereYouAreBody = activeIndex === 0 ? levels.low.text : levels.balanced.text;
  // Second card: low aspires toward Balanced; balanced and high get the distinct excess-edge caution.
  const secondCard = activeIndex === 0
    ? { label: 'Where you could be', title: 'Balanced', body: levels.balanced.text, Icon: Scale }
    : domain === 'Challenge'
      ? { label: 'How to keep it clean', title: 'Strength with enough ground', body: levels.excess.text, Icon: Gauge }
    : { label: 'Where to stay aware', title: 'The excess edge', body: levels.excess.text, Icon: Gauge };
  const cards = [
    { label: 'Where you are', title: band, body: whereYouAreBody, Icon: MapPin },
    secondCard,
  ];

  const markerLeftPct = endPt ? (endPt.x / 820) * 100 : marker;
  const markerTopPct = endPt ? (endPt.y / 176) * 100 : 50;

  return (
    <div className="space-y-7">
      <div className="relative rounded-[28px] p-6 md:p-8" style={{ background: `linear-gradient(135deg, ${tint} 0%, #FDFCFA 64%, #FFFFFF 100%)` }}>
        <div className="relative">
          <svg className="h-44 w-full overflow-visible" viewBox="0 0 820 176" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <radialGradient id={`${domain}Spark`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="35%" stopColor={color} stopOpacity="0.9" />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
              </radialGradient>
            </defs>
            <path d={CONTINUUM_PATH} fill="none" stroke="#EDEAE3" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
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
            <path
              ref={pathRef}
              d={CONTINUUM_PATH}
              fill="none"
              stroke={color}
              strokeWidth="10"
              strokeLinecap="round"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - marker / 100}
              opacity="0.72"
            />
            <motion.g
              style={{
                offsetPath: `path("${CONTINUUM_PATH}")`,
                offsetDistance: '0%',
              } as any}
              animate={{
                offsetDistance: ['0%', `${marker}%`, `${marker}%`],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 3.6, repeat: Infinity, ease: [0.45, 0, 0.25, 1], times: [0, 0.65, 1] }}
            >
              <circle r="6" fill="white" opacity="0.95" />
              <circle r="14" fill={`url(#${domain}Spark)`} opacity="0.8" />
            </motion.g>
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
              left: `calc(${markerLeftPct}% - 28px)`,
              top: `calc(${markerTopPct}% - 28px)`,
              color,
              border: `2px solid ${color}`,
            }}
            initial={{ scale: 0.7, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-sm font-semibold">{score}</span>
          </motion.div>
        </div>
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
      <SafetyLevelReflection domain={domain} color={color} tint={tint} />
    </div>
  );
}

function SafetyLevelReflection({ domain, color, tint }: { domain: 'Safety' | 'Play' | 'Challenge'; color: string; tint: string }) {
  const reflectionData: Record<string, { paragraphs: string[]; selfPoints: string[]; othersPoints: string[] }> = {
    Safety: {
      paragraphs: [
        "At this level, Safety is not absent, but it is conditional. It comes online when you know what is expected, when you can manage the environment, or when you have enough evidence that nothing will demand too much from you. The difficulty is that this kind of Safety does not fully rest the body. It keeps you functioning, but it does not always let you soften.",
        "This is why very low Safety can look surprisingly competent. The system learns to produce steadiness from effort instead of ease. The growth direction is not to become less capable; it is to build a foundation where capability does not have to be purchased with constant vigilance.",
      ],
      selfPoints: ['Managed calm', 'Earned ease', 'Always checking'],
      othersPoints: ['Steady presence', 'Quietly capable', 'Under pressure'],
    },
    Play: {
      paragraphs: [
        "At this level, Play is not entirely absent. You still laugh, still enjoy meals, still engage with the world around you. But the spontaneous aliveness, the kind that shows up without effort, has narrowed. Enjoyment is available when conditions are right. It is less available when they are not.",
        "Low Play does not mean you are unhappy. It means the channel through which lightness enters has been turned down. The growth direction is not to force fun but to widen the aperture, to let sensory and creative experience back in without needing to justify it first.",
      ],
      selfPoints: ['Dutiful enjoyment', 'Measured lightness', 'Sensory restraint'],
      othersPoints: ['Sociable', 'Easy company', 'Quietly contained'],
    },
    Challenge: {
      paragraphs: [
        "At this level, Challenge is one of your clearest resources. Direction is real, motivation is internally sourced, and your sense of purpose does not rely on external validation. You move toward difficulty because it means something to you, not because it is expected.",
        "High Challenge becomes interesting when read against your other foundations. The drive is genuine, but if Safety sits low underneath, the forward motion may be doing double duty, pulling you into meaning while also helping you avoid the ground you are standing on. The growth direction is not to slow down, but to ensure the foundation can hold what you are building.",
      ],
      selfPoints: ['Clear direction', 'Chosen difficulty', 'Self-sourced drive'],
      othersPoints: ['Driven', 'Focused', 'Always moving forward'],
    },
  };

  const data = reflectionData[domain];
  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-10 pt-5"
    >
      <div className="mx-auto max-w-xl space-y-6 py-6 px-2">
        <div className="mx-auto mb-4 flex justify-center">
          <span className="grid h-12 w-12 place-items-center rounded-full" style={{ backgroundColor: tint, color }}>
            <Fingerprint size={22} strokeWidth={1.8} />
          </span>
        </div>
        {data.paragraphs.map((p, i) => (
          <p key={i} className="text-[16.5px] leading-[1.85] text-[#1A1614]" style={{ fontWeight: 300, fontFamily: SERIF }}>{p}</p>
        ))}
      </div>
      <div
        className="relative mx-auto max-w-4xl overflow-hidden rounded-[34px] border border-white/70 p-6 shadow-[0_30px_78px_-58px_rgba(26,22,20,0.55)] md:p-8"
        style={{
          background: `linear-gradient(135deg, ${tint} 0%, #FFF6EA 52%, #FDFCFA 100%)`,
        }}
      >
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background: `radial-gradient(circle at 24% 18%, ${color}30, transparent 34%), radial-gradient(circle at 78% 24%, rgba(216,138,53,0.24), transparent 32%), radial-gradient(circle at 48% 110%, rgba(255,255,255,0.86), transparent 52%)`,
          }}
        />
        <div className="grid gap-8 md:grid-cols-[1fr_auto_1fr] md:gap-0">
          <ReflectionColumn
            title="How you see yourself"
            points={data.selfPoints}
            color={color}
            Icon={Check}
          />
          <div className="relative hidden w-px bg-[#D8D0C5]/80 md:block" />
          <ReflectionColumn
            title="How others see you"
            points={data.othersPoints}
            color="#D88A35"
            Icon={Eye}
          />
        </div>
      </div>
    </motion.div>
  );
}

function ReflectionColumn({ title, points, color, Icon }: {
  title: string;
  points: string[];
  color: string;
  Icon: typeof Check;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="relative px-2 text-center md:px-8"
    >
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white/82 shadow-[0_16px_30px_-24px_rgba(26,22,20,0.48)] ring-1 ring-white" style={{ color }}>
        <Icon size={23} strokeWidth={2.25} />
      </div>
      <p className="mt-5 text-[10px] font-extrabold uppercase tracking-[0.18em]" style={{ color: contrastText(color) }}>
        {title}
      </p>
      <div className="mt-7 grid gap-3">
        {points.map(point => (
          <p key={point} className="text-[25px] leading-tight text-[#15110F]" style={{ fontFamily: SERIF }}>
            {point}
          </p>
        ))}
      </div>
    </motion.div>
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
              <DimIcon size={18} style={{ color: contrastText(color) }} />
            )}
            <p className="mt-3 text-[11px] uppercase tracking-[0.16em] font-bold" style={{ color: contrastText(color) }}>{dim.name}</p>
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

function DomainAlignmentBridge({ domain, felt, expressed, alignmentText, color, tint }: {
  domain: 'Safety' | 'Play' | 'Challenge';
  felt: number;
  expressed: number;
  alignmentText: string | string[];
  color: string;
  tint: string;
}) {
  const gap = expressed - felt;
  const absoluteGap = Math.abs(gap);
  const veryAligned = absoluteGap <= 4;
  const alignmentLabel = veryAligned ? 'Very aligned' : absoluteGap <= 9 ? 'Slightly misaligned' : absoluteGap <= 14 ? 'Misaligned' : 'Very misaligned';
  const upward = gap > 0;
  const verdict = veryAligned
    ? `What you feel and what you show are the same.`
    : upward
      ? `You show more ${domain} than you feel.`
      : `You show less ${domain} than you feel.`;
  const maskingLabel = veryAligned ? null : upward ? 'Upward masking' : 'Downward masking';
  const headerLabel = maskingLabel ? `${maskingLabel} · ${alignmentLabel}` : alignmentLabel;
  const alignmentParagraphs = Array.isArray(alignmentText) ? alignmentText : [alignmentText];
  const feltBand = scoreBand(felt);
  const expressedBand = scoreBand(expressed);

  return (
    <div className="relative mt-8 overflow-hidden rounded-[28px] border bg-white p-6 md:p-8" style={{ borderColor: `${color}1F` }}>
      <div
        className="absolute -right-24 -top-28 h-80 w-80 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${color}12 0%, transparent 70%)` }}
      />
      <div className="relative grid gap-8 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="flex flex-col items-center justify-center">
          <SplitAlignmentCircle domain={domain} felt={felt} expressed={expressed} gap={absoluteGap} color={color} />
        </div>

        <div className="grid content-center gap-3">
          <AlignmentInfoTile
            label={`Expressed ${domain}`}
            body={veryAligned
              ? `Your expressed ${domain} is ${expressedBand}. What other people read here matches what is actually present inside.`
              : upward
                ? `Your expressed ${domain} is ${expressedBand}. Other people can still read more steadiness here than your system is feeling inside.`
                : `Your expressed ${domain} is ${expressedBand}. Other people may only see a quieter version of what is actually available inside.`}
            mode="expressed"
            color={color}
            tint={tint}
          />
          <AlignmentInfoTile
            label={`Felt ${domain}`}
            body={`Your felt ${domain} is ${feltBand}. This is the internal availability of the domain before anything has to be shown or managed outwardly.`}
            mode="felt"
            color={color}
            tint={tint}
          />
          <AlignmentInfoTile
            label={veryAligned ? 'How authentic this is' : "How you're masking"}
            body={veryAligned
              ? `There is almost no gap between what you feel and what others can read. This domain is genuinely authentic, and you can trust it as a reference point.`
              : upward
                ? `There is a mild-to-clear gap between what you feel and what others can read; the outside looks steadier than the inside.`
                : `There is a gap between what you feel and what others can read; the inside is stronger than what appears outwardly.`}
            mode={veryAligned ? 'felt' : 'masking'}
            color={color}
            tint={tint}
          />
        </div>
      </div>

      <div className="relative mt-10 grid gap-8 rounded-[24px] bg-[#FBFAF7] p-6 md:grid-cols-[0.88fr_1.12fr] md:p-8 lg:gap-12">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] font-bold" style={{ color: contrastAccent(color) }}>
            {headerLabel}
          </p>
          <h3 className="mt-3" style={{ fontFamily: SERIF, fontSize: 'clamp(1.75rem, 3.2vw, 2.55rem)', lineHeight: 1.14, letterSpacing: '-0.035em', color: '#15110F' }}>
            {verdict}
          </h3>
        </div>
        <div>
          <AlignmentSeverityCue gap={absoluteGap} label={alignmentLabel} color={color} />
          <div className="mt-7 space-y-4">
            {alignmentParagraphs.map((paragraph, index) => (
              <p key={index} className="text-[15px] leading-relaxed text-[#1A1614]" style={{ fontWeight: 300 }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SplitAlignmentCircle({ domain, felt, expressed, gap, color }: {
  domain: 'Safety' | 'Play' | 'Challenge';
  felt: number;
  expressed: number;
  gap: number;
  color: string;
}) {
  // Geometry tuned to stay graceful for any gap from 0 to 100.
  const CX = 200;
  const X1 = 70;
  const X2 = 330;
  const R = 130;          // = (X2 - X1) / 2, keeps perfect semicircles
  const STROKE = 30;
  const APEX = R + STROKE / 2;   // outer reach of each band from its centre line
  const centerY = 205;
  const separation = Math.min(90, 6 + gap * 0.85);
  const topY = centerY - separation / 2;
  const bottomY = centerY + separation / 2;

  const expressedPath = `M ${X1} ${topY} A ${R} ${R} 0 0 1 ${X2} ${topY}`;
  const feltPath = `M ${X1} ${bottomY} A ${R} ${R} 0 0 0 ${X2} ${bottomY}`;
  const closedExpressedPath = `M ${X1} ${centerY} A ${R} ${R} 0 0 1 ${X2} ${centerY}`;
  const closedFeltPath = `M ${X1} ${centerY} A ${R} ${R} 0 0 0 ${X2} ${centerY}`;

  const expressedLabelY = topY - APEX - 14;
  const feltLabelY = bottomY + APEX + 30;
  const showArrows = gap >= 8;
  const labelColor = contrastText(color);

  return (
    <svg viewBox="0 -16 420 472" className="h-[400px] w-full max-w-[520px] overflow-visible" aria-label="Felt and expressed alignment gap" role="img">
      <defs>
        <filter id="alignmentSoftShadow" x="-40%" y="-40%" width="180%" height="200%">
          <feDropShadow dx="0" dy="14" stdDeviation="15" floodColor="#1A1614" floodOpacity="0.1" />
        </filter>
      </defs>
      <motion.path
        d={expressedPath}
        initial={{ d: closedExpressedPath }}
        whileInView={{ d: expressedPath }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        fill="none"
        stroke={ALIGNMENT_TRACK}
        strokeWidth={STROKE}
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
        stroke={ALIGNMENT_TRACK}
        strokeWidth={STROKE}
        strokeLinecap="butt"
        filter="url(#alignmentSoftShadow)"
      />
      <motion.path
        d={expressedPath}
        initial={{ d: closedExpressedPath, strokeDashoffset: 1 }}
        whileInView={{ d: expressedPath, strokeDashoffset: 1 - expressed / 100 }}
        viewport={{ once: true, amount: 0.45 }}
        fill="none"
        stroke={color}
        strokeWidth={STROKE}
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
        stroke={color}
        strokeWidth={STROKE}
        strokeLinecap="butt"
        pathLength="1"
        strokeDasharray="1"
        transition={{ duration: 1.05, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
      />
      <text x={CX} y={expressedLabelY} textAnchor="middle" style={{ fontFamily: SERIF, fontSize: 21, letterSpacing: '0', fill: labelColor }}>Expressed</text>
      <text x={CX} y={feltLabelY} textAnchor="middle" style={{ fontFamily: SERIF, fontSize: 21, letterSpacing: '0', fill: labelColor }}>Felt</text>
      {showArrows && (
        <g>
          {[X1, X2].map((x) => (
            <g key={x}>
              <motion.polygon
                points={`${x - 6},${topY - 6} ${x + 6},${topY - 6} ${x},${topY - 19}`}
                fill={color}
                opacity="0.4"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
              />
              <motion.polygon
                points={`${x - 6},${bottomY + 6} ${x + 6},${bottomY + 6} ${x},${bottomY + 19}`}
                fill={color}
                opacity="0.4"
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 0.2 }}
              />
            </g>
          ))}
        </g>
      )}
      <motion.g
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: `${CX}px ${centerY}px` }}
      >
        <circle cx={CX} cy={centerY} r="60" fill={`${color}1F`} />
        <circle cx={CX} cy={centerY} r="60" fill="none" stroke="#FFFFFF" strokeWidth="6" opacity="0.9" />
        <text x={CX} y={centerY - 20} textAnchor="middle" style={{ fontSize: domain === 'Challenge' ? 9 : 10.5, fontWeight: 800, letterSpacing: '0.12em', fill: labelColor }}>{domain.toUpperCase()} GAP</text>
        <text x={CX} y={centerY + 34} textAnchor="middle" style={{ fontFamily: SERIF, fontSize: 56, fill: '#2A2521' }}>{gap}</text>
      </motion.g>
    </svg>
  );
}

function AlignmentSeverityCue({ gap, label, color }: { gap: number; label: string; color: string }) {
  const stages = ['Very misaligned', 'Misaligned', 'Slightly misaligned', 'Almost aligned', 'Aligned'];
  const active = gap <= 4 ? 4 : gap <= 8 ? 3 : gap <= 11 ? 2 : gap <= 16 ? 1 : 0;
  return (
    <div>
      <div className="flex items-center gap-2" aria-label={`Alignment level: ${label}`}>
        {stages.map((stage, index) => {
          const selected = index === active;
          return (
            <motion.span
              key={stage}
              className="h-2.5 flex-1 rounded-full"
              style={{
                backgroundColor: selected
                  ? color
                  : index <= active
                    ? `${color}58`
                    : '#E2DDD5',
              }}
              initial={{ scaleX: 0.4, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: selected ? 1 : 0.72 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.32, delay: index * 0.04 }}
            />
          );
        })}
      </div>
      <div className="mt-2 flex justify-between gap-3 text-[9px] uppercase tracking-[0.12em] font-bold text-[#9B958C]">
        <span>Not aligned</span>
        <span style={{ color: contrastAccent(color) }}>Aligned</span>
      </div>
    </div>
  );
}

function AlignmentInfoTile({ label, body, mode, color, tint }: {
  label: string;
  body: string;
  mode: 'felt' | 'expressed' | 'masking';
  color: string;
  tint: string;
}) {
  return (
    <div className="rounded-[20px] p-4" style={{ backgroundColor: tint }}>
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[15px]" style={{ backgroundColor: '#FFFFFF', color }}>
          <AlignmentSignalIcon mode={mode} color={color} />
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.15em] font-bold" style={{ color: contrastAccent(color) }}>{label}</p>
          <p className="mt-1 text-sm leading-snug text-[#4D4945]" style={{ fontWeight: 300 }}>{body}</p>
        </div>
      </div>
    </div>
  );
}

function AlignmentSignalIcon({ mode, color }: { mode: 'felt' | 'expressed' | 'masking'; color: string }) {
  return (
    <svg viewBox="0 0 48 48" className="h-9 w-9" aria-hidden="true">
      <circle cx="24" cy="24" r="16" fill={`${color}18`} />
      {mode === 'expressed' && (
        <>
          <path d="M10 24 A14 14 0 0 1 38 24" fill="none" stroke={color} strokeWidth="7" strokeLinecap="butt" />
          <path d="M10 24 A14 14 0 0 0 38 24" fill="none" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="butt" />
        </>
      )}
      {mode === 'felt' && (
        <>
          <path d="M10 24 A14 14 0 0 1 38 24" fill="none" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="butt" />
          <path d="M10 24 A14 14 0 0 0 38 24" fill="none" stroke={color} strokeWidth="7" strokeLinecap="butt" />
        </>
      )}
      {mode === 'masking' && (
        <>
          <path d="M10 20 A14 14 0 0 1 38 20" fill="none" stroke={color} strokeWidth="6" strokeLinecap="butt" opacity="0.9" />
          <path d="M10 29 A14 14 0 0 0 38 29" fill="none" stroke={color} strokeWidth="6" strokeLinecap="butt" opacity="0.9" />
        </>
      )}
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
  return (
    <SafetyDimensionJourney
      dim={dim}
      domain={domain}
      color={color}
      tint={tint}
      index={index}
      active={active}
      onActive={onActive}
      onClear={onClear}
    />
  );
}

function SafetyDimensionJourney({ dim, domain, color, tint, index, active, onActive, onClear }: {
  dim: any;
  domain: 'Safety' | 'Play' | 'Challenge';
  color: string;
  tint: string;
  index: number;
  active: boolean;
  onActive: () => void;
  onClear: () => void;
}) {
  const lead = dim.lead ?? (dim.text ? dim.text.split('\n\n')[0] : '');
  const hasInsightPanels = Boolean(dim.working && dim.takeNote);
  const excess = Boolean(dim.excess) || /excess|very high/.test(String(dim.band).toLowerCase());

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
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 360, damping: 34, delay: index * 0.04 }}
      className="group/safety-dim relative scroll-mt-24 overflow-hidden rounded-[30px] bg-white p-7 md:p-9 cursor-default"
    >
      <div
        className="absolute -right-20 -bottom-24 h-80 w-80 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${color}12 0%, transparent 70%)` }}
      />
      <div className="relative grid lg:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)] gap-8 lg:gap-14 items-center">
        <div className="min-w-0">
          <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(3.25rem, 5.4vw, 5rem)', fontWeight: 600, color: '#0F0F0F', letterSpacing: '-0.04em', lineHeight: 0.98, margin: 0 }}>
            {dim.name}
          </h3>

          <div className="relative mt-10 h-72">
            <SafetyDimensionSymbol selected={dim.name} value={dim.score} color={color} />
            <DimensionSliceMarker selected={dim.name} value={dim.score} color={color} />
          </div>
        </div>

        <div className="min-w-0 lg:self-end lg:pb-4">
          <div className="flex items-center justify-start">
            <div className="inline-flex items-center gap-5 rounded-[24px] bg-[#F7F5EF] px-5 py-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#8B8682]">Your level</p>
                <p className="mt-1 whitespace-nowrap text-[#15110F]" style={{ fontFamily: SERIF, fontSize: 32, lineHeight: 1 }}>{dim.band}</p>
                {excess && (
                  <p className="mt-1.5 text-[11px] font-semibold tracking-[0.04em]" style={{ color: contrastText(color) }}>with signs of excess</p>
                )}
              </div>
              <LevelIndicator band={dim.band} color={color} excess={excess} />
            </div>
          </div>
          <p className="mt-7 text-[#1A1614] leading-relaxed text-[16px]" style={{ fontWeight: 300 }}>{lead}</p>
        </div>
      </div>

      <div className="relative mt-9 grid gap-5 lg:grid-cols-[1.18fr_0.82fr]">
        <SixDimensionScale active={dim.name} color={color} />
        {hasInsightPanels ? (
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
        ) : (
          <div className="rounded-[24px] p-6" style={{ backgroundColor: tint, border: `1px solid ${color}22` }}>
            <p className="text-[11px] uppercase tracking-[0.16em] font-bold" style={{ color: contrastText(color) }}>A closer reading</p>
            <p className="mt-4 text-[15px] leading-relaxed text-[#1A1614]" style={{ fontWeight: 300 }}>
              This dimension is part of your {domain} foundation. Its score shows where the domain is supported, strained, or quietly compensating inside the larger shape.
            </p>
          </div>
        )}
      </div>
      <DimensionReportBlock dim={dim} color={color} tint={tint} />
    </motion.div>
  );
}

function DimensionReportBlock({ dim, color, tint }: { dim: any; color: string; tint: string }) {
  const dimLead = dim.lead ?? (dim.text ? dim.text.split('\n\n')[0] : '');
  const fallbackParagraphs = dim.text ? dim.text.split('\n\n') : [dim.lead].filter(Boolean);
  const rawParagraphs = dim.name === 'Self'
    ? [
      'For you, Self Safety is not simply about confidence. It is about whether your own system feels like a trustworthy place to return to when you have not performed, pleased, solved, or held everything together. At this level, that inner landing place is inconsistent. You may be deeply capable and still find it difficult to be gentle with yourself when there is no achievement to point to.',
      'This can create a life where self-respect is real, but conditional. When you have earned it, you feel solid. When you are tired, disappointed, slow, uncertain, or unable to meet your own standard, the inner support can disappear quickly. The result is not laziness or fragility; it is a nervous system that has learned to use performance as proof that you deserve to be on your own side.',
      'The growth direction is to build a form of Safety that remains available before the result is known. That means learning to stay with yourself while something is unfinished, while your output is imperfect, or while you are simply human. This is where the foundation becomes less brittle: not by lowering your standards, but by no longer making belonging to yourself depend on meeting them.',
    ]
    : dim.name === 'Others' ? [
      'Others Safety describes how easily support can move toward you, not just away from you. At this level, you may be reliable, generous, and emotionally available to other people while still keeping your own needs unusually private. The relationship field may look connected, but the flow of care is not even.',
      'This often means people trust you more than you let yourself rely on them. They may assume you are fine because you rarely signal otherwise, and because your steadiness has become part of the role you occupy. The cost is that your relationships may contain affection without enough mutual holding.',
      'The growth direction is not to become dependent or exposed in a way that feels unsafe. It is to let the right people see a truer amount of what you carry, and to practise receiving without immediately calculating whether you have earned it.',
    ] : fallbackParagraphs;

  // Avoid repeating the lead paragraph already shown beside the symbol above.
  const deduped = rawParagraphs.filter((p, i) => !(i === 0 && p === dimLead));
  const paragraphs = deduped.length ? deduped : rawParagraphs;
  const [lead, ...rest] = paragraphs;
  const accent = contrastText(color);

  return (
    <div
      className="relative mt-12 overflow-hidden rounded-[28px] border p-7 md:p-9"
      style={{ borderColor: `${color}1F`, background: `linear-gradient(158deg, ${tint} 0%, #FFFFFF 70%)` }}
    >
      <div
        className="absolute -right-20 -bottom-24 h-72 w-72 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${color}10 0%, transparent 70%)` }}
      />
      <div className="relative flex items-center gap-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white shadow-[0_14px_30px_-24px_rgba(0,0,0,0.5)]" style={{ color: accent }}>
          <BookOpen size={18} strokeWidth={1.9} />
        </span>
        <p className="text-[11px] uppercase tracking-[0.18em] font-bold" style={{ color: accent }}>
          Understanding your dimension of {dim.name}
        </p>
        <span className="ml-1 hidden h-px flex-1 sm:block" style={{ background: `linear-gradient(to right, ${color}33, transparent)` }} />
      </div>

      <p
        className="relative mt-7 border-l-2 pl-5 text-[18.5px] leading-[1.62] text-[#15110F]"
        style={{ fontFamily: SERIF, fontWeight: 400, borderColor: color }}
      >
        {lead}
      </p>

      {rest.length > 0 && (
        <div className={`relative mt-7 gap-x-12 gap-y-5 ${rest.length > 1 ? 'grid md:grid-cols-2' : 'max-w-3xl'}`}>
          {rest.map((paragraph, index) => (
            <p key={index} className="text-[15.5px] leading-[1.75] text-[#1A1614]" style={{ fontWeight: 300 }}>
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

const DIM_SCORES: Record<string, number> = { Self: 38, Others: 24, Senses: 39, Perception: 43, Past: 51, Future: 82 };

function SafetyDimensionSymbol({ selected, value, color }: { selected: string; value: number; color: string }) {
  const symbol = getDimensionSymbolAsset(selected, value);
  const otherDims = Object.keys(DIM_SCORES).filter(d => d !== selected);
  return (
    <div className="absolute inset-0">
      <img
        src={symbol}
        alt=""
        aria-hidden="true"
        className="h-full w-full object-contain opacity-90"
        style={{ filter: `drop-shadow(0 18px 30px ${color}14)` }}
      />
      <svg viewBox="0 0 409 338" className="absolute inset-0 h-full w-full object-contain" style={{ pointerEvents: 'none' }}>
        {otherDims.map(dim => {
          const score = DIM_SCORES[dim] ?? 50;
          const neutralPath = getScoreFillPath(dim, score);
          return neutralPath ? <path key={dim} d={neutralPath} fill="#E8E5DE" /> : null;
        })}
        {Object.values(DOMAIN_HEX_OUTLINES).map((d, i) => (
          <path key={i} d={d} stroke="#CCCAC5" strokeWidth="0.8" fill="none" />
        ))}
        {DOMAIN_SPOKE_LINES.map((line, i) => (
          <line key={`s${i}`} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="#CCCAC5" strokeWidth="0.8" />
        ))}
        <line y1="-0.4" x2="167" y2="-0.4" transform={DOMAIN_SPOKE_TRANSFORM} stroke="#CCCAC5" strokeWidth="0.8" />
      </svg>
    </div>
  );
}

function DimensionSliceMarker({ selected, value, color }: { selected: string; value: number; color: string }) {
  const toPct = (x: number, y: number) => ({
    left: `${(x / 409) * 100}%`,
    top: `${(y / 338) * 100}%`,
  });
  const markerPositions: Record<string, { left: string; top: string }> = {
    Self: toPct(106.68, 196.905),
    Others: toPct(171.648, 309.507),
    Senses: toPct(237.388, 309.604),
    Perception: toPct(302.6, 196.2),
    Past: toPct(139.5, 140.5),
    Future: toPct(269.5, 140.5),
  };
  const position = markerPositions[selected] ?? toPct(204.5, 196.7);

  return (
    <motion.div
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
      style={position}
      initial={{ opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.span
        className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ backgroundColor: color }}
        animate={{ opacity: [0.18, 0.035, 0.18], scale: [0.72, 1.42, 0.72] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ y: [-2.5, 2.5] }}
        transition={{ duration: 2.6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      >
        <span
          className="grid h-12 w-12 place-items-center rounded-full border border-white/80 bg-white/92 tabular-nums shadow-[0_16px_34px_-28px_rgba(0,0,0,0.55)] backdrop-blur-sm"
          style={{ color, fontFamily: SERIF, fontSize: 25, lineHeight: 1 }}
        >
          {value}
        </span>
      </motion.div>
    </motion.div>
  );
}

function LevelIndicator({ band, color, excess = false }: { band: string; color: string; excess?: boolean }) {
  const normalized = band.toLowerCase();
  const active =
    normalized.includes('very low') ? 1 :
    normalized === 'low' ? 2 :
    normalized.includes('almost') ? 3 :
    4;
  const isExcess = excess;

  const chipWidths = [16, 19, 24, 30];

  return (
    <div className="flex flex-col-reverse items-start gap-1.5" aria-hidden="true">
      {chipWidths.map((w, index) => {
        const on = index < active;
        const isTop = index === 3;
        const chip = (
          <motion.span
            key={index}
            className="block rounded-full"
            style={{
              width: w,
              height: 7,
              backgroundColor: on ? color : '#DDD7CE',
              opacity: on ? 0.95 : 0.72,
            }}
            initial={{ scaleX: 0.4, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: on ? 0.95 : 0.72 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.28, delay: index * 0.04 }}
          />
        );
        if (isTop && isExcess) {
          return (
            <div key={index} className="flex items-center gap-1.5">
              {chip}
              <motion.span
                className="relative block h-2"
                style={{ width: 15 }}
                initial={{ opacity: 0, x: -4 }}
                whileInView={{ opacity: 0.92, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.28, delay: 0.2 }}
              >
                <svg viewBox="0 0 15 8" className="h-full w-full overflow-visible" aria-hidden="true">
                  <path
                    d="M2 5 L5 3.5 L8 5 L11 3.5 L14 5"
                    fill="none"
                    stroke={color}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.span>
            </div>
          );
        }
        return chip;
      })}
    </div>
  );
}

function DimensionBar({ item, active, color }: { item: { name: string; score: number }; active: string; color: string }) {
  const selected = item.name === active;
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className="group flex h-full flex-col items-center justify-end gap-3"
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <div className="relative flex h-64 w-full items-end justify-center">
        <div className="absolute bottom-0 h-full w-10 rounded-full bg-[#F1EEE8]" />
        <motion.div
          className="relative z-10 w-10 rounded-full"
          style={{ backgroundColor: (selected || hovered) ? color : '#D6D0C8' }}
          initial={{ height: 0 }}
          whileInView={{ height: `${item.score}%` }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="absolute inset-x-0 top-2 text-center text-[12px] tabular-nums font-bold text-white transition-opacity duration-200"
            style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)', opacity: hovered ? 1 : 0 }}
          >
            {item.score}
          </span>
        </motion.div>
      </div>
      <p className="text-center text-[10px] uppercase tracking-[0.08em] font-bold" style={{ color: selected ? color : '#9A948D' }}>{item.name}</p>
    </motion.div>
  );
}

function SixDimensionScale({ active, color }: { active: string; color: string }) {
  return (
    <div className="relative overflow-hidden rounded-[24px] border bg-white p-6" style={{ borderColor: `${color}22` }}>
      <div className="mb-7 flex items-center justify-between gap-4">
        <p className="text-[12px] uppercase tracking-[0.16em] font-bold text-[#1A1614]">Your six dimensions</p>
      </div>
      <div className="relative h-80">
        <div className="absolute inset-0 grid grid-cols-6 gap-6 items-end">
          {allDimensionScores.map((item) => (
            <DimensionBar key={item.name} item={item} active={active} color={color} />
          ))}
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
            <div className="inline-grid h-10 w-10 place-items-center rounded-full" style={{ backgroundColor: `${color}18`, color: contrastText(color) }}>
              <Icon size={18} strokeWidth={2.5} />
            </div>
            <p className="mt-4 text-[10.5px] tracking-[0.2em] uppercase font-bold" style={{ color: contrastText(color) }}>{domain}</p>
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
            <p className="text-[10.5px] tracking-[0.2em] uppercase font-bold mb-1.5" style={{ color: contrastText(color) }}>{domain}</p>
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
