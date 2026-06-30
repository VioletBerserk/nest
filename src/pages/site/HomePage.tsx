import { useRef } from 'react';
import { ArrowRight, Calendar, Users, Star, Heart, Quote } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '../../components/ds/Button';
import { EventCard } from '../../components/ds/Card';
import { Reveal, Ticker, BlurReveal } from '../../components/motion';
import { HeroSection } from '../../components/site/HeroSection';
import { Marquee } from '../../components/site/Marquee';
import type { SitePage } from '../../components/layout/SiteHeader';

const PHOTOS = {
  children:  'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=900&h=1100&dpr=1',
  teens:     'https://images.pexels.com/photos/1036808/pexels-photo-1036808.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&dpr=1',
  parents:   'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&dpr=1',
  space:     'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
  community: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=840&dpr=1',
};

const EVENTS = [
  { category: 'Children · 6–10', title: 'Watercolour & Imagination', date: 'Sat, 5 Jul', time: '10:00–12:00', location: 'NEST Studio', attendees: 8, maxAttendees: 12, image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1' },
  { category: 'Teen Creative', title: 'Photography: Telling Stories Without Words', date: 'Sun, 6 Jul', time: '14:00–17:00', location: 'NEST Studio', attendees: 13, maxAttendees: 15, image: 'https://images.pexels.com/photos/1036808/pexels-photo-1036808.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1' },
  { category: 'Community', title: 'Monthly Long Table Dinner', date: 'Fri, 11 Jul', time: '19:00–22:00', location: 'NEST Café', attendees: 24, maxAttendees: 30, image: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1' },
];

// ─── Cinematic StatStrip ──────────────────────────────────────────────────────
function StatStrip() {
  const stats = [
    { value: '247', suffix: '+', label: 'Member Families', sub: 'Belgrade & counting', icon: <Users size={16} /> },
    { value: '34',  suffix: '',  label: 'Events each month', sub: 'Every age, every interest', icon: <Calendar size={16} /> },
    { value: '3',   suffix: '',  label: 'Languages spoken', sub: 'Around every table', icon: <Star size={16} /> },
    { value: '1',   suffix: '',  label: 'Place like this', sub: 'Nothing quite like NEST', icon: <Heart size={16} /> },
  ];

  return (
    <div className="relative bg-neutral-900 py-20 overflow-hidden noise">
      {/* Radial warm glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(196,113,90,0.12) 0%, transparent 70%)' }}
      />
      <div className="max-w-page mx-auto container-px">
        {/* Section label */}
        <motion.p
          className="text-overline text-terracotta-500 uppercase mb-14 text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          By the numbers
        </motion.p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-800 rounded-3xl overflow-hidden">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="relative flex flex-col items-center text-center px-8 py-10 bg-neutral-900 group"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ delay: i * 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Top rule */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-6 bg-gradient-to-b from-terracotta-500/40 to-transparent" />

              <div className="flex items-center gap-1.5 text-terracotta-600/60 group-hover:text-terracotta-500 transition-colors mb-4">
                {s.icon}
              </div>
              <p
                className="font-serif text-cream-100 mb-1 leading-none"
                style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', letterSpacing: '-0.03em' }}
              >
                <Ticker value={`${s.value}${s.suffix}`} />
              </p>
              <p className="text-label-md text-neutral-300 mt-2">{s.label}</p>
              <p className="text-caption text-neutral-600 mt-1">{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Horizontal scroll testimonials ──────────────────────────────────────────
function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: scrollRef });
  const progressWidth = useTransform(scrollXProgress, [0, 1], ['0%', '100%']);

  const testimonials = [
    { quote: 'I walked in on a Tuesday and left with three new friends and a standing Wednesday coffee date. NEST gave me back my social life after two years of nothing.', name: 'Marina K.', role: 'Mother of two · 8 months in Belgrade', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=1' },
    { quote: "I used to dread weekends. Now I actually look forward to them. The photography club changed how I see this city — and myself.", name: 'Artem S.', role: 'Teen member · Age 16', image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=1' },
    { quote: "We both work remotely and our kids have activities here while we have coffee in the next room. We finally have a rhythm. NEST is the missing piece.", name: 'Olga & Dmitri', role: 'Family members · 18 months in Belgrade', image: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=1' },
    { quote: "I'd been looking for people who understand both worlds. They're all here. The bilingual evenings feel like the most natural thing in the world.", name: 'Dasha V.', role: 'Community member · 6 months in Belgrade', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=1' },
  ];

  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-page mx-auto container-px mb-10">
        <Reveal className="flex items-end justify-between gap-6">
          <div>
            <p className="text-overline text-terracotta-500 uppercase mb-4">Community Voices</p>
            <h2 className="font-serif text-display-md text-neutral-900 leading-tight">
              What our families say.
            </h2>
          </div>
          {/* Progress bar */}
          <div className="hidden sm:flex flex-col items-end gap-2 pb-1">
            <p className="text-caption text-neutral-400">Scroll to read</p>
            <div className="w-24 h-px bg-neutral-200 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-terracotta-500"
                style={{ width: progressWidth }}
              />
            </div>
          </div>
        </Reveal>
      </div>

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide px-5 sm:px-6 lg:px-8 pb-6"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {/* Left edge spacer aligned to max-page */}
        <div className="flex-shrink-0 w-[calc(50vw-600px)] hidden 2xl:block" />

        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            className="flex-shrink-0 w-[min(380px,85vw)] bg-white rounded-3xl p-8 shadow-card flex flex-col"
            style={{ scrollSnapAlign: 'start' }}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-5% 0px' }}
            transition={{ delay: i * 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, boxShadow: '0 20px 40px -8px rgba(28,20,16,0.12)' }}
          >
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={13} className="text-terracotta-400 fill-terracotta-400" />
              ))}
            </div>

            {/* Quote icon */}
            <Quote size={20} className="text-terracotta-200 mb-3" />

            <blockquote className="font-serif italic text-body-xl text-neutral-700 leading-relaxed flex-1 mb-8">
              "{t.quote}"
            </blockquote>

            {/* Avatar + attribution */}
            <div className="flex items-center gap-3 pt-5 border-t border-neutral-100">
              <img
                src={t.image}
                alt={t.name}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div>
                <p className="text-label-md text-neutral-900">{t.name}</p>
                <p className="text-caption text-neutral-400 mt-0.5">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Right trailing spacer */}
        <div className="flex-shrink-0 w-5 sm:w-6 lg:w-8" />
      </div>
    </section>
  );
}

// ─── Editorial feature cards ──────────────────────────────────────────────────
function ForEveryoneSection({ setPage }: { setPage: (p: SitePage) => void }) {
  return (
    <section className="py-24 max-w-page mx-auto container-px">
      <Reveal className="mb-14">
        <p className="text-overline text-terracotta-500 uppercase mb-4">A place for everyone</p>
        <h2 className="font-serif text-display-lg text-neutral-900 leading-tight mb-5 max-w-2xl">
          Not a school. Not a playground.<br />
          <em>A second home.</em>
        </h2>
        <p className="text-body-xl text-neutral-500 max-w-xl leading-relaxed">
          For families who moved to Belgrade and miss their community. A place where
          everyone belongs — the six-year-old who draws, the teenager who photographs,
          and the parent who just needs a real coffee and a longer exhale.
        </p>
      </Reveal>

      {/* Asymmetric editorial grid */}
      <div className="grid md:grid-cols-2 gap-4 items-start">
        {/* Large portrait card — Children */}
        <BlurReveal delay={0}>
          <motion.button
            onClick={() => setPage('children')}
            className="group w-full text-left block"
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          >
            <div className="aspect-[3/4] rounded-3xl overflow-hidden relative" style={{ boxShadow: '0 24px 56px -12px rgba(28,20,16,0.18)' }}>
              <motion.img
                src={PHOTOS.children}
                alt="Children's programmes at NEST"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* Multi-stop gradient for deep legible text */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-900/20 to-transparent" />
              {/* Category badge */}
              <div className="absolute top-5 left-5">
                <span className="text-overline text-terracotta-300 bg-black/30 backdrop-blur-sm border border-terracotta-400/30 rounded-full px-3 py-1 uppercase" style={{ fontSize: '0.62rem', letterSpacing: '0.16em' }}>
                  Ages 6–12
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <p className="font-serif text-display-sm text-white leading-tight mb-3">
                  Learn, Create,<br />Discover
                </p>
                <p className="text-body-sm text-white/60 leading-relaxed mb-5 max-w-xs">
                  Art, science, language, storytelling. A studio designed for curious minds.
                </p>
                <span className="inline-flex items-center gap-2 text-label-sm text-terracotta-300 group-hover:gap-3 transition-all">
                  Children's programmes <ArrowRight size={13} />
                </span>
              </div>
            </div>
          </motion.button>
        </BlurReveal>

        {/* Right column — stacked teens + parents */}
        <div className="flex flex-col gap-4">
          {[
            {
              page: 'teens' as SitePage,
              photo: PHOTOS.teens,
              badge: 'Ages 13–18',
              title: 'Find Your\nCreative Voice',
              desc: 'Photography, design, music, writing. A studio and a crew that takes teenagers seriously.',
            },
            {
              page: 'parents' as SitePage,
              photo: PHOTOS.parents,
              badge: 'For Parents',
              title: 'Finally,\nTime to Breathe',
              desc: 'Specialty coffee, community tables, and adult events. Your place too.',
            },
          ].map((item, i) => (
            <BlurReveal key={item.page} delay={(i + 1) * 120}>
              <motion.button
                onClick={() => setPage(item.page)}
                className="group w-full text-left block"
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              >
                <div className="aspect-[16/9] rounded-3xl overflow-hidden relative" style={{ boxShadow: '0 20px 48px -10px rgba(28,20,16,0.16)' }}>
                  <motion.img
                    src={item.photo}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/75 via-neutral-900/15 to-transparent" />
                  <div className="absolute top-4 left-5">
                    <span className="text-overline text-terracotta-300 bg-black/30 backdrop-blur-sm border border-terracotta-400/30 rounded-full px-3 py-1 uppercase" style={{ fontSize: '0.62rem', letterSpacing: '0.16em' }}>
                      {item.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="font-serif text-heading-xl text-white leading-tight mb-2 whitespace-pre-line">{item.title}</p>
                    <p className="text-body-sm text-white/55 leading-relaxed mb-4">{item.desc}</p>
                    <span className="inline-flex items-center gap-2 text-label-sm text-terracotta-300 group-hover:gap-3 transition-all">
                      Learn more <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </motion.button>
            </BlurReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage({ setPage }: { setPage: (p: SitePage) => void }) {
  return (
    <div className="bg-cream-100">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <HeroSection setPage={setPage} />

      {/* ── For Everyone ─────────────────────────────────────────────── */}
      <ForEveryoneSection setPage={setPage} />

      {/* ── Stats strip ─────────────────────────────────────────────── */}
      <StatStrip />

      {/* ── Events preview ──────────────────────────────────────────── */}
      <section className="py-24 max-w-page mx-auto container-px">
        <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12">
          <div>
            <p className="text-overline text-terracotta-500 uppercase mb-3">Coming Up</p>
            <h2 className="font-serif text-display-md text-neutral-900">This week at NEST.</h2>
          </div>
          <Button variant="outline" onClick={() => setPage('events')} iconRight={<ArrowRight />}>
            Full calendar
          </Button>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {EVENTS.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5% 0px' }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <EventCard {...e} onBook={() => setPage('events')} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── The Space — cinematic banner ─────────────────────────────── */}
      <section className="relative h-[80vh] min-h-[520px] overflow-hidden flex items-center">
        <motion.img
          src={PHOTOS.space}
          alt="NEST interior"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {/* Subtle warm atmospheric glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 65% at 15% 60%, rgba(196,113,90,0.14) 0%, transparent 60%)' }} />
        <div className="relative max-w-page mx-auto container-px w-full">
          <BlurReveal className="max-w-lg">
            <p className="text-overline text-terracotta-300 uppercase mb-5" style={{ fontSize: '0.65rem', letterSpacing: '0.2em' }}>The Space</p>
            <h2
              className="font-serif text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', letterSpacing: '-0.03em' }}
            >
              Designed to feel<br />like home.<br />
              <em>The second kind.</em>
            </h2>
            <p className="text-body-lg text-white/55 leading-relaxed mb-9 max-w-sm">
              Warm materials. Long community tables. A children's studio that sparks imagination.
              A barista who knows your order by your third visit.
            </p>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setPage('space')}
              className="border-white/35 text-white hover:bg-white/10 hover:border-white/60"
              iconRight={<ArrowRight />}
            >
              Tour the space
            </Button>
          </BlurReveal>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────────────── */}
      <Testimonials />

      {/* ── Membership teaser ───────────────────────────────────────── */}
      <section className="py-24 bg-neutral-900 overflow-hidden relative noise">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 0%, rgba(196,113,90,0.12) 0%, transparent 55%)' }}
        />
        <div className="max-w-page mx-auto container-px relative">
          <Reveal className="text-center mb-14">
            <p className="text-overline text-terracotta-400 uppercase mb-4">Membership</p>
            <h2 className="font-serif text-display-lg text-cream-100 mb-5 max-w-xl mx-auto leading-tight">
              Make NEST part<br />of your week.
            </h2>
            <p className="text-body-xl text-neutral-400 max-w-lg mx-auto leading-relaxed">
              Priority booking, community access, café discounts, and a reason to come back every week.
              From&nbsp;€19/month.
            </p>
          </Reveal>

          {/* Pricing grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
            {[
              { tier: 'Teen', price: '€19', period: '/mo', desc: 'Creative studio, workshops, your crew.' },
              { tier: 'Community', price: '€29', period: '/mo', desc: 'Café, events, and belonging.' },
              { tier: 'Family', price: '€69', period: '/mo', desc: 'The whole family, one plan.', highlighted: true },
              { tier: 'Founding', price: '€149', period: '/mo', desc: 'First 50 families. Price locked forever.' },
            ].map((m, i) => (
              <motion.button
                key={m.tier}
                onClick={() => setPage('membership')}
                className={`text-left p-7 rounded-3xl border transition-all duration-200 ${
                  m.highlighted
                    ? 'bg-terracotta-500 border-terracotta-400'
                    : 'bg-neutral-800/50 border-neutral-700/80 text-cream-100 hover:border-neutral-500 hover:bg-neutral-800'
                }`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ delay: i * 0.09, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5 }}
              >
                <p className={`text-overline uppercase mb-5 ${m.highlighted ? 'text-terracotta-100' : 'text-neutral-600'}`}>
                  {m.tier}
                </p>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className={`font-serif text-display-md leading-none ${m.highlighted ? 'text-white' : 'text-cream-100'}`}>{m.price}</span>
                  <span className={`text-body-sm ${m.highlighted ? 'text-terracotta-200' : 'text-neutral-500'}`}>{m.period}</span>
                </div>
                <p className={`text-body-sm leading-relaxed mb-5 ${m.highlighted ? 'text-terracotta-100' : 'text-neutral-400'}`}>
                  {m.desc}
                </p>
                <div className={`flex items-center gap-1.5 text-label-sm ${m.highlighted ? 'text-white' : 'text-terracotta-400'}`}>
                  View plan <ArrowRight size={12} />
                </div>
              </motion.button>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" onClick={() => setPage('membership')} iconRight={<ArrowRight />}>
              Compare all plans
            </Button>
          </div>
        </div>
      </section>

      {/* ── Marquee divider ─────────────────────────────────────────── */}
      <div className="bg-terracotta-500 py-4 overflow-hidden">
        <Marquee
          items={['Café', 'Creative Studio', 'Children\'s Workshops', 'Teen Clubs', 'Long Table Dinners', 'Community', 'Belgrade', 'Coworking', 'Bilingual', 'Family Space']}
          className="text-overline text-terracotta-200/70 uppercase tracking-widest"
          separator="·"
          speed="slow"
        />
      </div>

      {/* ── Community CTA ────────────────────────────────────────────── */}
      <section className="relative h-[520px] overflow-hidden">
        <motion.img
          src={PHOTOS.community}
          alt="NEST community gathering"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.07 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-neutral-950/65" />
        {/* Warm centre glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 60%, rgba(196,113,90,0.12) 0%, transparent 65%)' }} />
        <div className="relative h-full flex items-center justify-center text-center px-5">
          <BlurReveal>
            <p className="text-overline text-terracotta-300/90 uppercase mb-5" style={{ fontSize: '0.65rem', letterSpacing: '0.22em' }}>Ready to belong?</p>
            <p
              className="font-serif text-white max-w-lg mx-auto leading-tight mb-9"
              style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)', letterSpacing: '-0.03em' }}
            >
              Your people<br />are already here.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="xl" onClick={() => setPage('membership')} iconRight={<ArrowRight />}>
                Become a member
              </Button>
              <motion.button
                onClick={() => setPage('events')}
                className="h-14 px-8 rounded-2xl border text-white text-label-lg font-medium"
                style={{ backdropFilter: 'blur(20px)', background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.20)' }}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.12)', borderColor: 'rgba(255,255,255,0.40)', y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                Explore events
              </motion.button>
            </div>
          </BlurReveal>
        </div>
      </section>

      {/* ── Trust strip ─────────────────────────────────────────────── */}
      <section className="py-14 bg-white border-y border-neutral-100">
        <div className="max-w-page mx-auto container-px">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-neutral-100">
            {[
              { label: 'No minimum commitment', sub: 'Cancel any time, no questions' },
              { label: 'First session on us', sub: 'Every new family, every time' },
              { label: 'Russian-speaking team', sub: 'Русский · English · Serbian' },
              { label: 'Open every day', sub: '9:00 – 20:00, 365 days a year' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="px-6 py-5 text-center"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-label-md text-neutral-900 font-semibold mb-1.5">{item.label}</p>
                <p className="text-caption text-neutral-400">{item.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
