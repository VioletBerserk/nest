import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Globe, Bell, User, LogOut, LayoutDashboard, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ds/Button';
import { useAuth } from '../../lib/auth';

export type SitePage =
  | 'home' | 'about' | 'children' | 'teens' | 'parents'
  | 'events' | 'membership' | 'space' | 'community' | 'contact'
  | 'brief' | 'design-system'
  | 'auth' | 'dashboard' | 'admin' | 'blog' | 'concierge';

interface SiteHeaderProps {
  page: SitePage;
  setPage: (p: SitePage) => void;
}

const familyLinks: { page: SitePage; label: string; desc: string }[] = [
  { page: 'children', label: 'For Children',  desc: 'Ages 6–12 · Workshops & discovery' },
  { page: 'teens',    label: 'For Teens',     desc: 'Ages 13–18 · Creative studio' },
  { page: 'parents',  label: 'For Parents',   desc: 'Café, community & coworking' },
];

const mainLinks: { page: SitePage; label: string }[] = [
  { page: 'about',      label: 'About' },
  { page: 'events',     label: 'Events' },
  { page: 'space',      label: 'The Space' },
  { page: 'community',  label: 'Community' },
  { page: 'blog',       label: 'Blog' },
];

const dropdownVariants = {
  hidden:  { opacity: 0, y: -10, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.04, delayChildren: 0.04 },
  },
  exit:    { opacity: 0, y: -8, scale: 0.96, transition: { duration: 0.15 } },
};

const dropdownItemVariants = {
  hidden:  { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
};

const drawerVariants = {
  hidden:  { x: '100%', opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] } },
  exit:    { x: '100%', opacity: 0, transition: { duration: 0.28, ease: [0.4, 0, 1, 1] } },
};

const overlayVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.22 } },
  exit:    { opacity: 0, transition: { duration: 0.22 } },
};

