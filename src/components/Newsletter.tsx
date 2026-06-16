import { useState } from 'react';
import { Mail } from 'lucide-react';
import { useInView } from '../hooks';

export default function Newsletter() {
  const { ref, inView } = useInView();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [confetti, setConfetti] = useState<number[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setConfetti(Array.from({ length: 18 }, (_, i) => i));
    setTimeout(() => setConfetti([]), 3000);
  };

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-20 px-4 sm:px-6">
      <div
        className={`max-w-3xl mx-auto rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden reveal-scale ${inView ? 'visible' : ''}`}
        style={{ background: 'linear-gradient(135deg, rgba(255,31,110,0.12) 0%, rgba(13,0,8,0.95) 50%, rgba(145,0,80,0.1) 100%)', border: '1px solid rgba(255,31,110,0.25)', boxShadow: '0 0 80px rgba(255,31,110,0.12)' }}
      >
        <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, #FF1F6E 0%, transparent 70%)' }} aria-hidden="true" />
        <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full opacity-15 pointer-events-none" style={{ background: 'radial-gradient(circle, #FF6B9D 0%, transparent 70%)' }} aria-hidden="true" />

        <div className="relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center mx-auto mb-6">
            <Mail size={28} className="text-pink-400" />
          </div>
          <h2 className="font-['Playfair_Display'] font-extrabold text-3xl sm:text-4xl text-white mb-3">
            Stay Updated with <span className="shimmer-text">Safety Tips</span>
          </h2>
          <p className="text-(--text-secondary) mb-8 max-w-md mx-auto">Subscribe and never miss a safety update, feature announcement, or expert guide.</p>

          {!subscribed ? (
            <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 justify-center max-w-md mx-auto">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="Enter your email address"
                className="flex-1 min-w-[200px] bg-white/5 border border-pink-500/30 rounded-2xl px-5 py-3.5 text-white placeholder-gray-500 text-sm outline-hidden focus:border-pink-500/60 transition-colors"
                aria-label="Email for newsletter" />
              <button type="submit" className="pink-glow-btn px-7 py-3.5 text-sm whitespace-nowrap">Subscribe →</button>
            </form>
          ) : (
            <div className="flex flex-col items-center gap-3 animate-fade-in-up">
              <div className="w-16 h-16 rounded-full bg-green-500/15 border-2 border-green-500/50 flex items-center justify-center text-3xl">✓</div>
              <p className="text-green-400 font-bold text-xl">Subscribed!</p>
              <p className="text-(--text-secondary) text-sm">You're now part of the SafeHer safety community.</p>
            </div>
          )}

          {/* Confetti */}
          {confetti.map(i => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-xs pointer-events-none"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: 0,
                background: ['#FF1F6E','#FF6B9D','#FFB3CC','#e8006a','#ffffff'][i % 5],
                animation: `fade-in-up ${1.2 + Math.random() * 0.5}s ease-out ${Math.random() * 0.3}s forwards`,
              }}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
