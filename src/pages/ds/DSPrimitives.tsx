/* Shared primitives for the DS showcase ─────────────────────────── */
import { ReactNode } from 'react';

export function DSSection({ id, children, dark = false }: { id: string; children: ReactNode; dark?: boolean }) {
  return (
    <section
      id={id}
      className={`py-16 border-b ${dark ? 'bg-neutral-900 border-neutral-800' : 'border-neutral-200'}`}
    >
      {children}
    </section>
  );
}

export function DSTitle({ number, title, subtitle, dark = false }: { number: string; title: string; subtitle?: string; dark?: boolean }) {
  return (
    <div className="mb-10">
      <span className={`text-overline uppercase mb-3 block ${dark ? 'text-terracotta-400' : 'text-terracotta-500'}`}>
        {number}
      </span>
      <h2 className={`font-serif text-display-sm mb-3 ${dark ? 'text-cream-100' : 'text-neutral-900'}`}>{title}</h2>
      {subtitle && (
        <p className={`text-body-md max-w-xl leading-relaxed ${dark ? 'text-neutral-400' : 'text-neutral-500'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function DSRow({ label, children, className = '' }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <p className="text-overline text-neutral-400 uppercase">{label}</p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

export function DSPreview({ children, className = '', dark = false, label }: { children: ReactNode; className?: string; dark?: boolean; label?: string }) {
  return (
    <div>
      {label && <p className="text-caption text-neutral-400 mb-2">{label}</p>}
      <div
        className={[
          'rounded-xl p-6 flex flex-wrap items-center gap-4 border',
          dark ? 'bg-neutral-900 border-neutral-700' : 'bg-neutral-50 border-neutral-200',
          className,
        ].join(' ')}
      >
        {children}
      </div>
    </div>
  );
}

export function TokenChip({ children }: { children: ReactNode }) {
  return (
    <code className="font-mono text-xs bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded-md">
      {children}
    </code>
  );
}

export function DSGrid({ children, cols = 3, className = '' }: { children: ReactNode; cols?: number; className?: string }) {
  const colMap: Record<number, string> = { 2: 'grid-cols-1 sm:grid-cols-2', 3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3', 4: 'grid-cols-2 lg:grid-cols-4' };
  return <div className={`grid ${colMap[cols] ?? colMap[3]} gap-5 ${className}`}>{children}</div>;
}
