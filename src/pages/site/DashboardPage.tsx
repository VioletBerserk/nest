import { useState, useEffect } from 'react';
import { Calendar, Users, Bell, BookOpen, Plus, ChevronRight, Clock, MapPin, Baby, Settings, Star, ArrowRight, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../lib/auth';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ds/Button';
import { Reveal } from '../../components/motion';
import type { SitePage } from '../../components/layout/SiteHeader';

interface Booking {
  id: string;
  status: string;
  booked_at: string;
  event: {
    id: string;
    title: string;
    starts_at: string;
    location: string;
    category: string;
    image_url: string | null;
  };
}

interface Child {
  id: string;
  name: string;
  date_of_birth: string | null;
  avatar_url: string | null;
  allergies: string | null;
}

interface Notification {
  id: string;
  type: string;
  title: string;
  body: string | null;
  is_read: boolean;
  created_at: string;
}

interface ChildFormState {
  name: string;
  date_of_birth: string;
  gender: string;
  allergies: string;
  medical_notes: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

function ageFromDob(dob: string) {
  const diff = Date.now() - new Date(dob).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

const TIER_COLORS: Record<string, string> = {
  teen: 'bg-sage-100 text-sage-700',
  community: 'bg-terracotta-50 text-terracotta-700',
  family: 'bg-terracotta-500 text-white',
  founding: 'bg-neutral-900 text-cream-100',
};

const TIER_LABELS: Record<string, string> = {
  teen: 'Teen', community: 'Community', family: 'Family', founding: 'Founding',
};

export default function DashboardPage({ setPage }: { setPage: (p: SitePage) => void }) {
  const { user, profile, refreshProfile } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [children, setChildren] = useState<Child[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [tab, setTab] = useState<'overview' | 'bookings' | 'children' | 'profile' | 'notifications'>('overview');
  const [loadingData, setLoadingData] = useState(true);
  const [showChildForm, setShowChildForm] = useState(false);
  const [childForm, setChildForm] = useState<ChildFormState>({ name: '', date_of_birth: '', gender: '', allergies: '', medical_notes: '' });
  const [savingChild, setSavingChild] = useState(false);
  const [profileForm, setProfileForm] = useState({ full_name: '', phone: '', bio: '' });
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  useEffect(() => {
    if (!user) return;
    setProfileForm({ full_name: profile?.full_name ?? '', phone: profile?.phone ?? '', bio: profile?.bio ?? '' });
  }, [user, profile]);

  useEffect(() => {
    if (!user) return;
    const fetchAll = async () => {
      setLoadingData(true);
      const [bookingsRes, childrenRes, notifRes] = await Promise.all([
        supabase.from('bookings').select('id, status, booked_at, event:events(id, title, starts_at, location, category, image_url)').eq('user_id', user.id).order('booked_at', { ascending: false }),
        supabase.from('children').select('id, name, date_of_birth, avatar_url, allergies').eq('parent_id', user.id).eq('is_active', true),
        supabase.from('notifications').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(20),
      ]);
      if (bookingsRes.data) setBookings(bookingsRes.data as unknown as Booking[]);
      if (childrenRes.data) setChildren(childrenRes.data as Child[]);
      if (notifRes.data) setNotifications(notifRes.data as Notification[]);
      setLoadingData(false);
    };
    fetchAll();
  }, [user]);

  const markNotifRead = async (id: string) => {
    await supabase.from('notifications').update({ is_read: true }).eq('id', id);
    setNotifications(n => n.map(x => x.id === id ? { ...x, is_read: true } : x));
  };

  const cancelBooking = async (bookingId: string) => {
    await supabase.from('bookings').update({ status: 'cancelled' }).eq('id', bookingId);
    setBookings(b => b.map(x => x.id === bookingId ? { ...x, status: 'cancelled' } : x));
  };

  const addChild = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSavingChild(true);
    const { data } = await supabase.from('children').insert({
      parent_id: user.id,
      name: childForm.name,
      date_of_birth: childForm.date_of_birth || null,
      gender: childForm.gender || null,
      allergies: childForm.allergies || null,
      medical_notes: childForm.medical_notes || null,
    }).select().single();
    setSavingChild(false);
    if (data) {
      setChildren(c => [...c, data as Child]);
      setShowChildForm(false);
      setChildForm({ name: '', date_of_birth: '', gender: '', allergies: '', medical_notes: '' });
    }
  };

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSavingProfile(true);
    await supabase.from('profiles').update({
      full_name: profileForm.full_name,
      phone: profileForm.phone,
      bio: profileForm.bio,
      updated_at: new Date().toISOString(),
    }).eq('id', user.id);
    await refreshProfile();
    setSavingProfile(false);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-cream-100 flex items-center justify-center px-5">
        <div className="text-center">
          <p className="text-body-lg text-neutral-600 mb-6">Sign in to access your dashboard.</p>
          <Button onClick={() => setPage('auth')} iconRight={<ArrowRight />}>Sign in</Button>
        </div>
      </div>
    );
  }

  const upcomingBookings = bookings.filter(b => b.status === 'confirmed' && new Date(b.event.starts_at) > new Date());
  const unreadCount = notifications.filter(n => !n.is_read).length;

  const tabs = [
    { key: 'overview', label: 'Overview', icon: <Star size={15} /> },
    { key: 'bookings', label: 'Bookings', icon: <Calendar size={15} />, badge: upcomingBookings.length },
    { key: 'children', label: 'Children', icon: <Baby size={15} />, badge: children.length },
    { key: 'notifications', label: 'Notifications', icon: <Bell size={15} />, badge: unreadCount },
    { key: 'profile', label: 'Profile', icon: <Settings size={15} /> },
  ] as const;

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Header */}
      <div className="bg-neutral-900 pt-24 pb-10">
        <div className="max-w-page mx-auto container-px">
          <Reveal>
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-terracotta-500 flex items-center justify-center flex-shrink-0">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="" className="w-full h-full rounded-2xl object-cover" />
                  ) : (
                    <span className="font-serif text-white font-bold text-xl">
                      {(profile?.full_name ?? user.email ?? 'U')[0].toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <h1 className="font-serif text-display-sm text-cream-100">
                    Welcome back, {profile?.full_name?.split(' ')[0] ?? 'member'}.
                  </h1>
                  <p className="text-body-sm text-neutral-400 mt-1">{user.email}</p>
                </div>
              </div>
              {profile?.membership_tier ? (
                <span className={`text-label-sm px-3 py-1.5 rounded-full font-medium ${TIER_COLORS[profile.membership_tier] ?? 'bg-neutral-100 text-neutral-600'}`}>
                  {TIER_LABELS[profile.membership_tier]} Member
                </span>
              ) : (
                <Button size="sm" onClick={() => setPage('membership')} iconRight={<ArrowRight />}>
                  Get membership
                </Button>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-neutral-200 sticky top-16 z-raised">
        <div className="max-w-page mx-auto container-px">
          <div className="flex overflow-x-auto scrollbar-hide gap-0.5 py-1">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key as typeof tab)}
                className={`flex items-center gap-1.5 px-4 py-3 text-label-sm whitespace-nowrap rounded-lg transition-colors relative flex-shrink-0 ${
                  tab === t.key ? 'text-terracotta-600' : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                {t.icon}
                {t.label}
                {'badge' in t && (t.badge ?? 0) > 0 && (
                  <span className="bg-terracotta-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 leading-none">
                    {t.badge}
                  </span>
                )}
                {tab === t.key && (
                  <motion.div layoutId="dash-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta-500" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-page mx-auto container-px py-10">
        <AnimatePresence mode="wait">
          {/* ── Overview ──────────────────────────────────────── */}
          {tab === 'overview' && (
            <motion.div key="overview" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
              {/* Quick stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Upcoming events', value: upcomingBookings.length, icon: <Calendar size={16} />, color: 'text-terracotta-600 bg-terracotta-50' },
                  { label: 'Children registered', value: children.length, icon: <Baby size={16} />, color: 'text-sage-600 bg-sage-50' },
                  { label: 'Notifications', value: unreadCount, icon: <Bell size={16} />, color: 'text-warning-600 bg-warning-50' },
                  { label: 'Total bookings', value: bookings.filter(b => b.status === 'confirmed').length, icon: <BookOpen size={16} />, color: 'text-neutral-600 bg-neutral-100' },
                ].map((s, i) => (
                  <motion.div key={s.label} className="bg-white rounded-2xl p-5 shadow-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>{s.icon}</div>
                    <p className="font-serif text-display-sm text-neutral-900 leading-none mb-1">{s.value}</p>
                    <p className="text-caption text-neutral-500">{s.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Next up */}
              {upcomingBookings.length > 0 && (
                <div className="mb-8">
                  <h2 className="font-serif text-heading-xl text-neutral-900 mb-4">Next up</h2>
                  <div className="space-y-3">
                    {upcomingBookings.slice(0, 3).map((b, i) => (
                      <motion.div key={b.id} className="bg-white rounded-2xl p-5 shadow-card flex items-center gap-4" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                        {b.event.image_url && (
                          <img src={b.event.image_url} alt="" className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-overline text-terracotta-500 uppercase mb-0.5">{b.event.category}</p>
                          <p className="text-label-md text-neutral-900 font-medium truncate">{b.event.title}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="flex items-center gap-1 text-caption text-neutral-400"><Clock size={11} />{formatDate(b.event.starts_at)}</span>
                            <span className="flex items-center gap-1 text-caption text-neutral-400"><MapPin size={11} />{b.event.location}</span>
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-neutral-300 flex-shrink-0" />
                      </motion.div>
                    ))}
                  </div>
                  {upcomingBookings.length > 3 && (
                    <button onClick={() => setTab('bookings')} className="text-label-sm text-terracotta-500 hover:text-terracotta-600 mt-3 flex items-center gap-1">
                      View all {upcomingBookings.length} bookings <ArrowRight size={13} />
                    </button>
                  )}
                </div>
              )}

              {/* Quick actions */}
              <div>
                <h2 className="font-serif text-heading-xl text-neutral-900 mb-4">Quick actions</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { label: 'Browse events', desc: 'Find and book upcoming sessions', icon: <Calendar size={18} />, action: () => setPage('events') },
                    { label: 'Add a child', desc: 'Register a child profile', icon: <Plus size={18} />, action: () => { setTab('children'); setShowChildForm(true); } },
                    { label: 'Upgrade membership', desc: 'Get more from NEST', icon: <Star size={18} />, action: () => setPage('membership') },
                  ].map((a) => (
                    <button key={a.label} onClick={a.action} className="bg-white rounded-2xl p-5 shadow-card text-left hover:shadow-card-hover transition-all group flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-terracotta-50 text-terracotta-600 group-hover:bg-terracotta-500 group-hover:text-white flex items-center justify-center flex-shrink-0 transition-all">
                        {a.icon}
                      </div>
                      <div>
                        <p className="text-label-md text-neutral-900 font-medium">{a.label}</p>
                        <p className="text-caption text-neutral-400 mt-0.5">{a.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Bookings ──────────────────────────────────────── */}
          {tab === 'bookings' && (
            <motion.div key="bookings" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-display-sm text-neutral-900">My Bookings</h2>
                <Button size="sm" onClick={() => setPage('events')} iconRight={<ArrowRight />}>Browse events</Button>
              </div>
              {loadingData ? (
                <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="bg-white rounded-2xl h-24 skeleton" />)}</div>
              ) : bookings.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center shadow-card">
                  <Calendar size={32} className="text-neutral-300 mx-auto mb-4" />
                  <p className="text-body-md text-neutral-500 mb-4">No bookings yet.</p>
                  <Button onClick={() => setPage('events')} iconRight={<ArrowRight />}>Browse events</Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {bookings.map((b) => (
                    <div key={b.id} className={`bg-white rounded-2xl p-5 shadow-card flex items-center gap-4 ${b.status === 'cancelled' ? 'opacity-50' : ''}`}>
                      {b.event.image_url && <img src={b.event.image_url} alt="" className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-label-md text-neutral-900 font-medium truncate">{b.event.title}</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${b.status === 'confirmed' ? 'bg-success-50 text-success-700' : b.status === 'waitlisted' ? 'bg-warning-50 text-warning-700' : 'bg-neutral-100 text-neutral-500'}`}>
                            {b.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 mt-1">
                          <span className="flex items-center gap-1 text-caption text-neutral-400"><Clock size={11} />{formatDate(b.event.starts_at)}</span>
                          <span className="flex items-center gap-1 text-caption text-neutral-400"><MapPin size={11} />{b.event.location}</span>
                        </div>
                      </div>
                      {b.status === 'confirmed' && new Date(b.event.starts_at) > new Date() && (
                        <button onClick={() => cancelBooking(b.id)} className="text-caption text-neutral-400 hover:text-error-600 transition-colors flex-shrink-0">
                          Cancel
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ── Children ──────────────────────────────────────── */}
          {tab === 'children' && (
            <motion.div key="children" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-display-sm text-neutral-900">Child Profiles</h2>
                <Button size="sm" onClick={() => setShowChildForm(true)} iconLeft={<Plus size={14} />}>Add child</Button>
              </div>

              {children.length === 0 && !showChildForm && (
                <div className="bg-white rounded-2xl p-12 text-center shadow-card mb-6">
                  <Baby size={32} className="text-neutral-300 mx-auto mb-4" />
                  <p className="text-body-md text-neutral-500 mb-4">No children registered yet.</p>
                  <Button onClick={() => setShowChildForm(true)} iconLeft={<Plus size={14} />}>Add your first child</Button>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {children.map((child, i) => (
                  <motion.div key={child.id} className="bg-white rounded-2xl p-5 shadow-card flex items-center gap-4" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.06 }}>
                    <div className="w-12 h-12 rounded-full bg-terracotta-100 flex items-center justify-center flex-shrink-0">
                      {child.avatar_url ? (
                        <img src={child.avatar_url} alt={child.name} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <span className="font-serif text-terracotta-600 font-semibold text-lg">{child.name[0]}</span>
                      )}
                    </div>
                    <div>
                      <p className="text-label-md text-neutral-900 font-medium">{child.name}</p>
                      {child.date_of_birth && (
                        <p className="text-caption text-neutral-400">{ageFromDob(child.date_of_birth)} years old</p>
                      )}
                      {child.allergies && (
                        <p className="text-caption text-warning-600 mt-0.5">Allergies: {child.allergies}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <AnimatePresence>
                {showChildForm && (
                  <motion.form
                    onSubmit={addChild}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-white rounded-2xl p-6 shadow-card"
                  >
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="font-serif text-heading-xl text-neutral-900">Add a child</h3>
                      <button type="button" onClick={() => setShowChildForm(false)} className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400">
                        <X size={16} />
                      </button>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { label: "Child's name", key: 'name', type: 'text', placeholder: 'Misha', required: true },
                        { label: 'Date of birth', key: 'date_of_birth', type: 'date', placeholder: '', required: false },
                        { label: 'Allergies', key: 'allergies', type: 'text', placeholder: 'e.g. nuts, dairy', required: false },
                        { label: 'Medical notes', key: 'medical_notes', type: 'text', placeholder: 'Optional', required: false },
                      ].map(f => (
                        <div key={f.key}>
                          <label className="block text-label-sm text-neutral-700 mb-1.5">{f.label}</label>
                          <input
                            type={f.type}
                            value={childForm[f.key as keyof ChildFormState]}
                            onChange={e => setChildForm(p => ({ ...p, [f.key]: e.target.value }))}
                            placeholder={f.placeholder}
                            required={f.required}
                            className="w-full h-10 px-3 rounded-xl border border-neutral-200 text-body-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent"
                          />
                        </div>
                      ))}
                      <div>
                        <label className="block text-label-sm text-neutral-700 mb-1.5">Gender</label>
                        <select value={childForm.gender} onChange={e => setChildForm(p => ({ ...p, gender: e.target.value }))} className="w-full h-10 px-3 rounded-xl border border-neutral-200 text-body-sm text-neutral-900 bg-white focus:outline-none focus:ring-2 focus:ring-terracotta-500">
                          <option value="">Prefer not to say</option>
                          <option value="boy">Boy</option>
                          <option value="girl">Girl</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <Button type="submit" loading={savingChild}>Save child profile</Button>
                      <Button type="button" variant="ghost" onClick={() => setShowChildForm(false)}>Cancel</Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ── Notifications ─────────────────────────────────── */}
          {tab === 'notifications' && (
            <motion.div key="notifications" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
              <h2 className="font-serif text-display-sm text-neutral-900 mb-6">Notifications</h2>
              {notifications.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center shadow-card">
                  <Bell size={32} className="text-neutral-300 mx-auto mb-4" />
                  <p className="text-body-md text-neutral-500">No notifications yet.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {notifications.map((n) => (
                    <div key={n.id} onClick={() => !n.is_read && markNotifRead(n.id)} className={`bg-white rounded-2xl p-5 shadow-card flex gap-4 cursor-pointer transition-opacity ${n.is_read ? 'opacity-60' : ''}`}>
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${n.type === 'booking' ? 'bg-success-50 text-success-600' : n.type === 'event' ? 'bg-terracotta-50 text-terracotta-600' : 'bg-neutral-100 text-neutral-500'}`}>
                        {n.type === 'booking' ? <Check size={15} /> : n.type === 'event' ? <Calendar size={15} /> : <Bell size={15} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className={`text-label-md ${n.is_read ? 'text-neutral-600' : 'text-neutral-900 font-medium'}`}>{n.title}</p>
                          {!n.is_read && <span className="w-2 h-2 rounded-full bg-terracotta-500 flex-shrink-0 mt-1" />}
                        </div>
                        {n.body && <p className="text-body-sm text-neutral-500 mt-0.5">{n.body}</p>}
                        <p className="text-caption text-neutral-400 mt-1">{new Date(n.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ── Profile ───────────────────────────────────────── */}
          {tab === 'profile' && (
            <motion.div key="profile" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
              <h2 className="font-serif text-display-sm text-neutral-900 mb-6">My Profile</h2>
              <form onSubmit={saveProfile} className="bg-white rounded-2xl p-6 shadow-card max-w-lg">
                <div className="space-y-4">
                  {[
                    { label: 'Full name', key: 'full_name', type: 'text', placeholder: 'Anna Sorokina' },
                    { label: 'Phone', key: 'phone', type: 'tel', placeholder: '+381 ...' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-label-sm text-neutral-700 mb-1.5">{f.label}</label>
                      <input
                        type={f.type}
                        value={profileForm[f.key as keyof typeof profileForm]}
                        onChange={e => setProfileForm(p => ({ ...p, [f.key]: e.target.value }))}
                        placeholder={f.placeholder}
                        className="w-full h-11 px-4 rounded-xl border border-neutral-200 text-body-md text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-label-sm text-neutral-700 mb-1.5">About you</label>
                    <textarea
                      value={profileForm.bio}
                      onChange={e => setProfileForm(p => ({ ...p, bio: e.target.value }))}
                      rows={3}
                      placeholder="Tell the community a little about yourself..."
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-body-md text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent resize-none"
                    />
                  </div>
                  <div className="pt-2 flex items-center gap-3">
                    <Button type="submit" loading={savingProfile}>{profileSaved ? 'Saved!' : 'Save changes'}</Button>
                    <AnimatePresence>
                      {profileSaved && (
                        <motion.span initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-label-sm text-success-600 flex items-center gap-1">
                          <Check size={14} /> Saved
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </form>

              {/* Email (read-only) */}
              <div className="bg-white rounded-2xl p-6 shadow-card max-w-lg mt-4">
                <label className="block text-label-sm text-neutral-700 mb-1.5">Email address</label>
                <input value={user.email ?? ''} readOnly className="w-full h-11 px-4 rounded-xl border border-neutral-200 bg-neutral-50 text-body-md text-neutral-500 cursor-not-allowed" />
                <p className="text-caption text-neutral-400 mt-2">Email cannot be changed from this screen.</p>
              </div>

              {/* Membership */}
              <div className="bg-white rounded-2xl p-6 shadow-card max-w-lg mt-4">
                <p className="text-label-sm text-neutral-700 mb-3">Membership status</p>
                {profile?.membership_tier ? (
                  <div className="flex items-center justify-between">
                    <span className={`text-label-md px-3 py-1.5 rounded-full font-medium ${TIER_COLORS[profile.membership_tier]}`}>
                      {TIER_LABELS[profile.membership_tier]} — {profile.membership_status}
                    </span>
                    <Button size="sm" variant="outline" onClick={() => setPage('membership')}>Manage</Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <p className="text-body-sm text-neutral-500">No active membership</p>
                    <Button size="sm" onClick={() => setPage('membership')} iconRight={<ArrowRight />}>Join now</Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
