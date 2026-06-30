import { useState, useEffect } from 'react';
import { Users, Calendar, BookOpen, Mail, Plus, Edit2, Eye, EyeOff, Trash2, Check, X, BarChart2, Shield, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../lib/auth';
import { Button } from '../../components/ds/Button';
import type { SitePage } from '../../components/layout/SiteHeader';

interface AdminEvent {
  id: string; title: string; category: string; starts_at: string; capacity: number;
  is_published: boolean; is_members_only: boolean; price: number; location: string;
  booking_count?: number;
}

interface AdminMember {
  id: string; full_name: string | null; role: string;
  membership_tier: string | null; membership_status: string; created_at: string;
}

interface AdminBooking {
  id: string; status: string; booked_at: string;
  user: { full_name: string | null; id: string } | null;
  event: { title: string; starts_at: string } | null;
}

interface NewsletterSub {
  id: string; email: string; name: string | null; source: string; is_active: boolean; subscribed_at: string;
}

type AdminTab = 'overview' | 'events' | 'members' | 'bookings' | 'newsletter';

const EVENT_FORM_DEFAULT = {
  title: '', description: '', category: 'community', location: 'NEST Studio',
  starts_at: '', ends_at: '', capacity: 20, price: 0, is_members_only: false, is_published: false,
};

export default function AdminPage({ setPage }: { setPage: (p: SitePage) => void }) {
  const { user, isAdmin } = useAuth();
  const [tab, setTab] = useState<AdminTab>('overview');
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [members, setMembers] = useState<AdminMember[]>([]);
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [newsletter, setNewsletter] = useState<NewsletterSub[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<AdminEvent | null>(null);
  const [eventForm, setEventForm] = useState({ ...EVENT_FORM_DEFAULT });
  const [savingEvent, setSavingEvent] = useState(false);

  useEffect(() => {
    if (!user || !isAdmin) return;
    loadAll();
  }, [user, isAdmin]);

  const loadAll = async () => {
    setLoading(true);
    const [evRes, memRes, bookRes, newsRes] = await Promise.all([
      supabase.from('events').select('*').order('starts_at', { ascending: false }),
      supabase.from('profiles').select('id, full_name, role, membership_tier, membership_status, created_at').order('created_at', { ascending: false }),
      supabase.from('bookings').select('id, status, booked_at, user:profiles(id, full_name), event:events(title, starts_at)').order('booked_at', { ascending: false }).limit(100),
      supabase.from('newsletter_subscribers').select('*').order('subscribed_at', { ascending: false }),
    ]);
    if (evRes.data) {
      const { data: counts } = await supabase.from('bookings').select('event_id').eq('status', 'confirmed');
      const countMap: Record<string, number> = {};
      (counts ?? []).forEach(b => { countMap[b.event_id] = (countMap[b.event_id] ?? 0) + 1; });
      setEvents((evRes.data as AdminEvent[]).map(e => ({ ...e, booking_count: countMap[e.id] ?? 0 })));
    }
    if (memRes.data) setMembers(memRes.data as AdminMember[]);
    if (bookRes.data) setBookings(bookRes.data as unknown as AdminBooking[]);
    if (newsRes.data) setNewsletter(newsRes.data as NewsletterSub[]);
    setLoading(false);
  };

  const saveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingEvent(true);
    const payload = {
      title: eventForm.title, description: eventForm.description, category: eventForm.category,
      location: eventForm.location, starts_at: eventForm.starts_at, ends_at: eventForm.ends_at,
      capacity: Number(eventForm.capacity), price: Number(eventForm.price),
      is_members_only: eventForm.is_members_only, is_published: eventForm.is_published,
    };
    if (editingEvent) {
      await supabase.from('events').update(payload).eq('id', editingEvent.id);
    } else {
      await supabase.from('events').insert({ ...payload, created_by: user!.id });
    }
    setSavingEvent(false);
    setShowEventForm(false);
    setEditingEvent(null);
    setEventForm({ ...EVENT_FORM_DEFAULT });
    await loadAll();
  };

  const togglePublish = async (ev: AdminEvent) => {
    await supabase.from('events').update({ is_published: !ev.is_published }).eq('id', ev.id);
    setEvents(prev => prev.map(e => e.id === ev.id ? { ...e, is_published: !e.is_published } : e));
  };

  const openEdit = (ev: AdminEvent) => {
    setEditingEvent(ev);
    setEventForm({
      title: ev.title, description: '', category: ev.category, location: ev.location,
      starts_at: ev.starts_at.slice(0, 16), ends_at: '',
      capacity: ev.capacity, price: ev.price,
      is_members_only: ev.is_members_only, is_published: ev.is_published,
    });
    setShowEventForm(true);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-cream-100 flex items-center justify-center px-5">
        <div className="text-center max-w-sm">
          <Shield size={40} className="text-neutral-300 mx-auto mb-4" />
          <h2 className="font-serif text-heading-xl text-neutral-900 mb-2">Admin access required</h2>
          <p className="text-body-md text-neutral-500 mb-6">This area is for NEST administrators only.</p>
          <Button onClick={() => setPage('home')} iconRight={<ArrowRight />}>Back to site</Button>
        </div>
      </div>
    );
  }

  const tabs = [
    { key: 'overview', label: 'Overview', icon: <BarChart2 size={14} /> },
    { key: 'events', label: `Events (${events.length})`, icon: <Calendar size={14} /> },
    { key: 'members', label: `Members (${members.length})`, icon: <Users size={14} /> },
    { key: 'bookings', label: `Bookings (${bookings.length})`, icon: <BookOpen size={14} /> },
    { key: 'newsletter', label: `Newsletter (${newsletter.filter(s => s.is_active).length})`, icon: <Mail size={14} /> },
  ] as const;

  const activeMembers = members.filter(m => m.membership_status === 'active').length;
  const upcomingEvents = events.filter(e => new Date(e.starts_at) > new Date() && e.is_published).length;
  const totalBookings = bookings.filter(b => b.status === 'confirmed').length;
  const newsletterCount = newsletter.filter(s => s.is_active).length;

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Header */}
      <div className="bg-neutral-900 pt-24 pb-8">
        <div className="max-w-page mx-auto container-px">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-terracotta-500 flex items-center justify-center">
              <Shield size={15} className="text-white" />
            </div>
            <p className="text-overline text-terracotta-400 uppercase">Admin Panel</p>
          </div>
          <h1 className="font-serif text-display-sm text-cream-100">NEST Management</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-neutral-200 sticky top-16 z-raised">
        <div className="max-w-page mx-auto container-px">
          <div className="flex overflow-x-auto scrollbar-hide gap-0.5 py-1">
            {tabs.map(t => (
              <button key={t.key} onClick={() => setTab(t.key as AdminTab)} className={`flex items-center gap-1.5 px-4 py-3 text-label-sm whitespace-nowrap rounded-lg transition-colors relative flex-shrink-0 ${tab === t.key ? 'text-terracotta-600' : 'text-neutral-500 hover:text-neutral-800'}`}>
                {t.icon}{t.label}
                {tab === t.key && <motion.div layoutId="admin-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta-500" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-page mx-auto container-px py-8">
        <AnimatePresence mode="wait">
          {/* ── Overview ──────────────────────────────────── */}
          {tab === 'overview' && (
            <motion.div key="overview" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Active members', value: activeMembers, icon: <Users size={16} />, color: 'text-terracotta-600 bg-terracotta-50', action: () => setTab('members') },
                  { label: 'Upcoming events', value: upcomingEvents, icon: <Calendar size={16} />, color: 'text-sage-600 bg-sage-50', action: () => setTab('events') },
                  { label: 'Confirmed bookings', value: totalBookings, icon: <BookOpen size={16} />, color: 'text-warning-600 bg-warning-50', action: () => setTab('bookings') },
                  { label: 'Newsletter subscribers', value: newsletterCount, icon: <Mail size={16} />, color: 'text-neutral-600 bg-neutral-100', action: () => setTab('newsletter') },
                ].map((s, i) => (
                  <motion.button key={s.label} className="bg-white rounded-2xl p-5 shadow-card text-left hover:shadow-card-hover transition-all" onClick={s.action} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>{s.icon}</div>
                    <p className="font-serif text-display-sm text-neutral-900 leading-none mb-1">{s.value}</p>
                    <p className="text-caption text-neutral-500">{s.label}</p>
                  </motion.button>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="bg-white rounded-2xl p-5 shadow-card">
                  <h3 className="font-serif text-heading-lg text-neutral-900 mb-4">Recent bookings</h3>
                  {bookings.slice(0, 5).map(b => (
                    <div key={b.id} className="flex items-center justify-between py-2.5 border-b border-neutral-50 last:border-0">
                      <div>
                        <p className="text-label-sm text-neutral-900 font-medium">{b.user?.full_name ?? 'Member'}</p>
                        <p className="text-caption text-neutral-400 truncate max-w-[200px]">{b.event?.title ?? '—'}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${b.status === 'confirmed' ? 'bg-success-50 text-success-700' : 'bg-neutral-100 text-neutral-500'}`}>{b.status}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-card">
                  <h3 className="font-serif text-heading-lg text-neutral-900 mb-4">Membership breakdown</h3>
                  {['founding', 'family', 'community', 'teen'].map(tier => {
                    const count = members.filter(m => m.membership_tier === tier && m.membership_status === 'active').length;
                    const pct = activeMembers > 0 ? Math.round((count / activeMembers) * 100) : 0;
                    return (
                      <div key={tier} className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-label-sm text-neutral-700 capitalize">{tier}</span>
                          <span className="text-caption text-neutral-400">{count}</span>
                        </div>
                        <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                          <motion.div className="h-full bg-terracotta-500 rounded-full" initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Events ────────────────────────────────────── */}
          {tab === 'events' && (
            <motion.div key="events" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-display-sm text-neutral-900">Events</h2>
                <Button size="sm" iconLeft={<Plus size={14} />} onClick={() => { setEditingEvent(null); setEventForm({ ...EVENT_FORM_DEFAULT }); setShowEventForm(true); }}>Create event</Button>
              </div>

              <AnimatePresence>
                {showEventForm && (
                  <motion.form onSubmit={saveEvent} initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="bg-white rounded-2xl p-6 shadow-card mb-6">
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="font-serif text-heading-xl text-neutral-900">{editingEvent ? 'Edit event' : 'Create new event'}</h3>
                      <button type="button" onClick={() => { setShowEventForm(false); setEditingEvent(null); }} className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400"><X size={16} /></button>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { label: 'Title', key: 'title', type: 'text', required: true },
                        { label: 'Location', key: 'location', type: 'text', required: true },
                        { label: 'Start date & time', key: 'starts_at', type: 'datetime-local', required: true },
                        { label: 'End date & time', key: 'ends_at', type: 'datetime-local', required: true },
                        { label: 'Capacity', key: 'capacity', type: 'number', required: true },
                        { label: 'Price (€)', key: 'price', type: 'number', required: false },
                      ].map(f => (
                        <div key={f.key}>
                          <label className="block text-label-sm text-neutral-700 mb-1.5">{f.label}</label>
                          <input type={f.type} value={eventForm[f.key as keyof typeof eventForm] as string} onChange={e => setEventForm(p => ({ ...p, [f.key]: e.target.value }))} required={f.required} className="w-full h-10 px-3 rounded-xl border border-neutral-200 text-body-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent" />
                        </div>
                      ))}
                      <div>
                        <label className="block text-label-sm text-neutral-700 mb-1.5">Category</label>
                        <select value={eventForm.category} onChange={e => setEventForm(p => ({ ...p, category: e.target.value }))} className="w-full h-10 px-3 rounded-xl border border-neutral-200 text-body-sm text-neutral-900 bg-white focus:outline-none focus:ring-2 focus:ring-terracotta-500">
                          {['children', 'teens', 'parents', 'community', 'general'].map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div className="flex items-center gap-4 pt-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={eventForm.is_published} onChange={e => setEventForm(p => ({ ...p, is_published: e.target.checked }))} className="accent-terracotta-500" />
                          <span className="text-label-sm text-neutral-700">Published</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={eventForm.is_members_only} onChange={e => setEventForm(p => ({ ...p, is_members_only: e.target.checked }))} className="accent-terracotta-500" />
                          <span className="text-label-sm text-neutral-700">Members only</span>
                        </label>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-5">
                      <Button type="submit" loading={savingEvent}>{editingEvent ? 'Save changes' : 'Create event'}</Button>
                      <Button type="button" variant="ghost" onClick={() => { setShowEventForm(false); setEditingEvent(null); }}>Cancel</Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

              <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="border-b border-neutral-100">
                    <tr className="text-left">
                      <th className="px-5 py-3 text-label-sm text-neutral-500 font-medium">Event</th>
                      <th className="px-5 py-3 text-label-sm text-neutral-500 font-medium hidden md:table-cell">Date</th>
                      <th className="px-5 py-3 text-label-sm text-neutral-500 font-medium hidden lg:table-cell">Bookings</th>
                      <th className="px-5 py-3 text-label-sm text-neutral-500 font-medium">Status</th>
                      <th className="px-5 py-3 text-label-sm text-neutral-500 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-50">
                    {events.map(ev => (
                      <tr key={ev.id} className="hover:bg-neutral-50/50 transition-colors">
                        <td className="px-5 py-3.5">
                          <p className="text-label-sm text-neutral-900 font-medium">{ev.title}</p>
                          <p className="text-caption text-neutral-400">{ev.category}</p>
                        </td>
                        <td className="px-5 py-3.5 hidden md:table-cell text-body-sm text-neutral-500">
                          {new Date(ev.starts_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="px-5 py-3.5 hidden lg:table-cell">
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                              <div className="h-full bg-terracotta-500 rounded-full" style={{ width: `${Math.min(100, ((ev.booking_count ?? 0) / ev.capacity) * 100)}%` }} />
                            </div>
                            <span className="text-caption text-neutral-500">{ev.booking_count ?? 0}/{ev.capacity}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${ev.is_published ? 'bg-success-50 text-success-700' : 'bg-neutral-100 text-neutral-500'}`}>
                            {ev.is_published ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-1">
                            <button onClick={() => togglePublish(ev)} className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors" title={ev.is_published ? 'Unpublish' : 'Publish'}>
                              {ev.is_published ? <EyeOff size={14} /> : <Eye size={14} />}
                            </button>
                            <button onClick={() => openEdit(ev)} className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors" title="Edit">
                              <Edit2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* ── Members ───────────────────────────────────── */}
          {tab === 'members' && (
            <motion.div key="members" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <h2 className="font-serif text-display-sm text-neutral-900 mb-6">Members</h2>
              <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="border-b border-neutral-100">
                    <tr className="text-left">
                      <th className="px-5 py-3 text-label-sm text-neutral-500 font-medium">Name</th>
                      <th className="px-5 py-3 text-label-sm text-neutral-500 font-medium hidden sm:table-cell">Membership</th>
                      <th className="px-5 py-3 text-label-sm text-neutral-500 font-medium hidden lg:table-cell">Status</th>
                      <th className="px-5 py-3 text-label-sm text-neutral-500 font-medium hidden lg:table-cell">Role</th>
                      <th className="px-5 py-3 text-label-sm text-neutral-500 font-medium hidden md:table-cell">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-50">
                    {members.map(m => (
                      <tr key={m.id} className="hover:bg-neutral-50/50 transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-terracotta-100 flex items-center justify-center flex-shrink-0">
                              <span className="text-xs text-terracotta-600 font-medium">{(m.full_name ?? '?')[0].toUpperCase()}</span>
                            </div>
                            <p className="text-label-sm text-neutral-900 font-medium">{m.full_name ?? '—'}</p>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 hidden sm:table-cell">
                          {m.membership_tier ? <span className="text-xs px-2 py-0.5 rounded-full bg-terracotta-50 text-terracotta-700 capitalize">{m.membership_tier}</span> : <span className="text-caption text-neutral-400">None</span>}
                        </td>
                        <td className="px-5 py-3.5 hidden lg:table-cell">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${m.membership_status === 'active' ? 'bg-success-50 text-success-700' : 'bg-neutral-100 text-neutral-500'}`}>{m.membership_status}</span>
                        </td>
                        <td className="px-5 py-3.5 hidden lg:table-cell">
                          {m.role === 'admin' ? <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-900 text-cream-200">Admin</span> : <span className="text-caption text-neutral-400">Member</span>}
                        </td>
                        <td className="px-5 py-3.5 hidden md:table-cell text-body-sm text-neutral-400">
                          {new Date(m.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* ── Bookings ──────────────────────────────────── */}
          {tab === 'bookings' && (
            <motion.div key="bookings" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <h2 className="font-serif text-display-sm text-neutral-900 mb-6">Bookings</h2>
              <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="border-b border-neutral-100">
                    <tr className="text-left">
                      <th className="px-5 py-3 text-label-sm text-neutral-500 font-medium">Member</th>
                      <th className="px-5 py-3 text-label-sm text-neutral-500 font-medium hidden sm:table-cell">Event</th>
                      <th className="px-5 py-3 text-label-sm text-neutral-500 font-medium">Status</th>
                      <th className="px-5 py-3 text-label-sm text-neutral-500 font-medium hidden md:table-cell">Booked</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-50">
                    {bookings.map(b => (
                      <tr key={b.id} className="hover:bg-neutral-50/50 transition-colors">
                        <td className="px-5 py-3.5 text-label-sm text-neutral-900 font-medium">{b.user?.full_name ?? '—'}</td>
                        <td className="px-5 py-3.5 hidden sm:table-cell">
                          <p className="text-label-sm text-neutral-700 truncate max-w-[200px]">{b.event?.title ?? '—'}</p>
                          {b.event?.starts_at && <p className="text-caption text-neutral-400">{new Date(b.event.starts_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>}
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${b.status === 'confirmed' ? 'bg-success-50 text-success-700' : b.status === 'waitlisted' ? 'bg-warning-50 text-warning-700' : 'bg-neutral-100 text-neutral-500'}`}>{b.status}</span>
                        </td>
                        <td className="px-5 py-3.5 hidden md:table-cell text-body-sm text-neutral-400">
                          {new Date(b.booked_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* ── Newsletter ────────────────────────────────── */}
          {tab === 'newsletter' && (
            <motion.div key="newsletter" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-display-sm text-neutral-900">Newsletter Subscribers</h2>
                <div className="flex items-center gap-3">
                  <span className="text-label-sm text-neutral-600">{newsletterCount} active</span>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="border-b border-neutral-100">
                    <tr className="text-left">
                      <th className="px-5 py-3 text-label-sm text-neutral-500 font-medium">Email</th>
                      <th className="px-5 py-3 text-label-sm text-neutral-500 font-medium hidden sm:table-cell">Name</th>
                      <th className="px-5 py-3 text-label-sm text-neutral-500 font-medium hidden md:table-cell">Source</th>
                      <th className="px-5 py-3 text-label-sm text-neutral-500 font-medium">Status</th>
                      <th className="px-5 py-3 text-label-sm text-neutral-500 font-medium hidden lg:table-cell">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-50">
                    {newsletter.map(s => (
                      <tr key={s.id} className="hover:bg-neutral-50/50 transition-colors">
                        <td className="px-5 py-3.5 text-label-sm text-neutral-900">{s.email}</td>
                        <td className="px-5 py-3.5 hidden sm:table-cell text-body-sm text-neutral-500">{s.name ?? '—'}</td>
                        <td className="px-5 py-3.5 hidden md:table-cell text-caption text-neutral-400 capitalize">{s.source}</td>
                        <td className="px-5 py-3.5">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${s.is_active ? 'bg-success-50 text-success-700' : 'bg-neutral-100 text-neutral-500'}`}>
                            {s.is_active ? 'Active' : 'Unsubscribed'}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 hidden lg:table-cell text-body-sm text-neutral-400">
                          {new Date(s.subscribed_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
