import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeJobPosting } from '../services/api';
import {
  Zap, AlertTriangle, CheckCircle2, Loader2, Shield, RotateCcw,
  ChevronDown, ChevronUp, Info
} from 'lucide-react';

const pipelineStages = [
  { id: 'collect', label: 'Collecting text', icon: '📄' },
  { id: 'clean', label: 'Cleaning text', icon: '🧹' },
  { id: 'tokenize', label: 'Tokenizing', icon: '✂️' },
  { id: 'extract', label: 'Extracting features', icon: '⚙️' },
  { id: 'classify', label: 'Running model', icon: '🧠' },
  { id: 'predict', label: 'Generating prediction', icon: '🎯' },
];

export default function Detector() {
  const [form, setForm] = useState({ text: '', title: '', company: '', location: '', salary: '' });
  const [status, setStatus] = useState('idle');
  const [activeStage, setActiveStage] = useState(-1);
  const [result, setResult] = useState(null);
  const [showOptional, setShowOptional] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleAnalyze = async () => {
    if (!form.text.trim() || status === 'running') return;
    setStatus('running');
    setResult(null);
    setActiveStage(-1);

    for (let i = 0; i < pipelineStages.length; i++) {
      setActiveStage(i);
      await new Promise((r) => setTimeout(r, 500 + Math.random() * 300));
    }

    try {
      const data = await analyzeJobPosting(form);
      setResult(data);
    } catch (err) {
      setResult({ error: true, errorMessage: err.message });
    }
    setStatus('done');
    setActiveStage(-1);
  };

  const handleReset = () => {
    setStatus('idle');
    setResult(null);
    setActiveStage(-1);
    setForm({ text: '', title: '', company: '', location: '', salary: '' });
  };

  const riskColor = result
    ? result.risk_level === 'HIGH' ? '#ef4444'
    : result.risk_level === 'MEDIUM' ? '#f59e0b'
    : '#10b981'
    : '#10b981';

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-[#080d1a] to-transparent">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#00d4ff] flex items-center justify-center">
                  <Shield size={20} className="text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-black text-white">AI Job Safety Scanner</h1>
                  <p className="text-xs text-[#475569] font-mono uppercase tracking-widest">VERIJOB AI · Detector Dashboard</p>
                </div>
              </div>
              <p className="text-[#94a3b8] text-sm max-w-lg">
                Paste a complete job advertisement for AI-powered NLP analysis. Optional fields
                improve detection accuracy.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full border border-[#10b981]/30 bg-[#10b981]/10">
              <span className="status-dot" />
              <span className="text-xs text-[#10b981] font-medium whitespace-nowrap">Ready to Analyze</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-5 gap-8">

          {/* ── Left: Input panel (3/5) ────────────────────────── */}
          <div className="lg:col-span-3 space-y-5">
            {/* Main textarea */}
            <div className="glass-card rounded-2xl p-6 border border-white/8">
              <label className="block text-sm font-semibold text-white mb-3" htmlFor="det-text">
                Job Description <span className="text-[#ef4444]">*</span>
              </label>
              <textarea
                id="det-text"
                name="text"
                className="custom-textarea w-full h-64 rounded-xl p-4 text-sm leading-relaxed"
                placeholder="Paste the complete job advertisement here... Include salary, requirements, company info, and any contact details."
                value={form.text}
                onChange={handleChange}
                disabled={status === 'running'}
                aria-required="true"
              />
              <div className="flex justify-between mt-2 text-xs text-[#475569] font-mono">
                <span>{form.text.trim().split(/\s+/).filter(Boolean).length} words</span>
                <span>{form.text.length} chars</span>
              </div>
            </div>

            {/* Optional fields */}
            <div className="glass-card rounded-2xl border border-white/8 overflow-hidden">
              <button
                onClick={() => setShowOptional((v) => !v)}
                className="w-full flex items-center justify-between px-6 py-4 text-sm font-semibold text-[#94a3b8] hover:text-white transition-colors"
              >
                <span>Optional Fields (improves accuracy)</span>
                {showOptional ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              <AnimatePresence>
                {showOptional && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 grid sm:grid-cols-2 gap-4">
                      {[
                        { name: 'title', label: 'Job Title', placeholder: 'e.g. Software Engineer' },
                        { name: 'company', label: 'Company Name', placeholder: 'e.g. TechNova Ltd.' },
                        { name: 'location', label: 'Location', placeholder: 'e.g. Remote / Bangalore' },
                        { name: 'salary', label: 'Salary Info', placeholder: 'e.g. ₹8L – ₹12L' },
                      ].map((field) => (
                        <div key={field.name}>
                          <label className="block text-xs font-medium text-[#94a3b8] mb-1.5" htmlFor={`det-${field.name}`}>
                            {field.label}
                          </label>
                          <input
                            id={`det-${field.name}`}
                            name={field.name}
                            className="custom-input w-full px-4 py-2.5 rounded-xl text-sm"
                            placeholder={field.placeholder}
                            value={form[field.name]}
                            onChange={handleChange}
                            disabled={status === 'running'}
                          />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAnalyze}
                disabled={form.text.trim().length < 20 || status === 'running'}
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-[#7c3aed] to-[#00d4ff] disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                {status === 'running' ? (
                  <><Loader2 size={20} className="animate-spin" /> Analyzing...</>
                ) : (
                  <><Zap size={20} /> Run AI Analysis</>
                )}
              </button>
              {status !== 'idle' && (
                <button
                  onClick={handleReset}
                  className="px-4 py-4 rounded-xl border border-white/10 text-[#94a3b8] hover:text-white hover:border-white/20 transition-all duration-200"
                  title="Reset"
                >
                  <RotateCcw size={18} />
                </button>
              )}
            </div>

            {/* Disclaimer */}
            <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-[#f59e0b]/6 border border-[#f59e0b]/15">
              <Info size={14} className="text-[#f59e0b] flex-shrink-0 mt-0.5" />
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                AI predictions are informational and should not replace independent verification.
                Always research the employer independently before sharing personal information.
              </p>
            </div>
          </div>

          {/* ── Right: Analysis panel (2/5) ────────────────────── */}
          <div className="lg:col-span-2 space-y-5">
            {/* Pipeline progress */}
            <div className="glass-card rounded-2xl p-5 border border-white/8">
              <p className="text-xs font-bold text-[#475569] uppercase tracking-widest mb-4">NLP Pipeline Status</p>
              <div className="space-y-2">
                {pipelineStages.map((stage, i) => {
                  const done = status === 'done' || (status === 'running' && i < activeStage);
                  const active = status === 'running' && i === activeStage;
                  return (
                    <div
                      key={stage.id}
                      className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-all duration-300 ${
                        active ? 'bg-[#00d4ff]/8 border border-[#00d4ff]/20'
                        : done ? 'bg-[#10b981]/5'
                        : ''
                      }`}
                    >
                      {done ? (
                        <CheckCircle2 size={14} className="text-[#10b981] flex-shrink-0" />
                      ) : active ? (
                        <Loader2 size={14} className="animate-spin text-[#00d4ff] flex-shrink-0" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border border-[#475569] flex-shrink-0" />
                      )}
                      <span className={`text-xs ${active ? 'text-[#00d4ff]' : done ? 'text-[#10b981]' : 'text-[#475569]'}`}>
                        {stage.icon} {stage.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Result card */}
            <AnimatePresence mode="wait">
              {!result && status === 'idle' && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-card rounded-2xl p-8 border border-white/8 flex flex-col items-center justify-center text-center min-h-48"
                >
                  <Shield size={36} className="text-[#475569] mb-3" />
                  <p className="text-[#94a3b8] font-medium text-sm">Analysis Result</p>
                  <p className="text-xs text-[#475569] mt-1">Will appear here after analysis</p>
                </motion.div>
              )}

              {status === 'running' && (
                <motion.div
                  key="running"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-card rounded-2xl p-8 border border-white/8 flex flex-col items-center justify-center min-h-48"
                >
                  <div className="relative w-12 h-12 mb-4">
                    <div className="absolute inset-0 rounded-full border-4 border-[#7c3aed]/20" />
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#00d4ff] animate-spin" />
                  </div>
                  <p className="text-[#94a3b8] text-sm animate-pulse">Processing...</p>
                </motion.div>
              )}

              {result && !result.error && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="glass-card rounded-2xl border overflow-hidden"
                  style={{ borderColor: `${riskColor}30` }}
                >
                  {/* Classification header */}
                  <div
                    className="p-5 border-b"
                    style={{
                      background: `linear-gradient(135deg, ${riskColor}12, ${riskColor}06)`,
                      borderColor: `${riskColor}20`,
                    }}
                  >
                    <p className="text-xs text-[#475569] uppercase tracking-widest mb-1">Classification</p>
                    <p className="text-xl font-black mb-3" style={{ color: riskColor }}>
                      {result.classification === 'FAKE' ? '🚫 FAKE JOB POSTING' : '✅ GENUINE POSTING'}
                    </p>

                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#475569]">Risk Score</span>
                      <span className="text-sm font-bold" style={{ color: riskColor }}>{result.risk_score}%</span>
                    </div>
                    <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${riskColor}60, ${riskColor})` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${result.risk_score}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                      />
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{
                          color: riskColor,
                          background: `${riskColor}20`,
                          border: `1px solid ${riskColor}40`,
                        }}
                      >
                        {result.risk_level} RISK
                      </span>
                      <span className="text-xs text-[#475569]">Confidence: {result.confidence}</span>
                    </div>
                  </div>

                  {/* Features */}
                  {result.features && (
                    <div className="p-5 border-b border-white/5">
                      <p className="text-xs font-bold text-[#475569] uppercase tracking-widest mb-3">Signal Scores</p>
                      <div className="space-y-2.5">
                        {result.features.map((f) => (
                          <div key={f.name}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className={f.suspicious ? 'text-[#f59e0b]' : 'text-[#94a3b8]'}>{f.name}</span>
                              <span className={f.suspicious ? 'text-[#f59e0b]' : 'text-[#475569]'}>{f.score}%</span>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ background: f.suspicious ? '#f59e0b' : '#475569' }}
                                initial={{ width: 0 }}
                                animate={{ width: `${f.score}%` }}
                                transition={{ duration: 0.6 }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reasons */}
                  <div className="p-5">
                    <p className="text-xs font-bold text-[#475569] uppercase tracking-widest mb-3">Detection Signals</p>
                    <div className="space-y-2">
                      {result.reasons.map((r, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs">
                          {result.classification === 'FAKE' ? (
                            <AlertTriangle size={12} className="flex-shrink-0 mt-0.5" style={{ color: riskColor }} />
                          ) : (
                            <CheckCircle2 size={12} className="flex-shrink-0 mt-0.5 text-[#10b981]" />
                          )}
                          <span className="text-[#94a3b8]">{r}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-[#475569] italic mt-4 pt-4 border-t border-white/5">
                      ⓘ AI-assisted classification. Independent verification recommended.
                    </p>
                  </div>
                </motion.div>
              )}

              {result?.error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-card rounded-2xl p-6 border border-[#ef4444]/30 text-center"
                >
                  <p className="text-[#ef4444] font-semibold text-sm mb-1">Analysis Failed</p>
                  <p className="text-xs text-[#475569]">
                    {result.errorMessage || 'Please check your connection and try again.'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}