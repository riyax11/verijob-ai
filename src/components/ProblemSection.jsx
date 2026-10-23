import { ScrollReveal, RevealItem } from './ScrollReveal';
import { AlertTriangle, DollarSign, UserX, Clock } from 'lucide-react';

const problems = [
  {
    icon: <AlertTriangle size={24} />,
    color: '#ef4444',
    title: 'Fake Recruitment',
    desc: 'Fraudulent job advertisements designed to look like real opportunities from legitimate companies.',
    points: ['Impersonated company branding', 'Fabricated contact details', 'Non-existent job roles'],
  },
  {
    icon: <DollarSign size={24} />,
    color: '#f59e0b',
    title: 'Financial Scams',
    desc: 'Schemes that trick job seekers into paying registration, training, or equipment fees.',
    points: ['Registration fee demands', 'Fake training charges', 'Deposit-based fraud'],
  },
  {
    icon: <UserX size={24} />,
    color: '#a855f7',
    title: 'Identity Theft',
    desc: 'Fake job postings used to collect sensitive personal information under the guise of applications.',
    points: ['Aadhaar / PAN collection', 'Bank detail requests', 'Credential harvesting'],
  },
  {
    icon: <Clock size={24} />,
    color: '#00d4ff',
    title: 'Wasted Time',
    desc: 'Hours spent on fake interviews, assignments, and processes that lead nowhere.',
    points: ['Unpaid skill assessments', 'Ghost interviews', 'Endless follow-up cycles'],
  },
];

const signals = [
  'Promise unrealistic salaries',
  'Request registration or application fees',
  'Ask for sensitive personal information',
  'Hide or provide vague company details',
  'Use suspicious or misleading descriptions',
  'Redirect to unsafe external websites',
];

export default function ProblemSection() {
  return (
    <section id="problem" className="relative w-full py-24 overflow-hidden">
      <div className="absolute inset-0 bg-dot-grid opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial from-[#ef4444]/8 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <ScrollReveal className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <RevealItem className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#ef4444]/25 bg-[#ef4444]/8 text-xs font-semibold text-[#ef4444] uppercase tracking-widest mb-4">
            The Problem
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Online Jobs Aren't Always
            <br />
            <span className="gradient-text-purple">What They Seem.</span>
          </h2>
          <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">
            Fake job advertisements can have serious consequences. Here's what job seekers
            are exposed to every day.
          </p>
        </RevealItem>

        {/* Warning signals strip */}
        <RevealItem className="glass-card border border-[#ef4444]/15 rounded-2xl p-6 mb-12">
          <p className="text-sm font-semibold text-[#ef4444] mb-4 uppercase tracking-widest">
            ⚠ Fake advertisements commonly:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {signals.map((s, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="text-[#ef4444] mt-0.5 flex-shrink-0">•</span>
                <span className="text-sm text-[#94a3b8]">{s}</span>
              </div>
            ))}
          </div>
        </RevealItem>

        {/* Problem cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((p, i) => (
            <RevealItem
              key={p.title}
              className="glass-card rounded-2xl p-6 border border-white/8 hover:border-white/15 hover:-translate-y-1 transition-all duration-300 group cursor-default"
              style={{ '--glow': p.color }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-shadow duration-300 group-hover:shadow-lg"
                style={{
                  background: `${p.color}18`,
                  color: p.color,
                  boxShadow: `0 0 0 0 ${p.color}30`,
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 0 16px ${p.color}40`}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = `0 0 0 0 ${p.color}30`}
              >
                {p.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
              <p className="text-sm text-[#94a3b8] mb-4 leading-relaxed">{p.desc}</p>
              <ul className="space-y-1.5">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-2 text-xs" style={{ color: p.color }}>
                    <span className="text-xs">›</span>
                    <span className="text-[#94a3b8]">{pt}</span>
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
