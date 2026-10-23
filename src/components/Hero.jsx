import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import {
  ArrowRight, Shield, Zap, Eye, CheckCircle, AlertTriangle,
  ChevronRight, Scan
} from 'lucide-react';

// Floating particles
function Particle({ style }) {
  return (
    <div
      className="absolute w-1 h-1 rounded-full bg-[#00d4ff] opacity-30"
      style={style}
    />
  );
}

function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    style: {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${4 + Math.random() * 6}s`,
      animation: `float ${4 + Math.random() * 6}s ease-in-out ${Math.random() * 5}s infinite`,
      width: `${2 + Math.random() * 3}px`,
      height: `${2 + Math.random() * 3}px`,
      background: Math.random() > 0.5 ? 'rgba(0,212,255,0.4)' : 'rgba(168,85,247,0.4)',
    },
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <Particle key={p.id} style={p.style} />
      ))}
    </div>
  );
}

// AI Analysis card animation
function AnalysisCard() {
  const [phase, setPhase] = useState('show'); // show | scanning | result

  useEffect(() => {
    const timers = [];
    timers.push(setTimeout(() => setPhase('scanning'), 2500));
    timers.push(setTimeout(() => setPhase('result'), 5500));
    timers.push(setTimeout(() => setPhase('show'), 9000));
    const interval = setInterval(() => {
      setPhase('show');
      setTimeout(() => setPhase('scanning'), 2500);
      setTimeout(() => setPhase('result'), 5500);
    }, 9500);
    return () => { timers.forEach(clearTimeout); clearInterval(interval); };
  }, []);

  const warnings = [
    '⚠ Unrealistic salary promise',
    '⚠ Missing company details',
    '⚠ Suspicious wording detected',
    '⚠ External payment request',
  ];

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Outer glow */}
      <div className="absolute -inset-4 bg-gradient-to-br from-[#7c3aed]/20 to-[#00d4ff]/20 rounded-3xl blur-2xl" />

      <div className="relative glass-card border border-white/10 p-5 rounded-2xl overflow-hidden">
        {/* Card header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#7c3aed] to-[#00d4ff] flex items-center justify-center">
              <Scan size={12} className="text-white" />
            </div>
            <span className="text-xs font-semibold text-[#94a3b8] uppercase tracking-widest">
              {phase === 'result' ? 'Detection Complete' : 'Job Analysis'}
            </span>
          </div>
          {phase !== 'result' && (
            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${
              phase === 'scanning'
                ? 'text-[#f59e0b] border-[#f59e0b]/30 bg-[#f59e0b]/10 animate-pulse'
                : 'text-[#10b981] border-[#10b981]/30 bg-[#10b981]/10'
            }`}>
              {phase === 'scanning' ? 'SCANNING' : 'READY'}
            </span>
          )}
          {phase === 'result' && (
            <span className="text-[10px] px-2 py-0.5 rounded-full border font-medium text-[#ef4444] border-[#ef4444]/30 bg-[#ef4444]/10 animate-pulse">
              HIGH RISK
            </span>
          )}
        </div>

        {/* Job info */}
        <AnimatePresence mode="wait">
          {phase === 'show' || phase === 'scanning' ? (
            <motion.div
              key="job-info"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <div>
                <h3 className="text-base font-bold text-white">Senior Software Engineer</h3>
                <p className="text-xs text-[#94a3b8] mt-0.5">
                  <span className="text-[#475569]">Company:</span> TechNova Solutions &nbsp;·&nbsp;
                  <span className="text-[#475569]">Remote</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#475569] uppercase tracking-wide">Salary</span>
                <span className="text-sm font-semibold text-[#10b981]">₹18L – ₹25L per annum</span>
              </div>

              <div className="bg-white/3 rounded-lg p-3 border border-white/5">
                <p className="text-xs text-[#94a3b8] leading-relaxed font-mono">
                  "Work from home and earn <span className="text-[#f59e0b]">₹50,000/week</span>. No experience required. Send ₹500 registration fee to get started..."
                </p>
              </div>

              {phase === 'scanning' && (
                <div className="space-y-1.5">
                  <p className="text-xs text-[#00d4ff] animate-pulse flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-ping" />
                    Analyzing job description...
                  </p>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#7c3aed] to-[#00d4ff]"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 3, ease: 'linear' }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-[#475569] uppercase tracking-widest mb-1">Classification</p>
                  <p className="text-lg font-bold text-[#ef4444]">FAKE JOB POSTING</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-[#475569] uppercase tracking-widest mb-1">Risk Score</p>
                  <p className="text-2xl font-black text-[#ef4444]">87%</p>
                </div>
              </div>

              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#f59e0b] to-[#ef4444]"
                  initial={{ width: 0 }}
                  animate={{ width: '87%' }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>

              <div className="space-y-1.5">
                {warnings.map((w, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-xs text-[#f59e0b] flex items-center gap-1.5"
                  >
                    {w}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scan line overlay */}
        {phase === 'scanning' && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
            <div className="scan-line" />
          </div>
        )}
      </div>
    </div>
  );
}



const trustBadges = [
  { icon: <Zap size={12} />, label: 'AI Powered' },
  { icon: <Eye size={12} />, label: 'Instant Analysis' },
  { icon: <Shield size={12} />, label: 'Privacy First' },
];

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  
  const yBg = useTransform(scrollY, [0, 1000], [0, shouldReduceMotion ? 0 : 300]);
  const yBlob1 = useTransform(scrollY, [0, 1000], [0, shouldReduceMotion ? 0 : 200]);
  const yBlob2 = useTransform(scrollY, [0, 1000], [0, shouldReduceMotion ? 0 : 150]);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen flex items-center pt-16 overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background layers */}
      <motion.div className="absolute inset-0 bg-grid opacity-40" style={{ y: yBg }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/30 to-transparent" />
      <motion.div className="absolute top-1/3 left-0 w-[600px] h-[600px] blob-purple rounded-full blur-3xl pointer-events-none opacity-60" style={{ y: yBlob1 }} />
      <motion.div className="absolute top-1/2 right-0 w-[500px] h-[500px] blob-cyan rounded-full blur-3xl pointer-events-none opacity-60" style={{ y: yBlob2 }} />
      <FloatingParticles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/[0.08] mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d4ff] opacity-75" />
                <span className="relative h-2 w-2 rounded-full bg-[#00d4ff]" />
              </span>
              <span className="text-xs font-semibold text-[#00d4ff] uppercase tracking-widest">
                NLP-Powered Recruitment Safety
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-4"
            >
              <span className="text-white">Don't Let a Fake Job</span>
              <br />
              <span className="text-white">Cost You Your</span>
              <br />
              <span className="gradient-text-hero">Future.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl font-semibold text-[#00d4ff] mb-4"
            >
              Detect Fake Jobs Before You Apply.
            </motion.p>

            {/* Supporting text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-[#94a3b8] text-base sm:text-lg leading-relaxed mb-8 max-w-lg"
            >
              Verify job advertisements with AI-powered Natural Language Processing and
              machine learning. Analyze suspicious job descriptions and identify recruitment
              scams in seconds.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <Link
                to="/detect"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-[#7c3aed] to-[#00d4ff] hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                <Zap size={18} />
                Check a Job Posting
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/how-it-works"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-base font-medium text-[#94a3b8] border border-white/10 hover:border-white/20 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                Explore How It Works
                <ChevronRight size={16} />
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              {trustBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/8 text-xs text-[#94a3b8]"
                >
                  <span className="text-[#00d4ff]">{badge.icon}</span>
                  {badge.label}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: AI analysis card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Background rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-80 h-80 rounded-full border border-[#7c3aed]/10 animate-spin-slow" />
              <div className="absolute w-60 h-60 rounded-full border border-[#00d4ff]/10 animate-spin-slow-reverse" style={{ animationDuration: '12s' }} />
            </div>

            <div className="w-full max-w-sm">
              <AnalysisCard />
            </div>

            {/* Floating badges */}
            <motion.div
              className="absolute -top-4 -left-4 glass-card px-3 py-2 flex items-center gap-2"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <CheckCircle size={14} className="text-[#10b981]" />
              <span className="text-xs text-white font-medium">NLP Analysis</span>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -right-4 glass-card px-3 py-2 flex items-center gap-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <AlertTriangle size={14} className="text-[#f59e0b]" />
              <span className="text-xs text-white font-medium">Fraud Detected</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#05070f] to-transparent pointer-events-none" />
    </section>
  );
}
