import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const footerLinks = {
  Product: [
    { label: 'How It Works', to: '/how-it-works' },
    { label: 'Technology', to: '/technology' },
    { label: 'Detection', to: '/detect' },
    { label: 'About', to: '/about' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#05070f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4 w-fit">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#00d4ff] flex items-center justify-center">
                <Shield size={16} className="text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight">VERIJOB</span>
                <span className="text-lg font-bold bg-gradient-to-r from-[#00d4ff] to-[#a855f7] bg-clip-text text-transparent"> AI</span>
              </div>
            </Link>
            <p className="text-sm text-[#94a3b8] max-w-sm leading-relaxed mb-4">
              AI-powered recruitment safety through Natural Language Processing and
              Machine Learning. Helping job seekers identify suspicious advertisements
              before they apply.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#10b981]/25 bg-[#10b981]/8">
              <span className="status-dot" />
              <span className="text-xs text-[#10b981] font-medium">AI Detection Online</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <p className="text-xs font-bold text-white uppercase tracking-widest mb-4">{section}</p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-[#475569] hover:text-[#94a3b8] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#475569]">
            NLP Minor Project &nbsp;·&nbsp; Built with NLP + Machine Learning
          </p>
          <p className="text-xs text-[#475569]">
            AI-assisted classification — not guaranteed fraud detection
          </p>
        </div>
      </div>
    </footer>
  );
}
