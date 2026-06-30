import { DSSection, DSTitle, TokenChip } from './DSPrimitives';

const typeScale = [
  { name: 'Display 2XL', token: 'text-display-2xl', size: '72px', weight: '700', tracking: '-0.02em', usage: 'Hero headlines', sample: 'Find Your Nest.' },
  { name: 'Display XL',  token: 'text-display-xl',  size: '60px', weight: '600', tracking: '-0.02em', usage: 'Section heroes', sample: 'A Home Away From Home.' },
  { name: 'Display LG',  token: 'text-display-lg',  size: '48px', weight: '600', tracking: '-0.015em', usage: 'Page titles', sample: 'Community & Connection' },
  { name: 'Display MD',  token: 'text-display-md',  size: '36px', weight: '600', tracking: '-0.01em', usage: 'Feature headers', sample: 'Events This Week' },
  { name: 'Display SM',  token: 'text-display-sm',  size: '30px', weight: '600', tracking: '-0.005em', usage: 'Card titles, modals', sample: 'Membership Plans' },
  { name: 'Heading XL',  token: 'text-heading-xl',  size: '24px', weight: '600', tracking: '-0.005em', usage: 'Section headings', sample: 'For Families' },
  { name: 'Heading LG',  token: 'text-heading-lg',  size: '20px', weight: '600', tracking: '0', usage: 'Sub-headings', sample: 'Community Table' },
  { name: 'Heading MD',  token: 'text-heading-md',  size: '18px', weight: '600', tracking: '0', usage: 'Card headers', sample: 'Saturday Morning Workshop' },
  { name: 'Heading SM',  token: 'text-heading-sm',  size: '16px', weight: '600', tracking: '0', usage: 'List headings', sample: 'What to Expect' },
];

const bodyScale = [
  { name: 'Body XL', token: 'text-body-xl', size: '18px', lh: '1.75', usage: 'Lead paragraphs', sample: 'We created NEST for families who want more than a café — a place to belong.' },
  { name: 'Body LG', token: 'text-body-lg', size: '16px', lh: '1.75', usage: 'Default body copy', sample: 'Children explore, create, and learn. Teenagers find their people. Parents finally breathe.' },
  { name: 'Body MD', token: 'text-body-md', size: '15px', lh: '1.6',  usage: 'Supporting text', sample: 'Every programme, every cup of coffee, every event serves this singular purpose.' },
  { name: 'Body SM', token: 'text-body-sm', size: '14px', lh: '1.6',  usage: 'Secondary copy, captions', sample: 'Open Monday through Sunday, 9am to 8pm.' },
  { name: 'Body XS', token: 'text-body-xs', size: '13px', lh: '1.5',  usage: 'Fine print, tooltips', sample: 'Prices include VAT. Membership renews monthly.' },
];

const uiScale = [
  { name: 'Label LG',  token: 'text-label-lg',  size: '14px', weight: '500', usage: 'Form labels, tab labels' },
  { name: 'Label MD',  token: 'text-label-md',  size: '13px', weight: '500', usage: 'Button text SM, badges' },
  { name: 'Label SM',  token: 'text-label-sm',  size: '12px', weight: '500', usage: 'Chips, small buttons' },
  { name: 'Caption',   token: 'text-caption',   size: '12px', weight: '400', usage: 'Helper text, timestamps' },
  { name: 'Overline',  token: 'text-overline',  size: '11px', weight: '600', usage: 'Section labels (UPPERCASE)' },
];

