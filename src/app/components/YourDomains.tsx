import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flag, ArrowLeft, ArrowRight, Sparkles, Sprout, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

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
const NAV_ORANGE = '#FF5A1F';

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

const dimensionSymbolAssets = import.meta.glob('../../imports/generated-dimensions/*.svg', { eager: true, import: 'default' }) as Record<string, string>;

function roundedDimensionScore(score: number) {
  return Math.min(100, Math.max(0, Math.round(score / 10) * 10));
}

function getDimensionSymbol(name: string, score: number) {
  const rounded = roundedDimensionScore(score);
  const key = `../../imports/generated-dimensions/${name}_${rounded}.svg`;
  return dimensionSymbolAssets[key] || dimIcons[name as keyof typeof dimIcons];
}

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
  const [activeDomain, setActiveDomain] = useState<string | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [returnTarget, setReturnTarget] = useState<{ id: string; label: string } | null>(null);

  const navigateWithReturn = (targetId: string, returnId: string, returnLabel: string, block: ScrollLogicalPosition = 'start') => {
    setReturnTarget({ id: returnId, label: returnLabel });
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block });
  };

  const returnToOrigin = () => {
    if (!returnTarget) return;
    document.getElementById(returnTarget.id)?.scrollIntoView({ behavior: 'smooth', block: returnTarget.id === 'flagged-attention' ? 'center' : 'start' });
    setReturnTarget(null);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-16 relative z-0">
      {/* Header */}
      <div>
        <p style={{ color: NAV_ORANGE, fontWeight: 800, letterSpacing: '0.16em', fontSize: '11px', marginBottom: '28px', textTransform: 'uppercase' }}>02 Overview</p>
        <h1 style={{ fontFamily: SERIF, fontWeight: 600, letterSpacing: '-0.03em', fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', color: '#0F0F0F', marginBottom: '30px' }}>
          Your Domains
        </h1>
        <div style={{ width: '40px', height: '3px', backgroundColor: NAV_ORANGE, marginTop: '30px', marginBottom: '32px' }} />
      </div>

      {/* Toggle */}
      <div className="relative z-10 mb-14 grid max-w-4xl mx-auto lg:grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div className="hidden lg:block" />
        <div className="inline-flex justify-self-center bg-[#F5F4F0] p-1.5 rounded-full border border-[#E5E3DD] shadow-inner">
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
        <AnimatePresence mode="wait">
          {view === 'dimensions' && (
            <motion.div
              key="dimension-note"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.25 }}
              className="relative justify-self-center lg:justify-self-start rounded-2xl bg-[#F4F1EA] px-5 py-4 max-w-[280px]"
            >
              <span
                className="absolute -left-3 top-[31px] h-5 w-5 -translate-y-1/2 rotate-45 bg-[#F4F1EA]"
                aria-hidden="true"
              />
              <p style={{ color: '#4D4945', fontSize: '13.5px', lineHeight: 1.6, fontWeight: 300, margin: 0 }}>
                A dimension is a more specific reading inside a foundation. It shows where that foundation is supported, strained, expressed, or quietly compensated for.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
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
                <div
                  data-domain-symbol="true"
                  className="relative w-full max-w-[280px] lg:max-w-[340px] min-h-[500px] lg:min-h-[535px] mx-auto lg:mx-0 group mt-0 lg:-mt-4 mb-8 lg:mb-0"
                  onMouseLeave={() => setActiveDomain(null)}
                  style={{ perspective: '900px' }}
                >
                  <div className="relative mx-auto w-full">
                    <DomainSymbol
                      activeDomain={activeDomain}
                      selectedDomain={selectedDomain}
                      onActivate={setActiveDomain}
                      onClear={() => setActiveDomain(null)}
                      onSelect={setSelectedDomain}
                    />
                    <AnimatePresence mode="wait">
                      {selectedDomain === 'Challenge' ? (
                        <motion.div key="challenge-dims" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="contents">
                          <DomainMarker label="Past" color={DC} active delay={0} onEnter={() => setActiveDomain('Challenge')} onLeave={() => setActiveDomain(null)} className="absolute -top-12 left-[30%] -translate-x-1/2" />
                          <DomainMarker label="Future" color={DC} active delay={0} onEnter={() => setActiveDomain('Challenge')} onLeave={() => setActiveDomain(null)} className="absolute -top-12 left-[70%] -translate-x-1/2" />
                        </motion.div>
                      ) : (
                        <DomainMarker key="challenge" label="Challenge" color={DC} active={activeDomain === 'Challenge'} delay={0} onEnter={() => setActiveDomain('Challenge')} onLeave={() => setActiveDomain(null)} className="absolute -top-12 left-1/2 -translate-x-1/2" />
                      )}
                    </AnimatePresence>
                    <AnimatePresence mode="wait">
                      {selectedDomain === 'Safety' ? (
                        <motion.div key="safety-dims" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="contents">
                          <DomainMarker label="Self" color={DS} active delay={0} onEnter={() => setActiveDomain('Safety')} onLeave={() => setActiveDomain(null)} className="absolute top-[62%] -left-10 lg:-left-16" />
                          <DomainMarker label="Others" color={DS} active delay={0} onEnter={() => setActiveDomain('Safety')} onLeave={() => setActiveDomain(null)} className="absolute top-[90%] -left-2 lg:-left-6" />
                        </motion.div>
                      ) : (
                        <DomainMarker key="safety" label="Safety" color={DS} active={activeDomain === 'Safety'} delay={0.85} onEnter={() => setActiveDomain('Safety')} onLeave={() => setActiveDomain(null)} className="absolute top-[77%] -left-10 lg:-left-16" />
                      )}
                    </AnimatePresence>
                    <AnimatePresence mode="wait">
                      {selectedDomain === 'Play' ? (
                        <motion.div key="play-dims" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="contents">
                          <DomainMarker label="Senses" color={DP} active delay={0} onEnter={() => setActiveDomain('Play')} onLeave={() => setActiveDomain(null)} className="absolute top-[62%] -right-10 lg:-right-16" />
                          <DomainMarker label="Perception" color={DP} active delay={0} onEnter={() => setActiveDomain('Play')} onLeave={() => setActiveDomain(null)} className="absolute top-[90%] -right-2 lg:-right-6" />
                        </motion.div>
                      ) : (
                        <DomainMarker key="play" label="Play" color={DP} active={activeDomain === 'Play'} delay={1.7} onEnter={() => setActiveDomain('Play')} onLeave={() => setActiveDomain(null)} className="absolute top-[77%] -right-10 lg:-right-16" />
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="absolute left-1/2 top-[355px] lg:top-[390px] z-30 w-[300px] -translate-x-1/2">
                    <AnimatePresence mode="wait">
                      {selectedDomain ? (
                        <DomainDescriptionPopover
                          key="domain-popover"
                          domain={selectedDomain}
                          onClose={() => setSelectedDomain(null)}
                        />
                      ) : (
                        <motion.p
                          key="current-state"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.25 }}
                          className="text-center text-[11px] uppercase tracking-[0.14em] font-bold text-[#9A948D]"
                        >
                          Your current state
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                {domainData.map((d, i) => (
                  <DomainCard key={d.key} domain={d} index={i} onNavigate={navigateWithReturn} />
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
              className="max-w-6xl mx-auto w-full"
            >
              <div className="grid md:grid-cols-3 gap-6 items-start">
                {domainData.map((domain, domainIndex) => (
                  <DimensionColumn key={domain.key} domain={domain} index={domainIndex} onNavigate={navigateWithReturn} />
                ))}
              </div>
              <DimensionComparisonPanel />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Attention layer — flagged, but refined */}
      <div
        id="flagged-attention"
        className="mt-20 max-w-4xl mx-auto relative overflow-hidden rounded-[1.5rem] p-7 lg:p-9"
        style={{
          backgroundColor: '#F1EFEB',
          boxShadow: '0 18px 48px -42px rgba(26, 22, 20, 0.42)',
        }}
      >
        <div className="absolute right-7 top-0 h-14 w-8" style={{ backgroundColor: '#DC4C0C' }}>
          <div
            className="absolute bottom-0 left-0 h-0 w-0"
            style={{
              borderLeft: '16px solid transparent',
              borderRight: '16px solid transparent',
              borderBottom: '14px solid #F1EFEB',
            }}
          />
        </div>

        <div className="mb-8 flex items-start justify-between gap-8 pr-12">
          <div className="flex items-center gap-3">
            <div
              className="inline-flex h-9 w-9 items-center justify-center rounded-full"
              style={{ backgroundColor: '#1A1614', color: '#FDFCFA' }}
            >
              <Flag size={16} strokeWidth={2.25} />
            </div>
            <p
              style={{
                color: '#9B3B14',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.2em',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              FLAGGED FOR YOUR ATTENTION
            </p>
          </div>
        </div>

        <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
          {flags.map((f) => (
            <FlagItem
              key={f.number}
              number={f.number}
              text={f.text}
              linkLabel={f.linkLabel}
              targetId={f.targetId}
              onNavigate={() => navigateWithReturn(f.targetId, 'flagged-attention', 'Back to your attention')}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {returnTarget && (
          <motion.button
            type="button"
            onClick={returnToOrigin}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-7 right-7 z-50 inline-flex items-center gap-2 rounded-full bg-[#1A1614] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_38px_-24px_rgba(26,22,20,0.7)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/40"
          >
            <ArrowLeft size={16} strokeWidth={2.4} />
            {returnTarget.label}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function DomainCard({ domain: d, index, onNavigate }: { domain: DomainEntry; index: number; onNavigate: (targetId: string, returnId: string, returnLabel: string) => void }) {
  const targetId = d.key.toLowerCase();
  return (
    <motion.div
      role="button"
      tabIndex={0}
      onClick={() => onNavigate(targetId, 'your-domains', 'Back to your domains')}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onNavigate(targetId, 'your-domains', 'Back to your domains');
        }
      }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="relative bg-white border border-[#E5E3DD] p-7 rounded-[1.5rem] shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/30"
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
        
        <ScoreRing value={d.score} color={d.color} size={62} />
      </div>
      
      <p className="text-[#6A6764] text-[15px] leading-[1.6] mt-4 relative z-10 font-light">
        {d.oneliner}
      </p>
    </motion.div>
  );
}

function DomainSymbol({
  activeDomain,
  selectedDomain,
  onActivate,
  onClear,
  onSelect,
}: {
  activeDomain: string | null;
  selectedDomain: string | null;
  onActivate: (domain: string) => void;
  onClear: () => void;
  onSelect: (domain: string) => void;
}) {
  const visualDomain = activeDomain || selectedDomain;
  const symbolTransform =
    visualDomain === 'Safety'
      ? 'rotateY(-18deg) rotateX(-5deg) rotateZ(-1deg) translateX(-6px) scale(1.055)'
      : visualDomain === 'Play'
        ? 'rotateY(18deg) rotateX(-5deg) rotateZ(1deg) translateX(6px) scale(1.055)'
        : visualDomain === 'Challenge'
          ? 'rotateX(18deg) translateY(-10px) scale(1.07)'
          : 'rotateX(0deg) rotateY(0deg) scale(1)';

  const groupStyle = (domain: 'Safety' | 'Play' | 'Challenge') => {
    const active = visualDomain === domain;

    return {
      transformBox: 'fill-box' as const,
      transformOrigin: 'center',
      transition: 'filter 650ms ease, opacity 650ms ease, transform 650ms cubic-bezier(0.22, 1, 0.36, 1)',
      transform: active ? 'translateZ(28px) scale(1.025)' : 'translateZ(0) scale(1)',
      filter: active ? 'brightness(1.08) saturate(1.12) drop-shadow(0 12px 10px rgba(26,22,20,0.14))' : undefined,
      opacity: visualDomain && !active ? 0.72 : 1,
      cursor: 'pointer',
      outline: 'none',
    };
  };

  return (
    <div style={{ perspective: '900px' }}>
      <svg
        viewBox="0 0 998 862"
        className="w-full drop-shadow-2xl overflow-visible"
        aria-label="Dimensional Symbol"
        role="img"
        style={{
          transform: symbolTransform,
          transformStyle: 'preserve-3d',
          transition: 'transform 700ms cubic-bezier(0.22, 1, 0.36, 1), filter 700ms ease',
          filter: visualDomain ? 'drop-shadow(0 26px 28px rgba(26,22,20,0.16))' : undefined,
        }}
      >
        <g transform="translate(998,0) scale(-1,1)">
        <g
          style={groupStyle('Safety')}
          onMouseEnter={() => onActivate('Safety')}
          onMouseLeave={onClear}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => onSelect('Safety')}
          aria-label="Highlight Safety section"
        >
          <path d="M597.693 863.691H998L549.849 605.382L500.539 690.557L401.847 520.078L397.232 517.419L597.693 863.691Z" fill="#42A68E" />
          <path d="M600.768 517.419L549.849 605.382L998 863.691L797.848 517.419H600.768Z" fill="#52C3A8" />
          <path d="M401.847 520.078L400.307 517.419H397.232L401.847 520.078Z" fill="#52C3A8" />
        </g>
        <g
          style={groupStyle('Challenge')}
          onMouseEnter={() => onActivate('Challenge')}
          onMouseLeave={onClear}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => onSelect('Challenge')}
          aria-label="Highlight Challenge section"
        >
          <path d="M500.533 -2L300.381 344.272L400.61 517.41L400.616 517.419H500.533L500.539 -2H500.533Z" fill="#F7601D" />
          <path d="M500.533 517.419H600.756L700.994 344.272L500.533 -2V517.419Z" fill="#DC4C0C" />
        </g>
        <g
          style={groupStyle('Play')}
          onMouseEnter={() => onActivate('Play')}
          onMouseLeave={onClear}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => onSelect('Play')}
          aria-label="Highlight Play section"
        >
          <path d="M500.539 690.557L450.496 604.111L0 864H400.307L600.768 517.419L500.539 690.557Z" fill="#FFBB30" />
          <path d="M200.155 517.419L0 864L450.496 604.111L400.307 517.419H200.155Z" fill="#FFAB00" />
        </g>
        </g>
      </svg>
    </div>
  );
}

function DomainDescriptionPopover({ domain, onClose }: { domain: string | null; onClose: () => void }) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const entry = domainData.find(item => item.key === domain);
  useEffect(() => {
    if (!domain) return;
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      if (popoverRef.current?.contains(target)) return;
      if (target.closest('[data-domain-symbol="true"]')) return;
      onClose();
    };
    window.addEventListener('mousedown', onPointerDown);
    return () => window.removeEventListener('mousedown', onPointerDown);
  }, [domain, onClose]);
  if (!entry) return null;
  const copy: Record<string, string> = {
    Safety: 'Safety shows how much inner steadiness, ease, and trust your system can actually access.',
    Play: 'Play shows how much aliveness, sensory richness, and flexible enjoyment are available to you.',
    Challenge: 'Challenge shows how clearly your system can move toward meaning, direction, and chosen difficulty.',
  };

  return (
    <motion.div
      ref={popoverRef}
      key={entry.key}
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.22 }}
      className="w-full rounded-[20px] border bg-white p-5 text-left shadow-[0_22px_48px_-32px_rgba(26,22,20,0.35)]"
      style={{ borderColor: `${entry.color}3A` }}
    >
      <div className="mb-2 flex items-center justify-between gap-4">
        <p className="text-[11px] uppercase tracking-[0.16em] font-bold" style={{ color: entry.color }}>{entry.label}</p>
        <button type="button" onClick={onClose} className="-mr-2 -mt-2 grid h-9 w-9 place-items-center rounded-full text-[#8B8682] transition-colors hover:bg-[#F4F1EA] hover:text-[#1A1614]" aria-label="Close domain description">
          <X size={15} strokeWidth={2.4} />
        </button>
      </div>
      <p className="text-sm leading-relaxed text-[#3F3A35]" style={{ fontWeight: 300 }}>{copy[entry.key]}</p>
    </motion.div>
  );
}

function DimensionColumn({ domain, index, onNavigate }: { domain: DomainEntry; index: number; onNavigate: (targetId: string, returnId: string, returnLabel: string) => void }) {
  const dimensionOrder: Record<string, string[]> = {
    Safety: ['Self', 'Others'],
    Play: ['Senses', 'Perception'],
    Challenge: ['Past', 'Future'],
  };
  const orderedDimensions = dimensionOrder[domain.key]
    .map(name => domain.dimensions.find(dim => dim.name === name))
    .filter(Boolean) as DimEntry[];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 px-1">
        <div className="h-px flex-1" style={{ backgroundColor: `${domain.color}55` }} />
        <p
          style={{
            color: domain.color,
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          {domain.label}
        </p>
        <div className="h-px flex-1" style={{ backgroundColor: `${domain.color}55` }} />
      </div>
      <div className="space-y-6">
        {orderedDimensions.map((dim, i) => (
          <DimensionCard
            key={dim.name}
            dimension={dim}
            domainKey={domain.key}
            domainColor={domain.color}
            index={index * 2 + i}
            onNavigate={(targetId) => {
              onNavigate(targetId, 'your-domains', 'Back to your dimensions');
            }}
          />
        ))}
      </div>
    </div>
  );
}

function DomainMarker({
  label,
  color,
  active,
  delay,
  onEnter,
  onLeave,
  className,
}: {
  label: string;
  color: string;
  active: boolean;
  delay: number;
  onEnter: () => void;
  onLeave: () => void;
  className: string;
}) {
  return (
    <button
      type="button"
      className={`${className} pointer-events-auto px-1 py-1 transition-all duration-500 focus-visible:outline-none ${
        active ? '-translate-y-1' : 'hover:-translate-y-0.5'
      }`}
      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onEnter}
      onFocus={onEnter}
      onBlur={onLeave}
      aria-label={`Highlight ${label} domain`}
    >
      <span
        className="relative block rounded-full px-2 py-1"
        style={{
          animation: active
            ? 'none'
            : `domain-label-bounce 2.8s ease-in-out ${delay}s infinite, domain-word-radiate 2.8s ease-in-out ${delay}s infinite`,
          ['--domain-glow' as string]: `${color}55`,
          ['--domain-glow-soft' as string]: `${color}24`,
          color,
          fontFamily: SERIF,
          fontSize: '22px',
          fontWeight: active ? 700 : 600,
          letterSpacing: '-0.02em',
          lineHeight: 1,
          transform: active ? 'scale(1.09)' : 'scale(1)',
          transformOrigin: 'center',
          transition: 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1), text-shadow 500ms ease, font-weight 500ms ease',
          textShadow: active
            ? '0 1px 0 #FDFCFA, 0 8px 22px rgba(26,22,20,0.18)'
            : '0 1px 0 #FDFCFA, 0 0 10px rgba(253,252,250,0.85)',
        }}
      >
        {label}
      </span>
    </button>
  );
}

function DimensionCard({ dimension: dim, domainKey, domainColor, index, onNavigate }: { dimension: DimEntry; domainKey: string; domainColor: string; index: number; onNavigate: (targetId: string) => void }) {
  const targetId = `${domainKey.toLowerCase()}-${dim.name.toLowerCase()}`;
  return (
    <motion.div
      role="button"
      tabIndex={0}
      onClick={() => onNavigate(targetId)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onNavigate(targetId);
        }
      }}
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{
        y: -4,
        scale: 1.006,
        transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
      }}
      transition={{
        opacity: { delay: index * 0.08, duration: 0.4 },
        scale: { delay: index * 0.08, duration: 0.4 },
        y: { delay: index * 0.08, duration: 0.4 },
      }}
      style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E3DD' }}
      className="bg-white border border-[#E5E3DD] rounded-[1.5rem] flex flex-col min-h-[420px] shadow-sm hover:shadow-[0_18px_42px_-32px_rgba(26,22,20,0.42)] hover:z-20 transition-[box-shadow,border-color,background-color] duration-700 group relative overflow-hidden transform-gpu cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
    >
      {/* Domain accent — the colour means "this dimension belongs to this domain" */}
      <div className="h-1 w-full" style={{ backgroundColor: domainColor }} />

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${domainColor}12 0%, ${domainColor}08 44%, transparent 100%)` }}
      />

      <div className="p-7 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-6 min-h-[78px] relative z-10">
          <div className="flex-1 min-w-0">
            <h3
              style={{
                fontFamily: SERIF,
                fontSize: '30px',
                fontWeight: 600,
                color: '#0F0F0F',
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                margin: 0,
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

          <ScoreRing value={dim.score} color={domainColor} size={52} />
        </div>
      
      <div className="h-[150px] flex justify-center items-center py-6 relative z-10">
        <ImageWithFallback 
          src={getDimensionSymbol(dim.name, dim.score)}
          alt={dim.name} 
          className="h-36 object-contain drop-shadow-md"
        />
      </div>
      
        <p className="min-h-[92px] text-[14px] text-[#6A6764] leading-[1.6] relative z-10 font-light border-t border-[#E5E3DD] pt-5 mt-2">
          {dim.oneliner}
        </p>
      </div>
    </motion.div>
  );
}

function ScoreRing({ value, color, size = 56 }: { value: number; color: string; size?: number }) {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * (value / 100);
  return (
    <div className="relative grid shrink-0 place-items-center rounded-full bg-white shadow-sm" style={{ width: size, height: size }}>
      <svg className="absolute inset-0 -rotate-90" width={size} height={size} aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#EEEAE3" strokeWidth="3" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference - dash}`}
        />
      </svg>
      <span className="relative font-bold tabular-nums" style={{ color, fontSize: size * 0.3, lineHeight: 1 }}>
        {value}
      </span>
    </div>
  );
}

