import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Detector from './pages/Detector';
import HowItWorksPage from './pages/HowItWorksPage';
import TechnologyPage from './pages/TechnologyPage';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ScrollProgress from './components/ScrollProgress';

// Page transition wrapper
function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

// Hide footer on auth pages
function Layout() {
  const location = useLocation();
  const authRoutes = ['/signin', '/signup'];
  const isAuthPage = authRoutes.includes(location.pathname);

  return (
    <div className="relative min-h-screen w-full bg-[#05070f] overflow-x-hidden">
      {/* Subtle noise texture */}
      <div className="noise-overlay pointer-events-none" />

      <ScrollProgress />
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/detect" element={<PageTransition><Detector /></PageTransition>} />
          <Route path="/how-it-works" element={<PageTransition><HowItWorksPage /></PageTransition>} />
          <Route path="/technology" element={<PageTransition><TechnologyPage /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/signin" element={<PageTransition><SignIn /></PageTransition>} />
          <Route path="/signup" element={<PageTransition><SignUp /></PageTransition>} />
          {/* Fallback */}
          <Route path="*" element={
            <PageTransition>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <p className="text-6xl font-black text-[#7c3aed] mb-4">404</p>
                  <p className="text-white text-xl font-semibold mb-2">Page not found</p>
                  <a href="/" className="text-[#00d4ff] hover:text-white text-sm transition-colors">← Back to home</a>
                </div>
              </div>
            </PageTransition>
          } />
        </Routes>
      </AnimatePresence>

      {!isAuthPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
