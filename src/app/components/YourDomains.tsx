import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flag, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

import dimensionalLogo from "../../imports/Dimensional_Symbol.svg";

import lowFuture from "../../imports/10__Low_Future.svg";
import lowOthers from "../../imports/10__Low_Others.svg";
import lowPast from "../../imports/10__Low_Past.svg";
import lowPerception from "../../imports/10__Low_Perception.svg";
import lowSelf from "../../imports/10__Low_Self.svg";

import highFuture from "../../imports/50__Future.svg";
import highOthers from "../../imports/50__Others.svg";
import highPast from "../../imports/50__Past.svg";
import highPerception from "../../imports/50__Perception.svg";
import highSelf from "../../imports/50__Self.svg";

const SERIF = '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif';

// Domain palette per brief
const DC = '#E8551D'; // Challenge
const DS = '#52C3A8'; // Safety
const DP = '#FFBB30'; // Play

const dimIcons = {
  'Self': lowSelf,
  'Others': lowOthers,
  'Perception': highPerception,
  'Senses': lowPerception, // Fallback icon for Senses
  'Future': highFuture,
  'Past': highPast,
};

interface DimEntry {
  name: string;
  score: number;
  band: string;
  divergent: boolean;
  color: string;
  oneliner: string;
}

interface DomainEntry {
  key: string;
  label: string;
  score: number;
  band: string;
  color: string;
  oneliner: string;
  dimensions: DimEntry[];
}

const domainData: DomainEntry[] = [
  {
    key: 'Safety', label: 'Safety', score: 27, band: 'Very Low', color: DS,
    oneliner: 'You appear steadier than you feel, and holding that gap is quietly expensive.',
    dimensions: [
      { name: 'Self', score: 38, band: 'Low', divergent: true, color: DS,
        oneliner: 'Approval of yourself is conditional — most reliably present after you have earned it.' },
      { name: 'Others', score: 24, band: 'Very Low', divergent: false, color: DS,
        oneliner: 'You give support far more readily than you receive it, and the gap is wider than people around you realise.' },
    ],
  },
  {
    key: 'Play', label: 'Play', score: 41, band: 'Low', color: DP,
    oneliner: 'The energy to feel alive is running at a lower frequency than is natural for you.',
    dimensions: [
      { name: 'Perception', score: 43, band: 'Almost Balanced', divergent: true, color: DP,
        oneliner: 'Mental flexibility is present but running in maintenance mode rather than generating.' },
      { name: 'Senses', score: 39, band: 'Low', divergent: false, color: DP,
        oneliner: 'Sensory life has narrowed — the body registers without often being filled.' },
    ],
  },
  {
    key: 'Challenge', label: 'Challenge', score: 78, band: 'High', color: DC,
    oneliner: 'Direction is clear and genuinely yours — and it is carrying the whole structure right now.',
    dimensions: [
      { name: 'Future', score: 82, band: 'High', divergent: false, color: DC,
        oneliner: 'Forward orientation is strong and clear — though currently doing more structural work than it should.' },
      { name: 'Past', score: 51, band: 'Almost Balanced', divergent: true, color: DC,
        oneliner: 'History is mostly integrated — a working relationship with where you have been.' },
    ],
  },
];

const flags = [
  {
    number: '1',
    text: 'There is a significant gap between your Safety as felt and Safety as expressed — you appear more settled than you are, and the distance has structural consequences.',
    linkLabel: 'Safety · Alignment Finding',
    targetId: 'safety-alignment',
  },
  {
    number: '2',
    text: 'Challenge sits at High and aligned — the domain doing most of the structural work in your shape right now, and a genuine resource.',
    linkLabel: 'Section 6 · Challenge',
    targetId: 'challenge',
  },
  {
    number: '3',
    text: 'Your Future dimension reads notably high against your foundations — forward orientation is strong and currently carrying more weight than it should.',
    linkLabel: 'Challenge · Future',
    targetId: 'challenge-future',
  },
  {
    number: '4',
    text: 'Others is your lowest dimension — you give support more readily than you receive it, and the gap is wider than most people around you would expect.',
    linkLabel: 'Safety · Others',
    targetId: 'safety-others',
  },
];

