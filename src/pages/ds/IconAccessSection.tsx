import { DSSection, DSTitle } from './DSPrimitives';
import {
  Heart, Search, Menu, X, ChevronRight, ChevronDown, ArrowRight, ArrowLeft,
  Plus, Minus, Check, AlertCircle, Info, Star, MapPin, Clock, Calendar,
  User, Users, Mail, Phone, Home, Settings, LogOut, Bell, Bookmark,
  Camera, Music, Palette, BookOpen, Coffee, Globe, Loader2, Eye, EyeOff,
} from 'lucide-react';

const iconGroups = [
  {
    name: 'Navigation & Actions',
    icons: [
      { icon: <Menu />, name: 'Menu' },
      { icon: <X />, name: 'Close' },
      { icon: <Search />, name: 'Search' },
      { icon: <ArrowRight />, name: 'Arrow Right' },
      { icon: <ArrowLeft />, name: 'Arrow Left' },
      { icon: <ChevronRight />, name: 'Chevron Right' },
      { icon: <ChevronDown />, name: 'Chevron Down' },
      { icon: <Plus />, name: 'Plus' },
      { icon: <Minus />, name: 'Minus' },
    ],
  },
  {
    name: 'Status & Feedback',
    icons: [
      { icon: <Check />, name: 'Check' },
      { icon: <AlertCircle />, name: 'Alert' },
      { icon: <Info />, name: 'Info' },
      { icon: <Loader2 />, name: 'Loading' },
      { icon: <Eye />, name: 'Eye' },
      { icon: <EyeOff />, name: 'Eye Off' },
      { icon: <Bell />, name: 'Bell' },
      { icon: <Star />, name: 'Star' },
    ],
  },
  {
    name: 'Content & Community',
    icons: [
      { icon: <Heart />, name: 'Heart' },
      { icon: <Bookmark />, name: 'Bookmark' },
      { icon: <Users />, name: 'Users' },
      { icon: <User />, name: 'User' },
      { icon: <Mail />, name: 'Mail' },
      { icon: <Phone />, name: 'Phone' },
      { icon: <Camera />, name: 'Camera' },
      { icon: <Globe />, name: 'Globe' },
    ],
  },
  {
    name: 'NEST-specific',
    icons: [
      { icon: <Coffee />, name: 'Café' },
      { icon: <Palette />, name: 'Creative' },
      { icon: <BookOpen />, name: 'Learning' },
      { icon: <Music />, name: 'Music' },
      { icon: <MapPin />, name: 'Location' },
      { icon: <Clock />, name: 'Time' },
      { icon: <Calendar />, name: 'Event' },
      { icon: <Home />, name: 'Home' },
    ],
  },
  {
    name: 'App & Settings',
    icons: [
      { icon: <Settings />, name: 'Settings' },
      { icon: <LogOut />, name: 'Log Out' },
    ],
  },
];

const sizes = [
  { px: 12, label: 'xs', usage: 'Badge icons, inline tiny' },
  { px: 14, label: 'sm', usage: 'Button icons SM, caption' },
  { px: 16, label: 'md', usage: 'Default — button icons, form' },
  { px: 18, label: 'lg', usage: 'Feature list, nav items' },
  { px: 20, label: 'xl', usage: 'Card icons, section headers' },
  { px: 24, label: '2xl', usage: 'Large feature icons' },
  { px: 32, label: '3xl', usage: 'Empty state icons' },
  { px: 48, label: '4xl', usage: 'Hero illustrations' },
];

