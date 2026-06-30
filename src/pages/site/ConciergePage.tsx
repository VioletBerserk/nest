import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Lock, ArrowRight, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '../../components/motion';
import { useAuth } from '../../lib/auth';
import type { SitePage } from '../../components/layout/SiteHeader';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

const DEMO_RESPONSES: Record<string, string> = {
  default: "That's a great question! Once I'm fully launched, I'll be able to give you personalised answers. For now, I'm still in training — the NEST team will have me ready very soon.",
  hello: "Hello! I'm the NEST Concierge, your personal guide to everything happening at NEST Belgrade. I can help with events, booking, membership questions, and life in Belgrade. I'm still in beta — full launch coming soon!",
  event: "NEST runs weekly events for children, teens, and parents — from art workshops and language circles to film nights and founder dinners. Check the Events page for the full calendar and one-click booking.",
  book: "You can book any event directly from the Events page. Members get 24-hour priority access before general booking opens. Want me to show you what's coming up this week?",
  membership: "NEST has four membership tiers: Teen (€19/mo), Community (€29/mo), Family (€69/mo), and Founding (€149/mo — only 3 spots left!). Each tier unlocks different perks, from café discounts to unlimited programme credits.",
  belgrade: "Belgrade is a wonderful city to raise a family. The Russian-speaking community here is warm and tight-knit. NEST was created specifically to be a gathering point — a place where you don't have to explain where you're from.",
};

function getResponse(text: string): string {
  const lower = text.toLowerCase();
  if (lower.match(/\b(hi|hello|hey|привет)\b/)) return DEMO_RESPONSES.hello;
  if (lower.match(/\b(event|workshop|class|activity)\b/)) return DEMO_RESPONSES.event;
  if (lower.match(/\b(book|reserve|join|sign up)\b/)) return DEMO_RESPONSES.book;
  if (lower.match(/\b(member|membership|plan|tier|price|cost)\b/)) return DEMO_RESPONSES.membership;
  if (lower.match(/\b(belgrade|serbia|city|expat|relocat)\b/)) return DEMO_RESPONSES.belgrade;
  return DEMO_RESPONSES.default;
}

const suggestions = [
  "What events are coming up?",
  "How does membership work?",
  "What's Belgrade like for families?",
  "How do I book a workshop?",
];

