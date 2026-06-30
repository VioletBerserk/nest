import { useState, useEffect, useMemo } from 'react';
import { Search, Calendar, MapPin, Users, X, Check, Clock, ChevronLeft, ChevronRight, ArrowRight, Filter, Grid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../lib/auth';
import { Button } from '../../components/ds/Button';
import { Reveal } from '../../components/motion';
import type { SitePage } from '../../components/layout/SiteHeader';

interface Event {
  id: string;
  title: string;
  description: string | null;
  category: string;
  image_url: string | null;
  starts_at: string;
  ends_at: string;
  location: string;
  capacity: number;
  price: number;
  is_members_only: boolean;
  booking_count: number;
}

const CATEGORY_LABELS: Record<string, string> = {
  all: 'All events',
  children: 'Children',
  teens: 'Teens',
  parents: 'Parents',
  community: 'Community',
};

const CATEGORY_COLORS: Record<string, string> = {
  children: 'bg-sage-50 text-sage-700',
  teens: 'bg-terracotta-50 text-terracotta-700',
  parents: 'bg-cream-300 text-neutral-700',
  community: 'bg-neutral-100 text-neutral-600',
};

function formatEventDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
}
function formatEventTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

// ─── Booking Modal ────────────────────────────────────────────────────────────
function BookingModal({ event, onClose, onBooked, alreadyBooked, setPage }: {
  event: Event; onClose: () => void; onBooked: (id: string) => void; alreadyBooked: boolean; setPage: (p: SitePage) => void;
}) {
  const { user } = useAuth();
  const [step, setStep] = useState<'confirm' | 'success' | 'waitlist'>(alreadyBooked ? 'success' : 'confirm');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isFull = event.booking_count >= event.capacity;
  const spotsLeft = event.capacity - event.booking_count;

  const book = async () => {
    if (!user) { setPage('auth'); onClose(); return; }
    setLoading(true); setError(null);
    if (isFull) {
      const pos = await supabase.from('waiting_list').select('position').eq('event_id', event.id).order('position', { ascending: false }).limit(1).maybeSingle();
      const nextPos = ((pos.data?.position ?? 0) as number) + 1;
      const { error: wErr } = await supabase.from('waiting_list').insert({ user_id: user.id, event_id: event.id, position: nextPos });
      setLoading(false);
      if (wErr) { setError('Could not join waiting list.'); return; }
      setStep('waitlist'); return;
    }
    const { error: bErr } = await supabase.from('bookings').insert({ user_id: user.id, event_id: event.id });
    setLoading(false);
    if (bErr) { setError('Booking failed. You may already be registered.'); return; }
    onBooked(event.id); setStep('success');
  };

  return (
    <motion.div className="fixed inset-0 z-modal flex items-end sm:items-center justify-center p-4 sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div className="relative bg-white rounded-3xl shadow-modal w-full max-w-md overflow-hidden" initial={{ y: 40, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 40, scale: 0.97 }} transition={{ type: 'spring', stiffness: 380, damping: 32 }}>
        {event.image_url && <div className="aspect-[16/7] overflow-hidden"><img src={event.image_url} alt={event.title} className="w-full h-full object-cover" /></div>}
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-neutral-600 hover:text-neutral-900 shadow-sm"><X size={15} /></button>
        <div className="p-6">
          <AnimatePresence mode="wait">
            {step === 'confirm' && (
              <motion.div key="confirm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <span className={`text-overline text-xs px-2 py-1 rounded-full uppercase mb-3 inline-block ${CATEGORY_COLORS[event.category] ?? 'bg-neutral-100 text-neutral-500'}`}>{event.category}</span>
                <h2 className="font-serif text-heading-xl text-neutral-900 mb-4">{event.title}</h2>
                <div className="space-y-2 mb-5">
                  <div className="flex items-center gap-2 text-body-sm text-neutral-600"><Calendar size={14} className="text-neutral-400 flex-shrink-0" />{formatEventDate(event.starts_at)}</div>
                  <div className="flex items-center gap-2 text-body-sm text-neutral-600"><Clock size={14} className="text-neutral-400 flex-shrink-0" />{formatEventTime(event.starts_at)} – {formatEventTime(event.ends_at)}</div>
                  <div className="flex items-center gap-2 text-body-sm text-neutral-600"><MapPin size={14} className="text-neutral-400 flex-shrink-0" />{event.location}</div>
                  <div className="flex items-center gap-2 text-body-sm text-neutral-600"><Users size={14} className="text-neutral-400 flex-shrink-0" />{isFull ? 'Fully booked' : `${spotsLeft} spot${spotsLeft !== 1 ? 's' : ''} remaining`}</div>
                </div>
                {spotsLeft <= 3 && !isFull && <p className="text-caption text-warning-600 bg-warning-50 rounded-xl px-3 py-2 mb-4">Only {spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} left — book now.</p>}
                {error && <p className="text-caption text-error-600 bg-error-50 rounded-xl px-3 py-2 mb-4">{error}</p>}
                {!user && <p className="text-body-sm text-neutral-500 mb-4">You need to <button onClick={() => { setPage('auth'); onClose(); }} className="text-terracotta-500 underline">sign in</button> to book.</p>}
                <Button fullWidth loading={loading} onClick={book} iconRight={!loading ? <ArrowRight /> : undefined}>
                  {isFull ? 'Join waiting list' : event.price > 0 ? `Book — €${event.price}` : 'Book a spot (free)'}
                </Button>
              </motion.div>
            )}
            {step === 'success' && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
                <div className="w-14 h-14 bg-success-50 rounded-full flex items-center justify-center mx-auto mb-4"><Check size={24} className="text-success-600" /></div>
                <h2 className="font-serif text-heading-xl text-neutral-900 mb-2">{alreadyBooked ? 'Already booked' : "You're in!"}</h2>
                <p className="text-body-sm text-neutral-500 mb-5">{event.title} — {formatEventDate(event.starts_at)}</p>
                <div className="flex gap-3 justify-center">
                  <Button size="sm" variant="outline" onClick={onClose}>Close</Button>
                  <Button size="sm" onClick={() => { setPage('dashboard'); onClose(); }}>View in dashboard</Button>
                </div>
              </motion.div>
            )}
            {step === 'waitlist' && (
              <motion.div key="waitlist" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
                <div className="w-14 h-14 bg-warning-50 rounded-full flex items-center justify-center mx-auto mb-4"><Clock size={24} className="text-warning-600" /></div>
                <h2 className="font-serif text-heading-xl text-neutral-900 mb-2">You're on the list</h2>
                <p className="text-body-sm text-neutral-500 mb-5">We'll notify you if a spot opens for {event.title}.</p>
                <Button size="sm" variant="outline" onClick={onClose}>Close</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Calendar view ────────────────────────────────────────────────────────────
function CalendarView({ events, onSelect }: { events: Event[]; onSelect: (e: Event) => void }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startPad = (firstDay + 6) % 7;
  const today = new Date();

  const eventsByDay = useMemo(() => {
    const map: Record<number, Event[]> = {};
    events.forEach(e => {
      const d = new Date(e.starts_at);
      if (d.getFullYear() === year && d.getMonth() === month) {
        const day = d.getDate();
        if (!map[day]) map[day] = [];
        map[day].push(e);
      }
    });
    return map;
  }, [events, year, month]);

  return (
    <div className="bg-white rounded-3xl shadow-card overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
        <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))} className="p-2 rounded-xl hover:bg-neutral-100 transition-colors"><ChevronLeft size={16} className="text-neutral-500" /></button>
        <h3 className="font-serif text-heading-xl text-neutral-900">{currentDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</h3>
        <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))} className="p-2 rounded-xl hover:bg-neutral-100 transition-colors"><ChevronRight size={16} className="text-neutral-500" /></button>
      </div>
      <div className="grid grid-cols-7 border-b border-neutral-100">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <div key={d} className="py-3 text-center text-caption text-neutral-400 font-medium">{d}</div>)}
      </div>
      <div className="grid grid-cols-7">
        {[...Array(startPad)].map((_, i) => <div key={`pad-${i}`} className="border-b border-r border-neutral-50 min-h-[80px]" />)}
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
          const dayEvents = eventsByDay[day] ?? [];
          return (
            <div key={day} className="border-b border-r border-neutral-50 min-h-[80px] p-1.5">
              <span className={`text-caption font-medium w-6 h-6 flex items-center justify-center rounded-full mb-1 ${isToday ? 'bg-terracotta-500 text-white' : 'text-neutral-500'}`}>{day}</span>
              <div className="space-y-0.5">
                {dayEvents.slice(0, 2).map(e => (
                  <button key={e.id} onClick={() => onSelect(e)} className={`w-full text-left text-xs px-1.5 py-0.5 rounded truncate hover:opacity-80 transition-opacity ${CATEGORY_COLORS[e.category] ?? 'bg-neutral-100 text-neutral-600'}`}>
                    {e.title}
                  </button>
                ))}
                {dayEvents.length > 2 && <p className="text-xs text-neutral-400 px-1">+{dayEvents.length - 2}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function EventsPage({ setPage }: { setPage: (p: SitePage) => void }) {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [myBookings, setMyBookings] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'calendar'>('grid');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const { data } = await supabase.from('events').select('*').eq('is_published', true).gte('starts_at', new Date().toISOString()).order('starts_at', { ascending: true });
      if (data) {
        const { data: counts } = await supabase.from('bookings').select('event_id').in('event_id', data.map(e => e.id)).eq('status', 'confirmed');
        const countMap: Record<string, number> = {};
        (counts ?? []).forEach(b => { countMap[b.event_id] = (countMap[b.event_id] ?? 0) + 1; });
        setEvents(data.map(e => ({ ...e, booking_count: countMap[e.id] ?? 0 })));
      }
      setLoading(false);
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    if (!user) return;
    supabase.from('bookings').select('event_id').eq('user_id', user.id).eq('status', 'confirmed').then(({ data }) => {
      if (data) setMyBookings(new Set(data.map(b => b.event_id)));
    });
  }, [user]);

  const handleBooked = (eventId: string) => {
    setMyBookings(prev => new Set([...prev, eventId]));
    setEvents(prev => prev.map(e => e.id === eventId ? { ...e, booking_count: e.booking_count + 1 } : e));
  };

  const filtered = useMemo(() => events.filter(e => {
    const matchCat = category === 'all' || e.category === category;
    const matchSearch = !search || e.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  }), [events, category, search]);

  return (
    <div className="bg-cream-100">
      <section className="bg-neutral-900 pt-24 pb-16 relative overflow-hidden">
        {/* Subtle warm top-left glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 80% at 0% 50%, rgba(196,113,90,0.10) 0%, transparent 60%)' }} />
        <div className="max-w-page mx-auto container-px relative">
          <Reveal>
            <p className="text-overline text-terracotta-400 uppercase mb-5" style={{ fontSize: '0.62rem', letterSpacing: '0.2em' }}>Events Calendar</p>
            <h1
              className="font-serif text-cream-100 mb-5 leading-tight"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.035em' }}
            >
              What's on<br />at NEST.
            </h1>
            <p className="text-body-xl text-neutral-400 max-w-lg leading-relaxed">
              Workshops, dinners, creative clubs, and community gatherings. Every week, something worth showing up for.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filter bar */}
      <div className="bg-white border-b border-neutral-200 sticky top-16 z-raised">
        <div className="max-w-page mx-auto container-px py-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative flex-1 min-w-[180px] max-w-xs">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search events…"
                className="w-full h-9 pl-8 pr-3 rounded-xl border border-neutral-200 bg-neutral-50 text-body-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-terracotta-400 focus:border-transparent"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                  <X size={13} />
                </button>
              )}
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
              {Object.entries(CATEGORY_LABELS).map(([cat, label]) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-label-sm whitespace-nowrap transition-all ${category === cat ? 'bg-terracotta-500 text-white shadow-sm' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="flex items-center bg-neutral-100 rounded-xl p-0.5 ml-auto flex-shrink-0">
              <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-xs text-neutral-900' : 'text-neutral-400'}`} title="Grid view">
                <Grid size={15} />
              </button>
              <button onClick={() => setViewMode('calendar')} className={`p-1.5 rounded-lg transition-all ${viewMode === 'calendar' ? 'bg-white shadow-xs text-neutral-900' : 'text-neutral-400'}`} title="Calendar view">
                <Calendar size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="py-12 max-w-page mx-auto container-px">
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => <div key={i} className="bg-white rounded-2xl aspect-[4/3] skeleton" />)}
          </div>
        ) : viewMode === 'calendar' ? (
          <CalendarView events={filtered} onSelect={setSelectedEvent} />
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <Filter size={28} className="text-neutral-300 mx-auto mb-4" />
            <p className="text-body-lg text-neutral-500 mb-2">No events match your filters.</p>
            <button onClick={() => { setSearch(''); setCategory('all'); }} className="text-label-md text-terracotta-500 hover:text-terracotta-600 transition-colors">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((e, i) => {
              const isFull = e.booking_count >= e.capacity;
              const spotsLeft = e.capacity - e.booking_count;
              const booked = myBookings.has(e.id);
              const urgency = spotsLeft <= 3 && !isFull;
              return (
                <motion.div
                  key={e.id}
                  className="bg-white rounded-2xl overflow-hidden group cursor-pointer border border-neutral-100/80"
                  style={{ boxShadow: '0 4px 16px -4px rgba(28,20,16,0.08)' }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, boxShadow: '0 24px 48px -10px rgba(28,20,16,0.16)' }}
                  onClick={() => setSelectedEvent(e)}
                >
                  <div className="aspect-[16/9] overflow-hidden relative bg-cream-200">
                    {e.image_url
                      ? <motion.img src={e.image_url} alt={e.title} className="w-full h-full object-cover" whileHover={{ scale: 1.08 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
                      : <div className="w-full h-full flex items-center justify-center"><span className="font-serif text-5xl text-neutral-300 italic">N</span></div>
                    }
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    {booked && (
                      <div className="absolute top-3 right-3 bg-success-500 text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <Check size={10} /> Booked
                      </div>
                    )}
                    {e.is_members_only && (
                      <div className="absolute top-3 left-3 bg-neutral-900/75 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">Members only</div>
                    )}
                    {urgency && (
                      <div className="absolute bottom-3 left-3 bg-amber-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                        {spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} left
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <span className={`text-overline text-xs px-2 py-1 rounded-full uppercase mb-3 inline-block ${CATEGORY_COLORS[e.category] ?? 'bg-neutral-100 text-neutral-500'}`}>
                      {e.category}
                    </span>
                    <h3 className="font-serif text-heading-lg text-neutral-900 mb-3 line-clamp-2 group-hover:text-terracotta-600 transition-colors leading-tight">
                      {e.title}
                    </h3>
                    <div className="space-y-1.5 mb-5">
                      <div className="flex items-center gap-2 text-body-sm text-neutral-500">
                        <Calendar size={12} className="text-neutral-400 flex-shrink-0" />
                        {formatEventDate(e.starts_at)} · {formatEventTime(e.starts_at)}
                      </div>
                      <div className="flex items-center gap-2 text-body-sm text-neutral-500">
                        <MapPin size={12} className="text-neutral-400 flex-shrink-0" />
                        {e.location}
                      </div>
                      <div className="flex items-center gap-2 text-body-sm text-neutral-500">
                        <Users size={12} className="text-neutral-400 flex-shrink-0" />
                        {isFull
                          ? <span className="text-error-500 font-medium">Fully booked</span>
                          : <span>{spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} remaining</span>
                        }
                      </div>
                    </div>
                    <motion.button
                      className={`w-full h-10 rounded-xl text-label-md font-medium flex items-center justify-center gap-2 transition-colors ${
                        booked
                          ? 'bg-success-50 text-success-700'
                          : isFull
                          ? 'bg-neutral-100 text-neutral-500'
                          : 'bg-terracotta-500 text-white hover:bg-terracotta-600'
                      }`}
                      whileTap={{ scale: 0.97 }}
                      onClick={ev => { ev.stopPropagation(); setSelectedEvent(e); }}
                    >
                      {booked
                        ? <><Check size={13} /> Booked</>
                        : isFull
                        ? 'Join waiting list'
                        : <><span>Book a spot</span><ArrowRight size={13} /></>
                      }
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      <AnimatePresence>
        {selectedEvent && (
          <BookingModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            onBooked={handleBooked}
            alreadyBooked={myBookings.has(selectedEvent.id)}
            setPage={setPage}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
