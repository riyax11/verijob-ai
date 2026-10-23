import { ScrollReveal, RevealItem } from './ScrollReveal';
import { ArrowDown } from 'lucide-react';

const pipelineStages = [
  { id: 'input', label: 'INPUT', desc: 'Raw job advertisement', color: '#00d4ff', emoji: '📄' },
  { id: 'clean', label: 'Text Cleaning', desc: 'Remove noise & normalize', color: '#7c3aed', emoji: '🧹' },
  { id: 'tokenize', label: 'Tokenization', desc: 'Split into tokens', color: '#a855f7', emoji: '✂️' },
  { id: 'stopwords', label: 'Stop Word Removal', desc: 'Filter common words', color: '#3b82f6', emoji: '🔤' },
  { id: 'lemma', label: 'Lemmatization', desc: 'Reduce to base form', color: '#06b6d4', emoji: '📝' },
  { id: 'features', label: 'Feature Extraction', desc: 'TF-IDF / BoW vectors', color: '#8b5cf6', emoji: '⚙️' },
  { id: 'classify', label: 'ML Classification', desc: 'Logistic Regression / SVM / RF', color: '#a855f7', emoji: '🧠' },
  { id: 'result', label: 'RISK RESULT', desc: 'Genuine or Fake', color: '#10b981', emoji: '🎯' },
];

export default function SolutionPipeline() {
  return (
    <section id="solution" className="relative w-full py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7c3aed]/5 to-transparent" />

      <ScrollReveal className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <RevealItem className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#7c3aed]/25 bg-[#7c3aed]/8 text-xs font-semibold text-[#a855f7] uppercase tracking-widest mb-4">
            The Solution
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            One Job Description.
            <br />
            <span className="gradient-text-cyan">Multiple Signals. One Clear Decision.</span>
          </h2>
          <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">
            The system analyzes the textual content of a job advertisement through a structured
            NLP pipeline, extracting signals that distinguish genuine from fraudulent postings.
          </p>
        </RevealItem>

        {/* Pipeline visualization */}
        <div className="flex flex-col items-center gap-0">
          {pipelineStages.map((stage, i) => (
            <div key={stage.id} className="flex flex-col items-center w-full max-w-md">
              <RevealItem
                className={`w-full glass-card rounded-2xl px-6 py-4 border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg group ${
                  i === 0 ? 'border-[#00d4ff]/30' : i === 7 ? 'border-[#10b981]/30' : 'border-white/8 hover:border-white/15'
                }`}
                style={{
                  '--glow-color': stage.color,
                  boxShadow: i === 0 || i === 7 ? `0 0 20px ${stage.color}20` : 'none',
                }}
              >
                <div className="flex items-center gap-4">
                  {/* Step number */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background: `${stage.color}18` }}
                  >
                    {stage.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-bold uppercase tracking-widest"
                      style={{ color: stage.color }}
                    >
                      {stage.label}
                    </p>
                    <p className="text-xs text-[#94a3b8] mt-0.5">{stage.desc}</p>
                  </div>
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: stage.color, boxShadow: `0 0 6px ${stage.color}` }}
                  />
                </div>
              </RevealItem>

              {/* Connector arrow */}
              {i < pipelineStages.length - 1 && (
                <RevealItem
                  className="flex flex-col items-center"
                  style={{ originY: 0 }}
                >
                  <div className="pipeline-connector h-6" />
                  <ArrowDown size={12} className="text-[#475569] -mt-1" />
                </RevealItem>
              )}
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
