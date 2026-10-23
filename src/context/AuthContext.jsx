/**
 * AuthContext
 * ===========
 * A lightweight, demo-only authentication layer. There is no real
 * backend, no password verification, and no security guarantees here
 * — this exists purely so the Sign In / Sign Up flow feels real for a
 * demo (persists across refreshes, updates the navbar, protects the
 * fact that you're "logged in" across pages).
 *
 * DO NOT use this as-is for a real product. Real auth needs a backend
 * that hashes passwords, issues real session tokens, and validates
 * credentials server-side.
 */

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
const STORAGE_KEY = 'verijob_demo_session';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on first load
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setUser(JSON.parse(saved));
    } catch {
      /* corrupted/blocked storage, just start logged out */
    }
    setLoading(false);
  }, []);

  const signIn = ({ email }) => {
    // Demo only: no password check against a real backend.
    // Derives a display name from the email so the UI has something
    // to show without asking for a name at sign-in.
    const displayName = email.split('@')[0]
      .replace(/[._-]/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
    const demoUser = { email, name: displayName };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser));
    setUser(demoUser);
    return demoUser;
  };

  const signUp = ({ name, email }) => {
    const demoUser = { email, name: name || email.split('@')[0] };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser));
    setUser(demoUser);
    return demoUser;
  };

  const signOut = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}