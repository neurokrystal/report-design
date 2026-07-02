import { motion } from 'motion/react';
import { DOMAIN_HEX_OUTLINES, getScoreFillPath } from '../data/symbolFillPaths';

const SERIF = '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif';
const SAFETY = '#42A68E';
const CHALLENGE = '#DC4C0C';
const PLAY = '#FFAB00';

const SHAPES = [
  {
    name: 'Sharp peak',
    body: 'One domain rises clearly above the other two. The design should pull attention to the apex without erasing the base.',
    values: [27, 41, 78],
  },
  {
    name: 'Dual engine',
    body: 'Two domains carry the profile together while one remains small. The visual family should show two active engines and one quiet base.',
    values: [72, 68, 28],
  },
  {
    name: 'Balance',
    body: 'All three domains sit close together. This can be balanced high, balanced mid, or balanced low depending on the absolute level.',
    values: [58, 55, 61],
  },
  {
    name: 'Depleted',
    body: 'A balanced-low profile. The three domains are harmonious, but the whole structure is under-resourced.',
    values: [26, 29, 24],
  },
  {
    name: 'Steps',
    body: 'The distance between low, middle, and high is roughly even. The shape should feel like a readable progression.',
    values: [31, 54, 77],
  },
];

const LEVELS = ['Very low', 'Low', 'Almost balanced', 'Balanced', 'Excess'];

const SHAPE_EXPERIMENTS = [
  {
    name: 'Sharp peak radial',
    note: 'A central field with one tall spike. Useful when the shape needs to feel immediate and kinetic.',
    variant: 'sharp',
  },
  {
    name: 'Dual engine',
    note: 'Two strong arcs operate together while the third remains visibly under-built.',
    variant: 'dual',
  },
  {
    name: 'Steps',
    note: 'A stepped skyline shows adaptation and movement from one foundation to the next.',
    variant: 'steps',
  },
  {
    name: 'Balanced high / mid',
    note: 'An even ring can show balance without making all balanced profiles feel identical.',
    variant: 'balance',
  },
  {
    name: 'Depleted',
    note: 'A low but alive centre avoids making the reader feel like the profile is empty.',
    variant: 'depleted',
  },
];

const BLIND_SPOT_OPTIONS = [
  {
    name: 'X-ray layer',
    note: 'The visible Sharp Peak stays intact while a translucent inner layer slides behind it, showing that the hidden load sits under the apex rather than across the full base.',
    variant: 'xray',
  },
  {
    name: 'Missing counterweights',
    note: 'Challenge is held by a strong central line while Safety and Play remain light. The reader can see why the structure feels powerful but does not have much counterbalance.',
    variant: 'counterweight',
  },
];

const SECTION_THREE_GRAPHIC_STATES = [
  { name: 'Your shape', state: 'shape' },
  { name: 'How you move', state: 'move' },
  { name: 'Your blind spot', state: 'blind' },
  { name: 'Pathways', state: 'paths' },
] as const;

const RADAR_PROTOTYPES = [
  {
    name: 'Harmonious Depleted',
    label: 'even, close to the centre',
    scores: { Safety: 24, Challenge: 27, Play: 25 },
    copy: 'The triangle keeps its symmetry, but it sits close to the centre. The form reads as harmonious without pretending the system has much available range.',
    note: 'This tests whether the radar can make low harmony feel distinct from imbalance, rather than visually collapsing into an empty shape.',
  },
  {
    name: 'Harmonious Mid',
    label: 'even, moderate reach',
    scores: { Safety: 56, Challenge: 58, Play: 54 },
    copy: 'The form stays even, but it sits in the middle rings. It reads as steadiness across the system without implying high capacity.',
    note: 'This is the real test: if the even mid triangle feels distinct from a high or depleted one, the radar earns its place.',
  },
  {
    name: 'Harmonious High',
    label: 'even, wide reach',
    scores: { Safety: 82, Challenge: 85, Play: 80 },
    copy: 'The shape stays balanced while expanding toward the outer rings. It should feel resourced and spacious without becoming a generic success badge.',
    note: 'The visual question is whether size alone can separate high harmony from mid harmony while keeping both clearly balanced.',
  },
  {
    name: 'Dual Engine',
    label: 'two axes extended',
    scores: { Safety: 74, Challenge: 78, Play: 31 },
    copy: 'Two domains reach outward together while Play stays closer in. The radar turns the profile into a kite, making the missing third support immediately visible.',
    note: 'This should read as powered by two sources, not as a Sharp Peak with a slightly better base.',
  },
  {
    name: 'Steps',
    label: 'three different reach lengths',
    scores: { Safety: 32, Challenge: 78, Play: 55 },
    copy: 'Each axis lands at a different distance from the centre. The result is neither balanced nor sharply peaked, but a clear progression from quieter to stronger domains.',
    note: 'The useful test here is whether the lean feels intentional and readable, rather than like an accidental uneven triangle.',
  },
  {
    name: 'Sharp Peak',
    label: 'one axis pulls forward',
    scores: { Safety: 27, Challenge: 78, Play: 41 },
    copy: 'Challenge reaches outward while Safety and Play sit closer to the centre. The profile becomes a lopsided spike rather than three separate blocks.',
    note: 'This should still read clearly, but it is less important than whether the quieter shapes become legible.',
  },
];

