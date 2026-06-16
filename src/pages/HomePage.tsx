import Hero from '../components/Hero';
import TrustBadges from '../components/TrustBadges';
import StatsSection from '../components/StatsSection';
import Testimonials from '../components/Testimonials';
import type { Page } from '../router';
import { useInView } from '../hooks';
import { ArrowRight, Shield, Zap, Download } from 'lucide-react';

interface HomePageProps {
  navigate: (p: Page) => void;
}

const quickActions = [
  { icon: Shield, label: 'Explore Features', page: 'features' as Page, desc: '12 powerful safety tools' },
  { icon: Zap, label: 'How It Works', page: 'how-it-works' as Page, desc: '4 simple steps to protection' },
  { icon: ArrowRight, label: 'Safety Resources', page: 'resources' as Page, desc: 'Tips, guides, emergency numbers' },
];

export default function HomePage({ navigate }: HomePageProps) {
  const { ref, inView } = useInView();

  return (
    <>
      <Hero navigate={navigate} />
      <TrustBadges />

      {/* Quick Navigate Section */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div ref={ref as React.RefObject<HTMLDivElement>} className={`text-center mb-8 reveal ${inView ? 'visible' : ''}`}>
            <p className="text-[var(--text-secondary)] text-sm font-semibold uppercase tracking-widest">Quick Access</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickActions.map(({ icon: Icon, label, page, desc }, i) => (
              <button
                key={page}
                onClick={() => navigate(page)}
                className={`glass-card p-5 text-left group hover:border-pink-500/60 hover:-translate-y-1 transition-all duration-300 reveal ${inView ? 'visible' : ''} delay-${i + 2}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center group-hover:bg-pink-500/20 transition-colors">
                    <Icon size={18} className="text-pink-400" />
                  </div>
                  <ArrowRight size={16} className="text-pink-500/40 group-hover:text-pink-400 group-hover:translate-x-1 transition-all duration-200" />
                </div>
                <h3 className="text-white font-bold text-base mb-1 group-hover:text-pink-300 transition-colors">{label}</h3>
                <p className="text-[var(--text-secondary)] text-xs">{desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <StatsSection />
      <Testimonials />

      {/* Bottom CTA */}
      <section className="py-16 px-4 sm:px-6">
        <div className={`max-w-2xl mx-auto text-center reveal ${inView ? 'visible' : ''} delay-4`}>
          <div className="glass-card p-10" style={{ border: '1px solid rgba(255,31,110,0.25)', boxShadow: '0 0 60px rgba(255,31,110,0.08)' }}>
            <div className="w-16 h-16 rounded-2xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center mx-auto mb-6">
              <Download size={28} className="text-pink-400" />
            </div>
            <h2 className="font-['Playfair_Display'] font-extrabold text-2xl sm:text-3xl text-white mb-3">
              Download SafeHer <span className="shimmer-text">Today</span>
            </h2>
            <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">Join 10,000+ women who feel safer every day with SafeHer by their side. It's free, it's powerful, and it works when it matters most.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button className="pink-glow-btn px-8 py-3 text-base">Download on App Store</button>
              <button className="outline-btn px-8 py-3 text-base text-white">Get on Google Play</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
