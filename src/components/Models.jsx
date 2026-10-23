import { ScrollReveal, RevealItem } from './ScrollReveal';
import { mlModels, evaluationMetrics } from '../data/models';

export default function Models() {
  return (
    <section id="models" className="relative w-full py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#10b981]/4 to-transparent" />

      <ScrollReveal className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealItem className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#10b981]/25 bg-[#10b981]/8 text-xs font-semibold text-[#10b981] uppercase tracking-widest mb-4">
            ML Models
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Multiple Models.
            <br />
            <span className="gradient-text-hero">One Goal: Safer Recruitment.</span>
          </h2>
          <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">
            The system evaluates multiple machine learning classifiers to identify the most
            effective approach for fake job detection.
          </p>
        </RevealItem>

        {/* Model cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {mlModels.map((model, i) => (
            <RevealItem
              key={model.id}
              className="glass-card rounded-2xl p-6 border border-white/8 hover:border-white/15 hover:-translate-y-1 transition-all duration-300 group flex flex-col"
            >
              {/* Icon + badge */}
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: `${model.color}18` }}
                >
                  {model.icon}
                </div>
                <span
                  className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                  style={{
                    color: model.color,
                    background: `${model.color}18`,
                    border: `1px solid ${model.color}30`,
                  }}
                >
                  {model.badge}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white mb-2">{model.name}</h3>
              <p className="text-xs text-[#94a3b8] leading-relaxed mb-4 flex-1">{model.description}</p>

              {/* Strengths */}
              <div className="space-y-1.5 mb-4">
                {model.strengths.map((s) => (
                  <div key={s} className="flex items-start gap-2 text-xs text-[#94a3b8]">
                    <span style={{ color: model.color }}>›</span>
                    {s}
                  </div>
                ))}
              </div>

              {/* Role */}
              <div
                className="p-3 rounded-lg text-xs text-[#94a3b8] leading-relaxed border"
                style={{ background: `${model.color}08`, borderColor: `${model.color}20` }}
              >
                <span className="font-semibold" style={{ color: model.color }}>Role: </span>
                {model.role}
              </div>
            </RevealItem>
          ))}
        </div>

        {/* Evaluation metrics */}
        <RevealItem className="glass-card rounded-2xl p-8 border border-white/8">
          <p className="text-center text-sm font-semibold text-[#94a3b8] mb-6 uppercase tracking-widest">
            Evaluation Framework
          </p>
          <p className="text-center text-xs text-[#475569] mb-8">
            Model performance is evaluated using the following metrics on a held-out test set.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {evaluationMetrics.map((m) => (
              <div key={m.name} className="text-center">
                <div className="text-2xl mb-2">{m.icon}</div>
                <p className="text-sm font-bold text-white mb-1">{m.name}</p>
                <p className="font-mono text-xs text-[#7c3aed] mb-2">{m.formula}</p>
                <p className="text-xs text-[#475569] leading-relaxed">{m.description}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-[#475569] mt-8 pt-6 border-t border-white/5">
            Model performance can be evaluated using Accuracy, Precision, Recall, F1-Score and Confusion Matrix.
            Reported metrics depend on training data and evaluation split.
          </p>
        </RevealItem>
      </ScrollReveal>
    </section>
  );
}
