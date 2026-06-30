import { useState } from 'react';
import { Instagram, Send, Facebook, ArrowRight, MapPin, Clock, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import type { SitePage } from './SiteHeader';

interface SiteFooterProps {
  setPage: (p: SitePage) => void;
}

const cols = [
  {
    title: 'Explore',
    links: [
      { label: 'About NEST', page: 'about' as SitePage },
      { label: 'The Space', page: 'space' as SitePage },
      { label: 'Community', page: 'community' as SitePage },
      { label: 'Events', page: 'events' as SitePage },
    ],
  },
  {
    title: 'For Families',
    links: [
      { label: 'For Children (6–12)', page: 'children' as SitePage },
      { label: 'For Teens (13–18)', page: 'teens' as SitePage },
      { label: 'For Parents', page: 'parents' as SitePage },
      { label: 'Membership', page: 'membership' as SitePage },
    ],
  },
  {
    title: 'Practical',
    links: [
      { label: 'Contact Us', page: 'contact' as SitePage },
      { label: 'Events Calendar', page: 'events' as SitePage },
      { label: 'Join NEST', page: 'membership' as SitePage },
      { label: 'Book the Space', page: 'contact' as SitePage },
    ],
  },
];

export function SiteFooter({ setPage }: SiteFooterProps) {
  const [email, setEmail] = useState('');
  const [subState, setSubState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const nav = (p: SitePage) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSub = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubState('loading');
    const { error } = await supabase
      .from('newsletter_subscribers')
      .upsert({ email, subscribed: true }, { onConflict: 'email' });
    if (error) {
      setSubState('error');
    } else {
      setSubState('done');
      setEmail('');
    }
  };

  return (
    <footer className="bg-neutral-900">
      {/* Newsletter band */}
      <div className="border-b border-neutral-800">
        <div className="max-w-page mx-auto container-px py-12">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
            <div className="flex-1">
              <p className="text-overline text-terracotta-400 uppercase mb-2">Stay Close</p>
              <p className="font-serif text-display-sm text-cream-100 leading-snug mb-1">
                Monthly updates worth reading.
              </p>
              <p className="text-body-sm text-neutral-500">Events, community moments, and things worth knowing. No noise.</p>
            </div>
            <div className="flex-shrink-0 w-full md:w-auto md:min-w-[360px]">
              {subState === 'done' ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 bg-sage-900/50 border border-sage-700/60 rounded-2xl px-5 py-3.5"
                >
                  <span className="w-6 h-6 rounded-full bg-sage-500 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 16 16" fill="none" className="size-3.5 text-white"><path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <p className="text-body-sm text-sage-300">You're on the list. Welcome to the community.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSub} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    aria-label="Email address for newsletter"
                    className="flex-1 h-11 px-4 rounded-xl bg-neutral-800 border border-neutral-700 text-body-sm text-cream-100 placeholder-neutral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-400 focus-visible:border-terracotta-500 transition-shadow"
                  />
                  <motion.button
                    type="submit"
                    disabled={subState === 'loading'}
                    className="h-11 px-5 rounded-xl bg-terracotta-500 text-white text-label-md font-medium flex items-center gap-2 overflow-hidden relative flex-shrink-0 disabled:opacity-60"
                    whileHover={{ backgroundColor: '#A85B46', y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    aria-label="Subscribe to newsletter"
                  >
                    <motion.span
                      className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
                      initial={{ x: '-150%' }}
                      whileHover={{ x: '250%' }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative">{subState === 'loading' ? 'Subscribing…' : 'Subscribe'}</span>
                    <ArrowRight size={14} className="relative" />
                  </motion.button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-page mx-auto container-px py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <motion.button
              onClick={() => nav('home')}
              className="flex items-center gap-2.5 mb-5"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            >
              <div className="w-9 h-9 bg-terracotta-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="font-serif text-white font-bold text-base leading-none">N</span>
              </div>
              <span className="font-serif font-semibold text-cream-100 text-lg">NEST</span>
            </motion.button>

            <p className="font-serif italic text-neutral-400 text-body-md leading-relaxed mb-5">
              A home away from home.
            </p>
            <p className="text-body-sm text-neutral-600 leading-relaxed mb-7">
              Community café and creative club for Russian-speaking families in Belgrade — a place to exhale, belong, and grow.
            </p>

            {/* Quick info */}
            <div className="space-y-2.5 mb-7">
              {[
                { icon: <MapPin size={13} />, text: 'Savamala Quarter, Belgrade' },
                { icon: <Clock size={13} />,  text: 'Mon–Sun · 9:00–20:00' },
                { icon: <Mail size={13} />,   text: 'nest.belgrade@gmail.com' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-body-sm text-neutral-500">
                  <span className="text-neutral-600 flex-shrink-0">{icon}</span>
                  {text}
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-2.5">
              {[
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Send,      label: 'Telegram' },
                { Icon: Facebook,  label: 'Facebook' },
              ].map(({ Icon, label }) => (
                <motion.button
                  key={label}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-neutral-800 flex items-center justify-center text-neutral-400"
                  whileHover={{ scale: 1.1, backgroundColor: '#C4715A', color: '#fff' }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <Icon size={15} />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.title}>
              <p className="text-overline text-neutral-500 uppercase mb-5">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <motion.button
                      onClick={() => nav(l.page)}
                      className="text-body-sm text-neutral-400 text-left"
                      whileHover={{ x: 3, color: '#EAD9C0' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                    >
                      {l.label}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-800">
        <div className="max-w-page mx-auto container-px py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-caption text-neutral-700">© 2024 NEST Belgrade · All rights reserved</p>
          <div className="flex items-center gap-5">
            <button onClick={() => nav('brief')} className="text-caption text-neutral-700 hover:text-neutral-500 transition-colors">
              Product Brief
            </button>
            <button onClick={() => nav('design-system')} className="text-caption text-neutral-700 hover:text-neutral-500 transition-colors">
              Design System
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
