import { DSSection, DSTitle, TokenChip, DSGrid } from './DSPrimitives';

const ramps = [
  {
    name: 'Terracotta',
    semantic: 'Primary accent — energy, warmth, action',
    shades: [
      { shade: '50',  hex: '#FDF4F1', token: 'terracotta-50' },
      { shade: '100', hex: '#FAE4DC', token: 'terracotta-100' },
      { shade: '200', hex: '#F5C4B2', token: 'terracotta-200' },
      { shade: '300', hex: '#ED9F86', token: 'terracotta-300' },
      { shade: '400', hex: '#E07A5F', token: 'terracotta-400' },
      { shade: '500', hex: '#C4715A', token: 'terracotta-500', brand: true },
      { shade: '600', hex: '#A85B46', token: 'terracotta-600' },
      { shade: '700', hex: '#8A4535', token: 'terracotta-700' },
      { shade: '800', hex: '#6B3127', token: 'terracotta-800' },
      { shade: '900', hex: '#4A1F18', token: 'terracotta-900' },
    ],
  },
  {
    name: 'Sage',
    semantic: 'Secondary accent — nature, calm, growth',
    shades: [
      { shade: '50',  hex: '#EEF3F0', token: 'sage-50' },
      { shade: '100', hex: '#D6E4DA', token: 'sage-100' },
      { shade: '200', hex: '#ADCAB4', token: 'sage-200' },
      { shade: '300', hex: '#7EA98A', token: 'sage-300' },
      { shade: '400', hex: '#568A64', token: 'sage-400' },
      { shade: '500', hex: '#3D5A47', token: 'sage-500', brand: true },
      { shade: '600', hex: '#314A3A', token: 'sage-600' },
      { shade: '700', hex: '#263A2D', token: 'sage-700' },
      { shade: '800', hex: '#1C2B22', token: 'sage-800' },
      { shade: '900', hex: '#121C17', token: 'sage-900' },
    ],
  },
  {
    name: 'Cream',
    semantic: 'Warm backgrounds — the base of everything',
    shades: [
      { shade: '50',  hex: '#FDFAF6', token: 'cream-50' },
      { shade: '100', hex: '#FAF5EE', token: 'cream-100', brand: true },
      { shade: '200', hex: '#F4EBD9', token: 'cream-200' },
      { shade: '300', hex: '#EAD9C0', token: 'cream-300' },
      { shade: '400', hex: '#DBBF9A', token: 'cream-400' },
      { shade: '500', hex: '#C9A378', token: 'cream-500' },
      { shade: '600', hex: '#B08A61', token: 'cream-600' },
      { shade: '700', hex: '#8A6A45', token: 'cream-700' },
      { shade: '800', hex: '#6A4E30', token: 'cream-800' },
      { shade: '900', hex: '#3D2B1F', token: 'cream-900' },
    ],
  },
  {
    name: 'Neutral',
    semantic: 'Text, borders, surfaces — the structural layer',
    shades: [
      { shade: '50',  hex: '#FAFAF9', token: 'neutral-50' },
      { shade: '100', hex: '#F5F4F2', token: 'neutral-100' },
      { shade: '200', hex: '#ECEAE6', token: 'neutral-200' },
      { shade: '300', hex: '#DDD9D4', token: 'neutral-300' },
      { shade: '400', hex: '#C4BEB7', token: 'neutral-400' },
      { shade: '500', hex: '#A89E96', token: 'neutral-500' },
      { shade: '600', hex: '#8A7E76', token: 'neutral-600' },
      { shade: '700', hex: '#6B6059', token: 'neutral-700' },
      { shade: '800', hex: '#4A4240', token: 'neutral-800' },
      { shade: '900', hex: '#1C1410', token: 'neutral-900', brand: true },
    ],
  },
];