export function IconSection() {
  return (
    <DSSection id="ds-icons">
      <DSTitle
        number="12 — Icons"
        title="Icon System"
        subtitle="Lucide React — 1,400+ consistent, stroke-based icons. Always use stroke icons, never filled. Current colour inherits from parent text colour."
      />

      {/* Size scale */}
      <div className="mb-12">
        <h3 className="font-sans font-semibold text-heading-sm text-neutral-700 mb-5">Size Scale</h3>
        <div className="flex items-end gap-6 flex-wrap bg-neutral-50 rounded-2xl border border-neutral-200 p-6">
          {sizes.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-2">
              <Heart size={s.px} className="text-terracotta-500" />
              <p className="text-caption text-neutral-500">{s.label}</p>
              <p className="text-[10px] text-neutral-400">{s.px}px</p>
            </div>
          ))}
        </div>
      </div>

      {/* Usage rules */}
      <div className="grid md:grid-cols-3 gap-4 mb-12">
        {[
          {
            title: 'Stroke weight = 1.5px',
            desc: 'Never adjust stroke width. Default Lucide weight matches the NEST type weight. Heavier strokes feel clunky.',
            good: 'strokeWidth={1.5} (default)',
            bad: 'strokeWidth={2} or strokeWidth={3}',
          },
          {
            title: 'Colour inherits',
            desc: 'Set icon colour via parent text colour using currentColor. Never hardcode hex values in icon props.',
            good: '<Heart className="text-terracotta-500" />',
            bad: '<Heart color="#C4715A" />',
          },
          {
            title: 'Icons never alone',
            desc: 'Interactive icons always have an accessible label. Use aria-label or a visible text label nearby.',
            good: '<IconButton label="Close dialog"><X /></IconButton>',
            bad: '<button><X /></button>',
          },
        ].map((r) => (
          <div key={r.title} className="bg-white rounded-2xl border border-neutral-200 p-5">
            <h4 className="font-sans font-semibold text-heading-sm text-neutral-800 mb-2">{r.title}</h4>
            <p className="text-body-sm text-neutral-500 leading-relaxed mb-3">{r.desc}</p>
            <div className="space-y-1.5">
              <code className="text-[11px] text-success-700 bg-success-50 px-2 py-1 rounded block">{r.good}</code>
              <code className="text-[11px] text-error-700 bg-error-50 px-2 py-1 rounded block">{r.bad}</code>
            </div>
          </div>
        ))}
      </div>

      {/* Icon library */}
      {iconGroups.map((group) => (
        <div key={group.name} className="mb-8">
          <p className="text-overline text-neutral-400 uppercase mb-4">{group.name}</p>
          <div className="flex flex-wrap gap-3">
            {group.icons.map((ic) => (
              <div
                key={ic.name}
                className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-white border border-neutral-200 hover:border-terracotta-300 hover:bg-terracotta-50 transition-all cursor-default w-20"
              >
                <span className="text-neutral-600 group-hover:text-terracotta-500 transition-colors [&>svg]:size-5">
                  {ic.icon}
                </span>
                <p className="text-[10px] text-neutral-400 text-center leading-tight">{ic.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </DSSection>
  );
}

/* ── Accessibility Section ───────────────────────────────────────── */
export function AccessibilitySection() {
  const contrastPairs = [
    { fg: '#1C1410', bg: '#FAF5EE', ratio: '14.8:1', grade: 'AAA', context: 'Body text on page background' },
    { fg: '#1C1410', bg: '#FFFFFF', ratio: '18.1:1', grade: 'AAA', context: 'Body text on white surface' },
    { fg: '#C4715A', bg: '#FFFFFF', ratio: '4.6:1',  grade: 'AA',  context: 'Terracotta on white — large text only' },
    { fg: '#FFFFFF', bg: '#C4715A', ratio: '4.6:1',  grade: 'AA',  context: 'White on terracotta button — passes' },
    { fg: '#FFFFFF', bg: '#3D5A47', ratio: '7.1:1',  grade: 'AAA', context: 'White on sage — excellent contrast' },
    { fg: '#FFFFFF', bg: '#1C1410', ratio: '18.1:1', grade: 'AAA', context: 'White on espresso — hero text' },
    { fg: '#6B6059', bg: '#FFFFFF', ratio: '6.2:1',  grade: 'AA',  context: 'Secondary text on white — passes' },
    { fg: '#A89E96', bg: '#FFFFFF', ratio: '2.9:1',  grade: 'Fail', context: 'Muted text — never use for readable content' },
  ];

  const rules = [
    { rule: 'Minimum contrast', detail: '4.5:1 for body text, 3:1 for large text (18px+ or 14px+ bold), 3:1 for UI components' },
    { rule: 'Focus rings', detail: 'Every interactive element has a 2px terracotta ring on keyboard focus. Never suppress :focus-visible.' },
    { rule: 'Touch targets', detail: 'Minimum 44×44px tap target on mobile. Use h-11 (44px) or larger for touch controls.' },
    { rule: 'Labels', detail: 'Every form input has an associated <label>. Icon-only buttons have aria-label. No placeholder-as-label.' },
    { rule: 'Colour alone', detail: 'Never use colour as the only indicator of state. Always pair with icon, text, or pattern.' },
    { rule: 'Error messages', detail: 'Error state uses colour + icon + descriptive text. Screen reader announces the error on focus.' },
    { rule: 'Keyboard nav', detail: 'All interactive elements are reachable via Tab. Logical tab order follows visual reading order.' },
    { rule: 'Motion', detail: 'All animations respect prefers-reduced-motion: reduce. Essential state changes use opacity only.' },
    { rule: 'Language', detail: 'html[lang="ru"] or lang="en" set on all pages. Bilingual content uses lang attributes on mixed-language spans.' },
    { rule: 'Alt text', detail: 'All images have descriptive alt text. Decorative images use alt="". Complex images have extended descriptions.' },
  ];

  return (
    <DSSection id="ds-accessibility">
      <DSTitle
        number="13 — Accessibility"
        title="Accessibility Standards"
        subtitle="NEST targets WCAG 2.1 AA compliance minimum. AA is the legal standard in most countries. We push for AAA on all critical text. Accessibility is not a checklist — it is a commitment."
      />

      {/* Contrast */}
      <div className="mb-12">
        <h3 className="font-sans font-semibold text-heading-sm text-neutral-700 mb-5">Colour Contrast Pairs</h3>
        <div className="rounded-2xl border border-neutral-200 overflow-hidden">
          {contrastPairs.map((p, i) => (
            <div key={i} className={`flex items-center gap-4 px-5 py-3.5 ${i < contrastPairs.length - 1 ? 'border-b border-neutral-100' : ''}`}>
              <div
                className="w-24 h-9 rounded-lg flex-shrink-0 flex items-center justify-center text-label-sm font-semibold"
                style={{ backgroundColor: p.bg, color: p.fg }}
              >
                Aa
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-body-sm text-neutral-600 truncate">{p.context}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <code className="font-mono text-xs text-neutral-500">{p.ratio}</code>
                <span className={`text-label-sm font-semibold px-2 py-0.5 rounded-lg text-xs ${
                  p.grade === 'AAA' ? 'bg-success-50 text-success-700' :
                  p.grade === 'AA'  ? 'bg-sage-50 text-sage-600' :
                  'bg-error-50 text-error-600'
                }`}>
                  {p.grade}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rules */}
      <div>
        <h3 className="font-sans font-semibold text-heading-sm text-neutral-700 mb-5">Non-Negotiable Rules</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {rules.map((r) => (
            <div key={r.rule} className="flex gap-3 bg-white rounded-xl border border-neutral-200 p-4">
              <Check size={14} className="text-success-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-label-md text-neutral-800 mb-1">{r.rule}</p>
                <p className="text-body-sm text-neutral-500 leading-relaxed">{r.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DSSection>
  );
}
