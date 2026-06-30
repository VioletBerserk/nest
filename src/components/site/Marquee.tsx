interface MarqueeProps {
  items: string[];
  speed?: 'normal' | 'slow';
  className?: string;
  separator?: string;
}

export function Marquee({ items, speed = 'normal', className = '', separator = '·' }: MarqueeProps) {
  // Duplicate so the loop is seamless (we translate -50%)
  const doubled = [...items, ...items];

  return (
    <div className={`marquee-wrap overflow-hidden ${className}`} aria-hidden>
      <div
        className={`marquee-track flex gap-0 whitespace-nowrap ${speed === 'slow' ? 'animate-marquee-slow' : 'animate-marquee'}`}
        style={{ width: 'max-content' }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span>{item}</span>
            <span className="mx-6 opacity-40">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