export default function ConciergePage({ setPage }: { setPage: (p: SitePage) => void }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: "Hello! I'm your NEST Concierge — currently in beta. Ask me anything about events, membership, or life at NEST Belgrade. Full AI launch coming soon!" },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: trimmed }]);
    setTyping(true);
    await new Promise(r => setTimeout(r, 900 + Math.random() * 600));
    setTyping(false);
    setMessages(prev => [...prev, { role: 'assistant', text: getResponse(trimmed) }]);
  };

  return (
    <div className="bg-cream-100 min-h-screen">
      {/* Hero */}
      <section className="bg-neutral-900 pt-24 pb-12">
        <div className="max-w-page mx-auto container-px">
          <Reveal>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-terracotta-500/20 border border-terracotta-500/40 flex items-center justify-center">
                <Sparkles size={18} className="text-terracotta-400" />
              </div>
              <div>
                <p className="text-overline text-terracotta-400 uppercase">AI Concierge</p>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-caption text-neutral-500">Beta · Full launch soon</span>
                </div>
              </div>
            </div>
            <h1 className="font-serif text-display-xl text-cream-100 mb-4 leading-tight">
              Your personal guide<br />to NEST.
            </h1>
            <p className="text-body-xl text-neutral-400 max-w-xl leading-relaxed">
              Ask me about events, membership, booking, or life in Belgrade.
              I know everything about NEST — and I'm here 24/7.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Coming soon banner */}
      <div className="bg-amber-500/10 border-y border-amber-500/20">
        <div className="max-w-page mx-auto container-px py-3 flex items-center gap-3">
          <Sparkles size={14} className="text-amber-600 flex-shrink-0" />
          <p className="text-body-sm text-amber-800">
            <strong>Beta preview</strong> — responses are simulated. Full GPT-4 powered concierge launching with NEST's grand opening.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto container-px py-10">
        <div className="grid lg:grid-cols-[1fr_260px] gap-6 items-start">
          {/* Chat window */}
          <div className="bg-white rounded-3xl shadow-card overflow-hidden flex flex-col" style={{ height: '560px' }}>
            {/* Header */}
            <div className="px-5 py-4 border-b border-neutral-100 flex items-center gap-3 flex-shrink-0">
              <div className="w-9 h-9 rounded-xl bg-neutral-900 flex items-center justify-center">
                <Bot size={16} className="text-cream-100" />
              </div>
              <div>
                <p className="text-label-md text-neutral-900">NEST Concierge</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage-500 animate-pulse" />
                  <span className="text-caption text-neutral-400">Online · Beta</span>
                </div>
              </div>
              {!user && (
                <button
                  onClick={() => setPage('auth')}
                  className="ml-auto flex items-center gap-1.5 text-caption text-neutral-400 hover:text-neutral-700 transition-colors"
                >
                  <Lock size={11} />
                  Sign in for full access
                </button>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${msg.role === 'assistant' ? 'bg-neutral-900' : 'bg-terracotta-500'}`}>
                      {msg.role === 'assistant'
                        ? <Bot size={13} className="text-cream-100" />
                        : <User size={13} className="text-white" />
                      }
                    </div>
                    <div className={`max-w-[78%] px-4 py-3 rounded-2xl text-body-sm leading-relaxed ${
                      msg.role === 'assistant'
                        ? 'bg-neutral-50 text-neutral-700 rounded-tl-sm'
                        : 'bg-terracotta-500 text-white rounded-tr-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {typing && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-2.5"
                  >
                    <div className="w-7 h-7 rounded-xl bg-neutral-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot size={13} className="text-cream-100" />
                    </div>
                    <div className="bg-neutral-50 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                      {[0, 1, 2].map(i => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-neutral-400"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ repeat: Infinity, duration: 0.7, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-4 pb-4 pt-2 border-t border-neutral-100 flex-shrink-0">
              <form
                onSubmit={e => { e.preventDefault(); send(input); }}
                className="flex gap-2"
              >
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask anything about NEST…"
                  className="flex-1 h-10 px-4 rounded-xl bg-neutral-50 border border-neutral-200 text-body-sm text-neutral-800 placeholder-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-400 transition-shadow"
                />
                <motion.button
                  type="submit"
                  disabled={!input.trim() || typing}
                  className="w-10 h-10 rounded-xl bg-terracotta-500 flex items-center justify-center text-white flex-shrink-0 disabled:opacity-40"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <Send size={14} />
                </motion.button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Suggestions */}
            <div className="bg-white rounded-2xl shadow-card p-5">
              <p className="text-label-sm text-neutral-500 mb-3">Suggested questions</p>
              <div className="space-y-2">
                {suggestions.map(s => (
                  <motion.button
                    key={s}
                    onClick={() => send(s)}
                    className="w-full text-left px-3 py-2.5 rounded-xl bg-neutral-50 hover:bg-cream-100 border border-neutral-100 text-body-sm text-neutral-700 transition-colors"
                    whileHover={{ x: 2 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  >
                    {s}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="bg-white rounded-2xl shadow-card p-5">
              <p className="text-label-sm text-neutral-500 mb-3">Quick actions</p>
              <div className="space-y-2">
                {[
                  { label: 'Browse events', page: 'events' as SitePage },
                  { label: 'View membership', page: 'membership' as SitePage },
                  { label: 'My dashboard', page: 'dashboard' as SitePage },
                ].map(({ label, page }) => (
                  <motion.button
                    key={label}
                    onClick={() => setPage(page)}
                    className="w-full text-left px-3 py-2.5 rounded-xl bg-terracotta-50 hover:bg-terracotta-100 text-label-sm text-terracotta-700 flex items-center justify-between transition-colors"
                    whileHover={{ x: 2 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  >
                    {label}
                    <ArrowRight size={12} />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Coming soon card */}
            <div className="bg-neutral-900 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={14} className="text-terracotta-400" />
                <p className="text-label-sm text-terracotta-400">Full launch</p>
              </div>
              <p className="text-body-sm text-neutral-300 leading-relaxed mb-4">
                The full AI concierge will have access to your bookings, children's profiles, and personalised recommendations.
              </p>
              <div className="w-full bg-neutral-700 rounded-full h-1.5">
                <motion.div
                  className="h-1.5 rounded-full bg-terracotta-500"
                  initial={{ width: 0 }}
                  animate={{ width: '68%' }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                />
              </div>
              <p className="text-caption text-neutral-500 mt-2">68% complete</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