export function SiteHeader({ page, setPage }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [familyOpen, setFamilyOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, profile, signOut, isAdmin } = useAuth();

  const isDarkHero = page === 'home';
  const isLight = isDarkHero && !scrolled;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  const nav = (p: SitePage) => {
    setPage(p);
    setFamilyOpen(false);
    setMobileOpen(false);
    setUserMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSignOut = async () => {
    await signOut();
    nav('home');
  };

  const textCol = isLight ? 'text-white/85 hover:text-white' : 'text-neutral-600 hover:text-neutral-900';
  const logoCol  = isLight ? 'text-white' : 'text-neutral-900';

  const avatarInitials = profile?.full_name
    ? profile.full_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : user?.email?.[0].toUpperCase() ?? 'U';

  return (
    <>
      <motion.header
        className={[
          'fixed top-0 left-0 right-0 z-sticky',
          scrolled
            ? 'bg-white/96 backdrop-blur-md border-b border-neutral-200 shadow-xs'
            : isDarkHero
            ? 'bg-transparent'
            : 'bg-white border-b border-neutral-100',
        ].join(' ')}
        animate={{ backgroundColor: scrolled ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0)' }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="max-w-page mx-auto container-px flex items-center h-16">

          {/* Logo */}
          <motion.button
            onClick={() => nav('home')}
            className="flex items-center gap-2.5 flex-shrink-0 mr-6"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          >
            <motion.div
              className="w-8 h-8 bg-terracotta-500 rounded-lg flex items-center justify-center flex-shrink-0"
              whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.4 } }}
            >
              <span className="font-serif text-white font-bold text-sm leading-none">N</span>
            </motion.div>
            <span className={`font-serif font-semibold text-lg transition-colors duration-300 ${logoCol}`}>NEST</span>
          </motion.button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1" aria-label="Main navigation">
            {mainLinks.map((l) => {
              const isActive = page === l.page;
              return (
                <motion.button
                  key={l.page}
                  onClick={() => nav(l.page)}
                  className={[
                    'relative text-label-md px-3 py-2 rounded-lg transition-colors duration-150',
                    isActive ? (isLight ? 'text-white' : 'text-terracotta-600') : textCol,
                  ].join(' ')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className={`absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full ${isLight ? 'bg-white' : 'bg-terracotta-500'}`}
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </motion.button>
              );
            })}

            {/* For Families dropdown */}
            <div className="relative">
              <motion.button
                onClick={() => setFamilyOpen(!familyOpen)}
                onBlur={() => setTimeout(() => setFamilyOpen(false), 150)}
                className={`flex items-center gap-1 text-label-md px-3 py-2 rounded-lg transition-colors duration-150 ${
                  ['children','teens','parents'].includes(page)
                    ? isLight ? 'text-white' : 'text-terracotta-600'
                    : textCol
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                aria-expanded={familyOpen}
                aria-haspopup="menu"
              >
                For Families
                <motion.span
                  animate={{ rotate: familyOpen ? 180 : 0 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ChevronDown size={13} />
                </motion.span>
              </motion.button>

              <AnimatePresence>
                {familyOpen && (
                  <motion.div
                    role="menu"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full left-0 mt-2 w-64 bg-white/96 backdrop-blur-xl rounded-2xl shadow-popover border border-neutral-100/80 p-2 origin-top-left"
                  >
                    {familyLinks.map((l) => (
                      <motion.button
                        key={l.page}
                        role="menuitem"
                        variants={dropdownItemVariants}
                        onClick={() => nav(l.page)}
                        className="w-full flex flex-col items-start px-4 py-3 rounded-xl hover:bg-cream-100 transition-colors text-left group"
                        whileHover={{ x: 4 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                      >
                        <span className="text-label-md text-neutral-900 group-hover:text-terracotta-600 transition-colors">{l.label}</span>
                        <span className="text-caption text-neutral-400 mt-0.5">{l.desc}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          <div className="flex-1 lg:flex-none" />

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-2">
            <motion.button
              className={`flex items-center gap-1.5 text-label-sm transition-colors ${textCol}`}
              aria-label="Language selector"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe size={14} />
              <span>EN</span>
            </motion.button>

            {user ? (
              <>
                {/* Notifications bell */}
                <motion.button
                  onClick={() => nav('dashboard')}
                  className={`relative p-2 rounded-lg transition-colors ${isLight ? 'hover:bg-white/10 text-white/70' : 'hover:bg-neutral-100 text-neutral-500'}`}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  aria-label="Notifications"
                >
                  <Bell size={16} />
                </motion.button>

                {/* Avatar/user menu */}
                <div className="relative">
                  <motion.button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    onBlur={() => setTimeout(() => setUserMenuOpen(false), 160)}
                    className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-neutral-100 transition-colors"
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="w-7 h-7 rounded-full bg-terracotta-500 flex items-center justify-center flex-shrink-0">
                      {profile?.avatar_url ? (
                        <img src={profile.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <span className="text-white text-xs font-semibold leading-none">{avatarInitials}</span>
                      )}
                    </div>
                    <ChevronDown size={12} className={isLight ? 'text-white/60' : 'text-neutral-400'} />
                  </motion.button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute top-full right-0 mt-2 w-52 bg-white rounded-2xl shadow-popover border border-neutral-100 p-2 origin-top-right"
                      >
                        <div className="px-3 py-2 border-b border-neutral-100 mb-1">
                          <p className="text-label-sm text-neutral-900 font-medium truncate">{profile?.full_name ?? 'Member'}</p>
                          <p className="text-caption text-neutral-400 truncate">{user.email}</p>
                        </div>
                        {[
                          { icon: <LayoutDashboard size={14} />, label: 'Dashboard', page: 'dashboard' as SitePage },
                          ...(isAdmin ? [{ icon: <Shield size={14} />, label: 'Admin Panel', page: 'admin' as SitePage }] : []),
                        ].map(item => (
                          <motion.button
                            key={item.label}
                            variants={dropdownItemVariants}
                            onClick={() => nav(item.page)}
                            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-neutral-50 transition-colors text-left text-label-sm text-neutral-700"
                          >
                            <span className="text-neutral-400">{item.icon}</span>
                            {item.label}
                          </motion.button>
                        ))}
                        <motion.button
                          variants={dropdownItemVariants}
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-error-50 text-error-600 transition-colors text-left text-label-sm mt-1 border-t border-neutral-100 pt-2"
                        >
                          <LogOut size={14} />
                          Sign out
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => nav('auth')}
                  className={isLight ? 'text-white/80 hover:text-white hover:bg-white/10' : ''}
                >
                  Sign in
                </Button>
                <Button
                  variant={isLight ? 'outline' : 'primary'}
                  size="sm"
                  onClick={() => nav('membership')}
                  className={isLight ? 'border-white/50 text-white hover:bg-white/10 hover:border-white' : ''}
                >
                  Join NEST
                </Button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <motion.button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${isLight ? 'hover:bg-white/10 text-white' : 'hover:bg-neutral-100 text-neutral-700'}`}
            whileTap={{ scale: 0.9 }}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span key="close" initial={{ rotate: -90, opacity: 0, scale: 0.7 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 90, opacity: 0, scale: 0.7 }} transition={{ duration: 0.18 }}>
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span key="open" initial={{ rotate: 90, opacity: 0, scale: 0.7 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: -90, opacity: 0, scale: 0.7 }} transition={{ duration: 0.18 }}>
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div key="overlay" variants={overlayVariants} initial="hidden" animate="visible" exit="exit" className="fixed inset-0 z-modal bg-neutral-900/55 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div key="drawer" role="dialog" aria-label="Navigation menu" variants={drawerVariants} initial="hidden" animate="visible" exit="exit" className="fixed top-0 right-0 bottom-0 z-modal w-80 bg-white shadow-float overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between px-5 py-5 border-b border-neutral-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-terracotta-500 rounded-lg flex items-center justify-center">
                    <span className="font-serif text-white font-bold text-xs">N</span>
                  </div>
                  <span className="font-serif font-semibold text-neutral-900">NEST</span>
                </div>
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg hover:bg-neutral-100">
                  <X size={18} className="text-neutral-500" />
                </button>
              </div>

              {user && (
                <div className="px-5 py-4 border-b border-neutral-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-terracotta-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-semibold">{avatarInitials}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-label-md text-neutral-900 font-medium truncate">{profile?.full_name ?? 'Member'}</p>
                    <p className="text-caption text-neutral-400 truncate">{user.email}</p>
                  </div>
                </div>
              )}

              <nav className="p-4 space-y-1">
                {[...mainLinks, ...familyLinks].map((l, i) => (
                  <motion.button
                    key={l.page}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.04, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => nav(l.page)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-body-md transition-colors ${'desc' in l ? 'pl-8' : ''} ${page === l.page ? 'bg-terracotta-50 text-terracotta-600 font-medium' : 'text-neutral-700 hover:bg-neutral-50'}`}
                  >
                    {l.label}
                    {'desc' in l && <span className="block text-caption text-neutral-400 mt-0.5">{l.desc}</span>}
                  </motion.button>
                ))}

                {user && (
                  <>
                    <button onClick={() => nav('dashboard')} className="w-full flex items-center gap-2 text-left px-4 py-3 rounded-xl text-body-md text-neutral-700 hover:bg-neutral-50 transition-colors">
                      <LayoutDashboard size={15} className="text-neutral-400" /> Dashboard
                    </button>
                    {isAdmin && (
                      <button onClick={() => nav('admin')} className="w-full flex items-center gap-2 text-left px-4 py-3 rounded-xl text-body-md text-neutral-700 hover:bg-neutral-50 transition-colors">
                        <Shield size={15} className="text-neutral-400" /> Admin Panel
                      </button>
                    )}
                    <button onClick={handleSignOut} className="w-full flex items-center gap-2 text-left px-4 py-3 rounded-xl text-body-md text-error-600 hover:bg-error-50 transition-colors">
                      <LogOut size={15} /> Sign out
                    </button>
                  </>
                )}

                <div className="pt-4 border-t border-neutral-100 mt-2">
                  {user ? (
                    <Button variant="primary" fullWidth onClick={() => nav('membership')}>
                      Upgrade Membership
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Button variant="primary" fullWidth onClick={() => nav('auth')}>Sign in</Button>
                      <Button variant="outline" fullWidth onClick={() => nav('membership')}>Join NEST</Button>
                    </div>
                  )}
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
