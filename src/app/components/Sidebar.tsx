import { useState, useEffect, useRef } from 'react';
import { LayoutGrid } from 'lucide-react';
import DimensionalLogo from "../../imports/Dimensional_Symbol.svg";

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const subMenus: Record<string, { id: string; label: string }[]> = {
  safety: [
    { id: 'safety-overview',   label: 'Overview' },
    { id: 'safety-alignment',  label: 'Alignment' },
    { id: 'safety-self',       label: 'Self' },
    { id: 'safety-others',     label: 'Others' },
  ],
  play: [
    { id: 'play-overview',     label: 'Overview' },
    { id: 'play-alignment',    label: 'Alignment' },
    { id: 'play-senses',       label: 'Senses' },
    { id: 'play-perception',   label: 'Perception' },
  ],
  challenge: [
    { id: 'challenge-overview',  label: 'Overview' },
    { id: 'challenge-alignment', label: 'Alignment' },
    { id: 'challenge-past',      label: 'Past' },
    { id: 'challenge-future',    label: 'Future' },
  ],
};

const sections = [
  { id: 'orientation',          label: '1. Start' },
  { id: 'your-domains',         label: '2. Your Domains' },
  { id: 'your-shape',           label: '3. Your Shape' },
  { id: 'safety',               label: '4. Safety' },
  { id: 'play',                 label: '5. Play' },
  { id: 'challenge',            label: '6. Challenge' },
  { id: 'foundations-together', label: '7. Foundations Together' },
  { id: 'direction',            label: '8. Your Direction' },
  { id: 'when-ready',           label: "9. When You're Ready" },
];

export function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  const [activeSubItem, setActiveSubItem] = useState<string>('');
  const onNavigateRef = useRef(onNavigate);
  useEffect(() => { onNavigateRef.current = onNavigate; }, [onNavigate]);

  // ── Track main sections via scroll ──
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) onNavigateRef.current(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // ── Track sub-items for the active domain ──
  useEffect(() => {
    const items = subMenus[activeSection];
    if (!items) { setActiveSubItem(''); return; }

    // Default to overview when domain becomes active
    setActiveSubItem(`${activeSection}-overview`);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveSubItem(visible[0].target.id);
      },
      { rootMargin: '-15% 0px -55% 0px', threshold: 0 }
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [activeSection]);

  return (
    <aside className="w-52 bg-white border-r border-[#E5E3DD] flex flex-col h-screen sticky top-0">

      {/* ── Branding ── */}
      <div className="py-7 px-5 flex flex-col items-center text-center flex-shrink-0">
        <img src={DimensionalLogo} alt="Dimensional" className="w-14 h-14 mb-4" />
        <p style={{
          fontFamily: '"Neue Haas Grotesk Display Pro", "Neue Haas Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
          fontWeight: 700,
          letterSpacing: '0.22em',
          fontSize: '12px',
          width: '100%',
          textAlign: 'center',
        }} className="text-[#1A1614]">
          DIMENSIONAL
        </p>
        
      </div>
      {/* Fading separator */}
      <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, #E5E3DD 25%, #E5E3DD 75%, transparent)', flexShrink: 0 }} />

      {/* ── Nav ── */}
      <nav className="flex-1 py-4 px-2.5 overflow-y-auto">
        <ul className="space-y-0">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            const num = section.label.match(/^\d+/)?.[0] ?? '';
            const name = section.label.replace(/^\d+\.\s*/, '');
            const items = subMenus[section.id];

            return (
              <li key={section.id}>
                <button
                  onClick={() => {
                    onNavigate(section.id);
                    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full text-left py-4 pl-2.5 pr-3 transition-all flex items-center gap-2.5 border-l-2 ${
                    isActive
                      ? 'border-[#FF6B2B] text-[#FF6B2B]'
                      : 'border-transparent text-[#5C5854] hover:text-[#1A1614]'
                  }`}
                >
                  <span className={`flex-shrink-0 rounded-full flex items-center justify-center leading-none transition-all ${
                    isActive
                      ? 'w-7 h-7 text-sm bg-[#FF6B2B] text-white'
                      : 'w-5 h-5 text-[10px] border border-[#D0CEC9] text-[#8B8682]'
                  }`}>
                    {num}
                  </span>
                  <span className={`transition-all ${isActive ? 'text-sm' : 'text-xs'}`}>{name}</span>
                </button>

                {/* Sub-menu for domain sections */}
                {items && isActive && (
                  <div className="ml-5 mt-0.5 mb-2 relative">
                    <div
                      className="absolute border-l border-dotted border-[#D0CEC9]"
                      style={{ left: '6px', top: '14px', bottom: '14px' }}
                    />
                    {items.map((item) => {
                      const subActive = activeSubItem === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveSubItem(item.id);
                            document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className={`w-full text-left py-2.5 pl-5 transition-all relative flex items-center ${
                            subActive ? 'text-[#FF6B2B] text-xs' : 'text-[#8B8682] text-[10px] hover:text-[#1A1614]'
                          }`}
                        >
                          <span className={`absolute left-[3px] top-1/2 -translate-y-1/2 rounded-full border transition-all ${
                            subActive
                              ? 'w-[9px] h-[9px] bg-[#FF6B2B] border-[#FF6B2B]'
                              : 'w-[5px] h-[5px] bg-white border-[#D0CEC9]'
                          }`} />
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── Profile footer ── */}
      <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, #E5E3DD 25%, #E5E3DD 75%, transparent)', flexShrink: 0 }} />
      <div className="p-3 flex-shrink-0">
        <button className="w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg hover:bg-[#F8F6F3] transition-colors text-left group">
          <div className="w-8 h-8 rounded-full bg-[#E5E3DD] flex items-center justify-center text-sm text-[#5C5854] flex-shrink-0">
            A
          </div>
          <span className="text-sm text-[#1A1614] flex-1 truncate" style={{ fontWeight: 500 }}>Alex</span>
          <LayoutGrid className="w-3.5 h-3.5 text-[#C0BDB8] flex-shrink-0 group-hover:text-[#8B8682] transition-colors" />
        </button>
      </div>

    </aside>
  );
}
