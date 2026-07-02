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
            title="Overview"
            body="Start here to see the whole architecture before any one score asks for attention. This is the map that makes the rest of the report legible."
          />

          <div id="orientation" className="mt-16 scroll-mt-24">
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
            title="Domain deep dive"
            body="Now the map becomes personal. Each foundation opens into the specific places your system steadies, restores, and drives itself."
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
            body="The final part recomposes the reading into one operating pattern, so insight can become direction rather than information."
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
    { number: 1, label: 'Orient' },
    { number: 2, label: 'Deepen' },
    { number: 3, label: 'Integrate' },
  ] as const;
  return (
    <section
      className={`relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#191410] px-4 py-12 text-white shadow-[0_28px_76px_-54px_rgba(26,22,20,0.78)] md:w-[calc(100vw-13rem)] md:px-8 ${className}`}
    >
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background: 'radial-gradient(circle at 16% 28%, rgba(255,187,48,0.13), transparent 24%), radial-gradient(circle at 84% 58%, rgba(220,76,12,0.16), transparent 34%), linear-gradient(112deg, #191410 0%, #221B15 100%)',
        }}
      />
      <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <div className="absolute -right-16 top-1/2 h-52 w-52 -translate-y-1/2 rotate-45 border border-white/[0.06]" />
      <div className="relative mx-auto grid max-w-5xl gap-8 md:grid-cols-[0.58fr_1fr] md:items-center">
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#FFBB30]">Report journey</p>
            <div className="h-px flex-1 bg-white/12" />
          </div>

          <div className="grid max-w-sm grid-cols-3 gap-3" aria-label={`Report journey stage ${step} of 3`}>
            {steps.map(item => {
              const completed = item.number <= step;
              const active = item.number === step;
              return (
                <div key={item.number} className="flex items-center gap-2">
                  <span
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/12 bg-white/[0.035]"
                    style={{
                      boxShadow: active ? '0 0 34px rgba(255,187,48,0.28)' : undefined,
                    }}
                  >
                    <span
                      className="block h-2.5 w-2.5 rotate-45"
                      style={{
                        backgroundColor: completed ? '#FFBB30' : 'rgba(255,255,255,0.2)',
                      }}
                    />
                  </span>
                  <span
                    className="text-[9px] font-extrabold uppercase tracking-[0.14em]"
                    style={{ color: completed ? 'rgba(255,255,255,0.86)' : 'rgba(255,255,255,0.34)' }}
                  >
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>

          <h2
            style={{
              fontFamily: '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif',
              fontSize: 'clamp(1.75rem, 2.8vw, 2.55rem)',
              lineHeight: 1,
              letterSpacing: '-0.04em',
              color: '#FFFFFF',
            }}
          >
            {title}
          </h2>
        </div>
        <div className="relative max-w-2xl md:pl-4">
          <p className="text-[15px] leading-relaxed text-white/74" style={{ fontWeight: 300 }}>
            {body}
          </p>
        </div>
      </div>
    </section>
  );
}
