import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Orientation } from './components/Orientation';
import { YourDomains } from './components/YourDomains';
import { YourShape } from './components/YourShape';
import { DomainSection } from './components/DomainSection';
import { HowFoundationsWork } from './components/HowFoundationsWork';
import { FoundationDirection } from './components/FoundationDirection';
import { WhenReady } from './components/WhenReady';
import { DesignNotes } from './components/DesignNotes';

export default function App() {
  const [activeSection, setActiveSection] = useState('orientation');
  const [activeShapeState, setActiveShapeState] = useState(0);

  return (
    <div className="flex min-h-screen bg-[#FDFCFA]">
      {/* MARKER-MAKE-KIT-INVOKED */}
      <Sidebar
        activeSection={activeSection}
        activeShapeState={activeShapeState}
        onNavigate={setActiveSection}
        onShapeStateChange={setActiveShapeState}
      />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 py-10 md:px-8 md:py-12">
          <PartDivider
            step={1}
            title="Overview"
            body="Before any one score asks for attention, this opening part lets the whole pattern come into view. It gives the reader a map for the rest of the report, so the details that follow have emotional and structural context."
          />

          <div id="orientation" className="mt-16 scroll-mt-24">
            <Orientation />
          </div>

          <div id="your-domains" className="mt-28 scroll-mt-24">
            <YourDomains />
          </div>

          <div id="your-shape" className="mt-28 scroll-mt-24">
            <YourShape activeState={activeShapeState} onStateChange={setActiveShapeState} />
          </div>

          <PartDivider
            step={2}
            title="Domain deep dive"
            body="The second part moves from the whole pattern into the three foundations themselves. Safety, Play, and Challenge open one by one, showing where steadiness, aliveness, and direction are actually available."
            className="mt-28"
          />

          <div id="safety" className="mt-28 scroll-mt-24">
            <DomainSection
              domain="Safety"
              score={27}
              band="Very Low"
              felt={22}
              expressed={35}
              color="#42A68E"
            />
          </div>

          <div id="play" className="mt-28 scroll-mt-24">
            <DomainSection
              domain="Play"
              score={41}
              band="Low"
              felt={38}
              expressed={47}
              color="#FFAB00"
            />
          </div>

          <div id="challenge" className="mt-28 scroll-mt-24">
            <DomainSection
              domain="Challenge"
              score={78}
              band="High"
              felt={75}
              expressed={77}
              color="#DC4C0C"
            />
          </div>

          <PartDivider
            step={3}
            title="Integration"
            body="The final part gathers the reading back into one living system. After the foundations are visible, this is where the profile becomes direction, timing, and a more usable sense of what comes next."
            className="mt-28"
          />

          <div id="foundations-together" className="mt-28 scroll-mt-24">
            <HowFoundationsWork />
          </div>

          <div id="direction" className="mt-28 scroll-mt-24">
            <FoundationDirection />
          </div>

          <div id="when-ready" className="mt-28 scroll-mt-24">
            <WhenReady />
          </div>

          <div id="design-notes" className="mt-28 scroll-mt-24">
            <DesignNotes />
          </div>
        </div>
      </main>
    </div>
  );
}

