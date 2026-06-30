import { ArrowRight, Camera, Pencil, Music, Code, Users } from 'lucide-react';
import { Button } from '../../components/ds/Button';
import { Reveal, ImageReveal, HeroReveal } from '../../components/motion';
import type { SitePage } from '../../components/layout/SiteHeader';

const clubs = [
  { icon: <Camera />, name: 'Photography Club', meets: 'Every Sunday 14:00', desc: 'From smartphone to mirrorless. Storytelling through images. Real portfolio output after 8 weeks.' },
  { icon: <Pencil />, name: 'Writing & Prose', meets: 'Every Thursday 17:00', desc: 'Short fiction, essays, memoir. Bilingual. A safe room to find your voice.' },
  { icon: <Music />, name: 'Music Production', meets: 'Every Saturday 13:00', desc: 'Beat-making, sound design, vocals. Access to equipment most studios charge €50/hour for.' },
  { icon: <Code />, name: 'Design & Branding', meets: 'Bi-weekly Saturday', desc: 'Figma, visual identity, type. The session that started when a teenager asked why all the logos looked the same.' },
  { icon: <Users />, name: 'Debate & Ideas', meets: 'Monthly Friday evening', desc: 'Real topics. Three languages. Adults are sometimes allowed in but they have to follow the rules.' },
];

export default function TeensPage({ setPage }: { setPage: (p: SitePage) => void }) {
  return (
    <div className="bg-cream-100">
      {/* Hero */}
      <section className="relative h-[70vh] flex items-end pb-20 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1036808/pexels-photo-1036808.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"
          alt="Teen at NEST"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative max-w-page mx-auto container-px">
          <HeroReveal className="max-w-2xl">
            <p className="text-overline text-terracotta-300 uppercase mb-4">For Teens · Ages 13–18</p>
            <h1 className="font-serif text-display-xl text-white leading-tight mb-5">
              Your space. Your rules. Your people.
            </h1>
            <p className="text-body-xl text-white/70 max-w-xl leading-relaxed">
              A proper creative studio for teenagers who are serious about making things. Not another
              after-school activity. A real place to become who you are.
            </p>
          </HeroReveal>
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-24 bg-neutral-900 overflow-hidden">
        <div className="max-w-3xl mx-auto container-px text-center relative">
          <div
            className="absolute inset-0 pointer-events-none opacity-5"
            style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #C4715A 0%, transparent 70%)" }}
          />
          <Reveal>
            <p className="text-overline text-terracotta-400 uppercase mb-8">The Teen Studio Manifesto</p>
            <p className="font-serif text-display-md text-cream-100 leading-snug mb-10">
              "Teenagers are not future adults.<br />They are complete people right now."
            </p>
            <div className="grid sm:grid-cols-3 gap-4 text-left">
              {[
                { num: '01', text: 'No permission slips required to have a real opinion.' },
                { num: '02', text: 'Mistakes are how you build a portfolio — not something to hide.' },
                { num: '03', text: "You'll understand when you're older? No. You understand right now." },
              ].map((item) => (
                <div key={item.num} className="border border-neutral-700 rounded-2xl p-5">
                  <p className="text-overline text-terracotta-500 mb-3">{item.num}</p>
                  <p className="text-body-md text-neutral-300 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* The experience */}
      <section className="py-24">
        <div className="max-w-page mx-auto container-px grid md:grid-cols-2 gap-16 items-center">
          <ImageReveal delay={100}>
            <img
              src="https://images.pexels.com/photos/3807543/pexels-photo-3807543.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&dpr=1"
              alt="Teen creative work"
              className="rounded-3xl w-full object-cover aspect-[4/3]"
            />
          </ImageReveal>
          <Reveal>
            <p className="text-overline text-terracotta-500 uppercase mb-5">The Studio</p>
            <h2 className="font-serif text-display-md text-neutral-900 mb-6 leading-tight">
              The kind of space you'll stay in for hours.
            </h2>
            <p className="text-body-lg text-neutral-600 leading-relaxed mb-5">
              Photography equipment. A design workstation with Figma and Adobe CC. A recording corner.
              Sofas. Natural light. Fast Wi-Fi. High-quality everything — because teenagers can tell the
              difference.
            </p>
            <p className="text-body-lg text-neutral-600 leading-relaxed mb-8">
              No adults hovering. Staff are nearby if needed. The studio runs on trust — because that's
              exactly how teenagers grow up.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {['Photography gear', 'Design workstation', 'Recording corner', 'Portfolio support', 'Mentorship access', 'Real output, not exercises'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-body-sm text-neutral-700">
                  <span className="size-1.5 rounded-full bg-terracotta-500 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Clubs */}
      <section className="py-20 bg-cream-200">
        <div className="max-w-page mx-auto container-px">
          <Reveal className="mb-12">
            <p className="text-overline text-terracotta-500 uppercase mb-4">Creative Clubs</p>
            <h2 className="font-serif text-display-md text-neutral-900 mb-4">Choose your thing.</h2>
            <p className="text-body-lg text-neutral-500 max-w-xl">Each club runs for 8-week seasons. No obligation to stay. But most people do.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {clubs.map((c, i) => (
              <Reveal key={c.name} delay={i * 60}>
                <div className="bg-white rounded-2xl p-6 shadow-card h-full group hover:shadow-card-hover transition-all duration-200">
                  <div className="w-10 h-10 rounded-xl bg-terracotta-50 text-terracotta-600 group-hover:bg-terracotta-500 group-hover:text-white flex items-center justify-center mb-4 [&>svg]:size-5 transition-all duration-200">
                    {c.icon}
                  </div>
                  <h3 className="font-serif text-heading-lg text-neutral-900 mb-1">{c.name}</h3>
                  <p className="text-caption text-terracotta-500 mb-3 uppercase tracking-wide">{c.meets}</p>
                  <p className="text-body-sm text-neutral-500 leading-relaxed">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Identity */}
      <section className="py-24">
        <div className="max-w-page mx-auto container-px grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <p className="text-overline text-terracotta-500 uppercase mb-5">Between Two Worlds</p>
            <h2 className="font-serif text-display-md text-neutral-900 mb-5 leading-tight">
              You don't have to choose.
            </h2>
            <p className="text-body-lg text-neutral-600 leading-relaxed mb-5">
              Russian at home. Serbian at school. English online. NEST is the place where all three
              are welcome at the same table — where your dual identity is not a problem to solve but
              a perspective to own.
            </p>
            <p className="text-body-lg text-neutral-600 leading-relaxed mb-8">
              Many of our teen members say NEST is the first place they felt completely themselves.
              That's what we're here for.
            </p>
            <Button size="lg" onClick={() => setPage('membership')} iconRight={<ArrowRight />}>
              Get teen membership
            </Button>
          </Reveal>
          <Reveal delay={100}>
            <div className="space-y-4">
              {[
                { name: 'Artem, 16', quote: 'I stopped dreading weekends. The photography club changed everything for me. I actually have a portfolio now.' },
                { name: 'Dasha, 17', quote: "I'd been looking for people who understand both worlds. They're all here." },
                { name: 'Misha, 14', quote: 'The design workstation is better than anything at my school. And nobody tells me my ideas are wrong.' },
              ].map((t) => (
                <blockquote key={t.name} className="bg-white rounded-2xl p-5 shadow-card border-l-2 border-terracotta-400">
                  <p className="font-serif italic text-neutral-700 mb-3">"{t.quote}"</p>
                  <p className="text-label-sm text-terracotta-500">{t.name}</p>
                </blockquote>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
