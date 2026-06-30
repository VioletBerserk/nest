import { HTMLAttributes, ReactNode, useRef } from 'react';
import { ArrowRight, Calendar, MapPin, Users } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/* ── Base Card ────────────────────────────────────────────────────── */
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  bordered?: boolean;
}

const paddingMap = { none: '', sm: 'p-4', md: 'p-6', lg: 'p-8' };

export function Card({ padding = 'md', hover = false, bordered = false, className = '', children, ...props }: CardProps) {
  if (!hover) {
    return (
      <div
        className={[
          'bg-white rounded-2xl',
          bordered ? 'border border-neutral-200' : 'shadow-card',
          paddingMap[padding],
          className,
        ].filter(Boolean).join(' ')}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={[
        'bg-white rounded-2xl cursor-pointer',
        bordered ? 'border border-neutral-200' : 'shadow-card',
        paddingMap[padding],
        className,
      ].filter(Boolean).join(' ')}
      whileHover={{ y: -4, boxShadow: '0 16px 36px -8px rgba(28,20,16,0.14), 0 0 0 1px rgba(28,20,16,0.05)' }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
      {...(props as React.ComponentPropsWithoutRef<typeof motion.div>)}
    >
      {children}
    </motion.div>
  );
}

/* ── Feature Card ─────────────────────────────────────────────────── */
interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  accent?: 'terracotta' | 'sage' | 'neutral';
  className?: string;
}

const featureAccents = {
  terracotta: 'bg-terracotta-50 text-terracotta-600',
  sage:       'bg-sage-50 text-sage-600',
  neutral:    'bg-neutral-100 text-neutral-600',
};

export function FeatureCard({ icon, title, description, accent = 'terracotta', className = '' }: FeatureCardProps) {
  return (
    <Card hover className={className}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 [&>svg]:size-5 ${featureAccents[accent]}`}>
        {icon}
      </div>
      <h3 className="font-serif text-heading-md text-neutral-900 mb-2">{title}</h3>
      <p className="text-body-sm text-neutral-500 leading-relaxed">{description}</p>
    </Card>
  );
}

/* ── Event Card ───────────────────────────────────────────────────── */
interface EventCardProps {
  image?: string;
  category: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  attendees?: number;
  maxAttendees?: number;
  onBook?: () => void;
  className?: string;
}

export function EventCard({
  image,
  category,
  title,
  date,
  time,
  location,
  attendees,
  maxAttendees,
  onBook,
  className = '',
}: EventCardProps) {
  const isFull = maxAttendees !== undefined && attendees !== undefined && attendees >= maxAttendees;
  const spotsLeft = maxAttendees !== undefined && attendees !== undefined ? maxAttendees - attendees : null;

  return (
    <motion.div
      className={`bg-white rounded-2xl shadow-card overflow-hidden group ${className}`}
      whileHover={{ y: -6, boxShadow: '0 20px 40px -8px rgba(28,20,16,0.15), 0 0 0 1px rgba(28,20,16,0.05)' }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
    >
      {image ? (
        <div className="aspect-[16/9] overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      ) : (
        <div className="aspect-[16/9] bg-cream-200 flex items-center justify-center">
          <span className="font-serif text-3xl text-neutral-300 italic">N</span>
        </div>
      )}
      <div className="p-5">
        <span className="text-overline text-terracotta-500 uppercase mb-2 block">{category}</span>
        <h3 className="font-serif text-heading-lg text-neutral-900 mb-3 line-clamp-2 group-hover:text-terracotta-600 transition-colors duration-200">
          {title}
        </h3>
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-body-sm text-neutral-500">
            <Calendar size={13} className="flex-shrink-0 text-neutral-400" />
            <span>{date}{time && ` · ${time}`}</span>
          </div>
          {location && (
            <div className="flex items-center gap-2 text-body-sm text-neutral-500">
              <MapPin size={13} className="flex-shrink-0 text-neutral-400" />
              <span>{location}</span>
            </div>
          )}
          {maxAttendees !== undefined && (
            <div className="flex items-center gap-2 text-body-sm text-neutral-500">
              <Users size={13} className="flex-shrink-0 text-neutral-400" />
              <span>{attendees ?? 0} / {maxAttendees} registered</span>
            </div>
          )}
        </div>
        {spotsLeft !== null && spotsLeft <= 5 && !isFull && (
          <p className="text-caption text-warning-600 mb-3">{spotsLeft} spots left</p>
        )}
        {onBook && (
          <motion.button
            onClick={onBook}
            disabled={isFull}
            className={[
              'w-full h-9 rounded-lg text-label-md font-medium flex items-center justify-center gap-2 overflow-hidden relative',
              isFull
                ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                : 'bg-terracotta-500 text-white',
            ].join(' ')}
            whileHover={isFull ? {} : { backgroundColor: '#A85B46' }}
            whileTap={isFull ? {} : { scale: 0.975 }}
            transition={{ type: 'spring', stiffness: 400, damping: 26 }}
          >
            {!isFull && (
              <motion.span
                className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
                initial={{ x: '-150%' }}
                whileHover={{ x: '250%' }}
                transition={{ duration: 0.5 }}
              />
            )}
            {isFull ? 'Fully booked' : 'Book a spot'}
            {!isFull && (
              <motion.span whileHover={{ x: 2 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}>
                <ArrowRight size={14} />
              </motion.span>
            )}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

/* ── Stat Card ────────────────────────────────────────────────────── */
interface StatCardProps {
  value: string;
  label: string;
  sub?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  accent?: 'terracotta' | 'sage';
  className?: string;
}

export function StatCard({ value, label, sub, trend, trendValue, accent, className = '' }: StatCardProps) {
  const trendColors = { up: 'text-success-600', down: 'text-error-600', neutral: 'text-neutral-500' };
  const accentBar = accent === 'terracotta' ? 'bg-terracotta-500' : accent === 'sage' ? 'bg-sage-500' : '';

  return (
    <Card className={`relative overflow-hidden ${className}`}>
      {accent && <div className={`absolute top-0 left-0 right-0 h-0.5 ${accentBar}`} />}
      <p className="text-label-sm text-neutral-500 mb-1">{label}</p>
      <p className="font-serif text-display-sm text-neutral-900">{value}</p>
      <div className="flex items-center gap-2 mt-1">
        {sub && <p className="text-caption text-neutral-400">{sub}</p>}
        {trend && trendValue && (
          <span className={`text-caption font-medium ${trendColors[trend]}`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : ''} {trendValue}
          </span>
        )}
      </div>
    </Card>
  );
}

/* ── Membership Card ──────────────────────────────────────────────── */
interface MembershipCardProps {
  tier: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  onSelect?: () => void;
  className?: string;
}

export function MembershipCard({
  tier,
  price,
  period = '/month',
  description,
  features,
  highlighted = false,
  onSelect,
  className = '',
}: MembershipCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={[
        'rounded-2xl p-6 flex flex-col',
        highlighted
          ? 'bg-terracotta-500 text-white shadow-xl scale-[1.02]'
          : 'bg-white border border-neutral-200',
        className,
      ].join(' ')}
      whileHover={highlighted
        ? { boxShadow: '0 24px 48px -8px rgba(196,113,90,0.4)', scale: 1.03 }
        : { boxShadow: '0 16px 32px -6px rgba(28,20,16,0.12)', borderColor: 'rgba(196,113,90,0.4)', scale: 1.015 }
      }
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="mb-5">
        <p className={`text-overline mb-1 ${highlighted ? 'text-terracotta-100' : 'text-neutral-500'}`}>{tier}</p>
        <div className="flex items-baseline gap-1 mb-2">
          <motion.span
            key={price}
            className={`font-serif text-display-md ${highlighted ? 'text-white' : 'text-neutral-900'}`}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {price}
          </motion.span>
          <span className={`text-body-sm ${highlighted ? 'text-terracotta-100' : 'text-neutral-400'}`}>{period}</span>
        </div>
        <p className={`text-body-sm ${highlighted ? 'text-terracotta-100' : 'text-neutral-500'}`}>{description}</p>
      </div>
      <ul className="space-y-2.5 flex-1 mb-6">
        {features.map((f, i) => (
          <motion.li
            key={i}
            className="flex items-start gap-2.5"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 + 0.1, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg
              className={`size-4 mt-0.5 flex-shrink-0 ${highlighted ? 'text-white' : 'text-terracotta-500'}`}
              viewBox="0 0 16 16" fill="none"
            >
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.25" />
              <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className={`text-body-sm ${highlighted ? 'text-white' : 'text-neutral-700'}`}>{f}</span>
          </motion.li>
        ))}
      </ul>
      <motion.button
        onClick={onSelect}
        className={[
          'w-full h-10 rounded-xl text-label-md font-medium overflow-hidden relative',
          highlighted
            ? 'bg-white text-terracotta-600'
            : 'bg-terracotta-500 text-white',
        ].join(' ')}
        whileHover={highlighted
          ? { backgroundColor: '#FAF5EE', boxShadow: '0 4px 12px rgba(255,255,255,0.25)' }
          : { backgroundColor: '#A85B46', y: -1 }
        }
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <motion.span
          className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
          initial={{ x: '-150%' }}
          whileHover={{ x: '250%' }}
          transition={{ duration: 0.5 }}
        />
        <span className="relative">{highlighted ? 'Get started' : 'Choose plan'}</span>
      </motion.button>
    </motion.div>
  );
}