export function TypeSection() {
  return (
    <DSSection id="ds-type">
      <DSTitle
        number="02 — Typography"
        title="Type System"
        subtitle="Two typefaces. Playfair Display brings warmth and editorial authority. Inter handles everything that needs to be read quickly and clearly."
      />

      {/* Typeface showcase */}
      <div className="grid md:grid-cols-2 gap-6 mb-14">
        <div className="bg-cream-100 rounded-2xl p-8">
          <p className="text-overline text-neutral-500 mb-4">Display · Serif</p>
          <p className="font-serif text-5xl font-semibold text-neutral-900 leading-tight mb-3">
            Playfair<br />Display
          </p>
          <p className="font-serif italic text-xl text-neutral-500 leading-relaxed">
            "Warm, editorial, and unmistakably human."
          </p>
          <div className="mt-5 flex gap-2 flex-wrap">
            {['Regular 400', 'Medium 500', 'SemiBold 600', 'Bold 700', 'Italic'].map((w) => (
              <span key={w} className="text-caption text-neutral-500 bg-white/60 px-2 py-1 rounded-lg border border-neutral-200">{w}</span>
            ))}
          </div>
        </div>
        <div className="bg-neutral-900 rounded-2xl p-8">
          <p className="text-overline text-neutral-500 mb-4">UI · Sans-serif</p>
          <p className="font-sans text-5xl font-semibold text-cream-100 leading-tight mb-3">
            Inter
          </p>
          <p className="font-sans text-xl text-neutral-400 leading-relaxed">
            "Neutral, precise, invisible when it works."
          </p>
          <div className="mt-5 flex gap-2 flex-wrap">
            {['Light 300', 'Regular 400', 'Medium 500', 'SemiBold 600'].map((w) => (
              <span key={w} className="text-caption text-neutral-500 bg-white/5 px-2 py-1 rounded-lg border border-white/10">{w}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Display scale */}
      <div className="mb-12">
        <h3 className="font-sans font-semibold text-heading-sm text-neutral-600 mb-6 flex items-center gap-3">
          Display & Heading Scale
          <span className="text-caption text-neutral-400 font-normal">font-serif · Playfair Display</span>
        </h3>
        <div className="space-y-1 rounded-2xl border border-neutral-200 overflow-hidden">
          {typeScale.map((t, i) => (
            <div key={t.name} className={`group flex items-baseline gap-5 px-6 py-4 hover:bg-neutral-50 transition-colors ${i < typeScale.length - 1 ? 'border-b border-neutral-100' : ''}`}>
              <div className="w-24 flex-shrink-0">
                <p className="text-label-sm text-neutral-500">{t.name}</p>
                <div className="flex gap-1.5 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <TokenChip>{t.size}</TokenChip>
                  <TokenChip>{t.weight}</TokenChip>
                </div>
              </div>
              <p className="font-serif flex-1 text-neutral-900 leading-tight truncate" style={{ fontSize: `clamp(14px, ${parseFloat(t.size) * 0.5}px, ${t.size})` }}>
                {t.sample}
              </p>
              <span className="text-caption text-neutral-300 flex-shrink-0 hidden md:block">{t.usage}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Body scale */}
      <div className="mb-12">
        <h3 className="font-sans font-semibold text-heading-sm text-neutral-600 mb-6 flex items-center gap-3">
          Body Scale
          <span className="text-caption text-neutral-400 font-normal">font-sans · Inter</span>
        </h3>
        <div className="space-y-1 rounded-2xl border border-neutral-200 overflow-hidden">
          {bodyScale.map((t, i) => (
            <div key={t.name} className={`group flex items-start gap-5 px-6 py-4 hover:bg-neutral-50 transition-colors ${i < bodyScale.length - 1 ? 'border-b border-neutral-100' : ''}`}>
              <div className="w-24 flex-shrink-0 pt-0.5">
                <p className="text-label-sm text-neutral-500">{t.name}</p>
                <div className="flex gap-1.5 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <TokenChip>{t.size}</TokenChip>
                  <TokenChip>lh {t.lh}</TokenChip>
                </div>
              </div>
              <p className="font-sans flex-1 text-neutral-700" style={{ fontSize: t.size, lineHeight: t.lh }}>
                {t.sample}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* UI scale */}
      <div className="mb-12">
        <h3 className="font-sans font-semibold text-heading-sm text-neutral-600 mb-6">UI Scale</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {uiScale.map((t) => (
            <div key={t.name} className="bg-neutral-50 rounded-xl border border-neutral-200 px-5 py-4">
              <p className="text-label-sm text-neutral-400 mb-2">{t.name}</p>
              <p className="font-sans text-neutral-800 mb-2" style={{ fontSize: t.size, fontWeight: t.weight }}>
                {t.name === 'Overline' ? 'SECTION LABEL' : 'Sample UI Text'}
              </p>
              <p className="text-caption text-neutral-400">{t.usage}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Typographic pairing */}
      <div>
        <h3 className="font-sans font-semibold text-heading-sm text-neutral-600 mb-5">Type in Context</h3>
        <div className="bg-cream-100 rounded-2xl p-8 md:p-12">
          <p className="text-overline text-terracotta-500 uppercase mb-4">For Families</p>
          <h2 className="font-serif text-display-lg text-neutral-900 leading-tight mb-5">
            A Place to Call<br /><em>Your Own.</em>
          </h2>
          <p className="text-body-xl text-neutral-600 max-w-lg leading-relaxed mb-6">
            Russian-speaking families in Belgrade now have a place that understands them — a café,
            a community, and a creative home all in one.
          </p>
          <p className="text-body-sm text-neutral-400">Open Monday through Sunday · 9:00 – 20:00 · Savamala, Belgrade</p>
        </div>
      </div>
    </DSSection>
  );
}
