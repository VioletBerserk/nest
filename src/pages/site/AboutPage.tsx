import { ArrowRight, Heart, Users, BookOpen, Coffee, Palette, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ds/Button';
import { Reveal, ImageReveal, HeroReveal } from '../../components/motion';
import type { SitePage } from '../../components/layout/SiteHeader';

const values = [
  { icon: <Heart />,    title: 'Belonging',   desc: 'Everyone deserves a place that feels like home — especially when they are far from the one they grew up in.' },
  { icon: <Users />,    title: 'Connection',  desc: 'Real relationships, built over coffee, shared dinners, and the things parents whisper about when the kids are occupied.' },
  { icon: <BookOpen />, title: 'Growth',      desc: "Learning and creativity thrive at every age. NEST refuses to stop at children's programmes." },
  { icon: <Coffee />,   title: 'Warmth',      desc: 'Genuine hospitality — not scripted, not transactional. The kind that notices when you are having a hard day.' },
  { icon: <Palette />,  title: 'Creativity',  desc: 'Art, photography, design, cooking. Expression is not a luxury. It is how people stay human.' },
  { icon: <Globe />,    title: 'Identity',    desc: 'A place where Russian-speaking families can be fully themselves — both worlds, not just one.' },
];

const timeline = [
  { year: '2023', event: 'The longing', desc: 'Three families in Belgrade realised they all had the same quiet wish: a community space that felt like home. Not an activity centre. Not a café. Something harder to name.' },
  { year: 'Early 2024', event: 'The search', desc: 'Months spent walking Savamala — the neighbourhood that felt most like a creative village — searching for a space with soul.' },
  { year: 'Mid 2024', event: 'The build', desc: 'A former printing studio transformed. Warm oak, linen curtains, a communal table long enough for twelve. Designed around the people who would fill it.' },
  { year: 'Late 2024', event: 'The opening', desc: 'NEST opens its doors. Within six weeks: 80 families, 200 members, and a waiting list for the founding tier.' },
  { year: '2025', event: 'The community', desc: 'Weekly events, a teen creative studio, a flourishing café. And now — a community that largely organises itself.' },
];

export default function AboutPage({ setPage }: { setPage: (p: SitePage) => void }) {
  return (
    <div className="bg-cream-100">
      {/* Hero — cinematic, minimal */}
      <section className="relative h-[72vh] min-h-[560px] flex items-end pb-20 overflow-hidden">
        <motion.img
          src="https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"
          alt="NEST community space"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-900/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/40 via-transparent to-transparent" />
        <div className="relative max-w-page mx-auto container-px">
          <HeroReveal>
            <p className="text-overline text-terracotta-300/90 uppercase mb-5" style={{ fontSize: '0.65rem', letterSpacing: '0.2em' }}>Our Story</p>
            <h1
              className="font-serif text-white leading-none mb-5 max-w-3xl"
              style={{ fontSize: 'clamp(2.75rem, 6vw, 5.5rem)', letterSpacing: '-0.03em' }}
            >
              Built by families,<br />
              <em>for families.</em>
            </h1>
            <p className="text-body-xl text-white/55 max-w-lg leading-relaxed">
              NEST was born from a quiet longing: a place where Russian-speaking families in Belgrade
              could feel completely themselves.
            </p>
          </HeroReveal>
        </div>
      </section>

      {/* Brand story — editorial */}
      <section className="py-28">
        <div className="max-w-page mx-auto container-px grid md:grid-cols-2 gap-20 items-center">
          <Reveal>
            <p className="text-overline text-terracotta-500 uppercase mb-6" style={{ fontSize: '0.62rem', letterSpacing: '0.18em' }}>The Story</p>
            <h2
              className="font-serif text-neutral-900 mb-8 leading-tight"
              style={{ fontSize: 'clamp(1.875rem, 3.5vw, 3rem)', letterSpacing: '-0.025em' }}
            >
              You move to a new city<br />and everything is unfamiliar.
            </h2>
            <div className="space-y-5 text-body-lg text-neutral-600 leading-relaxed">
              <p>
                The streets, the language, the school system. Your children adapt faster than you do.
                You smile and tell yourself it is fine.
              </p>
              <p className="text-neutral-500">
                But somewhere, you miss your people. Not just compatriots — the particular warmth of
                shared context. Shared humour. Shared references that do not need explaining.
              </p>
              <div className="border-l-2 border-terracotta-400 pl-6 py-1 my-8">
                <p className="font-serif italic text-neutral-800 leading-snug" style={{ fontSize: '1.2rem' }}>
                  "NEST was founded by people who had lived this exact experience. Not to solve a market gap —
                  to fix a feeling."
                </p>
              </div>
              <p className="text-neutral-500">
                It is not a service. Not a programme. It is a real, physical, warm place —
                where Russian-speaking families in Belgrade can finally exhale.
              </p>
            </div>
          </Reveal>
          <ImageReveal delay={150}>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1449775/pexels-photo-1449775.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&dpr=1"
                alt="Families at NEST"
                className="rounded-3xl w-full object-cover aspect-[4/3]"
                style={{ boxShadow: '0 32px 64px -16px rgba(28,20,16,0.18)' }}
              />
              {/* Floating stat */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-terracotta-500 text-white rounded-2xl p-5 shadow-xl"
                initial={{ opacity: 0, y: 20, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="font-serif leading-none mb-1" style={{ fontSize: '2.5rem' }}>247+</p>
                <p className="text-label-sm text-terracotta-100">member families</p>
              </motion.div>
            </div>
          </ImageReveal>
        </div>
      </section>

      {/* Mission & Vision — dark */}
      <section className="py-24 bg-neutral-900">
        <div className="max-w-page mx-auto container-px">
          <Reveal className="text-center mb-14">
            <p className="text-overline text-terracotta-400 uppercase mb-4" style={{ fontSize: '0.62rem', letterSpacing: '0.18em' }}>Purpose</p>
            <h2 className="font-serif text-cream-100 leading-tight" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
              What we're here to do.
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                label: 'Mission',
                text: 'To create a warm, premium community space where Russian-speaking families in Belgrade can grow, connect, and feel at home.',
                accent: 'terracotta',
              },
              {
                label: 'Vision',
                text: 'To become the most beloved community brand for international families in Europe — expanding to every city where families long for belonging.',
                accent: 'sage',
              },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 100}>
                <div
                  className="rounded-3xl p-10 border border-neutral-700/60 h-full"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <div className={`w-8 h-0.5 mb-6 ${item.accent === 'terracotta' ? 'bg-terracotta-500' : 'bg-sage-500'}`} />
                  <p className={`text-overline uppercase mb-4 ${item.accent === 'terracotta' ? 'text-terracotta-400' : 'text-sage-400'}`} style={{ fontSize: '0.62rem', letterSpacing: '0.18em' }}>
                    {item.label}
                  </p>
                  <p className="font-serif text-cream-100 leading-snug" style={{ fontSize: 'clamp(1.25rem, 2vw, 1.6rem)' }}>
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-28">
        <div className="max-w-page mx-auto container-px">
          <Reveal className="mb-16">
            <p className="text-overline text-terracotta-500 uppercase mb-4" style={{ fontSize: '0.62rem', letterSpacing: '0.18em' }}>What We Stand For</p>
            <h2 className="font-serif text-neutral-900 leading-tight" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', letterSpacing: '-0.025em' }}>
              Six things that don't<br />bend when it gets hard.
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 60}>
                <motion.div
                  className="bg-white rounded-2xl p-7 shadow-card h-full border border-neutral-100/80"
                  whileHover={{ y: -4, boxShadow: '0 20px 40px -8px rgba(28,20,16,0.1)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                >
                  <div className="w-9 h-9 rounded-xl bg-terracotta-50 text-terracotta-600 flex items-center justify-center mb-5 [&>svg]:size-[18px]">
                    {v.icon}
                  </div>
                  <h3 className="font-serif text-heading-lg text-neutral-900 mb-2.5">{v.title}</h3>
                  <p className="text-body-sm text-neutral-500 leading-relaxed">{v.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-28 bg-cream-200">
        <div className="max-w-2xl mx-auto container-px">
          <Reveal className="mb-16">
            <p className="text-overline text-terracotta-500 uppercase mb-4" style={{ fontSize: '0.62rem', letterSpacing: '0.18em' }}>How We Got Here</p>
            <h2 className="font-serif text-neutral-900 leading-tight" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', letterSpacing: '-0.025em' }}>
              Two years.<br />Five turning points.
            </h2>
          </Reveal>
          <div className="space-y-0">
            {timeline.map((t, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="flex gap-8 pb-12">
                  <div className="flex flex-col items-center flex-shrink-0 w-4">
                    <motion.div
                      className="w-3.5 h-3.5 rounded-full bg-terracotta-500 border-[3px] border-cream-200 mt-1.5 flex-shrink-0"
                      style={{ boxShadow: '0 0 0 4px rgba(196,113,90,0.15)' }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 + 0.2, type: 'spring', stiffness: 400, damping: 20 }}
                    />
                    {i < timeline.length - 1 && (
                      <div className="w-px flex-1 bg-gradient-to-b from-terracotta-200 to-terracotta-100/30 mt-2 min-h-[48px]" />
                    )}
                  </div>
                  <div className="pb-2 pt-0.5 flex-1">
                    <p className="text-overline text-terracotta-500 uppercase mb-1.5" style={{ fontSize: '0.62rem', letterSpacing: '0.18em' }}>{t.year}</p>
                    <h3 className="font-serif text-neutral-900 mb-2.5" style={{ fontSize: '1.3rem', letterSpacing: '-0.015em' }}>{t.event}</h3>
                    <p className="text-body-md text-neutral-500 leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center bg-white border-t border-neutral-100">
        <div className="max-w-xl mx-auto container-px">
          <Reveal>
            <p className="text-overline text-terracotta-500 uppercase mb-5" style={{ fontSize: '0.62rem', letterSpacing: '0.18em' }}>We're Open</p>
            <h2
              className="font-serif text-neutral-900 mb-5 leading-tight"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', letterSpacing: '-0.025em' }}
            >
              Come and see for yourself.
            </h2>
            <p className="text-body-lg text-neutral-500 mb-10 leading-relaxed">
              Open every day, 9am to 8pm. No appointment needed.<br />
              Just walk in — we'll have coffee ready.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" onClick={() => setPage('events')} iconRight={<ArrowRight />}>
                Explore events
              </Button>
              <Button size="lg" variant="outline" onClick={() => setPage('contact')}>
                Find us
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
