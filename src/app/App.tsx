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
        <div className="max-w-5xl mx-auto px-8 py-12">
          <div id="orientation">
            <Orientation />
          </div>

          <div id="your-domains" className="mt-28">
            <YourDomains />
          </div>

          <div id="your-shape" className="mt-28">
            <YourShape />
          </div>

          <JourneyMarker />

          <div id="safety" className="mt-28">
            <DomainSection
              domain="Safety"
              score={27}
              band="Very Low"
              felt={22}
              expressed={35}
              color="#42A68E"
            />
          </div>

          <div id="play" className="mt-28">
            <DomainSection
              domain="Play"
              score={41}
              band="Low"
              felt={38}
              expressed={47}
              color="#FFAB00"
            />
          </div>

          <div id="challenge" className="mt-28">
            <DomainSection
              domain="Challenge"
              score={78}
              band="High"
              felt={75}
              expressed={77}
              color="#DC4C0C"
            />
          </div>

          <div id="foundations-together" className="mt-28">
            <HowFoundationsWork />
          </div>

          <div id="direction" className="mt-28">
            <FoundationDirection />
          </div>

          <div id="when-ready" className="mt-28">
            <WhenReady />
          </div>

          <div id="design-notes" className="mt-28">
            <DesignNotes />
          </div>
        </div>
      </main>
    </div>
  );
}

function JourneyMarker() {
  return (
    <section className="relative left-1/2 mt-28 w-[calc(100vw-13rem)] -translate-x-1/2 bg-[#1A1614] px-8 py-14 text-white shadow-[0_26px_70px_-52px_rgba(26,22,20,0.72)]">
      <div className="mx-auto max-w-5xl">
        <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#FFBB30]">Part 2 · Domain deep dive</p>
        <div className="mt-4 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <h2
            style={{
              fontFamily: '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif',
              fontSize: 'clamp(2rem, 3.4vw, 3rem)',
              lineHeight: 1,
              letterSpacing: '-0.04em',
            }}
          >
            Now we go inside the foundations.
          </h2>
          <p className="text-[15px] leading-relaxed text-white/78" style={{ fontWeight: 300 }}>
            You have seen the domains, dimensions, and overall shape. The next part reads each domain as a lived system: what your level means, where alignment is flagged, and how the dimensions underneath are carrying the profile.
          </p>
        </div>
      </div>
    </section>
  );
}
