import { ScrollReveal, RevealItem } from './ScrollReveal';
import { MessageSquare, Building2, DollarSign, Phone, FileText, AlertOctagon } from 'lucide-react';

const signals = [
  {
    icon: <MessageSquare size={22} />,
    title: 'Language Patterns',
    desc: 'Detect suspicious wording, unrealistic promises, urgency language, and unusual claims within the job description text.',
    examples: ['Guaranteed income', 'No experience required', 'Work from home earn thousands'],
    color: '#00d4ff',
  },
  {
    icon: <Building2 size={22} />,
    title: 'Employer Information',
    desc: 'Identify missing or vague company information, absence of corporate contact, and unverifiable organizational details.',
    examples: ['No company name', 'Vague location', 'Missing website'],
    color: '#a855f7',
  },
  {
    icon: <DollarSign size={22} />,
    title: 'Compensation Signals',
    desc: 'Flag potentially unrealistic salary or benefit claims that may indicate a fraudulent recruitment attempt.',
    examples: ['Extremely high salary', 'Daily / weekly pay', 'Free equipment claims'],
    color: '#10b981',
  },
  {
    icon: <Phone size={22} />,
    title: 'Contact Patterns',
    desc: 'Identify suspicious contact instructions such as WhatsApp-only communication or personal mobile numbers.',
    examples: ['WhatsApp only', 'No official email', 'Personal number listed'],
    color: '#f59e0b',
  },
  {
    icon: <FileText size={22} />,
    title: 'Text Features',
    desc: 'Analyze important TF-IDF and Bag-of-Words features extracted from the job description during preprocessing.',
    examples: ['High-weight suspicious tokens', 'Unusual n-gram patterns', 'Low vocabulary diversity'],
    color: '#3b82f6',
  },
  {
    icon: <AlertOctagon size={22} />,
    title: 'Fraud Indicators',
    desc: 'Combine multiple signals into a composite risk score that forms the basis of the final ML classification.',
    examples: ['Multiple risk signals', 'Combined feature scores', 'ML confidence output'],
    color: '#ef4444',
  },
];

export default function AIAnalysis() {
  return (
    <section className="relative w-full py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7c3aed]/4 to-transparent" />

      <ScrollReveal className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealItem className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#a855f7]/25 bg-[#a855f7]/8 text-xs font-semibold text-[#a855f7] uppercase tracking-widest mb-4">
            AI Analysis
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            What Does the AI
            <br />
            <span className="gradient-text-cyan">Look For?</span>
          </h2>
          <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">
            The detection system analyzes multiple signals within a job advertisement to form
            a composite fraud risk assessment.
          </p>
        </RevealItem>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {signals.map((s, i) => (
            <RevealItem
              key={s.title}
              className="glass-card rounded-2xl p-6 border border-white/8 hover:border-white/15 hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-105"
                style={{ background: `${s.color}18`, color: s.color }}
              >
                {s.icon}
              </div>

              <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed mb-4">{s.desc}</p>

              {/* Examples */}
              <div className="flex flex-wrap gap-1.5">
                {s.examples.map((ex) => (
                  <span
                    key={ex}
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                    style={{
                      color: s.color,
                      background: `${s.color}15`,
                      border: `1px solid ${s.color}25`,
                    }}
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </RevealItem>
          ))}
        </div>

        {/* Disclaimer */}
        <RevealItem className="text-center text-xs text-[#475569] mt-10 max-w-lg mx-auto">
          Detection signals represent conceptual categories analyzed by the NLP pipeline.
          Individual model performance varies based on training data and configuration.
        </RevealItem>
      </ScrollReveal>
    </section>
  );
}