function DimensionComparisonPanel() {
  const ordered = ['Self', 'Others', 'Senses', 'Perception', 'Past', 'Future'];
  const dims = ordered
    .map(name => domainData.flatMap(domain => domain.dimensions.map(dim => ({ ...dim, domain: domain.label, domainColor: domain.color }))).find(dim => dim.name === name))
    .filter(Boolean) as Array<DimEntry & { domain: string; domainColor: string }>;
  const mostResourced = dims.reduce((best, dim) => dim.score > best.score ? dim : best, dims[0]);
  const mostStrained = dims.reduce((lowest, dim) => dim.score < lowest.score ? dim : lowest, dims[0]);

  return (
    <div className="mt-10 grid gap-6 rounded-[28px] border border-[#E5E3DD] bg-white p-7 shadow-[0_18px_48px_-42px_rgba(26,22,20,0.5)] lg:grid-cols-[1fr_300px]">
      <div>
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-[12px] uppercase tracking-[0.17em] font-bold text-[#1A1614]">Your six dimensions</p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#6F6A64]">
              These six readings show where your profile has more support and where strengthening one dimension would help the whole shape. Higher, steadier dimensions can carry you; lower ones point to the foundation that would most reward attention.
            </p>
          </div>
        </div>
        <div className="relative h-64">
          <div className="absolute inset-0 grid grid-cols-6 gap-5 items-end">
            {dims.map((dim) => (
              <motion.div key={dim.name} className="group flex h-full flex-col items-center justify-end gap-4" whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 420, damping: 34 }}>
                <div className="relative flex h-48 w-full items-end justify-center">
                  <div className="absolute bottom-0 h-full w-9 rounded-full bg-[#F1EEE8] transition-colors duration-300 group-hover:bg-[#EAE4DA]" />
                  <motion.div
                    className="relative z-10 w-9 rounded-full transition-[filter] duration-300 group-hover:brightness-110"
                    style={{ backgroundColor: dim.domainColor }}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${dim.score}%` }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span
                      className="absolute inset-x-0 top-2 text-center text-[11px] tabular-nums font-bold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                      style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}
                    >
                      {dim.score}
                    </span>
                  </motion.div>
                </div>
                <div className="text-center">
                  <p className="text-[11px] uppercase tracking-[0.08em] font-bold" style={{ color: dim.domainColor }}>{dim.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid gap-4 content-center">
        <DimensionNote title="Strongest support" dim={mostResourced} />
        <DimensionNote title="Needs more support" dim={mostStrained} />
      </div>
    </div>
  );
}

function DimensionNote({ title, dim }: { title: string; dim: DimEntry & { domain: string; domainColor: string } }) {
  const isResource = title === 'Strongest support';
  const Icon = isResource ? Sparkles : Sprout;
  return (
    <div className="relative min-h-[150px] overflow-hidden rounded-[26px] bg-[#F8F6F1] p-6">
      <div className="flex h-full items-center justify-between gap-5">
        <div>
          <p className="text-[10px] uppercase tracking-[0.14em] font-bold text-[#8B8682]">{title}</p>
          <p className="mt-7" style={{ fontFamily: SERIF, fontSize: 30, lineHeight: 1, color: '#15110F' }}>{dim.name}</p>
          <p className="mt-2 text-sm text-[#6F6A64]">{dim.band}</p>
        </div>
        <motion.span
          className="grid h-14 w-14 shrink-0 place-items-center rounded-full"
          style={{
            color: isResource ? '#DC4C0C' : '#42A68E',
            backgroundColor: isResource ? '#FFF1EA' : '#EAF7F3',
          }}
          animate={isResource ? { scale: [1, 1.1, 1], rotate: [0, -5, 4, 0] } : { y: [0, -3, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: isResource ? 4.2 : 3.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon size={24} strokeWidth={2.1} />
        </motion.span>
      </div>
    </div>
  );
}

interface FlagItemProps {
  number: string;
  text: string;
  linkLabel: string;
  targetId: string;
  onNavigate: () => void;
}

function FlagItem({ number, text, linkLabel, targetId, onNavigate }: FlagItemProps) {
  const [domainLabel, sectionLabel = 'Finding'] = linkLabel.split('·').map(part => part.trim());
  const flagContext = `${linkLabel} ${targetId}`.toLowerCase();
  const domainColor = flagContext.includes('challenge') ? DC : flagContext.includes('play') ? DP : DS;

  return (
    <button
      type="button"
      onClick={() => {
        onNavigate();
      }}
      className="group grid w-full gap-4 rounded-2xl p-3 text-left transition-colors hover:bg-[#FDFCFA]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC4C0C]/35 md:grid-cols-[48px_1fr]"
      aria-label={`Go to ${linkLabel}`}
    >
      <div
        className="-mt-1"
        style={{
          fontFamily: SERIF,
          color: '#DC4C0C',
          fontSize: '36px',
          lineHeight: 1,
          fontWeight: 500,
          letterSpacing: '-0.04em',
        }}
      >
        {number}
      </div>
      <div className="min-w-0">
        <p style={{ fontSize: '14.5px', color: '#1A1614', lineHeight: 1.65, fontWeight: 300, margin: 0 }}>
          {text}
        </p>
        <span
          className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/75 px-3 py-1.5 text-[#B64A18] transition-colors group-hover:bg-white"
          style={{ fontSize: '9.5px', fontWeight: 800, letterSpacing: '0.14em', cursor: 'pointer', pointerEvents: 'none', textTransform: 'uppercase' }}
          aria-hidden="true"
        >
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: domainColor }} />
          {domainLabel} · {sectionLabel}
          <ArrowRight size={12} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </button>
  );
}