const semantic = [
  { token: 'Background',     hex: '#FAF5EE', desc: 'Page background — always warm, never pure white' },
  { token: 'Surface',        hex: '#FFFFFF', desc: 'Card and panel backgrounds' },
  { token: 'Surface Raised', hex: '#FDFAF6', desc: 'Elevated surfaces: tooltips, popovers' },
  { token: 'Border',         hex: '#E8E2DC', desc: 'Default borders and dividers' },
  { token: 'Border Focus',   hex: '#C4715A', desc: 'Focus ring color — always terracotta' },
  { token: 'Text Primary',   hex: '#1C1410', desc: 'Headings and high-emphasis text' },
  { token: 'Text Secondary',  hex: '#6B6059', desc: 'Body copy and medium-emphasis text' },
  { token: 'Text Muted',     hex: '#A89E96', desc: 'Captions, hints, placeholders' },
  { token: 'Text Inverse',   hex: '#FAF5EE', desc: 'Text on dark backgrounds' },
];

const status = [
  { name: 'Success', bg: '#EEFAF3', text: '#2D8A4E', border: '#5BBF80' },
  { name: 'Warning', bg: '#FEF9EC', text: '#D97B06', border: '#F5C748' },
  { name: 'Error',   bg: '#FEF2F2', text: '#C43B3B', border: '#F08080' },
  { name: 'Info',    bg: '#EEF3F0', text: '#3D5A47', border: '#7EA98A' },
];

function isLight(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 155;
}

export function ColorSection() {
  return (
    <DSSection id="ds-colors">
      <DSTitle
        number="01 — Colors"
        title="Color System"
        subtitle="Four semantic ramps, each with 10 shades from near-white to near-black. Every value is intentional. Brand shades are marked."
      />

      {/* Ramps */}
      <div className="space-y-8 mb-14">
        {ramps.map((ramp) => (
          <div key={ramp.name}>
            <div className="flex items-baseline gap-3 mb-3">
              <h3 className="font-sans font-semibold text-heading-sm text-neutral-800">{ramp.name}</h3>
              <p className="text-body-sm text-neutral-400">{ramp.semantic}</p>
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
              {ramp.shades.map((s) => (
                <div key={s.shade} className="group">
                  <div
                    className={`aspect-square rounded-xl mb-1.5 border border-black/5 relative ${s.brand ? 'ring-2 ring-offset-1 ring-neutral-900/20' : ''}`}
                    style={{ backgroundColor: s.hex }}
                  >
                    {s.brand && (
                      <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 text-[8px] font-bold leading-none ${isLight(s.hex) ? 'text-black/40' : 'text-white/60'}`}>
                        ●
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-neutral-500 text-center leading-tight">{s.shade}</p>
                  <p className="text-[9px] text-neutral-400 text-center leading-tight opacity-0 group-hover:opacity-100 transition-opacity">{s.hex}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Semantic tokens */}
      <div className="mb-14">
        <h3 className="font-sans font-semibold text-heading-sm text-neutral-700 mb-5">Semantic Tokens</h3>
        <div className="rounded-2xl border border-neutral-200 overflow-hidden">
          {semantic.map((s, i) => (
            <div key={s.token} className={`flex items-center gap-4 px-5 py-3.5 ${i < semantic.length - 1 ? 'border-b border-neutral-100' : ''}`}>
              <div className="w-8 h-8 rounded-lg border border-black/8 flex-shrink-0" style={{ backgroundColor: s.hex }} />
              <div className="flex-1 min-w-0">
                <p className="text-label-md text-neutral-800">{s.token}</p>
                <p className="text-caption text-neutral-400 truncate">{s.desc}</p>
              </div>
              <TokenChip>{s.hex}</TokenChip>
            </div>
          ))}
        </div>
      </div>

      {/* Status palette */}
      <div>
        <h3 className="font-sans font-semibold text-heading-sm text-neutral-700 mb-5">Status Palette</h3>
        <DSGrid cols={4}>
          {status.map((s) => (
            <div key={s.name} className="rounded-xl border p-4" style={{ backgroundColor: s.bg, borderColor: s.border }}>
              <p className="text-label-md mb-2" style={{ color: s.text }}>{s.name}</p>
              <div className="flex gap-2">
                <span className="text-caption" style={{ color: s.text }}>Background</span>
                <TokenChip>{s.bg}</TokenChip>
              </div>
            </div>
          ))}
        </DSGrid>
      </div>
    </DSSection>
  );
}
