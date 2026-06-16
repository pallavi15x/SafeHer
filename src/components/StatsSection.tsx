import { useInView, useCountUp } from '../hooks';
import { Users, Bell, MapPin, Star } from 'lucide-react';

const stats = [
  { icon: Users, value: 10000, suffix: '+', label: 'Active Users', decimals: 0 },
  { icon: Bell, value: 50000, suffix: '+', label: 'Alerts Sent', decimals: 0 },
  { icon: MapPin, value: 100, suffix: '+', label: 'Cities Covered', decimals: 0 },
  { icon: Star, value: 4.9, suffix: '/5', label: 'User Rating', decimals: 1 },
];

function StatCard({ stat, inView, delay }: { stat: typeof stats[0]; inView: boolean; delay: string }) {
  const Icon = stat.icon;
  const count = useCountUp(stat.value, inView, 2000, stat.decimals);

  return (
    <div className={`stat-card group reveal-scale ${inView ? 'visible' : ''} ${delay}`}>
      <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center mx-auto mb-4 group-hover:bg-pink-500/20 group-hover:border-pink-500/60 transition-all duration-300">
        <Icon size={22} className="text-pink-400" />
      </div>
      <div
        className="text-3xl sm:text-4xl font-black mb-1"
        style={{ background: 'linear-gradient(135deg, #FF1F6E, #FF6B9D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
      >
        {stat.decimals > 0 ? count.toFixed(stat.decimals) : Math.floor(count).toLocaleString()}{stat.suffix}
      </div>
      <p className="text-(--text-secondary) text-sm font-medium">{stat.label}</p>
    </div>
  );
}

export default function StatsSection() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-20 px-4 sm:px-6"
      style={{ background: 'radial-gradient(ellipse at center, rgba(255,31,110,0.06) 0%, transparent 70%)' }}
    >
      <div className="w-full max-w-[92%] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto">
        <div className={`text-center mb-12 reveal ${inView ? 'visible' : ''}`}>
          <h2 className="font-['Playfair_Display'] font-extrabold text-3xl sm:text-4xl text-white mb-3">
            Trusted by <span className="shimmer-text">Thousands</span>
          </h2>
          <p className="text-(--text-secondary) max-w-md mx-auto">Real numbers reflecting our commitment to every woman's safety</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} inView={inView} delay={`delay-${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
