import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X, Menu, Zap, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Detection', to: '/detect' },
  { label: 'Technology', to: '/technology' },
  { label: 'About', to: '/about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    setUserMenuOpen(false);
    setMenuOpen(false);
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'navbar-blur bg-[rgba(5,7,15,0.85)] border-b border-white/5 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group" aria-label="VeriJob AI Home">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#00d4ff] flex items-center justify-center group-hover:shadow-lg group-hover:shadow-purple-500/30 transition-shadow duration-300">
                  <Shield size={18} className="text-white" />
                </div>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#10b981] rounded-full border-2 border-[#05070f] animate-pulse" />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight">VERIJOB</span>
                <span className="text-lg font-bold bg-gradient-to-r from-[#00d4ff] to-[#a855f7] bg-clip-text text-transparent"> AI</span>
                <p className="text-[10px] text-[#475569] leading-none tracking-widest uppercase">AI-Powered Job Safety</p>
              </div>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname === link.to
                      ? 'text-[#00d4ff] bg-[rgba(0,212,255,0.08)]'
                      : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="hidden md:flex items-center gap-3">
              {/* AI Status indicator */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#10b981]/30 bg-[#10b981]/10">
                <span className="status-dot" />
                <span className="text-[11px] text-[#10b981] font-medium whitespace-nowrap">AI Detection Online</span>
              </div>

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen((v) => !v)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-[#94a3b8] hover:text-white hover:bg-white/5 transition-all duration-200"
                    aria-expanded={userMenuOpen}
                    aria-label="Account menu"
                  >
                    <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#00d4ff] flex items-center justify-center text-xs font-bold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                    <span className="max-w-[110px] truncate">{user.name}</span>
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setUserMenuOpen(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-white/10 bg-[#080d1a] shadow-xl shadow-black/40 z-50 overflow-hidden"
                        >
                          <div className="px-4 py-3 border-b border-white/8">
                            <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                            <p className="text-xs text-[#475569] truncate">{user.email}</p>
                          </div>
                          <button
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-[#94a3b8] hover:text-white hover:bg-white/5 transition-colors duration-200"
                          >
                            <LogOut size={14} />
                            Sign Out
                          </button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to="/signin"
                  className="px-4 py-2 text-sm font-medium text-[#94a3b8] hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5"
                >
                  Sign In
                </Link>
              )}
              <Link
                to="/detect"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-[#7c3aed] to-[#00d4ff] hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5 transition-all duration-200"
              >
                <Zap size={14} />
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg border border-white/10 text-[#94a3b8] hover:text-white hover:border-white/20 transition-all duration-200"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-[#080d1a] border-l border-white/8 md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#00d4ff] flex items-center justify-center">
                    <Shield size={14} className="text-white" />
                  </div>
                  <span className="font-bold text-white text-sm">VERIJOB AI</span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-1.5 rounded-lg text-[#94a3b8] hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex flex-col p-4 gap-1 flex-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      to={link.to}
                      className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        location.pathname === link.to
                          ? 'text-[#00d4ff] bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.2)]'
                          : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="p-4 border-t border-white/8 space-y-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-[#10b981]/30 bg-[#10b981]/10 justify-center">
                  <span className="status-dot" />
                  <span className="text-xs text-[#10b981] font-medium">AI Detection Online</span>
                </div>
                {user ? (
                  <div className="rounded-xl border border-white/10 overflow-hidden">
                    <div className="flex items-center gap-3 px-4 py-3 bg-white/5">
                      <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#00d4ff] flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                        <p className="text-xs text-[#475569] truncate">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm text-[#94a3b8] hover:text-white hover:bg-white/5 transition-colors duration-200"
                    >
                      <LogOut size={14} />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/signin"
                    className="block w-full text-center px-4 py-2.5 text-sm font-medium text-[#94a3b8] border border-white/10 rounded-xl hover:border-white/20 hover:text-white transition-all duration-200"
                  >
                    Sign In
                  </Link>
                )}
                <Link
                  to="/detect"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#7c3aed] to-[#00d4ff]"
                >
                  <Zap size={14} />
                  Get Started
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}