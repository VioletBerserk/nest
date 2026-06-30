import { useRef } from 'react';
import { ArrowRight, Users, Calendar, Coffee } from 'lucide-react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { Marquee } from './Marquee';
import type { SitePage } from '../layout/SiteHeader';

const HERO_IMAGE =
  'https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=2400&h=1600&dpr=1';

// ─── Animated headline ────────────────────────────────────────────────────────
function SplitHeadline() {
  const lines = [
    { text: 'Find Your', italic: false },
    { text: 'Nest.', italic: true },
  ];

  return (
    <h1
      className="font-serif leading-none mb-8 select-none"
      style={{ fontSize: 'clamp(4rem, 10vw, 9.5rem)', letterSpacing: '-0.04em' }}
    >
      {lines.map((line, li) => (
        <span key={li} className="block overflow-hidden">
          <motion.span
            className={`block text-white ${line.italic ? 'italic text-cream-200/90' : ''}`}
            initial={{ y: '105%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.35 + li * 0.2,
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line.text}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

// ─── Word-by-word subtitle ────────────────────────────────────────────────────
function AnimatedSubtitle({ text }: { text: string }) {
  const words = text.split(' ');
  return (
    <p className="text-body-xl text-white/60 max-w-md leading-[1.7] mb-10 flex flex-wrap gap-x-[0.3em]">
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.9 + i * 0.032,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

// ─── Glass pill ───────────────────────────────────────────────────────────────
function LocationPill() {
  return (
    <motion.div
      className="flex items-center gap-2.5 mb-14"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="flex items-center gap-2.5 rounded-full border px-4 py-2"
        style={{
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderColor: 'rgba(255,255,255,0.12)',
        }}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terracotta-400 opacity-70" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-terracotta-400" />
        </span>
        <span className="text-overline text-white/55 uppercase tracking-[0.18em]" style={{ fontSize: '0.65rem' }}>Belgrade · Serbia · Open Now</span>
      </div>
    </motion.div>
  );
}

// ─── CTA buttons ─────────────────────────────────────────────────────────────
function HeroCTAs({ setPage }: { setPage: (p: SitePage) => void }) {
  return (
    <motion.div
      className="flex flex-wrap gap-3 sm:gap-4"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Primary CTA */}
      <motion.button
        onClick={() => setPage('membership')}
        className="group relative flex items-center gap-3 rounded-2xl px-8 py-4 text-label-lg font-semibold text-white overflow-hidden"
        style={{ background: '#C4715A' }}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 420, damping: 26 }}
      >
        <span className="relative z-10">Become a Member</span>
        <motion.span
          className="relative z-10"
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
        >
          <ArrowRight size={16} />
        </motion.span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
          initial={{ x: '-110%' }}
          whileHover={{ x: '210%' }}
          transition={{ duration: 0.65 }}
        />
        {/* Subtle warm glow under button */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ boxShadow: '0 12px 28px -4px rgba(196,113,90,0.55)' }} />
      </motion.button>

      {/* Secondary glass CTA */}
      <motion.button
        onClick={() => setPage('events')}
        className="group flex items-center gap-3 rounded-2xl px-8 py-4 text-label-lg font-medium border"
        style={{
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderColor: 'rgba(255,255,255,0.14)',
          color: 'rgba(255,255,255,0.85)',
        }}
        whileHover={{
          scale: 1.03,
          y: -2,
          backgroundColor: 'rgba(255,255,255,0.12)',
          borderColor: 'rgba(255,255,255,0.26)',
        }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 420, damping: 26 }}
      >
        Explore Events
        <ArrowRight size={15} className="text-white/50 group-hover:text-white/80 transition-colors" />
      </motion.button>
    </motion.div>
  );
}

// ─── Floating glass stats card ────────────────────────────────────────────────
function StatsCard() {
  const stats = [
    { icon: <Users size={12} />, value: '247+', label: 'Member families' },
    { icon: <Calendar size={12} />, value: '34', label: 'Events / month' },
    { icon: <Coffee size={12} />, value: '9–20h', label: 'Open daily' },
  ];

  return (
    <motion.div
      className="absolute right-8 bottom-32 xl:right-16 hidden lg:block"
      initial={{ opacity: 0, x: 32, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 1.7, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="rounded-2xl p-5 w-56 border"
        style={{
          background: 'rgba(10,8,7,0.55)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          borderColor: 'rgba(255,255,255,0.09)',
          boxShadow: '0 32px 64px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
        }}
        whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.16)' }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success-400" />
          </span>
          <p className="text-overline text-white/35 uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.18em' }}>Live · Savamala</p>
        </div>
        <div className="space-y-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="flex items-center justify-between"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.9 + i * 0.09, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-2">
                <span className="text-white/30">{s.icon}</span>
                <span className="text-white/40" style={{ fontSize: '0.7rem' }}>{s.label}</span>
              </div>
              <span className="font-serif text-white font-medium" style={{ fontSize: '1.05rem' }}>{s.value}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Scroll indicator ─────────────────────────────────────────────────────────
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 0.8 }}
    >
      <span className="text-overline text-white/30 uppercase tracking-[0.2em]">Scroll</span>
      <div className="relative w-px h-14 overflow-hidden">
        <div className="absolute inset-0 bg-white/10" />
        <motion.div
          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-white/60 to-transparent"
          animate={{ y: ['0%', '100%'] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.4 }}
          style={{ height: '60%' }}
        />
      </div>
    </motion.div>
  );
}

// ─── Decorative grain overlay ─────────────────────────────────────────────────
function GrainOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.035]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '180px',
      }}
    />
  );
}