export function DesignNotes() {
  return (
    <section className="space-y-10">
      <div>
        <p className="mb-8 text-sm font-extrabold tracking-[0.06em] text-[#DC4C0C]">10</p>
        <h1 style={{ fontFamily: SERIF, fontWeight: 600, letterSpacing: '-0.03em', fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', color: '#0F0F0F', margin: 0 }}>
          Design Notes
        </h1>
        <div className="mt-8 h-[3px] w-10 bg-[#DC4C0C]" />
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
        {SHAPES.map((shape, index) => (
          <motion.article
            key={shape.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: index * 0.04 }}
            className="rounded-[24px] border border-[#E6E0D6] bg-white p-5 shadow-[0_18px_42px_-38px_rgba(26,22,20,0.45)]"
          >
            <ShapeMini values={shape.values} />
            <h2 className="mt-5" style={{ fontFamily: SERIF, fontSize: 26, lineHeight: 1, color: '#15110F' }}>{shape.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#5C574F]" style={{ fontWeight: 300 }}>{shape.body}</p>
          </motion.article>
        ))}
      </div>

      <div className="overflow-hidden rounded-[32px] bg-[#1E222E] p-6 text-white shadow-[0_32px_90px_-70px_rgba(26,22,20,0.85)] md:p-8">
        <div className="grid gap-5 md:grid-cols-[0.42fr_0.58fr] md:items-end">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#48E3D5]">Shape visual experiments</p>
            <h2 className="mt-3" style={{ fontFamily: SERIF, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', lineHeight: 1.02 }}>
              Alternate graphic language for the shape family.
            </h2>
          </div>
          <p className="max-w-xl text-[15px] leading-relaxed text-white/68" style={{ fontWeight: 300 }}>
            These are exploratory directions for testing whether a radial, spiked, or skyline system communicates the ten shape types more clearly than the current domain-symbol view.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {SHAPE_EXPERIMENTS.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.42, delay: index * 0.04 }}
              className="rounded-[24px] border border-white/10 bg-white/[0.055] p-4"
            >
              <ShapeExperiment variant={item.variant} />
              <h3 className="mt-4 text-[18px] leading-tight text-white" style={{ fontFamily: SERIF }}>{item.name}</h3>
              <p className="mt-3 text-[13px] leading-relaxed text-white/60" style={{ fontWeight: 300 }}>{item.note}</p>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="grid gap-8 rounded-[32px] border border-[#E6DED2] bg-[#FCF8F1] p-7 shadow-[0_30px_86px_-72px_rgba(26,22,20,0.48)] md:grid-cols-[0.38fr_0.62fr] md:p-8">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#DC4C0C]">Blind-spot options</p>
          <h2 className="mt-3" style={{ fontFamily: SERIF, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', lineHeight: 1.02, color: '#15110F' }}>
            Two ways to show the hidden load.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#4D4945]" style={{ fontWeight: 300 }}>
            These are alternate concepts for the third state if the tilting-platform version still feels too literal or unstable in the wrong way.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {BLIND_SPOT_OPTIONS.map((option, index) => (
            <motion.article
              key={option.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.42, delay: index * 0.05 }}
              className="rounded-[28px] border border-[#E6D9CA] bg-white/78 p-5"
            >
              <BlindSpotOptionSketch variant={option.variant} />
              <h3 className="mt-5" style={{ fontFamily: SERIF, fontSize: 26, lineHeight: 1, color: '#15110F' }}>{option.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#5C574F]" style={{ fontWeight: 300 }}>{option.note}</p>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-[34px] border border-[#E6DED2] bg-[#FFFCF7] p-7 shadow-[0_34px_95px_-78px_rgba(26,22,20,0.58)] md:p-9">
        <div className="grid gap-6 md:grid-cols-[0.38fr_0.62fr] md:items-end">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#DC4C0C]">Section 3 archive</p>
            <h2 className="mt-3" style={{ fontFamily: SERIF, fontSize: 'clamp(1.85rem, 3.2vw, 2.7rem)', lineHeight: 1.02, color: '#15110F' }}>
              The previous block-state graphics.
            </h2>
          </div>
          <p className="max-w-2xl text-[15.5px] leading-relaxed text-[#4D4945]" style={{ fontWeight: 300 }}>
            These preserve the graphic language that was previously inside Section 3, so the block-based direction remains available for comparison while the live section uses radar.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {SECTION_THREE_GRAPHIC_STATES.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="rounded-[30px] border border-[#E5D8C8] bg-white/78 p-5"
            >
              <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8B8278]">{item.name}</p>
              <LegacySectionThreeGraphic state={item.state} />
            </motion.article>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-[34px] border border-[#E6DED2] bg-[#FFFCF7] p-7 shadow-[0_34px_95px_-78px_rgba(26,22,20,0.58)] md:p-9">
        <div className="grid gap-6 md:grid-cols-[0.38fr_0.62fr] md:items-end">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#DC4C0C]">Radar shape prototype</p>
            <h2 className="mt-3" style={{ fontFamily: SERIF, fontSize: 'clamp(1.85rem, 3.2vw, 2.7rem)', lineHeight: 1.02, color: '#15110F' }}>
              Testing one grammar across quiet and dramatic shapes.
            </h2>
          </div>
          <p className="max-w-2xl text-[15.5px] leading-relaxed text-[#4D4945]" style={{ fontWeight: 300 }}>
            This sandbox keeps the wider radar family visible while Section 3 uses the Sharp Peak version. It tests whether a three-axis radar can make the quiet, even, stepped, dual, and sharply imbalanced profiles feel distinct.
          </p>
        </div>

        <div className="mt-8 grid gap-5">
          {RADAR_PROTOTYPES.map((profile, index) => (
            <motion.article
              key={profile.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="grid gap-6 rounded-[30px] border border-[#E5D8C8] bg-white/78 p-5 md:grid-cols-[0.42fr_0.58fr] md:p-6"
            >
              <div className="flex flex-col justify-center">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8B8278]">{profile.label}</p>
                  <h3 className="mt-3" style={{ fontFamily: SERIF, fontSize: 'clamp(1.8rem, 3vw, 2.45rem)', lineHeight: 1, color: '#15110F' }}>
                    {profile.name}
                  </h3>
                  <p className="mt-5 text-[15px] leading-relaxed text-[#3F3A35]" style={{ fontWeight: 300 }}>
                    {profile.copy}
                  </p>
                  <p className="mt-5 border-l border-[#E2D7CA] pl-4 text-[13.5px] leading-relaxed text-[#6A6259]" style={{ fontWeight: 300 }}>
                    {profile.note}
                  </p>
                </div>
              </div>
              <RadarShape scores={profile.scores} />
            </motion.article>
          ))}
        </div>
      </div>

      <div className="grid gap-8 rounded-[28px] bg-[#F8F6F1] p-7 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] font-bold text-[#8B8682]">Level indicator handoff</p>
          <h2 className="mt-3" style={{ fontFamily: SERIF, fontSize: 'clamp(1.7rem, 3vw, 2.25rem)', lineHeight: 1.05, color: '#15110F' }}>
            Five marks show level at a glance.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#4D4945]" style={{ fontWeight: 300 }}>
            The level chip uses five rising marks. They represent very low, low, almost balanced, balanced, and excess, without printing those labels inside the card.
          </p>
        </div>
        <div className="rounded-[24px] bg-white p-6">
          <div className="flex items-end gap-4">
            {LEVELS.map((level, index) => (
              <div key={level} className="flex flex-1 flex-col items-center gap-3">
                <motion.div
                  className="w-full rounded-full"
                  style={{
                    height: 20 + index * 14,
                    backgroundColor: index < 2 ? '#42A68E' : index === 2 ? '#FFAB00' : index === 3 ? '#7B8D76' : '#DC4C0C',
                    opacity: index === 3 ? 0.9 : 0.72,
                  }}
                  initial={{ scaleY: 0.3, opacity: 0 }}
                  whileInView={{ scaleY: 1, opacity: index === 3 ? 0.9 : 0.72 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                />
                <p className="text-center text-[10px] uppercase tracking-[0.08em] font-bold text-[#8B8682]">{level}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type RadarScores = {
  Safety: number;
  Challenge: number;
  Play: number;
};

type SectionThreeArchiveState = (typeof SECTION_THREE_GRAPHIC_STATES)[number]['state'];

function LegacySectionThreeGraphic({ state }: { state: SectionThreeArchiveState }) {
  if (state === 'paths') {
    return <LegacyPathwaysGraphic />;
  }

  const fills = {
    Safety: getScoreFillPath('Safety', 27),
    Play: getScoreFillPath('Play', 41),
    Challenge: getScoreFillPath('Challenge', 78),
  };
  const isMove = state === 'move';
  const isBlind = state === 'blind';
  const safetyOpacity = state === 'shape' ? 0.88 : isBlind ? 0.32 : 0.24;
  const playOpacity = state === 'shape' ? 0.84 : isBlind ? 0.32 : 0.24;
  const challengeOpacity = isMove ? 0.58 : 1;

  return (
    <div className="relative mt-5 overflow-hidden rounded-[24px] bg-[#F8F3EB] p-4">
      <svg viewBox="0 0 409 356" className="h-[280px] w-full overflow-visible" aria-hidden="true">
        <defs>
          <filter id={`legacyShapeDrop-${state}`} x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#1A1614" floodOpacity="0.13" />
          </filter>
          <radialGradient id={`legacyPeakAura-${state}`} cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#F2551A" stopOpacity="0.34" />
            <stop offset="0.45" stopColor="#FFBB30" stopOpacity="0.15" />
            <stop offset="1" stopColor="#F2551A" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`legacyBlindShadow-${state}`} x1="190" x2="352" y1="186" y2="317" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1A1614" stopOpacity="0.18" />
            <stop offset="0.58" stopColor="#1A1614" stopOpacity="0.08" />
            <stop offset="1" stopColor="#1A1614" stopOpacity="0" />
          </linearGradient>
        </defs>

        {state === 'shape' && (
          <g>
            <motion.circle
              cx="204.5"
              cy="60"
              r="78"
              fill={`url(#legacyPeakAura-${state})`}
              animate={{ r: [34, 74, 34], opacity: [0.85, 0.16, 0.85] }}
              transition={{ duration: 5.1, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.circle
              cx="204.5"
              cy="60"
              r="58"
              fill="none"
              stroke="#F2551A"
              strokeWidth="1.4"
              strokeOpacity="0.34"
              animate={{ r: [22, 52, 22], opacity: [0.5, 0.09, 0.5] }}
              transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </g>
        )}

        {isMove && (
          <g>
            <circle cx="204.5" cy="198" r="23" fill="#FFF8F0" stroke="#E8D9CC" strokeWidth="1.3" />
            <path d="M204.5 198 C186 216 157 239 112 272" fill="none" stroke="#9ECABD" strokeWidth="3.2" strokeLinecap="round" strokeOpacity="0.52" />
            <path d="M204.5 198 C225 218 256 240 304 272" fill="none" stroke="#E7C879" strokeWidth="3.2" strokeLinecap="round" strokeOpacity="0.52" />
            <path d="M204.5 198 C204 157 204 112 204.5 60" fill="none" stroke="#FFF6E8" strokeWidth="7.8" strokeLinecap="round" strokeOpacity="0.8" />
            <path d="M204.5 198 C204 157 204 112 204.5 60" fill="none" stroke="#F2551A" strokeWidth="3.8" strokeLinecap="round" strokeOpacity="0.92" />
          </g>
        )}

        {isBlind && (
          <g>
            <motion.path
              d="M174 199 C232 244 290 282 358 313 L318 327 C263 294 216 258 185 221 Z"
              fill={`url(#legacyBlindShadow-${state})`}
              animate={{ opacity: [0.62, 0.95, 0.62], x: [0, 6, 0] }}
              transition={{ duration: 5.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <ellipse cx="207" cy="290" rx="82" ry="17" fill="#1A1614" opacity="0.05" />
          </g>
        )}

        <g filter={`url(#legacyShapeDrop-${state})`}>
          <path d={DOMAIN_HEX_OUTLINES.Safety} fill="none" stroke="#D8D0C5" strokeWidth="1.15" opacity={state === 'shape' || isBlind ? 0 : 0.16} />
          <path d={DOMAIN_HEX_OUTLINES.Play} fill="none" stroke="#D8D0C5" strokeWidth="1.15" opacity={state === 'shape' || isBlind ? 0 : 0.16} />
          <path d={DOMAIN_HEX_OUTLINES.Challenge} fill="none" stroke="#D8D0C5" strokeWidth="1.15" opacity={state === 'shape' || isBlind ? 0 : 0.16} />
          {fills.Safety && <path d={fills.Safety} fill={SAFETY} opacity={safetyOpacity} transform={isMove ? 'translate(-12 8)' : undefined} />}
          {fills.Play && <path d={fills.Play} fill={PLAY} opacity={playOpacity} transform={isMove ? 'translate(12 8)' : undefined} />}
          {fills.Challenge && <path d={fills.Challenge} fill="#F2551A" opacity={challengeOpacity} transform={isMove ? 'translate(0 -8)' : undefined} />}
        </g>

        {isMove && (
          <g>
            <circle cx="204.5" cy="198" r="8.2" fill="#FFF8F0" stroke="#E5DACE" strokeWidth="1.2" />
            <motion.circle
              r="6"
              fill="#FFF8F0"
              stroke="#F2551A"
              strokeWidth="2.4"
              animate={{
                cx: [204.5, 218, 204.5, 191, 204.5, 204.5, 204.5, 204.5],
                cy: [198, 198, 184, 198, 198, 116, 60, 60],
                opacity: [0.55, 0.72, 0.72, 0.72, 0.95, 1, 1, 0],
              }}
              transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut', times: [0, 0.11, 0.22, 0.33, 0.44, 0.72, 0.86, 1] }}
            />
          </g>
        )}

        {isBlind && (
          <g>
            <motion.path
              d="M204.5 56 L204.5 291"
              fill="none"
              stroke="#B96B38"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="6 10"
              strokeOpacity="0.28"
              animate={{ opacity: [0.16, 0.42, 0.16] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.circle
              cx="217"
              cy="210"
              r="22"
              fill="none"
              stroke="#F2551A"
              strokeWidth="1.5"
              strokeOpacity="0.22"
              animate={{ r: [16, 28, 16], opacity: [0.28, 0.08, 0.28] }}
              transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </g>
        )}

        <text x="204.5" y="32" textAnchor="middle" fill={CHALLENGE} fontSize="15" fontWeight="800">Challenge</text>
        <text x="86" y="322" textAnchor="middle" fill={SAFETY} fontSize="15" fontWeight="800">Safety</text>
        <text x="323" y="322" textAnchor="middle" fill={PLAY} fontSize="15" fontWeight="800">Play</text>
      </svg>
    </div>
  );
}

function LegacyPathwaysGraphic() {
  return (
    <div className="relative mt-5 overflow-hidden rounded-[24px] bg-[#F8F3EB] p-5">
      <svg viewBox="0 0 420 280" className="h-[280px] w-full overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id="legacyDoorThread" x1="72" x2="348" y1="62" y2="62" gradientUnits="userSpaceOnUse">
            <stop stopColor={SAFETY} stopOpacity="0.8" />
            <stop offset="0.5" stopColor="#FFBB30" stopOpacity="0.9" />
            <stop offset="1" stopColor={CHALLENGE} stopOpacity="0.76" />
          </linearGradient>
        </defs>
        <circle cx="210" cy="42" r="6" fill="#F8F3EB" stroke="#E6D7C6" strokeWidth="2" />
        <path d="M210 42 C162 54 122 78 78 112" fill="none" stroke="url(#legacyDoorThread)" strokeWidth="2.4" strokeLinecap="round" strokeOpacity="0.52" />
        <path d="M210 42 C210 64 210 84 210 112" fill="none" stroke="url(#legacyDoorThread)" strokeWidth="2.4" strokeLinecap="round" strokeOpacity="0.48" />
        <path d="M210 42 C258 54 298 78 342 112" fill="none" stroke="url(#legacyDoorThread)" strokeWidth="2.4" strokeLinecap="round" strokeOpacity="0.52" />
        <motion.circle
          r="5"
          fill="#FFBB30"
          animate={{
            cx: [210, 78, 210, 210, 210, 342, 210],
            cy: [42, 112, 42, 112, 42, 112, 42],
            opacity: [0.22, 0.88, 0.22, 0.88, 0.22, 0.88, 0.22],
          }}
          transition={{ duration: 8.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        {[
          { x: 28, label: 'Safety', color: SAFETY },
          { x: 160, label: 'Play', color: PLAY },
          { x: 292, label: 'Challenge', color: CHALLENGE },
        ].map(item => (
          <g key={item.label}>
            <path d={`M${item.x} 244 L${item.x} 174 C${item.x} 126 ${item.x + 100} 126 ${item.x + 100} 174 L${item.x + 100} 244 Z`} fill="#FFFCF7" stroke="#E2D5C5" strokeWidth="1.4" />
            <circle cx={item.x + 50} cy="170" r="13" fill={item.color} opacity="0.13" />
            <text x={item.x + 50} y="218" textAnchor="middle" fill={item.color} fontSize="12" fontWeight="800" letterSpacing="1.4">{item.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function RadarShape({ scores }: { scores: RadarScores }) {
  const centre = 150;
  const maxRadius = 96;
  const axes = [
    { key: 'Challenge', label: 'Challenge', value: scores.Challenge, angle: -90, color: CHALLENGE },
    { key: 'Play', label: 'Play', value: scores.Play, angle: 30, color: PLAY },
    { key: 'Safety', label: 'Safety', value: scores.Safety, angle: 150, color: SAFETY },
  ] as const;

  const point = (angle: number, radius: number) => {
    const radians = (angle * Math.PI) / 180;
    return {
      x: centre + Math.cos(radians) * radius,
      y: centre + Math.sin(radians) * radius,
    };
  };

  const ringPoints = (scale: number) => axes.map(axis => {
    const p = point(axis.angle, maxRadius * scale);
    return `${p.x},${p.y}`;
  }).join(' ');

  const profilePoints = axes.map(axis => {
    const p = point(axis.angle, maxRadius * (axis.value / 100));
    return `${p.x},${p.y}`;
  }).join(' ');

  return (
    <div className="relative overflow-hidden rounded-[28px] bg-[#F8F3EB] p-5 md:p-7">
      <svg viewBox="0 0 300 300" className="mx-auto h-[360px] w-full max-w-[440px] overflow-visible" role="img" aria-label="Three-axis radar shape prototype">
        <defs>
          <filter id={`radarGlow-${scores.Safety}-${scores.Challenge}-${scores.Play}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id={`radarAura-${scores.Safety}-${scores.Challenge}-${scores.Play}`} cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#FFBB30" stopOpacity="0.18" />
            <stop offset="0.62" stopColor="#F2551A" stopOpacity="0.07" />
            <stop offset="1" stopColor="#F2551A" stopOpacity="0" />
          </radialGradient>
        </defs>
        <motion.circle
          cx={centre}
          cy={centre}
          r={maxRadius + 34}
          fill={`url(#radarAura-${scores.Safety}-${scores.Challenge}-${scores.Play})`}
          animate={{ opacity: [0.48, 0.82, 0.48], scale: [0.98, 1.03, 0.98] }}
          transition={{ duration: 6.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: `${centre}px ${centre}px` }}
        />

        {[0.25, 0.5, 0.75, 1].map((scale, index) => (
          <motion.polygon
            key={scale}
            points={ringPoints(scale)}
            fill="none"
            stroke="#D8CEC1"
            strokeWidth="1"
            strokeOpacity={index === 3 ? 0.46 : 0.28}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
            style={{ transformOrigin: `${centre}px ${centre}px` }}
          />
        ))}

        {axes.map((axis, index) => {
          const end = point(axis.angle, maxRadius);
          const plotted = point(axis.angle, maxRadius * (axis.value / 100));
          const label = point(axis.angle, maxRadius + 25);
          return (
            <g key={axis.key}>
              <motion.line
                x1={centre}
                y1={centre}
                x2={end.x}
                y2={end.y}
                stroke={axis.color}
                strokeWidth="1.4"
                strokeOpacity="0.38"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.56, delay: 0.12 + index * 0.08 }}
              />
              <motion.circle
                cx={plotted.x}
                cy={plotted.y}
                r="5.5"
                fill="#FFF8F0"
                stroke={axis.color}
                strokeWidth="2.3"
                initial={{ opacity: 0, scale: 0.4 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.38, delay: 0.55 + index * 0.08 }}
              />
              <text
                x={label.x}
                y={label.y}
                textAnchor={axis.key === 'Challenge' ? 'middle' : axis.key === 'Safety' ? 'end' : 'start'}
                dominantBaseline="middle"
                fill={axis.color}
                fontSize="13"
                fontWeight="800"
                letterSpacing="1.2"
              >
                {axis.label.toUpperCase()}
              </text>
            </g>
          );
        })}

        <motion.g
          initial={{ opacity: 0, scale: 0.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.75, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: `${centre}px ${centre}px` }}
          filter={`url(#radarGlow-${scores.Safety}-${scores.Challenge}-${scores.Play})`}
        >
          <polygon points={profilePoints} fill="#DC4C0C" fillOpacity="0.11" stroke="#1A1614" strokeOpacity="0.36" strokeWidth="1.6" />
          <polygon points={profilePoints} fill="none" stroke="#DC4C0C" strokeOpacity="0.44" strokeWidth="2.2" />
        </motion.g>

        <circle cx={centre} cy={centre} r="4.5" fill="#FFF8F0" stroke="#CFC2B3" strokeWidth="1.4" />
      </svg>
    </div>
  );
}

function BlindSpotOptionSketch({ variant }: { variant: string }) {
  return (
    <svg viewBox="0 0 260 170" className="h-40 w-full overflow-visible" aria-hidden="true">
      <defs>
        <filter id={`blindGlow-${variant}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id={`blindWarm-${variant}`} x1="130" x2="130" y1="20" y2="150" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F2551A" stopOpacity="0.86" />
          <stop offset="1" stopColor="#B96B38" stopOpacity="0.16" />
        </linearGradient>
      </defs>

      {variant === 'xray' && (
        <g>
          <ellipse cx="132" cy="137" rx="84" ry="18" fill="#1A1614" opacity="0.07" />
          <g opacity="0.24" transform="translate(12 12)">
            <path d="M130 18 L166 80 L130 142 L94 80 Z" fill="#B96B38" />
            <path d="M54 138 L94 68 L132 138 Z" fill="#42A68E" />
            <path d="M128 138 L166 68 L206 138 Z" fill="#FFAB00" />
          </g>
          <g filter={`url(#blindGlow-${variant})`}>
            <path d="M130 8 L168 72 L130 136 L92 72 Z" fill="url(#blindWarm-xray)" />
            <path d="M50 136 L92 64 L132 136 Z" fill="#42A68E" opacity="0.34" />
            <path d="M128 136 L168 64 L210 136 Z" fill="#FFAB00" opacity="0.34" />
          </g>
          <path d="M76 125 C104 106 118 94 130 72 C142 94 156 106 184 125" fill="none" stroke="#DC4C0C" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="4 8" opacity="0.42" />
          <circle cx="130" cy="72" r="10" fill="#FFF8F0" stroke="#DC4C0C" strokeOpacity="0.55" />
        </g>
      )}

      {variant === 'counterweight' && (
        <g>
          <path d="M40 132 C82 126 174 126 220 132" fill="none" stroke="#D8D0C5" strokeWidth="2" strokeLinecap="round" />
          <path d="M130 20 L130 134" fill="none" stroke="#DC4C0C" strokeWidth="3" strokeLinecap="round" opacity="0.58" />
          <path d="M130 12 L164 70 L130 128 L96 70 Z" fill="#F2551A" filter={`url(#blindGlow-${variant})`} />
          <path d="M61 130 L96 70 L130 130 Z" fill="#42A68E" opacity="0.2" />
          <path d="M130 130 L164 70 L199 130 Z" fill="#FFAB00" opacity="0.2" />
          <path d="M86 121 C101 112 116 106 130 88 C144 106 159 112 174 121" fill="none" stroke="#A79C90" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="5 8" opacity="0.46" />
          <circle cx="130" cy="134" r="7" fill="#FFF8F0" stroke="#DC4C0C" strokeOpacity="0.6" />
          <circle cx="84" cy="122" r="5" fill="#42A68E" opacity="0.34" />
          <circle cx="176" cy="122" r="5" fill="#FFAB00" opacity="0.34" />
        </g>
      )}
    </svg>
  );
}

function ShapeExperiment({ variant }: { variant: string }) {
  return (
    <svg viewBox="0 0 180 140" className="h-28 w-full overflow-visible" aria-hidden="true">
      <defs>
        <filter id={`noteGlow-${variant}`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {variant === 'sharp' && (
        <g transform="translate(90 72)">
          <circle r="34" fill="none" stroke="#3F4656" strokeWidth="8" />
          <path d="M0 -54 L10 -12 L0 -2 L-10 -12 Z" fill="#48E3D5" filter={`url(#noteGlow-${variant})`} />
          <path d="M-28 28 L-12 8 L0 2 L-10 34 Z" fill="#E3485D" />
          <path d="M28 28 L12 8 L0 2 L10 34 Z" fill="#6B7182" />
        </g>
      )}
      {variant === 'dual' && (
        <g transform="translate(90 72)" fill="none" strokeLinecap="round">
          <path d="M-42 16 A46 46 0 0 1 -9 -43" stroke="#48E3D5" strokeWidth="12" />
          <path d="M42 16 A46 46 0 0 0 9 -43" stroke="#E3485D" strokeWidth="12" />
          <path d="M-18 40 A34 34 0 0 0 18 40" stroke="#6B7182" strokeWidth="8" />
        </g>
      )}
      {variant === 'steps' && (
        <g transform="translate(28 24)">
          {[24, 43, 63, 86].map((height, index) => (
            <rect key={height} x={index * 32} y={92 - height} width="10" height={height} rx="5" fill={index === 3 ? '#48E3D5' : index === 2 ? '#E3485D' : '#6B7182'} />
          ))}
          <path d="M0 90 C38 76 65 78 118 35" fill="none" stroke="#48E3D5" strokeOpacity="0.55" strokeWidth="2" />
        </g>
      )}
      {variant === 'balance' && (
        <g transform="translate(90 72)" fill="none" strokeWidth="10">
          <circle r="42" stroke="#3F4656" />
          <path d="M0 -42 A42 42 0 0 1 36 21" stroke="#48E3D5" />
          <path d="M36 21 A42 42 0 0 1 -36 21" stroke="#E3485D" />
          <path d="M-36 21 A42 42 0 0 1 0 -42" stroke="#6B7182" />
        </g>
      )}
      {variant === 'depleted' && (
        <g transform="translate(90 76)">
          <circle r="18" fill="#48E3D5" opacity="0.18" />
          <circle r="6" fill="#48E3D5" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
            <line
              key={angle}
              x1={Math.cos((angle * Math.PI) / 180) * 25}
              y1={Math.sin((angle * Math.PI) / 180) * 25}
              x2={Math.cos((angle * Math.PI) / 180) * 42}
              y2={Math.sin((angle * Math.PI) / 180) * 42}
              stroke={angle % 90 === 0 ? '#48E3D5' : '#6B7182'}
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.8"
            />
          ))}
        </g>
      )}
    </svg>
  );
}

function ShapeMini({ values }: { values: number[] }) {
  const [safety, play, challenge] = values;
  const opacity = (value: number) => Math.max(0.22, Math.min(1, value / 82));
  return (
    <svg viewBox="0 0 160 130" className="h-28 w-full overflow-visible" aria-hidden="true">
      <path d="M80 6 L114 64 L80 122 L46 64 Z" fill="#DC4C0C" opacity={opacity(challenge)} />
      <path d="M12 118 L52 50 L90 118 Z" fill="#42A68E" opacity={opacity(safety)} />
      <path d="M70 118 L108 50 L148 118 Z" fill="#FFAB00" opacity={opacity(play)} />
      <path d="M80 6 L114 64 L80 122 L46 64 Z M12 118 L52 50 L90 118 M70 118 L108 50 L148 118" fill="none" stroke="#1A1614" strokeOpacity="0.16" strokeWidth="1.4" />
    </svg>
  );
}
