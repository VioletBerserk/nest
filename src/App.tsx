import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BrandStory, MissionVision, BrandPersonality, ToneOfVoice,
  EmotionalPositioning, CustomerPersonas, UserJourneys,
  InformationArchitecture, FunctionalRequirements, CaféConcept,
  MembershipConcept, EventIdeas, DesignPhilosophy, Monetization,
  Roadmap, TechArchitecture, AIIdeas, SEOStrategy,
} from './components/sections';
import DesignSystemPage from './pages/DesignSystemPage';
import { SiteHeader, type SitePage } from './components/layout/SiteHeader';
import { SiteFooter } from './components/layout/SiteFooter';
import HomePage from './pages/site/HomePage';
import AboutPage from './pages/site/AboutPage';
import ChildrenPage from './pages/site/ChildrenPage';
import TeensPage from './pages/site/TeensPage';
import ParentsPage from './pages/site/ParentsPage';
import EventsPage from './pages/site/EventsPage';
import MembershipPage from './pages/site/MembershipPage';
import SpacePage from './pages/site/SpacePage';
import ContactPage from './pages/site/ContactPage';
import AuthPage from './pages/site/AuthPage';
import DashboardPage from './pages/site/DashboardPage';
import AdminPage from './pages/site/AdminPage';
import BlogPage from './pages/site/BlogPage';
import ConciergePage from './pages/site/ConciergePage';

const SITE_PAGES: SitePage[] = ['home', 'about', 'children', 'teens', 'parents', 'events', 'membership', 'space', 'community', 'blog', 'contact', 'auth', 'dashboard', 'admin', 'concierge'];

const briefNav = [
  { id: 'brand-story', label: 'Brand Story' },
  { id: 'mission',     label: 'Mission' },
  { id: 'personality', label: 'Personality' },
  { id: 'personas',    label: 'Personas' },
  { id: 'journeys',    label: 'Journeys' },
  { id: 'ia',          label: 'Architecture' },
  { id: 'membership',  label: 'Membership' },
  { id: 'roadmap',     label: 'Roadmap' },
];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
}

