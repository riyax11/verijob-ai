import { ScrollReveal, RevealItem } from './ScrollReveal';
import { ClipboardList, Brain, Search, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: <ClipboardList size={28} />,
    title: 'Paste Job',
    desc: 'Paste the complete job advertisement into the detector. Include all available details — title, company, salary, and full description.',
    color: '#00d4ff',
    bg: 'from-[#00d4ff]/20 to-[#7c3aed]/10',
  },
  {
    number: '02',
    icon: <Brain size={28} />,
    title: 'AI Reads',
    desc: 'NLP preprocessing automatically cleans, tokenizes, removes stop words, and lemmatizes the job text for analysis.',
    color: '#a855f7',
    bg: 'from-[#a855f7]/20 to-[#3b82f6]/10',
  },
  {
    number: '03',
    icon: <Search size={28} />,
    title: 'Patterns Detected',
    desc: 'Machine learning algorithms identify suspicious patterns by analyzing TF-IDF features, language signals, and employer information.',
    color: '#10b981',
    bg: 'from-[#10b981]/20 to-[#00d4ff]/10',
  },
  {
    number: '04',
    icon: <CheckCircle2 size={28} />,
    title: 'Get Your Result',
    desc: 'Receive a Genuine or Fake classification with risk level, confidence indicator, and a breakdown of detected signals.',
    color: '#f59e0b',
    bg: 'from-[#f59e0b]/20 to-[#ef4444]/10',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative w-full py-24 overflow-hidden">
      <div className="absolute inset-0 bg-dot-grid opacity-15" />

      <ScrollReveal className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealItem className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#10b981]/25 bg-[#10b981]/8 text-xs font-semibold text-[#10b981] uppercase tracking-widest mb-4">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Four Simple Steps to
            <br />
            <span className="gradient-text-hero">Safer Job Searching</span>
          </h2>
          <p className="text-[#94a3b8] text-lg max-w-xl mx-auto">
            From raw job advertisement to AI-powered fraud detection in seconds.
          </p>
        </RevealItem>

        {/* Steps grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <RevealItem
              key={step.number}
              className="relative glass-card rounded-2xl p-6 border border-white/8 hover:border-white/15 hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Step number watermark */}
              <div
                className="absolute top-4 right-4 text-5xl font-black opacity-10 select-none"
                style={{ color: step.color }}
              >
                {step.number}
              </div>

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.bg} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300`}
                style={{ color: step.color }}
              >
                {step.icon}
              </div>

              {/* Step badge */}
              <div
                className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3"
                style={{
                  color: step.color,
                  background: `${step.color}18`,
                  border: `1px solid ${step.color}30`,
                }}
              >
                Step {step.number}
              </div>

              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed">{step.desc}</p>

              {/* Connector (desktop only) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <div className="w-6 h-0.5 bg-gradient-to-r from-white/20 to-transparent" />
                </div>
              )}
            </RevealItem>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
