import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal, RevealItem } from './ScrollReveal';
import { Link } from 'react-router-dom';
import { Zap, CheckCircle2, AlertTriangle, ArrowRight, Loader2 } from 'lucide-react';
import { analyzeJobPosting } from '../services/api';

const sampleText = `Work from home and earn ₹50,000 per week! No experience required, no qualification needed. 
Anyone can apply. Send ₹500 registration fee via Google Pay to get your login credentials. 
Immediate joining available. Contact only on WhatsApp: 9876543210. 
Hurry! Limited seats available. Daily payment guaranteed.`;

const pipelineStages = [
  { id: 'collect', label: 'Text collected', icon: '📄' },
  { id: 'clean', label: 'Preprocessing complete', icon: '🧹' },
  { id: 'tokenize', label: 'Tokens generated', icon: '✂️' },
  { id: 'extract', label: 'Features extracted', icon: '⚙️' },
  { id: 'classify', label: 'Model analyzed', icon: '🧠' },
  { id: 'predict', label: 'Prediction generated', icon: '🎯' },
];

export default function DetectorDemo() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('idle'); // idle | running | done
  const [activeStage, setActiveStage] = useState(-1);
  const [result, setResult] = useState(null);

  const charLimit = 2000;

  const handleAnalyze = async () => {
    if (!text.trim() || status === 'running') return;
    setStatus('running');
    setResult(null);
    setActiveStage(-1);

    for (let i = 0; i < pipelineStages.length; i++) {
      setActiveStage(i);
      await new Promise((r) => setTimeout(r, 450 + Math.random() * 200));
    }

    try {
      const data = await analyzeJobPosting({ text });
      setResult(data);
    } catch {
      setResult({ error: true });
    }
    setStatus('done');
    setActiveStage(-1);
  };

  const handleReset = () => {
    setStatus('idle');
    setResult(null);
    setActiveStage(-1);
    setText('');
  };

  const handleLoadSample = () => {
    setText(sampleText.trim());
  };

  const riskColor = result
    ? result.risk_level === 'HIGH'
      ? '#ef4444'
      : result.risk_level === 'MEDIUM'
      ? '#f59e0b'
      : '#10b981'
    : '#10b981';

  return (
    <section id="try-demo" className="relative w-full py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00d4ff]/4 to-transparent" />

      <ScrollReveal className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealItem className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#00d4ff]/25 bg-[#00d4ff]/8 text-xs font-semibold text-[#00d4ff] uppercase tracking-widest mb-4">
            Live Demo
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Try the AI Job Detector
          </h2>
          <p className="text-[#94a3b8] text-lg max-w-xl mx-auto">
            Paste a job description and watch the NLP pipeline analyze it in real time.
          </p>
        </RevealItem>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input panel */}
          <RevealItem className="glass-card rounded-2xl p-6 border border-white/8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white">Job Description</h3>
              <button
                onClick={handleLoadSample}
                className="text-xs text-[#7c3aed] hover:text-[#a855f7] transition-colors font-medium"
              >
                Load sample →
              </button>
            </div>

            <textarea
              className="custom-textarea w-full h-52 rounded-xl p-4 text-sm leading-relaxed resize-none"
              placeholder="Paste a job description here..."
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, charLimit))}
              aria-label="Job description input"
              disabled={status === 'running'}
            />
            <div className="flex items-center justify-between mt-2 mb-5">
              <span className="text-xs text-[#475569]">Minimum 50 characters for analysis</span>
              <span className={`text-xs font-mono ${text.length > charLimit * 0.9 ? 'text-[#f59e0b]' : 'text-[#475569]'}`}>
                {text.length}/{charLimit}
              </span>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={text.trim().length < 20 || status === 'running'}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-[#7c3aed] to-[#00d4ff] disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              {status === 'running' ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap size={18} />
                  Analyze Job
                </>
              )}
            </button>

            {status !== 'idle' && (
              <button
                onClick={handleReset}
                className="w-full mt-3 py-2 text-sm text-[#475569] hover:text-[#94a3b8] transition-colors"
              >
                Reset
              </button>
            )}

            {/* Pipeline progress */}
            <AnimatePresence>
              {status !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 space-y-2 overflow-hidden"
                >
                  <p className="text-xs font-semibold text-[#475569] uppercase tracking-widest mb-3">NLP Pipeline</p>
                  {pipelineStages.map((stage, i) => {
                    const done = status === 'done' || (status === 'running' && i < activeStage);
                    const active = status === 'running' && i === activeStage;
                    return (
                      <motion.div
                        key={stage.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`flex items-center gap-3 text-sm py-1.5 px-3 rounded-lg transition-colors ${
                          active ? 'bg-[#00d4ff]/8 text-[#00d4ff]' : done ? 'text-[#10b981]' : 'text-[#475569]'
                        }`}
                      >
                        {done ? (
                          <CheckCircle2 size={14} className="text-[#10b981] flex-shrink-0" />
                        ) : active ? (
                          <Loader2 size={14} className="animate-spin flex-shrink-0 text-[#00d4ff]" />
                        ) : (
                          <span className="w-3.5 h-3.5 rounded-full border border-[#475569] flex-shrink-0" />
                        )}
                        <span className="text-xs">{stage.icon} {stage.label}</span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </RevealItem>

          {/* Result panel */}
          <RevealItem className="glass-card rounded-2xl p-6 border border-white/8 flex flex-col">
            <h3 className="text-base font-bold text-white mb-4">Analysis Result</h3>

            <AnimatePresence mode="wait">
              {!result && status === 'idle' && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center mb-4 mx-auto">
                    <Zap size={28} className="text-[#475569]" />
                  </div>
                  <p className="text-[#94a3b8] font-medium">Ready to Analyze</p>
                  <p className="text-sm text-[#475569] mt-1">Paste a job description and click Analyze</p>
                </motion.div>
              )}

              {status === 'running' && (
                <motion.div
                  key="running"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center py-12"
                >
                  <div className="relative w-16 h-16 mb-6">
                    <div className="absolute inset-0 rounded-full border-4 border-[#7c3aed]/20" />
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#00d4ff] animate-spin" />
                    <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-[#a855f7] animate-spin" style={{ animationDuration: '0.7s', animationDirection: 'reverse' }} />
                  </div>
                  <p className="text-[#94a3b8] font-medium animate-pulse">Processing with NLP pipeline...</p>
                </motion.div>
              )}

              {result && !result.error && status === 'done' && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex-1 flex flex-col gap-5"
                >
                  {/* Classification header */}
                  <div
                    className="rounded-xl p-5 border"
                    style={{
                      background: `${riskColor}0d`,
                      borderColor: `${riskColor}30`,
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs text-[#475569] uppercase tracking-widest mb-1">Classification</p>
                        <p className="text-2xl font-black" style={{ color: riskColor }}>
                          {result.classification === 'FAKE' ? 'FAKE JOB POSTING' : 'GENUINE POSTING'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[#475569] uppercase tracking-widest mb-1">Risk Score</p>
                        <p className="text-3xl font-black" style={{ color: riskColor }}>{result.risk_score}%</p>
                      </div>
                    </div>

                    {/* Risk bar */}
                    <div className="mt-3 h-2 bg-white/8 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${riskColor}80, ${riskColor})` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${result.risk_score}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span
                        className="text-xs font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full"
                        style={{
                          color: riskColor,
                          background: `${riskColor}18`,
                          border: `1px solid ${riskColor}30`,
                        }}
                      >
                        {result.risk_level} RISK
                      </span>
                      <span className="text-xs text-[#475569]">Confidence: {result.confidence}</span>
                    </div>
                  </div>

                  {/* Reasons */}
                  <div>
                    <p className="text-xs font-semibold text-[#475569] uppercase tracking-widest mb-3">Detection Signals</p>
                    <div className="space-y-2">
                      {result.reasons.map((reason, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="flex items-start gap-2.5 text-sm"
                        >
                          <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" style={{ color: riskColor }} />
                          <span className="text-[#94a3b8]">{reason}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Word count */}
                  <p className="text-xs text-[#475569]">
                    Analyzed {result.word_count} words &nbsp;·&nbsp; {new Date(result.analyzed_at).toLocaleTimeString()}
                  </p>

                  {/* Disclaimer */}
                  <p className="text-xs text-[#475569] border-t border-white/5 pt-4 italic">
                    ⓘ {result.disclaimer}
                  </p>

                  <Link
                    to="/detect"
                    className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#7c3aed] to-[#00d4ff] hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                  >
                    Full Detector Dashboard
                    <ArrowRight size={14} />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </RevealItem>
        </div>
      </ScrollReveal>
    </section>
  );
}
