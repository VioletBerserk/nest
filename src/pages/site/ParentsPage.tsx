import { ArrowRight, Coffee, Users, Wifi, BookOpen, Wine, Star } from 'lucide-react';
import { Button } from '../../components/ds/Button';
import { Reveal, ImageReveal, HeroReveal } from '../../components/motion';
import type { SitePage } from '../../components/layout/SiteHeader';

const adultEvents = [
  { icon: <Wine />, name: 'Monthly Long Table Dinner', freq: 'First Friday', desc: 'A long table, 30 chairs, no assigned seats. This is how friendships start.' },
  { icon: <BookOpen />, name: 'Book Club', freq: 'Last Sunday', desc: 'Rotating fiction and non-fiction. Always bilingual. Usually runs late.' },
  { icon: <Coffee />, name: 'Professional Brunches', freq: 'Bi-weekly Saturday', desc: 'Informal networking over coffee and eggs. Designers, founders, educators, and parents who are all three.' },
  { icon: <Users />, name: 'Parenting in a New Culture', freq: 'Monthly Thursday', desc: 'Honest conversation circles on raising bilingual children, navigating schools, and staying sane.' },
  { icon: <Star />, name: 'Guest Speaker Evenings', freq: 'Monthly', desc: 'A local entrepreneur, a psychologist, a chef, an artist. Always followed by drinks and conversation.' },
  { icon: <Wifi />, name: 'Craft Evenings', freq: 'Seasonal', desc: "Ceramics, macramé, candle-making. You don't need to be crafty. You just need to show up." },
];

export default function ParentsPage({ setPage }: { setPage: (p: SitePage) => void }) {
  return (
    <div className="bg-cream-100">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-end pb-20 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"
          alt="NEST café"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
        <div className="relative max-w-page mx-auto container-px">
          <HeroReveal>
            <p className="text-overline text-terracotta-300 uppercase mb-4">For Parents</p>
            <h1 className="font-serif text-display-xl text-white leading-tight mb-5 max-w-2xl">
              Finally, time that's yours.
            </h1>
            <p className="text-body-xl text-white/70 max-w-xl leading-relaxed">
              The café, the community, the coworking corner, and the adult events you've been missing
              since you moved here.
            </p>
          </HeroReveal>
        </div>
      </section>

      {/* The café */}
      <section className="py-24">
        <div className="max-w-page mx-auto container-px grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <p className="text-overline text-terracotta-500 uppercase mb-5">The NEST Café</p>
            <h2 className="font-serif text-display-md text-neutral-900 mb-6 leading-tight">
              The café is the heartbeat.
            </h2>
            <p className="text-body-lg text-neutral-600 leading-relaxed mb-5">
              Not about volume or turnover. About atmosphere. Long tables for community. Small tables
              for focus. A counter where the barista knows your name by your third visit.
            </p>
            <p className="text-body-lg text-neutral-600 leading-relaxed mb-8">
              Specialty single-origin coffee. Eastern European pastries alongside modern café staples.
              Russian tea culture honoured — samovar-inspired ritual teas. Seasonal, local, thoughtfully sourced.
            </p>
            <blockquote className="font-serif italic text-xl text-neutral-800 border-l-2 border-terracotta-300 pl-5">
              "Our Friday afternoon community table is always full by 10am. Strangers arrive. Friends leave."
            </blockquote>
          </Reveal>
          <ImageReveal delay={150}>
            <img
              src="https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&dpr=1"
              alt="NEST café interior"
              className="rounded-3xl w-full object-cover aspect-[4/3]"
            />
          </ImageReveal>
        </div>
      </section>

      {/* Café highlights */}
      <section className="py-16 bg-cream-200">
        <div className="max-w-page mx-auto container-px">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <Coffee />, title: 'Specialty Coffee', desc: 'Single-origin espresso and pour-over. Our beans change seasonally.' },
              { icon: <Star />, title: 'Community Table', desc: 'Every Friday afternoon: open seating, no reservations, instant community.' },
              { icon: <BookOpen />, title: 'Birthday Ritual', desc: 'Members get a free coffee on their birthday. No exceptions.' },
              { icon: <Wifi />, title: 'Coworking Corner', desc: 'Fast Wi-Fi, power at every seat, monitors on request. Work while kids are in class.' },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <div className="bg-white rounded-2xl p-6 shadow-card h-full">
                  <div className="w-10 h-10 rounded-xl bg-terracotta-50 text-terracotta-600 flex items-center justify-center mb-4 [&>svg]:size-5">
                    {item.icon}
                  </div>
                  <h3 className="font-serif text-heading-md text-neutral-900 mb-2">{item.title}</h3>
                  <p className="text-body-sm text-neutral-500 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Adult events */}
      <section className="py-24">
        <div className="max-w-page mx-auto container-px">
          <Reveal className="mb-12">
            <p className="text-overline text-terracotta-500 uppercase mb-4">Adult Programme</p>
            <h2 className="font-serif text-display-md text-neutral-900 mb-5">Events for you. Not the kids.</h2>
            <p className="text-body-lg text-neutral-500 max-w-xl">
              Real adults need real events. Not soft-play-adjacent gatherings. These are evening dinners,
              book clubs, wine nights, and professional circles that actually lead somewhere.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {adultEvents.map((e, i) => (
              <Reveal key={e.name} delay={i * 60}>
                <div className="bg-white rounded-2xl p-6 shadow-card group hover:shadow-card-hover transition-shadow h-full">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-500 group-hover:bg-terracotta-50 group-hover:text-terracotta-600 flex items-center justify-center mb-4 [&>svg]:size-5 transition-all duration-200">
                    {e.icon}
                  </div>
                  <h3 className="font-serif text-heading-lg text-neutral-900 mb-1">{e.name}</h3>
                  <p className="text-caption text-terracotta-500 mb-3">{e.freq}</p>
                  <p className="text-body-sm text-neutral-500 leading-relaxed">{e.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button size="lg" onClick={() => setPage('events')} iconRight={<ArrowRight />}>
              See full events calendar
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-page mx-auto container-px">
          <Reveal className="text-center mb-12">
            <h2 className="font-serif text-display-md text-cream-100">What parents say.</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { quote: "I work from the café while my kids are upstairs in the studio. It changed our entire week. I'm productive AND present.", name: 'Olga M.', role: 'Remote product manager, mother of two' },
              { quote: "The Friday long table. That's where I found my Belgrade friendships. We're a WhatsApp group now. We have holidays together.", name: 'Marina K.', role: 'Community member, 14 months in Belgrade' },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="border border-neutral-700 rounded-2xl p-8 h-full flex flex-col">
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, j) => <Star key={j} size={13} className="text-terracotta-400 fill-terracotta-400" />)}
                  </div>
                  <blockquote className="font-serif italic text-xl text-cream-100 leading-relaxed mb-5 flex-1">"{t.quote}"</blockquote>
                  <div>
                    <p className="text-label-md text-terracotta-400">{t.name}</p>
                    <p className="text-caption text-neutral-500 mt-1">{t.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="max-w-xl mx-auto container-px">
          <Reveal>
            <h2 className="font-serif text-display-md text-neutral-900 mb-5">Your coffee is waiting.</h2>
            <p className="text-body-lg text-neutral-500 mb-2">Walk in, sit down, breathe.</p>
            <p className="text-body-md text-neutral-400 mb-8">That's really all it takes.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" onClick={() => setPage('events')} iconRight={<ArrowRight />}>See upcoming events</Button>
              <Button size="lg" variant="outline" onClick={() => setPage('membership')}>Become a member</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
