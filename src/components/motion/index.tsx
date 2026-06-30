import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  type Variants,
  type HTMLMotionProps,
} from 'framer-motion';
import { useRef, useEffect, useState, type ReactNode } from 'react';

// ─── Easing presets ───────────────────────────────────────────────────────────

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT  = [0.87, 0, 0.13, 1] as const;
export const EASE_SPRING  = { type: 'spring', stiffness: 400, damping: 30 } as const;

// ─── Shared variants ─────────────────────────────────────────────────────────

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
};

export const fadeDown: Variants = {
  hidden:  { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
};

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.55, ease: 'easeOut' } },
};

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
};

export const scaleUp: Variants = {
  hidden:  { opacity: 0, scale: 0.88, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.65, ease: EASE_OUT_EXPO } },
};

export const slideInLeft: Variants = {
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE_OUT_EXPO } },
};

export const slideInRight: Variants = {
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE_OUT_EXPO } },
};

export const clipReveal: Variants = {
  hidden:  { clipPath: 'inset(0 100% 0 0)' },
  visible: { clipPath: 'inset(0 0% 0 0)', transition: { duration: 0.9, ease: EASE_OUT_EXPO } },
};

export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
};

export const staggerItem: Variants = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT_EXPO } },
};

// ─── Reveal wrapper ───────────────────────────────────────────────────────────

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
  once?: boolean;
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  variants = fadeUp,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: '-6% 0px' });

  const resolvedVariants: Variants = delay > 0
    ? {
        hidden: variants.hidden as object,
        visible: {
          ...(variants.visible as object),
          transition: {
            ...((variants.visible as { transition?: object })?.transition ?? {}),
            delay: delay / 1000,
          },
        },
      }
    : variants;

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={resolvedVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  );
}

// ─── Stagger container ────────────────────────────────────────────────────────

interface StaggerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function Stagger({ children, className = '', delay = 0, stagger = 0.09 }: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: delay / 1000 } } }}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  );
}

// ─── Stagger item ─────────────────────────────────────────────────────────────

interface StaggerItemProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className = '', ...props }: StaggerItemProps) {
  return (
    <motion.div className={className} variants={staggerItem} {...props}>
      {children}
    </motion.div>
  );
}

// ─── Hero text animation ──────────────────────────────────────────────────────

export function HeroReveal({ children, className = '', delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.85, ease: EASE_OUT_EXPO, delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}

// ─── Image reveal ─────────────────────────────────────────────────────────────

export function ImageReveal({ children, className = '', delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 20 }}
      transition={{ duration: 0.75, ease: EASE_OUT_EXPO, delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}

// ─── Slide reveal ─────────────────────────────────────────────────────────────

export function SlideReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: RevealProps & { direction?: 'up' | 'left' | 'right' }) {
  const v = direction === 'left' ? slideInLeft : direction === 'right' ? slideInRight : fadeUp;
  return (
    <Reveal className={className} delay={delay} variants={v}>
      {children}
    </Reveal>
  );
}

// ─── Animated counter ────────────────────────────────────────────────────────

interface CounterProps {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  to,
  suffix = '',
  prefix = '',
  duration = 1.8,
  className = '',
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplayed(Math.round(v)),
    });
    return () => ctrl.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{displayed}{suffix}
    </span>
  );
}

// ─── Magnetic button wrapper ──────────────────────────────────────────────────

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export function Magnetic({ children, strength = 0.3, className = '' }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 28 });
  const sy = useSpring(y, { stiffness: 300, damping: 28 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}

// ─── Tilt card wrapper ────────────────────────────────────────────────────────

interface TiltProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

export function Tilt({ children, className = '', maxTilt = 6 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const srx = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const sry = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top)  / rect.height - 0.5;
    rotateY.set(px * maxTilt * 2);
    rotateX.set(-py * maxTilt * 2);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 800 }}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}

// ─── Line draw decoration ─────────────────────────────────────────────────────

interface LineDrawProps {
  className?: string;
  delay?: number;
  color?: string;
}

export function LineDraw({ className = '', delay = 0, color = 'currentColor' }: LineDrawProps) {
  const ref = useRef<SVGLineElement>(null);
  const inView = useInView(ref as unknown as React.RefObject<Element>, { once: true });

  return (
    <svg className={`w-full overflow-visible ${className}`} height="2" preserveAspectRatio="none">
      <motion.line
        ref={ref}
        x1="0" y1="1" x2="100%" y2="1"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: delay / 1000 }}
      />
    </svg>
  );
}

// ─── Text reveal (character by character) ────────────────────────────────────

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export function TextReveal({
  text,
  className = '',
  delay = 0,
  stagger = 0.025,
  tag = 'span',
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as unknown as React.RefObject<Element>, { once: true, margin: '-5% 0px' });
  const Tag = tag;
  const words = text.split(' ');

  return (
    // @ts-ignore — dynamic tag
    <Tag ref={ref} className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.65, ease: EASE_OUT_EXPO, delay: delay / 1000 + i * stagger }}
            aria-hidden
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

// ─── Blur-in reveal ───────────────────────────────────────────────────────────

export function BlurReveal({ children, className = '', delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-6% 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.75, ease: EASE_OUT_EXPO, delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}

// ─── Number ticker (for stats) ────────────────────────────────────────────────

interface TickerProps {
  value: string;
  className?: string;
}

export function Ticker({ value, className = '' }: TickerProps) {
  // Splits "247+" → numeric part + suffix
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return <span className={className}>{value}</span>;
  const [, num, suffix] = match;

  return (
    <span className={className}>
      <AnimatedCounter to={parseInt(num)} suffix={suffix} duration={2} />
    </span>
  );
}
