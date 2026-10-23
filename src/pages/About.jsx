import { motion } from 'framer-motion';
import { Shield, Brain, Target, Layers, Code2 } from 'lucide-react';

const highlights = [
  {
    icon: <Brain size={22} />,
    title: 'NLP Pipeline',
    desc: 'An 8-stage Natural Language Processing pipeline transforms raw job advertisement text into structured features for ML classification.',
    color: '#7c3aed',
  },
  {
    icon: <Target size={22} />,
    title: 'ML Classification',
    desc: 'Multiple classification algorithms — Logistic Regression, Naïve Bayes, Random Forest, and SVM — are evaluated for fake job detection.',
    color: '#00d4ff',
  },
  {
    icon: <Shield size={22} />,
    title: 'Safety Focus',
    desc: 'Built to help job seekers recognize suspicious signals before investing time, sharing personal data, or losing money to recruitment fraud.',
    color: '#10b981',
  },
  {
    icon: <Layers size={22} />,
    title: 'Full Stack',
    desc: 'Python ML backend connected to a React web interface. REST API architecture allows easy integration once the model is trained.',
    color: '#f59e0b',
  },
  {
    icon: <Code2 size={22} />,
    title: 'Open Architecture',
    desc: 'Modular, clean code structure. API service layer is clearly isolated so the mock detection can be replaced by the real ML model.',
    color: '#a855f7',
  },
];

const stack = ['Python', 'NLTK', 'spaCy', 'Scikit-learn', 'Pandas', 'NumPy', 'TF-IDF', 'Bag of Words', 'React', 'Vite', 'Framer Motion', 'Flask / FastAPI'];

export default function About() {
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-[#080d1a] to-transparent">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#00d4ff] flex items-center justify-center mx-auto mb-6">
            <Shield size={30} className="text-white" />
          </div>
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#a855f7]/25 bg-[#a855f7]/8 text-xs font-semibold text-[#a855f7] uppercase tracking-widest mb-4">
            NLP Minor Project
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            About VERIJOB AI
          </h1>
          <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">
            An AI-powered Fake Job Posting Detection System built using Natural Language
            Processing and Machine Learning as a final-year minor project.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Project description */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl p-8 border border-white/8"
          >
            <h2 className="text-2xl font-black text-white mb-4">Project Overview</h2>
            <div className="space-y-4 text-[#94a3b8] text-sm leading-relaxed">
              <p>
                VERIJOB AI is a fake job posting detection system developed as part of an NLP
                and Machine Learning curriculum project. The system analyzes job advertisement
                text to classify postings as genuine or fraudulent using supervised machine
                learning.
              </p>
              <p>
                The core workflow involves several NLP preprocessing stages — including
                tokenization, stop word removal, and lemmatization — followed by feature
                extraction using TF-IDF and Bag of Words. These features are then used to
                train and evaluate multiple classification models.
              </p>
              <p>
                The web interface is built with React and Vite, designed to be connected to a
                Python Flask or FastAPI backend once the ML model is trained. The API service
                layer is deliberately isolated to make backend integration straightforward.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Highlight cards */}
        <div>
          <h2 className="text-2xl font-black text-white text-center mb-10">Project Highlights</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass-card rounded-2xl p-6 border border-white/8 hover:border-white/15 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${h.color}18`, color: h.color }}
                >
                  {h.icon}
                </div>
                <h3 className="text-sm font-bold text-white mb-2">{h.title}</h3>
                <p className="text-xs text-[#94a3b8] leading-relaxed">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl font-black text-white mb-6">Technologies Used</h2>
          <div className="flex flex-wrap gap-2.5 justify-center max-w-2xl mx-auto">
            {stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-sm font-medium text-[#94a3b8] glass-card rounded-lg border border-white/8 hover:border-white/15 hover:text-white transition-all duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto glass-card rounded-2xl p-6 border border-[#f59e0b]/15 bg-[#f59e0b]/5 text-center"
        >
          <p className="text-sm text-[#94a3b8] leading-relaxed">
            <span className="font-semibold text-[#f59e0b]">Project Disclaimer: </span>
            VERIJOB AI is an academic project demonstrating the application of NLP and Machine
            Learning to recruitment fraud detection. It provides AI-assisted classification,
            not guaranteed fraud detection. Always independently verify employer information
            before sharing personal details or making financial commitments.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
