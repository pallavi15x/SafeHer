import { Lock, Shield, Zap, Users } from 'lucide-react';
import { useInView } from '../hooks';

const badges = [
  { icon: Lock, title: '100% Secure', desc: 'Your data is encrypted and always protected with military-grade security.' },
  { icon: Shield, title: 'Privacy First', desc: 'We respect your privacy and ensure your personal information stays yours.' },
  { icon: Zap, title: 'Instant Response', desc: 'Quick alerts and real-time notifications for faster assistance in any situation.' },
  { icon: Users, title: 'Community Driven', desc: 'A strong, supportive community of women who care and look out for each other.' },
];

export default function TrustBadges() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-20 px-4 sm:px-6">
      <div className="w-full max-w-[92%] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, i) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.title}
                className={`glass-card p-6 flex flex-col items-center text-center group hover:border-pink-500/60 reveal ${inView ? 'visible' : ''} delay-${i + 1}`}
              >
                <div className="relative mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center group-hover:border-pink-500/60 group-hover:bg-pink-500/20 transition-all duration-300">
                    <Icon size={26} className="text-pink-400 group-hover:text-pink-300 transition-colors" />
                  </div>
                </div>
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-pink-300 transition-colors">{badge.title}</h3>
                <p className="text-(--text-secondary) text-sm leading-relaxed">{badge.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
