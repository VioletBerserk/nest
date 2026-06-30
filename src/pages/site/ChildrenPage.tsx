import { ArrowRight, BookOpen, Palette, FlaskConical, Music, Globe, Star } from 'lucide-react';
import { Button } from '../../components/ds/Button';
import { Reveal, ImageReveal, HeroReveal } from '../../components/motion';
import type { SitePage } from '../../components/layout/SiteHeader';

const programmes = [
  { icon: <BookOpen />, name: 'Russian Language & Literature', age: '6–12', freq: 'Twice weekly', desc: 'Story hours, reading circles, and writing games that make language feel alive — not like homework.' },
  { icon: <Palette />, name: 'Art & Mixed Media', age: '6–12', freq: 'Weekly', desc: 'Watercolour, clay, collage, and illustration. No pressure to be perfect. Just permission to create.' },
  { icon: <FlaskConical />, name: 'Discovery Lab', age: '8–12', freq: 'Weekly', desc: 'Science experiments, engineering challenges, and hands-on discovery afternoons that spark genuine curiosity.' },
  { icon: <Music />, name: 'Music & Movement', age: '6–9', freq: 'Weekly', desc: 'Rhythm, folk songs, and musical exploration for younger children. No experience required.' },
  { icon: <Globe />, name: 'Cultural Club', age: '7–12', freq: 'Monthly', desc: 'Celebrating Russian holidays, exploring Serbian culture, and building a proud dual identity.' },
  { icon: <Star />, name: 'Theatre & Storytelling', age: '8–12', freq: 'Seasonal', desc: 'Three-month production culminating in a performance for families. Builds confidence, memory, and presence.' },
];

