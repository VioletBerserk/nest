import { useState, useEffect } from 'react';
import { ArrowRight, Coffee, Users, Wifi, MapPin, Clock, Palette, Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/ds/Button';
import { Reveal, ImageReveal, HeroReveal } from '../../components/motion';
import type { SitePage } from '../../components/layout/SiteHeader';

const zones = [
  { name: 'The Café', icon: <Coffee />, desc: 'Long community tables, counter stools, and a quiet nook for focused work. Specialty coffee programme, Eastern European pastries, and a menu that takes children seriously.', detail: '40 seats · Quiet zone available' },
  { name: "Children's Studio", icon: <Users />, desc: 'Dedicated space for ages 6–12. Art materials, a small library of Russian-language books, and tables at the right height. Designed with an educator.', detail: 'Ages 6–12 · Supervised programmes' },
  { name: 'Teen Creative Lab', icon: <Palette />, desc: 'A real creative studio for teenagers. Photography equipment, a design workstation, a recording corner, and sofas. No adults hovering.', detail: 'Ages 13–18 · Independent access' },
  { name: 'Coworking Corner', icon: <Wifi />, desc: 'Fast Wi-Fi, power at every seat, monitor on request. A focused zone in the café for parents who want to work while the kids are in a programme.', detail: 'High-speed Wi-Fi · Monitor available' },
  { name: 'Event Space', icon: <MapPin />, desc: 'A flexible area that transforms for evening dinners, workshops, film screenings, or private celebrations. Capacity 40 seated, 60 standing.', detail: '40 seated · 60 standing · AV included' },
  { name: 'The Garden', icon: <Sparkles />, desc: 'A small outdoor terrace for warm months. The neighbourhood comes alive here on summer evenings.', detail: 'Seasonal · 25 seats' },
];

const galleryPhotos = [
  { src: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&dpr=1', alt: 'Main space', span: 'col-span-2' },
  { src: 'https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=600&h=700&dpr=1', alt: 'Café counter' },
  { src: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=600&h=700&dpr=1', alt: 'Coffee' },
  { src: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=600&h=500&dpr=1', alt: 'Children studio' },
  { src: 'https://images.pexels.com/photos/1036808/pexels-photo-1036808.jpeg?auto=compress&cs=tinysrgb&w=600&h=500&dpr=1', alt: 'Teen lab' },
  { src: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=1200&h=500&dpr=1', alt: 'Event space', span: 'col-span-2' },
];

const infoRows = [
  { label: 'Opening hours', value: 'Mon–Fri 9:00–20:00 · Sat–Sun 9:00–19:00' },
  { label: 'Location', value: 'Savamala Quarter, Belgrade (near Brankov Most)' },
  { label: 'Parking', value: 'Street parking on Karadjordjeva. Free after 18:00.' },
  { label: 'Accessibility', value: 'Ground floor, step-free entrance, accessible bathroom.' },
  { label: 'Languages', value: 'Russian, English, Serbian — all staff speak all three.' },
  { label: 'Wi-Fi', value: 'Available throughout. Password at the counter.' },
];

function GalleryLightbox({ photos, initialIndex, onClose }: { photos: typeof galleryPhotos; initialIndex: number; onClose: () => void }) {
  const [index, setIndex] = useState(initialIndex);
  const prev = () => setIndex((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setIndex((i) => (i + 1) % photos.length);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-modal bg-black/92 backdrop-blur-xl flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      {/* Close */}
      <motion.button
        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-10"
        onClick={onClose}
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        aria-label="Close gallery"
      >
        <X size={18} />
      </motion.button>

      {/* Prev */}
      <motion.button
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-10"
        onClick={(e) => { e.stopPropagation(); prev(); }}
        whileHover={{ scale: 1.08, x: -2 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        aria-label="Previous photo"
      >
        <ChevronLeft size={22} />
      </motion.button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={photos[index].src}
          alt={photos[index].alt}
          className="max-w-[90vw] max-h-[85vh] object-contain rounded-2xl select-none"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          draggable={false}
        />
      </AnimatePresence>

      {/* Next */}
      <motion.button
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-10"
        onClick={(e) => { e.stopPropagation(); next(); }}
        whileHover={{ scale: 1.08, x: 2 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        aria-label="Next photo"
      >
        <ChevronRight size={22} />
      </motion.button>

      {/* Counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
        {photos.map((_, i) => (
          <motion.button
            key={i}
            className="rounded-full bg-white/40 hover:bg-white/80"
            animate={{ width: i === index ? 20 : 6, height: 6, backgroundColor: i === index ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)' }}
            transition={{ duration: 0.25 }}
            onClick={(e) => { e.stopPropagation(); setIndex(i); }}
            aria-label={`Photo ${i + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
}

// Gallery lightbox — keyboard navigation

export default function SpacePage({ setPage }: { setPage: (p: SitePage) => void }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className="bg-cream-100">
      {/* Hero */}
      <section className="relative h-[70vh] flex items-end pb-20 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"
          alt="NEST interior"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
        <div className="relative max-w-page mx-auto container-px">
          <HeroReveal className="max-w-2xl">
            <p className="text-overline text-terracotta-300 uppercase mb-4">The Space</p>
            <h1 className="font-serif text-display-xl text-white leading-tight mb-5">
              Designed to feel like the second kind of home.
            </h1>
            <p className="text-body-xl text-white/70 max-w-lg leading-relaxed">
              A former Savamala printing studio transformed into six distinct zones — each one built around
              the people who would fill it.
            </p>
          </HeroReveal>
        </div>
      </section>

      {/* Design philosophy */}
      <section className="py-24">
        <div className="max-w-page mx-auto container-px grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <p className="text-overline text-terracotta-500 uppercase mb-5">Design Philosophy</p>
            <h2 className="font-serif text-display-md text-neutral-900 mb-6 leading-tight">
              If Apple designed a family club.
            </h2>
            <p className="text-body-lg text-neutral-600 leading-relaxed mb-5">
              The NEST interior was designed by borrowing from the best: Apple's precision, Airbnb's
              warmth, Muji's restraint, and Scandinavian residential design.
            </p>
            <p className="text-body-lg text-neutral-600 leading-relaxed mb-8">
              Warm natural materials. Considered lighting. Nothing that doesn't need to be there. Every
              surface is clean but every corner is human.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[['Warm oak', 'Floors & furniture'], ['Linen + ceramic', 'Surfaces'], ['Warm cream + terracotta', 'Colour palette']].map(([name, desc], i) => (
                <motion.div
                  key={name}
                  className="bg-cream-200 rounded-xl p-4 text-center"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -3, boxShadow: '0 8px 20px -4px rgba(28,20,16,0.1)' }}
                >
                  <p className="text-label-sm text-neutral-700 font-medium mb-1">{name}</p>
                  <p className="text-caption text-neutral-500">{desc}</p>
                </motion.div>
              ))}
            </div>
          </Reveal>
          <ImageReveal delay={150}>
            <img
              src="https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&dpr=1"
              alt="Café interior"
              className="rounded-3xl w-full object-cover aspect-[4/3]"
            />
          </ImageReveal>
        </div>
      </section>

      {/* Zones */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-page mx-auto container-px">
          <Reveal className="text-center mb-14">
            <p className="text-overline text-terracotta-400 uppercase mb-4">Six Zones</p>
            <h2 className="font-serif text-display-md text-cream-100 mb-4">Every part has a purpose.</h2>
            <p className="text-body-lg text-neutral-400 max-w-xl mx-auto">From the café counter to the teen studio to the evening event space — each zone is designed for a specific kind of moment.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {zones.map((z, i) => (
              <Reveal key={z.name} delay={i * 60}>
                <motion.div
                  className="border border-neutral-700 rounded-2xl p-6 cursor-default group"
                  whileHover={{
                    borderColor: 'rgba(196,113,90,0.5)',
                    y: -4,
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    boxShadow: '0 12px 32px -6px rgba(0,0,0,0.35)',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                >
                  <motion.div
                    className="w-10 h-10 rounded-xl bg-neutral-800 text-neutral-400 flex items-center justify-center mb-4 [&>svg]:size-5"
                    whileHover={{ backgroundColor: 'rgba(196,113,90,1)', color: '#fff' }}
                    transition={{ duration: 0.2 }}
                  >
                    {z.icon}
                  </motion.div>
                  <h3 className="font-serif text-heading-lg text-cream-100 mb-2">{z.name}</h3>
                  <p className="text-body-sm text-neutral-400 leading-relaxed mb-4">{z.desc}</p>
                  <p className="text-caption text-terracotta-400 border-t border-neutral-700 pt-3 mt-3">{z.detail}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24">
        <div className="max-w-page mx-auto container-px">
          <Reveal className="mb-10">
            <p className="text-overline text-terracotta-500 uppercase mb-4">Gallery</p>
            <h2 className="font-serif text-display-md text-neutral-900">See the space.</h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {galleryPhotos.map((p, i) => (
              <motion.div
                key={i}
                className={`relative overflow-hidden rounded-2xl cursor-pointer group ${p.span ?? ''}`}
                style={{ aspectRatio: p.span ? '16/7' : '4/3' }}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-6% 0px' }}
                transition={{ delay: i * 0.06, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setLightboxIndex(i)}
              >
                <motion.img
                  src={p.src}
                  alt={p.alt}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.09 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center"
                  whileHover={{ backgroundColor: 'rgba(0,0,0,0.32)' }}
                  transition={{ duration: 0.25 }}
                >
                  <motion.span
                    className="text-white text-label-md font-medium opacity-0 group-hover:opacity-100 border border-white/60 rounded-full px-4 py-1.5 backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    View
                  </motion.span>
                </motion.div>
              </motion.div>
            ))}
          </div>
          <p className="text-caption text-neutral-400 text-center mt-5">Click any photo to open gallery</p>
        </div>
      </section>

      {/* Practical info + CTA */}
      <section className="py-20 bg-cream-200">
        <div className="max-w-page mx-auto container-px">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <Reveal>
              <p className="text-overline text-terracotta-500 uppercase mb-5">Practical Information</p>
              <h2 className="font-serif text-display-sm text-neutral-900 mb-6">Plan your visit.</h2>
              <div className="space-y-0">
                {infoRows.map((r, i) => (
                  <motion.div
                    key={r.label}
                    className="flex gap-4 border-b border-cream-300 py-3.5"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="text-label-sm text-neutral-500 w-28 sm:w-36 flex-shrink-0">{r.label}</span>
                    <span className="text-body-sm text-neutral-700">{r.value}</span>
                  </motion.div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={100}>
              <motion.div
                className="bg-white rounded-3xl p-8 shadow-card text-center"
                whileHover={{ y: -4, boxShadow: '0 20px 40px -8px rgba(28,20,16,0.12)' }}
                transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              >
                <h3 className="font-serif text-display-sm text-neutral-900 mb-4">Want to hire the space?</h3>
                <p className="text-body-md text-neutral-500 leading-relaxed mb-6">
                  Birthday parties, team events, photography sessions, private dinners. The NEST event space
                  is available for private hire Monday through Sunday.
                </p>
                <Button size="lg" fullWidth onClick={() => setPage('contact')} iconRight={<ArrowRight />}>
                  Enquire about hire
                </Button>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <GalleryLightbox
            photos={galleryPhotos}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
