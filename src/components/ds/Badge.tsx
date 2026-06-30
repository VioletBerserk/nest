import { HTMLAttributes } from 'react';
import { X } from 'lucide-react';

type BadgeVariant = 'default' | 'terracotta' | 'sage' | 'success' | 'warning' | 'error' | 'neutral' | 'outline';
type BadgeSize    = 'sm' | 'md' | 'lg';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  onRemove?: () => void;
}

const variantClasses: Record<BadgeVariant, string> = {
  default:    'bg-cream-200 text-neutral-800',
  terracotta: 'bg-terracotta-100 text-terracotta-700',
  sage:       'bg-sage-100 text-sage-700',
  success:    'bg-success-100 text-success-700',
  warning:    'bg-warning-100 text-warning-700',
  error:      'bg-error-100 text-error-700',
  neutral:    'bg-neutral-100 text-neutral-700',
  outline:    'bg-transparent border border-neutral-300 text-neutral-700',
};

const dotColors: Record<BadgeVariant, string> = {
  default:    'bg-neutral-500',
  terracotta: 'bg-terracotta-500',
  sage:       'bg-sage-500',
  success:    'bg-success-500',
  warning:    'bg-warning-500',
  error:      'bg-error-500',
  neutral:    'bg-neutral-500',
  outline:    'bg-neutral-400',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'text-overline px-2 py-0.5 gap-1 rounded-md',
  md: 'text-label-sm px-2.5 py-1 gap-1.5 rounded-lg',
  lg: 'text-label-md px-3 py-1.5 gap-2 rounded-xl',
};

export function Badge({
  variant = 'default',
  size = 'md',
  dot = false,
  onRemove,
  className = '',
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center font-sans font-medium whitespace-nowrap',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
      {...props}
    >
      {dot && (
        <span
          className={['rounded-full flex-shrink-0', dotColors[variant], size === 'sm' ? 'size-1.5' : 'size-2'].join(' ')}
        />
      )}
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-0.5 -mr-0.5 rounded-sm hover:bg-black/10 transition-colors p-px"
          aria-label="Remove"
        >
          <X size={size === 'sm' ? 10 : 12} />
        </button>
      )}
    </span>
  );
}

/* ── Status badge ─────────────────────────────────────────────────── */
type Status = 'online' | 'offline' | 'busy' | 'away' | 'new';

interface StatusBadgeProps {
  status: Status;
  label?: string;
}

const statusConfig: Record<Status, { dot: string; label: string; text: string }> = {
  online:  { dot: 'bg-success-500', label: 'Online',  text: 'text-success-700' },
  offline: { dot: 'bg-neutral-400', label: 'Offline', text: 'text-neutral-500' },
  busy:    { dot: 'bg-error-500',   label: 'Busy',    text: 'text-error-600'   },
  away:    { dot: 'bg-warning-500', label: 'Away',    text: 'text-warning-600' },
  new:     { dot: 'bg-terracotta-500 animate-pulse-soft', label: 'New', text: 'text-terracotta-700' },
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const cfg = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 text-label-sm ${cfg.text}`}>
      <span className={`size-2 rounded-full flex-shrink-0 ${cfg.dot}`} />
      {label ?? cfg.label}
    </span>
  );
}

/* ── Count badge ──────────────────────────────────────────────────── */
interface CountBadgeProps {
  count: number;
  max?: number;
  variant?: 'terracotta' | 'neutral';
}

export function CountBadge({ count, max = 99, variant = 'terracotta' }: CountBadgeProps) {
  const display = count > max ? `${max}+` : String(count);
  return (
    <span
      className={[
        'inline-flex items-center justify-center font-sans font-semibold text-white',
        'min-w-[1.25rem] h-5 px-1.5 rounded-full text-[10px] leading-none',
        variant === 'terracotta' ? 'bg-terracotta-500' : 'bg-neutral-600',
      ].join(' ')}
    >
      {display}
    </span>
  );
}

/* ── Pill tag ─────────────────────────────────────────────────────── */
interface PillProps {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
}

export function Pill({ children, selected = false, onClick }: PillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'inline-flex items-center text-label-md px-3.5 py-1.5 rounded-full',
        'transition-all duration-150 ease-smooth border',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-300',
        selected
          ? 'bg-terracotta-500 text-white border-terracotta-500 shadow-sm'
          : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400 hover:text-neutral-900',
      ].join(' ')}
    >
      {children}
    </button>
  );
}
