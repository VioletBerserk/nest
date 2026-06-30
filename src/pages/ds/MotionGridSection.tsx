import { useState } from 'react';
import { DSSection, DSTitle, DSPreview } from './DSPrimitives';

/* ── Motion Section ──────────────────────────────────────────────── */
export function MotionSection() {
  const [demoKey, setDemoKey] = useState(0);

  const durations = [
    { token: '75ms',  name: 'Instant',   usage: 'Micro-interactions: checkbox tick, toggle snap' },
    { token: '100ms', name: 'Fast',       usage: 'Icon swap, colour transitions' },
    { token: '150ms', name: 'Swift',      usage: 'Default — button hover, badge appear (most UI)' },
    { token: '200ms', name: 'Snappy',     usage: 'Dropdown open, tooltip show' },
    { token: '250ms', name: 'Smooth',     usage: 'Tab switch, accordion toggle' },
    { token: '300ms', name: 'Flowing',    usage: 'Modal appear, sidebar slide' },
    { token: '400ms', name: 'Generous',   usage: 'Page transitions, hero fade' },
    { token: '500ms', name: 'Deliberate', usage: 'Skeleton loading, card reveal' },
    { token: '700ms', name: 'Slow',       usage: 'Background gradients, ambient motion' },
  ];

  const easings = [
    { token: 'ease-smooth',     css: 'cubic-bezier(0.4, 0, 0.2, 1)',   usage: 'Default — enter and exit' },
    { token: 'ease-out-expo',   css: 'cubic-bezier(0.16, 1, 0.3, 1)',  usage: 'Element enters viewport, panels open' },
    { token: 'ease-spring',     css: 'cubic-bezier(0.34, 1.56, 0.64, 1)', usage: 'Toggle thumbs, scale-in, bouncy confirms' },
    { token: 'ease-in-expo',    css: 'cubic-bezier(0.7, 0, 0.84, 0)',   usage: 'Element exits (fast start, then slow)' },
    { token: 'ease-in-out-expo',css: 'cubic-bezier(0.87, 0, 0.13, 1)', usage: 'Deliberate transitions: tab slides' },
  ];

  const animations = [
    { name: 'fade-in',        class: 'animate-fade-in',        desc: 'Simple opacity fade — tooltips, popovers' },
    { name: 'fade-up',        class: 'animate-fade-up',        desc: 'Fade + translate up — cards entering viewport' },
    { name: 'scale-in',       class: 'animate-scale-in',       desc: 'Scale from 92% — modals, dialogs, dropdowns' },
    { name: 'slide-in-right', class: 'animate-slide-in-right', desc: 'Side panel, notification toast' },
    { name: 'slide-in-left',  class: 'animate-slide-in-left',  desc: 'Navigation drawer, back-panel' },
    { name: 'pulse-soft',     class: 'animate-pulse-soft',     desc: 'Status indicators, skeleton loading' },
    { name: 'shimmer',        class: 'skeleton',               desc: 'Skeleton loading state for content' },
  ];

  return (
    <DSSection id="ds-motion">
      <DSTitle
        number="10 — Motion"
        title="Motion System"
        subtitle="Animation serves clarity. Every motion has a purpose: guiding attention, confirming actions, communicating state. Never animate for decoration alone."
      />

      {/* Principles */}
      <div className="grid md:grid-cols-3 gap-4 mb-12">
        {[
          { principle: 'Purposeful', desc: 'Every animation answers a question: what changed? where did it go? is this working?' },
          { principle: 'Fast by default', desc: 'Most UI transitions are 150ms. Users notice lag more than speed. Err shorter.' },
          { principle: 'Respect preferences', desc: 'All motion is suppressed for users who set prefers-reduced-motion: reduce.' },
        ].map((p) => (
          <div key={p.principle} className="bg-neutral-50 rounded-2xl border border-neutral-200 p-5">
            <h4 className="font-sans font-semibold text-heading-sm text-neutral-800 mb-2">{p.principle}</h4>
            <p className="text-body-sm text-neutral-500 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>

      {/* Duration scale */}
      <div className="mb-12">
        <h3 className="font-sans font-semibold text-heading-sm text-neutral-700 mb-5">Duration Scale</h3>
        <div className="rounded-2xl border border-neutral-200 overflow-hidden">
          {durations.map((d, i) => (
            <div key={d.token} className={`flex items-center gap-5 px-5 py-3 hover:bg-neutral-50 transition-colors ${i < durations.length - 1 ? 'border-b border-neutral-100' : ''}`}>
              <code className="font-mono text-xs text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-md w-14 flex-shrink-0 text-center">{d.token}</code>
              <div
                className="h-1.5 bg-terracotta-400 rounded-full"
                style={{ width: (parseInt(d.token) / 700) * 160 + 16 }}
              />
              <div className="flex-1 min-w-0">
                <span className="text-label-md text-neutral-700 mr-3">{d.name}</span>
                <span className="text-body-sm text-neutral-400 hidden sm:inline">{d.usage}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Easing curves */}
      <div className="mb-12">
        <h3 className="font-sans font-semibold text-heading-sm text-neutral-700 mb-5">Easing Curves</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {easings.map((e) => (
            <div key={e.token} className="bg-white rounded-xl border border-neutral-200 p-4">
              <code className="font-mono text-xs text-terracotta-600 bg-terracotta-50 px-2 py-0.5 rounded-md block mb-2">{e.token}</code>
              <code className="font-mono text-[10px] text-neutral-400 block mb-2 break-all">{e.css}</code>
              <p className="text-body-sm text-neutral-500">{e.usage}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Live animation demos */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-sans font-semibold text-heading-sm text-neutral-700">Live Animation Demos</h3>
          <button
            onClick={() => setDemoKey((k) => k + 1)}
            className="text-label-md text-terracotta-500 hover:text-terracotta-600 border border-terracotta-200 hover:border-terracotta-400 px-4 py-1.5 rounded-lg transition-colors"
          >
            Replay all
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {animations.map((a) => (
            <div key={`${a.name}-${demoKey}`} className="bg-neutral-50 rounded-xl border border-neutral-200 p-5 flex flex-col gap-3">
              <div className={`bg-terracotta-500 text-white rounded-lg h-10 flex items-center justify-center text-label-md ${a.class}`}>
                {a.name}
              </div>
              <p className="text-body-sm text-neutral-500">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </DSSection>
  );
}

/* ── Grid & Layout Section ───────────────────────────────────────── */
export function GridSection() {
  const breakpoints = [
    { name: 'xs',  width: '375px',  desc: 'Small mobile phones — iPhone SE, compact Android' },
    { name: 'sm',  width: '640px',  desc: 'Large phones — iPhone Pro Max, landscape mobile' },
    { name: 'md',  width: '768px',  desc: 'Tablets — iPad portrait, small windows' },
    { name: 'lg',  width: '1024px', desc: 'Laptops — iPad landscape, most laptop screens' },
    { name: 'xl',  width: '1280px', desc: 'Desktop — standard 1280px wide monitors' },
    { name: '2xl', width: '1440px', desc: 'Large desktop — 1440px, MacBook Pro 16"' },
    { name: '3xl', width: '1680px', desc: 'Ultra-wide — large monitors and displays' },
  ];

  return (
    <DSSection id="ds-grid">
      <DSTitle
        number="11 — Grid & Layout"
        title="Responsive Grid System"
        subtitle="12-column fluid grid. Max-width containers at each breakpoint. Mobile-first: design the smallest screen first, then enhance."
      />

      <div className="mb-12">
        <h3 className="font-sans font-semibold text-heading-sm text-neutral-700 mb-5">Breakpoints</h3>
        <div className="rounded-2xl border border-neutral-200 overflow-hidden">
          {breakpoints.map((bp, i) => (
            <div key={bp.name} className={`flex items-center gap-5 px-5 py-3.5 hover:bg-neutral-50 transition-colors ${i < breakpoints.length - 1 ? 'border-b border-neutral-100' : ''}`}>
              <code className="font-mono text-xs bg-neutral-900 text-cream-100 px-2.5 py-1 rounded-lg w-10 text-center flex-shrink-0">{bp.name}</code>
              <code className="font-mono text-xs text-terracotta-600 bg-terracotta-50 px-2 py-0.5 rounded-md w-20 flex-shrink-0">{bp.width}</code>
              <div className="flex-1 hidden sm:block">
                <div className="bg-neutral-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-terracotta-400 rounded-full"
                    style={{ width: `${(parseInt(bp.width) / 1680) * 100}%` }}
                  />
                </div>
              </div>
              <p className="text-body-sm text-neutral-500 hidden md:block">{bp.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h3 className="font-sans font-semibold text-heading-sm text-neutral-700 mb-5">Column Grid — 12 columns</h3>
        <div className="space-y-3">
          {[
            { cols: 12, label: 'col-span-12', desc: 'Full width — hero, page header' },
            { cols: 8,  label: 'col-span-8',  desc: 'Main content area' },
            { cols: 6,  label: 'col-span-6',  desc: '2-column layout' },
            { cols: 4,  label: 'col-span-4',  desc: '3-column layout — feature cards' },
            { cols: 3,  label: 'col-span-3',  desc: '4-column layout — stats, pricing' },
          ].map((c) => (
            <div key={c.cols} className="flex items-center gap-4">
              <div className="w-full grid grid-cols-12 gap-1.5 flex-1">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-8 rounded-md ${i < c.cols ? 'bg-terracotta-400' : 'bg-neutral-100'}`}
                  />
                ))}
              </div>
              <code className="font-mono text-xs text-neutral-500 w-28 flex-shrink-0 hidden md:block">{c.label}</code>
              <p className="text-caption text-neutral-400 flex-shrink-0 hidden lg:block w-40">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-sans font-semibold text-heading-sm text-neutral-700 mb-5">Container System</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'max-w-2xl',   px: '672px',  usage: 'Articles, blog posts, forms' },
            { name: 'max-w-4xl',   px: '896px',  usage: 'Content pages, brief' },
            { name: 'max-w-page',  px: '1200px', usage: 'Full website — default page max' },
            { name: 'max-w-7xl',   px: '1280px', usage: 'Wide layouts' },
            { name: 'container-px', px: '16–32px', usage: 'Horizontal page padding' },
            { name: 'section-py',   px: '80–112px', usage: 'Vertical section padding' },
          ].map((c) => (
            <div key={c.name} className="bg-white rounded-xl border border-neutral-200 p-4">
              <code className="font-mono text-xs text-terracotta-600 bg-terracotta-50 px-2 py-0.5 rounded-md block mb-2">{c.name}</code>
              <p className="text-label-md text-neutral-700 mb-1">{c.px}</p>
              <p className="text-body-sm text-neutral-400">{c.usage}</p>
            </div>
          ))}
        </div>
      </div>
    </DSSection>
  );
}
