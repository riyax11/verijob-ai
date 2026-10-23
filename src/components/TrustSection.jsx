import { ScrollReveal, RevealItem } from './ScrollReveal';
import { Shield, CheckCircle } from 'lucide-react';

const trustPoints = [
  'Detect suspicious postings before applying',
  'Reduce recruitment scam exposure',
  'Identify unusual job advertisement patterns',
  'Analyze job descriptions quickly',
  'Make informed, data-backed decisions',
];

export default function TrustSection() {
  return (
    <section className="relative w-full py-24 overflow-hidden">
      <div className="absolute inset-0 bg-dot-grid opacity-15" />

      <ScrollReveal className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Shield visual */}
          <RevealItem className="flex justify-center">
            <div className="relative">
              {/* Outer ring */}
              <div className="absolute -inset-12 rounded-full border border-[#10b981]/10 animate-spin-slow" />
              <div className="absolute -inset-8 rounded-full border border-[#00d4ff]/10 animate-spin-slow-reverse" style={{ animationDuration: '10s' }} />

              {/* Glow blob */}
              <div className="absolute inset-0 rounded-full blur-2xl scale-150" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, rgba(0,212,255,0.1) 40%, transparent 70%)' }} />

              {/* Shield card */}
              <div className="relative w-52 h-52 flex items-center justify-center">
                <div className="w-40 h-40 glass-card rounded-3xl border border-[#10b981]/30 flex items-center justify-center glow-green">
                  <Shield size={64} className="text-[#10b981]" style={{ filter: 'drop-shadow(0 0 16px rgba(16,185,129,0.6))' }} />
                </div>
              </div>

              {/* Orbiting dots */}
              {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <div
                  key={deg}
                  className="absolute w-3 h-3 top-1/2 left-1/2 -mt-1.5 -ml-1.5 animate-spin-slow"
                  style={{
                    transform: `rotate(${deg}deg) translateX(90px)`,
                    animationDuration: `${6 + i}s`,
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: i % 2 === 0 ? '#10b981' : '#00d4ff',
                      boxShadow: `0 0 6px ${i % 2 === 0 ? '#10b981' : '#00d4ff'}`,
                    }}
                  />
                </div>
              ))}
            </div>
          </RevealItem>

          {/* Content */}
          <div>
            <RevealItem>
              <span className="inline-block px-4 py-1.5 rounded-full border border-[#10b981]/25 bg-[#10b981]/8 text-xs font-semibold text-[#10b981] uppercase tracking-widest mb-4">
                Safety First
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
                Make Better Decisions
                <br />
                <span className="gradient-text-cyan">Before You Apply.</span>
              </h2>
              <p className="text-[#94a3b8] text-lg leading-relaxed mb-8">
                VERIJOB AI provides AI-assisted classification to help you recognize warning
                signs in job advertisements — before you invest time, money, or personal
                information.
              </p>
            </RevealItem>

            <div className="space-y-3 mt-8">
              {trustPoints.map((point, i) => (
                <RevealItem
                  key={point}
                  className="flex items-center gap-3"
                >
                  <CheckCircle size={18} className="text-[#10b981] flex-shrink-0" />
                  <span className="text-[#94a3b8] text-sm">{point}</span>
                </RevealItem>
              ))}
            </div>

            <RevealItem className="mt-8 text-xs text-[#475569] italic border-l-2 border-[#10b981]/30 pl-4">
              VERIJOB AI provides AI-assisted classification, not guaranteed fraud detection.
              Always independently verify employer information before sharing personal details.
            </RevealItem>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
