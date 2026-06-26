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

  return (
    <div className="flex min-h-screen bg-[#FDFCFA]">
      {/* MARKER-MAKE-KIT-INVOKED */}
      <Sidebar activeSection={activeSection} onNavigate={setActiveSection} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 py-10 md:px-8 md:py-12">
          <PartDivider
            step={1}
            part="Part 1"
            label="Overview"
            title="Overview"
            body="Foundations, domains, dimensions, and shape."
          />

          <div id="orientation" className="scroll-mt-24">
            <Orientation />
          </div>

          <div id="your-domains" className="mt-28 scroll-mt-24">
            <YourDomains />
          </div>

          <div id="your-shape" className="mt-28 scroll-mt-24">
            <YourShape />
          </div>

          <PartDivider
            step={2}
            part="Part 2"
            label="Domain deep dive"
            title="Domain deep dive"
            body="Safety, Play, and Challenge read as lived systems."
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
            part="Part 3"
            label="Integration"
            title="Integration"
            body="The foundations return to one architecture."
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
  part,
  label,
  title,
  body,
  className = '',
}: {
  step: 1 | 2 | 3;
  part: string;
  label: string;
  title: string;
  body: string;
  className?: string;
}) {
  const steps = ['Overview', 'Deep dive', 'Integration'];
  return (
    <section
      className={`relative left-1/2 w-screen -translate-x-1/2 border-y border-[#E7E0D6] bg-[#F4F0E9] px-4 py-8 shadow-[0_22px_52px_-48px_rgba(26,22,20,0.42)] md:w-[calc(100vw-13rem)] md:px-8 ${className}`}
    >
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-[0.72fr_1fr_auto] md:items-center">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-9 bg-[#DC4C0C]" />
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#9B3B14]">
              {part} · {label}
            </p>
          </div>
          <h2
            style={{
              fontFamily: '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif',
              fontSize: 'clamp(1.75rem, 2.8vw, 2.55rem)',
              lineHeight: 1,
              letterSpacing: '-0.04em',
              color: '#171411',
            }}
          >
            {title}
          </h2>
        </div>
        <p className="max-w-xl text-[14px] leading-relaxed text-[#5F5952]" style={{ fontWeight: 300 }}>
          {body}
        </p>
        <div className="min-w-[190px] rounded-full border border-[#E1D9CD] bg-[#FDFCFA]/72 px-4 py-3">
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#8B8682]">Report path</span>
            <span className="text-[10px] font-bold tabular-nums text-[#9B3B14]">{step}/3</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5" aria-label={`${part} of 3`}>
            {steps.map((name, index) => {
              const active = index + 1 <= step;
              return (
                <span
                  key={name}
                  className="h-1.5 rounded-full"
                  style={{ backgroundColor: active ? '#DC4C0C' : '#D8D0C5' }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
