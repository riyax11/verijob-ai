import { ScrollReveal, RevealItem } from './ScrollReveal';
import { technologies, architectureLayers } from '../data/technology';
import { ArrowDown } from 'lucide-react';

const categoryColors = {
  Core: '#3b82f6',
  NLP: '#7c3aed',
  ML: '#10b981',
  Data: '#f59e0b',
  Feature: '#00d4ff',
  Frontend: '#ec4899',
  API: '#ef4444',
};

export default function Technology() {
  return (
    <section id="technology" className="relative w-full py-24 overflow-hidden">
      <div className="absolute inset-0 bg-dot-grid opacity-15" />

      <ScrollReveal className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealItem className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#3b82f6]/25 bg-[#3b82f6]/8 text-xs font-semibold text-[#3b82f6] uppercase tracking-widest mb-4">
            Technology
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Built on NLP +
            <br />
            <span className="gradient-text-cyan">Machine Learning</span>
          </h2>
          <p className="text-[#94a3b8] text-lg max-w-xl mx-auto">
            A full-stack AI pipeline combining industry-standard NLP tools, ML classifiers,
            and a modern React frontend.
          </p>
        </RevealItem>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Tech cards */}
          <div>
            <p className="text-xs font-semibold text-[#475569] uppercase tracking-widest mb-4">Stack</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {technologies.map((tech, i) => (
                <RevealItem
                  key={tech.name}
                  className="glass-card rounded-xl p-4 border border-white/8 hover:border-white/15 hover:-translate-y-0.5 transition-all duration-300 group cursor-default"
                >
                  <div
                    className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-2 inline-block"
                    style={{
                      color: categoryColors[tech.category] || '#94a3b8',
                      background: `${categoryColors[tech.category]}18` || 'rgba(255,255,255,0.05)',
                    }}
                  >
                    {tech.category}
                  </div>
                  <p className="text-sm font-bold text-white">{tech.name}</p>
                  <p className="text-xs text-[#475569] mt-1 leading-relaxed">{tech.desc}</p>
                </RevealItem>
              ))}
            </div>
          </div>

          {/* Architecture diagram */}
          <div>
            <p className="text-xs font-semibold text-[#475569] uppercase tracking-widest mb-4">Architecture</p>
            <div className="glass-card rounded-2xl p-6 border border-white/8">
              <div className="flex flex-col items-center gap-0">
                {architectureLayers.map((layer, i) => (
                  <div key={layer.label} className="flex flex-col items-center w-full max-w-xs mx-auto">
                    <RevealItem
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-white/8 bg-white/3 hover:bg-white/5 transition-colors duration-200"
                    >
                      <span className="text-xl">{layer.icon}</span>
                      <span className="text-sm font-semibold text-white">{layer.label}</span>
                      <div
                        className="ml-auto w-2 h-2 rounded-full"
                        style={{ background: layer.color, boxShadow: `0 0 6px ${layer.color}80` }}
                      />
                    </RevealItem>

                    {i < architectureLayers.length - 1 && (
                      <div className="flex flex-col items-center py-1">
                        <div className="pipeline-connector h-4" />
                        <ArrowDown size={10} className="text-[#475569]" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-white/5">
                <p className="text-xs text-[#475569] text-center">
                  Frontend calls Python backend via REST API.
                  NLP pipeline processes text and returns prediction JSON.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