export function YourDomains() {
  const [view, setView] = useState<'domains' | 'dimensions'>('domains');

  return (
    <div className="min-h-screen flex flex-col justify-center py-16 relative z-0">
      {/* Header */}
      <div>
        <p style={{ color: '#DC4C0C', fontWeight: 800, letterSpacing: '0.06em', fontSize: '14px', marginBottom: '30px' }}>02</p>
        <h1 style={{ fontFamily: SERIF, fontWeight: 600, letterSpacing: '-0.03em', fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', color: '#0F0F0F', marginBottom: '30px' }}>
          Your Domains
        </h1>
        <div style={{ width: '40px', height: '3px', backgroundColor: '#DC4C0C', marginTop: '30px', marginBottom: '32px' }} />
      </div>

      {/* Toggle */}
      <div className="flex justify-center relative z-10 mb-14">
        <div className="inline-flex bg-[#F5F4F0] p-1.5 rounded-full border border-[#E5E3DD] shadow-inner">
          <button
            onClick={() => setView('domains')}
            className={`relative px-8 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 ${
              view === 'domains' ? 'text-white' : 'text-[#8B8682] hover:text-[#1A1614]'
            }`}
          >
            {view === 'domains' && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-[#1A1614] rounded-full"
                initial={false}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">3 domains</span>
          </button>
          <button
            onClick={() => setView('dimensions')}
            className={`relative px-8 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 ${
              view === 'dimensions' ? 'text-white' : 'text-[#8B8682] hover:text-[#1A1614]'
            }`}
          >
            {view === 'dimensions' && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-[#1A1614] rounded-full"
                initial={false}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">6 dimensions</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          {view === 'domains' ? (
            <motion.div
              key="domains"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center max-w-6xl mx-auto w-full"
            >
              <div className="flex justify-center lg:justify-center px-8 lg:px-0">
                <div className="relative w-full max-w-[260px] lg:max-w-[320px] mx-auto lg:mx-0 group mt-16 lg:mt-12 mb-16 lg:mb-0">
                  <ImageWithFallback 
                    src={dimensionalLogo} 
                    alt="Dimensional Symbol" 
                    className="w-full drop-shadow-2xl scale-x-[-1] group-hover:scale-x-[-1.05] group-hover:scale-y-[1.05] transition-transform duration-700" 
                  />
                  {/* Clean Geometric Labels */}
                  <div className="absolute -top-12 lg:-top-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none transition-transform duration-700 group-hover:-translate-y-2">
                    <span className="text-[#E8551D] font-semibold text-xl lg:text-2xl tracking-wide">Challenge</span>
                    <svg className="w-6 h-8 lg:h-10 text-gray-800 shrink-0" viewBox="0 0 24 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 0 L 12 38" />
                      <path d="M6 32 L 12 38 L 18 32" />
                    </svg>
                  </div>
                  <div className="absolute top-[60%] -left-6 lg:-left-16 flex items-center gap-3 pointer-events-none transition-transform duration-700 group-hover:-translate-x-2 group-hover:translate-y-2">
                    <span className="text-[#52C3A8] font-semibold text-xl lg:text-2xl tracking-wide">Safety</span>
                    <svg className="w-8 h-8 lg:w-10 lg:h-10 text-gray-800 shrink-0" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 36 L 36 4" />
                      <path d="M20 4 L 36 4 L 36 20" />
                    </svg>
                  </div>
                  <div className="absolute top-[60%] -right-6 lg:-right-16 flex items-center gap-3 pointer-events-none transition-transform duration-700 group-hover:translate-x-2 group-hover:translate-y-2">
                    <svg className="w-8 h-8 lg:w-10 lg:h-10 text-gray-800 shrink-0" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M36 36 L 4 4" />
                      <path d="M20 4 L 4 4 L 4 20" />
                    </svg>
                    <span className="text-[#FFBB30] font-semibold text-xl lg:text-2xl tracking-wide">Play</span>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                {domainData.map((d, i) => (
                  <DomainCard key={d.key} domain={d} index={i} />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="dimensions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto w-full"
            >
              {(() => {
                // Columnar layout — Safety | Play | Challenge, top→bottom inside each column.
                // The grid is row-major, so we interleave: row1 = top of each column, row2 = bottom.
                const find = (domainKey: string, dimName: string) => {
                  const d = domainData.find(x => x.key === domainKey)!;
                  return { dim: d.dimensions.find(x => x.name === dimName)!, domainColor: d.color, parentLabel: d.label };
                };
                const ordered = [
                  find('Safety', 'Self'),
                  find('Play', 'Senses'),
                  find('Challenge', 'Past'),
                  find('Safety', 'Others'),
                  find('Play', 'Perception'),
                  find('Challenge', 'Future'),
                ];
                return ordered.map(({ dim, domainColor, parentLabel }, i) => (
                  <DimensionCard
                    key={dim.name}
                    dimension={dim}
                    domainColor={domainColor}
                    parentLabel={parentLabel}
                    index={i}
                  />
                ));
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Attention layer — flagged, but quiet */}
      <div
        className="mt-20 max-w-4xl mx-auto rounded-2xl p-8 lg:p-10 relative"
        style={{
          backgroundColor: '#F8F3EA',
          borderLeft: '2px solid #DC4C0C',
        }}
      >
        {/* Header — small flag, small kicker, serif heading */}
        <div className="mb-7">
          <div className="flex items-center gap-2.5 mb-3" style={{ color: '#DC4C0C' }}>
            <Flag size={15} strokeWidth={2.25} />
            <span style={{ fontSize: '10.5px', letterSpacing: '0.22em', fontWeight: 700 }}>
              FLAGGED FOR YOUR ATTENTION
            </span>
          </div>
          <h3 style={{ fontFamily: SERIF, fontSize: '26px', fontWeight: 600, color: '#1A1614', letterSpacing: '-0.02em', margin: 0 }}>
            Four things worth a closer look
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {flags.map((f) => (
            <FlagItem
              key={f.number}
              number={f.number}
              text={f.text}
              linkLabel={f.linkLabel}
              targetId={f.targetId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function DomainCard({ domain: d, index }: { domain: DomainEntry; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="relative bg-white border border-[#E5E3DD] p-7 rounded-[1.5rem] shadow-sm hover:shadow-lg transition-all duration-300 cursor-default overflow-hidden group"
    >
      <div 
        className="absolute top-0 left-0 bottom-0 w-2 transition-all duration-300 group-hover:w-3" 
        style={{ backgroundColor: d.color }} 
      />
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300"
        style={{ backgroundColor: d.color }}
      />
      
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-[13px] font-bold tracking-[0.15em] mb-2" style={{ color: d.color }}>
            {d.label.toUpperCase()}
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-[#1A1614] font-medium text-[15px]">{d.band}</span>
          </div>
        </div>
        
        <div 
          className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl shadow-sm bg-white" 
          style={{ color: d.color, border: `1px solid ${d.color}30` }}
        >
          {d.score}
        </div>
      </div>
      
      <p className="text-[#6A6764] text-[15px] leading-[1.6] mt-4 relative z-10 font-light">
        {d.oneliner}
      </p>
    </motion.div>
  );
}

function DimensionCard({ dimension: dim, domainColor, parentLabel, index }: { dimension: DimEntry; domainColor: string; parentLabel: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="bg-white border border-[#E5E3DD] rounded-[1.5rem] flex flex-col shadow-sm hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
    >
      {/* Domain accent — the colour means "this dimension belongs to this domain" */}
      <div className="h-1 w-full" style={{ backgroundColor: domainColor }} />

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none"
        style={{ backgroundColor: domainColor }}
      />

      <div className="p-7 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div className="flex-1 min-w-0">
            <span
              className="text-[10.5px] font-bold tracking-[0.2em] uppercase"
              style={{ color: domainColor }}
            >
              {parentLabel}
            </span>
            <h3
              style={{
                fontFamily: SERIF,
                fontSize: '30px',
                fontWeight: 600,
                color: '#0F0F0F',
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                margin: '6px 0 0',
              }}
            >
              {dim.name}
            </h3>
            <span
              className="inline-block mt-2.5 text-[11px] font-medium tracking-[0.05em]"
              style={{ color: '#8B8682' }}
            >
              {dim.band}
            </span>
          </div>

          <div
            className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-[17px] shadow-sm bg-white flex-shrink-0 ml-3"
            style={{ color: domainColor, border: `1px solid ${domainColor}30` }}
          >
            {dim.score}
          </div>
        </div>
      
      <div className="flex-1 flex justify-center items-center py-8 relative z-10">
        <ImageWithFallback 
          src={dimIcons[dim.name as keyof typeof dimIcons]} 
          alt={dim.name} 
          className="h-36 object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-md" 
        />
      </div>
      
        <p className="text-[14px] text-[#6A6764] leading-[1.6] relative z-10 font-light border-t border-[#E5E3DD] pt-5 mt-2">
          {dim.oneliner}
        </p>
      </div>
    </motion.div>
  );
}

interface FlagItemProps {
  number: string;
  text: string;
  linkLabel: string;
  targetId: string;
}

function FlagItem({ number, text, linkLabel, targetId }: FlagItemProps) {
  return (
    <div className="group flex gap-4 p-5 bg-white rounded-xl border border-[#EAE5D9] transition-colors hover:border-[#DC4C0C]/35">
      <div
        style={{
          flexShrink: 0, width: '26px', height: '26px', borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          border: '1.5px solid #DC4C0C',
          color: '#DC4C0C',
          fontSize: '12px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700,
          fontFamily: '"Neue Haas Grotesk Display Pro", "Helvetica Neue", Helvetica, Arial, sans-serif',
        }}
      >
        {number}
      </div>
      <div>
        <p style={{ fontSize: '14px', color: '#1A1614', lineHeight: 1.6, fontWeight: 300, margin: 0 }}>
          {text}
        </p>
        <button
          className="inline-flex items-center gap-1 text-[#DC4C0C] hover:text-[#B83E0A] transition-colors"
          style={{ fontSize: '11.5px', fontWeight: 700, letterSpacing: '0.03em', marginTop: '12px', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          onClick={() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })}
        >
          {linkLabel}
          <ArrowRight size={12} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}