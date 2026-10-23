import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SolutionPipeline from '../components/SolutionPipeline';
import { ArrowDown } from 'lucide-react';

const concepts = [
  {
    term: 'Tokenization',
    color: '#00d4ff',
    desc: 'The process of splitting raw text into individual units called tokens. These tokens can be words, subwords, or characters.',
    example: '"We are hiring" → ["We", "are", "hiring"]',
  },
  {
    term: 'Stop Word Removal',
    color: '#a855f7',
    desc: 'Filtering out high-frequency, low-information words (e.g., "the", "a", "is") that do not contribute meaningful signal to classification.',
    example: '"the best job for you" → ["best", "job"]',
  },
  {
    term: 'Lemmatization',
    color: '#10b981',
    desc: 'Reducing words to their dictionary base form (lemma) to normalize variations. Unlike stemming, it produces valid words.',
    example: '"running", "runs", "ran" → "run"',
  },
  {
    term: 'TF-IDF',
    color: '#f59e0b',
    desc: 'Term Frequency-Inverse Document Frequency: a numerical statistic that reflects how important a word is to a document relative to the corpus.',
    example: 'Rare suspicious words get higher TF-IDF weight',
  },
  {
    term: 'Bag of Words',
    color: '#3b82f6',
    desc: 'A text representation that counts word occurrences in a document without preserving word order. Forms a high-dimensional sparse vector.',
    example: 'Vocabulary index → count vector for each job ad',
  },
  {
    term: 'Feature Extraction',
    color: '#ec4899',
    desc: 'Converting raw text into numerical feature vectors that machine learning models can process. TF-IDF and BoW are the primary methods used.',
    example: 'Text → float64 vector of shape (1, vocab_size)',
  },
];

export default function HowItWorksPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-[#080d1a] to-transparent">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#7c3aed]/25 bg-[#7c3aed]/8 text-xs font-semibold text-[#a855f7] uppercase tracking-widest mb-4">
            Under the Hood
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            How the NLP Pipeline
            <br />
            <span className="gradient-text-cyan">Works</span>
          </h1>
          <p className="text-[#94a3b8] text-lg max-w-xl mx-auto">
            A step-by-step breakdown of how raw job advertisement text is transformed
            into a machine learning prediction.
          </p>
        </div>
      </div>

      {/* Pipeline visual */}
      <SolutionPipeline />

      {/* NLP Concepts */}
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-black text-white text-center mb-12"
        >
          Key NLP Concepts
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {concepts.map((c, i) => (
            <motion.div
              key={c.term}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-card rounded-2xl p-6 border border-white/8 hover:border-white/15 hover:-translate-y-0.5 transition-all duration-300"
            >
              <h3 className="text-base font-bold mb-2" style={{ color: c.color }}>{c.term}</h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed mb-4">{c.desc}</p>
              <div
                className="px-3 py-2 rounded-lg font-mono text-xs leading-relaxed"
                style={{ background: `${c.color}10`, border: `1px solid ${c.color}20`, color: c.color }}
              >
                {c.example}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