export default function ChildrenPage({ setPage }: { setPage: (p: SitePage) => void }) {
  return (
    <div className="bg-cream-100">
      {/* Hero */}
      <section className="relative h-[65vh] flex items-end pb-20 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"
          alt="Children at NEST"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="relative max-w-page mx-auto container-px">
          <HeroReveal>
            <p className="text-overline text-terracotta-300 uppercase mb-4">For Children · Ages 6–12</p>
            <h1 className="font-serif text-display-xl text-white leading-tight mb-5 max-w-2xl">
              Where curious children feel completely at home.
            </h1>
            <p className="text-body-xl text-white/70 max-w-xl leading-relaxed">
              Creative programmes, Russian language, hands-on discovery — in a space designed to let
              imagination run free.
            </p>
          </HeroReveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24">
        <div className="max-w-page mx-auto container-px grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <p className="text-overline text-terracotta-500 uppercase mb-5">Our Approach</p>
            <h2 className="font-serif text-display-md text-neutral-900 mb-6 leading-tight">
              Learning that doesn't feel like school.
            </h2>
            <p className="text-body-lg text-neutral-600 leading-relaxed mb-5">
              At NEST, children's programmes are built around one principle: children learn best when
              they don't realise they are learning.
            </p>
            <p className="text-body-lg text-neutral-600 leading-relaxed mb-8">
              Art, science, language, music — woven together with play, friendship, and the safety to
              try things and get them wrong. Our facilitators are trained educators who speak Russian
              natively and understand what it means to grow up between cultures.
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[
                ['Max 12', 'per session'],
                ['Russian-led', 'Native speakers'],
                ['Ages 6–12', 'Two cohorts'],
              ].map(([k, v]) => (
                <div key={k} className="bg-cream-200 rounded-xl p-4 text-center border border-cream-300">
                  <p className="text-label-md text-neutral-800 font-semibold mb-0.5">{k}</p>
                  <p className="text-caption text-neutral-500">{v}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <ImageReveal delay={150}>
            <img
              src="https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&dpr=1"
              alt="Children reading"
              className="rounded-3xl w-full object-cover aspect-[4/3]"
            />
          </ImageReveal>
        </div>
      </section>

      {/* Programmes */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-page mx-auto container-px">
          <Reveal className="mb-12">
            <p className="text-overline text-terracotta-400 uppercase mb-4">Programmes</p>
            <h2 className="font-serif text-display-md text-cream-100 mb-4">What children do at NEST.</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {programmes.map((p, i) => (
              <Reveal key={p.name} delay={i * 60}>
                <div className="border border-neutral-700 hover:border-terracotta-500/40 rounded-2xl p-6 h-full flex flex-col transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-neutral-800 text-neutral-400 group-hover:bg-terracotta-500 group-hover:text-white flex items-center justify-center mb-4 [&>svg]:size-5 transition-all duration-200">
                    {p.icon}
                  </div>
                  <h3 className="font-serif text-heading-lg text-cream-100 mb-1">{p.name}</h3>
                  <div className="flex gap-2 mb-3">
                    <span className="text-caption text-terracotta-400">Ages {p.age}</span>
                    <span className="text-caption text-neutral-600">·</span>
                    <span className="text-caption text-neutral-500">{p.freq}</span>
                  </div>
                  <p className="text-body-sm text-neutral-400 leading-relaxed flex-1">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Age groups */}
      <section className="py-24">
        <div className="max-w-page mx-auto container-px">
          <Reveal className="text-center mb-14">
            <p className="text-overline text-terracotta-500 uppercase mb-4">Age Groups</p>
            <h2 className="font-serif text-display-md text-neutral-900">Programmes designed by age.</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { ages: '6–8 years', title: 'Little Explorers', desc: 'Play-based learning, music, movement, art, and early Russian language enrichment. Sessions are 60–75 minutes, in very small groups (8 max).', highlights: ['Structured play', 'Bilingual storytelling', 'Art & craft', 'Movement & rhythm'] },
              { ages: '9–12 years', title: 'Curious Minds', desc: 'Deeper workshops, longer sessions, collaborative projects, and real creative output. Children work together and produce something they are proud of.', highlights: ['Science experiments', 'Creative writing', 'Theatre production', 'Photography basics'] },
            ].map((g, i) => (
              <Reveal key={g.ages} delay={i * 100}>
                <div className="bg-white rounded-3xl p-8 shadow-card">
                  <p className="text-overline text-terracotta-500 uppercase mb-3">{g.ages}</p>
                  <h3 className="font-serif text-display-sm text-neutral-900 mb-4">{g.title}</h3>
                  <p className="text-body-md text-neutral-500 leading-relaxed mb-5">{g.desc}</p>
                  <ul className="space-y-2">
                    {g.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2.5 text-body-sm text-neutral-700">
                        <span className="size-1.5 rounded-full bg-terracotta-400 flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Safety */}
      <section className="py-14 bg-sage-50">
        <div className="max-w-3xl mx-auto container-px">
          <Reveal className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sage-500 flex items-center justify-center mt-1">
              <svg viewBox="0 0 16 16" fill="none" className="size-5 text-white"><path d="M8 2L3 5v4c0 3.3 2.3 5.5 5 6 2.7-.5 5-2.7 5-6V5L8 2z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"/></svg>
            </div>
            <div>
              <h2 className="font-serif text-heading-xl text-neutral-900 mb-3">Safety & Trust</h2>
              <p className="text-body-lg text-neutral-600 leading-relaxed mb-3">
                Every NEST facilitator is DBS-checked, has early childhood or relevant education training, and speaks
                Russian natively. The children's studio has a single controlled entry point visible from the café.
                Parents can see the room at all times through a glass partition.
              </p>
              <p className="text-body-sm text-neutral-500">Questions about our safeguarding approach? We explain our process in full — just ask.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="max-w-xl mx-auto container-px">
          <Reveal>
            <h2 className="font-serif text-display-md text-neutral-900 mb-5">Ready to try a session?</h2>
            <p className="text-body-lg text-neutral-500 mb-2">First sessions are free for new families.</p>
            <p className="text-body-md text-neutral-400 mb-8">Book a spot, or simply come in and see the space first.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" onClick={() => setPage('events')} iconRight={<ArrowRight />}>Browse upcoming sessions</Button>
              <Button size="lg" variant="outline" onClick={() => setPage('membership')}>Become a member</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