function PartDivider({
  step,
  title,
  body,
  className = '',
}: {
  step: 1 | 2 | 3;
  title: string;
  body: string;
  className?: string;
}) {
  const steps = [
    {
      number: 1,
      label: 'The Map',
      line: 'See the full profile',
      symbol: 'map',
      heading: 'The Map',
      invitation: 'Begin by seeing the whole architecture.',
    },
    {
      number: 2,
      label: 'The Deep Dive',
      line: 'Enter the domains',
      symbol: 'deep',
      heading: 'The Deep Dive',
      invitation: 'Move into Safety, Play, and Challenge.',
    },
    {
      number: 3,
      label: 'The Integration',
      line: 'Bring the system together',
      symbol: 'integration',
      heading: 'The Integration',
      invitation: 'Turn the reading into direction.',
    },
  ] as const;
  const activeStage = steps[step - 1];

  return (
    <section
      aria-label={`${title}: part ${step} of 3`}
      className={`relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#17120F] px-4 py-16 text-white shadow-[0_32px_92px_-58px_rgba(26,22,20,0.86)] md:w-[calc(100vw-13rem)] md:px-8 md:py-20 lg:py-24 ${className}`}
    >
      <div
        className="absolute inset-0 opacity-95"
        style={{
          background: 'radial-gradient(circle at 18% 28%, rgba(255,187,48,0.18), transparent 24%), radial-gradient(circle at 82% 24%, rgba(242,85,26,0.14), transparent 32%), radial-gradient(circle at 70% 78%, rgba(66,166,142,0.08), transparent 28%), linear-gradient(112deg, #17120F 0%, #241A14 54%, #191410 100%)',
        }}
      />
      <div className="absolute inset-y-0 left-[58%] hidden w-px bg-gradient-to-b from-transparent via-white/10 to-transparent md:block" />
      <div className="absolute -right-24 top-1/2 h-80 w-80 -translate-y-1/2 rotate-45 border border-white/[0.055]" />
      <div className="absolute -left-24 bottom-[-45%] h-72 w-72 rounded-full border border-[#FFBB30]/[0.055]" />

      <div className="relative mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.86fr_1.14fr] md:items-center">
        <div>
          <div className="mb-7 flex items-center gap-4">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#FFBB30]">Part {step} of 3</span>
            <span className="h-px w-16 bg-[#FFBB30]/55" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/48">Report journey</span>
          </div>
          <h2
            style={{
              fontFamily: '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif',
              fontSize: 'clamp(3rem, 6.4vw, 5.7rem)',
              lineHeight: 0.92,
              letterSpacing: '-0.04em',
              color: '#FFFFFF',
            }}
          >
            {activeStage.heading}
          </h2>
          <p className="mt-6 max-w-lg text-[20px] leading-snug text-white/88" style={{ fontWeight: 300 }}>
            {activeStage.invitation}
          </p>
          <p className="mt-7 max-w-2xl border-l border-[#FFBB30]/45 pl-5 text-[16px] leading-relaxed text-white/70" style={{ fontWeight: 300 }}>
            {body}
          </p>
        </div>

        <div className="relative min-h-[290px]">
          <div className="absolute inset-0 rounded-[42px] border border-white/[0.055] bg-white/[0.025]" />
          <div className="absolute inset-0 rounded-[42px] bg-[radial-gradient(circle_at_44%_42%,rgba(255,187,48,0.10),transparent_33%),radial-gradient(circle_at_70%_58%,rgba(242,85,26,0.10),transparent_34%)]" />
          <div className="absolute left-[13%] right-[13%] top-[46%] h-px bg-gradient-to-r from-[#FFBB30]/10 via-[#FFBB30]/44 to-white/10" />
          <div className="relative grid min-h-[290px] grid-cols-1 gap-5 px-5 py-8 sm:grid-cols-3 sm:items-center md:px-7">
            {steps.map((item, index) => {
              const completed = item.number <= step;
              const active = item.number === step;
              return (
                <div
                  key={item.number}
                  className={`relative flex min-h-[210px] flex-col items-center justify-center text-center ${index === 1 ? 'sm:-translate-y-6' : index === 2 ? 'sm:translate-y-5' : 'sm:translate-y-3'}`}
                >
                  <JourneyStageSymbol symbol={item.symbol} completed={completed} active={active} />
                  <p
                    className="mt-5 text-[11px] font-extrabold uppercase tracking-[0.18em]"
                    style={{ color: completed ? '#FFBB30' : 'rgba(255,255,255,0.38)' }}
                  >
                    {item.label}
                  </p>
                  <p className="mt-2 max-w-[10rem] text-[13px] leading-snug text-white/58" style={{ fontWeight: 300 }}>
                    {item.line}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function JourneyStageSymbol({
  symbol,
  completed,
  active,
}: {
  symbol: 'map' | 'deep' | 'integration';
  completed: boolean;
  active: boolean;
}) {
  const color = completed ? '#FFBB30' : 'rgba(255,255,255,0.28)';
  const glow = active ? '0 0 52px rgba(255,187,48,0.28), 0 0 92px rgba(242,85,26,0.16)' : undefined;
  const opacity = completed ? 1 : 0.58;

  return (
    <div
      className="relative grid h-28 w-28 place-items-center rounded-full border border-white/10 bg-white/[0.035]"
      style={{ boxShadow: glow }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-3 rounded-full"
        style={{
          background: active
            ? 'radial-gradient(circle, rgba(255,187,48,0.18), rgba(242,85,26,0.08) 48%, transparent 72%)'
            : 'radial-gradient(circle, rgba(255,255,255,0.06), transparent 68%)',
        }}
      />

      {symbol === 'map' && (
        <div className="relative h-16 w-16" style={{ opacity }}>
          <span className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rotate-45 border" style={{ borderColor: color }} />
          <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ backgroundColor: color }} />
          <span className="absolute left-1/2 top-[8px] h-4 w-px -translate-x-1/2" style={{ backgroundColor: color }} />
          <span className="absolute bottom-[8px] left-1/2 h-4 w-px -translate-x-1/2" style={{ backgroundColor: color }} />
          <span className="absolute left-[8px] top-1/2 h-px w-4 -translate-y-1/2" style={{ backgroundColor: color }} />
          <span className="absolute right-[8px] top-1/2 h-px w-4 -translate-y-1/2" style={{ backgroundColor: color }} />
        </div>
      )}

      {symbol === 'deep' && (
        <div className="relative flex h-16 w-16 items-end justify-center gap-2" style={{ opacity }}>
          {[46, 58, 38].map((height, index) => (
            <span
              key={height}
              className="block w-3 rounded-t-full border"
              style={{
                height,
                borderColor: color,
                background: completed ? `linear-gradient(180deg, ${color}44, transparent 78%)` : 'transparent',
                transform: index === 1 ? 'translateY(-5px)' : undefined,
              }}
            />
          ))}
          <span className="absolute bottom-0 left-1/2 h-px w-14 -translate-x-1/2" style={{ backgroundColor: color }} />
        </div>
      )}

      {symbol === 'integration' && (
        <div className="relative h-16 w-16" style={{ opacity }}>
          <span className="absolute left-1/2 top-[5px] h-8 w-px -translate-x-1/2 rotate-0 origin-bottom" style={{ backgroundColor: color }} />
          <span className="absolute left-[15px] top-[33px] h-8 w-px -rotate-[58deg] origin-top" style={{ backgroundColor: color }} />
          <span className="absolute right-[15px] top-[33px] h-8 w-px rotate-[58deg] origin-top" style={{ backgroundColor: color }} />
          <span className="absolute left-1/2 top-[2px] h-4 w-4 -translate-x-1/2 rotate-45 border" style={{ borderColor: color, backgroundColor: completed ? `${color}22` : 'transparent' }} />
          <span className="absolute bottom-[6px] left-[6px] h-4 w-4 rotate-45 border" style={{ borderColor: color, backgroundColor: completed ? `${color}18` : 'transparent' }} />
          <span className="absolute bottom-[6px] right-[6px] h-4 w-4 rotate-45 border" style={{ borderColor: color, backgroundColor: completed ? `${color}18` : 'transparent' }} />
          <span className="absolute left-1/2 top-[30px] h-5 w-5 -translate-x-1/2 rotate-45 border" style={{ borderColor: color, backgroundColor: completed ? `${color}24` : 'transparent' }} />
        </div>
      )}
    </div>
  );
}
