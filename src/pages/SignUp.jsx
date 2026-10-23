import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const roles = ['Job Seeker', 'HR Professional', 'Recruiter', 'Student', 'Other'];

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', mobile: '', password: '', confirm: '', role: '',
  });
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert('Passwords do not match.');
      return;
    }
    // NOTE: This is a demo-only sign-up — there is no backend storing
    // this account. See src/context/AuthContext.jsx.
    signUp({ name: form.name, email: form.email });
    navigate('/detect');
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-16 pb-8 px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-[#7c3aed]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-[#00d4ff]/8 rounded-full blur-3xl pointer-events-none" />

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
          <h1 className="text-2xl font-black text-white">Create your account</h1>
          <p className="text-sm text-[#94a3b8] mt-1">Start detecting fake jobs today</p>
        </div>

        <div className="glass-card rounded-2xl p-8 border border-white/8">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-[#94a3b8] mb-1.5" htmlFor="su-name">Full Name</label>
              <input id="su-name" name="name" type="text"
                className="custom-input w-full px-4 py-3 rounded-xl text-sm"
                placeholder="John Doe" value={form.name} onChange={handleChange} required />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#94a3b8] mb-1.5" htmlFor="su-email">Email Address</label>
              <input id="su-email" name="email" type="email"
                className="custom-input w-full px-4 py-3 rounded-xl text-sm"
                placeholder="you@example.com" value={form.email} onChange={handleChange} required />
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-sm font-medium text-[#94a3b8] mb-1.5" htmlFor="su-mobile">Mobile Number</label>
              <input id="su-mobile" name="mobile" type="tel"
                className="custom-input w-full px-4 py-3 rounded-xl text-sm"
                placeholder="+91 9876543210" value={form.mobile} onChange={handleChange} />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-[#94a3b8] mb-1.5" htmlFor="su-role">Role</label>
              <select id="su-role" name="role"
                className="custom-select custom-input w-full px-4 py-3 rounded-xl text-sm"
                value={form.role} onChange={handleChange}>
                <option value="" className="bg-[#05070f]">Select your role</option>
                {roles.map((r) => <option key={r} value={r} className="bg-[#05070f]">{r}</option>)}
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#94a3b8] mb-1.5" htmlFor="su-password">Password</label>
              <div className="relative">
                <input id="su-password" name="password" type={showPassword ? 'text' : 'password'}
                  className="custom-input w-full px-4 py-3 pr-12 rounded-xl text-sm"
                  placeholder="Min 8 characters" value={form.password} onChange={handleChange} required />
                <button type="button" onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#475569] hover:text-[#94a3b8] transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-sm font-medium text-[#94a3b8] mb-1.5" htmlFor="su-confirm">Confirm Password</label>
              <div className="relative">
                <input id="su-confirm" name="confirm" type={showConfirm ? 'text' : 'password'}
                  className="custom-input w-full px-4 py-3 pr-12 rounded-xl text-sm"
                  placeholder="Repeat password" value={form.confirm} onChange={handleChange} required />
                <button type="button" onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#475569] hover:text-[#94a3b8] transition-colors"
                  aria-label={showConfirm ? 'Hide' : 'Show'}>
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {form.confirm && form.password !== form.confirm && (
                <p className="text-xs text-[#ef4444] mt-1">Passwords do not match</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!form.email || !form.password || form.password !== form.confirm}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-base font-bold text-white bg-gradient-to-r from-[#7c3aed] to-[#00d4ff] disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5 transition-all duration-300 mt-2"
            >
              Create Account
              <ArrowRight size={16} />
            </button>
          </form>

          <p className="text-center text-xs text-[#475569] mt-5">
            Already have an account?{' '}
            <Link to="/signin" className="text-[#7c3aed] hover:text-[#a855f7] transition-colors font-medium">
              Sign in
            </Link>
          </p>
        </div>

        <p className="text-center text-[10px] text-[#475569]/70 mt-4">
          Demo mode — no real account is created or stored on a server.
        </p>
      </div>
    </div>
  );
}