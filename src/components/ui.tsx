import { useState } from 'react';
import { ChevronDown, ChevronRight, Circle } from 'lucide-react';

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ id, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`py-16 border-b border-nest-mist ${className}`}>
      {children}
    </section>
  );
}

interface SectionTitleProps {
  number: string;
  title: string;
  subtitle?: string;
}

export function SectionTitle({ number, title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-10">
      <span className="text-xs font-sans font-medium tracking-widest text-nest-terracotta uppercase mb-3 block">
        {number}
      </span>
      <h2 className="font-serif text-4xl font-semibold text-nest-espresso leading-tight mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="font-sans text-base text-nest-sand font-light max-w-xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  accent?: 'terracotta' | 'sage' | 'sand' | 'espresso';
}

export function Card({ children, className = '', accent }: CardProps) {
  const accentMap = {
    terracotta: 'border-l-4 border-nest-terracotta',
    sage: 'border-l-4 border-nest-sage',
    sand: 'border-l-4 border-nest-sand',
    espresso: 'border-l-4 border-nest-espresso',
  };

  return (
    <div
      className={`bg-white rounded-2xl p-7 shadow-sm ${accent ? accentMap[accent] : ''} ${className}`}
    >
      {children}
    </div>
  );
}

interface TagProps {
  children: React.ReactNode;
  color?: 'terracotta' | 'sage' | 'cream';
}

export function Tag({ children, color = 'cream' }: TagProps) {
  const colorMap = {
    terracotta: 'bg-nest-terracotta/10 text-nest-terracotta',
    sage: 'bg-nest-sage/10 text-nest-sage',
    cream: 'bg-cream-200 text-nest-brown',
  };

  return (
    <span
      className={`inline-block text-xs font-medium tracking-wider uppercase px-3 py-1 rounded-full ${colorMap[color]}`}
    >
      {children}
    </span>
  );
}

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function Collapsible({ title, children, defaultOpen = false }: CollapsibleProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-nest-mist rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-cream-100 transition-colors"
      >
        <span className="font-sans font-medium text-nest-espresso text-sm">{title}</span>
        {open ? (
          <ChevronDown size={16} className="text-nest-sand flex-shrink-0" />
        ) : (
          <ChevronRight size={16} className="text-nest-sand flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-6 pb-5 pt-1 border-t border-nest-mist bg-cream-50">{children}</div>
      )}
    </div>
  );
}

interface BulletProps {
  items: string[];
  color?: 'terracotta' | 'sage' | 'sand';
}

export function Bullets({ items, color = 'terracotta' }: BulletProps) {
  const colorMap = {
    terracotta: 'bg-nest-terracotta',
    sage: 'bg-nest-sage',
    sand: 'bg-nest-sand',
  };

  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <Circle
            size={5}
            className={`mt-[7px] flex-shrink-0 fill-current ${colorMap[color]} text-${colorMap[color]}`}
          />
          <span className="font-sans text-sm text-nest-brown leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

interface PersonaCardProps {
  name: string;
  age: string;
  role: string;
  location: string;
  pain: string[];
  desire: string[];
  quote: string;
  color: 'terracotta' | 'sage';
}

export function PersonaCard({
  name,
  age,
  role,
  location,
  pain,
  desire,
  quote,
  color,
}: PersonaCardProps) {
  const borderMap = {
    terracotta: 'border-nest-terracotta',
    sage: 'border-nest-sage',
  };
  const dotMap = {
    terracotta: 'bg-nest-terracotta',
    sage: 'bg-nest-sage',
  };
  const textMap = {
    terracotta: 'text-nest-terracotta',
    sage: 'text-nest-sage',
  };

  return (
    <Card className={`border-t-4 ${borderMap[color]}`}>
      <div className="mb-5">
        <div
          className={`w-10 h-10 rounded-full ${dotMap[color]} opacity-20 mb-4`}
        />
        <h3 className="font-serif text-xl font-semibold text-nest-espresso">{name}</h3>
        <p className="text-xs text-nest-sand font-medium tracking-wide mt-1">
          {age} · {role} · {location}
        </p>
      </div>
      <blockquote className={`font-serif italic text-sm ${textMap[color]} border-l-2 ${borderMap[color]} pl-4 mb-5 leading-relaxed`}>
        "{quote}"
      </blockquote>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-medium tracking-widest uppercase text-nest-sand mb-2">Pains</p>
          <Bullets items={pain} color={color} />
        </div>
        <div>
          <p className="text-xs font-medium tracking-widest uppercase text-nest-sand mb-2">Desires</p>
          <Bullets items={desire} color="sage" />
        </div>
      </div>
    </Card>
  );
}
