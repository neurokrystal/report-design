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
    what: "Safety is the foundation of inner peace — what lets you feel grounded from within and meet life without defence. It has two dimensions: your relationship with yourself (Self) and your relationship with others (Others).",
    pullQuote: "Safety is the depleted leg of your Sharp Peak — the foundation Challenge has been quietly compensating for.",
    levels: {
      low: {
        label: "When it's low",
        text: "Low safety often shows itself through over-controlling, driving too hard, or holding a composure that takes effort to maintain. Underneath, a background sense that something could go wrong, and rest that does not fully restore.",
      },
      balanced: {
        label: "When it's balanced",
        text: "You feel at ease without needing to manage it — steady in yourself when things are uncertain, calm in your body without conditions, and able to be close to people without monitoring or performing.",
      },
      excess: {
        label: "When it's excess",
        text: "So much weight on staying settled that you can feel numb, and stepping into anything new or stimulating starts to feel like a risk you would rather not take.",
      },
    },
    role: "Safety is the depleted leg of your Sharp Peak — the foundation Challenge has been quietly compensating for.",
    feltText: "At this level, your nervous system is rarely off duty. Even in moments that should feel safe, there is a quiet vigilance running underneath — the sense that something needs watching, that ease might not last, that you have to stay ready. Rest does not fully restore you. Your inner voice is often the loudest voice in the room, and it is rarely on your side. You may not call any of this anxiety, because it does not look dramatic from the outside. It is just the texture you have learned to live in.",
    expressedText: "Outwardly, you express Safety at 35%. You hold yourself together. You arrive on time, you meet your obligations, you keep your composure under pressure. Most of the people around you would describe you as steady, even reliable. What they do not see is what the steadiness costs, or that the composure is held by effort rather than ease. Your expression of Safety is slightly steadier than what you actually feel — and that gap is doing its own kind of work.",
    alignmentText: "Your felt Safety reads 22%; your expressed Safety reads 35%. This is a significant upward divergence — you appear more settled than you actually feel, and the gap is wide enough that it is no longer a small piece of social management. It is structural. You have learned to look safer than you are, and the effort of that maintenance is a hidden cost most readings would not surface.",
    alignmentExtended: "The cost of carrying this gap is not only the energy of the performance. It is the slow erosion of the link between your inner experience and the people around you. The colleagues, friends, and partners who think you are fine are not wrong — you are showing them fine. But fine is not what is happening. The longer the gap persists, the harder it becomes to be received as you actually are. Over time, the people closest to you may know you less than they think.",
    isAlignmentFlagged: true,
    dimensions: [
      {
        name: 'Self',
        score: 38,
        band: 'Low',
        text: "Your relationship with yourself is conditional. You approve of yourself when you have produced something, when you have held the line under pressure, when you have been the version of you that meets your own standards. When you have not, the approval is withdrawn quickly. Your self-talk tends to be sharper than the way you would speak to anyone else in your life, and the sharpness is most reliable when you are tired or when something has not gone as you expected.\n\nFrom the inside, this often looks like self-discipline. From the architecture, it reads as a foundation that requires payment for entry. You can rest with yourself, but only after the work is finished. You can be on your own side, but only when you have earned it. This is the kind of inner relationship that holds up well in achievement and falters in stillness.",
      },
      {
        name: 'Others',
        score: 24,
        band: 'Very Low',
        text: "Leaning on people is something you do rarely, and rarely without internal accounting. Support, when it comes, is harder to receive than to offer. You may have people who would be there for you, and you may not have asked them to be — not because you do not trust them, but because asking carries a quiet weight you would rather not transfer. Connection with you often runs through what you provide rather than what you need.\n\nThis is not isolation. From the outside, you are likely well-regarded, often consulted, sometimes leaned on by others. The architecture beneath that is a one-way relationship to interdependence. You give support more easily than you take it, and the ratio is wide enough that the people who would gladly hold some of your weight are mostly unaware you are carrying it.",
      },
    ],
  },
  Play: {
    what: "Play is vibrant, felt aliveness — what brings lightness, joy, and richness to your experience of life. It has two dimensions: your relationship with your body (Senses) and your relationship with your mind (Perception).",
    pullQuote: "Play sits low alongside Safety — the part of you that would normally replenish is not generating much right now.",
    levels: {
      low: {
        label: "When it's low",
        text: "Life can feel flat or mechanical, a quiet guilt around doing things purely for enjoyment, and a disconnection from the body's signals and pleasures. Spontaneity, surprise, and lightness meet resistance.",
      },
      balanced: {
        label: "When it's balanced",
        text: "There is a sense of lightness woven through ordinary days — enjoyment in sensory and creative experience, regular moments of laughter or flow, and energy that feels alive without needing a reason.",
      },
      excess: {
        label: "When it's excess",
        text: "Immersion tips into over-indulgence, the search for stimulation outpaces actual pleasure, and you can lose yourself in what feels good at the cost of your other needs.",
      },
    },
    role: "Play sits low alongside Safety — the part of you that would normally replenish is not generating much right now.",
    feltText: "Your inner life has narrowed. The textures that would normally arrive without effort — the small flickers of curiosity, the body responding to a piece of music, the moment of being absorbed in something for its own sake — show up less than they used to, and you may not have noticed. You can describe your days, but fewer of them have flavour. You can name what you did, but less of it left an impression on you.",
    expressedText: "Outwardly, you express Play at 47%. You laugh in the right places, you enjoy meals with people, you do the things that look like rest and pleasure. From a distance, your life appears to contain enjoyment. It does — just less than it appears to, and less than is available. The gap between what you feel and what you show is not large, but it is present.",
    alignmentText: "Your felt Play reads 38%; your expressed Play reads 47%. This is a mild upward divergence — you express slightly more ease and pleasure than you currently feel. The gap is not architecturally significant on its own, but read alongside your Safety alignment, it suggests a consistent pattern. You are working harder than is visible to look more settled than you are.",
    alignmentExtended: null,
    isAlignmentFlagged: false,
    dimensions: [
      {
        name: 'Senses',
        score: 39,
        band: 'Low',
        text: "Your body is somewhere just outside the room. You inhabit it functionally — you move through your day, you eat, you sleep — but the small portals through which Play normally enters have narrowed. Warmth, taste, texture, breath, the weight of someone you love resting on you — these arrive as data more than as experience. You can register that something is pleasant without being filled by it. The body that should be a daily source of replenishment is currently a vehicle.\n\nThis is not numbness. It is a body running a low-power mode it adopted to manage something. The disengagement is not a flaw in you. It is the result of asking your senses to do less so something else could carry more.",
      },
      {
        name: 'Perception',
        score: 43,
        band: 'Almost Balanced',
        text: "Your mental flexibility is present, but operating with less curiosity than is natural to you. You can hold complexity, you can shift perspective when asked, and you are not rigid in your thinking — but you are not currently generating new angles either. Interpretation has become more dutiful than playful. Your inner perceptual world is in maintenance mode, doing what is needed without the looseness that produces fresh insight.\n\nThis is a quieter dimension in your reading, neither the strongest nor the most depleted. The mental capacity is still there. It is the body's invitation to engage that has narrowed — and Perception, with less to receive from the senses, is generating less of what it would otherwise generate.",
      },
    ],
  },
  Challenge: {
    what: "Challenge is meaningful forward motion — what gives you direction, purpose, and the sense that your actions matter. It has two dimensions: your relationship with your past (Past) and your relationship with your future (Future).",
    pullQuote: "Challenge is the apex of your Sharp Peak — the domain holding most of your psychological weight, generating significance the other two cannot currently provide.",
    levels: {
      low: {
        label: "When it's low",
        text: "A sense of stagnation, avoiding decisions that carry real weight, and routines that stay busy while crowding out meaning. A quiet loss of momentum or direction, tension between what you want and what you actually move on.",
      },
      balanced: {
        label: "When it's balanced",
        text: "Clear direction that is personally meaningful — movement toward goals with self-respect, motivation that feels rooted rather than forced, and pride in how the challenges are chosen and carried.",
      },
      excess: {
        label: "When it's excess",
        text: "Struggle gets mistaken for meaning, busyness masquerades as growth, and you can chase goals you do not genuinely care about or find it hard to stop.",
      },
    },
    role: "Challenge is the apex of your Sharp Peak — the domain holding most of your psychological weight, generating significance the other two cannot currently provide.",
    feltText: "Direction is one of the most settled things in your life. You know what you are doing, you know why you are doing it, and the connection between your effort and your meaning is strong. Pursuit feels good in your body. Forward motion regulates you in a way that few other things do. When you set a goal that matters, your system organises around it quickly, and that organisation is itself a source of relief.",
    expressedText: "Outwardly, you express Challenge at 77% — almost exactly what you feel. Others would describe you as driven, focused, often ambitious. They would say you are someone who follows through. The match between the inner and outer experience here is real. This is the part of your architecture where what you feel and what you show are the same thing.",
    alignmentText: "Your felt Challenge reads 75%; your expressed Challenge reads 77%. This is an aligned reading. The drive you are showing the world is the drive you actually feel. There is no performance here. In a reading otherwise marked by alignment gaps, this domain is doing something important — it is the part of you that is fully whole, and the part you can most reliably trust.",
    alignmentExtended: null,
    isAlignmentFlagged: false,
    dimensions: [
      {
        name: 'Past',
        score: 51,
        band: 'Almost Balanced',
        text: "Your history is mostly integrated. You have a working relationship with where you have been, and you are not haunted by your story — but there are still some chapters that have not fully been authored. You can describe what happened, but a few pieces of it remain on the shelf rather than woven into your identity. The narrative is largely yours, with some loose ends.\n\nThis is not a depleted dimension. It is a foundation that is functional and not yet finished. What is interesting in your reading is that your Future runs significantly higher than your Past — meaning you are oriented forward more strongly than you are anchored backward.",
      },
      {
        name: 'Future',
        score: 82,
        band: 'High',
        text: "You are oriented forward with real clarity. Your sense of direction is one of the most resourced parts of your entire architecture — you know where you are going, you have planned the next few steps, and the future you are working toward is one you actually want. Direction is not a struggle for you. Choosing what to pursue is not where your energy gets stuck.\n\nThis is also, read against your other scores, the most architecturally interesting part of your reading. Your Future dimension is doing significant work. It is pulling you forward into a life that has not yet arrived, while your Safety foundations sit thin underneath. Strong forward orientation can be a real resource, and in your reading it is. It can also become its own form of compensation — a place to live mentally that asks less of the foundations than the present moment does. Worth holding both of those readings together as you sit with this.",
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

export function DomainSection({ domain, score, band, felt, expressed, color }: DomainSectionProps) {
  const content = domainContent[domain];
  const alignmentGap = Math.abs(felt - expressed);
  const tint = domainTints[domain];

  return (
    <div className="space-y-0">
      {/* ── HEADER — matches Sections 1-3: free-floating kicker / title / rule ── */}
      <div id={`${domain.toLowerCase()}-overview`}>
        <p style={{ color: '#DC4C0C', fontWeight: 800, letterSpacing: '0.06em', fontSize: '14px', marginBottom: '30px' }}>
          {domain === 'Safety' ? '04' : domain === 'Play' ? '05' : '06'}
        </p>
        <h1 style={{ fontFamily: '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif', fontWeight: 600, letterSpacing: '-0.03em', fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', color: '#0F0F0F', margin: 0 }}>
          {domain}
        </h1>
        <div style={{ width: '40px', height: '3px', backgroundColor: '#DC4C0C', marginTop: '30px', marginBottom: '32px' }} />
      </div>

      {/* ── STAT STRIP — score / band / felt / expressed in their own breathable row ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-7 border-y border-[#E5E3DD] mb-10">
        <div>
          <p className="text-[11px] tracking-[0.15em] uppercase text-[#8B8682] mb-2 font-semibold">Score</p>
          <p className="text-5xl tabular-nums" style={{ color, fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1 }}>
            {score}
          </p>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.15em] uppercase text-[#8B8682] mb-2 font-semibold">Band</p>
          <p className="text-xl text-[#1A1614]" style={{ fontWeight: 400, marginTop: '10px' }}>{band}</p>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.15em] uppercase text-[#8B8682] mb-2 font-semibold">Felt</p>
          <p className="text-3xl tabular-nums text-[#1A1614]" style={{ fontWeight: 300, lineHeight: 1, marginTop: '6px' }}>{felt}</p>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.15em] uppercase text-[#8B8682] mb-2 font-semibold">Expressed</p>
          <p className="text-3xl tabular-nums text-[#1A1614]" style={{ fontWeight: 300, lineHeight: 1, marginTop: '6px' }}>{expressed}</p>
        </div>
      </div>

      {/* ── WHAT IT IS + PULL QUOTE ── */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Left: What it is + dimensions */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E5E3DD] p-8 space-y-6">
          <div>
            <p className="text-xs tracking-widest uppercase text-[#8B8682] mb-3">What {domain} is</p>
            <p className="text-[#1A1614] leading-relaxed" style={{ fontWeight: 300 }}>{content.what}</p>
          </div>

          <div className="border-t border-[#E5E3DD] pt-6">
            <p className="text-xs tracking-widest uppercase text-[#8B8682] mb-4">
              Your {domain} dimensions
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {content.dimensions.map((dim) => (
                <MiniDimCard key={dim.name} name={dim.name} score={dim.score} band={dim.band} color={color} flagged={!!dim.flagged} />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Pull quote */}
        <div
          className="rounded-2xl p-8 flex flex-col justify-between border"
          style={{ backgroundColor: tint, borderColor: `${color}30` }}
        >
          <div className="mb-6">
            <svg width="32" height="22" viewBox="0 0 32 22" fill="none">
              <path d="M0 22V13.75C0 9.58333 1.125 6.04167 3.375 3.125C5.625 1.04167 8.5 0 12 0v3.75C9.75 3.75 8.125 4.5 7.125 6C6.125 7.5 5.625 9.41667 5.625 11.75H10V22H0ZM18 22V13.75C18 9.58333 19.125 6.04167 21.375 3.125C23.625 1.04167 26.5 0 30 0v3.75C27.75 3.75 26.125 4.5 25.125 6C24.125 7.5 23.625 9.41667 23.625 11.75H28V22H18Z" fill={color} opacity="0.25" />
            </svg>
          </div>
          <p className="text-lg text-[#1A1614] leading-relaxed flex-1" style={{ fontWeight: 300, fontStyle: 'italic' }}>
            {content.pullQuote}
          </p>
          <div className="mt-6 pt-6 border-t" style={{ borderColor: `${color}30` }}>
            <p className="text-xs tracking-widest uppercase" style={{ color }}>Role in your shape</p>
          </div>
        </div>
      </div>

      {/* ── WHAT YOUR LEVEL MEANS ── */}
      <div className="bg-white rounded-2xl border border-[#E5E3DD] p-8 mb-6">
        <p className="text-xs tracking-widest uppercase text-[#8B8682] mb-6">What your level means</p>
        <div className="grid md:grid-cols-3 gap-6">
          {(['low', 'balanced', 'excess'] as const).map((key) => {
            const level = content.levels[key];
            const isActive = key === 'low'
              ? score < 35
              : key === 'balanced'
              ? score >= 35 && score <= 65
              : score > 65;
            return (
              <div key={key} className={`rounded-xl p-5 ${isActive ? 'border-l-4' : 'border border-[#E5E3DD]'}`}
                style={isActive ? { borderColor: color, backgroundColor: tint } : {}}>
                <p className="text-xs tracking-widest uppercase mb-3" style={{ color: isActive ? color : '#8B8682' }}>
                  {level.label}
                </p>
                <p className="text-sm text-[#1A1614] leading-relaxed" style={{ fontWeight: 300 }}>{level.text}</p>
                {isActive && (
                  <p className="mt-3 text-xs" style={{ color }}>← Your reading</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── FELT + EXPRESSED ── */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl border border-[#E5E3DD] p-8">
          <p className="text-xs tracking-widest uppercase text-[#8B8682] mb-1">How it feels inside</p>
          <p className="text-xs text-[#8B8682] mb-5">Felt {domain} — {felt}</p>
          <ScoreBar value={felt} color={color} />
          <p className="mt-5 text-[#1A1614] leading-relaxed text-sm" style={{ fontWeight: 300 }}>{content.feltText}</p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E3DD] p-8">
          <p className="text-xs tracking-widest uppercase text-[#8B8682] mb-1">How others see it</p>
          <p className="text-xs text-[#8B8682] mb-5">Expressed {domain} — {expressed}</p>
          <ScoreBar value={expressed} color={color} />
          <p className="mt-5 text-[#1A1614] leading-relaxed text-sm" style={{ fontWeight: 300 }}>{content.expressedText}</p>
        </div>
      </div>

      {/* ── ALIGNMENT FINDING ── */}
      <div id={`${domain.toLowerCase()}-alignment`} className={`rounded-2xl border overflow-hidden mb-10 ${content.isAlignmentFlagged ? '' : 'bg-white border-[#E5E3DD]'}`}
        style={content.isAlignmentFlagged ? { backgroundColor: tint, borderColor: `${color}40` } : {}}>
        {content.isAlignmentFlagged && (
          <div className="h-1 w-full" style={{ backgroundColor: color }} />
        )}
        <div className="p-8">
          <div className="flex items-start gap-6">
            {content.isAlignmentFlagged && (
              <div className="flex-shrink-0 rounded-xl p-4 bg-white border" style={{ borderColor: `${color}30` }}>
                <p className="text-xs tracking-widest uppercase text-[#8B8682] mb-1">Gap</p>
                <p className="text-4xl tabular-nums" style={{ color, fontWeight: 300 }}>{alignmentGap}</p>
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                {content.isAlignmentFlagged && (
                  <span className="text-xs tracking-widest uppercase px-2 py-1 rounded-full border text-white text-[10px]"
                    style={{ backgroundColor: color, borderColor: color }}>
                    Flagged
                  </span>
                )}
                <p className="text-xs tracking-widest uppercase text-[#8B8682]">Alignment finding</p>
              </div>
              <p className="text-[#1A1614] leading-relaxed mb-3" style={{ fontWeight: 300 }}>
                {content.alignmentText}
              </p>
              {content.alignmentExtended && (
                <p className="text-[#1A1614] leading-relaxed text-sm mt-4 pt-4 border-t border-[#E5E3DD]" style={{ fontWeight: 300 }}>
                  {content.alignmentExtended}
                </p>
              )}
            </div>
          </div>
          {/* Felt / Gap / Expressed row for flagged */}
          {content.isAlignmentFlagged && (
            <div className="mt-6 pt-6 border-t border-[#E5E3DD] grid grid-cols-3 gap-4">
              <AlignNum label="Felt" value={felt} color="#8B8682" />
              <AlignNum label="Gap" value={alignmentGap} color={color} highlight />
              <AlignNum label="Expressed" value={expressed} color="#8B8682" />
            </div>
          )}
        </div>
      </div>

      {/* ── DIMENSIONS ── */}
      <div className="space-y-6">
        <p className="text-xs tracking-widest uppercase text-[#8B8682]">Your {domain} dimensions</p>
        {content.dimensions.map((dim) => (
          <div
            key={dim.name}
            id={`${domain.toLowerCase()}-${dim.name.toLowerCase()}`}
            className="rounded-2xl border overflow-hidden bg-white"
            style={dim.flagged ? { borderColor: `${color}50` } : { borderColor: '#E5E3DD' }}
          >
            {dim.flagged && <div className="h-1 w-full" style={{ backgroundColor: color }} />}
            <div className="p-8">
              {dim.flagged && (
                <span className="inline-block text-xs tracking-widest uppercase px-2 py-1 rounded-full border text-white text-[10px] mb-4"
                  style={{ backgroundColor: color, borderColor: color }}>
                  Flagged dimension
                </span>
              )}
              <div className="flex items-end gap-4 mb-4">
                <h3 className="text-3xl text-[#1A1614]" style={{ fontWeight: 300 }}>{dim.name}</h3>
                <p className="text-2xl tabular-nums mb-0.5" style={{ color, fontWeight: 300 }}>{dim.score}</p>
                <p className="text-sm text-[#8B8682] mb-1">{dim.band}</p>
              </div>
              <ScoreBar value={dim.score} color={color} />
              <div className="mt-5 space-y-4">
                {dim.text.split('\n\n').map((para, i) => (
                  <p key={i} className="text-[#1A1614] leading-relaxed text-sm" style={{ fontWeight: 300 }}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Sub-components ──

interface MiniDimCardProps {
  name: string;
  score: number;
  band: string;
  color: string;
  flagged: boolean;
}

function MiniDimCard({ name, score, band, color, flagged }: MiniDimCardProps) {
  return (
    <div className={`rounded-xl p-4 border ${flagged ? '' : 'border-[#E5E3DD] bg-[#FAFAF9]'}`}
      style={flagged ? { borderColor: `${color}40`, backgroundColor: `${color}08` } : {}}>
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm text-[#1A1614]" style={{ fontWeight: 500 }}>{name}</p>
        {flagged && (
          <span className="text-[10px] tracking-widest uppercase px-1.5 py-0.5 rounded text-white"
            style={{ backgroundColor: color }}>
            flagged
          </span>
        )}
      </div>
      <p className="text-3xl tabular-nums mb-1" style={{ color, fontWeight: 300 }}>{score}</p>
      <p className="text-xs text-[#8B8682]">{band}</p>
      <div className="mt-3">
        <ScoreBar value={score} color={color} thin />
      </div>
    </div>
  );
}

interface ScoreBarProps {
  value: number;
  color: string;
  thin?: boolean;
}

function ScoreBar({ value, color, thin }: ScoreBarProps) {
  return (
    <div className={`w-full rounded-full bg-[#F0EEEA] overflow-hidden ${thin ? 'h-1' : 'h-1.5'}`}>
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  );
}

interface AlignNumProps {
  label: string;
  value: number;
  color: string;
  highlight?: boolean;
}

function AlignNum({ label, value, color, highlight }: AlignNumProps) {
  return (
    <div className={`text-center rounded-xl p-4 ${highlight ? 'bg-white border' : ''}`}
      style={highlight ? { borderColor: `${color}30` } : {}}>
      <p className="text-xs tracking-widest uppercase text-[#8B8682] mb-1">{label}</p>
      <p className="text-3xl tabular-nums" style={{ color, fontWeight: 300 }}>{value}</p>
    </div>
  );
}
