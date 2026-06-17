import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mountain, ArrowLeft, ArrowRight } from 'lucide-react';

const SERIF = '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif';

const DC = '#E8551D'; // Challenge

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

function fillPts(
  tx: number, ty: number,
  b1x: number, b1y: number,
  b2x: number, b2y: number,
  pct: number
): string {
  return [
    [tx, ty],
    [lerp(tx, b1x, pct), lerp(ty, b1y, pct)],
    [lerp(tx, b2x, pct), lerp(ty, b2y, pct)],
  ].map(([x, y]) => `${(x as number).toFixed(1)},${(y as number).toFixed(1)}`).join(' ');
}

export function YourShape() {
  const [step, setStep] = useState(0);

  const carouselSteps = [
    {
      title: "A high peak with balanced foundations.",
      body: "Your mind reaches high. When paired with grounded felt and expressed foundations, you can turn vision into legacy."
    },
    {
      title: "Heavy Lifting",
      body: "One domain rising clearly above the other two. Challenge is doing structural work the other domains cannot currently carry, and the gap between the apex and the base is wide enough to name."
    },
    {
      title: "Where You Feel Yourself",
      body: "You tend to feel most yourself at the apex. The peak generates the significance, momentum, and sense of direction that neither Safety nor Play can supply right now."
    },
    {
      title: "A Particular Fatigue",
      body: "From the outside, this reads as high performance. From the inside, it produces fatigue—not from working hard, but from asking a single domain to do work it was not designed to finish alone."
    }
  ];

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

      {/* Dual column */}
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Column */}
        <div className="space-y-4">
          <h2 style={{ fontFamily: SERIF, fontSize: '2rem', fontWeight: 500, color: '#0F0F0F', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            A Sharp Peak
          </h2>
          <p style={{ fontSize: '16px', color: '#1A1614', lineHeight: 1.7, fontWeight: 300 }}>
            One domain rising clearly above the other two. Challenge sits at the apex; Safety and Play run quietly below.
          </p>
        </div>

        {/* Right Column: Shape Graphic */}
        <div className="flex justify-center lg:justify-end">
          <svg viewBox="0 0 200 240" className="w-full max-w-[280px] h-auto overflow-visible">
            {/* Dashed outer diamond — full potential outline */}
            <polygon
              points="100,8 192,126 100,234 8,126"
              fill="none"
              stroke="#C8C5BF"
              strokeWidth="1"
              strokeDasharray="4 3"
            />
            {/* Inner dividing lines */}
            <line x1="100" y1="8"   x2="100" y2="126" stroke="#C8C5BF" strokeWidth="0.7" strokeDasharray="3 3" />
            <line x1="8"   y1="126" x2="100" y2="126" stroke="#C8C5BF" strokeWidth="0.7" strokeDasharray="3 3" />
            <line x1="192" y1="126" x2="100" y2="126" stroke="#C8C5BF" strokeWidth="0.7" strokeDasharray="3 3" />
            <line x1="100" y1="126" x2="100" y2="234" stroke="#C8C5BF" strokeWidth="0.7" strokeDasharray="3 3" />

            {/* Challenge — Filled only for the domain itself */}
            <polygon points="100,8 8,126 192,126"       fill={DC} fillOpacity="0.07" />
            <polygon points={fillPts(100, 8, 8, 126, 192, 126, 0.78)} fill={DC} fillOpacity="0.9" />

            {/* Labels */}
            <text x="100" y="80"  textAnchor="middle" fill="white" fontSize="7.5" fontWeight="600" letterSpacing="1.5" opacity="0.9">HIGH</text>
            <text x="57"  y="172" textAnchor="middle" fill="#8B8682" fontSize="6.5" fontWeight="600" letterSpacing="1"   opacity="0.9">VERY LOW</text>
            <text x="143" y="172" textAnchor="middle" fill="#8B8682" fontSize="7"   fontWeight="600" letterSpacing="1"   opacity="0.9">LOW</text>
          </svg>
        </div>
      </div>

      {/* Interactive Shape Box */}
      <div className="max-w-4xl bg-[#EBE5DA] rounded-2xl p-8 lg:p-10 border border-[#DCD6CA] mt-10 relative overflow-hidden">
        <div className="relative min-h-[360px] md:min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 grid md:grid-cols-2 gap-8 md:gap-12 z-10"
            >
              {/* Vertical dividing line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[#D4CEBf]" style={{ transform: 'translateX(-50%)' }} />

              {/* Left Column */}
              <div className="flex flex-col justify-start md:justify-center pr-4">
                <h3 className="font-bold text-[#1A1614] text-[12px] tracking-[0.15em] uppercase mb-4 text-[#1A1614]/70">Your current shape</h3>
                <p className="text-[24px] font-medium leading-[1.3]" style={{ fontFamily: SERIF, color: '#0F0F0F' }}>
                  {carouselSteps[step].title}
                </p>
              </div>

              {/* Right Column */}
              <div className="flex flex-col justify-start md:justify-center pl-0 md:pl-4">
                <div className="mb-5 hidden md:block">
                  <div className="w-11 h-11 rounded-full bg-[#FDFCFA] flex items-center justify-center border border-[#DCD6CA] shadow-sm text-[#E8551D]">
                    <Mountain size={20} strokeWidth={2.5} />
                  </div>
                </div>
                <p style={{ fontSize: '15px', color: '#1A1614', lineHeight: 1.7, fontWeight: 300 }}>
                  {carouselSteps[step].body}
                </p>
              </div>
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
            {/* hairline behind the dots */}
            <div className="absolute left-1 right-1 top-1/2 h-px -translate-y-1/2 bg-[#D4CEBF]" />
            <div className="relative flex items-center gap-[18px]">
              {carouselSteps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStep(i)}
                  className="p-2 -m-2"
                  aria-label={`Go to ${i + 1} of ${carouselSteps.length}`}
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
            onClick={() => setStep(s => Math.min(carouselSteps.length - 1, s + 1))}
            disabled={step === carouselSteps.length - 1}
            className={`flex items-center gap-2 rounded-[10px] px-5 py-2.5 text-[12px] font-bold tracking-[0.1em] uppercase text-white transition-all ${
              step === carouselSteps.length - 1
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
