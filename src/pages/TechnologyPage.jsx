import Technology from '../components/Technology';
import Models from '../components/Models';

export default function TechnologyPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-[#080d1a] to-transparent">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#3b82f6]/25 bg-[#3b82f6]/8 text-xs font-semibold text-[#3b82f6] uppercase tracking-widest mb-4">
            Stack & Models
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Technology &amp; Architecture
          </h1>
          <p className="text-[#94a3b8] text-lg max-w-xl mx-auto">
            Full-stack AI pipeline: Python NLP backend, ML classifiers, and a React frontend.
          </p>
        </div>
      </div>

      <Technology />
      <Models />
    </div>
  );
}