// ─── Main hero ────────────────────────────────────────────────────────────────
export function HeroSection({ setPage }: { setPage: (p: SitePage) => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const rawImageY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const imageY = useSpring(rawImageY, { stiffness: 80, damping: 30 });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, shouldReduceMotion ? 0 : -48]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[700px] overflow-hidden"
      aria-label="Hero"
    >
      {/* ── Background parallax image ──────────────────── */}
      <motion.div
        className="absolute inset-0 scale-[1.12] will-change-transform"
        style={{ y: imageY }}
      >
        <img
          src={HERO_IMAGE}
          alt="Families at NEST community space in Belgrade"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
      </motion.div>

      {/* ── Gradient layers ─────────────────────────────── */}
      {/* Base darkening — heavier at bottom for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/85" />
      {/* Left text column darkening */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent" />
      {/* Warm terracotta atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 65% 55% at 72% 12%, rgba(196,113,90,0.22) 0%, transparent 65%)' }}
      />
      {/* Edge vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 110% 110% at 50% 50%, transparent 45%, rgba(0,0,0,0.42) 100%)' }}
      />

      {/* ── Grain ───────────────────────────────────────── */}
      <GrainOverlay />

      {/* ── Content ─────────────────────────────────────── */}
      <motion.div
        className="relative h-full flex flex-col justify-end pb-28 max-w-page mx-auto container-px"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <LocationPill />
        <SplitHeadline />
        <AnimatedSubtitle text="A premium community café and creative club for Russian-speaking families in Belgrade. Where children thrive, teenagers discover themselves, and parents find their people." />
        <HeroCTAs setPage={setPage} />
      </motion.div>

      {/* ── Floating glass stats card ────────────────────── */}
      <StatsCard />

      {/* ── Scroll indicator ─────────────────────────────── */}
      <ScrollIndicator />

      {/* ── Marquee strip above fade ─────────────────────── */}
      <motion.div
        className="absolute bottom-[104px] left-0 right-0 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        <Marquee
          items={['Creative Studio', 'Community Café', 'Family Space', 'Children\'s Workshops', 'Teen Clubs', 'Long Table Dinners', 'Belgrade · Savamala', 'Russian-Speaking Community']}
          className="text-overline text-white/25 uppercase tracking-widest py-3"
          separator="—"
        />
      </motion.div>

      {/* ── Bottom fade into next section ────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-cream-100 to-transparent pointer-events-none" />
    </section>
  );
}
