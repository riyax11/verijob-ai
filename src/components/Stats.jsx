import { ScrollReveal, RevealItem } from './ScrollReveal';
import CountUp from './CountUp';
import { Brain, GitBranch, Zap, Clock } from 'lucide-react';

const stats = [
  {
    icon: <Brain size={22} className="text-[#00d4ff]" />,
    value: 'AI-Based',
    label: 'Detection Engine',
    sub: 'NLP + Machine Learning',
    color: '#00d4ff',
  },
  {
    icon: <GitBranch size={22} className="text-[#a855f7]" />,
    value: <><CountUp to={8} duration={2} />-Step</>,
    label: 'NLP Pipeline',
    sub: 'Tokenize → Classify',
    color: '#a855f7',
  },
  {
    icon: <Zap size={22} className="text-[#10b981]" />,
    value: <><CountUp to={4} duration={2} />+</>,
    label: 'ML Models',
    sub: 'LR · NB · RF · SVM',
    color: '#10b981',
  },
  {
    icon: <Clock size={22} className="text-[#f59e0b]" />,
    value: 'Real-Time',
    label: 'Analysis',
    sub: 'Seconds not minutes',
    color: '#f59e0b',
  },
];

export default function Stats() {
  return (
    <section className="relative w-full py-12 border-y border-white/5 overflow-hidden">
      {/* Gradient band */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#7c3aed]/5 via-transparent to-[#00d4ff]/5" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <RevealItem
              key={s.label}
              className="glass-card p-6 rounded-2xl hover:border-white/15 transition-all duration-300 group text-center"
            >
              <div
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3 mx-auto"
                style={{ background: `${s.color}18` }}
              >
                {s.icon}
              </div>
              <p className="text-2xl font-black text-white mb-0.5">{s.value}</p>
              <p className="text-sm font-semibold text-[#94a3b8]">{s.label}</p>
              <p className="text-xs text-[#475569] mt-1">{s.sub}</p>
            </RevealItem>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
