import { useState } from 'react';
import { ArrowRight, Check, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MembershipCard } from '../../components/ds/Card';
import { Button } from '../../components/ds/Button';
import { Reveal, HeroReveal } from '../../components/motion';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../lib/auth';
import type { SitePage } from '../../components/layout/SiteHeader';

const plans = [
  {
    tier: 'Teen', price: '€19', period: '/month',
    description: 'Creative studio, workshops, your crew.',
    features: ['Teen creative studio access', 'Workshop priority booking (24h)', 'Mentorship programme eligibility', 'Monthly portfolio review', 'Teen event invitations'],
    highlighted: false,
  },
  {
    tier: 'Community', price: '€29', period: '/month',
    description: 'Café, events, and community belonging.',
    features: ['Café discounts (15%)', 'Priority event booking', 'Community board access', 'One guest pass per month', 'Monthly newsletter'],
    highlighted: false,
  },
  {
    tier: 'Family', price: '€69', period: '/month',
    description: 'Parents + up to 3 children. Everything.',
    features: ['Everything in Community', '2 programme credits/month', 'Family events priority', 'Member directory access', 'Annual family portrait session', 'Dedicated family locker'],
    highlighted: true,
  },
  {
    tier: 'Founding', price: '€149', period: '/month',
    description: 'First 50 families. Price locked forever.',
    features: ['Everything in Family', 'Named tile on community wall', 'Quarterly founder dinner', 'Unlimited programme credits', 'Private event space (2×/year)', 'Influence on programming'],
    highlighted: false,
  },
];

const benefits = [
  { title: 'Priority booking', desc: 'Events sell out. Members book 24 hours before the public.' },
  { title: 'Programme credits', desc: 'Family members get 2 workshop credits/month to use any time.' },
  { title: 'Community directory', desc: 'Connect with other member families — find neighbours, collaborators, friends.' },
  { title: 'Annual portrait', desc: 'Every family member gets a professional portrait session once per year.' },
  { title: 'Birthday coffee', desc: 'A free coffee on your birthday. Because every anniversary deserves something warm.' },
  { title: 'Founders wall', desc: 'The first 50 families have their name on the NEST community wall. Permanently.' },
];

const faqs = [
  { q: 'Can I cancel my membership?', a: 'Yes. Cancel anytime with 30 days notice. No penalties, no questions asked.' },
  { q: 'Is there a minimum commitment?', a: 'No. Month-to-month by default. An annual plan saves 15%.' },
  { q: 'What counts as a "family" for the Family plan?', a: 'Two adults and up to three children under 18 at the same address. Have more children? Contact us — we will sort it out.' },
  { q: 'Can I upgrade or downgrade plans?', a: 'Yes, at any time. Changes take effect from the next billing cycle.' },
  { q: 'Is the Founding tier still available?', a: 'We have 3 founding places remaining as of today. Once they are gone, this tier closes permanently.' },
];

