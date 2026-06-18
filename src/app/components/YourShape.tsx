import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mountain, Layers, Sparkles, Activity, Compass, BatteryLow,
  ArrowLeft, ArrowRight,
} from 'lucide-react';

const SERIF = '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif';

// Three solid domain sections — Challenge highlighted, Safety + Play neutral.
const CH = '#E8551D';        // Challenge — highlighted
const SAFETY_FILL = '#CBC5B9';
const PLAY_FILL = '#B4AD9F';

// Mirror helper — section 2 shows the symbol flipped (Safety left, Play right).
const MX = (x: number) => 998 - x;

// Tone palette for the info pieces.
const TONE: Record<string, string> = {
  neutral: '#8B8682',
  good: '#2F8F79',
  note: '#B26A1C',
  cost: '#DC4C0C',
};

type Piece = { kicker: string; tone: keyof typeof TONE; body: string; Icon: typeof Mountain };

// Six pieces of information across three steps — left/right, surface → deep.
const beats: { left: Piece; right: Piece }[] = [
  {
    left:  { kicker: 'The Shape',        tone: 'neutral', Icon: Mountain, body: 'The Sharp Peak — one domain standing clearly above the other two.' },
    right: { kicker: 'The Architecture', tone: 'neutral', Icon: Layers,   body: 'Challenge holds the apex; Safety and Play form the base beneath it.' },
  },
  {
    left:  { kicker: "What's Working", tone: 'good', Icon: Sparkles, body: 'Your peak is a genuine resource — it generates the direction, momentum, and significance the other two domains cannot supply right now.' },
    right: { kicker: 'Heavy Lifting',  tone: 'note', Icon: Activity, body: 'Challenge is doing structural work the other domains cannot currently carry. The gap between apex and base is wide enough to name.' },
  },
  {
    left:  { kicker: 'Where You Feel Yourself', tone: 'neutral', Icon: Compass,    body: 'You tend to feel most yourself at the apex. For now, that peak is where your sense of self lives.' },
    right: { kicker: 'A Particular Fatigue',    tone: 'cost',    Icon: BatteryLow, body: 'From the outside this reads as high performance. From the inside it produces fatigue — from asking a single domain to finish work it was not designed to carry alone.' },
  },
];

function InfoPiece({ piece }: { piece: Piece }) {
  const color = TONE[piece.tone];
  const { Icon } = piece;
  return (
    <div className="md:px-2">
      <div className="flex items-center gap-2 mb-3" style={{ color }}>
        <Icon size={18} strokeWidth={2.25} />
        <span className="text-[12px] font-bold tracking-[0.12em] uppercase">{piece.kicker}</span>
      </div>
      <p style={{ fontSize: '15.5px', color: '#1A1614', lineHeight: 1.7, fontWeight: 300 }}>
        {piece.body}
      </p>
    </div>
  );
}

