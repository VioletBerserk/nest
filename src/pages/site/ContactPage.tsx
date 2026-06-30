import { useState } from 'react';
import { ArrowRight, MapPin, Clock, Phone, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/ds/Button';
import { Field, Input, Textarea, Select } from '../../components/ds/Input';
import { supabase } from '../../lib/supabase';
import { Reveal, HeroReveal } from '../../components/motion';
import type { SitePage } from '../../components/layout/SiteHeader';

const faqs = [
  { q: 'Do I need to be a member to visit?', a: 'No. The café is open to everyone. You can visit, have a coffee, and see the space anytime during opening hours. Membership unlocks priority event booking, programme credits, and community features.' },
  { q: 'Is NEST only for Russian-speaking families?', a: 'NEST was created with the Russian-speaking community in mind, but anyone is welcome. Our events run in Russian, English, and sometimes Serbian. The community is welcoming to all international families.' },
  { q: 'Can I drop in my child without staying?', a: 'During scheduled programmes, children attend with a registered place. We do not offer unscheduled drop-in childcare. Parents are always welcome to stay in the café while their children participate in activities.' },
  { q: 'How do I book a programme or workshop?', a: 'Events and workshops can be booked through this website on the Events page, or via our Telegram community. Members get 24-hour priority access before general booking opens.' },
  { q: 'Can I hire the space for a private event?', a: "Yes. NEST's studio and event space can be hired for birthday parties, team events, photography sessions, and private dinners. Contact us directly for availability and pricing." },
  { q: 'Are programmes available in English as well as Russian?', a: "Most children's programmes are delivered in Russian to preserve language skills. Teen and adult events run bilingual (Russian + English). All our staff speak both languages." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-2">
      {faqs.map((item, i) => (
        <div key={i} className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-neutral-50 transition-colors"
            aria-expanded={open === i}
          >
            <span className="text-body-md font-medium text-neutral-800 pr-4">{item.q}</span>
            <motion.span animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
              {open === i ? <ChevronUp size={16} className="text-neutral-400 flex-shrink-0" /> : <ChevronDown size={16} className="text-neutral-400 flex-shrink-0" />}
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                key="answer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 border-t border-neutral-100 bg-neutral-50">
                  <p className="text-body-md text-neutral-600 leading-relaxed pt-4">{item.a}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export default function ContactPage({ setPage: _setPage }: { setPage: (p: SitePage) => void }) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    const { error: sbError } = await supabase.from('contact_submissions').insert({
      name:    data.get('name') as string,
      email:   data.get('email') as string,
      subject: data.get('subject') as string || null,
      message: data.get('message') as string,
    });
    setLoading(false);
    if (sbError) {
      setError('Something went wrong. Please try again or email us directly.');
      return;
    }
    setSent(true);
  };

  return (
    <div className="bg-cream-100">
      {/* Hero */}
      <section className="pt-24 pb-16 bg-neutral-900">
        <div className="max-w-page mx-auto container-px">
          <HeroReveal>
            <p className="text-overline text-terracotta-400 uppercase mb-4">Get in Touch</p>
            <h1 className="font-serif text-display-xl text-cream-100 mb-5">Find us in Savamala.</h1>
            <p className="text-body-xl text-neutral-400 max-w-xl leading-relaxed">
              We are open Monday through Sunday. Come in for a coffee, ask a question, or just see the space.
            </p>
          </HeroReveal>
        </div>
      </section>

      {/* Info cards */}
      <section className="py-16">
        <div className="max-w-page mx-auto container-px">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {[
              { icon: <MapPin />, title: 'Address', lines: ['Savamala Quarter', 'Belgrade, Serbia', 'Near Brankov Most'] },
              { icon: <Clock />, title: 'Opening Hours', lines: ['Mon–Fri: 9:00–20:00', 'Sat–Sun: 9:00–19:00', 'Holidays: 10:00–18:00'] },
              { icon: <Mail />, title: 'Email', lines: ['nest.belgrade@gmail.com', 'Response within 24h'] },
              { icon: <Phone />, title: 'Telegram', lines: ['@nest_belgrade', 'Fastest response', 'Community channel'] },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 60}>
                <div className="bg-white rounded-2xl p-6 shadow-card h-full">
                  <div className="w-10 h-10 rounded-xl bg-terracotta-50 text-terracotta-600 flex items-center justify-center mb-4 [&>svg]:size-5">
                    {c.icon}
                  </div>
                  <p className="text-label-md text-neutral-500 mb-2">{c.title}</p>
                  {c.lines.filter(Boolean).map((l, j) => (
                    <p key={j} className="text-body-sm text-neutral-700">{l}</p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Map placeholder */}
            <Reveal>
              <h2 className="font-serif text-display-sm text-neutral-900 mb-6">How to Find Us</h2>
              <div className="aspect-[4/3] bg-cream-200 rounded-2xl overflow-hidden border border-neutral-200 flex items-center justify-center mb-5 relative">
                <img
                  src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1"
                  alt="Belgrade Savamala"
                  className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="w-12 h-12 bg-terracotta-500 rounded-full flex items-center justify-center shadow-xl">
                    <MapPin size={20} className="text-white" />
                  </div>
                  <div className="bg-white rounded-xl px-4 py-2 shadow-md text-center">
                    <p className="text-label-md text-neutral-900">NEST Belgrade</p>
                    <p className="text-caption text-neutral-500">Savamala Quarter</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { from: 'On foot', desc: 'A 10-minute walk from Republic Square along the riverfront.' },
                  { from: 'By tram', desc: 'Lines 2 and 7 stop at Brankov Most, 3 minutes walk.' },
                  { from: 'By car', desc: 'Parking available on Karadjordjeva Street. Free after 18:00.' },
                ].map((t) => (
                  <div key={t.from} className="flex gap-3">
                    <span className="text-label-sm text-terracotta-500 w-20 flex-shrink-0 pt-0.5">{t.from}</span>
                    <p className="text-body-sm text-neutral-600">{t.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Contact form */}
            <Reveal delay={100}>
              <h2 className="font-serif text-display-sm text-neutral-900 mb-6">Send a Message</h2>
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-sage-50 border border-sage-200 rounded-2xl p-8 text-center"
                  >
                    <div className="w-12 h-12 bg-sage-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg viewBox="0 0 16 16" fill="none" className="size-6 text-white">
                        <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <p className="font-serif text-heading-xl text-neutral-900 mb-2">Message sent!</p>
                    <p className="text-body-md text-neutral-500">We will get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    className="space-y-4"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field id="cf-name" label="Your name" required>
                        <Input id="cf-name" name="name" placeholder="Elena Sokolova" required />
                      </Field>
                      <Field id="cf-email" label="Email address" required>
                        <Input id="cf-email" name="email" type="email" placeholder="elena@example.com" required />
                      </Field>
                    </div>
                    <Field id="cf-subject" label="Subject">
                      <Select id="cf-subject" name="subject">
                        <option value="">Choose a topic…</option>
                        <option>General question</option>
                        <option>Children's programmes</option>
                        <option>Teen activities</option>
                        <option>Membership</option>
                        <option>Private event hire</option>
                        <option>Press / partnership</option>
                      </Select>
                    </Field>
                    <Field id="cf-msg" label="Message" required>
                      <Textarea id="cf-msg" name="message" placeholder="How can we help?" rows={4} required />
                    </Field>
                    {error && (
                      <p className="text-body-sm text-error-600 bg-error-50 border border-error-200 rounded-xl px-4 py-3">
                        {error}
                      </p>
                    )}
                    <Button type="submit" fullWidth size="lg" loading={loading} iconRight={loading ? undefined : <ArrowRight />}>
                      {loading ? 'Sending…' : 'Send message'}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-cream-200">
        <div className="max-w-3xl mx-auto container-px">
          <Reveal className="text-center mb-10">
            <p className="text-overline text-terracotta-500 uppercase mb-4">Questions</p>
            <h2 className="font-serif text-display-md text-neutral-900">Frequently Asked</h2>
          </Reveal>
          <FAQ />
        </div>
      </section>
    </div>
  );
}
