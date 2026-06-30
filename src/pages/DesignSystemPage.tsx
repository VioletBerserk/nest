import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { ColorSection } from './ds/ColorSection';
import { TypeSection } from './ds/TypeSection';
import { SpacingSection, ShadowSection, RadiusSection } from './ds/FoundationsSection';
import { ButtonsSection, FormsSection, BadgesSection } from './ds/ComponentsSection';
import { CardsSection } from './ds/CardsSection';
import { MotionSection, GridSection } from './ds/MotionGridSection';
import { IconSection, AccessibilitySection } from './ds/IconAccessSection';

const navGroups = [
  {
    group: 'Foundations',
    items: [
      { id: 'ds-colors',     label: 'Colors' },
      { id: 'ds-type',       label: 'Typography' },
      { id: 'ds-spacing',    label: 'Spacing' },
      { id: 'ds-shadows',    label: 'Shadows' },
      { id: 'ds-radius',     label: 'Border Radius' },
    ],
  },
  {
    group: 'Components',
    items: [
      { id: 'ds-buttons',    label: 'Buttons' },
      { id: 'ds-forms',      label: 'Forms' },
      { id: 'ds-badges',     label: 'Badges & Labels' },
      { id: 'ds-cards',      label: 'Cards' },
    ],
  },
  {
    group: 'System',
    items: [
      { id: 'ds-motion',     label: 'Motion' },
      { id: 'ds-grid',       label: 'Grid & Layout' },
      { id: 'ds-icons',      label: 'Icons' },
      { id: 'ds-accessibility', label: 'Accessibility' },
    ],
  },
];

const allNavItems = navGroups.flatMap((g) => g.items);

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

function Sidebar({ activeSection, onNav }: { activeSection: string; onNav: (id: string) => void }) {
  return (
    <nav className="space-y-5 py-6">
      {navGroups.map((g) => (
        <div key={g.group}>
          <p className="text-overline text-neutral-400 uppercase px-4 mb-2">{g.group}</p>
          {g.items.map((item) => (
            <button
              key={item.id}
              onClick={() => onNav(item.id)}
              className={[
                'w-full text-left text-label-md px-4 py-2 rounded-lg transition-all duration-100',
                activeSection === item.id
                  ? 'bg-terracotta-50 text-terracotta-600 font-semibold'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100',
              ].join(' ')}
            >
              {item.label}
            </button>
          ))}
        </div>
      ))}
    </nav>
  );
}

export default function DesignSystemPage() {
  const [activeSection, setActiveSection] = useState('ds-colors');
  const [mobileNav, setMobileNav] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      for (let i = allNavItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(allNavItems[i].id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(allNavItems[i].id);
          return;
        }
      }
      setActiveSection(allNavItems[0].id);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id: string) => {
    scrollTo(id);
    setMobileNav(false);
  };

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Top bar */}
      <div className="sticky top-0 z-sticky border-b border-neutral-200 bg-cream-100/95 backdrop-blur-md">
        <div className="max-w-page mx-auto container-px flex items-center h-14 gap-4">
          <button
            onClick={() => setMobileNav(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <Menu size={18} className="text-neutral-600" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-terracotta-500 rounded-lg flex items-center justify-center">
              <span className="font-serif text-white font-bold text-xs">N</span>
            </div>
            <span className="font-serif font-semibold text-neutral-900 text-sm">NEST</span>
            <span className="text-neutral-300 mx-1">/</span>
            <span className="text-label-md text-neutral-500">Design System</span>
          </div>
          <div className="flex-1" />
          <div className="hidden lg:flex items-center gap-1">
            <span className="text-caption text-neutral-400 bg-neutral-100 px-2.5 py-1 rounded-full">v1.0</span>
            <span className="text-caption text-neutral-400 bg-neutral-100 px-2.5 py-1 rounded-full">Tailwind CSS</span>
            <span className="text-caption text-neutral-400 bg-neutral-100 px-2.5 py-1 rounded-full">React</span>
          </div>
        </div>
      </div>

      <div className="max-w-page mx-auto container-px">
        <div className="flex gap-10">
          {/* Sidebar — desktop */}
          <aside className="hidden lg:block w-52 flex-shrink-0 sticky top-14 self-start h-[calc(100vh-3.5rem)] overflow-y-auto scrollbar-hide">
            <Sidebar activeSection={activeSection} onNav={handleNav} />
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Hero */}
            <div className="py-14 border-b border-neutral-200">
              <p className="text-overline text-terracotta-500 uppercase mb-4">NEST · Visual Identity</p>
              <h1 className="font-serif text-display-lg text-neutral-900 leading-tight mb-5">
                Design System
              </h1>
              <p className="text-body-xl text-neutral-500 max-w-2xl leading-relaxed mb-8">
                A complete visual language for the NEST brand. Every token, component, pattern, and
                principle needed to build consistent, accessible, and beautiful digital experiences.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { n: '4', l: 'Color ramps' },
                  { n: '20+', l: 'Type tokens' },
                  { n: '9', l: 'Shadow levels' },
                  { n: '6', l: 'Button variants' },
                  { n: '8', l: 'Form elements' },
                  { n: 'AA+', l: 'WCAG compliance' },
                ].map((s) => (
                  <div key={s.l} className="bg-white rounded-xl border border-neutral-200 px-4 py-3 text-center">
                    <p className="font-serif text-display-sm text-terracotta-500">{s.n}</p>
                    <p className="text-caption text-neutral-400">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            <ColorSection />
            <TypeSection />
            <SpacingSection />
            <ShadowSection />
            <RadiusSection />
            <ButtonsSection />
            <FormsSection />
            <BadgesSection />
            <CardsSection />
            <MotionSection />
            <GridSection />
            <IconSection />
            <AccessibilitySection />
          </div>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileNav && (
        <div className="fixed inset-0 z-modal" onClick={() => setMobileNav(false)}>
          <div className="absolute inset-0 bg-neutral-900/50 backdrop-blur-sm" />
          <div
            className="absolute left-0 top-0 bottom-0 w-64 bg-cream-50 shadow-2xl overflow-y-auto animate-slide-in-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200">
              <span className="font-sans font-semibold text-neutral-800 text-sm">Design System</span>
              <button onClick={() => setMobileNav(false)} className="p-1.5 rounded-lg hover:bg-neutral-100">
                <X size={16} className="text-neutral-500" />
              </button>
            </div>
            <Sidebar activeSection={activeSection} onNav={handleNav} />
          </div>
        </div>
      )}
    </div>
  );
}