function DevHeader({ page, setPage }: { page: SitePage; setPage: (p: SitePage) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = (p: SitePage) => {
    setPage(p);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-sticky transition-all duration-300 ${scrolled || page === 'design-system' ? 'bg-cream-100/95 backdrop-blur-md border-b border-neutral-200 shadow-xs' : 'bg-transparent'}`}>
        <div className="max-w-page mx-auto container-px flex items-center h-14 gap-3">
          <button onClick={() => go('brief')} className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 bg-terracotta-500 rounded-lg flex items-center justify-center">
              <span className="font-serif text-white font-bold text-sm">N</span>
            </div>
            <span className="font-serif font-semibold text-neutral-900">NEST</span>
          </button>
          <div className="hidden sm:flex items-center bg-neutral-100 rounded-lg p-1 ml-2">
            <button onClick={() => go('brief')} className={`text-label-sm px-3 py-1.5 rounded-md transition-all ${page === 'brief' ? 'bg-white shadow-xs text-neutral-900 font-medium' : 'text-neutral-500 hover:text-neutral-700'}`}>Brief</button>
            <button onClick={() => go('design-system')} className={`text-label-sm px-3 py-1.5 rounded-md transition-all ${page === 'design-system' ? 'bg-white shadow-xs text-neutral-900 font-medium' : 'text-neutral-500 hover:text-neutral-700'}`}>Design System</button>
            <button onClick={() => go('home')} className={`text-label-sm px-3 py-1.5 rounded-md transition-all ${SITE_PAGES.includes(page) ? 'bg-terracotta-500 text-white font-medium' : 'text-neutral-500 hover:text-neutral-700'}`}>Website →</button>
          </div>
          {page === 'brief' && (
            <div className="hidden xl:flex items-center gap-0.5 ml-2">
              {briefNav.slice(0, 6).map((n) => (
                <button key={n.id} onClick={() => scrollTo(n.id)} className="text-label-sm px-3 py-1.5 rounded-lg text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 transition-colors">{n.label}</button>
              ))}
            </div>
          )}
          <div className="flex-1" />
          <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors">
            {menuOpen ? <X size={18} className="text-neutral-700" /> : <Menu size={18} className="text-neutral-700" />}
          </button>
        </div>
      </header>
      {menuOpen && (
        <div className="fixed inset-0 z-overlay" onClick={() => setMenuOpen(false)}>
          <div className="absolute top-14 left-0 right-0 bg-cream-50 border-b border-neutral-200 shadow-xl p-4 space-y-1" onClick={(e) => e.stopPropagation()}>
            {(['brief', 'design-system', 'home'] as SitePage[]).map((p) => (
              <button key={p} onClick={() => go(p)} className={`w-full text-left px-4 py-3 rounded-xl text-label-md transition-colors ${page === p ? 'bg-terracotta-50 text-terracotta-600 font-semibold' : 'text-neutral-700 hover:bg-neutral-100'}`}>
                {p === 'brief' ? 'Product Brief' : p === 'design-system' ? 'Design System' : 'Website Preview'}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function BriefPage({ setPage }: { setPage: (p: SitePage) => void }) {
  return (
    <div className="bg-cream-100 min-h-screen">
      <div className="min-h-screen flex flex-col justify-center bg-neutral-900 pt-14 pb-16 container-px">
        <div className="max-w-4xl mx-auto w-full">
          <div className="mb-14">
            <div className="w-16 h-16 bg-terracotta-500 rounded-2xl flex items-center justify-center mb-8">
              <span className="font-serif text-white font-bold text-2xl">N</span>
            </div>
            <p className="text-overline text-terracotta-400 uppercase mb-5">Product Design Brief · Belgrade 2024</p>
            <h1 className="font-serif text-display-2xl text-cream-100 leading-none mb-5">NEST</h1>
            <p className="font-serif text-display-sm italic text-neutral-400 mb-8 leading-snug">Find Your Nest.</p>
            <p className="text-body-xl text-neutral-500 max-w-xl leading-relaxed">A premium community café and creative club for Russian-speaking families in Belgrade.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {[{n:'18',l:'Sections'},{n:'4',l:'Personas'},{n:'4',l:'Phases'},{n:'6',l:'Revenue streams'}].map((s) => (
              <div key={s.l} className="border border-neutral-700 rounded-xl p-4">
                <p className="font-serif text-display-sm text-cream-200 mb-0.5">{s.n}</p>
                <p className="text-caption text-neutral-500">{s.l}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => scrollTo('brand-story')} className="text-label-md text-terracotta-400 border border-terracotta-500/40 rounded-full px-5 py-2 hover:bg-terracotta-500/10 transition-colors">Read the Brief ↓</button>
            <button onClick={() => { setPage('design-system'); window.scrollTo({ top: 0 }); }} className="text-label-md text-neutral-400 border border-neutral-700 rounded-full px-5 py-2 hover:border-neutral-500 hover:text-neutral-200 transition-colors">View Design System →</button>
            <button onClick={() => { setPage('home'); window.scrollTo({ top: 0 }); }} className="text-label-md text-white bg-terracotta-500 hover:bg-terracotta-600 rounded-full px-5 py-2 transition-colors">Preview Website →</button>
          </div>
        </div>
      </div>
      <main className="max-w-4xl mx-auto container-px">
        <BrandStory /><MissionVision /><BrandPersonality /><ToneOfVoice />
        <EmotionalPositioning /><CustomerPersonas /><UserJourneys />
        <InformationArchitecture /><FunctionalRequirements /><CaféConcept />
        <MembershipConcept /><EventIdeas /><DesignPhilosophy /><Monetization />
        <Roadmap /><TechArchitecture /><AIIdeas /><SEOStrategy />
      </main>
      <footer className="bg-neutral-900 py-16 container-px">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-12 h-12 bg-terracotta-500 rounded-xl flex items-center justify-center mx-auto mb-6"><span className="font-serif text-white font-bold text-xl">N</span></div>
          <h2 className="font-serif text-display-sm text-cream-200 mb-3">NEST</h2>
          <p className="font-serif italic text-neutral-400 text-body-xl mb-8">A home away from home.</p>
          <div className="mt-10 pt-8 border-t border-neutral-800"><p className="text-overline text-neutral-700 uppercase">Belgrade · Serbia · 2024</p></div>
        </div>
      </footer>
    </div>
  );
}

const pageTransition = {
  initial: { opacity: 0, y: 16, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -8, filter: 'blur(2px)', transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } },
};

function SiteLayout({ page, setPage }: { page: SitePage; setPage: (p: SitePage) => void }) {
  const renderPage = () => {
    switch (page) {
      case 'home':       return <HomePage setPage={setPage} />;
      case 'about':      return <AboutPage setPage={setPage} />;
      case 'children':   return <ChildrenPage setPage={setPage} />;
      case 'teens':      return <TeensPage setPage={setPage} />;
      case 'parents':    return <ParentsPage setPage={setPage} />;
      case 'events':     return <EventsPage setPage={setPage} />;
      case 'membership': return <MembershipPage setPage={setPage} />;
      case 'space':      return <SpacePage setPage={setPage} />;
      case 'contact':    return <ContactPage setPage={setPage} />;
      case 'community':  return <CommunityPage setPage={setPage} />;
      case 'blog':       return <BlogPage setPage={setPage} />;
      case 'auth':       return <AuthPage setPage={setPage} />;
      case 'dashboard':  return <DashboardPage setPage={setPage} />;
      case 'admin':      return <AdminPage setPage={setPage} />;
      case 'concierge':  return <ConciergePage setPage={setPage} />;
      default:           return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-cream-100">
      <SiteHeader page={page} setPage={setPage} />
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          className={page === 'home' || page === 'auth' ? '' : 'pt-16'}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
      <SiteFooter setPage={setPage} />
    </div>
  );
}

function CommunityPage({ setPage }: { setPage: (p: SitePage) => void }) {
  return (
    <div className="bg-cream-100">
      <section className="pt-24 pb-20 bg-neutral-900">
        <div className="max-w-page mx-auto container-px">
          <p className="text-overline text-terracotta-400 uppercase mb-4">Community</p>
          <h1 className="font-serif text-display-xl text-cream-100 mb-5">Stories from NEST.</h1>
          <p className="text-body-xl text-neutral-400 max-w-xl leading-relaxed">Community voices, practical guides for life in Belgrade, and updates from the space.</p>
        </div>
      </section>
      <section className="py-20 max-w-page mx-auto container-px">
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {[
            { tag: 'Family Life', title: 'Moving to Belgrade with Kids: What No One Tells You', date: 'June 2024', img: 'https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1' },
            { tag: 'Language', title: 'Keeping Russian Alive: 8 Things That Actually Work', date: 'May 2024', img: 'https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1' },
            { tag: 'Belgrade', title: 'The Best Russian-Friendly Services in Savamala', date: 'April 2024', img: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1' },
          ].map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl overflow-hidden shadow-card cursor-pointer group"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <span className="text-overline text-terracotta-500 uppercase block mb-2">{post.tag}</span>
                <h3 className="font-serif text-heading-lg text-neutral-900 mb-2 group-hover:text-terracotta-600 transition-colors">{post.title}</h3>
                <p className="text-caption text-neutral-400">{post.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <button onClick={() => setPage('contact')} className="inline-flex items-center gap-2 text-label-md text-terracotta-500 border border-terracotta-200 hover:border-terracotta-400 px-6 py-3 rounded-xl transition-colors">
            Get in touch to contribute a story
          </button>
        </div>
      </section>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState<SitePage>('home');

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [page]);

  if (page === 'brief') {
    return (
      <>
        <DevHeader page={page} setPage={setPage} />
        <BriefPage setPage={setPage} />
      </>
    );
  }

  if (page === 'design-system') {
    return (
      <>
        <DevHeader page={page} setPage={setPage} />
        <div className="pt-14">
          <DesignSystemPage />
        </div>
      </>
    );
  }

  return <SiteLayout page={page} setPage={setPage} />;
}