export default function MembershipPage({ setPage }: { setPage: (p: SitePage) => void }) {
  const { user } = useAuth();
  const [billingAnnual, setBillingAnnual] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [joining, setJoining] = useState<string | null>(null);

  const handleJoin = async (tier: string) => {
    if (!user) {
      setPage('auth');
      return;
    }
    setJoining(tier);
    const tierKey = tier.toLowerCase() as 'teen' | 'community' | 'family' | 'founding';
    await supabase.from('memberships').upsert(
      { user_id: user.id, tier: tierKey, status: 'active', billing_cycle: billingAnnual ? 'annual' : 'monthly' },
      { onConflict: 'user_id' }
    );
    await supabase.from('profiles').update({ membership_tier: tierKey, membership_status: 'active' }).eq('id', user.id);
    setJoining(null);
    setPage('dashboard');
  };

  return (
    <div className="bg-cream-100">
      {/* Hero */}
      <section className="pt-24 pb-20 bg-neutral-900">
        <div className="max-w-page mx-auto container-px text-center">
          <HeroReveal>
            <p className="text-overline text-terracotta-400 uppercase mb-5">Membership</p>
            <h1 className="font-serif text-display-xl text-cream-100 mb-6 leading-tight">
              This is your place too.
            </h1>
            <p className="text-body-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-10">
              Membership is not an access card. It is the decision to belong. To show up regularly, to
              be known, and to make NEST part of your week.
            </p>
            {/* Billing toggle */}
            <div
              className="inline-flex items-center gap-1 bg-neutral-800 rounded-full p-1.5 relative"
              role="radiogroup"
              aria-label="Billing frequency"
            >
              {/* Sliding pill */}
              <motion.div
                className="absolute top-1.5 bottom-1.5 rounded-full bg-white shadow-sm"
                layout
                transition={{ type: 'spring', stiffness: 450, damping: 38 }}
                style={{
                  left: billingAnnual ? '50%' : '6px',
                  right: billingAnnual ? '6px' : '50%',
                }}
              />
              <button
                role="radio"
                aria-checked={!billingAnnual}
                onClick={() => setBillingAnnual(false)}
                className={`relative z-10 text-label-md px-5 py-2 rounded-full transition-colors duration-200 ${!billingAnnual ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-200'}`}
              >
                Monthly
              </button>
              <button
                role="radio"
                aria-checked={billingAnnual}
                onClick={() => setBillingAnnual(true)}
                className={`relative z-10 text-label-md px-5 py-2 rounded-full transition-colors duration-200 ${billingAnnual ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-200'}`}
              >
                Annual <span className="text-success-400 ml-1">–15%</span>
              </button>
            </div>
          </HeroReveal>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16">
        <div className="max-w-page mx-auto container-px">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {plans.map((p, i) => {
              const rawPrice = parseInt(p.price.replace('€', ''));
              const price = billingAnnual ? `€${Math.round(rawPrice * 0.85)}` : p.price;
              const isFounding = p.tier === 'Founding';
              return (
                <motion.div
                  key={p.tier}
                  className={`relative ${isFounding ? 'ring-2 ring-terracotta-400/60 rounded-2xl' : ''}`}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-5% 0px' }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {isFounding && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <div className="flex items-center gap-1.5 bg-terracotta-500 text-white text-caption font-semibold px-3 py-1 rounded-full shadow-lg whitespace-nowrap">
                        <Flame size={10} />
                        3 places left
                      </div>
                    </div>
                  )}
                  <MembershipCard
                    {...p}
                    price={price}
                    period={billingAnnual ? '/month, billed annually' : p.period}
                    onSelect={() => { if (!joining) handleJoin(p.tier); }}
                  />
                </motion.div>
              );
            })}
          </div>
          <AnimatePresence>
            {billingAnnual && (
              <motion.p
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-center text-caption text-neutral-400 mt-4 overflow-hidden"
              >
                Annual plans billed once per year. 15% savings vs. monthly.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Benefits detail */}
      <section className="py-20 bg-cream-200">
        <div className="max-w-page mx-auto container-px">
          <Reveal className="text-center mb-12">
            <p className="text-overline text-terracotta-500 uppercase mb-4">What's included</p>
            <h2 className="font-serif text-display-md text-neutral-900">The details that matter.</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                className="bg-white rounded-2xl p-6 shadow-card h-full flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ delay: i * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, boxShadow: '0 16px 32px -6px rgba(28,20,16,0.1)' }}
              >
                <motion.div
                  className="w-8 h-8 rounded-lg bg-terracotta-50 flex items-center justify-center flex-shrink-0 mt-0.5"
                  whileHover={{ backgroundColor: 'rgba(196,113,90,0.15)', scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <Check size={14} className="text-terracotta-600" />
                </motion.div>
                <div>
                  <h3 className="font-sans font-semibold text-heading-sm text-neutral-900 mb-1">{b.title}</h3>
                  <p className="text-body-sm text-neutral-500 leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founding member story */}
      <section className="py-24 bg-neutral-900">
        <div className="max-w-3xl mx-auto container-px text-center">
          <Reveal>
            <p className="text-overline text-terracotta-400 uppercase mb-6">Founding Members</p>
            <div className="inline-flex items-center gap-2 bg-terracotta-500/15 border border-terracotta-500/40 rounded-full px-4 py-2 mb-6">
              <Flame size={13} className="text-terracotta-400" />
              <span className="text-label-sm text-terracotta-300">3 founding places remaining</span>
            </div>
            <p className="font-serif text-display-md text-cream-100 leading-snug mb-6">
              Lock in your price. Forever.
            </p>
            <p className="text-body-xl text-neutral-400 leading-relaxed mb-8">
              The Founding tier was created for the families who believe in NEST before it is finished.
              In return: their price is locked forever, their name is on the community wall, and they
              have a seat at the table when we decide what comes next.
            </p>
            <Button size="xl" onClick={() => handleJoin('Founding')} iconRight={<ArrowRight />}>
              {joining === 'Founding' ? 'Reserving…' : 'Claim a founding place'}
            </Button>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto container-px">
          <Reveal className="text-center mb-10">
            <h2 className="font-serif text-display-sm text-neutral-900">Questions about membership.</h2>
          </Reveal>
          <div className="space-y-2">
            {faqs.map((item, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl border border-neutral-200 overflow-hidden"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-4% 0px' }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.button
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                  whileHover={{ backgroundColor: 'rgba(250,245,238,0.8)' }}
                  transition={{ duration: 0.15 }}
                  aria-expanded={openFAQ === i}
                >
                  <span className="text-body-md font-medium text-neutral-800 pr-4">{item.q}</span>
                  <motion.span
                    animate={{ rotate: openFAQ === i ? 45 : 0, scale: openFAQ === i ? 1.1 : 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="text-neutral-400 text-xl leading-none flex-shrink-0 font-light"
                  >
                    +
                  </motion.span>
                </motion.button>
                <AnimatePresence initial={false}>
                  {openFAQ === i && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ height: { type: 'spring', stiffness: 350, damping: 38 }, opacity: { duration: 0.22 } }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        className="px-6 pb-5 pt-3 border-t border-neutral-100 bg-neutral-50"
                        initial={{ y: -8 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p className="text-body-md text-neutral-600 leading-relaxed">{item.a}</p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
