import HowItWorks from '../components/HowItWorks';
import AppShowcase from '../components/AppShowcase';
import { useInView } from '../hooks';
import { Shield, Zap, Heart } from 'lucide-react';

const highlights = [
  { icon: Zap, title: 'Setup in 60 seconds', desc: 'Sign up, add your emergency contacts, and you\'re protected. No complicated configuration.' },
  { icon: Shield, title: 'Always-on protection', desc: 'SafeHer runs quietly in the background. You\'ll never have to think about it until you need it.' },
  { icon: Heart, title: 'Designed for real life', desc: 'Built by women, tested by women. Every feature solves a real problem that real women face.' },
];

export default function HowItWorksPage() {
  const { ref, inView } = useInView();

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Page header */}
      <div className="w-full max-w-[92%] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 text-center mb-8">
        <div ref={ref as React.RefObject<HTMLDivElement>} className={`reveal ${inView ? 'visible' : ''}`}>
          <div className="tag-pill mx-auto mb-4">Simple & Powerful</div>
          <h1 className="font-['Playfair_Display'] font-extrabold mb-4" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.12 }}>
            <span className="text-white">How </span>
            <span className="shimmer-text">SafeHer</span>
            <span className="text-white"> Works</span>
          </h1>
          <p className="text-(--text-secondary) text-lg max-w-2xl mx-auto leading-relaxed">
            Four simple steps from download to full protection. SafeHer is designed to be effortless so you can focus on living your life, not your safety app.
          </p>
        </div>
      </div>

      {/* Steps */}
      <HowItWorks />

      {/* Why it's easy highlights */}
      <div className="w-full max-w-[92%] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <div key={h.title} className={`glass-card p-6 text-center group hover:-translate-y-1 transition-transform reveal ${inView ? 'visible' : ''} delay-${i + 3}`}>
                <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center mx-auto mb-4 group-hover:bg-pink-500/20 transition-colors">
                  <Icon size={22} className="text-pink-400" />
                </div>
                <h3 className="text-white font-bold text-base mb-2">{h.title}</h3>
                <p className="text-(--text-secondary) text-sm leading-relaxed">{h.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* App Showcase */}
      <AppShowcase />
    </div>
  );
}