export function YourShape() {
  const [step, setStep] = useState(0);

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <p style={{ color: '#DC4C0C', fontWeight: 800, letterSpacing: '0.06em', fontSize: '14px', marginBottom: '30px' }}>03</p>
        <h1 style={{ fontFamily: SERIF, fontWeight: 600, letterSpacing: '-0.03em', fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', color: '#0F0F0F', marginBottom: '30px' }}>
          Your Shape
        </h1>
        <div style={{ width: '40px', height: '3px', backgroundColor: '#DC4C0C', marginTop: '30px', marginBottom: '32px' }} />
      </div>

      {/* Dual column — heading + description on the left, the shape on the right */}
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Column */}
        <div className="space-y-6">
          <h2 style={{
            fontFamily: SERIF,
            fontSize: 'clamp(2.4rem, 4.6vw, 3.4rem)',
            fontWeight: 600,
            color: '#0F0F0F',
            letterSpacing: '-0.035em',
            lineHeight: 1.05,
          }}>
            A Sharp Peak
          </h2>
          <p style={{ fontSize: '17px', color: '#1A1614', lineHeight: 1.7, fontWeight: 300 }}>
            Challenge rises clearly above Safety and Play — a profile built for reach and direction, carried by a narrower base than it deserves.
          </p>
        </div>

        {/* Right Column: the Dimensional symbol as three solid sections */}
        <div className="flex justify-center lg:justify-end">
          <svg viewBox="0 0 998 880" className="w-full max-w-[460px] h-auto overflow-visible">
            {/* ── The symbol (mirrored to match section 2) ── */}
            <g transform="translate(998,0) scale(-1,1)">
              {/* Play — neutral, one solid section */}
              <path d="M500.539 690.557L450.496 604.111L0 864H400.307L600.768 517.419L500.539 690.557Z" fill={PLAY_FILL} />
              <path d="M200.155 517.419L0 864L450.496 604.111L400.307 517.419H200.155Z" fill={PLAY_FILL} />
              {/* Safety — neutral, one solid section */}
              <path d="M597.693 863.691H998L549.849 605.382L500.539 690.557L401.847 520.078L397.232 517.419L597.693 863.691Z" fill={SAFETY_FILL} />
              <path d="M600.768 517.419L549.849 605.382L998 863.691L797.848 517.419H600.768Z" fill={SAFETY_FILL} />
              <path d="M401.847 520.078L400.307 517.419H397.232L401.847 520.078Z" fill={SAFETY_FILL} />
              {/* Challenge — highlighted, one solid section */}
              <path d="M500.533 -2L300.381 344.272L400.61 517.41L400.616 517.419H500.533L500.539 -2H500.533Z" fill={CH} />
              <path d="M500.533 517.419H600.756L700.994 344.272L500.533 -2V517.419Z" fill={CH} />
            </g>

            {/* ── Readouts (un-mirrored so text is upright) ── */}
            {/* Challenge — high, inside the coloured peak */}
            <text x={MX(500)} y="220" textAnchor="middle" fill="#FFFFFF" fontSize="20" fontWeight="700" letterSpacing="2.5" opacity="0.95">CHALLENGE</text>
            <text x={MX(500)} y="300" textAnchor="middle" fill="#FFFFFF" fontSize="68" fontWeight="700" letterSpacing="-1">78</text>
            <text x={MX(500)} y="342" textAnchor="middle" fill="#FFFFFF" fontSize="22" fontWeight="600" opacity="0.92">High</text>

            {/* Safety — low, on the neutral left leg */}
            <text x={MX(700)} y="650" textAnchor="middle" fill="#5C574F" fontSize="24" fontWeight="700" letterSpacing="2">SAFETY</text>
            <text x={MX(700)} y="716" textAnchor="middle" fill="#3D3833" fontSize="56" fontWeight="700" letterSpacing="-1">27</text>
            <text x={MX(700)} y="750" textAnchor="middle" fill="#6A6560" fontSize="22" fontWeight="600">Very Low</text>

            {/* Play — low, on the neutral right leg */}
            <text x={MX(280)} y="650" textAnchor="middle" fill="#5C574F" fontSize="24" fontWeight="700" letterSpacing="2">PLAY</text>
            <text x={MX(280)} y="716" textAnchor="middle" fill="#3D3833" fontSize="56" fontWeight="700" letterSpacing="-1">41</text>
            <text x={MX(280)} y="750" textAnchor="middle" fill="#6A6560" fontSize="22" fontWeight="600">Low</text>
          </svg>
        </div>
      </div>

      {/* Info box — left / right pieces, lighter & borderless */}
      <div className="max-w-4xl bg-[#F4F1EA] rounded-2xl p-8 lg:p-10 mt-10 relative overflow-hidden">
        <div className="relative min-h-[210px] md:min-h-[150px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-10 grid md:grid-cols-2 gap-8 md:gap-12"
            >
              {/* Vertical divider */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[#E2DBCC]" style={{ transform: 'translateX(-50%)' }} />
              <InfoPiece piece={beats[step].left} />
              <InfoPiece piece={beats[step].right} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-9 pt-2 flex items-center justify-center gap-7 relative z-10">
          {/* Previous — ghost button */}
          <button
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            className={`group flex items-center gap-2 rounded-[10px] border px-5 py-2.5 text-[12px] font-bold tracking-[0.1em] uppercase transition-all ${
              step === 0
                ? 'border-[#E4DFD5] text-[#C8C5BF] cursor-not-allowed'
                : 'border-[#D4CEBF] text-[#1A1614] hover:border-[#E8551D] hover:text-[#E8551D]'
            }`}
          >
            <ArrowLeft size={15} strokeWidth={2.5} />
            Previous
          </button>

          {/* Connected dot track */}
          <div className="relative flex items-center" aria-hidden="true">
            <div className="absolute left-1 right-1 top-1/2 h-px -translate-y-1/2 bg-[#D4CEBF]" />
            <div className="relative flex items-center gap-[18px]">
              {beats.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStep(i)}
                  className="p-2 -m-2"
                  aria-label={`Go to ${i + 1} of ${beats.length}`}
                >
                  <div
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      i === step
                        ? 'w-6 bg-[#E8551D]'
                        : 'w-2.5 bg-[#D4CEBF] hover:bg-[#B9B3A6]'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Next — filled orange button */}
          <button
            onClick={() => setStep(s => Math.min(beats.length - 1, s + 1))}
            disabled={step === beats.length - 1}
            className={`flex items-center gap-2 rounded-[10px] px-5 py-2.5 text-[12px] font-bold tracking-[0.1em] uppercase text-white transition-all ${
              step === beats.length - 1
                ? 'bg-[#E8551D]/40 cursor-not-allowed'
                : 'bg-[#E8551D] hover:bg-[#D14A16] shadow-sm hover:shadow'
            }`}
          >
            Next
            <ArrowRight size={15} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
