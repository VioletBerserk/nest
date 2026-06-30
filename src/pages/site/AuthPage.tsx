import { useState } from 'react';
import { Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../lib/auth';
import { Button } from '../../components/ds/Button';
import type { SitePage } from '../../components/layout/SiteHeader';

type Mode = 'login' | 'signup';

export default function AuthPage({ setPage, defaultMode = 'login' }: { setPage: (p: SitePage) => void; defaultMode?: Mode }) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<Mode>(defaultMode);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({ email: '', password: '', fullName: '' });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (mode === 'login') {
      const { error } = await signIn(form.email, form.password);
      setLoading(false);
      if (error) { setError(error); return; }
      setPage('dashboard');
    } else {
      if (!form.fullName.trim()) { setError('Please enter your name.'); setLoading(false); return; }
      if (form.password.length < 6) { setError('Password must be at least 6 characters.'); setLoading(false); return; }
      const { error } = await signUp(form.email, form.password, form.fullName);
      setLoading(false);
      if (error) { setError(error); return; }
      setSuccess(true);
    }
  };

  return (
    <div className="min-h-screen bg-cream-100 flex items-center justify-center px-5 py-20">
      <div className="w-full max-w-md">
        {/* Back link */}
        <motion.button
          onClick={() => setPage('home')}
          className="flex items-center gap-1.5 text-label-sm text-neutral-500 hover:text-neutral-800 transition-colors mb-10"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ArrowLeft size={14} />
          Back to NEST
        </motion.button>

        {/* Logo */}
        <motion.div
          className="flex items-center gap-3 mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-10 h-10 bg-terracotta-500 rounded-xl flex items-center justify-center">
            <span className="font-serif text-white font-bold text-lg">N</span>
          </div>
          <span className="font-serif text-xl font-semibold text-neutral-900">NEST</span>
        </motion.div>

        {/* Card */}
        <motion.div
          className="bg-white rounded-3xl shadow-card border border-neutral-100 overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Tab switcher */}
          <div className="flex border-b border-neutral-100">
            {(['login', 'signup'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(null); setSuccess(false); }}
                className={`flex-1 py-4 text-label-md font-medium transition-colors relative ${
                  mode === m ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'
                }`}
              >
                {m === 'login' ? 'Sign in' : 'Create account'}
                {mode === m && (
                  <motion.div
                    layoutId="auth-tab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta-500"
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="p-8">
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <div className="w-14 h-14 bg-success-50 rounded-full flex items-center justify-center mx-auto mb-5">
                    <svg className="w-7 h-7 text-success-500" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h2 className="font-serif text-heading-xl text-neutral-900 mb-2">Welcome to NEST!</h2>
                  <p className="text-body-sm text-neutral-500 mb-6">Your account is ready. Sign in to access your dashboard.</p>
                  <Button onClick={() => { setMode('login'); setSuccess(false); }} iconRight={<ArrowRight />}>
                    Sign in now
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key={mode}
                  initial={{ opacity: 0, x: mode === 'login' ? -16 : 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: mode === 'login' ? 16 : -16 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {mode === 'signup' && (
                    <div>
                      <label className="block text-label-sm text-neutral-700 mb-1.5">Full name</label>
                      <input
                        type="text"
                        value={form.fullName}
                        onChange={set('fullName')}
                        placeholder="Anna Sorokina"
                        required
                        className="w-full h-11 px-4 rounded-xl border border-neutral-200 bg-neutral-50 text-body-md text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent transition"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-label-sm text-neutral-700 mb-1.5">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={set('email')}
                      placeholder="you@example.com"
                      required
                      autoComplete="email"
                      className="w-full h-11 px-4 rounded-xl border border-neutral-200 bg-neutral-50 text-body-md text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-label-sm text-neutral-700 mb-1.5">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={form.password}
                        onChange={set('password')}
                        placeholder={mode === 'signup' ? 'At least 6 characters' : '••••••••'}
                        required
                        autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                        className="w-full h-11 pl-4 pr-11 rounded-xl border border-neutral-200 bg-neutral-50 text-body-md text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-body-sm text-error-600 bg-error-50 border border-error-100 rounded-xl px-4 py-3"
                    >
                      {error}
                    </motion.p>
                  )}

                  <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    loading={loading}
                    iconRight={!loading ? <ArrowRight /> : undefined}
                    className="mt-2"
                  >
                    {mode === 'login' ? 'Sign in' : 'Create account'}
                  </Button>

                  {mode === 'signup' && (
                    <p className="text-caption text-neutral-400 text-center leading-relaxed">
                      By creating an account you agree to our terms and privacy policy.
                    </p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
