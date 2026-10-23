import { Link } from 'react-router-dom';
import { ScrollReveal, RevealItem } from './ScrollReveal';
import { ArrowRight, Zap } from 'lucide-react';

export default function CTA() {
  return (
    <section className="relative w-full py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed]/20 via-[#05070f] to-[#00d4ff]/15" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      {/* Glowing orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-[#7c3aed]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-[#00d4ff]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Particle dots */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${10 + (i * 7.5)}%`,
            top: `${20 + (i % 4) * 20}%`,
            background: i % 2 === 0 ? 'rgba(0,212,255,0.4)' : 'rgba(168,85,247,0.4)',
            animation: `float ${3 + (i % 3)}s ease-in-out ${i * 0.3}s infinite`,
          }}
        />
      ))}

      <ScrollReveal className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <RevealItem>
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#00d4ff]/25 bg-[#00d4ff]/8 text-xs font-semibold text-[#00d4ff] uppercase tracking-widest mb-6">
            Get Started Today
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Before You Apply,
            <br />
            <span className="gradient-text-hero">Verify.</span>
          </h2>

          <p className="text-[#94a3b8] text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Paste a job description and let AI analyze the signals that could indicate a
            fraudulent posting. It takes seconds.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/detect"
              className="flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-bold text-white bg-gradient-to-r from-[#7c3aed] to-[#00d4ff] hover:shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-1 transition-all duration-300"
            >
              <Zap size={20} />
              Analyze a Job Posting
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/how-it-works"
              className="flex items-center gap-2 px-8 py-4 rounded-xl text-base font-medium text-[#94a3b8] border border-white/10 hover:border-white/25 hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </RevealItem>
      </ScrollReveal>
    </section>
  );
}
