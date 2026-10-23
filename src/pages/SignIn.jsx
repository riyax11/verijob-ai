import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // NOTE: This is a demo-only sign-in — there is no backend
    // verifying these credentials. See src/context/AuthContext.jsx.
    if (!form.email.trim() || !form.password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    signIn({ email: form.email });
    navigate('/detect');
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-16 pb-8 px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-[#7c3aed]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-[#00d4ff]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#00d4ff] flex items-center justify-center">
              <Shield size={20} className="text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-white">VERIJOB</span>
              <span className="text-xl font-bold gradient-text-cyan"> AI</span>
            </div>
          </Link>
          <h1 className="text-2xl font-black text-white">Welcome back</h1>
          <p className="text-sm text-[#94a3b8] mt-1">Sign in to your account</p>
        </div>

        <div className="glass-card rounded-2xl p-8 border border-white/8">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#94a3b8] mb-1.5" htmlFor="signin-email">
                Email Address
              </label>
              <input
                id="signin-email"
                name="email"
                type="email"
                className="custom-input w-full px-4 py-3 rounded-xl text-sm"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-[#94a3b8]" htmlFor="signin-password">
                  Password
                </label>
                <button type="button" className="text-xs text-[#7c3aed] hover:text-[#a855f7] transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="signin-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  className="custom-input w-full px-4 py-3 pr-12 rounded-xl text-sm"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#475569] hover:text-[#94a3b8] transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
                className="w-4 h-4 rounded border border-white/15 bg-white/5 accent-[#7c3aed]"
              />
              <span className="text-sm text-[#94a3b8]">Remember me</span>
            </label>

            {error && (
              <p className="text-sm text-[#ef4444] -mt-2" role="alert">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-base font-bold text-white bg-gradient-to-r from-[#7c3aed] to-[#00d4ff] hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5 transition-all duration-300"
            >
              Sign In
              <ArrowRight size={16} />
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/8" />
              <span className="text-xs text-[#475569]">or</span>
              <div className="flex-1 h-px bg-white/8" />
            </div>

            {/* Google placeholder */}
            <button
              type="button"
              onClick={() => {
                signIn({ email: 'demo.user@gmail.com' });
                navigate('/detect');
              }}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-white/10 text-sm text-[#94a3b8] hover:border-white/20 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#EA4335" d="M5.27 9.76A7.08 7.08 0 0 1 12 4.9c1.84 0 3.5.67 4.8 1.75l3.6-3.6A11.95 11.95 0 0 0 12 .94 11.99 11.99 0 0 0 1.2 7.4l4.07 2.36Z" />
                <path fill="#34A853" d="M16.04 18.01A7.08 7.08 0 0 1 12 19.1a7.08 7.08 0 0 1-6.72-4.9l-4.1 2.33A11.99 11.99 0 0 0 12 23.06a11.95 11.95 0 0 0 8.18-3.18l-4.14-1.87Z" />
                <path fill="#4A90D9" d="M20.18 19.88A11.95 11.95 0 0 0 23.06 12c0-.83-.08-1.63-.24-2.4H12v4.54h6.24a5.37 5.37 0 0 1-2.2 3.47l4.14 1.87Z" />
                <path fill="#FBBC05" d="M5.28 14.2A7.08 7.08 0 0 1 4.9 12c0-.77.12-1.52.38-2.24L1.2 7.4A11.99 11.99 0 0 0 .94 12c0 1.6.31 3.12.86 4.53l3.48-2.33Z" />
              </svg>
              Continue with Google
            </button>
          </form>

          <p className="text-center text-xs text-[#475569] mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#7c3aed] hover:text-[#a855f7] transition-colors font-medium">
              Sign up
            </Link>
          </p>
        </div>

        <p className="text-center text-[10px] text-[#475569]/70 mt-4">
          Demo mode — no real account verification. Any email/password will work.
        </p>
      </div>
    </div>
  );
}