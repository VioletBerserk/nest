import { forwardRef, ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';
import { motion, type HTMLMotionProps } from 'framer-motion';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'success';
type Size    = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:   'bg-terracotta-500 text-white shadow-sm disabled:bg-terracotta-200 disabled:text-terracotta-400',
  secondary: 'bg-sage-500 text-white shadow-sm disabled:bg-sage-200 disabled:text-sage-400',
  ghost:     'bg-transparent text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200 disabled:text-neutral-300',
  outline:   'bg-transparent border border-neutral-300 text-neutral-800 hover:border-neutral-500 hover:bg-neutral-50 active:bg-neutral-100 disabled:border-neutral-200 disabled:text-neutral-300',
  danger:    'bg-error-500 text-white shadow-sm disabled:bg-error-100 disabled:text-error-300',
  success:   'bg-success-500 text-white shadow-sm disabled:bg-success-100 disabled:text-success-300',
};

// Hover background overrides for motion variants (can't use Tailwind hover: inside whileHover)
const variantHover: Record<Variant, object> = {
  primary:   { backgroundColor: '#A85B46', boxShadow: '0 4px 16px -2px rgba(196,113,90,0.45)' },
  secondary: { backgroundColor: '#314A3A', boxShadow: '0 4px 12px -2px rgba(61,90,71,0.35)' },
  ghost:     {},
  outline:   {},
  danger:    { backgroundColor: '#862222' },
  success:   { backgroundColor: '#1A5530' },
};

const sizeClasses: Record<Size, string> = {
  xs: 'h-7  px-2.5 text-xs    gap-1    rounded-md',
  sm: 'h-8  px-3   text-sm    gap-1.5  rounded-lg',
  md: 'h-10 px-4   text-sm    gap-2    rounded-lg',
  lg: 'h-11 px-5   text-body-md gap-2  rounded-xl',
  xl: 'h-13 px-6   text-body-lg gap-2.5 rounded-xl',
};

const iconSizeClasses: Record<Size, string> = {
  xs: '[&>svg]:size-3',
  sm: '[&>svg]:size-3.5',
  md: '[&>svg]:size-4',
  lg: '[&>svg]:size-5',
  xl: '[&>svg]:size-5',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      iconLeft,
      iconRight,
      fullWidth = false,
      className = '',
      disabled,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const isPrimary = variant === 'primary' || variant === 'secondary' || variant === 'danger' || variant === 'success';

    return (
      <motion.button
        ref={ref}
        disabled={isDisabled}
        onClick={onClick}
        className={[
          'relative inline-flex items-center justify-center font-sans font-medium overflow-hidden',
          'select-none cursor-pointer',
          'transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-60',
          variantClasses[variant],
          sizeClasses[size],
          iconSizeClasses[size],
          fullWidth ? 'w-full' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        whileHover={isDisabled ? {} : { ...variantHover[variant], y: -1 }}
        whileTap={isDisabled ? {} : { scale: 0.965, y: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        {...(props as HTMLMotionProps<'button'>)}
      >
        {/* Shimmer overlay on primary buttons */}
        {isPrimary && !isDisabled && (
          <motion.span
            className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
            initial={{ x: '-150%' }}
            whileHover={{ x: '250%' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          />
        )}

        {loading ? (
          <Loader2
            className="animate-spin"
            size={size === 'xs' ? 12 : size === 'sm' ? 14 : 16}
          />
        ) : (
          iconLeft
        )}

        {children && <span className="relative">{children}</span>}

        {/* Right icon with subtle slide-right on hover */}
        {!loading && iconRight && (
          <motion.span
            className="relative"
            whileHover={{ x: 2 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            {iconRight}
          </motion.span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

/* Icon-only button */
interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  label: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ variant = 'ghost', size = 'md', loading = false, label, className = '', children, disabled, ...props }, ref) => {
    const squareSizes: Record<Size, string> = {
      xs: 'size-7  rounded-md',
      sm: 'size-8  rounded-lg',
      md: 'size-10 rounded-lg',
      lg: 'size-11 rounded-xl',
      xl: 'size-13 rounded-xl',
    };

    return (
      <motion.button
        ref={ref}
        aria-label={label}
        disabled={disabled || loading}
        className={[
          'inline-flex items-center justify-center',
          'transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-60',
          '[&>svg]:size-[1.125em]',
          variantClasses[variant],
          squareSizes[size],
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        whileHover={{ scale: 1.08, y: -1 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: 'spring', stiffness: 450, damping: 28 }}
        {...(props as HTMLMotionProps<'button'>)}
      >
        {loading ? <Loader2 className="animate-spin" size={16} /> : children}
      </motion.button>
    );
  }
);

IconButton.displayName = 'IconButton';
