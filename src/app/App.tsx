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
            part="Part 1"
            label="Overview"
            title="First, the whole profile."
            body="This opening part orients you to the foundations, shows the domain results, and names the shape those results create together."
            tone="light"
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
            part="Part 2"
            label="Domain deep dive"
            title="Now we go inside the foundations."
            body="You have seen the domains, dimensions, and overall shape. The next part reads each domain as a lived system: what your level means, where alignment is flagged, and how the dimensions underneath are carrying the profile."
            tone="dark"
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
            part="Part 3"
            label="Integration"
            title="Now we bring the system back together."
            body="After the domain deep dive, the report returns to the whole architecture: how the foundations lean on each other, where the reading points, and what strengthening the base could change."
            tone="dark"
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
  part,
  label,
  title,
  body,
  tone,
  className = '',
}: {
  part: string;
  label: string;
  title: string;
  body: string;
  tone: 'light' | 'dark';
  className?: string;
}) {
  const isDark = tone === 'dark';
  return (
    <section
      className={`relative left-1/2 w-screen -translate-x-1/2 px-4 py-12 shadow-[0_26px_70px_-52px_rgba(26,22,20,0.62)] md:w-[calc(100vw-13rem)] md:px-8 ${className}`}
      style={{
        backgroundColor: isDark ? '#1A1614' : '#F3EFE7',
        color: isDark ? '#FFFFFF' : '#1A1614',
      }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-7 flex items-center gap-3">
          <span className="h-px w-10" style={{ backgroundColor: isDark ? '#FFBB30' : '#DC4C0C' }} />
          <p
            className="text-[11px] uppercase tracking-[0.2em] font-bold"
            style={{ color: isDark ? '#FFBB30' : '#9B3B14' }}
          >
            {part} · {label}
          </p>
        </div>
        <div className="mt-4 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <h2
            style={{
              fontFamily: '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif',
              fontSize: 'clamp(2rem, 3.4vw, 3rem)',
              lineHeight: 1,
              letterSpacing: '-0.04em',
            }}
          >
            {title}
          </h2>
          <p
            className="text-[15px] leading-relaxed"
            style={{ fontWeight: 300, color: isDark ? 'rgba(255,255,255,0.78)' : '#5F5952' }}
          >
            {body}
          </p>
        </div>
      </div>
    </section>
  );
}
