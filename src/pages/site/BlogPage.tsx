import { useState, useEffect } from 'react';
import { ArrowRight, Clock, Tag, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { Reveal } from '../../components/motion';
import type { SitePage } from '../../components/layout/SiteHeader';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string | null;
  category: string;
  tags: string[];
  image_url: string | null;
  published_at: string | null;
  created_at: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  'family-life': 'bg-terracotta-50 text-terracotta-700',
  language: 'bg-sage-50 text-sage-700',
  belgrade: 'bg-cream-200 text-neutral-700',
  community: 'bg-neutral-100 text-neutral-600',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function readingTime(body: string | null) {
  if (!body) return '2 min';
  const words = body.split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

// ─── Post detail modal ────────────────────────────────────────────────────────
function PostModal({ post, onClose }: { post: BlogPost; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const paragraphs = (post.body ?? post.excerpt ?? '').split('\n\n').filter(Boolean);

  return (
    <motion.div className="fixed inset-0 z-modal flex items-end sm:items-center justify-center p-4 sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="absolute inset-0 bg-neutral-900/70 backdrop-blur-sm" onClick={onClose} />
      <motion.article
        className="relative bg-white rounded-3xl shadow-modal w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
        initial={{ y: 40, scale: 0.97 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 40, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
      >
        {post.image_url && (
          <div className="aspect-[16/6] overflow-hidden flex-shrink-0 relative">
            <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        )}
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-neutral-600 hover:text-neutral-900 shadow-sm z-10">
          <X size={15} />
        </button>
        <div className="overflow-y-auto flex-1 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-5">
            <span className={`text-overline text-xs px-2 py-1 rounded-full uppercase ${CATEGORY_COLORS[post.category] ?? 'bg-neutral-100 text-neutral-600'}`}>{post.category.replace('-', ' ')}</span>
            <span className="text-caption text-neutral-400 flex items-center gap-1"><Clock size={11} />{readingTime(post.body)}</span>
            {post.published_at && <span className="text-caption text-neutral-400">{formatDate(post.published_at)}</span>}
          </div>
          <h1 className="font-serif text-display-sm text-neutral-900 leading-tight mb-6">{post.title}</h1>
          <div className="prose-custom">
            {paragraphs.map((para, i) => {
              if (para.startsWith('## ')) {
                return <h2 key={i} className="font-serif text-heading-xl text-neutral-900 mt-8 mb-3">{para.replace('## ', '')}</h2>;
              }
              if (para.startsWith('# ')) {
                return <h1 key={i} className="font-serif text-display-sm text-neutral-900 mt-8 mb-4">{para.replace('# ', '')}</h1>;
              }
              return <p key={i} className="text-body-lg text-neutral-600 leading-relaxed mb-4">{para}</p>;
            })}
          </div>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-neutral-100">
              {post.tags.map(tag => (
                <span key={tag} className="text-caption text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <Tag size={10} />{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.article>
    </motion.div>
  );
}

export default function BlogPage({ setPage: _setPage }: { setPage: (p: SitePage) => void }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, body, category, tags, image_url, published_at, created_at')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .then(({ data }) => {
        if (data) setPosts(data as BlogPost[]);
        setLoading(false);
      });
  }, []);

  const categories = ['all', ...Array.from(new Set(posts.map(p => p.category)))];
  const filtered = category === 'all' ? posts : posts.filter(p => p.category === category);
  const [featured, ...rest] = filtered;

  return (
    <div className="bg-cream-100">
      {/* Hero */}
      <section className="bg-neutral-900 pt-24 pb-14">
        <div className="max-w-page mx-auto container-px">
          <Reveal>
            <p className="text-overline text-terracotta-400 uppercase mb-4">Community Blog</p>
            <h1 className="font-serif text-display-xl text-cream-100 mb-5 leading-tight">Stories from NEST.</h1>
            <p className="text-body-xl text-neutral-400 max-w-xl leading-relaxed">
              Practical guides for life in Belgrade, community voices, language tips, and updates from the space.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Category filter */}
      <div className="bg-white border-b border-neutral-200 sticky top-16 z-raised">
        <div className="max-w-page mx-auto container-px py-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {categories.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} className={`px-3 py-1.5 rounded-lg text-label-sm whitespace-nowrap transition-all ${category === cat ? 'bg-terracotta-500 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}>
              {cat === 'all' ? 'All posts' : cat.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <section className="py-14 max-w-page mx-auto container-px">
        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => <div key={i} className="bg-white rounded-2xl aspect-[4/3] skeleton" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-body-lg text-neutral-500">No posts in this category yet.</p>
          </div>
        ) : (
          <>
            {/* Featured post */}
            {featured && (
              <Reveal className="mb-10">
                <motion.article
                  className="bg-white rounded-3xl overflow-hidden shadow-card cursor-pointer group md:grid md:grid-cols-2"
                  whileHover={{ y: -4, boxShadow: '0 20px 40px -8px rgba(28,20,16,0.12)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                  onClick={() => setSelectedPost(featured)}
                >
                  <div className="aspect-[16/10] md:aspect-auto md:h-full overflow-hidden">
                    {featured.image_url ? (
                      <motion.img src={featured.image_url} alt={featured.title} className="w-full h-full object-cover" whileHover={{ scale: 1.05 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
                    ) : (
                      <div className="w-full h-full bg-cream-200" />
                    )}
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`text-overline text-xs px-2 py-1 rounded-full uppercase ${CATEGORY_COLORS[featured.category] ?? 'bg-neutral-100 text-neutral-600'}`}>{featured.category.replace('-', ' ')}</span>
                      {featured.published_at && <span className="text-caption text-neutral-400">{formatDate(featured.published_at)}</span>}
                    </div>
                    <h2 className="font-serif text-display-sm text-neutral-900 mb-4 leading-tight group-hover:text-terracotta-600 transition-colors">{featured.title}</h2>
                    {featured.excerpt && <p className="text-body-md text-neutral-500 leading-relaxed mb-6 line-clamp-3">{featured.excerpt}</p>}
                    <span className="text-label-md text-terracotta-500 flex items-center gap-1.5 group-hover:gap-3 transition-all">
                      Read article <ArrowRight size={14} />
                    </span>
                  </div>
                </motion.article>
              </Reveal>
            )}

            {/* Rest of posts */}
            {rest.length > 0 && (
              <div className="grid md:grid-cols-3 gap-6">
                {rest.map((post, i) => (
                  <Reveal key={post.id} delay={i * 80}>
                    <motion.article
                      className="bg-white rounded-2xl overflow-hidden shadow-card cursor-pointer group h-full flex flex-col"
                      whileHover={{ y: -4, boxShadow: '0 16px 32px -6px rgba(28,20,16,0.12)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                      onClick={() => setSelectedPost(post)}
                    >
                      <div className="aspect-[16/9] overflow-hidden">
                        {post.image_url ? (
                          <motion.img src={post.image_url} alt={post.title} className="w-full h-full object-cover" whileHover={{ scale: 1.07 }} transition={{ duration: 0.55 }} />
                        ) : (
                          <div className="w-full h-full bg-cream-200" />
                        )}
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`text-overline text-xs px-2 py-1 rounded-full uppercase ${CATEGORY_COLORS[post.category] ?? 'bg-neutral-100 text-neutral-600'}`}>{post.category.replace('-', ' ')}</span>
                          <span className="text-caption text-neutral-400 flex items-center gap-1"><Clock size={10} />{readingTime(post.body)}</span>
                        </div>
                        <h3 className="font-serif text-heading-lg text-neutral-900 mb-3 group-hover:text-terracotta-600 transition-colors line-clamp-2">{post.title}</h3>
                        {post.excerpt && <p className="text-body-sm text-neutral-500 leading-relaxed line-clamp-2 flex-1 mb-4">{post.excerpt}</p>}
                        <span className="text-label-sm text-terracotta-500 flex items-center gap-1 group-hover:gap-2 transition-all">Read more <ArrowRight size={12} /></span>
                      </div>
                    </motion.article>
                  </Reveal>
                ))}
              </div>
            )}
          </>
        )}
      </section>

      <AnimatePresence>
        {selectedPost && <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />}
      </AnimatePresence>
    </div>
  );
}
