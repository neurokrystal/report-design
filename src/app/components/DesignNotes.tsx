import { motion } from 'motion/react';

const SERIF = '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif';

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
