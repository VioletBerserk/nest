import { DSSection, DSTitle, TokenChip } from './DSPrimitives';

/* ── Spacing Section ─────────────────────────────────────────────── */
export function SpacingSection() {
  const tokens = [
    { token: 'space-0.5', px: 2,   rem: '0.125rem', usage: 'Micro gap (icon + text)' },
    { token: 'space-1',   px: 4,   rem: '0.25rem',  usage: 'Tiny gap (badge padding)' },
    { token: 'space-1.5', px: 6,   rem: '0.375rem', usage: 'Compact padding' },
    { token: 'space-2',   px: 8,   rem: '0.5rem',   usage: 'Base unit — all multiples start here', base: true },
    { token: 'space-3',   px: 12,  rem: '0.75rem',  usage: 'Form field padding' },
    { token: 'space-4',   px: 16,  rem: '1rem',     usage: 'Default component padding' },
    { token: 'space-5',   px: 20,  rem: '1.25rem',  usage: 'Card inner padding' },
    { token: 'space-6',   px: 24,  rem: '1.5rem',   usage: 'Section gap, card padding' },
    { token: 'space-8',   px: 32,  rem: '2rem',     usage: 'Large component spacing' },
    { token: 'space-10',  px: 40,  rem: '2.5rem',   usage: 'Section padding' },
    { token: 'space-12',  px: 48,  rem: '3rem',     usage: 'Large section spacing' },
    { token: 'space-16',  px: 64,  rem: '4rem',     usage: 'Container padding' },
    { token: 'space-20',  px: 80,  rem: '5rem',     usage: 'Page-level padding' },
    { token: 'space-24',  px: 96,  rem: '6rem',     usage: 'Section margins' },
    { token: 'space-32',  px: 128, rem: '8rem',     usage: 'Large section margins' },
  ];

  return (
    <DSSection id="ds-spacing">
      <DSTitle
        number="03 — Spacing"
        title="Spacing System"
        subtitle="8px base grid. Every spacing value is a multiple of 4px. Consistency at every scale creates visual rhythm."
      />

      {/* Visual scale */}
      <div className="mb-10">
        <div className="space-y-2">
          {tokens.map((t) => (
            <div key={t.token} className={`flex items-center gap-4 py-2 px-4 rounded-lg transition-colors hover:bg-neutral-50 ${t.base ? 'bg-terracotta-50 border border-terracotta-100' : ''}`}>
              <div className="w-32 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div
                    className="bg-terracotta-400 rounded-sm flex-shrink-0"
                    style={{ width: Math.min(t.px, 128), height: 16 }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <TokenChip>{t.token}</TokenChip>
                <span className="text-label-md text-neutral-700 w-10 text-right flex-shrink-0">{t.px}px</span>
                <TokenChip>{t.rem}</TokenChip>
                <span className="text-body-sm text-neutral-400 hidden md:block truncate">{t.usage}</span>
                {t.base && <span className="text-label-sm text-terracotta-600 font-semibold">← base unit</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Usage principle */}
      <div className="grid md:grid-cols-3 gap-5">
        {[
          { rule: '4px multiples only', desc: 'Every spacing value must be a multiple of 4px. No arbitrary values like 7px or 13px.', good: '8px, 12px, 16px, 24px', bad: '7px, 11px, 15px' },
          { rule: '8px base unit',       desc: 'The 8px unit (space-2) is the fundamental building block. Compound spacings use 2×, 3×, 4× multiples.', good: 'gap-2, gap-4, gap-6, gap-8', bad: 'gap-[10px], gap-[7px]' },
          { rule: 'Contextual meaning',  desc: 'Spacing communicates relationship strength. Close spacing = related. Far spacing = separate.', good: 'gap-1.5 within items, gap-6 between groups', bad: 'Same gap for everything' },
        ].map((r) => (
          <div key={r.rule} className="bg-white rounded-2xl border border-neutral-200 p-6">
            <h4 className="font-sans font-semibold text-heading-sm text-neutral-800 mb-2">{r.rule}</h4>
            <p className="text-body-sm text-neutral-500 leading-relaxed mb-4">{r.desc}</p>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-success-500 text-xs mt-0.5">✓</span>
                <code className="text-body-xs text-success-700 bg-success-50 px-2 py-0.5 rounded">{r.good}</code>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-error-500 text-xs mt-0.5">✗</span>
                <code className="text-body-xs text-error-700 bg-error-50 px-2 py-0.5 rounded">{r.bad}</code>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DSSection>
  );
}

/* ── Shadows Section ─────────────────────────────────────────────── */
export function ShadowSection() {
  const shadows = [
    { name: 'xs',     class: 'shadow-xs',    desc: 'Subtle lift — badges, pills', css: '0 1px 2px rgba(28,20,16,0.05)' },
    { name: 'sm',     class: 'shadow-sm',    desc: 'Default lift — buttons, tags', css: '0 1px 3px rgba(28,20,16,0.08)' },
    { name: 'md',     class: 'shadow-md',    desc: 'Raised — headers, sticky bars', css: '0 4px 6px rgba(28,20,16,0.08)' },
    { name: 'lg',     class: 'shadow-lg',    desc: 'Floating — dropdowns, popovers', css: '0 10px 15px rgba(28,20,16,0.08)' },
    { name: 'xl',     class: 'shadow-xl',    desc: 'High lift — drawers, panels', css: '0 20px 25px rgba(28,20,16,0.08)' },
    { name: '2xl',    class: 'shadow-2xl',   desc: 'Maximum elevation — modals', css: '0 25px 50px rgba(28,20,16,0.18)' },
    { name: 'card',   class: 'shadow-card',  desc: 'Default card shadow — subtle ring', css: '0 2px 8px rgba(28,20,16,0.06), 0 0 0 1px rgba(28,20,16,0.04)' },
    { name: 'popover',class: 'shadow-popover',desc: 'Popover & tooltip — precise lift', css: '0 8px 16px rgba(28,20,16,0.12)' },
    { name: 'focus',  class: 'shadow-focus', desc: 'Focus ring — always terracotta', css: '0 0 0 3px rgba(196,113,90,0.35)' },
  ];

  return (
    <DSSection id="ds-shadows">
      <DSTitle
        number="04 — Shadows"
        title="Shadow System"
        subtitle="Shadows communicate depth and hierarchy. All shadows use the espresso base color for warmth rather than pure black."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {shadows.map((s) => (
          <div key={s.name} className="bg-neutral-50 rounded-2xl border border-neutral-200 p-5">
            <div className={`w-full h-20 bg-white rounded-xl ${s.class} mb-4`} />
            <div className="flex items-center gap-2 mb-1">
              <TokenChip>{s.name}</TokenChip>
            </div>
            <p className="text-body-sm text-neutral-600 mb-2">{s.desc}</p>
            <p className="font-mono text-[10px] text-neutral-400 leading-relaxed break-all">{s.css}</p>
          </div>
        ))}
      </div>
    </DSSection>
  );
}

/* ── Radius Section ──────────────────────────────────────────────── */
export function RadiusSection() {
  const radii = [
    { name: 'xs',   px: '4px',   usage: 'Tiny chips, code badges' },
    { name: 'sm',   px: '6px',   usage: 'Small buttons, tags' },
    { name: 'md',   px: '8px',   usage: 'Inputs, default component radius' },
    { name: 'lg',   px: '12px',  usage: 'Buttons, cards (compact)' },
    { name: 'xl',   px: '16px',  usage: 'Cards, panels (default)' },
    { name: '2xl',  px: '20px',  usage: 'Large cards, modals' },
    { name: '3xl',  px: '24px',  usage: 'Feature cards, hero sections' },
    { name: '4xl',  px: '32px',  usage: 'Large display elements' },
    { name: 'full', px: '9999px', usage: 'Pills, avatars, badges' },
  ];

  const radiusValues: Record<string, string> = {
    xs: '4px', sm: '6px', md: '8px', lg: '12px', xl: '16px', '2xl': '20px', '3xl': '24px', '4xl': '32px', full: '9999px',
  };

  return (
    <DSSection id="ds-radius">
      <DSTitle
        number="05 — Border Radius"
        title="Radius Scale"
        subtitle="Consistent rounding creates visual softness that aligns with the NEST brand. Avoid mixing radius values within a single component."
      />
      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
        {radii.map((r) => (
          <div key={r.name} className="text-center">
            <div
              className="w-full aspect-square bg-terracotta-100 border-2 border-terracotta-200 mb-2 mx-auto"
              style={{ borderRadius: radiusValues[r.name], maxWidth: 80 }}
            />
            <TokenChip>{r.name}</TokenChip>
            <p className="text-[10px] text-neutral-400 mt-1">{r.px}</p>
          </div>
        ))}
      </div>
    </DSSection>
  );
}
